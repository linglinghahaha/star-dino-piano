import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/note_palette_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const expected = {
  C: "#CB84FA",
  D: "#FB9608",
  E: "#62C60C",
  F: "#CC338D",
  G: "#6F8FFE",
  A: "#F78ACD",
  B: "#11D19E"
};
const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const page = await browser.newPage({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});

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
  await page.waitForSelector("#keyboard", { state: "visible", timeout: 6000 });
}

async function readKeys() {
  return page.evaluate(() => Object.fromEntries(
    [...document.querySelectorAll(".key.white-key[data-note]")].map((key) => {
      const style = getComputedStyle(key);
      const letter = key.dataset.note;
      return [letter, {
        noteColor: style.getPropertyValue("--note-color").trim().toUpperCase(),
        boxShadow: style.boxShadow,
        opacity: Number(style.opacity),
        filter: style.filter,
        letterColor: getComputedStyle(key.querySelector(".key-content strong")).color,
        visibleText: key.querySelector(".key-content")?.innerText?.replace(/\s+/g, "").trim() || "",
        reserved: key.classList.contains("reserved-key")
      }];
    })
  ));
}

try {
  const normalUrl = new URL(rootUrl);
  normalUrl.search = "?level=FG04&check=palette-321a";
  await page.goto(normalUrl.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady();
  const normal = await readKeys();

  for (const [note, color] of Object.entries(expected)) {
    record(`${note} uses the approved palette color`, normal[note]?.noteColor === color, { expected: color, actual: normal[note] });
  }
  record("all seven key-edge shadows are color-specific", new Set(Object.values(normal).map((key) => key.boxShadow)).size === 7, normal);
  record("keycaps use note-name letters without visible solfege", Object.entries(normal).every(([note, key]) => key.visibleText === note || (key.reserved && key.visibleText === `${note}后面`)), normal);
  record("A and B remain visibly reserved", normal.A?.reserved && normal.B?.reserved && normal.A.opacity < 0.7 && normal.B.opacity < 0.7, { A: normal.A, B: normal.B });
  record("normal keyboard has no horizontal overflow", await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await page.screenshot({ path: `${screenshotPrefix}_normal.png`, fullPage: false });

  const reducedUrl = new URL(rootUrl);
  reducedUrl.search = "?level=FG04&audit=color-reduced&check=palette-321a-reduced";
  await page.goto(reducedUrl.toString(), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady();
  const reduced = await readKeys();
  const reducedColors = new Set(Object.values(reduced).map((key) => key.noteColor));
  record("color-reduced mode removes the seven-color answer cue", reducedColors.size === 1 && [...reducedColors][0] === "#5F7286", reduced);
  record("color-reduced keyboard has no horizontal overflow", await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await page.screenshot({ path: `${screenshotPrefix}_reduced.png`, fullPage: false });

  const initialReducedTarget = await page.locator(".key.white-key.target").getAttribute("data-note");
  await page.locator('.key.white-key[data-note="C"]').click();
  await page.waitForTimeout(420);
  const targetAfterWrong = await page.locator(".key.white-key.target").getAttribute("data-note");
  await page.locator('.key.white-key[data-note="F"]').click();
  await page.waitForTimeout(520);
  const targetAfterF = await page.locator(".key.white-key.target").getAttribute("data-note");
  await page.locator('.key.white-key[data-note="G"]').click();
  await page.waitForTimeout(900);
    const reducedCompletion = await page.evaluate(() => ({
      modalHidden: document.querySelector("#resultModal")?.hidden === true,
      appInert: Boolean(document.querySelector("#appShell")?.inert),
      placedSlots: document.querySelectorAll("#baseBuild .build-slot.placed").length
    }));
  record("color-reduced wrong input does not advance", initialReducedTarget === "F" && targetAfterWrong === "F", { initialReducedTarget, targetAfterWrong });
  record("color-reduced route advances by key identity", targetAfterF === "G", { targetAfterF });
    record("color-reduced FG04 route completes in the world without a result modal", reducedCompletion.modalHidden && !reducedCompletion.appInert && reducedCompletion.placedSlots >= 2, reducedCompletion);
  await page.screenshot({ path: `${screenshotPrefix}_reduced_complete.png`, fullPage: false });

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`note palette checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
