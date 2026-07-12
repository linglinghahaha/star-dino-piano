const CACHE_NAME = "star-dino-pwa-overhaul-340c-p7-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./styles.css?v=overhaul-340c",
  "./staff-overrides.css?v=overhaul-340c",
  "./play-overrides.css?v=overhaul-340c",
  "./keyboard-overrides.css?v=overhaul-340c",
  "./map-overrides.css?v=overhaul-340c",
  "./quality-overrides.css?v=overhaul-340c",
  "./quality-overrides-2.css?v=overhaul-340c",
  "./quality-overrides-3.css?v=overhaul-340c",
  "./quality-overrides-4.css?v=overhaul-340c",
  "./current-overhaul.css?v=overhaul-340c-p7",
  "./roof-blueprint-overrides.css?v=overhaul-340c",
  "./chapter3-visible.css?v=overhaul-340c",
  "./app.js?v=overhaul-340c-p6",
  "./assets/runtime/app-icon.png",
  "./assets/runtime/app-icon.webp",
  "./assets/runtime/fx-correct-sparkle.webp",
  "./assets/runtime/fx-level-confetti.webp",
  "./assets/runtime/fx-try-again-puff.webp",
  "./assets/runtime/m08-flat-moon-workshop-bg-v1.webp",
  "./assets/runtime/moon-workshop-bg.webp",
  "./assets/runtime/part-bridge.webp",
  "./assets/runtime/part-floor.webp",
  "./assets/runtime/part-light.webp",
  "./assets/runtime/part-roof.webp",
  "./assets/runtime/part-star.webp",
  "./assets/runtime/part-wall.webp",
  "./assets/runtime/part-wheel.webp",
  "./assets/runtime/scale-island-map-bg.webp",
  "./assets/runtime/staff-dino-hop-bg-v1.webp",
  "./assets/runtime/staff-star-bridge-scene-tablet-v172.webp",
  "./assets/runtime/staff-star-bridge-scene-wide-v172.webp",
  "./assets/runtime/success-badge.webp",
  "./assets/runtime/xingya-suit-celebrate.webp",
  "./assets/runtime/xingya-suit-good.webp",
  "./assets/runtime/xingya-suit-jump.webp",
  "./assets/runtime/xingya-suit-listen.webp",
  "./assets/runtime/xingya-suit-point.webp",
  "./assets/runtime/xingya-garden-invite-v1.webp",
  "./assets/runtime/xingya-suit-point-flat-m08-v3.webp",
  "./assets/runtime/xingya-suit-try-again.webp"
];

const shellRequest = new Set(APP_SHELL.map((path) => new URL(path, self.registration.scope).href));
const offlineDocument = new URL("./index.html", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith("star-dino-pwa-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

async function navigationFallback(request) {
  try {
    return await fetch(request);
  } catch {
    return (await caches.match(offlineDocument)) || (await caches.match("./")) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(navigationFallback(event.request));
    return;
  }

  if (shellRequest.has(url.href) || url.pathname.includes("/assets/runtime/")) {
    event.respondWith(cacheFirst(event.request));
  }
});
