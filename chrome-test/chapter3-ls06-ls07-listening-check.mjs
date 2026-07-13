import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter3_ls06_ls07_342a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const errors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function runtimeFixture({ ls06 = false, ls07 = false } = {}) {
  const completedAt = "2026-07-12T10:00:00.000Z";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05"].map((id) => [id, { completedAt }]));
  if (ls06) lessonEvidence.LS06 = { completedAt, stable: true };
  if (ls07) lessonEvidence.LS07 = { completedAt, stable: true };
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
      ls07Attempts: []
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

function url() {
  const target = new URL(baseUrl);
  target.search = "?screen=map&check=chapter3-ls06-ls07-342a";
  return target.toString();
}

async function makePage(viewport = { width: 1024, height: 768 }, { failAudioContext = false, sessionUuid = null } = {}) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ failAudioContext, sessionUuid }) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["paired-midi", input]]), onstatechange: null });
    window.__emitMidi = (note, velocity = 100) => input.onmidimessage?.({ data: [0x90, note, velocity] });
    if (sessionUuid) Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => sessionUuid });
    if (failAudioContext) {
      class FailedAudioContext { constructor() { throw new Error("simulated AudioContext failure"); } }
      window.AudioContext = FailedAudioContext;
      window.webkitAudioContext = FailedAudioContext;
    }
  }, { failAudioContext, sessionUuid });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(`${message.type()}: ${message.text()}`);
  });
  return { context, page };
}

async function seed(page, runtime = runtimeFixture(), learning = learningFixture()) {
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(({ runtimeValue, learningValue }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
  }, { runtimeValue: runtime, learningValue: learning });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const learning = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.listeningAttempt || null;
    const endpoints = [...document.querySelectorAll("#pairedListeningWorld .paired-listening-endpoint")].map((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return { className: node.className, note: node.getAttribute("data-note"), width: rect.width, height: rect.height, opacity: style.opacity, background: style.backgroundColor };
    });
    const targetNodes = [...document.querySelectorAll("#keyboard [data-target-note='true'], #keyboard .white-key.target, #keyboard .white-key.target-muted")];
    const keyboardKeys = [...document.querySelectorAll("#keyboard .white-key")].map((node) => {
      const style = getComputedStyle(node);
      const before = getComputedStyle(node, "::before");
      const after = getComputedStyle(node, "::after");
      return {
        midi: Number(node.dataset.midi),
        className: node.className,
        targetNote: node.getAttribute("data-target-note"),
        ariaLabel: node.getAttribute("aria-label") || "",
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
        boxShadow: style.boxShadow,
        targetColor: node.style.getPropertyValue("--target-color"),
        targetGlow: node.style.getPropertyValue("--target-glow"),
        targetSoft: node.style.getPropertyValue("--target-soft"),
        beforeContent: before.content,
        afterContent: after.content
      };
    });
    const childSurface = [document.querySelector("#nextAction"), document.querySelector("#heardStatus"), document.querySelector("#ls05Compare"), document.querySelector("#listeningCallProgress")]
      .filter(Boolean).map((node) => node.innerText || node.textContent || "").join(" ");
    return {
      runtime, learning, active: runtime.active, chapter3: runtime.chapter3 || {}, action, attempt,
      phase: document.querySelector("#gardenScene")?.dataset.listeningPhase || "",
      lesson: document.querySelector("#gardenScene")?.dataset.lesson || "",
      marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      mapProgress: document.querySelector("#mapStarCount")?.textContent || "",
      mapSessionDetail: document.querySelector("#mapSessionDetail")?.textContent?.replace(/\s+/g, " ").trim() || "",
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      childSurface,
      targetNodeCount: targetNodes.length,
      targetMidis: targetNodes.map((node) => Number(node.dataset.midi)).filter(Number.isFinite),
      keyboardKeys,
      compare: document.querySelector("#ls05Compare")?.innerText?.replace(/\s+/g, " ").trim() || "",
      compareItems: [...document.querySelectorAll("#ls05Compare > span")].map((node) => ({ text: node.textContent.trim(), className: node.className, rect: node.getBoundingClientRect().toJSON(), color: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor })),
      endpoints,
      assistHidden: document.querySelector("#ls05VisualAssist")?.hidden,
      replayDisabled: document.querySelector("#listeningReplay")?.disabled,
      modalHidden: document.querySelector("#resultModal")?.hidden,
      parentFocus: document.querySelector("#parentLearningFocus")?.textContent || "",
      parentDetail: document.querySelector("#parentLearningDetail")?.textContent || "",
      parentProgress: document.querySelector("#parentProgressText")?.textContent || "",
      parentMastery: document.querySelector("#parentMasteryStatus")?.textContent || ""
    };
  });
}

async function waitPhase(page, phases, timeout = 15000) {
  const wanted = Array.isArray(phases) ? phases : [phases];
  try {
    await page.waitForFunction((values) => values.includes(document.querySelector("#gardenScene")?.dataset.listeningPhase), wanted, { timeout });
  } catch (error) {
    throw new Error(`Timed out waiting for ${wanted.join("|")}: ${JSON.stringify(await view(page))}`, { cause: error });
  }
  return view(page);
}

async function start(page, levelId) {
  await page.locator("#gardenRestMarker").click();
  try {
    await page.waitForFunction((expected) => document.querySelector("#gardenScene")?.dataset.lesson === expected && document.querySelector("#gardenScene")?.dataset.listeningPhase === "visible-guide", levelId, { timeout: 10000 });
  } catch (error) {
    throw new Error(`Failed to start ${levelId}: ${JSON.stringify(await view(page))}; browserErrors=${JSON.stringify(errors)}`, { cause: error });
  }
  return view(page);
}

async function press(page, midi, source = "屏幕") {
  await page.evaluate(({ note, route }) => window.handleInput(note, route), { note: midi, route: source });
}

function hiddenKeyboardIsNeutral(snapshot, targetMidi, allowedWrongMidi = null) {
  const targetKey = snapshot.keyboardKeys.find((key) => key.midi === targetMidi);
  const hasDynamicClass = (key) => key.className.split(/\s+/).some((token) => token === "hit" || token.startsWith("hit-") || token === "wrong" || token === "correct" || token === "hint" || token === "target" || token === "target-muted" || token.startsWith("program-"));
  const forbiddenCarrier = snapshot.keyboardKeys.some((key) => key.targetNote === "true" || key.targetColor || key.targetGlow || key.targetSoft || /(?:^|\s)target(?:-muted)?(?:\s|$)/.test(key.className));
  const targetLooksDynamic = !targetKey || hasDynamicClass(targetKey);
  const unexpectedDynamic = snapshot.keyboardKeys.some((key) => hasDynamicClass(key) && key.midi !== allowedWrongMidi);
  return snapshot.targetNodeCount === 0 && !forbiddenCarrier && !targetLooksDynamic && !unexpectedDynamic;
}

function keyboardSignature(snapshot) {
  return snapshot.keyboardKeys.map(({ midi, className, targetNote, ariaLabel, borderColor, borderWidth, boxShadow, targetColor, targetGlow, targetSoft, beforeContent, afterContent }) => ({
    midi, className, targetNote, ariaLabel, borderColor, borderWidth, boxShadow, targetColor, targetGlow, targetSoft, beforeContent, afterContent
  }));
}

async function hiddenDirectionEvidence(levelId, targetMidi) {
  const candidates = levelId === "LS06" ? [60, 67] : [64, 65];
  const otherMidi = candidates.find((midi) => midi !== targetMidi);
  const fixture = levelId === "LS07" ? runtimeFixture({ ls06: true }) : runtimeFixture();
  const sessionUuids = {
    "LS06:60": "seed-0",
    "LS06:67": "seed-3",
    "LS07:64": "seed-1",
    "LS07:65": "seed-2"
  };
  const test = await makePage({ width: 1024, height: 768 }, { sessionUuid: sessionUuids[`${levelId}:${targetMidi}`] });
  await seed(test.page, fixture);
  await start(test.page, levelId);
  const seeded = await view(test.page);
  if (seeded.attempt.sequence[0] !== targetMidi) throw new Error(`Fixed seed did not produce ${levelId} target ${targetMidi}: ${seeded.attempt.sequence.join(",")}`);
  await completeGuide(test.page);
  const playing = await waitPhase(test.page, "target-playing");
  const waiting = await waitPhase(test.page, "awaiting-response");
  const waitingPixels = await test.page.locator("#keyboard").screenshot({ animations: "disabled" });
  await press(test.page, otherMidi);
  const wrong = await waitPhase(test.page, "wrong-known");
  await waitPhase(test.page, "awaiting-response");
  await press(test.page, otherMidi);
  const pair = await waitPhase(test.page, "pair-compare");
  await test.context.close();
  return { levelId, targetMidi, otherMidi, playing, waiting, wrong, pair, waitingPixels };
}

async function completeGuide(page, source = "屏幕") {
  for (let step = 0; step < 2; step += 1) {
    const snapshot = await view(page);
    const candidates = snapshot.attempt.levelId === "LS06" ? [60, 67] : [64, 65];
    const guideIndex = snapshot.attempt.guideIndex;
    await press(page, candidates[guideIndex], source);
    await page.waitForFunction(({ previousIndex, finalStep }) => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const attempt = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.listeningAttempt;
      return finalStep ? attempt?.guidePlayed === true : attempt?.guideIndex > previousIndex;
    }, { previousIndex: guideIndex, finalStep: step === 1 }, { timeout: 8000 });
  }
}

async function completeRemaining(page, source = "屏幕") {
  while (true) {
    const snapshot = await view(page);
    if (!snapshot.active || snapshot.attempt?.callIndex >= 4) return;
    const waiting = await waitPhase(page, ["awaiting-response", "assisted-retry", "visual-assist"]);
    await press(page, waiting.attempt.sequence[waiting.attempt.callIndex], source);
    const after = await view(page);
    if (!after.active || after.attempt?.callIndex >= 4) return;
    await waitPhase(page, ["correct-feedback", "target-playing", "awaiting-response"]);
  }
}

const main = await makePage({ width: 1366, height: 1024 });
await seed(main.page);
let current = await view(main.page);
record("LS05 completion exposes LS06 without creating C3-05", current.marker.includes("回声藤") && !current.markerDisabled && !current.active, current);
current = await start(main.page, "LS06");
record("Explicit map click creates the independent C3-05 session", current.active?.bundleId === "C3-05" && current.action?.targetId === "LS06", current.active);
record("LS06 first guide aligns story letter, solfege, action, endpoint, and keyboard", current.phase === "visible-guide" && current.speech.includes("回声石先带路") && current.speech.includes("这是 C") && current.speech.includes("我唱 Do") && current.speech.includes("琴键上的 C，按一下") && current.endpoints.map((item) => item.note).join("") === "CG" && current.targetMidis.join(",") === "60" && current.attempt.scoredCalls.length === 0 && !/不计题|隐藏|check|明确进入/i.test(`${current.speech} ${current.childSurface}`), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls06_guide_1366x1024.png") });
await press(main.page, 60);
await main.page.waitForFunction(() => {
  const active = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").active;
  return active?.actions?.[active.actionIndex || 0]?.listeningAttempt?.guideIndex === 1;
}, null, { timeout: 8000 });
current = await view(main.page);
record("LS06 second guide aligns G, Sol, and the unique G keyboard target", current.speech.includes("这是 G") && current.speech.includes("我唱 Sol") && current.speech.includes("琴键上的 G，按一下") && current.targetMidis.join(",") === "67" && !/不计题|隐藏|check|明确进入/i.test(`${current.speech} ${current.childSurface}`), current);
await press(main.page, 67);
await main.page.waitForFunction(() => {
  const active = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").active;
  return active?.actions?.[active.actionIndex || 0]?.listeningAttempt?.guidePlayed === true;
}, null, { timeout: 8000 });
current = await view(main.page);
record("LS06 guide requires two real child keys and never enters the check denominator", current.attempt.guideRuns.at(-1)?.completed === true && current.attempt.guideRuns.at(-1)?.evidence.length === 2 && current.attempt.guideRuns.at(-1)?.evidence.every((item) => item.phaseRole === "guide" && item.correct && item.sessionId === current.active.sessionId && item.timingUsedForMastery === false) && current.attempt.scoredCalls.length === 0, current.attempt.guideRuns);
const ls06Sequence = current.attempt.sequence.slice();
record("LS06 seed persists C and G exactly twice", ls06Sequence.filter((midi) => midi === 60).length === 2 && ls06Sequence.filter((midi) => midi === 67).length === 2, ls06Sequence);
current = await waitPhase(main.page, "target-playing");
const earlyBefore = { callIndex: current.attempt.callIndex, correct: current.attempt.correctCount, wrong: current.attempt.totalWrongCount, calls: current.attempt.scoredCalls.length };
await press(main.page, current.attempt.sequence[0]);
current = await view(main.page);
record("LS06 target-playing input is observation only", current.attempt.earlyInputs.length === 1 && current.attempt.callIndex === earlyBefore.callIndex && current.attempt.correctCount === earlyBefore.correct && current.attempt.totalWrongCount === earlyBefore.wrong && current.attempt.scoredCalls.length === earlyBefore.calls, current.attempt);
current = await waitPhase(main.page, "awaiting-response");
record("LS06 hidden wait keeps equal endpoints and no target carrier", current.targetNodeCount === 0 && current.endpoints.every((item) => !item.note && item.width === current.endpoints[0].width && item.height === current.endpoints[0].height && item.background === current.endpoints[0].background) && !/Do|Sol|Do\/C|Sol\/G/.test(current.childSurface), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls06_waiting_1366x1024.png") });
await completeRemaining(main.page);
await main.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(main.page);
record("LS06 completes at map rest without creating LS07", current.chapter3.lessonEvidence.LS06?.completedAt && current.chapter3.completed === false && !current.active && current.marker.includes("E/F") && !current.runtime.history.some((session) => session.bundleId === "C3-06"), current.chapter3);
record("LS06 map rest announces only the completed echo-vine stage", current.runtime.lastRest?.bundleId === "C3-05" && current.runtime.lastRest?.reward === "回声藤拱门" && current.runtime.lastRest?.reason === "natural-rest" && current.mapSessionDetail === "回声藤拱门已经搭好，边界花在等你。" && !current.mapSessionDetail.includes("边界花已经安顿好"), { detail: current.mapSessionDetail, lastRest: current.runtime.lastRest });
record("LS06 clean 4/4 creates stable and no retained", current.learning.levels.LS06?.stableCompletions === 1 && current.learning.retention.stableEvents.filter((event) => event.skillKey === "level:LS06").length === 1 && current.learning.retention.retainedEvents.filter((event) => event.skillKey === "level:LS06").length === 0, current.learning.levels.LS06);
await main.page.screenshot({ path: path.join(screenshotDir, "ls06_map_rest_1366x1024.png") });
await main.page.locator("#mapParentGate").click();
current = await view(main.page);
record("LS06 map-rest parent evidence remains focused on C/G", current.parentFocus.includes("C/G") && current.parentDetail.includes("声音首答 4/4") && current.parentDetail.includes("不是绝对音感") && current.parentProgress.includes("4/4"), current);
await main.page.locator("#parentClose").click();

current = await start(main.page, "LS07");
record("A second explicit map click creates independent C3-06", current.active?.bundleId === "C3-06" && current.action?.targetId === "LS07" && current.active.resumeOfSessionId === null, current.active);
record("LS07 first guide aligns E, Mi, two-black-key locator, and keyboard", current.phase === "visible-guide" && current.endpoints.map((item) => item.note).join("") === "EF" && current.targetMidis.join(",") === "64" && current.speech.includes("边界花先带路") && current.speech.includes("这是 E") && current.speech.includes("我唱 Mi") && current.speech.includes("两颗黑键右边的 E，按一下") && current.attempt.scoredCalls.length === 0 && !/不计题|隐藏|check|明确进入/i.test(`${current.speech} ${current.childSurface}`), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls07_guide_1366x1024.png") });
await press(main.page, 64);
await main.page.waitForFunction(() => {
  const active = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").active;
  return active?.actions?.[active.actionIndex || 0]?.listeningAttempt?.guideIndex === 1;
}, null, { timeout: 8000 });
current = await view(main.page);
record("LS07 second guide aligns F, Fa, three-black-key locator, and keyboard", current.speech.includes("这是 F") && current.speech.includes("我唱 Fa") && current.speech.includes("三颗黑键左边的 F，按一下") && current.targetMidis.join(",") === "65" && !/不计题|隐藏|check|明确进入/i.test(`${current.speech} ${current.childSurface}`), current);
await press(main.page, 65);
await main.page.waitForFunction(() => {
  const active = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").active;
  return active?.actions?.[active.actionIndex || 0]?.listeningAttempt?.guidePlayed === true;
}, null, { timeout: 8000 });
current = await waitPhase(main.page, "awaiting-response");
const firstTarget = current.attempt.sequence[0];
const wrong = firstTarget === 64 ? 65 : 64;
await press(main.page, wrong);
current = await waitPhase(main.page, "wrong-known");
record("LS07 first wrong preserves child sound then target", current.attempt.audioTrace.slice(-2)[0]?.kind === "child-input" && current.attempt.audioTrace.slice(-2)[1]?.kind === "target-replay", current.attempt.audioTrace.slice(-3));
await main.page.screenshot({ path: path.join(screenshotDir, "ls07_wrong_1366x1024.png") });
await waitPhase(main.page, "awaiting-response");
await press(main.page, firstTarget);
await completeRemaining(main.page);
await main.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(main.page);
record("LS07 3/4 first-response path creates stable after opening guide without hidden boundary help", current.chapter3.lessonEvidence.LS07?.correctCount === 3 && current.chapter3.lessonEvidence.LS07?.openingBoundaryGuideCompleted === true && current.chapter3.lessonEvidence.LS07?.postPromptBoundaryStrongHelpUsed === false && current.learning.levels.LS07?.stableCompletions === 1, current.chapter3.lessonEvidence.LS07);
record("LS07 completion exposes LS08 without creating C3-07", current.chapter3.completed === false && current.markerDisabled === false && current.marker.includes("两声根须") && !current.runtime.active && !current.runtime.history.some((session) => session.bundleId === "C3-07") && !current.chapter3.lessonEvidence.LS08 && current.chapter3.ls08Attempts.length === 0, current.chapter3);
record("LS07 map rest announces the boundary-flower result only after LS07", current.runtime.lastRest?.bundleId === "C3-06" && current.runtime.lastRest?.reward === "两株边界花" && current.runtime.lastRest?.reason === "natural-rest" && current.mapSessionDetail === "两株边界花已经安顿好，今天先歇一歇。", { detail: current.mapSessionDetail, lastRest: current.runtime.lastRest });
await main.page.screenshot({ path: path.join(screenshotDir, "ls07_map_rest_1366x1024.png") });
await main.page.locator("#mapParentGate").click();
current = await view(main.page);
record("LS07 parent evidence separates opening guide from post-prompt boundary help", current.parentFocus.includes("E/F") && current.parentDetail.includes("声音首答 3/4") && current.parentDetail.includes("可见边界带路 是") && current.parentDetail.includes("边界强帮助 无") && current.parentProgress.includes("4/4"), current);
await main.context.close();

const ls06HiddenC = await hiddenDirectionEvidence("LS06", 60);
const ls06HiddenG = await hiddenDirectionEvidence("LS06", 67);
const ls07HiddenE = await hiddenDirectionEvidence("LS07", 64);
const ls07HiddenF = await hiddenDirectionEvidence("LS07", 65);
for (const evidence of [ls06HiddenC, ls06HiddenG, ls07HiddenE, ls07HiddenF]) {
  record(`${evidence.levelId} hidden target ${evidence.targetMidi} has no keyboard carrier while playing`, hiddenKeyboardIsNeutral(evidence.playing, evidence.targetMidi), evidence.playing.keyboardKeys);
  record(`${evidence.levelId} hidden target ${evidence.targetMidi} has no keyboard carrier while waiting`, hiddenKeyboardIsNeutral(evidence.waiting, evidence.targetMidi), evidence.waiting.keyboardKeys);
  record(`${evidence.levelId} wrong-known shows only the child wrong key, never the target`, hiddenKeyboardIsNeutral(evidence.wrong, evidence.targetMidi, evidence.otherMidi), evidence.wrong.keyboardKeys);
  record(`${evidence.levelId} pair-compare keeps the target key neutral`, hiddenKeyboardIsNeutral(evidence.pair, evidence.targetMidi, evidence.otherMidi), evidence.pair.keyboardKeys);
}
record("LS06 opposite hidden targets keep identical keyboard DOM, ARIA, computed border, shadow, and pixels", JSON.stringify(keyboardSignature(ls06HiddenC.waiting)) === JSON.stringify(keyboardSignature(ls06HiddenG.waiting)) && ls06HiddenC.waitingPixels.equals(ls06HiddenG.waitingPixels), {
  c: keyboardSignature(ls06HiddenC.waiting), g: keyboardSignature(ls06HiddenG.waiting)
});
record("LS07 opposite hidden targets keep identical keyboard DOM, ARIA, computed border, shadow, and pixels", JSON.stringify(keyboardSignature(ls07HiddenE.waiting)) === JSON.stringify(keyboardSignature(ls07HiddenF.waiting)) && ls07HiddenE.waitingPixels.equals(ls07HiddenF.waitingPixels), {
  e: keyboardSignature(ls07HiddenE.waiting), f: keyboardSignature(ls07HiddenF.waiting)
});

const guideRest = await makePage();
await seed(guideRest.page);
current = await start(guideRest.page, "LS06");
const guideSessionId = current.active.sessionId;
await press(guideRest.page, 62);
current = await view(guideRest.page);
record("First guide wrong stays unscored and gives one soft equal-position repair", current.phase === "visible-guide" && current.attempt.guideRepairStage === "soft-replay" && current.attempt.guideEvidence.length === 1 && current.attempt.scoredCalls.length === 0 && current.endpoints.every((item) => item.note), current);
await press(guideRest.page, 62);
await guideRest.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(guideRest.page);
record("Second guide wrong ends at guide-rest without entering hidden check", !current.active && current.chapter3.resume?.nextTargetId === "LS06" && current.chapter3.resume?.reason === "guide-repeated-wrong" && current.chapter3.resume?.pairedAttempt?.scoredCalls?.length === 0 && current.chapter3.ls06PartialRest?.neutralProgress === 0, current.chapter3);
record("Guide rest keeps the current LS06 story without claiming completion", current.runtime.lastRest?.bundleId === "C3-05" && current.runtime.lastRest?.reward === "回声藤休息" && current.runtime.lastRest?.reason === "guide-rest" && current.mapSessionDetail.includes("回声藤先歇一歇") && !/已经搭好|已经安顿好/.test(current.mapSessionDetail), { detail: current.mapSessionDetail, lastRest: current.runtime.lastRest });
current = await start(guideRest.page, "LS06");
record("Guide-rest resume creates a new session and restarts the full guide", current.active.sessionId !== guideSessionId && current.active.resumeOfSessionId === guideSessionId && current.attempt.crossedSessionBoundary && current.attempt.guideIndex === 0 && current.attempt.guideEvidence.length === 0 && current.attempt.guideRuns[0]?.sessionId === guideSessionId, current);
await completeGuide(guideRest.page);
await waitPhase(guideRest.page, "awaiting-response");
await completeRemaining(guideRest.page);
await guideRest.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(guideRest.page);
record("Cross-session guide recovery can finish story but cannot combine into stable", current.chapter3.lessonEvidence.LS06?.completedAt && current.chapter3.lessonEvidence.LS06?.crossedSessionBoundary === true && current.learning.levels.LS06?.stableCompletions === 0, current.chapter3.lessonEvidence.LS06);
await guideRest.context.close();

const guideTimeout = await makePage();
await seed(guideTimeout.page);
await start(guideTimeout.page, "LS06");
await guideTimeout.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 18000 });
current = await view(guideTimeout.page);
record("Guide long wait rests before hidden check with truthful guide evidence", current.chapter3.resume?.reason === "guide-timeout" && current.chapter3.resume?.pairedAttempt?.scoredCalls?.length === 0 && current.learning.levels.LS06?.todayNeedsPractice === true, current);
await guideTimeout.context.close();

const repair = await makePage();
await seed(repair.page);
await start(repair.page, "LS06");
await completeGuide(repair.page);
current = await waitPhase(repair.page, "awaiting-response");
const repairTarget = current.attempt.sequence[0];
const repairWrong = repairTarget === 60 ? 67 : 60;
await press(repair.page, repairWrong);
await waitPhase(repair.page, "wrong-known");
await waitPhase(repair.page, "awaiting-response");
await press(repair.page, repairWrong);
current = await waitPhase(repair.page, "pair-compare");
record("LS06 second valid confusion shows an equal neutral pair", current.compare.includes("C") && current.compare.includes("G") && current.compareItems.length === 2 && current.compareItems.every((item) => item.rect.width === current.compareItems[0].rect.width && item.rect.height === current.compareItems[0].rect.height && item.color === current.compareItems[0].color && item.background === current.compareItems[0].background && !item.className), current.compareItems);
await repair.page.screenshot({ path: path.join(screenshotDir, "ls06_pair_1024x768.png") });
const pairEvidence = { sessionId: current.active.sessionId, sequence: current.attempt.sequence.join(","), callIndex: current.attempt.callIndex, wrongCount: current.attempt.callWrongCount, repairStage: current.attempt.callRepairStage, pair: current.attempt.callConfusionPair.join(",") };
await repair.page.locator("#mapReturn").click();
await repair.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
await repair.page.locator("#gardenRestMarker").click();
current = await waitPhase(repair.page, "pair-compare");
record("LS06 pair comparison survives map pause with the same session and evidence", current.active.sessionId === pairEvidence.sessionId && current.attempt.sequence.join(",") === pairEvidence.sequence && current.attempt.callIndex === pairEvidence.callIndex && current.attempt.callWrongCount === pairEvidence.wrongCount && current.attempt.callRepairStage === pairEvidence.repairStage && current.attempt.callConfusionPair.join(",") === pairEvidence.pair, current.attempt);
await waitPhase(repair.page, "awaiting-response");
await press(repair.page, repairWrong);
current = await waitPhase(repair.page, "assisted-retry");
record("LS06 third wrong enters bounded strong assistance", current.attempt.callRepairStage === "assisted" && current.attempt.strongCueUsed && current.compare.includes("C") && current.compare.includes("G"), current);
await repair.page.screenshot({ path: path.join(screenshotDir, "ls06_assisted_1024x768.png") });
await repair.context.close();

const outside = await makePage();
await seed(outside.page, runtimeFixture({ ls06: true }));
await start(outside.page, "LS07");
await completeGuide(outside.page);
await waitPhase(outside.page, "awaiting-response");
await press(outside.page, 61, "MIDI");
await waitPhase(outside.page, "wrong-known");
await waitPhase(outside.page, "awaiting-response");
await press(outside.page, 61, "MIDI");
current = await waitPhase(outside.page, "assisted-retry");
record("LS07 repeated black-key input uses candidate-outside repair instead of a one-card pair", current.attempt.callRepairStage === "candidate-outside" && current.attempt.callOutOfCandidateRepair && current.compareItems.length === 2, current);
await outside.context.close();

const octave = await makePage();
await seed(octave.page);
await start(octave.page, "LS06");
await completeGuide(octave.page);
await waitPhase(octave.page, "awaiting-response");
await press(octave.page, 72, "MIDI");
current = await waitPhase(octave.page, "wrong-known");
const octaveTrace = current.attempt.audioTrace.findLast((event) => event.kind === "child-input");
record("LS06 wrong-octave MIDI replays C5 frequency and never counts as correct", octaveTrace?.midi === 72 && Math.abs(octaveTrace.frequency - 523.251) < 0.02 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 1, { octaveTrace, attempt: current.attempt });
await octave.context.close();

const midi = await makePage();
await seed(midi.page);
await start(midi.page, "LS06");
await completeGuide(midi.page);
current = await waitPhase(midi.page, "awaiting-response");
const midiTarget = current.attempt.sequence[0];
await press(midi.page, midiTarget, "MIDI");
await midi.page.waitForFunction(() => {
  const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
  const active = runtime.active;
  return active?.actions?.[active.actionIndex || 0]?.listeningAttempt?.callIndex === 1;
}, null, { timeout: 8000 });
current = await view(midi.page);
record("Browser MIDI note-on uses the same formal evidence path", current.attempt.inputRoutes.MIDI === 1 && current.attempt.scoredCalls[0]?.inputRoute === "MIDI" && current.attempt.scoredCalls[0]?.qualifyingCorrect === true, current.attempt);
await midi.context.close();

const modeled = await makePage();
await seed(modeled.page);
await start(modeled.page, "LS06");
await completeGuide(modeled.page);
current = await waitPhase(modeled.page, "awaiting-response");
const modeledSessionId = current.active.sessionId;
const modeledSequence = current.attempt.sequence.join(",");
const modeledTarget = current.attempt.sequence[0];
const modeledWrong = modeledTarget === 60 ? 67 : 60;
for (let wrongIndex = 0; wrongIndex < 4; wrongIndex += 1) {
  await press(modeled.page, modeledWrong);
  if (wrongIndex === 0) await waitPhase(modeled.page, "wrong-known");
  if (wrongIndex === 1) await waitPhase(modeled.page, "pair-compare");
  if (wrongIndex === 2) await waitPhase(modeled.page, "assisted-retry");
  if (wrongIndex < 2) await waitPhase(modeled.page, "awaiting-response");
}
current = await waitPhase(modeled.page, "modeled-playing");
record("LS06 modeled-playing is non-interactive and hides replay and visual assist", current.replayDisabled && current.assistHidden && current.attempt.pendingModeled?.callIndex === 0, current);
await modeled.page.locator("#mapReturn").click();
await modeled.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(modeled.page);
record("LS06 fourth wrong models one call and ends at safe rest", current.runtime.history.at(-1)?.endReason === "modeled-safe-rest" && current.chapter3.resume?.nextTargetId === "LS06" && current.chapter3.resume?.pairedAttempt?.callIndex === 1 && current.chapter3.resume?.pairedAttempt?.neutralProgress === 1 && current.chapter3.resume?.pairedAttempt?.modeledInputs?.length === 1 && current.chapter3.resume?.pairedAttempt?.sequence.join(",") === modeledSequence, current.chapter3.resume);
record("Modeled safe rest keeps the current LS06 story without claiming completion", current.runtime.lastRest?.bundleId === "C3-05" && current.runtime.lastRest?.reward === "回声藤休息" && current.runtime.lastRest?.reason === "modeled-safe-rest" && current.mapSessionDetail.includes("回声藤先歇一歇") && !/已经搭好|已经安顿好/.test(current.mapSessionDetail), { detail: current.mapSessionDetail, lastRest: current.runtime.lastRest });
await modeled.page.locator("#gardenRestMarker").click();
current = await waitPhase(modeled.page, "visible-guide");
record("LS06 modeled resume creates a new session and repeats the full unscored guide", current.active.sessionId !== modeledSessionId && current.active.resumeOfSessionId === modeledSessionId && current.attempt.crossedSessionBoundary && current.attempt.callIndex === 1 && current.attempt.neutralProgress === 1 && current.attempt.guideIndex === 0 && current.attempt.guideEvidence.length === 0, current);
await modeled.context.close();

const visual = await makePage();
await seed(visual.page, runtimeFixture({ ls06: true }));
await start(visual.page, "LS07");
await completeGuide(visual.page);
current = await waitPhase(visual.page, "awaiting-response");
const visualTarget = current.attempt.sequence[0];
const visualWrong = visualTarget === 64 ? 65 : 64;
for (let wrongIndex = 0; wrongIndex < 3; wrongIndex += 1) {
  await press(visual.page, visualWrong);
  await waitPhase(visual.page, wrongIndex === 0 ? "wrong-known" : (wrongIndex === 1 ? "pair-compare" : "assisted-retry"));
  if (wrongIndex < 2) await waitPhase(visual.page, "awaiting-response");
}
await visual.page.locator("#ls05VisualAssist").click();
current = await waitPhase(visual.page, "visual-assist");
const visualEvidence = { sessionId: current.active.sessionId, sequence: current.attempt.sequence.join(","), callIndex: current.attempt.callIndex, wrongCount: current.attempt.totalWrongCount };
await visual.page.locator("#mapReturn").click();
await visual.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 8000 });
await visual.page.locator("#gardenRestMarker").click();
current = await waitPhase(visual.page, "visual-assist");
record("LS07 visual assist survives map pause as the same persistent model", current.active.sessionId === visualEvidence.sessionId && current.attempt.sequence.join(",") === visualEvidence.sequence && current.attempt.callIndex === visualEvidence.callIndex && current.attempt.totalWrongCount === visualEvidence.wrongCount && current.attempt.accessibilityVisualAssist && current.targetMidis.join(",") === String(visualTarget), current);
await visual.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await visual.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(visual.page, "visual-assist");
record("LS07 visual assist survives refresh without evidence drift", current.active.sessionId === visualEvidence.sessionId && current.attempt.sequence.join(",") === visualEvidence.sequence && current.attempt.callIndex === visualEvidence.callIndex && current.attempt.accessibilityVisualAssist && current.attempt.scoredCalls.length === 0, current.attempt);
await visual.page.locator(`#keyboard .white-key[data-midi="${visualTarget}"]`).click();
await completeRemaining(visual.page);
await visual.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(visual.page);
record("LS07 visual assist completes played story but cannot grant stable or retained", current.learning.levels.LS07?.completions === 1 && current.learning.levels.LS07?.stableCompletions === 0 && current.chapter3.lessonEvidence.LS07?.accessibilityVisualAssist === true && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS07"), current.learning.levels.LS07);
await visual.context.close();

const sound = await makePage();
await seed(sound.page);
await sound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 })));
await sound.page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
await sound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
await sound.page.locator("#gardenRestMarker").click();
current = await waitPhase(sound.page, "sound-paused");
await press(sound.page, 60);
current = await view(sound.page);
record("LS06 sound disabled keeps guide and check non-scoring", current.attempt.callIndex === 0 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await sound.page.screenshot({ path: path.join(screenshotDir, "ls06_sound_paused_1024x768.png") });
await sound.context.close();

const zeroVolume = await makePage();
await seed(zeroVolume.page);
await zeroVolume.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await zeroVolume.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await zeroVolume.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await zeroVolume.page.locator("#gardenRestMarker").click();
current = await waitPhase(zeroVolume.page, "sound-paused");
record("LS06 volume zero enters sound-paused without guide or scored evidence", current.attempt.guideEvidence.length === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.correctCount === 0 && current.attempt.totalWrongCount === 0, current.attempt);
await zeroVolume.context.close();

const failedAudio = await makePage(undefined, { failAudioContext: true });
await seed(failedAudio.page);
await failedAudio.page.locator("#gardenRestMarker").click();
current = await waitPhase(failedAudio.page, "sound-paused");
record("LS06 AudioContext failure remains recoverable without scoring or completion", current.attempt.guideEvidence.length === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.callIndex === 0 && !current.chapter3.lessonEvidence.LS06, current);
await failedAudio.context.close();

const mic = await makePage();
await seed(mic.page, runtimeFixture({ ls06: true }));
await start(mic.page, "LS07");
await completeGuide(mic.page);
await waitPhase(mic.page, "awaiting-response");
await completeRemaining(mic.page, "麦克风");
await mic.page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout: 10000 });
current = await view(mic.page);
record("LS07 microphone can complete played story but never stable or retained", current.learning.levels.LS07?.completions === 1 && current.learning.levels.LS07?.stableCompletions === 0 && current.learning.levels.LS07?.lastExperimentalInput === true && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS07"), current.learning.levels.LS07);
record("Every LS07 microphone call stores experimental evidence and timing is never mastery", current.chapter3.ls07Attempts.at(-1)?.scoredCalls?.every((call) => call.experimentalInput && call.inputRoute === "麦克风" && call.timingUsedForMastery === false), current.chapter3.ls07Attempts.at(-1));
await mic.context.close();

record("Runtime adds no unapproved media path", !fs.readFileSync(path.resolve("app.js"), "utf8").match(/concepts\/|audio\/|technical-preview/i));
record("Browser console remains clean", errors.length === 0, errors);

await browser.close();
const failed = checks.filter((check) => !check.pass);
console.log(`chapter3 LS06/LS07 listening checks: ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exitCode = 1;
}
