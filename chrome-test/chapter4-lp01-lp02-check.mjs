import fs from "node:fs";
import { createRequire } from "node:module";
import { canonicalC1C2History } from "./canonical-course-fixture.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter4_lp01_lp02_344a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const errors = [];

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
      stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [],
      lastWallClockAt: null, lastWallClockSessionId: null
    }
  };
}

function formalLs08Fixture({ endedEcho = true } = {}) {
  const completedAt = "2026-07-14T08:00:00.000Z";
  const sessionId = "C3-07-formal-ended";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05", "LS06", "LS07"].map((id) => [id, { completedAt, stable: true }]));
  lessonEvidence.LS08 = {
    actionId: "LS08-listening",
    kind: "garden-listening",
    targetId: "LS08",
    completed: true,
    completedAt,
    sessionId,
    bundleId: "C3-07",
    storyEvents: endedEcho
      ? [{ eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], scored: false, startedAt: completedAt, endedAt: "2026-07-14T08:00:02.000Z" }]
      : [{ eventType: "storyEvent", phaseRole: "unscored", midis: [60, 48], scored: false, startedAt: completedAt, endedAt: null }]
  };
  return {
    version: 1,
    active: null,
    history: [
      ...canonicalC1C2History({ completedAt, tag: "lp01-lp02" }),
      { sessionId, bundleId: "C3-07", status: "ended", completedActions: [{ actionId: "LS08-listening", kind: "garden-listening", targetId: "LS08" }] }
    ],
    lastRest: { sessionId, bundleId: "C3-07", reward: "地底根系", reason: "natural-rest", endedAt: completedAt, localDateKey: "2026-07-14" },
    chapter3: {
      entryEventId: "CH3_ENTRY_AIR_CHECK", equipmentState: "safe-open", airCheckComplete: true,
      leaves: [true, true, true], lessonEvidence, resume: null, ls03QualifiedInputs: 2,
      completed: true, visibleSliceCompleted: true, ls04Completed: true, ls05Completed: true,
      ls06Completed: true, ls07Completed: true, ls08Completed: true,
      ls05PartialRest: null, ls06PartialRest: null, ls07PartialRest: null, ls08PartialRest: null,
      ls08GuideDifficultyStreak: 0, ls08RemediationRequired: false,
      ls04Attempts: [], ls05Attempts: [], ls06Attempts: [], ls07Attempts: [], ls08Attempts: []
    },
    chapter4: { completedSlice: false, lessonEvidence: {}, resume: null, openingReviewQueue: [], lp01Attempts: [], lp02Attempts: [] }
  };
}

function mapUrl() {
  const value = new URL(baseUrl);
  value.search = "?screen=map&check=chapter4-lp01-lp02-344a";
  return value.toString();
}

function directUrl(lesson = "LP01") {
  const value = new URL(baseUrl);
  value.search = `?mode=chapter4&directMode=true&formalSession=false&lesson=${lesson}&check=chapter4-direct-344a`;
  return value.toString();
}

async function makePage(viewport = { width: 1024, height: 768 }, { sessionUuid = null, failAudioContext = false } = {}) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(({ sessionUuid, failAudioContext }) => {
    const input = { onmidimessage: null };
    navigator.requestMIDIAccess = async () => ({ inputs: new Map([["chapter4-midi", input]]), onstatechange: null });
    window.__emitMidi = (status, note, velocity) => input.onmidimessage?.({ data: [status, note, velocity] });
    if (failAudioContext) {
      const BrokenAudioContext = class {
        constructor() {
          throw new Error("controlled AudioContext failure");
        }
      };
      Object.defineProperty(window, "AudioContext", { configurable: true, value: BrokenAudioContext });
      Object.defineProperty(window, "webkitAudioContext", { configurable: true, value: BrokenAudioContext });
    }
    if (sessionUuid) {
      let sessionSerial = 0;
      Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => `${sessionUuid}-${++sessionSerial}` });
    }
  }, { sessionUuid, failAudioContext });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(`${message.type()}: ${message.text()}`);
  });
  return { context, page };
}

async function installReverseOrderAudioContext(page) {
  await page.evaluate(async () => {
    if (state.sfx?.ctx && state.sfx.ctx.state !== "closed") await state.sfx.ctx.close();
    state.sfx = null;
    const parameter = (value = 0) => ({ value, cancelScheduledValues() {}, setTargetAtTime() {}, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} });
    const node = () => ({ connect() {}, disconnect() {} });
    class ReverseOrderAudioContext {
      constructor() {
        this.state = "running";
        this.destination = {};
        this._started = performance.now();
        this._listeners = new Set();
        this._oscillators = [];
      }
      get currentTime() { return (performance.now() - this._started) / 1000; }
      addEventListener(type, listener) { if (type === "statechange") this._listeners.add(listener); }
      removeEventListener(type, listener) { if (type === "statechange") this._listeners.delete(listener); }
      resume() { this.state = "running"; this._emitStatechange(); return Promise.resolve(); }
      suspend() { this.state = "suspended"; this._emitStatechange(); return Promise.resolve(); }
      close() { this.state = "closed"; this._emitStatechange(); return Promise.resolve(); }
      _setStateSilently(nextState) { this.state = nextState; }
      _emitStatechange() { this._listeners.forEach((listener) => listener()); }
      _fireOscillatorEnds() { [...this._oscillators].forEach((oscillator) => oscillator.onended?.()); }
      createGain() { return { ...node(), gain: parameter(1) }; }
      createDynamicsCompressor() { return { ...node(), threshold: parameter(-24), knee: parameter(20), ratio: parameter(8), attack: parameter(0.006), release: parameter(0.18) }; }
      createBiquadFilter() { return { ...node(), type: "lowpass", frequency: parameter(0), Q: parameter(0) }; }
      createOscillator() {
        const oscillator = { ...node(), type: "sine", frequency: parameter(0), detune: parameter(0), onended: null, start() {}, stop() {} };
        this._oscillators.push(oscillator);
        return oscillator;
      }
    }
    window.AudioContext = ReverseOrderAudioContext;
    window.webkitAudioContext = ReverseOrderAudioContext;
  });
}

async function seed(page, runtime = formalLs08Fixture(), learning = learningFixture()) {
  await page.goto(mapUrl(), { waitUntil: "domcontentloaded", timeout: 30000 });
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
    const persistedAttempt = action?.chapter4Attempt || null;
    const directAttempt = typeof ensureChapter4Attempt === "function" && document.body.classList.contains("screen-chapter4")
      ? ensureChapter4Attempt()
      : null;
    const attempt = persistedAttempt || directAttempt;
    const visible = (node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return !node.hidden && style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const bubbles = [...document.querySelectorAll("#chapter4Bubbles .chapter4-bubble")].map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        id: node.dataset.bubbleId,
        aria: node.getAttribute("aria-label") || "",
        className: node.className,
        data: { ...node.dataset },
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + (rect.width / 2),
        centerY: rect.top + (rect.height / 2),
        background: getComputedStyle(node).backgroundColor,
        border: getComputedStyle(node).borderColor
      };
    });
    const keys = [...document.querySelectorAll("#keyboard [data-midi]")].map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        midi: Number(node.dataset.midi),
        note: node.dataset.note || null,
        pitchName: node.dataset.pitchName || null,
        aria: node.getAttribute("aria-label") || "",
        className: node.className,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + (rect.width / 2),
        centerY: rect.top + (rect.height / 2)
      };
    });
    const childText = [...document.querySelectorAll("#chapter4Panel *")]
      .filter((node) => visible(node) && !node.closest("#chapter4Speech"))
      .map((node) => node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE ? node.textContent.trim() : "")
      .filter(Boolean)
      .join(" ");
    return {
      runtime, learning, action, attempt,
      phase: document.body.classList.contains("screen-map")
        ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map")
        : (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || ""),
      marker: document.querySelector("#gardenRestMarker")?.innerText?.replace(/\s+/g, " ").trim() || "",
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      markerState: document.querySelector("#gardenRestMarker")?.dataset.chapter4State || "",
      journeyChapter: document.querySelector("#mapShell")?.dataset.journeyChapter || "",
      journeyBundle: document.querySelector("#mapShell")?.dataset.journeyBundle || "",
      journeyTarget: document.querySelector("#mapShell")?.dataset.journeyTarget || "",
      journeyTitle: document.querySelector("#journeyTitle")?.textContent?.trim() || "",
      journeyLearning: document.querySelector("#journeyLearning")?.textContent?.replace(/\s+/g, " ").trim() || "",
      speech: document.querySelector("#chapter4Speech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      characterSrc: document.querySelector("#chapter4XingyaImage")?.getAttribute("src") || "",
      characterAssetState: document.querySelector("#chapter4Scene")?.dataset.characterAssetState || "",
      sealedSuitReferences: [...document.querySelectorAll("#chapter4Panel img")].filter((image) => /xingya-suit-/.test(image.getAttribute("src") || "")).length,
      bubbles, keys, childText,
      sourceVisible: visible(document.querySelector("#chapter4SoundSource")),
      replayHidden: document.querySelector("#chapter4Replay")?.hidden,
      startHidden: document.querySelector("#chapter4StartCheck")?.hidden,
      startText: document.querySelector("#chapter4StartCheck")?.textContent?.trim() || "",
      callProgressAria: document.querySelector("#chapter4CallProgress")?.getAttribute("aria-label") || "",
      mapStarText: document.querySelector("#mapStarCount")?.textContent?.replace(/\s+/g, " ").trim() || "",
      mapStarAria: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || "",
      visibleSoundControls: [
        ...[...document.querySelectorAll("#chapter4Bubbles .chapter4-bubble")].filter(visible).map((node) => node.dataset.bubbleId),
        ...(visible(document.querySelector("#chapter4SoundSource")) ? ["chapter4SoundSource"] : []),
        ...(visible(document.querySelector("#chapter4Replay")) ? ["chapter4Replay"] : []),
        ...(visible(document.querySelector("#chapter4StartCheck")) ? ["chapter4StartCheck"] : [])
      ],
      foundation: (() => {
        const foundation = document.querySelector("#chapter4Foundation");
        const visibleBlocks = [...(foundation?.querySelectorAll("span") || [])].filter((block) => {
          const style = getComputedStyle(block);
          const rect = block.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        });
        const firstStyle = visibleBlocks[0] ? getComputedStyle(visibleBlocks[0]) : null;
        return {
          installed: foundation?.dataset.installed || "",
          state: foundation?.dataset.foundationState || "",
          visibleBlockCount: visibleBlocks.length,
          borderStyle: firstStyle?.borderStyle || "",
          backgroundColor: firstStyle?.backgroundColor || ""
        };
      })(),
      keyboardRect: (() => { const rect = document.querySelector("#keyboard")?.getBoundingClientRect(); return rect ? { width: rect.width, left: rect.left, right: rect.right } : null; })(),
      sceneRect: (() => { const rect = document.querySelector("#chapter4Scene")?.getBoundingClientRect(); return rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height, centerX: rect.left + (rect.width / 2), centerY: rect.top + (rect.height / 2) } : null; })(),
      parentFocus: document.querySelector("#parentLearningFocus")?.textContent || "",
      parentDetail: document.querySelector("#parentLearningDetail")?.textContent || "",
      parentProgress: document.querySelector("#parentProgressText")?.textContent || "",
      parentMasteryStatus: document.querySelector("#parentMasteryStatus")?.textContent || "",
      parentMasteryDetail: document.querySelector("#parentMasteryDetail")?.textContent || "",
      parentStaffState: document.querySelector("#parentStaffState")?.textContent || ""
    };
  });
}

const lp02ExpectedBlackMidis = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];
const lp02BlackWhiteBoundaries = new Map([
  [49, [48, 50]], [51, [50, 52]], [54, [53, 55]], [56, [55, 57]], [58, [57, 59]],
  [61, [60, 62]], [63, [62, 64]], [66, [65, 67]], [68, [67, 69]], [70, [69, 71]]
]);

function lp02KeyboardTouchReport(current) {
  const whiteKeys = current.keys.filter((key) => key.className.includes("white-key"));
  const blackKeys = current.keys.filter((key) => key.className.includes("black-key"));
  const whiteByMidi = new Map(whiteKeys.map((key) => [key.midi, key]));
  const boundaryChecks = blackKeys.map((black) => {
    const boundary = lp02BlackWhiteBoundaries.get(black.midi);
    const leftWhite = boundary ? whiteByMidi.get(boundary[0]) : null;
    const rightWhite = boundary ? whiteByMidi.get(boundary[1]) : null;
    const expectedCenterX = leftWhite && rightWhite ? (leftWhite.right + rightWhite.left) / 2 : null;
    return {
      midi: black.midi,
      rect: { left: black.left, right: black.right, top: black.top, bottom: black.bottom, width: black.width, height: black.height, centerX: black.centerX, centerY: black.centerY },
      expectedCenterX,
      centerDelta: expectedCenterX === null ? null : Math.abs(black.centerX - expectedCenterX)
    };
  });
  const allKeys = [...whiteKeys, ...blackKeys];
  return {
    keyboard: current.keyboardRect,
    whiteKeys: whiteKeys.map((key) => ({ midi: key.midi, rect: { left: key.left, right: key.right, top: key.top, bottom: key.bottom, width: key.width, height: key.height, centerX: key.centerX, centerY: key.centerY } })),
    blackKeys: boundaryChecks,
    blackMidiOrder: blackKeys.map((key) => key.midi),
    valid: whiteKeys.length === 14 && blackKeys.length === 10 &&
      blackKeys.map((key) => key.midi).join(",") === lp02ExpectedBlackMidis.join(",") &&
      allKeys.length === 24 && allKeys.every((key) => key.width >= 44 && key.height >= 44) &&
      boundaryChecks.every((check) => check.expectedCenterX !== null && check.centerDelta <= 1.5) &&
      allKeys.every((key) => !current.keyboardRect || (key.left >= current.keyboardRect.left - 0.5 && key.right <= current.keyboardRect.right + 0.5))
  };
}

function lp01BubblePositionReport(current) {
  const [first, second] = current.bubbles;
  const sceneCenterX = current.sceneRect?.centerX ?? null;
  const leftDistance = first && sceneCenterX !== null ? Math.abs(first.centerX - sceneCenterX) : null;
  const rightDistance = second && sceneCenterX !== null ? Math.abs(second.centerX - sceneCenterX) : null;
  return {
    scene: current.sceneRect,
    first: first ? { id: first.id, centerX: first.centerX, centerY: first.centerY, width: first.width, height: first.height, background: first.background, border: first.border } : null,
    second: second ? { id: second.id, centerX: second.centerX, centerY: second.centerY, width: second.width, height: second.height, background: second.background, border: second.border } : null,
    leftDistance,
    rightDistance,
    distanceDelta: leftDistance === null || rightDistance === null ? null : Math.abs(leftDistance - rightDistance),
    valid: Boolean(first && second && sceneCenterX !== null && first.centerX < sceneCenterX && second.centerX > sceneCenterX &&
      Math.abs(first.centerY - second.centerY) <= 1 && Math.abs(first.width - second.width) <= 0.5 && Math.abs(first.height - second.height) <= 0.5 &&
      first.background === second.background && first.border === second.border && Math.abs(Math.abs(first.centerX - sceneCenterX) - Math.abs(second.centerX - sceneCenterX)) <= 12)
  };
}

async function waitPhase(page, names, timeout = 18000) {
  const expected = Array.isArray(names) ? names : [names];
  try {
    await page.waitForFunction((phases) => {
      const phase = document.body.classList.contains("screen-map")
        ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map")
        : (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "");
      return phases.includes(phase);
    }, expected, { timeout });
  } catch (error) {
    throw new Error(`Timed out waiting for ${expected.join("|")}: ${JSON.stringify(await view(page))}`, { cause: error });
  }
  return view(page);
}

async function startFormal(page) {
  await page.locator("#gardenRestMarker").click();
  await waitPhase(page, ["lp01-model-playing", "lp01-model"]);
  return waitPhase(page, "lp01-model");
}

async function startCheck(page) {
  await page.locator("#chapter4StartCheck").click();
  return waitPhase(page, "target-playing");
}

async function clickCorrectBubble(page) {
  let current = await waitPhase(page, "awaiting-response");
  const target = current.attempt.sequence[current.attempt.callIndex];
  const bubbleId = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === target)?.[0];
  await page.locator(`[data-bubble-id="${bubbleId}"]`).click();
}

async function clickWrongBubble(page) {
  const current = await waitPhase(page, "awaiting-response");
  const target = current.attempt.sequence[current.attempt.callIndex];
  const correctBubbleId = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === target)?.[0];
  const wrongBubbleId = correctBubbleId === "bubble-1" ? "bubble-2" : "bubble-1";
  await page.locator(`[data-bubble-id="${wrongBubbleId}"]`).click();
}

async function replayAndReloadDuringLp01Target(page) {
  const navigation = page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(() => {
    const scene = document.querySelector("#chapter4Scene");
    let queued = false;
    const reload = () => {
      if (queued || scene?.dataset.chapter4Phase !== "target-playing") return;
      queued = true;
      observer.disconnect();
      window.setTimeout(() => window.location.reload(), 40);
    };
    const observer = new MutationObserver(reload);
    observer.observe(scene, { attributes: true, attributeFilter: ["data-chapter4-phase"] });
    document.querySelector("#chapter4Replay")?.click();
    reload();
  });
  await navigation;
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
}

async function answerCorrectAndInterrupt(page, targetPhase, destination) {
  const current = await waitPhase(page, "awaiting-response");
  const target = current.attempt.sequence[current.attempt.callIndex];
  const bubbleId = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === target)?.[0];
  if (!bubbleId) throw new Error(`No correct bubble for ${targetPhase}`);
  const navigation = destination === "reload"
    ? page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 })
    : null;
  await page.evaluate(({ bubbleId, targetPhase, destination }) => {
    const scene = document.querySelector("#chapter4Scene");
    const leave = () => {
      if (scene?.dataset.chapter4Phase !== targetPhase) return false;
      observer.disconnect();
      if (destination === "reload") location.reload();
      else document.querySelector("#mapReturn")?.click();
      return true;
    };
    const observer = new MutationObserver(leave);
    observer.observe(scene, { attributes: true, attributeFilter: ["data-chapter4-phase"] });
    document.querySelector(`[data-bubble-id="${bubbleId}"]`)?.click();
    leave();
  }, { bubbleId, targetPhase, destination });
  if (navigation) await navigation;
}

async function completeRemainingLp01(page) {
  while (true) {
    const current = await view(page);
    if (["lp01-complete", "lp01-early-rest", "lp01-supported-story-rest"].includes(current.phase) || current.action?.targetId === "LP02") return current;
    if (current.phase === "target-playing") await waitPhase(page, "awaiting-response");
    const ready = await view(page);
    if (ready.phase === "awaiting-response") await clickCorrectBubble(page);
    await page.waitForTimeout(40);
  }
}

async function completeLp01Calls(page, count) {
  for (let index = 0; index < count; index += 1) {
    const before = await waitPhase(page, "awaiting-response");
    const callIndex = before.attempt.callIndex;
    await clickCorrectBubble(page);
    await page.waitForFunction((previous) => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const action = runtime.active?.actions?.[runtime.active.actionIndex || 0];
      const attempt = action?.chapter4Attempt || (typeof ensureChapter4Attempt === "function" ? ensureChapter4Attempt() : null);
      return attempt?.callIndex > previous;
    }, callIndex, { timeout: 18000 });
  }
}

async function runSyntheticMicrophoneCoverage(page) {
  return page.evaluate(() => {
    const sampleRate = 44100;
    const c3 = 130.81278265;
    const c4 = 261.6255653;
    const makeSamples = ({ components = [], length = 8192, noiseAmplitude = 0 }) => {
      const samples = new Float32Array(length);
      let noiseState = 0x344a2;
      for (let index = 0; index < length; index += 1) {
        let value = 0;
        for (const [frequency, amplitude, phase = 0] of components) {
          value += amplitude * Math.sin(((2 * Math.PI * frequency * index) / sampleRate) + phase);
        }
        if (noiseAmplitude > 0) {
          noiseState = (Math.imul(noiseState, 1664525) + 1013904223) >>> 0;
          value += ((((noiseState / 0x100000000) * 2) - 1) * noiseAmplitude);
        }
        samples[index] = value;
      }
      return samples;
    };
    const definitions = {
      cleanC3: { components: [[c3, 0.09]] },
      cleanC4: { components: [[c4, 0.09]] },
      harmonicC3: { components: [[c3, 0.035], [c3 * 2, 0.085, 0.2], [c3 * 3, 0.055, -0.3]] },
      octaveAmbiguous: { components: [[c3, 0.035], [c4, 0.085, 0.2]] },
      noise: { noiseAmplitude: 0.09 },
      dualTone: { components: [[c3, 0.065], [164.81377846, 0.065, 0.4]] },
      shortC3: { components: [[c3, 0.09]], length: 2048 },
      lowBoundary: { components: [[65.40639133, 0.09]] }
    };
    const analyses = {};
    for (const [name, definition] of Object.entries(definitions)) {
      const samples = makeSamples(definition);
      const estimate = window.estimatePitch(samples, sampleRate);
      const mapped = estimate ? window.microphonePitchFromFrequency(estimate) : null;
      const audio = { microphoneGate: window.createMicrophoneGate() };
      const gateStates = [10, 110, 210].map((now) => window.updateMicrophoneGate(audio, {
        now,
        rmsValue: window.rms(samples),
        detectedPitch: mapped
      }).state);
      analyses[name] = {
        estimate: estimate ? {
          frequency: estimate.frequency,
          midi: window.frequencyToMidi(estimate.frequency),
          confidence: estimate.confidence,
          octaveAmbiguous: estimate.octaveAmbiguous,
          harmonicCoverage: estimate.harmonicCoverage,
          sampleCount: estimate.sampleCount,
          analysisWindowMs: estimate.analysisWindowMs,
          minFrequency: estimate.minFrequency,
          maxFrequency: estimate.maxFrequency
        } : null,
        mapped: mapped ? { midi: mapped.midi, octaveAmbiguous: mapped.octaveAmbiguous } : null,
        gateStates
      };
    }

    const performanceSamples = makeSamples(definitions.harmonicC3);
    for (let index = 0; index < 3; index += 1) window.estimatePitch(performanceSamples, sampleRate);
    const estimateDurations = [];
    for (let index = 0; index < 30; index += 1) {
      const startedAt = performance.now();
      window.estimatePitch(performanceSamples, sampleRate);
      estimateDurations.push(performance.now() - startedAt);
    }
    estimateDurations.sort((left, right) => left - right);
    const estimatorPerformance = {
      iterations: estimateDurations.length,
      medianMs: estimateDurations[Math.floor(estimateDurations.length / 2)],
      p95Ms: estimateDurations[Math.ceil(estimateDurations.length * 0.95) - 1],
      maxMs: estimateDurations.at(-1),
      analysisIntervalMs: 48,
      sampleCount: performanceSamples.length
    };

    const routeAudio = { microphoneGate: window.createMicrophoneGate() };
    const drive = (analysisName, times) => {
      const definition = definitions[analysisName];
      const samples = makeSamples(definition);
      const estimate = window.estimatePitch(samples, sampleRate);
      const mapped = estimate ? window.microphonePitchFromFrequency(estimate) : null;
      let finalGate = null;
      for (const now of times) {
        finalGate = window.updateMicrophoneGate(routeAudio, {
          now,
          rmsValue: window.rms(samples),
          detectedPitch: mapped
        });
      }
      if (finalGate?.state === "accepted" && mapped) window.handleInput(mapped.note.midi, "麦克风");
      return finalGate?.state || null;
    };
    const c4GateState = drive("cleanC4", [10, 110, 210]);
    const afterC4 = JSON.parse(JSON.stringify(window.ensureChapter4Attempt()));
    window.updateMicrophoneGate(routeAudio, { now: 240, rmsValue: 0, detectedPitch: null });
    const quietGate = window.updateMicrophoneGate(routeAudio, { now: 400, rmsValue: 0, detectedPitch: null });
    if (quietGate.state === "quiet") window.releaseGardenInput(null, "麦克风");
    const c3GateState = drive("cleanC3", [420, 520, 620]);
    const afterC3Accepted = JSON.parse(JSON.stringify(window.ensureChapter4Attempt()));
    window.updateMicrophoneGate(routeAudio, { now: 650, rmsValue: 0, detectedPitch: null });
    const c3QuietGate = window.updateMicrophoneGate(routeAudio, { now: 810, rmsValue: 0, detectedPitch: null });
    if (c3QuietGate.state === "quiet") window.releaseGardenInput(null, "麦克风");
    const afterC3 = window.ensureChapter4Attempt();
    const evidence = window.lp02EvidenceRecord(afterC3, { source: "microphone-assisted", modeled: false });
    return {
      analyses,
      estimatorPerformance,
      route: {
        c4GateState,
        c3GateState,
        quietGateState: quietGate.state,
        c3QuietGateState: c3QuietGate.state,
        afterC4,
        afterC3Accepted,
        afterC3: JSON.parse(JSON.stringify(afterC3)),
        evidence,
        learning: JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}")
      }
    };
  });
}

const locked = await makePage();
await seed(locked.page, formalLs08Fixture({ endedEcho: false }));
let current = await view(locked.page);
record("An unended low echo cannot create an actionable Chapter 4 entrance", current.phase === "locked" && current.markerDisabled && !current.marker.includes("地下入口"), current);
record("Map refresh with incomplete echo creates no C4-01 session or Chapter 4 evidence", !current.runtime.active && !current.runtime.chapter4?.lessonEvidence?.LP01, current.runtime);
const lp01SeedBalance = await locked.page.evaluate(() => {
  const seeds = Array.from({ length: 32 }, (_, index) => `C4-01-balance-${String(index).padStart(2, "0")}`);
  const samples = seeds.map((seed) => {
    const mapping = window.lp01BubbleMappingForSeed(seed);
    const sequence = window.lp01SequenceForSeed(seed);
    const answerBubbles = sequence.map((targetMidi) => Object.entries(mapping).find(([, midi]) => midi === targetMidi)?.[0] || null);
    const longestRun = sequence.reduce((result, midi, index) => {
      if (index === 0 || midi !== sequence[index - 1]) return { max: Math.max(result.max, 1), current: 1 };
      const current = result.current + 1;
      return { max: Math.max(result.max, current), current };
    }, { max: 0, current: 0 }).max;
    return {
      seed,
      mapping,
      sequence,
      answerBubbles,
      longestRun,
      reproducible: JSON.stringify(mapping) === JSON.stringify(window.lp01BubbleMappingForSeed(seed)) &&
        JSON.stringify(sequence) === JSON.stringify(window.lp01SequenceForSeed(seed))
    };
  });
  const countAt = (callIndex, bubbleId) => samples.filter((sample) => sample.answerBubbles[callIndex] === bubbleId).length;
  return {
    sampleCount: samples.length,
    first: { bubble1: countAt(0, "bubble-1"), bubble2: countAt(0, "bubble-2") },
    second: { bubble1: countAt(1, "bubble-1"), bubble2: countAt(1, "bubble-2") },
    combinations: [...new Set(samples.map((sample) => `${sample.mapping["bubble-1"]}:${sample.sequence[0]}`))].sort(),
    allSequencesValid: samples.every((sample) => sample.sequence.filter((midi) => midi === 48).length === 2 && sample.sequence.filter((midi) => midi === 60).length === 2 && sample.longestRun <= 2),
    reproducible: samples.every((sample) => sample.reproducible),
    samples
  };
});
record("Independent LP01 seed derivation balances first and second answer positions across 32 sessions", lp01SeedBalance.first.bubble1 === 16 && lp01SeedBalance.first.bubble2 === 16 && lp01SeedBalance.second.bubble1 === 16 && lp01SeedBalance.second.bubble2 === 16, lp01SeedBalance);
record("LP01 seeds cover all mapping-first-target combinations while preserving reproducible 2+2 sequences", lp01SeedBalance.combinations.length === 4 && lp01SeedBalance.allSequencesValid === true && lp01SeedBalance.reproducible === true, lp01SeedBalance);
await locked.context.close();

const main = await makePage({ width: 1366, height: 1024 }, { sessionUuid: "chapter4-main-seed" });
await seed(main.page);
current = await view(main.page);
record("Formal ended LS08 echo exposes an enabled underground entrance without auto-starting C4-01", current.phase === "chapter4-entry" && !current.markerDisabled && current.journeyChapter === "C4" && current.journeyBundle === "C4-01" && current.journeyTarget === "LP01" && current.journeyTitle === "听两个 C 的回声" && !current.runtime.active, current);
await startFormal(main.page);
current = await view(main.page);
record("Explicit entrance click creates the only formal C4-01 session", current.runtime.active?.bundleId === "C4-01" && current.attempt.formalSession === true && current.attempt.directMode === false, current.runtime.active);
record("LP01 finishes two unscored model sounds before check", current.attempt.modelEvents.length === 2 && current.attempt.scoredCalls.length === 0 && current.attempt.presentedCallCount === 0, current.attempt);
record("LP01 model uses the approved garden-mode Xingya with no sealed-suit reference", current.characterSrc.endsWith("xingya-garden-invite-v1.webp") && current.characterAssetState === "garden-mode" && current.sealedSuitReferences === 0, current);
record("Only the character model bubble asks which Do lives lower", current.speech.includes("哪个 Do 住得更低") && !current.childText.includes("Do"), { speech: current.speech, childText: current.childText });
record("LP01 bubbles are equal-weight fixed controls with neutral accessible names", current.bubbles.length === 2 && current.bubbles.every((bubble) => bubble.width === current.bubbles[0].width && bubble.height === current.bubbles[0].height && bubble.background === current.bubbles[0].background && bubble.border === current.bubbles[0].border && !/low|middle|C3|C4|低|高/.test(`${bubble.aria} ${JSON.stringify(bubble.data)}`)), current.bubbles);
const bubbles1366 = lp01BubblePositionReport(current);
record("LP01 1366x1024 bubbles have symmetric center weight around the scene", bubbles1366.valid, bubbles1366);
record("LP01 model exposes exactly two replayable bubbles and one start command", current.visibleSoundControls.join(",") === "bubble-1,bubble-2,chapter4StartCheck" && current.sourceVisible === false && current.replayHidden === true && current.startHidden === false, current.visibleSoundControls);

await startCheck(main.page);
const targetPlayingControls = await main.page.evaluate(() => new Promise((resolve) => {
  const inject = () => {
    if (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "target-playing") {
      const visible = (node) => {
        if (!node || node.hidden) return false;
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const controls = {
        sourceVisible: visible(document.querySelector("#chapter4SoundSource")),
        replayVisible: visible(document.querySelector("#chapter4Replay")),
        startVisible: visible(document.querySelector("#chapter4StartCheck")),
        visibleBubbles: [...document.querySelectorAll("#chapter4Bubbles .chapter4-bubble")].filter(visible).length
      };
      document.querySelector('[data-bubble-id="bubble-1"]')?.click();
      resolve(controls);
      return;
    }
    requestAnimationFrame(inject);
  };
  inject();
}));
record("LP01 check introduces one central source only after model teaching ends", targetPlayingControls.sourceVisible === true && targetPlayingControls.replayVisible === false && targetPlayingControls.startVisible === false && targetPlayingControls.visibleBubbles === 2, targetPlayingControls);
current = await waitPhase(main.page, "awaiting-response");
record("LP01 target-playing bubble input is observation-only", current.attempt.observations.some((event) => event.event === "early-bubble") && current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0 && !current.attempt.callFirstBubbleId, current.attempt);
record("Formal check uses a neutral sound-matching question", current.speech.includes("刚才是哪一个声音泡泡") && !current.speech.includes("住得更低"), current.speech);
record("Hidden LP01 target has no bubble DOM, ARIA, class or data carrier", current.bubbles.every((bubble) => !/48|60|low|middle|target|低|高/.test(`${bubble.aria} ${bubble.className} ${JSON.stringify(bubble.data)}`)), current.bubbles);
record("LP01 awaiting response keeps the central source and only the legal whole-target replay", current.sourceVisible === true && current.replayHidden === false && current.startHidden === true && current.visibleSoundControls.join(",") === "bubble-1,bubble-2,chapter4SoundSource,chapter4Replay", current.visibleSoundControls);

await main.page.evaluate(() => window.handleInput(48, "MIDI"));
current = await view(main.page);
record("LP01 MIDI is observation-only and cannot score", current.attempt.hasExperimentalInput && current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await clickCorrectBubble(main.page);
await completeRemainingLp01(main.page);
current = await waitPhase(main.page, ["lp01-complete", "lp02-guide"]);
if (current.phase === "lp01-complete") current = await waitPhase(main.page, "lp02-guide");
record("LP01 sequence is seeded, balanced 2/2 and fully resolved without fabricated calls", current.runtime.chapter4.lessonEvidence.LP01?.sequence.filter((midi) => midi === 48).length === 2 && current.runtime.chapter4.lessonEvidence.LP01?.sequence.filter((midi) => midi === 60).length === 2 && current.runtime.chapter4.lessonEvidence.LP01?.scoredCalls.length === 4, current.runtime.chapter4.lessonEvidence.LP01);
record("Experimental LP01 observation blocks stable but preserves played story", current.runtime.chapter4.lessonEvidence.LP01?.played === true && current.runtime.chapter4.lessonEvidence.LP01?.stable === false && current.learning.levels.LP01?.needsPractice === true, current.learning.levels.LP01);

const whiteKeys = current.keys.filter((key) => key.className.includes("white-key"));
const blackKeys = current.keys.filter((key) => key.className.includes("black-key"));
record("LP02 renders one continuous row of 14 equal white keys", whiteKeys.length === 14 && new Set(whiteKeys.map((key) => Math.round(key.width * 10))).size === 1 && whiteKeys.every((key, index) => index === 0 || key.left > whiteKeys[index - 1].left), whiteKeys);
record("LP02 renders the real ten black keys across two 2/3 groups", blackKeys.length === 10 && blackKeys.map((key) => key.midi).join(",") === "49,51,54,56,58,61,63,66,68,70", blackKeys);
record("LP02 guide keeps the same approved garden-mode Xingya", current.characterSrc.endsWith("xingya-garden-invite-v1.webp") && current.characterAssetState === "garden-mode" && current.sealedSuitReferences === 0, current);
record("LP02 guide shows one empty landing outline and no pre-installed future foundations", current.foundation.installed === "false" && current.foundation.state === "landing-place" && current.foundation.visibleBlockCount === 1 && current.foundation.borderStyle === "dashed", current.foundation);
record("LP02 child-facing key labels use low/middle C instead of octave numbers", whiteKeys.find((key) => key.midi === 48)?.aria.includes("低音 C") && whiteKeys.find((key) => key.midi === 60)?.aria.includes("中央 C") && current.keys.every((key) => !/C3|C4|Do/.test(key.aria)), current.keys);
const keys1366 = lp02KeyboardTouchReport(current);
record("LP02 1366x1024 records 44px-or-larger white and black touch boxes at real piano boundaries", keys1366.valid, keys1366);

await main.page.locator('#keyboard .white-key[data-midi="48"]').click();
await waitPhase(main.page, "lp02-complete");
current = await waitPhase(main.page, ["locked", "chapter4-entry", "chapter4-lp03-entry"], 10000);
record("Touch C3 completes LP02 played evidence and natural rest", current.runtime.chapter4.lessonEvidence.LP02?.played === true && current.runtime.chapter4.lessonEvidence.LP02?.targetMidi === 48 && current.runtime.history.at(-1)?.bundleId === "C4-01" && current.runtime.history.at(-1)?.endReason === "natural-rest", current.runtime.chapter4.lessonEvidence.LP02);
record("C4-01 LP02 never writes low-register stable or starts an LP03 session", (current.learning.levels.LP02?.stableCompletions || 0) === 0 && !current.runtime.chapter4.lessonEvidence.LP03 && current.runtime.chapter4.lp03Progress?.foundationCAnchored === true && current.runtime.chapter4.lp03Progress?.foundationCAwake === false && current.runtime.chapter4.lp03Progress?.foundationDPlaced === false && current.runtime.chapter4.lp03Progress?.foundationEPlaced === false && !current.runtime.active && !current.runtime.history.some((session) => session.bundleId === "C4-02"), current.runtime.chapter4);
record("LP02 success does not clear LP01 needsPractice", current.learning.levels.LP01?.needsPractice === true && current.runtime.chapter4.openingReviewQueue.includes("LP01"), current.runtime.chapter4);
await main.context.close();

const stableRun = await makePage({ width: 1194, height: 834 }, { sessionUuid: "chapter4-stable-seed" });
await seed(stableRun.page);
await startFormal(stableRun.page);
current = await view(stableRun.page);
const bubbles1194 = lp01BubblePositionReport(current);
record("LP01 1194x834 bubbles have symmetric center weight around the scene", bubbles1194.valid, bubbles1194);
await startCheck(stableRun.page);
await waitPhase(stableRun.page, "awaiting-response");
await stableRun.page.locator("#chapter4Replay").click();
await waitPhase(stableRun.page, "target-playing");
current = await waitPhase(stableRun.page, "awaiting-response");
record("One successful whole-target replay counts without scoring the LP01 call", current.attempt.replayCountChild === 1 && current.attempt.callChildReplayCount === 1 && current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await completeRemainingLp01(stableRun.page);
current = await waitPhase(stableRun.page, ["lp01-complete", "lp02-guide"]);
if (current.phase === "lp01-complete") current = await waitPhase(stableRun.page, "lp02-guide");
const keys1194 = lp02KeyboardTouchReport(current);
record("LP02 1194x834 records 44px-or-larger white and black touch boxes at real piano boundaries", keys1194.valid, keys1194);
record("A clean 4/4 LP01 round with at most one replay creates stable", current.runtime.chapter4.lessonEvidence.LP01?.played === true && current.runtime.chapter4.lessonEvidence.LP01?.stable === true && current.learning.levels.LP01?.stableCompletions === 1 && current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LP01"), current.learning.levels.LP01);
record("LP01 call records freeze required audit fields and never use timing for mastery", current.runtime.chapter4.lessonEvidence.LP01?.scoredCalls.every((call) => call.levelId === "LP01" && call.bundleId === "C4-01" && call.sessionId === current.runtime.chapter4.lessonEvidence.LP01.sessionId && [48, 60].includes(call.targetMidi) && call.bubbleMapping && call.candidatePreviewUsed === false && call.timingUsedForMastery === false), current.runtime.chapter4.lessonEvidence.LP01?.scoredCalls);
await stableRun.page.evaluate(() => window.setGameSoundEnabled(false));
await stableRun.page.locator('#keyboard .white-key[data-midi="48"]').click();
current = await waitPhase(stableRun.page, "sound-paused");
record("Muted formal LP02 touch preserves a pending C3 without scoring or installing the foundation", current.attempt.soundPauseContext === "lp02-child-input" && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0 && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 0 && current.attempt.outcomeRecorded === false && !current.runtime.chapter4.lessonEvidence.LP02 && current.runtime.active?.completedActions.filter((action) => action.targetId === "LP02").length === 0 && current.foundation.installed === "false", current);
const lp02PendingMapSessionId = current.runtime.active?.sessionId;
await stableRun.page.locator("#mapReturn").click();
current = await waitPhase(stableRun.page, "chapter4-entry");
record("Interrupted LP02 child input can leave for the map without fabricating a score", current.runtime.active?.sessionId === lp02PendingMapSessionId && current.attempt.phase === "sound-paused" && current.attempt.pendingLp02Input?.midi === 48 && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.outcomeRecorded === false && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 0 && current.foundation.installed === "false", current);
await stableRun.page.locator("#gardenRestMarker").click();
current = await waitPhase(stableRun.page, "sound-paused");
record("LP02 map re-entry preserves the frozen pending C3 for an explicit single recovery", current.runtime.active?.sessionId === lp02PendingMapSessionId && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.outcomeRecorded === false && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 0, current.attempt);
await stableRun.page.evaluate(() => window.setGameSoundEnabled(true));
await stableRun.page.locator("#chapter4Replay").click();
current = await waitPhase(stableRun.page, "lp02-input-playing");
record("Explicit LP02 touch recovery starts one bounded sound transaction before completion", current.attempt.audioTransaction?.context === "lp02-child-input" && current.attempt.audioTransaction?.startedAt && current.attempt.audioTransaction?.endedAt === null && current.attempt.outcomeRecorded === false && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.audioTrace.filter((event) => event.reason === "sound-recovery-child-key").length === 1, current.attempt);
current = await waitPhase(stableRun.page, "lp02-complete");
record("Recovered LP02 touch ends and completes exactly once with played-only mastery", current.attempt.audioTransaction?.endedAt && current.attempt.outcomeRecorded === true && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.routeArmed["屏幕"] === true && current.attempt.routeHeldMidi["屏幕"] === null && current.runtime.chapter4.lessonEvidence.LP02?.played === true && current.runtime.chapter4.lessonEvidence.LP02?.stable === false && current.runtime.history.at(-1)?.completedActions.filter((action) => action.targetId === "LP02").length === 1 && current.foundation.installed === "true", current);
await stableRun.context.close();

const lp02PendingVisual = await makePage();
await lp02PendingVisual.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02PendingVisual.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02PendingVisual.page.locator('#keyboard .white-key[data-midi="50"]').click();
current = await waitPhase(lp02PendingVisual.page, "lp02-wrong");
record("LP02 committed D wrong feedback identifies only the actual finished wrong key", current.keys.filter((key) => key.className.includes("hit-wrong")).map((key) => key.midi).join(",") === "50", current.keys);
await waitPhase(lp02PendingVisual.page, "lp02-guide");
await lp02PendingVisual.page.locator('#keyboard .white-key[data-midi="48"]').click();
current = await waitPhase(lp02PendingVisual.page, "lp02-input-playing");
record("LP02 pending C audio shows only neutral current-playing C and suppresses stale D wrong feedback", current.attempt.pendingLp02Input?.midi === 48 && current.keys.filter((key) => key.className.includes("lp02-current-playing")).map((key) => key.midi).join(",") === "48" && current.keys.filter((key) => key.className.includes("hit-wrong")).length === 0 && current.attempt.outcomeRecorded === false && current.foundation.installed === "false", current);
current = await waitPhase(lp02PendingVisual.page, "lp02-complete");
record("LP02 pending C installs the foundation only after its audio transaction ends", current.attempt.audioTransaction?.endedAt && current.attempt.outcomeRecorded === true && current.keys.filter((key) => key.className.includes("lp02-current-playing")).length === 0 && current.foundation.installed === "true", current);
await lp02PendingVisual.context.close();

const nearMiss = await makePage();
await nearMiss.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await nearMiss.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await nearMiss.page.locator('#keyboard .white-key[data-midi="60"]').click();
current = await waitPhase(nearMiss.page, "lp02-middle-c-near-miss");
record("Central C is a same-name near miss, not a low-register correct", current.attempt.firstChildMidi === 60 && current.attempt.firstNoteNameCorrect === true && current.attempt.firstRegisterCorrect === false && current.attempt.firstWrongOctave === true && current.speech.includes("中央 C") && !/C4/.test(current.speech), current.attempt);
await waitPhase(nearMiss.page, "lp02-guide");
await nearMiss.page.locator('#keyboard .white-key[data-midi="48"]').click();
current = await waitPhase(nearMiss.page, "lp02-complete");
record("Repairing a central-C near miss does not rewrite the frozen first response", current.attempt.firstChildMidi === 60 && current.attempt.firstNoteNameCorrect === true && current.attempt.firstRegisterCorrect === false, current.attempt);
record("LP02 complete keeps the approved garden-mode Xingya without a suit fallback", current.characterSrc.endsWith("xingya-garden-invite-v1.webp") && current.characterAssetState === "garden-mode" && current.sealedSuitReferences === 0, current);
record("LP02 complete visibly installs exactly the first foundation without exposing LP03 rewards", current.foundation.installed === "true" && current.foundation.state === "installed" && current.foundation.visibleBlockCount === 1 && current.foundation.borderStyle === "solid", current.foundation);
await nearMiss.context.close();

const midiRoute = await makePage();
await midiRoute.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await midiRoute.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await midiRoute.page.locator("#chapter4Speech").click({ position: { x: 8, y: 8 } });
await midiRoute.page.evaluate(async () => {
  await window.connectMIDI();
  window.__emitMidi(0x90, 48, 100);
});
current = await waitPhase(midiRoute.page, "lp02-input-playing");
record("Exact MIDI C3 starts one local-monitor transaction with the same pending-key identity and cannot complete on note-on", current.attempt.audioTransaction?.context === "lp02-child-input" && current.attempt.audioTransaction?.startedAt && current.attempt.audioTransaction?.endedAt === null && current.attempt.outcomeRecorded === false && current.attempt.audioTrace.filter((event) => event.reason === "midi-local-monitor").length === 1 && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.keys.filter((key) => key.className.includes("lp02-current-playing")).map((key) => key.midi).join(",") === "48" && current.keys.filter((key) => key.className.includes("hit-wrong")).length === 0, current);
await midiRoute.page.evaluate(() => window.__emitMidi(0x80, 48, 0));
current = await waitPhase(midiRoute.page, "lp02-complete");
record("Exact MIDI C3 completes only after local-monitor ended and never creates stable", current.attempt.audioTransaction?.endedAt && current.attempt.firstChildMidi === 48 && current.attempt.firstInputRoute === "MIDI" && current.attempt.firstRegisterCorrect === true && current.attempt.modeled === false && current.attempt.inputEvents.filter((event) => event.event === "release-rearm").length === 1, current.attempt);
await midiRoute.context.close();

const micRoute = await makePage();
await micRoute.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await micRoute.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
const syntheticMic = await runSyntheticMicrophoneCoverage(micRoute.page);
const synthetic = syntheticMic.analyses;
record("Synthetic estimator recognizes clean project C3 as MIDI 48 through the real mapper and gate", synthetic.cleanC3.estimate?.midi === 48 && synthetic.cleanC3.mapped?.midi === 48 && synthetic.cleanC3.estimate.octaveAmbiguous === false && synthetic.cleanC3.gateStates.at(-1) === "accepted", synthetic.cleanC3);
record("Synthetic estimator recognizes C4 as MIDI 60 and never confirms it as low C3", synthetic.cleanC4.estimate?.midi === 60 && synthetic.cleanC4.mapped?.midi === 60 && synthetic.cleanC4.gateStates.at(-1) === "accepted", synthetic.cleanC4);
record("Synthetic C3 with strong second and third harmonics remains confirmed C3", synthetic.harmonicC3.estimate?.midi === 48 && synthetic.harmonicC3.mapped?.midi === 48 && synthetic.harmonicC3.estimate.octaveAmbiguous === false && synthetic.harmonicC3.gateStates.at(-1) === "accepted", synthetic.harmonicC3);
record("Synthetic C3-C4 octave ambiguity cannot confirm low C3", synthetic.octaveAmbiguous.estimate?.octaveAmbiguous === true && synthetic.octaveAmbiguous.mapped?.midi !== 48 && synthetic.octaveAmbiguous.gateStates.every((state) => state === "uncertain"), synthetic.octaveAmbiguous);
record("Synthetic household-like noise and non-harmonic dual tone are rejected", synthetic.noise.estimate === null && synthetic.noise.mapped === null && synthetic.dualTone.estimate === null && synthetic.dualTone.mapped === null, { noise: synthetic.noise, dualTone: synthetic.dualTone });
record("Synthetic short fragment is rejected before pitch or gate acceptance", synthetic.shortC3.estimate === null && synthetic.shortC3.mapped === null && synthetic.shortC3.gateStates.every((state) => state === "uncertain"), synthetic.shortC3);
record("Below-slice C2 at 65.406 Hz is rejected and never mapped into LP02", synthetic.lowBoundary.estimate === null && synthetic.lowBoundary.mapped === null && synthetic.lowBoundary.gateStates.every((state) => state === "uncertain"), synthetic.lowBoundary);
record("Desktop estimator performance is recorded over 30 runs without becoming a release gate", Number.isFinite(syntheticMic.estimatorPerformance.medianMs) && Number.isFinite(syntheticMic.estimatorPerformance.p95Ms) && syntheticMic.estimatorPerformance.iterations === 30, syntheticMic.estimatorPerformance);
record("Real synthetic C4 gate starts an external transaction and waits for quiet before an unscored observation", syntheticMic.route.c4GateState === "accepted" && syntheticMic.route.afterC4.phase === "lp02-input-playing" && syntheticMic.route.afterC4.audioTransaction?.context === "lp02-external-input" && syntheticMic.route.afterC4.audioTransaction?.endedAt === null && syntheticMic.route.afterC4.wrongCount === 0 && syntheticMic.route.afterC4.outcomeRecorded === false && syntheticMic.route.quietGateState === "quiet", syntheticMic.route.afterC4);
record("Real synthetic C3 gate cannot complete until the accepted external onset reaches quiet", syntheticMic.route.c3GateState === "accepted" && syntheticMic.route.afterC3Accepted.phase === "lp02-input-playing" && syntheticMic.route.afterC3Accepted.audioTransaction?.endedAt === null && syntheticMic.route.afterC3Accepted.outcomeRecorded === false && syntheticMic.route.c3QuietGateState === "quiet", syntheticMic.route.afterC3Accepted);
record("Real synthetic C3 quiet end creates experimental assisted story completion only", syntheticMic.route.afterC3.audioTransaction?.endedAt && syntheticMic.route.afterC3.experimentalInput === true && syntheticMic.route.afterC3.microphoneConfidence === "confirmed" && syntheticMic.route.afterC3.strongCueUsed === true && syntheticMic.route.afterC3.outcomeRecorded === true, syntheticMic.route.afterC3);
record("Synthetic microphone completion never uses timing or writes LP02 stable-retained mastery", syntheticMic.route.evidence.timingUsedForMastery === false && syntheticMic.route.evidence.experimentalInput === true && syntheticMic.route.evidence.microphoneConfidence === "confirmed" && (syntheticMic.route.learning.levels?.LP02?.stableCompletions || 0) === 0 && !syntheticMic.route.learning.retention?.retainedEvents?.some((event) => event.skillKey === "level:LP02"), { evidence: syntheticMic.route.evidence, learning: syntheticMic.route.learning });
await micRoute.context.close();

const micReleaseTimeout = await makePage();
await micReleaseTimeout.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await micReleaseTimeout.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await micReleaseTimeout.page.evaluate(() => window.handleInput(48, "麦克风"));
current = await waitPhase(micReleaseTimeout.page, "sound-paused", 6000);
record("LP02 microphone input has a bounded release window and cannot score at timeout", current.attempt.soundPauseContext === "lp02-external-input" && current.attempt.audioTransaction?.interruptedAt && current.attempt.audioTransaction?.endedAt === null && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.outcomeRecorded === false, current.attempt);
await micReleaseTimeout.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
current = await view(micReleaseTimeout.page);
record("Late microphone quiet after timeout only rearms and cannot submit the interrupted input", current.phase === "sound-paused" && current.attempt.routeArmed["麦克风"] === true && current.attempt.outcomeRecorded === false && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0, current.attempt);
await micReleaseTimeout.page.locator("#chapter4Replay").click();
current = await waitPhase(micReleaseTimeout.page, "lp02-guide");
record("Explicit recovery from microphone release timeout requires a fresh input", current.attempt.pendingLp02Input === null && current.attempt.outcomeRecorded === false && current.attempt.observations.filter((event) => event.event === "external-input-retry-required").length === 1, current.attempt);
await micReleaseTimeout.context.close();

const micMapLifecycle = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-mic-map-lifecycle" });
await seed(micMapLifecycle.page);
await startFormal(micMapLifecycle.page);
await startCheck(micMapLifecycle.page);
await completeRemainingLp01(micMapLifecycle.page);
await waitPhase(micMapLifecycle.page, "lp02-guide", 10000);
await micMapLifecycle.page.evaluate(() => window.handleInput(48, "麦克风"));
current = await waitPhase(micMapLifecycle.page, "lp02-input-playing");
const micMapSessionId = current.runtime.active?.sessionId;
record("Accepted LP02 microphone onset remains pending until quiet and does not pre-record a child result", current.attempt.audioTransaction?.context === "lp02-external-input" && current.attempt.audioTransaction?.startedAt && current.attempt.audioTransaction?.endedAt === null && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0 && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 0, current.attempt);
await micMapLifecycle.page.locator("#mapReturn").click();
current = await waitPhase(micMapLifecycle.page, "chapter4-entry");
await micMapLifecycle.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
await micMapLifecycle.page.waitForTimeout(120);
current = await view(micMapLifecycle.page);
record("LP02 microphone map interruption freezes the old external transaction without ending or submitting it", current.runtime.active?.sessionId === micMapSessionId && current.attempt.phase === "sound-paused" && current.attempt.soundPauseContext === "lp02-external-input" && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.timingInterrupted === true && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0 && current.attempt.outcomeRecorded === false && current.foundation.installed === "false" && current.attempt.inputEvents.filter((event) => ["onset", "wrong-home"].includes(event.event)).length === 0, current);
await micMapLifecycle.page.locator("#gardenRestMarker").click();
current = await waitPhase(micMapLifecycle.page, "sound-paused");
record("LP02 microphone map re-entry keeps the same session and requires explicit recovery before the route rearms", current.runtime.active?.sessionId === micMapSessionId && current.attempt.pendingLp02Input?.midi === 48 && current.attempt.routeArmed["麦克风"] === false && current.attempt.outcomeRecorded === false, current.attempt);
await micMapLifecycle.page.locator("#chapter4Replay").click();
current = await waitPhase(micMapLifecycle.page, "lp02-guide");
record("Explicit LP02 microphone recovery discards only the interrupted input and restores a fresh route", current.attempt.pendingLp02Input === null && current.attempt.routeArmed["麦克风"] === true && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0 && current.attempt.observations.filter((event) => event.event === "external-input-retry-required").length === 1, current.attempt);
await micMapLifecycle.page.evaluate(() => window.handleInput(48, "麦克风"));
await waitPhase(micMapLifecycle.page, "lp02-input-playing");
await micMapLifecycle.page.evaluate(() => window.releaseGardenInput(null, "麦克风"));
current = await waitPhase(micMapLifecycle.page, "lp02-complete");
record("Only a fresh microphone input after map recovery can commit one assisted LP02 completion", current.attempt.audioTransaction?.endedAt && current.attempt.firstChildMidi === 48 && current.attempt.firstInputRoute === "麦克风" && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.outcomeRecorded === true && current.foundation.installed === "true", current.attempt);
await micMapLifecycle.context.close();

const direct = await makePage();
await direct.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await direct.page.evaluate(({ runtimeValue, learningValue }) => {
  localStorage.clear();
  localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
  localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
}, { runtimeValue: formalLs08Fixture({ endedEcho: false }), learningValue: learningFixture() });
const beforeDirect = await direct.page.evaluate(() => ({ runtime: localStorage.getItem("starDinoSessionRuntime"), learning: localStorage.getItem("starDinoLearningStats") }));
await direct.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await direct.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await direct.page.locator("#chapter4StartCheck").click();
await waitPhase(direct.page, ["lp01-model-playing", "lp01-model"]);
const afterDirect = await direct.page.evaluate(() => ({ runtime: localStorage.getItem("starDinoSessionRuntime"), learning: localStorage.getItem("starDinoLearningStats"), attempt: ensureChapter4Attempt() }));
record("Explicit audit direct mode is formalSession=false and creates no persisted C3/C4 learning history", afterDirect.attempt.directMode === true && afterDirect.attempt.formalSession === false && beforeDirect.runtime === afterDirect.runtime && beforeDirect.learning === afterDirect.learning, afterDirect.attempt);
await direct.context.close();

const targetMap = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-target-map" });
await seed(targetMap.page);
await startFormal(targetMap.page);
current = await view(targetMap.page);
const bubbles1024 = lp01BubblePositionReport(current);
record("LP01 1024x768 bubbles have symmetric center weight around the scene", bubbles1024.valid, bubbles1024);
await startCheck(targetMap.page);
await targetMap.page.evaluate(() => document.querySelector("#mapReturn")?.click());
current = await waitPhase(targetMap.page, "chapter4-entry");
const targetMapSessionId = current.runtime.active?.sessionId;
record("Map request during LP01 target waits for the full target transaction", current.runtime.active?.actions?.[0]?.chapter4Attempt?.audioTransaction?.endedAt && current.runtime.active?.actions?.[0]?.chapter4Attempt?.callIndex === 0 && current.runtime.active?.actions?.[0]?.chapter4Attempt?.scoredCalls.length === 0, current.runtime.active);
await targetMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(targetMap.page, "awaiting-response");
record("Target map resume preserves the same session and opens scoring only after audio ended", current.runtime.active?.sessionId === targetMapSessionId && current.attempt.callIndex === 0 && current.attempt.callSystemReplayCount === 0, current.attempt);
await targetMap.context.close();

const keyboard1024 = await makePage({ width: 1024, height: 768 });
await keyboard1024.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await keyboard1024.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await view(keyboard1024.page);
const keys1024 = lp02KeyboardTouchReport(current);
record("LP02 1024x768 records 44px-or-larger white and black touch boxes at real piano boundaries", keys1024.valid, keys1024);
await keyboard1024.context.close();

const targetRefresh = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-target-refresh" });
await seed(targetRefresh.page);
await startFormal(targetRefresh.page);
await startCheck(targetRefresh.page);
await targetRefresh.page.reload({ waitUntil: "domcontentloaded" });
await targetRefresh.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(targetRefresh.page, "sound-paused");
record("Refresh during LP01 target cannot silently open scoring", current.attempt.soundPauseContext === "lp01-target" && current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.callTimingInterrupted === true, current.attempt);
await targetRefresh.page.locator("#chapter4Replay").click();
current = await waitPhase(targetRefresh.page, "awaiting-response");
record("Explicit target recovery ends once and counts one system replay", current.attempt.callSystemReplayCount === 1 && current.attempt.replayCountSystem === 1 && current.attempt.callIndex === 0, current.attempt);
await targetRefresh.context.close();

const childReplayRefresh = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-child-replay-refresh" });
await seed(childReplayRefresh.page);
await startFormal(childReplayRefresh.page);
await startCheck(childReplayRefresh.page);
await waitPhase(childReplayRefresh.page, "awaiting-response");
await replayAndReloadDuringLp01Target(childReplayRefresh.page);
current = await waitPhase(childReplayRefresh.page, "sound-paused");
record("LP01 child replay refresh preserves its logical source before explicit recovery", current.attempt.soundPauseContext === "lp01-target" && current.attempt.pendingLp01TargetReason === "child-replay" && current.attempt.callIndex === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.replayCountChild === 0, current.attempt);
await childReplayRefresh.page.locator("#chapter4Replay").click();
current = await waitPhase(childReplayRefresh.page, "awaiting-response");
record("Recovered LP01 child replay counts once as child input and never as a system replay", current.attempt.replayCountChild === 1 && current.attempt.callChildReplayCount === 1 && current.attempt.replayCountSystem === 0 && current.attempt.callSystemReplayCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await childReplayRefresh.page.locator("#chapter4Replay").click();
await waitPhase(childReplayRefresh.page, "target-playing");
current = await waitPhase(childReplayRefresh.page, "awaiting-response");
record("A second completed LP01 child replay marks the active round for later review", current.attempt.replayCountChild === 2 && current.attempt.callChildReplayCount === 2 && current.attempt.needsPractice === true && current.attempt.openingReviewRequired === true, current.attempt);
await completeRemainingLp01(childReplayRefresh.page);
current = await waitPhase(childReplayRefresh.page, "chapter4-entry", 10000);
record("Two LP01 child replays complete the story without stable evidence and keep review visible", current.runtime.chapter4.lessonEvidence.LP01?.played === true && current.runtime.chapter4.lessonEvidence.LP01?.stable === false && current.learning.levels.LP01?.needsPractice === true && current.runtime.chapter4.openingReviewQueue.includes("LP01") && !current.learning.retention.stableEvents.some((event) => event.sessionId === current.runtime.chapter4.lessonEvidence.LP01?.sessionId && event.skillKey === "level:LP01") && current.parentProgress.includes("高低 C 待复习"), { evidence: current.runtime.chapter4.lessonEvidence.LP01, learning: current.learning.levels.LP01, parentProgress: current.parentProgress });
await childReplayRefresh.context.close();

const childReplaySoundOff = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-child-replay-sound-off" });
await seed(childReplaySoundOff.page);
await startFormal(childReplaySoundOff.page);
await startCheck(childReplaySoundOff.page);
await waitPhase(childReplaySoundOff.page, "awaiting-response");
await childReplaySoundOff.page.evaluate(() => window.setGameSoundEnabled(false));
await childReplaySoundOff.page.locator("#chapter4Replay").click();
current = await waitPhase(childReplaySoundOff.page, "sound-paused");
record("Muted LP01 child replay retains its child source without incrementing a replay", current.attempt.pendingLp01TargetReason === "child-replay" && current.attempt.replayCountChild === 0 && current.attempt.replayCountSystem === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await childReplaySoundOff.page.evaluate(() => window.setGameSoundEnabled(true));
await childReplaySoundOff.page.locator("#chapter4Replay").click();
current = await waitPhase(childReplaySoundOff.page, "awaiting-response");
record("Muted LP01 child replay recovery completes once as child input", current.attempt.replayCountChild === 1 && current.attempt.callChildReplayCount === 1 && current.attempt.replayCountSystem === 0 && current.attempt.callSystemReplayCount === 0, current.attempt);
await childReplaySoundOff.context.close();

const childReplayAudioFailure = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-child-replay-audio-failure" });
await seed(childReplayAudioFailure.page);
await startFormal(childReplayAudioFailure.page);
await startCheck(childReplayAudioFailure.page);
await waitPhase(childReplayAudioFailure.page, "awaiting-response");
await childReplayAudioFailure.page.evaluate(async () => {
  window.__chapter4OriginalAudioContext = window.AudioContext;
  window.__chapter4OriginalWebkitAudioContext = window.webkitAudioContext;
  if (state.sfx?.ctx && state.sfx.ctx.state !== "closed") await state.sfx.ctx.close();
  state.sfx = null;
  const FailingAudioContext = class { constructor() { throw new Error("chapter4-test-audio-failure"); } };
  window.AudioContext = FailingAudioContext;
  window.webkitAudioContext = FailingAudioContext;
});
await childReplayAudioFailure.page.locator("#chapter4Replay").click();
current = await waitPhase(childReplayAudioFailure.page, "sound-paused");
record("AudioContext failure during LP01 child replay retains the child source without scoring", current.attempt.pendingLp01TargetReason === "child-replay" && current.attempt.replayCountChild === 0 && current.attempt.replayCountSystem === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await childReplayAudioFailure.page.evaluate(() => {
  window.AudioContext = window.__chapter4OriginalAudioContext;
  window.webkitAudioContext = window.__chapter4OriginalWebkitAudioContext;
  delete window.__chapter4OriginalAudioContext;
  delete window.__chapter4OriginalWebkitAudioContext;
});
await childReplayAudioFailure.page.locator("#chapter4Replay").click();
current = await waitPhase(childReplayAudioFailure.page, "awaiting-response");
record("AudioContext recovery completes LP01 child replay once with its original source", current.attempt.replayCountChild === 1 && current.attempt.callChildReplayCount === 1 && current.attempt.replayCountSystem === 0 && current.attempt.callSystemReplayCount === 0, current.attempt);
await childReplayAudioFailure.context.close();

const pendingResumeAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-pending-resume" });
await seed(pendingResumeAudio.page);
await startFormal(pendingResumeAudio.page);
await pendingResumeAudio.page.evaluate(async () => {
  const ctx = state.sfx?.ctx;
  if (!ctx) throw new Error("missing LP01 AudioContext");
  if (ctx.state === "running") await ctx.suspend();
  const originalResume = ctx.resume.bind(ctx);
  let rejectResume = null;
  ctx.resume = () => new Promise((resolve, reject) => { rejectResume = reject; });
  window.__chapter4PendingResume = {
    ctx,
    originalResume,
    reject: () => rejectResume?.(new Error("controlled resume rejection"))
  };
});
await pendingResumeAudio.page.locator("#chapter4StartCheck").click();
await pendingResumeAudio.page.waitForTimeout(90);
current = await view(pendingResumeAudio.page);
record("LP01 suspended resume-pending target remains scheduled without started or presented evidence", current.phase === "target-playing" && current.attempt.audioTransaction?.scheduledAt && current.attempt.audioTransaction?.startedAt === null && current.attempt.presentedCallCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await pendingResumeAudio.page.evaluate(() => window.__chapter4PendingResume.reject());
current = await waitPhase(pendingResumeAudio.page, "sound-paused");
record("LP01 rejected resume records interruption without a presented target, score or cave ring", current.attempt.soundPauseContext === "lp01-target" && current.attempt.audioTransaction?.startedAt === null && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.presentedCallCount === 0 && current.attempt.resolvedCallCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await pendingResumeAudio.page.evaluate(async () => {
  const pending = window.__chapter4PendingResume;
  pending.ctx.resume = pending.originalResume;
  state.sfx.resumePromise = null;
  await pending.originalResume();
});
await pendingResumeAudio.page.locator("#chapter4Replay").click();
current = await waitPhase(pendingResumeAudio.page, "awaiting-response");
record("LP01 recovered target records one real Web Audio start/end timeline before opening response", Boolean(current.attempt.audioTransaction?.playbackId) && Boolean(current.attempt.audioTransaction?.scheduledAt) && Boolean(current.attempt.audioTransaction?.startedAt) && Boolean(current.attempt.audioTransaction?.endedAt) && Number.isFinite(current.attempt.audioTransaction?.startAudioTime) && Number.isFinite(current.attempt.audioTransaction?.endAudioTime) && current.attempt.audioTransaction.endAudioTime >= current.attempt.audioTransaction.startAudioTime && current.attempt.presentedCallCount === 1 && current.attempt.scoredCalls.length === 0, current.attempt);
await pendingResumeAudio.context.close();

const repairSuspendAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-repair-suspend" });
await seed(repairSuspendAudio.page);
await startFormal(repairSuspendAudio.page);
await startCheck(repairSuspendAudio.page);
await clickWrongBubble(repairSuspendAudio.page);
await waitPhase(repairSuspendAudio.page, "wrong-repair-playing");
await repairSuspendAudio.page.waitForFunction(() => ensureChapter4Attempt()?.audioTransaction?.startedAt, null, { timeout: 10000 });
await repairSuspendAudio.page.locator("#mapReturn").click();
current = await view(repairSuspendAudio.page);
const repairMapSessionId = current.runtime.active?.sessionId;
record("LP01 wrong-repair map request queues against its active real transaction", current.phase === "wrong-repair-playing" && current.attempt.audioTransaction?.returnQueued === true && current.attempt.audioTransaction?.endedAt === null && current.attempt.callWrongCount === 1 && current.attempt.resolvedCallCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await repairSuspendAudio.page.evaluate(() => state.sfx?.ctx?.suspend());
current = await waitPhase(repairSuspendAudio.page, "chapter4-entry");
await repairSuspendAudio.page.waitForTimeout(120);
current = await view(repairSuspendAudio.page);
record("Interrupted LP01 queued return automatically reaches the map once without fabricated repair completion", current.runtime.active?.sessionId === repairMapSessionId && current.attempt.phase === "sound-paused" && current.attempt.soundPauseContext === "lp01-wrong-repair" && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.endedAt === null && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && current.attempt.audioTrace.filter((event) => event.kind === "queued-return-consumed").length === 1 && current.attempt.callWrongCount === 1 && current.attempt.resolvedCallCount === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.callSystemReplayCount === 0, current);
await repairSuspendAudio.page.locator("#gardenRestMarker").click();
current = await waitPhase(repairSuspendAudio.page, "sound-paused");
record("LP01 repair map re-entry retains the same frozen response until the child explicitly recovers sound", current.runtime.active?.sessionId === repairMapSessionId && current.attempt.soundPauseContext === "lp01-wrong-repair" && current.attempt.callWrongCount === 1 && current.attempt.scoredCalls.length === 0 && current.attempt.callSystemReplayCount === 0, current.attempt);
await repairSuspendAudio.page.evaluate(async () => { if (state.sfx?.ctx?.state === "suspended") await state.sfx.ctx.resume(); });
await repairSuspendAudio.page.locator("#chapter4Replay").click();
current = await waitPhase(repairSuspendAudio.page, "awaiting-response");
record("LP01 wrong repair recovery ends once after the restored context and keeps one frozen wrong input", current.attempt.callWrongCount === 1 && current.attempt.callSystemReplayCount === 1 && current.attempt.scoredCalls.length === 0 && current.attempt.audioTransaction?.endedAt && current.attempt.audioTransaction?.interruptedAt === null, current.attempt);
await repairSuspendAudio.context.close();

const lp02RejectedAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-lp02-rejected" });
await lp02RejectedAudio.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02RejectedAudio.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02RejectedAudio.page.evaluate(async () => {
  window.unlockAudioFromGesture();
  const sfx = window.getSfxBus();
  if (!sfx) throw new Error("missing LP02 AudioContext");
  if (sfx.ctx.state === "suspended") await sfx.ctx.resume();
  const originalResume = sfx.ctx.resume.bind(sfx.ctx);
  await sfx.ctx.suspend();
  sfx.ctx.resume = () => Promise.reject(new Error("controlled LP02 resume rejection"));
  window.__chapter4Lp02RejectedResume = { ctx: sfx.ctx, originalResume };
});
await lp02RejectedAudio.page.locator('#keyboard [data-midi="48"]').click();
current = await waitPhase(lp02RejectedAudio.page, "sound-paused");
record("LP02 suspended rejected local monitor writes no onset, wrong, foundation or completion", current.attempt.soundPauseContext === "lp02-child-input" && current.attempt.audioTransaction?.startedAt === null && current.attempt.inputEvents.filter((event) => ["onset", "wrong-home"].includes(event.event)).length === 0 && current.attempt.wrongCount === 0 && current.attempt.outcomeRecorded === false && current.foundation.installed === "false", current);
await lp02RejectedAudio.page.evaluate(async () => {
  const pending = window.__chapter4Lp02RejectedResume;
  pending.ctx.resume = pending.originalResume;
  state.sfx.resumePromise = null;
  await pending.originalResume();
});
await lp02RejectedAudio.page.locator("#chapter4Replay").click();
current = await waitPhase(lp02RejectedAudio.page, "lp02-complete");
record("LP02 explicit recovery starts and ends one local monitor before installing the direct-mode foundation", Boolean(current.attempt.audioTransaction?.startedAt) && Boolean(current.attempt.audioTransaction?.endedAt) && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.outcomeRecorded === true && current.attempt.modeled === false && current.foundation.installed === "true" && !current.runtime.chapter4?.lessonEvidence?.LP02, current);
await lp02RejectedAudio.context.close();

const watchdogAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-watchdog" });
await seed(watchdogAudio.page);
await startFormal(watchdogAudio.page);
await watchdogAudio.page.evaluate(async () => {
  if (state.sfx?.ctx?.state !== "closed") await state.sfx.ctx.close();
  state.sfx = null;
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
    suspend() { this.state = "suspended"; this._listeners.forEach((listener) => listener()); return Promise.resolve(); }
    close() { this.state = "closed"; this._listeners.forEach((listener) => listener()); return Promise.resolve(); }
    createGain() { return { ...node(), gain: parameter(1) }; }
    createDynamicsCompressor() { return { ...node(), threshold: parameter(-24), knee: parameter(20), ratio: parameter(8), attack: parameter(0.006), release: parameter(0.18) }; }
    createBiquadFilter() { return { ...node(), type: "lowpass", frequency: parameter(0), Q: parameter(0) }; }
    createOscillator() { return { ...node(), type: "sine", frequency: parameter(0), detune: parameter(0), onended: null, start() {}, stop() {} }; }
  }
  window.__chapter4OriginalAudioContext = window.AudioContext;
  window.__chapter4OriginalWebkitAudioContext = window.webkitAudioContext;
  window.AudioContext = WatchdogAudioContext;
  window.webkitAudioContext = WatchdogAudioContext;
});
await startCheck(watchdogAudio.page);
current = await waitPhase(watchdogAudio.page, "sound-paused", 6000);
record("LP01 watchdog interrupts a real-start transaction without fabricating end, scoring or cave progress", current.attempt.soundPauseContext === "lp01-target" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.contextState === "running" && current.attempt.presentedCallCount === 1 && current.attempt.scoredCalls.length === 0 && current.attempt.resolvedCallCount === 0 && current.attempt.audioTrace.some((event) => event.kind === "audio-paused" && event.reason === "teaching-watchdog-timeout"), current.attempt);
await watchdogAudio.context.close();

const hiddenLifecycleAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-document-hidden" });
await seed(hiddenLifecycleAudio.page);
await startFormal(hiddenLifecycleAudio.page);
await startCheck(hiddenLifecycleAudio.page);
await hiddenLifecycleAudio.page.waitForFunction(() => ensureChapter4Attempt()?.audioTransaction?.startedAt, null, { timeout: 10000 });
await hiddenLifecycleAudio.page.evaluate(() => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  document.dispatchEvent(new Event("visibilitychange"));
});
current = await waitPhase(hiddenLifecycleAudio.page, "sound-paused");
record("Document hidden interrupts an active LP01 transaction without allowing a late ended callback", current.attempt.soundPauseContext === "lp01-target" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.scoredCalls.length === 0 && current.attempt.audioTrace.some((event) => event.kind === "audio-paused" && event.reason === "teaching-document-hidden"), current.attempt);
await hiddenLifecycleAudio.context.close();

const reverseOrderAudio = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-reverse-onended" });
await seed(reverseOrderAudio.page);
await startFormal(reverseOrderAudio.page);
await installReverseOrderAudioContext(reverseOrderAudio.page);
await startCheck(reverseOrderAudio.page);
await reverseOrderAudio.page.waitForFunction(() => ensureChapter4Attempt()?.audioTransaction?.startedAt && state.sfx?.ctx?._oscillators?.length === 4, null, { timeout: 10000 });
await reverseOrderAudio.page.locator("#mapReturn").click();
await reverseOrderAudio.page.evaluate(() => {
  const ctx = state.sfx?.ctx;
  ctx?._setStateSilently("suspended");
  ctx?._fireOscillatorEnds();
  ctx?._emitStatechange();
  ctx?._fireOscillatorEnds();
});
current = await waitPhase(reverseOrderAudio.page, "chapter4-entry");
await reverseOrderAudio.page.waitForTimeout(50);
current = await view(reverseOrderAudio.page);
record("Reverse-order suspended C4 oscillator ends consume one queued map return without fabricating target end or scoring", current.attempt.soundPauseContext === "lp01-target" && current.attempt.audioTransaction?.contextState === "suspended" && Boolean(current.attempt.audioTransaction?.startedAt) && current.attempt.audioTransaction?.endedAt === null && Boolean(current.attempt.audioTransaction?.interruptedAt) && current.attempt.audioTransaction?.returnQueued === false && Boolean(current.attempt.audioTransaction?.returnQueuedConsumedAt) && current.attempt.audioTrace.filter((event) => event.kind === "queued-return-consumed").length === 1 && current.attempt.presentedCallCount === 1 && current.attempt.resolvedCallCount === 0 && current.attempt.scoredCalls.length === 0 && !current.runtime.chapter4.lessonEvidence.LP01, current.attempt);
await reverseOrderAudio.context.close();

const finalRepeatedRepair = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-final-repeated-repair" });
await seed(finalRepeatedRepair.page);
await startFormal(finalRepeatedRepair.page);
await startCheck(finalRepeatedRepair.page);
await completeLp01Calls(finalRepeatedRepair.page, 3);
const finalRepeatedRepairSessionId = (await view(finalRepeatedRepair.page)).runtime.active?.sessionId;
await clickWrongBubble(finalRepeatedRepair.page);
await waitPhase(finalRepeatedRepair.page, "wrong");
await waitPhase(finalRepeatedRepair.page, "awaiting-response");
await clickWrongBubble(finalRepeatedRepair.page);
await waitPhase(finalRepeatedRepair.page, "pair-compare");
await waitPhase(finalRepeatedRepair.page, "awaiting-response");
await clickCorrectBubble(finalRepeatedRepair.page);
await waitPhase(finalRepeatedRepair.page, "lp01-complete");
current = await waitPhase(finalRepeatedRepair.page, "chapter4-entry", 10000);
const repeatedRepairSummary = current.runtime.chapter4.lessonEvidence.LP01;
const repeatedRepairHistory = current.runtime.history.at(-1)?.completedActions.find((action) => action.targetId === "LP01");
record("Fourth-call pair-compare repair blocks LP01 stable before retention is recorded", repeatedRepairSummary?.played === true && repeatedRepairSummary?.correctCount === 3 && repeatedRepairSummary?.stable === false && current.learning.levels.LP01?.stableCompletions === 0 && !current.learning.retention.stableEvents.some((event) => event.skillKey === "level:LP01" && event.sessionId === finalRepeatedRepairSessionId), { summary: repeatedRepairSummary, learning: current.learning.levels.LP01, retention: current.learning.retention.stableEvents });
record("Fourth-call pair-compare repair keeps learning, history and parent review evidence consistent", current.learning.levels.LP01?.needsPractice === true && current.runtime.chapter4.openingReviewQueue.includes("LP01") && current.runtime.chapter4.resume?.nextTargetId === "LP02" && repeatedRepairHistory?.played === true && repeatedRepairHistory?.stable === false && repeatedRepairHistory?.needsPractice === true && repeatedRepairHistory?.reason === "lp01-difficult-complete" && current.parentFocus === "高低 C 声音比较" && current.parentDetail.includes("低音 C 还要找家；高低 C 比较也会在以后再复习") && current.parentProgress.includes("高低 C 待复习") && !/LP01|LP02|played|stable/i.test([current.parentFocus, current.parentDetail, current.parentProgress, current.parentMasteryStatus, current.parentMasteryDetail, current.parentStaffState].join(" ")), { summary: repeatedRepairSummary, history: repeatedRepairHistory, parentFocus: current.parentFocus, parentDetail: current.parentDetail, parentProgress: current.parentProgress, parentMasteryStatus: current.parentMasteryStatus, parentMasteryDetail: current.parentMasteryDetail, parentStaffState: current.parentStaffState });
await finalRepeatedRepair.context.close();

const repairMap = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-repair-map" });
await seed(repairMap.page);
await startFormal(repairMap.page);
await startCheck(repairMap.page);
current = await waitPhase(repairMap.page, "awaiting-response");
const repairTarget = current.attempt.sequence[0];
const repairCorrect = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === repairTarget)?.[0];
const repairWrong = repairCorrect === "bubble-1" ? "bubble-2" : "bubble-1";
await repairMap.page.locator(`[data-bubble-id="${repairWrong}"]`).click();
await waitPhase(repairMap.page, "wrong-repair-playing");
await repairMap.page.evaluate(() => document.querySelector("#mapReturn")?.click());
current = await waitPhase(repairMap.page, "chapter4-entry");
record("Map request during wrong repair waits for child-then-target audio to end", current.runtime.active?.actions?.[0]?.chapter4Attempt?.callWrongCount === 1 && current.runtime.active?.actions?.[0]?.chapter4Attempt?.callSystemReplayCount === 1 && current.runtime.active?.actions?.[0]?.chapter4Attempt?.scoredCalls.length === 0, current.runtime.active);
await repairMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(repairMap.page, "awaiting-response");
record("Wrong-repair map resume does not duplicate wrong evidence or replay count", current.attempt.callWrongCount === 1 && current.attempt.callSystemReplayCount === 1 && current.attempt.callInputEvents.filter((event) => event.event === "bubble-submit").length === 1, current.attempt);
await repairMap.context.close();

const correctFeedbackMap = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-correct-feedback-map" });
await seed(correctFeedbackMap.page);
await startFormal(correctFeedbackMap.page);
await startCheck(correctFeedbackMap.page);
const correctFeedbackMapSessionId = (await view(correctFeedbackMap.page)).runtime.active?.sessionId;
await answerCorrectAndInterrupt(correctFeedbackMap.page, "correct-feedback", "map");
current = await waitPhase(correctFeedbackMap.page, "chapter4-entry");
record("LP01 map keeps the child-facing active journey state while accessibility exposes the current course position", current.mapStarText === "正在和星芽一起做" && current.mapStarAria.includes("地下回声洞课程进度：共 3 站，现在第 1 站，进行中") && current.journeyTitle === "听两个 C 的回声" && current.journeyLearning.includes("分清高 C 和低 C") && !`${current.mapStarText} ${current.mapStarAria} ${current.journeyLearning}`.includes("四个声音"), { mapStarText: current.mapStarText, mapStarAria: current.mapStarAria, journeyTitle: current.journeyTitle, journeyLearning: current.journeyLearning });
await correctFeedbackMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(correctFeedbackMap.page, ["target-playing", "awaiting-response"]);
let storedLp01 = current.runtime.active?.actions?.find((action) => action.targetId === "LP01")?.chapter4Attempt;
record("Map resume from LP01 correct feedback advances the same session to one next target without duplicate scoring", current.runtime.active?.sessionId === correctFeedbackMapSessionId && storedLp01?.callIndex === 1 && storedLp01?.resolvedCallCount === 1 && storedLp01?.scoredCalls.length === 1 && storedLp01?.presentedCallCount === 2 && storedLp01?.callFirstBubbleId === null, storedLp01);
await correctFeedbackMap.context.close();

const correctFeedbackReload = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-correct-feedback-reload" });
await seed(correctFeedbackReload.page);
await startFormal(correctFeedbackReload.page);
await startCheck(correctFeedbackReload.page);
const correctFeedbackReloadSessionId = (await view(correctFeedbackReload.page)).runtime.active?.sessionId;
await answerCorrectAndInterrupt(correctFeedbackReload.page, "correct-feedback", "reload");
await correctFeedbackReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(correctFeedbackReload.page, "sound-paused");
record("Reload from LP01 correct feedback deterministically resets the next call but waits for an explicit audio gesture", current.runtime.active?.sessionId === correctFeedbackReloadSessionId && current.attempt.soundPauseContext === "lp01-target" && current.attempt.callIndex === 1 && current.attempt.resolvedCallCount === 1 && current.attempt.scoredCalls.length === 1 && current.attempt.presentedCallCount === 1 && current.attempt.callFirstBubbleId === null, current.attempt);
await correctFeedbackReload.page.locator("#chapter4Replay").click();
await waitPhase(correctFeedbackReload.page, "awaiting-response");
current = await view(correctFeedbackReload.page);
record("LP01 correct-feedback reload recovery presents the next target exactly once without a fabricated replay", current.attempt.callIndex === 1 && current.attempt.scoredCalls.length === 1 && current.attempt.presentedCallCount === 2 && current.attempt.callSystemReplayCount === 0 && current.attempt.replayCountSystem === 0, current.attempt);
await correctFeedbackReload.context.close();

const lp01CompleteMap = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-complete-map" });
await seed(lp01CompleteMap.page);
await startFormal(lp01CompleteMap.page);
await startCheck(lp01CompleteMap.page);
await completeLp01Calls(lp01CompleteMap.page, 3);
const completeMapSessionId = (await view(lp01CompleteMap.page)).runtime.active?.sessionId;
await answerCorrectAndInterrupt(lp01CompleteMap.page, "lp01-complete", "map");
current = await waitPhase(lp01CompleteMap.page, "chapter4-entry");
record("LP01 complete map pause preserves one recorded four-call outcome", current.runtime.active?.sessionId === completeMapSessionId && current.runtime.active?.completedActions.filter((action) => action.targetId === "LP01").length === 1 && current.runtime.active?.actions.find((action) => action.targetId === "LP01")?.chapter4Attempt?.scoredCalls.length === 4, current.runtime.active);
await lp01CompleteMap.page.locator("#gardenRestMarker").click();
current = await waitPhase(lp01CompleteMap.page, "lp02-guide");
storedLp01 = current.runtime.active?.actions?.find((action) => action.targetId === "LP01")?.chapter4Attempt;
record("LP01 complete map resume advances to the existing LP02 action once", current.runtime.active?.sessionId === completeMapSessionId && current.action?.targetId === "LP02" && current.runtime.active?.completedActions.filter((action) => action.targetId === "LP01").length === 1 && storedLp01?.callIndex === 4 && storedLp01?.scoredCalls.length === 4 && !current.runtime.chapter4.lessonEvidence.LP02, { active: current.runtime.active, storedLp01 });
await lp01CompleteMap.context.close();

const lp01CompleteReload = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-complete-reload" });
await seed(lp01CompleteReload.page);
await startFormal(lp01CompleteReload.page);
await startCheck(lp01CompleteReload.page);
await completeLp01Calls(lp01CompleteReload.page, 3);
const completeReloadSessionId = (await view(lp01CompleteReload.page)).runtime.active?.sessionId;
await answerCorrectAndInterrupt(lp01CompleteReload.page, "lp01-complete", "reload");
await lp01CompleteReload.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(lp01CompleteReload.page, "lp02-guide");
storedLp01 = current.runtime.active?.actions?.find((action) => action.targetId === "LP01")?.chapter4Attempt;
record("LP01 complete reload advances once without duplicating calls, action history or LP02 evidence", current.runtime.active?.sessionId === completeReloadSessionId && current.action?.targetId === "LP02" && current.runtime.active?.completedActions.filter((action) => action.targetId === "LP01").length === 1 && storedLp01?.callIndex === 4 && storedLp01?.resolvedCallCount === 4 && storedLp01?.scoredCalls.length === 4 && !current.runtime.chapter4.lessonEvidence.LP02, { active: current.runtime.active, storedLp01 });
await lp01CompleteReload.context.close();

const soundPause = await makePage();
await soundPause.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await soundPause.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 })));
await soundPause.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await soundPause.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await soundPause.page.locator("#chapter4StartCheck").click();
current = await waitPhase(soundPause.page, "sound-paused");
record("Sound disabled pauses LP01 before model/check evidence", current.attempt.modelEvents.length === 0 && current.attempt.presentedCallCount === 0 && current.attempt.scoredCalls.length === 0, current.attempt);
await soundPause.page.evaluate(() => window.setGameSoundEnabled(true));
await soundPause.page.locator("#chapter4Replay").click();
current = await waitPhase(soundPause.page, "lp01-model");
record("Explicit sound recovery resumes the same unscored model", current.attempt.modelEvents.length === 2 && current.attempt.scoredCalls.length === 0, current.attempt);
await soundPause.context.close();

const targetUnavailable = await makePage();
await targetUnavailable.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await targetUnavailable.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await targetUnavailable.page.locator("#chapter4StartCheck").click();
await waitPhase(targetUnavailable.page, "lp01-model");
await targetUnavailable.page.evaluate(() => window.setGameSoundEnabled(false));
await targetUnavailable.page.locator("#chapter4StartCheck").click();
current = await waitPhase(targetUnavailable.page, "sound-paused");
record("LP01 target audio failure after completed models does not fabricate a presented call", current.attempt.modelEvents.length === 2 && current.attempt.checkEntered === true && current.attempt.soundPauseContext === "lp01-target" && current.attempt.presentedCallCount === 0 && current.attempt.resolvedCallCount === 0 && current.attempt.unpresentedCallCount === 4 && current.attempt.scoredCalls.length === 0 && current.attempt.callPresentedAt === null, current.attempt);
await targetUnavailable.page.evaluate(() => window.setGameSoundEnabled(true));
await targetUnavailable.page.locator("#chapter4Replay").click();
await waitPhase(targetUnavailable.page, "awaiting-response");
current = await view(targetUnavailable.page);
record("LP01 target recovery counts the first real presentation once and not as a system replay", current.attempt.presentedCallCount === 1 && current.attempt.unpresentedCallCount === 3 && current.attempt.callPresentedAt && current.attempt.resolvedCallCount === 0 && current.attempt.scoredCalls.length === 0 && current.attempt.replayCountSystem === 0 && current.attempt.callSystemReplayCount === 0, current.attempt);
await completeRemainingLp01(targetUnavailable.page);
current = await waitPhase(targetUnavailable.page, "lp01-complete");
record("LP01 complete copy describes four comparisons rather than four different pitches", current.speech.includes("四次回声都安顿好") && current.callProgressAria.includes("四次声音比较已解决 4 次") && !`${current.speech} ${current.callProgressAria}`.includes("四个声音"), { speech: current.speech, callProgressAria: current.callProgressAria });
await targetUnavailable.context.close();

const lp02MutedOtherWhite = await makePage();
await lp02MutedOtherWhite.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await lp02MutedOtherWhite.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: false, volume: 0.6 })));
await lp02MutedOtherWhite.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02MutedOtherWhite.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02MutedOtherWhite.page.locator('#keyboard .white-key[data-midi="50"]').click();
current = await waitPhase(lp02MutedOtherWhite.page, "sound-paused");
record("Muted LP02 other-white input remains pending with zero child scoring", current.attempt.pendingLp02Input?.midi === 50 && current.attempt.firstChildMidi === null && current.attempt.firstNoteNameCorrect === null && current.attempt.wrongCount === 0 && current.attempt.lastWrongInput === null && current.attempt.strongCueUsed === false && current.attempt.inputEvents.filter((event) => ["onset", "wrong-home"].includes(event.event)).length === 0 && current.attempt.outcomeRecorded === false && current.foundation.installed === "false", current);
await lp02MutedOtherWhite.context.close();

const lp02ZeroVolume = await makePage();
await lp02ZeroVolume.page.goto(mapUrl(), { waitUntil: "domcontentloaded" });
await lp02ZeroVolume.page.evaluate(() => localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: true, volume: 0 })));
await lp02ZeroVolume.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02ZeroVolume.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02ZeroVolume.page.locator('#keyboard .white-key[data-midi="60"]').click();
current = await waitPhase(lp02ZeroVolume.page, "sound-paused");
record("Volume-zero LP02 central C cannot become a near miss or first response", current.attempt.pendingLp02Input?.midi === 60 && current.attempt.firstChildMidi === null && current.attempt.firstWrongOctave === null && current.attempt.wrongCount === 0 && current.attempt.lastWrongInput === null && current.attempt.inputEvents.filter((event) => ["onset", "wrong-home"].includes(event.event)).length === 0 && current.attempt.outcomeRecorded === false, current.attempt);
await lp02ZeroVolume.context.close();

const lp02AudioFailure = await makePage({ width: 1024, height: 768 }, { failAudioContext: true });
await lp02AudioFailure.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02AudioFailure.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02AudioFailure.page.locator('#keyboard .black-key[data-midi="49"]').click();
current = await waitPhase(lp02AudioFailure.page, "sound-paused");
record("AudioContext failure keeps an LP02 black key pending without wrong or repair evidence", current.attempt.pendingLp02Input?.midi === 49 && current.attempt.firstChildMidi === null && current.attempt.wrongCount === 0 && current.attempt.lastWrongInput === null && current.attempt.strongCueUsed === false && current.attempt.inputEvents.filter((event) => ["onset", "wrong-home"].includes(event.event)).length === 0 && current.attempt.outcomeRecorded === false, current.attempt);
await lp02AudioFailure.context.close();

const bubblePointer = await makePage();
await bubblePointer.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await bubblePointer.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await bubblePointer.page.locator("#chapter4StartCheck").click();
await waitPhase(bubblePointer.page, "lp01-model");
await bubblePointer.page.locator("#chapter4StartCheck").click();
current = await waitPhase(bubblePointer.page, "awaiting-response");
const pointerTarget = current.attempt.sequence[0];
const pointerBubble = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === pointerTarget)?.[0];
await bubblePointer.page.evaluate((bubbleId) => {
  const bubble = document.querySelector(`[data-bubble-id="${bubbleId}"]`);
  bubble.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 11, pointerType: "touch" }));
  bubble.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 12, pointerType: "touch" }));
  document.body.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 11, pointerType: "touch" }));
  bubble.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
  document.body.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 12, pointerType: "touch" }));
  bubble.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
}, pointerBubble);
await waitPhase(bubblePointer.page, ["response-playing", "correct-feedback", "target-playing"]);
current = await view(bubblePointer.page);
record("Overlapping pointers on one LP01 bubble submit and sound only once", current.attempt.callInputEvents.filter((event) => event.event === "bubble-submit").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "lp01-child-selection").length === 1 && current.attempt.observations.filter((event) => event.event === "overlap-bubble").length === 1, current.attempt);
await bubblePointer.context.close();

const lp01KeyboardActivation = await makePage();
await lp01KeyboardActivation.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await lp01KeyboardActivation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp01KeyboardActivation.page.locator("#chapter4StartCheck").click();
await waitPhase(lp01KeyboardActivation.page, "lp01-model");
await lp01KeyboardActivation.page.locator("#chapter4StartCheck").click();
current = await waitPhase(lp01KeyboardActivation.page, "awaiting-response");
const lp01KeyboardTarget = current.attempt.sequence[0];
const lp01KeyboardBubble = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === lp01KeyboardTarget)?.[0];
await lp01KeyboardActivation.page.locator(`[data-bubble-id="${lp01KeyboardBubble}"]`).focus();
await lp01KeyboardActivation.page.locator(`[data-bubble-id="${lp01KeyboardBubble}"]`).press("Enter");
current = await waitPhase(lp01KeyboardActivation.page, "target-playing", 10000);
record("LP01 native Enter activation creates one submit, one selection sound and one call advance", current.attempt.callIndex === 1 && current.attempt.scoredCalls.length === 1 && current.attempt.scoredCalls[0].inputEvents.filter((event) => event.event === "bubble-submit").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "lp01-child-selection").length === 1, current.attempt);
await lp01KeyboardActivation.context.close();

const lp01AssistiveActivation = await makePage();
await lp01AssistiveActivation.page.goto(directUrl("LP01"), { waitUntil: "domcontentloaded" });
await lp01AssistiveActivation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp01AssistiveActivation.page.locator("#chapter4StartCheck").click();
await waitPhase(lp01AssistiveActivation.page, "lp01-model");
await lp01AssistiveActivation.page.locator("#chapter4StartCheck").click();
current = await waitPhase(lp01AssistiveActivation.page, "awaiting-response");
const lp01AssistiveTarget = current.attempt.sequence[0];
const lp01AssistiveBubble = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === lp01AssistiveTarget)?.[0];
await lp01AssistiveActivation.page.locator(`[data-bubble-id="${lp01AssistiveBubble}"]`).evaluate((bubble) => bubble.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 })));
current = await waitPhase(lp01AssistiveActivation.page, "target-playing", 10000);
record("LP01 detail-zero assistive click creates one submit, one selection sound and one call advance", current.attempt.callIndex === 1 && current.attempt.scoredCalls.length === 1 && current.attempt.scoredCalls[0].inputEvents.filter((event) => event.event === "bubble-submit").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "lp01-child-selection").length === 1, current.attempt);
await lp01AssistiveActivation.context.close();

const keyPointer = await makePage();
await keyPointer.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await keyPointer.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await keyPointer.page.evaluate(() => {
  const oldKey = document.querySelector('#keyboard [data-midi="48"]');
  oldKey.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 21, pointerType: "touch" }));
  const newKey = document.querySelector('#keyboard [data-midi="48"]');
  newKey.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 22, pointerType: "touch" }));
  document.body.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 21, pointerType: "touch" }));
  oldKey.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
  document.body.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 22, pointerType: "touch" }));
  newKey.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
});
current = await waitPhase(keyPointer.page, "lp02-complete");
record("LP02 same-key overlap across DOM redraw creates one piano sound and one onset", current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "pointer").length === 1 && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.observations.some((event) => event.event === "not-rearmed"), current.attempt);
await keyPointer.context.close();

const lp02KeyboardActivation = await makePage();
await lp02KeyboardActivation.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02KeyboardActivation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02KeyboardActivation.page.locator('#keyboard .white-key[data-midi="48"]').focus();
await lp02KeyboardActivation.page.locator('#keyboard .white-key[data-midi="48"]').press("Space");
current = await waitPhase(lp02KeyboardActivation.page, "lp02-complete");
record("LP02 native Space activation creates one onset, one key sound and one completion", current.attempt.outcomeRecorded === true && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "accessible-click").length === 1, current.attempt);
await lp02KeyboardActivation.context.close();

const lp02AssistiveActivation = await makePage();
await lp02AssistiveActivation.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
await lp02AssistiveActivation.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
await lp02AssistiveActivation.page.locator("#chapter4Speech").click({ position: { x: 8, y: 8 } });
await lp02AssistiveActivation.page.locator('#keyboard .white-key[data-midi="48"]').evaluate((key) => key.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 })));
current = await waitPhase(lp02AssistiveActivation.page, "lp02-complete");
record("LP02 detail-zero assistive click creates one onset, one key sound and one completion", current.attempt.outcomeRecorded === true && current.attempt.inputEvents.filter((event) => event.event === "onset").length === 1 && current.attempt.audioTrace.filter((event) => event.kind === "child-key" && event.reason === "accessible-click").length === 1, current.attempt);
await lp02AssistiveActivation.context.close();

for (const midi of [49, 51, 54, 61]) {
  const black = await makePage();
  await black.page.goto(directUrl("LP02"), { waitUntil: "domcontentloaded" });
  await black.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await black.page.locator(`#keyboard .black-key[data-midi="${midi}"]`).click();
  current = await waitPhase(black.page, "lp02-input-playing");
  record(`Black-key MIDI ${midi} uses the same neutral pending identity before judgment`, current.attempt.pendingLp02Input?.midi === midi && current.keys.filter((key) => key.className.includes("lp02-current-playing")).map((key) => key.midi).join(",") === String(midi) && current.keys.filter((key) => key.className.includes("hit-wrong")).length === 0 && current.attempt.wrongCount === 0, current);
  current = await waitPhase(black.page, "lp02-wrong");
  const wrongEvent = current.attempt.inputEvents.find((event) => event.event === "wrong-home");
  const key = current.keys.find((item) => item.midi === midi);
  record(`Black-key MIDI ${midi} remains a black-key identity`, wrongEvent?.isBlack === true && wrongEvent?.childIdentity === "黑键" && wrongEvent?.noteNameCorrect === false && key?.note === null && key?.aria.includes("黑键") && !/[CDF]#?，/.test(key?.aria || ""), { wrongEvent, key });
  await black.context.close();
}

const partial = await makePage({ width: 1024, height: 768 }, { sessionUuid: "chapter4-partial-seed" });
await seed(partial.page);
await startFormal(partial.page);
await startCheck(partial.page);
current = await waitPhase(partial.page, "awaiting-response");
const target = current.attempt.sequence[0];
const correctBubble = Object.entries(current.attempt.bubbleMapping).find(([, midi]) => midi === target)?.[0];
const wrongBubble = correctBubble === "bubble-1" ? "bubble-2" : "bubble-1";
await partial.page.locator(`[data-bubble-id="${wrongBubble}"]`).click();
await waitPhase(partial.page, "wrong");
await waitPhase(partial.page, "awaiting-response");
await partial.page.locator(`[data-bubble-id="${wrongBubble}"]`).click();
await waitPhase(partial.page, "pair-compare");
await waitPhase(partial.page, "awaiting-response");
await partial.page.locator(`[data-bubble-id="${correctBubble}"]`).click();
current = await waitPhase(partial.page, ["lp01-supported-story-rest", "lp01-early-rest"]);
current = await waitPhase(partial.page, "chapter4-entry", 10000);
record("Repeated repair ends LP01 with only genuinely presented and resolved calls", current.runtime.chapter4.lessonEvidence.LP01?.presentedCallCount === 1 && current.runtime.chapter4.lessonEvidence.LP01?.resolvedCallCount === 1 && current.runtime.chapter4.lessonEvidence.LP01?.unpresentedCallCount === 3 && current.runtime.chapter4.lessonEvidence.LP01?.scoredCalls.length === 1, current.runtime.chapter4.lessonEvidence.LP01);
record("Supported early rest is partial, played=false, stable=false and queued for review", current.runtime.chapter4.lessonEvidence.LP01?.storyResolvedBySupport === true && current.runtime.chapter4.lessonEvidence.LP01?.played === false && current.runtime.chapter4.lessonEvidence.LP01?.stable === false && current.runtime.chapter4.resume?.nextTargetId === "LP02" && current.runtime.chapter4.openingReviewQueue.includes("LP01"), current.runtime.chapter4);
const earlyRestParentCopy = [current.parentFocus, current.parentDetail, current.parentProgress, current.parentMasteryStatus, current.parentMasteryDetail, current.parentStaffState].join(" ");
record("Early-rest map parent summary keeps high-low C review visible while low C is still waiting", current.parentFocus === "高低 C 声音比较" && current.parentDetail.includes("洞口由星芽帮助打开，高低比较保留待复习") && current.parentDetail.includes("低音 C 还要找家；高低 C 比较也会在以后再复习") && current.parentProgress.includes("四次声音比较 1/4 · 高低 C 待复习") && current.parentStaffState === "高低 C 比较待复习", { parentFocus: current.parentFocus, parentDetail: current.parentDetail, parentProgress: current.parentProgress, parentStaffState: current.parentStaffState });
record("Early-rest parent-visible copy contains no internal level or evidence terms", !/LP01|LP02|played|stable/i.test(earlyRestParentCopy), earlyRestParentCopy);
const oldSessionId = current.runtime.chapter4.lessonEvidence.LP01?.sessionId;
await partial.page.locator("#gardenRestMarker").click();
current = await waitPhase(partial.page, ["lp02-reconnect-playing", "lp02-guide"]);
if (current.phase === "lp02-reconnect-playing") current = await waitPhase(partial.page, "lp02-guide");
record("LP01 early rest resumes LP02 in a new session after one unscored reconnect", current.runtime.active?.resumeOfSessionId === oldSessionId && current.runtime.active?.sessionId !== oldSessionId && current.attempt.reconnectCompleted === true && current.runtime.active?.completedActions.length === 0, current.runtime.active);
const reconnectSessionId = current.runtime.active?.sessionId;
await partial.page.evaluate(() => {
  const attempt = window.ensureChapter4Attempt();
  attempt.phase = "lp02-reconnect-ready";
  attempt.reconnectCompleted = false;
  attempt.audioTransaction = null;
  window.persistChapter4Attempt();
});
await partial.page.reload({ waitUntil: "domcontentloaded" });
await partial.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
current = await waitPhase(partial.page, "lp02-reconnect-ready");
record("Formal LP02 reconnect-ready reload exposes one explicit unscored listen command", current.runtime.active?.sessionId === reconnectSessionId && current.startHidden === false && current.startText === "听两个 C" && current.attempt.reconnectCompleted === false && !current.runtime.chapter4.lessonEvidence.LP02 && current.runtime.active?.completedActions.length === 0, current);
await partial.page.locator("#chapter4StartCheck").click();
await waitPhase(partial.page, "lp02-reconnect-playing");
current = await waitPhase(partial.page, "lp02-guide");
record("Explicit LP02 reconnect command returns to guide without writing LP01 or LP02 evidence", current.runtime.active?.sessionId === reconnectSessionId && current.attempt.reconnectCompleted === true && current.attempt.outcomeRecorded === false && !current.runtime.chapter4.lessonEvidence.LP02 && current.runtime.active?.completedActions.length === 0, current);
await partial.page.locator('#keyboard .white-key[data-midi="48"]').click();
await waitPhase(partial.page, "lp02-complete");
current = await waitPhase(partial.page, ["chapter4-entry", "locked", "chapter4-lp03-entry"], 10000);
const completedParentCopy = [current.parentFocus, current.parentDetail, current.parentProgress, current.parentMasteryStatus, current.parentMasteryDetail, current.parentStaffState].join(" ");
record("Low-C completion map still prioritizes unresolved high-low C review", current.runtime.chapter4.lessonEvidence.LP02?.played === true && current.runtime.chapter4.openingReviewQueue.includes("LP01") && current.parentFocus === "高低 C 声音比较" && current.parentDetail.includes("低音 C 已在可见引导中找到家") && current.parentDetail.includes("这不会把高低 C 比较自动算作会了") && current.parentProgress.includes("高低 C 待复习") && current.parentStaffState === "高低 C 比较待复习", { parentFocus: current.parentFocus, parentDetail: current.parentDetail, parentProgress: current.parentProgress, parentStaffState: current.parentStaffState, chapter4: current.runtime.chapter4 });
record("Completed parent-visible copy contains no internal level or evidence terms", !/LP01|LP02|played|stable/i.test(completedParentCopy), completedParentCopy);
await partial.context.close();

const failed = checks.filter((check) => !check.pass);
console.log(`chapter4 LP01-LP02 checks: ${checks.length - failed.length}/${checks.length}`);
console.log(`chapter4 synthetic estimator performance (desktop, non-gating): ${JSON.stringify(syntheticMic.estimatorPerformance)}`);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
if (errors.length) console.log(`browser diagnostics: ${JSON.stringify(errors)}`);
await browser.close();
if (failed.length || errors.length) {
  console.error(JSON.stringify({ failed, errors }, null, 2));
  process.exit(1);
}
