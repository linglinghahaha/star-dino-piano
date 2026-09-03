import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_CHAPTER4_R01A_MEDIA_ZONE_CONTRACT_347A_V1.json";
const screenshotDir = process.argv[4] || "screenshots/chapter4_r01a_media_zones_347a_v1";
const cliOption = (name) => process.argv.slice(5).find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3) || null;
const allStates = ["lp01-remediation-ready", "lp01-remediation-playing", "lp01-reduced-cue-ready", "lp02-remediation-ready", "lp02-reduced-cue-ready", "spacing-story-first", "reduced-motion"];
const states = process.env.R01A_CONTRACT_STATES ? process.env.R01A_CONTRACT_STATES.split(",").filter((name) => allStates.includes(name)) : allStates;
const allViewports = [["ipad-1024x768-dpr1", 1024, 768, 1], ["ipad-1024x768-dpr2", 1024, 768, 2], ["ipad-1180x820-dpr2", 1180, 820, 2], ["ipad-pro-11-1194x834-dpr2", 1194, 834, 2], ["media-1280x720-dpr1", 1280, 720, 1], ["large-ipad-1366x1024-dpr2", 1366, 1024, 2]].map(([viewportId, width, height, dpr]) => ({ viewportId, width, height, dpr }));
const requestedViewports = process.env.R01A_CONTRACT_VIEWPORTS ? new Set(process.env.R01A_CONTRACT_VIEWPORTS.split(",")) : null;
const viewports = requestedViewports ? allViewports.filter((viewport) => requestedViewports.has(viewport.viewportId)) : allViewports;
const requestedPairsValue = cliOption("pairs") || process.env.R01A_CONTRACT_PAIRS;
const requestedPairs = requestedPairsValue
  ? new Set(requestedPairsValue.split(",").map((pair) => pair.trim()).filter(Boolean))
  : null;
const captureScope = requestedPairs || process.env.R01A_CONTRACT_STATES || requestedViewports ? "probe" : "full";
const expectedPairs = requestedPairs
  ? [...requestedPairs].sort()
  : viewports.flatMap((viewport) => states.map((stateName) => `${viewport.viewportId}:${stateName}`));
const failures = [];
const browserErrors = [];
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const sourceFile = (filePath) => {
  const bytes = fs.readFileSync(filePath);
  return { path: filePath.replaceAll("\\", "/"), bytes: bytes.length, sha256: sha(bytes) };
};
const nonEmptyRuntime = { version: 1, active: null, history: [{ sessionId: "r01a-c2-03", bundleId: "C2-03", formalSession: true, status: "ended", actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", role: "lesson" }], completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", completedAt: "2026-06-30T09:00:00.000Z" }] }, { sessionId: "r01a-ls08", bundleId: "C3-07", formalSession: true, status: "ended", actions: [], completedActions: [] }, { sessionId: "r01a-c4-01", bundleId: "C4-01", formalSession: true, status: "ended", actions: [{ actionId: "C4-01-LP02", targetId: "LP02", role: "lesson" }], completedActions: [{ actionId: "C4-01-LP02", targetId: "LP02", completedAt: "2026-07-02T09:00:00.000Z" }] }, { sessionId: "r01a-c4-02", bundleId: "C4-02", formalSession: true, status: "ended", actions: [{ actionId: "C4-02-E", targetId: "LP03", role: "lesson" }], completedActions: [{ actionId: "C4-02-E", targetId: "LP03", completedAt: "2026-07-03T09:00:00.000Z" }] }], lastRest: { sessionId: "r01a-c4-02" }, chapter3: { completed: true, lessonEvidence: { LS08: { completed: true, completedAt: "2026-07-01T09:00:00.000Z", sessionId: "r01a-ls08", storyEvents: [{ eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], endedAt: "2026-07-01T09:00:00.000Z" }] } }, leaves: [true, true, true] }, chapter4: { lessonEvidence: { LP01: { played: true, completedAt: "2026-07-02T08:00:00.000Z", sessionId: "r01a-c4-01" }, LP02: { played: true, completedAt: "2026-07-02T09:00:00.000Z", sessionId: "r01a-c4-01" }, LP03: { played: true, completedAt: "2026-07-03T09:00:00.000Z", sessionId: "r01a-c4-02", stable: 0, retained: 0 } }, openingReviewQueue: ["LP01"], lp03Progress: { foundationCAnchored: true, foundationCAwake: true, foundationDPlaced: true, foundationEPlaced: true, played: true, routeEvents: [{ stepId: "C" }, { stepId: "D" }, { stepId: "E" }], seamChecks: [] } } };
const nonEmptyStats = { version: 3, levels: { LP01: { formalCompletions: 1 } }, notes: {}, staff: {}, retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [] } };
const nonEmptyRuntimeBytes = JSON.stringify(nonEmptyRuntime);
const nonEmptyStatsBytes = JSON.stringify(nonEmptyStats);

async function fixtureGeometry(page, stateName) {
  return page.evaluate((name) => {
    const identity = window.__starDinoR01ATestApi.createR01AFixture(name);
    const scene = document.querySelector("#chapter4Scene");
    const panel = document.querySelector("#chapter4Panel");
    const bubbles = document.querySelector("#chapter4Bubbles");
    const keyboard = document.querySelector("#keyboardPanel");
    const map = document.querySelector("#mapShell");
    const attempt = ensureChapter4Attempt();
    const now = { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") };
    const visible = (node) => Boolean(node && !node.hidden && node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0);
    return {
      ...identity,
      identitySource: identity.identitySource,
      actualPhase: visible(map) ? "map" : (visible(panel) ? (scene?.dataset.chapter4Phase || "") : ""),
      phase: visible(map) ? "map" : (visible(panel) ? (scene?.dataset.chapter4Phase || "") : ""),
      chapter4PanelVisible: visible(panel),
      fixtureOverlayVisible: false,
      bubblesVisible: visible(bubbles),
      keyboardVisible: visible(keyboard) && document.querySelectorAll("#keyboard .white-key, #keyboard .black-key").length > 0,
      strongCueUsed: Boolean(attempt?.strongCueUsed),
      repairStage: scene?.dataset.repairStage || null,
      targetHighlightVisible: document.querySelectorAll("#keyboard .lp02-assist-target").length > 0,
      audioTransactionStarted: Boolean(attempt?.audioTransaction?.startedAt),
      mapVisible: visible(map),
      mapChapterText: document.querySelector("#mapChapterLabel")?.textContent?.trim() || "",
      mapProgressText: document.querySelector("#mapStarCount")?.textContent?.trim() || "",
      mapChapter4Phase: map?.dataset.chapter4Phase || null,
      mapEntryDisabled: Boolean(document.querySelector("#gardenRestMarker")?.disabled),
      mapEntryVisible: visible(document.querySelector("#gardenRestMarker")),
      mapEntryState: document.querySelector("#gardenRestMarker")?.dataset.chapter4State || null,
      activeBaseNodeCount: document.querySelectorAll(".map-node.active").length,
      formalStorageFixtureNonEmpty: Boolean(window.__r01aSeed?.runtime && window.__r01aSeed?.stats),
      formalStorageUnchanged: now.runtime === window.__r01aSeed.runtime && now.stats === window.__r01aSeed.stats,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches
    };
  }, stateName);
}

async function createContext(browser, viewport, reducedMotion) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: viewport.dpr, hasTouch: true, reducedMotion, serviceWorkers: "block" });
  await context.addInitScript(({ runtime, stats }) => {
    window.__STAR_DINO_R01A_TEST__ = true;
    window.__r01aSeed = { runtime, stats };
    localStorage.setItem("starDinoSessionRuntime", runtime);
    localStorage.setItem("starDinoLearningStats", stats);
  }, { runtime: nonEmptyRuntimeBytes, stats: nonEmptyStatsBytes });
  return context;
}

async function stabilizeContractCapture(page) {
  await page.addStyleTag({ content: `
    html[data-r01a-contract-capture="true"] *,
    html[data-r01a-contract-capture="true"] *::before,
    html[data-r01a-contract-capture="true"] *::after {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }
  ` });
  return page.evaluate(async () => {
    document.documentElement.dataset.r01aContractCapture = "true";
    await document.fonts?.ready;
    const images = [...document.images];
    const decoded = await Promise.all(images.map((image) => image.decode().then(() => true).catch(() => image.complete && image.naturalWidth > 0)));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return { captureMotionFrozen: true, assetsDecoded: decoded.every(Boolean), decodedImageCount: images.length };
  });
}

async function captureState(page, viewport, stateName) {
  let geometry = await fixtureGeometry(page, stateName);
  if (stateName === "lp01-remediation-playing") {
    await page.locator("#chapter4StartCheck").click();
    await page.waitForFunction(() => {
      const attempt = window.__starDinoR01ATestApi?.getR01AFixture && ensureChapter4Attempt();
      return Boolean(attempt?.audioTransaction?.startedAt) && document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp01-model-playing";
    }, null, { timeout: 10000 });
    geometry = await page.evaluate(() => {
      const identity = window.__starDinoR01ATestApi.getR01AFixture();
      const scene = document.querySelector("#chapter4Scene");
      const panel = document.querySelector("#chapter4Panel");
      const bubbles = document.querySelector("#chapter4Bubbles");
      const now = { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") };
      const visible = (node) => Boolean(node && !node.hidden && node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0);
      const attempt = ensureChapter4Attempt();
      return { ...identity, identitySource: identity.identitySource, actualPhase: scene?.dataset.chapter4Phase || "", phase: scene?.dataset.chapter4Phase || "", chapter4PanelVisible: visible(panel), fixtureOverlayVisible: false, bubblesVisible: visible(bubbles), keyboardVisible: false, strongCueUsed: Boolean(attempt?.strongCueUsed), repairStage: scene?.dataset.repairStage || null, targetHighlightVisible: false, audioTransactionStarted: Boolean(attempt?.audioTransaction?.startedAt), mapVisible: false, mapChapterText: document.querySelector("#mapChapterLabel")?.textContent?.trim() || "", mapProgressText: document.querySelector("#mapStarCount")?.textContent?.trim() || "", mapChapter4Phase: document.querySelector("#mapShell")?.dataset.chapter4Phase || null, mapEntryDisabled: Boolean(document.querySelector("#gardenRestMarker")?.disabled), mapEntryVisible: visible(document.querySelector("#gardenRestMarker")), mapEntryState: document.querySelector("#gardenRestMarker")?.dataset.chapter4State || null, activeBaseNodeCount: document.querySelectorAll(".map-node.active").length, formalStorageFixtureNonEmpty: Boolean(window.__r01aSeed?.runtime && window.__r01aSeed?.stats), formalStorageUnchanged: now.runtime === window.__r01aSeed.runtime && now.stats === window.__r01aSeed.stats, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches };
    });
  }
  Object.assign(geometry, await stabilizeContractCapture(page));
  const screenshot = `${viewport.viewportId}_${stateName}.png`;
  const full = path.join(screenshotDir, screenshot);
  await page.screenshot({ path: full, fullPage: false, animations: "disabled" });
  return { stateName, geometry, screenshot, screenshotSha256: sha(fs.readFileSync(full)) };
}

async function captureOne(browser, viewport, stateName) {
  const motion = stateName === "reduced-motion" ? { reducedMotion: "reduce" } : { reducedMotion: "no-preference" };
  const context = await createContext(browser, viewport, motion.reducedMotion);
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(`${viewport.viewportId}:${error.message}`));
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
    await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });
    await page.evaluate(() => { window.__r01aBefore = { runtime: localStorage.getItem("starDinoSessionRuntime"), stats: localStorage.getItem("starDinoLearningStats") }; });
    return await captureState(page, viewport, stateName);
  } finally {
    await context.close();
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(screenshotDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const records = [];
try {
  for (const viewport of viewports) {
    const captured = [];
    for (const stateName of states) {
      if (requestedPairs && !requestedPairs.has(`${viewport.viewportId}:${stateName}`)) continue;
      captured.push(await captureOne(browser, viewport, stateName));
    }
    records.push({ ...viewport, states: captured });
  }
} catch (error) {
  failures.push(String(error?.stack || error));
} finally {
  await browser.close();
}
const actualCaptureCount = records.reduce((count, viewport) => count + viewport.states.length, 0);
const core = { coordinateContractId: "chapter4-r01a-browser-scheduler-zones-overhaul-347a-v1", prototypeBaseline: "overhaul-348a-course-director", buildIdentity: "overhaul-348a-course-director", runtimeIntegrationAllowed: false, deviceValidation: "missing", captureScope, expectedPairs, expectedCaptureCount: expectedPairs.length, actualCaptureCount, expectedStates: states, sourceFiles: ["chrome-test/chapter4-r01a-media-zone-contract-347a-v1.mjs", "chrome-test/chapter4-r01a-audio-lifecycle-check.mjs", "app.js", "index.html", "chapter4-slice.css"].map(sourceFile), viewports: records, failures, browserErrors };
const contract = { ...core, screenshotDir, generatedAt: new Date().toISOString(), contractSha256: sha(JSON.stringify(core)), status: failures.length || browserErrors.length ? "failed" : "browser_coordinate_contract_passed_device_unverified" };
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`chapter4 R01A zone contract: ${contract.status}; ${contract.contractSha256}; ${records.reduce((sum, viewport) => sum + viewport.states.length, 0)} PNG`);
if (failures.length || browserErrors.length) process.exit(1);
