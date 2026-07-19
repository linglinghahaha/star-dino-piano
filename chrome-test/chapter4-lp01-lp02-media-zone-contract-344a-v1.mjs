import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_CHAPTER4_LP01_LP02_MEDIA_ZONE_CONTRACT_344A_V1.json";
const screenshotDir = process.argv[4] || "screenshots/chapter4_lp01_lp02_media_zones_344a_v1";
const coordinateContractId = process.env.CHAPTER4_COORDINATE_CONTRACT_ID || "chapter4-lp01-lp02-media-zones-overhaul-344a-v1";
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(screenshotDir, { recursive: true });

const expectedStates = [
  "chapter4-entry", "lp01-model", "target-playing", "awaiting-response", "wrong",
  "wrong-repair-playing", "pair-compare", "assisted", "visual-assist", "sound-paused",
  "lp01-complete", "lp01-early-rest", "lp01-supported-story-rest", "lp02-guide",
  "lp02-middle-c-near-miss", "lp02-assisted", "lp02-input-playing", "lp02-complete", "reduced-motion"
];
const expectedActualPhases = Object.fromEntries(expectedStates.map((stateName) => [
  stateName,
  [stateName === "reduced-motion" ? "lp01-model" : stateName]
]));
const hiddenLp01States = new Set(["target-playing", "awaiting-response", "wrong", "wrong-repair-playing", "pair-compare"]);
const lp02ExpectedBlackMidis = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];
const lp02BlackWhiteBoundaries = new Map([
  [49, [48, 50]], [51, [50, 52]], [54, [53, 55]], [56, [55, 57]], [58, [57, 59]],
  [61, [60, 62]], [63, [62, 64]], [66, [65, 67]], [68, [67, 69]], [70, [69, 71]]
]);
const viewports = [
  ["ipad-1024x768-dpr1", 1024, 768, 1],
  ["ipad-1024x768-dpr2", 1024, 768, 2],
  ["ipad-1180x820-dpr2", 1180, 820, 2],
  ["ipad-pro-11-1194x834-dpr2", 1194, 834, 2],
  ["media-1280x720-dpr1", 1280, 720, 1],
  ["large-ipad-1366x1024-dpr2", 1366, 1024, 2]
].map(([viewportId, width, height, dpr]) => ({ viewportId, width, height, dpr }));
const selectedViewports = process.env.CHAPTER4_VIEWPORT
  ? viewports.filter((viewport) => viewport.viewportId === process.env.CHAPTER4_VIEWPORT)
  : viewports;
if (selectedViewports.length === 0) throw new Error(`Unknown Chapter 4 contract viewport: ${process.env.CHAPTER4_VIEWPORT}`);
const sourcePaths = [
  "chrome-test/chapter4-lp01-lp02-media-zone-contract-344a-v1.mjs",
  "index.html", "app.js", "styles.css", "keyboard-overrides.css", "map-overrides.css",
  "current-overhaul.css", "chapter3-visible.css", "chapter4-slice.css"
];
const failures = [];
const browserErrors = [];

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sourceFile(pathname) {
  const bytes = fs.readFileSync(pathname);
  return { path: pathname.replaceAll("\\", "/"), bytes: bytes.length, sha256: sha256(bytes) };
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

function formalLs08Fixture() {
  const completedAt = "2026-07-14T08:00:00.000Z";
  const sessionId = "C3-07-contract-ended";
  const lessonEvidence = Object.fromEntries(["LS01", "LS02", "LS03", "LS04", "LS05", "LS06", "LS07"].map((id) => [id, { completedAt, stable: true }]));
  lessonEvidence.LS08 = {
    actionId: "LS08-listening",
    kind: "garden-listening",
    targetId: "LS08",
    completed: true,
    completedAt,
    sessionId,
    bundleId: "C3-07",
    storyEvents: [{
      eventType: "storyEvent",
      phaseRole: "unscored",
      midis: [60, 48],
      scored: false,
      startedAt: completedAt,
      endedAt: "2026-07-14T08:00:02.000Z"
    }]
  };
  return {
    version: 1,
    active: null,
    history: [
      { sessionId: "C2-03-entry", bundleId: "C2-03", status: "ended", completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01" }] },
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
  const value = new URL(rootUrl);
  value.search = "?screen=map&check=chapter4-lp01-lp02-media-zones-344a-v1";
  return value.toString();
}

function directUrl(lesson) {
  const value = new URL(rootUrl);
  value.search = `?mode=chapter4&directMode=true&formalSession=false&lesson=${lesson}&check=chapter4-media-zones-344a-v1`;
  return value.toString();
}

async function createPage(browser, viewport, { directLesson = null, soundOff = false, reducedMotion = false, serial = "main" } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.dpr,
    hasTouch: true,
    reducedMotion: reducedMotion ? "reduce" : "no-preference"
  });
  await context.addInitScript(({ fixedId }) => {
    Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: () => fixedId });
  }, { fixedId: `chapter4-contract-${viewport.viewportId}-${serial}` });
  const page = await context.newPage();
  page.on("pageerror", (error) => browserErrors.push(`${viewport.viewportId}/${serial}: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      browserErrors.push(`${viewport.viewportId}/${serial}: console: ${message.text()} @ ${location.url || "unknown"}`);
    }
  });
  await page.goto(mapUrl(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(({ runtimeValue, learningValue, soundOff }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtimeValue));
    localStorage.setItem("starDinoLearningStats", JSON.stringify(learningValue));
    localStorage.setItem("starDinoAudioSettings", JSON.stringify({ enabled: !soundOff, volume: 0.6 }));
  }, { runtimeValue: formalLs08Fixture(), learningValue: learningFixture(), soundOff });
  await page.goto(directLesson ? directUrl(directLesson) : mapUrl(), { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 30000 });
  await page.addStyleTag({ content: "#mapShell *,#chapter4Panel *,#keyboardPanel *{animation:none!important;transition:none!important;}" });
  return { context, page };
}

async function currentAttempt(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const action = runtime.active?.actions?.[runtime.active.actionIndex || 0] || null;
    const direct = document.body.classList.contains("screen-chapter4") && typeof ensureChapter4Attempt === "function"
      ? ensureChapter4Attempt()
      : null;
    return JSON.parse(JSON.stringify(action?.chapter4Attempt || direct || null));
  });
}

async function waitPhase(page, names, timeout = 18000) {
  const expected = Array.isArray(names) ? names : [names];
  await page.waitForFunction((phases) => {
    const phase = document.body.classList.contains("screen-map")
      ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map")
      : (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "");
    return phases.includes(phase);
  }, expected, { timeout });
  return currentAttempt(page);
}

async function startFormal(page) {
  await page.locator("#gardenRestMarker").click();
  await waitPhase(page, ["lp01-model-playing", "lp01-model"]);
  await waitPhase(page, "lp01-model");
}

async function startDirectLp01(page) {
  await page.locator("#chapter4StartCheck").click();
  await waitPhase(page, ["lp01-model-playing", "lp01-model"]);
  await waitPhase(page, "lp01-model");
}

async function startCheck(page) {
  await page.locator("#chapter4StartCheck").click();
  await waitPhase(page, "target-playing");
}

function bubbleIdForMidi(attempt, midi) {
  return Object.entries(attempt.bubbleMapping).find(([, mappedMidi]) => mappedMidi === midi)?.[0] || null;
}

async function clickBubbleForMidi(page, midi) {
  const attempt = await currentAttempt(page);
  const bubbleId = bubbleIdForMidi(attempt, midi);
  if (!bubbleId) throw new Error(`No bubble maps to MIDI ${midi}`);
  await page.locator(`[data-bubble-id="${bubbleId}"]`).click();
}

async function clickCorrectBubble(page) {
  const attempt = await waitPhase(page, "awaiting-response");
  await clickBubbleForMidi(page, attempt.sequence[attempt.callIndex]);
}

async function clickWrongBubble(page) {
  const attempt = await waitPhase(page, "awaiting-response");
  const target = attempt.sequence[attempt.callIndex];
  await clickBubbleForMidi(page, target === 48 ? 60 : 48);
}

async function completeCleanCalls(page, count) {
  for (let index = 0; index < count; index += 1) {
    const before = await waitPhase(page, "awaiting-response");
    const callIndex = before.callIndex;
    await clickBubbleForMidi(page, before.sequence[callIndex]);
    await page.waitForFunction((previous) => {
      const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
      const persisted = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.chapter4Attempt;
      const attempt = persisted || (typeof ensureChapter4Attempt === "function" ? ensureChapter4Attempt() : null);
      return attempt?.callIndex > previous || ["lp01-complete", "lp01-early-rest", "lp01-supported-story-rest"].includes(attempt?.phase);
    }, callIndex, { timeout: 18000 });
  }
}

function rectsOverlap(first, second) {
  if (!first || !second) return false;
  return first.x < second.x + second.width && first.x + first.width > second.x && first.y < second.y + second.height && first.y + first.height > second.y;
}

async function snapshot(page, viewport, stateName) {
  const geometry = await page.evaluate(({ stateName }) => {
    const visibleRect = (selector) => {
      const element = document.querySelector(selector);
      if (!element || element.hidden) return null;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) <= 0.01 || box.width <= 0 || box.height <= 0) return null;
      return { x: +box.x.toFixed(2), y: +box.y.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2) };
    };
    const visible = (element) => {
      if (!element || element.hidden) return false;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && box.width > 0 && box.height > 0;
    };
    const domPhase = document.body.classList.contains("screen-map")
      ? (document.querySelector("#mapShell")?.dataset.chapter4Phase || "map")
      : (document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "");
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const persisted = runtime.active?.actions?.[runtime.active.actionIndex || 0]?.chapter4Attempt || null;
    const direct = document.body.classList.contains("screen-chapter4") && typeof ensureChapter4Attempt === "function"
      ? ensureChapter4Attempt()
      : null;
    const attempt = persisted || direct;
    const bubbles = [...document.querySelectorAll("#chapter4Bubbles .chapter4-bubble")].map((bubble) => {
      const style = getComputedStyle(bubble);
      const box = bubble.getBoundingClientRect();
      return {
        id: bubble.dataset.bubbleId || "",
        className: bubble.className,
        aria: bubble.getAttribute("aria-label") || "",
        data: { ...bubble.dataset },
        rect: { x: +box.x.toFixed(2), y: +box.y.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2), centerX: +(box.x + (box.width / 2)).toFixed(2), centerY: +(box.y + (box.height / 2)).toFixed(2) },
        style: {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          borderWidth: style.borderWidth,
          boxShadow: style.boxShadow,
          opacity: style.opacity,
          filter: style.filter
        },
        pseudo: ["::before", "::after"].map((pseudo) => {
          const pseudoStyle = getComputedStyle(bubble, pseudo);
          return { pseudo, content: pseudoStyle.content, backgroundColor: pseudoStyle.backgroundColor, boxShadow: pseudoStyle.boxShadow };
        })
      };
    });
    const bubbleParity = bubbles.length === 2 && JSON.stringify({
      width: bubbles[0].rect.width,
      height: bubbles[0].rect.height,
      style: bubbles[0].style,
      pseudo: bubbles[0].pseudo
    }) === JSON.stringify({
      width: bubbles[1].rect.width,
      height: bubbles[1].rect.height,
      style: bubbles[1].style,
      pseudo: bubbles[1].pseudo
    });
    const carrierNodes = [...document.querySelectorAll("#chapter4Panel .assisted-target, #chapter4Panel .visual-target, #chapter4Panel [data-target-midi], #chapter4Panel [data-target-note='true']")];
    const carrierAttributes = [...document.querySelectorAll("#chapter4Panel [aria-label], #chapter4Panel [title], #chapter4Panel [alt]")]
      .filter((node) => visible(node))
      .map((node) => [node.getAttribute("aria-label"), node.getAttribute("title"), node.getAttribute("alt")].filter(Boolean).join(" "))
      .filter((value) => /(?:C3|C4|低音|中央|高音|答案|目标)/.test(value));
    const visibleText = [...document.querySelectorAll("#chapter4Panel *")]
      .filter((node) => visible(node) && node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.replace(/\s+/g, " ").trim() || "")
      .filter(Boolean);
    const targetText = visibleText.filter((value) => /(?:C3|C4|低音|中央|高音|答案|目标)/.test(value));
    const hiddenTargetCarrier = carrierNodes.length + carrierAttributes.length + targetText.length + (bubbleParity ? 0 : 1);
    const whiteKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .white-key")].map((key) => {
      const box = key.getBoundingClientRect();
      return { midi: Number(key.dataset.midi), rect: { left: +box.left.toFixed(2), right: +box.right.toFixed(2), top: +box.top.toFixed(2), bottom: +box.bottom.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2), centerX: +(box.left + (box.width / 2)).toFixed(2), centerY: +(box.top + (box.height / 2)).toFixed(2) }, width: +box.width.toFixed(2), left: +box.left.toFixed(2), className: key.className, aria: key.getAttribute("aria-label") || "" };
    });
    const blackKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .black-key")].map((key) => {
      const box = key.getBoundingClientRect();
      return { midi: Number(key.dataset.midi), rect: { left: +box.left.toFixed(2), right: +box.right.toFixed(2), top: +box.top.toFixed(2), bottom: +box.bottom.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2), centerX: +(box.left + (box.width / 2)).toFixed(2), centerY: +(box.top + (box.height / 2)).toFixed(2) }, className: key.className, aria: key.getAttribute("aria-label") || "" };
    });
    const targetKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .lp02-assist-target")].map((key) => Number(key.dataset.midi));
    const currentPlayingKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .lp02-current-playing")].map((key) => Number(key.dataset.midi));
    const wrongKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .hit-wrong")].map((key) => Number(key.dataset.midi));
    const foundation = document.querySelector("#chapter4Foundation");
    const foundationBlocks = [...(foundation?.querySelectorAll("span") || [])].filter(visible).map((block) => {
      const style = getComputedStyle(block);
      const box = block.getBoundingClientRect();
      return {
        rect: { x: +box.x.toFixed(2), y: +box.y.toFixed(2), width: +box.width.toFixed(2), height: +box.height.toFixed(2) },
        borderStyle: style.borderStyle,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        boxShadow: style.boxShadow
      };
    });
    const touchTargets = [...document.querySelectorAll("#chapter4Panel button, #keyboardPanel button")].filter(visible).map((button) => {
      const box = button.getBoundingClientRect();
      return { id: button.id || button.dataset.bubbleId || (button.dataset.midi ? `key-${button.dataset.midi}` : "button"), width: +box.width.toFixed(2), height: +box.height.toFixed(2), left: +box.left.toFixed(2), top: +box.top.toFixed(2) };
    });
    return {
      phase: domPhase,
      levelId: attempt?.levelId || null,
      repairStage: document.querySelector("#chapter4Scene")?.dataset.repairStage || "",
      audioPlaying: document.querySelector("#chapter4Scene")?.dataset.audioPlaying || "false",
      viewport: {
        width: innerWidth, height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight
      },
      zones: {
        map: visibleRect("#mapShell"), panel: visibleRect("#chapter4Panel"), scene: visibleRect("#chapter4Scene"),
        speech: visibleRect("#chapter4Speech"), character: visibleRect(".chapter4-xingya"), source: visibleRect("#chapter4SoundSource"),
        bubbles: visibleRect("#chapter4Bubbles"), bubbleOne: visibleRect("[data-bubble-id='bubble-1']"), bubbleTwo: visibleRect("[data-bubble-id='bubble-2']"),
        rings: visibleRect("#chapter4CaveRings"), replay: visibleRect("#chapter4Replay"), start: visibleRect("#chapter4StartCheck"),
        visualAssist: visibleRect("#chapter4VisualAssist"), progress: visibleRect("#chapter4CallProgress"),
        keyboardPanel: visibleRect("#keyboardPanel"), keyboard: visibleRect("#keyboard"), foundation: visibleRect("#chapter4Foundation")
      },
      bubbles,
      bubbleParity,
      bubbleGeometry: (() => {
        const scene = visibleRect("#chapter4Scene");
        if (!scene || bubbles.length !== 2) return null;
        const first = bubbles[0].rect;
        const second = bubbles[1].rect;
        const sceneCenterX = +(scene.x + (scene.width / 2)).toFixed(2);
        const leftDistance = +Math.abs(first.centerX - sceneCenterX).toFixed(2);
        const rightDistance = +Math.abs(second.centerX - sceneCenterX).toFixed(2);
        return { sceneCenterX, firstCenterX: first.centerX, firstCenterY: first.centerY, secondCenterX: second.centerX, secondCenterY: second.centerY, leftDistance, rightDistance, distanceDelta: +Math.abs(leftDistance - rightDistance).toFixed(2) };
      })(),
      characterSrc: document.querySelector("#chapter4XingyaImage")?.getAttribute("src") || "",
      characterAssetState: document.querySelector("#chapter4Scene")?.dataset.characterAssetState || "",
      sealedSuitReferences: [...document.querySelectorAll("#chapter4Panel img")].filter((image) => /xingya-suit-/.test(image.getAttribute("src") || "")).length +
        [...document.querySelectorAll("#chapter4Panel *")].filter((node) => /xingya-suit-/.test(getComputedStyle(node).backgroundImage || "")).length,
      hiddenTargetCarrier,
      carrierAttributes,
      targetText,
      whiteKeys,
      blackKeys,
      targetKeys,
      currentPlayingKeys,
      wrongKeys,
      keyboardTargetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "false",
      foundationInstalled: foundation?.dataset.installed || "",
      foundationState: foundation?.dataset.foundationState || "",
      foundationBlocks,
      touchTargets,
      callIndex: attempt?.callIndex ?? null,
      presentedCallCount: attempt?.presentedCallCount ?? null,
      resolvedCallCount: attempt?.resolvedCallCount ?? null,
      wrongCount: attempt?.wrongCount ?? attempt?.callWrongCount ?? null,
      outcomeRecorded: Boolean(attempt?.outcomeRecorded),
      pendingLp02Input: attempt?.pendingLp02Input ? {
        midi: attempt.pendingLp02Input.midi,
        source: attempt.pendingLp02Input.source,
        onsetRecorded: Boolean(attempt.pendingLp02Input.onsetRecorded)
      } : null,
      audioTransaction: attempt?.audioTransaction ? {
        context: attempt.audioTransaction.context,
        kind: attempt.audioTransaction.kind,
        midis: attempt.audioTransaction.midis,
        durationMs: attempt.audioTransaction.durationMs,
        started: Boolean(attempt.audioTransaction.startedAt),
        ended: Boolean(attempt.audioTransaction.endedAt),
        interrupted: Boolean(attempt.audioTransaction.interruptedAt)
      } : null,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches
    };
  }, { stateName });

  const expected = stateName === "reduced-motion" ? "lp01-model" : stateName;
  if (geometry.phase !== expected) failures.push({ viewportId: viewport.viewportId, stateName, kind: "phase-mismatch", expected, actual: geometry.phase });
  if (geometry.viewport.scrollWidth > geometry.viewport.width + 1 || geometry.viewport.scrollHeight > geometry.viewport.height + 1) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "overflow", viewport: geometry.viewport });
  }
  if (hiddenLp01States.has(stateName) && geometry.hiddenTargetCarrier !== 0) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "hidden-target-carrier", count: geometry.hiddenTargetCarrier, targetText: geometry.targetText, carrierAttributes: geometry.carrierAttributes });
  }
  if (hiddenLp01States.has(stateName) && !geometry.bubbleParity) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "bubble-parity" });
  }
  if (stateName === "chapter4-entry" && !geometry.zones.map) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-map-zone" });
  if (stateName !== "chapter4-entry" && (!geometry.zones.panel || !geometry.zones.scene || !geometry.zones.speech)) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-chapter4-zone", zones: geometry.zones });
  }
  if (stateName !== "chapter4-entry" && (!geometry.characterSrc.endsWith("xingya-garden-invite-v1.webp") || geometry.characterAssetState !== "garden-mode" || geometry.sealedSuitReferences !== 0)) {
    failures.push({
      viewportId: viewport.viewportId,
      stateName,
      kind: "chapter4-character-equipment",
      characterSrc: geometry.characterSrc,
      characterAssetState: geometry.characterAssetState,
      sealedSuitReferences: geometry.sealedSuitReferences
    });
  }
  if (geometry.levelId === "LP01" && (!geometry.zones.bubbles || geometry.bubbles.length !== 2)) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-lp01-bubbles" });
  }
  if (geometry.levelId === "LP01" && geometry.bubbles.length === 2) {
    const bubbleGeometry = geometry.bubbleGeometry;
    if (!bubbleGeometry || geometry.bubbles[0].rect.centerX >= bubbleGeometry.sceneCenterX || geometry.bubbles[1].rect.centerX <= bubbleGeometry.sceneCenterX ||
      Math.abs(geometry.bubbles[0].rect.centerY - geometry.bubbles[1].rect.centerY) > 1 || bubbleGeometry.distanceDelta > 12) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp01-bubble-position-weight", bubbleGeometry, bubbles: geometry.bubbles });
    }
    const protectedZones = ["speech", "character", "source", "replay", "start", "visualAssist", "progress"];
    for (const bubble of geometry.bubbles) {
      for (const zoneName of protectedZones) {
        if (rectsOverlap(bubble.rect, geometry.zones[zoneName])) {
          failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp01-bubble-protected-zone-overlap", bubbleId: bubble.id, zoneName, bubble: bubble.rect, zone: geometry.zones[zoneName] });
        }
      }
    }
  }
  if (["lp01-model", "reduced-motion"].includes(stateName)) {
    const modelControls = geometry.touchTargets.map((target) => target.id).sort().join(",");
    if (geometry.zones.source || geometry.zones.replay || !geometry.zones.start || modelControls !== "bubble-1,bubble-2,chapter4StartCheck") {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp01-model-control-split", zones: geometry.zones, touchTargets: geometry.touchTargets });
    }
  }
  if (stateName === "target-playing" && (!geometry.zones.source || geometry.zones.replay || geometry.zones.start)) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp01-target-source-controls", zones: geometry.zones });
  }
  if (stateName === "awaiting-response" && (!geometry.zones.source || !geometry.zones.replay || geometry.zones.start)) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp01-waiting-source-controls", zones: geometry.zones });
  }
  if (geometry.levelId === "LP02") {
    const widthSpread = geometry.whiteKeys.length ? Math.max(...geometry.whiteKeys.map((key) => key.width)) - Math.min(...geometry.whiteKeys.map((key) => key.width)) : Infinity;
    if (!geometry.zones.keyboard || geometry.whiteKeys.length !== 14 || geometry.blackKeys.length !== 10 || widthSpread > 1.1) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-keyboard-geometry", whiteKeyCount: geometry.whiteKeys.length, blackKeyCount: geometry.blackKeys.length, widthSpread });
    }
    const keyboardTouchTargets = geometry.touchTargets.filter((target) => target.id.startsWith("key-"));
    const whiteByMidi = new Map(geometry.whiteKeys.map((key) => [key.midi, key]));
    const blackBoundaries = geometry.blackKeys.map((black) => {
      const boundary = lp02BlackWhiteBoundaries.get(black.midi);
      const leftWhite = boundary ? whiteByMidi.get(boundary[0]) : null;
      const rightWhite = boundary ? whiteByMidi.get(boundary[1]) : null;
      const expectedCenterX = leftWhite && rightWhite ? (leftWhite.rect.right + rightWhite.rect.left) / 2 : null;
      return { midi: black.midi, rect: black.rect, expectedCenterX, centerDelta: expectedCenterX === null ? null : Math.abs(black.rect.centerX - expectedCenterX) };
    });
    const actualBlackMidis = geometry.blackKeys.map((key) => key.midi);
    const keyboardTouchOk = keyboardTouchTargets.length === 24 && keyboardTouchTargets.every((target) => target.width >= 44 && target.height >= 44) &&
      geometry.whiteKeys.every((key) => key.rect.width >= 44 && key.rect.height >= 44) &&
      geometry.blackKeys.every((key) => key.rect.width >= 44 && key.rect.height >= 44) &&
      actualBlackMidis.join(",") === lp02ExpectedBlackMidis.join(",") &&
      blackBoundaries.every((item) => item.expectedCenterX !== null && item.centerDelta <= 1.5);
    if (!keyboardTouchOk) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-keyboard-touch-boundaries", keyboardTouchTargets, whiteKeys: geometry.whiteKeys, blackKeys: geometry.blackKeys, blackBoundaries });
    }
    const targetShouldBeVisible = stateName === "lp02-assisted";
    if (targetShouldBeVisible && (geometry.keyboardTargetVisible !== "true" || geometry.targetKeys.join(",") !== "48")) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-assist-target", targetVisible: geometry.keyboardTargetVisible, targetKeys: geometry.targetKeys });
    }
    if (!targetShouldBeVisible && (geometry.keyboardTargetVisible !== "false" || geometry.targetKeys.length !== 0)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-unexpected-target", targetVisible: geometry.keyboardTargetVisible, targetKeys: geometry.targetKeys });
    }
    const foundationShouldBeInstalled = stateName === "lp02-complete";
    const foundationBlock = geometry.foundationBlocks[0];
    if (geometry.foundationBlocks.length !== 1 || geometry.foundationInstalled !== (foundationShouldBeInstalled ? "true" : "false") || geometry.foundationState !== (foundationShouldBeInstalled ? "installed" : "landing-place")) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-foundation-state", installed: geometry.foundationInstalled, foundationState: geometry.foundationState, blocks: geometry.foundationBlocks });
    } else if (foundationShouldBeInstalled && foundationBlock.borderStyle !== "solid") {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-foundation-not-solid", block: foundationBlock });
    } else if (!foundationShouldBeInstalled && foundationBlock.borderStyle !== "dashed") {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-foundation-not-empty", block: foundationBlock });
    }
    if (stateName === "lp02-input-playing") {
      const transactionStarted = geometry.audioTransaction?.context === "lp02-child-input" &&
        geometry.audioTransaction?.kind === "child-key" &&
        geometry.audioTransaction?.started === true &&
        geometry.audioTransaction?.ended === false &&
        geometry.audioTransaction?.interrupted === false &&
        geometry.audioPlaying === "true";
      if (!transactionStarted || geometry.outcomeRecorded || geometry.pendingLp02Input?.midi !== 48 || geometry.currentPlayingKeys.join(",") !== "48" || geometry.wrongKeys.length !== 0 || geometry.foundationInstalled !== "false") {
        failures.push({
          viewportId: viewport.viewportId,
          stateName,
          kind: "lp02-input-transaction-not-open",
          audioPlaying: geometry.audioPlaying,
          audioTransaction: geometry.audioTransaction,
          outcomeRecorded: geometry.outcomeRecorded,
          pendingLp02Input: geometry.pendingLp02Input,
          currentPlayingKeys: geometry.currentPlayingKeys,
          wrongKeys: geometry.wrongKeys,
          foundationInstalled: geometry.foundationInstalled
        });
      }
      const protectedZones = ["speech", "character", "keyboard", "foundation"];
      for (let firstIndex = 0; firstIndex < protectedZones.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < protectedZones.length; secondIndex += 1) {
          const firstName = protectedZones[firstIndex];
          const secondName = protectedZones[secondIndex];
          if (rectsOverlap(geometry.zones[firstName], geometry.zones[secondName])) {
            failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-input-zone-overlap", pair: [firstName, secondName], zones: geometry.zones });
          }
        }
      }
    }
    if (stateName === "lp02-middle-c-near-miss" && (geometry.audioTransaction?.ended !== true || geometry.pendingLp02Input !== null || geometry.outcomeRecorded)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-wrong-before-audio-ended", audioTransaction: geometry.audioTransaction, pendingLp02Input: geometry.pendingLp02Input, outcomeRecorded: geometry.outcomeRecorded });
    }
    if (stateName === "lp02-complete" && (geometry.audioTransaction?.ended !== true || geometry.pendingLp02Input !== null || !geometry.outcomeRecorded)) {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "lp02-complete-before-audio-ended", audioTransaction: geometry.audioTransaction, pendingLp02Input: geometry.pendingLp02Input, outcomeRecorded: geometry.outcomeRecorded });
    }
  }
  const undersized = geometry.touchTargets.filter((target) => target.width < 44 || target.height < 44);
  if (undersized.length) failures.push({ viewportId: viewport.viewportId, stateName, kind: "undersized-touch-target", targets: undersized });
  if (rectsOverlap(geometry.zones.speech, geometry.zones.replay) || rectsOverlap(geometry.zones.speech, geometry.zones.visualAssist)) {
    failures.push({ viewportId: viewport.viewportId, stateName, kind: "control-speech-overlap", zones: geometry.zones });
  }
  const screenshotName = `${viewport.viewportId}_${stateName}.png`;
  await page.screenshot({ path: path.join(screenshotDir, screenshotName), fullPage: false, animations: "disabled" });
  if (stateName === "lp02-input-playing") {
    const phaseAfterScreenshot = await page.evaluate(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "");
    if (phaseAfterScreenshot !== "lp02-input-playing") {
      failures.push({ viewportId: viewport.viewportId, stateName, kind: "screenshot-phase-drift", before: geometry.phase, after: phaseAfterScreenshot });
    }
  }
  return { stateName, expectedActualPhases: expectedActualPhases[stateName], geometry, screenshot: screenshotName };
}

async function capturePrimary(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { serial: "primary" });
  const states = [];
  states.push(await snapshot(page, viewport, "chapter4-entry"));
  await startFormal(page);
  states.push(await snapshot(page, viewport, "lp01-model"));
  await startCheck(page);
  states.push(await snapshot(page, viewport, "target-playing"));
  await waitPhase(page, "awaiting-response");
  states.push(await snapshot(page, viewport, "awaiting-response"));
  await clickWrongBubble(page);
  await waitPhase(page, "wrong-repair-playing");
  states.push(await snapshot(page, viewport, "wrong-repair-playing"));
  await waitPhase(page, "wrong");
  states.push(await snapshot(page, viewport, "wrong"));
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "pair-compare");
  states.push(await snapshot(page, viewport, "pair-compare"));
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "assisted");
  states.push(await snapshot(page, viewport, "assisted"));
  await page.locator("#chapter4VisualAssist").click();
  await waitPhase(page, "visual-assist");
  states.push(await snapshot(page, viewport, "visual-assist"));
  await context.close();
  return states;
}

async function captureSound(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { directLesson: "LP01", soundOff: true, serial: "sound" });
  await page.locator("#chapter4StartCheck").click();
  await waitPhase(page, "sound-paused");
  const state = await snapshot(page, viewport, "sound-paused");
  await context.close();
  return [state];
}

async function captureComplete(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { directLesson: "LP01", serial: "complete" });
  await startDirectLp01(page);
  await startCheck(page);
  await completeCleanCalls(page, 4);
  await waitPhase(page, "lp01-complete");
  const state = await snapshot(page, viewport, "lp01-complete");
  await context.close();
  return [state];
}

async function captureEarlyRest(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { serial: "early-rest" });
  await startFormal(page);
  await startCheck(page);
  await completeCleanCalls(page, 3);
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "wrong");
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "pair-compare");
  await waitPhase(page, "awaiting-response");
  await clickCorrectBubble(page);
  await waitPhase(page, "lp01-early-rest");
  const state = await snapshot(page, viewport, "lp01-early-rest");
  await context.close();
  return [state];
}

async function captureSupportedRest(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { serial: "supported-rest" });
  await startFormal(page);
  await startCheck(page);
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "wrong");
  await waitPhase(page, "awaiting-response");
  await clickWrongBubble(page);
  await waitPhase(page, "pair-compare");
  await waitPhase(page, "awaiting-response");
  await clickCorrectBubble(page);
  await waitPhase(page, "lp01-supported-story-rest");
  const state = await snapshot(page, viewport, "lp01-supported-story-rest");
  await context.close();
  return [state];
}

async function captureLp02(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { directLesson: "LP02", serial: "lp02" });
  const states = [];
  await waitPhase(page, "lp02-guide");
  states.push(await snapshot(page, viewport, "lp02-guide"));
  await page.locator('#keyboard .white-key[data-midi="60"]').click();
  await waitPhase(page, "lp02-middle-c-near-miss");
  states.push(await snapshot(page, viewport, "lp02-middle-c-near-miss"));
  await waitPhase(page, "lp02-guide");
  await page.locator('#keyboard .white-key[data-midi="50"]').click();
  await waitPhase(page, "lp02-assisted");
  states.push(await snapshot(page, viewport, "lp02-assisted"));
  await page.locator('#keyboard .white-key[data-midi="48"]').click();
  await waitPhase(page, "lp02-input-playing");
  states.push(await snapshot(page, viewport, "lp02-input-playing"));
  await waitPhase(page, "lp02-complete");
  states.push(await snapshot(page, viewport, "lp02-complete"));
  await context.close();
  return states;
}

async function captureReduced(browser, viewport) {
  const { context, page } = await createPage(browser, viewport, { directLesson: "LP01", reducedMotion: true, serial: "reduced" });
  await startDirectLp01(page);
  const state = await snapshot(page, viewport, "reduced-motion");
  if (!state.geometry.reducedMotion) failures.push({ viewportId: viewport.viewportId, stateName: "reduced-motion", kind: "motion-preference-not-active" });
  await context.close();
  return [state];
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const viewportRecords = [];
for (const viewport of selectedViewports) {
  const states = [
    ...(await capturePrimary(browser, viewport)),
    ...(await captureSound(browser, viewport)),
    ...(await captureComplete(browser, viewport)),
    ...(await captureEarlyRest(browser, viewport)),
    ...(await captureSupportedRest(browser, viewport)),
    ...(await captureLp02(browser, viewport)),
    ...(await captureReduced(browser, viewport))
  ];
  const ordered = expectedStates.map((stateName) => states.find((state) => state.stateName === stateName)).filter(Boolean);
  for (const stateName of expectedStates) {
    if (!ordered.some((state) => state.stateName === stateName)) failures.push({ viewportId: viewport.viewportId, stateName, kind: "missing-state" });
  }
  viewportRecords.push({ ...viewport, states: ordered });
}
await Promise.race([
  browser.close(),
  new Promise((resolve) => setTimeout(resolve, 2000))
]);

const core = {
  coordinateContractId,
  prototypeBaseline: "overhaul-344a",
  buildIdentity: "overhaul-344a-p3",
  runtimeIntegrationAllowed: false,
  deviceValidation: "missing",
  expectedStates,
  expectedActualPhases,
  sourceFiles: sourcePaths.map(sourceFile),
  viewports: viewportRecords,
  failures,
  browserErrors
};
const contractSha256 = sha256(JSON.stringify(core));
const contract = {
  ...core,
  generatedAt: new Date().toISOString(),
  contractSha256,
  status: failures.length || browserErrors.length ? "failed" : "browser_coordinate_contract_passed_device_unverified"
};
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(JSON.stringify({
  id: contract.coordinateContractId,
  status: contract.status,
  sha256: contractSha256,
  viewports: viewportRecords.length,
  states: expectedStates.length,
  failures,
  browserErrors,
  outputPath
}, null, 2));
if (failures.length || browserErrors.length) process.exit(1);
