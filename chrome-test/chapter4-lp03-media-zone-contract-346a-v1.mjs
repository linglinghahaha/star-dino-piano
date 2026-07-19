import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_CHAPTER4_LP03_MEDIA_ZONE_CONTRACT_346A_V1.json";
const screenshotDir = process.argv[4] || "screenshots/chapter4_lp03_media_zones_346a_v1";

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(screenshotDir, { recursive: true });
for (const entry of fs.readdirSync(screenshotDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".png")) fs.unlinkSync(path.join(screenshotDir, entry.name));
}
if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

const expectedStates = [
  "map-entry",
  "initial-model-ready",
  "c-target-playing",
  "c-awaiting-response",
  "c-child-echo-playing",
  "c-complete",
  "d-awaiting-response",
  "d-complete",
  "e-awaiting-response",
  "wrong-repair-playing",
  "assisted",
  "visual-assist",
  "modeled-playing",
  "c-natural-rest",
  "d-natural-rest",
  "resume-after-reload",
  "seam-awaiting-response",
  "complete-map",
  "reduced-motion"
];

const expectedActualPhases = {
  "map-entry": "chapter4-lp03-entry",
  "initial-model-ready": "lp03-model-ready",
  "c-target-playing": "lp03-target-playing",
  "c-awaiting-response": "lp03-awaiting-response",
  "c-child-echo-playing": "lp03-child-echo-playing",
  "c-complete": "lp03-model-ready",
  "d-awaiting-response": "lp03-awaiting-response",
  "d-complete": "lp03-model-ready",
  "e-awaiting-response": "lp03-awaiting-response",
  "wrong-repair-playing": "lp03-wrong-repair-playing",
  assisted: "lp03-assisted",
  "visual-assist": "lp03-visual-assist",
  "modeled-playing": "lp03-modeled-playing",
  "c-natural-rest": "chapter4-lp03-entry",
  "d-natural-rest": "chapter4-lp03-entry",
  "resume-after-reload": "lp03-target-playing",
  "seam-awaiting-response": "lp03-seam-awaiting-response",
  "complete-map": "chapter4-complete",
  "reduced-motion": "lp03-model-ready"
};

// C/D have no stable child-facing pause after a clean echo: the real route
// immediately starts D/E. These two screenshots are explicitly direct,
// in-memory audit fixtures; formal flow below separately proves the automatic
// C->D and D->E transitions before either fixture is captured.
const stateSources = {
  "map-entry": { kind: "formal-prerequisite-fixture", auditOnly: false },
  "initial-model-ready": { kind: "direct-preview", auditOnly: true },
  "c-target-playing": { kind: "formal-runtime", auditOnly: false },
  "c-awaiting-response": { kind: "formal-runtime", auditOnly: false },
  "c-child-echo-playing": { kind: "formal-runtime", auditOnly: false },
  "c-complete": {
    kind: "direct-completed-world-audit-fixture",
    auditOnly: true,
    completedSteps: ["C"],
    nextStep: "D",
    note: "Transient direct state only; no formal session, history, lesson evidence, stable, or retained record is written."
  },
  "d-awaiting-response": { kind: "formal-runtime", auditOnly: false },
  "d-complete": {
    kind: "direct-completed-world-audit-fixture",
    auditOnly: true,
    completedSteps: ["C", "D"],
    nextStep: "E",
    note: "Transient direct state only; no formal session, history, lesson evidence, stable, or retained record is written."
  },
  "e-awaiting-response": { kind: "formal-runtime", auditOnly: false },
  "wrong-repair-playing": { kind: "direct-preview", auditOnly: true },
  assisted: { kind: "direct-preview", auditOnly: true },
  "visual-assist": { kind: "direct-preview", auditOnly: true },
  "modeled-playing": { kind: "direct-preview", auditOnly: true },
  "c-natural-rest": { kind: "formal-runtime", auditOnly: false },
  "d-natural-rest": { kind: "formal-runtime", auditOnly: false },
  "resume-after-reload": { kind: "formal-runtime", auditOnly: false },
  "seam-awaiting-response": { kind: "formal-runtime", auditOnly: false },
  "complete-map": { kind: "formal-runtime", auditOnly: false },
  "reduced-motion": { kind: "direct-preview", auditOnly: true }
};

const regularCarrierStates = new Set([
  "initial-model-ready",
  "c-target-playing",
  "c-complete",
  "d-awaiting-response",
  "d-complete",
  "e-awaiting-response",
  "assisted",
  "visual-assist",
  "modeled-playing"
]);
const solfegeCarrierStates = new Set([
  "initial-model-ready",
  "c-target-playing",
  "c-complete",
  "d-complete",
  "assisted",
  "visual-assist",
  "modeled-playing"
]);

const viewports = [
  ["ipad-1024x768-dpr1", 1024, 768, 1],
  ["ipad-1024x768-dpr2", 1024, 768, 2],
  ["ipad-1180x820-dpr2", 1180, 820, 2],
  ["ipad-pro-11-1194x834-dpr2", 1194, 834, 2],
  ["media-1280x720-dpr1", 1280, 720, 1],
  ["large-ipad-1366x1024-dpr2", 1366, 1024, 2]
].map(([viewportId, width, height, dpr]) => ({ viewportId, width, height, dpr }));

const sourcePaths = [
  "chrome-test/chapter4-lp03-media-zone-contract-346a-v1.mjs",
  "index.html",
  "app.js",
  "chapter4-slice.css",
  "keyboard-overrides.css",
  "service-worker.js"
];
const failures = [];
const browserErrors = [];
const formalRouteFlow = [];

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sourceFile(pathname) {
  const bytes = fs.readFileSync(pathname);
  return { path: pathname.replaceAll("\\", "/"), bytes: bytes.length, sha256: sha256(bytes) };
}

function learningFixture() {
  return {
    version: 3,
    levels: {},
    notes: {},
    staff: {},
    retention: {
      stableEvents: [],
      retainedEvents: [],
      observationEvents: [],
      clockInvalidEvents: [],
      lastWallClockAt: null,
      lastWallClockSessionId: null
    }
  };
}

function formalRuntimeFixture() {
  const completedAt = "2026-07-18T08:00:00.000Z";
  const ls08SessionId = "C3-07-lp03-contract-prerequisite";
  const lp02SessionId = "C4-01-lp03-contract-prerequisite";
  return {
    version: 1,
    active: null,
    history: [
      { sessionId: "C2-03-lp03-contract-garden-entry", bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] },
      { sessionId: ls08SessionId, bundleId: "C3-07", status: "ended", completedActions: [{ actionId: "LS08-listening", kind: "garden-listening", targetId: "LS08" }] },
      { sessionId: lp02SessionId, bundleId: "C4-01", status: "ended", completedActions: [{ actionId: "LP02-low-c-home", kind: "chapter4-keyboard", targetId: "LP02", completedAt }] }
    ],
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: {
        LS08: {
          completed: true,
          completedAt,
          sessionId: ls08SessionId,
          bundleId: "C3-07",
          storyEvents: [{ eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], startedAt: completedAt, endedAt: "2026-07-18T08:00:02.000Z" }]
        }
      },
      resume: null,
      ls03QualifiedInputs: 2,
      completed: true,
      visibleSliceCompleted: true,
      ls04Completed: true,
      ls05Completed: true,
      ls06Completed: true,
      ls07Completed: true,
      ls08Completed: true,
      ls05PartialRest: null,
      ls06PartialRest: null,
      ls07PartialRest: null,
      ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0,
      ls08RemediationRequired: false,
      ls04Attempts: [],
      ls05Attempts: [],
      ls06Attempts: [],
      ls07Attempts: [],
      ls08Attempts: []
    },
    chapter4: {
      completedSlice: true,
      lessonEvidence: { LP02: { completedAt, sessionId: lp02SessionId, bundleId: "C4-01", played: true } },
      resume: null,
      openingReviewQueue: [],
      lp01Attempts: [],
      lp02Attempts: [],
      lp03Attempts: [],
      lp03Progress: {
        foundationCAnchored: true,
        foundationCAwake: false,
        foundationDPlaced: false,
        foundationEPlaced: false,
        played: false,
        needsPractice: false,
        completedAt: null,
        seamChecks: [],
        seamCheckDeferred: false,
        routeEvents: [],
        originSessionId: null,
        lastSessionId: null
      }
    }
  };
}

function mapUrl() {
  const value = new URL(rootUrl);
  value.search = "?screen=map&check=chapter4-lp03-media-zones-346a-v1";
  return value.toString();
}

function directUrl() {
  const value = new URL(rootUrl);
  value.search = "?mode=chapter4&directMode=true&formalSession=false&lesson=LP03&check=chapter4-lp03-media-zones-346a-v1";
  return value.toString();
}

async function createPage(browser, viewport, { formal = false, direct = false, reducedMotion = false, serial = "main" } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.dpr,
    hasTouch: true,
    reducedMotion: reducedMotion ? "reduce" : "no-preference"
  });
  await context.addInitScript(({ fixedId }) => {
    Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => fixedId });
  }, { fixedId: `chapter4-lp03-contract-${viewport.viewportId}-${serial}` });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(`${viewport.viewportId}/${serial}: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      browserErrors.push(`${viewport.viewportId}/${serial}: console: ${message.text()} @ ${location.url || "unknown"}`);
    }
  });
  await page.goto(rootUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(({ runtime, learning }) => {
    localStorage.clear();
    if (runtime) localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learning));
    localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0.6 }));
  }, { runtime: formal ? formalRuntimeFixture() : null, learning: learningFixture() });
  await page.goto(direct ? directUrl() : mapUrl(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await page.addStyleTag({ content: "#mapShell *,#chapter4Panel *,#keyboardPanel *{animation:none!important;transition:none!important;}" });
  return { context, page };
}

async function currentAttempt(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const direct = document.body.classList.contains("screen-chapter4") && typeof ensureChapter4Attempt === "function"
      ? ensureChapter4Attempt()
      : null;
    return JSON.parse(JSON.stringify(action?.chapter4Attempt || direct || null));
  });
}

async function waitScenePhase(page, phase, timeout = 14000) {
  await page.waitForFunction((expected) => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === expected, phase, { timeout });
  return currentAttempt(page);
}

async function waitMapPhase(page, phase, timeout = 14000) {
  await page.waitForFunction((expected) => document.body.classList.contains("screen-map") && document.querySelector("#mapShell")?.dataset.chapter4Phase === expected, phase, { timeout });
}

async function waitRouteResponse(page, midi, timeout = 14000) {
  await page.waitForFunction((target) => {
    const attempt = ensureChapter4Attempt?.();
    return attempt?.targetMidi === target && attempt.phase === "lp03-awaiting-response" && attempt.inputArmed === true;
  }, midi, { timeout });
  return currentAttempt(page);
}

async function startFormal(page) {
  await page.locator("#gardenRestMarker").click();
  await waitScenePhase(page, "lp03-target-playing");
}

async function clickKey(page, midi) {
  await page.locator(`#keyboard [data-midi="${midi}"]`).click();
}

async function configureCompletedWorldAuditFixture(page, completedSteps) {
  const nextStepId = completedSteps.length === 1 ? "D" : "E";
  await page.evaluate(({ completedStepIds, nextStep }) => {
    const now = "2026-07-18T09:00:00.000Z";
    const completed = new Set(completedStepIds);
    const progress = chapter4Lp03Progress();
    progress.foundationCAnchored = true;
    progress.foundationCAwake = completed.has("C");
    progress.foundationDPlaced = completed.has("D");
    progress.foundationEPlaced = completed.has("E");
    progress.played = false;
    progress.needsPractice = false;
    progress.completedAt = null;
    progress.seamChecks = [];
    progress.seamCheckDeferred = false;
    progress.routeEvents = completedStepIds.map((stepId) => ({
      stepId,
      source: "coordinate-contract-audit-fixture",
      auditOnly: true,
      completedAt: now,
      childCorrectCount: 0,
      childInputs: [],
      inputRoutes: {},
      modeled: false,
      stable: false,
      retained: false
    }));
    const step = lp03StepForId(nextStep);
    const attempt = createLp03Attempt(null, {
      formalSession: false,
      directMode: true,
      stepId: nextStep,
      seed: `chapter4-lp03-contract-audit-${nextStep}`
    });
    attempt.auditOnlyFixture = true;
    attempt.auditSource = "direct-completed-world-audit-fixture";
    state.chapter4DirectMode = true;
    state.chapter4DirectAction = {
      actionId: step.actionId,
      kind: "chapter4-keyboard",
      targetId: "LP03",
      lp03Step: step.id,
      runMode: "guided",
      formalSession: false,
      directMode: true,
      auditOnlyFixture: true,
      chapter4Attempt: attempt
    };
    renderChapter4Screen();
  }, { completedStepIds: completedSteps, nextStep: nextStepId });
}

function recordFormalRouteAdvance(viewport, transition, observation, expected) {
  const pass = observation.phase === "lp03-target-playing" &&
    observation.targetMidi === expected.targetMidi &&
    observation.activeStep === expected.activeStep &&
    observation.formalSession === true &&
    observation.directMode === false &&
    observation.completedActions.join(",") === expected.completedSteps.join(",") &&
    observation.routeEvents.join(",") === expected.completedSteps.join(",") &&
    observation.foundation.cAwake === expected.foundation.cAwake &&
    observation.foundation.dPlaced === expected.foundation.dPlaced &&
    observation.foundation.ePlaced === expected.foundation.ePlaced &&
    observation.formalLp03HistoryCount === 0 &&
    observation.formalLessonEvidence === false &&
    observation.stableCompletions === 0 &&
    observation.retainedEvents === 0;
  formalRouteFlow.push({ viewportId: viewport.viewportId, transition, expected, observation, pass });
  if (!pass) failures.push({ viewportId: viewport.viewportId, stateName: transition, kind: "formal-route-auto-advance", expected, observation });
}

async function verifyFormalRouteAdvance(page, viewport, transition, expected) {
  const observation = await page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.chapter4Attempt || null;
    const progress = state.chapter4?.lp03Progress || {};
    const learning = state.learningStats?.levels?.LP03 || {};
    const retainedEvents = state.learningStats?.retention?.retainedEvents?.filter((event) => event.skillKey === "chapter4:LP03") || [];
    return {
      phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "",
      targetMidi: attempt?.targetMidi ?? null,
      activeStep: action?.lp03Step || null,
      formalSession: Boolean(attempt?.formalSession),
      directMode: Boolean(state.chapter4DirectMode),
      completedActions: (runtime.active?.completedActions || []).map((completion) => completion.lp03Step).filter(Boolean),
      routeEvents: (progress.routeEvents || []).map((event) => event.stepId).filter(Boolean),
      foundation: {
        cAwake: Boolean(progress.foundationCAwake),
        dPlaced: Boolean(progress.foundationDPlaced),
        ePlaced: Boolean(progress.foundationEPlaced)
      },
      formalLp03HistoryCount: (runtime.history || []).filter((session) => session.bundleId === "C4-02").length,
      formalLessonEvidence: Boolean(state.chapter4?.lessonEvidence?.LP03?.completedAt),
      stableCompletions: Number(learning.stableCompletions) || 0,
      retainedEvents: retainedEvents.length
    };
  });
  recordFormalRouteAdvance(viewport, transition, observation, expected);
}

function verifyCompletedWorldAuditFixture(viewport, state, completedSteps) {
  const nextStepId = completedSteps.length === 1 ? "D" : "E";
  const expectedFoundation = {
    cAwake: completedSteps.includes("C"),
    dPlaced: completedSteps.includes("D"),
    ePlaced: false
  };
  const audit = state.geometry.audit;
  const pass = audit?.directMode === true &&
    audit?.formalSession === false &&
    audit?.auditOnlyFixture === true &&
    audit?.auditSource === "direct-completed-world-audit-fixture" &&
    audit?.activeSessionId === null &&
    audit?.formalLp03HistoryCount === 0 &&
    audit?.formalCompletedSteps?.length === 0 &&
    audit?.routeEventSteps?.join(",") === completedSteps.join(",") &&
    audit?.foundation?.cAnchored === true &&
    audit?.foundation?.cAwake === expectedFoundation.cAwake &&
    audit?.foundation?.dPlaced === expectedFoundation.dPlaced &&
    audit?.foundation?.ePlaced === expectedFoundation.ePlaced &&
    audit?.foundation?.played === false &&
    audit?.formalLessonEvidence === false &&
    audit?.stableCompletions === 0 &&
    audit?.retainedEvents === 0 &&
    state.geometry.targetMidi === (nextStepId === "D" ? 50 : 52) &&
    state.geometry.inputArmed === false;
  if (!pass) failures.push({
    viewportId: viewport.viewportId,
    stateName: state.stateName,
    kind: "completed-world-audit-fixture",
    completedSteps,
    audit,
    geometry: state.geometry
  });
}

async function captureCompletedWorldAuditState(browser, viewport, stateName, completedSteps) {
  const audit = await createPage(browser, viewport, { direct: true, serial: `${stateName}-audit` });
  await configureCompletedWorldAuditFixture(audit.page, completedSteps);
  await waitScenePhase(audit.page, "lp03-model-ready");
  const state = await snapshot(audit.page, viewport, stateName);
  verifyCompletedWorldAuditFixture(viewport, state, completedSteps);
  await audit.context.close();
  return state;
}

async function completeCleanRouteToSeam(page) {
  await startFormal(page);
  await waitRouteResponse(page, 48);
  await clickKey(page, 48);
  await waitScenePhase(page, "lp03-target-playing");
  await waitRouteResponse(page, 50);
  await clickKey(page, 50);
  await waitScenePhase(page, "lp03-target-playing");
  await waitRouteResponse(page, 52);
  await clickKey(page, 52);
  await waitScenePhase(page, "lp03-seam-awaiting-response", 16000);
}

async function snapshot(page, viewport, stateName) {
  const geometry = await page.evaluate(() => {
    const visibleRect = (selector) => {
      const node = document.querySelector(selector);
      if (!node || node.hidden) return null;
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) <= 0.01 || box.width <= 0 || box.height <= 0) return null;
      return { x: +box.x.toFixed(2), y: +box.y.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2) };
    };
    const visible = (node) => {
      if (!node || node.hidden) return false;
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && box.width > 0 && box.height > 0;
    };
    const overlaps = (first, second) => Boolean(first && second &&
      first.x < second.x + second.width && first.x + first.width > second.x &&
      first.y < second.y + second.height && first.y + first.height > second.y);
    const map = document.body.classList.contains("screen-map");
    const scene = document.querySelector("#chapter4Scene");
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const direct = !map && typeof ensureChapter4Attempt === "function" ? ensureChapter4Attempt() : null;
    const attempt = action?.chapter4Attempt || direct || null;
    const progress = state.chapter4?.lp03Progress || null;
    const learning = state.learningStats?.levels?.LP03 || null;
    const retained = state.learningStats?.retention?.retainedEvents?.filter((event) => event.skillKey === "chapter4:LP03") || [];
    const targetMidi = attempt?.levelId === "LP03" ? lp03CurrentTargetMidi(attempt) : null;
    const targetName = chapter4NoteForMidi(targetMidi)?.name || null;
    const targetSolfege = targetName === "C" ? "Do" : (targetName === "D" ? "Re" : (targetName === "E" ? "Mi" : null));
    const speechText = document.querySelector("#chapter4Speech")?.innerText?.replace(/\s+/g, " ").trim() || "";
    const statusText = document.querySelector("#chapter4Status")?.textContent?.replace(/\s+/g, " ").trim() || "";
    const targetStoneIndex = ({ C: 0, D: 1, E: 2 })[targetName] ?? null;
    const semanticSurface = (id, node) => ({
      id,
      value: node ? [node.textContent, node.getAttribute("aria-label"), node.getAttribute("title")].filter(Boolean).join(" ").replace(/\s+/g, " ").trim() : ""
    });
    const semanticSurfaces = [
      semanticSurface("status", document.querySelector("#chapter4Status")),
      semanticSurface("start", document.querySelector("#chapter4StartCheck")),
      semanticSurface("replay", document.querySelector("#chapter4Replay")),
      semanticSurface("visual-assist", document.querySelector("#chapter4VisualAssist")),
      semanticSurface("progress", document.querySelector("#chapter4CallProgress"))
    ];
    const foundation = document.querySelector("#chapter4Foundation");
    const keyboard = document.querySelector("#keyboard.chapter4-keyboard");
    const whiteKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .white-key")].map((key) => {
      const box = key.getBoundingClientRect();
      return { midi: Number(key.dataset.midi), width: +box.width.toFixed(2), height: +box.height.toFixed(2), aria: key.getAttribute("aria-label") || "" };
    });
    const blackKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .black-key")].map((key) => {
      const box = key.getBoundingClientRect();
      return { midi: Number(key.dataset.midi), width: +box.width.toFixed(2), height: +box.height.toFixed(2), aria: key.getAttribute("aria-label") || "" };
    });
    const touchTargets = [...document.querySelectorAll("#chapter4Panel button:not([hidden]), #keyboard button:not([hidden])")]
      .filter(visible)
      .map((node) => {
        const box = node.getBoundingClientRect();
        return { id: node.id || node.dataset.midi || node.className, width: +box.width.toFixed(2), height: +box.height.toFixed(2) };
      });
    const visibleTextOutsideSpeech = [...document.querySelectorAll("#chapter4Panel *")]
      .filter((node) => visible(node) && !node.closest("#chapter4Speech") && node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.replace(/\s+/g, " ").trim() || "")
      .filter(Boolean);
    return {
      phase: map ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map") : (scene?.dataset.chapter4Phase || ""),
      viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
      runtimeVersion: document.querySelector("script[src*='app.js']")?.getAttribute("src") || "",
      levelId: attempt?.levelId || null,
      targetMidi: attempt?.targetMidi ?? null,
      inputArmed: Boolean(attempt?.inputArmed),
      mapProgress: map ? {
        text: document.querySelector("#mapStarCount")?.textContent?.replace(/\s+/g, " ").trim() || "",
        aria: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || ""
      } : null,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      zones: {
        map: visibleRect("#mapShell"),
        panel: visibleRect("#chapter4Panel"),
        scene: visibleRect("#chapter4Scene"),
        speech: visibleRect("#chapter4Speech"),
        foundation: visibleRect("#chapter4Foundation"),
        keyboard: visibleRect("#keyboardPanel"),
        character: visibleRect("#chapter4XingyaImage"),
        start: visibleRect("#chapter4StartCheck"),
        replay: visibleRect("#chapter4Replay"),
        visualAssist: visibleRect("#chapter4VisualAssist")
      },
      foundation: foundation ? {
        dataset: { ...foundation.dataset },
        blocks: [...foundation.querySelectorAll("span")].map((block) => {
          const style = getComputedStyle(block);
          return { text: block.textContent?.trim() || "", borderStyle: style.borderStyle, opacity: style.opacity, transform: style.transform };
        })
      } : null,
      audit: {
        directMode: Boolean(state.chapter4DirectMode),
        formalSession: Boolean(attempt?.formalSession),
        auditOnlyFixture: Boolean(attempt?.auditOnlyFixture),
        auditSource: attempt?.auditSource || null,
        activeSessionId: state.activeSession?.sessionId || null,
        formalLp03HistoryCount: (runtime.history || []).filter((session) => session.bundleId === "C4-02").length,
        formalCompletedSteps: (runtime.active?.completedActions || []).map((completion) => completion.lp03Step).filter(Boolean),
        routeEventSteps: (progress?.routeEvents || []).map((event) => event.stepId).filter(Boolean),
        foundation: progress ? {
          cAnchored: Boolean(progress.foundationCAnchored),
          cAwake: Boolean(progress.foundationCAwake),
          dPlaced: Boolean(progress.foundationDPlaced),
          ePlaced: Boolean(progress.foundationEPlaced),
          played: Boolean(progress.played),
          needsPractice: Boolean(progress.needsPractice)
        } : null,
        formalLessonEvidence: Boolean(state.chapter4?.lessonEvidence?.LP03?.completedAt),
        stableCompletions: Number(learning?.stableCompletions) || 0,
        retainedEvents: retained.length
      },
      semanticCarriers: attempt?.levelId === "LP03" ? {
        targetName,
        targetSolfege,
        stone: {
          index: targetStoneIndex,
          text: targetStoneIndex === null ? "" : (foundation?.querySelectorAll("span")?.[targetStoneIndex]?.textContent || "").trim(),
          matchesCurrent: targetStoneIndex !== null && (foundation?.querySelectorAll("span")?.[targetStoneIndex]?.textContent || "").trim() === targetName
        },
        character: {
          targetLetterMentions: targetName && speechText.includes(targetName) ? [targetName] : [],
          targetSolfegeMentions: targetSolfege && speechText.includes(targetSolfege) ? [targetSolfege] : []
        },
        nonCharacterTargetSurfaces: semanticSurfaces.filter((surface) => targetName && surface.value.includes(targetName)),
        status: {
          text: statusText,
          targetLetterMention: Boolean(targetName && statusText.includes(targetName)),
          solfegeMention: Boolean(targetSolfege && statusText.includes(targetSolfege))
        },
        visualTargetMidis: [...document.querySelectorAll("#keyboard .lp02-assist-target")].map((key) => Number(key.dataset.midi)),
        locatorBlackMidis: [...document.querySelectorAll("#keyboard .black-key.lp03-locator-key")].map((key) => Number(key.dataset.midi)),
        wrongKeyMidis: [...document.querySelectorAll("#keyboard .hit-wrong")].map((key) => Number(key.dataset.midi)),
        startCommand: {
          text: document.querySelector("#chapter4StartCheck")?.textContent?.replace(/\s+/g, " ").trim() || "",
          aria: document.querySelector("#chapter4StartCheck")?.getAttribute("aria-label") || ""
        }
      } : null,
      keyboard: keyboard ? {
        targetVisible: keyboard.dataset.targetVisible || "",
        locatorCue: keyboard.dataset.locatorCue || "",
        assistTargets: [...keyboard.querySelectorAll(".lp02-assist-target")].map((key) => Number(key.dataset.midi)),
        locatorBlackKeys: [...keyboard.querySelectorAll(".black-key.lp03-locator-key")].map((key) => Number(key.dataset.midi)),
        wrongKeyMidis: [...keyboard.querySelectorAll(".hit-wrong")].map((key) => Number(key.dataset.midi)),
        whiteKeys,
        blackKeys
      } : null,
      touchTargets,
      visibleTextOutsideSpeech,
      overlaps: {
        speechReplay: overlaps(visibleRect("#chapter4Speech"), visibleRect("#chapter4Replay")),
        speechAssist: overlaps(visibleRect("#chapter4Speech"), visibleRect("#chapter4VisualAssist")),
        speechKeyboard: overlaps(visibleRect("#chapter4Speech"), visibleRect("#keyboardPanel"))
      }
    };
  });

  const expected = expectedActualPhases[stateName];
  if (geometry.phase !== expected) failures.push({ viewportId: viewport.viewportId, stateName, kind: "phase-mismatch", expected, actual: geometry.phase });
  if (geometry.viewport.scrollWidth > geometry.viewport.width + 1 || geometry.viewport.scrollHeight > geometry.viewport.height + 1) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "overflow", viewport: geometry.viewport });
  }
  if (!geometry.runtimeVersion.includes("overhaul-347a-c4-r01a")) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "runtime-identity", runtimeVersion: geometry.runtimeVersion });
  }
  const mapState = ["map-entry", "c-natural-rest", "d-natural-rest", "complete-map"].includes(stateName);
  if (mapState) {
    if (!geometry.zones.map) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-map-zone" });
    const expectedMapProgress = {
      "map-entry": { text: "三块地基 0/3 · 准备", aria: "三块地基进度，0/3 已安放，准备" },
      "c-natural-rest": { text: "三块地基 1/3 · 继续", aria: "三块地基进度，1/3 已安放，继续" },
      "d-natural-rest": { text: "三块地基 2/3 · 继续", aria: "三块地基进度，2/3 已安放，继续" },
      "complete-map": { text: "三块地基 3/3 · 休息", aria: "三块地基进度，3/3 已安放，休息" }
    }[stateName];
    if (!geometry.mapProgress || geometry.mapProgress.text !== expectedMapProgress.text || geometry.mapProgress.aria !== expectedMapProgress.aria || geometry.mapProgress.text.includes("四次回声")) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp03-map-progress", expected: expectedMapProgress, actual: geometry.mapProgress });
    }
  } else {
    if (!geometry.zones.panel || !geometry.zones.scene || !geometry.zones.speech || !geometry.zones.foundation || !geometry.zones.keyboard || !geometry.zones.character) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-lp03-zone", zones: geometry.zones });
    }
    if (geometry.levelId !== "LP03") failures.push({ viewportId: viewport.viewportId, stateName, kind: "wrong-level", levelId: geometry.levelId });
    if (!geometry.foundation || geometry.foundation.blocks.length !== 3) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "foundation-blocks", foundation: geometry.foundation });
    }
    const whiteKeys = geometry.keyboard?.whiteKeys || [];
    const blackKeys = geometry.keyboard?.blackKeys || [];
    if (whiteKeys.length !== 14 || blackKeys.length !== 10 || [...whiteKeys, ...blackKeys].some((key) => key.width < 44 || key.height < 44)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "keyboard-touch-layout", whiteKeys, blackKeys });
    }
    const targetPrelightAllowed = ["visual-assist", "modeled-playing"].includes(stateName);
    if (!targetPrelightAllowed && (geometry.keyboard?.targetVisible !== "false" || geometry.keyboard?.assistTargets?.length !== 0)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "unexpected-key-prelight", keyboard: geometry.keyboard });
    }
    if (targetPrelightAllowed && (geometry.keyboard?.targetVisible !== "true" || geometry.keyboard?.assistTargets?.length !== 1)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-allowed-target-prelight", keyboard: geometry.keyboard });
    }
    if (stateName === "assisted" && (
      geometry.keyboard?.targetVisible !== "false" ||
      geometry.keyboard?.assistTargets?.length !== 0 ||
      geometry.keyboard?.locatorCue !== "two-black" ||
      geometry.keyboard?.locatorBlackKeys?.join(",") !== "49,51" ||
      geometry.keyboard?.wrongKeyMidis?.length !== 0
    )) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "assisted-locator-or-stale-wrong", keyboard: geometry.keyboard });
    }
    if (stateName === "visual-assist" && (
      geometry.keyboard?.targetVisible !== "true" ||
      geometry.keyboard?.assistTargets?.join(",") !== "48" ||
      geometry.keyboard?.locatorCue !== "two-black" ||
      geometry.keyboard?.locatorBlackKeys?.join(",") !== "49,51" ||
      geometry.keyboard?.wrongKeyMidis?.length !== 0
    )) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "visual-assist-locator-or-stale-wrong", keyboard: geometry.keyboard });
    }
    if (stateName === "wrong-repair-playing" && geometry.keyboard?.wrongKeyMidis?.join(",") !== "53") {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "wrong-repair-key-identity", keyboard: geometry.keyboard });
    }
    if (regularCarrierStates.has(stateName)) {
      const carriers = geometry.semanticCarriers;
      const expectedVisualMidi = ["visual-assist", "modeled-playing"].includes(stateName) ? geometry.targetMidi : null;
      const carrierPass = carriers?.stone?.matchesCurrent === true &&
        carriers.character?.targetLetterMentions?.length === 0 &&
        carriers.character?.targetSolfegeMentions?.length <= 1 &&
        (!solfegeCarrierStates.has(stateName) || carriers.character?.targetSolfegeMentions?.length === 1) &&
        carriers.nonCharacterTargetSurfaces?.length === 0 &&
        carriers.status?.targetLetterMention === false &&
        carriers.status?.solfegeMention === false &&
        (expectedVisualMidi === null
          ? carriers.visualTargetMidis?.length === 0
          : carriers.visualTargetMidis?.join(",") === String(expectedVisualMidi));
      if (!carrierPass) failures.push({ viewportId: viewport.viewportId, stateName, kind: "semantic-target-carrier", carriers, expectedVisualMidi });
      if (["initial-model-ready", "c-complete", "d-complete"].includes(stateName) && (carriers?.startCommand?.text !== "听一声" || carriers?.startCommand?.aria !== "播放示范音")) {
        failures.push({ viewportId: viewport.viewportId, stateName, kind: "neutral-model-command", command: carriers?.startCommand });
      }
    }
    if (stateName === "wrong-repair-playing") {
      const carriers = geometry.semanticCarriers;
      if (carriers?.character?.targetLetterMentions?.length !== 1 || carriers?.nonCharacterTargetSurfaces?.length !== 0 || carriers?.status?.targetLetterMention !== false || carriers?.status?.solfegeMention !== false) {
        failures.push({ viewportId: viewport.viewportId, stateName, kind: "wrong-repair-carrier-exception", carriers });
      }
    }
    if (stateName === "seam-awaiting-response") {
      const carriers = geometry.semanticCarriers;
      if (carriers?.character?.targetLetterMentions?.length || carriers?.character?.targetSolfegeMentions?.length || carriers?.nonCharacterTargetSurfaces?.length || carriers?.status?.targetLetterMention || carriers?.status?.solfegeMention) {
        failures.push({ viewportId: viewport.viewportId, stateName, kind: "hidden-seam-carrier-leak", carriers });
      }
    }
    const undersized = geometry.touchTargets.filter((target) => target.width < 44 || target.height < 44);
    if (undersized.length) failures.push({ viewportId: viewport.viewportId, stateName, kind: "undersized-touch-target", targets: undersized });
    if (geometry.overlaps.speechReplay || geometry.overlaps.speechAssist || geometry.overlaps.speechKeyboard) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "control-overlap", overlaps: geometry.overlaps, zones: geometry.zones });
    }
    if (geometry.visibleTextOutsideSpeech.some((text) => /\b(?:Do|Re|Mi)\b/.test(text))) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "solfege-outside-character-speech", visibleTextOutsideSpeech: geometry.visibleTextOutsideSpeech });
    }
  }
  const screenshot = `${viewport.viewportId}_${stateName}.png`;
  await page.screenshot({ path: path.join(screenshotDir, screenshot), fullPage: false, animations: "disabled" });
  const phaseAfterScreenshot = await page.evaluate(() => document.body.classList.contains("screen-map")
    ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map")
    : (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || ""));
  if (phaseAfterScreenshot !== expected) failures.push({ viewportId: viewport.viewportId, stateName, kind: "screenshot-phase-drift", before: geometry.phase, after: phaseAfterScreenshot });
  return { stateName, expectedActualPhase: expected, geometry, screenshot };
}

async function capturePrimary(browser, viewport) {
  const states = [];
  const entry = await createPage(browser, viewport, { formal: true, serial: "entry" });
  await waitMapPhase(entry.page, "chapter4-lp03-entry");
  states.push(await snapshot(entry.page, viewport, "map-entry"));
  await entry.context.close();

  const initial = await createPage(browser, viewport, { direct: true, serial: "initial" });
  await waitScenePhase(initial.page, "lp03-model-ready");
  states.push(await snapshot(initial.page, viewport, "initial-model-ready"));
  await initial.context.close();

  const route = await createPage(browser, viewport, { formal: true, serial: "route" });
  await startFormal(route.page);
  states.push(await snapshot(route.page, viewport, "c-target-playing"));
  await waitRouteResponse(route.page, 48);
  states.push(await snapshot(route.page, viewport, "c-awaiting-response"));
  await clickKey(route.page, 48);
  await waitScenePhase(route.page, "lp03-child-echo-playing");
  states.push(await snapshot(route.page, viewport, "c-child-echo-playing"));
  await waitScenePhase(route.page, "lp03-target-playing");
  await verifyFormalRouteAdvance(route.page, viewport, "formal-c-ended-auto-d-target", {
    targetMidi: 50,
    activeStep: "D",
    completedSteps: ["C"],
    foundation: { cAwake: true, dPlaced: false, ePlaced: false }
  });
  states.push(await captureCompletedWorldAuditState(browser, viewport, "c-complete", ["C"]));
  await waitRouteResponse(route.page, 50);
  states.push(await snapshot(route.page, viewport, "d-awaiting-response"));
  await clickKey(route.page, 50);
  await waitScenePhase(route.page, "lp03-target-playing");
  await verifyFormalRouteAdvance(route.page, viewport, "formal-d-ended-auto-e-target", {
    targetMidi: 52,
    activeStep: "E",
    completedSteps: ["C", "D"],
    foundation: { cAwake: true, dPlaced: true, ePlaced: false }
  });
  states.push(await captureCompletedWorldAuditState(browser, viewport, "d-complete", ["C", "D"]));
  await waitRouteResponse(route.page, 52);
  states.push(await snapshot(route.page, viewport, "e-awaiting-response"));
  await route.context.close();
  return states;
}

async function captureRepairStates(browser, viewport) {
  const states = [];
  const wrong = await createPage(browser, viewport, { direct: true, serial: "wrong" });
  await waitScenePhase(wrong.page, "lp03-model-ready");
  await wrong.page.locator("#chapter4StartCheck").click();
  await waitRouteResponse(wrong.page, 48);
  await clickKey(wrong.page, 53);
  await waitScenePhase(wrong.page, "lp03-wrong-repair-playing");
  states.push(await snapshot(wrong.page, viewport, "wrong-repair-playing"));
  await wrong.context.close();

  const assisted = await createPage(browser, viewport, { direct: true, serial: "assisted" });
  await waitScenePhase(assisted.page, "lp03-model-ready");
  await assisted.page.locator("#chapter4StartCheck").click();
  await waitRouteResponse(assisted.page, 48);
  await clickKey(assisted.page, 53);
  await waitRouteResponse(assisted.page, 48);
  await clickKey(assisted.page, 53);
  await waitScenePhase(assisted.page, "lp03-assisted");
  states.push(await snapshot(assisted.page, viewport, "assisted"));
  await assisted.page.locator("#chapter4VisualAssist").click();
  await waitScenePhase(assisted.page, "lp03-visual-assist");
  states.push(await snapshot(assisted.page, viewport, "visual-assist"));
  await assisted.context.close();

  const modeled = await createPage(browser, viewport, { direct: true, serial: "modeled" });
  await waitScenePhase(modeled.page, "lp03-model-ready");
  await modeled.page.locator("#chapter4StartCheck").click();
  await waitRouteResponse(modeled.page, 48);
  await modeled.page.evaluate(() => completeLp03Modeled("contract-modeled"));
  await waitScenePhase(modeled.page, "lp03-modeled-playing");
  states.push(await snapshot(modeled.page, viewport, "modeled-playing"));
  await modeled.context.close();
  return states;
}

async function captureRestAndRecovery(browser, viewport) {
  const states = [];
  const cRest = await createPage(browser, viewport, { formal: true, serial: "c-rest" });
  await startFormal(cRest.page);
  await waitRouteResponse(cRest.page, 48);
  await cRest.page.evaluate(() => completeLp03Modeled("contract-c-rest"));
  await waitMapPhase(cRest.page, "chapter4-lp03-entry", 16000);
  states.push(await snapshot(cRest.page, viewport, "c-natural-rest"));
  await cRest.context.close();

  const dRest = await createPage(browser, viewport, { formal: true, serial: "d-rest" });
  await startFormal(dRest.page);
  await waitRouteResponse(dRest.page, 48);
  await clickKey(dRest.page, 48);
  await waitScenePhase(dRest.page, "lp03-target-playing");
  await waitRouteResponse(dRest.page, 50);
  await dRest.page.evaluate(() => completeLp03Modeled("contract-d-rest"));
  await waitMapPhase(dRest.page, "chapter4-lp03-entry", 16000);
  states.push(await snapshot(dRest.page, viewport, "d-natural-rest"));
  await dRest.context.close();

  const resumed = await createPage(browser, viewport, { formal: true, serial: "resume" });
  await startFormal(resumed.page);
  await waitRouteResponse(resumed.page, 48);
  await resumed.page.evaluate(() => completeLp03Modeled("contract-resume-rest"));
  await waitMapPhase(resumed.page, "chapter4-lp03-entry", 16000);
  await resumed.page.reload({ waitUntil: "domcontentloaded" });
  await resumed.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await waitMapPhase(resumed.page, "chapter4-lp03-entry");
  await resumed.page.locator("#gardenRestMarker").click();
  await waitScenePhase(resumed.page, "lp03-target-playing");
  states.push(await snapshot(resumed.page, viewport, "resume-after-reload"));
  await resumed.context.close();
  return states;
}

async function captureSeamAndComplete(browser, viewport) {
  const states = [];
  const seam = await createPage(browser, viewport, { formal: true, serial: "seam" });
  await completeCleanRouteToSeam(seam.page);
  states.push(await snapshot(seam.page, viewport, "seam-awaiting-response"));
  await seam.context.close();

  const complete = await createPage(browser, viewport, { formal: true, serial: "complete" });
  await completeCleanRouteToSeam(complete.page);
  for (let index = 0; index < 3; index += 1) {
    const attempt = await currentAttempt(complete.page);
    await clickKey(complete.page, attempt.seamCheck.sequence[index]);
    if (index < 2) await waitScenePhase(complete.page, "lp03-seam-awaiting-response", 16000);
  }
  await waitMapPhase(complete.page, "chapter4-complete", 16000);
  states.push(await snapshot(complete.page, viewport, "complete-map"));
  await complete.context.close();
  return states;
}

async function captureReduced(browser, viewport) {
  const run = await createPage(browser, viewport, { direct: true, reducedMotion: true, serial: "reduced" });
  await waitScenePhase(run.page, "lp03-model-ready");
  const state = await snapshot(run.page, viewport, "reduced-motion");
  if (!state.geometry.reducedMotion) failures.push({ viewportId: viewport.viewportId, stateName: "reduced-motion", kind: "motion-preference-not-active" });
  await run.context.close();
  return [state];
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const viewportRecords = [];
for (const viewport of viewports) {
  const states = [
    ...(await capturePrimary(browser, viewport)),
    ...(await captureRepairStates(browser, viewport)),
    ...(await captureRestAndRecovery(browser, viewport)),
    ...(await captureSeamAndComplete(browser, viewport)),
    ...(await captureReduced(browser, viewport))
  ];
  const ordered = expectedStates.map((stateName) => states.find((state) => state.stateName === stateName)).filter(Boolean);
  for (const stateName of expectedStates) {
    if (!ordered.some((state) => state.stateName === stateName)) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-state" });
  }
  viewportRecords.push({ ...viewport, states: ordered });
}
await browser.close();

const core = {
  coordinateContractId: "chapter4-lp03-media-zones-overhaul-346a-v1",
  prototypeBaseline: "overhaul-345d-audio-c",
  buildIdentity: "overhaul-347a-c4-r01a",
  runtimeIntegrationAllowed: false,
  deviceValidation: "missing",
  expectedStates,
  expectedActualPhases,
  stateSources,
  formalRouteFlow,
  sourceFiles: sourcePaths.map(sourceFile),
  viewports: viewportRecords,
  failures,
  browserErrors
};
const contractSha256 = sha256(JSON.stringify(core));
const contract = {
  ...core,
  generatedAt: new Date().toISOString(),
  contractSha256,
  status: failures.length || browserErrors.length ? "failed" : "browser_coordinate_contract_passed_device_unverified"
};
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(JSON.stringify({
  id: contract.coordinateContractId,
  status: contract.status,
  sha256: contractSha256,
  viewports: viewportRecords.length,
  states: expectedStates.length,
  failures,
  browserErrors,
  outputPath
}, null, 2));
if (failures.length || browserErrors.length) process.exit(1);
