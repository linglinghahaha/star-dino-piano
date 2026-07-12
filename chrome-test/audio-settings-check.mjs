import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/audio_settings_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const context = await browser.newContext({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});
const page = await context.newPage();

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
});

async function waitReady() {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector("#appShell", { state: "visible", timeout: 6000 });
}

async function openParentPanel() {
  await page.locator("#playParentGate").click();
  await page.waitForSelector("#parentModal", { state: "visible", timeout: 3000 });
}

async function readAudioState() {
  return page.evaluate(() => ({
    enabled: document.documentElement.dataset.soundEnabled,
    volume: document.documentElement.dataset.soundVolume,
    mix: document.documentElement.dataset.audioMix,
    togglePressed: document.querySelector("#parentSoundToggle")?.getAttribute("aria-pressed"),
    toggleText: document.querySelector("#parentSoundState")?.textContent,
    sliderValue: document.querySelector("#parentVolumeControl")?.value,
    sliderMax: document.querySelector("#parentVolumeControl")?.max,
    sliderDisabled: document.querySelector("#parentVolumeControl")?.disabled,
    output: document.querySelector("#parentVolumeValue")?.textContent,
    stored: JSON.parse(localStorage.getItem("starDinoAudioSettings") || "null")
  }));
}

try {
  const url = new URL(rootUrl);
  url.search = "?level=M03&check=audio-settings-320a";
  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady();
  await openParentPanel();

  const initial = await readAudioState();
  record("initial sound is enabled", initial.enabled === "true" && initial.togglePressed === "true", initial);
  record("initial volume is 60%", initial.volume === "60" && initial.sliderValue === "60" && initial.output === "60%", initial);
  record("audio mix is note-priority", initial.mix === "note-priority", initial);
  record("volume control caps at 70%", initial.sliderMax === "70", initial);

  await page.locator("#parentSoundToggle").click();
  const muted = await readAudioState();
  record("sound toggle mutes game audio", muted.enabled === "false" && muted.togglePressed === "false" && muted.toggleText === "关", muted);
  record("muted state disables volume slider", muted.sliderDisabled === true, muted);
  record("muted preference is stored", muted.stored?.enabled === false && muted.stored?.volume === 0.6, muted);

  await page.reload({ waitUntil: "domcontentloaded" });
  await waitReady();
  await openParentPanel();
  const mutedReload = await readAudioState();
  record("muted preference survives reload", mutedReload.enabled === "false" && mutedReload.sliderDisabled === true, mutedReload);

  await page.locator("#parentSoundToggle").click();
  await page.locator("#parentVolumeControl").evaluate((control) => {
    control.value = "35";
    control.dispatchEvent(new Event("input", { bubbles: true }));
    control.dispatchEvent(new Event("change", { bubbles: true }));
  });
  const adjusted = await readAudioState();
  record("sound can be re-enabled", adjusted.enabled === "true" && adjusted.sliderDisabled === false, adjusted);
  record("volume adjustment updates UI and storage", adjusted.volume === "35" && adjusted.output === "35%" && adjusted.stored?.volume === 0.35, adjusted);

  const geometry = await page.evaluate(() => {
    const card = document.querySelector(".parent-card")?.getBoundingClientRect();
    const controls = document.querySelector(".parent-audio-controls")?.getBoundingClientRect();
    return {
      card: card ? { left: card.left, right: card.right, top: card.top, bottom: card.bottom } : null,
      controls: controls ? { left: controls.left, right: controls.right, top: controls.top, bottom: controls.bottom } : null,
      viewport: { width: innerWidth, height: innerHeight },
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    };
  });
  record(
    "audio controls stay inside the parent panel",
    geometry.card && geometry.controls && geometry.controls.left >= geometry.card.left && geometry.controls.right <= geometry.card.right && !geometry.horizontalOverflow,
    geometry
  );

  await page.screenshot({ path: `${screenshotPrefix}_parent.png`, fullPage: false });

  await page.reload({ waitUntil: "domcontentloaded" });
  await waitReady();
  const persisted = await page.evaluate(() => ({
    enabled: document.documentElement.dataset.soundEnabled,
    volume: document.documentElement.dataset.soundVolume,
    stored: JSON.parse(localStorage.getItem("starDinoAudioSettings") || "null")
  }));
  record("adjusted volume survives reload", persisted.enabled === "true" && persisted.volume === "35" && persisted.stored?.volume === 0.35, persisted);
  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
});
console.log(`audio settings checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
