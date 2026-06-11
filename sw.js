// Service worker for NEET Marks Calculator.
// Strategy:
//   - HTML / navigations  -> NETWORK-FIRST (always get the latest when online,
//     fall back to cache only when offline). This prevents stale-version issues.
//   - Other assets        -> CACHE-FIRST (fast, and fine for versioned icons).
// Bump CACHE_VERSION whenever cached files change.
const CACHE_VERSION = "neet-calc-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.png"
];

// Pre-cache the app shell on install, and activate immediately.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Remove old caches and take control of open pages right away.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHTMLRequest(request) {
  return request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Network-first for the page itself, so a new deploy shows up immediately.
  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put("./index.html", copy));
          return resp;
        })
        .catch(() => caches.match(request).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for everything else (icons, manifest, etc.).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        return resp;
      });
    })
  );
});
