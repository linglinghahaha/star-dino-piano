import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const candidatePath = process.argv[3] || "assets/generated/xingya-suit-point-flat-m08-source-v4-alpha-tight.png";
const screenshotDir = process.argv[4] || "screenshots/m08_xingya_v4_candidate";

const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 },
  { id: "large-ipad-1366x1024", width: 1366, height: 1024, dpr: 2 }
];

const checks = [];
const browserErrors = [];
const record = (name, pass, details = {}) => checks.push({ name, pass: Boolean(pass), details });
const candidateUrl = new URL(candidatePath.replaceAll("\\", "/"), rootUrl).href;

function contains(outer, inner, tolerance = 1) {
  return Boolean(outer && inner &&
    inner.left >= outer.left - tolerance && inner.right <= outer.right + tolerance &&
    inner.top >= outer.top - tolerance && inner.bottom <= outer.bottom + tolerance);
}

fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.dpr,
      hasTouch: true
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        browserErrors.push({ viewport: viewport.id, type: message.type(), text: message.text() });
      }
    });
    page.on("pageerror", (error) => {
      browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message });
    });

    try {
      const url = new URL(rootUrl);
      url.search = `?level=M08&check=xingya-v4-candidate-${viewport.id}`;
      await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await page.addStyleTag({
        content: `#appShell[data-level-id="M08"] #coachDino { content: url("${candidateUrl}") !important; }`
      });
      await page.waitForFunction((expected) => {
        const dino = document.querySelector("#coachDino");
        return dino && getComputedStyle(dino).content.includes(expected);
      }, path.basename(candidatePath), { timeout: 10000 });
      await page.waitForTimeout(350);

      const state = await page.evaluate(async ({ expectedUrl }) => {
        const rect = (selector) => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const box = element.getBoundingClientRect();
          return {
            left: box.left,
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            width: box.width,
            height: box.height
          };
        };
        const imageInfo = await new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve({ loaded: true, width: image.naturalWidth, height: image.naturalHeight });
          image.onerror = () => resolve({ loaded: false, width: 0, height: 0 });
          image.src = expectedUrl;
        });
        return {
          imageInfo,
          content: getComputedStyle(document.querySelector("#coachDino")).content,
          dino: rect("#coachDino"),
          bubble: rect("#coachBubble"),
          blueprint: rect("#buildBlueprint"),
          yard: rect(".moon-yard"),
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          verticalOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
        };
      }, { expectedUrl: candidateUrl });

      record(`${viewport.id}: candidate source decodes at high-resolution sprite dimensions`,
        state.imageInfo.loaded && state.imageInfo.width >= 900 && state.imageInfo.height >= 1000, state);
      record(`${viewport.id}: temporary candidate override is active`,
        state.content.includes(path.basename(candidatePath)), state);
      record(`${viewport.id}: candidate character stays contained in the moon yard`,
        contains(state.yard, state.dino, 3), state);
      record(`${viewport.id}: character remains beside the blueprint at a readable size`,
        state.dino.left < state.blueprint.left &&
        (state.dino.left + state.dino.right) / 2 <= state.blueprint.left + 12 &&
        state.dino.height >= state.yard.height * 0.18, state);
      record(`${viewport.id}: coach bubble remains above the character`,
        state.bubble.bottom <= state.dino.top + 8, state);
      record(`${viewport.id}: candidate audition creates no page overflow`,
        !state.horizontalOverflow && !state.verticalOverflow, state);

      await page.screenshot({
        path: path.join(screenshotDir, `${viewport.id}.png`),
        fullPage: false
      });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

record("browser console is clean", browserErrors.length === 0, { browserErrors });
const failed = checks.filter((check) => !check.pass);
for (const check of checks) {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
}
console.log(`M08 art candidate checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
