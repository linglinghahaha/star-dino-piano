#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const baseUrl = args[0] || "http://127.0.0.1:4173/";
const targetSheet = args[1] || "quality-overrides.css";
const outputPath = args[2] || "screenshots/css-rule-usage-latest.json";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const page = await browser.newPage({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});
const cdp = await page.context().newCDPSession(page);

const headers = new Map();
const sheetTexts = new Map();
const usedRanges = [];
const browserErrors = [];
const visitedStates = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
});

cdp.on("CSS.styleSheetAdded", ({ header }) => {
  headers.set(header.styleSheetId, header);
});

const makeUrl = (query) => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const waitReady = async (selector) => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 8000 });
  await page.waitForTimeout(220);
};

const captureCoverage = async (state) => {
  const delta = await cdp.send("CSS.takeCoverageDelta");
  let matchedRules = 0;
  for (const entry of delta.coverage || []) {
    const header = headers.get(entry.styleSheetId);
    if (!header?.sourceURL?.includes(targetSheet) || !entry.used) continue;
    if (!sheetTexts.has(entry.styleSheetId)) {
      const result = await cdp.send("CSS.getStyleSheetText", {
        styleSheetId: entry.styleSheetId
      });
      sheetTexts.set(entry.styleSheetId, result.text);
    }
    usedRanges.push({
      start: entry.startOffset,
      end: entry.endOffset,
      state,
      sourceURL: header.sourceURL
    });
    matchedRules += 1;
  }
  visitedStates.push({ state, url: page.url(), matchedRules });
};

const gotoState = async (state, query, selector = ".moon-yard") => {
  await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(selector);
  await captureCoverage(state);
};

const tapMidi = async (midi, delay = 620) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
};

const mergeRanges = (ranges) => {
  const sorted = ranges
    .map(({ start, end }) => ({ start, end }))
    .sort((a, b) => a.start - b.start || a.end - b.end);
  const merged = [];
  for (const range of sorted) {
    const previous = merged.at(-1);
    if (!previous || range.start > previous.end) {
      merged.push({ ...range });
    } else {
      previous.end = Math.max(previous.end, range.end);
    }
  }
  return merged;
};

await cdp.send("DOM.enable");
await cdp.send("CSS.enable");
await cdp.send("CSS.startRuleUsageTracking");

try {
  await page.addInitScript(() => {
    localStorage.removeItem("starDinoCompletedLevels");
    localStorage.removeItem("starDinoLearningStats");
    sessionStorage.clear();
  });

  for (const level of ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08"]) {
    await gotoState(`${level} initial`, `?level=${level}&check=css-usage-${level.toLowerCase()}`);
  }
  for (const level of ["FG01", "FG02", "FG03", "FG04"]) {
    await gotoState(`${level} initial`, `?level=${level}&check=css-usage-${level.toLowerCase()}`);
  }

  await gotoState("M03 listening initial", "?level=M03&check=css-usage-m03-flow");
  await tapMidi(62);
  await captureCoverage("M03 listening after first match");
  await tapMidi(60);
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 8000
  });
  await captureCoverage("M03 listening result");

  await gotoState("M08 initial flow", "?level=M08&check=css-usage-m08-flow");
  await tapMidi(62, 420);
  await captureCoverage("M08 wrong repair");
  for (const midi of [60, 62, 64, 65, 67]) await tapMidi(midi, 360);
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 8000
  });
  await captureCoverage("M08 result");

  await gotoState("FG03 initial flow", "?level=FG03&check=css-usage-fg03-flow");
  await tapMidi(60, 420);
  await captureCoverage("FG03 wrong repair");
  for (const midi of [64, 65, 67]) await tapMidi(midi, 360);
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 8000
  });
  await captureCoverage("FG03 result");

  await gotoState("S01 initial", "?mode=staff&check=css-usage-s01", ".staff-stage");
  await tapMidi(62, 520);
  await captureCoverage("S01 wrong repair");
  for (const midi of [60, 62, 64, 65, 67, 64]) await tapMidi(midi, 420);
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 8000
  });
  await captureCoverage("S01 result");

  await gotoState(
    "S01 mini initial",
    "?mode=staff&session=mini&check=css-usage-s01-mini",
    ".staff-stage"
  );
  await tapMidi(62, 520);
  await captureCoverage("S01 mini wrong repair");

  const stopped = await cdp.send("CSS.stopRuleUsageTracking");
  for (const entry of stopped.ruleUsage || []) {
    const header = headers.get(entry.styleSheetId);
    if (!header?.sourceURL?.includes(targetSheet) || !entry.used) continue;
    if (!sheetTexts.has(entry.styleSheetId)) {
      const result = await cdp.send("CSS.getStyleSheetText", {
        styleSheetId: entry.styleSheetId
      });
      sheetTexts.set(entry.styleSheetId, result.text);
    }
    usedRanges.push({
      start: entry.startOffset,
      end: entry.endOffset,
      state: "final delta",
      sourceURL: header.sourceURL
    });
  }

  const texts = [...sheetTexts.values()];
  const sheetText = texts[0] || "";
  const merged = mergeRanges(usedRanges);
  const usedBytes = merged.reduce((sum, range) => sum + range.end - range.start, 0);
  const result = {
    targetSheet,
    stylesheetBytes: Buffer.byteLength(sheetText, "utf8"),
    stylesheetCharacters: sheetText.length,
    usedRuleOccurrences: usedRanges.length,
    uniqueUsedRanges: merged.length,
    usedCharacters: usedBytes,
    usedCharacterPercent: sheetText.length
      ? Number(((usedBytes / sheetText.length) * 100).toFixed(2))
      : 0,
    visitedStates,
    browserErrors,
    usedRanges: merged
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({
    targetSheet: result.targetSheet,
    stylesheetBytes: result.stylesheetBytes,
    usedRuleOccurrences: result.usedRuleOccurrences,
    uniqueUsedRanges: result.uniqueUsedRanges,
    usedCharacterPercent: result.usedCharacterPercent,
    visitedStateCount: result.visitedStates.length,
    browserErrorCount: result.browserErrors.length,
    outputPath
  }, null, 2));

  if (!sheetText) {
    console.error(`No stylesheet text captured for ${targetSheet}`);
    process.exitCode = 1;
  } else if (browserErrors.length) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
