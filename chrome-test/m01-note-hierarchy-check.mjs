import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/m01_hierarchy_334g";
const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 }
];

fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function makeUrl(query) {
  const url = new URL(rootUrl);
  url.search = query;
  return url.toString();
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.dpr,
      hasTouch: true
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        browserErrors.push({ viewport: viewport.id, type: message.type(), text: message.text(), url: page.url() });
      }
    });
    page.on("pageerror", (error) => {
      browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message, url: page.url() });
    });

    try {
      await page.goto(makeUrl(`?level=M01&check=m01-hierarchy-${viewport.id}`), { waitUntil: "domcontentloaded", timeout: 12000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
      await page.waitForSelector(".moon-yard", { state: "visible", timeout: 6000 });
      await page.waitForTimeout(220);

      const state = await page.evaluate(() => {
        const visible = (element) => {
          if (!element) return false;
          for (let parent = element; parent; parent = parent.parentElement) {
            if (parent.hidden) return false;
            const parentStyle = getComputedStyle(parent);
            if (parentStyle.display === "none" || parentStyle.visibility === "hidden") return false;
          }
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
        };
        const rect = (element) => {
          if (!element) return null;
          const value = element.getBoundingClientRect();
          return { left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height };
        };
        const story = document.querySelector("#stageStoryRibbon");
        const badge = document.querySelector("#hangingPartBadge");
        const coach = document.querySelector("#coachBubble");
        const dino = document.querySelector("#coachDino");
        const yard = document.querySelector(".moon-yard");
        const primaryKeys = [...document.querySelectorAll(".key.white-key:not(.reserved-key)")].map((key) => ({
          primary: key.querySelector(".key-content strong")?.textContent?.trim() || "",
          secondary: key.querySelector(".key-content span")?.textContent?.trim() || ""
        }));
        return {
          runtimeVersion: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
          storyText: story?.innerText?.replace(/\s+/g, " ").trim() || "",
          storyCueCount: story?.querySelectorAll(".story-cue-row").length || 0,
          storyIdentitySuppressed: story?.dataset.identitySuppressed || "",
          badge: {
            visible: visible(badge),
            primary: badge?.querySelector("b")?.textContent?.trim() || "",
            secondary: badge?.querySelector("i")?.textContent?.trim() || ""
          },
          coachText: coach?.innerText?.replace(/\s+/g, " ").trim() || "",
          coachRect: rect(dino),
          yardRect: rect(yard),
          targetCardVisible: visible(document.querySelector("#targetNote")),
          stageOrbVisible: visible(document.querySelector("#stageNoteOrb")),
          currentSlotLetterVisible: visible(document.querySelector(".build-slot.current .slot-note-letter")),
          feedback: {
            visible: visible(document.querySelector("#feedback")),
            text: document.querySelector("#feedback")?.textContent?.replace(/\s+/g, " ").trim() || "",
            parentClass: document.querySelector("#feedback")?.parentElement?.className || "",
            rect: rect(document.querySelector("#feedback"))
          },
          keyboardRect: rect(document.querySelector("#keyboard")),
          primaryKeys,
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          verticalOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
        };
      });

      const dinoContained = Boolean(state.coachRect && state.yardRect &&
        state.coachRect.left >= state.yardRect.left - 2 && state.coachRect.right <= state.yardRect.right + 2 &&
        state.coachRect.top >= state.yardRect.top - 2 && state.coachRect.bottom <= state.yardRect.bottom + 2);
      const keyOrder = state.primaryKeys.map((key) => key.primary).join("");
      const secondaryOrder = state.primaryKeys.map((key) => key.secondary).join("");

      record(`${viewport.id}: runs the current 369e shell`, state.runtimeVersion.includes("overhaul-369e-ipad-settlement-compactness-correction"), state);
      record(`${viewport.id}: story card contains the story problem without a duplicate identity row`, state.storyIdentitySuppressed === "true" && state.storyCueCount === 0 && !/[A-G]|Do|Re|Mi|Fa|Sol|黑键/.test(state.storyText), state);
      record(`${viewport.id}: hanging part shows only the C note name`, state.badge.visible && state.badge.primary === "C" && state.badge.secondary === "", state.badge);
      record(`${viewport.id}: Xingya owns the only initial solfege prompt`, state.coachText.includes("唱 Do") && !state.coachText.includes("C") && !state.coachText.includes("黑"), state);
      record(`${viewport.id}: duplicate M01 identity cards and build-slot letter stay hidden`, !state.targetCardVisible && !state.stageOrbVisible && !state.currentSlotLetterVisible, state);
      record(`${viewport.id}: real piano keys show only C-G note names`, keyOrder === "CDEFG" && secondaryOrder === "", state.primaryKeys);
      record(`${viewport.id}: larger Xingya remains inside the scene`, dinoContained && (state.coachRect?.width || 0) >= 140 && (state.coachRect?.height || 0) >= 140, { coachRect: state.coachRect, yardRect: state.yardRect });
      record(`${viewport.id}: M01 hierarchy has no page overflow`, !state.horizontalOverflow && !state.verticalOverflow, state);

      await page.locator('#keyboard .key[data-midi="62"]').click();
      await page.waitForTimeout(180);
      const wrongFeedback = await page.evaluate(() => {
        const element = document.querySelector("#feedback");
        const visible = (candidate) => {
          if (!candidate) return false;
          for (let parent = candidate; parent; parent = parent.parentElement) {
            if (parent.hidden) return false;
            const parentStyle = getComputedStyle(parent);
            if (parentStyle.display === "none" || parentStyle.visibility === "hidden") return false;
          }
          const style = getComputedStyle(candidate);
          const box = candidate.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && box.width > 0 && box.height > 0;
        };
        const box = element?.getBoundingClientRect();
        const keyboard = document.querySelector("#keyboard")?.getBoundingClientRect();
        const modal = document.querySelector("#resultModal");
        return {
          visible: visible(element),
          text: element?.textContent?.replace(/\s+/g, " ").trim() || "",
          parentClass: element?.parentElement?.className || "",
          rect: box ? { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height } : null,
          keyboardRect: keyboard ? { left: keyboard.left, top: keyboard.top, right: keyboard.right, bottom: keyboard.bottom, width: keyboard.width, height: keyboard.height } : null,
          modalVisible: Boolean(modal && !modal.hidden && getComputedStyle(modal).display !== "none")
        };
      });
      const feedbackAboveKeyboard = Boolean(wrongFeedback.rect && wrongFeedback.keyboardRect && wrongFeedback.rect.bottom <= wrongFeedback.keyboardRect.top + 1);
      record(
        `${viewport.id}: wrong M01 feedback is visible in one compact status row above the keyboard`,
        wrongFeedback.visible && wrongFeedback.parentClass === "status-row" && /D/.test(wrongFeedback.text) && /C/.test(wrongFeedback.text) && !/(?:Do|Re|Mi|唱名)/.test(wrongFeedback.text) && feedbackAboveKeyboard && !wrongFeedback.modalVisible,
        { state, wrongFeedback, feedbackAboveKeyboard }
      );
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}.png`, fullPage: false });
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
console.log(`M01 note hierarchy checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
