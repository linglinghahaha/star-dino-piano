import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const rootUrl = process.argv[2] || "http://127.0.0.1:4173/";
const screenshotPrefix = process.argv[3] || "screenshots/pwa_shell_369i";
const visibleCandidateId = "overhaul-369e-ipad-settlement-compactness-correction";
const pwaCandidateId = "overhaul-369i-pwa-cache-retirement";
const staffNotationCandidateId = "overhaul-369a-staff-notation-geometry-correction";
const presentationSourceId = "overhaul-368b-s01-mini-continuity-correction";
const expectedCacheName = `star-dino-pwa-${pwaCandidateId}`;
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
      chapter4Css: document.querySelector('link[href*="chapter4-slice.css"]')?.getAttribute("href") || "",
      courseDirectorCss: document.querySelector('link[href*="course-director.css"]')?.getAttribute("href") || "",
      parentExperienceCss: document.querySelector('link[href*="parent-experience.css"]')?.getAttribute("href") || "",
      feedbackIntensityCss: document.querySelector('link[href*="child-feedback-intensity.css"]')?.getAttribute("href") || "",
      companionFeedbackCss: document.querySelector('link[href*="m01-m03-companion-feedback.css"]')?.getAttribute("href") || "",
      worldMapV5Css: document.querySelector('link[href*="world-map-v5-prototype.css"]')?.getAttribute("href") || "",
      worldMapV6Css: document.querySelector('link[href*="world-map-v6-dark-scifi.css"]')?.getAttribute("href") || "",
      s01MiniCss: document.querySelector('link[href*="s01-mini-training-dock.css"]')?.getAttribute("href") || "",
      staffNotationCss: document.querySelector('link[href*="staff-notation-geometry.css"]')?.getAttribute("href") || "",
      mapVisible: !document.querySelector("#mapShell")?.hidden,
      manifestHref: document.querySelector('link[rel="manifest"]')?.getAttribute("href") || "",
      viewport: meta("viewport"),
      themeColor: meta("theme-color"),
      appleCapable: meta("apple-mobile-web-app-capable"),
      mobileCapable: meta("mobile-web-app-capable"),
      appleStatusBar: meta("apple-mobile-web-app-status-bar-style"),
      buildId: meta("star-dino-build-id"),
      appleTitle: meta("apple-mobile-web-app-title"),
      documentTitle: document.title,
      manifest
    };
  });
  record(
    "PWA metadata declares landscape standalone mode and starts from the map",
    shellMetadata.version === `app.js?v=${visibleCandidateId}` && shellMetadata.chapter4Css === "chapter4-slice.css?v=overhaul-366a-c4-settlement-lp04-continuity-correction" &&
      shellMetadata.courseDirectorCss === "course-director.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction" &&
      shellMetadata.parentExperienceCss === "parent-experience.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction" &&
      shellMetadata.feedbackIntensityCss === `child-feedback-intensity.css?v=${visibleCandidateId}` &&
      shellMetadata.companionFeedbackCss === "m01-m03-companion-feedback.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction" &&
      shellMetadata.worldMapV5Css === "world-map-v5-prototype.css?v=overhaul-361a-dark-scifi-map-v5-reference" &&
      shellMetadata.worldMapV6Css === "world-map-v6-dark-scifi.css?v=overhaul-367b-world-map-pwa-qualification" &&
      shellMetadata.s01MiniCss === `s01-mini-training-dock.css?v=${presentationSourceId}` &&
      shellMetadata.staffNotationCss === `staff-notation-geometry.css?v=${staffNotationCandidateId}` && shellMetadata.mapVisible &&
      shellMetadata.manifestHref === "manifest.webmanifest" &&
      shellMetadata.viewport.includes("viewport-fit=cover") &&
      shellMetadata.themeColor === "#06111f" &&
      shellMetadata.appleCapable === "yes" && shellMetadata.mobileCapable === "yes" &&
      shellMetadata.appleStatusBar === "black-translucent" && shellMetadata.buildId === visibleCandidateId && shellMetadata.appleTitle === "星龙工坊" &&
      shellMetadata.documentTitle === "星龙工坊" && shellMetadata.manifest.name === "星龙工坊" && shellMetadata.manifest.short_name === "星龙工坊" &&
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

  const cacheInventory = await page.evaluate(async (expectedCacheName) => {
    const cacheNames = await caches.keys();
    const cacheName = cacheNames.find((name) => name === expectedCacheName) || "";
    const requests = cacheName ? await (await caches.open(cacheName)).keys() : [];
    const paths = requests.map((request) => new URL(request.url).pathname + new URL(request.url).search);
    return { cacheNames, cacheName, paths, controlled: Boolean(navigator.serviceWorker.controller) };
  }, expectedCacheName);
  const requiredShellPaths = [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    ...runtimeShellPaths,
    "/assets/runtime/scale-island-map-bg.webp",
    "/assets/runtime/xingya-suit-point.webp",
    "/assets/runtime/xingya-garden-invite-v1.webp",
    "/assets/runtime/xingya-suit-point-m08-route-a2.png",
    "/assets/runtime/world-map-v5-361a.webp"
  ];
  const expectedChapter4CssPath = "/chapter4-slice.css?v=overhaul-366a-c4-settlement-lp04-continuity-correction";
  const chapter4CssRuntimeEntries = runtimeShellPaths.filter((item) => item.includes("chapter4-slice.css"));
  record(
    "visible runtime stays 369e while precache uses the 369i shell identity",
    shellMetadata.chapter4Css === "chapter4-slice.css?v=overhaul-366a-c4-settlement-lp04-continuity-correction" &&
      chapter4CssRuntimeEntries.length === 1 && chapter4CssRuntimeEntries[0] === expectedChapter4CssPath &&
      cacheInventory.paths.includes(expectedChapter4CssPath) &&
      !cacheInventory.paths.some((item) => item.includes("chapter4-slice.css?v=overhaul-347a-c4-r01a")) &&
      !cacheInventory.paths.some((item) => item.includes("chapter4-slice.css?v=overhaul-344a-p1")),
    { shellMetadata, chapter4CssRuntimeEntries, cachePaths: cacheInventory.paths.filter((item) => item.includes("chapter4-slice.css")) }
  );
  record(
    "local cache contains every index runtime stylesheet and script, with no concept or candidate media",
    cacheInventory.controlled && cacheInventory.cacheName === expectedCacheName &&
      requiredShellPaths.every((item) => cacheInventory.paths.includes(item)) &&
      !cacheInventory.paths.includes("/assets/runtime/xingya-suit-point-flat-m08-v3.webp") &&
      !cacheInventory.paths.includes("/assets/runtime/staff-dino-hop-bg-v1.webp") &&
      !cacheInventory.paths.some((item) => /(?:^|\/)(?:assets\/generated|concepts|audio|chrome-test|screenshots)(?:\/|$)/i.test(item)),
    { ...cacheInventory, runtimeEntries, requiredShellPaths }
  );
  await page.screenshot({ path: `${screenshotPrefix}_online-map.png`, fullPage: false });

  const updateContext = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    hasTouch: true
  });
  const updatePage = await updateContext.newPage();
  attachBrowserErrorCapture(updatePage);
  try {
    await updatePage.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await updatePage.goto(rootUrl, { waitUntil: "load", timeout: 15000 });
    await waitReady(updatePage);
    await updatePage.evaluate(() => navigator.serviceWorker.ready);
    await updatePage.reload({ waitUntil: "load", timeout: 15000 });
    await waitReady(updatePage);
    await updatePage.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 10000 });

    await Promise.all([
      updatePage.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }),
      updatePage.evaluate(() => navigator.serviceWorker.dispatchEvent(new Event("controllerchange")))
    ]);
    await waitReady(updatePage);
    const safeMapRefresh = await updatePage.evaluate(() => ({
      mapVisible: !document.querySelector("#mapShell")?.hidden,
      pending: sessionStorage.getItem("starDinoPwaShellUpdatePending"),
      active: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null")?.active || null
    }));
    record(
      "an updated controller refreshes only at a safe child-home rest",
      safeMapRefresh.mapVisible && safeMapRefresh.pending === null && safeMapRefresh.active === null,
      safeMapRefresh
    );

    const currentMarker = updatePage.locator(".map-node.active:not(:disabled), #gardenRestMarker.active:not(:disabled)");
    await currentMarker.click();
    await updatePage.waitForSelector("#appShell", { state: "visible", timeout: 10000 });
    const activeBeforeUpdate = await updatePage.evaluate(() => ({
      sessionId: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null")?.active?.sessionId || null,
      href: location.href
    }));
    await updatePage.evaluate(() => navigator.serviceWorker.dispatchEvent(new Event("controllerchange")));
    await updatePage.waitForTimeout(400);
    const activeAfterUpdate = await updatePage.evaluate(() => ({
      sessionId: JSON.parse(localStorage.getItem("starDinoSessionRuntime") || "null")?.active?.sessionId || null,
      href: location.href,
      playVisible: !document.querySelector("#appShell")?.hidden,
      pending: sessionStorage.getItem("starDinoPwaShellUpdatePending")
    }));
    record(
      "an updated controller defers reload during an active child lesson",
      activeBeforeUpdate.sessionId &&
        activeAfterUpdate.sessionId === activeBeforeUpdate.sessionId &&
        activeAfterUpdate.href === activeBeforeUpdate.href &&
        activeAfterUpdate.playVisible &&
        activeAfterUpdate.pending === "1",
      { activeBeforeUpdate, activeAfterUpdate }
    );
  } finally {
    await updateContext.close();
  }

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
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const sha256 = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
      return { ok: response.ok, status: response.status, bytes: bytes.byteLength, sha256 };
    });
    record(
      "cold offline cache serves the approved Chapter 3 garden-mode character",
      coldGardenAsset.ok && coldGardenAsset.bytes === 30010 && coldGardenAsset.sha256 === "AD83E1626A52FE86A49F882953F3089F5142A607B1B5B24F084D70EA775B9EF5",
      coldGardenAsset
    );
    const coldM08Asset = await coldPage.evaluate(async () => {
      const response = await fetch(new URL("assets/runtime/xingya-suit-point-m08-route-a2.png", location.href), { cache: "no-store" });
      const bytes = await response.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const sha256 = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
      return { ok: response.ok, status: response.status, bytes: bytes.byteLength, sha256 };
    });
    record(
      "cold offline cache serves the approved M08 traceable pose",
      coldM08Asset.ok && coldM08Asset.bytes === 205311 && coldM08Asset.sha256 === "AF3DCD97F0134487F86141C177A2DF8800BD9CA01B3F6F96442A79FC5BFB8236",
      coldM08Asset
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
