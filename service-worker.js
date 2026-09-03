const CACHE_NAME = "star-dino-pwa-overhaul-369i-pwa-cache-retirement";
// 369i requalifies the PWA cache after retiring one cache-only historical asset.

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
  "./current-overhaul.css?v=overhaul-340d-p1",
  "./roof-blueprint-overrides.css?v=overhaul-340c",
  "./chapter3-visible.css?v=overhaul-343a-p1",
  "./chapter4-slice.css?v=overhaul-366a-c4-settlement-lp04-continuity-correction",
  "./course-director.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction",
  "./parent-experience.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction",
  "./child-feedback-intensity.css?v=overhaul-369e-ipad-settlement-compactness-correction",
  "./m01-m03-companion-feedback.css?v=overhaul-365b-parental-challenge-pointer-cancel-correction",
  "./world-map-v5-prototype.css?v=overhaul-361a-dark-scifi-map-v5-reference",
  "./world-map-v6-dark-scifi.css?v=overhaul-367b-world-map-pwa-qualification",
  "./s01-mini-training-dock.css?v=overhaul-368b-s01-mini-continuity-correction",
  "./staff-notation-geometry.css?v=overhaul-369a-staff-notation-geometry-correction",
  "./app.js?v=overhaul-369e-ipad-settlement-compactness-correction",
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
  "./assets/runtime/world-map-v5-361a.webp",
 "./assets/runtime/staff-star-bridge-scene-tablet-v172.webp",
  "./assets/runtime/staff-star-bridge-scene-wide-v172.webp",
  "./assets/runtime/success-badge.webp",
  "./assets/runtime/xingya-suit-celebrate.webp",
  "./assets/runtime/xingya-suit-good.webp",
  "./assets/runtime/xingya-suit-jump.webp",
  "./assets/runtime/xingya-suit-listen.webp",
  "./assets/runtime/xingya-suit-point.webp",
  "./assets/runtime/xingya-garden-invite-v1.webp",
  "./assets/runtime/xingya-suit-point-m08-route-a2.png",
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
