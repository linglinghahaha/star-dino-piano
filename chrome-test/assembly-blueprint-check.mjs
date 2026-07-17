import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/assembly_blueprint_340c";
const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 }
];
const nonBlueprintLevels = ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "FG01", "FG02", "FG03", "FG04"];

fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function urlFor(search) {
  const url = new URL(rootUrl);
  url.search = search;
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
        browserErrors.push({ viewport: viewport.id, type: message.type(), text: message.text() });
      }
    });
    page.on("pageerror", (error) => browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message }));

    const openLevel = async (levelId) => {
      await page.goto(urlFor(`?level=${levelId}&check=assembly-blueprint-${viewport.id}`), { waitUntil: "domcontentloaded", timeout: 12000 });
      await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
      await page.waitForTimeout(220);
    };

    const readScene = () => page.evaluate(() => {
      const visible = (selector) => {
        const element = document.querySelector(selector);
        if (!element || element.hidden) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
      };
      return {
        version: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
        levelId: document.querySelector("#appShell")?.dataset.levelId || "",
        blueprintHidden: document.querySelector("#buildBlueprint")?.hidden === true,
        blueprintVisible: visible("#buildBlueprint"),
        blueprintChildCount: document.querySelector("#buildBlueprint")?.childElementCount ?? -1,
        blueprintParts: [...document.querySelectorAll("#buildBlueprint .blueprint-part")].map((part) => ({
          letter: part.querySelector("b")?.textContent?.trim() || "",
          sequence: part.querySelector("em")?.textContent?.trim() || "",
          state: ["placed", "current", "future"].find((name) => part.classList.contains(name)) || ""
        })),
        baseVisible: visible("#baseBuild"),
        worldSlotCount: document.querySelectorAll("#baseBuild .build-slot").length,
        placedWorldSlots: document.querySelectorAll("#baseBuild .build-slot.placed").length,
        hangingCard: document.querySelector("#hangingPartBadge b")?.textContent?.trim() || "",
        hangingVisible: visible("#hangingPart"),
        cartVisible: visible("#baseBuild .m03-wheel-complete"),
        memoryRouteVisible: visible("#memoryStarRoute"),
        memoryRouteNodes: document.querySelectorAll("#memoryStarRoute .memory-route-node").length,
        memoryRouteLabels: [...document.querySelectorAll("#memoryStarRoute .memory-route-label strong")].map((label) => label.textContent?.trim() || ""),
        memoryRouteDinoVisible: visible("#memoryStarRoute .memory-route-dino"),
        fgRouteVisible: visible("#fgStarRoute"),
        fgRouteNodes: document.querySelectorAll("#fgStarRoute .fg-route-node").length,
        fgRouteLabels: [...document.querySelectorAll("#fgStarRoute .fg-route-label strong")].map((label) => label.textContent?.trim() || ""),
        fgRouteDinoVisible: visible("#fgStarRoute .fg-route-dino"),
        routeActionDialogVisible: visible(".route-action-dialog"),
        coachDinoVisible: visible("#coachDino"),
        coachBubbleVisible: visible("#coachBubble"),
        starFixtureVisible: visible("#baseBuild .scene-fixture-stars"),
        targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        verticalOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
      };
    });

    try {
      await openLevel("M01");
      const m01 = await readScene();
      record(`${viewport.id}: runs the 344a shell`, m01.version.includes("overhaul-344a"), m01);

      for (const levelId of nonBlueprintLevels) {
        if (levelId !== "M01") await openLevel(levelId);
        const scene = await readScene();
        record(`${viewport.id}: ${levelId} keeps its world scene without a blueprint`,
          scene.levelId === levelId && scene.blueprintHidden && !scene.blueprintVisible && scene.blueprintChildCount === 0 && scene.baseVisible && scene.worldSlotCount > 0,
          scene);
      }

      await openLevel("M01");
      const m01Original = await readScene();
      record(`${viewport.id}: M01 keeps the original current-part and world-build hierarchy`,
        m01Original.hangingCard === "C" && m01Original.hangingVisible && m01Original.worldSlotCount === 1 && !m01Original.horizontalOverflow && !m01Original.verticalOverflow,
        m01Original);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M01_original.png`, fullPage: false });

      await openLevel("M02");
      await page.locator('.key.white-key[data-midi="60"]').click();
      await page.waitForTimeout(240);
      const m02Advanced = await readScene();
      record(`${viewport.id}: M02 progresses in the real scene without restoring a blueprint`,
        m02Advanced.blueprintHidden && m02Advanced.blueprintChildCount === 0 && m02Advanced.placedWorldSlots === 1 && m02Advanced.hangingCard === "D",
        m02Advanced);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M02_after_C.png`, fullPage: false });

      await openLevel("M03");
      await page.waitForFunction(() => !document.querySelector(".level-intro-card"), null, { timeout: 6000 });
      const m03Initial = await readScene();
      record(`${viewport.id}: M03 hides the listening answer and has no blueprint`,
        m03Initial.blueprintHidden && m03Initial.blueprintChildCount === 0 && !m03Initial.hangingVisible && m03Initial.targetVisible === "false",
        m03Initial);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M03_initial.png`, fullPage: false });
      await page.locator('.key.white-key[data-midi="62"]').click();
      await page.waitForTimeout(300);
      await page.locator('.key.white-key[data-midi="60"]').click();
      await page.waitForSelector("#baseBuild .m03-wheel-complete", { state: "visible", timeout: 6000 });
      await page.waitForTimeout(220);
      const m03Complete = await readScene();
      record(`${viewport.id}: M03 completion remains a world-scene result without a blueprint`,
        m03Complete.cartVisible && m03Complete.blueprintHidden && m03Complete.blueprintChildCount === 0,
        m03Complete);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M03_complete.png`, fullPage: false });

      await openLevel("M07");
      const m07 = await readScene();
      record(`${viewport.id}: M07 restores the five-node memory route without the duplicate star fixture`,
        m07.memoryRouteVisible && m07.memoryRouteNodes === 5 && m07.memoryRouteLabels.join("") === "CDEDC" && m07.memoryRouteDinoVisible && m07.routeActionDialogVisible && !m07.coachDinoVisible && !m07.coachBubbleVisible && !m07.starFixtureVisible && m07.blueprintHidden,
        m07);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M07_memory_route.png`, fullPage: false });

      await openLevel("FG03");
      const fg03 = await readScene();
      record(`${viewport.id}: FG03 restores the three-node star route and route character without the duplicate fixture`,
        fg03.fgRouteVisible && fg03.fgRouteNodes === 3 && fg03.fgRouteLabels.join("") === "EFG" && fg03.fgRouteDinoVisible && fg03.routeActionDialogVisible && !fg03.coachDinoVisible && !fg03.coachBubbleVisible && !fg03.starFixtureVisible && fg03.blueprintHidden,
        fg03);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_FG03_star_route.png`, fullPage: false });

      await openLevel("M08");
      const m08 = await readScene();
      record(`${viewport.id}: only M08 keeps the five-step C-D-E-F-G roof blueprint`,
        !m08.blueprintHidden && m08.blueprintVisible && m08.blueprintParts.length === 5 &&
        m08.blueprintParts.map((part) => part.letter).join("") === "CDEFG" &&
        m08.blueprintParts.map((part) => part.sequence).join("") === "12345",
        m08);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_M08_blueprint.png`, fullPage: false });
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
console.log(`assembly blueprint checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
