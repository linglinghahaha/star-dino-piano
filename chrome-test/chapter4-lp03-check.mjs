import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const checks = [];
const errors = [];
const onlyScenario = process.env.LP03_SCENARIO || "";
const scenarioTimeoutMs = Number(process.env.LP03_SCENARIO_TIMEOUT_MS || 90000);
const suiteTimeoutMs = Number(process.env.LP03_SUITE_TIMEOUT_MS || 720000);
const openContexts = new Set();
let browser = null;
let currentScenario = "browser-launch";
let scenarioStartedAt = Date.now();
let shutdownStarted = false;
let scenarioWatchdog = null;
let suiteWatchdog = null;

function beginScenario(name) {
  currentScenario = name;
  scenarioStartedAt = Date.now();
}

function scenarioDetails() {
  return `${currentScenario} after ${Date.now() - scenarioStartedAt}ms`;
}

async function closeWithDeadline(promise, timeoutMs = 5000) {
  await Promise.race([
    Promise.resolve(promise).catch(() => undefined),
    new Promise((resolve) => setTimeout(resolve, timeoutMs))
  ]);
}

async function closeTestResources() {
  const contexts = [...openContexts];
  await Promise.allSettled(contexts.map((context) => closeWithDeadline(context.close())));
  openContexts.clear();
  if (browser) await closeWithDeadline(browser.close());
  browser = null;
}

function hardStop(reason) {
  if (shutdownStarted) return;
  shutdownStarted = true;
  process.exitCode = 1;
  console.error(`chapter4 LP03 timeout: ${reason}; last scenario: ${scenarioDetails()}`);
  const forceExit = setTimeout(() => process.exit(1), 5000);
  forceExit.unref();
  void closeTestResources().finally(() => process.exit(1));
}

function summarizeChecks() {
  const failed = checks.filter((check) => !check.pass);
  console.log(`chapter4 LP03 checks: ${checks.length - failed.length}/${checks.length}`);
  checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
  if (failed.length) console.log(JSON.stringify({ failed }, null, 2));
  if (errors.length) console.log(`browser diagnostics: ${JSON.stringify(errors)}`);
  console.log(`last scenario: ${scenarioDetails()}`);
  return failed.length === 0 && errors.length === 0;
}

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function learningFixture() {
  return {
    version: 3,
    levels: {},
    notes: {},
    staff: {},
    retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null }
  };
}

function formalRuntimeFixture() {
  const completedAt = "2026-07-18T08:00:00.000Z";
  const ls08SessionId = "C3-07-lp03-prerequisite";
  const lp02SessionId = "C4-01-lp02-ended";
  return {
    version: 1,
    active: null,
    history: [
      ...canonicalC1C2History({ completedAt, tag: "lp03" }),
      { sessionId: ls08SessionId, bundleId: "C3-07", status: "ended", completedActions: [{ actionId: "LS08-listening", kind: "garden-listening", targetId: "LS08" }] },
      { sessionId: lp02SessionId, bundleId: "C4-01", status: "ended", completedActions: [{ actionId: "LP02-low-c-home", kind: "chapter4-keyboard", targetId: "LP02", completedAt }] }
    ],
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK", equipmentState: "safe-open", airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: {
        LS08: {
          completed: true, completedAt, sessionId: ls08SessionId, bundleId: "C3-07",
          storyEvents: [{ eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], startedAt: completedAt, endedAt: "2026-07-18T08:00:02.000Z" }]
        }
      },
      resume: null, ls03QualifiedInputs: 2, completed: true, visibleSliceCompleted: true,
      ls04Completed: true, ls05Completed: true, ls06Completed: true, ls07Completed: true, ls08Completed: true,
      ls05PartialRest: null, ls06PartialRest: null, ls07PartialRest: null, ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0, ls08RemediationRequired: false,
      ls04Attempts: [], ls05Attempts: [], ls06Attempts: [], ls07Attempts: [], ls08Attempts: []
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

const lp03FixtureSteps = [
  { id: "C", midi: 48, actionId: "LP03-c-awake", action: "awake", foundationKey: "foundationCAwake" },
  { id: "D", midi: 50, actionId: "LP03-d-place", action: "place", foundationKey: "foundationDPlaced" },
  { id: "E", midi: 52, actionId: "LP03-e-place", action: "place", foundationKey: "foundationEPlaced" }
];

function persistedLp03RouteEvent(step, sessionId, { assisted = false } = {}) {
  return {
    stepId: step.id,
    targetMidi: step.midi,
    action: step.action,
    sessionId,
    route: "screen",
    firstChildMidi: step.midi,
    firstInputRoute: "screen",
    wrongCount: assisted ? 2 : 0,
    childCorrectCount: 1,
    childInputs: [{ midi: step.midi, pitchName: step.id, isBlack: false, noteNameCorrect: true, registerCorrect: true, sameNameWrongOctave: false, correct: true, source: "screen" }],
    inputRoutes: { screen: 1 },
    repairStage: assisted ? "assisted" : "none",
    modeledInputs: [],
    lastWrongInput: assisted ? { midi: step.midi === 48 ? 50 : 48, pitchName: step.midi === 48 ? "D" : "C", isBlack: false, noteNameCorrect: false, registerCorrect: true, sameNameWrongOctave: false, status: "wrong-step" } : null,
    modeled: false,
    strongCueUsed: assisted,
    experimentalInput: false,
    timingInterrupted: false,
    completedAt: "2026-07-19T00:00:00.000Z"
  };
}

function persistedLp03Attempt(step, sessionId, { assisted = false, phase = "lp03-step-complete" } = {}) {
  return {
    version: 1,
    levelId: "LP03",
    bundleId: "C4-02",
    actionId: step.actionId,
    stepId: step.id,
    stepAction: step.action,
    foundationKey: step.foundationKey,
    targetMidi: step.midi,
    sessionId,
    seed: sessionId,
    formalSession: true,
    directMode: false,
    phase,
    outcomeRecorded: true,
    inputArmed: false,
    pendingLp03Input: null,
    audioTransaction: { context: "lp03-child-input", endedAt: "2026-07-19T00:00:00.000Z", interruptedAt: null, status: "ended" },
    audioTrace: [{ kind: "child-key", midi: step.midi, startedAt: "2026-07-19T00:00:00.000Z", endedAt: "2026-07-19T00:00:01.000Z" }],
    wrongCount: assisted ? 2 : 0,
    repairStage: assisted ? "assisted" : "none",
    strongCueUsed: assisted,
    modeled: false,
    experimentalInput: false,
    childCorrectCount: 1,
    childInputs: [{ midi: step.midi, pitchName: step.id, isBlack: false, noteNameCorrect: true, registerCorrect: true, sameNameWrongOctave: false, correct: true, source: "screen" }],
    inputRoutes: { screen: 1 },
    modeledInputs: [],
    observations: [],
    inputEvents: [],
    heldMidiNotes: [],
    routeHeldMidi: { screen: null, MIDI: null, microphone: null },
    routeArmed: { screen: true, MIDI: true, microphone: true }
  };
}

function persistedLp03CompletionFixture({ stepId, assisted = false, seamDeferred = false, finalComplete = false } = {}) {
  const runtime = formalRuntimeFixture();
  const stepIndex = lp03FixtureSteps.findIndex((step) => step.id === stepId);
  const completedSteps = lp03FixtureSteps.slice(0, stepIndex + 1);
  const sessionId = `C4-02-persisted-${stepId}-${assisted ? "assisted" : "clean"}-${seamDeferred ? "deferred" : "ready"}-${finalComplete ? "complete" : "step"}`;
  const routeEvents = completedSteps.map((step) => persistedLp03RouteEvent(step, sessionId, { assisted: assisted && step.id === stepId }));
  const currentStep = lp03FixtureSteps[stepIndex];
  const currentAttempt = persistedLp03Attempt(currentStep, sessionId, {
    assisted,
    phase: finalComplete ? "lp03-complete" : "lp03-step-complete"
  });
  const actions = lp03FixtureSteps.map((step, index) => ({
    actionId: step.actionId,
    kind: "chapter4-keyboard",
    targetId: "LP03",
    lp03Step: step.id,
    runMode: "guided",
    reviewableForMastery: false,
    ...(index === stepIndex ? { chapter4Attempt: currentAttempt, lp03CompletionRecorded: true } : {})
  }));
  runtime.active = {
    sessionId,
    bundleId: "C4-02",
    startedAt: "2026-07-19T00:00:00.000Z",
    localDateKey: "2026-07-19",
    status: "active",
    actionIndex: stepIndex,
    actions,
    completedActions: routeEvents.map((event) => ({
      actionId: lp03FixtureSteps.find((step) => step.id === event.stepId).actionId,
      kind: "chapter4-keyboard",
      targetId: "LP03",
      lp03Step: event.stepId,
      runMode: "guided",
      reviewableForMastery: false,
      stable: false,
      retained: false,
      ...event
    })),
    restAfterCurrentLevel: false
  };
  runtime.chapter4.lp03Progress = {
    foundationCAnchored: true,
    foundationCAwake: completedSteps.some((step) => step.id === "C"),
    foundationDPlaced: completedSteps.some((step) => step.id === "D"),
    foundationEPlaced: completedSteps.some((step) => step.id === "E"),
    played: Boolean(finalComplete),
    needsPractice: Boolean(assisted || seamDeferred),
    completedAt: finalComplete ? "2026-07-19T00:00:02.000Z" : null,
    seamChecks: [],
    seamCheckDeferred: Boolean(seamDeferred),
    routeEvents,
    originSessionId: sessionId,
    lastSessionId: sessionId
  };
  const stats = learningFixture();
  if (finalComplete) {
    const evidence = {
      levelId: "LP03",
      bundleId: "C4-02",
      sessionId,
      completedAt: runtime.chapter4.lp03Progress.completedAt,
      played: true,
      stable: false,
      retained: false,
      needsPractice: Boolean(assisted || seamDeferred),
      foundationCAnchored: true,
      foundationCAwake: true,
      foundationDPlaced: true,
      foundationEPlaced: true,
      routeEvents,
      seamChecks: [],
      seamCheckDeferred: Boolean(seamDeferred),
      stageObservation: { skill: "low-key:C3-E3", count: 0, stable: false, retained: false }
    };
    runtime.chapter4.lessonEvidence.LP03 = evidence;
    runtime.chapter4.lp03Attempts = [evidence];
    stats.levels.LP03 = {
      completions: 1,
      formalCompletions: 1,
      stableCompletions: 0,
      needsPractice: Boolean(assisted || seamDeferred),
      todayNeedsPractice: Boolean(assisted || seamDeferred),
      lastAttempt: evidence
    };
  }
  return { runtime, stats, sessionId };
}

function mapUrl() {
  const value = new URL(baseUrl);
  value.search = "?screen=map&check=chapter4-lp03";
  return value.toString();
}

function chapter4SessionUrl(sessionId) {
  const value = new URL(baseUrl);
  value.search = `?mode=chapter4&bundle=C4-02&sessionId=${encodeURIComponent(sessionId)}&check=chapter4-lp03-persisted-recovery`;
  return value.toString();
}

function directUrl() {
  const value = new URL(baseUrl);
  value.search = "?mode=chapter4&directMode=true&formalSession=false&lesson=LP03&check=chapter4-lp03-direct";
  return value.toString();
}

async function makePage({ formal = false, runtime = null, stats = learningFixture(), failAudioContext = false, sessionSeed = "lp03-check" } = {}) {
  beginScenario(`fixture:${sessionSeed}`);
  if (!browser) throw new Error("LP03 browser is not available");
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  openContexts.add(context);
  context.on("close", () => openContexts.delete(context));
  const runtimeValue = runtime || (formal ? formalRuntimeFixture() : null);
  await context.addInitScript(({ runtime, stats, failAudioContext, sessionSeed }) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["lp03-midi", input]]), onstatechange: null });
    window.__emitMidi = (status, note, velocity = 100) => input.onmidimessage?.({ data: [status, note, velocity] });
    const fixtureSeededKey = "starDinoLp03FixtureSeeded";
    if (!sessionStorage.getItem(fixtureSeededKey)) {
      if (runtime) localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
      localStorage.setItem("starDinoLearningStats", JSON.stringify(stats));
      sessionStorage.setItem(fixtureSeededKey, "1");
    }
    if (sessionSeed) {
      const serialKey = `starDinoLp03UuidSerial:${sessionSeed}`;
      Object.defineProperty(window.crypto, "randomUUID", {
        configurable: true,
        value: () => {
          const serial = Number(sessionStorage.getItem(serialKey) || "0") + 1;
          sessionStorage.setItem(serialKey, String(serial));
          return `${sessionSeed}-${serial}`;
        }
      });
    }
    if (failAudioContext) {
      const BrokenAudioContext = class { constructor() { throw new Error("LP03 controlled audio failure"); } };
      Object.defineProperty(window, "AudioContext", { configurable: true, value: BrokenAudioContext });
      Object.defineProperty(window, "webkitAudioContext", { configurable: true, value: BrokenAudioContext });
    }
  }, { runtime: runtimeValue, stats, failAudioContext, sessionSeed });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  page.setDefaultNavigationTimeout(30000);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return { context, page };
}

async function waitFor(page, predicate, timeout = 12000) {
  await page.waitForFunction(predicate, null, { timeout });
}

async function waitForPhase(page, phase, timeout = 12000) {
  await page.waitForFunction((value) => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === value, phase, { timeout });
}

async function waitForLp03Response(page, targetMidi, timeout = 12000) {
  await page.waitForFunction((target) => {
    const attempt = window.ensureChapter4Attempt?.();
    return attempt?.targetMidi === target && attempt?.phase === "lp03-awaiting-response" && attempt?.inputArmed === true;
  }, targetMidi, { timeout });
}

async function snapshot(page) {
  return page.evaluate(() => {
    const attempt = window.ensureChapter4Attempt?.();
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null");
    const learning = JSON.parse(localStorage.getItem("starDinoLearningStats") || "null");
    const foundation = document.querySelector("#chapter4Foundation");
    const targetMidi = attempt?.levelId === "LP03" ? lp03CurrentTargetMidi(attempt) : null;
    const targetName = chapter4NoteForMidi(targetMidi)?.name || null;
    const targetSolfege = targetName === "C" ? "Do" : (targetName === "D" ? "Re" : (targetName === "E" ? "Mi" : null));
    const speechText = document.querySelector("#chapter4Speech")?.innerText?.replace(/\s+/g, " ").trim() || "";
    const statusText = document.querySelector("#chapter4Status")?.textContent?.replace(/\s+/g, " ").trim() || "";
    const targetStoneIndex = ({ C: 0, D: 1, E: 2 })[targetName] ?? null;
    const semanticSurfaces = [
      ["status", document.querySelector("#chapter4Status")],
      ["start", document.querySelector("#chapter4StartCheck")],
      ["replay", document.querySelector("#chapter4Replay")],
      ["visual-assist", document.querySelector("#chapter4VisualAssist")],
      ["progress", document.querySelector("#chapter4CallProgress")]
    ].map(([id, node]) => ({
      id,
      value: node ? [node.textContent, node.getAttribute("aria-label"), node.getAttribute("title")].filter(Boolean).join(" ").replace(/\s+/g, " ").trim() : ""
    }));
    const carrierAudit = attempt?.levelId === "LP03" ? {
      targetName,
      targetSolfege,
      stone: {
        index: targetStoneIndex,
        text: targetStoneIndex === null ? "" : (foundation?.querySelectorAll("span")?.[targetStoneIndex]?.textContent || "").trim(),
        matchesCurrent: targetStoneIndex !== null && (foundation?.querySelectorAll("span")?.[targetStoneIndex]?.textContent || "").trim() === targetName
      },
      character: {
        text: speechText,
        targetLetterMentions: targetName && speechText.includes(targetName) ? [targetName] : [],
        targetSolfegeMentions: targetSolfege && speechText.includes(targetSolfege) ? [targetSolfege] : []
      },
      nonCharacterTargetCarriers: semanticSurfaces.filter((surface) => targetName && surface.value.includes(targetName)),
      status: {
        text: statusText,
        targetLetterMention: Boolean(targetName && statusText.includes(targetName)),
        solfegeMention: Boolean(targetSolfege && statusText.includes(targetSolfege))
      },
      visualTargetMidis: [...document.querySelectorAll("#keyboard .lp02-assist-target")].map((key) => Number(key.dataset.midi)),
      locatorBlackMidis: [...document.querySelectorAll("#keyboard .black-key.lp03-locator-key")].map((key) => Number(key.dataset.midi)),
      wrongKeyMidis: [...document.querySelectorAll("#keyboard .hit-wrong")].map((key) => Number(key.dataset.midi))
    } : null;
    return JSON.parse(JSON.stringify({
      screen: document.body.classList.contains("screen-map") ? "map" : (document.body.classList.contains("screen-chapter4") ? "chapter4" : "other"),
      attempt,
      runtime,
      learning,
      foundation: foundation ? { ...foundation.dataset } : null,
      carrierAudit,
      scene: document.querySelector("#chapter4Scene") ? {
        phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "",
        repairStage: document.querySelector("#chapter4Scene")?.dataset.repairStage || ""
      } : null,
      speech: {
        main: document.querySelector("#chapter4SpeechMain")?.textContent || "",
        support: document.querySelector("#chapter4SpeechSupport")?.textContent || "",
        aria: document.querySelector("#chapter4Speech")?.getAttribute("aria-live") || "",
        ariaLabel: document.querySelector("#chapter4Speech")?.getAttribute("aria-label") || "",
        status: document.querySelector("#chapter4Status")?.textContent || ""
      },
      startCheck: document.querySelector("#chapter4StartCheck") ? {
        hidden: document.querySelector("#chapter4StartCheck")?.hidden,
        text: document.querySelector("#chapter4StartCheck")?.textContent || "",
        aria: document.querySelector("#chapter4StartCheck")?.getAttribute("aria-label") || ""
      } : null,
      keyboard: document.querySelector("#keyboard") ? {
        targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
        locatorCue: document.querySelector("#keyboard")?.dataset.locatorCue || "",
        assistTargets: document.querySelectorAll("#keyboard .lp02-assist-target").length,
        assistTargetMidis: [...document.querySelectorAll("#keyboard .lp02-assist-target")].map((key) => Number(key.dataset.midi)),
        locatorBlackMidis: [...document.querySelectorAll("#keyboard .black-key.lp03-locator-key")].map((key) => Number(key.dataset.midi)),
        wrongKeyMidis: [...document.querySelectorAll("#keyboard .hit-wrong")].map((key) => Number(key.dataset.midi))
      } : null,
      marker: document.querySelector("#gardenRestMarker") ? {
        disabled: document.querySelector("#gardenRestMarker").disabled,
        strong: document.querySelector("#gardenRestMarker strong")?.textContent,
        phase: document.querySelector("#mapShell")?.dataset.chapter4Phase
      } : null,
      mapProgress: document.querySelector("#mapStarCount") ? {
        text: document.querySelector("#mapStarCount")?.textContent?.replace(/\s+/g, " ").trim() || "",
        aria: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || ""
      } : null
    }));
  });
}

function hasBoundedLp03CarrierSet(state, { requireSolfege = false, visualMidi = null } = {}) {
  const audit = state?.carrierAudit;
  return Boolean(
    audit?.stone?.matchesCurrent &&
    audit.character?.targetLetterMentions?.length === 0 &&
    audit.character?.targetSolfegeMentions?.length <= 1 &&
    (!requireSolfege || audit.character?.targetSolfegeMentions?.length === 1) &&
    audit.nonCharacterTargetCarriers?.length === 0 &&
    audit.status?.targetLetterMention === false &&
    audit.status?.solfegeMention === false &&
    (visualMidi === null
      ? audit.visualTargetMidis?.length === 0
      : audit.visualTargetMidis?.join(",") === String(visualMidi))
  );
}

async function enterFormalLp03(page) {
  await page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await page.locator("#gardenRestMarker").click();
  await waitForLp03Response(page, 48);
}

async function clickRouteKey(page, midi) {
  await page.locator(`#keyboard [data-midi="${midi}"]`).click();
}

async function waitForMap(page, timeout = 12000) {
  await page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout });
}

async function startDirectLp03(page) {
  await page.goto(directUrl(), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await page.locator("#chapter4StartCheck").click();
  await waitForLp03Response(page, 48);
}

async function openPersistedLp03Completion(fixture) {
  const run = await makePage({ runtime: fixture.runtime, stats: fixture.stats, sessionSeed: fixture.sessionId });
  await run.page.goto(chapter4SessionUrl(fixture.sessionId), { waitUntil: "domcontentloaded" });
  await run.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  return run;
}

function countLp03History(runtime) {
  return runtime?.history?.filter((session) => session.bundleId === "C4-02").length || 0;
}

async function completeRouteToSeam(page, seamSeed = null) {
  await waitForLp03Response(page, 48);
  await clickRouteKey(page, 48);
  await waitForLp03Response(page, 50);
  await clickRouteKey(page, 50);
  await waitForLp03Response(page, 52);
  if (seamSeed) {
    await page.evaluate((seed) => {
      const attempt = window.ensureChapter4Attempt();
      attempt.seed = seed;
      window.persistChapter4Attempt();
    }, seamSeed);
  }
  await clickRouteKey(page, 52);
  await waitForPhase(page, "lp03-seam-awaiting-response", 14000);
}

async function seamSeedForFirst(page, targetMidi) {
  return page.evaluate((target) => {
    for (let index = 0; index < 240; index += 1) {
      const seed = `lp03-seam-${target}-${index}`;
      if (window.lp03SeamOrderForSeed(seed)[0] === target) return seed;
    }
    return null;
  }, targetMidi);
}

async function completeRouteToSeamTarget(page, seamSeed = null, seamIndex = 0) {
  await waitForLp03Response(page, 48);
  await clickRouteKey(page, 48);
  await waitForLp03Response(page, 50);
  await clickRouteKey(page, 50);
  await waitForLp03Response(page, 52);
  if (seamSeed) {
    await page.evaluate((seed) => {
      const attempt = window.ensureChapter4Attempt();
      attempt.seed = seed;
      window.persistChapter4Attempt();
    }, seamSeed);
  }
  await clickRouteKey(page, 52);
  await waitForPhase(page, "lp03-seam-target-playing", 14000);
  for (let index = 0; index < seamIndex; index += 1) {
    await waitForPhase(page, "lp03-seam-awaiting-response", 12000);
    const current = await snapshot(page);
    await clickRouteKey(page, current.attempt.seamCheck.sequence[index]);
    await waitForPhase(page, "lp03-seam-target-playing", 12000);
  }
  return snapshot(page);
}

async function observeMapTransitions(page) {
  await page.evaluate(() => {
    window.__lp03MapTransitions = 0;
    let wasMap = document.body.classList.contains("screen-map");
    const observer = new MutationObserver(() => {
      const isMap = document.body.classList.contains("screen-map");
      if (isMap && !wasMap) window.__lp03MapTransitions += 1;
      wasMap = isMap;
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.__lp03MapObserver = observer;
  });
}

async function readMapTransitions(page) {
  return page.evaluate(() => {
    window.__lp03MapObserver?.disconnect();
    return window.__lp03MapTransitions || 0;
  });
}

async function queueSeamMapReturn({ stage, seamIndex, sessionSeed }) {
  const run = await makePage({ formal: true, sessionSeed });
  await enterFormalLp03(run.page);
  let before = await completeRouteToSeamTarget(run.page, null, seamIndex);
  const targetMidi = before.attempt?.seamCheck?.sequence?.[seamIndex];
  if (stage === "child") {
    await waitForPhase(run.page, "lp03-seam-awaiting-response");
    await clickRouteKey(run.page, targetMidi);
    await waitForPhase(run.page, "lp03-seam-child-echo-playing");
  } else if (stage === "repair") {
    await waitForPhase(run.page, "lp03-seam-awaiting-response");
    await clickRouteKey(run.page, targetMidi === 48 ? 50 : 48);
    await waitForPhase(run.page, "lp03-seam-repair-playing");
  }
  before = await snapshot(run.page);
  const errorsBefore = errors.length;
  await observeMapTransitions(run.page);
  await run.page.locator("#mapReturn").click();
  await waitForMap(run.page, 14000);
  await run.page.waitForTimeout(700);
  const after = await snapshot(run.page);
  const mapTransitions = await readMapTransitions(run.page);
  await run.context.close();
  return { before, after, mapTransitions, errorsAdded: errors.length - errorsBefore, stage, seamIndex };
}

async function runSuite() {
const direct = await makePage();
await direct.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await direct.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
let current = await snapshot(direct.page);
record("LP03 direct preview creates no formal session or history", current.runtime === null && current.attempt?.formalSession === false && current.attempt?.directMode === true, current);
record("LP03 direct preview renders inherited C anchor with only D/E suspended", current.foundation?.foundationCAnchored === "true" && current.foundation?.foundationCAwake === "false" && current.foundation?.foundationDPlaced === "false" && current.foundation?.foundationEPlaced === "false", current.foundation);
const directParentSummary = await direct.page.evaluate(() => currentLearningSummary());
record("LP03 parent summary starts with no completed route and no mastery wording", /0\/3/.test(directParentSummary?.detail || "") && !/(stable|retained|C3-E3|稳住|稳定|掌握)/i.test(directParentSummary?.detail || ""), directParentSummary);
await direct.context.close();

const persistedCleanC = persistedLp03CompletionFixture({ stepId: "C" });
const persistedCleanCRun = await openPersistedLp03Completion(persistedCleanC);
await waitForPhase(persistedCleanCRun.page, "lp03-model-ready");
const persistedCleanCAfterFirstOpen = await snapshot(persistedCleanCRun.page);
await persistedCleanCRun.page.reload({ waitUntil: "domcontentloaded" });
await persistedCleanCRun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await waitForPhase(persistedCleanCRun.page, "lp03-model-ready");
const persistedCleanCAfterSecondOpen = await snapshot(persistedCleanCRun.page);
record("LP03 persisted clean C step-complete advances once to D without replaying or duplicating evidence", [persistedCleanCAfterFirstOpen, persistedCleanCAfterSecondOpen].every((state) => state.attempt?.stepId === "D" && state.attempt?.targetMidi === 50 && state.attempt?.phase === "lp03-model-ready" && state.attempt?.audioTrace?.length === 0 && state.runtime?.active?.actionIndex === 1 && state.runtime?.active?.completedActions?.length === 1 && state.runtime?.chapter4?.lp03Progress?.routeEvents?.length === 1 && countLp03History(state.runtime) === 0), { persistedCleanCAfterFirstOpen, persistedCleanCAfterSecondOpen });
await persistedCleanCRun.context.close();

if (onlyScenario) {
  if (onlyScenario !== "persisted-clean-c") throw new Error(`Unknown LP03 scenario: ${onlyScenario}`);
  return summarizeChecks();
}

const persistedCleanD = persistedLp03CompletionFixture({ stepId: "D" });
const persistedCleanDRun = await openPersistedLp03Completion(persistedCleanD);
await waitForPhase(persistedCleanDRun.page, "lp03-model-ready");
const persistedCleanDAfterFirstOpen = await snapshot(persistedCleanDRun.page);
await persistedCleanDRun.page.reload({ waitUntil: "domcontentloaded" });
await persistedCleanDRun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await waitForPhase(persistedCleanDRun.page, "lp03-model-ready");
const persistedCleanDAfterSecondOpen = await snapshot(persistedCleanDRun.page);
record("LP03 persisted clean D step-complete advances once to E without replaying or duplicating evidence", [persistedCleanDAfterFirstOpen, persistedCleanDAfterSecondOpen].every((state) => state.attempt?.stepId === "E" && state.attempt?.targetMidi === 52 && state.attempt?.phase === "lp03-model-ready" && state.attempt?.audioTrace?.length === 0 && state.runtime?.active?.actionIndex === 2 && state.runtime?.active?.completedActions?.length === 2 && state.runtime?.chapter4?.lp03Progress?.routeEvents?.length === 2 && countLp03History(state.runtime) === 0), { persistedCleanDAfterFirstOpen, persistedCleanDAfterSecondOpen });
await persistedCleanDRun.context.close();

const persistedAssistedC = persistedLp03CompletionFixture({ stepId: "C", assisted: true });
const persistedAssistedCRun = await openPersistedLp03Completion(persistedAssistedC);
await waitForMap(persistedAssistedCRun.page, 12000);
const persistedAssistedCAfterFirstOpen = await snapshot(persistedAssistedCRun.page);
await persistedAssistedCRun.page.reload({ waitUntil: "domcontentloaded" });
await persistedAssistedCRun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const persistedAssistedCAfterSecondOpen = await snapshot(persistedAssistedCRun.page);
record("LP03 persisted assisted C step-complete creates one natural rest and one D-E resume without duplicate route evidence", [persistedAssistedCAfterFirstOpen, persistedAssistedCAfterSecondOpen].every((state) => state.screen === "map" && !state.runtime?.active && state.runtime?.chapter4?.resume?.nextStepId === "D" && state.runtime?.chapter4?.resume?.remainingStepIds?.join(",") === "D,E" && state.runtime?.chapter4?.lp03Progress?.routeEvents?.length === 1 && countLp03History(state.runtime) === 1 && state.runtime?.history?.at(-1)?.completedActions?.length === 1), { persistedAssistedCAfterFirstOpen, persistedAssistedCAfterSecondOpen });
await persistedAssistedCRun.context.close();

const persistedCleanE = persistedLp03CompletionFixture({ stepId: "E" });
const persistedCleanERun = await openPersistedLp03Completion(persistedCleanE);
await waitForPhase(persistedCleanERun.page, "lp03-seam-ready");
const persistedCleanEAfterFirstOpen = await snapshot(persistedCleanERun.page);
await persistedCleanERun.page.reload({ waitUntil: "domcontentloaded" });
await persistedCleanERun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await waitForPhase(persistedCleanERun.page, "lp03-seam-ready");
const persistedCleanEAfterSecondOpen = await snapshot(persistedCleanERun.page);
record("LP03 persisted clean E step-complete creates one explicit seam-ready state with no automatic replay", [persistedCleanEAfterFirstOpen, persistedCleanEAfterSecondOpen].every((state) => state.attempt?.seamCheck?.sequence?.length === 3 && state.attempt?.seamCheck?.recoveryGestureRequired === true && state.attempt?.seamCheck?.records?.length === 0 && state.attempt?.inputArmed === false && state.startCheck?.hidden === false && state.startCheck?.text === "听一声" && state.startCheck?.aria === "播放示范音" && state.attempt?.audioTrace?.filter((event) => event.kind === "seam-target").length === 0 && state.runtime?.active?.completedActions?.length === 3 && state.runtime?.chapter4?.lp03Progress?.routeEvents?.length === 3), { persistedCleanEAfterFirstOpen, persistedCleanEAfterSecondOpen });
await persistedCleanERun.page.locator("#chapter4StartCheck").click();
await waitForPhase(persistedCleanERun.page, "lp03-seam-target-playing");
const persistedCleanEAfterGesture = await snapshot(persistedCleanERun.page);
record("LP03 recovered seam plays only after the explicit listen gesture", persistedCleanEAfterGesture.attempt?.seamCheck?.recoveryGestureRequired === false && persistedCleanEAfterGesture.attempt?.audioTrace?.filter((event) => event.kind === "seam-target").length === 1, persistedCleanEAfterGesture);
await persistedCleanERun.context.close();

const persistedDeferredE = persistedLp03CompletionFixture({ stepId: "E", assisted: true, seamDeferred: true });
const persistedDeferredERun = await openPersistedLp03Completion(persistedDeferredE);
await waitForMap(persistedDeferredERun.page, 12000);
const persistedDeferredEAfterFirstOpen = await snapshot(persistedDeferredERun.page);
await persistedDeferredERun.page.reload({ waitUntil: "domcontentloaded" });
await persistedDeferredERun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const persistedDeferredEAfterSecondOpen = await snapshot(persistedDeferredERun.page);
record("LP03 persisted deferred E step-complete finishes once without a seam playback or duplicate completion", [persistedDeferredEAfterFirstOpen, persistedDeferredEAfterSecondOpen].every((state) => state.screen === "map" && !state.runtime?.active && state.runtime?.chapter4?.lp03Progress?.seamCheckDeferred === true && state.runtime?.chapter4?.lessonEvidence?.LP03?.stable === false && state.runtime?.chapter4?.lessonEvidence?.LP03?.retained === false && state.runtime?.chapter4?.lessonEvidence?.LP03?.seamChecks?.length === 0 && countLp03History(state.runtime) === 1 && (state.learning?.levels?.LP03?.completions || 0) === 1 && (state.learning?.levels?.LP03?.stableCompletions || 0) === 0), { persistedDeferredEAfterFirstOpen, persistedDeferredEAfterSecondOpen });

const persistedFinalComplete = persistedLp03CompletionFixture({ stepId: "E", assisted: true, seamDeferred: true, finalComplete: true });
const persistedFinalCompleteRun = await openPersistedLp03Completion(persistedFinalComplete);
await waitForMap(persistedFinalCompleteRun.page, 12000);
const persistedFinalCompleteAfterFirstOpen = await snapshot(persistedFinalCompleteRun.page);
await persistedFinalCompleteRun.page.reload({ waitUntil: "domcontentloaded" });
await persistedFinalCompleteRun.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const persistedFinalCompleteAfterSecondOpen = await snapshot(persistedFinalCompleteRun.page);
record("LP03 persisted complete active session closes once and an already-ended session stays read-only on reopen", [persistedFinalCompleteAfterFirstOpen, persistedFinalCompleteAfterSecondOpen].every((state) => state.screen === "map" && !state.runtime?.active && countLp03History(state.runtime) === 1 && state.runtime?.chapter4?.lessonEvidence?.LP03?.played === true && state.runtime?.chapter4?.lessonEvidence?.LP03?.stable === false && state.runtime?.chapter4?.lessonEvidence?.LP03?.retained === false && (state.learning?.levels?.LP03?.completions || 0) === 1 && (state.learning?.levels?.LP03?.formalCompletions || 0) === 1 && (state.learning?.levels?.LP03?.stableCompletions || 0) === 0), { persistedFinalCompleteAfterFirstOpen, persistedFinalCompleteAfterSecondOpen });
await persistedFinalCompleteRun.context.close();
await persistedDeferredERun.context.close();

const carrierProbe = await makePage();
await carrierProbe.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await carrierProbe.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const carrierModelReady = await snapshot(carrierProbe.page);
await carrierProbe.page.locator("#chapter4StartCheck").click();
await waitForPhase(carrierProbe.page, "lp03-target-playing");
const carrierTargetPlaying = await snapshot(carrierProbe.page);
await waitForLp03Response(carrierProbe.page, 48);
const carrierAwaiting = await snapshot(carrierProbe.page);
await clickRouteKey(carrierProbe.page, 53);
await waitForPhase(carrierProbe.page, "lp03-wrong-repair-playing");
const carrierWrongRepair = await snapshot(carrierProbe.page);
await waitForLp03Response(carrierProbe.page, 48);
await clickRouteKey(carrierProbe.page, 53);
await waitForPhase(carrierProbe.page, "lp03-assisted");
const carrierAssisted = await snapshot(carrierProbe.page);
await carrierProbe.page.locator("#chapter4VisualAssist").click();
await waitForPhase(carrierProbe.page, "lp03-visual-assist");
const carrierVisualAssist = await snapshot(carrierProbe.page);
await carrierProbe.page.evaluate(() => window.completeLp03Modeled("carrier-audit"));
await waitForPhase(carrierProbe.page, "lp03-modeled-playing");
const carrierModeled = await snapshot(carrierProbe.page);
await waitForPhase(carrierProbe.page, "lp03-step-complete");
const carrierStepComplete = await snapshot(carrierProbe.page);
record("LP03 model-ready, target, awaiting and step-complete expose at most the current stone plus character solfege; modeled may add its explicit target key", [
  [carrierModelReady, true],
  [carrierTargetPlaying, true],
  [carrierAwaiting, false],
  [carrierModeled, true, 48],
  [carrierStepComplete, false]
].every(([state, requireSolfege, visualMidi = null]) => hasBoundedLp03CarrierSet(state, { requireSolfege, visualMidi })), {
  modelReady: carrierModelReady.carrierAudit,
  targetPlaying: carrierTargetPlaying.carrierAudit,
  awaitingResponse: carrierAwaiting.carrierAudit,
  modeled: carrierModeled.carrierAudit,
  stepComplete: carrierStepComplete.carrierAudit
});
record("LP03 assisted and visual carrier audit keeps commands and status neutral while allowing only the explicit visual target", hasBoundedLp03CarrierSet(carrierAssisted, { requireSolfege: true }) && carrierAssisted.carrierAudit?.locatorBlackMidis?.join(",") === "49,51" && hasBoundedLp03CarrierSet(carrierVisualAssist, { requireSolfege: true, visualMidi: 48 }) && carrierVisualAssist.carrierAudit?.locatorBlackMidis?.join(",") === "49,51", {
  assisted: carrierAssisted.carrierAudit,
  visualAssist: carrierVisualAssist.carrierAudit
});
record("LP03 wrong repair is the only target-letter relationship exception and leaves the non-character status neutral", carrierWrongRepair.carrierAudit?.character?.targetLetterMentions?.join(",") === "C" && carrierWrongRepair.speech?.main.includes("刚才是 F") && carrierWrongRepair.carrierAudit?.nonCharacterTargetCarriers?.length === 0 && carrierWrongRepair.carrierAudit?.status?.targetLetterMention === false && carrierWrongRepair.carrierAudit?.status?.solfegeMention === false && carrierWrongRepair.carrierAudit?.wrongKeyMidis?.join(",") === "53", carrierWrongRepair.carrierAudit);
await carrierProbe.context.close();

const formal = await makePage({ formal: true, sessionSeed: "lp03-formal" });
await formal.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await formal.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const formalMapEntry = await snapshot(formal.page);
record(
  "LP03 map keeps the child-facing second journey state while accessibility exposes the canonical course stop",
  formalMapEntry.screen === "map" &&
    formalMapEntry.mapProgress?.text === "跟着星芽" &&
    formalMapEntry.mapProgress?.aria === "地下回声洞课程进度：共 3 站，现在第 2 站，准备" &&
    formalMapEntry.marker?.phase === "chapter4-lp03-entry" &&
    formalMapEntry.marker?.strong === "铺低音 C-D-E 地基" &&
    formalMapEntry.marker?.disabled === false,
  { mapProgress: formalMapEntry.mapProgress, marker: formalMapEntry.marker }
);
await formal.page.locator("#gardenRestMarker").click();
await waitForLp03Response(formal.page, 48);
current = await snapshot(formal.page);
record("Formal C4-02 entry requires ended C4-01 plus inherited LP02 C anchor", current.runtime?.active?.bundleId === "C4-02" && current.runtime.active.actions.map((action) => action.actionId).join(",") === "LP03-c-awake,LP03-d-place,LP03-e-place" && current.foundation?.foundationCAnchored === "true" && current.foundation?.foundationCAwake === "false", current);
record("First LP03 target records real started and ended before opening C input", current.attempt?.audioTransaction?.context === "lp03-target" && Boolean(current.attempt?.audioTransaction?.startedAt) && Boolean(current.attempt?.audioTransaction?.endedAt) && current.attempt?.inputArmed === true, current.attempt?.audioTransaction);
await clickRouteKey(formal.page, 48);
await waitFor(formal.page, () => window.ensureChapter4Attempt?.()?.targetMidi === 50 && ["lp03-target-playing", "lp03-awaiting-response"].includes(window.ensureChapter4Attempt?.()?.phase));
current = await snapshot(formal.page);
record("C child echo ended before C anchor wakes and only C changes", current.foundation?.foundationCAwake === "true" && current.foundation?.foundationDPlaced === "false" && current.attempt?.targetMidi === 50 && current.runtime?.active?.completedActions?.length === 1 && current.runtime.active.completedActions[0]?.stepId === "C", current);
const parentSummaryAfterC = await formal.page.evaluate(() => currentLearningSummary());
  record("LP03 parent summary names only settled C after the next D target begins", /1\/3/.test(parentSummaryAfterC?.detail || "") && /已完成 C/.test(parentSummaryAfterC?.detail || "") && !/(已完成 C、D|已完成 C-D|stable|retained|C3-E3|稳住|稳定|掌握)/i.test(parentSummaryAfterC?.detail || ""), parentSummaryAfterC);
await waitForLp03Response(formal.page, 50);
await clickRouteKey(formal.page, 50);
await waitForLp03Response(formal.page, 52);
current = await snapshot(formal.page);
record("D child echo ended before only D stone lands", current.foundation?.foundationCAwake === "true" && current.foundation?.foundationDPlaced === "true" && current.foundation?.foundationEPlaced === "false" && current.runtime?.active?.completedActions?.length === 2, current);
await clickRouteKey(formal.page, 52);
await waitForPhase(formal.page, "lp03-seam-awaiting-response", 14000);
current = await snapshot(formal.page);
record("E ends before final stone lands and clean route starts only reduced-cue stage observation", current.foundation?.foundationEPlaced === "true" && current.attempt?.seamCheck?.sequence?.length === 3 && current.runtime?.active?.completedActions?.length === 3, current);
const seamSequence = current.attempt.seamCheck.sequence.slice();
for (const [index, midi] of seamSequence.entries()) {
  await clickRouteKey(formal.page, midi);
  if (index < seamSequence.length - 1) await waitForPhase(formal.page, "lp03-seam-awaiting-response", 12000);
}
await formal.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 14000 });
current = await snapshot(formal.page);
const lp03Evidence = current.runtime?.chapter4?.lessonEvidence?.LP03;
record("LP03 completion writes played route and stage observations but stable/retained remain zero", lp03Evidence?.played === true && lp03Evidence?.stable === false && lp03Evidence?.retained === false && lp03Evidence?.routeEvents?.length === 3 && lp03Evidence?.seamChecks?.length === 3 && current.runtime?.chapter4?.lp03Progress?.played === true, lp03Evidence);
record("LP03 completion naturally returns to map without starting LP04", current.screen === "map" && !current.runtime?.active && current.runtime?.history?.at(-1)?.bundleId === "C4-02", current.runtime?.history?.at(-1));
record(
  "LP03 completion opens the child-facing LP04 journey without creating C4-03",
  current.mapProgress?.text === "跟着星芽" &&
    current.mapProgress?.aria === "地下回声洞课程进度：共 3 站，现在第 3 站，准备" &&
    current.marker?.phase === "chapter4-lp04-ready" &&
    current.marker?.strong === "送 E-D-C 向下回声" &&
    current.marker?.disabled === false,
  { mapProgress: current.mapProgress, marker: current.marker }
);
const completionPresentation = await formal.page.evaluate(() => {
  renderParentPanel();
  return {
    learning: currentLearningSummary(),
    mastery: currentMasterySummary(),
    marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
    mapProgress: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || "",
    parentStatus: document.querySelector("#parentMasteryStatus")?.textContent || "",
    parentDetail: document.querySelector("#parentMasteryDetail")?.textContent || "",
    parentEvidence: document.querySelector("#parentEvidenceList")?.textContent?.replace(/\s+/g, " ").trim() || "",
    parentProgress: document.querySelector("#parentProgressText")?.textContent || ""
  };
});
const completionCopy = Object.values(completionPresentation).flatMap((value) => typeof value === "string" ? [value] : [value?.detail || "", value?.status || "", value?.focus || ""]).join(" ");
record("LP03 child and parent completion copy describes foundations being connected or placed without implying stable mastery", /接好|安放/.test(completionCopy) && !/稳住|稳定|掌握/.test(completionCopy) && lp03Evidence?.stable === false && lp03Evidence?.retained === false, completionPresentation);
await formal.context.close();

const registerAxes = await makePage();
await startDirectLp03(registerAxes.page);
await clickRouteKey(registerAxes.page, 53);
await waitForPhase(registerAxes.page, "lp03-wrong-repair-playing");
const sameRegisterWhite = await snapshot(registerAxes.page);
await waitForLp03Response(registerAxes.page, 48);
await clickRouteKey(registerAxes.page, 49);
await waitForPhase(registerAxes.page, "lp03-wrong-repair-playing");
const sameRegisterBlack = await snapshot(registerAxes.page);
record("LP03 low-register white and black wrong inputs keep the true register axis", sameRegisterWhite.attempt?.lastWrongInput?.midi === 53 && sameRegisterWhite.attempt?.lastWrongInput?.pitchName === "F" && sameRegisterWhite.attempt?.lastWrongInput?.isBlack === false && sameRegisterWhite.attempt?.lastWrongInput?.noteNameCorrect === false && sameRegisterWhite.attempt?.lastWrongInput?.registerCorrect === true && sameRegisterWhite.keyboard?.wrongKeyMidis?.join(",") === "53" && sameRegisterBlack.attempt?.lastWrongInput?.midi === 49 && sameRegisterBlack.attempt?.lastWrongInput?.pitchName === "C#" && sameRegisterBlack.attempt?.lastWrongInput?.isBlack === true && sameRegisterBlack.attempt?.lastWrongInput?.registerCorrect === true && sameRegisterBlack.keyboard?.wrongKeyMidis?.join(",") === "49", { sameRegisterWhite, sameRegisterBlack });
await registerAxes.context.close();

const octaveAxes = await makePage();
await startDirectLp03(octaveAxes.page);
await clickRouteKey(octaveAxes.page, 48);
await waitForPhase(octaveAxes.page, "lp03-model-ready");
await octaveAxes.page.locator("#chapter4StartCheck").click();
await waitForLp03Response(octaveAxes.page, 50);
await clickRouteKey(octaveAxes.page, 62);
await waitForPhase(octaveAxes.page, "lp03-wrong-repair-playing");
const d4Wrong = await snapshot(octaveAxes.page);
await waitForLp03Response(octaveAxes.page, 50);
await clickRouteKey(octaveAxes.page, 50);
await waitForPhase(octaveAxes.page, "lp03-model-ready");
await octaveAxes.page.locator("#chapter4StartCheck").click();
await waitForLp03Response(octaveAxes.page, 52);
await clickRouteKey(octaveAxes.page, 64);
await waitForPhase(octaveAxes.page, "lp03-wrong-repair-playing");
const e4Wrong = await snapshot(octaveAxes.page);
record("LP03 C4-D4-E4 same-name octave mistakes keep note name true but register false", d4Wrong.attempt?.lastWrongInput?.midi === 62 && d4Wrong.attempt?.lastWrongInput?.noteNameCorrect === true && d4Wrong.attempt?.lastWrongInput?.registerCorrect === false && e4Wrong.attempt?.lastWrongInput?.midi === 64 && e4Wrong.attempt?.lastWrongInput?.noteNameCorrect === true && e4Wrong.attempt?.lastWrongInput?.registerCorrect === false, { d4Wrong, e4Wrong });
await octaveAxes.context.close();

const routeBoundaries = await makePage();
await startDirectLp03(routeBoundaries.page);
await clickRouteKey(routeBoundaries.page, 52);
await waitForPhase(routeBoundaries.page, "lp03-wrong-repair-playing");
const futureStep = await snapshot(routeBoundaries.page);
await routeBoundaries.context.close();
const completedBoundary = await makePage();
await startDirectLp03(completedBoundary.page);
await clickRouteKey(completedBoundary.page, 48);
await waitForPhase(completedBoundary.page, "lp03-model-ready");
await completedBoundary.page.locator("#chapter4StartCheck").click();
await waitForLp03Response(completedBoundary.page, 50);
await clickRouteKey(completedBoundary.page, 48);
await waitForPhase(completedBoundary.page, "lp03-wrong-repair-playing");
const completedRepeat = await snapshot(completedBoundary.page);
record("LP03 future and completed route notes remain wrong observations", futureStep.attempt?.lastWrongInput?.status === "future-step" && completedRepeat.attempt?.lastWrongInput?.status === "completed-step-repeat" && futureStep.foundation?.foundationCAwake === "false" && completedRepeat.foundation?.foundationDPlaced === "false", { futureStep, completedRepeat });
await completedBoundary.context.close();

const assisted = await makePage();
await startDirectLp03(assisted.page);
await clickRouteKey(assisted.page, 50);
await waitForLp03Response(assisted.page, 48);
await clickRouteKey(assisted.page, 52);
await waitForPhase(assisted.page, "lp03-assisted");
const afterSecondWrong = await snapshot(assisted.page);
await assisted.page.locator("#chapter4VisualAssist").click();
await waitForPhase(assisted.page, "lp03-visual-assist");
const afterVisualAssist = await snapshot(assisted.page);
await clickRouteKey(assisted.page, 50);
await waitForPhase(assisted.page, "lp03-step-complete");
const afterThirdWrong = await snapshot(assisted.page);
record("LP03 second wrong remains armed for a later assisted-route wrong, which records modeled without child credit", afterSecondWrong.attempt?.wrongCount === 2 && afterSecondWrong.attempt?.repairStage === "assisted" && afterSecondWrong.attempt?.inputArmed === true && afterSecondWrong.scene?.repairStage === "assisted" && afterThirdWrong.attempt?.modeled === true && afterThirdWrong.attempt?.modeledInputs?.length === 1 && afterThirdWrong.attempt?.modeledInputs?.[0]?.source === "model" && afterThirdWrong.attempt?.childCorrectCount === 0 && afterThirdWrong.attempt?.childInputs?.length === 3, { afterSecondWrong, afterThirdWrong });
record("LP03 assisted and visual help isolate the low two-black locator and clear stale wrong feedback", afterSecondWrong.keyboard?.targetVisible === "false" && afterSecondWrong.keyboard?.assistTargets === 0 && afterSecondWrong.keyboard?.locatorCue === "two-black" && afterSecondWrong.keyboard?.locatorBlackMidis?.join(",") === "49,51" && afterSecondWrong.keyboard?.wrongKeyMidis?.length === 0 && afterVisualAssist.keyboard?.targetVisible === "true" && afterVisualAssist.keyboard?.assistTargetMidis?.join(",") === "48" && afterVisualAssist.keyboard?.locatorCue === "two-black" && afterVisualAssist.keyboard?.locatorBlackMidis?.join(",") === "49,51" && afterVisualAssist.keyboard?.wrongKeyMidis?.length === 0, { afterSecondWrong, afterVisualAssist });
await assisted.context.close();

const assistedChild = await makePage();
await startDirectLp03(assistedChild.page);
await clickRouteKey(assistedChild.page, 50);
await waitForLp03Response(assistedChild.page, 48);
await clickRouteKey(assistedChild.page, 52);
await waitForPhase(assistedChild.page, "lp03-assisted");
await clickRouteKey(assistedChild.page, 48);
await waitForPhase(assistedChild.page, "lp03-step-complete");
const assistedChildComplete = await snapshot(assistedChild.page);
record("LP03 assisted child correct stays child-owned after echo ended and never creates modeled input", assistedChildComplete.attempt?.strongCueUsed === true && assistedChildComplete.attempt?.repairStage === "assisted" && assistedChildComplete.attempt?.childCorrectCount === 1 && assistedChildComplete.attempt?.childInputs?.length === 3 && assistedChildComplete.attempt?.modeledInputs?.length === 0 && assistedChildComplete.attempt?.completionSource === "屏幕", assistedChildComplete);
await assistedChild.context.close();

const assistedTimeout = await makePage();
await startDirectLp03(assistedTimeout.page);
await clickRouteKey(assistedTimeout.page, 50);
await waitForLp03Response(assistedTimeout.page, 48);
await clickRouteKey(assistedTimeout.page, 52);
await waitForPhase(assistedTimeout.page, "lp03-assisted");
await waitForPhase(assistedTimeout.page, "lp03-modeled-playing", 8000);
await waitForPhase(assistedTimeout.page, "lp03-step-complete");
const assistedTimedOut = await snapshot(assistedTimeout.page);
record("LP03 assisted timeout, rather than the assisted prompt, is what records modeled completion", assistedTimedOut.attempt?.childCorrectCount === 0 && assistedTimedOut.attempt?.childInputs?.length === 2 && assistedTimedOut.attempt?.modeledInputs?.length === 1 && assistedTimedOut.attempt?.modeledInputs?.[0]?.reason === "assisted-timeout" && assistedTimedOut.attempt?.completionSource === "model", assistedTimedOut);
await assistedTimeout.context.close();

const modeled = await makePage();
await startDirectLp03(modeled.page);
await modeled.page.evaluate(() => window.completeLp03Modeled("test-modeled"));
await waitForPhase(modeled.page, "lp03-modeled-playing");
await modeled.page.waitForTimeout(100);
const modeledBeforeEnd = await snapshot(modeled.page);
await waitForPhase(modeled.page, "lp03-step-complete");
const modeledAfterEnd = await snapshot(modeled.page);
record("LP03 modeled route does not complete on wall-clock setup and writes only a model input after ended", modeledBeforeEnd.attempt?.outcomeRecorded === false && modeledBeforeEnd.attempt?.audioTransaction?.endedAt === null && modeledAfterEnd.attempt?.modeledInputs?.length === 1 && modeledAfterEnd.attempt?.modeledInputs?.[0]?.source === "model" && modeledAfterEnd.attempt?.childCorrectCount === 0 && modeledAfterEnd.attempt?.childInputs?.length === 0, { modeledBeforeEnd, modeledAfterEnd });
await modeled.context.close();

const audit = await makePage({ formal: true, sessionSeed: "lp03-audit" });
await enterFormalLp03(audit.page);
const auditSessionId = (await snapshot(audit.page)).runtime?.active?.sessionId;
await clickRouteKey(audit.page, 60);
await waitForLp03Response(audit.page, 48);
const beforeAuditReload = await snapshot(audit.page);
await audit.page.reload({ waitUntil: "domcontentloaded" });
await audit.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await waitForLp03Response(audit.page, 48);
const afterAuditReload = await snapshot(audit.page);
await audit.page.locator("#mapReturn").click();
await waitForMap(audit.page);
await audit.page.locator("#gardenRestMarker").click();
await waitForLp03Response(audit.page, 48);
const afterAuditMap = await snapshot(audit.page);
await clickRouteKey(audit.page, 48);
await waitForLp03Response(audit.page, 50);
await clickRouteKey(audit.page, 49);
await waitForLp03Response(audit.page, 50);
await clickRouteKey(audit.page, 50);
await waitForLp03Response(audit.page, 52);
await clickRouteKey(audit.page, 52);
await waitForMap(audit.page, 14000);
const auditFinal = await snapshot(audit.page);
const auditEvidence = auditFinal.runtime?.chapter4?.lessonEvidence?.LP03;
const auditCEvent = auditEvidence?.routeEvents?.find((event) => event.stepId === "C");
const auditDEvent = auditEvidence?.routeEvents?.find((event) => event.stepId === "D");
const auditCCompletion = auditFinal.runtime?.history?.at(-1)?.completedActions?.find((action) => action.lp03Step === "C");
record("LP03 audit fields survive refresh and map re-entry without changing the formal action", beforeAuditReload.runtime?.active?.sessionId === auditSessionId && afterAuditReload.runtime?.active?.sessionId === auditSessionId && afterAuditMap.runtime?.active?.sessionId === auditSessionId && beforeAuditReload.attempt?.childInputs?.length === 1 && afterAuditReload.attempt?.childInputs?.length === 1 && afterAuditMap.attempt?.childInputs?.length === 1 && afterAuditMap.attempt?.repairStage === "normal", { beforeAuditReload, afterAuditReload, afterAuditMap });
record("LP03 completed actions and final evidence preserve child inputs, routes, repair stage and zero stable-retained", auditCEvent?.wrongCount === 1 && auditCEvent?.childInputs?.length === 2 && auditCEvent?.childInputs?.[0]?.noteNameCorrect === true && auditCEvent?.childInputs?.[0]?.registerCorrect === false && auditCEvent?.childInputs?.[0]?.sameNameWrongOctave === true && Object.values(auditCEvent?.inputRoutes || {}).reduce((sum, value) => sum + value, 0) === 2 && auditCEvent?.lastWrongInput?.noteNameCorrect === true && auditCEvent?.lastWrongInput?.registerCorrect === false && auditCEvent?.repairStage === "normal" && auditCEvent?.modeledInputs?.length === 0 && auditCEvent?.childCorrectCount === 1 && auditCCompletion?.childInputs?.length === 2 && auditCCompletion?.lastWrongInput?.sameNameWrongOctave === true && auditDEvent?.childInputs?.[0]?.isBlack === true && auditDEvent?.childInputs?.[0]?.pitchName === "C#" && auditDEvent?.childInputs?.[0]?.registerCorrect === true && auditDEvent?.lastWrongInput?.registerCorrect === true && auditEvidence?.stable === false && auditEvidence?.retained === false && (auditFinal.learning?.levels?.LP03?.stableCompletions || 0) === 0, { auditEvidence, auditCCompletion, auditDEvent, learning: auditFinal.learning?.levels?.LP03 });
await audit.context.close();

const modeledFormal = await makePage({ formal: true, sessionSeed: "lp03-modeled-audit" });
await enterFormalLp03(modeledFormal.page);
await modeledFormal.page.evaluate(() => window.completeLp03Modeled("test-formal-modeled"));
await waitForMap(modeledFormal.page, 12000);
current = await snapshot(modeledFormal.page);
const modeledCompletion = current.runtime?.history?.at(-1)?.completedActions?.find((action) => action.lp03Step === "C");
record("LP03 formal modeled completion records a model input without turning it into a child correct", modeledCompletion?.modeled === true && modeledCompletion?.modeledInputs?.length === 1 && modeledCompletion?.modeledInputs?.[0]?.source === "model" && modeledCompletion?.childCorrectCount === 0 && modeledCompletion?.childInputs?.length === 0 && modeledCompletion?.stable === false && modeledCompletion?.retained === false, modeledCompletion);
await modeledFormal.context.close();

const wrong = await makePage();
await wrong.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await wrong.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await wrong.page.locator("#chapter4StartCheck").click();
await waitForLp03Response(wrong.page, 48);
await clickRouteKey(wrong.page, 60);
await waitForPhase(wrong.page, "lp03-wrong-repair-playing");
current = await snapshot(wrong.page);
const wrongTrace = current.attempt?.audioTrace || [];
record("C4 same-name wrong octave creates child then target repair without moving a stone", current.attempt?.wrongCount === 1 && current.attempt?.lastWrongInput?.sameNameWrongOctave === true && current.foundation?.foundationCAwake === "false" && wrongTrace.filter((event) => event.kind === "child-key").length === 1 && wrongTrace.filter((event) => event.kind === "repair-target").length === 1, current.attempt);
record("LP03 character repair copy distinguishes white, black, octave, completed and future-note relationships while non-character status stays neutral", sameRegisterWhite.speech?.main.includes("刚才是 F") && sameRegisterWhite.speech?.main.includes("找 C") && sameRegisterBlack.speech?.main.includes("C# 黑键") && sameRegisterBlack.speech?.main.includes("找 C") && current.speech?.main.includes("都是 C") && current.speech?.main.includes("更低") && completedRepeat.speech?.main.includes("C 已经就位") && completedRepeat.speech?.main.includes("找 D") && futureStep.speech?.main.includes("E 等会儿再来") && futureStep.speech?.main.includes("先找 C") && sameRegisterBlack.speech?.ariaLabel === "" && sameRegisterBlack.speech?.status === "正在比较两声琴音", { sameRegisterWhite, sameRegisterBlack, sameNameWrongOctave: current, completedRepeat, futureStep });
await waitForLp03Response(wrong.page, 48);
await wrong.context.close();

const held = await makePage();
await held.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await held.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await held.page.evaluate(() => window.connectMIDI());
await held.page.locator("#chapter4StartCheck").click();
await waitForLp03Response(held.page, 48);
await held.page.evaluate(() => window.__emitMidi(0x90, 60, 100));
await waitForPhase(held.page, "lp03-wrong-repair-playing");
await waitForPhase(held.page, "lp03-awaiting-response");
const beforeHeld = await snapshot(held.page);
await held.page.evaluate(() => window.__emitMidi(0x90, 60, 100));
await held.page.waitForTimeout(220);
current = await snapshot(held.page);
await held.page.evaluate(() => window.__emitMidi(0x80, 60, 0));
await waitForLp03Response(held.page, 48);
const released = await snapshot(held.page);
record("Held MIDI note remains observation-only after repair and one note-off rearms once", current.attempt?.wrongCount === 1 && current.attempt?.audioTrace?.length === beforeHeld.attempt?.audioTrace?.length && current.attempt?.heldMidiNotes?.includes(60) && released.attempt?.heldMidiNotes?.length === 0 && released.attempt?.inputArmed === true, { beforeHeld, current, released });
await held.context.close();

const unavailable = await makePage({ failAudioContext: true });
await unavailable.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await unavailable.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await unavailable.page.locator("#chapter4StartCheck").click();
await waitForPhase(unavailable.page, "sound-paused");
current = await snapshot(unavailable.page);
record("Muted or unavailable teaching audio cannot arm or move a foundation", current.attempt?.inputArmed === false && current.foundation?.foundationCAwake === "false" && current.attempt?.audioTransaction?.interruptedAt && current.attempt?.outcomeRecorded === false, current);
await unavailable.context.close();

const queued = await makePage({ formal: true, sessionSeed: "lp03-queued" });
await queued.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await queued.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await queued.page.locator("#gardenRestMarker").click();
await waitForPhase(queued.page, "lp03-target-playing");
await queued.page.locator("#mapReturn").click();
await queued.page.evaluate(() => window.interruptTeachingPianoSequence?.("lp03-queued-interrupt"));
await queued.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
current = await snapshot(queued.page);
const queuedAttempt = current.runtime?.active?.actions?.[0]?.chapter4Attempt;
record("Queued map return consumes once after interrupted LP03 playback without score or stone", current.screen === "map" && queuedAttempt?.audioTransaction?.interruptedAt && queuedAttempt?.audioTransaction?.returnQueuedConsumedAt && queuedAttempt?.outcomeRecorded === false && current.runtime?.history?.filter((session) => session.bundleId === "C4-02").length === 0, queuedAttempt);
await queued.context.close();

const microphone = await makePage({ formal: true, sessionSeed: "lp03-mic" });
await enterFormalLp03(microphone.page);
await microphone.page.evaluate(() => window.handleInput(48, "麦克风"));
await waitForPhase(microphone.page, "lp03-child-echo-playing");
await microphone.page.locator("#mapReturn").click();
await microphone.page.evaluate(() => window.releaseGardenInput(48, "麦克风"));
await microphone.page.waitForTimeout(220);
current = await snapshot(microphone.page);
const micAttempt = current.runtime?.active?.actions?.[0]?.chapter4Attempt;
record("Microphone accepted onset interrupted by map cannot commit from late quiet", current.screen === "map" && micAttempt?.audioTransaction?.interruptedAt && !micAttempt?.audioTransaction?.endedAt && micAttempt?.outcomeRecorded === false && current.runtime?.chapter4?.lp03Progress?.routeEvents?.length === 0, micAttempt);
await microphone.context.close();

const seamIdentityC = await makePage({ formal: true, sessionSeed: "lp03-seam-identity-c" });
await enterFormalLp03(seamIdentityC.page);
const cFirstSeed = await seamSeedForFirst(seamIdentityC.page, 48);
await completeRouteToSeamTarget(seamIdentityC.page, cFirstSeed);
await waitForPhase(seamIdentityC.page, "lp03-seam-awaiting-response");
const seamCResponse = await snapshot(seamIdentityC.page);
await clickRouteKey(seamIdentityC.page, 48);
await waitForPhase(seamIdentityC.page, "lp03-seam-ready");
const seamCReady = await snapshot(seamIdentityC.page);
record("LP03 C-first seam uses C playback without key prelight and exposes a neutral next-listen command", seamCResponse.attempt?.seamCheck?.sequence?.[0] === 48 && seamCResponse.attempt?.audioTransaction?.midis?.[0] === 48 && !/E/.test(seamCResponse.speech?.main || "") && seamCResponse.keyboard?.targetVisible === "false" && seamCResponse.keyboard?.assistTargets === 0 && seamCReady.startCheck?.text === "听一声" && seamCReady.startCheck?.aria === "播放示范音" && seamCReady.keyboard?.targetVisible === "false" && seamCReady.keyboard?.assistTargets === 0, { seamCResponse, seamCReady });
await seamIdentityC.context.close();

const seamIdentityD = await makePage({ formal: true, sessionSeed: "lp03-seam-identity-d" });
await enterFormalLp03(seamIdentityD.page);
const dFirstSeed = await seamSeedForFirst(seamIdentityD.page, 50);
await completeRouteToSeamTarget(seamIdentityD.page, dFirstSeed);
await waitForPhase(seamIdentityD.page, "lp03-seam-awaiting-response");
const seamDResponse = await snapshot(seamIdentityD.page);
await clickRouteKey(seamIdentityD.page, 48);
await waitForPhase(seamIdentityD.page, "lp03-seam-repair-playing");
const seamDRepair = await snapshot(seamIdentityD.page);
record("LP03 D-first seam keeps repair playback aligned to D without leaking the route-final E", seamDResponse.attempt?.seamCheck?.sequence?.[0] === 50 && seamDResponse.attempt?.audioTransaction?.midis?.[0] === 50 && seamDResponse.keyboard?.targetVisible === "false" && seamDRepair.attempt?.audioTransaction?.midis?.[0] === 50 && !seamDRepair.speech?.main.includes("D") && !seamDRepair.speech?.main.includes("E"), { seamDResponse, seamDRepair });
await seamIdentityD.context.close();

const seamTimeout = await makePage({ formal: true, sessionSeed: "lp03-seam-timeout" });
await enterFormalLp03(seamTimeout.page);
await completeRouteToSeam(seamTimeout.page);
await seamTimeout.page.evaluate(() => {
  const attempt = window.ensureChapter4Attempt();
  attempt.strongCueUsed = true;
  window.completeLp03SeamModeled(attempt, "seam-timeout");
});
await waitForPhase(seamTimeout.page, "lp03-seam-modeled-playing");
await seamTimeout.page.waitForTimeout(100);
const seamModeledBeforeEnd = await snapshot(seamTimeout.page);
await waitForMap(seamTimeout.page, 12000);
const seamModeledAfterEnd = await snapshot(seamTimeout.page);
const seamModeledEvidence = seamModeledAfterEnd.runtime?.chapter4?.lessonEvidence?.LP03;
const seamModeledAction = seamModeledAfterEnd.runtime?.history?.at(-1)?.actions?.find((action) => action.lp03Step === "E")?.chapter4Attempt;
record("LP03 seam timeout waits for real modeled end, records one zero-child observation and rests without a next seam", seamModeledBeforeEnd.attempt?.audioTransaction?.endedAt === null && seamModeledBeforeEnd.attempt?.seamCheck?.records?.length === 0 && seamModeledAfterEnd.screen === "map" && seamModeledEvidence?.seamChecks?.length === 1 && seamModeledEvidence?.seamChecks?.[0]?.modeled === true && seamModeledEvidence?.seamChecks?.[0]?.childCorrectCount === 0 && seamModeledEvidence?.seamCheckDeferred === true && seamModeledEvidence?.needsPractice === true && seamModeledAction?.audioTrace?.filter((event) => event.kind === "seam-target").length === 1, { seamModeledBeforeEnd, seamModeledEvidence, seamModeledAction });
await seamTimeout.context.close();

const eQueuedReturn = await makePage({ formal: true, sessionSeed: "lp03-e-queued-return" });
await enterFormalLp03(eQueuedReturn.page);
await clickRouteKey(eQueuedReturn.page, 48);
await waitForLp03Response(eQueuedReturn.page, 50);
await clickRouteKey(eQueuedReturn.page, 50);
await waitForLp03Response(eQueuedReturn.page, 52);
await clickRouteKey(eQueuedReturn.page, 52);
await waitForPhase(eQueuedReturn.page, "lp03-child-echo-playing");
await observeMapTransitions(eQueuedReturn.page);
await eQueuedReturn.page.locator("#mapReturn").click();
await waitForMap(eQueuedReturn.page, 12000);
await eQueuedReturn.page.waitForTimeout(500);
const eQueuedAfter = await snapshot(eQueuedReturn.page);
const eQueuedTransitions = await readMapTransitions(eQueuedReturn.page);
record("LP03 E queued return defers optional seams after real child echo without inventing a seam result", eQueuedAfter.screen === "map" && !eQueuedAfter.runtime?.active && eQueuedAfter.runtime?.chapter4?.lp03Progress?.seamChecks?.length === 0 && eQueuedAfter.runtime?.chapter4?.lp03Progress?.seamCheckDeferred === true && eQueuedAfter.runtime?.chapter4?.lp03Progress?.foundationEPlaced === true && eQueuedAfter.runtime?.history?.filter((session) => session.bundleId === "C4-02").length === 1 && eQueuedTransitions === 1, { eQueuedAfter, eQueuedTransitions });
await eQueuedReturn.context.close();

const seamAwaitingReturn = await makePage({ formal: true, sessionSeed: "lp03-seam-awaiting-return" });
await enterFormalLp03(seamAwaitingReturn.page);
await completeRouteToSeam(seamAwaitingReturn.page);
await observeMapTransitions(seamAwaitingReturn.page);
await seamAwaitingReturn.page.locator("#mapReturn").click();
await waitForMap(seamAwaitingReturn.page, 12000);
const seamAwaitingAfter = await snapshot(seamAwaitingReturn.page);
const seamAwaitingTransitions = await readMapTransitions(seamAwaitingReturn.page);
record("LP03 awaiting seam can end the optional check immediately without a fabricated answer", seamAwaitingAfter.screen === "map" && !seamAwaitingAfter.runtime?.active && seamAwaitingAfter.runtime?.chapter4?.lp03Progress?.seamChecks?.length === 0 && seamAwaitingAfter.runtime?.chapter4?.lp03Progress?.seamCheckDeferred === true && seamAwaitingAfter.runtime?.history?.filter((session) => session.bundleId === "C4-02").length === 1 && seamAwaitingTransitions === 1, { seamAwaitingAfter, seamAwaitingTransitions });
await seamAwaitingReturn.context.close();

const seamReadyReturn = await makePage({ formal: true, sessionSeed: "lp03-seam-ready-return" });
await enterFormalLp03(seamReadyReturn.page);
await completeRouteToSeam(seamReadyReturn.page);
current = await snapshot(seamReadyReturn.page);
await clickRouteKey(seamReadyReturn.page, current.attempt.seamCheck.sequence[0]);
await waitForPhase(seamReadyReturn.page, "lp03-seam-ready");
await observeMapTransitions(seamReadyReturn.page);
await seamReadyReturn.page.locator("#mapReturn").click();
await waitForMap(seamReadyReturn.page, 12000);
await seamReadyReturn.page.waitForTimeout(600);
const seamReadyAfter = await snapshot(seamReadyReturn.page);
const seamReadyTransitions = await readMapTransitions(seamReadyReturn.page);
record("LP03 seam-ready return keeps the completed observation, defers the rest and starts no successor", seamReadyAfter.screen === "map" && !seamReadyAfter.runtime?.active && seamReadyAfter.runtime?.chapter4?.lp03Progress?.seamChecks?.length === 1 && seamReadyAfter.runtime?.chapter4?.lp03Progress?.seamCheckDeferred === true && seamReadyAfter.runtime?.history?.filter((session) => session.bundleId === "C4-02").length === 1 && seamReadyTransitions === 1, { seamReadyAfter, seamReadyTransitions });
await seamReadyReturn.context.close();

for (const { stage, seamIndex } of [
  { stage: "target", seamIndex: 0 }, { stage: "child", seamIndex: 0 }, { stage: "repair", seamIndex: 0 },
  { stage: "target", seamIndex: 2 }, { stage: "child", seamIndex: 2 }, { stage: "repair", seamIndex: 2 }
]) {
  const queuedSeam = await queueSeamMapReturn({ stage, seamIndex, sessionSeed: `lp03-seam-${stage}-${seamIndex}` });
  const progress = queuedSeam.after.runtime?.chapter4?.lp03Progress;
  const seamChecks = progress?.seamChecks || [];
  const expectedCount = stage === "target" ? seamIndex : seamIndex + 1;
  const expectedDeferred = stage === "target" || seamIndex < 2;
  const lastCheck = seamChecks.at(-1);
  const stagePhase = stage === "target" ? "lp03-seam-target-playing" : (stage === "child" ? "lp03-seam-child-echo-playing" : "lp03-seam-repair-playing");
  const recordsCurrentAnswer = stage === "target" || (stage === "child" ? lastCheck?.correct === true : lastCheck?.correct === false);
  record(`LP03 ${stage} queued map return at seam ${seamIndex + 1} consumes once and closes the optional check`, queuedSeam.before.scene?.phase === stagePhase && queuedSeam.after.screen === "map" && !queuedSeam.after.runtime?.active && queuedSeam.after.attempt === null && progress?.foundationCAwake === true && progress?.foundationDPlaced === true && progress?.foundationEPlaced === true && seamChecks.length === expectedCount && recordsCurrentAnswer && progress?.seamCheckDeferred === expectedDeferred && queuedSeam.after.runtime?.history?.filter((session) => session.bundleId === "C4-02").length === 1 && (queuedSeam.after.learning?.levels?.LP03?.completions || 0) === 1 && queuedSeam.mapTransitions === 1 && queuedSeam.errorsAdded === 0, queuedSeam);
}

const seedProbe = await makePage();
await seedProbe.page.goto(directUrl(), { waitUntil: "domcontentloaded" });
await seedProbe.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const orders = await seedProbe.page.evaluate(() => Array.from({ length: 96 }, (_, index) => window.lp03SeamOrderForSeed(`seed-${index}`).join(",")));
record("LP03 reduced-cue seam order reaches all six C-D-E seed permutations", new Set(orders).size === 6, [...new Set(orders)]);
await seedProbe.context.close();

return summarizeChecks();
}

scenarioWatchdog = setInterval(() => {
  if (Date.now() - scenarioStartedAt > scenarioTimeoutMs) {
    hardStop(`scenario exceeded ${scenarioTimeoutMs}ms`);
  }
}, 250);
suiteWatchdog = setTimeout(() => hardStop(`suite exceeded ${suiteTimeoutMs}ms`), suiteTimeoutMs);

try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
  if (!(await runSuite())) process.exitCode = 1;
} catch (error) {
  process.exitCode = 1;
  console.error(`chapter4 LP03 fatal in ${scenarioDetails()}: ${error?.stack || error}`);
} finally {
  if (scenarioWatchdog) clearInterval(scenarioWatchdog);
  if (suiteWatchdog) clearTimeout(suiteWatchdog);
  await closeTestResources();
}
