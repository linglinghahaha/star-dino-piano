import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const SCREEN = "\u5c4f\u5e55";
const MICROPHONE = "\u9ea6\u514b\u98ce";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function runtimeFixture({ ls06 = false, ls07 = false } = {}) {
  const completedAt = "2026-07-17T10:00:00.000Z";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05"].map((id) => [id, { completedAt }]));
  if (ls06) lessonEvidence.LS06 = { completedAt, stable: true };
  if (ls07) lessonEvidence.LS07 = { completedAt, stable: true };
  return {
    version: 1,
    active: null,
    history: canonicalC1C2History({ completedAt, tag: "audio-c" }),
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
      ls06Completed: ls06,
      ls07Completed: ls07,
      ls04Attempts: [],
      ls05Attempts: [],
      ls06Attempts: [],
      ls07Attempts: [],
      ls08Attempts: []
    }
  };
}

function learningFixture() {
  return {
    version: 3,
    levels: { LS05: { completions: 1, formalCompletions: 1, stableCompletions: 1 } },
    notes: {},
    staff: {},
    retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null }
  };
}

function testUrl() {
  const target = new URL(baseUrl);
  target.search = "?screen=map&check=audio-c";
  return target.toString();
}

async function makePage({ sessionUuid = null } = {}) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
  await context.addInitScript((uuid) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["audio-c-midi", input]]), onstatechange: null });
    window.__audioCEmitMidi = (midi, velocity = 100) => input.onmidimessage?.({ data: [0x90, midi, velocity] });
    window.__audioCReleaseMidi = (midi) => input.onmidimessage?.({ data: [0x80, midi, 0] });
    if (uuid) Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => uuid });
  }, sessionUuid);
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  return { context, page };
}

async function seed(page, runtime = runtimeFixture(), learning = learningFixture()) {
  await page.goto(testUrl(), { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.evaluate(({ runtimeValue, learningValue }) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
  }, { runtimeValue: runtime, learningValue: learning });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.listeningAttempt || null;
    const playback = state.teachingPlayback ? {
      id: state.teachingPlayback.id,
      status: state.teachingPlayback.status,
      reason: state.teachingPlayback.reason,
      startedAt: state.teachingPlayback.startedAt || null,
      endedAt: state.teachingPlayback.endedAt || null
    } : null;
    return JSON.parse(JSON.stringify({
      runtime,
      active: runtime.active || null,
      action,
      attempt,
      screen: state.screen,
      phase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
      lesson: document.querySelector("#gardenScene")?.dataset.lesson || "",
      playback,
      audioState: state.sfx?.ctx?.state || null
    }));
  });
}

async function waitPhase(page, phases, timeout = 15000) {
  const expected = Array.isArray(phases) ? phases : [phases];
  await page.waitForFunction((wanted) => wanted.includes(document.querySelector("#gardenScene")?.dataset.listeningPhase), expected, { timeout });
  return view(page);
}

async function waitGuideArm(page, timeout = 15000) {
  await page.waitForFunction(() => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return attempt?.phase === "visible-guide" && attempt.guideInputArmed === true &&
      Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, null, { timeout });
  return view(page);
}

async function waitResponseArm(page, timeout = 15000) {
  await page.waitForFunction(() => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return ["awaiting-response", "assisted-retry", "visual-assist"].includes(attempt?.phase) &&
      attempt?.inputArmed === true && Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, null, { timeout });
  return view(page);
}

async function enterLevel(page, levelId) {
  await page.locator("#gardenRestMarker").click();
  await page.waitForFunction((expected) => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return document.querySelector("#gardenScene")?.dataset.lesson === expected && attempt?.audioTransaction?.context === "guide" && Boolean(attempt.audioTransaction?.startedAt);
  }, levelId, { timeout: 15000 });
  return view(page);
}

async function touchKey(page, midi) {
  await page.locator(`.white-key[data-midi="${midi}"]`).click();
}

async function midiOn(page, midi) {
  await page.evaluate((note) => window.__audioCEmitMidi(note), midi);
}

async function midiOff(page, midi) {
  await page.evaluate((note) => window.__audioCReleaseMidi(note), midi);
}

async function connectMidi(page) {
  await page.evaluate(() => connectMIDI());
  await page.waitForFunction(() => Boolean(state.midiAccess), null, { timeout: 10000 });
}

async function microphoneOn(page, midi) {
  await page.evaluate(({ note, source }) => window.handleInput(note, source), { note: midi, source: MICROPHONE });
}

async function microphoneQuiet(page, midi = null) {
  await page.evaluate(({ note, source }) => window.releaseGardenInput(note, source), { note: midi, source: MICROPHONE });
}

async function completeGuide(page) {
  for (let step = 0; step < 2; step += 1) {
    const ready = await waitGuideArm(page);
    const midi = ready.attempt.levelId === "LS06" ? [60, 67][ready.attempt.guideIndex] : [64, 65][ready.attempt.guideIndex];
    const priorGuideIndex = ready.attempt.guideIndex;
    await touchKey(page, midi);
    try {
      await page.waitForFunction((expected) => {
        const attempt = currentPairedListeningAction()?.listeningAttempt;
        return expected.final ? attempt?.guidePlayed === true : attempt?.guideIndex > expected.guideIndex;
      }, { guideIndex: priorGuideIndex, final: step === 1 }, { timeout: 15000 });
    } catch (error) {
      throw new Error(`Guide did not advance: ${JSON.stringify(await view(page))}`, { cause: error });
    }
  }
  return waitPhase(page, "target-playing");
}

function lifecycle(attempt, context, kind = null) {
  return (attempt?.audioLifecycle || []).filter((event) => event.context === context && (!kind || event.kind === kind));
}

function trace(attempt, kind) {
  return (attempt?.audioTrace || []).filter((event) => event.kind === kind);
}

function checkChildLifecycle(attempt, kind = null) {
  const playbackIds = new Set(trace(attempt, "child-input")
    .filter((event) => event.phaseRole === "check")
    .map((event) => event.playbackId)
    .filter(Boolean));
  return lifecycle(attempt, "child-echo", kind).filter((event) => playbackIds.has(event.playbackId));
}

async function observeMapTransitions(page, key) {
  await page.evaluate((observerKey) => {
    window[observerKey] = { count: 0, wasMap: document.body.classList.contains("screen-map") };
    const observer = new MutationObserver(() => {
      const tracker = window[observerKey];
      const isMap = document.body.classList.contains("screen-map");
      if (isMap && !tracker.wasMap) tracker.count += 1;
      tracker.wasMap = isMap;
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window[`${observerKey}Observer`] = observer;
  }, key);
}

async function readObservedAttempt(page, key) {
  return page.evaluate((observerKey) => JSON.parse(JSON.stringify({
    screen: state.screen,
    mapTransitions: window[observerKey]?.count || 0,
    attempt: window.__audioCAttempt || null,
    runtime: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}")
  })), key);
}

async function resumeSecondGuideAfterQueuedMap(page, { levelId, firstMidi, secondMidi, observerKey }) {
  const initial = await enterLevel(page, levelId);
  const sessionId = initial.active?.sessionId || null;
  await waitGuideArm(page);
  await observeMapTransitions(page, observerKey);
  await touchKey(page, firstMidi);
  await page.waitForFunction((expected) => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return attempt?.audioTransaction?.context === "child-echo" &&
      attempt.audioTransaction?.payload?.phaseRole === "guide" &&
      attempt.audioTransaction?.payload?.guideIndex === 0 &&
      attempt.audioTransaction?.payload?.midi === expected.firstMidi &&
      Boolean(attempt.audioTransaction?.startedAt) && !attempt.audioTransaction?.endedAt;
  }, { firstMidi }, { timeout: 10000 });
  await page.locator("#mapReturn").click();
  await page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
  await page.locator("#gardenRestMarker").click();
  await page.waitForFunction((expected) => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    const lifecycle = attempt?.audioLifecycle || [];
    const starts = lifecycle.filter((event) => event.context === "guide" && event.kind === "started" && event.midis?.join(",") === String(expected.secondMidi));
    const ends = lifecycle.filter((event) => event.context === "guide" && event.kind === "ended" && event.midis?.join(",") === String(expected.secondMidi));
    return document.body.classList.contains("screen-garden") && attempt?.guideIndex === 1 &&
      attempt?.guideInputArmed === true && attempt?.inputArmed === false &&
      starts.length === 1 && ends.length === 1 && !state.teachingPlayback;
  }, { secondMidi }, { timeout: 15000 });
  const current = await view(page);
  const mapTransitions = await page.evaluate((key) => window[key]?.count || 0, observerKey);
  await page.evaluate((key) => window[`${key}Observer`]?.disconnect(), observerKey);
  return { current, mapTransitions, sessionId };
}

async function installWatchdogAudioContext(page) {
  await page.evaluate(async () => {
    if (state.sfx?.ctx && state.sfx.ctx.state !== "closed") await state.sfx.ctx.close();
    state.sfx = null;
    const parameter = (value = 0) => ({ value, cancelScheduledValues() {}, setTargetAtTime() {}, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} });
    const node = () => ({ connect() {}, disconnect() {} });
    class WatchdogAudioContext {
      constructor() {
        this.state = "running";
        this.destination = {};
        this._started = performance.now();
        this._listeners = new Set();
      }
      get currentTime() { return (performance.now() - this._started) / 1000; }
      addEventListener(type, listener) { if (type === "statechange") this._listeners.add(listener); }
      removeEventListener(type, listener) { if (type === "statechange") this._listeners.delete(listener); }
      resume() { this.state = "running"; return Promise.resolve(); }
      createGain() { return { ...node(), gain: parameter(1) }; }
      createDynamicsCompressor() { return { ...node(), threshold: parameter(-24), knee: parameter(20), ratio: parameter(8), attack: parameter(0.006), release: parameter(0.18) }; }
      createBiquadFilter() { return { ...node(), type: "lowpass", frequency: parameter(0), Q: parameter(0) }; }
      createOscillator() { return { ...node(), type: "sine", frequency: parameter(0), detune: parameter(0), onended: null, start() {}, stop() {} }; }
    }
    window.AudioContext = WatchdogAudioContext;
    window.webkitAudioContext = WatchdogAudioContext;
  });
}

async function installReverseOrderAudioContext(page) {
  await page.evaluate(async () => {
    if (state.sfx?.ctx && state.sfx.ctx.state !== "closed") await state.sfx.ctx.close();
    state.sfx = null;
    const parameter = (value = 0) => ({ value, cancelScheduledValues() {}, setTargetAtTime() {}, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} });
    const node = () => ({ connect() {}, disconnect() {} });
    class ReverseOrderAudioContext {
      constructor() {
        this.state = "running";
        this.destination = {};
        this._started = performance.now();
        this._listeners = new Set();
        this._oscillators = [];
      }
      get currentTime() { return (performance.now() - this._started) / 1000; }
      addEventListener(type, listener) { if (type === "statechange") this._listeners.add(listener); }
      removeEventListener(type, listener) { if (type === "statechange") this._listeners.delete(listener); }
      resume() { this.state = "running"; this._emitStatechange(); return Promise.resolve(); }
      close() { this.state = "closed"; this._emitStatechange(); return Promise.resolve(); }
      _setStateSilently(state) { this.state = state; }
      _emitStatechange() { this._listeners.forEach((listener) => listener()); }
      _fireOscillatorEnds() { [...this._oscillators].forEach((oscillator) => oscillator.onended?.()); }
      createGain() { return { ...node(), gain: parameter(1) }; }
      createDynamicsCompressor() { return { ...node(), threshold: parameter(-24), knee: parameter(20), ratio: parameter(8), attack: parameter(0.006), release: parameter(0.18) }; }
      createBiquadFilter() { return { ...node(), type: "lowpass", frequency: parameter(0), Q: parameter(0) }; }
      createOscillator() {
        const oscillator = { ...node(), type: "sine", frequency: parameter(0), detune: parameter(0), onended: null, start() {}, stop() {} };
        this._oscillators.push(oscillator);
        return oscillator;
      }
    }
    window.AudioContext = ReverseOrderAudioContext;
    window.webkitAudioContext = ReverseOrderAudioContext;
  });
}

const guideAndEcho = await makePage();
await seed(guideAndEcho.page);
let current = await enterLevel(guideAndEcho.page, "LS06");
record("LS06 guide starts only after the running context and remains unarmed before real end", current.attempt?.audioTransaction?.context === "guide" && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.audioTransaction?.endedAt === null && current.attempt?.guideInputArmed === false, current);
await touchKey(guideAndEcho.page, 60);
current = await view(guideAndEcho.page);
record("LS06 input during guide playback is observation-only", current.attempt?.guideEvidence?.length === 0 && current.attempt?.guidedInputs?.length === 0 && current.attempt?.observations?.at(-1)?.phase === "visible-guide", current.attempt);
current = await waitGuideArm(guideAndEcho.page);
record("LS06 guide real end is required before guide input arms", current.attempt?.audioTransaction?.context === "guide" && Boolean(current.attempt?.audioTransaction?.endedAt) && current.attempt?.guideInputArmed === true && lifecycle(current.attempt, "guide", "ended").length === 1, current.attempt);
current = await completeGuide(guideAndEcho.page);
const firstTarget = current.attempt.sequence[current.attempt.callIndex];
record("LS06 hidden target starts without scoring and records system-first provenance", current.attempt?.audioTransaction?.context === "target" && current.attempt?.audioTransaction?.reason === "system-first" && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.inputArmed === false && current.attempt?.scoredCalls?.length === 0, current.attempt);
await touchKey(guideAndEcho.page, firstTarget);
current = await view(guideAndEcho.page);
record("LS06 target-playing touch is observation-only", current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0 && current.attempt?.observations?.at(-1)?.phase === "target-playing", current.attempt);
current = await waitResponseArm(guideAndEcho.page);
record("LS06 hidden target real end opens the response exactly once", current.attempt?.audioTransaction?.context === "target" && Boolean(current.attempt?.audioTransaction?.endedAt) && current.attempt?.inputArmed === true && lifecycle(current.attempt, "target", "ended").length === 1, current.attempt);
await touchKey(guideAndEcho.page, firstTarget);
current = await waitPhase(guideAndEcho.page, "child-echo-playing");
record("LS06 touch produces one controlled child echo before scoring", current.attempt?.audioTransaction?.context === "child-echo" && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0 && checkChildLifecycle(current.attempt, "started").length === 1, current.attempt);
current = await waitPhase(guideAndEcho.page, "correct-feedback");
record("LS06 child echo real end commits one correct world action", Boolean(current.attempt?.audioTransaction?.endedAt) && current.attempt?.childInputs?.length === 1 && current.attempt?.scoredCalls?.length === 1 && current.attempt?.correctCount === 1 && checkChildLifecycle(current.attempt, "ended").length === 1, current.attempt);
current = await waitResponseArm(guideAndEcho.page);
await guideAndEcho.page.locator("#listeningReplay").click();
current = await waitPhase(guideAndEcho.page, "target-playing");
record("LS06 child replay starts one fixed whole pair without exposing the hidden target", current.attempt?.audioTransaction?.context === "whole-pair-replay" && current.attempt?.audioTransaction?.kind === "whole-pair-replay" && current.attempt?.audioTransaction?.notes?.map((note) => note.midi).join(",") === "60,67" && current.attempt?.replayCountChild === 1 && current.attempt?.inputArmed === false, current.attempt);
current = await waitResponseArm(guideAndEcho.page);
record("LS06 whole-pair replay ends before rearming and increments once", lifecycle(current.attempt, "whole-pair-replay", "started").length === 1 && lifecycle(current.attempt, "whole-pair-replay", "ended").length === 1 && current.attempt?.replayCountChild === 1 && current.attempt?.inputArmed === true, current.attempt);
await guideAndEcho.context.close();

const guideTargetTransition = await makePage();
await seed(guideTargetTransition.page);
await enterLevel(guideTargetTransition.page, "LS06");
for (const guideMidi of [60, 67]) {
  await waitGuideArm(guideTargetTransition.page);
  await touchKey(guideTargetTransition.page, guideMidi);
}
await guideTargetTransition.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.guidePlayed === true && attempt?.audioTransaction?.context === "child-echo" &&
    Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
}, null, { timeout: 15000 });
current = await view(guideTargetTransition.page);
const transitionReplayState = await guideTargetTransition.page.evaluate(() => {
  const replay = document.querySelector("#listeningReplay");
  return { disabled: replay?.disabled === true, ariaDisabled: replay?.getAttribute("aria-disabled") || null };
});
await guideTargetTransition.page.locator("#listeningReplay").focus();
await guideTargetTransition.page.keyboard.press("Enter");
await guideTargetTransition.page.keyboard.press("Space");
await guideTargetTransition.page.evaluate(() => {
  const replay = document.querySelector("#listeningReplay");
  replay?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  replay?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
current = await waitResponseArm(guideTargetTransition.page);
const transitionTargetStarted = lifecycle(current.attempt, "target", "started");
const transitionTargetEnded = lifecycle(current.attempt, "target", "ended");
const transitionWholePair = lifecycle(current.attempt, "whole-pair-replay");
record("LS06 second guide echo leaves the replay control disabled and aria-disabled until system-first starts", transitionReplayState.disabled && transitionReplayState.ariaDisabled === "true" && current.attempt?.replayCountChild === 0, { transitionReplayState, attempt: current.attempt });
record("LS06 guide-to-target transition ignores repeated click, Enter, and Space without an orphaned replay", transitionWholePair.length === 0 && transitionTargetStarted.length === 1 && transitionTargetEnded.length === 1 && current.attempt?.audioTransaction?.reason === "system-first" && current.attempt?.scoredCalls?.length === 0 && current.attempt?.replayCountChild === 0, { transitionWholePair, transitionTargetStarted, transitionTargetEnded, attempt: current.attempt });
await guideTargetTransition.context.close();

const guideMapLs06 = await makePage();
await seed(guideMapLs06.page);
const guideMapLs06Result = await resumeSecondGuideAfterQueuedMap(guideMapLs06.page, {
  levelId: "LS06",
  firstMidi: 60,
  secondMidi: 67,
  observerKey: "__audioCGuideMapLs06"
});
const ls06GuideMapAttempt = guideMapLs06Result.current.attempt;
const ls06FirstGuide = lifecycle(ls06GuideMapAttempt, "guide").filter((event) => event.midis?.join(",") === "60");
const ls06SecondGuide = lifecycle(ls06GuideMapAttempt, "guide").filter((event) => event.midis?.join(",") === "67");
const ls06GuideMapReturns = lifecycle(ls06GuideMapAttempt, "child-echo", "queued-return-consumed");
record("LS06 queued map after C guide echo presents G exactly once before rearming", guideMapLs06Result.current.active?.sessionId === guideMapLs06Result.sessionId && ls06GuideMapAttempt?.guideEvidence?.length === 1 && ls06GuideMapAttempt.guideEvidence[0]?.guideIndex === 0 && ls06GuideMapAttempt?.guidePlayed === false && ls06GuideMapAttempt?.scoredCalls?.length === 0 && ls06GuideMapAttempt?.correctCount === 0 && ls06FirstGuide.filter((event) => event.kind === "started").length === 1 && ls06FirstGuide.filter((event) => event.kind === "ended").length === 1 && ls06SecondGuide.filter((event) => event.kind === "started").length === 1 && ls06SecondGuide.filter((event) => event.kind === "ended").length === 1 && ls06GuideMapReturns.length === 1 && guideMapLs06Result.mapTransitions === 1 && ls06GuideMapAttempt?.pendingGuidePresentation === null && !guideMapLs06Result.current.runtime.chapter3?.lessonEvidence?.LS06, guideMapLs06Result);
await guideMapLs06.context.close();

const guidePendingReload = await makePage();
await seed(guidePendingReload.page);
await enterLevel(guidePendingReload.page, "LS06");
await waitGuideArm(guidePendingReload.page);
await touchKey(guidePendingReload.page, 60);
await guidePendingReload.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "child-echo" && attempt.audioTransaction?.payload?.phaseRole === "guide" &&
    attempt.audioTransaction?.payload?.guideIndex === 0 && Boolean(attempt.audioTransaction?.startedAt) && !attempt.audioTransaction?.endedAt;
}, null, { timeout: 10000 });
await guidePendingReload.page.locator("#mapReturn").click();
await guidePendingReload.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await guidePendingReload.page.evaluate(() => {
  state.screen = "garden";
  render();
  const session = state.activeSession;
  if (!session) throw new Error("missing active guide session before reload");
  history.replaceState(null, "", `?mode=garden&bundle=${encodeURIComponent(session.bundleId)}&sessionId=${encodeURIComponent(session.sessionId)}`);
});
const queuedGuideDom = await guidePendingReload.page.evaluate(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  const replay = document.querySelector("#listeningReplay");
  return {
    phase: attempt?.phase || "",
    requiresExplicitGesture: attempt?.pendingGuidePresentation?.requiresExplicitGesture === true,
    guideInputArmed: attempt?.guideInputArmed === true,
    inputArmed: attempt?.inputArmed === true,
    replayDisabled: replay?.disabled === true,
    replayAriaDisabled: replay?.getAttribute("aria-disabled") || null
  };
});
await guidePendingReload.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await guidePendingReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
await guidePendingReload.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.phase === "guide-next-pending" && attempt?.pendingGuidePresentation?.requiresExplicitGesture === true &&
    attempt?.guideInputArmed === false && attempt?.inputArmed === false && !state.teachingPlayback;
}, null, { timeout: 10000 });
const reloadGuideDom = await guidePendingReload.page.evaluate(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  const replay = document.querySelector("#listeningReplay");
  const guideNotes = [...document.querySelectorAll("#pairedListeningWorld [data-note]")].map((node) => node.dataset.note || "");
  return {
    phase: attempt?.phase || "",
    secondGuideStarts: (attempt?.audioLifecycle || []).filter((event) => event.context === "guide" && event.kind === "started" && event.midis?.join(",") === "67").length,
    guideInputArmed: attempt?.guideInputArmed === true,
    inputArmed: attempt?.inputArmed === true,
    replayDisabled: replay?.disabled === true,
    replayAriaDisabled: replay?.getAttribute("aria-disabled") || null,
    speechMain: document.querySelector("#gardenSpeechMain")?.textContent || "",
    speechSupport: document.querySelector("#gardenSpeechSupport")?.textContent || "",
    nextAction: document.querySelector("#nextAction")?.textContent || "",
    activeCallCount: document.querySelectorAll("#listeningCallProgress .active").length,
    guideNotes
  };
});
await guidePendingReload.page.locator("#listeningReplay").click();
const resumedGuide = await waitGuideArm(guidePendingReload.page);
const resumedGuideLifecycle = lifecycle(resumedGuide.attempt, "guide").filter((event) => event.midis?.join(",") === "67");
record("LS06 reload-ready next guide keeps guide-only DOM and waits for an explicit accessible replay", queuedGuideDom.phase === "guide-next-pending" && queuedGuideDom.requiresExplicitGesture === false && queuedGuideDom.guideInputArmed === false && queuedGuideDom.inputArmed === false && queuedGuideDom.replayDisabled === true && queuedGuideDom.replayAriaDisabled === "true" && reloadGuideDom.phase === "guide-next-pending" && reloadGuideDom.secondGuideStarts === 0 && reloadGuideDom.guideInputArmed === false && reloadGuideDom.inputArmed === false && reloadGuideDom.replayDisabled === false && reloadGuideDom.replayAriaDisabled === "false" && reloadGuideDom.speechMain === "\u8fd9\u662f G" && reloadGuideDom.speechSupport.includes("\u6309\u626c\u58f0\u5668\u7ee7\u7eed\u542c\u4e0b\u4e00\u9897\u5e26\u8def\u97f3") && reloadGuideDom.nextAction.includes("C / G") && !reloadGuideDom.nextAction.includes("1/4") && reloadGuideDom.activeCallCount === 0 && reloadGuideDom.guideNotes.every((note) => /^[A-G]$/.test(note)) && resumedGuide.attempt?.guideInputArmed === true && resumedGuide.attempt?.inputArmed === false && resumedGuideLifecycle.filter((event) => event.kind === "started").length === 1 && resumedGuideLifecycle.filter((event) => event.kind === "ended").length === 1, { queuedGuideDom, reloadGuideDom, resumedGuide });
await guidePendingReload.context.close();

const guideMapLs07 = await makePage();
await seed(guideMapLs07.page, runtimeFixture({ ls06: true }));
const guideMapLs07Result = await resumeSecondGuideAfterQueuedMap(guideMapLs07.page, {
  levelId: "LS07",
  firstMidi: 64,
  secondMidi: 65,
  observerKey: "__audioCGuideMapLs07"
});
const ls07GuideMapAttempt = guideMapLs07Result.current.attempt;
const ls07FirstGuide = lifecycle(ls07GuideMapAttempt, "guide").filter((event) => event.midis?.join(",") === "64");
const ls07SecondGuide = lifecycle(ls07GuideMapAttempt, "guide").filter((event) => event.midis?.join(",") === "65");
const ls07GuideMapReturns = lifecycle(ls07GuideMapAttempt, "child-echo", "queued-return-consumed");
record("LS07 queued map after E guide echo presents F exactly once before rearming", guideMapLs07Result.current.active?.sessionId === guideMapLs07Result.sessionId && ls07GuideMapAttempt?.guideEvidence?.length === 1 && ls07GuideMapAttempt.guideEvidence[0]?.guideIndex === 0 && ls07GuideMapAttempt?.guidePlayed === false && ls07GuideMapAttempt?.scoredCalls?.length === 0 && ls07GuideMapAttempt?.correctCount === 0 && ls07FirstGuide.filter((event) => event.kind === "started").length === 1 && ls07FirstGuide.filter((event) => event.kind === "ended").length === 1 && ls07SecondGuide.filter((event) => event.kind === "started").length === 1 && ls07SecondGuide.filter((event) => event.kind === "ended").length === 1 && ls07GuideMapReturns.length === 1 && guideMapLs07Result.mapTransitions === 1 && ls07GuideMapAttempt?.pendingGuidePresentation === null && !guideMapLs07Result.current.runtime.chapter3?.lessonEvidence?.LS07, guideMapLs07Result);
await guideMapLs07.context.close();

const rejectedReplay = await makePage();
await seed(rejectedReplay.page, runtimeFixture({ ls06: true }));
await enterLevel(rejectedReplay.page, "LS07");
await completeGuide(rejectedReplay.page);
await waitResponseArm(rejectedReplay.page);
await rejectedReplay.page.evaluate(async () => {
  const ctx = state.sfx?.ctx;
  if (!ctx) throw new Error("missing AudioContext");
  if (ctx.state === "running") await ctx.suspend();
  window.__audioCResume = { ctx, originalResume: ctx.resume.bind(ctx) };
  ctx.resume = () => Promise.reject(new Error("audio-c controlled resume rejection"));
});
await rejectedReplay.page.locator("#listeningReplay").click();
current = await waitPhase(rejectedReplay.page, "sound-paused");
record("LS07 rejected resume records interrupted whole-pair replay with no start, count, score or world progress", current.attempt?.audioTransaction?.context === "whole-pair-replay" && current.attempt?.audioTransaction?.startedAt === null && current.attempt?.audioTransaction?.endedAt === null && Boolean(current.attempt?.audioTransaction?.interruptedAt) && current.attempt?.replayCountChild === 0 && current.attempt?.scoredCalls?.length === 0 && current.attempt?.neutralProgress === 0, current.attempt);
await rejectedReplay.page.evaluate(async () => {
  const saved = window.__audioCResume;
  saved.ctx.resume = saved.originalResume;
  state.sfx.resumePromise = null;
  await saved.originalResume();
});
await rejectedReplay.page.locator("#listeningReplay").click();
current = await waitResponseArm(rejectedReplay.page);
record("LS07 explicit recovery replays the same whole pair exactly once", current.attempt?.replayCountChild === 1 && lifecycle(current.attempt, "whole-pair-replay", "started").length === 1 && lifecycle(current.attempt, "whole-pair-replay", "ended").length === 1 && current.attempt?.inputArmed === true, current.attempt);
await rejectedReplay.context.close();

const repair = await makePage();
await seed(repair.page, runtimeFixture({ ls06: true }));
await enterLevel(repair.page, "LS07");
await completeGuide(repair.page);
current = await waitResponseArm(repair.page);
const repairWrong = current.attempt.sequence[current.attempt.callIndex] === 64 ? 65 : 64;
await touchKey(repair.page, repairWrong);
current = await waitPhase(repair.page, "child-echo-playing");
record("LS07 wrong touch keeps wrong count and repair target unchanged until child echo ends", current.attempt?.totalWrongCount === 0 && current.attempt?.childInputs?.length === 0 && current.attempt?.audioTransaction?.context === "child-echo" && Boolean(current.attempt?.audioTransaction?.startedAt), current.attempt);
current = await waitPhase(repair.page, "wrong-known");
const childEnd = lifecycle(current.attempt, "child-echo", "ended").at(-1);
const repairStart = lifecycle(current.attempt, "wrong-repair", "started").at(-1);
record("LS07 wrong repair is child then target with no overlap and one child route", current.attempt?.totalWrongCount === 1 && checkChildLifecycle(current.attempt, "started").length === 1 && trace(current.attempt, "target-replay").length === 1 && childEnd?.endAudioTime <= repairStart?.startAudioTime && current.attempt?.audioTransaction?.context === "wrong-repair" && current.attempt?.audioTransaction?.notes?.length === 1, { childEnd, repairStart, attempt: current.attempt });
await repair.page.evaluate(() => { window.__audioCAttempt = currentPairedListeningAction()?.listeningAttempt || null; });
await observeMapTransitions(repair.page, "__audioCRepairMap");
await repair.page.locator("#mapReturn").click();
await repair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await repair.page.waitForTimeout(120);
let queued = await readObservedAttempt(repair.page, "__audioCRepairMap");
record("LS07 queued wrong repair returns to map only after real repair end and consumes once", queued.mapTransitions === 1 && Boolean(queued.attempt?.audioTransaction?.endedAt) && !queued.attempt?.audioTransaction?.interruptedAt && queued.attempt?.audioTransaction?.returnQueued === false && Boolean(queued.attempt?.audioTransaction?.returnQueuedConsumedAt) && queued.attempt?.totalWrongCount === 1 && queued.attempt?.scoredCalls?.length === 0 && !queued.runtime.chapter3.lessonEvidence?.LS07, queued);
await repair.page.locator("#gardenRestMarker").click();
current = await waitResponseArm(repair.page);
record("LS07 return from queued repair preserves the same unanswered call and rearms after its target end", current.attempt?.callIndex === 0 && current.attempt?.totalWrongCount === 1 && current.attempt?.inputArmed === true && checkChildLifecycle(current.attempt, "started").length === 1 && lifecycle(current.attempt, "wrong-repair", "ended").length === 1, current.attempt);
await repair.page.evaluate(() => window.__audioCRepairMapObserver?.disconnect());
await repair.context.close();

const interruptedTarget = await makePage();
await seed(interruptedTarget.page);
await enterLevel(interruptedTarget.page, "LS06");
await completeGuide(interruptedTarget.page);
current = await waitPhase(interruptedTarget.page, "target-playing");
await interruptedTarget.page.evaluate(() => { window.__audioCAttempt = currentPairedListeningAction()?.listeningAttempt || null; });
await observeMapTransitions(interruptedTarget.page, "__audioCTargetMap");
await interruptedTarget.page.locator("#mapReturn").click();
current = await view(interruptedTarget.page);
record("LS06 active target keeps the first map request queued", current.screen === "garden" && current.attempt?.audioTransaction?.returnQueued === true && current.attempt?.audioTransaction?.endedAt === null, current.attempt);
await interruptedTarget.page.evaluate(async () => {
  const ctx = state.sfx?.ctx;
  if (!ctx || ctx.state !== "running") throw new Error("expected running context");
  await ctx.suspend();
});
await interruptedTarget.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await interruptedTarget.page.waitForTimeout(120);
queued = await readObservedAttempt(interruptedTarget.page, "__audioCTargetMap");
record("LS06 queued target interruption returns exactly once without fabricated target end or score", queued.mapTransitions === 1 && Boolean(queued.attempt?.audioTransaction?.interruptedAt) && queued.attempt?.audioTransaction?.endedAt === null && queued.attempt?.scoredCalls?.length === 0 && !queued.runtime.chapter3.lessonEvidence?.LS06 && !queued.runtime.history.some((session) => session.bundleId === "C3-06"), queued);
await interruptedTarget.page.locator("#gardenRestMarker").click();
await waitPhase(interruptedTarget.page, "sound-paused");
await interruptedTarget.page.locator("#listeningReplay").click();
current = await waitResponseArm(interruptedTarget.page);
record("LS06 explicit recovery creates one new playback for the same interrupted target", current.attempt?.callIndex === 0 && current.attempt?.inputArmed === true && lifecycle(current.attempt, "target", "started").length === 2 && lifecycle(current.attempt, "target", "ended").length === 1, current.attempt);
await interruptedTarget.page.evaluate(() => window.__audioCTargetMapObserver?.disconnect());
await interruptedTarget.context.close();

const childMap = await makePage();
await seed(childMap.page);
await enterLevel(childMap.page, "LS06");
await completeGuide(childMap.page);
current = await waitResponseArm(childMap.page);
const childMapTarget = current.attempt.sequence[current.attempt.callIndex];
await touchKey(childMap.page, childMapTarget);
await waitPhase(childMap.page, "child-echo-playing");
await childMap.page.evaluate(() => { window.__audioCAttempt = currentPairedListeningAction()?.listeningAttempt || null; });
await observeMapTransitions(childMap.page, "__audioCChildMap");
await childMap.page.locator("#mapReturn").click();
await childMap.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await childMap.page.waitForTimeout(120);
queued = await readObservedAttempt(childMap.page, "__audioCChildMap");
record("LS06 queued child echo waits for real end, commits one call, and returns once", queued.mapTransitions === 1 && Boolean(queued.attempt?.audioTransaction?.endedAt) && queued.attempt?.childInputs?.length === 1 && queued.attempt?.scoredCalls?.length === 1 && queued.attempt?.callIndex === 1 && !queued.runtime.chapter3.lessonEvidence?.LS06, queued);
await childMap.page.evaluate(() => window.__audioCChildMapObserver?.disconnect());
await childMap.context.close();

const modeled = await makePage();
await seed(modeled.page);
await enterLevel(modeled.page, "LS06");
await completeGuide(modeled.page);
await waitResponseArm(modeled.page);
await modeled.page.evaluate(() => completePairedListeningModeled("audio-c-modeled-probe"));
current = await waitPhase(modeled.page, "modeled-playing");
record("LS06 modeled presentation does not complete before its true end", current.attempt?.modeled === false && current.attempt?.modeledInputs?.length === 0 && current.attempt?.audioTransaction?.context === "modeled" && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.audioTransaction?.endedAt === null, current.attempt);
await modeled.page.evaluate(() => { window.__audioCAttempt = currentPairedListeningAction()?.listeningAttempt || null; });
await observeMapTransitions(modeled.page, "__audioCModeledMap");
await modeled.page.locator("#mapReturn").click();
await modeled.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await modeled.page.waitForTimeout(120);
queued = await readObservedAttempt(modeled.page, "__audioCModeledMap");
record("LS06 queued modeled completion writes one modeled safe rest only after final end", queued.mapTransitions === 1 && queued.attempt?.modeled === true && queued.attempt?.modeledInputs?.length === 1 && Boolean(queued.attempt?.audioTransaction?.endedAt) && queued.runtime.history.at(-1)?.endReason === "modeled-safe-rest" && !queued.runtime.chapter3.lessonEvidence?.LS06, queued);
await modeled.page.evaluate(() => window.__audioCModeledMapObserver?.disconnect());
await modeled.context.close();

const replayReload = await makePage();
await seed(replayReload.page, runtimeFixture({ ls06: true }));
await enterLevel(replayReload.page, "LS07");
await completeGuide(replayReload.page);
await waitResponseArm(replayReload.page);
await replayReload.page.locator("#listeningReplay").click();
await waitPhase(replayReload.page, "target-playing");
await replayReload.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await replayReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
current = await waitPhase(replayReload.page, "sound-paused");
record("LS07 refresh preserves an interrupted whole-pair child replay without converting it to system replay", current.attempt?.audioTransaction?.context === "whole-pair-replay" && current.attempt?.audioTransaction?.reason === "child-replay" && current.attempt?.replayCountChild === 1 && current.attempt?.replayCountSystem === 0 && Boolean(current.attempt?.audioTransaction?.interruptedAt) && current.attempt?.audioTransaction?.endedAt === null && current.attempt?.scoredCalls?.length === 0, current.attempt);
await replayReload.page.locator("#listeningReplay").click();
current = await waitResponseArm(replayReload.page);
record("LS07 replay recovery keeps child provenance and completes once", current.attempt?.replayCountChild === 1 && current.attempt?.replayCountSystem === 0 && lifecycle(current.attempt, "whole-pair-replay", "started").length === 2 && lifecycle(current.attempt, "whole-pair-replay", "ended").length === 1 && current.attempt?.inputArmed === true, current.attempt);
await replayReload.context.close();

const microphone = await makePage();
await seed(microphone.page, runtimeFixture({ ls06: true }));
await enterLevel(microphone.page, "LS07");
await completeGuide(microphone.page);
current = await waitResponseArm(microphone.page);
const microphoneTarget = current.attempt.sequence[current.attempt.callIndex];
const microphoneWrong = microphoneTarget === 64 ? 65 : 64;
await microphoneOn(microphone.page, microphoneWrong);
current = await waitPhase(microphone.page, "external-input");
record("LS07 microphone onset is an external transaction with no local child echo or score", current.attempt?.audioTransaction?.context === "external-input" && current.attempt?.audioTransaction?.playbackId === null && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0 && current.playback === null, current.attempt);
await microphone.page.evaluate(() => { window.__audioCAttempt = currentPairedListeningAction()?.listeningAttempt || null; });
await microphone.page.locator("#mapReturn").click();
await microphone.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await microphoneQuiet(microphone.page, microphoneWrong);
await microphone.page.waitForTimeout(100);
queued = await readObservedAttempt(microphone.page, "__unusedMicrophoneMap");
record("LS07 map interruption blocks late microphone quiet from committing the old onset", Boolean(queued.attempt?.audioTransaction?.interruptedAt) && queued.attempt?.audioTransaction?.endedAt === null && queued.attempt?.totalWrongCount === 0 && queued.attempt?.childInputs?.length === 0 && queued.attempt?.inputRoutes?.[MICROPHONE] === undefined, queued);
await microphone.page.locator("#gardenRestMarker").click();
await waitPhase(microphone.page, "sound-paused");
await microphoneOn(microphone.page, microphoneTarget);
current = await waitPhase(microphone.page, "external-input");
await microphoneQuiet(microphone.page, microphoneTarget);
current = await waitPhase(microphone.page, "correct-feedback");
record("LS07 one fresh microphone onset retries directly and only the fresh quiet commits", current.attempt?.childInputs?.length === 1 && current.attempt?.childInputs?.[0]?.source === MICROPHONE && current.attempt?.inputRoutes?.[MICROPHONE] === 1 && checkChildLifecycle(current.attempt, "started").length === 0 && lifecycle(current.attempt, "external-input", "ended").length === 1, current.attempt);
await microphone.context.close();

const microphoneStop = await makePage();
await seed(microphoneStop.page);
await enterLevel(microphoneStop.page, "LS06");
await completeGuide(microphoneStop.page);
current = await waitResponseArm(microphoneStop.page);
await microphoneOn(microphoneStop.page, current.attempt.sequence[current.attempt.callIndex]);
await waitPhase(microphoneStop.page, "external-input");
await microphoneStop.page.evaluate((source) => {
  state.audio = { running: true, raf: 0, stream: { getTracks: () => [] }, ctx: { close() {} } };
  stopMicrophone();
  releaseGardenInput(null, source);
}, MICROPHONE);
current = await waitPhase(microphoneStop.page, "sound-paused");
record("LS06 microphone stop interrupts accepted external input and rejects late quiet", current.attempt?.audioTransaction?.context === "external-input" && Boolean(current.attempt?.audioTransaction?.interruptedAt) && current.attempt?.audioTransaction?.endedAt === null && current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0, current.attempt);
await touchKey(microphoneStop.page, current.attempt.sequence[current.attempt.callIndex]);
current = await waitPhase(microphoneStop.page, "child-echo-playing");
record("LS06 one fresh touch after microphone stop directly starts the retry child echo", current.attempt?.audioTransaction?.context === "child-echo" && current.attempt?.pendingInput?.source === SCREEN && current.attempt?.childInputs?.length === 0, current.attempt);
await microphoneStop.context.close();

const pagehideMic = await makePage();
await seed(pagehideMic.page, runtimeFixture({ ls06: true }));
await enterLevel(pagehideMic.page, "LS07");
await completeGuide(pagehideMic.page);
current = await waitResponseArm(pagehideMic.page);
await microphoneOn(pagehideMic.page, current.attempt.sequence[current.attempt.callIndex]);
await waitPhase(pagehideMic.page, "external-input");
await pagehideMic.page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
current = await waitPhase(pagehideMic.page, "sound-paused");
await microphoneQuiet(pagehideMic.page);
current = await view(pagehideMic.page);
record("LS07 pagehide interrupts external microphone input and late quiet remains inert", current.attempt?.audioTransaction?.context === "external-input" && Boolean(current.attempt?.audioTransaction?.interruptedAt) && current.attempt?.audioTransaction?.endedAt === null && current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0, current.attempt);
await pagehideMic.context.close();

const heldMidi = await makePage();
await seed(heldMidi.page);
await enterLevel(heldMidi.page, "LS06");
await completeGuide(heldMidi.page);
current = await waitResponseArm(heldMidi.page);
await connectMidi(heldMidi.page);
const heldTarget = current.attempt.sequence[current.attempt.callIndex];
const heldWrong = heldTarget === 60 ? 67 : 60;
await midiOn(heldMidi.page, heldWrong);
await waitPhase(heldMidi.page, "wrong-known");
current = await waitPhase(heldMidi.page, "awaiting-response");
const childStartsBeforeHeldRepeat = lifecycle(current.attempt, "child-echo", "started").length;
const wrongsBeforeHeldRepeat = current.attempt.totalWrongCount;
record("LS06 held MIDI remains unarmed after repair end", current.attempt?.inputArmed === false && current.attempt?.midiHeldMidis?.includes(heldWrong) && Boolean(current.attempt?.audioTransaction?.endedAt), current.attempt);
await midiOn(heldMidi.page, heldWrong);
await heldMidi.page.waitForTimeout(80);
current = await view(heldMidi.page);
record("LS06 repeated held MIDI note-on is observation-only after repair", current.attempt?.totalWrongCount === wrongsBeforeHeldRepeat && lifecycle(current.attempt, "child-echo", "started").length === childStartsBeforeHeldRepeat && current.attempt?.observations?.at(-1)?.reason === "held-midi", current.attempt);
await midiOff(heldMidi.page, heldWrong);
current = await waitResponseArm(heldMidi.page);
record("LS06 MIDI note-off after repair rearms exactly once", current.attempt?.inputArmed === true && current.attempt?.midiHeldMidis?.length === 0, current.attempt);
await midiOn(heldMidi.page, heldTarget);
await midiOff(heldMidi.page, heldTarget);
current = await waitPhase(heldMidi.page, "child-echo-playing");
record("LS06 fresh MIDI note-on after release creates one new child echo", current.attempt?.audioTransaction?.context === "child-echo" && current.attempt?.pendingInput?.midi === heldTarget && lifecycle(current.attempt, "child-echo", "started").length === childStartsBeforeHeldRepeat + 1, current.attempt);
await heldMidi.context.close();

const nextModelHeld = await makePage();
await seed(nextModelHeld.page, runtimeFixture({ ls06: true }));
await enterLevel(nextModelHeld.page, "LS07");
await completeGuide(nextModelHeld.page);
current = await waitResponseArm(nextModelHeld.page);
await connectMidi(nextModelHeld.page);
const nextModelHeldMidi = current.attempt.sequence[current.attempt.callIndex];
await midiOn(nextModelHeld.page, nextModelHeldMidi);
await waitPhase(nextModelHeld.page, "correct-feedback");
await waitPhase(nextModelHeld.page, "target-playing");
current = await waitPhase(nextModelHeld.page, "awaiting-response");
record("LS07 a held MIDI note blocks response rearm after the next model ends", current.attempt?.inputArmed === false && current.attempt?.midiHeldMidis?.includes(nextModelHeldMidi) && current.attempt?.callIndex === 1 && Boolean(current.attempt?.audioTransaction?.endedAt), current.attempt);
await midiOff(nextModelHeld.page, nextModelHeldMidi);
current = await waitResponseArm(nextModelHeld.page);
record("LS07 release after the next model rearms without a second release", current.attempt?.inputArmed === true && current.attempt?.midiHeldMidis?.length === 0, current.attempt);
await nextModelHeld.context.close();

const watchdog = await makePage();
await seed(watchdog.page);
await enterLevel(watchdog.page, "LS06");
await completeGuide(watchdog.page);
await waitResponseArm(watchdog.page);
await installWatchdogAudioContext(watchdog.page);
await watchdog.page.locator("#listeningReplay").click();
await watchdog.page.waitForTimeout(3000);
current = await view(watchdog.page);
record("LS06 watchdog converts a started whole-pair replay to interrupted without fabricated end or score", current.attempt?.audioTransaction?.context === "whole-pair-replay" && Boolean(current.attempt?.audioTransaction?.startedAt) && current.attempt?.audioTransaction?.endedAt === null && Boolean(current.attempt?.audioTransaction?.interruptedAt) && current.attempt?.phase === "sound-paused" && current.attempt?.scoredCalls?.length === 0, current.attempt);
await watchdog.context.close();

for (const closed of [false, true]) {
  const reverse = await makePage();
  await seed(reverse.page, closed ? runtimeFixture({ ls06: true }) : runtimeFixture());
  await enterLevel(reverse.page, closed ? "LS07" : "LS06");
  await completeGuide(reverse.page);
  await waitResponseArm(reverse.page);
  await installReverseOrderAudioContext(reverse.page);
  await reverse.page.locator("#listeningReplay").click();
  await waitPhase(reverse.page, "target-playing");
  await reverse.page.evaluate((nextState) => {
    const ctx = state.sfx?.ctx;
    ctx?._setStateSilently(nextState);
    ctx?._fireOscillatorEnds();
  }, closed ? "closed" : "suspended");
  current = await waitPhase(reverse.page, "sound-paused");
  const context = "whole-pair-replay";
  record(`LS0${closed ? "7" : "6"} reverse-order ${closed ? "closed" : "suspended"} onended interrupts instead of ending`, current.attempt?.audioTransaction?.contextState === (closed ? "closed" : "suspended") && current.attempt?.audioTransaction?.endedAt === null && Boolean(current.attempt?.audioTransaction?.interruptedAt) && lifecycle(current.attempt, context, "ended").length === 0 && lifecycle(current.attempt, context, "interrupted").length === 1, current.attempt);
  await reverse.page.evaluate(() => {
    const ctx = state.sfx?.ctx;
    ctx?._emitStatechange();
    ctx?._fireOscillatorEnds();
  });
  await reverse.page.waitForTimeout(80);
  current = await view(reverse.page);
  record(`LS0${closed ? "7" : "6"} late reverse-order callbacks stay idempotent`, lifecycle(current.attempt, context, "ended").length === 0 && lifecycle(current.attempt, context, "interrupted").length === 1 && current.attempt?.scoredCalls?.length === 0, current.attempt);
  await reverse.context.close();
}

const failed = checks.filter((check) => !check.pass);
console.log(`AUDIO-C lifecycle ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"}: ${check.name}`);
if (browserErrors.length) {
  console.error("Browser errors:", JSON.stringify(browserErrors, null, 2));
  process.exitCode = 1;
}
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exitCode = 1;
}
await browser.close();
