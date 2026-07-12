import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const url = process.argv[2] || "http://127.0.0.1:4180/?level=M08&check=roof-flow";
const shotPrefix = process.argv[3] || "screenshot_roof_flow";

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

const state = async () => page.evaluate(() => ({
  currentTarget: document.querySelector(".key.target strong")?.textContent,
  placed: document.querySelectorAll(".scene-roof .build-slot.placed, .scene-roof .build-slot.just-added").length,
  currentSlots: document.querySelectorAll(".scene-roof .build-slot.current").length,
  resultVisible: !document.querySelector("#resultModal")?.hidden,
  resultText: document.querySelector("#resultText")?.textContent || "",
  lastWrong: document.querySelector(".key.hit-wrong strong")?.textContent || "",
  lastCorrect: document.querySelector(".key.hit-correct strong")?.textContent || ""
}));

const tapMidi = async (midi) => {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click();
  await page.waitForTimeout(760);
};

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(".scene-roof", { state: "visible", timeout: 5000 });

  const initial = await state();
  await tapMidi(62);
  await page.screenshot({ path: `${shotPrefix}_wrong.png`, fullPage: false });
  const afterWrong = await state();

  await tapMidi(60);
  await page.screenshot({ path: `${shotPrefix}_after_do.png`, fullPage: false });
  const afterDo = await state();

  for (const midi of [62, 64, 65, 67]) {
    await tapMidi(midi);
  }
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${shotPrefix}_complete.png`, fullPage: false });
  const complete = await state();

  console.log(JSON.stringify({
    initial,
    afterWrong,
    afterDo,
    complete,
    assertions: {
      wrongDidNotAdvance: afterWrong.placed === initial.placed && afterWrong.currentTarget === initial.currentTarget,
      doAdvanced: afterDo.placed >= 1 && afterDo.currentTarget === "Re",
      completed: complete.resultVisible === true
    },
    browserErrors
  }, null, 2));
} finally {
  await browser.close();
}
