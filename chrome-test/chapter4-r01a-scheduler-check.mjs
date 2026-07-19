import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const checks = [];
const errors = [];
let browser;
let context;
let currentScenario = "launch";
const suiteDeadline = setTimeout(() => failHard(`suite timeout at ${currentScenario}`), 120000);

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function scheduler(candidates = [], reviewSpacingAfterSessionId = null) {
  return { version: 1, candidates, reviewSpacingAfterSessionId };
}

function candidate(skillKey, sourceLevelId, reason = "needs-practice", extras = {}) {
  return {
    skillKey,
    sourceLevelId,
    sourceSessionId: `${sourceLevelId}-source`,
    reason,
    nextMode: reason === "needs-practice" ? "remediation" : "reduced-cue",
    createdAt: "2026-07-01T00:00:00.000Z",
    status: "ready",
    ...extras
  };
}

function formalEnded(sessionId) {
  return { sessionId, bundleId: "C4-fixture", formalSession: true, status: "ended", actions: [{ actionId: "story", role: "lesson" }] };
}

async function closeResources() {
  await Promise.allSettled([context?.close(), browser?.close()].filter(Boolean));
  context = null;
  browser = null;
}

function failHard(message) {
  console.error(`chapter4 R01A scheduler check: ${message}`);
  process.exitCode = 1;
  void closeResources().finally(() => process.exit(1));
}

async function run() {
  currentScenario = "browser-launch";
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
  context = await browser.newContext();
  await context.addInitScript(() => { window.__STAR_DINO_R01A_TEST__ = true; });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(String(error)));
  currentScenario = "load-isolated-fixture";
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });

  const result = await page.evaluate(() => {
    const api = window.__starDinoR01ATestApi;
    const fixtureScheduler = (candidates = [], reviewSpacingAfterSessionId = null) => ({ version: 1, candidates, reviewSpacingAfterSessionId });
    const fixtureCandidate = (skillKey, sourceLevelId, reason = "needs-practice", extras = {}) => ({
      skillKey,
      sourceLevelId,
      sourceSessionId: `${sourceLevelId}-source`,
      reason,
      nextMode: reason === "needs-practice" ? "remediation" : "reduced-cue",
      createdAt: "2026-07-01T00:00:00.000Z",
      status: "ready",
      ...extras
    });
    const fixtureFormalEnded = (sessionId) => ({ sessionId, bundleId: "C4-fixture", formalSession: true, status: "ended", actions: [{ role: "lesson" }] });
    const stableEvent = (extras = {}) => ({ eventId: "stable-fixture", evidenceType: "stable", skillKey: "level:LP01", levelId: "LP01", sessionId: "stable-session", completedAt: "2026-07-19T00:00:00.000Z", localDateKey: "2026-07-19", runMode: "check", wrongCount: 0, cueStrength: "none", strongCueFrames: 0, inputRoutes: { "\u5c4f\u5e55": 4 }, experimentalInput: false, thresholdVersion: "preschool-v1-2026-07-11", ...extras });
    const storageBefore = {
      runtime: localStorage.getItem("starDinoSessionRuntime"),
      stats: localStorage.getItem("starDinoLearningStats")
    };
    const now = new Date("2026-07-20T12:00:00.000Z");
    const lp01Evidence = {
      openingReviewQueue: ["LP01"],
      lessonEvidence: { LP01: { played: true, completedAt: "2026-07-01T00:00:00.000Z", sessionId: "lp01-legacy" } }
    };
    const lp02Evidence = {
      openingReviewQueue: [],
      lessonEvidence: { LP02: { played: true, completedAt: "2026-07-02T00:00:00.000Z", sessionId: "lp02-formal" } }
    };
    const learning = {
      levels: {
        LP01: { formalCompletions: 1, needsPractice: true, lastFormalCompletedAt: "2026-07-01T00:00:00.000Z" },
        LP02: { formalCompletions: 1, needsPractice: false, stableCompletions: 0, lastFormalCompletedAt: "2026-07-02T00:00:00.000Z" }
      },
      retention: { stableEvents: [], retainedEvents: [] }
    };
    const migratedOne = api.migrateChapter4ReviewScheduler({ chapter4: lp01Evidence, learningStats: learning, now });
    const migratedTwo = api.migrateChapter4ReviewScheduler({ chapter4: { ...lp01Evidence, reviewScheduler: migratedOne }, learningStats: learning, now });
    const lp02Migrated = api.migrateChapter4ReviewScheduler({ chapter4: lp02Evidence, learningStats: learning, now });
    const candidateIsolation = api.normalizeChapter4ReviewScheduler(fixtureScheduler([
      fixtureCandidate("level:LP01", "LP01"),
      fixtureCandidate("low-key:C3", "LP02"),
      fixtureCandidate("unknown:skill", "LP01"),
      fixtureCandidate("low-key:C3", "LP01"),
      fixtureCandidate("level:LP01", "LP02"),
      { skillKey: "level:LP01", reason: "needs-practice", status: "ready" }
    ]));
    const retained = api.migrateChapter4ReviewScheduler({
      chapter4: { lessonEvidence: { LP01: { played: true, completedAt: "2026-07-19T00:00:00.000Z" } } },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 0, lastFormalCompletedAt: "2026-07-19T00:00:00.000Z" } }, retention: { stableEvents: [stableEvent({ eventId: "stable-lp01-event", sessionId: "stable-lp01" })], retainedEvents: [] } },
      now
    });
    const v2OnlyStable = api.migrateChapter4ReviewScheduler({
      chapter4: { lessonEvidence: { LP01: { played: true, completedAt: "2026-07-19T00:00:00.000Z" } } },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 1, lastFormalCompletedAt: "2026-07-18T00:00:00.000Z" } }, retention: { stableEvents: [], retainedEvents: [] } },
      now
    });
    const savedLocalDateAnchor = api.migrateChapter4ReviewScheduler({
      chapter4: { lessonEvidence: { LP01: { played: true } } },
      learningStats: { levels: { LP01: { formalCompletions: 1, stableCompletions: 1 } }, retention: { stableEvents: [stableEvent({ eventId: "stable-saved-local-date", sessionId: "stable-zone", completedAt: "2026-07-20T00:30:00.000Z", localDateKey: "2026-07-19" })], retainedEvents: [] } },
      now
    });
    const eligibleAnchors = [
      stableEvent({ eventId: "stable-old-event", sourceSessionId: "stable-old", sessionId: "stable-old", endedAt: "2026-07-18T00:00:00.000Z", completedAt: "2026-07-18T00:00:00.000Z", localDateKey: "2026-07-18" }),
      stableEvent({ eventId: "stable-same-day-event", sourceSessionId: "stable-same-day", sessionId: "stable-same-day", endedAt: "2026-07-20T10:00:00.000Z", completedAt: "2026-07-20T10:00:00.000Z", localDateKey: "2026-07-20" })
    ];
    const closedReopened = api.migrateChapter4ReviewScheduler({
      chapter4: { openingReviewQueue: ["LP01"], lessonEvidence: { LP01: { played: true, needsPractice: true, sessionId: "ordinary-play", completedAt: "2026-07-20T11:00:00.000Z" } }, reviewScheduler: fixtureScheduler([fixtureCandidate("level:LP01", "LP01", "played-not-stable", { status: "closed", settledResult: "stable", lastAttemptAt: "2026-07-17T00:00:00.000Z" })]) },
      learningStats: { levels: { LP01: { formalCompletions: 3, stableCompletions: 1, lastFormalCompletedAt: "2026-07-20T11:00:00.000Z" } }, retention: { stableEvents: eligibleAnchors, retainedEvents: [] } },
      now
    });
    const sameDayClosed = api.migrateChapter4ReviewScheduler({
      chapter4: { openingReviewQueue: ["LP01"], lessonEvidence: { LP01: { played: true, needsPractice: true } }, reviewScheduler: fixtureScheduler([fixtureCandidate("level:LP01", "LP01", "played-not-stable", { status: "closed", settledResult: "stable", lastAttemptAt: "2026-07-19T00:00:00.000Z" })]) },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 1 } }, retention: { stableEvents: [stableEvent({ eventId: "stable-today-event", sourceSessionId: "stable-today", sessionId: "stable-today", endedAt: "2026-07-20T10:00:00.000Z", completedAt: "2026-07-20T10:00:00.000Z", localDateKey: "2026-07-20" })], retainedEvents: [] } },
      now
    });
    const stableAt = "2026-07-20T08:00:00.000Z";
    const settledStable = api.settleChapter4OpeningReview(
      fixtureScheduler([fixtureCandidate("level:LP01", "LP01", "played-not-stable", { nextMode: "reduced-cue" })]),
      { skillKey: "level:LP01", sessionId: "stable-settle-session", result: "stable", endedAt: stableAt }
    );
    const canonicalSettledEvent = stableEvent({ eventId: "stable-settle-event", sessionId: "stable-settle-session", completedAt: stableAt, localDateKey: "2026-07-20" });
    const sameDaySettled = api.migrateChapter4ReviewScheduler({
      chapter4: { openingReviewQueue: ["LP01"], lessonEvidence: { LP01: { played: true, needsPractice: true } }, reviewScheduler: settledStable },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 1 } }, retention: { stableEvents: [canonicalSettledEvent], retainedEvents: [] } },
      now: new Date("2026-07-20T09:00:00.000Z")
    });
    const crossDaySettled = api.migrateChapter4ReviewScheduler({
      chapter4: { openingReviewQueue: ["LP01"], lessonEvidence: { LP01: { played: true, needsPractice: true } }, reviewScheduler: settledStable },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 1 } }, retention: { stableEvents: [canonicalSettledEvent], retainedEvents: [] } },
      now: new Date("2026-07-21T09:00:00.000Z")
    });
    const crossDaySettledRepeat = api.migrateChapter4ReviewScheduler({
      chapter4: { openingReviewQueue: ["LP01"], lessonEvidence: { LP01: { played: true, needsPractice: true } }, reviewScheduler: crossDaySettled },
      learningStats: { levels: { LP01: { formalCompletions: 2, stableCompletions: 1 } }, retention: { stableEvents: [canonicalSettledEvent], retainedEvents: [] } },
      now: new Date("2026-07-21T09:00:00.000Z")
    });
    const remedial = api.settleChapter4OpeningReview(
      fixtureScheduler([fixtureCandidate("level:LP01", "LP01")]),
      { skillKey: "level:LP01", sessionId: "review-1", result: "remediation-complete", endedAt: "2026-07-20T12:00:00.000Z" }
    );
    const difficult = api.settleChapter4OpeningReview(remedial, {
      skillKey: "level:LP01", sessionId: "review-2", result: "difficult", endedAt: "2026-07-21T12:00:00.000Z"
    });
    const afterPending = api.reconcileChapter4ReviewScheduler(difficult, [{ sessionId: "review-2", formalSession: true, status: "active" }]);
    const afterFormal = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] },
      { sessionId: "story-3", formalSession: true, childParticipation: true, status: "ended", actions: [{ actionId: "story-action", role: "lesson" }], completedActions: [{ actionId: "story-action", role: "lesson", completedAt: "2026-07-21T12:01:00.000Z", completionSource: "child", childCorrectCount: 1, childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }] }] }
    ]);
    const beforeAnchorHistory = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "old-story", formalSession: true, status: "ended", actions: [{ role: "lesson" }] },
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] }
    ]);
    const nextReviewHistory = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] },
      { sessionId: "review-3", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] }
    ]);
    const assistedStory = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] },
      { sessionId: "assisted-story", formalSession: true, status: "ended", actions: [{ actionId: "story", role: "lesson" }], completedActions: [{ actionId: "story", completedAt: "2026-07-21T12:01:00.000Z", completionSource: "model", childInputs: [{ source: "\u5c4f\u5e55", result: "wrong" }] }] }
    ]);
    const autoModeledStory = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] },
      { sessionId: "auto-story", formalSession: true, status: "ended", actions: [{ actionId: "story", role: "lesson", modeledInputs: [{ source: "model" }] }], completedActions: [{ actionId: "story", completedAt: "2026-07-21T12:01:00.000Z", completionSource: "model", childInputs: [] }] }
    ]);
    const resumedStory = api.reconcileChapter4ReviewScheduler(difficult, [
      { sessionId: "review-2", formalSession: true, status: "ended", actions: [{ role: "opening-review" }] },
      { sessionId: "resume-story", formalSession: true, resumeOfSessionId: "prior-story", status: "ended", actions: [{ actionId: "resume-action", role: "lesson-resume" }], completedActions: [{ actionId: "resume-action", completedAt: "2026-07-21T12:01:00.000Z", childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }] }] }
    ]);
    const fair = api.selectChapter4OpeningReview({
      scheduler: fixtureScheduler([
        fixtureCandidate("level:LP01", "LP01", "needs-practice", { lastAttemptAt: "2026-07-01T00:00:00.000Z" }),
        fixtureCandidate("low-key:C3", "LP02", "needs-practice")
      ]),
      sessionId: "fair-1"
    });
    const older = api.selectChapter4OpeningReview({
      scheduler: fixtureScheduler([
        fixtureCandidate("level:LP01", "LP01", "needs-practice", { lastAttemptAt: "2026-07-01T00:00:00.000Z" }),
        fixtureCandidate("low-key:C3", "LP02", "needs-practice", { lastAttemptAt: "2026-07-02T00:00:00.000Z" })
      ]),
      sessionId: "fair-2"
    });
    const evidenceTimeFair = api.selectChapter4OpeningReview({
      scheduler: fixtureScheduler([
        fixtureCandidate("level:LP01", "LP01", "needs-practice", { createdAt: "2026-07-03T00:00:00.000Z" }),
        fixtureCandidate("low-key:C3", "LP02", "needs-practice", { createdAt: "2026-07-01T00:00:00.000Z" })
      ]), sessionId: "fair-evidence"
    });
    const corruptAttemptFair = api.selectChapter4OpeningReview({
      scheduler: fixtureScheduler([
        fixtureCandidate("level:LP01", "LP01", "needs-practice", { lastAttemptAt: "not-a-date", createdAt: "2026-07-01T00:00:00.000Z" }),
        fixtureCandidate("low-key:C3", "LP02", "needs-practice", { lastAttemptAt: "2026-07-03T00:00:00.000Z", createdAt: "2026-07-03T00:00:00.000Z" })
      ]), sessionId: "fair-corrupt"
    });
    const sourceActions = [{ actionId: "future-real-action", targetId: "LP04", nested: { untouched: true } }];
    const plan = api.composeChapter4ReviewPlan({ actions: sourceActions, scheduler: fixtureScheduler([fixtureCandidate("low-key:C3", "LP02")]), sessionId: "plan-1" });
    const resumePlan = api.composeChapter4ReviewPlan({ actions: sourceActions, resumeOfSessionId: "old-session", scheduler: fixtureScheduler([fixtureCandidate("low-key:C3", "LP02")]) });
    const spaced = api.selectChapter4OpeningReview({ scheduler: fixtureScheduler([fixtureCandidate("low-key:C3", "LP02")], "review-1"), history: [fixtureFormalEnded("review-1")] });
    const axes = [
      api.classifyLp02OpeningReviewInput({ midi: 48, route: "screen" }),
      api.classifyLp02OpeningReviewInput({ midi: 60, route: "screen" }),
      api.classifyLp02OpeningReviewInput({ midi: 50, route: "screen" }),
      api.classifyLp02OpeningReviewInput({ midi: 49, route: "screen" }),
      api.classifyLp02OpeningReviewInput({ midi: 48, route: "MIDI" }),
      api.classifyLp02OpeningReviewInput({ midi: 48, route: "麦克风", microphoneAmbiguous: true })
    ];
    const storageAfter = {
      runtime: localStorage.getItem("starDinoSessionRuntime"),
      stats: localStorage.getItem("starDinoLearningStats")
    };
    return { api: Boolean(api), storageBefore, storageAfter, migratedOne, migratedTwo, lp02Migrated, candidateIsolation, retained, v2OnlyStable, savedLocalDateAnchor, closedReopened, sameDayClosed, sameDaySettled, crossDaySettled, crossDaySettledRepeat, remedial, difficult, afterPending, afterFormal, beforeAnchorHistory, nextReviewHistory, assistedStory, autoModeledStory, resumedStory, fair, older, evidenceTimeFair, corruptAttemptFair, sourceActions, plan, resumePlan, spaced, axes };
  });

  record("test-only scheduler API is opt-in", result.api);
  record("isolated fixture leaves formal child storage byte-identical", JSON.stringify(result.storageBefore) === JSON.stringify(result.storageAfter), result.storageAfter);
  const lp01 = result.migratedOne.candidates.find((item) => item.skillKey === "level:LP01");
  record("LP01 legacy queue migrates one complete remediation candidate", Boolean(lp01) && ["skillKey", "sourceSessionId", "reason", "priority", "nextMode", "remediationPreparedAt", "createdAt", "lastAttemptAt", "lastAttemptSessionId", "cooldownAfterSessionId", "status"].every((key) => Object.hasOwn(lp01, key)), lp01);
  const lp01Twice = result.migratedTwo.candidates.filter((item) => item.skillKey === "level:LP01");
  record("LP01 migration is idempotent and preserves candidate identity", lp01Twice.length === 1 && lp01Twice[0].nextMode === "remediation", result.migratedTwo);
  const lowKey = result.lp02Migrated.candidates.filter((item) => item.skillKey === "low-key:C3");
  record("LP02 historical played evidence creates exactly one low-key candidate", lowKey.length === 1 && lowKey[0].reason === "played-not-stable", lowKey);
  record("scheduler drops unknown, missing, and skill-level-mismatched candidates without remapping", result.candidateIsolation.candidates.length === 2 && result.candidateIsolation.candidates.some((item) => item.skillKey === "level:LP01" && item.sourceLevelId === "LP01") && result.candidateIsolation.candidates.some((item) => item.skillKey === "low-key:C3" && item.sourceLevelId === "LP02"), result.candidateIsolation);
  record("retained-due requires stable anchor plus later date and eight-hour interval", result.retained.candidates[0]?.reason === "retained-due", result.retained);
  record("pure v2 stable count cannot fabricate a retained-due candidate", result.v2OnlyStable.candidates[0]?.reason === "played-not-stable", result.v2OnlyStable);
  record("retained eligibility uses saved event localDateKey rather than current-timezone timestamp derivation", result.savedLocalDateAnchor.candidates[0]?.reason === "retained-due" && result.savedLocalDateAnchor.candidates[0]?.sourceSessionId === "stable-zone", result.savedLocalDateAnchor);
  record("closed stable candidate overrides legacy LP01 queue and reopens once from the selected eligible anchor only", result.closedReopened.candidates.length === 1 && result.closedReopened.candidates[0]?.reason === "retained-due" && result.closedReopened.candidates[0]?.sourceSessionId === "stable-old" && result.closedReopened.candidates[0]?.createdAt === "2026-07-18T00:00:00.000Z", result.closedReopened);
  record("same-day traceable stable does not reopen a closed candidate", result.sameDayClosed.candidates[0]?.status === "closed", result.sameDayClosed);
  record("same-session stable settle stays closed on its local day", result.sameDaySettled.candidates[0]?.status === "closed", result.sameDaySettled);
  record("same-session stable settle reopens from an equal-time cross-day anchor", result.crossDaySettled.candidates.length === 1 && result.crossDaySettled.candidates[0]?.reason === "retained-due" && result.crossDaySettled.candidates[0]?.sourceSessionId === "stable-settle-session", result.crossDaySettled);
  record("same-session stable cross-day reopen is idempotent", result.crossDaySettledRepeat.candidates.length === 1, result.crossDaySettledRepeat);
  record("successful remediation changes the same candidate to reduced-cue", result.remedial.candidates[0]?.nextMode === "reduced-cue" && result.remedial.reviewSpacingAfterSessionId === "review-1", result.remedial);
  record("difficult review restores remediation and sets candidate cooldown", result.difficult.candidates[0]?.status === "cooldown" && result.difficult.candidates[0]?.cooldownAfterSessionId === "review-2", result.difficult);
  record("active or same-session state cannot consume cooldown or global spacing", result.afterPending.candidates[0]?.status === "cooldown" && result.afterPending.reviewSpacingAfterSessionId === "review-2", result.afterPending);
  record("older ended history before the review anchor cannot consume cooldown or spacing", result.beforeAnchorHistory.candidates[0]?.status === "cooldown" && result.beforeAnchorHistory.reviewSpacingAfterSessionId === "review-2", result.beforeAnchorHistory);
  record("a later review session cannot consume global story-first spacing", result.nextReviewHistory.reviewSpacingAfterSessionId === "review-2", result.nextReviewHistory);
  record("wrong child input followed by assisted or modeled story completion consumes spacing", result.assistedStory.reviewSpacingAfterSessionId === null && result.assistedStory.candidates[0]?.status === "ready", result.assistedStory);
  record("automatic modeled story with zero child inputs cannot consume spacing", result.autoModeledStory.reviewSpacingAfterSessionId === "review-2" && result.autoModeledStory.candidates[0]?.status === "cooldown", result.autoModeledStory);
  record("formal lesson-resume with a completed real child input consumes spacing", result.resumedStory.reviewSpacingAfterSessionId === null && result.resumedStory.candidates[0]?.status === "ready", result.resumedStory);
  record("later formal ended story session consumes cooldown and global spacing", result.afterFormal.candidates[0]?.status === "ready" && !result.afterFormal.reviewSpacingAfterSessionId, result.afterFormal);
  record("fairness gives an untried equal-priority LP02 candidate its turn", result.fair.candidate?.skillKey === "low-key:C3", result.fair);
  record("after first attempts, oldest formal review attempt wins the tie", result.older.candidate?.skillKey === "level:LP01", result.older);
  record("equal-priority untried candidates use evidence time before fixed skill-key order", result.evidenceTimeFair.candidate?.skillKey === "low-key:C3", result.evidenceTimeFair);
  record("corrupt attempted timestamp ranks after valid attempted evidence and never becomes untried", result.corruptAttemptFair.candidate?.skillKey === "low-key:C3", result.corruptAttemptFair);
  record("composed plan prepends at most one review and does not mutate target actions", result.plan.actions.length === 2 && result.plan.review?.role === "opening-review" && JSON.stringify(result.sourceActions) === JSON.stringify([{ actionId: "future-real-action", targetId: "LP04", nested: { untouched: true } }]), result.plan);
  record("review action mode follows candidate mode instead of forcing LP02 guided", result.plan.review?.runMode === "guided" && result.remedial.candidates[0]?.nextMode === "reduced-cue" && result.remedial.candidates[0]?.priority === 1, { plan: result.plan, remedial: result.remedial });
  record("resume plan remains story-only and preserves action order", !result.resumePlan.review && result.resumePlan.actions.length === 1 && result.resumePlan.actions[0].actionId === "future-real-action", result.resumePlan);
  record("global review spacing forces the following formal plan to be story-first", result.spaced.reason === "global-spacing" && !result.spaced.action, result.spaced);
  const [exactC3, highC4, whiteWrong, blackWrong, midiC3, micAmbiguous] = result.axes;
  record("LP02 exact touch C3 is the only first-pass stable route", exactC3.stableEligible && !highC4.stableEligible && !whiteWrong.stableEligible && !blackWrong.stableEligible, result.axes);
  record("LP02 distinguishes C4 same-name octave, white-key register, and black-key identity", highC4.noteNameCorrect && !highC4.registerCorrect && highC4.sameNameWrongOctave && !whiteWrong.noteNameCorrect && whiteWrong.registerCorrect && blackWrong.isBlack && Boolean(blackWrong.pitchName), result.axes);
  record("LP02 MIDI is observation-only and ambiguous microphone cannot score", !midiC3.stableEligible && midiC3.played && !micAmbiguous.played && micAmbiguous.assistedOnly, result.axes);
  const source = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
  record("R01A leaves no formal C4-03 map node or session bundle in runtime", !/bundleId:\s*["']C4-03/.test(source) && !/data-level=["']C4-03/.test(source), {});

  await closeResources();
  clearTimeout(suiteDeadline);
  const failed = checks.filter((check) => !check.pass);
  console.log(`chapter4 R01A scheduler checks: ${checks.length - failed.length}/${checks.length}`);
  checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
  if (errors.length) console.log(`browser diagnostics: ${JSON.stringify(errors)}`);
  process.exitCode = failed.length || errors.length ? 1 : 0;
}

run().catch(async (error) => {
  clearTimeout(suiteDeadline);
  console.error(`chapter4 R01A scheduler check failed at ${currentScenario}: ${error.stack || error}`);
  await closeResources();
  process.exit(1);
});
