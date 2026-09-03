import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";
import { completeParentChallenge } from "./parental-challenge-helper.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter3_ls04_340a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const errors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function url(search = "?screen=map&check=ls04-340a") {
  const target = new URL(baseUrl);
  target.search = search;
  return target.toString();
}

function runtimeFixture() {
  return {
    version: 1,
    active: null,
    history: canonicalC1C2History({ completedAt: "2026-07-11T01:00:00.000Z", tag: "chapter3-ls04" }),
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
      ls04Attempts: []
    }
  };
}

function learningFixture() {
  return {
    version: 3,
    levels: { M07: { completions: 2, formalCompletions: 2, stableCompletions: 1, needsPractice: false } },
    notes: {},
    staff: {},
    retention: {
      stableEvents: [{ eventId: "sentinel-stable", skillKey: "level:M07", sessionId: "sentinel" }],
      retainedEvents: [{ eventId: "sentinel-retained", skillKey: "level:M07", sessionId: "sentinel-later" }],
      observationEvents: [],
      clockInvalidEvents: [],
      lastWallClockAt: null,
      lastWallClockSessionId: null
    }
  };
}

async function makePage(viewport = { width: 1024, height: 768 }, { failAudioContext = false } = {}) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ failAudioContext }) => {
    const input = { onmidimessage: null };
    const access = { inputs: new Map([["test-midi", input]]), onstatechange: null };
    navigator.requestMIDIAccess = async () => access;
    window.__emitMidi = (note, velocity = 100) => input.onmidimessage?.({ data: [0x90, note, velocity] });
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

async function seed(page) {
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.evaluate(({ runtime, learning }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learning));
  }, { runtime: runtimeFixture(), learning: learningFixture() });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const learning = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.listeningAttempt || null;
    const candidates = [...document.querySelectorAll(".listening-candidate")].map((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return { width: rect.width, height: rect.height, background: style.backgroundColor, border: style.borderColor, transform: style.transform };
    });
    const targetNodes = [...document.querySelectorAll("[data-target-note='true'], .white-key.target, .white-key.target-muted")];
    const visible = (element) => {
      if (!element || element.closest("[hidden]")) return false;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && box.width > 0 && box.height > 0;
    };
    const mapShell = document.querySelector("#mapShell");
    const mapMarkers = [...document.querySelectorAll(".map-node, #gardenRestMarker")];
    const visibleMarkers = mapMarkers.filter(visible);
    const parentText = ["#parentLearningFocus", "#parentLearningDetail", "#parentMasteryStatus", "#parentMasteryDetail", "#parentProgressText", "#parentEvidenceList"]
      .map((selector) => document.querySelector(selector)?.innerText || "").join(" ");
    return {
      version: document.querySelector("script[src*='app.js']")?.src || "",
      screen: document.body.className,
      marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      markerAria: document.querySelector("#gardenRestMarker")?.getAttribute("aria-label") || "",
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      mapProgress: document.querySelector("#mapStarCount")?.textContent || "",
      active: runtime.active || null,
      history: runtime.history || [],
      chapter3: runtime.chapter3 || {},
      attempt,
      learning,
      phase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
      targetNodeCount: targetNodes.length,
      targetAttrs: targetNodes.map((node) => ({ note: node.dataset.note, midi: node.dataset.midi, className: node.className })),
      candidates,
      replayAria: document.querySelector("#listeningReplay")?.getAttribute("aria-label") || "",
      replayRect: (() => { const rect = document.querySelector("#listeningReplay")?.getBoundingClientRect(); return rect ? { width: rect.width, height: rect.height } : null; })(),
      modalHidden: document.querySelector("#resultModal")?.hidden,
      parentFocus: document.querySelector("#parentLearningFocus")?.textContent || "",
      parentDetail: document.querySelector("#parentLearningDetail")?.textContent || "",
      parentMastery: document.querySelector("#parentMasteryStatus")?.textContent || "",
      parentMasteryDetail: document.querySelector("#parentMasteryDetail")?.textContent || "",
      parentProgress: document.querySelector("#parentProgressText")?.textContent || "",
      parentEvidence: document.querySelector("#parentEvidenceList")?.innerText?.replace(/\s+/g, " ").trim() || "",
      parentText,
      journey: {
        plan: childJourneyPlan(),
        courseDirector: mapShell?.dataset.courseDirector || "",
        state: mapShell?.dataset.journeyState || "",
        chapter: mapShell?.dataset.journeyChapter || "",
        bundle: mapShell?.dataset.journeyBundle || "",
        target: mapShell?.dataset.journeyTarget || "",
        visibleMarkerIds: visibleMarkers.map((marker) => marker.id),
        enabledMarkerIds: visibleMarkers.filter((marker) => !marker.disabled).map((marker) => marker.id),
        currentMarkerIds: visibleMarkers.filter((marker) => marker.hasAttribute("aria-current")).map((marker) => marker.id)
      },
      forbiddenControls: [...document.querySelectorAll("button")].filter((button) => {
        const rect = button.getBoundingClientRect();
        const style = getComputedStyle(button);
        return /下一关|继续|关闭/.test(button.textContent || "") && rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      }).map((button) => button.textContent.trim())
    };
  });
}

async function waitForPhase(page, phases, timeout = 5000) {
  const wanted = Array.isArray(phases) ? phases : [phases];
  await page.waitForFunction((values) => values.includes(document.querySelector("#gardenScene")?.dataset.listeningPhase), wanted, { timeout });
  return view(page);
}

async function press(page, midi) {
  await page.locator(`.white-key[data-midi="${midi}"]`).click();
}

async function startLs04(page) {
  await page.locator("#gardenRestMarker").click();
  await waitForPhase(page, ["reference", "target-playing", "awaiting-response"]);
}

const main = await makePage();
await seed(main.page);
let current = await view(main.page);
record("Legacy 339d completion resolves to the one canonical LS04-ready journey", current.journey.courseDirector === "true" && current.journey.state === "ready" && current.journey.chapter === "C3" && current.journey.bundle === "C3-03" && current.journey.target === "LS04" && current.journey.plan?.chapterId === "C3" && current.journey.plan?.bundleId === "C3-03" && current.journey.plan?.targetId === "LS04" && current.journey.plan?.state === "ready" && current.journey.plan?.sessionId === null && current.journey.plan?.resumeOfSessionId === null && current.journey.plan?.actionable === true && current.journey.visibleMarkerIds.join(",") === "gardenRestMarker" && current.journey.enabledMarkerIds.join(",") === "gardenRestMarker" && current.journey.currentMarkerIds.join(",") === "gardenRestMarker" && !current.active, current);
record("Migrated LS03 evidence does not fabricate LS04 completion", !current.chapter3.completed && !current.chapter3.lessonEvidence?.LS04, current.chapter3);

await startLs04(main.page);
current = await view(main.page);
record("Explicit map gesture creates one independent formal C3-03 session", current.active?.bundleId === "C3-03" && current.active.actions?.length === 1 && current.active.actions[0].targetId === "LS04", current.active);
const sequence = current.attempt?.sequence || [];
record("Seeded sequence has four calls with C4 and D4 exactly twice", sequence.length === 4 && sequence.filter((midi) => midi === 60).length === 2 && sequence.filter((midi) => midi === 62).length === 2, sequence);
record("Seeded sequence never has more than two identical adjacent calls", !sequence.some((midi, index) => index >= 2 && midi === sequence[index - 1] && midi === sequence[index - 2]), sequence);
record("Reference is truly started but remains unscored until its verified end", current.attempt?.referencePlayed === false && current.attempt?.scoredCalls?.length === 0 && current.attempt?.correctCount === 0 && current.attempt?.audioLifecycle?.some((event) => event.kind === "started" && event.context === "reference" && Boolean(event.startedAt)) && !current.attempt?.audioTransaction?.endedAt, current.attempt);
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_reference_1024x768.png") });

await waitForPhase(main.page, "target-playing");
current = await view(main.page);
const target = current.attempt.sequence[current.attempt.callIndex];
const wrong = target === 60 ? 62 : 60;
await press(main.page, wrong);
current = await view(main.page);
record("Input while the hidden target is playing is observation only", current.attempt.earlyInputs.length === 1 && current.attempt.totalWrongCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await waitForPhase(main.page, "awaiting-response");
current = await view(main.page);
record("Waiting DOM exposes no target-specific key class, data or glow", current.targetVisible === "false" && current.targetNodeCount === 0, current);
record("C/D story candidates remain visually identical before scoring", current.candidates.length === 2 && current.candidates[0].width === current.candidates[1].width && current.candidates[0].height === current.candidates[1].height && current.candidates[0].background === current.candidates[1].background && current.candidates[0].border === current.candidates[1].border, current.candidates);
record("Replay control is neutral and at least 44 CSS pixels", current.replayAria === "重听这个声音" && current.replayRect.width >= 44 && current.replayRect.height >= 44, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_waiting_1024x768.png") });

const refreshSequence = current.attempt.sequence.join(",");
const refreshSessionId = current.active.sessionId;
await main.page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await main.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
current = await view(main.page);
record("Refresh preserves the same session, seed and completed target response state without autoplay scoring", current.active?.sessionId === refreshSessionId && current.attempt?.sequence.join(",") === refreshSequence && current.attempt?.callIndex === 0 && current.phase === "awaiting-response" && current.attempt?.inputArmed === true && current.attempt?.scoredCalls?.length === 0, current);

await press(main.page, wrong);
await waitForPhase(main.page, "awaiting-response");
current = await view(main.page);
const trace = current.attempt.audioTrace;
const childTraceIndex = trace.findLastIndex((event) => event.kind === "child-input" && event.midi === wrong);
const repairTraceIndex = trace.findLastIndex((event) => event.kind === "target-replay" && event.midi === target);
record("First wrong records the child echo before the target-only repair", childTraceIndex >= 0 && repairTraceIndex > childTraceIndex, { trace, childTraceIndex, repairTraceIndex });
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_wrong_1024x768.png") });

const sessionId = current.active.sessionId;
const sequenceBeforePause = current.attempt.sequence.join(",");
await main.page.locator("#mapReturn").click();
current = await view(main.page);
record("Map pause keeps the same active C3-03 journey and current call", current.active?.sessionId === sessionId && current.attempt?.callIndex === 0 && current.attempt?.totalWrongCount === 1 && current.journey.courseDirector === "true" && current.journey.state === "active" && current.journey.chapter === "C3" && current.journey.bundle === "C3-03" && current.journey.target === "LS04" && current.journey.plan?.chapterId === "C3" && current.journey.plan?.bundleId === "C3-03" && current.journey.plan?.targetId === "LS04" && current.journey.plan?.state === "active" && current.journey.plan?.sessionId === sessionId && current.journey.plan?.resumeOfSessionId === current.active?.resumeOfSessionId && current.journey.plan?.actionable === true && current.journey.visibleMarkerIds.join(",") === "gardenRestMarker" && current.journey.enabledMarkerIds.join(",") === "gardenRestMarker" && current.journey.currentMarkerIds.join(",") === "gardenRestMarker", current);
await main.page.locator("#gardenRestMarker").click();
await waitForPhase(main.page, "awaiting-response");
current = await view(main.page);
record("Map re-entry preserves seed, wrong count and evidence", current.active.sessionId === sessionId && current.attempt.sequence.join(",") === sequenceBeforePause && current.attempt.totalWrongCount === 1 && current.attempt.childInputs.length === 1, current.attempt);

while ((await view(main.page)).attempt?.callIndex < 4) {
  current = await waitForPhase(main.page, ["awaiting-response", "assisted"]);
  const midi = current.attempt.sequence[current.attempt.callIndex];
  const finalCall = current.attempt.callIndex === current.attempt.sequence.length - 1;
  await press(main.page, midi);
  if (finalCall) {
    await waitForPhase(main.page, "complete");
    break;
  }
  await waitForPhase(main.page, "target-playing");
}
await waitForPhase(main.page, "complete");
const completedScene = await view(main.page);
record("Four calls finish with a world result and no modal or next controls", completedScene.phase === "complete" && completedScene.modalHidden && completedScene.forbiddenControls.length === 0, completedScene);
record("LS04 completion copy does not promise a day-long stop before the immediate LS05 route", !completedScene.speech.includes("今天先在花园歇一歇"), completedScene.speech);
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_complete_1024x768.png") });
await main.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 6000 });
current = await view(main.page);
const ls04Stable = current.learning.retention.stableEvents.filter((event) => event.skillKey === "level:LS04");
const ls04Retained = current.learning.retention.retainedEvents.filter((event) => event.skillKey === "level:LS04");
record("A 3/4 eligible round creates stable but never retained in the same session", ls04Stable.length === 1 && ls04Retained.length === 0 && current.learning.levels.LS04?.stableCompletions === 1, { stable: ls04Stable, retained: ls04Retained, stored: current.learning.levels.LS04 });
record("LS04 completion persists its own result without marking the whole chapter complete", current.chapter3.completed === false && current.chapter3.ls04Completed === true && current.chapter3.lessonEvidence?.LS04?.completedAt, current.chapter3);
record("Chapter 1/2 sentinel evidence remains intact", current.learning.levels.M07?.stableCompletions === 1 && current.learning.retention.retainedEvents.some((event) => event.eventId === "sentinel-retained"), current.learning);
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_complete_map_1024x768.png") });
await main.page.locator("#mapParentGate").click();
await completeParentChallenge(main.page);
current = await view(main.page);
record("Parent panel on the LS04 map rest uses C/D note names and real stable listening evidence", current.parentFocus.includes("C/D 小音组") && current.parentText.includes("C/D") && !/(^|[^A-Za-z])(Do|Re|Mi)(?=$|[^A-Za-z])/.test(current.parentText) && current.parentDetail.includes("不是绝对音感测试") && current.parentMastery === "本次减提示完成" && current.parentProgress === "C/D 找朋友 4/4" && current.parentEvidence.includes("本次减提示完成"), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls04_parent_stable_1024x768.png") });
await main.page.locator("#parentClose").click();
await main.context.close();

const assisted = await makePage({ width: 1194, height: 834 });
await seed(assisted.page);
await startLs04(assisted.page);
await waitForPhase(assisted.page, "awaiting-response");
for (let count = 0; count < 3; count += 1) {
  current = await view(assisted.page);
  const midi = current.attempt.sequence[current.attempt.callIndex] === 60 ? 62 : 60;
  await press(assisted.page, midi);
  await waitForPhase(assisted.page, count === 2 ? "assisted" : "awaiting-response");
}
current = await view(assisted.page);
record("Third wrong enters bounded strong assisted with a visible target cue", current.attempt.strongCueUsed && current.attempt.supportStage === "assisted" && current.targetVisible === "true" && current.targetNodeCount >= 1, current);
const fourthWrong = current.attempt.sequence[current.attempt.callIndex] === 60 ? 62 : 60;
await press(assisted.page, fourthWrong);
await assisted.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 5000 });
current = await view(assisted.page);
const modeledHistory = current.history.find((session) => session.bundleId === "C3-03");
record("Fourth wrong models only the current call and ends at a safe rest", modeledHistory?.endReason === "modeled-safe-rest" && modeledHistory.completedActions?.[0]?.modeled === true && modeledHistory.completedActions[0].scoredCalls.length === 1 && !current.chapter3.completed, modeledHistory);
record("Modeled input does not enter child routes or create stable/retained", !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS04") && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS04") && current.learning.levels.LS04?.needsPractice === true, current.learning.levels.LS04);
record("Modeled rest exposes one fresh LS04-ready route without an active session", !current.active && current.journey.courseDirector === "true" && current.journey.state === "ready" && current.journey.chapter === "C3" && current.journey.bundle === "C3-03" && current.journey.target === "LS04" && current.journey.plan?.chapterId === "C3" && current.journey.plan?.bundleId === "C3-03" && current.journey.plan?.targetId === "LS04" && current.journey.plan?.state === "ready" && current.journey.plan?.sessionId === null && current.journey.plan?.resumeOfSessionId === null && current.journey.plan?.actionable === true && current.journey.visibleMarkerIds.join(",") === "gardenRestMarker" && current.journey.enabledMarkerIds.join(",") === "gardenRestMarker" && current.journey.currentMarkerIds.join(",") === "gardenRestMarker", current);
await assisted.page.screenshot({ path: path.join(screenshotDir, "ls04_modeled_rest_1194x834.png") });
await assisted.page.locator("#mapParentGate").click();
await completeParentChallenge(assisted.page);
current = await view(assisted.page);
record("Modeled rest parent evidence stays played/needs-practice without stable", current.parentFocus.includes("C/D 小音组") && current.parentMastery === "在故事帮助下玩过" && current.parentMasteryDetail.includes("今天需要提示"), current);
await assisted.page.locator("#parentClose").click();
const endedModeledSessionId = modeledHistory.sessionId;
await assisted.page.locator("#gardenRestMarker").click();
await waitForPhase(assisted.page, ["reference", "target-playing"]);
current = await view(assisted.page);
record("New C3-03 after modeled rest has a fresh seed and no carried attempt evidence", current.active?.sessionId !== endedModeledSessionId && current.attempt?.callIndex === 0 && current.attempt?.totalWrongCount === 0 && current.attempt?.childInputs?.length === 0 && current.attempt?.scoredCalls?.length === 0, current.attempt);
await assisted.context.close();

const threshold = await makePage();
await seed(threshold.page);
await startLs04(threshold.page);
for (let index = 0; index < 4; index += 1) {
  current = await waitForPhase(threshold.page, "awaiting-response");
  const targetMidi = current.attempt.sequence[current.attempt.callIndex];
  if (index < 2) {
    await press(threshold.page, targetMidi === 60 ? 62 : 60);
    await waitForPhase(threshold.page, "awaiting-response");
  }
  await press(threshold.page, targetMidi);
  if (index < 3) await threshold.page.waitForTimeout(700);
}
await threshold.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 6000 });
current = await view(threshold.page);
record("A completed 2/4 round is played but does not create stable or retained", current.learning.levels.LS04?.completions === 1 && current.learning.levels.LS04?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS04") && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS04"), current.learning.levels.LS04);
await threshold.page.locator("#mapParentGate").click();
await completeParentChallenge(threshold.page);
current = await view(threshold.page);
record("A 2/4 parent summary shows played and today-needs-practice, not stable", current.parentMastery === "在故事帮助下玩过" && current.parentMasteryDetail.includes("今天需要提示") && current.parentEvidence.includes("今天需要提示"), current);
await threshold.context.close();

const timeout = await makePage();
await seed(timeout.page);
await startLs04(timeout.page);
await waitForPhase(timeout.page, "awaiting-response");
for (let count = 0; count < 3; count += 1) {
  current = await view(timeout.page);
  const wrongMidi = current.attempt.sequence[current.attempt.callIndex] === 60 ? 62 : 60;
  await press(timeout.page, wrongMidi);
  await waitForPhase(timeout.page, count === 2 ? "assisted" : "awaiting-response", 12000);
}
await timeout.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
current = await view(timeout.page);
const timeoutHistory = current.history.find((session) => session.bundleId === "C3-03");
record("Assisted timeout models only the current call and reaches safe rest", timeoutHistory?.endReason === "modeled-safe-rest" && timeoutHistory.completedActions?.[0]?.modeled && timeoutHistory.completedActions[0].scoredCalls.length === 1 && timeoutHistory.completedActions[0].scoredCalls[0].modeled, timeoutHistory);
await timeout.context.close();

const midi = await makePage();
await seed(midi.page);
await startLs04(midi.page);
await waitForPhase(midi.page, "awaiting-response");
await midi.page.evaluate(() => document.querySelector("#midiButton")?.click());
current = await view(midi.page);
await midi.page.evaluate((note) => window.__emitMidi(note), current.attempt.sequence[current.attempt.callIndex]);
await midi.page.waitForFunction(() => {
  const attempt = currentListeningAction("LS04")?.listeningAttempt;
  return attempt?.callIndex === 1 && attempt.childInputs?.length === 1 && Boolean(attempt.audioTransaction?.endedAt);
}, null, { timeout: 12000 });
current = await view(midi.page);
record("MIDI note-on advances one LS04 call only after its controlled child echo ends", current.attempt.callIndex === 1 && current.attempt.inputRoutes.MIDI === 1 && current.attempt.childInputs.length === 1 && current.attempt.audioTransaction?.context === "child-echo" && Boolean(current.attempt.audioTransaction?.endedAt), current.attempt);
await midi.context.close();

const microphone = await makePage();
await seed(microphone.page);
await startLs04(microphone.page);
for (let index = 0; index < 4; index += 1) {
  current = await waitForPhase(microphone.page, "awaiting-response");
  const targetMidi = current.attempt.sequence[current.attempt.callIndex];
  await microphone.page.evaluate((midi) => {
    window.handleInput(midi, "麦克风");
    window.releaseGardenInput(midi, "麦克风");
  }, targetMidi);
  if (index < 3) await waitForPhase(microphone.page, ["correct-feedback", "target-playing", "awaiting-response"]);
}
await microphone.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 6000 });
current = await view(microphone.page);
record("Four real microphone-route inputs can complete played story evidence", current.learning.levels.LS04?.completions === 1 && current.learning.levels.LS04?.lastInputRoutes?.麦克风 === 4 && current.learning.levels.LS04?.lastExperimentalInput === true, current.learning.levels.LS04);
record("Experimental microphone completion creates no LS04 stable or retained evidence", current.learning.levels.LS04?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS04") && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS04"), current.learning.retention);
await microphone.page.locator("#mapParentGate").click();
await completeParentChallenge(microphone.page);
current = await view(microphone.page);
record("Experimental microphone parent summary remains played/needs-practice without stable", current.parentMastery === "在故事帮助下玩过" && current.parentMasteryDetail.includes("今天需要提示"), current);
await microphone.context.close();

async function exerciseSilentRecovery({ volumeZero = false, failAudioContext = false } = {}) {
  const holder = await makePage({ width: 1024, height: 768 }, { failAudioContext });
  await seed(holder.page);
  if (!failAudioContext) {
    await holder.page.locator("#mapParentGate").click();
    await completeParentChallenge(holder.page);
    await holder.page.locator("#parentTabDevices").click();
    if (volumeZero) {
      await holder.page.locator("#parentVolumeControl").evaluate((input) => {
        input.value = "0";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    } else {
      await holder.page.locator("#parentSoundToggle").click();
    }
    await holder.page.locator("#parentClose").click();
  }
  await holder.page.locator("#gardenRestMarker").click();
  await waitForPhase(holder.page, "sound-paused");
  let silent = await view(holder.page);
  const sessionId = silent.active.sessionId;
  const sequence = silent.attempt.sequence.join(",");
  await press(holder.page, 60);
  silent = await view(holder.page);
  record(`${volumeZero ? "Volume zero" : failAudioContext ? "AudioContext failure" : "Sound disabled"} keeps LS04 non-scoring and recoverable`, silent.phase === "sound-paused" && silent.attempt.callIndex === 0 && silent.attempt.totalWrongCount === 0 && silent.attempt.correctCount === 0 && silent.attempt.earlyInputs.length === 1 && !silent.chapter3.lessonEvidence?.LS04, silent);
  if (!failAudioContext) {
    await holder.page.locator("#playParentGate").click();
    await completeParentChallenge(holder.page);
    await holder.page.locator("#parentTabDevices").click();
    if (volumeZero) {
      await holder.page.locator("#parentVolumeControl").evaluate((input) => {
        input.value = "60";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    } else {
      await holder.page.locator("#parentSoundToggle").click();
    }
    await holder.page.locator("#parentClose").click();
    await holder.page.locator("#listeningReplay").click();
    await waitForPhase(holder.page, "awaiting-response");
    const recovered = await view(holder.page);
    record(`${volumeZero ? "Volume" : "Sound"} recovery replays the same unscored call`, recovered.active.sessionId === sessionId && recovered.attempt.sequence.join(",") === sequence && recovered.attempt.callIndex === 0 && recovered.attempt.totalWrongCount === 0, recovered.attempt);
  }
  await holder.context.close();
}

await exerciseSilentRecovery();
await exerciseSilentRecovery({ volumeZero: true });
await exerciseSilentRecovery({ failAudioContext: true });

const source = fs.readFileSync(path.resolve("app.js"), "utf8");
record("LS04 runtime adds no unapproved media path", !/concepts\/|audio\/|technical-preview-v1/.test(source.split("function currentListeningAction", 2)[1]?.split("function completedTargetForAction", 1)[0] || ""), {});
record("Browser console remains clean", errors.length === 0, errors);

await browser.close();

const failed = checks.filter((check) => !check.pass);
console.log(`chapter3 LS04 listening checks: ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exit(1);
}
