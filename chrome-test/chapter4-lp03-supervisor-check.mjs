import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";

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

function learningFixture() {
  return {
    version: 3,
    levels: {},
    notes: {},
    staff: {},
    retention: {
      stableEvents: [],
      retainedEvents: [],
      observationEvents: [],
      clockInvalidEvents: [],
      lastWallClockAt: null,
      lastWallClockSessionId: null
    }
  };
}

function formalRuntimeFixture() {
  const completedAt = "2026-07-18T08:00:00.000Z";
  const ls08SessionId = "C3-07-lp03-supervisor-prerequisite";
  const lp02SessionId = "C4-01-lp03-supervisor-prerequisite";
  return {
    version: 1,
    active: null,
    history: [
      ...canonicalC1C2History({ completedAt, tag: "lp03-supervisor" }),
      {
        sessionId: ls08SessionId,
        bundleId: "C3-07",
        status: "ended",
        completedActions: [{ actionId: "LS08-listening", kind: "garden-listening", targetId: "LS08" }]
      },
      {
        sessionId: lp02SessionId,
        bundleId: "C4-01",
        status: "ended",
        completedActions: [{
          actionId: "LP02-low-c-home",
          kind: "chapter4-keyboard",
          targetId: "LP02",
          completedAt
        }]
      }
    ],
    lastRest: null,
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK",
      equipmentState: "safe-open",
      airCheckComplete: true,
      leaves: [true, true, true],
      lessonEvidence: {
        LS08: {
          completed: true,
          completedAt,
          sessionId: ls08SessionId,
          bundleId: "C3-07",
          storyEvents: [{
            eventType: "storyEvent",
            phaseRole: "unscored",
            midis: [60, 48],
            startedAt: completedAt,
            endedAt: "2026-07-18T08:00:02.000Z"
          }]
        }
      },
      resume: null,
      ls03QualifiedInputs: 2,
      completed: true,
      visibleSliceCompleted: true,
      ls04Completed: true,
      ls05Completed: true,
      ls06Completed: true,
      ls07Completed: true,
      ls08Completed: true,
      ls05PartialRest: null,
      ls06PartialRest: null,
      ls07PartialRest: null,
      ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0,
      ls08RemediationRequired: false,
      ls04Attempts: [],
      ls05Attempts: [],
      ls06Attempts: [],
      ls07Attempts: [],
      ls08Attempts: []
    },
    chapter4: {
      completedSlice: true,
      lessonEvidence: {
        LP02: {
          completedAt,
          sessionId: lp02SessionId,
          bundleId: "C4-01",
          played: true
        }
      },
      resume: null,
      openingReviewQueue: [],
      lp01Attempts: [],
      lp02Attempts: [],
      lp03Attempts: [],
      lp03Progress: {
        foundationCAnchored: true,
        foundationCAwake: false,
        foundationDPlaced: false,
        foundationEPlaced: false,
        played: false,
        needsPractice: false,
        completedAt: null,
        seamChecks: [],
        seamCheckDeferred: false,
        routeEvents: [],
        originSessionId: null,
        lastSessionId: null
      }
    }
  };
}

function mapUrl(tag = "supervisor") {
  const url = new URL(baseUrl);
  url.search = `?screen=map&check=chapter4-lp03-${tag}`;
  return url.toString();
}

function directUrl(extra = "") {
  const url = new URL(baseUrl);
  url.search = `?mode=chapter4&directMode=true&formalSession=false&lesson=LP03&check=chapter4-lp03-supervisor${extra}`;
  return url.toString();
}

async function makePage({ runtime = null, direct = false, audioSettings = { enabled: true, volume: 0.6 }, seed = "lp03-supervisor" } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    hasTouch: true,
    serviceWorkers: "block"
  });
  await context.addInitScript(({ runtimeValue, stats, settings, fixedSeed }) => {
    if (runtimeValue) localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    else localStorage.removeItem("starDinoSessionRuntime");
    localStorage.setItem("starDinoLearningStats", JSON.stringify(stats));
    localStorage.setItem("starDinoAudioSettings", JSON.stringify(settings));
    const serialKey = `starDinoSupervisorUuid:${fixedSeed}`;
    Object.defineProperty(window.crypto, "randomUUID", {
      configurable: true,
      value: () => {
        const serial = Number(sessionStorage.getItem(serialKey) || "0") + 1;
        sessionStorage.setItem(serialKey, String(serial));
        return `${fixedSeed}-${serial}`;
      }
    });
  }, {
    runtimeValue: runtime,
    stats: learningFixture(),
    settings: audioSettings,
    fixedSeed: seed
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  await page.goto(direct ? directUrl() : mapUrl(seed), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  return { context, page };
}

async function waitPhase(page, phase, timeout = 14000) {
  await page.waitForFunction(
    (expected) => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === expected,
    phase,
    { timeout }
  );
}

async function waitMap(page, timeout = 16000) {
  await page.waitForFunction(() => document.body.classList.contains("screen-map"), null, { timeout });
}

async function waitResponse(page, midi, timeout = 14000) {
  await page.waitForFunction((target) => {
    const attempt = window.ensureChapter4Attempt?.();
    return attempt?.targetMidi === target &&
      attempt.phase === "lp03-awaiting-response" &&
      attempt.inputArmed === true;
  }, midi, { timeout });
}

async function clickKey(page, midi) {
  await page.locator(`#keyboard [data-midi="${midi}"]`).click();
}

async function startDirect(page) {
  await waitPhase(page, "lp03-model-ready");
  await page.locator("#chapter4StartCheck").click();
  await waitResponse(page, 48);
}

async function enterFormal(page) {
  await page.locator("#gardenRestMarker").click();
  await waitResponse(page, 48);
}

async function startVisibleModel(page, midi) {
  await waitPhase(page, "lp03-model-ready");
  await page.locator("#chapter4StartCheck").click();
  await waitResponse(page, midi);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null");
    const attempt = window.ensureChapter4Attempt?.() || null;
    const progress = typeof window.chapter4Lp03Progress === "function"
      ? window.chapter4Lp03Progress()
      : runtime?.chapter4?.lp03Progress;
    const foundation = document.querySelector("#chapter4Foundation");
    return JSON.parse(JSON.stringify({
      runtime,
      attempt,
      progress,
      screen: document.body.classList.contains("screen-map") ? "map" : "chapter4",
      phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "",
      foundation: foundation ? { ...foundation.dataset } : null,
      mapProgress: document.querySelector("#mapStarCount") ? {
        text: document.querySelector("#mapStarCount")?.textContent?.replace(/\s+/g, " ").trim() || "",
        aria: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || ""
      } : null
    }));
  });
}

async function policySnapshot(page, label) {
  const result = await page.evaluate(() => {
    const speech = document.querySelector("#chapter4Speech");
    const visible = (element) => {
      if (!element || element.hidden) return false;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && box.width > 0 && box.height > 0;
    };
    const tokenPattern = /(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/;
    const octavePattern = /\b[A-G][34]\b/;
    const text = [];
    const walker = document.createTreeWalker(document.querySelector("#appShell"), NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      const value = node.textContent?.replace(/\s+/g, " ").trim() || "";
      if (!value || !visible(parent) || parent.closest("#chapter4Speech, #parentModal")) continue;
      text.push(value);
    }
    const attributes = [...document.querySelectorAll("#chapter4Panel [aria-label], #chapter4Panel [title], #chapter4Panel [alt], #keyboardPanel [aria-label], #keyboardPanel [title], #keyboardPanel [alt]")]
      .filter((element) => visible(element) && !element.closest("#chapter4Speech"))
      .map((element) => [element.getAttribute("aria-label"), element.getAttribute("title"), element.getAttribute("alt")].filter(Boolean).join(" "));
    const pseudo = [...document.querySelectorAll("#chapter4Panel *, #keyboardPanel *")]
      .filter((element) => !element.closest("#chapter4Speech"))
      .flatMap((element) => ["::before", "::after"].map((kind) => {
        const style = getComputedStyle(element, kind);
        return style.content?.replace(/^['\"]|['\"]$/g, "").trim() || "";
      }))
      .filter((value) => value && value !== "none" && value !== "normal");
    const leaks = [...text, ...attributes, ...pseudo].filter((value) => tokenPattern.test(value) || octavePattern.test(value) || /法法|索尔/.test(value));
    const whiteKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .white-key")].map((key) => ({
      text: key.innerText.replace(/\s+/g, " ").trim(),
      aria: key.getAttribute("aria-label") || ""
    }));
    const blackKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .black-key")].map((key) => ({
      note: key.dataset.note || null,
      aria: key.getAttribute("aria-label") || ""
    }));
    return {
      phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "",
      speech: speech?.innerText?.replace(/\s+/g, " ").trim() || "",
      leaks,
      whiteKeys,
      blackKeys
    };
  });
  const expectedLetters = "CDEFGABCDEFGAB";
  const pass = result.leaks.length === 0 &&
    result.whiteKeys.length === 14 &&
    result.whiteKeys.map((key) => key.text.charAt(0)).join("") === expectedLetters &&
    result.whiteKeys.every((key) => !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(`${key.text} ${key.aria}`)) &&
    result.blackKeys.length === 10 &&
    result.blackKeys.every((key) => key.note === null && key.aria.startsWith("黑键") && !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(key.aria));
  record(`LP03 ${label} keeps solfege inside character speech and note names on the keyboard`, pass, result);
  return result;
}

try {
  const invalidCases = [
    {
      name: "non-ended C4-01",
      mutate(runtime) {
        runtime.history.find((session) => session.bundleId === "C4-01").status = "active";
      }
    },
    {
      name: "missing LP02 completed action",
      mutate(runtime) {
        runtime.history.find((session) => session.bundleId === "C4-01").completedActions = [];
      }
    },
    {
      name: "mismatched LP02 evidence session",
      mutate(runtime) {
        runtime.chapter4.lessonEvidence.LP02.sessionId = "different-session";
      }
    }
  ];
  for (const invalid of invalidCases) {
    const runtime = formalRuntimeFixture();
    invalid.mutate(runtime);
    const run = await makePage({ runtime, seed: `negative-${invalid.name}` });
    const entry = await run.page.evaluate(() => ({
      eligible: window.hasFormalLp03EntranceEvidence?.() || false,
      mapPhase: document.querySelector("#mapShell")?.dataset.chapter4Phase || "",
      markerText: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      historyCount: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}").history?.filter((session) => session.bundleId === "C4-02").length || 0
    }));
    record(`LP03 entry rejects ${invalid.name}`, entry.eligible === false && entry.mapPhase !== "chapter4-lp03-entry" && !entry.markerText.includes("三块地基") && entry.historyCount === 0, entry);
    await run.context.close();
  }

  const lp01MapRuntime = formalRuntimeFixture();
  delete lp01MapRuntime.chapter4.lessonEvidence.LP02;
  lp01MapRuntime.chapter4.lp03Progress.foundationCAnchored = false;
  const lp01Map = await makePage({ runtime: lp01MapRuntime, seed: "lp01-map-progress" });
  const lp01MapState = await snapshot(lp01Map.page);
  record(
    "LP01 map progress remains the canonical first underground course stop when LP03 is unavailable",
    lp01MapState.mapProgress?.text === "跟着星芽" &&
      lp01MapState.mapProgress?.aria === "地下回声洞课程进度：共 3 站，现在第 1 站，准备",
    lp01MapState.mapProgress
  );
  await lp01Map.context.close();

  const zeroVolume = await makePage({ direct: true, audioSettings: { enabled: true, volume: 0 }, seed: "zero-volume" });
  await zeroVolume.page.locator("#chapter4StartCheck").click();
  await waitPhase(zeroVolume.page, "sound-paused");
  const zeroVolumeState = await snapshot(zeroVolume.page);
  record(
    "LP03 volume zero cannot start, score, or wake the C foundation",
    zeroVolumeState.attempt?.audioTransaction?.startedAt === null &&
      zeroVolumeState.attempt?.audioTransaction?.endedAt === null &&
      Boolean(zeroVolumeState.attempt?.audioTransaction?.interruptedAt) &&
      zeroVolumeState.progress?.routeEvents?.length === 0 &&
      zeroVolumeState.progress?.foundationCAwake === false &&
      zeroVolumeState.attempt?.wrongCount === 0,
    zeroVolumeState
  );
  await zeroVolume.context.close();

  const rejectedResume = await makePage({ direct: true, seed: "resume-rejected" });
  await waitPhase(rejectedResume.page, "lp03-model-ready");
  await rejectedResume.page.evaluate(async () => {
    window.unlockAudioFromGesture();
    const sfx = window.getSfxBus();
    if (!sfx) throw new Error("missing LP03 AudioContext");
    if (sfx.ctx.state === "suspended") await sfx.ctx.resume();
    const originalResume = sfx.ctx.resume.bind(sfx.ctx);
    await sfx.ctx.suspend();
    sfx.ctx.resume = () => Promise.reject(new Error("controlled LP03 resume rejection"));
    window.__lp03RejectedResume = { ctx: sfx.ctx, originalResume };
  });
  await rejectedResume.page.locator("#chapter4StartCheck").click();
  await waitPhase(rejectedResume.page, "sound-paused");
  const rejectedResumeState = await snapshot(rejectedResume.page);
  record(
    "LP03 rejected AudioContext resume leaves an interrupted unpresented target and zero world progress",
    rejectedResumeState.attempt?.soundPauseContext === "lp03-target" &&
      rejectedResumeState.attempt?.audioTransaction?.startedAt === null &&
      rejectedResumeState.attempt?.audioTransaction?.endedAt === null &&
      Boolean(rejectedResumeState.attempt?.audioTransaction?.interruptedAt) &&
      rejectedResumeState.progress?.routeEvents?.length === 0 &&
      rejectedResumeState.progress?.foundationCAwake === false,
    rejectedResumeState
  );
  await rejectedResume.context.close();

  const cRest = await makePage({ runtime: formalRuntimeFixture(), seed: "c-assisted-rest" });
  await enterFormal(cRest.page);
  await clickKey(cRest.page, 53);
  await waitResponse(cRest.page, 48);
  await clickKey(cRest.page, 53);
  await waitPhase(cRest.page, "lp03-assisted");
  const assistedC = await snapshot(cRest.page);
  await clickKey(cRest.page, 48);
  await waitMap(cRest.page);
  const cRestMap = await snapshot(cRest.page);
  const cOldSession = cRestMap.runtime?.history?.filter((session) => session.bundleId === "C4-02").at(-1);
  record(
    "LP03 assisted C remains child-owned and rests with only D-E remaining",
    assistedC.attempt?.inputArmed === true &&
      cRestMap.progress?.foundationCAwake === true &&
      cRestMap.progress?.foundationDPlaced === false &&
      cRestMap.progress?.foundationEPlaced === false &&
      cRestMap.runtime?.chapter4?.resume?.nextStepId === "D" &&
      cRestMap.runtime?.chapter4?.resume?.remainingStepIds?.join(",") === "D,E" &&
      cRestMap.mapProgress?.text === "接着星芽" &&
      cRestMap.mapProgress?.aria === "地下回声洞课程进度：共 3 站，现在第 2 站，继续" &&
      cOldSession?.completedActions?.map((action) => action.lp03Step).join(",") === "C" &&
      cOldSession?.completedActions?.[0]?.childCorrectCount === 1 &&
      cOldSession?.completedActions?.[0]?.modeledInputs?.length === 0,
    { assistedC, cRestMap, cOldSession }
  );
  const cOldSessionId = cOldSession?.sessionId;
  await cRest.page.locator("#gardenRestMarker").click();
  await cRest.page.waitForFunction(() => document.body.classList.contains("screen-chapter4"), null, { timeout: 12000 });
  if (await cRest.page.locator("#chapter4StartCheck:not([hidden])").count()) await cRest.page.locator("#chapter4StartCheck").click();
  await waitResponse(cRest.page, 50);
  const cResumed = await snapshot(cRest.page);
  record(
    "LP03 post-C session has a new identity and contains only D-E actions",
    cResumed.runtime?.active?.sessionId !== cOldSessionId &&
      cResumed.runtime?.active?.resumeOfSessionId === cOldSessionId &&
      cResumed.runtime?.active?.actions?.map((action) => action.lp03Step).join(",") === "D,E" &&
      cResumed.runtime?.active?.completedActions?.length === 0 &&
      cResumed.attempt?.targetMidi === 50,
    cResumed
  );
  await cRest.context.close();

  const dRest = await makePage({ runtime: formalRuntimeFixture(), seed: "d-assisted-rest" });
  await enterFormal(dRest.page);
  await clickKey(dRest.page, 48);
  await waitResponse(dRest.page, 50);
  await clickKey(dRest.page, 48);
  await waitResponse(dRest.page, 50);
  await clickKey(dRest.page, 48);
  await waitPhase(dRest.page, "lp03-assisted");
  await clickKey(dRest.page, 50);
  await waitMap(dRest.page);
  const dRestMap = await snapshot(dRest.page);
  const dOldSession = dRestMap.runtime?.history?.filter((session) => session.bundleId === "C4-02").at(-1);
  record(
    "LP03 assisted D rests with C-D preserved and only E remaining",
    dRestMap.progress?.foundationCAwake === true &&
      dRestMap.progress?.foundationDPlaced === true &&
      dRestMap.progress?.foundationEPlaced === false &&
      dRestMap.runtime?.chapter4?.resume?.nextStepId === "E" &&
      dRestMap.runtime?.chapter4?.resume?.remainingStepIds?.join(",") === "E" &&
      dRestMap.mapProgress?.text === "接着星芽" &&
      dRestMap.mapProgress?.aria === "地下回声洞课程进度：共 3 站，现在第 2 站，继续" &&
      dOldSession?.completedActions?.map((action) => action.lp03Step).join(",") === "C,D",
    { dRestMap, dOldSession }
  );
  const dOldSessionId = dOldSession?.sessionId;
  await dRest.page.locator("#gardenRestMarker").click();
  await dRest.page.waitForFunction(() => document.body.classList.contains("screen-chapter4"), null, { timeout: 12000 });
  if (await dRest.page.locator("#chapter4StartCheck:not([hidden])").count()) await dRest.page.locator("#chapter4StartCheck").click();
  await waitResponse(dRest.page, 52);
  const dResumed = await snapshot(dRest.page);
  record(
    "LP03 post-D session has a new identity and contains only the E action",
    dResumed.runtime?.active?.sessionId !== dOldSessionId &&
      dResumed.runtime?.active?.resumeOfSessionId === dOldSessionId &&
      dResumed.runtime?.active?.actions?.map((action) => action.lp03Step).join(",") === "E" &&
      dResumed.runtime?.active?.completedActions?.length === 0 &&
      dResumed.attempt?.targetMidi === 52,
    dResumed
  );
  await dRest.context.close();

  for (const activation of ["Space", "Enter", "voiceover", "overlap"]) {
    const run = await makePage({ direct: true, seed: `activation-${activation}` });
    await startDirect(run.page);
    if (["Space", "Enter"].includes(activation)) {
      await run.page.locator('#keyboard [data-midi="48"]').focus();
      await run.page.keyboard.press(activation);
    } else if (activation === "voiceover") {
      await run.page.locator('#keyboard [data-midi="48"]').evaluate((key) => {
        key.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 0 }));
      });
    } else {
      await run.page.locator('#keyboard [data-midi="48"]').evaluate((key) => {
        key.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true, pointerId: 31, pointerType: "touch", isPrimary: true }));
        key.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true, pointerId: 32, pointerType: "touch", isPrimary: false }));
        document.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 31, pointerType: "touch", isPrimary: true }));
        document.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 32, pointerType: "touch", isPrimary: false }));
      });
    }
    await waitPhase(run.page, "lp03-model-ready");
    const state = await snapshot(run.page);
    const cEvent = state.progress?.routeEvents?.find((event) => event.stepId === "C");
    record(
      `LP03 ${activation} activation creates one C child input and one world advance`,
      state.progress?.routeEvents?.length === 1 &&
        cEvent?.childInputs?.length === 1 &&
        cEvent?.childCorrectCount === 1 &&
        cEvent?.modeledInputs?.length === 0 &&
        state.progress?.foundationCAwake === true &&
        state.progress?.foundationDPlaced === false,
      state
    );
    await run.context.close();
  }

  const policy = await makePage({ direct: true, seed: "policy-main" });
  await policySnapshot(policy.page, "initial model-ready");
  const initialParent = await policy.page.evaluate(() => ({
    summary: currentLearningSummary(),
    completedSteps: chapter4Lp03Progress().routeEvents.map((event) => event.stepId),
    currentStep: ensureChapter4Attempt()?.stepId || null
  }));
  record(
    "LP03 parent summary separates completed work from the current step and avoids internal mastery jargon",
    initialParent.completedSteps.length === 0 &&
      initialParent.currentStep === "C" &&
      /0\/3/.test(initialParent.summary?.detail || "") &&
      /还没开始/.test(initialParent.summary?.detail || "") &&
      /当前在找 C/.test(initialParent.summary?.detail || "") &&
      !/(stable|retained|C3-E3|路线 C)/i.test(initialParent.summary?.detail || ""),
    initialParent
  );
  await policy.page.locator("#chapter4StartCheck").click();
  await waitPhase(policy.page, "lp03-target-playing");
  await policySnapshot(policy.page, "target-playing");
  await waitResponse(policy.page, 48);
  await policySnapshot(policy.page, "awaiting-response");
  await clickKey(policy.page, 53);
  await waitPhase(policy.page, "lp03-wrong-repair-playing");
  const whiteWrongPolicy = await policySnapshot(policy.page, "white-key repair");
  record("LP03 white-key relationship stays in character speech", whiteWrongPolicy.speech.includes("刚才是 F") && whiteWrongPolicy.speech.includes("这次找 C"), whiteWrongPolicy);
  await waitResponse(policy.page, 48);
  await clickKey(policy.page, 49);
  await waitPhase(policy.page, "lp03-wrong-repair-playing");
  const blackWrongPolicy = await policySnapshot(policy.page, "black-key repair");
  record("LP03 black-key sharp identity stays in character speech", blackWrongPolicy.speech.includes("C# 黑键") && blackWrongPolicy.speech.includes("这次找 C"), blackWrongPolicy);
  await waitPhase(policy.page, "lp03-assisted");
  await policySnapshot(policy.page, "assisted");
  await policy.page.locator("#chapter4VisualAssist").click();
  await waitPhase(policy.page, "lp03-visual-assist");
  await policySnapshot(policy.page, "visual-assist");
  await policy.context.close();

  const parentAfterC = await makePage({ direct: true, seed: "parent-after-c" });
  await startDirect(parentAfterC.page);
  await clickKey(parentAfterC.page, 48);
  await waitPhase(parentAfterC.page, "lp03-model-ready");
  const afterCParent = await parentAfterC.page.evaluate(() => ({
    summary: currentLearningSummary(),
    completedSteps: chapter4Lp03Progress().routeEvents.map((event) => event.stepId),
    currentStep: ensureChapter4Attempt()?.stepId || null
  }));
  record(
    "LP03 parent summary reports C completed without presenting current D as completed",
    afterCParent.completedSteps.join(",") === "C" &&
      afterCParent.currentStep === "D" &&
      /1\/3/.test(afterCParent.summary?.detail || "") &&
      /已完成 C/.test(afterCParent.summary?.detail || "") &&
      /当前在找 D/.test(afterCParent.summary?.detail || "") &&
      !/(路线 C-D|stable|retained|C3-E3)/i.test(afterCParent.summary?.detail || ""),
    afterCParent
  );
  await parentAfterC.context.close();

  const octavePolicy = await makePage({ direct: true, seed: "policy-octave" });
  await startDirect(octavePolicy.page);
  await clickKey(octavePolicy.page, 60);
  await waitPhase(octavePolicy.page, "lp03-wrong-repair-playing");
  const octaveResult = await policySnapshot(octavePolicy.page, "same-name wrong octave");
  record("LP03 wrong-octave relationship stays in character speech", octaveResult.speech.includes("都是 C") && octaveResult.speech.includes("更低"), octaveResult);
  await octavePolicy.context.close();

  const modeledPolicy = await makePage({ direct: true, seed: "policy-modeled" });
  await startDirect(modeledPolicy.page);
  await modeledPolicy.page.evaluate(() => completeLp03Modeled("supervisor-policy"));
  await waitPhase(modeledPolicy.page, "lp03-modeled-playing");
  await policySnapshot(modeledPolicy.page, "modeled-playing");
  await modeledPolicy.context.close();

  const seamPolicy = await makePage({ direct: true, seed: "policy-seam" });
  await startDirect(seamPolicy.page);
  await clickKey(seamPolicy.page, 48);
  await startVisibleModel(seamPolicy.page, 50);
  await clickKey(seamPolicy.page, 50);
  await startVisibleModel(seamPolicy.page, 52);
  await clickKey(seamPolicy.page, 52);
  await waitPhase(seamPolicy.page, "lp03-seam-awaiting-response", 16000);
  await policySnapshot(seamPolicy.page, "seam response");
  await seamPolicy.context.close();

  for (const audit of ["color-reduced", "high-contrast"]) {
    const run = await makePage({ direct: true, seed: `policy-${audit}` });
    await run.page.goto(`${directUrl()}&audit=${audit}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await run.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
    await waitPhase(run.page, "lp03-model-ready");
    await policySnapshot(run.page, audit);
    await run.context.close();
  }
} finally {
  await browser.close();
}

record("LP03 supervisor browser console is clean", browserErrors.length === 0, browserErrors);

const failed = checks.filter((check) => !check.pass);
console.log(`chapter4 LP03 supervisor checks: ${checks.length - failed.length}/${checks.length}`);
for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
if (failed.length) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
