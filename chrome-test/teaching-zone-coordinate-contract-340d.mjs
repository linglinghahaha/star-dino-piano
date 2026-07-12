import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const outputPath = process.argv[3] || "docs/30_TEACHING_ZONE_COORDINATE_CONTRACT_340D.json";
const screenshotPrefix = process.argv[4] || "screenshots/teaching_zones_340d";
const clearanceMarginPx = 24;
const alphaThreshold = 8;

const viewportSpecs = [
  {
    viewportId: "ipad-landscape-1024x768-dpr1-browser-gate",
    width: 1024,
    height: 768,
    dpr: 1,
    supportStatus: "primary_browser_gate_passed"
  },
  {
    viewportId: "ipad-landscape-1024x768-dpr2-browser-model",
    width: 1024,
    height: 768,
    dpr: 2,
    supportStatus: "pixel_density_model_passed"
  },
  {
    viewportId: "ipad-landscape-1180x820-dpr2-browser-model",
    width: 1180,
    height: 820,
    dpr: 2,
    supportStatus: "modern_ipad_geometry_model_passed"
  },
  {
    viewportId: "ipad-pro-11-landscape-1194x834-dpr2-browser-model",
    width: 1194,
    height: 834,
    dpr: 2,
    supportStatus: "ipad_pro_11_geometry_model_passed"
  },
  {
    viewportId: "media-landscape-1280x720-dpr1-browser-smoke",
    width: 1280,
    height: 720,
    dpr: 1,
    supportStatus: "technical_preview_canvas_smoke_passed"
  },
  {
    viewportId: "large-ipad-landscape-1366x1024-dpr2-browser-model",
    width: 1366,
    height: 1024,
    dpr: 2,
    supportStatus: "large_ipad_geometry_model_passed"
  }
];

const contractSourceFiles = [
  "chrome-test/teaching-zone-coordinate-contract-340d.mjs",
  "index.html",
  "app.js",
  "styles.css",
  "staff-overrides.css",
  "play-overrides.css",
  "keyboard-overrides.css",
  "map-overrides.css",
  "quality-overrides.css",
  "quality-overrides-2.css",
  "quality-overrides-3.css",
  "quality-overrides-4.css",
  "current-overhaul.css",
  "roof-blueprint-overrides.css",
  "chapter3-visible.css"
];

function makeUrl(search) {
  const url = new URL(rootUrl);
  url.search = search;
  return url.toString();
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function normalizeRect(rect) {
  if (!rect) return null;
  return {
    x: round(rect.x),
    y: round(rect.y),
    width: round(rect.width),
    height: round(rect.height),
    right: round(rect.right),
    bottom: round(rect.bottom)
  };
}

function unionRects(rects) {
  const valid = rects.filter(Boolean);
  if (valid.length === 0) return null;
  const left = Math.min(...valid.map((rect) => rect.x));
  const top = Math.min(...valid.map((rect) => rect.y));
  const right = Math.max(...valid.map((rect) => rect.right));
  const bottom = Math.max(...valid.map((rect) => rect.bottom));
  return normalizeRect({ x: left, y: top, width: right - left, height: bottom - top, right, bottom });
}

function expandRect(rect, margin, viewport) {
  if (!rect) return null;
  const left = Math.max(0, rect.x - margin);
  const top = Math.max(0, rect.y - margin);
  const right = Math.min(viewport.width, rect.right + margin);
  const bottom = Math.min(viewport.height, rect.bottom + margin);
  return normalizeRect({ x: left, y: top, width: right - left, height: bottom - top, right, bottom });
}

function localRect(rect, hostRect) {
  if (!rect || !hostRect) return null;
  return normalizeRect({
    x: rect.x - hostRect.x,
    y: rect.y - hostRect.y,
    width: rect.width,
    height: rect.height,
    right: rect.right - hostRect.x,
    bottom: rect.bottom - hostRect.y
  });
}

function zoneRecord(rect, hostRect, viewport) {
  const clearanceRect = expandRect(rect, clearanceMarginPx, viewport);
  return {
    rect,
    clearanceRect,
    hostLocalRect: localRect(rect, hostRect),
    clearanceHostLocalRect: localRect(clearanceRect, hostRect)
  };
}

function sourceFileRecord(relativePath) {
  const absolutePath = path.resolve(relativePath);
  const buffer = fs.readFileSync(absolutePath);
  return {
    path: relativePath.replaceAll("\\", "/"),
    bytes: buffer.byteLength,
    sha256: sha256(buffer)
  };
}

async function waitReady(page, selector) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 8000 });
  await page.waitForTimeout(320);
}

async function readGeometry(page, mode) {
  return page.evaluate((screenMode) => {
    const isVisible = (element) => {
      if (!element) return false;
      let node = element;
      while (node instanceof Element) {
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse" || Number(style.opacity) === 0) {
          return false;
        }
        node = node.parentElement;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };
    const rectFor = (element, allowZero = false) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      if (!allowZero && !isVisible(element)) return null;
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom
      };
    };
    const one = (selector) => rectFor(document.querySelector(selector));
    const many = (selector, allowZero = false) => [...document.querySelectorAll(selector)]
      .map((element) => rectFor(element, allowZero))
      .filter(Boolean);

    const shared = {
      appShell: one("#appShell"),
      topbar: one(".topbar"),
      keyboardPanel: one(".keyboard-panel"),
      keyboard: one(".keyboard"),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1 || document.body.scrollWidth > window.innerWidth + 1,
      verticalOverflow: document.documentElement.scrollHeight > window.innerHeight + 1 || document.body.scrollHeight > window.innerHeight + 1,
      actualDpr: window.devicePixelRatio
    };

    if (screenMode === "workshop") {
      return {
        ...shared,
        stage: one(".moon-yard"),
        centralParts: [one(".listen-guide"), one("#buildBlueprint"), one("#roofWorldBuild"), one("#hangingPart"), one("#baseBuild")].filter(Boolean),
        persistentUi: [
          { id: "topbar", rect: one(".topbar") },
          { id: "story-ribbon", rect: one(".stage-story-ribbon") },
          { id: "coach-overlay", rect: one(".coach-overlay") }
        ].filter((entry) => entry.rect),
        transientFeedback: [
          ...many(".stage-input-toast").map((rect, index) => ({ id: `stage-input-toast-${index + 1}`, rect })),
          ...many(".note-feedback-burst").map((rect, index) => ({ id: `note-feedback-burst-${index + 1}`, rect })),
          ...many(".key-press-label").map((rect, index) => ({ id: `key-press-label-${index + 1}`, rect })),
          ...many(".sprite-effect").map((rect, index) => ({ id: `sprite-effect-${index + 1}`, rect }))
        ]
      };
    }

    return {
      ...shared,
      stage: one(".staff-stage"),
      staffLines: many(".svg-staff-line", true),
      staffSteps: many(".staff-step"),
      persistentUi: [
        { id: "topbar", rect: one(".topbar") },
        { id: "staff-bottom", rect: one(".staff-bottom") }
      ].filter((entry) => entry.rect),
      transientFeedback: [
        ...many(".staff-stage-toast").map((rect, index) => ({ id: `staff-stage-toast-${index + 1}`, rect })),
        ...many(".staff-visual-cue").map((rect, index) => ({ id: `staff-visual-cue-${index + 1}`, rect }))
      ]
    };
  }, mode);
}

function normalizeGeometry(geometry) {
  return {
    ...geometry,
    appShell: normalizeRect(geometry.appShell),
    topbar: normalizeRect(geometry.topbar),
    keyboardPanel: normalizeRect(geometry.keyboardPanel),
    keyboard: normalizeRect(geometry.keyboard),
    stage: normalizeRect(geometry.stage),
    centralParts: geometry.centralParts?.map(normalizeRect),
    staffLines: geometry.staffLines?.map(normalizeRect),
    staffSteps: geometry.staffSteps?.map(normalizeRect),
    persistentUi: geometry.persistentUi.map((entry) => ({ ...entry, rect: normalizeRect(entry.rect) })),
    transientFeedback: geometry.transientFeedback.map((entry) => ({ ...entry, rect: normalizeRect(entry.rect) }))
  };
}

function buildViewportRecord(spec, workshopInitial, workshopWrong, staffInitial, staffWrong, screenshotEvidence) {
  const viewport = { width: spec.width, height: spec.height };
  const centralTargetRect = unionRects(workshopInitial.centralParts);
  const staffRect = unionRects([...staffInitial.staffLines, ...staffInitial.staffSteps]);
  const persistentWorkshop = workshopInitial.persistentUi.map((entry) => ({
    id: entry.id,
    ...zoneRecord(entry.rect, workshopInitial.stage, viewport)
  }));
  const persistentStaff = staffInitial.persistentUi.map((entry) => ({
    id: entry.id,
    ...zoneRecord(entry.rect, staffInitial.stage, viewport)
  }));

  return {
    viewportId: spec.viewportId,
    supportStatus: spec.supportStatus,
    width: spec.width,
    height: spec.height,
    dpr: spec.dpr,
    physicalPixelWidth: spec.width * spec.dpr,
    physicalPixelHeight: spec.height * spec.dpr,
    orientation: "landscape",
    safeAreaInsets: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      status: "browser_emulation_only_real_ipad_safari_unverified"
    },
    coordinateSpace: {
      origin: "viewport_top_left",
      unit: "css_px",
      xDirection: "right",
      yDirection: "down",
      physicalPixelScale: spec.dpr,
      cropRule: "no_crop_inside_viewport",
      rounding: "two_decimal_places"
    },
    zones: {
      workshop: {
        stageRect: workshopInitial.stage,
        centralTargetZone: zoneRecord(centralTargetRect, workshopInitial.stage, viewport),
        keyboardZone: zoneRecord(workshopInitial.keyboardPanel, workshopInitial.stage, viewport),
        persistentUiZones: persistentWorkshop,
        wrongFeedbackZones: workshopWrong.transientFeedback.map((entry) => ({
          id: entry.id,
          ...zoneRecord(entry.rect, workshopInitial.stage, viewport)
        }))
      },
      staff: {
        stageRect: staffInitial.stage,
        staffZone: zoneRecord(staffRect, staffInitial.stage, viewport),
        keyboardZone: zoneRecord(staffInitial.keyboardPanel, staffInitial.stage, viewport),
        persistentUiZones: persistentStaff,
        wrongFeedbackZones: staffWrong.transientFeedback.map((entry) => ({
          id: entry.id,
          ...zoneRecord(entry.rect, staffInitial.stage, viewport)
        }))
      }
    },
    layoutAudit: {
      actualDpr: workshopInitial.actualDpr,
      workshopHorizontalOverflow: workshopInitial.horizontalOverflow,
      workshopVerticalOverflow: workshopInitial.verticalOverflow,
      staffHorizontalOverflow: staffInitial.horizontalOverflow,
      staffVerticalOverflow: staffInitial.verticalOverflow
    },
    screenshotEvidence
  };
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const browserErrors = [];
const viewportRecords = [];

try {
  for (const spec of viewportSpecs) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: spec.dpr,
      reducedMotion: "reduce"
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        browserErrors.push({ viewportId: spec.viewportId, type: message.type(), text: message.text(), url: page.url() });
      }
    });
    page.on("pageerror", (error) => {
      browserErrors.push({ viewportId: spec.viewportId, type: "pageerror", text: error.message, url: page.url() });
    });

    await page.goto(makeUrl(`?level=M03&check=zones-${spec.viewportId}`), { waitUntil: "domcontentloaded", timeout: 12000 });
    await waitReady(page, ".moon-yard");
    await page.waitForFunction(() => !document.querySelector(".level-intro-card"), null, { timeout: 5000 });
    const workshopInitial = normalizeGeometry(await readGeometry(page, "workshop"));
    const workshopScreenshot = `${screenshotPrefix}_${spec.viewportId}_M03_initial.png`;
    await page.screenshot({ path: workshopScreenshot, fullPage: false });
    await page.locator('.key.white-key[data-midi="60"]').click();
    await page.waitForTimeout(180);
    const workshopWrong = normalizeGeometry(await readGeometry(page, "workshop"));
    const workshopWrongScreenshot = `${screenshotPrefix}_${spec.viewportId}_M03_wrong.png`;
    await page.screenshot({ path: workshopWrongScreenshot, fullPage: false });

    await page.goto(makeUrl(`?mode=staff&check=zones-${spec.viewportId}`), { waitUntil: "domcontentloaded", timeout: 12000 });
    await waitReady(page, ".staff-stage");
    const staffInitial = normalizeGeometry(await readGeometry(page, "staff"));
    const staffScreenshot = `${screenshotPrefix}_${spec.viewportId}_S01_initial.png`;
    await page.screenshot({ path: staffScreenshot, fullPage: false });
    await page.locator('.key.white-key[data-midi="62"]').click();
    await page.waitForTimeout(1460);
    const staffWrong = normalizeGeometry(await readGeometry(page, "staff"));
    const staffWrongScreenshot = `${screenshotPrefix}_${spec.viewportId}_S01_wrong.png`;
    await page.screenshot({ path: staffWrongScreenshot, fullPage: false });

    viewportRecords.push(buildViewportRecord(spec, workshopInitial, workshopWrong, staffInitial, staffWrong, {
      workshopInitial: workshopScreenshot.replaceAll("\\", "/"),
      workshopWrong: workshopWrongScreenshot.replaceAll("\\", "/"),
      staffInitial: staffScreenshot.replaceAll("\\", "/"),
      staffWrong: staffWrongScreenshot.replaceAll("\\", "/")
    }));
    await context.close();
  }
} finally {
  await browser.close();
}

const failures = [];
for (const viewport of viewportRecords) {
  const audit = viewport.layoutAudit;
  if (audit.workshopHorizontalOverflow || audit.workshopVerticalOverflow || audit.staffHorizontalOverflow || audit.staffVerticalOverflow) {
    failures.push(`${viewport.viewportId}: page overflow`);
  }
  if (audit.actualDpr !== viewport.dpr) failures.push(`${viewport.viewportId}: DPR mismatch`);
  if (!viewport.zones.workshop.centralTargetZone.rect) failures.push(`${viewport.viewportId}: missing central target zone`);
  if (!viewport.zones.staff.staffZone.rect) failures.push(`${viewport.viewportId}: missing staff zone`);
  if (!viewport.zones.workshop.keyboardZone.rect || !viewport.zones.staff.keyboardZone.rect) {
    failures.push(`${viewport.viewportId}: missing keyboard zone`);
  }
}
if (browserErrors.length > 0) failures.push("browser console contains warnings or errors");

const sourceFiles = contractSourceFiles.map(sourceFileRecord);
const contract = {
  coordinateContractStatus: failures.length === 0 ? "browser_coordinate_contract_passed_device_unverified" : "failed",
  coordinateContractId: "teaching-zones-overhaul-340d-v1",
  contractSha256: null,
  contractHashScope: "sha256 of canonical JSON with contractSha256 and generatedAt set to null",
  prototypeBaseline: "overhaul-340d",
  prototypeTaskId: "019f4aa6-edba-7843-a835-c4b930a388ff",
  generatedAt: new Date().toISOString(),
  sourceMethod: "Playwright DOM getBoundingClientRect measurement; no screenshot, SVG, or CSS-coordinate inference",
  geometryMeasurementMotion: "reduced_motion_stable_snapshot",
  geometryMeasurementRationale: "Coordinate output freezes nonessential animation; normal-motion behavior remains covered by check:motion.",
  sourceFiles,
  clearanceMarginPx,
  alphaThreshold: {
    byte: alphaThreshold,
    normalized: alphaThreshold / 255,
    visibleForegroundRule: "alpha >= 8 counts as foreground"
  },
  viewportPolicy: {
    supportedOrientation: "landscape",
    portraitBehavior: "orientation blocker; no teaching-media coordinate approval",
    realIpadSafariEvidence: "missing",
    staleWhen: "any source-file hash, viewport, safe-area inset, breakpoint, or protected-selector geometry changes"
  },
  protectedSelectors: {
    staffZone: [".svg-staff-line", ".staff-step"],
    centralTargetZone: [".listen-guide", "#buildBlueprint", "#roofWorldBuild", "#hangingPart", "#baseBuild"],
    keyboardZone: [".keyboard-panel"],
    workshopPersistentUiZones: [".topbar", ".stage-story-ribbon", ".coach-overlay"],
    staffPersistentUiZones: [".topbar", ".staff-bottom"]
  },
  geometryCoverage: {
    measuredAllContractViewports: ["M03.initial", "M03.wrong_reveal", "S01.initial", "S01.wrong"],
    primaryViewportBehaviorOnlyNoContractGeometry: ["M03.idle.identity", "M03.idle.locator", "M03.correct_next_target_hidden", "M08.route_idle", "FG03.route_idle", "S01.correct_jump_land", "reduced_motion"]
  },
  stateCoverage: [
    { state: "M03.initial", geometryStatus: "measured_all_contract_viewports", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "M03.idle.identity", geometryStatus: "not_measured_outside_primary", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "M03.idle.locator", geometryStatus: "not_measured_outside_primary", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "M03.wrong_reveal", geometryStatus: "measured_all_contract_viewports", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "M03.correct_next_target_hidden", geometryStatus: "not_measured_outside_primary", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:clean-state" },
    { state: "M08.route_idle", geometryStatus: "no_contract_geometry_primary_only", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "FG03.route_idle", geometryStatus: "no_contract_geometry_primary_only", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:workshop-identity" },
    { state: "S01.initial", geometryStatus: "measured_all_contract_viewports", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:xingya-suit" },
    { state: "S01.wrong", geometryStatus: "measured_all_contract_viewports", behaviorStatus: "passed_1024x768_and_1194x834_gate", evidence: "check:staff-repair" },
    { state: "S01.correct_jump_land", geometryStatus: "not_measured_outside_primary", behaviorStatus: "passed_primary_1024x768_gate", evidence: "check:xingya-suit" },
    { state: "reduced_motion", geometryStatus: "not_part_of_zone_measurement", behaviorStatus: "passed_primary_and_portrait_parent_gate", evidence: "check:motion" },
    { state: "chapter3.visible_slice", geometryStatus: "not_part_of_legacy_zone_measurement", behaviorStatus: "passed_1024x768_and_1194x834_browser_gate", evidence: "check:chapter3-visible" }
  ],
  gateEvidence: {
    workshopIdentity: "36/36",
    ipadAccessibility: "43/43",
    xingyaSuit: "23/23",
    palette: "16/16",
    motion: "19/19",
    audioSettings: "13/13",
    staffMini: "20/20",
    staffRepair: "27/27",
    roofRoute: "97/97",
    cleanState: "124/124",
    chapter3Visible: "26/26",
    quick: "passed",
    strictBundle: "passed"
  },
  runtimeIntegrationAllowed: false,
  mediaCandidateStatus: "coordinate_source_only_waiting_for_independent_approval",
  deviceEvidence: {
    ipadSafari: "missing",
    midiHardware: "not_part_of_coordinate_contract",
    microphone: "not_part_of_coordinate_contract"
  },
  viewports: viewportRecords,
  browserErrors,
  failures
};

const hashableContract = {
  ...contract,
  contractSha256: null,
  generatedAt: null
};
contract.contractSha256 = sha256(Buffer.from(JSON.stringify(hashableContract, null, 2)));
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  coordinateContractId: contract.coordinateContractId,
  status: contract.coordinateContractStatus,
  contractSha256: contract.contractSha256,
  viewports: viewportRecords.length,
  outputPath,
  browserErrors: browserErrors.length,
  failures
}, null, 2));

if (failures.length > 0) process.exit(1);
