import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/xingya_space_suit_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];
const runtimeAssets = [
  "xingya-suit-point.webp",
  "xingya-suit-listen.webp",
  "xingya-suit-good.webp",
  "xingya-suit-try-again.webp",
  "xingya-suit-celebrate.webp",
  "xingya-suit-jump.webp"
];
const gardenRuntimeAsset = "xingya-garden-invite-v1.webp";
const gardenRuntimeSha256 = "1228082D4DF2BF576ED916B16950799296A975279ED6EFC554F6BB9EDDE88EBA";

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

function watchPage(page, label) {
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ label, type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ label, type: "pageerror", text: error.message, url: page.url() });
  });
}

async function waitReady(page) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector("#keyboard", { state: "visible", timeout: 6000 });
}

async function gotoMode(page, search) {
  const url = new URL(rootUrl);
  url.search = search;
  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(page);
}

async function gotoChapter4(page, lesson) {
  const url = new URL(rootUrl);
  url.search = `?mode=chapter4&directMode=true&formalSession=false&lesson=${lesson}&check=xingya-garden-mode-344a`;
  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector("#chapter4Panel", { state: "visible", timeout: 6000 });
}

async function waitChapter4Phase(page, phase, timeout = 12000) {
  await page.waitForFunction((expected) => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === expected, phase, { timeout });
}

async function readImageState(page, selector) {
  return page.locator(selector).evaluate((image) => {
    const rect = image.getBoundingClientRect();
    return {
      src: image.getAttribute("src"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }
    };
  });
}

async function readChapter4CharacterState(page) {
  return page.locator("#chapter4XingyaImage").evaluate((image) => {
    const wrapper = image.closest(".chapter4-xingya");
    const rect = image.getBoundingClientRect();
    const pseudo = ["::before", "::after"].map((name) => {
      const style = getComputedStyle(wrapper, name);
      return { name, content: style.content, backgroundImage: style.backgroundImage, border: style.border };
    });
    return {
      src: image.getAttribute("src") || "",
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      assetState: document.querySelector("#chapter4Scene")?.dataset.characterAssetState || "",
      sealedSuitReferences: [...document.querySelectorAll("#chapter4Panel img")].filter((node) => /xingya-suit-/.test(node.getAttribute("src") || "")).length,
      pseudo,
      rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }
    };
  });
}

const activeSources = [
  "app.js",
  "index.html",
  "styles.css",
  "staff-overrides.css",
  "play-overrides.css",
  "keyboard-overrides.css",
  "map-overrides.css",
  "quality-overrides.css",
  "quality-overrides-2.css",
  "quality-overrides-3.css",
  "quality-overrides-4.css",
  "current-overhaul.css",
  "chapter4-slice.css"
];
const activeText = activeSources.map((file) => fs.readFileSync(file, "utf8")).join("\n");
record("active bundle no longer references helmet-only dino assets", !/assets\/runtime\/dino-[a-z-]+\.webp/.test(activeText));
record("all six sealed-suit runtime files exist", runtimeAssets.every((file) => fs.existsSync(path.join("assets/runtime", file))));
record(
  "sealed-suit runtime files stay below 100 KB each",
  runtimeAssets.every((file) => fs.statSync(path.join("assets/runtime", file)).size < 100_000),
  Object.fromEntries(runtimeAssets.map((file) => [file, fs.statSync(path.join("assets/runtime", file)).size]))
);
const gardenAssetBytes = fs.readFileSync(path.join("assets/runtime", gardenRuntimeAsset));
record("approved garden-mode runtime asset exists with the frozen SHA-256", fs.existsSync(path.join("assets/runtime", gardenRuntimeAsset)) && crypto.createHash("sha256").update(gardenAssetBytes).digest("hex").toUpperCase() === gardenRuntimeSha256, {
  file: gardenRuntimeAsset,
  bytes: gardenAssetBytes.length,
  sha256: crypto.createHash("sha256").update(gardenAssetBytes).digest("hex").toUpperCase()
});

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

let context;

try {
  context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference"
  });
  const page = await context.newPage();
  watchPage(page, "xingya-suit");

  await gotoMode(page, "?level=M01&check=xingya-suit-323a");

  const decodedAssets = await page.evaluate(async (files) => {
    const load = (file) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let visible = 0;
        let partial = 0;
        for (let index = 3; index < data.length; index += 4) {
          if (data[index] > 0) visible += 1;
          if (data[index] > 0 && data[index] < 255) partial += 1;
        }
        const cornerAlpha = [
          data[3],
          data[(canvas.width - 1) * 4 + 3],
          data[((canvas.height - 1) * canvas.width) * 4 + 3],
          data[(canvas.height * canvas.width - 1) * 4 + 3]
        ];
        resolve({ file, ok: true, width: image.naturalWidth, height: image.naturalHeight, visible, partial, cornerAlpha });
      };
      image.onerror = () => resolve({ file, ok: false });
      image.src = `assets/runtime/${file}`;
    });
    return Promise.all(files.map(load));
  }, [...runtimeAssets, gardenRuntimeAsset]);

  const decodedSuitAssets = decodedAssets.filter((asset) => runtimeAssets.includes(asset.file));
  const decodedGardenAsset = decodedAssets.find((asset) => asset.file === gardenRuntimeAsset);
  record("all six sealed-suit images decode as 512px transparent assets", decodedSuitAssets.every((asset) => asset.ok && asset.width === 512 && asset.height === 512 && asset.cornerAlpha.every((alpha) => alpha === 0)), decodedSuitAssets);
  record("all six sealed-suit images contain a substantial nonblank subject", decodedSuitAssets.every((asset) => asset.visible >= 70_000 && asset.partial >= 8_000), decodedSuitAssets);
  record("approved garden-mode image decodes as a complete transparent 512px character", decodedGardenAsset?.ok && decodedGardenAsset.width === 512 && decodedGardenAsset.height === 512 && decodedGardenAsset.cornerAlpha.every((alpha) => alpha === 0) && decodedGardenAsset.visible >= 70_000, decodedGardenAsset);

  const version = await page.evaluate(() => [...document.scripts].map((script) => script.src).find((src) => src.includes("app.js")));
  record("prototype loads the 345c AUDIO-B runtime version", version?.includes("overhaul-345c-audio-b"), { version });

  const m01Dino = await readImageState(page, "#dinoSvg");
  const m01Coach = await readImageState(page, "#coachDino");
  record("M01 stage and coach use complete pressure-suit point art", m01Dino.src?.endsWith("xingya-suit-point.webp") && m01Coach.src?.endsWith("xingya-suit-point.webp") && m01Dino.complete && m01Coach.complete, { m01Dino, m01Coach });
  const coachLayout = await page.evaluate(() => {
    const image = document.querySelector("#coachDino")?.getBoundingClientRect();
    const bubble = document.querySelector(".coach-bubble")?.getBoundingClientRect();
    if (!image || !bubble) return null;
    const overlapWidth = Math.max(0, Math.min(image.right, bubble.right) - Math.max(image.left, bubble.left));
    const overlapHeight = Math.max(0, Math.min(image.bottom, bubble.bottom) - Math.max(image.top, bubble.top));
    return {
      image: { left: image.left, top: image.top, right: image.right, bottom: image.bottom, width: image.width, height: image.height },
      bubble: { left: bubble.left, top: bubble.top, right: bubble.right, bottom: bubble.bottom, width: bubble.width, height: bubble.height },
      overlapRatio: (overlapWidth * overlapHeight) / Math.max(1, image.width * image.height)
    };
  });
  record("M01 sealed-suit coach is visible and contained at iPad size", m01Coach.rect.width >= 100 && m01Coach.rect.height >= 100 && m01Coach.rect.left >= 0 && m01Coach.rect.right <= 1024 && m01Coach.rect.top >= 0 && m01Coach.rect.bottom <= 768, m01Coach.rect);
  record("M01 speech bubble does not cover the character", coachLayout && coachLayout.overlapRatio <= 0.18, coachLayout);
  await page.screenshot({ path: `${screenshotPrefix}_M01_initial_1024.png`, fullPage: false });

  await page.locator('.key.white-key[data-note="D"]').click();
  await page.waitForTimeout(100);
  const wrongDino = await readImageState(page, "#dinoSvg");
  record("wrong input switches to the sealed-suit try-again pose", wrongDino.src?.endsWith("xingya-suit-try-again.webp"), wrongDino);
  await page.screenshot({ path: `${screenshotPrefix}_M01_wrong_1024.png`, fullPage: false });

  await page.locator('.key.white-key[data-note="C"]').click();
  await page.waitForSelector("#resultModal", { state: "visible", timeout: 3000 });
  const resultDino = await readImageState(page, ".result-dino");
  record("M01 completion uses a visible sealed-suit celebration pose", resultDino.src?.endsWith("xingya-suit-celebrate.webp") && resultDino.rect.width >= 110 && resultDino.rect.height >= 110 && resultDino.rect.left >= 0 && resultDino.rect.right <= 1024, resultDino);
  await page.screenshot({ path: `${screenshotPrefix}_M01_complete_1024.png`, fullPage: false });

  await gotoMode(page, "?level=M03&check=xingya-suit-323a-listen");
  const listenCoach = await readImageState(page, "#coachDino");
  record("M03 listening prompt uses the sealed-suit listening pose", listenCoach.src?.endsWith("xingya-suit-listen.webp"), listenCoach);

  for (const level of ["M07", "M08", "FG03"]) {
    await gotoMode(page, `?level=${level}&check=xingya-suit-323a-route`);
    const coachState = level === "M08"
      ? await readImageState(page, "#coachDino")
      : await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          const rect = element?.getBoundingClientRect();
          return {
            backgroundImage: element ? getComputedStyle(element).backgroundImage : "",
            rect: rect ? { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height } : null
          };
        }, level === "M07" ? ".memory-route-dino" : ".fg-route-dino");
    record(`${level} grounded coach uses sealed-suit art`,
      level === "M08"
        ? coachState.src?.endsWith("xingya-suit-point.webp") && coachState.rect.width >= 80 && coachState.rect.height >= 80
        : coachState.backgroundImage?.includes("xingya-suit-point.webp") && coachState.rect?.width >= 80 && coachState.rect?.height >= 80,
      coachState);
    if (level === "M08") {
      const m08Separation = await page.evaluate(() => {
        const dino = document.querySelector("#coachDino")?.getBoundingClientRect();
        const blueprint = document.querySelector("#buildBlueprint")?.getBoundingClientRect();
        if (!dino || !blueprint) return null;
        const width = Math.max(0, Math.min(dino.right, blueprint.right) - Math.max(dino.left, blueprint.left));
        const height = Math.max(0, Math.min(dino.bottom, blueprint.bottom) - Math.max(dino.top, blueprint.top));
        return { overlapRatio: (width * height) / Math.max(1, dino.width * dino.height) };
      });
      record("M08 blueprint does not cover the sealed-suit character", (m08Separation?.overlapRatio || 0) <= 0.05, m08Separation || {});
      await page.screenshot({ path: `${screenshotPrefix}_M08_initial_1024.png`, fullPage: false });
    }
  }

  await gotoMode(page, "?mode=staff&check=xingya-suit-323a-staff");
  const staffInitial = await readImageState(page, "#staffDino");
  record("S01 starts with the sealed-suit standing pose", staffInitial.src?.endsWith("xingya-suit-point.webp") && staffInitial.naturalWidth === 512, staffInitial);

  await page.locator('.key.white-key[data-note="C"]').click();
  await page.waitForTimeout(90);
  const staffJump = await page.evaluate(() => ({
    src: document.querySelector("#staffDino")?.getAttribute("src"),
    jumping: document.querySelector(".staff-dino-wrap")?.classList.contains("is-jumping"),
    padDone: document.querySelector(".staff-step")?.classList.contains("done")
  }));
  record("correct S01 input uses the sealed-suit airborne pose", staffJump.src?.endsWith("xingya-suit-jump.webp") && staffJump.jumping && staffJump.padDone, staffJump);
  await page.screenshot({ path: `${screenshotPrefix}_S01_jump_1024.png`, fullPage: false });

  await page.waitForTimeout(1050);
  const staffLanding = await readImageState(page, "#staffDino");
  record("S01 landing resolves to a sealed-suit positive pose", /xingya-suit-(good|point|celebrate)\.webp$/.test(staffLanding.src || ""), staffLanding);
  await page.screenshot({ path: `${screenshotPrefix}_S01_landing_1024.png`, fullPage: false });

  await gotoMode(page, "?mode=staff&check=xingya-suit-323a-wrong");
  await page.locator('.key.white-key[data-note="D"]').click();
  await page.waitForTimeout(90);
  const staffWrong = await page.evaluate(() => ({
    src: document.querySelector("#staffDino")?.getAttribute("src"),
    stumbling: document.querySelector(".staff-dino-wrap")?.classList.contains("is-stumbling")
  }));
  record("wrong S01 input uses the sealed-suit gentle-stumble pose", staffWrong.src?.endsWith("xingya-suit-try-again.webp") && staffWrong.stumbling, staffWrong);
  await page.screenshot({ path: `${screenshotPrefix}_S01_wrong_1024.png`, fullPage: false });

  await gotoChapter4(page, "LP01");
  await page.locator("#chapter4StartCheck").click();
  await waitChapter4Phase(page, "lp01-model");
  const chapter4Model = await readChapter4CharacterState(page);
  record("C4 LP01 model uses the approved garden-mode character with no suit or CSS helmet fallback", chapter4Model.src.endsWith(gardenRuntimeAsset) && chapter4Model.assetState === "garden-mode" && chapter4Model.sealedSuitReferences === 0 && chapter4Model.complete && chapter4Model.naturalWidth === 512 && chapter4Model.pseudo.every((item) => ["none", "normal", "\"\"", "''"].includes(item.content) && item.backgroundImage === "none"), chapter4Model);
  await page.screenshot({ path: `${screenshotPrefix}_C4_LP01_model_1024.png`, fullPage: false });

  await page.locator("#chapter4StartCheck").click();
  await waitChapter4Phase(page, "awaiting-response");
  const wrongBubbleId = await page.evaluate(() => {
    const attempt = ensureChapter4Attempt();
    const target = attempt.sequence[attempt.callIndex];
    return Object.entries(attempt.bubbleMapping).find(([, midi]) => midi !== target)?.[0];
  });
  await page.locator(`[data-bubble-id="${wrongBubbleId}"]`).click();
  await waitChapter4Phase(page, "wrong");
  await waitChapter4Phase(page, "awaiting-response");
  await page.locator(`[data-bubble-id="${wrongBubbleId}"]`).click();
  await waitChapter4Phase(page, "pair-compare");
  await waitChapter4Phase(page, "awaiting-response");
  await page.locator(`[data-bubble-id="${wrongBubbleId}"]`).click();
  await waitChapter4Phase(page, "assisted");
  const chapter4Assisted = await readChapter4CharacterState(page);
  record("C4 LP01 assisted keeps the same garden-mode equipment", chapter4Assisted.src.endsWith(gardenRuntimeAsset) && chapter4Assisted.assetState === "garden-mode" && chapter4Assisted.sealedSuitReferences === 0, chapter4Assisted);
  await page.screenshot({ path: `${screenshotPrefix}_C4_LP01_assisted_1024.png`, fullPage: false });

  await gotoChapter4(page, "LP02");
  await waitChapter4Phase(page, "lp02-guide");
  const chapter4Lp02Guide = await readChapter4CharacterState(page);
  record("C4 LP02 guide keeps the approved garden-mode character", chapter4Lp02Guide.src.endsWith(gardenRuntimeAsset) && chapter4Lp02Guide.assetState === "garden-mode" && chapter4Lp02Guide.sealedSuitReferences === 0, chapter4Lp02Guide);
  await page.screenshot({ path: `${screenshotPrefix}_C4_LP02_guide_1024.png`, fullPage: false });
  await page.locator('#keyboard .white-key[data-midi="48"]').click();
  await waitChapter4Phase(page, "lp02-complete");
  const chapter4Lp02Complete = await readChapter4CharacterState(page);
  record("C4 LP02 complete keeps three-sprout garden-mode Xingya through natural story completion", chapter4Lp02Complete.src.endsWith(gardenRuntimeAsset) && chapter4Lp02Complete.assetState === "garden-mode" && chapter4Lp02Complete.sealedSuitReferences === 0, chapter4Lp02Complete);
  await page.screenshot({ path: `${screenshotPrefix}_C4_LP02_complete_1024.png`, fullPage: false });

  const finalLayout = await page.evaluate(() => ({
    bodyOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    bodyOverflowY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    legacyVisibleImages: [...document.querySelectorAll("img")].filter((image) => image.getAttribute("src")?.includes("assets/runtime/dino-") && getComputedStyle(image).display !== "none").map((image) => image.getAttribute("src")),
    legacyVisibleBackgrounds: [...document.querySelectorAll(".roof-route-dino, .memory-route-dino, .fg-route-dino")].map((element) => getComputedStyle(element).backgroundImage).filter((value) => value.includes("/dino-"))
  }));
  record("iPad layout has no page overflow after suit replacement", !finalLayout.bodyOverflowX && !finalLayout.bodyOverflowY, finalLayout);
  record("no visible runtime character falls back to helmet-only art", finalLayout.legacyVisibleImages.length === 0 && finalLayout.legacyVisibleBackgrounds.length === 0, finalLayout);
  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await context?.close();
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`Xingya suit checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
