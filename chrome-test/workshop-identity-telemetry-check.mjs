import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/workshop_identity_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
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

function makeUrl(search) {
  const url = new URL(rootUrl);
  url.search = search;
  return url.toString();
}

async function waitReady() {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector("#keyboard", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(180);
}

async function gotoMode(search) {
  await page.goto(makeUrl(search), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady();
}

async function waitLevelIntroGone() {
  await page.waitForFunction(() => !document.querySelector(".level-intro-card"), null, { timeout: 5000 });
}

function m03AnswerLeaks(snapshot) {
  return snapshot.carriers.filter(({ text: carrierText }) => {
    const value = carrierText.replace(/\s+/g, " ").trim();
    return /(^|[^A-Za-z])Re(?=$|[^A-Za-z])/.test(value) ||
      /(^|[^A-Za-z])D(?=$|[^A-Za-z])/.test(value) ||
      value.includes("2黑中") ||
      value.includes("两黑键中间");
  });
}

async function readM03IdentityState() {
  return page.evaluate(() => {
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
    const carrierSelectors = [
      "#stageTitle",
      "#levelTitle",
      "#levelPrompt",
      "#rewardCard",
      "#hangingPartBadge",
      "#hangingPartLabel",
      "#stageStoryRibbon",
      "#stageNoteOrb",
      "#targetNote",
      "#coachBubble",
      "#dinoHint",
      "#modeHint",
      "#nextAction",
      "#buildBlueprint",
      "#baseBuild",
      "#stepStrip",
      ".listen-guide",
      ".level-intro-card",
      ".route-idle-dialog",
      ".stage-input-toast",
      "#feedback"
    ];
    const carriers = carrierSelectors
      .flatMap((selector) => [...document.querySelectorAll(selector)].map((element) => ({ selector, element })))
      .filter(({ element }) => isVisible(element))
      .map(({ selector, element }) => ({
        selector,
        text: element.innerText?.replace(/\s+/g, " ").trim() || ""
      }));
    const hangingPart = document.querySelector("#hangingPart");
    const hangingBadge = document.querySelector("#hangingPartBadge");
    const currentSlot = document.querySelector(".build-slot.current");
    const currentLetter = currentSlot?.querySelector(".slot-note-letter");
    const targetKey = document.querySelector(".key.target");
    const wrongKeyName = document.querySelector('.key.white-key[data-midi="60"] .key-content strong');
    const targetKeyName = targetKey?.querySelector(".key-content strong");
    const wrongLabel = document.querySelector(".key-press-label.label-wrong");
    const hintLabel = document.querySelector(".key-press-label.label-hint");
    const overlapRatio = (first, second) => {
      if (!isVisible(first) || !isVisible(second)) return 0;
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      const width = Math.max(0, Math.min(firstRect.right, secondRect.right) - Math.max(firstRect.left, secondRect.left));
      const height = Math.max(0, Math.min(firstRect.bottom, secondRect.bottom) - Math.max(firstRect.top, secondRect.top));
      return (width * height) / Math.max(1, secondRect.width * secondRect.height);
    };
    const visibleCount = (selector) => [...document.querySelectorAll(selector)].filter(isVisible).length;
    const styleValue = (element, property) => element ? getComputedStyle(element).getPropertyValue(property).trim() : "";
    return {
      idleStage: document.querySelector("#appShell")?.dataset.idleHint,
      identityHidden: document.querySelector("#appShell")?.dataset.listeningIdentityHidden,
      targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible,
      carriers,
      hangingBadgeText: hangingBadge?.textContent?.replace(/\s+/g, " ").trim() || "",
      hangingBadgeVisible: isVisible(hangingBadge),
      currentSlotText: currentSlot?.innerText?.replace(/\s+/g, " ").trim() || "",
      currentLetterText: currentLetter?.textContent?.trim() || "",
      currentLetterVisible: isVisible(currentLetter),
      targetKeyText: targetKey?.innerText?.replace(/\s+/g, " ").trim() || "",
      targetKeyVisible: isVisible(targetKey),
      targetHintLabelVisible: isVisible(hintLabel),
      wrongMarkerVisible: isVisible(wrongLabel),
      wrongMarkerKeyNameOverlapRatio: overlapRatio(wrongLabel, wrongKeyName),
      targetHintKeyNameOverlapRatio: overlapRatio(hintLabel, targetKeyName),
      duplicateRepairVisibility: {
        storyRibbon: isVisible(document.querySelector("#stageStoryRibbon")),
        hangingBadge: isVisible(hangingBadge),
        listeningGuide: isVisible(document.querySelector(".listen-guide")),
        currentSlotLetter: isVisible(currentLetter),
        stageToast: isVisible(document.querySelector(".stage-input-toast"))
      },
      transientClutterCount: visibleCount(".note-feedback-burst, .sprite-effect, .music-flight"),
      hangingColor: styleValue(hangingPart, "--part-color").toUpperCase(),
      currentSlotColor: styleValue(currentSlot, "--part-color").toUpperCase(),
      hangingFilter: hangingPart ? getComputedStyle(hangingPart).filter : "",
      currentSlotArtFilter: currentSlot?.querySelector(".slot-art") ? getComputedStyle(currentSlot.querySelector(".slot-art")).filter : "",
      storyPartFilter: document.querySelector(".story-part-icon") ? getComputedStyle(document.querySelector(".story-part-icon")).filter : "",
      guideText: document.querySelector(".listen-guide")?.innerText?.replace(/\s+/g, " ").trim() || "",
      coachText: document.querySelector("#coachBubble")?.innerText?.replace(/\s+/g, " ").trim() || ""
    };
  });
}

async function readCoachIdleState() {
  return page.evaluate(() => {
    const isVisible = (element) => {
      if (!element) return false;
      let node = element;
      while (node instanceof Element) {
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
        node = node.parentElement;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };
    const levelId = document.querySelector("#appShell")?.dataset.levelId;
    const dialog = levelId === "M07"
      ? document.querySelector("#memoryStarRoute .route-idle-dialog")
      : levelId === "FG03"
      ? document.querySelector("#fgStarRoute .route-idle-dialog")
      : document.querySelector("#coachBubble");
    const dino = levelId === "M07"
      ? document.querySelector("#memoryStarRoute .memory-route-dino")
      : levelId === "FG03"
      ? document.querySelector("#fgStarRoute .fg-route-dino")
      : document.querySelector("#coachDino");
    const dialogRect = dialog?.getBoundingClientRect();
    const dinoRect = dino?.getBoundingClientRect();
    const overlapWidth = dialogRect && dinoRect ? Math.max(0, Math.min(dialogRect.right, dinoRect.right) - Math.max(dialogRect.left, dinoRect.left)) : 0;
    const overlapHeight = dialogRect && dinoRect ? Math.max(0, Math.min(dialogRect.bottom, dinoRect.bottom) - Math.max(dialogRect.top, dinoRect.top)) : 0;
    return {
      stage: document.querySelector("#appShell")?.dataset.idleHint,
      levelId,
      dialogStage: dialog?.dataset.idleStage,
      text: dialog?.innerText?.replace(/\n+/g, " / ").trim() || "",
      dialogVisible: isVisible(dialog),
      dinoVisible: isVisible(dino),
      dialogRect: dialogRect ? { left: dialogRect.left, top: dialogRect.top, right: dialogRect.right, bottom: dialogRect.bottom, width: dialogRect.width, height: dialogRect.height } : null,
      dinoRect: dinoRect ? { left: dinoRect.left, top: dinoRect.top, right: dinoRect.right, bottom: dinoRect.bottom, width: dinoRect.width, height: dinoRect.height } : null,
      overlapRatio: dialogRect && dinoRect ? (overlapWidth * overlapHeight) / Math.max(1, dinoRect.width * dinoRect.height) : 1,
      verticalGap: dialogRect && dinoRect ? dinoRect.top - dialogRect.bottom : -1
    };
  });
}

async function tapMidi(midi, delay = 360) {
  await page.locator(`.key.white-key[data-midi="${midi}"]`).click({ timeout: 5000 });
  await page.waitForTimeout(delay);
}

async function playSequence(sequence, delay = 360) {
  for (const midi of sequence) await tapMidi(midi, delay);
}

async function waitResult() {
  await page.waitForFunction(() => !document.querySelector("#resultModal")?.hidden, null, { timeout: 8000 });
  await page.waitForTimeout(160);
}

async function enterCheckRun(levelId, sequence) {
  await gotoMode(`?level=${levelId}&check=workshop-325a-${levelId.toLowerCase()}-guided`);
  await playSequence(sequence);
  await waitResult();
  await page.evaluate(() => document.querySelector("#modalNext")?.click());
  await page.waitForFunction(() => (
    document.querySelector("#appShell")?.dataset.levelRunMode === "check" &&
    document.querySelector("#resultModal")?.hidden
  ), null, { timeout: 8000 });
  await page.waitForTimeout(180);
}

try {
  await gotoMode("?level=M02&check=workshop-325a-reset");
  await page.evaluate(() => {
    localStorage.removeItem("starDinoCompletedLevels");
    localStorage.removeItem("starDinoLearningStats");
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady();

  const m02Initial = await page.evaluate(() => {
    const hanging = document.querySelector("#hangingPart")?.getBoundingClientRect();
    const badge = document.querySelector("#hangingPartBadge")?.getBoundingClientRect();
    return {
      version: [...document.scripts].map((script) => script.src).find((src) => src.includes("app.js")),
      letter: document.querySelector("#hangingPartBadge b")?.textContent?.trim(),
      solfege: document.querySelector("#hangingPartBadge i")?.textContent?.trim(),
      objectLabel: document.querySelector("#hangingPartLabel")?.textContent?.trim(),
      partColor: document.querySelector("#hangingPart")?.style.getPropertyValue("--part-color").toUpperCase(),
      badgeContained: Boolean(hanging && badge && badge.left >= hanging.left && badge.top >= hanging.top && badge.right <= hanging.right && badge.bottom <= hanging.bottom),
      blueprintHidden: document.querySelector("#buildBlueprint")?.hidden === true && document.querySelector("#buildBlueprint")?.childElementCount === 0,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      overflowY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
    };
  });
  record("prototype loads the 342a runtime version", m02Initial.version?.includes("overhaul-342a"), m02Initial);
  record("current workshop part shows C without visible solfege", m02Initial.letter === "C" && !m02Initial.solfege, m02Initial);
  record("part keeps the object label separate from note identity", m02Initial.objectLabel === "小灯", m02Initial);
  record("M02 keeps its original scene without a construction blueprint", m02Initial.blueprintHidden, m02Initial);
  record("part badge is contained and uses the approved C color", m02Initial.badgeContained && m02Initial.partColor === "#CB84FA", m02Initial);
  record("note badges add no iPad page overflow", !m02Initial.overflowX && !m02Initial.overflowY, m02Initial);
  await page.screenshot({ path: `${screenshotPrefix}_M02_initial.png`, fullPage: false });

  await tapMidi(60, 760);
  const m02AfterC = await page.evaluate(() => ({
    hanging: {
      letter: document.querySelector("#hangingPartBadge b")?.textContent?.trim(),
      solfege: document.querySelector("#hangingPartBadge i")?.textContent?.trim(),
      label: document.querySelector("#hangingPartLabel")?.textContent?.trim()
    },
    blueprintHidden: document.querySelector("#buildBlueprint")?.hidden === true && document.querySelector("#buildBlueprint")?.childElementCount === 0,
    placedWorldSlots: document.querySelectorAll("#baseBuild .build-slot.placed").length
  }));
  record("next part updates to D without visible solfege", m02AfterC.hanging.letter === "D" && !m02AfterC.hanging.solfege, m02AfterC);
  record("real scene keeps placed C while current D appears without a blueprint", m02AfterC.blueprintHidden && m02AfterC.placedWorldSlots === 1, m02AfterC);
  await page.screenshot({ path: `${screenshotPrefix}_M02_after_C.png`, fullPage: false });

  await gotoMode("?level=M02&audit=color-reduced&check=workshop-325a-color-reduced");
  const reduced = await page.evaluate(() => ({
    badgeText: document.querySelector("#hangingPartBadge")?.textContent?.replace(/\s+/g, ""),
    badgeColor: getComputedStyle(document.querySelector("#hangingPartBadge")).getPropertyValue("--note-color").trim().toUpperCase(),
    slotColor: getComputedStyle(document.querySelector(".slot-note-letter")).getPropertyValue("--note-color").trim().toUpperCase(),
    slotLetter: document.querySelector(".build-slot.current .slot-note-letter")?.textContent?.trim(),
    blueprintHidden: document.querySelector("#buildBlueprint")?.hidden === true && document.querySelector("#buildBlueprint")?.childElementCount === 0
  }));
  record("color-reduced mode preserves the C note-name identity", reduced.badgeText === "C" && reduced.slotLetter === "C", reduced);
  record("color-reduced mode removes color as the answer without adding a blueprint", reduced.badgeColor === "#5F7286" && reduced.slotColor === "#5F7286" && reduced.blueprintHidden, reduced);
  await playSequence([60, 62, 64]);
  await waitResult();
  record("color-reduced workshop completes by note/key identity", await page.locator("#resultModal").isVisible());
  await page.screenshot({ path: `${screenshotPrefix}_M02_color_reduced_complete.png`, fullPage: false });

  await gotoMode("?level=M03&check=workshop-325a-listening-identity");
  await waitLevelIntroGone();
  const m03Initial = await readM03IdentityState();
  record("M03 initial state hides every visible Re/D answer carrier", m03Initial.identityHidden === "true" && m03Initial.targetVisible === "false" && m03AnswerLeaks(m03Initial).length === 0, {
    ...m03Initial,
    leaks: m03AnswerLeaks(m03Initial)
  });
  record("M03 initial state clears the part badge and current slot letter", !m03Initial.hangingBadgeVisible && !m03Initial.hangingBadgeText && !m03Initial.currentLetterVisible && !m03Initial.currentLetterText, m03Initial);
  record("M03 initial target-linked objects use neutral identity styling", m03Initial.hangingColor === "#5F7286" && m03Initial.currentSlotColor === "#5F7286" && m03Initial.hangingFilter.includes("grayscale") && m03Initial.currentSlotArtFilter.includes("grayscale") && m03Initial.storyPartFilter.includes("grayscale"), m03Initial);
  await page.screenshot({ path: `${screenshotPrefix}_M03_initial_hidden.png`, fullPage: false });

  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "identity", null, { timeout: 9000 });
  await page.waitForTimeout(120);
  const m03IdentityIdle = await readM03IdentityState();
  record("M03 identity idle replays sound without revealing Re/D", m03IdentityIdle.idleStage === "identity" && m03IdentityIdle.identityHidden === "true" && m03IdentityIdle.targetVisible === "false" && m03AnswerLeaks(m03IdentityIdle).length === 0 && m03IdentityIdle.coachText.includes("♪"), {
    ...m03IdentityIdle,
    leaks: m03AnswerLeaks(m03IdentityIdle)
  });
  await page.screenshot({ path: `${screenshotPrefix}_M03_idle_identity_hidden.png`, fullPage: false });

  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "locator", null, { timeout: 7000 });
  await page.waitForTimeout(120);
  const m03LocatorIdle = await readM03IdentityState();
  record("M03 locator idle stays sound-only and hides the key locator", m03LocatorIdle.idleStage === "locator" && m03LocatorIdle.identityHidden === "true" && m03LocatorIdle.targetVisible === "false" && m03AnswerLeaks(m03LocatorIdle).length === 0 && !m03LocatorIdle.guideText.includes("2黑中"), {
    ...m03LocatorIdle,
    leaks: m03AnswerLeaks(m03LocatorIdle)
  });
  await page.screenshot({ path: `${screenshotPrefix}_M03_idle_locator_hidden.png`, fullPage: false });

  await tapMidi(60, 420);
  const m03Wrong = await readM03IdentityState();
  const m03WrongSceneSurfaces = m03AnswerLeaks(m03Wrong);
  record("M03 wrong answer keeps one role-correct scene repair surface", m03Wrong.identityHidden === "false" && m03WrongSceneSurfaces.length === 1 && m03WrongSceneSurfaces[0]?.selector === "#coachBubble" && m03Wrong.coachText.includes("轮子唱 Re") && m03Wrong.coachText.includes("你来弹 D") && !m03Wrong.coachText.includes("唱 Re/D") && !m03Wrong.coachText.includes("星芽唱"), {
    ...m03Wrong,
    sceneRepairSurfaces: m03WrongSceneSurfaces
  });
  record("M03 wrong answer uses the target key as the only second repair system", m03Wrong.targetVisible === "true" && m03Wrong.targetKeyVisible && !m03Wrong.targetKeyText.includes("Re") && m03Wrong.targetKeyText.includes("D") && m03Wrong.targetKeyText.includes("2黑中") && m03Wrong.targetHintLabelVisible, m03Wrong);
  record("M03 wrong answer hides duplicate cards, part identity, toast, and answer particles", Object.values(m03Wrong.duplicateRepairVisibility).every((visible) => !visible) && m03Wrong.transientClutterCount === 0 && m03Wrong.hangingColor === "#5F7286" && m03Wrong.currentSlotColor === "#5F7286" && m03Wrong.hangingFilter.includes("grayscale") && m03Wrong.currentSlotArtFilter.includes("grayscale"), m03Wrong);
  record("M03 wrong and target key markers leave both key names readable", m03Wrong.wrongMarkerVisible && m03Wrong.wrongMarkerKeyNameOverlapRatio === 0 && m03Wrong.targetHintKeyNameOverlapRatio === 0, m03Wrong);
  await page.screenshot({ path: `${screenshotPrefix}_M03_wrong_revealed.png`, fullPage: false });

  const m07Sequence = [60, 62, 64, 62, 60];
  await enterCheckRun("M07", m07Sequence);
  const initialCheck = await page.evaluate(() => ({
    runMode: document.querySelector("#appShell")?.dataset.levelRunMode,
    targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible
  }));
  record("M07 check starts without a target-key answer", initialCheck.runMode === "check" && initialCheck.targetVisible === "false", initialCheck);

  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "identity", null, { timeout: 9000 });
  const identityHint = await page.evaluate(() => ({
    stage: document.querySelector("#appShell")?.dataset.idleHint,
    bubble: document.querySelector("#memoryStarRoute .route-idle-dialog")?.innerText?.replace(/\n+/g, " / "),
    visible: (() => {
      const dialog = document.querySelector("#memoryStarRoute .route-idle-dialog");
      const rect = dialog?.getBoundingClientRect();
      return Boolean(dialog && rect && getComputedStyle(dialog).visibility !== "hidden" && rect.width > 0 && rect.height > 0);
    })(),
    targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible
  }));
  record("first idle hint is a visible dino dialog connecting solfege and letter", identityHint.stage === "identity" && identityHint.visible && identityHint.bubble?.includes("Do") && identityHint.bubble?.includes("C") && identityHint.targetVisible === "false", identityHint);
  await page.screenshot({ path: `${screenshotPrefix}_M07_idle_identity.png`, fullPage: false });

  await playSequence(m07Sequence, 280);
  await waitResult();
  const softResult = await page.evaluate(() => ({
    resultKind: document.querySelector("#resultModal")?.dataset.result,
    title: document.querySelector("#resultModal h2")?.textContent
  }));
  record("waiting for the identity reminder does not fail a correct reduced-cue run", softResult.resultKind === "level", softResult);

  await enterCheckRun("M07", m07Sequence);
  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "locator", null, { timeout: 13000 });
  const locatorHint = await page.evaluate(() => ({
    stage: document.querySelector("#appShell")?.dataset.idleHint,
    bubble: document.querySelector("#memoryStarRoute .route-idle-dialog")?.innerText?.replace(/\n+/g, " / "),
    visible: (() => {
      const dialog = document.querySelector("#memoryStarRoute .route-idle-dialog");
      const rect = dialog?.getBoundingClientRect();
      return Boolean(dialog && rect && getComputedStyle(dialog).visibility !== "hidden" && rect.width > 0 && rect.height > 0);
    })(),
    dinoHint: document.querySelector("#dinoHint")?.textContent,
    targetVisible: document.querySelector("#keyboard")?.dataset.targetVisible
  }));
  record("second idle hint visibly gives the key locator without a permanent target key", locatorHint.stage === "locator" && locatorHint.visible && locatorHint.bubble?.includes("Do") && locatorHint.bubble?.includes("C") && locatorHint.bubble?.includes("两黑键") && locatorHint.targetVisible === "false", locatorHint);
  await page.screenshot({ path: `${screenshotPrefix}_M07_idle_locator.png`, fullPage: false });

  await playSequence(m07Sequence, 280);
  await waitResult();
  const strongResult = await page.evaluate(() => ({
    resultKind: document.querySelector("#resultModal")?.dataset.result,
    title: document.querySelector("#resultModal h2")?.textContent
  }));
  record("using the locator hint keeps the run out of stable mastery", strongResult.resultKind === "level-check", strongResult);

  await gotoMode("?level=M08&check=workshop-325a-m08-route-bubble");
  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "identity", null, { timeout: 9000 });
  await page.waitForTimeout(160);
  const m08Route = await readCoachIdleState();
  record("M08 coach has a visible identity bubble with the expected Do/C copy", m08Route.stage === "identity" && m08Route.levelId === "M08" && m08Route.dialogVisible && m08Route.text.includes("Do") && m08Route.text.includes("C"), m08Route);
  record("M08 coach bubble stays above and clear of the complete pressure-suit character", m08Route.dinoVisible && m08Route.overlapRatio === 0 && m08Route.verticalGap >= 18 && m08Route.dinoRect?.width >= 80 && m08Route.dinoRect?.height >= 80, m08Route);
  await page.screenshot({ path: `${screenshotPrefix}_M08_idle_identity.png`, fullPage: false });

  await gotoMode("?level=FG03&check=workshop-325a-fg03-route-bubble");
  await page.waitForFunction(() => document.querySelector("#appShell")?.dataset.idleHint === "identity", null, { timeout: 9000 });
  await page.waitForTimeout(160);
  const fg03Route = await readCoachIdleState();
  record("FG03 coach has a visible identity bubble with the expected Mi/E copy", fg03Route.stage === "identity" && fg03Route.levelId === "FG03" && fg03Route.dialogVisible && fg03Route.text.includes("Mi") && fg03Route.text.includes("E"), fg03Route);
  record("FG03 coach bubble keeps the pressure-suit character readable", fg03Route.dinoVisible && fg03Route.overlapRatio <= 0.04 && fg03Route.dinoRect?.width >= 70 && fg03Route.dinoRect?.height >= 70, fg03Route);
  await page.screenshot({ path: `${screenshotPrefix}_FG03_idle_identity.png`, fullPage: false });

  await gotoMode("?level=M01&check=workshop-325a-response-reset");
  await page.evaluate(() => {
    localStorage.removeItem("starDinoCompletedLevels");
    localStorage.removeItem("starDinoLearningStats");
  });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady();
  record("response telemetry is not visible on the child screen", !(await page.locator("#parentResponseRecord").isVisible()));
  await page.waitForTimeout(620);
  await tapMidi(62, 260);
  await tapMidi(60, 520);
  await waitResult();

  const storedResponse = await page.evaluate(() => JSON.parse(localStorage.getItem("starDinoLearningStats") || "{}").levels?.M01?.lastResponse || null);
  record("M01 stores a local first-response summary", storedResponse?.stepCount === 1 && storedResponse?.totalInputs === 2 && storedResponse?.wrongInputs === 1, storedResponse);
  record("first-try accuracy records the wrong first answer", storedResponse?.firstTryCorrect === 0 && storedResponse?.firstTryAccuracy === 0, storedResponse);
  record("response time is recorded without entering mastery logic", storedResponse?.medianFirstResponseMs >= 300 && storedResponse?.timingUsedForMastery === false, storedResponse);

  await gotoMode("?level=M01&check=workshop-325a-response-parent");
  await page.locator("#playParentGate").click();
  await page.waitForSelector("#parentModal:not([hidden])", { timeout: 5000 });
  const parentRecord = await page.evaluate(() => {
    const card = document.querySelector(".parent-card")?.getBoundingClientRect();
    const recordElement = document.querySelector("#parentResponseRecord");
    const rect = recordElement?.getBoundingClientRect();
    return {
      text: recordElement?.textContent?.trim(),
      contained: Boolean(card && rect && rect.left >= card.left && rect.right <= card.right && rect.top >= card.top && rect.bottom <= card.bottom),
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    };
  });
  record("parent view shows timing as a pressure-free record", parentRecord.text?.includes("首答 0/1") && parentRecord.text?.includes("不限时"), parentRecord);
  record("parent response record remains contained at iPad size", parentRecord.contained && !parentRecord.overflowX, parentRecord);
  await page.screenshot({ path: `${screenshotPrefix}_M01_parent_record.png`, fullPage: false });

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
fs.writeFileSync(`${screenshotPrefix}_result.json`, JSON.stringify({
  total: checks.length,
  passed: checks.length - failed.length,
  failed,
  browserErrors
}, null, 2));
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`workshop identity and telemetry checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
