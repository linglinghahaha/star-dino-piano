import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/audio_b_lifecycle_latest";
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

function testUrl(search = "?screen=map&check=audio-b") {
  const target = new URL(baseUrl);
  target.search = search;
  return target.toString();
}

function ls04Runtime() {
  return {
    version: 1,
    active: null,
    history: [{
      sessionId: "audio-b-c2-03",
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
      lessonEvidence: {
        LS01: { completedAt: "2026-07-11T01:00:00.000Z" },
        LS02: { completedAt: "2026-07-11T01:05:00.000Z" },
        LS03: { completedAt: "2026-07-11T01:10:00.000Z" }
      },
      resume: null,
      ls03QualifiedInputs: 2,
      completed: true,
      visibleSliceCompleted: true,
      ls04Attempts: [],
      ls05Attempts: []
    }
  };
}

function ls05Runtime() {
  const runtime = ls04Runtime();
  runtime.chapter3.lessonEvidence.LS04 = { completedAt: "2026-07-11T01:20:00.000Z", stable: true };
  runtime.chapter3.ls04Completed = true;
  runtime.chapter3.ls05Completed = false;
  return runtime;
}

function formalLs04IsolationRuntime() {
  const runtime = ls04Runtime();
  const currentSessionId = "audio-b-current-ls04";
  const staleSessionId = "audio-b-stale-ls04";
  runtime.active = {
    sessionId: currentSessionId,
    bundleId: "C3-03",
    startedAt: "2026-07-17T00:00:00.000Z",
    localDateKey: "2026-07-17",
    status: "active",
    actionIndex: 0,
    actions: [{
      actionId: "LS04-listening",
      kind: "garden-listening",
      targetId: "LS04",
      runMode: "check",
      role: "lesson",
      requiredReview: false,
      reviewSkillKey: null
    }],
    completedActions: [],
    restAfterCurrentLevel: false
  };
  runtime.history.push({
    sessionId: staleSessionId,
    bundleId: "C3-03",
    status: "ended",
    actions: [{
      actionId: "LS04-listening",
      kind: "garden-listening",
      targetId: "LS04",
      listeningAttempt: {
        version: 1,
        seed: staleSessionId,
        phase: "awaiting-response",
        callIndex: 2,
        totalWrongCount: 2,
        correctCount: 0,
        childInputs: [{ midi: 60, source: "screen" }],
        inputRoutes: { screen: 1 },
        audioTrace: [{ kind: "child-input", midi: 60 }]
      }
    }],
    completedActions: []
  });
  return runtime;
}

async function makePage() {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
  await context.addInitScript(() => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["audio-b-midi", input]]), onstatechange: null });
    window.__audioBEmitMidi = (midi, velocity = 100) => input.onmidimessage?.({ data: [0x90, midi, velocity] });
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  });
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  return { context, page };
}

async function seed(page, runtime = ls04Runtime(), search = "?screen=map&check=audio-b") {
  await page.goto(testUrl(search), { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.evaluate((snapshot) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(snapshot));
  }, runtime);
  await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
}

async function waitPhase(page, phases, timeout = 12000) {
  const expected = Array.isArray(phases) ? phases : [phases];
  await page.waitForFunction((values) => values.includes(document.querySelector("#gardenScene")?.dataset.listeningPhase), expected, { timeout });
  return view(page);
}

async function waitForLs04ResponseRearm(page, phase = "assisted") {
  await page.waitForFunction((expectedPhase) => {
    const attempt = currentListeningAction("LS04")?.listeningAttempt;
    return attempt?.phase === expectedPhase && attempt.inputArmed === true &&
      Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, phase, { timeout: 12000 });
  return view(page);
}

async function view(page) {
  return page.evaluate(() => {
    const attempt = currentListeningAction()?.listeningAttempt || null;
    return JSON.parse(JSON.stringify({
      screen: state.screen,
      phase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
      attempt,
      teachingPlayback: state.teachingPlayback ? {
        id: state.teachingPlayback.id,
        status: state.teachingPlayback.status,
        reason: state.teachingPlayback.reason
      } : null,
      audioState: state.sfx?.ctx?.state || null,
      chapter3: state.chapter3
    }));
  });
}

function lifecycle(attempt, context, kind) {
  return (attempt?.audioLifecycle || []).filter((event) => event.context === context && (!kind || event.kind === kind));
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
      suspend() { this.state = "suspended"; this._emitStatechange(); return Promise.resolve(); }
      close() { this.state = "closed"; this._emitStatechange(); return Promise.resolve(); }
      _setStateSilently(nextState) { this.state = nextState; }
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

const ls04 = await makePage();
await seed(ls04.page);
await ls04.page.locator("#gardenRestMarker").click();
await waitPhase(ls04.page, ["reference", "target-playing", "awaiting-response"]);
let current = await waitPhase(ls04.page, "target-playing");
const targetMidi = current.attempt.sequence[current.attempt.callIndex];
const wrongMidi = targetMidi === 60 ? 62 : 60;
await ls04.page.evaluate((midi) => {
  window.handleInput(midi, "MIDI");
  window.releaseGardenInput(midi, "MIDI");
}, wrongMidi);
current = await view(ls04.page);
record("LS04 hidden target does not score an input before its actual end", current.attempt.callIndex === 0 && current.attempt.totalWrongCount === 0 && current.attempt.observations.length >= 1 && !current.attempt.inputArmed, current);
current = await waitPhase(ls04.page, "awaiting-response");
const targetEnds = lifecycle(current.attempt, "target", "ended");
record("LS04 opens response only after the verified target end", current.attempt.inputArmed === true && targetEnds.length === 1 && Boolean(targetEnds[0].endedAt) && Number.isFinite(targetEnds[0].endAudioTime), { transaction: current.attempt.audioTransaction, targetEnds });

await ls04.page.locator(`.white-key[data-midi="${wrongMidi}"]`).click();
current = await waitPhase(ls04.page, "child-echo-playing");
const childStarts = lifecycle(current.attempt, "child-echo", "started");
record("LS04 screen input starts one controlled child echo before wrong scoring", current.attempt.totalWrongCount === 0 && childStarts.length === 1 && current.attempt.audioTransaction?.endedAt === null, current);
await ls04.page.waitForFunction(() => currentListeningAction("LS04")?.listeningAttempt?.audioTransaction?.context === "wrong-repair" && Boolean(state.teachingPlayback), null, { timeout: 12000 });
current = await view(ls04.page);
const childEnds = lifecycle(current.attempt, "child-echo", "ended");
const repairStarts = lifecycle(current.attempt, "wrong-repair", "started");
record("LS04 wrong repair begins after the child echo ends without a duplicate child voice", childStarts.length === 1 && childEnds.length === 1 && repairStarts.length === 1 && Number(childEnds[0].endAudioTime) <= Number(repairStarts[0].startAudioTime), { childStarts, childEnds, repairStarts });
current = await waitPhase(ls04.page, "awaiting-response");
const repairEnds = lifecycle(current.attempt, "wrong-repair", "ended");
record("LS04 repair re-arms only after its verified target end", current.attempt.totalWrongCount === 1 && current.attempt.inputArmed === true && repairEnds.length === 1, current);
const beforeMap = await ls04.page.evaluate(() => ({ activeSession: state.activeSession?.sessionId || null, sequence: currentListeningAction("LS04")?.listeningAttempt?.sequence || [] }));
await ls04.page.locator("#mapReturn").click();
await ls04.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await ls04.page.locator("#gardenRestMarker").click();
current = await waitPhase(ls04.page, "awaiting-response");
record("LS04 map re-entry retains the active call and re-arms it without replaying the child input", current.attempt.callIndex === 0 && current.attempt.totalWrongCount === 1 && current.attempt.childInputs.length === 1 && current.attempt.inputArmed === true && current.attempt.sequence.join(",") === beforeMap.sequence.join(","), { beforeMap, current });
await ls04.page.locator(`.white-key[data-midi="${targetMidi}"]`).click();
current = await waitPhase(ls04.page, "correct-feedback");
record("LS04 correct child echo commits only after its verified end", current.attempt.callIndex === 1 && current.attempt.correctCount === 0 && current.attempt.audioTransaction?.context === "child-echo" && Boolean(current.attempt.audioTransaction?.endedAt), current);
current = await waitPhase(ls04.page, "target-playing");
const nextTargetPlayback = current.attempt.audioTransaction?.playbackId;
current = await waitPhase(ls04.page, "awaiting-response");
record("LS04 system-next target ends before the following response opens", current.attempt.callIndex === 1 && current.attempt.inputArmed === true && current.attempt.audioTransaction?.context === "target" && current.attempt.audioTransaction?.playbackId === nextTargetPlayback && Boolean(current.attempt.audioTransaction?.endedAt), current);
await ls04.page.screenshot({ path: path.join(screenshotDir, "ls04_repair_settled_1024x768.png") });
await ls04.context.close();

const formalIsolation = await makePage();
const currentFormalSessionId = "audio-b-current-ls04";
const staleFormalSessionId = "audio-b-stale-ls04";
await seed(
  formalIsolation.page,
  formalLs04IsolationRuntime(),
  `?mode=garden&bundle=C3-03&sessionId=${currentFormalSessionId}&check=audio-b`
);
current = await waitPhase(formalIsolation.page, "reference-ready");
const initialFormalAttempt = await formalIsolation.page.evaluate(() => {
  const action = currentListeningAction("LS04");
  return {
    sessionId: state.activeSession?.sessionId || null,
    attempt: action?.listeningAttempt || null
  };
});
record("LS04 matching formal session URL creates fresh current-session evidence instead of reading history", initialFormalAttempt.sessionId === currentFormalSessionId && initialFormalAttempt.attempt?.seed === currentFormalSessionId && initialFormalAttempt.attempt?.callIndex === 0 && initialFormalAttempt.attempt?.totalWrongCount === 0 && initialFormalAttempt.attempt?.childInputs.length === 0 && initialFormalAttempt.attempt?.audioTrace.length === 0, initialFormalAttempt);
await formalIsolation.page.goto(
  testUrl(`?mode=garden&bundle=C3-03&sessionId=${staleFormalSessionId}&check=audio-b`),
  { waitUntil: "domcontentloaded", timeout: 15000 }
);
await formalIsolation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
const staleDeepLink = await formalIsolation.page.evaluate(() => ({
  activeSessionId: state.activeSession?.sessionId || null,
  currentAction: currentListeningAction("LS04") || null,
  storedActiveSessionId: state.sessionRuntime.active?.sessionId || null
}));
record("LS04 stale explicit session URL cannot bind historical listening evidence", staleDeepLink.activeSessionId === null && staleDeepLink.currentAction === null && staleDeepLink.storedActiveSessionId === currentFormalSessionId, staleDeepLink);
await formalIsolation.page.goto(
  testUrl(`?mode=garden&bundle=C3-03&sessionId=${currentFormalSessionId}&check=audio-b`),
  { waitUntil: "domcontentloaded", timeout: 15000 }
);
await formalIsolation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
current = await waitPhase(formalIsolation.page, "reference-ready");
record("LS04 matching session deep-link recovery keeps only its own fresh pending evidence", current.attempt?.seed === currentFormalSessionId && current.attempt?.callIndex === 0 && current.attempt?.totalWrongCount === 0 && current.attempt?.inputRoutes && Object.keys(current.attempt.inputRoutes).length === 0 && current.attempt?.audioTrace.length === 0, current);
await formalIsolation.context.close();

const duplicateRelease = await makePage();
await seed(duplicateRelease.page);
await duplicateRelease.page.locator("#gardenRestMarker").click();
current = await waitPhase(duplicateRelease.page, "awaiting-response");
const duplicateReleaseTarget = current.attempt.sequence[current.attempt.callIndex];
await duplicateRelease.page.locator(`.white-key[data-midi="${duplicateReleaseTarget}"]`).click();
await waitPhase(duplicateRelease.page, "child-echo-playing");
await duplicateRelease.page.evaluate((midi) => {
  window.releaseGardenInput(midi, "屏幕");
  window.releaseGardenInput(midi, "屏幕");
}, duplicateReleaseTarget);
current = await waitPhase(duplicateRelease.page, "correct-feedback");
record("LS04 duplicate screen pointer releases cannot duplicate the controlled child echo or score", current.attempt.childInputs.length === 1 && current.attempt.inputRoutes["屏幕"] === 1 && lifecycle(current.attempt, "child-echo", "started").length === 1 && lifecycle(current.attempt, "child-echo", "ended").length === 1 && current.attempt.callIndex === 1, current);
await duplicateRelease.context.close();

const ls05 = await makePage();
await seed(ls05.page, ls05Runtime());
await ls05.page.locator("#gardenRestMarker").click();
await waitPhase(ls05.page, "target-playing");
current = await view(ls05.page);
const ls05Target = current.attempt.sequence[current.attempt.callIndex];
const ls05Wrong = [60, 62, 64].find((midi) => midi !== ls05Target);
const ls05ReferenceEnds = lifecycle(current.attempt, "reference", "ended");
record("LS05 starts its hidden target only after the unscored C reference actually ends", current.attempt.referencePlayed === true && ls05ReferenceEnds.length === 1 && current.attempt.scoredCalls.length === 0 && current.attempt.audioTransaction?.context === "target" && current.attempt.audioTransaction?.endedAt === null, current);
current = await waitPhase(ls05.page, "awaiting-response");
record("LS05 does not arm C/D/E scoring until the hidden target has a verified end", current.attempt.inputArmed === true && current.attempt.audioTransaction?.context === "target" && Boolean(current.attempt.audioTransaction?.endedAt) && current.attempt.scoredCalls.length === 0, current);
await ls05.page.locator("#listeningReplay").click();
current = await waitPhase(ls05.page, "target-playing");
record("LS05 child replay is its own started source and count", current.attempt.audioTransaction?.reason === "child-replay" && current.attempt.replayCountChild === 1 && current.attempt.callReplayCountChild === 1 && current.attempt.replayCountSystem === 0, current);
await waitPhase(ls05.page, "awaiting-response");

await ls05.page.evaluate((midi) => window.handleInput(midi, "MIDI"), ls05Wrong);
current = await waitPhase(ls05.page, "child-echo-playing");
record("LS05 held MIDI begins one local child echo before any wrong score", current.attempt.callWrongCount === 0 && current.attempt.totalWrongCount === 0 && current.attempt.midiHeldMidis.join(",") === String(ls05Wrong) && lifecycle(current.attempt, "child-echo", "started").length === 1, current);
await waitPhase(ls05.page, "wrong-known");
current = await waitPhase(ls05.page, "awaiting-response");
const heldChildStarts = lifecycle(current.attempt, "child-echo", "started");
const heldRepairEnds = lifecycle(current.attempt, "wrong-repair", "ended");
record("LS05 repair ending cannot re-arm a held MIDI note", current.attempt.callWrongCount === 1 && current.attempt.totalWrongCount === 1 && current.attempt.inputArmed === false && current.attempt.midiHeldMidis.join(",") === String(ls05Wrong) && heldChildStarts.length === 1 && heldRepairEnds.length === 1, current);
await ls05.page.evaluate((midi) => window.handleInput(midi, "MIDI"), ls05Wrong);
await ls05.page.waitForTimeout(120);
current = await view(ls05.page);
record("LS05 repeated held MIDI note-on is observation-only", current.attempt.totalWrongCount === 1 && lifecycle(current.attempt, "child-echo", "started").length === 1 && current.attempt.observations.some((entry) => entry.phase === "held-midi"), current);
await ls05.page.evaluate((midi) => window.releaseGardenInput(midi, "MIDI"), ls05Wrong);
await ls05.page.waitForFunction(() => currentListeningAction("LS05")?.listeningAttempt?.inputArmed === true, null, { timeout: 12000 });
current = await view(ls05.page);
record("LS05 note-off after repair arms the same call exactly once", current.attempt.inputArmed === true && current.attempt.midiHeldMidis.length === 0 && current.attempt.totalWrongCount === 1, current);
await ls05.page.evaluate((midi) => {
  window.handleInput(midi, "MIDI");
  window.releaseGardenInput(midi, "MIDI");
}, ls05Target);
current = await waitPhase(ls05.page, "correct-feedback");
record("LS05 released MIDI creates one child echo and advances only after it ends", current.attempt.callIndex === 1 && current.attempt.correctCount === 0 && current.attempt.inputRoutes.MIDI === 2 && lifecycle(current.attempt, "child-echo", "started").length === 2, current);
await ls05.page.screenshot({ path: path.join(screenshotDir, "ls05_held_midi_1024x768.png") });
await ls05.context.close();

const queuedTarget = await makePage();
await seed(queuedTarget.page);
await queuedTarget.page.locator("#gardenRestMarker").click();
await waitPhase(queuedTarget.page, "target-playing");
await queuedTarget.page.evaluate(() => {
  window.__audioBMapTransitions = 0;
  window.__audioBMapObserver = new MutationObserver(() => {
    if (document.body.classList.contains("screen-map")) window.__audioBMapTransitions += 1;
  });
  window.__audioBMapObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
});
await queuedTarget.page.locator("#mapReturn").click();
let queued = await queuedTarget.page.evaluate(() => {
  const transaction = currentListeningAction("LS04")?.listeningAttempt?.audioTransaction;
  return { returnQueued: transaction?.returnQueued === true, endedAt: transaction?.endedAt || null, playbackId: transaction?.playbackId || null };
});
await queuedTarget.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await queuedTarget.page.waitForTimeout(120);
current = await view(queuedTarget.page);
const queuedTargetEnds = lifecycle(current.attempt, "target", "ended");
const queuedTargetTransitions = await queuedTarget.page.evaluate(() => {
  window.__audioBMapObserver?.disconnect();
  return window.__audioBMapTransitions;
});
record("LS04 queued target return waits for one true end before reaching the map once", queued.returnQueued && queued.endedAt === null && current.screen === "map" && current.attempt.audioTransaction?.playbackId === queued.playbackId && Boolean(current.attempt.audioTransaction?.endedAt) && !current.attempt.audioTransaction?.interruptedAt && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && queuedTargetEnds.length === 1 && current.attempt.scoredCalls.length === 0 && queuedTargetTransitions === 1, { queued, current, queuedTargetEnds, queuedTargetTransitions });
await queuedTarget.page.locator("#gardenRestMarker").click();
current = await waitPhase(queuedTarget.page, "awaiting-response");
record("LS04 queued target re-entry preserves its call without synthetic scoring", current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.inputArmed === true, current);
await queuedTarget.context.close();

const interruptedTarget = await makePage();
await seed(interruptedTarget.page);
await interruptedTarget.page.locator("#gardenRestMarker").click();
await waitPhase(interruptedTarget.page, "target-playing");
await interruptedTarget.page.locator("#mapReturn").click();
await interruptedTarget.page.waitForFunction(() => currentListeningAction("LS04")?.listeningAttempt?.audioTransaction?.returnQueued === true, null, { timeout: 12000 });
await interruptedTarget.page.evaluate(async () => {
  if (state.sfx?.ctx?.state === "running") await state.sfx.ctx.suspend();
});
await interruptedTarget.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
current = await view(interruptedTarget.page);
record("LS04 interrupted queued target consumes one map request without a fabricated end or score", current.screen === "map" && current.attempt.phase === "sound-paused" && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && current.attempt.scoredCalls.length === 0, current);
await interruptedTarget.page.locator("#gardenRestMarker").click();
current = await waitPhase(interruptedTarget.page, "sound-paused");
await interruptedTarget.page.evaluate(async () => {
  if (state.sfx?.ctx?.state === "suspended") await state.sfx.ctx.resume();
});
await interruptedTarget.page.locator("#listeningReplay").click();
current = await waitPhase(interruptedTarget.page, "awaiting-response");
record("LS04 explicit recovery of an interrupted system target has one new playback and no child replay", current.attempt.replayCountChild === 0 && current.attempt.replayCountSystem === 0 && current.attempt.audioLifecycle.filter((event) => event.context === "target" && event.kind === "started").length === 2 && current.attempt.audioLifecycle.filter((event) => event.context === "target" && event.kind === "ended").length === 1 && current.attempt.inputArmed === true, current);
await interruptedTarget.context.close();

const queuedRepair = await makePage();
await seed(queuedRepair.page);
await queuedRepair.page.locator("#gardenRestMarker").click();
current = await waitPhase(queuedRepair.page, "awaiting-response");
const queuedRepairWrong = current.attempt.sequence[current.attempt.callIndex] === 60 ? 62 : 60;
await queuedRepair.page.locator(`.white-key[data-midi="${queuedRepairWrong}"]`).click();
await queuedRepair.page.waitForFunction(() => currentListeningAction("LS04")?.listeningAttempt?.audioTransaction?.context === "wrong-repair" && Boolean(state.teachingPlayback), null, { timeout: 12000 });
await queuedRepair.page.locator("#mapReturn").click();
await queuedRepair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
current = await view(queuedRepair.page);
const queuedRepairChildren = lifecycle(current.attempt, "child-echo", "started");
const queuedRepairEnds = lifecycle(current.attempt, "wrong-repair", "ended");
record("LS04 queued wrong repair leaves only after child then target each end once", queuedRepairChildren.length === 1 && queuedRepairEnds.length === 1 && current.attempt.totalWrongCount === 1 && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && current.attempt.scoredCalls.length === 0, current);
await queuedRepair.context.close();

const queuedChild = await makePage();
await seed(queuedChild.page);
await queuedChild.page.locator("#gardenRestMarker").click();
current = await waitPhase(queuedChild.page, "awaiting-response");
const queuedChildTarget = current.attempt.sequence[current.attempt.callIndex];
await queuedChild.page.locator(`.white-key[data-midi="${queuedChildTarget}"]`).click();
await waitPhase(queuedChild.page, "child-echo-playing");
await queuedChild.page.locator("#mapReturn").click();
await queuedChild.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
current = await view(queuedChild.page);
const queuedChildEnds = lifecycle(current.attempt, "child-echo", "ended");
record("LS04 queued child echo commits exactly once after ended and does not start the next target before map", current.attempt.callIndex === 1 && current.attempt.correctCount === 1 && current.attempt.audioTransaction?.context === "child-echo" && queuedChildEnds.length === 1 && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && lifecycle(current.attempt, "target", "started").length === 1, current);
await queuedChild.context.close();

const modeledQueued = await makePage();
await seed(modeledQueued.page);
await modeledQueued.page.locator("#gardenRestMarker").click();
current = await waitPhase(modeledQueued.page, "awaiting-response");
const modeledTarget = current.attempt.sequence[current.attempt.callIndex];
const modeledWrong = modeledTarget === 60 ? 62 : 60;
for (let index = 0; index < 3; index += 1) {
  await modeledQueued.page.locator(`.white-key[data-midi="${modeledWrong}"]`).click();
  if (index === 2) {
    await waitPhase(modeledQueued.page, "assisted");
    await waitForLs04ResponseRearm(modeledQueued.page);
  }
  else await waitPhase(modeledQueued.page, "awaiting-response");
}
await modeledQueued.page.locator(`.white-key[data-midi="${modeledWrong}"]`).click();
current = await waitPhase(modeledQueued.page, "modeled-playing");
record("LS04 modeled completion remains unrecorded while its final repair target is still playing", current.attempt.modeled === false && current.attempt.modeledInputs.length === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.audioTransaction?.context === "wrong-repair" && current.attempt.audioTransaction?.endedAt === null && current.attempt.callIndex === 0, current);
await modeledQueued.page.evaluate(() => { window.__audioBModeledAttempt = currentListeningAction("LS04")?.listeningAttempt || null; });
await modeledQueued.page.locator("#mapReturn").click();
await modeledQueued.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
const modeledResult = await modeledQueued.page.evaluate(() => {
  const attempt = window.__audioBModeledAttempt;
  const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
  return JSON.parse(JSON.stringify({ attempt, history: runtime.history || [], chapter3: runtime.chapter3 || {} }));
});
const modeledRepairEnds = lifecycle(modeledResult.attempt, "wrong-repair", "ended");
record("LS04 queued modeled completion waits for the final real target end, consumes return once and records no child success", modeledResult.attempt?.modeled === true && modeledResult.attempt?.modeledInputs?.length === 1 && modeledRepairEnds.length === 4 && Boolean(modeledResult.attempt?.audioTransaction?.endedAt) && modeledResult.attempt?.audioTransaction?.returnQueued === false && Boolean(modeledResult.attempt?.audioTransaction?.returnQueuedConsumedAt) && modeledResult.attempt?.correctCount === 0 && modeledResult.history.at(-1)?.endReason === "modeled-safe-rest" && !modeledResult.chapter3.lessonEvidence?.LS04, modeledResult);
await modeledQueued.context.close();

const microphone = await makePage();
await seed(microphone.page, ls05Runtime());
await microphone.page.locator("#gardenRestMarker").click();
current = await waitPhase(microphone.page, "awaiting-response");
const microphoneTarget = current.attempt.sequence[current.attempt.callIndex];
const microphoneWrong = [60, 62, 64].find((midi) => midi !== microphoneTarget);
await microphone.page.evaluate((midi) => window.handleInput(midi, "麦克风"), microphoneWrong);
current = await waitPhase(microphone.page, "external-input");
record("LS05 microphone onset is an external transaction with no local piano echo or score", current.attempt.audioTransaction?.context === "external-input" && current.attempt.audioTransaction?.playbackId === null && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.totalWrongCount === 0 && current.attempt.childInputs.length === 0 && current.teachingPlayback === null, current);
await microphone.page.locator("#mapReturn").click();
await microphone.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await microphone.page.evaluate((midi) => window.releaseGardenInput(midi, "麦克风"), microphoneWrong);
current = await view(microphone.page);
record("LS05 map interruption prevents late microphone quiet from submitting the old onset", current.attempt.phase === "sound-paused" && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null && current.attempt.totalWrongCount === 0 && current.attempt.childInputs.length === 0 && current.attempt.inputRoutes["麦克风"] === undefined, current);
await microphone.page.locator("#gardenRestMarker").click();
await waitPhase(microphone.page, "sound-paused");
await microphone.page.evaluate((midi) => window.handleInput(midi, "麦克风"), microphoneTarget);
current = await waitPhase(microphone.page, "external-input");
await microphone.page.evaluate((midi) => window.releaseGardenInput(midi, "麦克风"), microphoneTarget);
current = await waitPhase(microphone.page, "correct-feedback");
record("LS05 one fresh microphone onset and quiet retries the same call without replaying a local child sound", current.attempt.callIndex === 1 && current.attempt.inputRoutes["麦克风"] === 1 && current.attempt.childInputs.length === 1 && lifecycle(current.attempt, "child-echo", "started").length === 0 && lifecycle(current.attempt, "external-input", "ended").length === 1, current);
await microphone.context.close();

const microphoneStop = await makePage();
await seed(microphoneStop.page, ls05Runtime());
await microphoneStop.page.locator("#gardenRestMarker").click();
current = await waitPhase(microphoneStop.page, "awaiting-response");
const stopTarget = current.attempt.sequence[current.attempt.callIndex];
await microphoneStop.page.evaluate((midi) => {
  window.handleInput(midi, "麦克风");
  state.audio = {
    running: true,
    raf: 0,
    stream: { getTracks: () => [] },
    ctx: { close() {} }
  };
  window.stopMicrophone();
  window.releaseGardenInput(null, "麦克风");
}, stopTarget);
current = await waitPhase(microphoneStop.page, "sound-paused");
record("LS05 microphone stop interrupts an accepted onset and blocks its late quiet from scoring", current.attempt.audioTransaction?.context === "external-input" && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null && current.attempt.callIndex === 0 && current.attempt.inputRoutes["麦克风"] === undefined && current.attempt.childInputs.length === 0, current);
await microphoneStop.page.locator(`.white-key[data-midi="${stopTarget}"]`).click();
current = await waitPhase(microphoneStop.page, "child-echo-playing");
record("LS05 one fresh touch after microphone stop starts the retry echo immediately", current.attempt.audioTransaction?.context === "child-echo" && current.attempt.pendingInput?.midi === stopTarget && current.attempt.callIndex === 0 && current.attempt.childInputs.length === 0, current);
await microphoneStop.context.close();

const muted = await makePage();
await seed(muted.page);
await muted.page.locator("#gardenRestMarker").click();
await waitPhase(muted.page, "awaiting-response");
await muted.page.evaluate(() => {
  state.audioSettings.volume = 0;
  applyAudioSettings();
});
await muted.page.locator("#listeningReplay").click();
current = await waitPhase(muted.page, "sound-paused");
record("LS04 volume zero cannot start, end, score or complete a child replay", current.attempt.audioTransaction?.context === "target" && current.attempt.audioTransaction?.startedAt === null && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.replayCountChild === 0 && current.attempt.scoredCalls.length === 0, current);
await muted.page.evaluate(() => {
  state.audioSettings.volume = 0.6;
  applyAudioSettings();
});
await muted.page.locator("#listeningReplay").click();
current = await waitPhase(muted.page, "awaiting-response");
record("LS04 volume recovery starts the interrupted child replay once and only then opens input", current.attempt.replayCountChild === 1 && current.attempt.audioTransaction?.reason === "child-replay" && Boolean(current.attempt.audioTransaction?.startedAt) && Boolean(current.attempt.audioTransaction?.endedAt) && current.attempt.inputArmed === true, current);
await muted.context.close();

const hidden = await makePage();
await seed(hidden.page, ls05Runtime());
await hidden.page.locator("#gardenRestMarker").click();
await waitPhase(hidden.page, "awaiting-response");
await hidden.page.locator("#listeningReplay").click();
await waitPhase(hidden.page, "target-playing");
await hidden.page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
current = await waitPhase(hidden.page, "sound-paused");
await hidden.page.waitForTimeout(900);
current = await view(hidden.page);
record("LS05 pagehide interrupts a live child replay and late timing cannot fabricate its end", current.attempt.audioTransaction?.reason === "child-replay" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.scoredCalls.length === 0 && lifecycle(current.attempt, "target", "ended").filter((event) => event.reason === "child-replay").length === 0, current);
await hidden.context.close();

const replayReload = await makePage();
await seed(replayReload.page, ls05Runtime());
await replayReload.page.locator("#gardenRestMarker").click();
await waitPhase(replayReload.page, "awaiting-response");
await replayReload.page.locator("#listeningReplay").click();
await waitPhase(replayReload.page, "target-playing");
await replayReload.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await replayReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
current = await waitPhase(replayReload.page, "sound-paused");
record("LS05 reload keeps an interrupted child replay as child provenance without a score", current.attempt.audioTransaction?.reason === "child-replay" && current.attempt.replayCountChild === 1 && current.attempt.callReplayCountChild === 1 && current.attempt.replayCountSystem === 0 && current.attempt.scoredCalls.length === 0 && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null, current);
await replayReload.page.locator("#listeningReplay").click();
current = await waitPhase(replayReload.page, "awaiting-response");
const recoveredReplayStarts = lifecycle(current.attempt, "target", "started").filter((event) => event.reason === "child-replay");
record("LS05 recovery replays the same child source exactly once without converting it to system replay", current.attempt.replayCountChild === 1 && current.attempt.callReplayCountChild === 1 && current.attempt.replayCountSystem === 0 && recoveredReplayStarts.length === 2 && current.attempt.inputArmed === true, current);
await replayReload.context.close();

const repairReload = await makePage();
await seed(repairReload.page, ls05Runtime());
await repairReload.page.locator("#gardenRestMarker").click();
current = await waitPhase(repairReload.page, "awaiting-response");
const repairReloadWrong = [60, 62, 64].find((midi) => midi !== current.attempt.sequence[current.attempt.callIndex]);
await repairReload.page.locator(`.white-key[data-midi="${repairReloadWrong}"]`).click();
await repairReload.page.waitForFunction(() => currentListeningAction("LS05")?.listeningAttempt?.audioTransaction?.context === "wrong-repair" && Boolean(state.teachingPlayback), null, { timeout: 12000 });
await repairReload.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await repairReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
current = await waitPhase(repairReload.page, "sound-paused");
record("LS05 interrupted wrong repair preserves its source and pre-reload system presentation count", current.attempt.audioTransaction?.context === "wrong-repair" && current.attempt.audioTransaction?.reason === "wrong-repair" && current.attempt.audioTransaction?.payload?.originalReason === "wrong-repair" && current.attempt.audioTransaction?.payload?.presentationCounted === true && current.attempt.replayCountSystem === 1 && current.attempt.replayCountChild === 0 && current.attempt.totalWrongCount === 1 && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt), current);
await repairReload.page.locator("#listeningReplay").click();
current = await waitPhase(repairReload.page, "awaiting-response");
const repairedReloadStarts = lifecycle(current.attempt, "wrong-repair", "started");
const repairedReloadEnds = lifecycle(current.attempt, "wrong-repair", "ended");
record("LS05 wrong-repair recovery finishes the same target once without a second system or child count", current.attempt.replayCountSystem === 1 && current.attempt.replayCountChild === 0 && lifecycle(current.attempt, "child-echo", "started").length === 1 && repairedReloadStarts.length === 2 && repairedReloadEnds.length === 1 && current.attempt.inputArmed === true, current);
await repairReload.context.close();

const rejectedReplay = await makePage();
await seed(rejectedReplay.page, ls05Runtime());
await rejectedReplay.page.locator("#gardenRestMarker").click();
await waitPhase(rejectedReplay.page, "awaiting-response");
await rejectedReplay.page.evaluate(async () => {
  const ctx = state.sfx?.ctx;
  if (!ctx) throw new Error("missing LS05 AudioContext");
  if (ctx.state === "running") await ctx.suspend();
  const originalResume = ctx.resume.bind(ctx);
  ctx.resume = () => Promise.reject(new Error("audio-b controlled resume rejection"));
  window.__audioBRejectedResume = { ctx, originalResume };
});
await rejectedReplay.page.locator("#listeningReplay").click();
current = await waitPhase(rejectedReplay.page, "sound-paused");
record("LS05 rejected resume leaves child replay unscheduled, unpresented and unscored", current.attempt.audioTransaction?.context === "target" && current.attempt.audioTransaction?.reason === "child-replay" && current.attempt.audioTransaction?.startedAt === null && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.replayCountChild === 0 && current.attempt.scoredCalls.length === 0, current);
await rejectedReplay.page.evaluate(async () => {
  const pending = window.__audioBRejectedResume;
  pending.ctx.resume = pending.originalResume;
  state.sfx.resumePromise = null;
  await pending.originalResume();
});
await rejectedReplay.page.locator("#listeningReplay").click();
current = await waitPhase(rejectedReplay.page, "awaiting-response");
record("LS05 recovery after a pre-start child replay failure records one real child replay", current.attempt.replayCountChild === 1 && current.attempt.callReplayCountChild === 1 && current.attempt.replayCountSystem === 0 && lifecycle(current.attempt, "target", "ended").filter((event) => event.reason === "child-replay").length === 1 && current.attempt.inputArmed === true, current);
await rejectedReplay.context.close();

const watchdog = await makePage();
await seed(watchdog.page);
await watchdog.page.locator("#gardenRestMarker").click();
await waitPhase(watchdog.page, "awaiting-response");
await installWatchdogAudioContext(watchdog.page);
await watchdog.page.locator("#listeningReplay").click();
await watchdog.page.waitForTimeout(3000);
current = await view(watchdog.page);
record("LS04 watchdog interrupts a started target without fabricating its end, score or leaf result", current.attempt.audioTransaction?.context === "target" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.scoredCalls.length === 0 && current.attempt.callIndex === 0 && current.attempt.phase === "sound-paused", current);
await watchdog.context.close();

const reverseOrder = await makePage();
await seed(reverseOrder.page, ls05Runtime());
await reverseOrder.page.locator("#gardenRestMarker").click();
await waitPhase(reverseOrder.page, "awaiting-response");
await installReverseOrderAudioContext(reverseOrder.page);
await reverseOrder.page.locator("#listeningReplay").click();
await waitPhase(reverseOrder.page, "target-playing");
await reverseOrder.page.evaluate(() => {
  const ctx = state.sfx?.ctx;
  ctx?._setStateSilently("suspended");
  ctx?._fireOscillatorEnds();
});
current = await waitPhase(reverseOrder.page, "sound-paused");
const reverseInterrupted = lifecycle(current.attempt, "target", "interrupted");
record("LS05 reverse-order suspended oscillator ends interrupt instead of ending or scoring", current.attempt.audioTransaction?.contextState === "suspended" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.scoredCalls.length === 0 && reverseInterrupted.length === 1, current);
await reverseOrder.page.evaluate(() => {
  const ctx = state.sfx?.ctx;
  ctx?._emitStatechange();
  ctx?._fireOscillatorEnds();
});
await reverseOrder.page.waitForTimeout(100);
current = await view(reverseOrder.page);
record("LS05 late reverse-order callbacks remain idempotent after interruption", lifecycle(current.attempt, "target", "ended").filter((event) => event.reason === "child-replay").length === 0 && lifecycle(current.attempt, "target", "interrupted").filter((event) => event.reason === "child-replay").length === 1 && current.attempt.scoredCalls.length === 0, current);
await reverseOrder.context.close();

const closedReverse = await makePage();
await seed(closedReverse.page);
await closedReverse.page.locator("#gardenRestMarker").click();
await waitPhase(closedReverse.page, "awaiting-response");
await installReverseOrderAudioContext(closedReverse.page);
await closedReverse.page.locator("#listeningReplay").click();
await waitPhase(closedReverse.page, "target-playing");
await closedReverse.page.evaluate(() => {
  const ctx = state.sfx?.ctx;
  ctx?._setStateSilently("closed");
  ctx?._fireOscillatorEnds();
});
current = await waitPhase(closedReverse.page, "sound-paused");
record("LS04 reverse-order closed oscillator ends interrupt without a fabricated target end, score or leaf", current.attempt.audioTransaction?.contextState === "closed" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.scoredCalls.length === 0 && current.attempt.callIndex === 0 && lifecycle(current.attempt, "target", "ended").filter((event) => event.reason === "child-replay").length === 0, current);
await closedReverse.context.close();

const failed = checks.filter((check) => !check.pass);
console.log(`AUDIO-B lifecycle ${checks.length - failed.length}/${checks.length}`);
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
