import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/contrast_preference_334g";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function makeUrl(search) {
  const url = new URL(rootUrl);
  url.search = search;
  return url.toString();
}

async function openPage(browser, { highContrast = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1194, height: 834 },
    deviceScaleFactor: 2,
    hasTouch: true
  });

  if (highContrast) {
    await context.addInitScript(() => {
      const nativeMatchMedia = window.matchMedia.bind(window);
      const contrastMedia = {
        matches: true,
        media: "(prefers-contrast: more)",
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent() { return false; }
      };
      window.matchMedia = (query) => (
        query === "(prefers-contrast: more)" ? contrastMedia : nativeMatchMedia(query)
      );
    });
  }

  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
  });
  return { context, page };
}

async function gotoScreen(page, search, selector) {
  await page.goto(makeUrl(search), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 6000 });
  await page.waitForTimeout(120);
}

async function readPageSurface(page, selectors) {
  return page.evaluate((requestedSelectors) => {
    const readStyle = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        selector,
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderTopColor: style.borderTopColor,
        borderTopWidth: style.borderTopWidth,
        backdropFilter: style.backdropFilter,
        color: style.color,
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10
      };
    };
    return {
      contrast: document.documentElement.dataset.contrast || "",
      contrastSource: document.documentElement.dataset.contrastSource || "",
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      surfaces: requestedSelectors.map(readStyle)
    };
  }, selectors);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

try {
  const normal = await openPage(browser);
  try {
    await gotoScreen(normal.page, "?screen=map&check=contrast-normal", "#mapShell");
    const normalMap = await readPageSurface(normal.page, [".map-brand", ".node-title"]);
    record(
      "default device preference keeps the normal visual mode",
      normalMap.contrast === "normal" && normalMap.contrastSource === "default" && !normalMap.horizontalOverflow,
      normalMap
    );
  } finally {
    await normal.context.close();
  }

  const high = await openPage(browser, { highContrast: true });
  try {
    await gotoScreen(high.page, "?screen=map&check=contrast-map", "#mapShell");
    const map = await readPageSurface(high.page, [".map-brand", ".chapter-pill", ".map-session-status", ".node-title", ".node-note"]);
    const [brand, chapter, session, title, note] = map.surfaces;
    record("system high-contrast preference reaches the document", map.contrast === "more" && map.contrastSource === "system", map);
    record(
      "high-contrast map turns its major reading surfaces opaque",
      [brand, chapter, session, title, note].every((surface) => surface?.backgroundImage === "none" && surface.backdropFilter === "none"),
      map
    );
    record("high-contrast map remains contained", !map.horizontalOverflow, map);
    await high.page.screenshot({ path: `${screenshotPrefix}_map.png`, fullPage: false });

    await gotoScreen(high.page, "?level=M03&check=contrast-listen", ".moon-yard");
    const listening = await high.page.evaluate(() => ({
      contrast: document.documentElement.dataset.contrast,
      identityHidden: document.querySelector("#appShell")?.dataset.listeningIdentityHidden || "",
      targetVisible: document.querySelector("#appShell")?.dataset.keyboardTargetVisible === "true",
      targetMuted: document.querySelector(".key.white-key[data-target-note='true']")?.classList.contains("target-muted") || false,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    }));
    record(
      "high contrast preserves M03 answer hiding before input",
      listening.contrast === "more" && listening.identityHidden === "true" && !listening.targetVisible && listening.targetMuted && !listening.horizontalOverflow,
      listening
    );

    await gotoScreen(high.page, "?mode=staff&check=contrast-staff", ".staff-stage");
    const staff = await high.page.evaluate(() => {
      const lines = [...document.querySelectorAll(".svg-staff-lines .svg-staff-line")].map((line) => {
        const style = getComputedStyle(line);
        return { stroke: style.stroke, strokeWidth: style.strokeWidth, opacity: style.opacity };
      });
      const keyboard = document.querySelector(".keyboard.real-piano");
      const keyboardStyle = keyboard ? getComputedStyle(keyboard) : null;
      return {
        contrast: document.documentElement.dataset.contrast,
        lineCount: lines.length,
        lines,
        keyboardBorderTopWidth: keyboardStyle?.borderTopWidth || "",
        keyboardBorderTopColor: keyboardStyle?.borderTopColor || "",
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      };
    });
    record(
      "high-contrast S01 strengthens all five staff lines",
      staff.contrast === "more" && staff.lineCount === 5 && staff.lines.every((line) => Number.parseFloat(line.strokeWidth) >= 8 && Number.parseFloat(line.opacity) >= 0.99),
      staff
    );
    record(
      "high-contrast S01 keeps a contained keyboard with a strong outer edge",
      Number.parseFloat(staff.keyboardBorderTopWidth) >= 3 && !staff.horizontalOverflow,
      staff
    );
    await high.page.screenshot({ path: `${screenshotPrefix}_staff.png`, fullPage: false });

    await gotoScreen(high.page, "?level=M01&check=contrast-parent", ".moon-yard");
    await high.page.locator("#playParentGate").click();
    await high.page.waitForSelector("#parentModal", { state: "visible", timeout: 3000 });
    const parent = await readPageSurface(high.page, [".parent-card", ".parent-status-card", ".parent-option"]);
    record(
      "high-contrast parent surface stays opaque and contained",
      parent.surfaces.every((surface) => surface?.backgroundImage === "none" && surface.backdropFilter === "none") && !parent.horizontalOverflow,
      parent
    );
    await high.page.screenshot({ path: `${screenshotPrefix}_parent.png`, fullPage: false });
  } finally {
    await high.context.close();
  }
} finally {
  await browser.close();
}

record("browser console is clean", browserErrors.length === 0, { browserErrors });

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`contrast preference checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) process.exitCode = 1;
