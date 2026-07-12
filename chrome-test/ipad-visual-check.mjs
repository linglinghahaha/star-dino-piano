import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4180/";
const prefix = process.argv[3] || "screenshot_ipad_213";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});

const page = await browser.newPage({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1
});

const qualityCssOverride = process.env.QUALITY_CSS_OVERRIDE_PATH;
if (qualityCssOverride) {
  const overridePath = path.resolve(qualityCssOverride);
  if (!fs.existsSync(overridePath)) {
    throw new Error(`QUALITY_CSS_OVERRIDE_PATH not found: ${overridePath}`);
  }
  await page.route(/quality-overrides\.css(?:\?.*)?$/, (route) => route.fulfill({
    path: overridePath,
    contentType: "text/css"
  }));
}

const errors = [];
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    errors.push({ type: message.type(), text: message.text(), url: page.url() });
  }
});
page.on("pageerror", (error) => {
  errors.push({ type: "pageerror", text: error.message, url: page.url() });
});

const waitReady = async (selector) => {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(selector, { state: "visible", timeout: 6000 });
  await page.waitForTimeout(260);
};

const makeUrl = (query) => {
  const url = new URL(rootUrl);
  url.search = query;
  return url.toString();
};

const readState = async (name) => page.evaluate((stateName) => {
  const rect = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };

  return {
    name: stateName,
    title: document.querySelector("#mainTitle")?.textContent || "",
    badge: document.querySelector("#levelBadge")?.textContent || "",
    target: document.querySelector(".key.target strong")?.textContent || "",
    staffTarget: document.querySelector(".staff-step.current strong")?.textContent || "",
    moonYard: rect(".moon-yard"),
    staffStage: rect(".staff-stage"),
    keyboard: rect(".keyboard-panel")
  };
}, name);

const targets = [
  ["staff", "?mode=staff&check=ipad-213", ".staff-stage"],
  ["M01", "?level=M01&check=ipad-213", ".moon-yard"],
  ["M02", "?level=M02&check=ipad-213", ".moon-yard"],
  ["M03", "?level=M03&check=ipad-213", ".moon-yard"],
  ["M04", "?level=M04&check=ipad-213", ".moon-yard"],
  ["M05", "?level=M05&check=ipad-213", ".moon-yard"],
  ["M06", "?level=M06&check=ipad-213", ".moon-yard"],
  ["M07", "?level=M07&check=ipad-213", ".moon-yard"],
  ["M08", "?level=M08&check=ipad-213", ".moon-yard"]
];

const states = [];

try {
  for (const [name, query, selector] of targets) {
    await page.goto(makeUrl(query), { waitUntil: "domcontentloaded", timeout: 10000 });
    await waitReady(selector);
    await page.screenshot({ path: `${prefix}_${name}.png`, fullPage: false });
    states.push(await readState(name));
  }

  console.log(JSON.stringify({ states, errors }, null, 2));
} finally {
  await browser.close();
}
