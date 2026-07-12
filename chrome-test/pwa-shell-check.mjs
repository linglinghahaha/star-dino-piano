import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/pwa_shell_334g";
fs.mkdirSync(path.dirname(screenshotPrefix), { recursive: true });

const checks = [];
const browserErrors = [];

function record(name, pass, details = {}) {
  checks.push({ name, pass, details });
}

function attachBrowserErrorCapture(page) {
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      browserErrors.push({ type: message.type(), text: message.text(), url: page.url() });
    }
  });
  page.on("pageerror", (error) => {
    browserErrors.push({ type: "pageerror", text: error.message, url: page.url() });
  });
}

async function waitReady(page) {
  await page.waitForSelector("#bootLoader", { state: "hidden", timeout: 15000 });
  await page.waitForSelector("#mapShell", { state: "visible", timeout: 10000 });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_EXECUTABLE || undefined
});
const context = await browser.newContext({
  viewport: { width: 1194, height: 834 },
  deviceScaleFactor: 2
});
const page = await context.newPage();

await page.addInitScript(() => {
  localStorage.removeItem("starDinoCompletedLevels");
  localStorage.removeItem("starDinoLearningStats");
  sessionStorage.clear();
});

attachBrowserErrorCapture(page);

try {
  await page.goto(rootUrl, { waitUntil: "load", timeout: 15000 });
  await waitReady(page);

  const shellMetadata = await page.evaluate(async () => {
    const manifest = await fetch("manifest.webmanifest").then((response) => response.json());
    const meta = (name) => document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") || "";
    return {
      version: document.querySelector('script[src*="app.js"]')?.getAttribute("src") || "",
      mapVisible: !document.querySelector("#mapShell")?.hidden,
      manifestHref: document.querySelector('link[rel="manifest"]')?.getAttribute("href") || "",
      viewport: meta("viewport"),
      themeColor: meta("theme-color"),
      appleCapable: meta("apple-mobile-web-app-capable"),
      mobileCapable: meta("mobile-web-app-capable"),
      appleStatusBar: meta("apple-mobile-web-app-status-bar-style"),
      appleTitle: meta("apple-mobile-web-app-title"),
      manifest
    };
  });
  record(
    "PWA metadata declares landscape standalone mode and starts from the map",
    shellMetadata.version.includes("overhaul-340c") && shellMetadata.mapVisible &&
      shellMetadata.manifestHref === "manifest.webmanifest" &&
      shellMetadata.viewport.includes("viewport-fit=cover") &&
      shellMetadata.themeColor === "#1397e9" &&
      shellMetadata.appleCapable === "yes" && shellMetadata.mobileCapable === "yes" &&
      shellMetadata.appleStatusBar === "black-translucent" && shellMetadata.appleTitle === "星龙工坊" &&
      shellMetadata.manifest.start_url === "./" && shellMetadata.manifest.scope === "./" &&
      shellMetadata.manifest.display === "standalone" && shellMetadata.manifest.orientation === "landscape" &&
      !shellMetadata.manifest.start_url.includes("level="),
    shellMetadata
  );

  const registration = await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return { supported: false };
    const registration = await navigator.serviceWorker.ready;
    return {
      supported: true,
      scope: registration.scope,
      active: Boolean(registration.active),
      waiting: Boolean(registration.waiting),
      installing: Boolean(registration.installing)
    };
  });
  record(
    "service worker installs for the local PWA shell",
    registration.supported && registration.active && registration.scope === new URL("./", rootUrl).href,
    registration
  );

  await page.reload({ waitUntil: "load", timeout: 15000 });
  await waitReady(page);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 10000 });

  const runtimeEntries = await page.evaluate(async () => {
    const indexResponse = await fetch(new URL("./index.html", location.href), { cache: "no-store" });
    const indexHtml = await indexResponse.text();
    const indexDocument = new DOMParser().parseFromString(indexHtml, "text/html");
    const entries = [
      ...[...indexDocument.querySelectorAll('link[rel="stylesheet"][href]')].map((element) => ({ kind: "stylesheet", rawUrl: element.getAttribute("href") })),
      ...[...indexDocument.querySelectorAll("script[src]")].map((element) => ({ kind: "script", rawUrl: element.getAttribute("src") }))
    ];
    return entries
      .map((entry) => ({ ...entry, url: new URL(entry.rawUrl, location.href).href }))
      .filter((entry) => new URL(entry.url).origin === location.origin);
  });
  const runtimeShellPaths = [...new Set(runtimeEntries.map((entry) => {
    const url = new URL(entry.url);
    return `${url.pathname}${url.search}`;
  }))];

  const cacheInventory = await page.evaluate(async () => {
    const cacheNames = await caches.keys();
    const cacheName = cacheNames.find((name) => name === "star-dino-pwa-overhaul-340c-v1") || "";
    const requests = cacheName ? await (await caches.open(cacheName)).keys() : [];
    const paths = requests.map((request) => new URL(request.url).pathname + new URL(request.url).search);
    return { cacheNames, cacheName, paths, controlled: Boolean(navigator.serviceWorker.controller) };
  });
  const requiredShellPaths = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    ...runtimeShellPaths,
    "/assets/runtime/scale-island-map-bg.webp",
    "/assets/runtime/xingya-suit-point.webp",
    "/assets/runtime/xingya-garden-invite-v1.webp"
  ];
  record(
    "local cache contains every index runtime stylesheet and script, with no concept or candidate media",
    cacheInventory.controlled && cacheInventory.cacheName === "star-dino-pwa-overhaul-340c-v1" &&
      requiredShellPaths.every((item) => cacheInventory.paths.includes(item)) &&
      !cacheInventory.paths.some((item) => /(?:assets\/generated|concepts|audio|chrome-test|screenshots)/i.test(item)),
    { ...cacheInventory, runtimeEntries, requiredShellPaths }
  );
  await page.screenshot({ path: `${screenshotPrefix}_online-map.png`, fullPage: false });

  await context.setOffline(true);
  const offlineUrl = new URL(rootUrl);
  offlineUrl.search = "?screen=map&check=pwa-offline";
  await page.goto(offlineUrl.toString(), { waitUntil: "domcontentloaded", timeout: 15000 });
  await waitReady(page);
  const offlineState = await page.evaluate(() => ({
    mapVisible: !document.querySelector("#mapShell")?.hidden,
    appVisible: !document.querySelector("#appShell")?.hidden,
    controller: Boolean(navigator.serviceWorker?.controller),
    online: navigator.onLine,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  }));
  record(
    "offline navigation falls back to the cached map shell without layout overflow",
    offlineState.mapVisible && !offlineState.appVisible && offlineState.controller &&
      offlineState.online === false && offlineState.overflow === false,
    offlineState
  );
  await page.screenshot({ path: `${screenshotPrefix}_offline-map.png`, fullPage: false });

  const coldPage = await context.newPage();
  attachBrowserErrorCapture(coldPage);
  try {
    const coldOfflineUrl = new URL(rootUrl);
    coldOfflineUrl.search = "?screen=map&check=pwa-cold-offline";
    await coldPage.goto(coldOfflineUrl.toString(), { waitUntil: "domcontentloaded", timeout: 15000 });
    await waitReady(coldPage);
    await coldPage.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 10000 });
    const coldOfflineAssets = await coldPage.evaluate(async (entries) => {
      const results = [];
      for (const entry of entries) {
        try {
          const response = await fetch(entry.url, { cache: "no-store" });
          const body = await response.text();
          results.push({ kind: entry.kind, url: entry.url, ok: response.ok, status: response.status, nonEmpty: body.length > 0 });
        } catch (error) {
          results.push({ kind: entry.kind, url: entry.url, ok: false, error: error?.message || String(error), nonEmpty: false });
        }
      }
      return {
        online: navigator.onLine,
        controlled: Boolean(navigator.serviceWorker?.controller),
        results
      };
    }, runtimeEntries);
    record(
      "cold offline page fetches every index runtime stylesheet and script from the service worker cache",
      coldOfflineAssets.online === false && coldOfflineAssets.controlled &&
        coldOfflineAssets.results.length === runtimeEntries.length &&
        coldOfflineAssets.results.every((entry) => entry.ok && entry.nonEmpty),
      coldOfflineAssets
    );
    const coldGardenAsset = await coldPage.evaluate(async () => {
      const response = await fetch(new URL("assets/runtime/xingya-garden-invite-v1.webp", location.href), { cache: "no-store" });
      const bytes = await response.arrayBuffer();
      return { ok: response.ok, status: response.status, bytes: bytes.byteLength };
    });
    record(
      "cold offline cache serves the approved Chapter 3 garden-mode character",
      coldGardenAsset.ok && coldGardenAsset.bytes === 33794,
      coldGardenAsset
    );
    await coldPage.screenshot({ path: `${screenshotPrefix}_cold-offline-map.png`, fullPage: false });
  } finally {
    await coldPage.close();
  }
  await context.setOffline(false);

  record("browser console is clean", browserErrors.length === 0, { browserErrors });
} finally {
  await context.close();
  await browser.close();
}

const failed = checks.filter((check) => !check.pass);
checks.forEach((check) => {
  console.log(`${check.pass ? "PASS" : "FAIL"} ${check.name}`);
});
console.log(`PWA shell checks: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify({ failed, browserErrors }, null, 2));
  process.exit(1);
}
