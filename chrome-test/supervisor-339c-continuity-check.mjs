import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/supervisor_339c";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function mapUrl() {
  const url = new URL(baseUrl);
  url.search = "?screen=map";
  return url.toString();
}

function seedRuntime() {
  return {
    version: 1,
    active: null,
    history: [{
      sessionId: "C2-03-supervisor-entry",
      bundleId: "C2-03",
      status: "ended",
      actionIndex: 0,
      actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
      completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
      endedAt: "2026-07-12T06:00:00.000Z",
      endReason: "natural-rest"
    }],
    lastRest: null
  };
}

async function snapshot(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active?.actionIndex || 0] || null;
    return {
      screen: document.body.className,
      active: runtime.active || null,
      history: runtime.history || [],
      chapter3: runtime.chapter3 || null,
      action,
      markerStrong: document.querySelector("#gardenRestMarker strong")?.textContent || "",
      markerSmall: document.querySelector("#gardenRestMarker small")?.textContent || "",
      markerAria: document.querySelector("#gardenRestMarker")?.getAttribute("aria-label") || "",
      airState: document.querySelector("#gardenScene")?.dataset.airState || "",
      repairStage: document.querySelector("#gardenScene")?.dataset.repairStage || "",
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || ""
    };
  });
}

async function waitGardenAirState(page, airState, timeout = 10000) {
  await page.waitForFunction((expected) => document.querySelector("#gardenScene")?.dataset.airState === expected, airState, { timeout });
}

async function waitGardenTeachingPhase(page, phase, timeout = 12000) {
  await page.waitForFunction((expected) => document.querySelector("#gardenScene")?.dataset.teachingAudioPhase === expected, phase, { timeout });
}

async function waitGardenResponseArmed(page, timeout = 12000) {
  await page.waitForFunction(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0];
    const audioAttempt = action?.gardenAttempt?.audioAttempt;
    return audioAttempt?.phase === "awaiting-response" && audioAttempt.inputArmed === true && Boolean(audioAttempt.audioTransaction?.endedAt);
  }, null, { timeout });
}

async function waitForMap(page, timeout = 12000) {
  await page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout });
}

async function waitForGarden(page, timeout = 12000) {
  await page.waitForFunction(() => document.body.classList.contains("screen-garden"), null, { timeout });
}

async function waitGardenAssistedRetry(page, timeout = 12000) {
  await page.waitForFunction(() => {
    const scene = document.querySelector("#gardenScene");
    return scene?.dataset.repairStage === "assisted" && scene.dataset.teachingAudioPhase === "awaiting-response";
  }, null, { timeout });
}

async function prepareCase(page, { stage, wrong }) {
  if (stage === "sealed" || stage === "scanning") {
    await waitGardenAirState(page, stage);
    return;
  }
  if (stage === "model-playing") await waitGardenTeachingPhase(page, "model-playing");
  if (stage === "awaiting-response" || wrong) await waitGardenTeachingPhase(page, "awaiting-response");
  if (wrong) {
    await page.locator('.key.white-key[data-midi="62"]').click();
    await waitGardenTeachingPhase(page, "wrong-repair-playing");
  }
}

async function runCase({ id, stage, wrong }) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ id, type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => browserErrors.push({ id, type: "pageerror", text: error.message }));

  await page.goto(mapUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.evaluate((runtime) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
  }, seedRuntime());
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.locator("#gardenRestMarker").click();
  await prepareCase(page, { stage, wrong });

  const beforeReturn = await snapshot(page);
  const originalSessionId = beforeReturn.active?.sessionId;
  await page.locator("#mapReturn").click();
  await waitForMap(page);
  const paused = await snapshot(page);

  const noFalseProgress = paused.chapter3?.leaves?.[0] === false &&
    !paused.chapter3?.lessonEvidence?.LS01 &&
    !paused.chapter3?.resume?.nextTargetId &&
    !(paused.active?.completedActions || []).some((item) => item.targetId === "LS01") &&
    !paused.history.some((item) => item.bundleId === "C3-01");
  record(`${id}: return preserves unfinished LS01`,
    paused.screen.includes("screen-map") &&
      paused.active?.sessionId === originalSessionId &&
      paused.active?.bundleId === "C3-01" &&
      paused.action?.targetId === "LS01" &&
      noFalseProgress,
    { beforeReturn, paused });
  record(`${id}: map copy matches paused first leaf`,
    paused.markerStrong === "第一片叶" &&
      paused.markerSmall === "继续第一片叶" &&
      paused.markerAria === "第一片叶，继续第一片叶",
    paused);

  await page.locator("#gardenRestMarker").click();
  await waitForGarden(page);
  const resumed = await snapshot(page);
  record(`${id}: re-entry resumes the same LS01 session`,
    resumed.screen.includes("screen-garden") &&
      resumed.active?.sessionId === originalSessionId &&
      resumed.action?.targetId === "LS01" &&
      resumed.chapter3?.leaves?.[0] === false &&
      !resumed.chapter3?.lessonEvidence?.LS01 &&
      !resumed.chapter3?.resume?.nextTargetId,
    { originalSessionId, resumed });
  await page.screenshot({ path: path.join(screenshotDir, `${id}_resumed_1024x768.png`) });
  await context.close();
}

await runCase({ id: "sealed", stage: "sealed", wrong: false });
await runCase({ id: "scanning", stage: "scanning", wrong: false });
await runCase({ id: "safe-open-zero-input", stage: "model-playing", wrong: false });
await runCase({ id: "one-wrong", stage: "awaiting-response", wrong: true });

async function runCrossNavigationErrorCase() {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ id: "cross-navigation-errors", type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => browserErrors.push({ id: "cross-navigation-errors", type: "pageerror", text: error.message }));

  await page.goto(mapUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.evaluate((runtime) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
  }, seedRuntime());
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.locator("#gardenRestMarker").click();
  await waitGardenResponseArmed(page);
  await page.locator('.key.white-key[data-midi="62"]').click();
  await waitGardenTeachingPhase(page, "wrong-repair-playing");
  const originalSessionId = (await snapshot(page)).active?.sessionId;
  await page.locator("#mapReturn").click();
  await waitForMap(page);
  await page.locator("#gardenRestMarker").click();
  await waitForGarden(page);
  await waitGardenResponseArmed(page);
  await page.locator('.key.white-key[data-midi="64"]').click();
  await waitGardenTeachingPhase(page, "wrong-repair-playing");
  await waitGardenAssistedRetry(page);
  const afterSecondError = await snapshot(page);

  record("Two LS01 errors remain cumulative across ordinary map navigation",
    afterSecondError.active?.sessionId === originalSessionId &&
      afterSecondError.repairStage === "assisted" &&
      afterSecondError.speech.includes("陪你再试一次"),
    { originalSessionId, afterSecondError });
  await page.screenshot({ path: path.join(screenshotDir, "cross-navigation-second-error_1024x768.png") });
  await context.close();
}

await runCrossNavigationErrorCase();

record("Supervisor continuity run has no browser warnings or errors", browserErrors.length === 0, { browserErrors });
await browser.close();

const failed = checks.filter((check) => !check.pass);
console.log(JSON.stringify({ passed: checks.length - failed.length, total: checks.length, failed, browserErrors }, null, 2));
if (failed.length) process.exit(1);
