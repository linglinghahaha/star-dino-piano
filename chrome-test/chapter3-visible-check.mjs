import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/chapter3_visible_340a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function targetUrl(search = "?screen=map") {
  const value = new URL(baseUrl);
  value.search = search;
  return value.toString();
}

function endedC203() {
  return {
    sessionId: "C2-03-ch3-entry",
    bundleId: "C2-03",
    status: "ended",
    actionIndex: 0,
    actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
    completedActions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
    endedAt: "2026-07-12T06:00:00.000Z",
    endReason: "natural-rest"
  };
}

function baseRuntime() {
  return { version: 1, active: null, history: [endedC203()], lastRest: null };
}

const chapter12Sentinel = {
  version: 3,
  levels: { M07: { completions: 2, stableCompletions: 1, needsPractice: false } },
  notes: { C: { attempts: 4, correct: 4, wrong: 0 } },
  staff: {},
  retention: {
    stableEvents: [{ eventId: "sentinel-stable", skillKey: "level:M07", sessionId: "sentinel-session" }],
    retainedEvents: [{ eventId: "sentinel-retained", skillKey: "level:M07", sessionId: "sentinel-later" }],
    observationEvents: [],
    clockInvalidEvents: [],
    lastWallClockAt: null,
    lastWallClockSessionId: null
  }
};

function gardenMasteryIsClean(view) {
  const retention = view.learningStats?.retention || {};
  const serialized = JSON.stringify(view.learningStats || {});
  return !(retention.stableEvents || []).some((event) => /LS0[1-3]/.test(event.skillKey || "")) &&
    !(retention.retainedEvents || []).some((event) => /LS0[1-3]/.test(event.skillKey || "")) &&
    !serialized.includes('"LS01"') && !serialized.includes('"LS02"') && !serialized.includes('"LS03"');
}

function chapter12SentinelPreserved(view) {
  return JSON.stringify(view.learningStats || {}) === JSON.stringify(chapter12Sentinel);
}

async function makePage(viewport = { width: 1024, height: 768, deviceScaleFactor: 1 }) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: viewport.deviceScaleFactor || 1 });
  await context.addInitScript(() => {
    const NativeAudioContext = window.AudioContext || window.webkitAudioContext;
    window.__chapter3AudioContexts = 0;
    if (!NativeAudioContext) return;
    class CountedAudioContext extends NativeAudioContext {
      constructor(...args) {
        super(...args);
        window.__chapter3AudioContexts += 1;
      }
    }
    window.AudioContext = CountedAudioContext;
    window.webkitAudioContext = CountedAudioContext;
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  });
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  return { context, page };
}

async function seed(page, runtime = baseRuntime(), learningStats = null) {
  await page.goto(targetUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.evaluate(({ value, learningStats }) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify(value));
    if (learningStats) localStorage.setItem("starDinoLearningStats", JSON.stringify(learningStats));
  }, { value: runtime, learningStats });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForTimeout(180);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    const learningStats = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
    const visible = (element) => {
      if (!element || element.hidden) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    return {
      screen: document.body.className,
      markerVisible: visible(document.querySelector("#gardenRestMarker")),
      markerTag: document.querySelector("#gardenRestMarker")?.tagName,
      markerState: document.querySelector("#gardenRestMarker")?.dataset.chapter3State,
      markerDisabled: document.querySelector("#gardenRestMarker")?.disabled,
      markerStrong: document.querySelector("#gardenRestMarker strong")?.textContent || "",
      markerSmall: document.querySelector("#gardenRestMarker small")?.textContent || "",
      markerAria: document.querySelector("#gardenRestMarker")?.getAttribute("aria-label") || "",
      markerRect: (() => {
        const rect = document.querySelector("#gardenRestMarker")?.getBoundingClientRect();
        return rect ? { width: rect.width, height: rect.height } : null;
      })(),
      mapChapter: document.querySelector("#mapChapterLabel")?.textContent || "",
      mapProgress: document.querySelector("#mapStarCount")?.textContent || "",
      mapProgressAria: document.querySelector("#mapStarCount")?.getAttribute("aria-label") || "",
      active: runtime.active || null,
      history: runtime.history || [],
      chapter3: runtime.chapter3 || null,
      learningStats,
      audioContexts: window.__chapter3AudioContexts || 0,
      audioGesture: document.documentElement.dataset.chapter3AudioGesture || "",
      airState: document.querySelector("#gardenScene")?.dataset.airState,
      gardenCharacterSrc: document.querySelector("#gardenXingyaImage")?.getAttribute("src") || "",
      gardenCharacterAssetState: document.querySelector("#gardenXingya")?.dataset.assetState || "",
      fakeEquipmentLayers: document.querySelectorAll(".garden-visor, .garden-helmet-dock").length,
      lesson: document.querySelector("#gardenScene")?.dataset.lesson,
      reviewable: document.querySelector("#gardenScene")?.dataset.reviewableForMastery,
      repairStage: document.querySelector("#gardenScene")?.dataset.repairStage,
      targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible,
      speech: document.querySelector("#gardenSpeech")?.innerText?.replace(/\s+/g, " ").trim() || "",
      leaves: [...document.querySelectorAll(".garden-leaf")].map((leaf) => leaf.classList.contains("grown")),
      ls03Count: runtime.chapter3?.ls03QualifiedInputs || 0,
      modalVisible: visible(document.querySelector("#resultModal")),
      mediaRefs: [...document.querySelectorAll("img,video,audio,source")].map((node) => node.getAttribute("src") || "").filter(Boolean)
    };
  });
}

async function installAirStateObserver(page) {
  await page.evaluate(() => {
    window.__chapter3AirTransitions = [];
    window.__chapter3AirObserver?.disconnect();
    const scene = document.querySelector("#gardenScene");
    if (!scene) return;
    const capture = () => {
      const value = scene.dataset.airState || "";
      if (value && window.__chapter3AirTransitions.at(-1) !== value) window.__chapter3AirTransitions.push(value);
    };
    capture();
    window.__chapter3AirObserver = new MutationObserver(capture);
    window.__chapter3AirObserver.observe(scene, { attributes: true, attributeFilter: ["data-air-state"] });
  });
}

async function waitForAirState(page, expected, timeout = 5000) {
  try {
    await page.waitForFunction((value) => document.querySelector("#gardenScene")?.dataset.airState === value, expected, { timeout });
  } catch (error) {
    const diagnostics = await page.evaluate(() => ({
      current: document.querySelector("#gardenScene")?.dataset.airState || "",
      transitions: window.__chapter3AirTransitions || [],
      runtime: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}")
    }));
    throw new Error(`Timed out waiting for air state ${expected}: ${JSON.stringify(diagnostics)}`, { cause: error });
  }
}

async function airTransitions(page) {
  return page.evaluate(() => [...(window.__chapter3AirTransitions || [])]);
}

async function inspectGardenCharacter(page) {
  return page.evaluate(async () => {
    const image = document.querySelector("#gardenXingyaImage");
    if (!image) return null;
    await image.decode();
    const response = await fetch(image.currentSrc || image.src, { cache: "no-store" });
    const bytes = await response.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const sha256 = [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const corners = [
      [0, 0],
      [canvas.width - 1, 0],
      [0, canvas.height - 1],
      [canvas.width - 1, canvas.height - 1]
    ].map(([x, y]) => context.getImageData(x, y, 1, 1).data[3]);
    return {
      src: image.getAttribute("src") || "",
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      sha256,
      corners
    };
  });
}

const locked = await makePage();
await seed(locked.page, { version: 1, active: null, history: [], lastRest: null });
const beforeUnlock = await snapshot(locked.page);
record("Chapter 3 entrance stays hidden before formal C2-03", !beforeUnlock.markerVisible && !beforeUnlock.active, beforeUnlock);
record("Map render creates no AudioContext", beforeUnlock.audioContexts === 0, beforeUnlock);
await locked.context.close();

const main = await makePage();
await seed(main.page);
let view = await snapshot(main.page);
record("Formal C2-03 unlocks one explicit button without creating a session", view.markerVisible && view.markerTag === "BUTTON" && !view.active, view);
record("Unentered garden marker names the entrance consistently", view.markerStrong === "花园入口" && view.markerSmall === "点这里走进花园" && view.markerAria === "花园入口，点这里走进花园", view);
record("Garden entry map uses the Chapter 3 identity and 0/3 world progress", view.mapChapter === "当前章节：呼吸花园" && view.mapProgress.includes("嫩芽 0/3") && !view.mapChapter.includes("月球基地") && !view.mapProgress.includes("基地"), view);
record("Garden entry meets the child touch-target minimum", view.markerRect?.width >= 44 && view.markerRect?.height >= 44, view);
record("Seeing and refreshing the entrance does not unlock audio", view.audioContexts === 0 && !view.audioGesture, view);
await main.page.screenshot({ path: path.join(screenshotDir, "garden_entry_1024x768.png") });

await installAirStateObserver(main.page);
const mainScanningObserved = waitForAirState(main.page, "scanning");
await main.page.locator("#gardenRestMarker").click();
view = await snapshot(main.page);
record("Entrance gesture creates exactly one formal C3-01", view.active?.bundleId === "C3-01" && view.active.actions?.length === 2 && view.history.filter((item) => item.bundleId === "C3-01").length === 0, view);
record("The same entrance gesture unlocks one AudioContext", view.audioGesture === "unlocked" && view.audioContexts === 1, view);
const activeMapPage = await main.context.newPage();
await activeMapPage.goto(targetUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
await activeMapPage.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
const activeMap = await snapshot(activeMapPage);
record("C3-01 active map keeps the Chapter 3 identity and 0/3 active progress", activeMap.screen.includes("screen-map") && activeMap.mapChapter === "当前章节：呼吸花园" && activeMap.mapProgress.includes("嫩芽 0/3") && activeMap.mapProgress.includes("正在照顾") && !activeMap.mapProgress.includes("基地"), activeMap);
record("Active LS01 map marker names the first leaf consistently", activeMap.markerStrong === "第一片叶" && activeMap.markerSmall === "继续第一片叶" && activeMap.markerAria === "第一片叶，继续第一片叶", activeMap);
await activeMapPage.close();
record("Air check begins sealed with no unapproved media", view.airState === "sealed" && !view.mediaRefs.some((src) => /concepts\/|audio\/|technical-preview-v1/.test(src)), view);
record("Sealed arrival uses the sealed-suit character asset without a second fake helmet layer", view.gardenCharacterSrc.endsWith("xingya-suit-point.webp") && view.gardenCharacterAssetState === "sealed-suit" && view.fakeEquipmentLayers === 0, view);
const sealedCharacterSrc = view.gardenCharacterSrc;
await main.page.screenshot({ path: path.join(screenshotDir, "air_check_sealed_1024x768.png") });
await mainScanningObserved;
view = await snapshot(main.page);
let observedAirStates = await airTransitions(main.page);
record("Air check reaches scanning", view.airState === "scanning" && observedAirStates.includes("sealed") && observedAirStates.includes("scanning"), { view, observedAirStates });
record("Scanning keeps the same sealed-suit bitmap without stacking fake equipment", view.gardenCharacterSrc === sealedCharacterSrc && view.gardenCharacterAssetState === "sealed-suit" && view.fakeEquipmentLayers === 0, view);
await main.page.screenshot({ path: path.join(screenshotDir, "air_check_scanning_1024x768.png") });
await waitForAirState(main.page, "safe-open");
view = await snapshot(main.page);
observedAirStates = await airTransitions(main.page);
record("Air check converges to safe-open before LS01 input", view.airState === "safe-open" && view.lesson === "LS01" && view.targetVisible === "true" && observedAirStates.indexOf("sealed") < observedAirStates.indexOf("scanning") && observedAirStates.indexOf("scanning") < observedAirStates.indexOf("safe-open"), { view, observedAirStates });
const safeOpenCharacter = await inspectGardenCharacter(main.page);
record("Safe-open switches from the sealed suit to the approved garden-mode runtime asset", view.gardenCharacterAssetState === "garden-mode" && view.gardenCharacterSrc.endsWith("xingya-garden-invite-v1.webp") && view.gardenCharacterSrc !== sealedCharacterSrc && !view.mediaRefs.some((src) => /concepts\/runtime-candidates\//.test(src)), { view, safeOpenCharacter });
record("Garden-mode runtime asset matches the approved prototype hash and transparent dimensions", safeOpenCharacter?.sha256 === "1228082D4DF2BF576ED916B16950799296A975279ED6EFC554F6BB9EDDE88EBA" && safeOpenCharacter?.naturalWidth === 512 && safeOpenCharacter?.naturalHeight === 512 && safeOpenCharacter?.corners?.every((alpha) => alpha === 0), safeOpenCharacter);
record("LS01 uses C as primary identity with Do as support", view.speech.includes("琴键 C") && view.speech.includes("我唱 Do") && view.speech.includes("两黑键左侧"), view);
record("LS01-LS03 runtime explicitly disables mastery review", view.reviewable === "false", view);
await main.page.screenshot({ path: path.join(screenshotDir, "LS01_initial_1024x768.png") });
await main.page.locator("#playParentGate").click();
const parentSummary = await main.page.evaluate(() => ({
  focus: document.querySelector("#parentLearningFocus")?.textContent || "",
  detail: document.querySelector("#parentLearningDetail")?.textContent || "",
  mastery: document.querySelector("#parentMasteryStatus")?.textContent || "",
  masteryDetail: document.querySelector("#parentMasteryDetail")?.textContent || ""
}));
record("Parent summary identifies visible teaching without claiming mastery", parentSummary.focus.includes("C / Do") && parentSummary.detail.includes("不进入 mastery") && parentSummary.masteryDetail.includes("不写入稳定或隔日保留"), parentSummary);
await main.page.locator("#parentClose").click();

await main.page.locator('.key.white-key[data-midi="60"]').click();
await main.page.waitForTimeout(240);
view = await snapshot(main.page);
record("One qualified C permanently opens leaf one", view.leaves[0] && view.active?.actionIndex === 1, view);
await main.page.screenshot({ path: path.join(screenshotDir, "LS01_correct_1024x768.png") });
await main.page.waitForTimeout(900);
view = await snapshot(main.page);
record("C3-01 advances to LS02 in the same session", view.lesson === "LS02" && view.active?.bundleId === "C3-01" && view.leaves[0], view);

const retainedBefore = await main.page.evaluate(() => JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}").retention || {});
await main.page.locator('.key.white-key[data-midi="62"]').click();
await main.page.waitForTimeout(1750);
view = await snapshot(main.page);
record("LS02 straightens leaf two and ends C3-01 at the map", view.leaves[1] && !view.active && view.history.some((item) => item.bundleId === "C3-01" && item.status === "ended"), view);
record("Two completed leaves point to the third leaf consistently", view.markerStrong === "第三片叶" && view.markerSmall === "点这里唤醒第三片叶" && view.markerAria === "第三片叶，点这里唤醒第三片叶", view);
await main.page.screenshot({ path: path.join(screenshotDir, "map_copy_ls03_ready_1024x768.png") });
const retainedAfter = await main.page.evaluate(() => JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}").retention || {});
record("Visible garden lessons create no stable or retained evidence", JSON.stringify(retainedBefore) === JSON.stringify(retainedAfter), { retainedBefore, retainedAfter });

await main.page.locator("#gardenRestMarker").click();
await main.page.waitForTimeout(160);
view = await snapshot(main.page);
record("A later explicit click creates one C3-02 with LS03 only", view.active?.bundleId === "C3-02" && view.active.actions?.length === 1 && view.lesson === "LS03", view);
record("C3-02 reuses the already safe equipment state", view.airState === "safe-open", view);
const c302MapPage = await main.context.newPage();
await c302MapPage.goto(targetUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
await c302MapPage.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
const c302Map = await snapshot(c302MapPage);
record("C3-02 active map uses the Chapter 3 identity and 2/3 active progress", c302Map.mapChapter === "当前章节：呼吸花园" && c302Map.mapProgress.includes("嫩芽 2/3") && c302Map.mapProgress.includes("正在照顾") && !c302Map.mapProgress.includes("基地"), c302Map);
record("Active LS03 map marker names the third leaf consistently", c302Map.markerStrong === "第三片叶" && c302Map.markerSmall === "继续第三片叶" && c302Map.markerAria === "第三片叶，继续第三片叶", c302Map);
await c302MapPage.screenshot({ path: path.join(screenshotDir, "map_copy_ls03_active_1024x768.png") });
await c302MapPage.close();
await main.page.evaluate(() => window.handleInput(64, "程序测试"));
await main.page.waitForTimeout(120);
await main.page.evaluate(() => window.handleInput(64, "程序测试"));
await main.page.waitForTimeout(120);
view = await snapshot(main.page);
record("Programmatic repetition without release counts as one E", view.ls03Count === 1 && !view.leaves[2] && view.targetVisible === "false", view);
await main.page.screenshot({ path: path.join(screenshotDir, "LS03_first_1024x768.png") });

await main.page.evaluate(() => window.releaseGardenInput(64, "程序测试"));
await main.page.evaluate(() => window.handleInput(64, "程序测试"));
await main.page.waitForTimeout(260);
view = await snapshot(main.page);
record("A released second E completes leaf three in the garden", view.leaves[2] && !view.active && view.screen.includes("screen-garden"), view);
record("Chapter 3 completion uses no full-screen result modal", !view.modalVisible, view);
await main.page.screenshot({ path: path.join(screenshotDir, "LS03_complete_1024x768.png") });
await main.page.waitForTimeout(1450);
view = await snapshot(main.page);
record("LS03 completion returns to an explicit interactive LS04-ready map marker", view.markerState === "ready" && !view.markerDisabled && view.screen.includes("screen-map"), view);
record("LS03 completion keeps the Chapter 3 identity and starts LS04 at 0/4", view.mapChapter === "当前章节：呼吸花园" && view.mapProgress.includes("找朋友 0/4") && view.mapProgress.includes("准备") && !view.mapProgress.includes("基地"), view);
record("LS04-ready marker names the hidden listening activity consistently", view.markerStrong === "C/D 找朋友" && view.markerSmall === "点这里听种核" && view.markerAria === "C/D 找朋友，点这里听种核", view);
record("Completed map state has no new Chapter 3 active session", view.history.filter((item) => item.bundleId === "C3-02" && item.status === "ended").length === 1 && !view.active, view);
await main.page.screenshot({ path: path.join(screenshotDir, "garden_complete_map_1024x768.png") });
await main.context.close();

async function runPreLs01ReturnCase(id, expectedState, prepare = async () => {}) {
  const probe = await makePage();
  await seed(probe.page);
  await installAirStateObserver(probe.page);
  const stateObserved = waitForAirState(probe.page, expectedState);
  await probe.page.locator("#gardenRestMarker").click();
  await stateObserved;
  await prepare(probe.page);
  const beforeReturn = await snapshot(probe.page);
  await probe.page.locator("#mapReturn").click();
  await probe.page.waitForTimeout(180);
  const afterReturn = await snapshot(probe.page);
  const ls01Evidence = afterReturn.chapter3?.lessonEvidence?.LS01 || null;
  const currentAction = afterReturn.active?.actions?.[afterReturn.active?.actionIndex || 0] || null;
  record(
    `${id}: returning before LS01 progress pauses without modeled completion`,
    beforeReturn.airState !== undefined && afterReturn.screen.includes("screen-map") &&
      afterReturn.chapter3?.leaves?.[0] === false && !ls01Evidence &&
      afterReturn.active?.bundleId === "C3-01" && currentAction?.targetId === "LS01" &&
      !afterReturn.chapter3?.resume?.nextTargetId &&
      !(afterReturn.active?.completedActions || []).some((item) => item.targetId === "LS01"),
    { beforeReturn, afterReturn, ls01Evidence, currentAction }
  );
  record(
    `${id}: ordinary navigation keeps the first-leaf map copy and creates no needs-practice label`,
    afterReturn.markerStrong === "第一片叶" && afterReturn.markerSmall === "继续第一片叶" &&
      afterReturn.markerAria === "第一片叶，继续第一片叶" && ls01Evidence?.needsPractice !== true,
    afterReturn
  );
  await probe.page.screenshot({ path: path.join(screenshotDir, `pre_ls01_return_${id}_1024x768.png`) });
  await probe.context.close();
}

await runPreLs01ReturnCase("sealed", "sealed");
await runPreLs01ReturnCase("scanning", "scanning");
await runPreLs01ReturnCase("safe_open_zero_input", "safe-open");
await runPreLs01ReturnCase("one_wrong", "safe-open", async (page) => {
  await page.locator('.key.white-key[data-midi="62"]').click();
  await page.waitForTimeout(120);
});

const pauseThenCorrect = await makePage();
await seed(pauseThenCorrect.page, baseRuntime(), chapter12Sentinel);
await pauseThenCorrect.page.locator("#gardenRestMarker").click();
await pauseThenCorrect.page.waitForTimeout(1450);
const pauseCorrectOldSessionId = (await snapshot(pauseThenCorrect.page)).active?.sessionId;
await pauseThenCorrect.page.locator('.key.white-key[data-midi="62"]').click();
await pauseThenCorrect.page.waitForTimeout(120);
await pauseThenCorrect.page.locator("#mapReturn").click();
await pauseThenCorrect.page.waitForTimeout(180);
await pauseThenCorrect.page.locator("#gardenRestMarker").click();
await pauseThenCorrect.page.waitForTimeout(220);
await pauseThenCorrect.page.locator('.key.white-key[data-midi="60"]').click();
await pauseThenCorrect.page.waitForTimeout(260);
view = await snapshot(pauseThenCorrect.page);
const pauseCorrectEvidence = view.chapter3?.lessonEvidence?.LS01 || {};
const pauseCorrectFirstAction = view.active?.actions?.find((action) => action.targetId === "LS01");
record("One wrong before a map pause remains in the final LS01 evidence after child correction", pauseCorrectEvidence.wrongCount === 1 && pauseCorrectEvidence.childCorrectCount === 1 && Object.values(pauseCorrectEvidence.inputRoutes || {}).reduce((sum, count) => sum + count, 0) === 2 && pauseCorrectEvidence.childInputs?.length === 2 && pauseCorrectEvidence.childInputs[0]?.result === "wrong" && pauseCorrectEvidence.childInputs[1]?.result === "correct" && pauseCorrectEvidence.needsPractice === false, pauseCorrectEvidence);
record("Completed LS01 clears its pending attempt before the active action advances", !pauseCorrectFirstAction?.gardenAttempt && view.active?.actions?.[view.active?.actionIndex || 0]?.targetId === "LS02", view.active);
await pauseThenCorrect.page.locator("#mapReturn").click();
await pauseThenCorrect.page.waitForTimeout(1250);
await pauseThenCorrect.page.locator("#gardenRestMarker").click();
await pauseThenCorrect.page.waitForTimeout(220);
view = await snapshot(pauseThenCorrect.page);
record("A fresh LS02 resume session does not inherit the completed LS01 pending attempt", view.active?.sessionId !== pauseCorrectOldSessionId && view.active?.resumeOfSessionId === pauseCorrectOldSessionId && view.active?.actions?.length === 1 && view.active.actions[0]?.targetId === "LS02" && !view.active.actions[0]?.gardenAttempt && view.repairStage === "none", view);
await pauseThenCorrect.context.close();

const refreshContinuity = await makePage();
await seed(refreshContinuity.page);
await refreshContinuity.page.locator("#gardenRestMarker").click();
await refreshContinuity.page.waitForTimeout(1450);
await refreshContinuity.page.locator('.key.white-key[data-midi="62"]').click();
await refreshContinuity.page.waitForTimeout(120);
const refreshSessionId = (await snapshot(refreshContinuity.page)).active?.sessionId;
await refreshContinuity.page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await refreshContinuity.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
await refreshContinuity.page.waitForTimeout(220);
view = await snapshot(refreshContinuity.page);
record("Refreshing the same LS01 action restores its first wrong input", view.active?.sessionId === refreshSessionId && view.active?.actions?.[0]?.gardenAttempt?.wrongCount === 1 && Object.values(view.active?.actions?.[0]?.gardenAttempt?.inputRoutes || {}).reduce((sum, count) => sum + count, 0) === 1, view.active);
await refreshContinuity.page.locator('.key.white-key[data-midi="64"]').click();
await refreshContinuity.page.waitForTimeout(140);
view = await snapshot(refreshContinuity.page);
record("A second wrong after refresh enters the bounded assisted repair", view.repairStage === "assisted" && view.speech.includes("陪你再试一次") && view.active?.actions?.[0]?.gardenAttempt?.wrongCount === 2 && view.active?.actions?.[0]?.gardenAttempt?.repairStage === "assisted", view);
await refreshContinuity.context.close();

const assistedCorrect = await makePage({ width: 1194, height: 834, deviceScaleFactor: 2 });
await seed(assistedCorrect.page, baseRuntime(), chapter12Sentinel);
await assistedCorrect.page.locator("#gardenRestMarker").click();
await assistedCorrect.page.waitForTimeout(1450);
const assistedOldSessionId = (await snapshot(assistedCorrect.page)).active?.sessionId;
await assistedCorrect.page.locator('.key.white-key[data-midi="62"]').click();
await assistedCorrect.page.waitForTimeout(100);
await assistedCorrect.page.locator('.key.white-key[data-midi="64"]').click();
await assistedCorrect.page.waitForTimeout(120);
view = await snapshot(assistedCorrect.page);
record("The second LS01 error enters one bounded assisted retry", view.repairStage === "assisted" && view.speech.includes("陪你再试一次"), view);
await assistedCorrect.page.locator('.key.white-key[data-midi="60"]').click();
await assistedCorrect.page.waitForTimeout(1250);
view = await snapshot(assistedCorrect.page);
const assistedEvidence = view.chapter3?.lessonEvidence?.LS01 || {};
const assistedEnded = view.history.find((session) => session.sessionId === assistedOldSessionId);
record("Two errors followed by child correction ends the old session at early-rest", !view.active && assistedEnded?.endReason === "early-rest" && view.leaves[0] && assistedEvidence.needsPractice === true && assistedEvidence.assisted === true && assistedEvidence.modeled === false, { view, assistedEvidence, assistedEnded });
record("Assisted-correct route preserves Chapter 1/2 evidence and creates no LS01 mastery", gardenMasteryIsClean(view) && chapter12SentinelPreserved(view), view.learningStats);
record("Assisted-correct map uses 1/3 Chapter 3 rest identity", view.mapChapter === "当前章节：呼吸花园" && view.mapProgress.includes("嫩芽 1/3") && view.mapProgress.includes("休息") && !view.mapProgress.includes("基地"), view);
record("LS02 resume marker names the second leaf consistently", view.markerStrong === "第二片叶" && view.markerSmall === "继续第二片叶" && view.markerAria === "第二片叶，继续第二片叶", view);
await assistedCorrect.page.screenshot({ path: path.join(screenshotDir, "map_copy_ls02_resume_1194x834_dpr2.png") });
await assistedCorrect.page.locator("#gardenRestMarker").click();
await assistedCorrect.page.waitForTimeout(180);
view = await snapshot(assistedCorrect.page);
record("Assisted-correct resume creates a new session containing LS02 only", view.active?.sessionId !== assistedOldSessionId && view.active?.resumeOfSessionId === assistedOldSessionId && view.active?.actions?.length === 1 && view.active.actions[0]?.targetId === "LS02" && view.lesson === "LS02" && view.leaves[0], view);
await assistedCorrect.page.screenshot({ path: path.join(screenshotDir, "LS02_resume_1194x834_dpr2.png") });
await assistedCorrect.context.close();

const assistedModeled = await makePage();
await seed(assistedModeled.page, baseRuntime(), chapter12Sentinel);
await assistedModeled.page.locator("#gardenRestMarker").click();
await assistedModeled.page.waitForTimeout(1450);
const modeledOldSessionId = (await snapshot(assistedModeled.page)).active?.sessionId;
await assistedModeled.page.locator('.key.white-key[data-midi="62"]').click();
await assistedModeled.page.waitForTimeout(90);
await assistedModeled.page.locator('.key.white-key[data-midi="64"]').click();
await assistedModeled.page.waitForTimeout(90);
await assistedModeled.page.locator('.key.white-key[data-midi="62"]').click();
await assistedModeled.page.waitForTimeout(1250);
view = await snapshot(assistedModeled.page);
const modeledEvidence = view.chapter3?.lessonEvidence?.LS01 || {};
const modeledEnded = view.history.find((session) => session.sessionId === modeledOldSessionId);
record("Assisted retry failure triggers bounded modeled completion and early-rest", !view.active && modeledEnded?.endReason === "early-rest" && view.leaves[0] && modeledEvidence.modeled === true && modeledEvidence.needsPractice === true && modeledEvidence.childCorrectCount === 0 && modeledEvidence.modeledInputs?.[0]?.source === "model", { view, modeledEvidence, modeledEnded });
record("Modeled input does not enter child input routes or stable/retained", Object.values(modeledEvidence.inputRoutes || {}).reduce((sum, count) => sum + count, 0) === 3 && modeledEvidence.reviewableForMastery === false, modeledEvidence);
record("Modeled route leaves Chapter 1/2 mastery storage untouched", gardenMasteryIsClean(view) && chapter12SentinelPreserved(view), view.learningStats);
await assistedModeled.page.locator("#gardenRestMarker").click();
await assistedModeled.page.waitForTimeout(180);
view = await snapshot(assistedModeled.page);
record("Modeled route resumes in a new LS02-only session", view.active?.sessionId !== modeledOldSessionId && view.active?.resumeOfSessionId === modeledOldSessionId && view.active?.actions?.length === 1 && view.active.actions[0]?.targetId === "LS02", view);
await assistedModeled.context.close();

const longWait = await makePage();
await seed(longWait.page, baseRuntime(), chapter12Sentinel);
await longWait.page.locator("#gardenRestMarker").click();
await longWait.page.waitForTimeout(1450);
const longWaitOldSessionId = (await snapshot(longWait.page)).active?.sessionId;
await longWait.page.waitForTimeout(20200);
await longWait.page.waitForTimeout(1200);
view = await snapshot(longWait.page);
const longWaitEvidence = view.chapter3?.lessonEvidence?.LS01 || {};
record("A wide twenty-second LS01 wait models only the current leaf and ends early", !view.active && view.history.some((session) => session.sessionId === longWaitOldSessionId && session.endReason === "early-rest") && view.leaves[0] && longWaitEvidence.modeled === true && longWaitEvidence.completionSource === "model" && longWaitEvidence.needsPractice === true, { view, longWaitEvidence });
record("Long-wait route preserves Chapter 1/2 evidence and creates no garden mastery", gardenMasteryIsClean(view) && chapter12SentinelPreserved(view), view.learningStats);
await longWait.page.locator("#gardenRestMarker").click();
await longWait.page.waitForTimeout(180);
view = await snapshot(longWait.page);
record("Long-wait resume creates a new LS02-only session", view.active?.sessionId !== longWaitOldSessionId && view.active?.resumeOfSessionId === longWaitOldSessionId && view.active?.actions?.length === 1 && view.active.actions[0]?.targetId === "LS02", view);
await longWait.context.close();

const voluntary = await makePage();
await seed(voluntary.page, baseRuntime(), chapter12Sentinel);
await voluntary.page.locator("#gardenRestMarker").click();
await voluntary.page.waitForTimeout(1450);
const voluntaryOldSessionId = (await snapshot(voluntary.page)).active?.sessionId;
await voluntary.page.locator('.key.white-key[data-midi="60"]').click();
await voluntary.page.waitForTimeout(180);
await voluntary.page.locator("#mapReturn").click();
await voluntary.page.waitForTimeout(1250);
view = await snapshot(voluntary.page);
record("A voluntary rest after leaf one ends the old session without labeling ordinary pace as difficulty", !view.active && view.history.some((session) => session.sessionId === voluntaryOldSessionId && session.endReason === "early-rest") && view.leaves[0] && view.chapter3?.lessonEvidence?.LS01?.needsPractice === false, view);
record("A real leaf-one completion is the first voluntary return that points to LS02", view.markerStrong === "第二片叶" && view.markerSmall === "继续第二片叶" && view.markerAria === "第二片叶，继续第二片叶" && view.chapter3?.resume?.nextTargetId === "LS02", view);
record("Voluntary rest preserves Chapter 1/2 evidence and creates no garden mastery", gardenMasteryIsClean(view) && chapter12SentinelPreserved(view), view.learningStats);
await voluntary.page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await voluntary.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
view = await snapshot(voluntary.page);
record("Refreshing the early-rest map preserves leaf one and no active session", !view.active && view.chapter3?.leaves?.[0] === true && view.markerState === "resume" && view.mapProgress.includes("嫩芽 1/3"), view);
await voluntary.page.locator("#gardenRestMarker").click();
await voluntary.page.waitForTimeout(180);
view = await snapshot(voluntary.page);
record("Voluntary-rest resume creates a fresh LS02-only session", view.active?.sessionId !== voluntaryOldSessionId && view.active?.resumeOfSessionId === voluntaryOldSessionId && view.active?.actions?.length === 1 && view.active.actions[0]?.targetId === "LS02", view);
await voluntary.context.close();

const recovery = await makePage();
await seed(recovery.page);
await installAirStateObserver(recovery.page);
const recoveryScanningObserved = waitForAirState(recovery.page, "scanning");
await recovery.page.locator("#gardenRestMarker").click();
await recoveryScanningObserved;
const scanning = await snapshot(recovery.page);
await recovery.page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await recovery.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
await recovery.page.waitForTimeout(240);
view = await snapshot(recovery.page);
record("Refreshing a scanning entry recovers to the same safe-open state", scanning.airState === "scanning" && view.airState === "safe-open" && view.active?.sessionId === scanning.active?.sessionId, { scanning, recovered: view });
record("Scanning refresh recovery uses the same garden-mode runtime asset", view.gardenCharacterSrc.endsWith("xingya-garden-invite-v1.webp") && view.gardenCharacterAssetState === "garden-mode", view);
await recovery.context.close();

const reduced = await makePage();
await reduced.page.goto(targetUrl(), { waitUntil: "domcontentloaded", timeout: 12000 });
await reduced.page.evaluate((runtime) => {
  localStorage.clear();
  localStorage.setItem("starDinoSessionRuntime", JSON.stringify(runtime));
  localStorage.setItem("starDinoMotionSettings", JSON.stringify({ reduced: true }));
}, baseRuntime());
await reduced.page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await reduced.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
await reduced.page.locator("#gardenRestMarker").click();
await reduced.page.waitForTimeout(160);
view = await snapshot(reduced.page);
record("Reduced motion converges directly to the same safe-open equipment state", view.airState === "safe-open" && view.chapter3?.airCheckComplete === true, view);
record("Reduced motion uses the same garden-mode runtime asset", view.gardenCharacterSrc.endsWith("xingya-garden-invite-v1.webp") && view.gardenCharacterAssetState === "garden-mode", view);
await reduced.context.close();

const debug = await makePage();
await debug.page.goto(targetUrl("?mode=garden"), { waitUntil: "domcontentloaded", timeout: 20000 });
await debug.page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
view = await snapshot(debug.page);
record("A garden debug URL cannot create a formal session", !view.active && !view.history.some((item) => item.bundleId?.startsWith("C3-")), view);
await debug.context.close();

record("Chapter 3 test run has no browser warnings or errors", browserErrors.length === 0, { browserErrors });
await browser.close();

const failed = checks.filter((check) => !check.pass);
console.log(JSON.stringify({ passed: checks.length - failed.length, total: checks.length, failed, browserErrors }, null, 2));
if (failed.length) process.exitCode = 1;
