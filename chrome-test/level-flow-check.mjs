import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const level = process.argv[2] || "M05";
const sequence = (process.argv[3] || "64,62,60").split(",").map((value) => Number(value.trim()));
const wrongMidi = Number(process.argv[4] || "60");
const baseUrl = process.argv[5] || "http://127.0.0.1:4180/";
const shotPrefix = process.argv[6] || `screenshot_${level.toLowerCase()}_flow`;

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1
});

const browserErrors = [];
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message });
});

const state = async () => page.evaluate(() => {
  const scene = document.querySelector(".base")?.className || "";
  const sceneClass = [...document.querySelectorAll(".base")[0]?.classList || []].find((name) => name.startsWith("scene-"));
  const sceneSelector = sceneClass ? `.${sceneClass}` : ".base";
  return {
    levelBadge: document.querySelector("#levelBadge")?.textContent || "",
    currentTarget: document.querySelector(".key.target strong")?.textContent || "",
    placed: document.querySelectorAll(`${sceneSelector} .build-slot.placed, ${sceneSelector} .build-slot.just-added`).length,
    currentSlots: document.querySelectorAll(`${sceneSelector} .build-slot.current`).length,
    resultVisible: !document.querySelector("#resultModal")?.hidden,
    resultText: document.querySelector("#resultText")?.textContent || "",
    lastWrong: document.querySelector(".key.hit-wrong strong")?.textContent || "",
    lastCorrect: document.querySelector(".key.hit-correct strong")?.textContent || "",
    scene
  };
});

const tapMidi = async (midi) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click();
  await page.waitForTimeout(760);
};

const url = new URL(baseUrl);
url.search = `?level=${level}&check=flow-${level.toLowerCase()}`;

try {
  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(".moon-yard", { state: "visible", timeout: 5000 });

  const initial = await state();
  await tapMidi(wrongMidi);
  await page.screenshot({ path: `${shotPrefix}_wrong.png`, fullPage: false });
  const afterWrong = await state();

  await tapMidi(sequence[0]);
  await page.screenshot({ path: `${shotPrefix}_after_first.png`, fullPage: false });
  const afterFirst = await state();

  for (const midi of sequence.slice(1)) {
    await tapMidi(midi);
  }
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${shotPrefix}_complete.png`, fullPage: false });
  const complete = await state();

  console.log(JSON.stringify({
    initial,
    afterWrong,
    afterFirst,
    complete,
    assertions: {
      wrongDidNotAdvance: afterWrong.placed === initial.placed && afterWrong.currentTarget === initial.currentTarget,
      firstAdvanced: afterFirst.placed >= 1 && afterFirst.currentTarget !== initial.currentTarget,
      completed: complete.resultVisible === true
    },
    browserErrors
  }, null, 2));
} finally {
  await browser.close();
}
