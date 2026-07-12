import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/ipad_accessibility_latest";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass: Boolean(pass), details });
}

function makeUrl(search) {
  const url = new URL(rootUrl);
  url.search = search;
  return url.toString();
}

async function waitReady(page, selector) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 12000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 6000 });
  await page.waitForTimeout(120);
}

async function gotoScreen(page, search, selector) {
  await page.goto(makeUrl(search), { waitUntil: "domcontentloaded", timeout: 12000 });
  await waitReady(page, selector);
}

async function readInteractiveControls(page) {
  return page.evaluate(() => {
    const selector = [
      "button:not([disabled])",
      "[role='button']:not([aria-disabled='true'])",
      "input:not([disabled])",
      "summary",
      "a[href]"
    ].join(",");

    const visible = (element, rect) => {
      const style = getComputedStyle(element);
      return !element.closest("[inert]") && rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0.01;
    };

    const labelText = (element) => {
      const explicit = element.getAttribute("aria-label")?.trim();
      if (explicit) return explicit;
      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) {
        const text = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() || "")
          .filter(Boolean)
          .join(" ");
        if (text) return text;
      }
      const wrappingLabel = element.closest("label")?.textContent?.trim();
      if (wrappingLabel) return wrappingLabel;
      return element.textContent?.trim() || element.getAttribute("title")?.trim() || element.getAttribute("value")?.trim() || "";
    };

    return [...document.querySelectorAll(selector)]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || "",
          className: typeof element.className === "string" ? element.className : "",
          name: labelText(element),
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
          tabIndex: element.tabIndex,
          visible: visible(element, rect)
        };
      })
      .filter((control) => control.visible);
  });
}

async function auditControls(page, label) {
  const controls = await readInteractiveControls(page);
  const undersized = controls.filter((control) => control.width < 44 || control.height < 44);
  const unnamed = controls.filter((control) => !control.name);
  const unfocusable = controls.filter((control) => control.tabIndex < 0);
  record(`${label}: visible controls meet the 44px touch target`, undersized.length === 0, { undersized });
  record(`${label}: visible controls have accessible names`, unnamed.length === 0, { unnamed });
  record(`${label}: visible controls remain keyboard focusable`, unfocusable.length === 0, { unfocusable });
  return controls;
}

async function auditHeaderContainment(page, label, headerSelector) {
  const geometry = await page.evaluate((selector) => {
    const header = document.querySelector(selector);
    if (!header) return null;
    const headerRect = header.getBoundingClientRect();
    const controls = [...header.querySelectorAll("button:not([hidden])")]
      .map((button) => {
        const rect = button.getBoundingClientRect();
        return { id: button.id, top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
      })
      .filter((rect) => rect.right > rect.left && rect.bottom > rect.top);
    return {
      header: { top: headerRect.top, bottom: headerRect.bottom, left: headerRect.left, right: headerRect.right },
      controls
    };
  }, headerSelector);
  const contained = geometry && geometry.controls.every((control) => (
    control.top >= geometry.header.top - 1 &&
    control.bottom <= geometry.header.bottom + 1 &&
    control.left >= geometry.header.left - 1 &&
    control.right <= geometry.header.right + 1
  ));
  record(`${label}: enlarged controls stay inside the header`, contained, geometry || {});
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const context = await browser.newContext({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1,
  hasTouch: true
});
const page = await context.newPage();

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
});

try {
  await gotoScreen(page, "?screen=map&check=ipad-a11y-map", "#mapShell");
  await auditControls(page, "map");
  await auditHeaderContainment(page, "map", ".map-topbar");
  const mapSemantics = await page.evaluate(() => ({
    currentNodes: document.querySelectorAll(".map-node[aria-current='step']").length,
    activeNodes: document.querySelectorAll(".map-node.active").length
  }));
  record("map exposes exactly one current route node", mapSemantics.currentNodes === 1 && mapSemantics.activeNodes === 1, mapSemantics);
  await page.screenshot({ path: `${screenshotPrefix}_map.png`, fullPage: false });

  const screens = [
    ["M01", "?level=M01&check=ipad-a11y-m01", ".moon-yard"],
    ["M03", "?level=M03&check=ipad-a11y-m03", ".moon-yard"],
    ["M07", "?level=M07&check=ipad-a11y-m07", ".moon-yard"],
    ["M08", "?level=M08&check=ipad-a11y-m08", ".moon-yard"],
    ["FG03", "?level=FG03&check=ipad-a11y-fg03", ".moon-yard"],
    ["S01", "?mode=staff&check=ipad-a11y-staff", ".staff-stage"]
  ];

  for (const [label, search, selector] of screens) {
    await gotoScreen(page, search, selector);
    await auditControls(page, label);
    await auditHeaderContainment(page, label, "#appShell .topbar");
    if (["M01", "M03", "S01"].includes(label)) {
      await page.screenshot({ path: `${screenshotPrefix}_${label}.png`, fullPage: false });
    }
  }

  await gotoScreen(page, "?level=M01&check=ipad-a11y-parent", ".moon-yard");
  await page.locator("#playParentGate").click();
  await page.waitForSelector("#parentModal", { state: "visible", timeout: 3000 });
  await page.waitForTimeout(60);
  const parentOpen = await page.evaluate(() => ({
    activeId: document.activeElement?.id || "",
    appInert: Boolean(document.querySelector("#appShell")?.inert),
    dialogRole: document.querySelector(".parent-card")?.getAttribute("role"),
    modal: document.querySelector(".parent-card")?.getAttribute("aria-modal")
  }));
  record("parent dialog focuses its close button and makes gameplay inert", parentOpen.activeId === "parentClose" && parentOpen.appInert && parentOpen.dialogRole === "dialog" && parentOpen.modal === "true", parentOpen);
  await auditControls(page, "parent dialog");
  await page.keyboard.press("Shift+Tab");
  const trappedInside = await page.evaluate(() => document.querySelector("#parentModal")?.contains(document.activeElement));
  record("parent dialog traps keyboard focus", trappedInside, { activeId: await page.evaluate(() => document.activeElement?.id || "") });
  await page.screenshot({ path: `${screenshotPrefix}_parent.png`, fullPage: false });
  await page.keyboard.press("Escape");
  await page.waitForSelector("#parentModal", { state: "hidden", timeout: 3000 });
  const parentClosed = await page.evaluate(() => ({
    activeId: document.activeElement?.id || "",
    appInert: Boolean(document.querySelector("#appShell")?.inert)
  }));
  record("closing the parent dialog restores focus and gameplay", parentClosed.activeId === "playParentGate" && !parentClosed.appInert, parentClosed);

  const largeContext = await browser.newContext({
    viewport: { width: 1366, height: 1024 },
    deviceScaleFactor: 2,
    hasTouch: true
  });
  const largePage = await largeContext.newPage();
  try {
    await gotoScreen(largePage, "?level=M01&check=ipad-a11y-parent-large", ".moon-yard");
    await largePage.locator("#playParentGate").click();
    await largePage.waitForSelector("#parentModal", { state: "visible", timeout: 3000 });
    const largeParentLayout = await largePage.evaluate(() => {
      const card = document.querySelector(".parent-card");
      const cardRect = card?.getBoundingClientRect();
      const options = [...document.querySelectorAll(".parent-option")];
      return {
        card: cardRect ? { top: cardRect.top, bottom: cardRect.bottom, height: cardRect.height } : null,
        scrollHeight: card?.scrollHeight || 0,
        clientHeight: card?.clientHeight || 0,
        everyOptionVisible: Boolean(cardRect) && options.every((option) => {
          const rect = option.getBoundingClientRect();
          return rect.top >= cardRect.top && rect.bottom <= cardRect.bottom;
        }),
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      };
    });
    record(
      "large iPad parent panel exposes every input option without scrolling",
      largeParentLayout.scrollHeight <= largeParentLayout.clientHeight + 1 && largeParentLayout.everyOptionVisible && !largeParentLayout.horizontalOverflow,
      largeParentLayout
    );
    await largePage.screenshot({ path: `${screenshotPrefix}_parent-large.png`, fullPage: false });
  } finally {
    await largeContext.close();
  }

  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press("Tab");
  const focusRing = await page.evaluate(() => {
    const element = document.activeElement;
    const style = element ? getComputedStyle(element) : null;
    return {
      id: element?.id || "",
      tag: element?.tagName?.toLowerCase() || "",
      outlineStyle: style?.outlineStyle || "",
      outlineWidth: style?.outlineWidth || "0px",
      boxShadow: style?.boxShadow || "none"
    };
  });
  record("keyboard navigation exposes a visible focus ring", focusRing.outlineStyle !== "none" && Number.parseFloat(focusRing.outlineWidth) >= 3, focusRing);

  await gotoScreen(page, "?level=M01&check=ipad-a11y-result", ".moon-yard");
  await page.locator('.key.white-key[data-midi="60"]').click();
  await page.waitForSelector("#resultModal", { state: "visible", timeout: 4000 });
  await page.waitForTimeout(20);
  const resultState = await page.evaluate(() => ({
    activeId: document.activeElement?.id || "",
    appInert: Boolean(document.querySelector("#appShell")?.inert),
    role: document.querySelector(".result-card")?.getAttribute("role"),
    live: document.querySelector(".result-card")?.getAttribute("aria-live"),
    atomic: document.querySelector(".result-card")?.getAttribute("aria-atomic"),
    labelledBy: document.querySelector(".result-card")?.getAttribute("aria-labelledby"),
    titleId: document.querySelector(".result-card h2")?.id || ""
  }));
  record(
    "automatic result layer is an announced status while gameplay is paused",
    resultState.appInert && resultState.role === "status" && resultState.live === "polite" && resultState.atomic === "true" && resultState.labelledBy === resultState.titleId && Boolean(resultState.titleId),
    resultState
  );
  await auditControls(page, "result status");
  if (await page.locator("#resultModal").isVisible()) {
    await page.locator("#modalNext").evaluate((button) => button.click());
  }
  await page.waitForSelector("#resultModal", { state: "hidden", timeout: 4000 });
  record("result continuation returns gameplay to an interactive state", await page.evaluate(() => !document.querySelector("#appShell")?.inert));

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await context.close();
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`));
console.log(`iPad accessibility checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
