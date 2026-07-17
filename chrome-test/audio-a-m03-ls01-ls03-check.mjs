import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function url(search = "") {
  const target = new URL(baseUrl);
  target.search = search;
  return target.toString();
}

function endedC203() {
  return {
    sessionId: "audio-a-c2-03",
    bundleId: "C2-03",
    status: "ended",
    actionIndex: 0,
    actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
    completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
    endedAt: "2026-07-12T06:00:00.000Z",
    endReason: "natural-rest"
  };
}

function gardenRuntime() {
  return { version: 1, active: null, history: [endedC203()], lastRest: null };
}

async function makePage() {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  });
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  return { context, page };
}

async function waitBoot(page) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
}

async function seedGarden(page) {
  await page.goto(url("?screen=map"), { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.evaluate((runtime) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
  }, gardenRuntime());
  await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
  await waitBoot(page);
}

async function waitM03Phase(page, phase, timeout = 10000) {
  await page.waitForFunction((expected) => document.querySelector("#appShell")?.dataset.teachingAudioPhase === expected, phase, { timeout });
}

async function waitGardenPhase(page, phase, lessonId = null, timeout = 10000) {
  await page.waitForFunction(({ expected, expectedLesson }) => {
    const scene = document.querySelector("#gardenScene");
    return scene?.dataset.teachingAudioPhase === expected && (!expectedLesson || scene.dataset.lesson === expectedLesson);
  }, { expected: phase, expectedLesson: lessonId }, { timeout });
}

async function beginM03(page) {
  await page.goto(url("?level=M03&check=audio-a"), { waitUntil: "domcontentloaded", timeout: 15000 });
  await waitBoot(page);
  await page.locator("#m03WheelReplay").click();
  await waitM03Phase(page, "model-playing");
}

async function readyM03(page) {
  await waitM03Phase(page, "awaiting-response");
}

async function beginGarden(page) {
  await seedGarden(page);
  await page.locator("#gardenRestMarker").click();
  await waitGardenPhase(page, "model-playing", "LS01");
}

async function readyGarden(page, lessonId = "LS01") {
  await waitGardenPhase(page, "awaiting-response", lessonId);
}

async function m03View(page) {
  return page.evaluate(() => JSON.parse(JSON.stringify({
    screen: state.screen,
    levelId: activeLevel()?.id || null,
    stepIndex: state.stepIndex,
    lastInputMidi: state.lastInputMidi,
    lastInputResult: state.lastInputResult,
    practice: state.practiceAttempt,
    completed: [...state.completed],
    autoAdvancePending: Boolean(state.autoAdvanceTimer),
    activeSession: state.activeSession ? {
      sessionId: state.activeSession.sessionId,
      bundleId: state.activeSession.bundleId,
      status: state.activeSession.status,
      actionIndex: state.activeSession.actionIndex
    } : null,
    teachingPlayback: state.teachingPlayback ? {
      id: state.teachingPlayback.id,
      status: state.teachingPlayback.status
    } : null,
    audioContextState: state.sfx?.ctx?.state || null
  })));
}

async function formalM03State(page) {
  return page.evaluate((queuedSnapshot) => {
    const action = state.activeSession?.actions?.[state.activeSession.actionIndex] || null;
    let previewSnapshot = null;
    try {
      previewSnapshot = JSON.parse(sessionStorage.getItem("starDinoM03AudioAttempt") || "null");
    } catch (error) {
      previewSnapshot = null;
    }
    return JSON.parse(JSON.stringify({
      screen: state.screen,
      levelId: activeLevel()?.id || null,
      practice: state.practiceAttempt,
      session: state.activeSession ? {
        sessionId: state.activeSession.sessionId,
        bundleId: state.activeSession.bundleId,
        status: state.activeSession.status,
        actionIndex: state.activeSession.actionIndex
      } : null,
      action,
      previewSnapshot
    }));
  });
}

async function queueFinalM03Return(page, route) {
  await beginM03(page);
  await readyM03(page);
  if (route === "MIDI") {
    await page.evaluate(() => {
      window.handleInput(62, "MIDI");
      window.releaseGardenInput(62, "MIDI");
    });
  } else {
    await page.locator('.key.white-key[data-midi="62"]').click();
  }
  await page.waitForFunction(() => state.stepIndex === 1 && document.querySelector("#appShell")?.dataset.teachingAudioPhase === "model-playing", null, { timeout: 10000 });
  await readyM03(page);
  if (route === "MIDI") {
    await page.evaluate(() => {
      window.handleInput(60, "MIDI");
      window.releaseGardenInput(60, "MIDI");
    });
  } else {
    await page.locator('.key.white-key[data-midi="60"]').click();
  }
  await waitM03Phase(page, "child-echo-playing");
  await page.evaluate(() => {
    window.__audioAFinalM03Attempt = state.practiceAttempt?.audioAttempt || null;
    window.__audioAFinalM03MapTransitions = 0;
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("screen-map")) window.__audioAFinalM03MapTransitions += 1;
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.__audioAFinalM03MapObserver = observer;
  });
  await page.locator("#mapReturn").click();
  const queued = await page.evaluate(() => {
    const transaction = window.__audioAFinalM03Attempt?.audioTransaction;
    return {
      phase: document.querySelector("#appShell")?.dataset.teachingAudioPhase || "",
      returnQueued: transaction?.returnQueued === true,
      endedAt: transaction?.endedAt || null
    };
  });
  await page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
  await page.waitForTimeout(1800);
  return page.evaluate((queuedSnapshot) => {
    const attempt = window.__audioAFinalM03Attempt;
    const trace = attempt?.audioTrace || [];
    const finalChildStarts = trace.filter((event) => event.kind === "started" && event.context === "child-echo" && event.midis?.join(",") === "60");
    const finalChildEnds = trace.filter((event) => event.kind === "ended" && event.context === "child-echo" && event.midis?.join(",") === "60");
    window.__audioAFinalM03MapObserver?.disconnect();
    return JSON.parse(JSON.stringify({
      queued: queuedSnapshot,
      transaction: attempt?.audioTransaction || null,
      finalChildStarts,
      finalChildEnds,
      screen: state.screen,
      levelId: activeLevel()?.id || null,
      stepIndex: state.stepIndex,
      practice: state.practiceAttempt,
      completed: [...state.completed],
      autoAdvancePending: Boolean(state.autoAdvanceTimer),
      mapTransitions: window.__audioAFinalM03MapTransitions
    }));
  }, queued);
}

async function gardenView(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active?.actionIndex || 0] || null;
    return JSON.parse(JSON.stringify({
      screen: state.screen,
      phase: document.querySelector("#gardenScene")?.dataset.teachingAudioPhase || "",
      runtime,
      action,
      leaves: runtime.chapter3?.leaves || [],
      lessonEvidence: runtime.chapter3?.lessonEvidence || {},
      gardenAudioAttempt: action?.gardenAttempt?.audioAttempt || null,
      audioContextState: state.sfx?.ctx?.state || null
    }));
  });
}

function started(trace, context) {
  return (trace || []).filter((event) => event.kind === "started" && event.context === context);
}

function ended(trace, context) {
  return (trace || []).filter((event) => event.kind === "ended" && event.context === context);
}

function wrongRepairPlaying(attempt, childMidi, targetMidi, { external = false } = {}) {
  const trace = attempt?.audioTrace || [];
  const childContext = external ? "external-input" : "child-echo";
  const childStarts = started(trace, childContext);
  const childEnds = ended(trace, childContext);
  const targetStarts = started(trace, "wrong-repair");
  const targetEnds = ended(trace, "wrong-repair");
  const childEnd = childEnds.at(-1);
  const targetStart = targetStarts.at(-1);
  const orderedByAudioTime = external
    ? Date.parse(childEnd?.endedAt || "") <= Date.parse(targetStart?.startedAt || "")
    : Number(childEnd?.endAudioTime) <= Number(targetStart?.startAudioTime);
  return {
    pass: childStarts.length === 1 && childEnds.length === 1 &&
      targetStarts.length === 1 && targetEnds.length === 0 &&
      childStarts[0]?.midis?.join(",") === String(childMidi) &&
      targetStarts[0]?.midis?.join(",") === String(targetMidi) &&
      orderedByAudioTime,
    trace,
    childStarts,
    childEnds,
    targetStarts,
    targetEnds,
    orderedByAudioTime
  };
}

function wrongRepairSettled(attempt, childMidi, targetMidi, { external = false } = {}) {
  const trace = attempt?.audioTrace || [];
  const childContext = external ? "external-input" : "child-echo";
  const childStarts = started(trace, childContext);
  const childEnds = ended(trace, childContext);
  const targetStarts = started(trace, "wrong-repair");
  const targetEnds = ended(trace, "wrong-repair");
  const childEnd = childEnds.at(-1);
  const targetStart = targetStarts.at(-1);
  const targetEnd = targetEnds.at(-1);
  const orderedByAudioTime = external
    ? Date.parse(childEnd?.endedAt || "") <= Date.parse(targetStart?.startedAt || "")
    : Number(childEnd?.endAudioTime) <= Number(targetStart?.startAudioTime);
  const targetFinishedAfterStart = Number(targetEnd?.endAudioTime) >= Number(targetStart?.startAudioTime);
  return {
    pass: childStarts.length === 1 && childEnds.length === 1 &&
      targetStarts.length === 1 && targetEnds.length === 1 &&
      childStarts[0]?.midis?.join(",") === String(childMidi) &&
      targetStarts[0]?.midis?.join(",") === String(targetMidi) &&
      orderedByAudioTime && targetFinishedAfterStart,
    trace,
    childStarts,
    childEnds,
    targetStarts,
    targetEnds,
    orderedByAudioTime,
    targetFinishedAfterStart
  };
}

function gardenCompletions(runtime, lessonId) {
  return [runtime?.active, ...(runtime?.history || [])]
    .filter(Boolean)
    .flatMap((session) => session.completedActions || [])
    .filter((action) => action.targetId === lessonId);
}

const m03Early = await makePage();
await beginM03(m03Early.page);
await m03Early.page.evaluate(() => {
  window.handleInput(62, "MIDI");
  window.releaseGardenInput(62, "MIDI");
});
let current = await m03View(m03Early.page);
record("M03 model-playing input is an observation, not a score", current.stepIndex === 0 && current.practice?.corrects === 0 && current.practice?.wrongs === 0 && current.practice?.audioAttempt?.observations?.length === 1 && current.practice?.audioAttempt?.audioTransaction?.endedAt === null, current);
await readyM03(m03Early.page);
current = await m03View(m03Early.page);
record("M03 opens response only after the real model end", current.practice?.audioAttempt?.audioTransaction?.context === "model" && Boolean(current.practice?.audioAttempt?.audioTransaction?.startedAt) && Boolean(current.practice?.audioAttempt?.audioTransaction?.endedAt) && current.practice?.audioAttempt?.inputArmed === true, current.practice?.audioAttempt);
await m03Early.context.close();

const m03Touch = await makePage();
await beginM03(m03Touch.page);
await readyM03(m03Touch.page);
await m03Touch.page.locator('.key.white-key[data-midi="62"]').click();
await waitM03Phase(m03Touch.page, "child-echo-playing");
current = await m03View(m03Touch.page);
record("M03 touch child echo holds world progress until its real end", current.stepIndex === 0 && current.practice?.corrects === 0 && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1 && current.practice?.audioAttempt?.audioTransaction?.endedAt === null, current);
await readyM03(m03Touch.page);
current = await m03View(m03Touch.page);
record("M03 touch produces one child echo and advances only after ended", current.stepIndex === 1 && current.practice?.corrects === 1 && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1, current.practice);
await m03Touch.context.close();

const m03TouchWrong = await makePage();
await beginM03(m03TouchWrong.page);
await readyM03(m03TouchWrong.page);
await m03TouchWrong.page.locator('.key.white-key[data-midi="60"]').click();
await waitM03Phase(m03TouchWrong.page, "wrong-repair-playing");
current = await m03View(m03TouchWrong.page);
let sequence = wrongRepairPlaying(current.practice?.audioAttempt, 60, 62);
record("M03 touch wrong starts one target after the single child echo and before scoring can advance", sequence.pass && current.practice?.wrongs === 1 && current.stepIndex === 0, sequence);
await readyM03(m03TouchWrong.page);
current = await m03View(m03TouchWrong.page);
sequence = wrongRepairSettled(current.practice?.audioAttempt, 60, 62);
record("M03 touch wrong repair ends once and re-arms only after the target ends", sequence.pass && current.practice?.audioAttempt?.inputArmed === true && current.stepIndex === 0, sequence);
await m03TouchWrong.context.close();

const m03MidiWrong = await makePage();
await beginM03(m03MidiWrong.page);
await readyM03(m03MidiWrong.page);
await m03MidiWrong.page.evaluate(() => {
  window.handleInput(60, "MIDI");
  window.handleInput(60, "MIDI");
});
await waitM03Phase(m03MidiWrong.page, "wrong-repair-playing");
current = await m03View(m03MidiWrong.page);
sequence = wrongRepairPlaying(current.practice?.audioAttempt, 60, 62);
record("M03 MIDI note-on repetition starts one child echo and one target repair", sequence.pass && current.practice?.wrongs === 1 && current.practice?.inputRoutes?.MIDI === 1, { sequence, practice: current.practice });
await m03MidiWrong.page.evaluate(() => window.releaseGardenInput(60, "MIDI"));
await readyM03(m03MidiWrong.page);
current = await m03View(m03MidiWrong.page);
sequence = wrongRepairSettled(current.practice?.audioAttempt, 60, 62);
record("M03 MIDI note-off during repair re-arms only after the target repair ends", sequence.pass && current.practice?.audioAttempt?.inputArmed === true && current.practice?.audioAttempt?.midiHeldMidis?.length === 0 && current.practice?.inputRoutes?.MIDI === 1, { sequence, practice: current.practice });
await m03MidiWrong.context.close();

const m03MidiHeld = await makePage();
await beginM03(m03MidiHeld.page);
await readyM03(m03MidiHeld.page);
await m03MidiHeld.page.evaluate(() => window.handleInput(60, "MIDI"));
await waitM03Phase(m03MidiHeld.page, "wrong-repair-playing");
await readyM03(m03MidiHeld.page);
current = await m03View(m03MidiHeld.page);
record("M03 held wrong MIDI stays unarmed after repair until its note-off", current.practice?.wrongs === 1 && current.practice?.audioAttempt?.inputArmed === false && current.practice?.audioAttempt?.midiHeldMidis?.join(",") === "60" && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1, current.practice?.audioAttempt);
await m03MidiHeld.page.evaluate(() => {
  window.handleInput(60, "MIDI");
  window.handleInput(64, "MIDI");
});
await m03MidiHeld.page.waitForTimeout(80);
current = await m03View(m03MidiHeld.page);
record("M03 held same and other MIDI note-ons are observations with no second child echo or wrong", current.practice?.wrongs === 1 && current.practice?.audioAttempt?.inputArmed === false && current.practice?.audioAttempt?.midiHeldMidis?.join(",") === "60,64" && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1 && current.practice?.audioAttempt?.observations?.some((event) => event.phase === "held-midi" && event.midi === 60) && current.practice?.audioAttempt?.observations?.some((event) => event.phase === "held-midi" && event.midi === 64), current.practice?.audioAttempt);
await m03MidiHeld.page.evaluate(() => window.releaseGardenInput(60, "MIDI"));
current = await m03View(m03MidiHeld.page);
record("M03 releasing one of multiple held MIDI notes keeps response blocked", current.practice?.audioAttempt?.inputArmed === false && current.practice?.audioAttempt?.midiHeldMidis?.join(",") === "64", current.practice?.audioAttempt);
await m03MidiHeld.page.evaluate(() => window.releaseGardenInput(64, "MIDI"));
await m03MidiHeld.page.waitForFunction(() => state.practiceAttempt?.audioAttempt?.inputArmed === true && state.practiceAttempt.audioAttempt.midiHeldMidis?.length === 0, null, { timeout: 10000 });
current = await m03View(m03MidiHeld.page);
record("M03 final MIDI note-off re-arms once after the completed repair", current.practice?.audioAttempt?.inputArmed === true && current.practice?.audioAttempt?.midiHeldMidis?.length === 0 && current.practice?.wrongs === 1, current.practice?.audioAttempt);
await m03MidiHeld.page.evaluate(() => {
  window.handleInput(62, "MIDI");
  window.handleInput(62, "MIDI");
});
await m03MidiHeld.page.waitForFunction(() => state.stepIndex === 1 && state.practiceAttempt?.corrects === 1 && state.practiceAttempt?.audioAttempt?.childEchoCount === 2, null, { timeout: 10000 });
current = await m03View(m03MidiHeld.page);
record("M03 fresh post-release MIDI note submits exactly once", current.practice?.wrongs === 1 && current.practice?.corrects === 1 && current.practice?.inputRoutes?.MIDI === 2 && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 2, current.practice);
await m03MidiHeld.page.evaluate(() => window.releaseGardenInput(62, "MIDI"));
await m03MidiHeld.context.close();

const m03NextModelHeld = await makePage();
await beginM03(m03NextModelHeld.page);
await readyM03(m03NextModelHeld.page);
await m03NextModelHeld.page.evaluate(() => window.handleInput(62, "MIDI"));
await m03NextModelHeld.page.waitForFunction(() => state.stepIndex === 1 && document.querySelector("#appShell")?.dataset.teachingAudioPhase === "model-playing", null, { timeout: 10000 });
await readyM03(m03NextModelHeld.page);
current = await m03View(m03NextModelHeld.page);
record("M03 next target model ending cannot arm while the prior MIDI key remains held", current.stepIndex === 1 && current.practice?.corrects === 1 && current.practice?.audioAttempt?.audioTransaction?.context === "model" && Boolean(current.practice?.audioAttempt?.audioTransaction?.endedAt) && current.practice?.audioAttempt?.inputArmed === false && current.practice?.audioAttempt?.midiHeldMidis?.join(",") === "62", current.practice?.audioAttempt);
await m03NextModelHeld.page.evaluate(() => window.releaseGardenInput(62, "MIDI"));
await m03NextModelHeld.page.waitForFunction(() => state.practiceAttempt?.audioAttempt?.inputArmed === true, null, { timeout: 10000 });
current = await m03View(m03NextModelHeld.page);
record("M03 next target response arms only after the held MIDI note releases", current.practice?.audioAttempt?.inputArmed === true && current.practice?.audioAttempt?.midiHeldMidis?.length === 0, current.practice?.audioAttempt);
await m03NextModelHeld.context.close();

const m03NextModelRelease = await makePage();
await beginM03(m03NextModelRelease.page);
await readyM03(m03NextModelRelease.page);
await m03NextModelRelease.page.evaluate(() => window.handleInput(62, "MIDI"));
await m03NextModelRelease.page.waitForFunction(() => state.stepIndex === 1 && document.querySelector("#appShell")?.dataset.teachingAudioPhase === "model-playing", null, { timeout: 10000 });
await m03NextModelRelease.page.evaluate(() => window.releaseGardenInput(62, "MIDI"));
current = await m03View(m03NextModelRelease.page);
record("M03 MIDI note-off during the next model only releases held state and cannot arm early", current.stepIndex === 1 && current.practice?.audioAttempt?.audioTransaction?.context === "model" && current.practice?.audioAttempt?.audioTransaction?.endedAt === null && current.practice?.audioAttempt?.inputArmed === false && current.practice?.audioAttempt?.midiHeldMidis?.length === 0, current.practice?.audioAttempt);
await readyM03(m03NextModelRelease.page);
current = await m03View(m03NextModelRelease.page);
record("M03 next model end arms after its prior MIDI note released during playback", current.practice?.audioAttempt?.inputArmed === true && current.practice?.audioAttempt?.midiHeldMidis?.length === 0 && Boolean(current.practice?.audioAttempt?.audioTransaction?.endedAt), current.practice?.audioAttempt);
await m03NextModelRelease.context.close();

const m03Modeled = await makePage();
await beginM03(m03Modeled.page);
await readyM03(m03Modeled.page);
await m03Modeled.page.evaluate(() => window.startM03ModeledCompletion(state.practiceAttempt.audioAttempt, "audio-a-probe"));
await waitM03Phase(m03Modeled.page, "modeled-playing");
current = await m03View(m03Modeled.page);
record("M03 modeled completion leaves the wheel unchanged until its target audio ends", current.stepIndex === 0 && current.practice?.modeledSuccesses === 0 && current.practice?.audioAttempt?.audioTransaction?.context === "modeled" && current.practice?.audioAttempt?.audioTransaction?.endedAt === null, current.practice);
await m03Modeled.page.waitForFunction(() => state.stepIndex === 2 && state.practiceAttempt?.modeledSuccesses === 1, null, { timeout: 10000 });
current = await m03View(m03Modeled.page);
record("M03 modeled completion writes once only after the real target end", current.stepIndex === 2 && current.practice?.modeledSuccesses === 1 && current.practice?.modeledInputs?.length === 1, current.practice);
await m03Modeled.context.close();

const m03QueuedInterrupt = await makePage();
await beginM03(m03QueuedInterrupt.page);
await m03QueuedInterrupt.page.waitForFunction(() => Boolean(state.practiceAttempt?.audioAttempt?.audioTransaction?.startedAt), null, { timeout: 10000 });
await m03QueuedInterrupt.page.locator("#mapReturn").click();
await m03QueuedInterrupt.page.waitForFunction(() => state.practiceAttempt?.audioAttempt?.audioTransaction?.returnQueued === true, null, { timeout: 10000 });
await m03QueuedInterrupt.page.evaluate(async () => { if (state.sfx?.ctx?.state === "running") await state.sfx.ctx.suspend(); });
await m03QueuedInterrupt.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await m03View(m03QueuedInterrupt.page);
record("M03 queued map return is consumed once when active teaching audio is interrupted", current.screen === "map" && current.stepIndex === 0 && current.practice?.corrects === 0 && current.practice?.wrongs === 0 && current.practice?.audioAttempt?.phase === "sound-paused" && current.practice?.audioAttempt?.audioTransaction?.endedAt === null && Boolean(current.practice?.audioAttempt?.audioTransaction?.interruptedAt) && current.practice?.audioAttempt?.audioTransaction?.returnQueued === false && Boolean(current.practice?.audioAttempt?.audioTransaction?.returnQueuedConsumedAt), current.practice?.audioAttempt);
await m03QueuedInterrupt.page.waitForTimeout(120);
current = await m03View(m03QueuedInterrupt.page);
record("M03 late interrupted callbacks cannot consume the queued return or submit again", current.screen === "map" && current.practice?.corrects === 0 && current.practice?.wrongs === 0 && current.practice?.audioAttempt?.audioTransaction?.returnQueued === false && Boolean(current.practice?.audioAttempt?.audioTransaction?.returnQueuedConsumedAt), current.practice?.audioAttempt);
await m03QueuedInterrupt.context.close();

const m03QueuedRepair = await makePage();
await beginM03(m03QueuedRepair.page);
await readyM03(m03QueuedRepair.page);
await m03QueuedRepair.page.locator('.key.white-key[data-midi="60"]').click();
await waitM03Phase(m03QueuedRepair.page, "child-echo-playing");
await m03QueuedRepair.page.locator("#mapReturn").click();
await m03QueuedRepair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await m03View(m03QueuedRepair.page);
sequence = wrongRepairSettled(current.practice?.audioAttempt, 60, 62);
record("M03 queued map return plays the target repair exactly once before leaving", sequence.pass && current.practice?.wrongs === 1 && current.practice?.audioAttempt?.audioTransaction?.returnQueued === false && Boolean(current.practice?.audioAttempt?.audioTransaction?.returnQueuedConsumedAt), { sequence, practice: current.practice });
await m03QueuedRepair.page.evaluate(() => window.goToLevelId("M03"));
await readyM03(m03QueuedRepair.page);
current = await m03View(m03QueuedRepair.page);
record("M03 map re-entry keeps the one recorded wrong without replaying the child", started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1 && current.practice?.wrongs === 1 && current.practice?.audioAttempt?.inputArmed === true, current.practice?.audioAttempt);
await m03QueuedRepair.context.close();

const m03MidiQueuedRepair = await makePage();
await beginM03(m03MidiQueuedRepair.page);
await readyM03(m03MidiQueuedRepair.page);
await m03MidiQueuedRepair.page.evaluate(() => window.handleInput(60, "MIDI"));
await waitM03Phase(m03MidiQueuedRepair.page, "child-echo-playing");
await m03MidiQueuedRepair.page.locator("#mapReturn").click();
await m03MidiQueuedRepair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await m03View(m03MidiQueuedRepair.page);
sequence = wrongRepairSettled(current.practice?.audioAttempt, 60, 62);
record("M03 queued MIDI return keeps the one child echo and completes the target repair before map", sequence.pass && current.practice?.wrongs === 1 && current.practice?.inputRoutes?.MIDI === 1 && Boolean(current.practice?.audioAttempt?.audioTransaction?.returnQueuedConsumedAt), { sequence, practice: current.practice });
await m03MidiQueuedRepair.page.evaluate(() => window.goToLevelId("M03"));
await readyM03(m03MidiQueuedRepair.page);
current = await m03View(m03MidiQueuedRepair.page);
record("M03 MIDI map re-entry clears stale held state and re-arms without duplicating the queued input", started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1 && current.practice?.wrongs === 1 && current.practice?.inputRoutes?.MIDI === 1 && current.practice?.audioAttempt?.midiHeldMidis?.length === 0 && current.practice?.audioAttempt?.inputArmed === true, current.practice?.audioAttempt);
await m03MidiQueuedRepair.context.close();

const m03FormalIsolation = await makePage();
await beginM03(m03FormalIsolation.page);
await readyM03(m03FormalIsolation.page);
await m03FormalIsolation.page.locator('.key.white-key[data-midi="60"]').click();
await readyM03(m03FormalIsolation.page);
let formal = await formalM03State(m03FormalIsolation.page);
record("M03 direct preview keeps its own wrong snapshot before formal C1-03 starts", formal.session === null && formal.practice?.wrongs === 1 && Object.values(formal.practice?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 1 && formal.previewSnapshot?.practiceAttempt?.wrongs === 1, formal);
await m03FormalIsolation.page.locator("#mapReturn").click();
await m03FormalIsolation.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
await m03FormalIsolation.page.locator('.map-node[data-level="M03"]').click();
await m03FormalIsolation.page.waitForFunction(() => state.screen === "play" && activeLevel()?.id === "M03" && state.practiceAttempt?.formalSession === true && state.practiceAttempt?.audioAttempt?.phase === "model-ready", null, { timeout: 10000 });
formal = await formalM03State(m03FormalIsolation.page);
record("M03 direct-preview evidence cannot seed a fresh formal C1-03 action", formal.session?.bundleId === "C1-03" && formal.action?.actionId === "M03-listen" && formal.practice?.formalSession === true && formal.practice?.wrongs === 0 && formal.practice?.corrects === 0 && Object.values(formal.practice?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 0 && formal.practice?.audioAttempt?.audioTrace?.length === 0 && !formal.action?.m03AudioAttempt && formal.previewSnapshot?.practiceAttempt?.wrongs === 1, formal);
await waitM03Phase(m03FormalIsolation.page, "model-playing");
await readyM03(m03FormalIsolation.page);
await m03FormalIsolation.page.locator('.key.white-key[data-midi="60"]').click();
await readyM03(m03FormalIsolation.page);
const formalBeforeReload = await formalM03State(m03FormalIsolation.page);
await m03FormalIsolation.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await waitBoot(m03FormalIsolation.page);
await waitM03Phase(m03FormalIsolation.page, "awaiting-response");
const formalAfterReload = await formalM03State(m03FormalIsolation.page);
record("M03 formal action refresh restores only its matching owned snapshot", formalAfterReload.session?.sessionId === formalBeforeReload.session?.sessionId && formalAfterReload.action?.actionId === formalBeforeReload.action?.actionId && formalAfterReload.practice?.wrongs === 1 && formalAfterReload.practice?.corrects === 0 && Object.values(formalAfterReload.practice?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 1 && formalAfterReload.action?.m03AudioAttempt?.formalOwner?.sessionId === formalAfterReload.session?.sessionId && formalAfterReload.action?.m03AudioAttempt?.formalOwner?.bundleId === formalAfterReload.session?.bundleId && formalAfterReload.action?.m03AudioAttempt?.formalOwner?.sessionActionId === formalAfterReload.action?.actionId, { formalBeforeReload, formalAfterReload });
await m03FormalIsolation.page.locator("#mapReturn").click();
await m03FormalIsolation.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
await m03FormalIsolation.page.locator('.map-node[data-level="M03"]').click();
await waitM03Phase(m03FormalIsolation.page, "awaiting-response");
const formalAfterMapResume = await formalM03State(m03FormalIsolation.page);
record("M03 formal action map resume preserves its session-owned evidence without preview merge", formalAfterMapResume.session?.sessionId === formalBeforeReload.session?.sessionId && formalAfterMapResume.action?.actionId === formalBeforeReload.action?.actionId && formalAfterMapResume.practice?.wrongs === 1 && formalAfterMapResume.practice?.corrects === 0 && Object.values(formalAfterMapResume.practice?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 1 && formalAfterMapResume.action?.m03AudioAttempt?.formalOwner?.sessionId === formalAfterMapResume.session?.sessionId && formalAfterMapResume.previewSnapshot?.practiceAttempt?.wrongs === 1, formalAfterMapResume);
await m03FormalIsolation.context.close();

const m03FinalTouchReturn = await makePage();
const finalTouchReturn = await queueFinalM03Return(m03FinalTouchReturn.page, "touch");
record("M03 final touch echo consumes one queued map return only after ended and cancels M04 advance", finalTouchReturn.queued.returnQueued === true && finalTouchReturn.queued.endedAt === null && finalTouchReturn.transaction?.returnQueued === false && Boolean(finalTouchReturn.transaction?.returnQueuedConsumedAt) && finalTouchReturn.finalChildStarts.length === 1 && finalTouchReturn.finalChildEnds.length === 1 && Number(finalTouchReturn.finalChildEnds[0]?.endAudioTime) >= Number(finalTouchReturn.finalChildStarts[0]?.startAudioTime) && finalTouchReturn.screen === "map" && finalTouchReturn.levelId === "M03" && finalTouchReturn.stepIndex === 2 && finalTouchReturn.completed.includes("M03") && finalTouchReturn.autoAdvancePending === false && finalTouchReturn.mapTransitions === 1 && finalTouchReturn.practice?.corrects === 2 && Object.values(finalTouchReturn.practice?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 2, finalTouchReturn);
await m03FinalTouchReturn.context.close();

const m03FinalMidiReturn = await makePage();
const finalMidiReturn = await queueFinalM03Return(m03FinalMidiReturn.page, "MIDI");
record("M03 final MIDI echo consumes one queued map return only after ended and cancels M04 advance", finalMidiReturn.queued.returnQueued === true && finalMidiReturn.queued.endedAt === null && finalMidiReturn.transaction?.returnQueued === false && Boolean(finalMidiReturn.transaction?.returnQueuedConsumedAt) && finalMidiReturn.finalChildStarts.length === 1 && finalMidiReturn.finalChildEnds.length === 1 && Number(finalMidiReturn.finalChildEnds[0]?.endAudioTime) >= Number(finalMidiReturn.finalChildStarts[0]?.startAudioTime) && finalMidiReturn.screen === "map" && finalMidiReturn.levelId === "M03" && finalMidiReturn.stepIndex === 2 && finalMidiReturn.completed.includes("M03") && finalMidiReturn.autoAdvancePending === false && finalMidiReturn.mapTransitions === 1 && finalMidiReturn.practice?.corrects === 2 && finalMidiReturn.practice?.inputRoutes?.MIDI === 2, finalMidiReturn);
await m03FinalMidiReturn.context.close();

const m03MicStop = await makePage();
await beginM03(m03MicStop.page);
await readyM03(m03MicStop.page);
await m03MicStop.page.evaluate(() => {
  window.handleInput(60, "麦克风");
  state.audio = {
    running: true,
    raf: 0,
    stream: { getTracks: () => [] },
    ctx: { close() {} }
  };
  window.stopMicrophone();
  window.releaseGardenInput(null, "麦克风");
});
await waitM03Phase(m03MicStop.page, "sound-paused");
current = await m03View(m03MicStop.page);
record("M03 microphone stop interrupts the old accepted onset without a score", current.stepIndex === 0 && current.practice?.corrects === 0 && current.practice?.wrongs === 0 && current.practice?.audioAttempt?.audioTransaction?.endedAt === null && Boolean(current.practice?.audioAttempt?.audioTransaction?.interruptedAt), current);
await m03MicStop.page.locator('.key.white-key[data-midi="62"]').click();
await waitM03Phase(m03MicStop.page, "child-echo-playing");
current = await m03View(m03MicStop.page);
record("M03 one new touch after an interrupted microphone input immediately starts the retry echo", current.audioContextState === "running" && current.practice?.audioAttempt?.audioTransaction?.context === "child-echo" && current.practice?.audioAttempt?.pendingInput?.midi === 62 && current.practice?.corrects === 0 && current.practice?.wrongs === 0, current);
await readyM03(m03MicStop.page);
current = await m03View(m03MicStop.page);
record("M03 interrupted microphone retry commits only the new touch once", current.stepIndex === 1 && current.practice?.corrects === 1 && current.practice?.wrongs === 0 && current.practice?.inputRoutes?.["屏幕"] === 1 && started(current.practice?.audioAttempt?.audioTrace, "child-echo").length === 1, current.practice);
await m03MicStop.context.close();

const m03Reject = await makePage();
await beginM03(m03Reject.page);
await readyM03(m03Reject.page);
await m03Reject.page.evaluate(async () => {
  const ctx = state.sfx?.ctx;
  if (!ctx) throw new Error("missing M03 context");
  if (ctx.state === "running") await ctx.suspend();
  const originalResume = ctx.resume.bind(ctx);
  ctx.resume = () => Promise.reject(new Error("audio-a controlled rejection"));
  window.__audioAResume = { ctx, originalResume };
});
await m03Reject.page.locator("#m03WheelReplay").click();
await waitM03Phase(m03Reject.page, "sound-paused");
current = await m03View(m03Reject.page);
record("M03 resume rejection keeps model unpresented and unscored", current.stepIndex === 0 && current.practice?.corrects === 0 && current.practice?.audioAttempt?.audioTransaction?.startedAt === null && current.practice?.audioAttempt?.audioTransaction?.endedAt === null && Boolean(current.practice?.audioAttempt?.audioTransaction?.interruptedAt), current.practice?.audioAttempt);
await m03Reject.page.evaluate(async () => {
  const pending = window.__audioAResume;
  pending.ctx.resume = pending.originalResume;
  state.sfx.resumePromise = null;
  await pending.originalResume();
});
await m03Reject.page.locator("#m03WheelReplay").click();
await readyM03(m03Reject.page);
current = await m03View(m03Reject.page);
record("M03 explicit recovery records one running-started-ended model", Boolean(current.practice?.audioAttempt?.audioTransaction?.startedAt) && Boolean(current.practice?.audioAttempt?.audioTransaction?.endedAt) && current.practice?.corrects === 0, current.practice?.audioAttempt);
await m03Reject.context.close();

const m03Watchdog = await makePage();
await m03Watchdog.page.goto(url("?level=M03&check=audio-a-watchdog"), { waitUntil: "domcontentloaded", timeout: 15000 });
await waitBoot(m03Watchdog.page);
await m03Watchdog.page.evaluate(() => {
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
  state.sfx = null;
  state.audioUnlocked = true;
  window.AudioContext = WatchdogAudioContext;
  window.webkitAudioContext = WatchdogAudioContext;
});
await m03Watchdog.page.locator("#m03WheelReplay").click();
await waitM03Phase(m03Watchdog.page, "sound-paused", 6000);
current = await m03View(m03Watchdog.page);
record("M03 watchdog interrupts without ending or scoring the model", Boolean(current.practice?.audioAttempt?.audioTransaction?.startedAt) && current.practice?.audioAttempt?.audioTransaction?.endedAt === null && Boolean(current.practice?.audioAttempt?.audioTransaction?.interruptedAt) && current.practice?.corrects === 0, current.practice?.audioAttempt);
await m03Watchdog.context.close();

const gardenEarly = await makePage();
await beginGarden(gardenEarly.page);
await gardenEarly.page.evaluate(() => {
  window.handleInput(60, "MIDI");
  window.releaseGardenInput(60, "MIDI");
});
current = await gardenView(gardenEarly.page);
record("LS01 model-playing input is observation-only and cannot grow a leaf", current.leaves[0] === false && current.action?.gardenAttempt?.childInputs?.length === 0 && current.gardenAudioAttempt?.observations?.length === 1 && current.phase === "model-playing", current);
await readyGarden(gardenEarly.page);
current = await gardenView(gardenEarly.page);
record("LS01 target model ends before the first input arm", current.gardenAudioAttempt?.audioTransaction?.context === "model" && Boolean(current.gardenAudioAttempt?.audioTransaction?.startedAt) && Boolean(current.gardenAudioAttempt?.audioTransaction?.endedAt) && current.gardenAudioAttempt?.inputArmed === true, current.gardenAudioAttempt);
await gardenEarly.context.close();

const gardenTouchWrong = await makePage();
await beginGarden(gardenTouchWrong.page);
await readyGarden(gardenTouchWrong.page);
await gardenTouchWrong.page.locator('.key.white-key[data-midi="62"]').click();
await waitGardenPhase(gardenTouchWrong.page, "wrong-repair-playing", "LS01");
current = await gardenView(gardenTouchWrong.page);
sequence = wrongRepairPlaying(current.gardenAudioAttempt, 62, 60);
record("LS01 touch wrong starts one target after its single child echo and does not grow the leaf", sequence.pass && current.leaves[0] === false && current.action?.gardenAttempt?.wrongCount === 1, { sequence, current });
await readyGarden(gardenTouchWrong.page);
current = await gardenView(gardenTouchWrong.page);
sequence = wrongRepairSettled(current.gardenAudioAttempt, 62, 60);
record("LS01 touch repair ends once before re-arming input", sequence.pass && current.gardenAudioAttempt?.inputArmed === true && current.leaves[0] === false, { sequence, current });
await gardenTouchWrong.context.close();

const gardenMidiWrong = await makePage();
await beginGarden(gardenMidiWrong.page);
await readyGarden(gardenMidiWrong.page);
await gardenMidiWrong.page.evaluate(() => {
  window.handleInput(62, "MIDI");
  window.handleInput(62, "MIDI");
});
await waitGardenPhase(gardenMidiWrong.page, "wrong-repair-playing", "LS01");
current = await gardenView(gardenMidiWrong.page);
sequence = wrongRepairPlaying(current.gardenAudioAttempt, 62, 60);
record("LS01 MIDI wrong starts one child echo, one target repair and one wrong record", sequence.pass && current.action?.gardenAttempt?.wrongCount === 1 && current.action?.gardenAttempt?.inputRoutes?.MIDI === 1, { sequence, current });
await gardenMidiWrong.page.evaluate(() => window.releaseGardenInput(62, "MIDI"));
await readyGarden(gardenMidiWrong.page);
current = await gardenView(gardenMidiWrong.page);
sequence = wrongRepairSettled(current.gardenAudioAttempt, 62, 60);
record("LS01 MIDI note-off during repair re-arms only after target repair ends", sequence.pass && current.gardenAudioAttempt?.inputArmed === true && current.gardenAudioAttempt?.midiHeldMidis?.length === 0 && current.action?.gardenAttempt?.inputRoutes?.MIDI === 1, { sequence, current });
await gardenMidiWrong.context.close();

const gardenMidiHeld = await makePage();
await beginGarden(gardenMidiHeld.page);
await readyGarden(gardenMidiHeld.page);
await gardenMidiHeld.page.evaluate(() => window.handleInput(62, "MIDI"));
await waitGardenPhase(gardenMidiHeld.page, "wrong-repair-playing", "LS01");
await readyGarden(gardenMidiHeld.page);
current = await gardenView(gardenMidiHeld.page);
record("LS01 held wrong MIDI stays unarmed after repair and does not enter assisted", current.action?.gardenAttempt?.wrongCount === 1 && current.action?.gardenAttempt?.repairStage === "none" && current.gardenAudioAttempt?.inputArmed === false && current.gardenAudioAttempt?.midiHeldMidis?.join(",") === "62" && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 1, current);
await gardenMidiHeld.page.evaluate(() => window.handleInput(62, "MIDI"));
await gardenMidiHeld.page.waitForTimeout(80);
current = await gardenView(gardenMidiHeld.page);
record("LS01 repeated held MIDI note-on is observation-only with no second wrong or early assistance", current.action?.gardenAttempt?.wrongCount === 1 && current.action?.gardenAttempt?.repairStage === "none" && current.gardenAudioAttempt?.inputArmed === false && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 1 && current.gardenAudioAttempt?.observations?.some((event) => event.phase === "held-midi" && event.midi === 62), current);
await gardenMidiHeld.page.evaluate(() => window.releaseGardenInput(62, "MIDI"));
await gardenMidiHeld.page.waitForFunction(() => {
  const attempt = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").active?.actions?.[0]?.gardenAttempt?.audioAttempt;
  return attempt?.inputArmed === true && attempt?.midiHeldMidis?.length === 0;
}, null, { timeout: 10000 });
current = await gardenView(gardenMidiHeld.page);
record("LS01 held MIDI note-off re-arms exactly once after repair without changing its wrong count", current.action?.gardenAttempt?.wrongCount === 1 && current.action?.gardenAttempt?.repairStage === "none" && current.gardenAudioAttempt?.inputArmed === true && current.gardenAudioAttempt?.midiHeldMidis?.length === 0 && current.action?.gardenAttempt?.inputRoutes?.MIDI === 1, current);
await gardenMidiHeld.context.close();

const gardenMicWrong = await makePage();
await beginGarden(gardenMicWrong.page);
await readyGarden(gardenMicWrong.page);
await gardenMicWrong.page.evaluate(() => window.handleInput(62, "麦克风"));
await waitGardenPhase(gardenMicWrong.page, "external-input", "LS01");
current = await gardenView(gardenMicWrong.page);
record("LS01 microphone onset starts an external child transaction without local echo or score", started(current.gardenAudioAttempt?.audioTrace, "external-input").length === 1 && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 0 && current.action?.gardenAttempt?.wrongCount === 0 && current.leaves[0] === false, current);
await gardenMicWrong.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
await waitGardenPhase(gardenMicWrong.page, "wrong-repair-playing", "LS01");
current = await gardenView(gardenMicWrong.page);
sequence = wrongRepairPlaying(current.gardenAudioAttempt, 62, 60, { external: true });
record("LS01 microphone quiet starts only the target repair with no echoed child duplicate", sequence.pass && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 0 && current.action?.gardenAttempt?.wrongCount === 1, { sequence, current });
await readyGarden(gardenMicWrong.page);
current = await gardenView(gardenMicWrong.page);
sequence = wrongRepairSettled(current.gardenAudioAttempt, 62, 60, { external: true });
record("LS01 microphone target repair ends once before input re-arms", sequence.pass && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 0 && current.gardenAudioAttempt?.inputArmed === true, { sequence, current });
await gardenMicWrong.context.close();

const gardenMicQueuedRepair = await makePage();
await beginGarden(gardenMicQueuedRepair.page);
await readyGarden(gardenMicQueuedRepair.page);
await gardenMicQueuedRepair.page.evaluate(() => window.handleInput(62, "麦克风"));
await waitGardenPhase(gardenMicQueuedRepair.page, "external-input", "LS01");
await gardenMicQueuedRepair.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
await waitGardenPhase(gardenMicQueuedRepair.page, "wrong-repair-playing", "LS01");
await gardenMicQueuedRepair.page.locator("#mapReturn").click();
await gardenMicQueuedRepair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await gardenView(gardenMicQueuedRepair.page);
sequence = wrongRepairSettled(current.gardenAudioAttempt, 62, 60, { external: true });
record("LS01 queued microphone return completes the target repair without locally replaying the child", sequence.pass && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 0 && current.action?.gardenAttempt?.wrongCount === 1 && current.action?.gardenAttempt?.inputRoutes?.["麦克风"] === 1 && Boolean(current.gardenAudioAttempt?.audioTransaction?.returnQueuedConsumedAt), { sequence, current });
await gardenMicQueuedRepair.page.locator("#gardenRestMarker").click();
await readyGarden(gardenMicQueuedRepair.page, "LS01");
current = await gardenView(gardenMicQueuedRepair.page);
record("LS01 microphone map re-entry re-arms with one external child transaction and one wrong", started(current.gardenAudioAttempt?.audioTrace, "external-input").length === 1 && started(current.gardenAudioAttempt?.audioTrace, "child-echo").length === 0 && current.action?.gardenAttempt?.wrongCount === 1 && current.gardenAudioAttempt?.inputArmed === true, current);
await gardenMicQueuedRepair.context.close();

const gardenMicStop = await makePage();
await beginGarden(gardenMicStop.page);
await readyGarden(gardenMicStop.page);
await gardenMicStop.page.evaluate(() => {
  window.handleInput(62, "麦克风");
  state.audio = {
    running: true,
    raf: 0,
    stream: { getTracks: () => [] },
    ctx: { close() {} }
  };
  window.stopMicrophone();
  window.releaseGardenInput(null, "麦克风");
});
await waitGardenPhase(gardenMicStop.page, "sound-paused", "LS01");
current = await gardenView(gardenMicStop.page);
record("Stopping microphone interrupts accepted external input and ignores a late quiet release", current.leaves[0] === false && current.action?.gardenAttempt?.wrongCount === 0 && current.gardenAudioAttempt?.audioTransaction?.endedAt === null && Boolean(current.gardenAudioAttempt?.audioTransaction?.interruptedAt) && current.gardenAudioAttempt?.phase === "sound-paused", current);
await gardenMicStop.page.locator('.key.white-key[data-midi="60"]').click();
await waitGardenPhase(gardenMicStop.page, "child-echo-playing", "LS01");
current = await gardenView(gardenMicStop.page);
record("One new touch after microphone stop immediately starts the retry child echo", current.gardenAudioAttempt?.audioTransaction?.context === "child-echo" && current.gardenAudioAttempt?.pendingInput?.midi === 60 && current.action?.gardenAttempt?.wrongCount === 0 && current.leaves[0] === false && current.audioContextState === "running", current);
await gardenMicStop.page.waitForFunction(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").chapter3?.leaves?.[0] === true, null, { timeout: 10000 });
current = await gardenView(gardenMicStop.page);
const stoppedMicEvidence = current.lessonEvidence?.LS01;
record("Only the one post-stop touch retry can complete LS01 once", current.leaves[0] === true && stoppedMicEvidence?.childCorrectCount === 1 && stoppedMicEvidence?.childInputs?.length === 1 && stoppedMicEvidence?.childInputs?.[0]?.source === "屏幕" && stoppedMicEvidence?.inputRoutes?.["屏幕"] === 1 && stoppedMicEvidence?.wrongCount === 0 && gardenCompletions(current.runtime, "LS01").length === 1, { current, stoppedMicEvidence });
await gardenMicStop.context.close();

const gardenMicStopMidi = await makePage();
await beginGarden(gardenMicStopMidi.page);
await readyGarden(gardenMicStopMidi.page);
await gardenMicStopMidi.page.evaluate(() => {
  window.handleInput(62, "麦克风");
  state.audio = {
    running: true,
    raf: 0,
    stream: { getTracks: () => [] },
    ctx: { close() {} }
  };
  window.stopMicrophone();
  window.releaseGardenInput(null, "麦克风");
  window.handleInput(60, "MIDI");
});
await waitGardenPhase(gardenMicStopMidi.page, "child-echo-playing", "LS01");
current = await gardenView(gardenMicStopMidi.page);
record("One new MIDI note after microphone stop immediately starts the retry child echo", current.gardenAudioAttempt?.audioTransaction?.context === "child-echo" && current.gardenAudioAttempt?.pendingInput?.midi === 60 && current.action?.gardenAttempt?.wrongCount === 0 && current.leaves[0] === false, current);
await gardenMicStopMidi.page.waitForFunction(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").chapter3?.leaves?.[0] === true, null, { timeout: 10000 });
current = await gardenView(gardenMicStopMidi.page);
const stoppedMidiEvidence = current.lessonEvidence?.LS01;
record("Only the one post-stop MIDI retry can complete LS01 once", current.leaves[0] === true && stoppedMidiEvidence?.childCorrectCount === 1 && stoppedMidiEvidence?.childInputs?.length === 1 && stoppedMidiEvidence?.childInputs?.[0]?.source === "MIDI" && stoppedMidiEvidence?.inputRoutes?.MIDI === 1 && stoppedMidiEvidence?.wrongCount === 0 && gardenCompletions(current.runtime, "LS01").length === 1, { current, stoppedMidiEvidence });
await gardenMicStopMidi.context.close();

const gardenMicStopMic = await makePage();
await beginGarden(gardenMicStopMic.page);
await readyGarden(gardenMicStopMic.page);
await gardenMicStopMic.page.evaluate(() => {
  window.handleInput(62, "麦克风");
  state.audio = {
    running: true,
    raf: 0,
    stream: { getTracks: () => [] },
    ctx: { close() {} }
  };
  window.stopMicrophone();
  window.releaseGardenInput(null, "麦克风");
  window.handleInput(60, "麦克风");
});
await waitGardenPhase(gardenMicStopMic.page, "external-input", "LS01");
current = await gardenView(gardenMicStopMic.page);
record("One new microphone onset after stop creates a new external transaction instead of reusing the old one", current.gardenAudioAttempt?.audioTransaction?.context === "external-input" && current.gardenAudioAttempt?.pendingInput?.midi === 60 && current.action?.gardenAttempt?.wrongCount === 0 && current.leaves[0] === false, current);
await gardenMicStopMic.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
await gardenMicStopMic.page.waitForFunction(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").chapter3?.leaves?.[0] === true, null, { timeout: 10000 });
current = await gardenView(gardenMicStopMic.page);
const stoppedMicRetryEvidence = current.lessonEvidence?.LS01;
record("Only the one post-stop microphone onset and quiet can complete LS01 once", current.leaves[0] === true && stoppedMicRetryEvidence?.childCorrectCount === 1 && stoppedMicRetryEvidence?.childInputs?.length === 1 && stoppedMicRetryEvidence?.childInputs?.[0]?.source === "麦克风" && stoppedMicRetryEvidence?.inputRoutes?.["麦克风"] === 1 && stoppedMicRetryEvidence?.wrongCount === 0 && gardenCompletions(current.runtime, "LS01").length === 1, { current, stoppedMicRetryEvidence });
await gardenMicStopMic.context.close();

const gardenModeled = await makePage();
await beginGarden(gardenModeled.page);
await readyGarden(gardenModeled.page);
await gardenModeled.page.evaluate(() => window.completeGardenModeledSuccess("audio-a-probe"));
await waitGardenPhase(gardenModeled.page, "modeled-playing", "LS01");
current = await gardenView(gardenModeled.page);
record("LS01 modeled completion leaves the world unchanged until target audio ends", current.leaves[0] === false && current.action?.gardenAttempt?.modeledInputs?.length === 0 && current.phase === "modeled-playing", current);
await gardenModeled.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await gardenView(gardenModeled.page);
const modeledHistory = current.runtime.history.find((session) => session.bundleId === "C3-01");
record("LS01 modeled target ends once before the early-rest leaf action", current.leaves[0] === true && modeledHistory?.completedActions?.[0]?.modeled === true && modeledHistory?.completedActions?.[0]?.reviewableForMastery === false, { current, modeledHistory });
await gardenModeled.context.close();

const gardenSequence = await makePage();
await beginGarden(gardenSequence.page);
await readyGarden(gardenSequence.page);
await gardenSequence.page.locator('.key.white-key[data-midi="60"]').click();
await gardenSequence.page.waitForFunction(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").chapter3?.leaves?.[0] === true, null, { timeout: 10000 });
await readyGarden(gardenSequence.page, "LS02");
current = await gardenView(gardenSequence.page);
record("LS02 action opens only after its own visible D model has ended", current.action?.targetId === "LS02" && started(current.gardenAudioAttempt?.audioTrace, "model").some((event) => event.midis?.join(",") === "62") && current.gardenAudioAttempt?.inputArmed === true, current);
await gardenSequence.page.locator('.key.white-key[data-midi="62"]').click();
await gardenSequence.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
await gardenSequence.page.locator("#gardenRestMarker").click();
await readyGarden(gardenSequence.page, "LS03");
await gardenSequence.page.locator('.key.white-key[data-midi="64"]').click();
await waitGardenPhase(gardenSequence.page, "model-playing", "LS03");
current = await gardenView(gardenSequence.page);
record("LS03 second E action receives a second visible E model before rearm", current.runtime.chapter3?.ls03QualifiedInputs === 1 && started(current.gardenAudioAttempt?.audioTrace, "model").filter((event) => event.midis?.join(",") === "64").length === 2 && current.phase === "model-playing", current.gardenAudioAttempt);
await gardenSequence.context.close();

const gardenReload = await makePage();
await beginGarden(gardenReload.page);
await readyGarden(gardenReload.page);
await gardenReload.page.locator('.key.white-key[data-midi="60"]').click();
await waitGardenPhase(gardenReload.page, "child-echo-playing", "LS01");
await gardenReload.page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
await waitBoot(gardenReload.page);
await waitGardenPhase(gardenReload.page, "sound-paused", "LS01");
current = await gardenView(gardenReload.page);
record("LS01 refresh during child echo preserves pending input without a fabricated leaf", current.leaves[0] === false && current.action?.gardenAttempt?.childInputs?.length === 0 && current.gardenAudioAttempt?.pendingInput?.midi === 60 && Boolean(current.gardenAudioAttempt?.audioTransaction?.interruptedAt), current);
await gardenReload.page.locator('.key.white-key[data-midi="60"]').click();
await waitGardenPhase(gardenReload.page, "child-echo-playing", "LS01");
current = await gardenView(gardenReload.page);
record("LS01 real keyboard recovery gesture unlocks and restarts the preserved child echo", current.audioContextState === "running" && current.gardenAudioAttempt?.audioTransaction?.context === "child-echo" && Boolean(current.gardenAudioAttempt?.audioTransaction?.startedAt) && current.gardenAudioAttempt?.audioTransaction?.endedAt === null && current.gardenAudioAttempt?.pendingInput?.midi === 60, current);
await gardenReload.page.waitForFunction(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").chapter3?.leaves?.[0] === true, null, { timeout: 10000 });
await gardenReload.page.waitForTimeout(1100);
current = await gardenView(gardenReload.page);
const reloadEvidence = current.lessonEvidence?.LS01;
const reloadCompletions = gardenCompletions(current.runtime, "LS01");
record("LS01 explicit recovery completes the preserved child echo exactly once with no late duplicate", current.leaves[0] === true && reloadEvidence?.childCorrectCount === 1 && reloadEvidence?.childInputs?.length === 1 && reloadEvidence?.childInputs?.[0]?.midi === 60 && reloadEvidence?.childInputs?.[0]?.source === "屏幕" && reloadEvidence?.wrongCount === 0 && Object.values(reloadEvidence?.inputRoutes || {}).reduce((total, count) => total + Number(count || 0), 0) === 1 && reloadCompletions.length === 1 && reloadCompletions[0]?.childCorrectCount === 1 && reloadCompletions[0]?.childInputs?.length === 1, { current, reloadEvidence, reloadCompletions });
await gardenReload.context.close();

record("AUDIO-A browser console remains clean", browserErrors.length === 0, browserErrors);
await browser.close();

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`AUDIO-A M03 + LS01-LS03 checks: ${checks.length - failed.length}/${checks.length} passed`);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exitCode = 1;
}
