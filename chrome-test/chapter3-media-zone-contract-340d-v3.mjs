import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_CHAPTER3_MEDIA_ZONE_CONTRACT_340D_V3.json";
const screenshotDir = process.argv[4] || "screenshots/chapter3_media_zones_340d_v3";
const clearanceMarginPx = 24;
const alphaThreshold = 8;
const navigationTimeoutMs = 30000;
const bootTimeoutMs = 30000;
const expectedStates = [
  "garden-entry",
  "sound-paused",
  "reference",
  "playing",
  "waiting",
  "wrong",
  "assisted",
  "complete",
  "reduced-motion"
];
const expectedActualPhases = {
  "garden-entry": ["map"],
  "sound-paused": ["sound-paused"],
  reference: ["reference"],
  playing: ["target-playing"],
  waiting: ["awaiting-response"],
  wrong: ["wrong-feedback"],
  assisted: ["assisted"],
  complete: ["complete"],
  "reduced-motion": ["reference", "target-playing", "awaiting-response"]
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
  "chrome-test/chapter3-media-zone-contract-340d-v3.mjs",
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

function url(search = "?screen=map&check=chapter3-media-zones-340d-v3") {
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
  return {
    version: 1,
    active: null,
    history: [{ bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] }],
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: {
        LS01: { completedAt: "2026-07-11T01:00:00.000Z" },
        LS02: { completedAt: "2026-07-11T01:05:00.000Z" },
        LS03: { completedAt: "2026-07-11T01:10:00.000Z" }
      },
      resume: null,
      ls03QualifiedInputs: 2,
      completed: false,
      visibleSliceCompleted: true,
      ls04Attempts: []
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

async function geometry(page, stateName, allowedPhases = expectedActualPhases[stateName], timeout = 12000) {
  return page.evaluate(async ({ stateName, margin, allowedPhases, timeout }) => {
    const currentPhase = () => document.querySelector("#gardenScene")?.dataset.listeningPhase || "map";
    const attemptPhase = () => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      return runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt?.phase || "";
    };
    const phaseReady = () => {
      const domPhase = currentPhase();
      if (!allowedPhases.includes(domPhase)) return false;
      if (domPhase === "map") return true;
      if (domPhase === "complete") {
        const panel = document.querySelector("#gardenPanel");
        const panelRect = panel?.getBoundingClientRect();
        return Boolean(panel && !panel.hidden && panelRect && panelRect.width > 0 && panelRect.height > 0);
      }
      if (!allowedPhases.includes(attemptPhase())) return false;
      return true;
    };
    const deadline = Date.now() + timeout;
    while (!phaseReady()) {
      if (Date.now() >= deadline) {
        throw new Error(JSON.stringify({
          stateName,
          allowedPhases,
          domPhase: currentPhase(),
          attemptPhase: attemptPhase(),
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
    const candidates = rect("#listeningCandidates");
    const replay = rect("#listeningReplay");
    const progress = rect("#listeningCallProgress");
    const keyboard = rect(".keyboard-panel");
    const marker = rect("#gardenRestMarker");
    const stage = rect("#gardenScene");
    return {
      state: stateName,
      phase: currentPhase(),
      viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio, orientation: innerWidth >= innerHeight ? "landscape" : "portrait", safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 } },
      zones: {
        stage: zone(stage),
        gardenEntry: zone(marker),
        keyboard: zone(keyboard),
        xingyaAndBubble: zone(union(character, bubble)),
        neutralSoundSource: zone(source),
        candidates: zone(candidates),
        replayControl: zone(replay),
        progress: zone(progress),
        wrongFeedback: zone(stateName === "wrong" || stateName === "assisted" ? bubble : null)
      },
      overflow: { horizontal: document.documentElement.scrollWidth > innerWidth + 1, vertical: document.documentElement.scrollHeight > innerHeight + 1 }
    };
  }, { stateName, margin: clearanceMarginPx, allowedPhases, timeout });
}

async function maybeScreenshot(page, spec, stateName) {
  if (!["ipad-1024x768-dpr2", "ipad-pro-11-1194x834-dpr2"].includes(spec.viewportId)) return null;
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
    states.push({ geometry: await geometry(page, "garden-entry"), screenshot: await maybeScreenshot(page, spec, "garden-entry") });
    await page.locator("#mapParentGate").click();
    await page.locator("#parentSoundToggle").click();
    await page.locator("#parentClose").click();
    await page.locator("#gardenRestMarker").click();
    states.push({ geometry: await geometry(page, "sound-paused"), screenshot: await maybeScreenshot(page, spec, "sound-paused") });
    await page.locator("#playParentGate").click();
    await page.locator("#parentSoundToggle").click();
    await page.locator("#parentClose").click();
    await page.locator("#listeningReplay").click();
    states.push({ geometry: await geometry(page, "reference"), screenshot: await maybeScreenshot(page, spec, "reference") });
    states.push({ geometry: await geometry(page, "playing"), screenshot: await maybeScreenshot(page, spec, "playing") });
    states.push({ geometry: await geometry(page, "waiting"), screenshot: await maybeScreenshot(page, spec, "waiting") });
    let active = await attempt(page);
    let wrongMidi = active.sequence[active.callIndex] === 60 ? 62 : 60;
    await press(page, wrongMidi);
    states.push({ geometry: await geometry(page, "wrong"), screenshot: await maybeScreenshot(page, spec, "wrong") });
    for (let count = 1; count < 3; count += 1) {
      await phase(page, "awaiting-response");
      active = await attempt(page);
      wrongMidi = active.sequence[active.callIndex] === 60 ? 62 : 60;
      await press(page, wrongMidi);
    }
    states.push({ geometry: await geometry(page, "assisted"), screenshot: await maybeScreenshot(page, spec, "assisted") });
    active = await attempt(page);
    await press(page, active.sequence[active.callIndex]);
    let completedGeometry = null;
    while ((active = await attempt(page))?.callIndex < 4) {
      await phase(page, "awaiting-response");
      active = await attempt(page);
      const completeObserved = active.callIndex === 3 ? geometry(page, "complete") : null;
      await press(page, active.sequence[active.callIndex]);
      if (completeObserved) {
        completedGeometry = await completeObserved;
        break;
      }
      if (active.callIndex < 3) await page.waitForTimeout(680);
    }
    states.push({ geometry: completedGeometry || await geometry(page, "complete"), screenshot: await maybeScreenshot(page, spec, "complete") });
    await context.close();

    const reducedContext = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: spec.dpr, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    reducedPage.setDefaultTimeout(20000);
    await seed(reducedPage);
    await reducedPage.locator("#gardenRestMarker").click();
    states.push({ geometry: await geometry(reducedPage, "reduced-motion"), screenshot: await maybeScreenshot(reducedPage, spec, "reduced-motion") });
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
    if (geometry.viewport.dpr !== viewport.dpr) failures.push(`${viewport.viewportId}/${geometry.state}: DPR mismatch`);
    if (geometry.overflow.horizontal || geometry.overflow.vertical) failures.push(`${viewport.viewportId}/${geometry.state}: overflow`);
    if (geometry.state !== "garden-entry") {
      for (const required of ["keyboard", "xingyaAndBubble", "neutralSoundSource", "candidates", "progress"]) {
        if (!geometry.zones[required].rect) failures.push(`${viewport.viewportId}/${geometry.state}: missing ${required}`);
      }
      if (geometry.state !== "complete" && !geometry.zones.replayControl.rect) failures.push(`${viewport.viewportId}/${geometry.state}: missing replay`);
    }
  }
}
if (browserErrors.length) failures.push("browser console contains warnings or errors");

const contract = {
  coordinateContractStatus: failures.length ? "failed" : "browser_coordinate_contract_passed_device_unverified",
  coordinateContractId: "chapter3-media-zones-overhaul-340d-v3",
  contractSha256: null,
  contractHashScope: "sha256 of canonical JSON with contractSha256 and generatedAt set to null",
  prototypeBaseline: "overhaul-340d",
  generatedAt: new Date().toISOString(),
  sourceMethod: "Playwright DOM getBoundingClientRect measurement; no screenshot, SVG, spectral-point, or CSS-coordinate inference",
  sourceFiles: sourcePaths.map(sourceFile),
  clearanceMarginPx,
  alphaThreshold: { byte: alphaThreshold, normalized: alphaThreshold / 255, visibleForegroundRule: "alpha >= 8 counts as foreground" },
  protectedSelectors: {
    keyboard: [".keyboard-panel"],
    xingyaAndBubble: ["#gardenXingya", "#gardenSpeech"],
    neutralSoundSource: ["#listeningSource"],
    candidates: ["#listeningCandidates"],
    replayControl: ["#listeningReplay"],
    progress: ["#listeningCallProgress"],
    wrongFeedback: ["#gardenSpeech"]
  },
  expectedStates,
  expectedActualPhases,
  stateCoverage: expectedStates.map((state) => ({
    state,
    allowedActualPhases: expectedActualPhases[state],
    geometryStatus: "measured_all_contract_viewports_with_phase_match",
    behaviorEvidence: "check:chapter3-ls04"
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
