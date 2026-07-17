import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/session_retention_327a";
const storageKeys = ["starDinoCompletedLevels", "starDinoLearningStats", "starDinoSessionRuntime"];

fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const checks = [];
const browserErrors = [];

const record = (name, pass, details = {}) => {
  checks.push({ name, pass: Boolean(pass), details });
};

const makeUrl = (query = "") => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const stableEvent = ({
  eventId = "stable-anchor",
  skillKey = "level:M07",
  sessionId = "older-session",
  completedAt = "2026-07-09T01:00:00.000Z",
  localDateKey = "2026-07-09"
} = {}) => ({
  eventId,
  evidenceType: "stable",
  skillKey,
  levelId: skillKey.startsWith("level:") ? skillKey.slice(6) : null,
  staffCourseId: skillKey.startsWith("staff:") ? skillKey.slice(6) : null,
  sessionId,
  bundleId: "C1-06",
  sessionActionId: "older-check",
  sessionRole: "lesson",
  reviewSkillKey: null,
  completedAt,
  localDateKey,
  runMode: "check",
  wrongCount: 0,
  cueStrength: "soft",
  strongCueFrames: 0,
  inputRoutes: { "屏幕": 3 },
  experimentalInput: false,
  thresholdVersion: "preschool-v1-2026-07-11"
});

const retainedEvent = ({
  eventId = "retained-anchor",
  skillKey = "level:M07",
  sessionId = "retained-session",
  completedAt = "2026-07-10T02:00:00.000Z",
  localDateKey = "2026-07-10"
} = {}) => ({
  ...stableEvent({ eventId, skillKey, sessionId, completedAt, localDateKey }),
  evidenceType: "retained",
  anchorStableEventId: "stable-anchor",
  elapsedFromStableMs: 90000000
});

const learningStats = ({
  version = 3,
  levels = {},
  staff = {},
  stableEvents = [],
  retainedEvents = [],
  observationEvents = [],
  clockInvalidEvents = [],
  lastWallClockAt = null,
  lastWallClockSessionId = null,
  extra = {}
} = {}) => ({
  ...extra,
  version,
  levels,
  notes: extra.notes || {},
  staff,
  retention: { stableEvents, retainedEvents, observationEvents, clockInvalidEvents, lastWallClockAt, lastWallClockSessionId }
});

const activeReviewRuntime = ({
  now = "2026-07-11T02:00:00.000Z",
  localDateKey = "2026-07-11",
  sessionId = "current-review-session",
  targetId = "M07",
  skillKey = "level:M07",
  bundleId = "C1-05",
  sessionStartedAt = now,
  voluntaryReplay = false
} = {}) => ({
  version: 1,
  active: {
    sessionId,
    bundleId,
    startedAt: sessionStartedAt,
    localDateKey,
    reviewSkillKey: skillKey,
    voluntaryReplay,
    status: "active",
    actionIndex: 0,
    actions: [
      {
        actionId: `review-${targetId}-${sessionId}`,
        kind: "level",
        targetId,
        runMode: targetId === "M03" ? "guided" : "check",
        forceReducedCue: targetId !== "M03",
        requiredReview: true,
        role: "opening-review",
        reviewSkillKey: skillKey,
        reviewPriority: 2
      },
      {
        actionId: "M06-leap",
        kind: "level",
        targetId: "M06",
        runMode: "guided",
        role: "lesson",
        requiredReview: false,
        reviewSkillKey: null
      }
    ],
    completedActions: [],
    restAfterCurrentLevel: false
  },
  history: [],
  lastRest: null
});

const openPage = async ({
  now = "2026-07-11T02:00:00.000Z",
  query = "?screen=map",
  stats = null,
  runtime = null,
  completed = []
} = {}) => {
  const context = await browser.newContext({
    viewport: { width: 1194, height: 834 },
    deviceScaleFactor: 2,
    timezoneId: "Asia/Shanghai",
    reducedMotion: "no-preference"
  });
  await context.addInitScript(({ fixedNow, initialStorage, keys }) => {
    const NativeDate = Date;
    window.__STAR_DINO_TEST_NOW__ = fixedNow;
    class ControlledDate extends NativeDate {
      constructor(...args) {
        super(...(args.length ? args : [window.__STAR_DINO_TEST_NOW__]));
      }
      static now() {
        return new NativeDate(window.__STAR_DINO_TEST_NOW__).getTime();
      }
    }
    window.Date = ControlledDate;
    if (!sessionStorage.getItem("starDinoTestStorageSeeded")) {
      keys.forEach((key) => localStorage.removeItem(key));
      Object.entries(initialStorage).forEach(([key, value]) => {
        if (value !== null && value !== undefined) localStorage.setItem(key, JSON.stringify(value));
      });
      sessionStorage.setItem("starDinoTestStorageSeeded", "true");
    }
  }, {
    fixedNow: now,
    keys: storageKeys,
    initialStorage: {
      starDinoCompletedLevels: completed,
      starDinoLearningStats: stats,
      starDinoSessionRuntime: runtime
    }
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
  });
  await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
  await page.waitForTimeout(180);
  return { context, page };
};

const readStorage = async (page, key) => page.evaluate((storageKey) => {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : null;
}, key);

const readRuntime = (page) => readStorage(page, "starDinoSessionRuntime");
const readStats = (page) => readStorage(page, "starDinoLearningStats");

const currentTargetMidi = async (page) => page.evaluate(() => {
  const target = document.querySelector('.key.white-key[data-target-note="true"]');
  return target ? Number(target.dataset.midi) : null;
});

const tapTarget = async (page, delay = 115) => {
  const midi = await currentTargetMidi(page);
  if (!Number.isFinite(midi)) return false;
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
  return true;
};

const tapWrong = async (page, delay = 115) => {
  const targetMidi = await currentTargetMidi(page);
  const wrongMidi = await page.evaluate((target) => {
    const key = [...document.querySelectorAll(".key.white-key[data-midi]")]
      .find((item) => Number(item.dataset.midi) !== target);
    return key ? Number(key.dataset.midi) : null;
  }, targetMidi);
  if (!Number.isFinite(wrongMidi)) return false;
  await page.locator(`.key.white-key[data-midi="${wrongMidi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
  return true;
};

const beginM03ModelIfNeeded = async (page) => {
  const phase = await page.evaluate(() => document.querySelector("#appShell")?.dataset.teachingAudioPhase || "");
  if (["model-ready", "sound-paused"].includes(phase)) {
    await page.locator("#m03WheelReplay").click({ timeout: 5000 });
  }
};

const waitM03Response = async (page, timeout = 10000) => {
  await beginM03ModelIfNeeded(page);
  try {
    await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.teachingAudioPhase === "awaiting-response", null, { timeout });
  } catch (error) {
    const diagnostic = await page.evaluate(() => ({
      phase: document.querySelector("#appShell")?.dataset.teachingAudioPhase || "",
      screen: state.screen,
      stepIndex: state.stepIndex,
      audioAttempt: state.practiceAttempt?.audioAttempt || null,
      audioContextState: state.sfx?.ctx?.state || null,
      replayHidden: document.querySelector("#m03WheelReplay")?.hidden,
      runtime: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null")
    }));
    throw new Error(`M03 response did not arm: ${JSON.stringify(diagnostic)}`, { cause: error });
  }
};

const completeM03Action = async (page, sessionId, actionIndex, { wrongTaps = 0 } = {}) => {
  let remainingWrongTaps = wrongTaps;
  const run = { kind: "M03", sessionId, actionIndex, responses: [], childEchoes: [] };
  for (let guard = 0; guard < 8; guard += 1) {
    const runtime = await readRuntime(page);
    const active = runtime?.active;
    if (!active || active.sessionId !== sessionId || active.actionIndex !== actionIndex) return run;
    await waitM03Response(page);
    run.responses.push(await page.evaluate(() => {
      const attempt = state.practiceAttempt?.audioAttempt;
      return {
        stepIndex: state.stepIndex,
        modelCount: attempt?.modelCount || 0,
        childEchoCount: attempt?.childEchoCount || 0,
        trace: (attempt?.audioTrace || []).map((event) => ({ kind: event.kind, context: event.context, midis: event.midis }))
      };
    }));
    if (remainingWrongTaps > 0) {
      const tappedWrong = await tapWrong(page, 0);
      if (!tappedWrong) throw new Error("M03 wrong target was unavailable");
      remainingWrongTaps -= 1;
      await waitM03Response(page);
      continue;
    }
    const beforeStepIndex = await page.evaluate(() => state.stepIndex);
    const tappedTarget = await tapTarget(page, 0);
    if (!tappedTarget) throw new Error("M03 target was unavailable");
    await page.waitForFunction(({ expectedSessionId, expectedActionIndex }) => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null");
      const active = runtime?.active;
      return !active || active.sessionId !== expectedSessionId || active.actionIndex !== expectedActionIndex || document.querySelector("#appShell")?.dataset.teachingAudioPhase === "child-echo-playing";
    }, { expectedSessionId: sessionId, expectedActionIndex: actionIndex }, { timeout: 10000 });
    run.childEchoes.push(await page.evaluate(() => {
      const attempt = state.practiceAttempt?.audioAttempt;
      return {
        stepIndex: state.stepIndex,
        modelCount: attempt?.modelCount || 0,
        childEchoCount: attempt?.childEchoCount || 0,
        trace: (attempt?.audioTrace || []).map((event) => ({ kind: event.kind, context: event.context, midis: event.midis }))
      };
    }));
    await page.waitForFunction(({ expectedSessionId, expectedActionIndex, expectedStepIndex }) => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null");
      const active = runtime?.active;
      return !active || active.sessionId !== expectedSessionId || active.actionIndex !== expectedActionIndex || state.stepIndex > expectedStepIndex;
    }, { expectedSessionId: sessionId, expectedActionIndex: actionIndex, expectedStepIndex: beforeStepIndex }, { timeout: 10000 });
    const after = await readRuntime(page);
    if (!after?.active || after.active.sessionId !== sessionId || after.active.actionIndex !== actionIndex) return run;
  }
  throw new Error(`M03 action did not finish: ${sessionId} action ${actionIndex}`);
};

const completeActiveAction = async (page, { wrongTaps = 0 } = {}) => {
  const initialRuntime = await readRuntime(page);
  const sessionId = initialRuntime?.active?.sessionId;
  const actionIndex = initialRuntime?.active?.actionIndex;
  const targetId = initialRuntime?.active?.actions?.[actionIndex]?.targetId;
  if (targetId === "M03") return completeM03Action(page, sessionId, actionIndex, { wrongTaps });
  for (let index = 0; index < wrongTaps; index += 1) await tapWrong(page);

  for (let guard = 0; guard < 28; guard += 1) {
    const runtime = await readRuntime(page);
    const active = runtime?.active;
    if (!active || active.sessionId !== sessionId || active.actionIndex !== actionIndex) return;
    const tapped = await tapTarget(page);
    if (!tapped) await page.waitForTimeout(180);
  }
  throw new Error(`active action did not finish: ${sessionId} action ${actionIndex}`);
};

const completeSession = async (page, optionsByAction = {}) => {
  const actionRuns = [];
  for (let guard = 0; guard < 8; guard += 1) {
    const runtime = await readRuntime(page);
    if (!runtime?.active) {
      try {
        await page.waitForSelector("#mapShell", { state: "visible", timeout: 6000 });
      } catch (error) {
        const snapshot = await page.evaluate(() => ({
          url: location.href,
          bodyClass: document.body.className,
          mapHidden: document.querySelector("#mapShell")?.hidden,
          appHidden: document.querySelector("#appShell")?.hidden,
          resultHidden: document.querySelector("#resultModal")?.hidden,
          resultKind: document.querySelector("#resultModal")?.dataset.result || "",
          feedback: document.querySelector("#feedback")?.textContent || "",
          runtime: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null"),
          stats: JSON.parse(localStorage.getItem("starDinoLearningStats") || "null")
        }));
        throw new Error(`natural rest UI did not appear: ${JSON.stringify(snapshot)}; browserErrors=${JSON.stringify(browserErrors)}`, { cause: error });
      }
      return actionRuns;
    }
    const actionIndex = runtime.active.actionIndex;
    const actionRun = await completeActiveAction(page, optionsByAction[actionIndex] || {});
    if (actionRun) actionRuns.push(actionRun);
    const after = await readRuntime(page);
    if (after?.active) await page.waitForTimeout(1650);
    else await page.waitForTimeout(1900);
  }
  throw new Error("session did not reach a natural rest");
};

const completeDebugLevel = async (page) => {
  for (let guard = 0; guard < 28; guard += 1) {
    const resultVisible = await page.evaluate(() => !document.querySelector("#resultModal")?.hidden);
    if (resultVisible) return;
    const tapped = await tapTarget(page);
    if (!tapped) await page.waitForTimeout(180);
  }
  throw new Error("debug level did not complete");
};

const clickMapNode = async (page, levelId) => {
  await page.waitForSelector("#mapShell", { state: "visible", timeout: 6000 });
  await page.locator(`.map-node[data-level="${levelId}"]`).click({ timeout: 5000 });
  await page.waitForSelector("#appShell", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(160);
};

const openParentEvidence = async (page) => {
  await page.locator("#playParentGate").click({ timeout: 5000 });
  await page.waitForSelector("#parentModal", { state: "visible", timeout: 5000 });
  return page.evaluate(() => ({
    status: document.querySelector("#parentMasteryStatus")?.textContent?.trim() || "",
    detail: document.querySelector("#parentMasteryDetail")?.textContent?.trim() || "",
    chips: [...document.querySelectorAll("#parentEvidenceList .parent-evidence-chip")].map((chip) => ({
      text: chip.textContent?.replace(/[✓·]/g, "").trim() || "",
      active: chip.classList.contains("is-active")
    }))
  }));
};

const runOpeningReviewCase = async ({
  label,
  now,
  localDateKey,
  anchor,
  sessionId = "current-review-session",
  sessionStartedAt = now,
  lastWallClockAt = null,
  wrongTaps = 0,
  complete = true,
  expectedRetained,
  expectedClockInvalid = false,
  expectedClockReason = null,
  expectedStableEventCount = null
}) => {
  const levels = {
    M07: {
      completions: 3,
      stableCompletions: 1,
      lastWrongCount: 0,
      lastRunMode: "check",
      needsPractice: false,
      lastCompletedAt: anchor.completedAt
    }
  };
  const stats = learningStats({ levels, stableEvents: [anchor], lastWallClockAt });
  const runtime = activeReviewRuntime({ now, localDateKey, sessionId, sessionStartedAt });
  const { context, page } = await openPage({
    now,
    query: `?level=M07&bundle=C1-05&sessionId=${encodeURIComponent(sessionId)}`,
    stats,
    runtime
  });
  try {
    if (complete) await completeActiveAction(page, { wrongTaps });
    else await page.waitForTimeout(220);
    const after = await readStats(page);
    const retained = after?.retention?.retainedEvents || [];
    const clockInvalid = after?.retention?.clockInvalidEvents || [];
    record(`${label}: retained eligibility`, retained.length === expectedRetained, { retained, clockInvalid });
    record(`${label}: clock validity`, expectedClockInvalid ? clockInvalid.length > 0 : clockInvalid.length === 0, { clockInvalid });
    if (expectedClockReason) {
      record(`${label}: clock invalid reason`, clockInvalid.some((event) => event.reason === expectedClockReason), { clockInvalid });
    }
    if (Number.isFinite(expectedStableEventCount)) {
      record(`${label}: stable evidence is not forged`, (after?.retention?.stableEvents || []).length === expectedStableEventCount, after?.retention);
    }
  } finally {
    await context.close();
  }
};

try {
  {
    const { context, page } = await openPage();
    try {
      await clickMapNode(page, "M04");
      const started = await readRuntime(page);
      const firstId = started?.active?.sessionId;
      record("map starts canonical C1-04 at M04", started?.active?.bundleId === "C1-04" && started.active.actions[0]?.targetId === "M04", started);
      await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      const refreshed = await readRuntime(page);
      record("1 refresh preserves active sessionId", refreshed?.active?.sessionId === firstId, { firstId, refreshed });
      await page.locator("#mapReturn").click({ timeout: 5000 });
      await page.waitForSelector("#mapShell", { state: "visible", timeout: 5000 });
      await page.screenshot({ path: path.join(screenshotDir, "active-resume-map-1194x834.png"), fullPage: false });
      const activeMap = await page.evaluate(() => ({
        statusVisible: !document.querySelector("#mapSessionStatus")?.hidden,
        statusState: document.querySelector("#mapSessionStatus")?.dataset.state || "",
        activeNodes: [...document.querySelectorAll(".map-node.active")].map((node) => node.dataset.level || node.dataset.screen)
      }));
      record("1 active session can pause on the map and resume", activeMap.statusVisible && activeMap.statusState === "active" && activeMap.activeNodes.includes("M04"), activeMap);
      await clickMapNode(page, "M04");
      await completeSession(page);
      const rested = await readRuntime(page);
      const restUi = await page.evaluate(() => ({
        mapVisible: !document.querySelector("#mapShell")?.hidden,
        resultHidden: document.querySelector("#resultModal")?.hidden,
        restVisible: !document.querySelector("#mapSessionStatus")?.hidden,
        restText: document.querySelector("#mapSessionStatus")?.textContent?.replace(/\s+/g, " ").trim() || ""
      }));
      await page.screenshot({ path: path.join(screenshotDir, "natural-rest-1194x834.png"), fullPage: false });
      record("2 natural rest returns to usable map without result controls", !rested?.active && restUi.mapVisible && restUi.resultHidden && restUi.restVisible, { rested, restUi });
      const historyLength = rested?.history?.length || 0;
      await page.waitForTimeout(2600);
      const stillRested = await readRuntime(page);
      const stillOnMap = await page.evaluate(() => !document.querySelector("#mapShell")?.hidden && document.querySelector("#resultModal")?.hidden);
      record("2 natural rest stops autoplay", !stillRested?.active && stillRested?.history?.length === historyLength && stillOnMap, { historyLength, stillRested, stillOnMap });
      await clickMapNode(page, "M06");
      const next = await readRuntime(page);
      record("3 only a new map start creates the next sessionId", next?.active?.sessionId && next.active.sessionId !== firstId, { firstId, next });
    } finally {
      await context.close();
    }
  }

  {
    const anchor = stableEvent();
    const stats = learningStats({
      levels: { M07: { completions: 3, stableCompletions: 1, needsPractice: false, lastCompletedAt: anchor.completedAt } },
      stableEvents: [anchor]
    });
    const { context, page } = await openPage({ now: "2026-07-11T02:00:00.000Z", stats });
    try {
      await clickMapNode(page, "M06");
      const runtime = await readRuntime(page);
      const reviewActions = runtime?.active?.actions?.filter((action) => action.role === "opening-review") || [];
      record("4 scheduler inserts at most one opening review", reviewActions.length === 1, runtime);
      record("4 opening review is before new teaching", runtime?.active?.actions?.[0]?.role === "opening-review" && runtime.active.actionIndex === 0, runtime);
      await completeActiveAction(page);
      const after = await readStats(page);
      record("8 explicit eligible opening review grants retained", after?.retention?.retainedEvents?.length === 1, after?.retention);
    } finally {
      await context.close();
    }
  }

  await runOpeningReviewCase({
    label: "5 same-session review",
    now: "2026-07-11T02:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ sessionId: "same-session", completedAt: "2026-07-09T01:00:00.000Z" }),
    sessionId: "same-session",
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "6 same-date nine-hour review",
    now: "2026-07-11T10:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-11T01:00:00.000Z", localDateKey: "2026-07-11" }),
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "7 different-date 7h59m review",
    now: "2026-07-11T07:59:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-11T00:00:00.000Z", localDateKey: "2026-07-10" }),
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "8 different-date eight-hour review",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-11T00:00:00.000Z", localDateKey: "2026-07-10" }),
    expectedRetained: 1
  });

  await runOpeningReviewCase({
    label: "9 strong-cue review",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-10T23:59:00.000Z", localDateKey: "2026-07-10" }),
    wrongTaps: 1,
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "9 over-error-threshold review",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-10T23:59:00.000Z", localDateKey: "2026-07-10" }),
    wrongTaps: 2,
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "9 incomplete review",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-10T23:59:00.000Z", localDateKey: "2026-07-10" }),
    complete: false,
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "10 wall-clock rollback",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "2026-07-10T23:00:00.000Z", localDateKey: "2026-07-10" }),
    lastWallClockAt: "2026-07-11T09:00:00.000Z",
    expectedRetained: 0,
    expectedClockInvalid: true
  });

  await runOpeningReviewCase({
    label: "10 corrupted anchor time",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    anchor: stableEvent({ completedAt: "not-a-time", localDateKey: "2026-07-10" }),
    expectedRetained: 0
  });

  await runOpeningReviewCase({
    label: "18 completion before session start",
    now: "2026-07-11T08:00:00.000Z",
    localDateKey: "2026-07-11",
    sessionStartedAt: "2026-07-11T09:00:00.000Z",
    anchor: stableEvent({ completedAt: "2026-07-10T23:00:00.000Z", localDateKey: "2026-07-10" }),
    expectedRetained: 0,
    expectedClockInvalid: true
  });

  await runOpeningReviewCase({
    label: "18 session start before accepted wall clock",
    now: "2026-07-11T10:30:00.000Z",
    localDateKey: "2026-07-11",
    sessionStartedAt: "2026-07-11T09:30:00.000Z",
    lastWallClockAt: "2026-07-11T10:00:00.000Z",
    anchor: stableEvent({ completedAt: "2026-07-10T23:00:00.000Z", localDateKey: "2026-07-10" }),
    expectedRetained: 0,
    expectedClockInvalid: true,
    expectedClockReason: "session-start-before-last-wall-clock",
    expectedStableEventCount: 1
  });

  {
    const stable = stableEvent();
    const retained = retainedEvent();
    const stats = learningStats({
      levels: { M07: { completions: 4, stableCompletions: 2, needsPractice: false, lastCompletedAt: retained.completedAt } },
      stableEvents: [stable],
      retainedEvents: [retained]
    });
    const runtime = activeReviewRuntime({ now: "2026-07-11T08:00:00.000Z", localDateKey: "2026-07-11", sessionId: "later-failed-review" });
    const { context, page } = await openPage({
      now: "2026-07-11T08:00:00.000Z",
      query: "?level=M07&bundle=C1-05&sessionId=later-failed-review",
      stats,
      runtime
    });
    try {
      await completeActiveAction(page, { wrongTaps: 2 });
      const after = await readStats(page);
      record("11 later review failure preserves historical stable", after?.retention?.stableEvents?.some((event) => event.eventId === stable.eventId), after);
      record("20 later review failure preserves retained and marks today needs practice", after?.retention?.retainedEvents?.some((event) => event.eventId === retained.eventId) && after?.levels?.M07?.todayNeedsPractice === true, after);
    } finally {
      await context.close();
    }
  }

  {
    const legacy = {
      version: 2,
      levels: {
        M07: { completions: 7, stableCompletions: 3, lastRunMode: "guided", lastCueStrength: "strong", legacyMarker: "keep-level" }
      },
      notes: { C: { attempts: 9, legacyMarker: "keep-note" } },
      staff: { S01: { completions: 5, stableCompletions: 2, legacyMarker: "keep-staff" } },
      completions: 44,
      stableCompletions: 11,
      recent: { legacyMarker: "keep-recent" }
    };
    const runtime = {
      version: 1,
      active: {
        sessionId: "mini-migration-session",
        bundleId: "C2-01",
        startedAt: "2026-07-11T02:00:00.000Z",
        localDateKey: "2026-07-11",
        reviewSkillKey: null,
        voluntaryReplay: false,
        status: "active",
        actionIndex: 0,
        actions: [{ actionId: "S01-mini", kind: "staff", targetId: "S01", runMode: "guided", sessionMode: "mini", role: "lesson", requiredReview: false, reviewSkillKey: null }],
        completedActions: [],
        restAfterCurrentLevel: false
      },
      history: [],
      lastRest: null
    };
    const { context, page } = await openPage({
      query: "?mode=staff&session=mini&bundle=C2-01&sessionId=mini-migration-session",
      stats: legacy,
      runtime
    });
    try {
      const migrated = await readStats(page);
      const preserved = migrated?.levels?.M07?.completions === 7 &&
        migrated?.levels?.M07?.stableCompletions === 3 &&
        migrated?.levels?.M07?.legacyMarker === "keep-level" &&
        migrated?.levels?.M07?.formalCompletions === 7 &&
        migrated?.levels?.M07?.formalCompletionSource === "legacy-v2" &&
        migrated?.notes?.C?.attempts === 9 &&
        migrated?.staff?.S01?.completions === 5 &&
        migrated?.staff?.S01?.stableCompletions === 2 &&
        migrated?.staff?.S01?.formalCompletions === 5 &&
        migrated?.staff?.S01?.formalCompletionSource === "legacy-v2" &&
        migrated?.completions === 44 &&
        migrated?.stableCompletions === 11 &&
        migrated?.recent?.legacyMarker === "keep-recent";
      record("12 v2 migration preserves original fields and values", migrated?.version === 3 && preserved, migrated);
      await completeSession(page);
      const afterMini = await readStats(page);
      record("13 S01-mini writes observation only", afterMini?.retention?.observationEvents?.some((event) => event.skillKey === "staff:S01-mini") && afterMini?.retention?.stableEvents?.length === 0 && afterMini?.retention?.retainedEvents?.length === 0, afterMini?.retention);
      record("21 legacy stableCompletions remain historical stable without forged retained", afterMini?.staff?.S01?.stableCompletions === 2 && afterMini?.retention?.retainedEvents?.length === 0, afterMini);
    } finally {
      await context.close();
    }
  }

  {
    const legacyStableOnly = {
      version: 2,
      levels: {
        M07: {
          completions: 3,
          stableCompletions: 1,
          lastRunMode: "guided",
          lastCueStrength: "strong",
          needsPractice: false
        }
      },
      notes: {},
      staff: {}
    };
    const { context: displayContext, page: displayPage } = await openPage({ query: "?level=M07", stats: legacyStableOnly });
    try {
      const parent = await openParentEvidence(displayPage);
      record("21 pure v2 M07 stableCompletions remains visible as historical stable", parent.chips.some((chip) => chip.text === "本次减提示完成" && chip.active), parent);
    } finally {
      await displayContext.close();
    }

    let anchoredStats;
    const { context: firstContext, page: firstPage } = await openPage({ now: "2026-07-11T00:00:00.000Z", stats: legacyStableOnly });
    try {
      await clickMapNode(firstPage, "M06");
      const runtime = await readRuntime(firstPage);
      record("22 pure v2 stable enters the opening-review queue", runtime?.active?.actions?.[0]?.role === "opening-review" && runtime.active.actions[0].targetId === "M07", runtime);
      await completeActiveAction(firstPage);
      anchoredStats = await readStats(firstPage);
      record("23 first migrated opening review creates only a traceable stable anchor", anchoredStats?.retention?.stableEvents?.filter((event) => event.skillKey === "level:M07").length === 1 && anchoredStats?.retention?.retainedEvents?.length === 0, anchoredStats?.retention);
    } finally {
      await firstContext.close();
    }

    const { context: laterContext, page: laterPage } = await openPage({ now: "2026-07-12T00:00:00.000Z", stats: anchoredStats });
    try {
      await clickMapNode(laterPage, "M02");
      const runtime = await readRuntime(laterPage);
      record("24 later session schedules the migrated skill as opening review again", runtime?.active?.actions?.[0]?.role === "opening-review" && runtime.active.actions[0].targetId === "M07", runtime);
      await completeActiveAction(laterPage);
      const retained = await readStats(laterPage);
      record("24 later different-date eight-hour review grants retained", retained?.retention?.retainedEvents?.filter((event) => event.skillKey === "level:M07").length === 1, retained?.retention);
    } finally {
      await laterContext.close();
    }
  }

  {
    const legacyPlayedOnly = {
      version: 2,
      levels: {
        M08: {
          completions: 1,
          stableCompletions: 0,
          needsPractice: false,
          lastCompletedAt: "2026-07-09T01:00:00.000Z"
        }
      },
      notes: {},
      staff: {}
    };
    const { context, page } = await openPage({ now: "2026-07-11T08:00:00.000Z", stats: legacyPlayedOnly });
    try {
      const migrated = await readStats(page);
      record("v2 played-only M08 keeps completions and gains a traceable formal-play marker", migrated?.levels?.M08?.completions === 1 && migrated?.levels?.M08?.stableCompletions === 0 && migrated?.levels?.M08?.formalCompletions === 1 && migrated?.levels?.M08?.formalCompletionSource === "legacy-v2", migrated?.levels?.M08);
      await clickMapNode(page, "M06");
      const runtime = await readRuntime(page);
      record("v2 played-not-stable M08 enters the opening-review queue", runtime?.active?.actions?.[0]?.role === "opening-review" && runtime.active.actions[0]?.targetId === "M08" && runtime.active.actions[0]?.reviewPriority === 1, runtime);
      await completeActiveAction(page);
      const afterReview = await readStats(page);
      record("first v2 played opening review grants stable only, never retained", afterReview?.retention?.stableEvents?.filter((event) => event.skillKey === "level:M08").length === 1 && afterReview?.retention?.retainedEvents?.filter((event) => event.skillKey === "level:M08").length === 0 && afterReview?.levels?.M08?.stableCompletions === 1, afterReview?.retention);
    } finally {
      await context.close();
    }
  }

  {
    const formalCompletedAt = "2026-07-10T01:00:00.000Z";
    const stats = learningStats({
      levels: {
        M07: {
          completions: 3,
          formalCompletions: 3,
          stableCompletions: 0,
          needsPractice: true,
          lastWrongCount: 2,
          lastCompletedAt: formalCompletedAt,
          lastFormalCompletedAt: formalCompletedAt
        }
      }
    });
    const { context, page } = await openPage({ now: "2026-07-11T08:00:00.000Z", query: "?level=M07", stats });
    try {
      await completeDebugLevel(page);
      const afterDebug = await readStats(page);
      const debugIsolation = afterDebug?.levels?.M07;
      record("debug replay leaves formal completion time and needs-practice state intact", debugIsolation?.formalCompletions === 3 && debugIsolation?.lastFormalCompletedAt === formalCompletedAt && debugIsolation?.needsPractice === true && debugIsolation?.lastCompletedAt !== formalCompletedAt, debugIsolation);

      await page.goto(makeUrl("?screen=map"), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await clickMapNode(page, "M06");
      const runtime = await readRuntime(page);
      const openingReview = runtime?.active?.actions?.[0];
      record("debug replay cannot demote an existing formal needs-practice review", openingReview?.role === "opening-review" && openingReview?.targetId === "M07" && openingReview?.reviewPriority === 0, { openingReview, runtime });
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage();
    try {
      await clickMapNode(page, "M02");
      await completeSession(page, { 0: { wrongTaps: 3 } });
      const stats = await readStats(page);
      const runtime = await readRuntime(page);
      record("14 assisted retry fourth correct reaches a successful safe rest", stats?.levels?.M02?.lastAttempt?.assistedSuccesses === 1 && stats?.levels?.M02?.lastAttempt?.modeledSuccesses === 0 && runtime?.history?.at(-1)?.endReason === "assisted-safe-rest", { stats: stats?.levels?.M02, runtime });
      record("14 assisted retry fourth correct stays outside stable evidence", stats?.levels?.M02?.needsPractice === true && stats?.retention?.stableEvents?.length === 0 && stats?.retention?.retainedEvents?.length === 0, stats);
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage();
    try {
      await clickMapNode(page, "M02");
      await completeSession(page, { 0: { wrongTaps: 4 } });
      const stats = await readStats(page);
      const runtime = await readRuntime(page);
      const attempt = stats?.levels?.M02?.lastAttempt;
      await page.screenshot({ path: path.join(screenshotDir, "level-modeled-rest-1194x834.png"), fullPage: false });
      record("14 level fourth wrong triggers bounded modeled success and safe rest", attempt?.modeledSuccesses === 1 && runtime?.history?.at(-1)?.endReason === "assisted-safe-rest" && !runtime?.active, { attempt, runtime });
      record("14 modeled level input does not count as child correct or input route", attempt?.correctCount === 0 && attempt?.modeledInputs?.[0]?.source === "model" && !Object.hasOwn(attempt?.inputRoutes || {}, "model"), attempt);
      record("14 modeled level success preserves world change and needs practice only", stats?.levels?.M02?.needsPractice === true && (await readStorage(page, "starDinoCompletedLevels"))?.includes("M02") && stats?.retention?.stableEvents?.length === 0 && stats?.retention?.retainedEvents?.length === 0, stats);
    } finally {
      await context.close();
    }
  }

  {
    const runtime = {
      version: 1,
      active: {
        sessionId: "staff-modeled-session",
        bundleId: "C2-02",
        startedAt: "2026-07-11T02:00:00.000Z",
        localDateKey: "2026-07-11",
        reviewSkillKey: null,
        voluntaryReplay: false,
        status: "active",
        actionIndex: 0,
        actions: [{ actionId: "S01-guided", kind: "staff", targetId: "S01", runMode: "guided", sessionMode: "full", role: "lesson", requiredReview: false, reviewSkillKey: null }],
        completedActions: [],
        restAfterCurrentLevel: false
      },
      history: [],
      lastRest: null
    };
    const { context, page } = await openPage({
      query: "?mode=staff&bundle=C2-02&sessionId=staff-modeled-session",
      runtime
    });
    try {
      await completeSession(page, { 0: { wrongTaps: 4 } });
      const stats = await readStats(page);
      const session = await readRuntime(page);
      const attempt = stats?.staff?.S01?.lastAttempt;
      await page.screenshot({ path: path.join(screenshotDir, "staff-modeled-rest-1194x834.png"), fullPage: false });
      record("14 S01 fourth wrong models the correct route and ends at safe rest", attempt?.modeledSuccesses === 1 && session?.history?.at(-1)?.completedActions?.[0]?.targetId === "S01" && session?.history?.at(-1)?.endReason === "assisted-safe-rest", { attempt, session });
      record("14 modeled S01 input is not child correct, stable, or retained", attempt?.correctCount === 0 && !Object.hasOwn(attempt?.inputRoutes || {}, "model") && stats?.staff?.S01?.needsPractice === true && stats?.retention?.stableEvents?.length === 0 && stats?.retention?.retainedEvents?.length === 0, stats);
    } finally {
      await context.close();
    }
  }

  {
    const stable = stableEvent();
    const retained = retainedEvent();
    const stats = learningStats({
      levels: {
        M07: {
          completions: 6,
          stableCompletions: 2,
          needsPractice: true,
          todayNeedsPractice: true,
          todayNeedsPracticeDate: "2026-07-11",
          lastWrongCount: 2
        }
      },
      stableEvents: [stable],
      retainedEvents: [retained]
    });
    const { context, page } = await openPage({ query: "?level=M07", stats });
    try {
      const parent = await openParentEvidence(page);
      await page.screenshot({ path: path.join(screenshotDir, "parent-four-evidence-states-1194x834.png"), fullPage: false });
      const activeLabels = parent.chips.filter((chip) => chip.active).map((chip) => chip.text);
      record("15 parent panel distinguishes played, stable, retained, and today needs practice", ["在故事帮助下玩过", "本次减提示完成", "隔日再次减提示完成", "今天需要提示"].every((label) => activeLabels.includes(label)), parent);
      await page.locator("#parentClose").click();
      const childText = await page.evaluate(() => document.querySelector("#appShell")?.innerText || "");
      const forbidden = ["stable", "retained", "考试失败", "退步", "已经掌握", "长期掌握"].filter((term) => childText.includes(term));
      record("15 child surface contains no assessment vocabulary", forbidden.length === 0, { forbidden, childText });
    } finally {
      await context.close();
    }
  }

  {
    const anchor = stableEvent();
    const stats = learningStats({
      levels: { M07: { completions: 3, stableCompletions: 1, needsPractice: false, lastCompletedAt: anchor.completedAt } },
      stableEvents: [anchor]
    });
    const { context, page } = await openPage({ now: "2026-07-11T08:00:00.000Z", stats });
    try {
      await clickMapNode(page, "M07");
      const runtime = await readRuntime(page);
      record("16 same-bundle guided then check has no opening-review identity", runtime?.active?.actions?.every((action) => action.role === "lesson" && !action.reviewSkillKey), runtime);
      await completeSession(page);
      const after = await readStats(page);
      record("16 same-bundle guided then check does not grant retained", after?.retention?.retainedEvents?.length === 0, after?.retention);
    } finally {
      await context.close();
    }
  }

  {
    const anchor = stableEvent();
    const stats = learningStats({
      levels: { M07: { completions: 4, stableCompletions: 2, needsPractice: false, lastCompletedAt: anchor.completedAt } },
      stableEvents: [anchor]
    });
    const runtime = { version: 1, active: null, history: [{ bundleId: "C1-06", sessionId: "old-replay", status: "ended", endedAt: "2026-07-10T01:00:00.000Z" }], lastRest: null };
    const { context, page } = await openPage({ now: "2026-07-11T08:00:00.000Z", stats, runtime });
    try {
      await clickMapNode(page, "M07");
      const started = await readRuntime(page);
      record("17 voluntary replay clears reviewSkillKey", started?.active?.voluntaryReplay === true && started.active.actions.every((action) => action.role === "voluntary-replay" && !action.reviewSkillKey), started);
      await completeActiveAction(page);
      const afterGuided = await readStats(page);
      const parent = await openParentEvidence(page);
      record("19 M07 guided replay preserves historical stable", afterGuided?.retention?.stableEvents?.some((event) => event.eventId === anchor.eventId) && parent.chips.some((chip) => chip.text === "本次减提示完成" && chip.active), { afterGuided, parent });
      await page.locator("#parentClose").click();
      await page.waitForTimeout(1650);
      await completeSession(page);
      const after = await readStats(page);
      record("17 voluntary bundle replay cannot grant retained", after?.retention?.retainedEvents?.length === 0, after?.retention);
    } finally {
      await context.close();
    }
  }

  {
    const staffAnchor = stableEvent({ skillKey: "staff:S01", eventId: "staff-stable", completedAt: "2026-07-09T01:00:00.000Z" });
    const stats = learningStats({
      staff: { S01: { completions: 4, stableCompletions: 2, needsPractice: false } },
      stableEvents: [staffAnchor]
    });
    const { context, page } = await openPage({ query: "?mode=staff", stats });
    try {
      for (let index = 0; index < 6; index += 1) await tapTarget(page);
      const after = await readStats(page);
      const parent = await openParentEvidence(page);
      record("19 S01 guided replay preserves historical stable", after?.retention?.stableEvents?.some((event) => event.eventId === staffAnchor.eventId) && parent.chips.some((chip) => chip.text === "本次减提示完成" && chip.active), { after, parent });
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage();
    try {
      await clickMapNode(page, "M03");
      const firstRuns = await completeSession(page);
      const first = await readStats(page);
      const firstRuntime = await readRuntime(page);
      const firstRun = firstRuns.find((run) => run?.kind === "M03");
      const firstHistory = firstRuntime?.history?.find((session) => session.sessionId === firstRun?.sessionId);
      record("M03 first no-error Re-Do run is played only", first?.levels?.M03?.completions === 1 && first?.retention?.stableEvents?.filter((event) => event.skillKey === "level:M03").length === 0, first);
      record("Completed M03 history removes its transient audio snapshot before the next session", firstRun?.responses?.length === 2 && firstRun?.childEchoes?.length === 2 && !firstHistory?.actions?.[0]?.m03AudioAttempt && firstHistory?.completedActions?.[0]?.targetId === "M03", { firstRun, firstHistory });
      await clickMapNode(page, "M03");
      const secondStarted = await readRuntime(page);
      const secondRuns = await completeSession(page);
      const second = await readStats(page);
      const secondRuntime = await readRuntime(page);
      const secondRun = secondRuns.find((run) => run?.kind === "M03");
      const secondHistory = secondRuntime?.history?.find((session) => session.sessionId === secondRun?.sessionId);
      record("A second M03 session starts fresh and independently plays two models and two child echoes", secondStarted?.active?.sessionId === secondRun?.sessionId && secondRun?.sessionId !== firstRun?.sessionId && secondRun?.responses?.map((item) => item.modelCount).join(",") === "1,2" && secondRun?.childEchoes?.map((item) => item.childEchoCount).join(",") === "1,2" && secondRun?.responses?.[0]?.trace?.filter((event) => event.context === "model").length === 2 && secondRun?.responses?.[0]?.trace?.filter((event) => event.context === "child-echo").length === 0 && !secondHistory?.actions?.[0]?.m03AudioAttempt, { secondStarted, secondRun, secondHistory });
      record("M03 second no-error run creates stable but not retained", second?.retention?.stableEvents?.filter((event) => event.skillKey === "level:M03").length === 1 && second?.retention?.retainedEvents?.filter((event) => event.skillKey === "level:M03").length === 0, second?.retention);
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage({ query: "?level=M07" });
    try {
      await completeDebugLevel(page);
      const stats = await readStats(page);
      record("debug deep link does not forge formal stable or retained events", stats?.retention?.stableEvents?.length === 0 && stats?.retention?.retainedEvents?.length === 0, stats?.retention);
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage({ query: "?screen=map" });
    try {
      await clickMapNode(page, "M04");
      const started = await readRuntime(page);
      const sessionId = started?.active?.sessionId;
      const actionId = started?.active?.actions?.[started.active.actionIndex || 0]?.actionId;
      await page.goto(makeUrl(), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await page.waitForSelector("#mapShell", { state: "visible", timeout: 6000 });
      const rootRecovery = await page.evaluate(() => ({
        mapVisible: !document.querySelector("#mapShell")?.hidden,
        activeStatusVisible: !document.querySelector("#mapSessionStatus")?.hidden,
        activeState: document.querySelector("#mapSessionStatus")?.dataset.state || "",
        runtime: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null")
      }));
      record("1 root address restores the active session to an active map", rootRecovery.mapVisible && rootRecovery.activeStatusVisible && rootRecovery.activeState === "active" && rootRecovery.runtime?.active?.sessionId === sessionId, { sessionId, rootRecovery });

      await page.goto(makeUrl("?screen=map"), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await page.waitForSelector("#mapShell", { state: "visible", timeout: 6000 });
      const mapRecovery = await readRuntime(page);
      record("1 explicit map address keeps the same active session", mapRecovery?.active?.sessionId === sessionId && mapRecovery.active?.actions?.[mapRecovery.active.actionIndex || 0]?.actionId === actionId, { sessionId, actionId, mapRecovery });

      await clickMapNode(page, "M04");
      const resumed = await readRuntime(page);
      record("1 active map node resumes the same action without a new session", resumed?.active?.sessionId === sessionId && resumed.active?.actions?.[resumed.active.actionIndex || 0]?.actionId === actionId, { sessionId, actionId, resumed });
    } finally {
      await context.close();
    }
  }

  {
    const { context, page } = await openPage({ query: "?level=M08" });
    try {
      await completeDebugLevel(page);
      await page.goto(makeUrl("?mode=staff"), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await completeDebugLevel(page);
      const debugStats = await readStats(page);
      const debugOnly = (Number(debugStats?.levels?.M08?.formalCompletions) || 0) === 0 &&
        (Number(debugStats?.staff?.S01?.formalCompletions) || 0) === 0 &&
        (Number(debugStats?.levels?.M08?.stableCompletions) || 0) === 0 &&
        (Number(debugStats?.staff?.S01?.stableCompletions) || 0) === 0;
      record("debug M08 and S01 completion create no formal completion or stable evidence", debugOnly, debugStats);

      await page.goto(makeUrl("?screen=map"), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await clickMapNode(page, "M06");
      const formal = await readRuntime(page);
      const reviewTargets = formal?.active?.actions?.filter((action) => action.role === "opening-review").map((action) => action.targetId) || [];
      record("debug-only future M08/S01 completions do not enter a formal opening-review queue", !reviewTargets.includes("M08") && !reviewTargets.includes("S01"), { reviewTargets, formal });
    } finally {
      await context.close();
    }
  }

  record("browser console is clean", browserErrors.length === 0, { browserErrors });

  const failed = checks.filter((check) => !check.pass);
  for (const check of checks) {
    console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
    if (!check.pass) console.log(JSON.stringify(check.details, null, 2));
  }
  console.log(`session/retention checks: ${checks.length - failed.length} passed, ${failed.length} failed`);
  if (failed.length) process.exitCode = 1;
} finally {
  await browser.close();
}
