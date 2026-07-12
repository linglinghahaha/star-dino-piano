import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4180/";
const prefix = process.argv[3] || "screenshot_visual_audit_162";
const levels = ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08"];

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const browserErrors = [];
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
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

const waitReady = async (selector = ".app-shell") => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 6000 });
  await page.waitForTimeout(240);
};

const pageUrl = (query) => {
  const url = new URL(rootUrl);
  url.search = query;
  return url.toString();
};

const readState = async () => page.evaluate(() => {
  const rect = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };

  return {
    url: location.href,
    title: document.querySelector("#mainTitle")?.textContent || "",
    levelBadge: document.querySelector("#levelBadge")?.textContent || "",
    target: document.querySelector(".key.target strong")?.textContent || "",
    staffTarget: document.querySelector(".staff-step.current strong")?.textContent || "",
    resultVisible: !document.querySelector("#resultModal")?.hidden,
    mapNodes: document.querySelectorAll(".map-node").length,
    visibleScene: [...document.querySelectorAll(".assembly-scene")].find((el) => {
      const style = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return style.display !== "none" && r.width > 0 && r.height > 0;
    })?.className || "",
    panel: rect(".panel"),
    moonYard: rect(".moon-yard"),
    staffStage: rect(".staff-stage"),
    keyboard: rect(".keyboard-panel"),
    resultCard: rect(".result-card")
  };
});

const entries = [];

try {
  await page.goto(pageUrl("?level=M01&check=audit-map-entry"), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(".moon-yard");
  await page.locator("#mapReturn").click();
  await page.waitForSelector(".map-shell", { state: "visible", timeout: 6000 });
  await page.waitForTimeout(240);
  await page.screenshot({ path: `${prefix}_map.png`, fullPage: false });
  entries.push({ name: "map", state: await readState() });

  await page.goto(pageUrl("?mode=staff&check=audit-staff"), { waitUntil: "domcontentloaded", timeout: 10000 });
  await waitReady(".staff-stage");
  await page.screenshot({ path: `${prefix}_staff.png`, fullPage: false });
  entries.push({ name: "staff", state: await readState() });

  for (const level of levels) {
    await page.goto(pageUrl(`?level=${level}&check=audit-${level.toLowerCase()}`), {
      waitUntil: "domcontentloaded",
      timeout: 10000
    });
    await waitReady(".moon-yard");
    await page.screenshot({ path: `${prefix}_${level}.png`, fullPage: false });
    entries.push({ name: level, state: await readState() });
  }

  console.log(JSON.stringify({ entries, browserErrors }, null, 2));
} finally {
  await browser.close();
}
