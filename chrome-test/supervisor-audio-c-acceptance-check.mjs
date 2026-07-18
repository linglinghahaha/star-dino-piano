import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const SCREEN = "\u5c4f\u5e55";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function runtimeFixture({ ls06 = false } = {}) {
  const completedAt = "2026-07-18T08:00:00.000Z";
  const lessonEvidence = Object.fromEntries(
    ["LS01", "LS02", "LS03", "LS04", "LS05"].map((id) => [id, { completedAt }])
  );
  if (ls06) lessonEvidence.LS06 = { completedAt, stable: true };
  return {
    version: 1,
    active: null,
    history: [{
      sessionId: "supervisor-c2-03",
      bundleId: "C2-03",
      status: "ended",
      completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }]
    }],
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
      ls07Completed: false,
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

function testUrl() {
  const target = new URL(baseUrl);
  target.search = "?screen=map&check=supervisor-audio-c";
  return target.toString();
}

async function makePage() {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1
  });
  await context.addInitScript(() => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({
      inputs: new Map([["supervisor-audio-c-midi", input]]),
      onstatechange: null
    });
    window.__supervisorMidiOn = (midi, velocity = 100) => input.onmidimessage?.({ data: [0x90, midi, velocity] });
    window.__supervisorMidiOff = (midi) => input.onmidimessage?.({ data: [0x80, midi, 0] });
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  return { context, page };
}

async function seed(page, runtime = runtimeFixture()) {
  await page.goto(testUrl(), { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.evaluate(({ runtimeValue, learningValue }) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
  }, { runtimeValue: runtime, learningValue: learningFixture() });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    return JSON.parse(JSON.stringify({
      runtime,
      action,
      attempt: action?.listeningAttempt || null,
      screen: state.screen,
      playback: state.teachingPlayback ? {
        id: state.teachingPlayback.id,
        status: state.teachingPlayback.status,
        reason: state.teachingPlayback.reason
      } : null
    }));
  });
}

async function enterLevel(page, levelId) {
  await page.locator("#gardenRestMarker").click();
  await page.waitForFunction((expected) => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return document.querySelector("#gardenScene")?.dataset.lesson === expected &&
      attempt?.audioTransaction?.context === "guide" && Boolean(attempt.audioTransaction?.startedAt);
  }, levelId, { timeout: 15000 });
}

async function waitGuideArm(page) {
  await page.waitForFunction(() => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return attempt?.phase === "visible-guide" && attempt.guideInputArmed === true &&
      Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, null, { timeout: 15000 });
  return view(page);
}

async function waitResponseArm(page) {
  await page.waitForFunction(() => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return ["awaiting-response", "assisted-retry", "visual-assist"].includes(attempt?.phase) &&
      attempt.inputArmed === true && Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, null, { timeout: 15000 });
  return view(page);
}

async function touchKey(page, midi) {
  await page.locator(`.white-key[data-midi="${midi}"]`).click();
}

async function completeGuide(page, midis) {
  for (const midi of midis) {
    await waitGuideArm(page);
    await touchKey(page, midi);
  }
  return waitResponseArm(page);
}

function lifecycle(attempt, context, kind = null) {
  return (attempt?.audioLifecycle || []).filter(
    (event) => event.context === context && (!kind || event.kind === kind)
  );
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

async function installManualAudioContext(page) {
  await page.evaluate(async () => {
    if (state.sfx?.ctx && state.sfx.ctx.state !== "closed") await state.sfx.ctx.close();
    state.sfx = null;
    const parameter = (value = 0) => ({
      value,
      cancelScheduledValues() {},
      setTargetAtTime() {},
      setValueAtTime() {},
      linearRampToValueAtTime() {},
      exponentialRampToValueAtTime() {}
    });
    const node = () => ({ connect() {}, disconnect() {} });
    window.__supervisorOscillators = [];
    class ManualAudioContext {
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
      close() { this.state = "closed"; this._listeners.forEach((listener) => listener()); return Promise.resolve(); }
      createGain() { return { ...node(), gain: parameter(1) }; }
      createDynamicsCompressor() {
        return {
          ...node(),
          threshold: parameter(-24),
          knee: parameter(20),
          ratio: parameter(8),
          attack: parameter(0.006),
          release: parameter(0.18)
        };
      }
      createBiquadFilter() {
        return { ...node(), type: "lowpass", frequency: parameter(0), Q: parameter(0) };
      }
      createOscillator() {
        let currentOnEnded = null;
        const savedOnEnded = [];
        const oscillator = {
          ...node(),
          type: "sine",
          frequency: parameter(0),
          detune: parameter(0),
          start() {},
          stop() {},
          fireSaved() { savedOnEnded.forEach((callback) => callback()); },
          fireCurrent() { currentOnEnded?.(); }
        };
        Object.defineProperty(oscillator, "onended", {
          configurable: true,
          get: () => currentOnEnded,
          set: (callback) => {
            if (typeof callback === "function") savedOnEnded.push(callback);
            currentOnEnded = callback;
          }
        });
        window.__supervisorOscillators.push(oscillator);
        return oscillator;
      }
    }
    window.AudioContext = ManualAudioContext;
    window.webkitAudioContext = ManualAudioContext;
  });
}

const finalEcho = await makePage();
await seed(finalEcho.page);
await enterLevel(finalEcho.page, "LS06");
await completeGuide(finalEcho.page, [60, 67]);
for (let completed = 0; completed < 3; completed += 1) {
  const ready = await waitResponseArm(finalEcho.page);
  const target = ready.attempt.sequence[ready.attempt.callIndex];
  await touchKey(finalEcho.page, target);
  await finalEcho.page.waitForFunction((minimum) => {
    const attempt = currentPairedListeningAction()?.listeningAttempt;
    return attempt?.callIndex >= minimum;
  }, completed + 1, { timeout: 15000 });
}
let current = await waitResponseArm(finalEcho.page);
const finalTarget = current.attempt.sequence[current.attempt.callIndex];
await observeMapTransitions(finalEcho.page, "__supervisorMapTransitions");
await finalEcho.page.evaluate(() => {
  window.__supervisorFinalAttempt = currentPairedListeningAction()?.listeningAttempt || null;
});
await touchKey(finalEcho.page, finalTarget);
await finalEcho.page.waitForFunction(() => {
  const attempt = window.__supervisorFinalAttempt;
  return attempt?.audioTransaction?.context === "child-echo" &&
    Boolean(attempt.audioTransaction?.startedAt) && !attempt.audioTransaction?.endedAt;
}, null, { timeout: 10000 });
current = await view(finalEcho.page);
record(
  "final LS06 child echo cannot complete the lesson before its real end",
  current.attempt?.callIndex === 3 && current.attempt?.scoredCalls?.length === 3 &&
    !current.runtime.chapter3?.lessonEvidence?.LS06 &&
    !current.runtime.history?.some((session) => session.bundleId === "C3-05"),
  current
);
await finalEcho.page.locator("#mapReturn").click();
await finalEcho.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 15000 });
await finalEcho.page.waitForTimeout(1900);
const finalResult = await finalEcho.page.evaluate(() => {
  const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
  const attempt = window.__supervisorFinalAttempt;
  const playbackId = attempt?.audioTransaction?.playbackId || null;
  return JSON.parse(JSON.stringify({
    runtime,
    attempt,
    playbackId,
    mapTransitions: window.__supervisorMapTransitions?.count || 0,
    screen: state.screen
  }));
});
const finalStarted = lifecycle(finalResult.attempt, "child-echo", "started")
  .filter((event) => event.playbackId === finalResult.playbackId);
const finalEnded = lifecycle(finalResult.attempt, "child-echo", "ended")
  .filter((event) => event.playbackId === finalResult.playbackId);
const finalConsumed = (finalResult.attempt?.audioLifecycle || []).filter(
  (event) => event.kind === "queued-return-consumed" && event.playbackId === finalResult.playbackId
);
const endedLs06 = finalResult.runtime.history?.filter(
  (session) => session.bundleId === "C3-05" && session.status === "ended"
) || [];
const automaticLaterSessions = finalResult.runtime.history?.filter(
  (session) => ["C3-06", "C3-07"].includes(session.bundleId)
) || [];
record(
  "final LS06 echo ends once, consumes one queued map return, and records one completion",
  finalStarted.length === 1 && finalEnded.length === 1 && finalConsumed.length === 1 &&
    finalResult.attempt?.callIndex === 4 && finalResult.attempt?.scoredCalls?.length === 4 &&
    finalResult.attempt?.audioTransaction?.returnQueued === false &&
    Boolean(finalResult.attempt?.audioTransaction?.returnQueuedConsumedAt) &&
    finalResult.mapTransitions === 1 && endedLs06.length === 1,
  { finalResult, finalStarted, finalEnded, finalConsumed, endedLs06 }
);
record(
  "LS06 completion stays on the map without automatically creating LS07 or LS08",
  finalResult.screen === "map" && finalResult.runtime.active === null && automaticLaterSessions.length === 0,
  { finalResult, automaticLaterSessions }
);
await finalEcho.context.close();

const guideContinuation = await makePage();
await seed(guideContinuation.page);
await enterLevel(guideContinuation.page, "LS06");
await waitGuideArm(guideContinuation.page);
await touchKey(guideContinuation.page, 60);
await guideContinuation.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "child-echo" &&
    attempt.audioTransaction?.payload?.phaseRole === "guide" &&
    attempt.audioTransaction?.payload?.guideIndex === 0 &&
    Boolean(attempt.audioTransaction?.startedAt) && !attempt.audioTransaction?.endedAt;
}, null, { timeout: 10000 });
await guideContinuation.page.locator("#mapReturn").click();
await guideContinuation.page.waitForFunction(
  () => document.body.classList.contains("screen-map"),
  null,
  { timeout: 15000 }
);
await guideContinuation.page.locator("#gardenRestMarker").click();
await guideContinuation.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return document.body.classList.contains("screen-garden") &&
    attempt?.guideIndex === 1 && attempt?.guideInputArmed === true;
}, null, { timeout: 15000 });
current = await view(guideContinuation.page);
const secondGuideStarts = lifecycle(current.attempt, "guide", "started")
  .filter((event) => event.midis?.join(",") === "67");
const secondGuideEnds = lifecycle(current.attempt, "guide", "ended")
  .filter((event) => event.midis?.join(",") === "67");
record(
  "map resume after first guide echo presents the second guide before accepting its answer",
  current.attempt?.guideIndex === 1 && current.attempt?.guideInputArmed === true &&
    secondGuideStarts.length === 1 && secondGuideEnds.length === 1,
  { current, secondGuideStarts, secondGuideEnds }
);
await guideContinuation.context.close();

const hiddenAndMidi = await makePage();
await seed(hiddenAndMidi.page, runtimeFixture({ ls06: true }));
await enterLevel(hiddenAndMidi.page, "LS07");
await completeGuide(hiddenAndMidi.page, [64, 65]);
const hiddenSnapshot = await hiddenAndMidi.page.evaluate(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  const targetMidi = attempt?.sequence?.[attempt.callIndex] ?? null;
  const targetName = noteForMidi(targetMidi)?.name || "";
  const targetKey = document.querySelector(`.white-key[data-midi="${targetMidi}"]`);
  const speech = `${document.querySelector("#gardenSpeechMain")?.textContent || ""} ${document.querySelector("#gardenSpeechSupport")?.textContent || ""}`;
  return {
    targetMidi,
    targetName,
    phase: attempt?.phase || "",
    targetCarriers: document.querySelectorAll("#keyboard [data-target-note='true'], #keyboard .target, #keyboard .target-muted").length,
    endpointNotes: [...document.querySelectorAll("#pairedListeningWorld [data-note]")].length,
    compareHidden: document.querySelector("#ls05Compare")?.hidden === true,
    compareAria: document.querySelector("#ls05Compare")?.getAttribute("aria-label") || null,
    keyboardTargetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
    targetColor: targetKey?.style.getPropertyValue("--target-color") || "",
    targetGlow: targetKey?.style.getPropertyValue("--target-glow") || "",
    speechLeaksTarget: targetName ? new RegExp(`(^|[^A-Z])${targetName}([^A-Z]|$)`).test(speech) : true
  };
});
record(
  "LS07 hidden target has no dynamic keyboard, endpoint, comparison, speech, or ARIA carrier",
  hiddenSnapshot.phase === "awaiting-response" && hiddenSnapshot.targetCarriers === 0 &&
    hiddenSnapshot.endpointNotes === 0 && hiddenSnapshot.compareHidden && hiddenSnapshot.compareAria === null &&
    hiddenSnapshot.keyboardTargetVisible === "false" && hiddenSnapshot.targetColor === "" &&
    hiddenSnapshot.targetGlow === "" && !hiddenSnapshot.speechLeaksTarget,
  hiddenSnapshot
);
await hiddenAndMidi.page.locator("#listeningReplay").click();
await hiddenAndMidi.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "whole-pair-replay" && Boolean(attempt.audioTransaction?.startedAt);
}, null, { timeout: 10000 });
current = await view(hiddenAndMidi.page);
const replayPlaybackId = current.attempt.audioTransaction.playbackId;
record(
  "LS07 whole-pair replay preserves E-F order and child-replay provenance",
  current.attempt.audioTransaction.notes?.map((note) => note.midi).join(",") === "64,65" &&
    current.attempt.audioTransaction.payload?.pairMidis?.join(",") === "64,65" &&
    current.attempt.audioTransaction.reason === "child-replay" && current.attempt.replayCountChild === 1,
  current.attempt
);
current = await waitResponseArm(hiddenAndMidi.page);
record(
  "LS07 whole-pair replay has one real start and one real end for the same playback",
  lifecycle(current.attempt, "whole-pair-replay", "started").filter((event) => event.playbackId === replayPlaybackId).length === 1 &&
    lifecycle(current.attempt, "whole-pair-replay", "ended").filter((event) => event.playbackId === replayPlaybackId).length === 1,
  current.attempt
);

await hiddenAndMidi.page.evaluate(() => connectMIDI());
await hiddenAndMidi.page.waitForFunction(() => Boolean(state.midiAccess), null, { timeout: 10000 });
const midiTarget = current.attempt.sequence[current.attempt.callIndex];
const heldWrong = midiTarget === 64 ? 65 : 64;
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOn(midi), heldWrong);
await hiddenAndMidi.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "wrong-repair" && Boolean(attempt.audioTransaction?.endedAt);
}, null, { timeout: 15000 });
current = await view(hiddenAndMidi.page);
const childStartsBeforeHeldRepeat = lifecycle(current.attempt, "child-echo", "started").length;
const wrongCountBeforeHeldRepeat = current.attempt.totalWrongCount;
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOn(midi), midiTarget);
await hiddenAndMidi.page.waitForTimeout(120);
current = await view(hiddenAndMidi.page);
record(
  "held MIDI blocks rearm and a second note-on until the original note-off",
  current.attempt.inputArmed === false && current.attempt.midiHeldMidis?.includes(heldWrong) &&
    current.attempt.totalWrongCount === wrongCountBeforeHeldRepeat &&
    lifecycle(current.attempt, "child-echo", "started").length === childStartsBeforeHeldRepeat,
  current.attempt
);
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOff(midi), heldWrong);
await hiddenAndMidi.page.waitForTimeout(120);
current = await view(hiddenAndMidi.page);
record(
  "releasing only one of two held MIDI notes keeps the response disarmed",
  current.attempt.inputArmed === false && current.attempt.midiHeldMidis?.length === 1 &&
    current.attempt.midiHeldMidis?.includes(midiTarget),
  current.attempt
);
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOff(midi), midiTarget);
await hiddenAndMidi.page.waitForFunction(() => currentPairedListeningAction()?.listeningAttempt?.inputArmed === true, null, { timeout: 5000 });
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOn(midi), midiTarget);
await hiddenAndMidi.page.waitForFunction((prior) => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return (attempt?.audioLifecycle || []).filter((event) => event.context === "child-echo" && event.kind === "started").length === prior + 1;
}, childStartsBeforeHeldRepeat, { timeout: 10000 });
current = await view(hiddenAndMidi.page);
record(
  "fresh MIDI note-on after note-off starts exactly one new child echo",
  current.attempt.audioTransaction?.context === "child-echo" &&
    current.attempt.pendingInput?.midi === midiTarget &&
    lifecycle(current.attempt, "child-echo", "started").length === childStartsBeforeHeldRepeat + 1,
  current.attempt
);
await hiddenAndMidi.page.evaluate((midi) => window.__supervisorMidiOff(midi), midiTarget);
await hiddenAndMidi.context.close();

const staleCallbacks = await makePage();
await seed(staleCallbacks.page);
await enterLevel(staleCallbacks.page, "LS06");
await completeGuide(staleCallbacks.page, [60, 67]);
await installManualAudioContext(staleCallbacks.page);
await staleCallbacks.page.locator("#listeningReplay").click();
await staleCallbacks.page.waitForFunction(() => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "whole-pair-replay" && Boolean(attempt.audioTransaction?.startedAt) &&
    window.__supervisorOscillators?.length === 8;
}, null, { timeout: 10000 });
const staleBefore = await view(staleCallbacks.page);
const stalePlaybackId = staleBefore.attempt.audioTransaction.playbackId;
await staleCallbacks.page.evaluate(() => interruptTeachingPianoSequence("supervisor-stale-callback"));
await staleCallbacks.page.waitForFunction(() => currentPairedListeningAction()?.listeningAttempt?.phase === "sound-paused", null, { timeout: 5000 });
await staleCallbacks.page.locator("#listeningReplay").click();
await staleCallbacks.page.waitForFunction((oldId) => {
  const attempt = currentPairedListeningAction()?.listeningAttempt;
  return attempt?.audioTransaction?.context === "whole-pair-replay" &&
    attempt.audioTransaction.playbackId !== oldId && Boolean(attempt.audioTransaction.startedAt) &&
    window.__supervisorOscillators?.length === 16;
}, stalePlaybackId, { timeout: 10000 });
current = await view(staleCallbacks.page);
const resumedPlaybackId = current.attempt.audioTransaction.playbackId;
await staleCallbacks.page.evaluate(() => {
  window.__supervisorOscillators.slice(0, 8).forEach((oscillator) => oscillator.fireSaved());
});
await staleCallbacks.page.waitForTimeout(120);
current = await view(staleCallbacks.page);
record(
  "late callbacks from the interrupted playback cannot mutate the resumed transaction",
  current.attempt.audioTransaction?.playbackId === resumedPlaybackId &&
    current.attempt.audioTransaction?.endedAt === null && current.attempt.audioTransaction?.interruptedAt === null &&
    current.playback?.id === resumedPlaybackId && current.attempt.scoredCalls?.length === 0 &&
    lifecycle(current.attempt, "whole-pair-replay", "ended").filter((event) => event.playbackId === stalePlaybackId).length === 0 &&
    lifecycle(current.attempt, "whole-pair-replay", "interrupted").filter((event) => event.playbackId === stalePlaybackId).length === 1,
  current
);
await staleCallbacks.page.evaluate(() => {
  window.__supervisorOscillators.slice(8, 16).forEach((oscillator) => oscillator.fireCurrent());
});
current = await waitResponseArm(staleCallbacks.page);
record(
  "resumed whole-pair playback ends once and keeps the original child replay count",
  lifecycle(current.attempt, "whole-pair-replay", "ended").filter((event) => event.playbackId === resumedPlaybackId).length === 1 &&
    lifecycle(current.attempt, "whole-pair-replay", "started").filter((event) => event.playbackId === resumedPlaybackId).length === 1 &&
    current.attempt.replayCountChild === 1 && current.attempt.replayCountSystem === 0 &&
    current.attempt.scoredCalls?.length === 0,
  current.attempt
);
await staleCallbacks.context.close();

record("supervisor probe has no browser warning or error", browserErrors.length === 0, browserErrors);
await browser.close();

const failed = checks.filter((check) => !check.pass);
console.log(`Supervisor AUDIO-C acceptance: ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"}: ${check.name}`);
if (failed.length) {
  for (const check of failed) console.error(JSON.stringify(check, null, 2));
  process.exitCode = 1;
}
