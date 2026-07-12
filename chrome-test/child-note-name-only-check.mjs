import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/child_note_names_340c";
const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 }
];
const states = [
  { id: "M01", search: "?level=M01&check=child-note-names" },
  { id: "M07", search: "?level=M07&check=child-note-names" },
  { id: "FG03", search: "?level=FG03&check=child-note-names" },
  { id: "M08", search: "?level=M08&check=child-note-names" },
  { id: "staff", search: "?mode=staff&session=mini&check=child-note-names" },
  { id: "garden", search: "?mode=garden&check=child-note-names" }
];

fs.mkdirSync(screenshotDir, { recursive: true });
const checks = [];
const browserErrors = [];
const record = (name, pass, details = {}) => checks.push({ name, pass: Boolean(pass), details });
const makeUrl = (search) => {
  const url = new URL(rootUrl);
  url.search = search;
  return url.toString();
};

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.dpr,
      hasTouch: true
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) browserErrors.push({ viewport: viewport.id, type: message.type(), text: message.text() });
    });
    page.on("pageerror", (error) => browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message }));

    const open = async (search) => {
      await page.goto(makeUrl(search), { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
      await page.waitForTimeout(260);
    };

    const inspect = () => page.evaluate(() => {
      const allowed = "#coachBubble, .route-idle-dialog, #gardenSpeech, #staffDinoWrap, #parentModal";
      const visible = (element) => {
        if (!element) return false;
        let current = element.nodeType === Node.TEXT_NODE ? element.parentElement : element;
        if (!current || current.closest(allowed)) return false;
        while (current && current !== document.documentElement) {
          const style = getComputedStyle(current);
          if (current.hidden || style.display === "none" || style.visibility === "hidden" || Number(style.opacity) <= 0.01) return false;
          current = current.parentElement;
        }
        const range = document.createRange();
        range.selectNodeContents(element);
        return [...range.getClientRects()].some((rect) => rect.width > 0 && rect.height > 0);
      };
      const elementVisible = (element) => {
        if (!element || element.hidden) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
      };
      const textRows = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.textContent?.replace(/\s+/g, " ").trim();
        if (text && visible(node)) textRows.push({ text, tag: node.parentElement?.tagName || "", id: node.parentElement?.id || "", className: node.parentElement?.className || "" });
      }
      const tokenPattern = /(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/;
      const leaks = textRows.filter((row) => tokenPattern.test(row.text) || /法法|索尔/.test(row.text));
      const routeAttributeLeaks = [...document.querySelectorAll("#memoryStarRoute [aria-label], #memoryStarRoute [title], #fgStarRoute [aria-label], #fgStarRoute [title]")]
        .filter((element) => visible(element))
        .map((element) => ({
          tag: element.tagName,
          id: element.id || "",
          value: [element.getAttribute("aria-label"), element.getAttribute("title"), element.getAttribute("alt")].filter(Boolean).join(" ")
        }))
        .filter((row) => tokenPattern.test(row.value) || /法法|索尔/.test(row.value));
      const keys = [...document.querySelectorAll(".key.white-key:not(.reserved-key)")].map((key) => ({
        text: key.querySelector(".key-content")?.innerText?.replace(/\s+/g, "").trim() || "",
        aria: key.getAttribute("aria-label") || ""
      }));
      return {
        leaks,
        routeAttributeLeaks,
        keys,
        m07: [...document.querySelectorAll("#memoryStarRoute .memory-route-label strong")].map((item) => item.textContent?.trim() || ""),
        fg03: [...document.querySelectorAll("#fgStarRoute .fg-route-label strong")].map((item) => item.textContent?.trim() || ""),
        routeAria: document.querySelector("#memoryStarRoute:not([hidden]), #fgStarRoute:not([hidden])")?.getAttribute("aria-label") || "",
        routeDinoCount: [document.querySelector(".memory-route-dino"), document.querySelector(".fg-route-dino"), document.querySelector("#coachDino")].filter(elementVisible).length,
        routeBubbleCount: [document.querySelector(".route-action-dialog"), document.querySelector(".route-idle-dialog:not(.route-action-dialog)"), document.querySelector("#coachBubble")].filter(elementVisible).length,
        hangingBadge: document.querySelector("#hangingPartBadge")?.innerText?.replace(/\s+/g, "").trim() || "",
        actionCue: document.querySelector("#nextAction")?.innerText?.replace(/\s+/g, " ").trim() || "",
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        overflowY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
      };
    });

    try {
      for (const state of states) {
        await open(state.search);
        if (state.id === "garden") {
          await page.evaluate(() => {
            showGardenScreen();
            setGardenEquipmentState("safe-open");
            renderGardenScreen();
          });
          await page.waitForSelector("#gardenScene[data-air-state='safe-open']", { state: "visible", timeout: 7000 });
          await page.waitForSelector(".key.white-key[data-midi='60']", { state: "visible", timeout: 4000 });
        }
        const result = await inspect();
        record(`${viewport.id} ${state.id}: child-visible text uses note names outside dinosaur bubbles`, result.leaks.length === 0 && result.routeAttributeLeaks.length === 0, result);
        record(`${viewport.id} ${state.id}: piano keycaps show letters while ARIA retains dual identity`,
          result.keys.map((key) => key.text).join("") === "CDEFG" &&
          result.keys.every((key, index) => key.aria.includes(["Do", "Re", "Mi", "Fa", "Sol"][index])),
          result.keys);
        record(`${viewport.id} ${state.id}: note-name layout has no page overflow`, !result.overflowX && !result.overflowY, result);
        if (state.id === "M07") {
          record(`${viewport.id}: M07 route labels are C-D-E-D-C`, result.m07.join("") === "CDEDC", result.m07);
          record(`${viewport.id}: M07 current-part and action badges use only note names`, result.hangingBadge === "C" && !/(Do|Re|Mi|Fa|Sol|法法|索尔)/.test(result.actionCue), result);
          record(`${viewport.id}: M07 exposes one route character, one dialogue, and a letter-only route name`, result.routeDinoCount === 1 && result.routeBubbleCount === 1 && result.routeAria === "星星路线 C D E D C", result);
        }
        if (state.id === "FG03") {
          record(`${viewport.id}: FG03 route labels are E-F-G`, result.fg03.join("") === "EFG", result.fg03);
          record(`${viewport.id}: FG03 exposes one route character, one dialogue, and a letter-only route name`, result.routeDinoCount === 1 && result.routeBubbleCount === 1 && result.routeAria === "星星路线 E F G", result);
        }
        await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_${state.id}.png`), fullPage: false });
      }

      for (const audit of ["color-reduced", "high-contrast"]) {
        await open(`?level=M01&audit=${audit}&check=child-note-names`);
        const result = await inspect();
        record(`${viewport.id} ${audit}: child-visible text remains note-name only`, result.leaks.length === 0, result);
        record(`${viewport.id} ${audit}: keycaps remain C-D-E-F-G`, result.keys.map((key) => key.text).join("") === "CDEFG", result.keys);
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

record("browser console is clean", browserErrors.length === 0, { browserErrors });
const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`child note-name checks: ${checks.length - failed.length} passed, ${failed.length} failed`);
if (failed.length) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
