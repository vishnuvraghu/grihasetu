// GrihaSetu Service Worker v1
const CACHE_NAME = 'grihasetu-v4-cache';
const ASSETS = [
  './',
  './grihasetu_v4.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        // If some assets fail (e.g. fonts with CORS), continue gracefully
        console.warn('Some assets failed to cache:', err);
        return cache.addAll(['./', './grihasetu_v4.html', './manifest.json']);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API calls, cache-first for static assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never cache Google API calls (Drive sync, OAuth)
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('accounts.google.com')) {
    return; // Let browser handle normally
  }

  // For everything else: try cache first, fall back to network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback: serve the main app page
      if (event.request.mode === 'navigate') {
        return caches.match('./grihasetu_v4.html');
      }
    })
  );
});
