import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/motion_settings_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

function watchPage(page, label) {
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ label, type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ label, type: "pageerror", text: error.message, url: page.url() });
  });
}

async function waitReady(page) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector("#keyboard", { state: "visible", timeout: 6000 });
}

async function openParentPanel(page) {
  if (await page.locator("#parentModal").isVisible()) return;
  await page.locator("#playParentGate").evaluate((button) => button.click());
  await page.waitForSelector("#parentModal", { state: "visible", timeout: 3000 });
  await page.locator(".parent-motion-setting").scrollIntoViewIfNeeded();
}

async function closeParentPanel(page) {
  if (!(await page.locator("#parentModal").isVisible())) return;
  await page.locator("#parentClose").click();
  await page.waitForSelector("#parentModal", { state: "hidden", timeout: 3000 });
}

async function readMotionState(page) {
  return page.evaluate(() => {
    const toggle = document.querySelector("#parentMotionToggle");
    const row = document.querySelector(".parent-motion-setting")?.getBoundingClientRect();
    const card = document.querySelector(".parent-card")?.getBoundingClientRect();
    const toggleRect = toggle?.getBoundingClientRect();
    return {
      motion: document.documentElement.dataset.motion,
      source: document.documentElement.dataset.motionSource,
      pressed: toggle?.getAttribute("aria-pressed"),
      disabled: Boolean(toggle?.disabled),
      text: document.querySelector("#parentMotionState")?.textContent,
      stored: JSON.parse(localStorage.getItem("starDinoMotionSettings") || "null"),
      row: row ? { left: row.left, right: row.right, top: row.top, bottom: row.bottom } : null,
      card: card ? { left: card.left, right: card.right, top: card.top, bottom: card.bottom } : null,
      toggle: toggleRect ? { width: toggleRect.width, height: toggleRect.height } : null,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    };
  });
}

async function readAnimationState(page) {
  return page.evaluate(() => {
    const styleOf = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        animationName: style.animationName,
        animationDuration: style.animationDuration,
        transitionDuration: style.transitionDuration,
        display: style.display,
        opacity: style.opacity
      };
    };
    return {
      coach: styleOf("#coachDino"),
      staffGuide: styleOf("#staffJumpGuidePath"),
      staffFootprint: styleOf("#staffJumpFootprints span"),
      roofRing: styleOf(".roof-route-node.current .roof-route-pad-ring")
    };
  });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

let standardContext;
let systemContext;

try {
  standardContext = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference"
  });
  const page = await standardContext.newPage();
  watchPage(page, "parent-toggle");

  const levelUrl = new URL(rootUrl);
  levelUrl.search = "?level=FG04&check=motion-322a";
  await page.goto(levelUrl.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(page);
  await page.evaluate(() => localStorage.removeItem("starDinoMotionSettings"));
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitReady(page);
  await openParentPanel(page);

  const initial = await readMotionState(page);
  record("default motion is full when the device has no reduced-motion preference", initial.motion === "full" && initial.source === "default" && initial.pressed === "false" && initial.text === "关", initial);
  record("motion toggle has a 44px touch target", initial.toggle?.height >= 44 && initial.toggle?.width >= 44, initial.toggle);
  record("motion setting stays inside the parent panel", initial.row && initial.card && initial.row.left >= initial.card.left && initial.row.right <= initial.card.right && !initial.horizontalOverflow, initial);
  await page.screenshot({ path: `${screenshotPrefix}_parent_full.png`, fullPage: false });

  await page.locator("#parentMotionToggle").evaluate((button) => button.click());
  const reduced = await readMotionState(page);
  record("parent can enable reduced motion", reduced.motion === "reduced" && reduced.source === "parent" && reduced.pressed === "true" && reduced.text === "开", reduced);
  record("parent reduced-motion preference is stored", reduced.stored?.reduced === true, reduced.stored);
  await page.screenshot({ path: `${screenshotPrefix}_parent_reduced.png`, fullPage: false });

  await closeParentPanel(page);
  const fKey = page.locator('.key.white-key[data-note="F"]');
  await fKey.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "touch", isPrimary: true, buttons: 1 });
  await page.waitForTimeout(40);
  const pressedKey = await fKey.evaluate((key) => ({
    pressed: key.classList.contains("pressed"),
    transform: getComputedStyle(key).transform,
    transitionDuration: getComputedStyle(key).transitionDuration
  }));
  record("reduced motion keeps immediate physical key depression", pressedKey.pressed && pressedKey.transform !== "none" && pressedKey.transitionDuration.includes("0.001"), pressedKey);
  await fKey.dispatchEvent("pointerup", { pointerId: 1, pointerType: "touch", isPrimary: true, buttons: 0 });

  const targetBeforeWrong = await page.locator(".key.white-key.target").getAttribute("data-note");
  await page.locator('.key.white-key[data-note="C"]').click();
  await page.waitForTimeout(90);
  const wrongState = await page.evaluate(() => {
    const key = document.querySelector('.key.white-key[data-note="C"]');
    const style = getComputedStyle(key);
    const visibleMovingEffects = [...document.querySelectorAll(".sprite-effect, .key-press-label, .note-feedback-burst, .key-touch-ripple")]
      .filter((effect) => getComputedStyle(effect).display !== "none").length;
    return {
      target: document.querySelector(".key.white-key.target")?.dataset.note,
      hitWrong: key.classList.contains("hit-wrong") || key.classList.contains("wrong") || key.classList.contains("program-wrong"),
      outlineStyle: style.outlineStyle,
      animationName: style.animationName,
      visibleMovingEffects
    };
  });
  record("reduced-motion wrong input does not advance", targetBeforeWrong === "F" && wrongState.target === "F", { targetBeforeWrong, wrongState });
  record("wrong feedback remains visible without moving effects", wrongState.hitWrong && wrongState.outlineStyle === "dashed" && wrongState.visibleMovingEffects === 0, wrongState);

  await fKey.click();
  await page.waitForTimeout(90);
  const correctState = await page.evaluate(() => {
    const key = document.querySelector('.key.white-key[data-note="F"]');
    const style = getComputedStyle(key);
    return {
      target: document.querySelector(".key.white-key.target")?.dataset.note,
      hitCorrect: key.classList.contains("hit-correct") || key.classList.contains("correct") || key.classList.contains("program-correct"),
      outlineStyle: style.outlineStyle,
      animationName: style.animationName
    };
  });
  record("correct feedback remains visible without animation", correctState.target === "G" && correctState.hitCorrect && correctState.outlineStyle === "solid" && correctState.animationName === "none", correctState);
  await page.screenshot({ path: `${screenshotPrefix}_reduced_key_feedback.png`, fullPage: false });

  await page.locator('.key.white-key[data-note="G"]').click();
  await page.waitForTimeout(900);
  record("reduced motion preserves FG04 completion", await page.locator("#resultModal").isVisible());

  const staffUrl = new URL(rootUrl);
  staffUrl.search = "?mode=staff&session=mini&check=motion-322a-staff";
  await page.goto(staffUrl.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(page);
  const persisted = await page.evaluate(() => ({
    motion: document.documentElement.dataset.motion,
    source: document.documentElement.dataset.motionSource,
    stored: JSON.parse(localStorage.getItem("starDinoMotionSettings") || "null")
  }));
  const reducedAnimations = await readAnimationState(page);
  record("reduced-motion preference survives navigation and reload", persisted.motion === "reduced" && persisted.source === "parent" && persisted.stored?.reduced === true, persisted);
  record("staff guide and footprints stop continuous animation", reducedAnimations.staffGuide?.animationName === "none" && reducedAnimations.staffFootprint?.animationName === "none", reducedAnimations);
  await page.screenshot({ path: `${screenshotPrefix}_staff_reduced.png`, fullPage: false });

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.locator(".orientation-guard").evaluate((guard) => {
    guard.style.display = "none";
  });
  await openParentPanel(page);
  const portrait = await readMotionState(page);
  record("parent panel geometry stays contained at iPad portrait dimensions", portrait.row && portrait.card && portrait.row.left >= portrait.card.left && portrait.row.right <= portrait.card.right && !portrait.horizontalOverflow, portrait);
  await page.screenshot({ path: `${screenshotPrefix}_ipad_portrait.png`, fullPage: false });

  await page.locator("#parentMotionToggle").evaluate((button) => button.click());
  const restored = await readMotionState(page);
  const fullAnimations = await readAnimationState(page);
  record("parent can restore full motion when the device allows it", restored.motion === "full" && restored.source === "default" && restored.stored?.reduced === false, restored);
  record("full-motion staff guide resumes animation", fullAnimations.staffGuide?.animationName !== "none", fullAnimations);

  await standardContext.close();
  standardContext = null;

  systemContext = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce"
  });
  const systemPage = await systemContext.newPage();
  watchPage(systemPage, "system-preference");
  const systemUrl = new URL(rootUrl);
  systemUrl.search = "?level=M08&check=motion-322a-system";
  await systemPage.goto(systemUrl.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(systemPage);
  await openParentPanel(systemPage);
  const systemState = await readMotionState(systemPage);
  await closeParentPanel(systemPage);
  const systemAnimations = await readAnimationState(systemPage);
  record("device reduced-motion preference is respected automatically", systemState.motion === "reduced" && systemState.source === "system" && systemState.pressed === "true" && systemState.text === "设备", systemState);
  record("device-enforced reduced motion cannot be disabled in the app", systemState.disabled === true && systemState.stored === null, systemState);
  record("M08 continuous route animation stops under device preference", systemAnimations.roofRing?.animationName === "none", systemAnimations);
  await systemPage.screenshot({ path: `${screenshotPrefix}_system_reduced.png`, fullPage: false });

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await standardContext?.close();
  await systemContext?.close();
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`motion settings checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
