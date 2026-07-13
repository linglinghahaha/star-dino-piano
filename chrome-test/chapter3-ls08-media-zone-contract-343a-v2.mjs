import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_CHAPTER3_LS08_MEDIA_ZONE_CONTRACT_343A_V2.json";
const screenshotDir = process.argv[4] || "screenshots/chapter3_ls08_media_zones_343a_v2";
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(screenshotDir, { recursive: true });

const expectedStates = [
  "map-entry", "guide-first", "guide-second", "pair-playing", "awaiting-first", "awaiting-second",
  "wrong-first", "wrong-second", "assisted", "sound-paused", "visual-assist", "complete-roots",
  "unscored-low-echo", "reduced-motion"
];
const expectedActualPhases = Object.fromEntries(expectedStates.map((name) => [name, [name === "reduced-motion" ? "guide-first" : name]]));
const viewports = [
  ["ipad-1024x768-dpr1", 1024, 768, 1], ["ipad-1024x768-dpr2", 1024, 768, 2],
  ["ipad-1180x820-dpr2", 1180, 820, 2], ["ipad-pro-11-1194x834-dpr2", 1194, 834, 2],
  ["media-1280x720-dpr1", 1280, 720, 1], ["large-ipad-1366x1024-dpr2", 1366, 1024, 2]
].map(([viewportId, width, height, dpr]) => ({ viewportId, width, height, dpr }));
const sourcePaths = ["chrome-test/chapter3-ls08-media-zone-contract-343a-v2.mjs", "index.html", "app.js", "styles.css", "keyboard-overrides.css", "map-overrides.css", "current-overhaul.css", "chapter3-visible.css"];
const failures = [];
const browserErrors = [];

function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function sourceFile(pathname) { const bytes = fs.readFileSync(pathname); return { path: pathname.replaceAll("\\", "/"), bytes: bytes.length, sha256: sha256(bytes) }; }
function url() { const value = new URL(rootUrl); value.search = "?screen=map&check=chapter3-ls08-media-zones-343a-v2"; return value.toString(); }

function fixture() {
  const completedAt = "2026-07-13T08:00:00.000Z";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05", "LS06", "LS07"].map((id) => [id, { completedAt, stable: true }]));
  return {
    version: 1, active: null,
    history: [
      { sessionId: "C2-03-entry", bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] },
      { sessionId: "C3-06-done", bundleId: "C3-06", status: "ended", completedActions: [{ actionId: "LS07-listening", targetId: "LS07" }] }
    ],
    lastRest: { sessionId: "C3-06-done", bundleId: "C3-06", reward: "两株边界花", reason: "natural-rest", endedAt: completedAt, localDateKey: "2026-07-13" },
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK", equipmentState: "safe-open", airCheckComplete: true, leaves: [true, true, true], lessonEvidence,
      resume: null, ls03QualifiedInputs: 2, completed: false, visibleSliceCompleted: true,
      ls04Completed: true, ls05Completed: true, ls06Completed: true, ls07Completed: true, ls08Completed: false,
      ls05PartialRest: null, ls06PartialRest: null, ls07PartialRest: null, ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0, ls08RemediationRequired: false,
      ls04Attempts: [], ls05Attempts: [], ls06Attempts: [], ls07Attempts: [], ls08Attempts: []
    }
  };
}

async function createPage(browser, viewport, { soundOff = false, reducedMotion = false } = {}) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: viewport.dpr, reducedMotion: reducedMotion ? "reduce" : "no-preference" });
  await context.addInitScript((fixedId) => {
    Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => fixedId });
  }, `ls08-contract-${viewport.viewportId}-${soundOff ? "sound" : (reducedMotion ? "reduced" : "main")}`);
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(`${viewport.viewportId}: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") browserErrors.push(`${viewport.viewportId}: console: ${message.text()}`); });
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(({ runtime, soundOff }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
    localStorage.setItem("starDinoLearningStats", JSON.stringify({ version: 3, levels: {}, notes: {}, staff: {}, retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null } }));
    if (soundOff) localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 }));
  }, { runtime: fixture(), soundOff });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  return { context, page };
}

async function phase(page, name, timeout = 16000) {
  await page.waitForFunction((expected) => {
    if (expected === "map-entry") return document.body.classList.contains("screen-map");
    return document.querySelector("#gardenScene")?.dataset.listeningPhase === expected;
  }, name, { timeout });
}

async function input(page, midi, route = "屏幕") {
  await page.evaluate(({ midi, route }) => { window.handleInput(midi, route); window.releaseGardenInput(midi, route); }, { midi, route });
}

async function start(page) { await page.locator("#gardenRestMarker").click(); await phase(page, "guide-first"); }
async function waitGuideAwaiting(page) {
  await page.waitForFunction(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt;
    return ["guide-first", "guide-second"].includes(attempt?.phase) && attempt.guideAudioPlaying === false;
  }, null, { timeout: 16000 });
}
async function guide(page) { await waitGuideAwaiting(page); await input(page, 60); await phase(page, "guide-second"); await waitGuideAwaiting(page); await input(page, 62); await phase(page, "pair-playing"); }

async function answer(page, pair) {
  await phase(page, "awaiting-first");
  await input(page, pair[0]);
  await phase(page, "awaiting-second");
  await input(page, pair[1]);
}

async function snapshot(page, viewport, stateName) {
  const geometry = await page.evaluate(({ stateName }) => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element || element.hidden) return null;
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (box.width <= 0 || box.height <= 0 || style.display === "none" || style.visibility === "hidden") return null;
      return { x: +box.x.toFixed(2), y: +box.y.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2) };
    };
    const domPhase = stateName === "map-entry" ? (document.body.classList.contains("screen-map") ? "map-entry" : "") : (document.querySelector("#gardenScene")?.dataset.listeningPhase || "");
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt || null;
    const keyboardCarriers = [...document.querySelectorAll("#keyboard .white-key")].filter((key) => key.getAttribute("data-target-note") === "true" || /(?:^|\s)target(?:-muted)?(?:\s|$)/.test(key.className) || key.style.getPropertyValue("--target-color") || key.style.getPropertyValue("--target-glow") || key.style.getPropertyValue("--target-soft")).length;
    const slots = [...document.querySelectorAll("#pairedListeningWorld .paired-listening-endpoint")].map((slot) => slot.getAttribute("data-note"));
    const aria = [...document.querySelectorAll("#gardenPanel [aria-label], #gardenPanel [title], #gardenPanel [alt]")].map((node) => `${node.getAttribute("aria-label") || ""} ${node.getAttribute("title") || ""} ${node.getAttribute("alt") || ""}`).join(" ");
    const hiddenState = ["pair-playing", "awaiting-first"].includes(stateName);
    const hiddenTargetCarrier = hiddenState ? keyboardCarriers + slots.filter(Boolean).length + (/(Do|Re|Mi|C\s*[-/→]\s*D|E\s*[-/→]\s*D|C\s*[-/→]\s*C|D\s*[-/→]\s*E)/.test(aria) ? 1 : 0) : 0;
    return {
      phase: domPhase,
      repairStage: document.querySelector("#gardenScene")?.dataset.repairStage || "",
      viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
      zones: {
        map: rect("#mapShell"), panel: rect("#gardenPanel"), speech: rect("#gardenSpeech"), character: rect("#gardenXingya"),
        source: rect("#listeningSource"), world: rect("#pairedListeningWorld"), compare: rect("#ls05Compare"),
        replay: rect("#listeningReplay"), progress: rect("#listeningCallProgress"), keyboard: rect("#keyboard")
      },
      hiddenTargetCarrier,
      keyboardCarriers,
      slotNotes: slots,
      pairIndex: attempt?.pairIndex ?? null,
      neutralProgress: attempt?.neutralProgress ?? 0,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches
    };
  }, { stateName });
  const expected = stateName === "reduced-motion" ? "guide-first" : stateName;
  if (geometry.phase !== expected) failures.push({ viewportId: viewport.viewportId, stateName, kind: "phase-mismatch", expected, actual: geometry.phase });
  if (geometry.viewport.scrollWidth > geometry.viewport.width + 1 || geometry.viewport.scrollHeight > geometry.viewport.height + 1) failures.push({ viewportId: viewport.viewportId, stateName, kind: "overflow", viewport: geometry.viewport });
  if (["pair-playing", "awaiting-first"].includes(stateName) && geometry.hiddenTargetCarrier !== 0) failures.push({ viewportId: viewport.viewportId, stateName, kind: "hidden-target-carrier", count: geometry.hiddenTargetCarrier });
  if (!geometry.zones.map && (!geometry.zones.panel || !geometry.zones.keyboard || !geometry.zones.world)) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-protected-zone", zones: geometry.zones });
  const screenshotName = `${viewport.viewportId}_${stateName}.png`;
  await page.screenshot({ path: path.join(screenshotDir, screenshotName), fullPage: false, animations: "disabled" });
  return { stateName, expectedActualPhases: expectedActualPhases[stateName], geometry, screenshot: screenshotName };
}

async function capturePrimary(browser, viewport) {
  const { context, page } = await createPage(browser, viewport);
  const states = [];
  states.push(await snapshot(page, viewport, "map-entry"));
  await start(page);
  states.push(await snapshot(page, viewport, "guide-first"));
  await waitGuideAwaiting(page);
  await input(page, 60);
  await phase(page, "guide-second");
  states.push(await snapshot(page, viewport, "guide-second"));
  await waitGuideAwaiting(page);
  await input(page, 62);
  await phase(page, "pair-playing");
  states.push(await snapshot(page, viewport, "pair-playing"));
  await phase(page, "awaiting-first");
  states.push(await snapshot(page, viewport, "awaiting-first"));
  const runtime = await page.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime")));
  const attempt = runtime.active.actions[0].listeningAttempt;
  const target = attempt.sequence[0];
  await input(page, target[0]);
  await phase(page, "awaiting-second");
  states.push(await snapshot(page, viewport, "awaiting-second"));
  const wrongSecond = target[1] === 60 ? 62 : 60;
  await input(page, wrongSecond);
  await phase(page, "wrong-second");
  states.push(await snapshot(page, viewport, "wrong-second"));
  await context.close();
  return states;
}

async function captureWrongAndAssist(browser, viewport) {
  const { context, page } = await createPage(browser, viewport);
  const states = [];
  await start(page); await guide(page); await phase(page, "awaiting-first");
  let runtime = await page.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime")));
  const target = runtime.active.actions[0].listeningAttempt.sequence[0];
  const wrongFirst = target[0] === 60 ? 62 : 60;
  for (let round = 1; round <= 3; round += 1) {
    await answer(page, [wrongFirst, target[1]]);
    await phase(page, round === 1 ? "wrong-first" : (round === 2 ? "pair-compare" : "assisted"));
    if (round === 1) states.push(await snapshot(page, viewport, "wrong-first"));
    if (round < 3) await phase(page, "awaiting-first");
  }
  await page.waitForFunction(() => !document.querySelector("#ls05VisualAssist")?.hidden, null, { timeout: 16000 });
  states.push(await snapshot(page, viewport, "assisted"));
  await page.locator("#ls05VisualAssist").click();
  await phase(page, "visual-assist");
  states.push(await snapshot(page, viewport, "visual-assist"));
  await context.close();
  return states;
}

async function captureSound(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { soundOff: true });
  await page.locator("#gardenRestMarker").click();
  await phase(page, "sound-paused");
  const state = await snapshot(page, viewport, "sound-paused");
  await context.close();
  return [state];
}

async function captureComplete(browser, viewport) {
  const { context, page } = await createPage(browser, viewport);
  const states = [];
  await start(page); await guide(page);
  while (true) {
    const runtime = await page.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime")));
    const attempt = runtime.active?.actions?.[0]?.listeningAttempt;
    if (!attempt || attempt.phase === "complete-roots") break;
    if (attempt.phase === "pair-playing") await phase(page, "awaiting-first");
    const next = await page.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime")).active.actions[0].listeningAttempt);
    if (next.phase === "awaiting-first") await answer(page, next.sequence[next.pairIndex]);
  }
  await phase(page, "complete-roots");
  states.push(await snapshot(page, viewport, "complete-roots"));
  await phase(page, "unscored-low-echo");
  states.push(await snapshot(page, viewport, "unscored-low-echo"));
  await context.close();
  return states;
}

async function captureReduced(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { reducedMotion: true });
  await start(page);
  const state = await snapshot(page, viewport, "reduced-motion");
  if (!state.geometry.reducedMotion) failures.push({ viewportId: viewport.viewportId, stateName: "reduced-motion", kind: "motion-preference-not-active" });
  await context.close();
  return [state];
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const viewportRecords = [];
for (const viewport of viewports) {
  const states = [
    ...(await capturePrimary(browser, viewport)),
    ...(await captureWrongAndAssist(browser, viewport)),
    ...(await captureSound(browser, viewport)),
    ...(await captureComplete(browser, viewport)),
    ...(await captureReduced(browser, viewport))
  ];
  const ordered = expectedStates.map((stateName) => states.find((state) => state.stateName === stateName)).filter(Boolean);
  for (const stateName of expectedStates) if (!ordered.some((state) => state.stateName === stateName)) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-state" });
  viewportRecords.push({ ...viewport, states: ordered });
}
await browser.close();

const core = {
  coordinateContractId: "chapter3-ls08-media-zones-overhaul-343a-v2",
  prototypeBaseline: "overhaul-343a",
  buildIdentity: "overhaul-343a-p2",
  runtimeIntegrationAllowed: false,
  deviceValidation: "missing",
  expectedStates,
  expectedActualPhases,
  sourceFiles: sourcePaths.map(sourceFile),
  viewports: viewportRecords,
  failures,
  browserErrors
};
const contractSha256 = sha256(JSON.stringify(core));
const contract = { ...core, generatedAt: new Date().toISOString(), contractSha256, status: failures.length || browserErrors.length ? "failed" : "browser_coordinate_contract_passed_device_unverified" };
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(JSON.stringify({ id: contract.coordinateContractId, status: contract.status, sha256: contractSha256, viewports: viewportRecords.length, states: expectedStates.length, failures, browserErrors, outputPath }, null, 2));
if (failures.length || browserErrors.length) process.exit(1);
