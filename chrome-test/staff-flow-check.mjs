import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4180/";
const shotPrefix = process.argv[3] || "screenshot_staff_164_flow";
const sequence = (process.argv[4] || "60,62,64,65,67,64").split(",").map((value) => Number(value.trim()));
const wrongMidi = Number(process.argv[5] || "62");

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

const readState = async () => page.evaluate(() => {
  const rect = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };

  return {
    title: document.querySelector("#mainTitle")?.textContent || "",
    badge: document.querySelector("#levelBadge")?.textContent || "",
    current: document.querySelector(".staff-step.current")?.textContent?.replace(/\s+/g, " ").trim() || "",
    currentMidi: document.querySelector(".staff-step.current")?.getAttribute("data-midi") || "",
    doneCount: document.querySelectorAll(".staff-step.done").length,
    hintCount: document.querySelectorAll(".staff-step.hint").length,
    targetKey: document.querySelector(".key.target strong")?.textContent || "",
    targetKeyMidi: document.querySelector(".key.target")?.getAttribute("data-midi") || "",
    resultVisible: !document.querySelector("#resultModal")?.hidden,
    resultText: document.querySelector("#resultText")?.textContent || "",
    dinoTip: document.querySelector("#staffDinoWrap")?.getAttribute("data-tip") || "",
    staffStage: rect(".staff-stage"),
    keyboard: rect(".keyboard-panel")
  };
});

const tapMidi = async (midi) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click();
  await page.waitForTimeout(760);
};

const url = new URL(baseUrl);
url.search = "?mode=staff&check=staff-flow-164";

try {
  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(".staff-stage", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(260);

  const initial = await readState();
  await tapMidi(wrongMidi);
  await page.screenshot({ path: `${shotPrefix}_wrong.png`, fullPage: false });
  const afterWrong = await readState();

  await tapMidi(sequence[0]);
  await page.screenshot({ path: `${shotPrefix}_after_first.png`, fullPage: false });
  const afterFirst = await readState();

  for (const midi of sequence.slice(1)) {
    await tapMidi(midi);
  }
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${shotPrefix}_complete.png`, fullPage: false });
  const complete = await readState();

  console.log(JSON.stringify({
    initial,
    afterWrong,
    afterFirst,
    complete,
    assertions: {
      wrongDidNotAdvance: afterWrong.doneCount === initial.doneCount && afterWrong.currentMidi === initial.currentMidi,
      wrongShowsHint: afterWrong.hintCount >= 1,
      firstAdvanced: afterFirst.doneCount >= 1 && afterFirst.currentMidi !== initial.currentMidi,
      completed: complete.resultVisible === true && complete.doneCount === sequence.length
    },
    browserErrors
  }, null, 2));
} finally {
  await browser.close();
}
