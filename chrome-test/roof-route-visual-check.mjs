import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/roof_route_340a";
const viewports = [
  { id: "ipad-1024x768", width: 1024, height: 768, dpr: 1 },
  { id: "ipad-pro-11-1194x834", width: 1194, height: 834, dpr: 2 },
  { id: "large-ipad-1366x1024", width: 1366, height: 1024, dpr: 2 }
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

function activeM08Session(sessionId, actionIndex = 0) {
  return {
    sessionId,
    bundleId: "C1-07",
    startedAt: "2026-07-11T01:00:00.000Z",
    localDateKey: "2026-07-11",
    reviewSkillKey: null,
    voluntaryReplay: false,
    status: "active",
    actionIndex,
    actions: [
      { actionId: "M08-guided", kind: "level", targetId: "M08", runMode: "guided", role: "lesson", requiredReview: false, reviewSkillKey: null },
      { actionId: "M08-check", kind: "level", targetId: "M08", runMode: "check", role: "lesson", requiredReview: false, reviewSkillKey: null }
    ],
    completedActions: actionIndex > 0 ? [{ actionId: "M08-guided", kind: "level", targetId: "M08", runMode: "guided" }] : [],
    restAfterCurrentLevel: false
  };
}

async function seedSession(context, active) {
  await context.addInitScript((session) => {
    localStorage.clear();
    localStorage.setItem("starDinoSessionRuntime", JSON.stringify({ version: 3, active: session, history: [], lastRest: null }));
  }, active);
}

async function openLevel(page, query) {
  await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 12000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(".build-blueprint", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(260);
}

async function readRoofState(page) {
  return page.evaluate(() => {
    const visibleElement = (element) => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
    };
    const visible = (selector) => visibleElement(document.querySelector(selector));
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const value = element.getBoundingClientRect();
      return { left: value.left, top: value.top, right: value.right, bottom: value.bottom, width: value.width, height: value.height };
    };
    const parts = [...document.querySelectorAll(".blueprint-part")].map((part) => {
      const panel = part.querySelector(".blueprint-roof-panel");
      const seal = part.querySelector(".blueprint-seal-point");
      const value = part.getBoundingClientRect();
      return {
        index: part.dataset.index,
        note: part.dataset.note,
        identityHidden: part.dataset.identityHidden,
        state: ["placed", "current", "future"].find((name) => part.classList.contains(name)) || "",
        letter: part.querySelector("b")?.textContent?.trim() || "",
        sequence: part.querySelector("em")?.textContent?.trim() || "",
        panelOpacity: panel ? Number(getComputedStyle(panel).opacity) : 0,
        panelVisible: panel ? getComputedStyle(panel).display !== "none" : false,
        sealVisible: seal ? getComputedStyle(seal).display !== "none" && Number(getComputedStyle(seal).opacity) > 0.01 : false,
        rect: { left: value.left, top: value.top, right: value.right, bottom: value.bottom }
      };
    });
    const worldPanels = [...document.querySelectorAll("#roofWorldBuild .roof-world-panel")].map((panel) => ({
      index: panel.dataset.index,
      installed: panel.dataset.installed === "true",
      sealState: panel.dataset.sealState || "",
      visible: visible(`#roofWorldBuild .roof-world-panel[data-index="${panel.dataset.index}"]`)
    }));
    return {
      runtimeVersion: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
      roofMode: document.querySelector("#appShell")?.dataset.roofMode || "",
      levelRunMode: document.querySelector("#appShell")?.dataset.levelRunMode || "",
      blueprintMode: document.querySelector("#buildBlueprint")?.dataset.blueprintMode || "",
      blueprintProgress: document.querySelector("#buildBlueprint")?.dataset.progress || "",
      blueprintTitle: document.querySelector(".blueprint-title")?.innerText?.replace(/\s+/g, " ").trim() || "",
      blueprint: rect(".build-blueprint"),
      worldBuild: rect("#roofWorldBuild"),
      worldVisible: visible("#roofWorldBuild"),
      worldMode: document.querySelector("#roofWorldBuild")?.dataset.mode || "",
      worldInstalledCount: Number(document.querySelector("#roofWorldBuild")?.dataset.installedCount || 0),
      worldCheckedCount: Number(document.querySelector("#roofWorldBuild")?.dataset.checkedCount || 0),
      worldPressureState: document.querySelector("#roofWorldBuild")?.dataset.pressureState || "",
      worldSkylightVisible: visible("#roofWorldBuild .roof-world-skylight.is-closed"),
      worldPanels,
      yard: rect(".moon-yard"),
      coachDino: rect("#coachDino"),
      coachContent: getComputedStyle(document.querySelector("#coachDino")).content || "",
      coachBubble: rect("#coachBubble"),
      coachText: document.querySelector("#coachBubble")?.innerText?.replace(/\s+/g, " ").trim() || "",
      progressMap: rect("#levelMap"),
      parentGate: rect("#playParentGate"),
      mapReturn: rect("#mapReturn"),
      hanging: rect("#hangingPart"),
      hangingText: document.querySelector("#hangingPart")?.innerText?.replace(/\s+/g, " ").trim() || "",
      hangingVisible: visible("#hangingPart"),
      hangingArtVisible: visible("#hangingPartArt"),
      hangingBadgeVisible: visible("#hangingPartBadge"),
      parts,
      outlineDash: document.querySelector(".blueprint-outline path")?.getAttribute("stroke-dasharray") || "",
      sequencePath: document.querySelector(".blueprint-sequence-line path")?.getAttribute("d") || "",
      targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible || "",
      targetKeyVisible: visible('.key.white-key[data-note="C"].target'),
      targetLocatorVisible: visible('.key.white-key[data-note="C"] .tap-badge'),
      legacyRouteVisible: visible(".roof-scale-route") || visible(".roof-route-node") || visible(".roof-route-label"),
      duplicateOverlayVisible: [".stage-story-ribbon", ".stage-note-orb", ".stage-input-toast", ".reward-card", ".target-note"].some(visible),
      transientClutterVisible: [".note-feedback-burst", ".music-flight", ".sprite-effect", ".key-press-label"].some(visible),
      transientClutterCount: [".note-feedback-burst", ".music-flight", ".sprite-effect", ".key-press-label"]
        .flatMap((selector) => [...document.querySelectorAll(selector)])
        .filter(visibleElement).length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      verticalOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
      screenMap: document.body.classList.contains("screen-map")
    };
  });
}

function contains(outer, inner, tolerance = 1) {
  return Boolean(outer && inner &&
    inner.left >= outer.left - tolerance && inner.right <= outer.right + tolerance &&
    inner.top >= outer.top - tolerance && inner.bottom <= outer.bottom + tolerance);
}

function separated(left, right, gap = 0) {
  return Boolean(left && right && left.right + gap <= right.left);
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
    page.on("pageerror", (error) => browserErrors.push({ viewport: viewport.id, type: "pageerror", text: error.message, url: page.url() }));

    try {
      await openLevel(page, `?level=M08&check=roof-blueprint-${viewport.id}`);
      const initial = await readRoofState(page);
      const planRatio = initial.blueprint.width / initial.yard.width;
      const planHeightRatio = initial.blueprint.height / initial.yard.height;

      record(`${viewport.id}: runs the 369e iPad settlement build`, initial.runtimeVersion.includes("overhaul-369e-ipad-settlement-compactness-correction"), initial);
      record(`${viewport.id}: projected blueprint owns the guided 1/C-5/G sequence`,
        initial.roofMode === "install" && initial.blueprintMode === "install" &&
        initial.parts.map((part) => part.letter).join("") === "CDEFG" &&
        initial.parts.map((part) => part.sequence).join("") === "12345" &&
        initial.parts.map((part) => part.state).join(",") === "current,future,future,future,future", initial);
      record(`${viewport.id}: world cabin starts with five visibly missing roof panels`,
        initial.worldVisible && initial.worldMode === "install" && initial.worldInstalledCount === 0 &&
        initial.worldCheckedCount === 0 && initial.worldPressureState === "waiting" && !initial.worldSkylightVisible &&
        initial.worldPanels.length === 5 && initial.worldPanels.every((panel) => panel.visible && !panel.installed), initial);
      record(`${viewport.id}: blueprint is a grounded floor projection rather than a full-stage card`,
        planRatio >= 0.48 && planRatio <= 0.62 && planHeightRatio >= 0.20 && planHeightRatio <= 0.30 &&
        initial.blueprint.bottom <= initial.yard.bottom - initial.yard.height * 0.08 &&
        initial.blueprint.bottom >= initial.yard.bottom - initial.yard.height * 0.20, { planRatio, planHeightRatio, ...initial });
      record(`${viewport.id}: dashed completed-home silhouette remains visible`, /5(?:px)?\s+5/.test(initial.outlineDash), initial);
      record(`${viewport.id}: the five-step route stays lateral instead of climbing into the sky`,
        initial.sequencePath.includes("M22 52") && initial.parts.every((part) => part.rect.top >= initial.blueprint.top) &&
        initial.parts.every((part) => part.rect.bottom <= initial.blueprint.bottom + 4), initial);
      record(`${viewport.id}: Xingya stands left of and vertically beside the blueprint at a readable size`,
        initial.coachDino.left < initial.blueprint.left &&
        (initial.coachDino.left + initial.coachDino.right) / 2 <= initial.blueprint.left + 12 &&
        initial.coachDino.height >= initial.yard.height * 0.18 &&
        initial.coachDino.bottom >= initial.blueprint.top && initial.coachDino.bottom <= initial.blueprint.bottom + 12, initial);
      record(`${viewport.id}: M08 uses the approved traceable three-sprout Xingya runtime asset`,
        initial.coachContent.includes("xingya-suit-point-m08-route-a2.png"), initial);
      record(`${viewport.id}: one solfege bubble is separated from Xingya and carries no duplicate letter locator`,
        initial.coachText.includes("Do") && !initial.coachText.includes("C") && !initial.coachText.includes("2黑") &&
        initial.coachBubble.bottom <= initial.coachDino.top + 8 && initial.coachBubble.width >= initial.yard.width * 0.20, initial);
      record(`${viewport.id}: current roof piece hangs above the blueprint without a duplicate note badge`,
        initial.hangingVisible && initial.hangingArtVisible && !initial.hangingBadgeVisible &&
        !/[C-G]|Do|Re|Mi|Fa|Sol/.test(initial.hangingText) && initial.hanging.bottom <= initial.blueprint.top + 12, initial);
      record(`${viewport.id}: legacy route and duplicate instruction overlays are absent`,
        !initial.legacyRouteVisible && !initial.duplicateOverlayVisible, initial);
      record(`${viewport.id}: centered progress stays clear of the parent and map buttons`,
        separated(initial.progressMap, initial.parentGate, 10) && separated(initial.parentGate, initial.mapReturn, 4), initial);
      record(`${viewport.id}: character, board and blueprint stay inside the moon yard with no page overflow`,
        contains(initial.yard, initial.blueprint, 3) && contains(initial.yard, initial.worldBuild, 3) &&
        contains(initial.yard, initial.coachDino, 3) && contains(initial.yard, initial.hanging, 3) &&
        !initial.horizontalOverflow && !initial.verticalOverflow, initial);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_initial.png`, fullPage: false });

      await page.locator('.key.white-key[data-note="D"]').click();
      await page.waitForTimeout(180);
      const wrongImmediate = await readRoofState(page);
      record(`${viewport.id}: guided wrong bubble compares pressed D/Re with target C/Do`,
        wrongImmediate.coachText.includes("D") && wrongImmediate.coachText.includes("Re") &&
        wrongImmediate.coachText.includes("C") && wrongImmediate.coachText.includes("Do") &&
        wrongImmediate.worldInstalledCount === 0, wrongImmediate);
      record(`${viewport.id}: guided pointer feedback creates no floating note labels or particles`,
        wrongImmediate.transientClutterCount === 0, wrongImmediate);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_wrong_immediate.png`, fullPage: false });
      await page.waitForTimeout(1000);
      const wrong = await readRoofState(page);
      record(`${viewport.id}: stable wrong repair keeps exactly the dino prompt plus target-key locator`,
        wrong.coachText.includes("Do") && wrong.targetVisible === "true" && wrong.targetKeyVisible && wrong.targetLocatorVisible &&
        !wrong.duplicateOverlayVisible && !wrong.transientClutterVisible, wrong);
      record(`${viewport.id}: wrong input does not install or remove a world roof panel`,
        wrong.worldMode === "install" && wrong.worldInstalledCount === 0 &&
        wrong.worldPanels.every((panel) => !panel.installed), wrong);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_wrong.png`, fullPage: false });

      await openLevel(page, `?level=M08&check=roof-blueprint-${viewport.id}-advanced`);
      await page.locator('.key.white-key[data-note="C"]').click();
      await page.waitForTimeout(120);
      await page.locator('.key.white-key[data-note="D"]').click();
      await page.waitForTimeout(180);
      const rapidAdvanced = await readRoofState(page);
      record(`${viewport.id}: rapid guided C-D input keeps transient teaching clutter at zero`,
        rapidAdvanced.transientClutterCount === 0 && rapidAdvanced.worldInstalledCount === 2, rapidAdvanced);
      await page.waitForTimeout(870);
      const advanced = await readRoofState(page);
      record(`${viewport.id}: two notes visibly lock two roof panels and move the prompt to Mi`,
        advanced.parts.map((part) => part.state).join(",") === "placed,placed,current,future,future" &&
        advanced.parts[0].panelOpacity > 0.5 && advanced.parts[1].panelOpacity > 0.5 && advanced.parts[3].panelOpacity < 0.05 &&
        advanced.coachText.includes("Mi") && !advanced.transientClutterVisible, advanced);
      record(`${viewport.id}: C and D install two panels on the world cabin, not only on the blueprint`,
        advanced.worldMode === "install" && advanced.worldInstalledCount === 2 &&
        advanced.worldPanels.filter((panel) => panel.installed).map((panel) => panel.index).join("") === "01" &&
        !advanced.worldSkylightVisible, advanced);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_advanced.png`, fullPage: false });

      await page.locator('.key.white-key[data-note="G"]').click();
      await page.waitForTimeout(180);
      const advancedWrongImmediate = await readRoofState(page);
      record(`${viewport.id}: later guided wrong bubble compares pressed G/Sol with target E/Mi`,
        advancedWrongImmediate.coachText.includes("G") && advancedWrongImmediate.coachText.includes("Sol") &&
        advancedWrongImmediate.coachText.includes("E") && advancedWrongImmediate.coachText.includes("Mi") &&
        advancedWrongImmediate.worldInstalledCount === 2 && advancedWrongImmediate.transientClutterCount === 0, advancedWrongImmediate);
      await page.waitForTimeout(1000);
      const advancedWrong = await readRoofState(page);
      record(`${viewport.id}: wrong repair after C and D preserves both installed world panels`,
        advancedWrong.worldInstalledCount === 2 &&
        advancedWrong.worldPanels.filter((panel) => panel.installed).map((panel) => panel.index).join("") === "01", advancedWrong);
      await page.screenshot({ path: `${screenshotPrefix}_${viewport.id}_advanced_wrong.png`, fullPage: false });
    } finally {
      await context.close();
    }

    const sealContext = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.dpr,
      hasTouch: true
    });
    const sealSessionId = `roof-seal-${viewport.id}`;
    await seedSession(sealContext, activeM08Session(sealSessionId, 1));
    const sealPage = await sealContext.newPage();
    sealPage.on("pageerror", (error) => browserErrors.push({ viewport: `${viewport.id}-seal`, type: "pageerror", text: error.message }));
    try {
      await openLevel(sealPage, `?level=M08&bundle=C1-07&sessionId=${sealSessionId}&check=roof-seal-${viewport.id}`);
      const seal = await readRoofState(sealPage);
      record(`${viewport.id}: reduced-cue second pass is a five-point seal check, not roof rebuilding`,
        seal.roofMode === "seal" && seal.blueprintMode === "seal" && seal.levelRunMode === "check" &&
        seal.blueprintTitle.includes("气密检查") && seal.parts.every((part) => !part.letter && !part.note && part.sealVisible && part.panelOpacity > 0.5) &&
        seal.parts.map((part) => part.sequence).join("") === "12345" && !seal.hangingVisible, seal);
      record(`${viewport.id}: seal check reuses the same complete world roof`,
        seal.worldVisible && seal.worldMode === "seal" && seal.worldInstalledCount === 5 && seal.worldCheckedCount === 0 &&
        seal.worldPressureState === "waiting" && seal.worldSkylightVisible &&
        seal.worldPanels.every((panel) => panel.installed) && seal.worldPanels.filter((panel) => panel.sealState === "current").length === 1, seal);
      record(`${viewport.id}: seal check starts with solfege only and no target-key glow`,
        seal.coachText.includes("Do") && !seal.coachText.includes("C") && !seal.coachText.includes("2黑") && seal.targetVisible === "false", seal);
      await sealPage.screenshot({ path: `${screenshotPrefix}_${viewport.id}_seal.png`, fullPage: false });

      await sealPage.locator('.key.white-key[data-note="D"]').click();
      await sealPage.waitForTimeout(180);
      const sealWrongImmediate = await readRoofState(sealPage);
      record(`${viewport.id}: seal wrong bubble compares pressed D/Re with target C/Do without roof regression`,
        sealWrongImmediate.coachText.includes("D") && sealWrongImmediate.coachText.includes("Re") &&
        sealWrongImmediate.coachText.includes("C") && sealWrongImmediate.coachText.includes("Do") &&
        sealWrongImmediate.worldInstalledCount === 5 && sealWrongImmediate.worldCheckedCount === 0 &&
        sealWrongImmediate.transientClutterCount === 0, sealWrongImmediate);
      await sealPage.screenshot({ path: `${screenshotPrefix}_${viewport.id}_seal_wrong_immediate.png`, fullPage: false });
      await sealPage.waitForTimeout(1000);

      for (const note of ["C", "D"]) {
        await sealPage.locator(`.key.white-key[data-note="${note}"]`).click();
        await sealPage.waitForTimeout(120);
      }
      const sealProgressImmediate = await readRoofState(sealPage);
      record(`${viewport.id}: rapid seal C-D input creates no floating note labels or particles`,
        sealProgressImmediate.transientClutterCount === 0 && sealProgressImmediate.worldCheckedCount === 2, sealProgressImmediate);
      await sealPage.waitForTimeout(980);
      const sealProgress = await readRoofState(sealPage);
      record(`${viewport.id}: seal progress lights two joints without removing roof panels`,
        sealProgress.worldInstalledCount === 5 && sealProgress.worldCheckedCount === 2 &&
        sealProgress.worldPressureState === "waiting" &&
        sealProgress.worldPanels.filter((panel) => panel.sealState === "checked").length === 2, sealProgress);
      await sealPage.screenshot({ path: `${screenshotPrefix}_${viewport.id}_seal_progress.png`, fullPage: false });

      for (const note of ["E", "F", "G"]) {
        await sealPage.locator(`.key.white-key[data-note="${note}"]`).click();
        await sealPage.waitForTimeout(120);
      }
      const sealCompleteImmediate = await readRoofState(sealPage);
      record(`${viewport.id}: rapid seal completion keeps transient teaching clutter at zero`,
        sealCompleteImmediate.transientClutterCount === 0 && sealCompleteImmediate.worldCheckedCount === 5, sealCompleteImmediate);
      await sealPage.waitForTimeout(980);
      const sealComplete = await readRoofState(sealPage);
      record(`${viewport.id}: final seal keeps five roof panels and turns on the safe pressure light`,
        sealComplete.worldMode === "seal" && sealComplete.worldInstalledCount === 5 && sealComplete.worldCheckedCount === 5 &&
        sealComplete.worldPressureState === "safe" && sealComplete.worldSkylightVisible &&
        sealComplete.worldPanels.every((panel) => panel.installed && panel.sealState === "checked"), sealComplete);
      await sealPage.screenshot({ path: `${screenshotPrefix}_${viewport.id}_seal_complete.png`, fullPage: false });
    } finally {
      await sealContext.close();
    }
  }

  const flowViewport = viewports[1];
  const smoothContext = await browser.newContext({ viewport: { width: flowViewport.width, height: flowViewport.height }, deviceScaleFactor: 1, hasTouch: true });
  const smoothSessionId = "roof-smooth-flow";
  await seedSession(smoothContext, activeM08Session(smoothSessionId, 0));
  const smoothPage = await smoothContext.newPage();
  try {
    await openLevel(smoothPage, `?level=M08&bundle=C1-07&sessionId=${smoothSessionId}&check=roof-smooth-flow`);
    for (const note of ["C", "D", "E", "F", "G"]) {
      await smoothPage.locator(`.key.white-key[data-note="${note}"]`).click();
      await smoothPage.waitForTimeout(110);
    }
    const guidedComplete = await readRoofState(smoothPage);
    record("guided completion closes all five world roof panels and the skylight before the seal pass",
      guidedComplete.worldMode === "install" && guidedComplete.worldInstalledCount === 5 &&
      guidedComplete.worldCheckedCount === 0 && guidedComplete.worldPressureState === "waiting" &&
      guidedComplete.worldSkylightVisible && guidedComplete.worldPanels.every((panel) => panel.installed), guidedComplete);
    await smoothPage.screenshot({ path: `${screenshotPrefix}_flow_guided_complete.png`, fullPage: false });

    await smoothPage.waitForTimeout(820);
    const smooth = await readRoofState(smoothPage);
    const runtime = await smoothPage.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}"));
    record("smooth guided roof pass automatically continues as the distinct seal check",
      runtime.active?.actionIndex === 1 && smooth.roofMode === "seal" && smooth.blueprintProgress === "0" &&
      smooth.parts.every((part) => part.sealVisible && part.panelOpacity > 0.5) && !smooth.hangingVisible &&
      smooth.worldMode === "seal" && smooth.worldInstalledCount === 5 && smooth.worldCheckedCount === 0 &&
      smooth.worldSkylightVisible, { runtime, smooth });
    await smoothPage.screenshot({ path: `${screenshotPrefix}_flow_smooth_to_seal.png`, fullPage: false });
  } finally {
    await smoothContext.close();
  }

  const repairContext = await browser.newContext({ viewport: { width: flowViewport.width, height: flowViewport.height }, deviceScaleFactor: 1, hasTouch: true });
  const repairSessionId = "roof-repair-rest";
  await seedSession(repairContext, activeM08Session(repairSessionId, 0));
  const repairPage = await repairContext.newPage();
  try {
    await openLevel(repairPage, `?level=M08&bundle=C1-07&sessionId=${repairSessionId}&check=roof-repair-rest`);
    await repairPage.locator('.key.white-key[data-note="D"]').click();
    await repairPage.waitForTimeout(100);
    await repairPage.locator('.key.white-key[data-note="D"]').click();
    await repairPage.waitForTimeout(100);
    for (const note of ["C", "D", "E", "F", "G"]) {
      await repairPage.locator(`.key.white-key[data-note="${note}"]`).click();
      await repairPage.waitForTimeout(110);
    }
    const repairedRoof = await readRoofState(repairPage);
    record("repair path still closes the permanent five-panel world roof before natural rest",
      repairedRoof.worldMode === "install" && repairedRoof.worldInstalledCount === 5 &&
      repairedRoof.worldSkylightVisible && repairedRoof.worldPanels.every((panel) => panel.installed), repairedRoof);
    await repairPage.waitForTimeout(1950);
    const runtime = await repairPage.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}"));
    const last = runtime.history?.at(-1);
    record("repeated guided repair closes the roof and defers the seal check at natural rest",
      !runtime.active && last?.endReason === "review-deferred" && last?.completedActions?.length === 1 &&
      last.completedActions[0]?.targetId === "M08" && last.completedActions[0]?.wrongCount === 2, { runtime });
    await repairPage.screenshot({ path: `${screenshotPrefix}_flow_repair_deferred_rest.png`, fullPage: false });
  } finally {
    await repairContext.close();
  }

  const waitContext = await browser.newContext({ viewport: { width: flowViewport.width, height: flowViewport.height }, deviceScaleFactor: 1, hasTouch: true });
  const waitSessionId = "roof-long-wait-rest";
  await seedSession(waitContext, activeM08Session(waitSessionId, 0));
  const waitPage = await waitContext.newPage();
  try {
    await openLevel(waitPage, `?level=M08&bundle=C1-07&sessionId=${waitSessionId}&check=roof-long-wait-rest`);
    await waitPage.waitForTimeout(7000);
    for (const note of ["C", "D", "E", "F", "G"]) {
      await waitPage.locator(`.key.white-key[data-note="${note}"]`).click();
      await waitPage.waitForTimeout(110);
    }
    const waitedRoof = await readRoofState(waitPage);
    record("long-wait path keeps the completed world roof while deferring the seal check",
      waitedRoof.worldMode === "install" && waitedRoof.worldInstalledCount === 5 &&
      waitedRoof.worldSkylightVisible, waitedRoof);
    await waitPage.waitForTimeout(1950);
    const runtime = await waitPage.evaluate(() => JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "{}"));
    const last = runtime.history?.at(-1);
    record("long guided wait records the hint and defers the seal check without a failure screen",
      !runtime.active && last?.endReason === "review-deferred" && last?.completedActions?.[0]?.idleIdentityHints > 0, { runtime });
  } finally {
    await waitContext.close();
  }
} finally {
  await browser.close();
}

record("browser console is clean", browserErrors.length === 0, { browserErrors });
const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`roof blueprint visual checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
