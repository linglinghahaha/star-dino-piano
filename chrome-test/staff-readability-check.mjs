import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/staff_readability_334g";
const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 },
  { id: "large-ipad-1366x1024", width: 1366, height: 1024, dpr: 2 }
];

fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function makeUrl(query) {
  const url = new URL(rootUrl);
  url.search = query;
  return url.toString();
}

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
        browserErrors.push({ viewport: viewport.id, type: message.type(), text: message.text(), url: page.url() });
      }
    });
    page.on("pageerror", (error) => {
      browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message, url: page.url() });
    });

    try {
      await page.goto(makeUrl(`?mode=staff&check=staff-readability-${viewport.id}`), { waitUntil: "domcontentloaded", timeout: 12000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
      await page.waitForSelector(".staff-stage", { state: "visible", timeout: 6000 });

      const details = await page.evaluate(() => {
        const stage = document.querySelector(".staff-stage");
        const scene = document.querySelector(".staff-scene-art");
        const staffGroup = document.querySelector(".svg-staff-lines");
        const lines = [...document.querySelectorAll(".svg-staff-lines .svg-staff-line")];
        const measures = [...document.querySelectorAll(".svg-staff-lines .svg-measure-line")];
        const stageRect = stage?.getBoundingClientRect();
        const groupRect = staffGroup?.getBoundingClientRect();
        const style = (element) => element ? getComputedStyle(element) : null;
        const parsePx = (value) => Number.parseFloat(value || "0");
        return {
          runtimeVersion: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
          stage: stageRect ? { width: stageRect.width, height: stageRect.height } : null,
          group: groupRect ? { width: groupRect.width, height: groupRect.height } : null,
          sceneOpacity: Number(style(scene)?.opacity || 0),
          groupVisible: Boolean(staffGroup) && style(staffGroup)?.display !== "none" && Number(style(staffGroup)?.opacity || 0) >= 0.99,
          lines: lines.map((line) => ({
            display: style(line)?.display,
            opacity: Number(style(line)?.opacity || 0),
            stroke: style(line)?.stroke,
            strokeWidth: parsePx(style(line)?.strokeWidth)
          })),
          measures: measures.map((line) => ({
            display: style(line)?.display,
            opacity: Number(style(line)?.opacity || 0),
            strokeWidth: parsePx(style(line)?.strokeWidth)
          })),
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          verticalOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
        };
      });

      const linesReadable = details.lines.length === 5 && details.lines.every((line) => (
        line.display !== "none" && line.opacity >= 0.95 && line.strokeWidth >= 7
      ));
      const measuresReadable = details.measures.length === 3 && details.measures.every((line) => (
        line.display !== "none" && line.opacity >= 0.8 && line.strokeWidth >= 5
      ));
      const staffHasUsefulGeometry = details.stage && details.group &&
        details.group.width >= details.stage.width * 0.5 &&
        details.group.height >= details.stage.height * 0.45;

      record(`${viewport.id}: runs the 346a LP03 shell`, details.runtimeVersion.includes("overhaul-346a-lp03"), details);
      record(`${viewport.id}: five staff lines stay bold and visible`, details.sceneOpacity >= 0.76 && details.groupVisible && linesReadable, details);
      record(`${viewport.id}: measure lines and ledger stay visible`, measuresReadable && staffHasUsefulGeometry, details);
      record(`${viewport.id}: staff stage remains contained`, !details.horizontalOverflow && !details.verticalOverflow, details);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}.png`, fullPage: false });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

record("browser console is clean", browserErrors.length === 0, { browserErrors });
const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`staff readability checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
