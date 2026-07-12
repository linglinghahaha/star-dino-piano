import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const shotPrefix = process.argv[3] || "screenshots/clean_state_302a";
const storageKeys = ["starDinoCompletedLevels", "starDinoLearningStats"];
const mojibakePattern = /(�|锛|榛戝|灏戞|璋|鐪|鍚|楹|娴忚|惔|绋|宸茶|璺充)/g;

fs.mkdirSync(shotPrefix.includes("/") || shotPrefix.includes("\\")
  ? shotPrefix.replace(/[\\/][^\\/]+$/, "")
  : ".", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const page = await browser.newPage({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});

const qualityCssOverride = process.env.QUALITY_CSS_OVERRIDE_PATH;
if (qualityCssOverride) {
  const overridePath = path.resolve(qualityCssOverride);
  if (!fs.existsSync(overridePath)) {
    throw new Error(`QUALITY_CSS_OVERRIDE_PATH not found: ${overridePath}`);
  }
  await page.route(/quality-overrides\.css(?:\?.*)?$/, (route) => route.fulfill({
    path: overridePath,
    contentType: "text/css"
  }));
}

const browserErrors = [];
const checks = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
});

const makeUrl = (query) => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const record = (name, pass, details = {}) => {
  checks.push({ name, pass: Boolean(pass), details });
};

const waitReady = async (selector) => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 8000 });
  await page.waitForTimeout(260);
};

const gotoQuery = async (query, selector = ".moon-yard") => {
  await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(selector);
};

const screenshot = async (name) => {
  const path = `${shotPrefix}_${name}.png`;
  await page.screenshot({ path, fullPage: false });
  return path;
};

const tapMidi = async (midi, delay = 760) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
};

const waitResult = async () => {
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, {
    timeout: 8000
  });
  await page.waitForTimeout(220);
};

const clickModalNext = async (selector = ".moon-yard") => {
  const modalVisible = await page.evaluate(() => !document.querySelector("#resultModal")?.hidden);
  if (modalVisible) {
    await page.evaluate(() => document.querySelector("#modalNext")?.click());
  }
  await waitReady(selector);
};

const readState = async (label) => page.evaluate(({ stateLabel, patternSource }) => {
  const isVisible = (element) => {
    if (!element) return false;
    let node = element;
    while (node instanceof Element) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse" || Number(style.opacity) === 0) {
        return false;
      }
      node = node.parentElement;
    }
    const bounds = element.getBoundingClientRect();
    return bounds.width > 0 && bounds.height > 0;
  };
  const rect = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const style = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (style.display === "none" || style.visibility === "hidden" || r.width <= 0 || r.height <= 0) {
      return null;
    }
    return {
      selector,
      x: Math.round(r.x),
      y: Math.round(r.y),
      w: Math.round(r.width),
      h: Math.round(r.height),
      right: Math.round(r.right),
      bottom: Math.round(r.bottom)
    };
  };

  const visibleText = document.body.innerText || "";
  const listeningCarrierSelectors = [
    "#stageTitle",
    "#levelTitle",
    "#levelPrompt",
    "#rewardCard",
    "#hangingPartBadge",
    "#hangingPartLabel",
    "#stageStoryRibbon",
    "#stageNoteOrb",
    "#targetNote",
    "#coachBubble",
    "#dinoHint",
    "#modeHint",
    "#nextAction",
    "#baseBuild",
    "#stepStrip",
    ".listen-guide",
    ".level-intro-card",
    ".route-idle-dialog",
    ".stage-input-toast",
    "#feedback"
  ];
  const visibleListeningAnswerCarriers = listeningCarrierSelectors
    .flatMap((selector) => [...document.querySelectorAll(selector)].map((element) => ({ selector, element })))
    .filter(({ element }) => isVisible(element))
    .map(({ selector, element }) => ({
      selector,
      text: element.innerText?.replace(/\s+/g, " ").trim() || ""
    }));
  const hangingPartBadge = document.querySelector("#hangingPartBadge");
  const currentSlotLetter = document.querySelector(".build-slot.current .slot-note-letter");
  const mojibakeMatches = [...new Set(visibleText.match(new RegExp(patternSource, "g")) || [])];
  const importantRects = [
    ".app-shell",
    ".moon-yard",
    ".staff-stage",
    ".keyboard-panel",
    ".result-card",
    ".parent-card"
  ].map(rect).filter(Boolean);
  const viewport = { w: window.innerWidth, h: window.innerHeight };
  const offscreen = importantRects.filter((r) => (
    r.x < -2 || r.y < -2 || r.right > viewport.w + 2 || r.bottom > viewport.h + 2
  ));
  const storage = {};
  for (const key of ["starDinoCompletedLevels", "starDinoLearningStats"]) {
    storage[key] = localStorage.getItem(key);
  }

  return {
    label: stateLabel,
    url: location.href,
    screen: document.querySelector("#appShell")?.dataset.phase || "",
    scaffold: document.querySelector("#appShell")?.dataset.scaffold || "",
    levelId: document.querySelector("#appShell")?.dataset.levelId || "",
    levelRunMode: document.querySelector("#appShell")?.dataset.levelRunMode || "",
    staffRunMode: document.querySelector("#appShell")?.dataset.staffRunMode || "",
    badge: document.querySelector("#levelBadge")?.textContent?.trim() || "",
    listeningIdentityHidden: document.querySelector("#appShell")?.dataset.listeningIdentityHidden || "",
    keyboardTargetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
    targetKey: document.querySelector(".key.target strong")?.textContent?.trim() || "",
    mutedTargetKey: document.querySelector(".key.target-muted strong")?.textContent?.trim() || "",
    visibleListeningAnswerCarriers,
    hangingPartBadgeVisible: isVisible(hangingPartBadge),
    hangingPartBadgeText: hangingPartBadge?.textContent?.replace(/\s+/g, " ").trim() || "",
    currentSlotLetterVisible: isVisible(currentSlotLetter),
    currentSlotLetterText: currentSlotLetter?.textContent?.trim() || "",
    resultVisible: !document.querySelector("#resultModal")?.hidden,
    resultKind: document.querySelector("#resultModal")?.dataset.result || "",
    resultTitle: document.querySelector("#resultModal h2")?.textContent?.trim() || "",
    resultText: document.querySelector("#resultText")?.textContent?.trim() || "",
    parentLearningFocus: document.querySelector("#parentLearningFocus")?.textContent?.trim() || "",
    parentLearningDetail: document.querySelector("#parentLearningDetail")?.textContent?.trim() || "",
    parentMasteryStatus: document.querySelector("#parentMasteryStatus")?.textContent?.trim() || "",
    parentMasteryDetail: document.querySelector("#parentMasteryDetail")?.textContent?.trim() || "",
    parentProgressText: document.querySelector("#parentProgressText")?.textContent?.trim() || "",
    parentStaffState: document.querySelector("#parentStaffState")?.textContent?.trim() || "",
    storage,
    mojibakeMatches,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2 ||
      document.body.scrollWidth > window.innerWidth + 2,
    offscreen
  };
}, { stateLabel: label, patternSource: mojibakePattern.source });

const assertCleanState = (state) => {
  record(`${state.label}: no visible mojibake`, state.mojibakeMatches.length === 0, {
    matches: state.mojibakeMatches
  });
  record(`${state.label}: no horizontal overflow`, !state.horizontalOverflow, {
    offscreen: state.offscreen
  });
};

const listeningAnswerLeaks = (state, { solfege, letter, locators }) => state.visibleListeningAnswerCarriers.filter(({ text }) => {
  const value = text.replace(/\s+/g, " ").trim();
  const hasToken = (token) => new RegExp(`(^|[^A-Za-z])${token}(?=$|[^A-Za-z])`).test(value);
  return hasToken(solfege) || hasToken(letter) || locators.some((locator) => value.includes(locator));
});

const openParentSnapshot = async (name) => {
  await page.locator("#playParentGate").click({ timeout: 5000 });
  await page.waitForSelector("#parentModal:not([hidden])", { timeout: 5000 });
  await page.waitForTimeout(120);
  const shot = await screenshot(`${name}_parent`);
  const state = await readState(`${name} parent`);
  assertCleanState(state);
  await page.locator("#parentClose").click({ timeout: 5000 });
  await page.waitForSelector("#parentModal", { state: "attached", timeout: 5000 });
  return { shot, state };
};

const debugReplayStaysPlayedOnly = (state, collection, id) => {
  try {
    const stats = JSON.parse(state.storage.starDinoLearningStats || "{}");
    const stored = stats?.[collection]?.[id] || {};
    const skillKey = `${collection === "staff" ? "staff" : "level"}:${id}`;
    const hasStableEvent = (stats?.retention?.stableEvents || []).some((event) => event.skillKey === skillKey);
    return state.parentMasteryStatus === "在故事帮助下玩过" &&
      (Number(stored.formalCompletions) || 0) === 0 &&
      (Number(stored.stableCompletions) || 0) === 0 &&
      !hasStableEvent;
  } catch {
    return false;
  }
};

const resetStorage = async () => {
  await gotoQuery("?level=M01&check=clean-state-reset");
  await page.evaluate((keys) => {
    keys.forEach((key) => localStorage.removeItem(key));
    sessionStorage.clear();
  }, storageKeys);
  const state = await readState("after reset");
  record("localStorage cleared", storageKeys.every((key) => !state.storage[key]), state.storage);
};

const completeGuidedThenCheckLevel = async ({ levelId, sequence }) => {
  await gotoQuery(`?level=${levelId}&check=clean-${levelId.toLowerCase()}-guided`);
  const initial = await readState(`${levelId} guided initial`);
  assertCleanState(initial);
  await screenshot(`${levelId}_guided_initial`);

  for (const midi of sequence) {
    await tapMidi(midi);
  }
  await waitResult();
  const guidedResult = await readState(`${levelId} guided result`);
  await screenshot(`${levelId}_guided_result`);
  record(`${levelId}: guided completion opens check replay`, guidedResult.resultKind === "level-check", guidedResult);
  assertCleanState(guidedResult);

  await clickModalNext(".moon-yard");
  const checkInitial = await readState(`${levelId} check initial`);
  await screenshot(`${levelId}_check_initial`);
  record(`${levelId}: check scaffold`, checkInitial.scaffold === "level-check", checkInitial);
  record(`${levelId}: check starts without target glow`, checkInitial.keyboardTargetVisible === "false", checkInitial);
  assertCleanState(checkInitial);

  for (const midi of sequence) {
    await tapMidi(midi);
  }
  await waitResult();
  const checkResult = await readState(`${levelId} check result`);
  await screenshot(`${levelId}_check_result`);
  record(`${levelId}: check completion result visible`, checkResult.resultVisible, checkResult);
  assertCleanState(checkResult);

  await gotoQuery(`?level=${levelId}&check=clean-${levelId.toLowerCase()}-parent`);
  const parent = await openParentSnapshot(levelId);
  record(`${levelId}: debug deep-link replay stays played only`, debugReplayStaysPlayedOnly(parent.state, "levels", levelId), {
    status: parent.state.parentMasteryStatus,
    detail: parent.state.parentMasteryDetail,
    storage: parent.state.storage.starDinoLearningStats
  });
  return { initial, guidedResult, checkInitial, checkResult, parent };
};

const completeListeningM03 = async (runName) => {
  await gotoQuery(`?level=M03&check=clean-m03-${runName}`);
  const initial = await readState(`M03 ${runName} initial`);
  await screenshot(`M03_${runName}_initial`);
  const initialLeaks = listeningAnswerLeaks(initial, {
    solfege: "Re",
    letter: "D",
    locators: ["2黑中", "两黑键中间"]
  });
  record(`M03 ${runName}: answer hidden before action`, initial.keyboardTargetVisible === "false" && initial.listeningIdentityHidden === "true" && initialLeaks.length === 0 && !initial.hangingPartBadgeVisible && !initial.currentSlotLetterVisible, {
    ...initial,
    leaks: initialLeaks
  });
  assertCleanState(initial);

  await tapMidi(62, 840);
  const step2 = await readState(`M03 ${runName} step2`);
  const step2Leaks = listeningAnswerLeaks(step2, {
    solfege: "Do",
    letter: "C",
    locators: ["2黑左", "两黑键左边"]
  });
  record(`M03 ${runName}: second answer hidden before action`, step2.keyboardTargetVisible === "false" && step2.listeningIdentityHidden === "true" && step2Leaks.length === 0 && !step2.hangingPartBadgeVisible && !step2.currentSlotLetterVisible, {
    ...step2,
    leaks: step2Leaks
  });

  await tapMidi(60, 840);
  await page.waitForSelector(".m03-wheel-complete", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(220);
  const result = await readState(`M03 ${runName} result`);
  const sceneCompletion = await page.evaluate(() => ({
    wheelComplete: Boolean(document.querySelector(".m03-wheel-complete")),
    modalHidden: document.querySelector("#resultModal")?.hidden === true,
    transientCount: document.querySelectorAll(".key-press-label, .note-feedback-burst, .sprite-effect, .music-flight, .music-flight-landing, .stage-confetti-effect, .flying-part").length
  }));
  await screenshot(`M03_${runName}_result`);
  record(`M03 ${runName}: completed in scene without a result modal`, sceneCompletion.wheelComplete && sceneCompletion.modalHidden && sceneCompletion.transientCount === 0, { result, sceneCompletion });
  assertCleanState(result);

  await gotoQuery(`?level=M03&check=clean-m03-${runName}-parent`);
  return openParentSnapshot(`M03_${runName}`);
};

const completeM01 = async () => {
  await gotoQuery("?level=M01&check=clean-m01");
  const initial = await readState("M01 initial");
  await screenshot("M01_initial");
  assertCleanState(initial);
  await tapMidi(60);
  await waitResult();
  const result = await readState("M01 result");
  await screenshot("M01_result");
  record("M01: completed", result.resultVisible, result);
  assertCleanState(result);

  await gotoQuery("?level=M01&check=clean-m01-parent");
  const parent = await openParentSnapshot("M01");
  record("M01: parent says played, not long-term stable", parent.state.parentMasteryStatus === "在故事帮助下玩过", {
    status: parent.state.parentMasteryStatus,
    detail: parent.state.parentMasteryDetail
  });
};

const completeStaffBridge = async () => {
  await gotoQuery("?mode=staff&check=clean-s01-guided", ".staff-stage");
  const initial = await readState("S01 guided initial");
  await screenshot("S01_guided_initial");
  record("S01: guided scaffold", initial.scaffold === "staff", initial);
  assertCleanState(initial);

  await tapMidi(62);
  const afterWrong = await readState("S01 guided wrong");
  await screenshot("S01_guided_wrong");
  record("S01: guided wrong keeps target visible", afterWrong.keyboardTargetVisible === "true", afterWrong);
  assertCleanState(afterWrong);

  for (const midi of [60, 62, 64, 65, 67, 64]) {
    await tapMidi(midi);
  }
  await waitResult();
  const guidedResult = await readState("S01 guided result");
  await screenshot("S01_guided_result");
  record("S01: guided completion opens staff check", guidedResult.resultKind === "staff-check", guidedResult);
  assertCleanState(guidedResult);

  await clickModalNext(".staff-stage");
  const checkInitial = await readState("S01 check initial");
  await screenshot("S01_check_initial");
  record("S01: check scaffold", checkInitial.scaffold === "staff-check", checkInitial);
  record("S01: check starts without target glow", checkInitial.keyboardTargetVisible === "false", checkInitial);
  assertCleanState(checkInitial);

  for (const midi of [60, 62, 64, 65, 67, 64]) {
    await tapMidi(midi);
  }
  await waitResult();
  const checkResult = await readState("S01 check result");
  await screenshot("S01_check_result");
  record("S01: stable result kind", checkResult.resultKind === "staff", checkResult);
  assertCleanState(checkResult);

  await gotoQuery("?mode=staff&check=clean-s01-parent", ".staff-stage");
  const parent = await openParentSnapshot("S01");
  record("S01: debug deep-link replay stays played only", debugReplayStaysPlayedOnly(parent.state, "staff", "S01"), {
    status: parent.state.parentMasteryStatus,
    detail: parent.state.parentMasteryDetail,
    focus: parent.state.parentLearningFocus
  });
};

try {
  await resetStorage();
  await completeM01();

  const m03First = await completeListeningM03("first");
  record("M03 first debug run stays played, not stable", debugReplayStaysPlayedOnly(m03First.state, "levels", "M03"), {
    status: m03First.state.parentMasteryStatus,
    detail: m03First.state.parentMasteryDetail
  });
  const m03Second = await completeListeningM03("second");
  record("M03 second debug run stays played, not stable", debugReplayStaysPlayedOnly(m03Second.state, "levels", "M03"), {
    status: m03Second.state.parentMasteryStatus,
    detail: m03Second.state.parentMasteryDetail
  });

  await completeGuidedThenCheckLevel({ levelId: "M08", sequence: [60, 62, 64, 65, 67] });
  await completeGuidedThenCheckLevel({ levelId: "FG01", sequence: [65] });
  await completeGuidedThenCheckLevel({ levelId: "FG02", sequence: [67] });
  await completeGuidedThenCheckLevel({ levelId: "FG03", sequence: [64, 65, 67] });
  await completeGuidedThenCheckLevel({ levelId: "FG04", sequence: [65, 67] });
  await completeStaffBridge();

  record("browser console has no warnings/errors", browserErrors.length === 0, { browserErrors });

  const failed = checks.filter((check) => !check.pass);
  console.log(JSON.stringify({
    summary: {
      passed: checks.length - failed.length,
      failed: failed.length,
      screenshotPrefix: shotPrefix
    },
    failed,
    checks,
    browserErrors
  }, null, 2));

  if (failed.length > 0 || browserErrors.length > 0) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
