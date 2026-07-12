import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/staff_repair_334g";
const viewportSpecs = [
  { id: "1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "1194x834-dpr2", width: 1194, height: 834, dpr: 2 }
];

fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const checks = [];
const browserErrors = [];

const record = (name, pass, details = {}) => {
  checks.push({ name, pass: Boolean(pass), details });
};

const makeUrl = (query) => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const readRepairState = async (page) => page.evaluate(() => {
  const isVisible = (element) => {
    if (!element) return false;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
  };
  const rect = (element) => {
    if (!element) return null;
    const value = element.getBoundingClientRect();
    return {
      x: Math.round(value.x),
      y: Math.round(value.y),
      width: Math.round(value.width),
      height: Math.round(value.height),
      right: Math.round(value.right),
      bottom: Math.round(value.bottom)
    };
  };
  const overlapRatio = (a, b) => {
    if (!a || !b) return 0;
    const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
    const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
    const overlap = width * height;
    const smaller = Math.max(1, Math.min(a.width * a.height, b.width * b.height));
    return overlap / smaller;
  };

  const app = document.querySelector("#appShell");
  const stage = document.querySelector("#staffStage");
  const currentPad = document.querySelector(".staff-step.current");
  const dinoWrap = document.querySelector("#staffDinoWrap");
  const dino = document.querySelector("#staffDino");
  const dinoTip = dinoWrap ? getComputedStyle(dinoWrap, "::after") : null;
  const targetKey = document.querySelector('.key.white-key[data-midi="60"]');
  const wrongKey = document.querySelector('.key.white-key[data-midi="62"]');
  const targetLocator = targetKey?.querySelector(".locator-cue.key-locator-mini");
  const bubbleContent = dinoTip?.content || "";
  const bubbleVisible = Boolean(
    isVisible(dinoWrap) &&
    dinoTip &&
    dinoTip.display !== "none" &&
    dinoTip.visibility !== "hidden" &&
    Number(dinoTip.opacity) > 0.01 &&
    !["none", "normal", "\"\"", "''"].includes(bubbleContent)
  );
  const targetLocatorVisible = isVisible(targetLocator) && targetKey?.classList.contains("target");
  const duplicateSelectors = [
    "#staffNoteCard",
    "#staffVisualCue",
    ".staff-stage-toast",
    ".staff-jump-guide",
    ".staff-jump-footprints span",
    ".staff-landing-ripple",
    ".sprite-effect.staff-sprite-effect",
    ".note-feedback-burst.staff-note-burst",
    ".music-flight.music-flight-hint",
    ".music-flight-landing.landing-hint"
  ];
  const visibleDuplicates = duplicateSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]
    .filter(isVisible)
    .map((element) => ({ selector, className: element.className, text: element.textContent?.trim() || "" })));
  const currentPadRect = rect(currentPad);
  const dinoRect = rect(dinoWrap);

  return {
    version: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
    repairState: app?.dataset.staffRepairState || "",
    stageRepairState: stage?.dataset.repairState || "",
    currentPadVisible: isVisible(currentPad),
    currentPadText: currentPad?.textContent?.trim() || "",
    currentPadRect,
    dinoRect,
    dinoPlace: dinoWrap?.dataset.place || "",
    dinoClass: dinoWrap?.className || "",
    dinoImage: dino?.getAttribute("src") || "",
    bubbleContent,
    bubbleVisible,
    targetLocatorVisible,
    targetKeyClass: targetKey?.className || "",
    targetKeyLabelVisible: isVisible(targetKey?.querySelector(".key-content")),
    wrongKeyClass: wrongKey?.className || "",
    wrongKeyLocatorVisible: isVisible(wrongKey?.querySelector(".locator-cue.key-locator-mini")),
    wrongKeyLabelVisible: isVisible(wrongKey?.querySelector(".key-content")),
    guidanceCount: Number(bubbleVisible) + Number(targetLocatorVisible),
    visibleDuplicates,
    dinoPadOverlapRatio: overlapRatio(dinoRect, currentPadRect),
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1 || document.body.scrollWidth > window.innerWidth + 1,
    verticalOverflow: document.documentElement.scrollHeight > window.innerHeight + 1 || document.body.scrollHeight > window.innerHeight + 1
  };
});

try {
  for (const spec of viewportSpecs) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: spec.dpr,
      reducedMotion: "no-preference"
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        browserErrors.push({ viewport: spec.id, type: message.type(), text: message.text(), url: page.url() });
      }
    });
    page.on("pageerror", (error) => {
      browserErrors.push({ viewport: spec.id, type: "pageerror", text: error.message, url: page.url() });
    });
    await page.addInitScript(() => {
      localStorage.removeItem("starDinoCompletedLevels");
      localStorage.removeItem("starDinoLearningStats");
    });

    await page.goto(makeUrl(`?mode=staff&check=staff-repair-327a-${spec.id}`), {
      waitUntil: "domcontentloaded",
      timeout: 12000
    });
    await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
    await page.waitForSelector(".staff-panel", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(260);

    await page.locator('.key.white-key[data-midi="62"]').click({ timeout: 5000 });
    await page.waitForTimeout(140);
    const transient = await readRepairState(page);
    record(`${spec.id}: wrong key uses only short red press feedback`, /\bwrong\b|\bhit-wrong\b/.test(transient.wrongKeyClass), transient);
    record(`${spec.id}: no wrong sprite, particle, toast, arrow, or ripple is created`, transient.visibleDuplicates.length === 0, transient);

    await page.waitForTimeout(1320);
    const stable = await readRepairState(page);
    await page.screenshot({ path: `${screenshotPrefix}_${spec.id}_stable.png`, fullPage: false });

    record(`${spec.id}: runtime is overhaul-342a`, stable.version.includes("overhaul-342a"), stable);
    record(`${spec.id}: repair state is explicit on app and stage`, stable.repairState === "repair" && stable.stageRepairState === "repair", stable);
    record(`${spec.id}: central staff target remains the main task`, stable.currentPadVisible && stable.currentPadText.includes("C") && !stable.currentPadText.includes("Do"), stable);
    record(`${spec.id}: stable repair has exactly two persistent guidance surfaces`, stable.guidanceCount === 2, stable);
    record(`${spec.id}: Xingya bubble carries the one scene-level Do/C repair`, stable.bubbleVisible && stable.bubbleContent.includes("Do/C"), stable);
    record(`${spec.id}: correct key locator is the only second repair system`, stable.targetLocatorVisible && stable.targetKeyLabelVisible, stable);
    record(`${spec.id}: duplicate repair overlays stay hidden`, stable.visibleDuplicates.length === 0, stable);
    record(`${spec.id}: wrong-key marker fades while its key label stays readable`, !/\bwrong\b|\bhit-wrong\b|\bpressed\b/.test(stable.wrongKeyClass) && !stable.wrongKeyLocatorVisible && stable.wrongKeyLabelVisible, stable);
    record(`${spec.id}: Xingya returns to a clear start stance`, stable.dinoPlace === "start" && !stable.dinoClass.includes("is-stumbling") && stable.dinoImage.endsWith("xingya-suit-point.webp"), stable);
    record(`${spec.id}: Xingya does not crowd the current staff pad`, stable.dinoPadOverlapRatio < 0.08, stable);
    record(`${spec.id}: repair layout has no page overflow`, !stable.horizontalOverflow && !stable.verticalOverflow, stable);

    await context.close();
  }

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
  const failed = checks.filter((check) => !check.pass);
  for (const check of checks) {
    console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
    if (!check.pass) console.log(JSON.stringify(check.details, null, 2));
  }
  console.log(`staff repair checks: ${checks.length - failed.length} passed, ${failed.length} failed`);
  if (failed.length) process.exitCode = 1;
} finally {
  await browser.close();
}
