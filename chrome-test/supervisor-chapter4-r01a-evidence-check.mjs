import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
// Optional contract and runner arguments let a corrected build preserve the rejected 347a evidence.
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const contractPath = process.argv[3] || "docs/30_CHAPTER4_R01A_MEDIA_ZONE_CONTRACT_347A_V1.json";
const zoneRunnerPath = process.argv[4] || "chrome-test/chapter4-r01a-media-zone-contract-347a-v1.mjs";
const checks = [];
const browserErrors = [];
let browser;
let context;
let currentScenario = "static-evidence";
const suiteDeadline = setTimeout(() => failHard(`suite timeout at ${currentScenario}`), 150000);

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function readText(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function fileExists(relativePath) {
  return fs.existsSync(new URL(`../${relativePath}`, import.meta.url));
}

async function closeResources() {
  await Promise.allSettled([context?.close(), browser?.close()].filter(Boolean));
  context = null;
  browser = null;
}

function failHard(message) {
  console.error(`supervisor C4-R01A evidence check: ${message}`);
  process.exitCode = 1;
  void closeResources().finally(() => process.exit(1));
}

function runStaticEvidenceChecks() {
  const oldRunner = "chapter4-lp01-lp02-media-zone-contract-344a-v1.mjs";
  const zoneRunner = readText(zoneRunnerPath);
  record(
    "R01A zone runner is independent rather than a renamed 344a wrapper",
    !zoneRunner.includes(oldRunner),
    { oldRunnerReferenced: zoneRunner.includes(oldRunner) }
  );

  const contract = JSON.parse(readText(contractPath));
  const sourcePaths = (contract.sourceFiles || []).map((item) => item.path || "");
  record(
    "R01A contract identifies an R01A build rather than the 344a lesson build",
    /r01a/i.test(contract.prototypeBaseline || "") &&
      /r01a/i.test(contract.buildIdentity || "") &&
      !/344a/i.test(contract.prototypeBaseline || "") &&
      !/344a/i.test(contract.buildIdentity || ""),
    { prototypeBaseline: contract.prototypeBaseline, buildIdentity: contract.buildIdentity }
  );
  record(
    "R01A contract source list does not cite the old LP01-LP02 runner",
    sourcePaths.every((sourcePath) => !sourcePath.includes(oldRunner)),
    { sourcePaths }
  );

  const expectedStates = Array.isArray(contract.expectedStates) ? contract.expectedStates : [];
  record(
    "R01A contract names remediation, reduced-cue, LP02, spacing, and reduced-motion evidence",
    expectedStates.some((name) => /remediation/i.test(name)) &&
      expectedStates.some((name) => /reduced.cue/i.test(name)) &&
      expectedStates.some((name) => /lp02/i.test(name)) &&
      expectedStates.some((name) => /spacing|story.first/i.test(name)) &&
      expectedStates.some((name) => /reduced.motion/i.test(name)),
    { expectedStates }
  );

  const capturedStates = (contract.viewports || []).flatMap((viewport) => viewport.states || []);
  const stateMetadataComplete = capturedStates.length > 0 && capturedStates.every((entry) => {
    const geometry = entry.geometry || {};
    const commonIdentity = typeof geometry.phase === "string" && geometry.phase.length > 0 &&
      typeof geometry.sessionId === "string" && geometry.sessionId.length > 0 &&
      typeof geometry.actionId === "string" && geometry.actionId.length > 0;
    if (/spacing|story.first/i.test(entry.stateName || "")) {
      return commonIdentity && geometry.role === "lesson" && geometry.openingReviewCount === 0;
    }
    return commonIdentity &&
      geometry.role === "opening-review" &&
      typeof geometry.reviewSkillKey === "string" && geometry.reviewSkillKey.length > 0 &&
      ["remediation", "reduced-cue"].includes(geometry.reviewMode) &&
      ["guided", "check"].includes(geometry.runMode);
  });
  record(
    "every captured R01A state carries review and lifecycle identity",
    stateMetadataComplete,
    { capturedStateCount: capturedStates.length }
  );

  const audioSuite = readText("tools/audio-lifecycle-suite.mjs");
  const dedicatedAudioPath = "chrome-test/chapter4-r01a-audio-lifecycle-check.mjs";
  record(
    "audio lifecycle suite uses a dedicated R01A lifecycle gate instead of the scheduler gate",
    fileExists(dedicatedAudioPath) &&
      audioSuite.includes("chapter4-r01a-audio-lifecycle-check.mjs") &&
      !audioSuite.includes("chapter4-r01a-scheduler-check.mjs"),
    {
      dedicatedAudioExists: fileExists(dedicatedAudioPath),
      schedulerMislisted: audioSuite.includes("chapter4-r01a-scheduler-check.mjs")
    }
  );
}

function schedulerCandidate(overrides = {}) {
  return {
    skillKey: "level:LP01",
    sourceLevelId: "LP01",
    sourceSessionId: "LP01-source",
    reason: "needs-practice",
    priority: 0,
    nextMode: "remediation",
    remediationPreparedAt: "2026-07-18T00:00:00.000Z",
    createdAt: "2026-07-18T00:00:00.000Z",
    lastAttemptAt: "2026-07-18T01:00:00.000Z",
    lastAttemptSessionId: "review-anchor",
    cooldownAfterSessionId: "review-anchor",
    status: "cooldown",
    ...overrides
  };
}

function endedReviewSession(sessionId = "review-anchor") {
  return {
    sessionId,
    bundleId: "C4-fixture",
    formalSession: true,
    status: "ended",
    actions: [{ actionId: "opening-review", role: "opening-review" }],
    completedActions: [{ actionId: "opening-review", role: "opening-review", completedAt: "2026-07-18T01:00:30.000Z" }]
  };
}

function endedStorySession({ sessionId = "story-session", participated = true, directMode = false } = {}) {
  const action = {
    actionId: "story-action",
    role: "lesson",
    presentedAt: participated ? "2026-07-18T02:00:00.000Z" : null
  };
  return {
    sessionId,
    bundleId: "C4-story-fixture",
    formalSession: true,
    directMode,
    status: "ended",
    childParticipation: participated,
    actions: [action],
    completedActions: participated
      ? [{
          actionId: action.actionId,
          role: "lesson",
          completedAt: "2026-07-18T02:00:20.000Z",
          completionSource: "child",
          childCorrectCount: 1,
          childInputs: [{ source: "\u5c4f\u5e55", result: "correct" }]
        }]
      : []
  };
}

function formalRuntimeFixture() {
  const chapter3Evidence = {
    LS08: {
      completed: true,
      completedAt: "2026-07-18T00:00:00.000Z",
      sessionId: "C3-07-storage"
    }
  };
  const chapter4Evidence = {
    LP01: {
      played: true,
      needsPractice: true,
      completedAt: "2026-07-18T01:00:00.000Z",
      sessionId: "C4-01-storage"
    },
    LP03: {
      played: true,
      completedAt: "2026-07-18T01:30:00.000Z",
      sessionId: "C4-02-storage"
    }
  };
  const lp03Progress = {
    foundationCAnchored: true,
    foundationCAwake: true,
    foundationDPlaced: true,
    foundationEPlaced: true,
    played: true,
    needsPractice: false,
    completedAt: "2026-07-18T01:30:00.000Z",
    seamChecks: [],
    seamCheckDeferred: false,
    routeEvents: [{ event: "foundation-complete", sessionId: "C4-02-storage" }],
    originSessionId: "C4-02-storage",
    lastSessionId: "C4-02-storage"
  };
  return {
    version: 1,
    active: {
      sessionId: "C1-01-storage-active",
      bundleId: "C1-01",
      status: "active",
      formalSession: true,
      actionIndex: 0,
      actions: [{ actionId: "M01-guided", kind: "level", targetId: "M01", runMode: "guided" }],
      completedActions: [],
      startedAt: "2026-07-19T00:00:00.000Z"
    },
    history: [{
      sessionId: "C4-02-storage",
      bundleId: "C4-02",
      formalSession: true,
      status: "ended",
      actions: [{ actionId: "LP03-foundation", kind: "chapter4-keyboard", targetId: "LP03", role: "lesson" }],
      completedActions: [{ actionId: "LP03-foundation", targetId: "LP03", completionSource: "child" }]
    }],
    lastRest: { sessionId: "C4-02-storage", reason: "natural-rest" },
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: chapter3Evidence,
      resume: null,
      ls03QualifiedInputs: 2,
      completed: true,
      ls04Completed: true,
      ls05Completed: true,
      ls05PartialRest: null,
      ls06Completed: true,
      ls07Completed: true,
      ls08Completed: true,
      ls06PartialRest: null,
      ls07PartialRest: null,
      ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0,
      ls08RemediationRequired: false,
      visibleSliceCompleted: true,
      ls04Attempts: [],
      ls05Attempts: [],
      ls06Attempts: [],
      ls07Attempts: [],
      ls08Attempts: []
    },
    chapter4: {
      completedSlice: true,
      lessonEvidence: chapter4Evidence,
      resume: null,
      openingReviewQueue: ["LP01"],
      lp01Attempts: [{ sessionId: "C4-01-storage", needsPractice: true }],
      lp02Attempts: [],
      lp03Attempts: [{ sessionId: "C4-02-storage", played: true }],
      lp03Progress
    }
  };
}

function learningStatsFixture() {
  return {
    version: 3,
    levels: {
      LP01: {
        completions: 1,
        formalCompletions: 1,
        stableCompletions: 0,
        needsPractice: true,
        lastFormalCompletedAt: "2026-07-18T01:00:00.000Z"
      }
    },
    notes: { C: { introduced: true } },
    staff: {},
    retention: {
      stableEvents: [{
        eventId: "stable-M03-storage",
        skillKey: "level:M03",
        sessionId: "C1-03-storage",
        completedAt: "2026-07-17T00:00:00.000Z",
        localDateKey: "2026-07-17"
      }],
      retainedEvents: [{
        eventId: "retained-M03-storage",
        skillKey: "level:M03",
        sessionId: "C1-03-storage-later",
        completedAt: "2026-07-18T00:00:00.000Z",
        localDateKey: "2026-07-18"
      }],
      observationEvents: [],
      clockInvalidEvents: [],
      lastWallClockAt: "2026-07-18T01:30:00.000Z",
      lastWallClockSessionId: "C4-02-storage"
    }
  };
}

async function runBrowserChecks() {
  currentScenario = "browser-launch";
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_EXECUTABLE || undefined
  });

  currentScenario = "scheduler-adversarial";
  context = await browser.newContext({ serviceWorkers: "block" });
  await context.addInitScript(() => { window.__STAR_DINO_R01A_TEST__ = true; });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(String(error)));
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => Boolean(window.__starDinoR01ATestApi), null, { timeout: 15000 });

  const result = await page.evaluate(({ candidate, reviewSession, emptyStory, childStory, directStory }) => {
    const api = window.__starDinoR01ATestApi;
    const baseScheduler = {
      version: 1,
      candidates: [candidate],
      reviewSpacingAfterSessionId: reviewSession.sessionId
    };
    const emptyResult = api.reconcileChapter4ReviewScheduler(baseScheduler, [reviewSession, emptyStory]);
    const reviewOnlyResult = api.reconcileChapter4ReviewScheduler(baseScheduler, [reviewSession, {
      ...reviewSession,
      sessionId: "later-review",
      completedActions: [{ actionId: "opening-review-2", role: "opening-review" }]
    }]);
    const directResult = api.reconcileChapter4ReviewScheduler(baseScheduler, [reviewSession, directStory]);
    const childResult = api.reconcileChapter4ReviewScheduler(baseScheduler, [reviewSession, childStory]);

    const invalidAnchor = api.migrateChapter4ReviewScheduler({
      chapter4: { lessonEvidence: { LP01: { played: true, completedAt: "2026-07-18T00:00:00.000Z" } } },
      learningStats: {
        levels: { LP01: { formalCompletions: 1, stableCompletions: 0, lastFormalCompletedAt: "2026-07-18T00:00:00.000Z" } },
        retention: { stableEvents: [{ skillKey: "level:LP01" }], retainedEvents: [] }
      },
      now: new Date("2026-07-19T12:00:00.000Z")
    });

    const validOldAnchorAfterOrdinaryPlay = api.migrateChapter4ReviewScheduler({
      chapter4: { lessonEvidence: { LP01: { played: true, completedAt: "2026-07-19T09:00:00.000Z" } } },
      learningStats: {
        levels: { LP01: { formalCompletions: 3, stableCompletions: 1, lastFormalCompletedAt: "2026-07-19T09:00:00.000Z" } },
        retention: {
          stableEvents: [{
            eventId: "stable-old",
            evidenceType: "stable",
            skillKey: "level:LP01",
            levelId: "LP01",
            sessionId: "stable-old-session",
            bundleId: "C4-fixture",
            sessionActionId: "opening-review",
            sessionRole: "opening-review",
            reviewSkillKey: "level:LP01",
            completedAt: "2026-07-18T00:00:00.000Z",
            localDateKey: "2026-07-18",
            runMode: "check",
            wrongCount: 0,
            cueStrength: "soft",
            strongCueFrames: 0,
            inputRoutes: { "touch-bubble": 4 },
            experimentalInput: false,
            thresholdVersion: "preschool-v1-2026-07-11"
          }],
          retainedEvents: []
        }
      },
      now: new Date("2026-07-19T12:00:00.000Z")
    });

    const reducedCandidate = {
      ...candidate,
      status: "ready",
      cooldownAfterSessionId: null,
      reason: "played-not-stable",
      priority: 1,
      nextMode: "reduced-cue"
    };
    const reducedPlan = api.composeChapter4ReviewPlan({
      actions: [{ actionId: "future-story", kind: "chapter4-keyboard", targetId: "LP04", role: "lesson" }],
      scheduler: { version: 1, candidates: [reducedCandidate], reviewSpacingAfterSessionId: null },
      sessionId: "deterministic-session"
    });
    const repeatedPlan = api.composeChapter4ReviewPlan({
      actions: [{ actionId: "future-story", kind: "chapter4-keyboard", targetId: "LP04", role: "lesson" }],
      scheduler: { version: 1, candidates: [reducedCandidate], reviewSpacingAfterSessionId: null },
      sessionId: "deterministic-session"
    });

    return {
      apiPresent: Boolean(api),
      emptyResult,
      reviewOnlyResult,
      directResult,
      childResult,
      canonicalScreen: api.classifyLp02OpeningReviewInput({ midi: 48, route: "\u5c4f\u5e55" }),
      midi: api.classifyLp02OpeningReviewInput({ midi: 48, route: "MIDI" }),
      micAmbiguous: api.classifyLp02OpeningReviewInput({ midi: 48, route: "\u9ea6\u514b\u98ce", microphoneAmbiguous: true }),
      invalidAnchor,
      validOldAnchorAfterOrdinaryPlay,
      reducedPlan,
      repeatedPlan
    };
  }, {
    candidate: schedulerCandidate(),
    reviewSession: endedReviewSession(),
    emptyStory: endedStorySession({ sessionId: "empty-story", participated: false }),
    childStory: endedStorySession({ sessionId: "child-story", participated: true }),
    directStory: endedStorySession({ sessionId: "direct-story", participated: true, directMode: true })
  });

  record("opt-in R01A scheduler API is present", result.apiPresent);
  record(
    "empty ended lesson cannot consume spacing or candidate cooldown",
    result.emptyResult.reviewSpacingAfterSessionId === "review-anchor" && result.emptyResult.candidates[0]?.status === "cooldown",
    result.emptyResult
  );
  record(
    "later review-only session cannot consume spacing or candidate cooldown",
    result.reviewOnlyResult.reviewSpacingAfterSessionId === "review-anchor" && result.reviewOnlyResult.candidates[0]?.status === "cooldown",
    result.reviewOnlyResult
  );
  record(
    "direct story fixture cannot consume spacing or candidate cooldown",
    result.directResult.reviewSpacingAfterSessionId === "review-anchor" && result.directResult.candidates[0]?.status === "cooldown",
    result.directResult
  );
  record(
    "later ended child-participated story consumes spacing and cooldown",
    result.childResult.reviewSpacingAfterSessionId === null && result.childResult.candidates[0]?.status === "ready",
    result.childResult
  );
  record(
    "canonical runtime screen route can establish exact low-C stability",
    result.canonicalScreen.stableEligible === true && result.canonicalScreen.noteNameCorrect === true && result.canonicalScreen.registerCorrect === true,
    result.canonicalScreen
  );
  record(
    "MIDI remains observation-only and ambiguous microphone remains assisted-only",
    result.midi.played === true && result.midi.stableEligible === false &&
      result.micAmbiguous.played === false && result.micAmbiguous.stableEligible === false && result.micAmbiguous.assistedOnly === true,
    { midi: result.midi, micAmbiguous: result.micAmbiguous }
  );
  record(
    "incomplete stable event cannot create a retained-due candidate",
    !result.invalidAnchor.candidates.some((item) => item.reason === "retained-due"),
    result.invalidAnchor
  );
  record(
    "ordinary later play does not postpone an already eligible stable anchor",
    result.validOldAnchorAfterOrdinaryPlay.candidates.some((item) => item.reason === "retained-due"),
    result.validOldAnchorAfterOrdinaryPlay
  );
  record(
    "reduced-cue plan uses check mode and is deterministic for one session",
    result.reducedPlan.review?.runMode === "check" &&
      result.reducedPlan.review?.reviewMode === "reduced-cue" &&
      result.reducedPlan.review?.actionId === result.repeatedPlan.review?.actionId &&
      JSON.stringify(result.reducedPlan.actions) === JSON.stringify(result.repeatedPlan.actions),
    { reducedPlan: result.reducedPlan, repeatedPlan: result.repeatedPlan }
  );

  await context.close();
  context = null;

  currentScenario = "non-empty-storage-migration";
  const runtimeFixture = formalRuntimeFixture();
  const statsFixture = learningStatsFixture();
  context = await browser.newContext({ serviceWorkers: "block" });
  await context.addInitScript(({ runtime, stats }) => {
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(stats));
    sessionStorage.setItem("supervisorRuntimeBefore", JSON.stringify({
      active: runtime.active,
      history: runtime.history,
      lastRest: runtime.lastRest,
      chapter3Evidence: runtime.chapter3.lessonEvidence,
      chapter4Evidence: runtime.chapter4.lessonEvidence,
      chapter4World: runtime.chapter4.lp03Progress
    }));
    sessionStorage.setItem("supervisorStatsBefore", JSON.stringify(stats));
  }, { runtime: runtimeFixture, stats: statsFixture });
  const storagePage = await context.newPage();
  storagePage.on("pageerror", (error) => browserErrors.push(String(error)));
  await storagePage.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await storagePage.waitForFunction(() => document.body && !document.body.classList.contains("booting"), null, { timeout: 15000 });
  const storageResult = await storagePage.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const before = sessionStorage.getItem("supervisorRuntimeBefore");
    const after = JSON.stringify({
      active: runtime.active,
      history: runtime.history,
      lastRest: runtime.lastRest,
      chapter3Evidence: runtime.chapter3?.lessonEvidence,
      chapter4Evidence: runtime.chapter4?.lessonEvidence,
      chapter4World: runtime.chapter4?.lp03Progress
    });
    return {
      formalSlicesByteIdentical: before === after,
      learningStatsByteIdentical: sessionStorage.getItem("supervisorStatsBefore") === localStorage.getItem("starDinoLearningStats"),
      scheduler: runtime.chapter4?.reviewScheduler || null
    };
  });
  record(
    "startup migration preserves non-empty formal history, evidence, active state, and world bytes",
    storageResult.formalSlicesByteIdentical,
    storageResult
  );
  record(
    "startup scheduler migration leaves non-empty learning evidence bytes unchanged",
    storageResult.learningStatsByteIdentical,
    storageResult
  );
  record(
    "startup migration writes scheduler only in its dedicated Chapter 4 schema",
    storageResult.scheduler?.version === 1 && Array.isArray(storageResult.scheduler?.candidates),
    storageResult.scheduler
  );
}

async function run() {
  runStaticEvidenceChecks();
  await runBrowserChecks();
  await closeResources();
  clearTimeout(suiteDeadline);
  const failed = checks.filter((check) => !check.pass);
  console.log(`supervisor C4-R01A evidence checks: ${checks.length - failed.length}/${checks.length}`);
  checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
  if (browserErrors.length) console.log(`browser diagnostics: ${JSON.stringify(browserErrors)}`);
  process.exitCode = failed.length || browserErrors.length ? 1 : 0;
}

run().catch(async (error) => {
  clearTimeout(suiteDeadline);
  console.error(`supervisor C4-R01A evidence check failed at ${currentScenario}: ${error.stack || error}`);
  await closeResources();
  process.exit(1);
});
