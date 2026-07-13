import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter3_ls08_343a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const errors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function fixture({ ls07 = true, guideStreak = 0, remediation = false } = {}) {
  const completedAt = "2026-07-13T08:00:00.000Z";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05", "LS06"].map((id) => [id, { completedAt, stable: true }]));
  if (ls07) lessonEvidence.LS07 = { completedAt, stable: true };
  return {
    version: 1,
    active: null,
    history: [
      { sessionId: "C2-03-entry", bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] },
      { sessionId: "C3-06-done", bundleId: "C3-06", status: "ended", completedActions: [{ actionId: "LS07-listening", targetId: "LS07" }] }
    ],
    lastRest: { sessionId: "C3-06-done", bundleId: "C3-06", reward: "两株边界花", reason: "natural-rest", endedAt: completedAt, localDateKey: "2026-07-13" },
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK", equipmentState: "safe-open", airCheckComplete: true,
      leaves: [true, true, true], lessonEvidence, resume: null, ls03QualifiedInputs: 2,
      completed: false, visibleSliceCompleted: true, ls04Completed: true, ls05Completed: true,
      ls06Completed: true, ls07Completed: ls07, ls08Completed: false,
      ls05PartialRest: null, ls06PartialRest: null, ls07PartialRest: null, ls08PartialRest: null,
      ls08GuideDifficultyStreak: guideStreak, ls08RemediationRequired: remediation,
      ls04Attempts: [], ls05Attempts: [], ls06Attempts: [], ls07Attempts: [], ls08Attempts: []
    }
  };
}

function learningFixture() {
  return { version: 3, levels: {}, notes: {}, staff: {}, retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [], lastWallClockAt: null, lastWallClockSessionId: null } };
}

function url() {
  const value = new URL(baseUrl);
  value.search = "?screen=map&check=chapter3-ls08-343a";
  return value.toString();
}

async function makePage(viewport = { width: 1024, height: 768 }, { failAudioContext = false, sessionUuid = null } = {}) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ failAudioContext, sessionUuid }) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["ls08-midi", input]]), onstatechange: null });
    window.__emitMidi = (status, note, velocity) => input.onmidimessage?.({ data: [status, note, velocity] });
    if (sessionUuid) Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => sessionUuid });
    if (failAudioContext) {
      class FailedAudioContext { constructor() { throw new Error("simulated AudioContext failure"); } }
      window.AudioContext = FailedAudioContext;
      window.webkitAudioContext = FailedAudioContext;
    }
  }, { failAudioContext, sessionUuid });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (["error", "warning"].includes(message.type())) errors.push(`${message.type()}: ${message.text()}`); });
  return { context, page };
}

async function seed(page, runtime = fixture()) {
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(({ runtimeValue, learningValue }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
  }, { runtimeValue: runtime, learningValue: learningFixture() });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
}

async function view(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const learning = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const attempt = action?.listeningAttempt || null;
    const slots = [...document.querySelectorAll("#pairedListeningWorld .paired-listening-endpoint")].map((node) => ({ note: node.getAttribute("data-note"), className: node.className, aria: node.getAttribute("aria-label") || "" }));
    const keyboard = [...document.querySelectorAll("#keyboard .white-key")].map((key) => ({ midi: Number(key.dataset.midi), className: key.className, target: key.getAttribute("data-target-note"), aria: key.getAttribute("aria-label") || "", style: key.getAttribute("style") || "" }));
    const childText = ["#nextAction", "#heardStatus", "#ls05Compare", "#listeningCallProgress", "#pairedListeningWorld"].map((selector) => document.querySelector(selector)?.innerText || "").join(" ");
    const token = /(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/;
    const visible = (node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return !node.hidden && style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const childLeaks = [...document.querySelectorAll("#gardenPanel *")]
      .filter((node) => visible(node) && !node.closest("#gardenSpeech") && !node.closest("#parentModal"))
      .flatMap((node) => [node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE ? node.textContent.trim() : "", node.getAttribute("aria-label") || "", node.getAttribute("title") || "", node.getAttribute("alt") || ""])
      .filter((value) => value && token.test(value));
    return {
      runtime, learning, action, attempt,
      phase: document.body.classList.contains("screen-map") ? "map" : (document.querySelector("#gardenScene")?.dataset.listeningPhase || ""),
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      mapDetail: document.querySelector("#mapSessionDetail")?.textContent?.trim() || "",
      slots, keyboard, childText, childLeaks,
      compare: document.querySelector("#ls05Compare")?.innerText?.replace(/\s+/g, " ").trim() || "",
      compareAria: document.querySelector("#ls05Compare")?.getAttribute("aria-label") || "",
      compareItems: [...document.querySelectorAll("#ls05Compare > span")].map((node) => ({ text: node.textContent.trim(), className: node.className, color: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })),
      replayDisabled: document.querySelector("#listeningReplay")?.disabled,
      assistHidden: document.querySelector("#ls05VisualAssist")?.hidden,
      modalHidden: document.querySelector("#resultModal")?.hidden,
      parentFocus: document.querySelector("#parentLearningFocus")?.textContent || "",
      parentDetail: document.querySelector("#parentLearningDetail")?.textContent || "",
      parentProgress: document.querySelector("#parentProgressText")?.textContent || ""
    };
  });
}

async function waitPhase(page, names, timeout = 16000) {
  const expected = Array.isArray(names) ? names : [names];
  try {
    await page.waitForFunction((phases) => phases.includes(document.body.classList.contains("screen-map") ? "map" : (document.querySelector("#gardenScene")?.dataset.listeningPhase || "")), expected, { timeout });
  } catch (error) {
    throw new Error(`Timed out waiting for ${expected.join("|")}: ${JSON.stringify(await view(page))}`, { cause: error });
  }
  return view(page);
}

async function start(page) {
  await page.locator("#gardenRestMarker").click();
  return waitPhase(page, ["guide-first", "guide-second"]);
}

async function onset(page, midi, route = "屏幕") {
  await page.evaluate(({ note, source }) => window.handleInput(note, source), { note: midi, source: route });
}

async function release(page, midi, route = "屏幕") {
  await page.evaluate(({ note, source }) => window.releaseGardenInput(note, source), { note: midi, source: route });
}

async function discrete(page, midi, route = "屏幕") {
  await onset(page, midi, route);
  await release(page, midi, route);
}

async function waitGuideAwaiting(page) {
  await page.waitForFunction(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0];
    const attempt = action?.listeningAttempt;
    return ["guide-first", "guide-second"].includes(attempt?.phase) && attempt.guideAudioPlaying === false;
  }, null, { timeout: 16000 });
  return view(page);
}

async function waitAssistAvailable(page) {
  await page.waitForFunction(() => {
    const button = document.querySelector("#ls05VisualAssist");
    return button && !button.hidden;
  }, null, { timeout: 16000 });
  return view(page);
}

async function answerGuideStep(page, midi, route = "屏幕") {
  await waitGuideAwaiting(page);
  await discrete(page, midi, route);
}

async function completeGuide(page, route = "屏幕") {
  for (const midi of [60, 62]) {
    const current = await view(page);
    await answerGuideStep(page, midi, route);
    if (current.attempt.guideIndex === 0) await waitPhase(page, "guide-second");
  }
  return waitPhase(page, "pair-playing");
}

async function answerPair(page, pair, route = "屏幕") {
  await waitPhase(page, "awaiting-first");
  await discrete(page, pair[0], route);
  await waitPhase(page, "awaiting-second");
  await discrete(page, pair[1], route);
}

async function completeClean(page, route = "屏幕") {
  while (true) {
    const current = await view(page);
    if (["complete-roots", "unscored-low-echo", "map"].includes(current.phase)) return current;
    if (current.phase === "pair-playing") await waitPhase(page, "awaiting-first");
    const ready = await view(page);
    if (ready.phase === "awaiting-first") await answerPair(page, ready.attempt.sequence[ready.attempt.pairIndex], route);
    await page.waitForTimeout(40);
  }
}

async function reachLowEcho(page) {
  await start(page);
  await completeGuide(page);
  await completeClean(page);
  await waitPhase(page, "complete-roots");
  return waitPhase(page, "unscored-low-echo");
}

async function reachDirectModeled(page) {
  await start(page);
  await completeGuide(page);
  let current = await waitPhase(page, "awaiting-first");
  const target = current.attempt.sequence[0];
  const wrong = [target[0] === 60 ? 62 : 60, target[1]];
  for (let round = 1; round <= 3; round += 1) {
    await answerPair(page, wrong);
    await waitPhase(page, round === 1 ? "wrong-first" : (round === 2 ? "pair-compare" : "assisted"));
    if (round < 3) await waitPhase(page, "awaiting-first");
  }
  await waitAssistAvailable(page);
  return waitPhase(page, "modeled-playing", 10000);
}

const locked = await makePage();
await seed(locked.page, fixture({ ls07: false }));
let current = await view(locked.page);
record("LS08 stays locked before LS07 completion", !current.runtime.active && !current.marker.includes("两声根须"), current);
await locked.context.close();

const main = await makePage({ width: 1366, height: 1024 }, { sessionUuid: "ls08-main-seed" });
await seed(main.page);
current = await view(main.page);
record("Map render does not create C3-07 or write LS08 evidence", !current.runtime.active && !current.runtime.chapter3.lessonEvidence.LS08 && current.marker.includes("两声根须"), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_map_entry_1366x1024.png") });
current = await start(main.page);
record("Explicit map click creates the only C3-07 session", current.runtime.active?.bundleId === "C3-07" && current.action?.targetId === "LS08", current.runtime.active);
record("First guide exposes only C with dinosaur Do mapping and no scored pair", current.phase === "guide-first" && current.slots.map((slot) => slot.note).join("") === "CD" && current.speech.includes("这是 C") && current.speech.includes("Do") && current.attempt.scoredPairs.length === 0, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_guide_first_1366x1024.png") });
await waitGuideAwaiting(main.page);
await main.page.locator("#listeningReplay").click();
await waitGuideAwaiting(main.page);
current = await view(main.page);
record("Guide C can be replayed after its real playback window without entering the check denominator", current.attempt.guideReplayCount === 1 && current.attempt.scoredPairs.length === 0 && current.attempt.guideIndex === 0, current.attempt);
await answerGuideStep(main.page, 60);
current = await waitPhase(main.page, "guide-second");
record("Second guide exposes D with dinosaur Re mapping", current.speech.includes("这是 D") && current.speech.includes("Re") && current.attempt.scoredPairs.length === 0, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_guide_second_1366x1024.png") });
await waitGuideAwaiting(main.page);
await main.page.locator("#listeningReplay").click();
await waitGuideAwaiting(main.page);
current = await view(main.page);
record("Guide D has its own unscored replay after the note finishes", current.attempt.guideReplayCount === 2 && current.attempt.scoredPairs.length === 0 && current.attempt.guideIndex === 1, current.attempt);
await answerGuideStep(main.page, 62);
current = await waitPhase(main.page, "pair-playing");
record("Guide evidence is separate and check enters only once", current.attempt.guideRuns.length === 1 && current.attempt.guideRuns[0].evidence.length === 2 && current.attempt.checkEntered && current.attempt.scoredPairs.length === 0, current.attempt);
record("Four seeded pairs contain C-D, E-D, C-C and D-E exactly once", current.attempt.sequence.map((pair) => pair.join("-")).sort().join(",") === ["60-60", "60-62", "62-64", "64-62"].sort().join(","), current.attempt.sequence);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_pair_playing_1366x1024.png") });
const beforeEarly = { pairIndex: current.attempt.pairIndex, inputs: current.attempt.pairInputs.length, calls: current.attempt.scoredPairs.length };
await onset(main.page, current.attempt.sequence[0][0]);
current = await view(main.page);
record("Pair-playing input is observation only", current.attempt.observations.length === 1 && current.attempt.pairIndex === beforeEarly.pairIndex && current.attempt.pairInputs.length === beforeEarly.inputs && current.attempt.scoredPairs.length === beforeEarly.calls, current.attempt);
current = await waitPhase(main.page, "awaiting-first");
record("Hidden pair wait has two neutral empty slots and no target keyboard carrier", current.slots.every((slot) => !slot.note) && current.keyboard.every((key) => !key.target && !/(?:^|\s)target(?:\s|$)/.test(key.className)) && !/Do|Re|Mi/.test(current.childText), current);
record("Non-dinosaur child text and ARIA remain letter-only during hidden check", current.childLeaks.length === 0 && current.keyboard.every((key) => !/(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/.test(key.aria)), { leaks: current.childLeaks, keyboard: current.keyboard });
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_awaiting_first_1366x1024.png") });
const firstPair = current.attempt.sequence[0];
await discrete(main.page, firstPair[0]);
current = await waitPhase(main.page, "awaiting-second");
record("Awaiting-second shows only the child's first input fact", current.slots[0].note === ({ 60: "C", 62: "D", 64: "E" }[firstPair[0]]) && !current.slots[1].note && current.attempt.pairInputs.length === 1, current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_awaiting_second_1366x1024.png") });
await discrete(main.page, firstPair[1]);
await completeClean(main.page);
current = await waitPhase(main.page, "complete-roots");
record("Four pairs complete neutral roots without a result modal", current.attempt.neutralProgress === 4 && current.attempt.scoredPairs.length === 4 && current.modalHidden && current.keyboard.every((key) => !key.target && !/(?:^|\s)target(?:\s|$)/.test(key.className)), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_complete_roots_1366x1024.png") });
current = await waitPhase(main.page, "unscored-low-echo");
record("Final C4 to C3 echo is an unscored story event with no low-key teaching", current.attempt.storyEvents.length === 1 && current.attempt.storyEvents[0].phaseRole === "unscored" && current.attempt.storyEvents[0].midis.join(",") === "60,48" && !/C3|低音|低 Do/.test(`${current.childText} ${current.speech}`), current);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_unscored_low_echo_1366x1024.png") });
await waitPhase(main.page, "map", 10000);
current = await view(main.page);
record("LS08 completes Chapter 3 and rests without starting Chapter 4", current.runtime.chapter3.completed === true && current.runtime.chapter3.lessonEvidence.LS08?.completed && !current.runtime.active && current.markerDisabled && !JSON.stringify(current.runtime).includes("LP01"), current.runtime.chapter3);
record("Clean 4/4 creates stable but not retained", current.learning.levels.LS08?.stableCompletions === 1 && current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LS08") && !current.learning.retention.retainedEvents.some((event) => event.skillKey === "level:LS08"), current.learning);
await main.page.screenshot({ path: path.join(screenshotDir, "ls08_map_rest_1366x1024.png") });
await main.page.locator("#mapParentGate").click();
current = await view(main.page);
record("Parent evidence names two-sound order memory without rhythm or low-note claims", current.parentFocus.includes("两个声音的先后记忆") && current.parentDetail.includes("首次完整回答 4/4") && !/节奏能力|速度能力|低音能力|绝对音感能力/.test(current.parentDetail) && current.parentProgress.includes("4/4"), current);
await main.context.close();

const guideMapLifecycle = await makePage();
await seed(guideMapLifecycle.page);
await start(guideMapLifecycle.page);
await guideMapLifecycle.page.locator("#mapReturn").click();
current = await view(guideMapLifecycle.page);
record("Map request during a guide note waits for the note to end", current.phase === "guide-first" && current.attempt.guideAudioPlaying && current.attempt.guideReturnQueued && current.attempt.guideEvidence.length === 0, current.attempt);
await waitPhase(guideMapLifecycle.page, "map");
await guideMapLifecycle.page.locator("#gardenRestMarker").click();
current = await waitGuideAwaiting(guideMapLifecycle.page);
record("Guide map resume returns to the ended guide step without replay or evidence duplication", current.attempt.guideAwaitingInput && current.attempt.audioTrace.filter((event) => event.kind === "guide-note").length === 1 && current.attempt.guideEvidence.length === 0, current.attempt);
await guideMapLifecycle.context.close();

const guideRefreshLifecycle = await makePage();
await seed(guideRefreshLifecycle.page);
await start(guideRefreshLifecycle.page);
await guideRefreshLifecycle.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await guideRefreshLifecycle.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(guideRefreshLifecycle.page, "sound-paused");
record("Refresh during a guide note pauses that guide transaction without accepting input", current.attempt.soundPauseContext === "guide" && current.attempt.guideEvidence.length === 0 && current.attempt.guideAudioPlaying === false, current.attempt);
await guideRefreshLifecycle.page.locator("#listeningReplay").click();
current = await waitGuideAwaiting(guideRefreshLifecycle.page);
record("Explicit guide recovery ends the same step without counting a child replay", current.attempt.guideReplayCount === 0 && current.attempt.guideEvidence.length === 0 && current.attempt.audioTrace.filter((event) => event.kind === "guide-note").length === 2, current.attempt);
await guideRefreshLifecycle.context.close();

const guideRepairRefreshLifecycle = await makePage();
await seed(guideRepairRefreshLifecycle.page);
await start(guideRepairRefreshLifecycle.page);
await answerGuideStep(guideRepairRefreshLifecycle.page, 64);
await guideRepairRefreshLifecycle.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await guideRepairRefreshLifecycle.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(guideRepairRefreshLifecycle.page, "sound-paused");
record("Refresh during guide soft repair preserves one wrong guide record and pauses the same audio transaction", current.attempt.soundPauseContext === "guide-repair" && current.attempt.guideEvidence.length === 1 && current.attempt.guideWrongCount === 1 && current.attempt.pendingGuideWrongMidi === 64, current.attempt);
await guideRepairRefreshLifecycle.page.locator("#listeningReplay").click();
current = await waitGuideAwaiting(guideRepairRefreshLifecycle.page);
record("Explicit guide soft-repair recovery ends without duplicating guide evidence", current.attempt.guideEvidence.length === 1 && current.attempt.guideWrongCount === 1 && current.attempt.guideRepairStage === "soft-replay" && current.attempt.audioTrace.filter((event) => event.kind === "guide-replay").length === 2, current.attempt);
await guideRepairRefreshLifecycle.context.close();

const pairMapLifecycle = await makePage();
await seed(pairMapLifecycle.page);
await start(pairMapLifecycle.page);
await completeGuide(pairMapLifecycle.page);
current = await waitPhase(pairMapLifecycle.page, "pair-playing");
await pairMapLifecycle.page.locator("#mapReturn").click();
current = await view(pairMapLifecycle.page);
record("Map request during a target pair stays queued until both notes end", current.phase === "pair-playing" && current.attempt.pairAudioPlaying && current.attempt.pairReturnQueued && current.attempt.scoredPairs.length === 0, current.attempt);
await waitPhase(pairMapLifecycle.page, "map");
await pairMapLifecycle.page.locator("#gardenRestMarker").click();
current = await waitPhase(pairMapLifecycle.page, "awaiting-first");
record("Target-pair map resume opens input only after the original pair ended", current.attempt.audioTrace.filter((event) => event.kind === "target-pair").length === 1 && current.attempt.replayCountSystem === 0 && current.attempt.scoredPairs.length === 0, current.attempt);
await pairMapLifecycle.context.close();

const pairRefreshLifecycle = await makePage();
await seed(pairRefreshLifecycle.page);
await start(pairRefreshLifecycle.page);
await completeGuide(pairRefreshLifecycle.page);
await waitPhase(pairRefreshLifecycle.page, "pair-playing");
await pairRefreshLifecycle.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await pairRefreshLifecycle.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(pairRefreshLifecycle.page, "sound-paused");
record("Refresh during a target pair requires explicit recovery before any response", current.attempt.soundPauseContext === "pair" && current.attempt.pairIndex === 0 && current.attempt.pairInputs.length === 0 && current.attempt.scoredPairs.length === 0, current.attempt);
await pairRefreshLifecycle.page.locator("#listeningReplay").click();
current = await waitPhase(pairRefreshLifecycle.page, "awaiting-first");
record("Recovered target pair ends once before scoring opens and records one successful system recovery", current.attempt.audioTrace.filter((event) => event.kind === "target-pair").length === 2 && current.attempt.replayCountSystem === 1 && current.attempt.scoredPairs.length === 0, current.attempt);
await pairRefreshLifecycle.context.close();

async function reachSamePair(route) {
  const test = await makePage({ width: 1024, height: 768 }, { sessionUuid: `ls08-${route}-seed` });
  await seed(test.page);
  await start(test.page);
  await completeGuide(test.page, route);
  while (true) {
    const snapshot = await waitPhase(test.page, "awaiting-first");
    const pair = snapshot.attempt.sequence[snapshot.attempt.pairIndex];
    if (pair[0] === pair[1]) return { ...test, pair };
    await answerPair(test.page, pair, route);
    await waitPhase(test.page, "pair-playing");
  }
}

for (const route of ["屏幕", "MIDI", "麦克风"]) {
  const same = await reachSamePair(route);
  await onset(same.page, 60, route);
  await onset(same.page, 60, route);
  current = await view(same.page);
  record(`C-C ${route} repeat without release cannot fill the second slot`, current.attempt.pairInputs.length === 1 && current.attempt.observations.some((item) => item.reason === "not-rearmed"), current.attempt);
  await release(same.page, route === "麦克风" ? null : 60, route);
  await onset(same.page, 60, route);
  current = await view(same.page);
  record(`C-C ${route} accepts a second discrete onset only after release/rearm`, current.attempt.scoredPairs.at(-1)?.targetMidis.join(",") === "60,60" && current.attempt.scoredPairs.at(-1)?.discreteOnsets.join(",") === "true,true", current.attempt.scoredPairs.at(-1));
  await same.context.close();
}

for (const route of ["屏幕", "MIDI", "麦克风"]) {
  const repair = await makePage();
  await seed(repair.page);
  await start(repair.page);
  await completeGuide(repair.page, route);
  current = await waitPhase(repair.page, "awaiting-first");
  const target = current.attempt.sequence[0];
  const wrongSecond = [60, 62, 64].find((midi) => midi !== target[1]);
  await onset(repair.page, target[0], route);
  await release(repair.page, target[0], route);
  await waitPhase(repair.page, "awaiting-second");
  await onset(repair.page, wrongSecond, route);
  await waitPhase(repair.page, "wrong-second");
  current = await waitPhase(repair.page, "awaiting-second");
  record(`Wrong-second ${route} repair does not forge rearm`, current.attempt.pairInputs.join(",") === String(target[0]) && current.attempt.secondOnsetRequiresFreshRearm && current.attempt.routeArmed[route] === false, current.attempt);
  await onset(repair.page, target[1], route);
  current = await view(repair.page);
  record(`Wrong-second ${route} repeated onset before release cannot complete repair`, current.attempt.pairInputs.length === 1 && current.attempt.scoredPairs.length === 0, current.attempt);
  await release(repair.page, route === "麦克风" ? null : wrongSecond, route);
  await onset(repair.page, target[1], route);
  current = await view(repair.page);
  record(`Wrong-second ${route} accepts a new onset only after real release or quiet rearm`, current.attempt.scoredPairs.length === 1 && current.attempt.scoredPairs[0].qualifyingCorrect === false, current.attempt.scoredPairs[0]);
  await repair.context.close();
}

const micRelease = await makePage();
await seed(micRelease.page);
await start(micRelease.page);
await completeGuide(micRelease.page);
current = await waitPhase(micRelease.page, "awaiting-first");
const micPair = current.attempt.sequence[0];
for (let index = 0; index < 5; index += 1) await release(micRelease.page, null, "麦克风");
current = await view(micRelease.page);
record("Repeated microphone quiet before any onset creates no release evidence", current.attempt.pairInputEvents.filter((event) => event.event === "release-rearm" && event.route === "麦克风").length === 0, current.attempt.pairInputEvents);
await onset(micRelease.page, micPair[0], "麦克风");
for (let index = 0; index < 5; index += 1) await release(micRelease.page, null, "麦克风");
current = await view(micRelease.page);
record("One microphone onset followed by continuous quiet records exactly one rearm transition", current.attempt.pairInputEvents.filter((event) => event.event === "release-rearm" && event.route === "麦克风").length === 1 && current.attempt.routeArmed["麦克风"] === true, current.attempt.pairInputEvents);
await micRelease.context.close();

for (const outsideMidi of [61, 72]) {
  const outside = await makePage();
  await seed(outside.page);
  await start(outside.page);
  await completeGuide(outside.page);
  await waitPhase(outside.page, "awaiting-first");
  await answerPair(outside.page, [outsideMidi, outsideMidi], "MIDI");
  await waitPhase(outside.page, "awaiting-first");
  await answerPair(outside.page, [outsideMidi, outsideMidi], "MIDI");
  await waitPhase(outside.page, "assisted");
  current = await waitAssistAvailable(outside.page);
  record(`Candidate-outside ${outsideMidi} enters strong repair without collapsing to a visible target pair`, current.attempt.pairRepairStage === "candidate-outside" && current.attempt.strongCueUsed && current.attempt.pairWrongCount === 2 && current.compareItems.map((item) => item.text).join("") === "CDE" && current.compareAria.includes("C") && current.slots.every((slot) => !slot.note) && current.keyboard.every((key) => !key.target && !/(?:^|\s)target(?:\s|$)/.test(key.className)), current);
  await outside.context.close();
}

for (const [label, confusion, expectedTargetIndex] of [
  ["lower-to-target", [60, 62], 1],
  ["higher-to-target", [64, 62], 0]
]) {
  const neutralPair = await makePage({ width: 1024, height: 768 }, { sessionUuid: "pair-order-3" });
  await seed(neutralPair.page);
  await start(neutralPair.page);
  await completeGuide(neutralPair.page);
  current = await waitPhase(neutralPair.page, "awaiting-first");
  const neutralTarget = current.attempt.sequence[0];
  await answerPair(neutralPair.page, confusion);
  await waitPhase(neutralPair.page, "awaiting-first");
  await answerPair(neutralPair.page, confusion);
  current = await waitPhase(neutralPair.page, "pair-compare");
  const targetText = neutralTarget.map((midi) => ({ 60: "C", 62: "D", 64: "E" })[midi]).join(" · ");
  const targetIndex = current.compareItems.findIndex((item) => item.text === targetText);
  record(`Role-neutral pair comparison ${label} does not encode the target in a fixed position`, targetIndex === expectedTargetIndex && current.compareItems.length === 2 && current.compareItems[0].className === current.compareItems[1].className && current.compareItems[0].color === current.compareItems[1].color && current.compareItems[0].background === current.compareItems[1].background && current.compareAria.includes("同等"), current);
  await neutralPair.context.close();
}

const pointerActivation = await makePage();
await seed(pointerActivation.page);
await start(pointerActivation.page);
await completeGuide(pointerActivation.page);
current = await waitPhase(pointerActivation.page, "awaiting-first");
const pointerPair = current.attempt.sequence[0];
let pointerKey = pointerActivation.page.locator(`#keyboard .white-key[data-midi="${pointerPair[0]}"]`);
let box = await pointerKey.boundingBox();
await pointerActivation.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await pointerActivation.page.mouse.down();
await pointerActivation.page.mouse.up();
current = await waitPhase(pointerActivation.page, "awaiting-second");
record("A real pointer down/up/click sequence submits one onset and one child-key sound", current.attempt.pairInputs.length === 1 && current.attempt.pairInputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.pairInputEvents.filter((event) => event.event === "release-rearm").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "pointer").length === 1, current.attempt);
pointerKey = pointerActivation.page.locator(`#keyboard .white-key[data-midi="${pointerPair[1]}"]`);
box = await pointerKey.boundingBox();
await pointerActivation.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await pointerActivation.page.mouse.down();
await pointerActivation.page.mouse.up();
current = await view(pointerActivation.page);
record("A second independent pointer activation completes only the intended two-onset response", current.attempt.scoredPairs.length === 1 && current.attempt.scoredPairs[0].discreteOnsets.length === 2, current.attempt.scoredPairs[0]);
await pointerActivation.context.close();

const multiPointerActivation = await makePage();
await seed(multiPointerActivation.page);
await start(multiPointerActivation.page);
await completeGuide(multiPointerActivation.page);
current = await waitPhase(multiPointerActivation.page, "awaiting-first");
const multiPair = current.attempt.sequence[0];
await multiPointerActivation.page.evaluate(({ firstMidi, secondMidi }) => {
  const first = document.querySelector(`#keyboard .white-key[data-midi="${firstMidi}"]`);
  const second = document.querySelector(`#keyboard .white-key[data-midi="${secondMidi}"]`);
  first.setPointerCapture = () => {};
  second.setPointerCapture = () => {};
  first.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 11, pointerType: "touch" }));
  second.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 12, pointerType: "touch" }));
  first.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 11, pointerType: "touch" }));
  first.click();
  second.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 12, pointerType: "touch" }));
  second.click();
}, { firstMidi: multiPair[0], secondMidi: multiPair[1] === multiPair[0] ? 62 : multiPair[1] });
current = await view(multiPointerActivation.page);
record("Two near-simultaneous pointer sequences use per-key suppression and cannot synthesize a second onset", current.attempt.pairInputs.length === 1 && current.attempt.pairInputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.observations.some((item) => item.reason === "not-rearmed"), current.attempt);
await multiPointerActivation.context.close();

const accessibleActivation = await reachSamePair("屏幕");
let cKey = accessibleActivation.page.locator('#keyboard .white-key[data-midi="60"]');
await cKey.focus();
await cKey.press("Enter");
current = await waitPhase(accessibleActivation.page, "awaiting-second");
record("Keyboard or assistive activation creates one onset, rearm, and child-key sound without a pointer", current.attempt.pairInputs.length === 1 && current.attempt.pairInputEvents.filter((event) => event.event === "onset").length >= 1 && current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "accessible-click").length === 1 && current.keyboard.find((key) => key.midi === 60)?.aria === "C，两黑键左边", current);
cKey = accessibleActivation.page.locator('#keyboard .white-key[data-midi="60"]');
await cKey.focus();
await cKey.press("Space");
current = await view(accessibleActivation.page);
record("Two independent accessible activations can complete C-C but one activation cannot fill both slots", current.attempt.scoredPairs.at(-1)?.targetMidis.join(",") === "60,60" && current.attempt.scoredPairs.at(-1)?.discreteOnsets.join(",") === "true,true", current.attempt.scoredPairs.at(-1));
await accessibleActivation.context.close();

const directClickActivation = await reachSamePair("屏幕");
await directClickActivation.page.evaluate(() => document.querySelector('#keyboard .white-key[data-midi="60"]')?.click());
current = await waitPhase(directClickActivation.page, "awaiting-second");
record("A direct accessibility click without pointer events fills one C-C slot with one child-key sound", current.attempt.pairInputs.join(",") === "60" && current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "accessible-click").length === 1 && current.attempt.scoredPairs.at(-1)?.targetMidis.join(",") !== "60,60", current.attempt);
await directClickActivation.page.evaluate(() => document.querySelector('#keyboard .white-key[data-midi="60"]')?.click());
current = await view(directClickActivation.page);
record("A second direct accessibility click completes C-C as a separate onset", current.attempt.scoredPairs.at(-1)?.targetMidis.join(",") === "60,60" && current.attempt.scoredPairs.at(-1)?.discreteOnsets.join(",") === "true,true", current.attempt.scoredPairs.at(-1));
await directClickActivation.context.close();

const restore = await makePage();
await seed(restore.page);
await start(restore.page);
await completeGuide(restore.page);
current = await waitPhase(restore.page, "awaiting-first");
const restorePair = current.attempt.sequence[0];
await onset(restore.page, restorePair[0]);
const restoreEvidence = { sessionId: current.runtime.active.sessionId, sequence: current.attempt.sequence.map((pair) => pair.join("-")).join(","), pairIndex: current.attempt.pairIndex };
await restore.page.locator("#mapReturn").click();
await waitPhase(restore.page, "map");
await restore.page.locator("#gardenRestMarker").click();
current = await waitPhase(restore.page, "awaiting-second");
record("Map pause preserves first input but requires a fresh rearm", current.runtime.active.sessionId === restoreEvidence.sessionId && current.attempt.sequence.map((pair) => pair.join("-")).join(",") === restoreEvidence.sequence && current.attempt.pairIndex === restoreEvidence.pairIndex && current.attempt.pairInputs.length === 1 && current.attempt.secondOnsetRequiresFreshRearm && Object.values(current.attempt.routeArmed).every((armed) => armed === false), current.attempt);
await onset(restore.page, restorePair[1]);
current = await view(restore.page);
record("First post-map onset only rearms and does not complete the pair", current.attempt.pairInputs.length === 1 && current.attempt.scoredPairs.length === 0, current.attempt);
await release(restore.page, restorePair[1]);
await discrete(restore.page, restorePair[1]);
current = await view(restore.page);
record("Fresh post-map release then onset completes the preserved pair", current.attempt.scoredPairs.length === 1, current.attempt.scoredPairs);
await restore.context.close();

const guideRest = await makePage();
await seed(guideRest.page, fixture());
await start(guideRest.page);
await answerGuideStep(guideRest.page, 64);
current = await view(guideRest.page);
record("First guide wrong stays unscored and enters soft replay", current.attempt.guideRepairStage === "soft-replay" && current.attempt.scoredPairs.length === 0, current.attempt);
const guideChildTrace = current.attempt.audioTrace.findLast((event) => event.kind === "guide-child");
const guideTargetTrace = current.attempt.audioTrace.findLast((event) => event.kind === "guide-replay");
record("Guide repair schedules the child note before the model note with no overlap", guideChildTrace?.scheduledDelaysMs?.[0] === 0 && guideTargetTrace?.scheduledDelaysMs?.[0] >= 680, { guideChildTrace, guideTargetTrace });
await guideRest.page.screenshot({ path: path.join(screenshotDir, "ls08_guide_soft_replay_1024x768.png") });
await answerGuideStep(guideRest.page, 64);
await waitPhase(guideRest.page, "map", 10000);
current = await view(guideRest.page);
record("First difficult guide rests without opening hidden check", current.runtime.chapter3.ls08GuideDifficultyStreak === 1 && !current.runtime.chapter3.ls08RemediationRequired && current.runtime.chapter3.ls08Attempts.at(-1)?.scoredPairs.length === 0, current.runtime.chapter3);
await guideRest.page.locator("#gardenRestMarker").click();
await waitPhase(guideRest.page, "guide-first");
await answerGuideStep(guideRest.page, 64);
await answerGuideStep(guideRest.page, 64);
await waitPhase(guideRest.page, "map", 10000);
current = await view(guideRest.page);
record("Second consecutive difficult guide schedules C-D single-note remediation", current.runtime.chapter3.ls08RemediationRequired && current.runtime.chapter3.resume?.nextTargetId === "LS08" && current.runtime.chapter3.ls08Attempts.at(-1)?.scoredPairs.length === 0, current.runtime.chapter3);
await guideRest.page.locator("#gardenRestMarker").click();
current = await waitPhase(guideRest.page, "guide-first");
record("Remediation session binds the scheduler flag into the resumed attempt", current.attempt.remediationGuide === true && current.attempt.guideMode === "short" && current.attempt.checkEntered === false, current.attempt);
await answerGuideStep(guideRest.page, 60);
await waitPhase(guideRest.page, "guide-second");
await answerGuideStep(guideRest.page, 62);
await waitPhase(guideRest.page, "map", 10000);
current = await view(guideRest.page);
record("Successful remediation guide ends at rest with zero check pairs", current.runtime.chapter3.ls08RemediationRequired === false && current.runtime.chapter3.ls08Attempts.at(-1)?.scoredPairs.length === 0 && current.runtime.chapter3.ls08Attempts.at(-1)?.guideRuns.at(-1)?.remediationGuide === true && !current.runtime.chapter3.ls08Attempts.at(-1)?.guideRuns.at(-1)?.checkEntered, current.runtime.chapter3.ls08Attempts.at(-1));
await guideRest.page.locator("#gardenRestMarker").click();
current = await waitPhase(guideRest.page, "guide-first");
await answerGuideStep(guideRest.page, 60);
await waitPhase(guideRest.page, "guide-second");
await answerGuideStep(guideRest.page, 62);
current = await waitPhase(guideRest.page, "pair-playing");
record("Only the next normal clean-guide session may enter hidden check", current.attempt.remediationGuide === false && current.attempt.checkEntered === true && current.attempt.scoredPairs.length === 0, current.attempt);
await guideRest.context.close();

const sound = await makePage();
await seed(sound.page);
await sound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 })));
await sound.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await sound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await sound.page.locator("#gardenRestMarker").click();
current = await waitPhase(sound.page, "sound-paused");
record("Sound disabled pauses before guide/check scoring", current.attempt.guideEvidence.length === 0 && current.attempt.scoredPairs.length === 0 && current.attempt.correctCount === 0, current.attempt);
await sound.page.screenshot({ path: path.join(screenshotDir, "ls08_sound_paused_1024x768.png") });
await sound.context.close();

const wrong = await makePage();
await seed(wrong.page);
await start(wrong.page);
await completeGuide(wrong.page);
current = await waitPhase(wrong.page, "awaiting-first");
const wrongTarget = current.attempt.sequence[0];
const wrongResponse = [wrongTarget[0] === 60 ? 62 : 60, wrongTarget[1]];
await answerPair(wrong.page, wrongResponse);
current = await waitPhase(wrong.page, "wrong-first");
const frozen = current.attempt.pairFirstCompleteResponse.join(",");
const frozenResponseMs = current.attempt.pairFirstCompleteResponseMs;
record("First complete wrong response is frozen", frozen === wrongResponse.join(",") && current.attempt.correctCount === 0, current.attempt);
const childWrongTrace = current.attempt.audioTrace.findLast((event) => event.kind === "child-response");
const targetRepairTrace = current.attempt.audioTrace.findLast((event) => event.kind === "target-replay");
record("Wrong repair schedules both child notes before both target notes with a neutral gap", childWrongTrace?.scheduledDelaysMs?.join(",") === "0,560" && targetRepairTrace?.scheduledDelaysMs?.join(",") === "1240,1800", { childWrongTrace, targetRepairTrace });
await wrong.page.screenshot({ path: path.join(screenshotDir, "ls08_wrong_first_1024x768.png") });
await waitPhase(wrong.page, "awaiting-first");
await answerPair(wrong.page, wrongTarget, "MIDI");
current = await view(wrong.page);
record("Repair completion does not backfill qualifying correct", current.attempt.scoredPairs[0]?.firstCompleteChildResponse.join(",") === frozen && current.attempt.scoredPairs[0]?.qualifyingCorrect === false && current.attempt.correctCount === 0, current.attempt.scoredPairs[0]);
record("Response time stays frozen at the first complete response and is never used for mastery", current.attempt.scoredPairs[0]?.responseMs === frozenResponseMs && Number.isFinite(frozenResponseMs) && current.attempt.scoredPairs[0]?.timingUsedForMastery === false, current.attempt.scoredPairs[0]);
record("Screen-first evidence route remains immutable when MIDI performs the repair", current.attempt.scoredPairs[0]?.inputRoute === "屏幕" && current.attempt.scoredPairs[0]?.inputEvents.some((event) => event.route === "MIDI" && event.event === "onset"), current.attempt.scoredPairs[0]);
await completeClean(wrong.page);
await waitPhase(wrong.page, "complete-roots");
await waitPhase(wrong.page, "unscored-low-echo");
await waitPhase(wrong.page, "map", 10000);
current = await view(wrong.page);
record("A truthful 3/4 first-complete round can create stable after repaired story completion", current.learning.levels.LS08?.stableCompletions === 1 && current.runtime.chapter3.lessonEvidence.LS08?.correctCount === 3, current.learning.levels.LS08);
await wrong.context.close();

const reverseRoute = await makePage();
await seed(reverseRoute.page);
await start(reverseRoute.page);
await completeGuide(reverseRoute.page);
current = await waitPhase(reverseRoute.page, "awaiting-first");
const reverseTarget = current.attempt.sequence[0];
const reverseWrong = [reverseTarget[0] === 60 ? 62 : 60, reverseTarget[1]];
await answerPair(reverseRoute.page, reverseWrong, "MIDI");
await waitPhase(reverseRoute.page, "wrong-first");
await waitPhase(reverseRoute.page, "awaiting-first");
await answerPair(reverseRoute.page, reverseTarget, "屏幕");
current = await view(reverseRoute.page);
record("MIDI-first evidence route remains immutable when screen input performs the repair", current.attempt.scoredPairs[0]?.inputRoute === "MIDI" && current.attempt.scoredPairs[0]?.firstCompleteChildResponse.join(",") === reverseWrong.join(",") && current.attempt.scoredPairs[0]?.inputEvents.some((event) => event.route === "屏幕" && event.event === "onset") && current.attempt.scoredPairs[0]?.qualifyingCorrect === false, current.attempt.scoredPairs[0]);
await reverseRoute.context.close();

const wrongMap = await makePage();
await seed(wrongMap.page);
await start(wrongMap.page);
await completeGuide(wrongMap.page);
current = await waitPhase(wrongMap.page, "awaiting-first");
const wrongMapTarget = current.attempt.sequence[0];
const wrongMapResponse = [wrongMapTarget[0] === 60 ? 62 : 60, wrongMapTarget[1]];
await answerPair(wrongMap.page, wrongMapResponse);
current = await waitPhase(wrongMap.page, "wrong-first");
const wrongMapIdentity = { sessionId: current.runtime.active.sessionId, wrongCount: current.attempt.pairWrongCount, events: current.attempt.pairInputEvents.length, replay: current.attempt.replayCountChild };
await wrongMap.page.evaluate(() => document.querySelector("#listeningReplay")?.click());
current = await view(wrongMap.page);
record("Wrong-first feedback disables replay without clearing or reprocessing the frozen response", current.phase === "wrong-first" && current.attempt.pairWrongCount === wrongMapIdentity.wrongCount && current.attempt.pairInputEvents.length === wrongMapIdentity.events && current.attempt.replayCountChild === wrongMapIdentity.replay, current.attempt);
await wrongMap.page.locator("#mapReturn").click();
await waitPhase(wrongMap.page, "map");
await wrongMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(wrongMap.page, "awaiting-first");
record("Map pause during wrong-first deterministically resumes the same repair without duplicate evidence", current.runtime.active.sessionId === wrongMapIdentity.sessionId && current.attempt.pairWrongCount === wrongMapIdentity.wrongCount && current.attempt.pairInputEvents.length === wrongMapIdentity.events && current.attempt.pairInputs.length === 0, current.attempt);
await answerPair(wrongMap.page, wrongMapTarget);
current = await view(wrongMap.page);
record("Wrong-first map recovery remains completable and cannot backfill qualifying correct", current.attempt.scoredPairs[0]?.qualifyingCorrect === false, current.attempt.scoredPairs[0]);
await wrongMap.context.close();

const wrongRefresh = await makePage();
await seed(wrongRefresh.page);
await start(wrongRefresh.page);
await completeGuide(wrongRefresh.page);
current = await waitPhase(wrongRefresh.page, "awaiting-first");
const wrongRefreshTarget = current.attempt.sequence[0];
const wrongRefreshSecond = [60, 62, 64].find((midi) => midi !== wrongRefreshTarget[1]);
const wrongRefreshIdentity = { sessionId: current.runtime.active.sessionId, wrongCount: 1, events: 3 };
await Promise.all([
  wrongRefresh.page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
  wrongRefresh.page.evaluate(({ first, second }) => {
    window.handleInput(first, "屏幕");
    window.releaseGardenInput(first, "屏幕");
    window.handleInput(second, "屏幕");
    setTimeout(() => location.reload(), 0);
  }, { first: wrongRefreshTarget[0], second: wrongRefreshSecond })
]);
await wrongRefresh.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(wrongRefresh.page, "sound-paused");
record("Refresh during wrong-second pauses the interrupted repair transaction instead of making it answerable", current.runtime.active.sessionId === wrongRefreshIdentity.sessionId && current.attempt.soundPauseContext === "wrong-repair" && current.attempt.pairWrongCount === wrongRefreshIdentity.wrongCount && current.attempt.pairInputEvents.length === wrongRefreshIdentity.events && current.attempt.scoredPairs.length === 0, current.attempt);
await wrongRefresh.page.locator("#listeningReplay").click();
await waitPhase(wrongRefresh.page, "wrong-second");
current = await waitPhase(wrongRefresh.page, "awaiting-second");
record("Recovered wrong-second repair preserves the first target note and requires a real fresh rearm", current.attempt.pairInputs.join(",") === String(wrongRefreshTarget[0]) && current.attempt.pairWrongCount === wrongRefreshIdentity.wrongCount && current.attempt.replayCountSystem === 1, current.attempt);
await release(wrongRefresh.page, wrongRefreshSecond, "屏幕");
await discrete(wrongRefresh.page, wrongRefreshTarget[1]);
current = await view(wrongRefresh.page);
record("Wrong-second refresh recovery accepts only a post-rearm onset and remains non-qualifying", current.attempt.scoredPairs[0]?.qualifyingCorrect === false, current.attempt.scoredPairs[0]);
await wrongRefresh.context.close();

const pairMap = await makePage();
await seed(pairMap.page);
await start(pairMap.page);
await completeGuide(pairMap.page);
current = await waitPhase(pairMap.page, "awaiting-first");
const pairMapTarget = current.attempt.sequence[0];
const pairMapWrong = [pairMapTarget[0] === 60 ? 62 : 60, pairMapTarget[1]];
await answerPair(pairMap.page, pairMapWrong);
await waitPhase(pairMap.page, "awaiting-first");
await answerPair(pairMap.page, pairMapWrong);
current = await waitPhase(pairMap.page, "pair-compare");
const pairMapEvidence = { wrongCount: current.attempt.pairWrongCount, events: current.attempt.pairInputEvents.length, sessionId: current.runtime.active.sessionId };
await pairMap.page.evaluate(() => document.querySelector("#listeningReplay")?.click());
current = await view(pairMap.page);
record("Pair-compare feedback keeps replay disabled and the complete response intact", current.phase === "pair-compare" && current.attempt.pairWrongCount === pairMapEvidence.wrongCount && current.attempt.pairInputEvents.length === pairMapEvidence.events, current.attempt);
await pairMap.page.locator("#mapReturn").click();
await waitPhase(pairMap.page, "map");
await pairMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(pairMap.page, "awaiting-first");
record("Map pause during pair-compare resumes the same confusion without duplicate wrong evidence", current.runtime.active.sessionId === pairMapEvidence.sessionId && current.attempt.pairWrongCount === pairMapEvidence.wrongCount && current.attempt.pairInputEvents.length === pairMapEvidence.events && current.attempt.pairRepairStage === "pair-compare", current.attempt);
await pairMap.context.close();

const replay = await makePage();
await seed(replay.page);
await start(replay.page);
await completeGuide(replay.page);
await waitPhase(replay.page, "awaiting-first");
await replay.page.locator("#listeningReplay").click();
await waitPhase(replay.page, "awaiting-first");
current = await view(replay.page);
record("First successful child whole-pair replay counts once without scoring", current.attempt.replayCountChild === 1 && current.attempt.scoredPairs.length === 0 && current.attempt.pairIndex === 0, current.attempt);
await replay.page.locator("#listeningReplay").click();
await waitPhase(replay.page, "awaiting-first");
current = await view(replay.page);
record("Second successful whole-pair replay counts separately", current.attempt.replayCountChild === 2 && current.attempt.replayCountSystem === 0, current.attempt);
await completeClean(replay.page);
await waitPhase(replay.page, "complete-roots");
await waitPhase(replay.page, "unscored-low-echo");
await waitPhase(replay.page, "map", 10000);
current = await view(replay.page);
record("Two child whole-pair replays complete played story but block stable", current.learning.levels.LS08?.completions === 1 && current.learning.levels.LS08?.stableCompletions === 0 && current.learning.levels.LS08?.needsPractice === true, current.learning.levels.LS08);
await replay.context.close();

const refresh = await makePage();
await seed(refresh.page);
await start(refresh.page);
await completeGuide(refresh.page);
current = await waitPhase(refresh.page, "awaiting-first");
const refreshPair = current.attempt.sequence[0];
await discrete(refresh.page, refreshPair[0]);
await waitPhase(refresh.page, "awaiting-second");
const refreshIdentity = { sessionId: current.runtime.active.sessionId, sequence: current.attempt.sequence.map((pair) => pair.join("-")).join(","), pairIndex: current.attempt.pairIndex };
await refresh.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await refresh.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(refresh.page, "awaiting-second");
record("Refresh preserves first input and sequence but clears every active-route rearm", current.runtime.active.sessionId === refreshIdentity.sessionId && current.attempt.sequence.map((pair) => pair.join("-")).join(",") === refreshIdentity.sequence && current.attempt.pairIndex === refreshIdentity.pairIndex && current.attempt.pairInputs.join(",") === String(refreshPair[0]) && current.attempt.secondOnsetRequiresFreshRearm && Object.values(current.attempt.routeArmed).every((armed) => armed === false), current.attempt);
const refreshReleaseCount = current.attempt.pairInputEvents.filter((event) => event.event === "release-rearm").length;
for (let index = 0; index < 4; index += 1) await release(refresh.page, null, "麦克风");
current = await view(refresh.page);
record("The first microphone quiet after refresh rearms once and later quiet frames are no-ops", current.attempt.pairInputEvents.filter((event) => event.event === "release-rearm").length === refreshReleaseCount + 1 && current.attempt.routeArmed["麦克风"] === true, current.attempt.pairInputEvents);
await onset(refresh.page, refreshPair[1]);
current = await view(refresh.page);
record("First post-refresh onset cannot masquerade as a rearmed second onset", current.attempt.pairInputs.length === 1 && current.attempt.scoredPairs.length === 0, current.attempt);
await release(refresh.page, refreshPair[1]);
await discrete(refresh.page, refreshPair[1]);
current = await view(refresh.page);
record("Fresh post-refresh release then onset completes the preserved response", current.attempt.scoredPairs.length === 1, current.attempt.scoredPairs);
await refresh.context.close();

const support = await makePage();
await seed(support.page);
await start(support.page);
await completeGuide(support.page);
current = await waitPhase(support.page, "awaiting-first");
const supportTarget = current.attempt.sequence[0];
const supportWrong = [supportTarget[0] === 60 ? 62 : 60, supportTarget[1]];
for (let round = 1; round <= 3; round += 1) {
  await answerPair(support.page, supportWrong);
  current = await waitPhase(support.page, round === 1 ? "wrong-first" : (round === 2 ? "pair-compare" : "assisted"));
  if (round === 2) {
    record("Repeated confusion enters two equal role-neutral pair cards", current.compare.split(/\s+/).filter(Boolean).length >= 4 && !/目标|答案|错音/.test(current.compare), current.compare);
    await support.page.screenshot({ path: path.join(screenshotDir, "ls08_pair_compare_1024x768.png") });
  }
  if (round < 3) await waitPhase(support.page, "awaiting-first");
}
current = await waitAssistAvailable(support.page);
record("Third wrong enters bounded strong assistance and blocks stable eligibility", current.attempt.strongCueUsed && current.attempt.pairStrongCueUsed && !current.assistHidden, current.attempt);
await support.page.screenshot({ path: path.join(screenshotDir, "ls08_assisted_1024x768.png") });
await support.page.locator("#ls05VisualAssist").click();
current = await waitPhase(support.page, "visual-assist");
const supportTargetLetters = supportTarget.map((midi) => ({ 60: "C", 62: "D", 64: "E" })[midi]);
record("Visual assist is a persistent two-letter model only after explicit choice", current.attempt.accessibilityVisualAssist && current.slots.map((slot) => slot.note).join("") === supportTargetLetters.join("") && supportTargetLetters.every((letter) => current.compare.includes(letter)), current);
await support.page.screenshot({ path: path.join(screenshotDir, "ls08_visual_assist_1024x768.png") });
await discrete(support.page, supportTarget[0]);
await waitPhase(support.page, "awaiting-second");
await discrete(support.page, supportTarget[1]);
current = await view(support.page);
record("Visual-assist pair advances story without qualifying listening correct", current.attempt.scoredPairs[0]?.accessibilityVisualAssist === true && current.attempt.scoredPairs[0]?.qualifyingCorrect === false && current.attempt.correctCount === 0, current.attempt.scoredPairs[0]);
await support.context.close();

const modeled = await makePage();
await seed(modeled.page);
await start(modeled.page);
await completeGuide(modeled.page);
current = await waitPhase(modeled.page, "awaiting-first");
const modeledSessionId = current.runtime.active.sessionId;
const modeledTarget = current.attempt.sequence[0];
const modeledWrong = [modeledTarget[0] === 60 ? 62 : 60, modeledTarget[1]];
for (let round = 1; round <= 3; round += 1) {
  await answerPair(modeled.page, modeledWrong);
  await waitPhase(modeled.page, round === 1 ? "wrong-first" : (round === 2 ? "pair-compare" : "assisted"));
  if (round < 3) await waitPhase(modeled.page, "awaiting-first");
}
await discrete(modeled.page, modeledWrong[0]);
await waitPhase(modeled.page, "awaiting-second");
await discrete(modeled.page, modeledWrong[1]);
current = await waitPhase(modeled.page, "modeled-playing");
record("Fourth wrong enters a non-interactive modeled transition", current.replayDisabled && current.assistHidden, current);
await modeled.page.locator("#mapReturn").click();
await waitPhase(modeled.page, "map", 10000);
current = await view(modeled.page);
record("Modeled safe rest advances only one root knot and preserves remaining pairs", current.runtime.chapter3.resume?.nextTargetId === "LS08" && current.runtime.chapter3.resume?.ls08Attempt?.pairIndex === 1 && current.runtime.chapter3.resume?.ls08Attempt?.neutralProgress === 1 && current.runtime.chapter3.resume?.ls08Attempt?.modeledInputs.length === 1, current.runtime.chapter3.resume);
await modeled.page.locator("#gardenRestMarker").click();
current = await waitPhase(modeled.page, "guide-first");
record("Modeled resume creates a new session and repeats a shorter guide", current.runtime.active.sessionId !== modeledSessionId && current.runtime.active.resumeOfSessionId === modeledSessionId && current.attempt.crossedSessionBoundary && current.attempt.guideMode === "short" && current.attempt.pairIndex === 1, current.attempt);
await completeGuide(modeled.page);
await completeClean(modeled.page);
await waitPhase(modeled.page, "complete-roots");
await waitPhase(modeled.page, "unscored-low-echo");
await waitPhase(modeled.page, "map", 10000);
current = await view(modeled.page);
record("Cross-session fragments can complete roots but cannot combine into stable", current.runtime.chapter3.lessonEvidence.LS08?.crossedSessionBoundary === true && current.learning.levels.LS08?.stableCompletions === 0, current.runtime.chapter3.lessonEvidence.LS08);
record("Resume keeps pair records under their actual old and new session IDs", new Set(current.runtime.chapter3.ls08Attempts.at(-1).scoredPairs.map((pair) => pair.sessionId)).size === 2, current.runtime.chapter3.ls08Attempts.at(-1).scoredPairs);
await modeled.context.close();

const modeledMapLifecycle = await makePage();
await seed(modeledMapLifecycle.page);
await reachDirectModeled(modeledMapLifecycle.page);
await modeledMapLifecycle.page.locator("#mapReturn").click();
current = await view(modeledMapLifecycle.page);
record("Map request during direct modeled playback cannot advance before the modeled pair ends", current.phase === "modeled-playing" && current.attempt.modeledAudioPlaying && current.attempt.modeledInputs.length === 0 && current.attempt.pairIndex === 0, current.attempt);
await waitPhase(modeledMapLifecycle.page, "map", 10000);
current = await view(modeledMapLifecycle.page);
record("Direct modeled map flow finalizes one modeled pair at the required safe rest", current.runtime.chapter3.resume?.ls08Attempt?.modeledInputs.length === 1 && current.runtime.chapter3.resume?.ls08Attempt?.pairIndex === 1 && current.runtime.chapter3.ls08Attempts.at(-1)?.modeled === true, current.runtime.chapter3);
await modeledMapLifecycle.context.close();

const modeledRefreshLifecycle = await makePage();
await seed(modeledRefreshLifecycle.page);
await reachDirectModeled(modeledRefreshLifecycle.page);
await modeledRefreshLifecycle.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await modeledRefreshLifecycle.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(modeledRefreshLifecycle.page, "sound-paused");
record("Refresh during direct modeled playback preserves the transaction without progress", current.attempt.soundPauseContext === "modeled" && current.attempt.modeledInputs.length === 0 && current.attempt.pairIndex === 0 && current.attempt.scoredPairs.length === 0, current.attempt);
await modeledRefreshLifecycle.page.locator("#listeningReplay").click();
await waitPhase(modeledRefreshLifecycle.page, "map", 10000);
current = await view(modeledRefreshLifecycle.page);
record("Explicit modeled recovery plays and finalizes exactly one modeled pair", current.runtime.chapter3.resume?.ls08Attempt?.modeledInputs.length === 1 && current.runtime.chapter3.resume?.ls08Attempt?.pairIndex === 1 && current.runtime.chapter3.ls08Attempts.at(-1)?.scoredPairs.length === 1 && current.learning.levels.LS08?.stableCompletions === 0, current.runtime.chapter3);
await modeledRefreshLifecycle.context.close();

const volumeZero = await makePage();
await seed(volumeZero.page);
await volumeZero.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await volumeZero.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await volumeZero.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await volumeZero.page.locator("#gardenRestMarker").click();
current = await waitPhase(volumeZero.page, "sound-paused");
record("Volume zero stays non-scoring at the same guide step", current.attempt.guideIndex === 0 && current.attempt.guideEvidence.length === 0 && current.attempt.scoredPairs.length === 0, current.attempt);
await volumeZero.context.close();

const failedAudio = await makePage({ width: 1024, height: 768 }, { failAudioContext: true });
await seed(failedAudio.page);
await failedAudio.page.locator("#gardenRestMarker").click();
current = await waitPhase(failedAudio.page, "sound-paused");
record("AudioContext failure remains recoverable without scoring", current.attempt.soundPauseContext === "guide" && current.attempt.guideEvidence.length === 0 && current.attempt.scoredPairs.length === 0, current.attempt);
await failedAudio.context.close();

const wrongSound = await makePage();
await seed(wrongSound.page);
await start(wrongSound.page);
await completeGuide(wrongSound.page);
current = await waitPhase(wrongSound.page, "awaiting-first");
const wrongSoundTarget = current.attempt.sequence[0];
const wrongSoundResponse = [wrongSoundTarget[0] === 60 ? 62 : 60, wrongSoundTarget[1]];
await wrongSound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await wrongSound.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await wrongSound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await answerPair(wrongSound.page, wrongSoundResponse);
current = await waitPhase(wrongSound.page, "sound-paused");
const wrongSoundFrozen = { wrongCount: current.attempt.pairWrongCount, events: current.attempt.pairInputEvents.length, response: current.attempt.pairFirstCompleteResponse.join(",") };
record("Failed wrong-repair audio preserves the frozen response without claiming a system replay", current.attempt.soundPauseContext === "wrong-repair" && current.attempt.replayCountSystem === 0 && current.attempt.pairSystemReplayCount === 0, current.attempt);
await wrongSound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0.6 })));
await wrongSound.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await wrongSound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await wrongSound.page.locator("#listeningReplay").click();
await waitPhase(wrongSound.page, "wrong-first");
current = await waitPhase(wrongSound.page, "awaiting-first");
record("Sound recovery replays the original wrong transaction once without recounting the response", current.attempt.pairWrongCount === wrongSoundFrozen.wrongCount && current.attempt.pairInputEvents.length === wrongSoundFrozen.events && current.attempt.pairFirstCompleteResponse.join(",") === wrongSoundFrozen.response && current.attempt.replayCountSystem === 1 && current.attempt.pairSystemReplayCount === 1, current.attempt);
await answerPair(wrongSound.page, wrongSoundTarget);
current = await view(wrongSound.page);
record("Recovered wrong audio remains non-qualifying and cannot increase stable evidence", current.attempt.scoredPairs[0]?.qualifyingCorrect === false && current.attempt.correctCount === 0, current.attempt.scoredPairs[0]);
await wrongSound.context.close();

const modeledSound = await makePage();
await seed(modeledSound.page);
await start(modeledSound.page);
await completeGuide(modeledSound.page);
current = await waitPhase(modeledSound.page, "awaiting-first");
const modeledSoundTarget = current.attempt.sequence[0];
const modeledSoundWrong = [modeledSoundTarget[0] === 60 ? 62 : 60, modeledSoundTarget[1]];
for (let round = 1; round <= 3; round += 1) {
  await answerPair(modeledSound.page, modeledSoundWrong);
  await waitPhase(modeledSound.page, round === 1 ? "wrong-first" : (round === 2 ? "pair-compare" : "assisted"));
  if (round < 3) await waitPhase(modeledSound.page, "awaiting-first");
}
await waitAssistAvailable(modeledSound.page);
await modeledSound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await modeledSound.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await modeledSound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(modeledSound.page, "sound-paused", 10000);
record("Modeled audio failure stays in its modeled transaction without advancing the pair", current.attempt.soundPauseContext === "modeled" && current.attempt.pairIndex === 0 && current.attempt.scoredPairs.length === 0 && current.attempt.modeledInputs.length === 0, current.attempt);
await modeledSound.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0.6 })));
await modeledSound.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await modeledSound.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await modeledSound.page.locator("#listeningReplay").click();
await waitPhase(modeledSound.page, "map", 10000);
current = await view(modeledSound.page);
record("Modeled sound recovery writes one modeled pair then reaches the required safe rest", current.runtime.chapter3.resume?.ls08Attempt?.modeledInputs.length === 1 && current.runtime.chapter3.resume?.ls08Attempt?.pairIndex === 1 && current.runtime.chapter3.ls08Attempts.at(-1)?.modeled === true && current.learning.levels.LS08?.stableCompletions === 0, current.runtime.chapter3);
await modeledSound.context.close();

const mapEcho = await makePage();
await seed(mapEcho.page);
await reachLowEcho(mapEcho.page);
await mapEcho.page.locator("#mapReturn").click();
current = await view(mapEcho.page);
record("Map request during the low echo stays queued until the full story sound ends", current.phase === "unscored-low-echo" && current.attempt.lowEchoStarted === true && current.attempt.lowEchoCompleted === false && current.attempt.lowEchoReturnQueued === true && current.runtime.chapter3.completed === false, current.attempt);
await waitPhase(mapEcho.page, "map", 10000);
current = await view(mapEcho.page);
record("Map navigation after low echo end completes one ended story event", !current.runtime.active && current.runtime.history.at(-1)?.bundleId === "C3-07" && current.runtime.history.at(-1)?.endReason === "natural-rest" && current.runtime.chapter3.completed === true && current.runtime.chapter3.ls08Attempts.at(-1)?.storyEvents.length === 1 && Boolean(current.runtime.chapter3.ls08Attempts.at(-1)?.storyEvents[0]?.endedAt) && !JSON.stringify(current.runtime).includes("LP01"), current.runtime);
await mapEcho.context.close();

const refreshEcho = await makePage();
await seed(refreshEcho.page);
await reachLowEcho(refreshEcho.page);
await refreshEcho.page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
await refreshEcho.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(refreshEcho.page, "sound-paused");
record("Refresh interrupts the low echo without silently completing Chapter 3", current.attempt.soundPauseContext === "low-echo" && current.attempt.lowEchoCompleted === false && current.runtime.chapter3.completed === false && current.attempt.storyEvents.length === 1 && !current.attempt.storyEvents[0].endedAt, current.attempt);
await refreshEcho.page.locator("#listeningReplay").click();
await waitPhase(refreshEcho.page, "unscored-low-echo");
await waitPhase(refreshEcho.page, "map", 10000);
current = await view(refreshEcho.page);
record("Explicit low-echo recovery ends the original event once without creating Chapter 4", !current.runtime.active && current.runtime.history.at(-1)?.bundleId === "C3-07" && current.runtime.chapter3.completed === true && current.runtime.chapter3.ls08Attempts.at(-1)?.storyEvents.length === 1 && Boolean(current.runtime.chapter3.ls08Attempts.at(-1)?.storyEvents[0]?.endedAt) && current.runtime.chapter3.ls08Attempts.at(-1)?.storyEvents[0]?.playbackAttempts === 2 && current.learning.levels.LS08?.completions === 1 && !JSON.stringify(current.runtime).includes("LP01"), current.runtime);
await refreshEcho.context.close();

record("Runtime adds no unapproved media path", !/concepts\/|assets\/generated|audio\/|technical.preview|grok|gemini|sora/i.test(`${fs.readFileSync("app.js", "utf8")} ${fs.readFileSync("index.html", "utf8")} ${fs.readFileSync("chapter3-visible.css", "utf8")}`));
record("Browser console remains clean", errors.length === 0, errors);

await browser.close();
const failed = checks.filter((check) => !check.pass);
console.log(`chapter3 LS08 listening checks: ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
if (failed.length) {
  console.error(JSON.stringify(failed, null, 2));
  process.exit(1);
}
