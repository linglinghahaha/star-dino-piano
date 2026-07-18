import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter3_ls05_341a";
fs.mkdirSync(screenshotDir, { recursive: true });

let browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const errors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

async function restartBrowser() {
  await browser.close();
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
}

function url() {
  const target = new URL(baseUrl);
  target.search = "?screen=map&check=chapter3-ls05-341a";
  return target.toString();
}

function runtimeFixture() {
  return {
    version: 1,
    active: null,
    history: [{ sessionId: "C2-03-entry", bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] }],
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: {
        LS01: { completedAt: "2026-07-11T01:00:00.000Z" },
        LS02: { completedAt: "2026-07-11T01:05:00.000Z" },
        LS03: { completedAt: "2026-07-11T01:10:00.000Z" },
        LS04: { completedAt: "2026-07-11T01:20:00.000Z", stable: true }
      },
      resume: null,
      ls03QualifiedInputs: 2,
      completed: false,
      visibleSliceCompleted: true,
      ls04Completed: true,
      ls05Completed: false,
      ls04Attempts: [],
      ls05Attempts: []
    }
  };
}

function learningFixture() {
  return {
    version: 3,
    levels: { M07: { completions: 2, formalCompletions: 2, stableCompletions: 1 }, LS04: { completions: 1, formalCompletions: 1, stableCompletions: 1 } },
    notes: {}, staff: {},
    retention: {
      stableEvents: [{ eventId: "sentinel-stable", skillKey: "level:M07", sessionId: "sentinel" }],
      retainedEvents: [{ eventId: "sentinel-retained", skillKey: "level:M07", sessionId: "sentinel-later" }],
      observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null
    }
  };
}

async function makePage(viewport = { width: 1024, height: 768 }, { failAudioContext = false } = {}) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ failAudioContext }) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["ls05-midi", input]]), onstatechange: null });
    window.__emitMidi = (note, velocity = 100) => input.onmidimessage?.({ data: [0x90, note, velocity] });
    window.__emitMidiOff = (note) => input.onmidimessage?.({ data: [0x80, note, 0] });
    if (failAudioContext) {
      class FailedAudioContext { constructor() { throw new Error("simulated AudioContext failure"); } }
      window.AudioContext = FailedAudioContext;
      window.webkitAudioContext = FailedAudioContext;
    }
  }, { failAudioContext });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(`${message.type()}: ${message.text()}`);
  });
  return { context, page };
}

async function seed(page, runtime = runtimeFixture(), learning = learningFixture()) {
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.evaluate(({ runtimeValue, learningValue }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
  }, { runtimeValue: runtime, learningValue: learning });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const learning = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.listeningAttempt || null;
    const flowers = [...document.querySelectorAll("#ls05FlowerArc .ls05-flower")].map((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return { width: style.width, height: style.height, rectWidth: rect.width, rectHeight: rect.height, transform: style.transform, opacity: style.opacity, className: node.className };
    });
    const childText = [document.querySelector("#nextAction"), document.querySelector("#heardStatus"), document.querySelector("#ls05Compare"), document.querySelector("#listeningCallProgress")]
      .filter(Boolean).map((node) => node.innerText || node.textContent || "").join(" ");
    const targetNodes = [...document.querySelectorAll("[data-target-note='true'], .white-key.target, .white-key.target-muted")];
    return {
      runtime, learning, active: runtime.active, chapter3: runtime.chapter3 || {}, attempt,
      phase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
      screenClass: document.body.className,
      marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      mapProgress: document.querySelector("#mapStarCount")?.textContent || "",
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      childText, flowers,
      targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
      targetNodeCount: targetNodes.length,
      compare: document.querySelector("#ls05Compare")?.innerText?.replace(/\s+/g, " ").trim() || "",
      compareAria: document.querySelector("#ls05Compare")?.getAttribute("aria-label") || "",
      compareItems: [...document.querySelectorAll("#ls05Compare > span")].map((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return { text: node.textContent.trim(), className: node.className, width: rect.width, height: rect.height, background: style.backgroundColor, color: style.color, border: style.borderColor };
      }),
      assistHidden: document.querySelector("#ls05VisualAssist")?.hidden,
      replayDisabled: document.querySelector("#listeningReplay")?.disabled,
      modalHidden: document.querySelector("#resultModal")?.hidden,
      parentFocus: document.querySelector("#parentLearningFocus")?.textContent || "",
      parentDetail: document.querySelector("#parentLearningDetail")?.textContent || "",
      parentProgress: document.querySelector("#parentProgressText")?.textContent || "",
      parentMastery: document.querySelector("#parentMasteryStatus")?.textContent || "",
      parentEvidence: document.querySelector("#parentEvidenceList")?.innerText?.replace(/\s+/g, " ").trim() || ""
    };
  });
}

async function waitPhase(page, phases, timeout = 12000) {
  const wanted = Array.isArray(phases) ? phases : [phases];
  try {
    await page.waitForFunction((values) => values.includes(document.querySelector("#gardenScene")?.dataset.listeningPhase), wanted, { timeout });
  } catch (error) {
    const diagnostics = await page.evaluate(() => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt || null;
      return { url: location.href, domPhase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "", attemptPhase: attempt?.phase || "", audioTrace: attempt?.audioTrace?.slice(-5) || [], sessionId: runtime.active?.sessionId || "", soundEnabled: document.documentElement.dataset.soundEnabled, soundVolume: document.documentElement.dataset.soundVolume };
    });
    throw new Error(`Timed out waiting for ${wanted.join("|")}: ${JSON.stringify(diagnostics)}`, { cause: error });
  }
  return view(page);
}

async function press(page, midi) {
  await page.locator(`.white-key[data-midi="${midi}"]`).click();
}

async function injectDuringTargetPlayback(page, midi, timeout = 8000) {
  return page.evaluate(async ({ note, timeoutMs }) => {
    const readAttempt = () => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      return runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt || null;
    };
    const snapshot = (attempt) => ({
      callIndex: attempt?.callIndex ?? null,
      correctCount: attempt?.correctCount ?? null,
      totalWrongCount: attempt?.totalWrongCount ?? null,
      scoredCalls: attempt?.scoredCalls?.length ?? null,
      earlyInputs: attempt?.earlyInputs?.length ?? null
    });

    const deadline = performance.now() + timeoutMs;
    while (performance.now() < deadline) {
      const phase = document.querySelector("#gardenScene")?.dataset.listeningPhase || "";
      if (phase === "target-playing") {
        const before = snapshot(readAttempt());
        window.handleInput(note, "屏幕");
        return { observedPhase: phase, before, after: snapshot(readAttempt()) };
      }
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    throw new Error(`Timed out injecting early input during target-playing; actual=${document.querySelector("#gardenScene")?.dataset.listeningPhase || ""}`);
  }, { note: midi, timeoutMs: timeout });
}

async function start(page) {
  const referenceWait = page.waitForFunction(() => {
    if (document.querySelector("#gardenScene")?.dataset.listeningPhase !== "reference") return false;
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt;
    return attempt?.audioLifecycle?.some((event) => event.kind === "started" && event.context === "reference" && Boolean(event.startedAt));
  }, null, { timeout: 8000 });
  await page.locator("#gardenRestMarker").click();
  await referenceWait;
  return view(page);
}

async function completeRemaining(page, source = "屏幕") {
  while (true) {
    const snapshot = await view(page);
    if (!snapshot.active || snapshot.attempt?.callIndex >= 5) return;
    const waiting = await waitPhase(page, ["awaiting-response", "assisted-retry", "visual-assist"]);
    const midi = waiting.attempt.sequence[waiting.attempt.callIndex];
    const terminalCall = waiting.attempt.callIndex === waiting.attempt.sequence.length - 1;
    if (source === "屏幕") await press(page, midi);
    else await page.evaluate(({ note, route }) => window.handleInput(note, route), { note: midi, route: source });
    if (terminalCall) {
      await waitPhase(page, "complete");
      return;
    }
    const after = await view(page);
    if (!after.active || after.attempt?.callIndex >= 5) return;
    await waitPhase(page, ["correct-feedback", "target-playing", "awaiting-response"]);
  }
}

async function waitForLs05ResponseRearm(page, phase = "assisted-retry") {
  await page.waitForFunction((expectedPhase) => {
    const attempt = currentListeningAction("LS05")?.listeningAttempt;
    return attempt?.phase === expectedPhase && attempt.inputArmed === true &&
      Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
  }, phase, { timeout: 12000 });
  return view(page);
}

async function reachModeledPlaying(page) {
  await start(page);
  await waitPhase(page, "awaiting-response");
  let snapshot = await view(page);
  const target = snapshot.attempt.sequence[snapshot.attempt.callIndex];
  const wrong = target === 60 ? 62 : 60;
  for (let index = 0; index < 4; index += 1) {
    await press(page, wrong);
    if (index === 0) { await waitPhase(page, "wrong-known"); await waitPhase(page, "awaiting-response"); }
    if (index === 1) { await waitPhase(page, "pair-compare"); await waitPhase(page, "awaiting-response"); }
    if (index === 2) {
      await waitPhase(page, "assisted-retry");
      await waitForLs05ResponseRearm(page);
    }
  }
  snapshot = await waitPhase(page, "modeled-playing");
  return { snapshot, target, wrong };
}

function quota(sequence) {
  return Object.fromEntries([60, 62, 64].map((midi) => [midi, sequence.filter((value) => value === midi).length]));
}

function hasRequiredCallFields(call) {
  return Boolean(call && call.levelId === "LS05" && call.sessionId && call.bundleId === "C3-04" && Number.isInteger(call.callIndex) && [60, 62, 64].includes(call.targetMidi) && call.candidateMidis?.join(",") === "60,62,64" && Object.hasOwn(call, "firstValidInput") && Object.hasOwn(call, "firstInputRoute") && Object.hasOwn(call, "inputRoute") && Object.hasOwn(call, "qualifyingCorrect") && Number.isFinite(call.childReplayCount) && Number.isFinite(call.systemReplayCount) && typeof call.targetRevealedBeforeResponse === "boolean" && typeof call.strongCueUsed === "boolean" && typeof call.modeled === "boolean" && typeof call.accessibilityVisualAssist === "boolean" && typeof call.hasExperimentalInput === "boolean" && typeof call.experimentalInput === "boolean" && Object.hasOwn(call, "microphoneConfidence") && Object.hasOwn(call, "responseMs") && call.timingUsedForMastery === false);
}

function expectedSequence(seed) {
  const tables = [
    [[62, 64, 62, 60, 64], [64, 62, 60, 64, 62]],
    [[60, 64, 60, 62, 64], [64, 60, 62, 64, 60]],
    [[60, 62, 60, 64, 62], [62, 60, 64, 62, 60]]
  ];
  const hash = seedHash(seed);
  return tables[hash % 3][Math.floor(hash / 3) % 2];
}

function activeRuntimeForSeed(sessionId) {
  const runtime = runtimeFixture();
  runtime.active = {
    sessionId,
    bundleId: "C3-04",
    startedAt: "2026-07-12T02:00:00.000Z",
    localDateKey: "2026-07-12",
    status: "active",
    actionIndex: 0,
    actions: [{ actionId: "LS05-listening", kind: "garden-listening", targetId: "LS05", runMode: "check", reviewableForMastery: true, role: "lesson" }],
    completedActions: [],
    restAfterCurrentLevel: false,
    resumeOfSessionId: null
  };
  return runtime;
}

const main = await makePage();
await seed(main.page);
let current = await view(main.page);
record("LS04 rest exposes an enabled LS05 map entry without creating C3-04", current.marker.includes("三朵花") && !current.markerDisabled && current.mapProgress.includes("花粉环 0/5") && !current.active, current);
current = await start(main.page);
record("Explicit child gesture creates one formal C3-04 action", current.active?.bundleId === "C3-04" && current.active.actions?.length === 1 && current.active.actions[0].targetId === "LS05", current.active);
record("C reference is visibly started but not yet scored or completed", current.phase === "reference" && current.speech.includes("C") && current.speech.includes("Do") && current.attempt.referencePlayed === false && current.attempt.audioLifecycle.some((event) => event.kind === "started" && event.context === "reference" && Boolean(event.startedAt)) && current.attempt.scoredCalls.length === 0, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls05_reference_1024x768.png") });

const sequence = current.attempt.sequence;
const counts = quota(sequence);
record("Seeded LS05 sequence is strict 2/2/1 with all C D E present", sequence.length === 5 && Object.values(counts).sort().join(",") === "1,2,2", { sequence, counts });
record("Seeded LS05 sequence never repeats one sound more than twice", !sequence.some((midi, index) => index >= 2 && midi === sequence[index - 1] && midi === sequence[index - 2]), sequence);

const firstTarget = sequence[0];
const earlyObservation = await injectDuringTargetPlayback(main.page, firstTarget);
current = await view(main.page);
record("Input during target playback is observation only", earlyObservation.observedPhase === "target-playing"
  && earlyObservation.after.earlyInputs === earlyObservation.before.earlyInputs + 1
  && earlyObservation.after.callIndex === earlyObservation.before.callIndex
  && earlyObservation.after.correctCount === earlyObservation.before.correctCount
  && earlyObservation.after.totalWrongCount === earlyObservation.before.totalWrongCount
  && earlyObservation.after.scoredCalls === earlyObservation.before.scoredCalls,
{ earlyObservation, attempt: current.attempt });
current = await waitPhase(main.page, "awaiting-response");
const beforeChildReplay = {
  callIndex: current.attempt.callIndex,
  correctCount: current.attempt.correctCount,
  totalWrongCount: current.attempt.totalWrongCount,
  scoredCalls: current.attempt.scoredCalls.length
};
const replayPlayingWait = waitPhase(main.page, "target-playing");
await main.page.locator("#listeningReplay").click();
await replayPlayingWait;
current = await waitPhase(main.page, "awaiting-response");
record("A successful child replay counts once while ordinary first-call playback is not system replay", current.attempt.replayCountChild === 1
  && current.attempt.replayCountSystem === 0
  && current.attempt.callIndex === beforeChildReplay.callIndex
  && current.attempt.correctCount === beforeChildReplay.correctCount
  && current.attempt.totalWrongCount === beforeChildReplay.totalWrongCount
  && current.attempt.scoredCalls.length === beforeChildReplay.scoredCalls,
{ beforeChildReplay, attempt: current.attempt });
record("Waiting state has three identical flowers and no target DOM or keyboard cue", current.flowers.length === 3 && current.flowers.every((flower) => flower.width === current.flowers[0].width && flower.height === current.flowers[0].height && flower.opacity === current.flowers[0].opacity && !/is-responding|is-open/.test(flower.className)) && current.targetVisible === "false" && current.targetNodeCount === 0, current);
record("Waiting child surface contains no solfege outside the dinosaur bubble", !/Do|Re|Mi|C\s*\/\s*Do/.test(current.childText), current.childText);
await main.page.screenshot({ path: path.join(screenshotDir, "ls05_waiting_1024x768.png") });

const sessionId = current.active.sessionId;
const sequenceText = sequence.join(",");
await main.page.locator("#mapReturn").click();
current = await view(main.page);
record("Map pause preserves the same active session and current flower step", current.active?.sessionId === sessionId && current.marker.includes("继续花粉铃"), current);
await main.page.locator("#gardenRestMarker").click();
await waitPhase(main.page, "awaiting-response");
current = await view(main.page);
record("Same-session re-entry does not replay reference or change sequence", current.active.sessionId === sessionId && current.attempt.referencePlayed && current.attempt.sequence.join(",") === sequenceText && current.attempt.callIndex === 0, current.attempt);

await main.page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
await main.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
current = await view(main.page);
record("Refresh preserves the completed replay response state without scoring or source drift", current.active?.sessionId === sessionId && current.attempt.sequence.join(",") === sequenceText && current.phase === "awaiting-response" && current.attempt.inputArmed === true && current.attempt.replayCountChild === 1 && current.attempt.scoredCalls.length === 0, current);

const wrong = firstTarget === 60 ? 62 : 60;
await press(main.page, wrong);
current = await waitPhase(main.page, "wrong-known");
record("First wrong records child sound before target replay without revealing a key", current.attempt.audioTrace.slice(-2)[0]?.kind === "child-input" && current.attempt.audioTrace.slice(-2)[1]?.kind === "target-replay" && current.targetNodeCount === 0, current.attempt.audioTrace.slice(-3));
await main.page.screenshot({ path: path.join(screenshotDir, "ls05_wrong_1024x768.png") });
await waitPhase(main.page, "awaiting-response");
await press(main.page, wrong);
current = await waitPhase(main.page, "pair-compare");
record("Second confusion enters an equal pair comparison", current.attempt.callRepairStage === "pair-compare" && current.compare.includes(noteName(wrong)) && current.compare.includes(noteName(firstTarget)) && current.targetNodeCount === 0, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls05_pair_1024x768.png") });
const pairEvidence = { sessionId: current.active.sessionId, seed: current.attempt.seed, sequence: current.attempt.sequence.join(","), wrong: current.attempt.callWrongCount, pair: current.attempt.callConfusionPair.join(",") };
const pairPlaybackId = current.attempt.audioTransaction?.playbackId || null;
await main.page.locator("#mapReturn").click();
await main.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await main.page.locator("#gardenRestMarker").click();
current = await waitPhase(main.page, "awaiting-response");
const pairRepairEnded = current.attempt.audioLifecycle?.filter((event) => event.kind === "ended" && event.context === "wrong-repair" && event.playbackId === pairPlaybackId) || [];
record("Queued map return waits for the pair repair end and retains the same confusion evidence", current.active.sessionId === pairEvidence.sessionId && current.attempt.seed === pairEvidence.seed && current.attempt.sequence.join(",") === pairEvidence.sequence && current.attempt.callWrongCount === pairEvidence.wrong && current.attempt.callRepairStage === "pair-compare" && current.attempt.callConfusionPair.join(",") === pairEvidence.pair && current.attempt.correctCount === 0 && pairRepairEnded.length === 1 && current.attempt.inputArmed === true, { attempt: current.attempt, pairRepairEnded });
await press(main.page, wrong);
current = await waitPhase(main.page, "assisted-retry");
record("Third wrong enters bounded strong assisted while its target repair is still the only active cue", current.attempt.strongCueUsed && current.attempt.callRepairStage === "assisted" && current.targetVisible === "true" && current.targetNodeCount >= 1 && current.assistHidden, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls05_assisted_1024x768.png") });
current = await waitForLs05ResponseRearm(main.page);
const assistedWrongCount = current.attempt.callWrongCount;
const assistedPair = current.attempt.callConfusionPair.join(",");
await main.page.locator("#mapReturn").click();
await main.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await main.page.locator("#gardenRestMarker").click();
current = await waitForLs05ResponseRearm(main.page);
record("Assisted recovery keeps strong evidence and equal C D E boundary without replaying the short key pulse", current.attempt.callWrongCount === assistedWrongCount && current.attempt.callRepairStage === "assisted" && current.attempt.callConfusionPair.join(",") === assistedPair && current.attempt.strongCueUsed && current.compare.replace(/\s+/g, "") === "CDE" && current.targetVisible === "false" && current.attempt.correctCount === 0, current);
await press(main.page, firstTarget);
await waitPhase(main.page, ["correct-feedback", "target-playing", "awaiting-response"]);
await waitPhase(main.page, "awaiting-response");
current = await view(main.page);
record("A new call resets call-local repair while preserving round totals", current.attempt.callIndex === 1 && current.attempt.callWrongCount === 0 && current.attempt.callRepairStage === "none" && current.attempt.callConfusionPair.length === 0 && current.attempt.totalWrongCount === 3, current.attempt);
const nextCleanTarget = current.attempt.sequence[1];
await press(main.page, nextCleanTarget);
await waitPhase(main.page, ["correct-feedback", "target-playing", "awaiting-response"]);
current = await waitPhase(main.page, "awaiting-response");
const expectedSystemReplays = current.attempt.audioTrace.filter((event) => event.kind === "target-replay" || (event.kind === "target" && event.reason === "resume")).length;
record("A later clean call keeps truthful candidate coverage even after an earlier strong repair", current.attempt.eligibleCoverage[noteName(nextCleanTarget)] === true && current.attempt.strongCueUsed === true && current.attempt.replayCountSystem === expectedSystemReplays, current.attempt);
record("Completed call evidence has the full auditable non-timing schema", current.attempt.scoredCalls.every(hasRequiredCallFields) && current.attempt.scoredCalls[0].sessionId === current.active.sessionId && current.attempt.scoredCalls[1].firstInputRoute === "屏幕" && current.attempt.scoredCalls[1].inputRoute === "屏幕" && current.attempt.scoredCalls[1].experimentalInput === false && current.attempt.scoredCalls[1].microphoneConfidence === null && current.attempt.scoredCalls.every((call) => call.timingUsedForMastery === false), current.attempt.scoredCalls);
await main.context.close();
await restartBrowser();

function noteName(midi) { return ({ 60: "C", 62: "D", 64: "E" })[midi] || String(midi); }

const modeled = await makePage({ width: 1194, height: 834 });
await seed(modeled.page);
await start(modeled.page);
await waitPhase(modeled.page, "awaiting-response");
current = await view(modeled.page);
const modeledSequence = current.attempt.sequence.join(",");
const modeledTarget = current.attempt.sequence[0];
const modeledWrong = modeledTarget === 60 ? 62 : 60;
for (let index = 0; index < 4; index += 1) {
  await press(modeled.page, modeledWrong);
  if (index < 2) await waitPhase(modeled.page, index === 0 ? "wrong-known" : "pair-compare");
  if (index < 2) await waitPhase(modeled.page, "awaiting-response");
  if (index === 2) {
    await waitPhase(modeled.page, "assisted-retry");
    await waitForLs05ResponseRearm(modeled.page);
  }
}
await modeled.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(modeled.page);
const oldSessionId = current.runtime.history.at(-1)?.sessionId;
const modeledTrace = current.chapter3.resume?.ls05Attempt?.audioTrace || [];
const modeledCallTargets = modeledTrace.filter((event) => event.callIndex === 0 && ["target-replay", "modeled"].includes(event.kind));
record("Fourth wrong models only the current call and ends the old session at safe rest", current.runtime.history.at(-1)?.endReason === "modeled-safe-rest" && current.chapter3.resume?.nextTargetId === "LS05" && current.chapter3.resume?.ls05Attempt?.callIndex === 1 && current.chapter3.resume?.ls05Attempt?.sequence.join(",") === modeledSequence && !current.chapter3.lessonEvidence.LS05, current.chapter3.resume);
record("Fourth wrong uses one target demonstration without a second overlapping target note", modeledCallTargets.filter((event) => event.kind === "target-replay").length === 4 && modeledCallTargets.filter((event) => event.kind === "modeled" && event.targetAlreadyPlayed).length === 1 && !modeledTrace.some((event) => event.kind === "target" && event.reason === "modeled"), modeledCallTargets);
await modeled.page.locator("#mapParentGate").click();
current = await view(modeled.page);
record("Modeled safe rest parent evidence shows truthful partial progress and practice need", current.parentFocus.includes("C/D/E 小音组") && current.parentProgress === "C/D/E 三朵花 1/5" && current.parentDetail.includes("modeled 有") && current.parentDetail.includes("不是绝对音感测试") && current.parentMastery === "本次做到这里" && current.parentEvidence.includes("今天需要提示"), current);
await modeled.page.locator("#parentClose").click();
const resumeReference = modeled.page.waitForFunction(() => document.querySelector("#gardenScene")?.dataset.listeningPhase === "reference", null, { timeout: 8000 });
await modeled.page.locator("#gardenRestMarker").click();
await resumeReference;
current = await view(modeled.page);
record("Resume creates a new sessionId and replays an unscored C reference before remaining calls", current.active.sessionId !== oldSessionId && current.active.resumeOfSessionId === oldSessionId && current.attempt.crossedSessionBoundary && current.attempt.callIndex === 1 && current.attempt.neutralProgress === 1 && current.attempt.sequence.join(",") === modeledSequence && current.phase === "reference" && current.attempt.scoredCalls.length === 1, current);
record("Resume C reference starts the remaining call with every call-local field reset", current.attempt.callWrongCount === 0 && current.attempt.callRepairStage === "none" && current.attempt.callConfusionPair.length === 0 && current.attempt.assistedCueVisible === false && current.attempt.callFirstValidInput === null && current.attempt.callReplayCountChild === 0 && current.attempt.callReplayCountSystem === 0 && current.attempt.callTargetRevealedBeforeResponse === false && current.attempt.callStrongCueUsed === false && current.attempt.callExperimentalInput === false && current.attempt.callAccessibilityVisualAssist === false && current.attempt.callResponseStartedAt === null && current.attempt.callTimingInterrupted === false, current.attempt);
await modeled.page.screenshot({ path: path.join(screenshotDir, "ls05_resume_reference_1194x834.png") });
await waitPhase(modeled.page, "awaiting-response");
await completeRemaining(modeled.page);
await modeled.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(modeled.page);
record("Cross-session fragments can finish the flower story but never combine into stable", current.chapter3.ls05Completed === true && current.chapter3.lessonEvidence.LS05?.crossedSessionBoundary === true && current.learning.levels.LS05?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS05"), { evidence: current.chapter3.lessonEvidence.LS05, stored: current.learning.levels.LS05 });
const resumedCalls = current.chapter3.ls05Attempts.at(-1)?.scoredCalls || [];
record("Resume keeps old call sessionId and writes remaining calls under the new sessionId", resumedCalls.length === 5 && resumedCalls[0]?.sessionId === oldSessionId && resumedCalls.slice(1).every((call) => call.sessionId !== oldSessionId && call.sessionId === current.chapter3.lessonEvidence.LS05?.sessionId) && resumedCalls.every((call) => call.timingUsedForMastery === false), resumedCalls);
await modeled.context.close();

const atomicMap = await makePage();
await seed(atomicMap.page);
current = (await reachModeledPlaying(atomicMap.page)).snapshot;
record("Modeled-playing disables replay and hides visual assist while remaining non-scoring", current.replayDisabled && current.assistHidden && current.attempt.pendingModeled?.callIndex === 0 && current.attempt.correctCount === 0, current);
await atomicMap.page.evaluate(() => {
  document.querySelector("#listeningReplay")?.click();
  document.querySelector("#ls05VisualAssist")?.click();
  document.querySelector("#mapReturn")?.click();
});
await atomicMap.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(atomicMap.page);
const atomicMapResume = current.chapter3.resume?.ls05Attempt;
record("Map navigation cannot bypass pending modeled safe rest", current.runtime.history.at(-1)?.endReason === "modeled-safe-rest" && atomicMapResume?.modeledInputs?.length === 1 && atomicMapResume?.callIndex === 1 && atomicMapResume?.neutralProgress === 1 && atomicMapResume?.audioTrace?.filter((event) => event.kind === "modeled").length === 1 && atomicMapResume?.audioTrace?.filter((event) => event.kind === "target-replay").length === 4, { history: current.runtime.history.at(-1), resume: atomicMapResume });
await atomicMap.context.close();

const atomicRefresh = await makePage();
await seed(atomicRefresh.page);
current = (await reachModeledPlaying(atomicRefresh.page)).snapshot;
const atomicSequence = current.attempt.sequence.join(",");
await atomicRefresh.page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
await atomicRefresh.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
current = await waitPhase(atomicRefresh.page, "sound-paused");
record("Refresh keeps a pending modeled repair interrupted until one explicit recovery", current.attempt.audioTransaction?.context === "wrong-repair" && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.pendingModeled?.targetAlreadyPlayed === true && current.runtime.history.at(-1)?.bundleId === "C2-03", current);
await atomicRefresh.page.locator("#listeningReplay").click();
await atomicRefresh.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
current = await view(atomicRefresh.page);
const atomicRefreshResume = current.chapter3.resume?.ls05Attempt;
record("Explicit refresh recovery consumes the same pending modeled call exactly once", current.runtime.history.at(-1)?.endReason === "modeled-safe-rest" && atomicRefreshResume?.sequence.join(",") === atomicSequence && atomicRefreshResume?.modeledInputs?.length === 1 && atomicRefreshResume?.callIndex === 1 && atomicRefreshResume?.neutralProgress === 1 && atomicRefreshResume?.audioTrace?.filter((event) => event.kind === "modeled").length === 1, { history: current.runtime.history.at(-1), resume: atomicRefreshResume });
await atomicRefresh.context.close();
await restartBrowser();

const stablePage = await makePage({ width: 1366, height: 1024 });
await seed(stablePage.page);
await start(stablePage.page);
await waitPhase(stablePage.page, "awaiting-response");
current = await view(stablePage.page);
const stableSequence = current.attempt.sequence;
const duplicateMidi = [60, 62, 64].find((midi) => stableSequence.filter((value) => value === midi).length === 2);
let repairedDuplicate = false;
while ((await view(stablePage.page)).attempt?.callIndex < 5) {
  current = await waitPhase(stablePage.page, ["awaiting-response", "assisted-retry"]);
  const target = current.attempt.sequence[current.attempt.callIndex];
  const terminalCall = current.attempt.callIndex === current.attempt.sequence.length - 1;
  if (!repairedDuplicate && target === duplicateMidi) {
    const miss = target === 60 ? 62 : 60;
    await press(stablePage.page, miss);
    await waitPhase(stablePage.page, "wrong-known");
    await waitPhase(stablePage.page, "awaiting-response");
    await press(stablePage.page, target);
    repairedDuplicate = true;
  } else {
    await press(stablePage.page, target);
  }
  if (terminalCall) {
    await waitPhase(stablePage.page, "complete");
    break;
  }
  await waitPhase(stablePage.page, ["correct-feedback", "target-playing", "awaiting-response"]);
}
await waitPhase(stablePage.page, "complete");
await stablePage.page.screenshot({ path: path.join(screenshotDir, "ls05_complete_1366x1024.png") });
await stablePage.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(stablePage.page);
const stableEvents = current.learning.retention.stableEvents.filter((event) => event.skillKey === "level:LS05");
const retainedEvents = current.learning.retention.retainedEvents.filter((event) => event.skillKey === "level:LS05");
record("A 4/5 round with C D E eligible coverage creates stable but no retained", current.chapter3.lessonEvidence.LS05?.correctCount === 4 && Object.values(current.chapter3.lessonEvidence.LS05?.eligibleCoverage || {}).every(Boolean) && stableEvents.length === 1 && retainedEvents.length === 0, { evidence: current.chapter3.lessonEvidence.LS05, stableEvents, retainedEvents });
record("Ordinary next-call playback is not counted as system replay", current.learning.levels.LS05?.lastAttempt?.replayCountSystem === 1, current.learning.levels.LS05?.lastAttempt);
record("LS05 completion leaves chapter3.completed false and does not create LS06", current.chapter3.completed === false && current.chapter3.ls05Completed === true && !JSON.stringify(current.runtime).includes("LS06"), current.chapter3);
record("Chapter 1/2 and LS04 sentinel evidence is unchanged", current.learning.levels.M07?.stableCompletions === 1 && current.learning.levels.LS04?.stableCompletions === 1 && current.learning.retention.retainedEvents.some((event) => event.eventId === "sentinel-retained"), current.learning);
await stablePage.page.locator("#mapParentGate").click();
current = await view(stablePage.page);
record("Parent rest view reports real LS05 listening evidence and both replay counts", current.parentFocus.includes("C/D/E 小音组") && current.parentDetail.includes("首答 4/5") && current.parentDetail.includes("C = Do") && current.parentDetail.includes("孩子主动重听 0") && current.parentDetail.includes("系统重听 1") && current.parentDetail.includes("不是绝对音感测试") && current.parentProgress === "C/D/E 三朵花 5/5" && current.parentMastery === "本次减提示完成", current);
await stablePage.page.screenshot({ path: path.join(screenshotDir, "ls05_parent_1366x1024.png") });
await stablePage.context.close();

const mic = await makePage();
await seed(mic.page);
await start(mic.page);
for (let index = 0; index < 5; index += 1) {
  current = await waitPhase(mic.page, "awaiting-response");
  await mic.page.evaluate((midi) => {
    window.handleInput(midi, "麦克风");
    window.releaseGardenInput(midi, "麦克风");
  }, current.attempt.sequence[current.attempt.callIndex]);
  if (index < 4) await waitPhase(mic.page, ["correct-feedback", "target-playing", "awaiting-response"]);
}
await mic.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(mic.page);
record("Five real microphone-route calls complete played evidence but never stable or retained", current.learning.levels.LS05?.completions === 1 && current.learning.levels.LS05?.lastInputRoutes?.["麦克风"] === 5 && current.learning.levels.LS05?.lastExperimentalInput === true && current.learning.levels.LS05?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS05") && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS05"), current.learning.levels.LS05);
const micCalls = current.chapter3.ls05Attempts.at(-1)?.scoredCalls || [];
record("Every microphone call preserves its route, experimental flag and confidence", micCalls.length === 5 && micCalls.every((call) => hasRequiredCallFields(call) && call.firstInputRoute === "麦克风" && call.inputRoute === "麦克风" && call.hasExperimentalInput && call.experimentalInput && call.microphoneConfidence === "confirmed" && call.timingUsedForMastery === false), micCalls);
await mic.context.close();

const sound = await makePage();
await seed(sound.page);
await sound.page.locator("#mapParentGate").click();
await sound.page.locator("#parentSoundToggle").click();
await sound.page.locator("#parentClose").click();
await sound.page.locator("#gardenRestMarker").click();
current = await waitPhase(sound.page, "sound-paused");
const soundCall = current.attempt.callIndex;
const soundSeed = current.attempt.seed;
const soundSequence = current.attempt.sequence.join(",");
await press(sound.page, current.attempt.sequence[soundCall]);
current = await view(sound.page);
record("Sound disabled keeps the current call non-scoring", current.attempt.callIndex === soundCall && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 0 && current.attempt.earlyInputs.at(-1)?.phase === "sound-paused", current.attempt);
await sound.page.locator("#playParentGate").click();
await sound.page.locator("#parentSoundToggle").click();
await sound.page.locator("#parentClose").click();
await sound.page.locator("#listeningReplay").click();
current = await waitPhase(sound.page, "awaiting-response");
record("Sound recovery explicitly replays the same seeded call", current.attempt.seed === soundSeed && current.attempt.sequence.join(",") === soundSequence && current.attempt.callIndex === soundCall && current.attempt.scoredCalls.length === 0, current.attempt);
await sound.context.close();

const failedReplay = await makePage();
await seed(failedReplay.page);
await start(failedReplay.page);
current = await waitPhase(failedReplay.page, "awaiting-response");
await failedReplay.page.locator("#playParentGate").click();
await failedReplay.page.locator("#parentSoundToggle").click();
await failedReplay.page.locator("#parentClose").click();
await failedReplay.page.locator("#listeningReplay").click();
current = await waitPhase(failedReplay.page, "sound-paused");
record("A failed child replay does not consume the replay allowance", current.attempt.replayCountChild === 0 && current.attempt.callIndex === 0, current.attempt);
await failedReplay.page.locator("#playParentGate").click();
await failedReplay.page.locator("#parentSoundToggle").click();
await failedReplay.page.locator("#parentClose").click();
await failedReplay.page.locator("#listeningReplay").click();
current = await waitPhase(failedReplay.page, "awaiting-response");
record("The same replay counts only after target audio succeeds", current.attempt.replayCountChild === 1 && current.attempt.callIndex === 0, current.attempt);
await failedReplay.context.close();

const octave = await makePage();
await seed(octave.page);
await start(octave.page);
await waitPhase(octave.page, "awaiting-response");
await octave.page.evaluate(() => {
  window.handleInput(72, "MIDI");
  window.releaseGardenInput(72, "MIDI");
});
current = await waitPhase(octave.page, "wrong-known");
const octaveTrace = current.attempt.audioTrace.findLast((event) => event.kind === "child-input");
record("Wrong-octave MIDI replays its real C5 frequency and never counts as correct", octaveTrace?.midi === 72 && Math.abs(octaveTrace.frequency - 523.251) < 0.02 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 1, { octaveTrace, attempt: current.attempt });
await waitPhase(octave.page, "awaiting-response");
await octave.page.evaluate(() => {
  window.handleInput(72, "MIDI");
  window.releaseGardenInput(72, "MIDI");
});
current = await waitPhase(octave.page, "assisted-retry");
record("Repeated wrong-octave input enters candidate-outside strong repair instead of a one-card pair", current.attempt.callRepairStage === "candidate-outside" && current.attempt.callOutOfCandidateRepair === true && current.attempt.strongCueUsed === true && current.compare.replace(/\s+/g, "") === "CDE" && current.compareItems.length === 3 && current.attempt.callConfusionPair.includes(72), current);
await octave.context.close();

const blackKey = await makePage();
await seed(blackKey.page);
await start(blackKey.page);
await waitPhase(blackKey.page, "awaiting-response");
await blackKey.page.evaluate(() => {
  window.handleInput(61, "MIDI");
  window.releaseGardenInput(61, "MIDI");
});
await waitPhase(blackKey.page, "wrong-known");
await waitPhase(blackKey.page, "awaiting-response");
await blackKey.page.evaluate(() => {
  window.handleInput(61, "MIDI");
  window.releaseGardenInput(61, "MIDI");
});
current = await waitPhase(blackKey.page, "assisted-retry");
const blackTrace = current.attempt.audioTrace.slice(-2);
record("Repeated black-key input keeps real audio evidence and uses candidate-outside strong repair", current.attempt.callRepairStage === "candidate-outside" && current.attempt.callOutOfCandidateRepair === true && current.compareItems.length === 3 && current.targetNodeCount >= 1 && blackTrace[0]?.kind === "child-input" && blackTrace[0]?.midi === 61 && blackTrace[1]?.kind === "target-replay", current);
await blackKey.context.close();
await restartBrowser();

const visual = await makePage({ width: 1194, height: 834 });
await seed(visual.page);
await start(visual.page);
await waitPhase(visual.page, "awaiting-response");
current = await view(visual.page);
const visualTarget = current.attempt.sequence[0];
const visualWrong = visualTarget === 60 ? 62 : 60;
for (let index = 0; index < 3; index += 1) {
  await press(visual.page, visualWrong);
  await waitPhase(visual.page, index === 0 ? "wrong-known" : (index === 1 ? "pair-compare" : "assisted-retry"));
  if (index < 2) await waitPhase(visual.page, "awaiting-response");
}
await visual.page.waitForFunction(() => {
  const attempt = currentListeningAction("LS05")?.listeningAttempt;
  return attempt?.phase === "assisted-retry" && attempt.inputArmed === true &&
    Boolean(attempt.audioTransaction?.endedAt) && !state.teachingPlayback;
}, null, { timeout: 12000 });
await visual.page.locator("#ls05VisualAssist").click();
current = await waitPhase(visual.page, "visual-assist");
record("Visual assist is explicit, target-visible, and exits hidden-listening scoring", current.attempt.accessibilityVisualAssist && current.targetVisible === "true" && current.compare.includes(noteName(visualTarget)), current);
await visual.page.screenshot({ path: path.join(screenshotDir, "ls05_visual_assist_1194x834.png") });
const visualEvidence = { sessionId: current.active.sessionId, seed: current.attempt.seed, sequence: current.attempt.sequence.join(","), callIndex: current.attempt.callIndex, correctCount: current.attempt.correctCount, wrongCount: current.attempt.totalWrongCount };
await visual.page.locator("#mapReturn").click();
await visual.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 12000 });
await visual.page.locator("#gardenRestMarker").click();
current = await waitPhase(visual.page, "visual-assist");
record("Visual assist survives map pause without replay or evidence drift", current.active.sessionId === visualEvidence.sessionId && current.attempt.seed === visualEvidence.seed && current.attempt.sequence.join(",") === visualEvidence.sequence && current.attempt.callIndex === visualEvidence.callIndex && current.attempt.correctCount === visualEvidence.correctCount && current.attempt.totalWrongCount === visualEvidence.wrongCount && current.attempt.accessibilityVisualAssist && current.targetVisible === "true", current.attempt);
await visual.page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
await visual.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
current = await waitPhase(visual.page, "visual-assist");
record("Visual assist survives refresh as the same persistent visible model", current.active.sessionId === visualEvidence.sessionId && current.attempt.sequence.join(",") === visualEvidence.sequence && current.attempt.callIndex === visualEvidence.callIndex && current.attempt.accessibilityVisualAssist && current.targetVisible === "true" && current.attempt.scoredCalls.length === 0, current);
const visualFeedback = waitPhase(visual.page, "correct-feedback");
await press(visual.page, visualTarget);
current = await visualFeedback;
record("Visual-assist completion advances neutral story progress without adding listening correct or coverage", current.attempt.neutralProgress === 1 && current.attempt.correctCount === 0 && !Object.values(current.attempt.eligibleCoverage).some(Boolean) && current.attempt.scoredCalls[0]?.visualAssist === true && current.assistHidden, current.attempt);
record("Visual-assist call evidence is explicit and non-qualifying", hasRequiredCallFields(current.attempt.scoredCalls[0]) && current.attempt.scoredCalls[0].accessibilityVisualAssist === true && current.attempt.scoredCalls[0].qualifyingCorrect === false && current.attempt.scoredCalls[0].timingUsedForMastery === false, current.attempt.scoredCalls[0]);
await visual.page.screenshot({ path: path.join(screenshotDir, "ls05_visual_assist_feedback_1194x834.png") });
current = await waitPhase(visual.page, ["target-playing", "awaiting-response"]);
record("Visual-assist control stays hidden on the next normal hidden call", current.assistHidden && current.targetNodeCount === 0, current);
await completeRemaining(visual.page);
await visual.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(visual.page);
record("Visual-assist story completion is played and needs practice without stable or retained", current.chapter3.ls05Completed === true && current.chapter3.lessonEvidence.LS05?.accessibilityVisualAssist === true && current.learning.levels.LS05?.completions === 1 && current.learning.levels.LS05?.stableCompletions === 0 && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS05"), { evidence: current.chapter3.lessonEvidence.LS05, stored: current.learning.levels.LS05 });
await visual.context.close();

const midi = await makePage();
await seed(midi.page);
await start(midi.page);
await waitPhase(midi.page, "awaiting-response");
await midi.page.locator("#playParentGate").click();
await midi.page.locator("#parentMidiButton").click();
await midi.page.locator("#parentClose").click();
current = await view(midi.page);
const midiTarget = current.attempt.sequence[0];
await midi.page.evaluate((note) => window.__emitMidi(note), midiTarget);
await midi.page.evaluate((note) => window.__emitMidiOff(note), midiTarget);
current = await waitPhase(midi.page, ["correct-feedback", "target-playing", "awaiting-response"]);
record("MIDI note-on advances through the same LS05 evidence path", current.attempt.callIndex === 1 && current.attempt.inputRoutes.MIDI === 1 && current.attempt.childInputs[0]?.source === "MIDI", current.attempt);
await midi.context.close();

const volumeZero = await makePage();
await seed(volumeZero.page);
await volumeZero.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await volumeZero.page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
await volumeZero.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
await volumeZero.page.locator("#gardenRestMarker").click();
current = await waitPhase(volumeZero.page, "sound-paused");
await press(volumeZero.page, current.attempt.sequence[0]);
current = await view(volumeZero.page);
record("Volume zero keeps LS05 non-scoring on the same call", current.attempt.callIndex === 0 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 0, current.attempt);
await volumeZero.page.locator("#playParentGate").click();
await volumeZero.page.locator("#parentVolumeControl").fill("60");
await volumeZero.page.locator("#parentClose").click();
await volumeZero.page.locator("#listeningReplay").click();
current = await waitPhase(volumeZero.page, "awaiting-response");
record("Volume recovery replays the unchanged call", current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await volumeZero.context.close();

const failedAudio = await makePage(undefined, { failAudioContext: true });
await seed(failedAudio.page);
await failedAudio.page.locator("#gardenRestMarker").click();
current = await waitPhase(failedAudio.page, "sound-paused");
await failedAudio.page.evaluate((midiValue) => window.handleInput(midiValue, "屏幕"), current.attempt.sequence[0]);
current = await view(failedAudio.page);
record("AudioContext failure keeps LS05 recoverable without completion or evidence", current.attempt.callIndex === 0 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 0 && !current.chapter3.lessonEvidence.LS05 && !current.learning.levels.LS05, current);
await failedAudio.context.close();

function seedHash(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

await restartBrowser();
let dFirstSeed = "";
for (let index = 0; index < 3000; index += 1) {
  const candidate = `C3-04-pair-direction-${index}`;
  if (expectedSequence(candidate)[0] === 62) { dFirstSeed = candidate; break; }
}
const pairTargetPositions = [];
for (const wrongMidi of [60, 64]) {
  const pairDirection = await makePage();
  await seed(pairDirection.page, activeRuntimeForSeed(dFirstSeed));
  await start(pairDirection.page);
  await waitPhase(pairDirection.page, "awaiting-response");
  await press(pairDirection.page, wrongMidi);
  await waitPhase(pairDirection.page, "wrong-known");
  await waitPhase(pairDirection.page, "awaiting-response");
  await press(pairDirection.page, wrongMidi);
  current = await waitPhase(pairDirection.page, "pair-compare");
  const visibleNames = current.compareItems.map((item) => item.text[0]);
  pairTargetPositions.push(visibleNames.indexOf("D"));
  const equalStyle = current.compareItems.length === 2 && current.compareItems.every((item) => item.width === current.compareItems[0].width && item.height === current.compareItems[0].height && item.background === current.compareItems[0].background && item.color === current.compareItems[0].color && item.border === current.compareItems[0].border && !item.className);
  const trace = current.attempt.audioTrace.slice(-2);
  record(`Pair compare is neutral when child input ${wrongMidi < 62 ? "is below" : "is above"} target`, visibleNames.join("") === (wrongMidi < 62 ? "CD" : "DE") && equalStyle && current.compareAria.includes(`${visibleNames[0]} 和 ${visibleNames[1]}`) && trace[0]?.kind === "child-input" && trace[0]?.midi === wrongMidi && trace[1]?.kind === "target-replay" && trace[1]?.midi === 62, { visibleNames, compareItems: current.compareItems, compareAria: current.compareAria, trace });
  await pairDirection.context.close();
}
record("The correct D target is not fixed to one visual pair position", pairTargetPositions.sort().join(",") === "0,1", pairTargetPositions);

const identityLink = await makePage();
await seed(identityLink.page, activeRuntimeForSeed(dFirstSeed));
await start(identityLink.page);
await waitPhase(identityLink.page, "awaiting-response");
await press(identityLink.page, 62);
current = await waitPhase(identityLink.page, "correct-feedback");
record("Clean D feedback reconnects the scored letter to Re only in the dinosaur bubble", current.speech.includes("D 找到了") && current.speech.includes("唱作 Re") && !/Do|Re|Mi/.test(current.childText), { speech: current.speech, childText: current.childText });
current = await waitPhase(identityLink.page, "target-playing");
record("The old Re identity clears before the next hidden target", !/Do|Re|Mi|D 找到了/.test(current.speech) && !/Do|Re|Mi/.test(current.childText) && current.targetNodeCount === 0, current);
await identityLink.context.close();

const singletonSeen = new Set();
for (let singleton = 0; singleton < 3; singleton += 1) {
  let sessionId = "";
  for (let index = 0; index < 1000; index += 1) {
    const candidate = `C3-04-fixed-${singleton}-${index}`;
    if (seedHash(candidate) % 3 === singleton) { sessionId = candidate; break; }
  }
  const seededRuntime = activeRuntimeForSeed(sessionId);
  const seeded = await makePage();
  await seed(seeded.page, seededRuntime);
  await seeded.page.locator("#gardenRestMarker").click();
  current = await waitPhase(seeded.page, ["reference", "target-playing", "awaiting-response"]);
  const seededQuota = quota(current.attempt.sequence);
  singletonSeen.add(Number(Object.entries(seededQuota).find(([, count]) => count === 1)?.[0]));
  await seeded.context.close();
}
record("Three fixed session seeds rotate the singleton across C D and E", [60, 62, 64].every((midiValue) => singletonSeen.has(midiValue)), [...singletonSeen]);

const missingCoverage = await makePage();
await seed(missingCoverage.page);
await start(missingCoverage.page);
current = await waitPhase(missingCoverage.page, "awaiting-response");
const missingSequence = current.attempt.sequence;
const singletonMidi = Number(Object.entries(quota(missingSequence)).find(([, count]) => count === 1)?.[0]);
let missedSingleton = false;
while ((await view(missingCoverage.page)).attempt?.callIndex < 5) {
  current = await waitPhase(missingCoverage.page, "awaiting-response");
  const target = current.attempt.sequence[current.attempt.callIndex];
  const terminalCall = current.attempt.callIndex === current.attempt.sequence.length - 1;
  if (!missedSingleton && target === singletonMidi) {
    const miss = target === 60 ? 62 : 60;
    await press(missingCoverage.page, miss);
    await waitPhase(missingCoverage.page, "wrong-known");
    await waitPhase(missingCoverage.page, "awaiting-response");
    await press(missingCoverage.page, target);
    missedSingleton = true;
  } else {
    await press(missingCoverage.page, target);
  }
  if (terminalCall) {
    await waitPhase(missingCoverage.page, "complete");
    break;
  }
  await waitPhase(missingCoverage.page, ["correct-feedback", "target-playing", "awaiting-response"]);
}
await missingCoverage.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(missingCoverage.page);
record("A 4/5 round missing the singleton candidate coverage is played but not stable", current.chapter3.lessonEvidence.LS05?.correctCount === 4 && current.chapter3.lessonEvidence.LS05?.eligibleCoverage?.[noteName(singletonMidi)] === false && current.learning.levels.LS05?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS05"), { singletonMidi, evidence: current.chapter3.lessonEvidence.LS05, stored: current.learning.levels.LS05 });
await missingCoverage.context.close();

const replayLimit = await makePage();
await seed(replayLimit.page);
await start(replayLimit.page);
await waitPhase(replayLimit.page, "awaiting-response");
for (let replay = 0; replay < 2; replay += 1) {
  await replayLimit.page.locator("#listeningReplay").click();
  await waitPhase(replayLimit.page, "awaiting-response");
}
await completeRemaining(replayLimit.page);
await replayLimit.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(replayLimit.page);
record("More than one successful child replay completes played story but blocks stable", current.chapter3.lessonEvidence.LS05?.correctCount === 5 && current.learning.levels.LS05?.lastAttempt?.replayCountChild === 2 && current.learning.levels.LS05?.stableCompletions === 0, current.learning.levels.LS05);
await replayLimit.context.close();

record("LS05 runtime adds no unapproved media path", !fs.readFileSync(path.resolve("app.js"), "utf8").match(/concepts\/|audio\/|technical-preview/i));
record("Browser console remains clean", errors.length === 0, errors);

await browser.close();
const passed = checks.filter((check) => check.pass).length;
console.log(`chapter3 LS05 listening checks: ${passed}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
if (passed !== checks.length) {
  console.error(JSON.stringify(checks.filter((check) => !check.pass), null, 2));
  process.exitCode = 1;
}
