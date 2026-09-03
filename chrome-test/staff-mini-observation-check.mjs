import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4173/";
const shotPrefix = process.argv[3] || "screenshots/s01_mini_303a";
const storageKeys = ["starDinoCompletedLevels", "starDinoLearningStats"];

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

await page.addInitScript((keys) => {
  keys.forEach((key) => localStorage.removeItem(key));
}, storageKeys);

const makeUrl = (query) => {
  const url = new URL(baseUrl);
  url.search = query;
  return url.toString();
};

const record = (name, pass, details = {}) => {
  checks.push({ name, pass: Boolean(pass), details });
};

const waitReady = async () => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(".staff-panel", { state: "visible", timeout: 8000 });
  await page.waitForTimeout(260);
};

const screenshot = async (name) => {
  const path = `${shotPrefix}_${name}.png`;
  await page.screenshot({ path, fullPage: false });
  return path;
};

const tapMidi = async (midi, delay = 720) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
};

const readMiniState = async () => page.evaluate(() => {
  const text = (selector) => document.querySelector(selector)?.textContent?.trim() || "";
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y),
      w: Math.round(r.width),
      h: Math.round(r.height)
    };
  };
  const currentPad = document.querySelector(".staff-step.current");
  const currentPlace = currentPad?.querySelector(".staff-place");
  const placeStyle = currentPlace ? getComputedStyle(currentPlace) : null;
  const currentPadVisual = {
    pad: rect(currentPad),
    label: rect(currentPad?.querySelector(".staff-note-label strong")),
    noteName: rect(currentPad?.querySelector(".staff-note-name")),
    place: rect(currentPlace),
    placeDisplay: placeStyle?.display || "",
    placeOpacity: placeStyle ? Number(placeStyle.opacity) : 0,
    placeVisible: Boolean(
      currentPlace &&
      placeStyle?.display !== "none" &&
      Number(placeStyle?.opacity || 0) > 0.01 &&
      currentPlace.getBoundingClientRect().width > 0 &&
      currentPlace.getBoundingClientRect().height > 0
    )
  };
  const steps = [...document.querySelectorAll(".staff-step")].map((el) => ({
    state: el.dataset.stepState,
    midi: el.dataset.midi,
    miniRest: el.dataset.miniRest,
    className: el.className,
    text: el.textContent.trim()
  }));
  const rest = document.querySelector(".staff-finish[data-destination='mini-rest']");
  const restStyle = rest ? getComputedStyle(rest) : null;
  const modal = document.querySelector("#resultModal");
  const stats = JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}");
  return {
    url: location.href,
    appStaffSession: document.querySelector("#appShell")?.dataset.staffSession || "",
    yardStaffSession: document.querySelector(".moon-yard")?.dataset.staffSession || "",
    appScaffold: document.querySelector("#appShell")?.dataset.scaffold || "",
    levelBadge: text("#levelBadge"),
    chapterTitle: text("#chapterTitle"),
    modeHint: text("#modeHint"),
    staffPrompt: text("#staffPrompt"),
    nextAction: text("#nextAction"),
    dinoPlace: document.querySelector("#staffDinoWrap")?.dataset.place || "",
    keyboardTargetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
    stepCount: steps.length,
    doneCount: steps.filter((step) => step.state === "done").length,
    currentCount: steps.filter((step) => step.state === "current").length,
    miniRestCount: steps.filter((step) => step.miniRest === "true").length,
    restDestinationVisible: Boolean(rest && restStyle?.display !== "none" && Number(restStyle?.opacity || 0) > 0.01 && rest.getBoundingClientRect().width > 0),
    restDestinationInteractive: Boolean(rest?.matches("button, a, input, [tabindex]:not([tabindex='-1'])")),
    steps,
    progressDots: document.querySelectorAll(".staff-progress .staff-dot").length,
    modalHidden: modal?.hidden ?? true,
    resultKind: modal?.dataset.result || "",
    resultTitle: text("#resultModal h2"),
    resultAuto: text("#resultModal .auto-next span"),
    resultText: text("#resultText"),
    staffStats: stats.staff || {},
    currentPadVisual,
    bodyOverflowX: document.documentElement.scrollWidth - window.innerWidth
  };
});

try {
  await page.goto(makeUrl("?mode=staff&session=mini&check=s01-mini-303a"), {
    waitUntil: "domcontentloaded",
    timeout: 12000
  });
  await waitReady();

  let state = await readMiniState();
  record("initial keeps mini session in URL", state.url.includes("session=mini"), state);
  record("initial app dataset is mini", state.appStaffSession === "mini" && state.yardStaffSession === "mini", state);
  record("initial renders exactly three staff pads", state.stepCount === 3 && state.progressDots === 3, state);
  record("initial separates the rest star from all three staff pads", state.miniRestCount === 0 && state.restDestinationVisible && !state.restDestinationInteractive, state);
  record("initial uses mini badge and copy", state.levelBadge === "S01·短" && state.modeHint.includes("观察小段"), state);
  record("initial has no horizontal overflow", state.bodyOverflowX <= 2, state);
  record("initial hides staff-position word on current pad", !state.currentPadVisual.placeVisible, state.currentPadVisual);
  await screenshot("initial");

  await tapMidi(62, 560);
  state = await readMiniState();
  record("wrong input does not complete mini", state.modalHidden && state.doneCount === 0 && state.currentCount === 1, state);
  record("wrong input still keeps three pads and the separate rest star", state.stepCount === 3 && state.miniRestCount === 0 && state.restDestinationVisible, state);
  record(
    "wrong input shows compact staff-position capsule",
    state.currentPadVisual.placeVisible &&
      state.currentPadVisual.place?.w <= 96 &&
      state.currentPadVisual.place?.h <= 24,
    state.currentPadVisual
  );
  await screenshot("wrong_d");

  await tapMidi(60);
  await tapMidi(62);
  await tapMidi(64);
  await page.waitForTimeout(260);

  state = await readMiniState();
  record("completion remains at the mini-rest scene without a result modal", state.modalHidden && state.dinoPlace === "mini-rest" && state.doneCount === 3, state);
  record("completion labels the mini rest through the staff world rather than a result card", state.nextAction.includes("休息"), state);
  record("completion does not write full S01 staff stats", !state.staffStats.S01, state);
  record("completion leaves dino at mini rest", state.dinoPlace === "mini-rest", state);
  record("completion keeps mini URL", state.url.includes("session=mini"), state);
  await screenshot("result");

  await page.waitForTimeout(3800);
  state = await readMiniState();
  record("mini does not auto-enter staff-check", state.modalHidden && state.appScaffold === "staff" && state.dinoPlace === "mini-rest", state);
  record("mini still has no full S01 stats after pause", !state.staffStats.S01, state);

  const beforeInactiveModalClick = state;
  await page.evaluate(() => document.querySelector("#modalNext")?.click());
  await page.waitForTimeout(180);
  state = await readMiniState();
  record("hidden legacy result control cannot take over the mini route", state.modalHidden && state.doneCount === beforeInactiveModalClick.doneCount && state.dinoPlace === "mini-rest", state);
  record("hidden legacy result control still does not write full S01 stats", !state.staffStats.S01, state);

  record("browser console clean", browserErrors.length === 0, { browserErrors });

  const failed = checks.filter((check) => !check.pass);
  for (const check of checks) {
    console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
    if (!check.pass) console.log(JSON.stringify(check.details, null, 2));
  }
  console.log(`staff-mini checks: ${checks.length - failed.length} passed, ${failed.length} failed`);
  if (failed.length) process.exitCode = 1;
} finally {
  await browser.close();
}
