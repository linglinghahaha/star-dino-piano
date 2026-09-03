import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotDir = process.argv[3] || "screenshots/child_note_names_346a";
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
  { id: "garden", search: "?mode=garden&check=child-note-names" },
  { id: "chapter4-lp01", search: "?mode=chapter4&directMode=true&formalSession=false&lesson=LP01&check=child-note-names" },
  { id: "chapter4-lp02", search: "?mode=chapter4&directMode=true&formalSession=false&lesson=LP02&check=child-note-names" },
  { id: "chapter4-lp04", search: "?mode=chapter4&directMode=true&formalSession=false&lesson=LP04&check=child-note-names" }
];

fs.mkdirSync(screenshotDir, { recursive: true });
const checks = [];
const browserErrors = [];
const record = (name, pass, details = {}) => checks.push({ name, pass: Boolean(pass), details });
const indexSource = fs.readFileSync("index.html", "utf8");
const staticStaffFeedback = indexSource.match(/id="staffFeedback"[^>]*>([^<]*)</)?.[1]?.trim() || "";
record("static staff fallback uses note-name wording before runtime render", staticStaffFeedback === "看谱位，读音名，找琴键。", { staticStaffFeedback });
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
      const allowed = "#coachBubble, .route-idle-dialog, #gardenSpeech, #staffDinoWrap, #chapter4Speech, #parentModal";
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
        if (text && visible(node)) textRows.push({
          text,
          tag: node.parentElement?.tagName || "",
          id: node.parentElement?.id || "",
          className: node.parentElement?.className || "",
          chapter4: Boolean(node.parentElement?.closest("#chapter4Panel, #keyboardPanel"))
        });
      }
      const tokenPattern = /(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/;
      const leaks = textRows.filter((row) => tokenPattern.test(row.text) || /法法|索尔/.test(row.text));
      const pseudoElements = [...document.querySelectorAll("#memoryStarRoute .memory-route-node, #fgStarRoute .fg-route-node, #chapter4Panel *, #keyboardPanel *")]
        .filter((element) => !element.closest("#chapter4Speech"));
      const pseudoRows = pseudoElements.flatMap((element) =>
        ["::before", "::after"].map((pseudo) => {
          const style = getComputedStyle(element, pseudo);
          const content = style.content?.replace(/^['\"]|['\"]$/g, "").trim() || "";
          return {
            id: element.id || "",
            className: element.className || "",
            chapter4: Boolean(element.closest("#chapter4Panel, #keyboardPanel")),
            pseudo,
            content,
            visible: content && content !== "none" && content !== "normal" && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01
          };
        })
      ).filter((row) => row.visible);
      const pseudoLeaks = pseudoRows.filter((row) => tokenPattern.test(row.content) || /法法|索尔/.test(row.content));
      const routeAttributeLeaks = [...document.querySelectorAll("#memoryStarRoute [aria-label], #memoryStarRoute [title], #fgStarRoute [aria-label], #fgStarRoute [title]")]
        .filter((element) => visible(element))
        .map((element) => ({
          tag: element.tagName,
          id: element.id || "",
          value: [element.getAttribute("aria-label"), element.getAttribute("title"), element.getAttribute("alt")].filter(Boolean).join(" ")
        }))
        .filter((row) => tokenPattern.test(row.value) || /法法|索尔/.test(row.value));
      const accessibleLeaks = [...document.querySelectorAll("[aria-label], [title], [alt]")]
        .filter((element) => elementVisible(element) && !element.closest(allowed))
        .map((element) => ({
          tag: element.tagName,
          id: element.id || "",
          className: element.className || "",
          value: [element.getAttribute("aria-label"), element.getAttribute("title"), element.getAttribute("alt")].filter(Boolean).join(" ")
        }))
        .filter((row) => tokenPattern.test(row.value) || /法法|索尔|Do\s*[/→-]\s*C/.test(row.value));
      const chapter4TextLeaks = textRows.filter((row) => row.chapter4 && (tokenPattern.test(row.text) || /法法|索尔|\b[A-G][34]\b/.test(row.text)));
      const chapter4AccessibleValue = (element) => {
        const labelledBy = (element.getAttribute("aria-labelledby") || "")
          .split(/\s+/)
          .filter(Boolean)
          .map((id) => document.getElementById(id)?.textContent || "")
          .join(" ");
        return [
          element.getAttribute("aria-label"),
          element.getAttribute("aria-description"),
          element.getAttribute("title"),
          element.getAttribute("alt"),
          labelledBy
        ].filter(Boolean).join(" ");
      };
      const chapter4AccessibleLeaks = [...document.querySelectorAll("#chapter4Panel [aria-label], #chapter4Panel [aria-labelledby], #chapter4Panel [aria-description], #chapter4Panel [title], #chapter4Panel [alt], #keyboardPanel [aria-label], #keyboardPanel [aria-labelledby], #keyboardPanel [aria-description], #keyboardPanel [title], #keyboardPanel [alt]")]
        .filter((element) => elementVisible(element) && !element.closest(allowed))
        .map((element) => ({
          tag: element.tagName,
          id: element.id || "",
          className: element.className || "",
          value: chapter4AccessibleValue(element)
        }))
        .filter((row) => tokenPattern.test(row.value) || /法法|索尔|\b[A-G][34]\b/.test(row.value));
      const chapter4PseudoLeaks = pseudoRows.filter((row) => row.chapter4 && (tokenPattern.test(row.content) || /法法|索尔|\b[A-G][34]\b/.test(row.content)));
      const keys = [...document.querySelectorAll(".key.white-key:not(.reserved-key)")].map((key) => ({
        text: key.querySelector(".key-content")?.innerText?.replace(/\s+/g, "").trim() || "",
        aria: key.getAttribute("aria-label") || ""
      }));
      const chapter4WhiteKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .white-key")].map((key) => ({
        midi: Number(key.dataset.midi),
        text: key.innerText?.replace(/\s+/g, " ").trim() || "",
        aria: key.getAttribute("aria-label") || ""
      }));
      const chapter4BlackKeys = [...document.querySelectorAll("#keyboard.chapter4-keyboard .black-key")].map((key) => ({
        midi: Number(key.dataset.midi),
        note: key.dataset.note || null,
        pitchName: key.dataset.pitchName || null,
        aria: key.getAttribute("aria-label") || "",
        isBlack: key.classList.contains("black-key")
      }));
      const routeLabelMetrics = [...document.querySelectorAll("#memoryStarRoute:not([hidden]) .memory-route-label strong, #fgStarRoute:not([hidden]) .fg-route-label strong")].map((label) => {
        const style = getComputedStyle(label);
        const labelShell = label.closest(".memory-route-label, .fg-route-label");
        const shellStyle = labelShell ? getComputedStyle(labelShell) : null;
        const rect = label.getBoundingClientRect();
        let cumulativeOpacity = 1;
        let cursor = label;
        while (cursor) {
          const opacity = Number.parseFloat(getComputedStyle(cursor).opacity);
          cumulativeOpacity *= Number.isFinite(opacity) ? opacity : 1;
          if (cursor.matches(".memory-star-route, .fg-star-route")) break;
          cursor = cursor.parentElement;
        }
        const rgb = (value) => {
          const channels = value.match(/[\d.]+/g)?.map(Number) || [];
          return channels.length >= 3 ? channels.slice(0, 3) : null;
        };
        const luminance = (channels) => {
          const linear = channels.map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
        };
        const foreground = rgb(style.color);
        const background = rgb(shellStyle?.backgroundColor || "");
        const contrastRatio = foreground && background
          ? (Math.max(luminance(foreground), luminance(background)) + 0.05) / (Math.min(luminance(foreground), luminance(background)) + 0.05)
          : 0;
        return {
          text: label.textContent?.trim() || "",
          width: rect.width,
          height: rect.height,
          opacity: Number(style.opacity),
          parentOpacity: Number(shellStyle?.opacity || 1),
          cumulativeOpacity,
          color: style.color,
          backgroundColor: shellStyle?.backgroundColor || "",
          contrastRatio,
          fontSize: Number.parseFloat(style.fontSize) || 0,
          visible: elementVisible(label)
        };
      });
      const auditStyle = getComputedStyle(document.querySelector("#appShell"), "::after");
      const auditBadge = {
        content: auditStyle.content,
        width: Number.parseFloat(auditStyle.width),
        height: Number.parseFloat(auditStyle.height),
        top: auditStyle.top,
        left: auditStyle.left,
        right: auditStyle.right,
        bottom: auditStyle.bottom,
        boxShadow: auditStyle.boxShadow
      };
      return {
        leaks,
        routeAttributeLeaks,
        accessibleLeaks,
        pseudoLeaks,
        pseudoRows,
        chapter4TextLeaks,
        chapter4AccessibleLeaks,
        chapter4PseudoLeaks,
        chapter4WhiteKeys,
        chapter4BlackKeys,
        chapter4Phase: document.querySelector("#chapter4Scene")?.dataset.chapter4Phase || "",
        chapter4Speech: document.querySelector("#chapter4Speech")?.innerText?.replace(/\s+/g, " ").trim() || "",
        keys,
        m07: [...document.querySelectorAll("#memoryStarRoute .memory-route-label strong")].map((item) => item.textContent?.trim() || ""),
        fg03: [...document.querySelectorAll("#fgStarRoute .fg-route-label strong")].map((item) => item.textContent?.trim() || ""),
        m08Blueprint: [...document.querySelectorAll("#buildBlueprint:not([hidden]) .blueprint-part b")].map((item) => item.textContent?.trim() || ""),
        m08RoofRouteVisible: elementVisible(document.querySelector("#roofScaleRoute")),
        routeAria: document.querySelector("#memoryStarRoute:not([hidden]), #fgStarRoute:not([hidden])")?.getAttribute("aria-label") || "",
        routeDinoCount: [document.querySelector(".memory-route-dino"), document.querySelector(".fg-route-dino"), document.querySelector("#coachDino")].filter(elementVisible).length,
        routeBubbleCount: [document.querySelector(".route-action-dialog"), document.querySelector(".route-idle-dialog:not(.route-action-dialog)"), document.querySelector("#coachBubble")].filter(elementVisible).length,
        routeNodeStates: [...document.querySelectorAll("#memoryStarRoute:not([hidden]) .memory-route-node, #fgStarRoute:not([hidden]) .fg-route-node")].map((node) => ({
          note: node.dataset.note || "",
          state: node.classList.contains("done") ? "done" : node.classList.contains("current") ? "current" : "upcoming"
        })),
        hangingBadge: document.querySelector("#hangingPartBadge")?.innerText?.replace(/\s+/g, "").trim() || "",
        actionCue: document.querySelector("#nextAction")?.innerText?.replace(/\s+/g, " ").trim() || "",
        routeLabelMetrics,
        auditBadge,
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        overflowY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
      };
    });

    const setRouteStep = async (routeId, stepIndex) => {
      await page.evaluate(({ routeId, stepIndex }) => {
        state.stepIndex = stepIndex;
        state.lastInputResult = null;
        const level = activeLevel();
        if (routeId === "M07") renderMemoryStarRoute(level);
        if (routeId === "FG03") renderFgStarRoute(level);
      }, { routeId, stepIndex });
      await page.waitForTimeout(80);
    };

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
        record(`${viewport.id} ${state.id}: child-visible text and accessible labels use note names outside dinosaur bubbles`, result.leaks.length === 0 && result.routeAttributeLeaks.length === 0 && result.accessibleLeaks.length === 0 && result.pseudoLeaks.length === 0, result);
        if (!state.id.startsWith("chapter4-")) {
          record(`${viewport.id} ${state.id}: piano keycaps and ARIA use note names only`,
            result.keys.map((key) => key.text).join("") === "CDEFG" &&
            result.keys.every((key, index) => key.aria.startsWith(["C", "D", "E", "F", "G"][index]) && !/(^|[^A-Za-z])(Do|Re|Mi|Fa|Sol)(?=$|[^A-Za-z])/.test(key.aria)),
            result.keys);
        }
        if (state.id === "chapter4-lp01") {
          record(`${viewport.id} LP01: ordinary text, ARIA and pseudo-elements exclude solfege and octave numbers`, result.chapter4TextLeaks.length === 0 && result.chapter4AccessibleLeaks.length === 0 && result.chapter4PseudoLeaks.length === 0, result);
          record(`${viewport.id} LP01: only the character dialogue may use Do`, result.chapter4Speech.includes("Do") && result.chapter4TextLeaks.length === 0, result.chapter4Speech);
        }
        if (state.id === "chapter4-lp02") {
          const expectedLetters = "CDEFGABCDEFGAB";
          record(`${viewport.id} LP02: 14 white keys use letter identities without C3/C4 or solfege`,
            result.chapter4WhiteKeys.length === 14 &&
            result.chapter4WhiteKeys.map((key) => key.text.charAt(0)).join("") === expectedLetters &&
            result.chapter4WhiteKeys.every((key) => !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(`${key.text} ${key.aria}`)),
            result.chapter4WhiteKeys);
          record(`${viewport.id} LP02: ten black keys keep neutral black-key accessibility identities`,
            result.chapter4BlackKeys.length === 10 && result.chapter4BlackKeys.every((key) => key.note === null && key.aria.startsWith("黑键") && !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(key.aria)),
            result.chapter4BlackKeys);
          record(`${viewport.id} LP02: ordinary text, ARIA and pseudo-elements exclude solfege and octave numbers`, result.chapter4TextLeaks.length === 0 && result.chapter4AccessibleLeaks.length === 0 && result.chapter4PseudoLeaks.length === 0, result);
        }
        if (state.id === "chapter4-lp04") {
          const expectedLetters = "CDEFGABCDEFGAB";
          record(`${viewport.id} LP04: fourteen white keys retain C-D-E-F-G-A-B labels and Chinese white-key ARIA without octave digits or solfege`,
            result.chapter4WhiteKeys.length === 14 &&
            result.chapter4WhiteKeys.map((key) => key.text.charAt(0)).join("") === expectedLetters &&
            result.chapter4WhiteKeys.every((key) => key.aria.includes("白键") && !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(`${key.text} ${key.aria}`)),
            result.chapter4WhiteKeys);
          const expectedBlackKeyNames = ["C#", "D#", "F#", "G#", "A#", "C#", "D#", "F#", "G#", "A#"];
          record(`${viewport.id} LP04: ten black keys expose sharp note-name ARIA without null identities, octave digits, or solfege`,
            result.chapter4BlackKeys.length === 10 &&
            result.chapter4BlackKeys.every((key, index) =>
              key.note === null &&
              key.aria === `${expectedBlackKeyNames[index]} 黑键` &&
              !/null|undefined|[0-9]|Do|Re|Mi|Fa|Sol/.test(key.aria)),
            result.chapter4BlackKeys);
          record(`${viewport.id} LP04: ordinary DOM text, ARIA, and pseudo-elements remain letter-only while the character introduces Mi-Re-Do with E-D-C`,
            result.chapter4TextLeaks.length === 0 &&
            result.chapter4AccessibleLeaks.length === 0 &&
            result.chapter4PseudoLeaks.length === 0 && /Mi.*Re.*Do/.test(result.chapter4Speech) && /E.*D.*C/.test(result.chapter4Speech),
            result);
        }
        record(`${viewport.id} ${state.id}: note-name layout has no page overflow`, !result.overflowX && !result.overflowY, result);
        if (state.id === "M07") {
          record(`${viewport.id}: M07 route labels are C-D-E-D-C`, result.m07.join("") === "CDEDC", result.m07);
          record(`${viewport.id}: M07 current-part and action badges use only note names`, result.hangingBadge === "C" && !/(Do|Re|Mi|Fa|Sol|法法|索尔)/.test(result.actionCue), result);
          record(`${viewport.id}: M07 exposes one route character, one dialogue, and a letter-only route name`, result.routeDinoCount === 1 && result.routeBubbleCount === 1 && result.routeAria === "星星路线 C D E D C", result);
          record(`${viewport.id}: M07 route visible text and ARIA contain no solfege outside the dinosaur dialogue`, result.leaks.length === 0 && result.routeAttributeLeaks.length === 0 && result.pseudoLeaks.length === 0 && result.routeAria === "星星路线 C D E D C", result);
        }
        if (state.id === "FG03") {
          record(`${viewport.id}: FG03 route labels are E-F-G`, result.fg03.join("") === "EFG", result.fg03);
          record(`${viewport.id}: FG03 exposes one route character, one dialogue, and a letter-only route name`, result.routeDinoCount === 1 && result.routeBubbleCount === 1 && result.routeAria === "星星路线 E F G", result);
        }
        if (state.id === "M08") {
          record(`${viewport.id}: M08 visible blueprint remains letter-only C-D-E-F-G`, result.m08Blueprint.join("") === "CDEFG" && !result.m08RoofRouteVisible && result.leaks.length === 0, result);
        }
        await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_${state.id}.png`), fullPage: false });
      }

      await open("?mode=chapter4&directMode=true&formalSession=false&lesson=LP01&check=child-note-names-phases");
      await page.locator("#chapter4StartCheck").click();
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp01-model", null, { timeout: 12000 });
      let chapter4Result = await inspect();
      record(`${viewport.id} LP01 model: character mapping is allowed while ordinary surfaces stay letter-only`, chapter4Result.chapter4Speech.includes("Do") && chapter4Result.chapter4TextLeaks.length === 0 && chapter4Result.chapter4AccessibleLeaks.length === 0 && chapter4Result.chapter4PseudoLeaks.length === 0, chapter4Result);
      await page.locator("#chapter4StartCheck").click();
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "awaiting-response", null, { timeout: 12000 });
      chapter4Result = await inspect();
      record(`${viewport.id} LP01 check: neutral prompt exposes no high/low or octave identity`, chapter4Result.chapter4TextLeaks.length === 0 && chapter4Result.chapter4AccessibleLeaks.length === 0 && chapter4Result.chapter4PseudoLeaks.length === 0 && !/(低音|中央|高音|C3|C4)/.test(chapter4Result.chapter4Speech), chapter4Result);
      const wrongBubbleId = await page.evaluate(() => {
        const attempt = ensureChapter4Attempt();
        const target = attempt.sequence[attempt.callIndex];
        return Object.entries(attempt.bubbleMapping).find(([, midi]) => midi !== target)?.[0];
      });
      await page.locator(`[data-bubble-id="${wrongBubbleId}"]`).click();
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "wrong", null, { timeout: 12000 });
      chapter4Result = await inspect();
      record(`${viewport.id} LP01 wrong feedback: ordinary child surfaces remain free of solfege and register answers`, chapter4Result.chapter4TextLeaks.length === 0 && chapter4Result.chapter4AccessibleLeaks.length === 0 && chapter4Result.chapter4PseudoLeaks.length === 0, chapter4Result);
      await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_chapter4-lp01-wrong.png`), fullPage: false });

      await open("?mode=chapter4&directMode=true&formalSession=false&lesson=LP02&check=child-note-names-phases");
      await page.locator('#keyboard .black-key[data-midi="49"]').click();
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp02-wrong", null, { timeout: 7000 });
      chapter4Result = await inspect();
      record(`${viewport.id} LP02 black-key feedback: black key never becomes a white-key note identity`, chapter4Result.chapter4Speech.includes("黑键") && chapter4Result.chapter4TextLeaks.length === 0 && chapter4Result.chapter4AccessibleLeaks.length === 0 && chapter4Result.chapter4PseudoLeaks.length === 0 && chapter4Result.chapter4BlackKeys.every((key) => key.note === null), chapter4Result);
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp02-guide", null, { timeout: 7000 });
      await page.locator('#keyboard .white-key[data-midi="48"]').click();
      await page.waitForFunction(() => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === "lp02-complete", null, { timeout: 7000 });
      chapter4Result = await inspect();
      record(`${viewport.id} LP02 complete: result and keyboard remain letter-only outside the character dialogue`, chapter4Result.chapter4TextLeaks.length === 0 && chapter4Result.chapter4AccessibleLeaks.length === 0 && chapter4Result.chapter4PseudoLeaks.length === 0, chapter4Result);
      await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_chapter4-lp02-complete.png`), fullPage: false });

      const lp03ExpectedWhiteLetters = "CDEFGABCDEFGAB";
      const lp03SurfacePass = (result) =>
        result.chapter4TextLeaks.length === 0 &&
        result.chapter4AccessibleLeaks.length === 0 &&
        result.chapter4PseudoLeaks.length === 0;
      const lp03KeyboardPass = (result) =>
        result.chapter4WhiteKeys.length === 14 &&
        result.chapter4WhiteKeys.map((key) => key.text.charAt(0)).join("") === lp03ExpectedWhiteLetters &&
        result.chapter4WhiteKeys.every((key) => !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(`${key.text} ${key.aria}`)) &&
        result.chapter4BlackKeys.length === 10 &&
        result.chapter4BlackKeys.every((key) => key.isBlack && key.note === null && key.aria.startsWith("黑键") && !/(Do|Re|Mi|Fa|Sol|\b[A-G][34]\b)/.test(key.aria));
      const waitLp03Phase = (phase, timeout = 14000) => page.waitForFunction(
        (expected) => document.querySelector("#chapter4Scene")?.dataset.chapter4Phase === expected,
        phase,
        { timeout }
      );
      const waitLp03Response = (midi, timeout = 14000) => page.waitForFunction(
        (target) => {
          const attempt = ensureChapter4Attempt?.();
          return attempt?.targetMidi === target && attempt.phase === "lp03-awaiting-response" && attempt.inputArmed === true;
        },
        midi,
        { timeout }
      );
      const openLp03 = async (suffix = "") => {
        await open(`?mode=chapter4&directMode=true&formalSession=false&lesson=LP03&check=child-note-names-lp03${suffix}`);
        await waitLp03Phase("lp03-model-ready");
      };
      const recordLp03Policy = async (label, { speechIncludes = [] } = {}) => {
        const result = await inspect();
        const surfacePass = lp03SurfacePass(result) && speechIncludes.every((value) => result.chapter4Speech.includes(value));
        record(`${viewport.id} LP03 ${label}: visible text, non-character ARIA/title/label and pseudo-elements keep solfege and octave labels inside the character speech`, surfacePass, result);
        record(`${viewport.id} LP03 ${label}: fourteen white keys remain letter-only and ten black keys remain neutral black-key controls`, lp03KeyboardPass(result), result);
        await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_chapter4-lp03_${label}.png`), fullPage: false });
        return result;
      };

      await openLp03();
      await recordLp03Policy("initial");
      await page.locator("#chapter4StartCheck").click();
      await waitLp03Phase("lp03-target-playing");
      await recordLp03Policy("target");
      await waitLp03Response(48);
      await recordLp03Policy("response");
      await page.locator('#keyboard [data-midi="53"]').click();
      await waitLp03Phase("lp03-wrong-repair-playing");
      await recordLp03Policy("wrong-white", { speechIncludes: ["F", "C"] });

      await openLp03();
      await page.locator("#chapter4StartCheck").click();
      await waitLp03Response(48);
      await page.locator('#keyboard [data-midi="49"]').click();
      await waitLp03Phase("lp03-wrong-repair-playing");
      await recordLp03Policy("wrong-black", { speechIncludes: ["C#", "黑键", "C"] });

      await openLp03();
      await page.locator("#chapter4StartCheck").click();
      await waitLp03Response(48);
      await page.locator('#keyboard [data-midi="60"]').click();
      await waitLp03Phase("lp03-wrong-repair-playing");
      await recordLp03Policy("same-name-wrong-octave", { speechIncludes: ["都是 C", "更低"] });

      await openLp03();
      await page.locator("#chapter4StartCheck").click();
      await waitLp03Response(48);
      await page.locator('#keyboard [data-midi="53"]').click();
      await waitLp03Response(48);
      await page.locator('#keyboard [data-midi="53"]').click();
      await waitLp03Phase("lp03-assisted");
      await recordLp03Policy("assisted");
      await page.locator("#chapter4VisualAssist").click();
      await waitLp03Phase("lp03-visual-assist");
      await recordLp03Policy("visual-assist");

      await openLp03();
      await page.locator("#chapter4StartCheck").click();
      await waitLp03Response(48);
      await page.evaluate(() => window.completeLp03Modeled("child-note-name-gate"));
      await waitLp03Phase("lp03-modeled-playing");
      await recordLp03Policy("modeled");

      await openLp03();
      for (const midi of [48, 50, 52]) {
        await page.locator("#chapter4StartCheck").click();
        await waitLp03Response(midi);
        await page.locator(`#keyboard [data-midi="${midi}"]`).click();
        if (midi !== 52) await waitLp03Phase("lp03-model-ready");
      }
      await waitLp03Phase("lp03-seam-awaiting-response", 16000);
      await recordLp03Policy("seam");
      const seamSequence = await page.evaluate(() => ensureChapter4Attempt()?.seamCheck?.sequence?.slice() || []);
      for (let index = 0; index < seamSequence.length; index += 1) {
        await page.locator(`#keyboard [data-midi="${seamSequence[index]}"]`).click();
        if (index < seamSequence.length - 1) await waitLp03Phase("lp03-seam-awaiting-response", 14000);
      }
      await waitLp03Phase("lp03-complete", 16000);
      await recordLp03Policy("complete");

      await openLp03("&audit=color-reduced");
      await recordLp03Policy("reduced");
      await openLp03("&audit=high-contrast");
      await page.evaluate(() => {
        document.documentElement.dataset.contrast = "more";
        renderChapter4Screen();
      });
      await recordLp03Policy("high-contrast");

      if (viewport.id === "ipad-1024x768") {
        await open("?level=M07&check=child-note-names-forced-refresh");
        await page.evaluate(async () => {
          if ("caches" in window) {
            for (const key of await caches.keys()) await caches.delete(key);
          }
          if ("serviceWorker" in navigator) {
            for (const registration of await navigator.serviceWorker.getRegistrations()) await registration.update();
          }
        });
        await page.reload({ waitUntil: "domcontentloaded", timeout: 20000 });
        await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 20000 });
        await page.waitForTimeout(260);
        const refreshed = await inspect();
        record("ipad-1024x768 M07 forced refresh: route and child ARIA remain letter-only", refreshed.m07.join("") === "CDEDC" && refreshed.routeAria === "星星路线 C D E D C" && refreshed.leaks.length === 0 && refreshed.accessibleLeaks.length === 0 && refreshed.routeAttributeLeaks.length === 0 && refreshed.pseudoLeaks.length === 0, refreshed);
        await page.screenshot({ path: path.join(screenshotDir, "ipad-1024x768_M07_forced_refresh.png"), fullPage: false });
        await open("?level=M08&check=child-note-names-forced-refresh");
        const refreshedM08 = await inspect();
        record("ipad-1024x768 M08 after Service Worker refresh: blueprint and child ARIA remain letter-only", refreshedM08.m08Blueprint.join("") === "CDEFG" && refreshedM08.leaks.length === 0 && refreshedM08.accessibleLeaks.length === 0 && refreshedM08.pseudoLeaks.length === 0, refreshedM08);
        await page.screenshot({ path: path.join(screenshotDir, "ipad-1024x768_M08_forced_refresh.png"), fullPage: false });
      }

      for (const audit of ["color-reduced", "high-contrast"]) {
        await open(`?level=M01&audit=${audit}&check=child-note-names`);
        if (audit === "high-contrast") await page.evaluate(() => { document.documentElement.dataset.contrast = "more"; });
        let result = await inspect();
        record(`${viewport.id} ${audit}: child-visible text remains note-name only`, result.leaks.length === 0, result);
        record(`${viewport.id} ${audit}: keycaps remain C-D-E-F-G`, result.keys.map((key) => key.text).join("") === "CDEFG", result.keys);
        if (audit === "color-reduced") {
          record(`${viewport.id} ${audit}: audit marker stays a compact corner label`, result.auditBadge.width < 180 && result.auditBadge.height < 40 && result.auditBadge.top !== "8px" && result.auditBadge.left !== "8px" && result.auditBadge.boxShadow === "none", result.auditBadge);
        }

        for (const route of [
          { id: "M07", expected: "CDEDC" },
          { id: "FG03", expected: "EFG" }
        ]) {
          await open(`?level=${route.id}&audit=${audit}&check=child-note-names`);
          if (audit === "high-contrast") await page.evaluate(() => { document.documentElement.dataset.contrast = "more"; });
          result = await inspect();
          const labels = route.id === "M07" ? result.m07 : result.fg03;
          const readable = result.routeLabelMetrics.length === labels.length && result.routeLabelMetrics.every((label) =>
            label.visible && label.width > 0 && label.height > 0 && label.cumulativeOpacity >= 0.85 && label.fontSize >= 12 && label.contrastRatio >= 4.5 && label.color !== "rgba(0, 0, 0, 0)" && label.color !== "transparent"
          );
          record(`${viewport.id} ${route.id} ${audit}: route letters remain fully visible`, labels.join("") === route.expected && readable, result);
          record(`${viewport.id} ${route.id} ${audit}: route has no child-visible or accessible solfege leak`, result.leaks.length === 0 && result.routeAttributeLeaks.length === 0 && result.accessibleLeaks.length === 0 && result.pseudoLeaks.length === 0, result);
          record(`${viewport.id} ${route.id} ${audit}: route remains contained`, !result.overflowX && !result.overflowY, result);
          await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_${route.id}_${audit}.png`), fullPage: false });
        }
      }

      for (const audit of ["no-reading", "color-reduced", "high-contrast"]) {
        await open(`?mode=chapter4&directMode=true&formalSession=false&lesson=LP02&audit=${audit}&check=child-note-names-chapter4-audit`);
        if (audit === "high-contrast") await page.evaluate(() => { document.documentElement.dataset.contrast = "more"; });
        const chapter4Audit = await inspect();
        record(`${viewport.id} LP02 ${audit}: visible text, ARIA and pseudo-elements contain no solfege or octave labels`, chapter4Audit.chapter4TextLeaks.length === 0 && chapter4Audit.chapter4AccessibleLeaks.length === 0 && chapter4Audit.chapter4PseudoLeaks.length === 0, chapter4Audit);
        record(`${viewport.id} LP02 ${audit}: black keys remain neutral and white keys retain 14 letter identities`, chapter4Audit.chapter4BlackKeys.length === 10 && chapter4Audit.chapter4BlackKeys.every((key) => key.note === null) && chapter4Audit.chapter4WhiteKeys.length === 14, chapter4Audit);
        await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_chapter4-lp02_${audit}.png`), fullPage: false });
      }

      for (const audit of ["normal", "color-reduced", "high-contrast"]) {
        for (const route of [
          { id: "M07", expected: "CDEDC", steps: [0, 2, 5] },
          { id: "FG03", expected: "EFG", steps: [0, 1, 3] }
        ]) {
          for (const stepIndex of route.steps) {
            const auditQuery = audit === "normal" ? "" : `&audit=${audit}`;
            await open(`?level=${route.id}${auditQuery}&check=child-note-route-states`);
            if (audit === "high-contrast") await page.evaluate(() => { document.documentElement.dataset.contrast = "more"; });
            await setRouteStep(route.id, stepIndex);
            const result = await inspect();
            const labels = route.id === "M07" ? result.m07 : result.fg03;
            const expectedStates = labels.map((_, index) => index < stepIndex ? "done" : index === stepIndex ? "current" : "upcoming");
            if (stepIndex >= labels.length) expectedStates.fill("done");
            record(`${viewport.id} ${route.id} ${audit} step ${stepIndex}: route states retain letter-only sequence`, labels.join("") === route.expected && result.routeNodeStates.map((item) => item.state).join(",") === expectedStates.join(","), result);
            record(`${viewport.id} ${route.id} ${audit} step ${stepIndex}: DOM, ARIA, pseudo-elements and effects contain no solfege`, result.leaks.length === 0 && result.routeAttributeLeaks.length === 0 && result.accessibleLeaks.length === 0 && result.pseudoLeaks.length === 0, result);
            if (route.id === "M07") {
              record(`${viewport.id} M07 ${audit} step ${stepIndex}: current, completed, and upcoming nodes keep C-D-E-D-C`, result.routeAria === "星星路线 C D E D C" && result.routeNodeStates.map((item) => item.note).join("") === "CDEDC", result);
            }
            await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_${route.id}_${audit}_step-${stepIndex}.png`), fullPage: false });
          }
        }
      }

      await open("?level=M01&audit=no-reading&check=child-note-names");
      const noReading = await inspect();
      record(`${viewport.id} no-reading: audit marker stays a compact corner label`, noReading.auditBadge.width < 180 && noReading.auditBadge.height < 40 && noReading.auditBadge.top !== "8px" && noReading.auditBadge.left !== "8px" && noReading.auditBadge.boxShadow === "none", noReading.auditBadge);
      record(`${viewport.id} no-reading: audit layout remains contained`, !noReading.overflowX && !noReading.overflowY, noReading);
      await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_M01_no-reading.png`), fullPage: false });

      await open("?level=FG03&audit=no-reading&check=child-note-names");
      const noReadingRoute = await inspect();
      record(`${viewport.id} FG03 no-reading: visible route pseudo-element uses note name E`, noReadingRoute.pseudoRows.some((row) => row.content === "E") && noReadingRoute.pseudoLeaks.length === 0, noReadingRoute);
      await page.screenshot({ path: path.join(screenshotDir, `${viewport.id}_FG03_no-reading.png`), fullPage: false });
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
