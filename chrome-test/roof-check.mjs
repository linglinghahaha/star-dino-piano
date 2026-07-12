import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.argv[2] || "http://127.0.0.1:4180/?level=M08&check=roof-local";
const shotPath = process.argv[3] || "screenshot_roof_check.png";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1
});

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 10000 });
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 10000 });
  await page.waitForSelector(".scene-roof", { state: "visible", timeout: 5000 });
  await page.screenshot({ path: shotPath, fullPage: false });

  const info = await page.evaluate(() => {
    const box = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        z: s.zIndex,
        transform: s.transform,
        text: el.textContent.trim().slice(0, 60)
      };
    };

    return {
      url: location.href,
      title: document.querySelector("#mainTitle")?.textContent,
      target: document.querySelector(".key.target strong")?.textContent,
      resultVisible: !document.querySelector("#resultModal")?.hidden,
      scene: box(".scene-roof"),
      hanging: box(".moon-yard.yard-scene-roof .hanging-part[data-shape=roof]"),
      slots: [...document.querySelectorAll(".scene-roof .build-slot")].map((el, index) => {
        const r = el.getBoundingClientRect();
        return {
          index: index + 1,
          className: el.className,
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: el.textContent.trim()
        };
      })
    };
  });

  console.log(JSON.stringify(info, null, 2));
} finally {
  await browser.close();
}
