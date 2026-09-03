import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";
import { completeParentChallenge } from "./parental-challenge-helper.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const levelId = process.argv[3] === "LS07" ? "LS07" : "LS06";
const outputPath = process.argv[4] || `docs/30_CHAPTER3_${levelId}_MEDIA_ZONE_CONTRACT_342A_V1.json`;
const screenshotDir = process.argv[5] || `screenshots/chapter3_${levelId.toLowerCase()}_media_zones_342a_v1`;
const levelConfig = levelId === "LS06"
  ? { bundleId: "C3-05", candidates: [60, 67], prerequisite: null }
  : { bundleId: "C3-06", candidates: [64, 65], prerequisite: "LS06" };
const clearanceMarginPx = 24;
const alphaThreshold = 8;
const navigationTimeoutMs = 30000;
const bootTimeoutMs = 30000;
const expectedStates = [
  "map-entry",
  "visible-guide",
  "visible-guide-soft-replay",
  "guide-rest",
  "target-playing",
  "awaiting-response",
  "sound-paused",
  "visual-assist",
  "wrong-known",
  "pair-compare",
  "assisted-retry",
  "complete",
  "reduced-motion"
];
const expectedActualPhases = {
  "map-entry": ["map"],
  "visible-guide": ["visible-guide"],
  "visible-guide-soft-replay": ["visible-guide"],
  "guide-rest": ["guide-rest"],
  "target-playing": ["target-playing"],
  "awaiting-response": ["awaiting-response"],
  "sound-paused": ["sound-paused"],
  "visual-assist": ["visual-assist"],
  "wrong-known": ["wrong-known"],
  "pair-compare": ["pair-compare"],
  "assisted-retry": ["assisted-retry"],
  complete: ["complete"],
  "reduced-motion": ["visible-guide", "target-playing", "awaiting-response"]
};
const expectedRepairStages = {
  "visible-guide": ["none"],
  "visible-guide-soft-replay": ["soft-replay"]
};

const viewports = [
  ["ipad-1024x768-dpr1", 1024, 768, 1],
  ["ipad-1024x768-dpr2", 1024, 768, 2],
  ["ipad-1180x820-dpr2", 1180, 820, 2],
  ["ipad-pro-11-1194x834-dpr2", 1194, 834, 2],
  ["media-1280x720-dpr1", 1280, 720, 1],
  ["large-ipad-1366x1024-dpr2", 1366, 1024, 2]
].map(([viewportId, width, height, dpr]) => ({ viewportId, width, height, dpr }));

const sourcePaths = [
  "chrome-test/chapter3-paired-media-zone-contract-342a-v1.mjs",
  "index.html",
  "app.js",
  "styles.css",
  "keyboard-overrides.css",
  "map-overrides.css",
  "current-overhaul.css",
  "chapter3-visible.css"
];

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sourceFile(pathname) {
  const bytes = fs.readFileSync(pathname);
  return { path: pathname.replaceAll("\\", "/"), bytes: bytes.length, sha256: sha256(bytes) };
}

function url(search = `?screen=map&check=chapter3-${levelId.toLowerCase()}-media-zones-342a-v1`) {
  const value = new URL(rootUrl);
  value.search = search;
  return value.toString();
}

async function navigationDiagnostics(page, stage, targetUrl) {
  const fallback = { stage, targetUrl, pageUrl: page.url(), pageStateUnavailable: true };
  try {
    return await page.evaluate(async ({ stage, targetUrl }) => {
      const boot = document.querySelector("#bootLoader");
      const bootStyle = boot ? getComputedStyle(boot) : null;
      let cacheNames = [];
      try {
        cacheNames = "caches" in window ? await caches.keys() : [];
      } catch (error) {
        cacheNames = [`cache-read-failed:${error?.message || error}`];
      }
      return {
        stage,
        targetUrl,
        pageUrl: location.href,
        readyState: document.readyState,
        boot: boot ? {
          hidden: boot.hidden,
          display: bootStyle?.display || "",
          visibility: bootStyle?.visibility || "",
          opacity: bootStyle?.opacity || ""
        } : null,
        serviceWorker: {
          supported: "serviceWorker" in navigator,
          controlled: Boolean(navigator.serviceWorker?.controller),
          controllerUrl: navigator.serviceWorker?.controller?.scriptURL || ""
        },
        cacheNames
      };
    }, { stage, targetUrl });
  } catch (error) {
    return { ...fallback, diagnosticError: error?.message || String(error) };
  }
}

async function navigate(page, targetUrl, { stage, reload = false, waitForBoot = true } = {}) {
  try {
    if (reload) {
      await page.reload({ waitUntil: "domcontentloaded", timeout: navigationTimeoutMs });
    } else {
      await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: navigationTimeoutMs });
    }
    if (waitForBoot) {
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: bootTimeoutMs });
    }
  } catch (error) {
    const diagnostics = await navigationDiagnostics(page, stage || (reload ? "reload" : "goto"), targetUrl);
    throw new Error(`Navigation failed: ${JSON.stringify(diagnostics)}`, { cause: error });
  }
}

function fixture() {
  const lessonEvidence = {
    LS01: { completedAt: "2026-07-11T01:00:00.000Z" },
    LS02: { completedAt: "2026-07-11T01:05:00.000Z" },
    LS03: { completedAt: "2026-07-11T01:10:00.000Z" },
    LS04: { completedAt: "2026-07-11T01:20:00.000Z", stable: true },
    LS05: { completedAt: "2026-07-11T01:30:00.000Z", stable: true }
  };
  if (levelConfig.prerequisite) lessonEvidence[levelConfig.prerequisite] = { completedAt: "2026-07-11T01:40:00.000Z", stable: true };
  return {
    version: 1,
    active: null,
    history: canonicalC1C2History({ completedAt: "2026-07-11T01:00:00.000Z", tag: `chapter3-${levelId.toLowerCase()}-zones` }),
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence,
      resume: null,
      ls03QualifiedInputs: 2,
      completed: false,
      visibleSliceCompleted: true,
      ls04Completed: true,
      ls05Completed: true,
      ls06Completed: levelId === "LS07",
      ls07Completed: false,
      ls04Attempts: [],
      ls05Attempts: [],
      ls06Attempts: [],
      ls07Attempts: []
    }
  };
}

async function seed(page) {
  const targetUrl = url();
  await navigate(page, targetUrl, { stage: "seed-initial-goto", waitForBoot: false });
  await page.evaluate((runtime) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
  }, fixture());
  await navigate(page, targetUrl, { stage: "seed-runtime-reload", reload: true });
}

async function phase(page, names, timeout = 12000) {
  const values = Array.isArray(names) ? names : [names];
  try {
    await page.waitForFunction((wanted) => {
      const domPhase = document.querySelector("#gardenScene")?.dataset.listeningPhase || "";
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const attemptPhase = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt?.phase || "";
      if (!wanted.includes(domPhase)) return false;
      if (domPhase === "complete") {
        const panel = document.querySelector("#gardenPanel");
        const rect = panel?.getBoundingClientRect();
        return Boolean(panel && !panel.hidden && rect && rect.width > 0 && rect.height > 0);
      }
      return wanted.includes(attemptPhase);
    }, values, { timeout });
  } catch (error) {
    const diagnostics = await page.evaluate(() => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const active = runtime.active || null;
      const listeningAttempt = active?.actions?.[active.actionIndex || 0]?.listeningAttempt || null;
      return {
        url: location.href,
        domPhase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
        listeningAttempt,
        activeSessionId: active?.sessionId || "",
        audioState: document.documentElement.dataset.audioState || ""
      };
    });
    throw new Error(`Timed out waiting for listening phase ${values.join("|")} after ${timeout}ms: ${JSON.stringify(diagnostics)}`, { cause: error });
  }
}

async function attempt(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    return runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt || null;
  });
}

async function press(page, midi) {
  const key = page.locator(`.white-key[data-midi="${midi}"]`);
  await key.waitFor({ state: "visible", timeout: 12000 });
  await key.click({ timeout: 12000 });
}

async function waitForGuideInputArm(page, guideIndex) {
  await page.waitForFunction((expectedGuideIndex) => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt;
    return attempt?.phase === "visible-guide" && attempt.guideIndex === expectedGuideIndex &&
      attempt.guideInputArmed === true && Boolean(attempt.audioTransaction?.endedAt);
  }, guideIndex, { timeout: 12000 });
}

async function waitForResponseInputArm(page) {
  await page.waitForFunction(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt;
    return ["awaiting-response", "assisted-retry", "visual-assist"].includes(attempt?.phase) &&
      attempt.inputArmed === true && Boolean(attempt.audioTransaction?.endedAt);
  }, null, { timeout: 12000 });
}

async function geometry(page, stateName, allowedPhases = expectedActualPhases[stateName], timeout = 12000) {
  const allowedRepairStages = expectedRepairStages[stateName] || null;
  return page.evaluate(async ({ stateName, margin, allowedPhases, allowedRepairStages, timeout }) => {
    const currentPhase = () => document.querySelector("#gardenScene")?.dataset.listeningPhase || "map";
    const attemptPhase = () => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      return runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt?.phase || "";
    };
    const repairStage = () => document.querySelector("#gardenScene")?.dataset.repairStage || "none";
    const phaseReady = () => {
      const domPhase = currentPhase();
      if (!allowedPhases.includes(domPhase)) return false;
      if (domPhase === "map") return true;
      if (["complete", "guide-rest"].includes(domPhase)) {
        const panel = document.querySelector("#gardenPanel");
        const panelRect = panel?.getBoundingClientRect();
        return Boolean(panel && !panel.hidden && panelRect && panelRect.width > 0 && panelRect.height > 0);
      }
      if (!allowedPhases.includes(attemptPhase())) return false;
      if (allowedRepairStages && !allowedRepairStages.includes(repairStage())) return false;
      return true;
    };
    const deadline = Date.now() + timeout;
    while (!phaseReady()) {
      if (Date.now() >= deadline) {
        throw new Error(JSON.stringify({
          stateName,
          allowedPhases,
          allowedRepairStages,
          domPhase: currentPhase(),
          attemptPhase: attemptPhase(),
          repairStage: repairStage(),
          url: location.href
        }));
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element || element.hidden) return null;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || box.width <= 0 || box.height <= 0) return null;
      return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right, bottom: box.bottom };
    };
    const union = (...boxes) => {
      const valid = boxes.filter(Boolean);
      if (!valid.length) return null;
      const x = Math.min(...valid.map((box) => box.x));
      const y = Math.min(...valid.map((box) => box.y));
      const right = Math.max(...valid.map((box) => box.right));
      const bottom = Math.max(...valid.map((box) => box.bottom));
      return { x, y, width: right - x, height: bottom - y, right, bottom };
    };
    const expand = (box) => box ? {
      x: Math.max(0, box.x - margin),
      y: Math.max(0, box.y - margin),
      right: Math.min(innerWidth, box.right + margin),
      bottom: Math.min(innerHeight, box.bottom + margin),
      width: Math.min(innerWidth, box.right + margin) - Math.max(0, box.x - margin),
      height: Math.min(innerHeight, box.bottom + margin) - Math.max(0, box.y - margin)
    } : null;
    const roundBox = (box) => box ? Object.fromEntries(Object.entries(box).map(([key, value]) => [key, Math.round(value * 100) / 100])) : null;
    const zone = (box) => ({ rect: roundBox(box), protectedRect: roundBox(expand(box)) });
    const character = rect("#gardenXingya");
    const bubble = rect("#gardenSpeech");
    const source = rect("#listeningSource");
    const candidates = rect("#pairedListeningWorld");
    const compare = rect("#ls05Compare");
    const visualAssist = rect("#ls05VisualAssist");
    const replay = rect("#listeningReplay");
    const progress = rect("#listeningCallProgress");
    const keyboard = rect(".keyboard-panel");
    const keyboardTargetCarriers = [...document.querySelectorAll("#keyboard [data-target-note='true'], #keyboard .white-key.target, #keyboard .white-key.target-muted")].length;
    const keyboardDynamicKeyCount = [...document.querySelectorAll("#keyboard .white-key")].filter((key) => {
      const tokens = [...key.classList];
      return tokens.some((token) => token === "hit" || token.startsWith("hit-") || token === "wrong" || token === "correct" || token === "hint" || token === "target" || token === "target-muted" || token.startsWith("program-"));
    }).length;
    const marker = rect("#gardenRestMarker");
    const stage = rect("#gardenScene");
    return {
      state: stateName,
      phase: currentPhase(),
      repairStage: document.querySelector("#gardenScene")?.dataset.repairStage || "none",
      viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio, orientation: innerWidth >= innerHeight ? "landscape" : "portrait", safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 } },
      zones: {
        stage: zone(stage),
        gardenEntry: zone(marker),
        keyboard: zone(keyboard),
        xingyaAndBubble: zone(union(character, bubble)),
        neutralSoundSource: zone(source),
        pairedStoryObjects: zone(candidates),
        replayControl: zone(replay),
        progress: zone(progress),
        repairFeedback: zone(["visible-guide-soft-replay", "guide-rest", "wrong-known", "pair-compare", "assisted-retry", "visual-assist"].includes(stateName) ? union(bubble, compare) : null),
        visualAssistControl: zone(visualAssist)
      },
      overflow: { horizontal: document.documentElement.scrollWidth > innerWidth + 1, vertical: document.documentElement.scrollHeight > innerHeight + 1 },
      keyboardEvidence: { targetCarriers: keyboardTargetCarriers, dynamicKeyCount: keyboardDynamicKeyCount }
    };
  }, { stateName, margin: clearanceMarginPx, allowedPhases, allowedRepairStages, timeout });
}

async function maybeScreenshot(page, spec, stateName) {
  if (!["ipad-1024x768-dpr2", "ipad-pro-11-1194x834-dpr2", "large-ipad-1366x1024-dpr2"].includes(spec.viewportId)) return null;
  fs.mkdirSync(screenshotDir, { recursive: true });
  const pathname = path.join(screenshotDir, `${spec.viewportId}_${stateName}.png`);
  await page.screenshot({ path: pathname, fullPage: false });
  return pathname.replaceAll("\\", "/");
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const records = [];
const browserErrors = [];
try {
  for (const spec of viewports) {
    const context = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: spec.dpr, reducedMotion: "no-preference" });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    page.on("pageerror", (error) => browserErrors.push(`${spec.viewportId}: ${error.message}`));
    page.on("console", (message) => { if (["error", "warning"].includes(message.type())) browserErrors.push(`${spec.viewportId}: ${message.type()}: ${message.text()}`); });
    await seed(page);
    const states = [];
    states.push({ geometry: await geometry(page, "map-entry"), screenshot: await maybeScreenshot(page, spec, "map-entry") });
    const guideGeometry = geometry(page, "visible-guide");
    await page.locator("#gardenRestMarker").click();
    states.push({ geometry: await guideGeometry, screenshot: await maybeScreenshot(page, spec, "visible-guide") });
    await waitForGuideInputArm(page, 0);
    await press(page, levelConfig.candidates[1]);
    states.push({ geometry: await geometry(page, "visible-guide-soft-replay"), screenshot: await maybeScreenshot(page, spec, "visible-guide-soft-replay") });
    await waitForGuideInputArm(page, 0);
    await press(page, levelConfig.candidates[0]);
    await waitForGuideInputArm(page, 1);
    await press(page, levelConfig.candidates[1]);
    states.push({ geometry: await geometry(page, "target-playing"), screenshot: await maybeScreenshot(page, spec, "target-playing") });
    states.push({ geometry: await geometry(page, "awaiting-response"), screenshot: await maybeScreenshot(page, spec, "awaiting-response") });

    await page.locator("#playParentGate").click();
    await completeParentChallenge(page);
    await page.locator("#parentTabDevices").click();
    await page.locator("#parentSoundToggle").click();
    await page.locator("#parentClose").click();
    await page.locator("#listeningReplay").click();
    states.push({ geometry: await geometry(page, "sound-paused"), screenshot: await maybeScreenshot(page, spec, "sound-paused") });
    await page.locator("#playParentGate").click();
    await completeParentChallenge(page);
    await page.locator("#parentTabDevices").click();
    await page.locator("#parentSoundToggle").click();
    await page.locator("#parentClose").click();
    await page.locator("#listeningReplay").click();
    await phase(page, "awaiting-response");
    await waitForResponseInputArm(page);

    let active = await attempt(page);
    let wrongMidi = active.sequence[active.callIndex] === levelConfig.candidates[0] ? levelConfig.candidates[1] : levelConfig.candidates[0];
    await press(page, wrongMidi);
    states.push({ geometry: await geometry(page, "wrong-known"), screenshot: await maybeScreenshot(page, spec, "wrong-known") });
    await phase(page, "awaiting-response");
    await waitForResponseInputArm(page);
    await press(page, wrongMidi);
    states.push({ geometry: await geometry(page, "pair-compare"), screenshot: await maybeScreenshot(page, spec, "pair-compare") });
    await phase(page, "awaiting-response");
    await waitForResponseInputArm(page);
    await press(page, wrongMidi);
    states.push({ geometry: await geometry(page, "assisted-retry"), screenshot: await maybeScreenshot(page, spec, "assisted-retry") });
    await page.locator("#ls05VisualAssist").click();
    states.push({ geometry: await geometry(page, "visual-assist"), screenshot: await maybeScreenshot(page, spec, "visual-assist") });
    await waitForResponseInputArm(page);
    active = await attempt(page);
    await press(page, active.sequence[active.callIndex]);
    let completedGeometry = null;
    while ((active = await attempt(page))?.callIndex < 4) {
      await waitForResponseInputArm(page);
      active = await attempt(page);
      const completeObserved = active.callIndex === 3 ? geometry(page, "complete") : null;
      await press(page, active.sequence[active.callIndex]);
      if (completeObserved) {
        completedGeometry = await completeObserved;
        break;
      }
    }
    states.push({ geometry: completedGeometry || await geometry(page, "complete"), screenshot: await maybeScreenshot(page, spec, "complete") });
    await context.close();

    const guideRestContext = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: spec.dpr, reducedMotion: "no-preference" });
    const guideRestPage = await guideRestContext.newPage();
    guideRestPage.setDefaultTimeout(20000);
    await seed(guideRestPage);
    await guideRestPage.locator("#gardenRestMarker").click();
    await phase(guideRestPage, "visible-guide");
    await waitForGuideInputArm(guideRestPage, 0);
    await press(guideRestPage, levelConfig.candidates[1]);
    await waitForGuideInputArm(guideRestPage, 0);
    const guideRestGeometry = geometry(guideRestPage, "guide-rest");
    await press(guideRestPage, levelConfig.candidates[1]);
    states.push({ geometry: await guideRestGeometry, screenshot: await maybeScreenshot(guideRestPage, spec, "guide-rest") });
    await guideRestContext.close();

    const reducedContext = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: spec.dpr, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    reducedPage.setDefaultTimeout(20000);
    await seed(reducedPage);
    const reducedGeometry = geometry(reducedPage, "reduced-motion");
    await reducedPage.locator("#gardenRestMarker").click();
    states.push({ geometry: await reducedGeometry, screenshot: await maybeScreenshot(reducedPage, spec, "reduced-motion") });
    await reducedContext.close();
    records.push({ ...spec, states });
  }
} finally {
  await browser.close();
}

const failures = [];
for (const viewport of records) {
  const measuredStates = viewport.states.map((state) => state.geometry.state);
  const missingStates = expectedStates.filter((state) => !measuredStates.includes(state));
  const unexpectedStates = measuredStates.filter((state) => !expectedStates.includes(state));
  const duplicateStates = measuredStates.filter((state, index) => measuredStates.indexOf(state) !== index);
  if (missingStates.length) failures.push(`${viewport.viewportId}: missing expected states ${missingStates.join(",")}`);
  if (unexpectedStates.length) failures.push(`${viewport.viewportId}: unexpected states ${unexpectedStates.join(",")}`);
  if (duplicateStates.length) failures.push(`${viewport.viewportId}: duplicate states ${[...new Set(duplicateStates)].join(",")}`);
  for (const state of viewport.states) {
    const geometry = state.geometry;
    const allowedPhases = expectedActualPhases[geometry.state] || [];
    if (!allowedPhases.includes(geometry.phase)) {
      failures.push(`${viewport.viewportId}/${geometry.state}: expected phase ${allowedPhases.join("|")} but measured ${geometry.phase}`);
    }
    const allowedRepairStages = expectedRepairStages[geometry.state];
    if (allowedRepairStages && !allowedRepairStages.includes(geometry.repairStage)) {
      failures.push(`${viewport.viewportId}/${geometry.state}: expected repair stage ${allowedRepairStages.join("|")} but measured ${geometry.repairStage}`);
    }
    if (geometry.viewport.dpr !== viewport.dpr) failures.push(`${viewport.viewportId}/${geometry.state}: DPR mismatch`);
    if (geometry.overflow.horizontal || geometry.overflow.vertical) failures.push(`${viewport.viewportId}/${geometry.state}: overflow`);
    if (geometry.state !== "map-entry") {
      for (const required of ["keyboard", "xingyaAndBubble", "neutralSoundSource", "pairedStoryObjects", "progress"]) {
        if (!geometry.zones[required].rect) failures.push(`${viewport.viewportId}/${geometry.state}: missing ${required}`);
      }
      if (!["complete", "guide-rest"].includes(geometry.state) && !geometry.zones.replayControl.rect) failures.push(`${viewport.viewportId}/${geometry.state}: missing replay`);
      const hiddenKeyboardPhases = ["target-playing", "awaiting-response", "sound-paused", "wrong-known", "pair-compare", "guide-rest", "complete"];
      if (hiddenKeyboardPhases.includes(geometry.phase) && geometry.keyboardEvidence.targetCarriers !== 0) {
        failures.push(`${viewport.viewportId}/${geometry.state}: hidden keyboard target carrier`);
      }
      if (["target-playing", "awaiting-response", "guide-rest", "complete"].includes(geometry.phase) && geometry.keyboardEvidence.dynamicKeyCount !== 0) {
        failures.push(`${viewport.viewportId}/${geometry.state}: stale dynamic keyboard keys`);
      }
      if (["visible-guide-soft-replay", "guide-rest", "pair-compare", "assisted-retry", "visual-assist"].includes(geometry.state) && !geometry.zones.repairFeedback.rect) {
        failures.push(`${viewport.viewportId}/${geometry.state}: missing repair feedback`);
      }
    }
  }
}
if (browserErrors.length) failures.push("browser console contains warnings or errors");

const contract = {
  coordinateContractStatus: failures.length ? "failed" : "browser_coordinate_contract_passed_device_unverified",
  coordinateContractId: `chapter3-${levelId.toLowerCase()}-media-zones-overhaul-342a-v1`,
  contractSha256: null,
  contractHashScope: "sha256 of canonical JSON with contractSha256 and generatedAt set to null",
  prototypeBaseline: "overhaul-342a",
  generatedAt: new Date().toISOString(),
  sourceMethod: "Playwright DOM getBoundingClientRect measurement; no screenshot, SVG, spectral-point, or CSS-coordinate inference",
  sourceFiles: sourcePaths.map(sourceFile),
  clearanceMarginPx,
  alphaThreshold: { byte: alphaThreshold, normalized: alphaThreshold / 255, visibleForegroundRule: "alpha >= 8 counts as foreground" },
  protectedSelectors: {
    keyboard: [".keyboard-panel"],
    xingyaAndBubble: ["#gardenXingya", "#gardenSpeech"],
    neutralSoundSource: ["#listeningSource"],
    pairedStoryObjects: ["#pairedListeningWorld"],
    replayControl: ["#listeningReplay"],
    progress: ["#listeningCallProgress"],
    repairFeedback: ["#gardenSpeech", "#ls05Compare"],
    visualAssistControl: ["#ls05VisualAssist"]
  },
  expectedStates,
  expectedActualPhases,
  expectedRepairStages,
  stateCoverage: expectedStates.map((state) => ({
    state,
    allowedActualPhases: expectedActualPhases[state],
    geometryStatus: "measured_all_contract_viewports_with_phase_match",
    behaviorEvidence: "check:chapter3-ls06-ls07"
  })),
  viewportPolicy: { orientation: "landscape", safeAreaInsets: "browser_model_zero_insets", physicalIpadSafari: "missing", staleWhen: "any source hash, selector, viewport, inset, breakpoint, or protected geometry changes" },
  runtimeIntegrationAllowed: false,
  mediaCandidateStatus: "coordinate_contract_only_no_runtime_media_approval",
  deviceEvidence: { ipadSafari: "missing", realMidi: "missing", acousticPianoMicrophone: "missing" },
  viewports: records,
  browserErrors,
  failures
};
const canonical = { ...contract, contractSha256: null, generatedAt: null };
contract.contractSha256 = sha256(Buffer.from(JSON.stringify(canonical, null, 2)));
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ id: contract.coordinateContractId, status: contract.coordinateContractStatus, sha256: contract.contractSha256, viewports: records.length, failures, outputPath }, null, 2));
if (failures.length) process.exit(1);
