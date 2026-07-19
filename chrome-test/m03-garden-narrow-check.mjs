import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/m03_garden_340a";
fs.mkdirSync(screenshotDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function url(search = "") {
  const target = new URL(baseUrl);
  target.search = search;
  return target.toString();
}

async function makePage(viewport = { width: 1024, height: 768, deviceScaleFactor: 1 }) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor || 1
  });
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  });
  page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", text: error.message, url: page.url() }));
  return page;
}

async function waitReady(page, selector) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 6000 });
  await page.waitForTimeout(200);
}

async function waitM03AudioPhase(page, phase, timeout = 10000) {
  await page.waitForFunction((expected) => document.querySelector("#appShell")?.dataset.teachingAudioPhase === expected, phase, { timeout });
}

async function seedStorage(page, values) {
  await page.goto(url(), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.evaluate((entries) => {
    localStorage.clear();
    Object.entries(entries).forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
  }, values);
}

function endedC203({ assisted = 0, modeled = 0, stable = false } = {}) {
  return {
    sessionId: `C2-03-${assisted}-${modeled}-${stable}`,
    bundleId: "C2-03",
    status: "ended",
    actionIndex: 0,
    actions: [{ actionId: "S01-check", kind: "staff", targetId: "S01", runMode: "check" }],
    completedActions: [{
      actionId: "S01-check",
      kind: "staff",
      targetId: "S01",
      runMode: "check",
      assistedSuccesses: assisted,
      modeledSuccesses: modeled,
      qualifyingStable: stable
    }],
    endedAt: "2026-07-12T06:00:00.000Z",
    endReason: modeled || assisted ? "assisted-safe-rest" : "natural-rest"
  };
}

async function readGarden(page) {
  return page.evaluate(() => {
    const marker = document.querySelector("#gardenRestMarker");
    const isVisible = (element) => {
      if (!element || element.hidden) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const runtime = JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}");
    return {
      visible: isVisible(marker),
      tagName: marker?.tagName,
      role: marker?.getAttribute("role"),
      ariaCurrent: marker?.getAttribute("aria-current"),
      tabIndex: marker?.tabIndex,
      text: marker?.innerText?.replace(/\s+/g, " ").trim(),
      activeNodes: [...document.querySelectorAll(".map-node.active")].map((node) => node.dataset.level || node.dataset.screen),
      currentNodes: [...document.querySelectorAll("[aria-current]")].map((node) => node.id || node.dataset.level || node.dataset.screen),
      actionBadges: [...document.querySelectorAll(".node-action-badge")].map((node) => node.textContent?.trim()),
      activeSession: runtime.active || null,
      historyCount: runtime.history?.length || 0,
      audioContexts: window.__testAudioContexts || 0,
      href: location.href
    };
  });
}

const m03Page = await makePage();
await m03Page.goto(url("?level=M03&check=m03-garden-339d"), { waitUntil: "domcontentloaded", timeout: 12000 });
await waitReady(m03Page, "#keyboard");
await m03Page.waitForFunction(() => !document.querySelector(".level-intro-card"), null, { timeout: 6000 });

const readM03 = () => m03Page.evaluate(() => {
  const visible = (element) => {
    if (!element || element.hidden) return false;
    let node = element;
    while (node instanceof Element) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
      node = node.parentElement;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  const selectors = ["#mainTitle", "#chapterTitle", "#levelTitle", "#levelPrompt", "#m03WheelReplay", "#m03InstructionStatus", "#coachBubble", "#dinoHint", "#modeHint", "#nextAction", "#stageStoryRibbon", ".listen-guide", "#feedback", "#keyboard", "#buildBlueprint"];
  const surfaces = selectors.flatMap((selector) => [...document.querySelectorAll(selector)].filter(visible).map((element) => ({ selector, text: element.innerText?.replace(/\s+/g, " ").trim() || "", aria: element.getAttribute("aria-label") || "" })));
  const allVisibleText = surfaces.map((item) => `${item.text} ${item.aria}`).join(" | ");
  return {
    version: document.querySelector('script[src*="app.js"]')?.src || "",
    identityHidden: document.querySelector("#appShell")?.dataset.listeningIdentityHidden,
    targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible,
    idleStage: document.querySelector("#appShell")?.dataset.idleHint,
    surfaces,
    allVisibleText,
    storyVisible: visible(document.querySelector("#stageStoryRibbon")),
    guideVisible: visible(document.querySelector(".listen-guide")),
    coach: document.querySelector("#coachBubble")?.innerText?.replace(/\s+/g, " ").trim() || "",
    replay: document.querySelector("#m03WheelReplay")?.innerText?.replace(/\s+/g, " ").trim() || "",
    targetKey: document.querySelector(".key.target")?.innerText?.replace(/\s+/g, " ").trim() || ""
  };
});

const answerCarrierText = (snapshot) => snapshot.surfaces
  .filter((surface) => surface.selector !== "#keyboard")
  .map((surface) => `${surface.text} ${surface.aria}`)
  .join(" | ");

const initial = await readM03();
record("M03 runs the 347a R01A shell", initial.version.includes("overhaul-347a-c4-r01a"), initial);
record("M03 uses the wheel identity and removes the seed identity", initial.allVisibleText.includes("会唱小车轮") && !initial.allVisibleText.includes("听音小种子"), initial);
record("M03 initial state has no duplicate story ribbon or listening guide", !initial.storyVisible && !initial.guideVisible, initial);
record("M03 initial coach gives one role-correct invitation", initial.coach.includes("小车轮先唱") && initial.coach.includes("你弹同样的键") && !initial.coach.includes("星芽唱"), initial);
record("M03 initial replay control is explicit", initial.replay.includes("再听车轮"), initial);
record("M03 initial state hides D/Re and the target locator", initial.identityHidden === "true" && initial.targetVisible === "false" && !/(^|\s)(D|Re)(\s|$)/.test(answerCarrierText(initial)) && !answerCarrierText(initial).includes("两黑键中间"), initial);
record("M03 visible and ARIA copy has no mixed singing label", !initial.allVisibleText.includes("唱 Re/D") && !initial.allVisibleText.includes("唱 Do/C"), initial);
await m03Page.screenshot({ path: path.join(screenshotDir, "M03_initial_1024x768.png") });

await m03Page.locator("#m03WheelReplay").click();
await waitM03AudioPhase(m03Page, "awaiting-response");
const replayed = await readM03();
record("M03 replay keeps the answer hidden", replayed.identityHidden === "true" && replayed.targetVisible === "false" && !/(^|\s)(D|Re)(\s|$)/.test(answerCarrierText(replayed)), replayed);

await m03Page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "identity", null, { timeout: 9000 });
const idle = await readM03();
record("M03 idle remains a wheel replay without identity or locator", idle.idleStage === "identity" && idle.coach.includes("小车轮再唱") && idle.identityHidden === "true" && idle.targetVisible === "false" && !/(^|\s)(D|Re)(\s|$)/.test(answerCarrierText(idle)), idle);
await waitM03AudioPhase(m03Page, "awaiting-response");

await m03Page.locator('.key.white-key[data-midi="60"]').click();
await waitM03AudioPhase(m03Page, "wrong-repair-playing");
const wrongD = await readM03();
record("M03 first error names the wheel and piano roles correctly", wrongD.coach.includes("轮子唱 Re") && wrongD.coach.includes("你来弹 D") && !wrongD.coach.includes("星芽") && !wrongD.coach.includes("唱 Re/D"), wrongD);
record("M03 first error reveals only the repair target key", wrongD.targetVisible === "true" && wrongD.targetKey.includes("D"), wrongD);
await m03Page.screenshot({ path: path.join(screenshotDir, "M03_wrong_D_1024x768.png") });
await waitM03AudioPhase(m03Page, "awaiting-response");

await m03Page.locator('.key.white-key[data-midi="62"]').click();
await waitM03AudioPhase(m03Page, "awaiting-response");
const afterD = await readM03();
record("M03 D success advances to a hidden C listening step", afterD.identityHidden === "true" && afterD.targetVisible === "false" && afterD.coach.includes("小车轮先唱") && !afterD.coach.includes("Do") && !afterD.coach.includes("C"), afterD);

await m03Page.locator('.key.white-key[data-midi="62"]').click();
await waitM03AudioPhase(m03Page, "wrong-repair-playing");
const wrongC = await readM03();
record("M03 C repair keeps the same role language", wrongC.coach.includes("轮子唱 Do") && wrongC.coach.includes("你来弹 C") && !wrongC.coach.includes("唱 Do/C"), wrongC);
await waitM03AudioPhase(m03Page, "awaiting-response");

await m03Page.locator('.key.white-key[data-midi="60"]').click();
await m03Page.waitForSelector(".m03-wheel-complete", { state: "visible", timeout: 6000 });
await m03Page.waitForTimeout(220);
const completionState = await m03Page.evaluate(() => {
  const visible = (element) => {
    if (!element) return false;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return !element.hidden && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
  };
  return {
    sceneResultVisible: visible(document.querySelector(".m03-wheel-complete")),
    modalVisible: visible(document.querySelector("#resultModal")),
    coach: document.querySelector("#coachBubble")?.innerText?.replace(/\s+/g, " ").trim() || "",
    status: document.querySelector("#m03InstructionStatus")?.textContent?.trim() || "",
    transientCount: [...document.querySelectorAll(".key-press-label, .note-feedback-burst, .sprite-effect, .music-flight, .music-flight-landing, .stage-confetti-effect, .flying-part")].filter(visible).length
  };
});
record("M03 completion stays in the scene without a full-screen modal", completionState.sceneResultVisible && !completionState.modalVisible && completionState.coach.includes("小车准备好了") && completionState.status.includes("两个车轮"), completionState);
record("M03 completion has no floating labels, bursts, flights, sprites, or confetti", completionState.transientCount === 0, completionState);
await m03Page.screenshot({ path: path.join(screenshotDir, "M03_complete_1024x768.png") });
await m03Page.waitForURL((target) => target.searchParams.get("level") === "M04", { timeout: 5000 });
record("M03 debug flow still advances automatically without a button", new URL(m03Page.url()).searchParams.get("level") === "M04", { url: m03Page.url() });
await m03Page.close();

const mapCases = [
  { id: "before", history: [], visible: false },
  { id: "clean", history: [endedC203({ stable: true })], visible: true },
  { id: "assisted", history: [endedC203({ assisted: 1 })], visible: true },
  { id: "modeled", history: [endedC203({ modeled: 1 })], visible: true },
  { id: "debug-isolated", history: [], visible: false, debugStats: true }
];

for (const spec of mapCases) {
  const page = await makePage({ width: 1194, height: 834, deviceScaleFactor: 2 });
  const storage = {
    starDinoSessionRuntime: { version: 1, active: null, history: spec.history, lastRest: null }
  };
  if (spec.debugStats) {
    storage.starDinoLearningStats = { version: 3, levels: { M08: { completions: 1 } }, staff: { S01: { completions: 1 } }, retention: { stableEvents: [], retainedEvents: [], observationEvents: [], clockInvalidEvents: [] } };
  }
  await seedStorage(page, storage);
  await page.addInitScript(() => { window.__testAudioContexts = 0; });
  await page.goto(url("?screen=map"), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(page, "#mapShell");
  const state = await readGarden(page);
  record(`garden ${spec.id}: visibility follows formal ended C2-03 history`, state.visible === spec.visible, state);
  if (spec.visible) {
    record(`garden ${spec.id}: marker is the explicit Chapter 3 entry button`, state.tagName === "BUTTON" && state.role === null && state.ariaCurrent === "location" && state.tabIndex === 0, state);
    record(`garden ${spec.id}: no old route remains current`, state.activeNodes.length === 0 && state.currentNodes.length === 1 && state.currentNodes[0] === "gardenRestMarker" && state.actionBadges.length === 0, state);
    record(`garden ${spec.id}: no autoplay or Chapter 3 session starts before the click`, state.audioContexts === 0 && state.activeSession === null && state.historyCount === 1, state);
  }
  if (spec.id === "clean") await page.screenshot({ path: path.join(screenshotDir, "garden_clean_1194x834_dpr2.png") });
  await page.close();
}

const refreshPage = await makePage({ width: 1366, height: 1024, deviceScaleFactor: 2 });
await seedStorage(refreshPage, { starDinoSessionRuntime: { version: 1, active: null, history: [endedC203({ modeled: 1 })], lastRest: null } });
await refreshPage.goto(url(), { waitUntil: "domcontentloaded", timeout: 12000 });
await waitReady(refreshPage, "#mapShell");
const rootState = await readGarden(refreshPage);
await refreshPage.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
await waitReady(refreshPage, "#mapShell");
const refreshedState = await readGarden(refreshPage);
record("garden survives root reopen and refresh", rootState.visible && refreshedState.visible && refreshedState.activeSession === null, { rootState, refreshedState });
await refreshPage.screenshot({ path: path.join(screenshotDir, "garden_refresh_1366x1024_dpr2.png") });
await refreshPage.close();

record("browser console is clean", browserErrors.length === 0, { browserErrors });
await browser.close();

const failed = checks.filter((check) => !check.pass);
fs.writeFileSync(path.join(screenshotDir, "result.json"), JSON.stringify({ total: checks.length, passed: checks.length - failed.length, failed, browserErrors }, null, 2));
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`M03 + garden narrow checks: ${checks.length - failed.length}/${checks.length} passed`);
if (failed.length) process.exit(1);
