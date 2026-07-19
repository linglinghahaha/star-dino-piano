import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4175/";
const checks = [];
const browserErrors = [];
let browser;
let context;
let scenario = "launch";

const deadline = setTimeout(() => {
  console.error(`supervisor R01A P1 timeout at ${scenario}`);
  process.exit(1);
}, 120000);

function record(name, pass, details) {
  checks.push({ name, pass: Boolean(pass), details });
}

async function closeResources() {
  await Promise.allSettled([context?.close(), browser?.close()].filter(Boolean));
  context = null;
  browser = null;
}

async function run() {
  scenario = "browser-launch";
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_EXECUTABLE || undefined
  });
  context = await browser.newContext({ serviceWorkers: "block" });
  await context.addInitScript(() => {
    window.__STAR_DINO_R01A_TEST__ = true;
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(String(error)));

  scenario = "load-opt-in-api";
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });

  scenario = "adversarial-fixtures";
  const result = await page.evaluate(() => {
    const api = window.__starDinoR01ATestApi;
    const skillKey = "level:LP01";
    const candidate = (key = skillKey, sourceLevelId = "LP01", extras = {}) => ({
      skillKey: key,
      sourceLevelId,
      sourceSessionId: `${sourceLevelId}-source`,
      reason: "needs-practice",
      nextMode: "remediation",
      createdAt: "2026-07-01T00:00:00.000Z",
      status: "ready",
      ...extras
    });
    const scheduler = (items, spacing = null) => ({
      version: 1,
      candidates: items,
      reviewSpacingAfterSessionId: spacing
    });
    const fullStable = (extras = {}) => ({
      eventId: "stable-full",
      evidenceType: "stable",
      skillKey,
      levelId: "LP01",
      staffCourseId: null,
      sessionId: "stable-source",
      bundleId: "C4-fixture",
      sessionActionId: "opening-review",
      sessionRole: "opening-review",
      reviewSkillKey: skillKey,
      completedAt: "2026-07-20T00:00:00.000Z",
      localDateKey: "2026-07-20",
      runMode: "check",
      wrongCount: 0,
      cueStrength: "soft",
      strongCueFrames: 0,
      inputRoutes: { "\u5c4f\u5e55": 4 },
      experimentalInput: false,
      thresholdVersion: "preschool-v1-2026-07-11",
      ...extras
    });
    const chapter4 = (reviewScheduler = undefined) => ({
      openingReviewQueue: [],
      lessonEvidence: {
        LP01: {
          played: true,
          completedAt: "2026-07-20T00:00:00.000Z",
          sessionId: "LP01-story"
        }
      },
      ...(reviewScheduler ? { reviewScheduler } : {})
    });
    const learning = (stableEvents, retainedEvents = []) => ({
      levels: {
        LP01: {
          formalCompletions: 2,
          stableCompletions: 1,
          needsPractice: false,
          lastFormalCompletedAt: "2026-07-20T00:00:00.000Z"
        }
      },
      retention: { stableEvents, retainedEvents }
    });
    const migrate = (events, now, retainedEvents = [], chapter = chapter4()) =>
      api.migrateChapter4ReviewScheduler({
        chapter4: chapter,
        learningStats: learning(events, retainedEvents),
        now: new Date(now)
      });

    const canonical = migrate([fullStable()], "2026-07-21T12:00:00.000Z");
    const incomplete = migrate([{
      eventId: "stable-partial",
      evidenceType: "stable",
      skillKey,
      sessionId: "partial-source",
      completedAt: "2026-07-20T00:00:00.000Z",
      localDateKey: "2026-07-20"
    }], "2026-07-21T12:00:00.000Z");
    const explicitClockInvalid = migrate([
      fullStable({ eventId: "stable-clock-invalid", clockValid: false })
    ], "2026-07-21T12:00:00.000Z");
    const contradictoryStrong = migrate([
      fullStable({ eventId: "stable-strong", cueStrength: "strong", strongCueFrames: 8 })
    ], "2026-07-21T12:00:00.000Z");
    const zeroRouteEvidence = migrate([
      fullStable({ eventId: "stable-zero-routes", inputRoutes: { "touch-bubble": 0 } })
    ], "2026-07-21T12:00:00.000Z");
    const systemRouteEvidence = migrate([
      fullStable({ eventId: "stable-system-route", inputRoutes: { system: 1 } })
    ], "2026-07-21T12:00:00.000Z");
    const impossibleLocalDate = migrate([
      fullStable({ eventId: "stable-impossible-date", localDateKey: "2026-99-99" })
    ], "2026-07-21T12:00:00.000Z");
    const requiredStableFields = [
      "eventId",
      "evidenceType",
      "skillKey",
      "levelId",
      "sessionId",
      "completedAt",
      "localDateKey",
      "runMode",
      "wrongCount",
      "cueStrength",
      "strongCueFrames",
      "inputRoutes",
      "experimentalInput",
      "thresholdVersion"
    ];
    const missingStableFieldResults = Object.fromEntries(requiredStableFields.map((field) => {
      const event = fullStable({ eventId: `stable-missing-${field}` });
      delete event[field];
      return [field, migrate([event], "2026-07-21T12:00:00.000Z")];
    }));

    const latestEligible = migrate([
      fullStable({
        eventId: "stable-old-eligible",
        sessionId: "old-eligible-session",
        completedAt: "2026-07-19T00:00:00.000Z",
        localDateKey: "2026-07-19"
      }),
      fullStable({
        eventId: "stable-new-same-day",
        sessionId: "new-same-day-session",
        completedAt: "2026-07-20T10:00:00.000Z",
        localDateKey: "2026-07-20"
      })
    ], "2026-07-20T12:00:00.000Z");

    const lp02Chapter = {
      openingReviewQueue: [],
      lessonEvidence: {
        LP02: {
          played: true,
          completedAt: "2026-07-20T00:00:00.000Z",
          sessionId: "LP02-story"
        }
      }
    };
    const lp02Learning = (event) => ({
      levels: {
        LP02: {
          formalCompletions: 2,
          stableCompletions: 1,
          needsPractice: false,
          lastFormalCompletedAt: "2026-07-20T00:00:00.000Z"
        }
      },
      retention: { stableEvents: [event], retainedEvents: [] }
    });
    const lp02Stable = {
      ...fullStable({
        eventId: "stable-low-c",
        skillKey: "low-key:C3",
        levelId: "LP02",
        sessionId: "stable-low-c-source",
        inputRoutes: { "\u5c4f\u5e55": 1 }
      })
    };
    const lp02Canonical = api.migrateChapter4ReviewScheduler({
      chapter4: lp02Chapter,
      learningStats: lp02Learning(lp02Stable),
      now: new Date("2026-07-21T12:00:00.000Z")
    });
    const lp02MissingLevel = { ...lp02Stable };
    delete lp02MissingLevel.levelId;
    const lp02Incomplete = api.migrateChapter4ReviewScheduler({
      chapter4: lp02Chapter,
      learningStats: lp02Learning(lp02MissingLevel),
      now: new Date("2026-07-21T12:00:00.000Z")
    });

    const v2Only = api.migrateChapter4ReviewScheduler({
      chapter4: chapter4(),
      learningStats: {
        levels: {
          LP01: {
            formalCompletions: 2,
            stableCompletions: 2,
            needsPractice: false,
            lastFormalCompletedAt: "2026-07-18T00:00:00.000Z"
          }
        },
        retention: { stableEvents: [], retainedEvents: [] }
      },
      now: new Date("2026-07-21T12:00:00.000Z")
    });

    const reviewAnchor = {
      sessionId: "review-anchor",
      bundleId: "C4-fixture",
      formalSession: true,
      status: "ended",
      actions: [{ actionId: "review", role: "opening-review" }],
      completedActions: [{ actionId: "review", completedAt: "2026-07-20T00:00:00.000Z" }]
    };
    const cooldown = scheduler([
      candidate(skillKey, "LP01", {
        status: "cooldown",
        cooldownAfterSessionId: "review-anchor",
        lastAttemptAt: "2026-07-20T00:00:00.000Z"
      })
    ], "review-anchor");
    const story = ({
      sessionId,
      role = "lesson",
      status = "ended",
      childInputs = [],
      completedAt = "2026-07-20T01:00:00.000Z",
      directMode = false,
      voluntaryReplay = false,
      resumeOfSessionId = null
    }) => ({
      sessionId,
      bundleId: "C4-story",
      formalSession: true,
      directMode,
      voluntaryReplay,
      resumeOfSessionId,
      status,
      actions: [{ actionId: "story-action", role }],
      completedActions: [{ actionId: "story-action", completedAt, childInputs }]
    });
    const reconcileStory = (entry) =>
      api.reconcileChapter4ReviewScheduler(cooldown, [reviewAnchor, entry]);
    const emptySourceStory = reconcileStory(story({
      sessionId: "empty-source",
      childInputs: [{ result: "wrong" }]
    }));
    const modeledStory = reconcileStory(story({
      sessionId: "modeled",
      childInputs: [{ source: "model", result: "correct" }]
    }));
    const realWrongStory = reconcileStory(story({
      sessionId: "real-wrong",
      childInputs: [{ source: "\u5c4f\u5e55", result: "wrong" }]
    }));
    const invalidCompletion = reconcileStory(story({
      sessionId: "invalid-completion",
      completedAt: "not-a-time",
      childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }]
    }));
    const activeResume = reconcileStory(story({
      sessionId: "active-resume",
      role: "lesson-resume",
      status: "active",
      resumeOfSessionId: "prior-story",
      childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }]
    }));
    const endedResume = reconcileStory(story({
      sessionId: "ended-resume",
      role: "lesson-resume",
      resumeOfSessionId: "prior-story",
      childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }]
    }));

    const settleAt = "2026-07-20T00:00:00.000Z";
    const settled = api.settleChapter4OpeningReview(
      scheduler([candidate(skillKey, "LP01", { reason: "played-not-stable", nextMode: "reduced-cue" })]),
      { skillKey, sessionId: "stable-settle-session", endedAt: settleAt, result: "stable" }
    );
    const legacyChapter = {
      openingReviewQueue: ["LP01"],
      lessonEvidence: {
        LP01: {
          played: true,
          needsPractice: true,
          completedAt: "2026-07-20T00:00:00.000Z",
          sessionId: "old-story"
        }
      },
      reviewScheduler: settled
    };
    const settleEvent = fullStable({
      eventId: "stable-settle",
      sessionId: "stable-settle-session",
      completedAt: settleAt,
      localDateKey: "2026-07-20"
    });
    const sameDaySettled = migrate(
      [settleEvent],
      "2026-07-20T12:00:00.000Z",
      [],
      legacyChapter
    );
    const crossDaySettled = migrate(
      [settleEvent],
      "2026-07-20T17:00:00.000Z",
      [],
      legacyChapter
    );
    const repeatedCrossDay = migrate(
      [settleEvent],
      "2026-07-20T17:00:00.000Z",
      [],
      { ...legacyChapter, reviewScheduler: crossDaySettled }
    );
    const retainedClosed = migrate(
      [settleEvent],
      "2026-07-20T17:00:00.000Z",
      [{ eventId: "retained-existing", skillKey }],
      legacyChapter
    );

    const fairValidOverCorrupt = api.selectChapter4OpeningReview({
      scheduler: scheduler([
        candidate(skillKey, "LP01", {
          lastAttemptAt: "not-a-time",
          createdAt: "2026-07-01T00:00:00.000Z"
        }),
        candidate("low-key:C3", "LP02", {
          lastAttemptAt: "2026-07-02T00:00:00.000Z",
          createdAt: "2026-07-02T00:00:00.000Z"
        })
      ]),
      sessionId: "fair-corrupt"
    });
    const fairUntestedOverCorrupt = api.selectChapter4OpeningReview({
      scheduler: scheduler([
        candidate(skillKey, "LP01", {
          lastAttemptAt: "not-a-time",
          createdAt: "2026-07-01T00:00:00.000Z"
        }),
        candidate("low-key:C3", "LP02", {
          lastAttemptAt: null,
          createdAt: "2026-07-02T00:00:00.000Z"
        })
      ]),
      sessionId: "fair-untested"
    });

    const unknownSkill = api.normalizeChapter4ReviewScheduler(scheduler([
      candidate("unknown:chapter4-skill", "LP01")
    ]));
    const lp01MissingLevelCandidate = candidate("level:LP01", "LP01");
    delete lp01MissingLevelCandidate.sourceLevelId;
    const persistedLp01MissingLevel = api.normalizeChapter4ReviewScheduler(scheduler([
      lp01MissingLevelCandidate
    ]));
    const lp02MissingLevelCandidate = candidate("low-key:C3", "LP02");
    delete lp02MissingLevelCandidate.sourceLevelId;
    const persistedLp02MissingLevel = api.normalizeChapter4ReviewScheduler(scheduler([
      lp02MissingLevelCandidate
    ]));
    const lp01MismatchedLevel = api.normalizeChapter4ReviewScheduler(scheduler([
      candidate("level:LP01", "LP02")
    ]));
    const lp02MismatchedLevel = api.normalizeChapter4ReviewScheduler(scheduler([
      candidate("low-key:C3", "LP01")
    ]));

    return {
      canonical,
      incomplete,
      explicitClockInvalid,
      contradictoryStrong,
      zeroRouteEvidence,
      systemRouteEvidence,
      impossibleLocalDate,
      missingStableFieldResults,
      latestEligible,
      lp02Canonical,
      lp02Incomplete,
      v2Only,
      emptySourceStory,
      modeledStory,
      realWrongStory,
      invalidCompletion,
      activeResume,
      endedResume,
      sameDaySettled,
      crossDaySettled,
      repeatedCrossDay,
      retainedClosed,
      fairValidOverCorrupt,
      fairUntestedOverCorrupt,
      unknownSkill,
      persistedLp01MissingLevel,
      persistedLp02MissingLevel,
      lp01MismatchedLevel,
      lp02MismatchedLevel
    };
  });

  const reason = (value) => value?.candidates?.[0]?.reason;
  const status = (value) => value?.candidates?.[0]?.status;
  const spacing = (value) => value?.reviewSpacingAfterSessionId;

  record(
    "canonical persisted v3 stable event can schedule retained-due",
    reason(result.canonical) === "retained-due" &&
      result.canonical.candidates[0]?.sourceSessionId === "stable-source",
    result.canonical
  );
  record(
    "partial stable event cannot schedule retained-due",
    reason(result.incomplete) !== "retained-due",
    result.incomplete
  );
  record(
    "explicit clock-invalid stable event cannot schedule retained-due",
    reason(result.explicitClockInvalid) !== "retained-due",
    result.explicitClockInvalid
  );
  record(
    "contradictory strong-cue stable record cannot schedule retained-due",
    reason(result.contradictoryStrong) !== "retained-due",
    result.contradictoryStrong
  );
  record(
    "zero-count input routes cannot qualify a retained anchor",
    reason(result.zeroRouteEvidence) !== "retained-due",
    result.zeroRouteEvidence
  );
  record(
    "system-only input routes cannot qualify a retained anchor",
    reason(result.systemRouteEvidence) !== "retained-due",
    result.systemRouteEvidence
  );
  record(
    "impossible persisted local date cannot qualify a retained anchor",
    reason(result.impossibleLocalDate) !== "retained-due",
    result.impossibleLocalDate
  );
  const missingStableFieldFailures = Object.entries(result.missingStableFieldResults)
    .filter(([, value]) => reason(value) === "retained-due")
    .map(([field]) => field);
  record(
    "every required persisted stable-event field is fail-closed",
    missingStableFieldFailures.length === 0,
    { acceptedMissingFields: missingStableFieldFailures }
  );
  record(
    "latest eligible anchor is selected before a newer same-day event",
    reason(result.latestEligible) === "retained-due" &&
      result.latestEligible.candidates[0]?.sourceSessionId === "old-eligible-session",
    result.latestEligible
  );
  record(
    "canonical LP02 low-key stable event maps to the LP02 candidate",
    reason(result.lp02Canonical) === "retained-due" &&
      result.lp02Canonical.candidates[0]?.sourceLevelId === "LP02" &&
      result.lp02Canonical.candidates[0]?.sourceSessionId === "stable-low-c-source",
    result.lp02Canonical
  );
  record(
    "LP02 low-key stable event without level identity is fail-closed",
    reason(result.lp02Incomplete) !== "retained-due",
    result.lp02Incomplete
  );
  record(
    "pure v2 stable history requests traceable stable rather than retained",
    reason(result.v2Only) === "played-not-stable",
    result.v2Only
  );
  record(
    "child input without a source cannot consume spacing",
    spacing(result.emptySourceStory) === "review-anchor" && status(result.emptySourceStory) === "cooldown",
    result.emptySourceStory
  );
  record(
    "modeled input cannot consume spacing",
    spacing(result.modeledStory) === "review-anchor" && status(result.modeledStory) === "cooldown",
    result.modeledStory
  );
  record(
    "real wrong child input followed by completion consumes spacing",
    spacing(result.realWrongStory) === null && status(result.realWrongStory) === "ready",
    result.realWrongStory
  );
  record(
    "invalid completion time cannot consume spacing",
    spacing(result.invalidCompletion) === "review-anchor" && status(result.invalidCompletion) === "cooldown",
    result.invalidCompletion
  );
  record(
    "active resume cannot consume spacing",
    spacing(result.activeResume) === "review-anchor" && status(result.activeResume) === "cooldown",
    result.activeResume
  );
  record(
    "ended child-participated resume consumes spacing",
    spacing(result.endedResume) === null && status(result.endedResume) === "ready",
    result.endedResume
  );
  record(
    "equal-time stable settle remains closed on the same local date",
    status(result.sameDaySettled) === "closed",
    result.sameDaySettled
  );
  record(
    "equal-time stable settle reopens exactly one retained-due candidate cross-day",
    result.crossDaySettled.candidates?.length === 1 &&
      reason(result.crossDaySettled) === "retained-due" &&
      result.crossDaySettled.candidates[0]?.sourceSessionId === "stable-settle-session",
    result.crossDaySettled
  );
  record(
    "cross-day retained-due reopening is idempotent",
    result.repeatedCrossDay.candidates?.length === 1 &&
      reason(result.repeatedCrossDay) === "retained-due",
    result.repeatedCrossDay
  );
  record(
    "existing retained evidence keeps a settled candidate closed",
    status(result.retainedClosed) === "closed",
    result.retainedClosed
  );
  record(
    "valid attempted timestamp outranks a corrupt attempted timestamp",
    result.fairValidOverCorrupt.candidate?.skillKey === "low-key:C3",
    result.fairValidOverCorrupt
  );
  record(
    "genuinely untested candidate outranks a corrupt attempted timestamp",
    result.fairUntestedOverCorrupt.candidate?.skillKey === "low-key:C3",
    result.fairUntestedOverCorrupt
  );
  record(
    "unknown persisted review skill is discarded fail-closed",
    result.unknownSkill.candidates?.length === 0,
    result.unknownSkill
  );
  record(
    "LP01 review candidate without source level identity is discarded fail-closed",
    result.persistedLp01MissingLevel.candidates?.length === 0,
    result.persistedLp01MissingLevel
  );
  record(
    "LP02 review candidate without source level identity is discarded fail-closed",
    result.persistedLp02MissingLevel.candidates?.length === 0,
    result.persistedLp02MissingLevel
  );
  record(
    "LP01 review skill cannot be relabeled as LP02",
    result.lp01MismatchedLevel.candidates?.length === 0,
    result.lp01MismatchedLevel
  );
  record(
    "LP02 low-key review skill cannot be relabeled as LP01",
    result.lp02MismatchedLevel.candidates?.length === 0,
    result.lp02MismatchedLevel
  );

  await closeResources();
  clearTimeout(deadline);
  const failed = checks.filter((check) => !check.pass);
  console.log(`supervisor R01A P1 adversarial checks: ${checks.length - failed.length}/${checks.length}`);
  checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
  if (browserErrors.length) console.log(`browser diagnostics: ${JSON.stringify(browserErrors)}`);
  process.exitCode = failed.length || browserErrors.length ? 1 : 0;
}

run().catch(async (error) => {
  clearTimeout(deadline);
  console.error(`supervisor R01A P1 failed at ${scenario}: ${error.stack || error}`);
  await closeResources();
  process.exit(1);
});
