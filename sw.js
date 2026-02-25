const CACHE_NAME = 'pnp-kiosk-v2';
const VIDEO_CACHE_NAME = 'pnp-kiosk-video-v1';

const urlsToCache = [
  '/kiosk-pnp/',
  '/kiosk-pnp/index.html',
  '/kiosk-pnp/dashboard.html',
  '/kiosk-pnp/static/assets/img/pnp_horizontal.png',
  '/kiosk-pnp/static/assets/img/favicon.ico',
  '/kiosk-pnp/static/assets/img/Layout da TV.svg',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js',
  'https://code.jquery.com/jquery-3.7.0.min.js'
];

// Video URLs to cache at runtime
const VIDEO_HOSTS = ['storage.googleapis.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't intercept video requests - let browser handle natively (avoids CORS)
  if (VIDEO_HOSTS.some(host => url.hostname.includes(host))) {
    return; // Browser handles video caching
  }

  // Cache-first for all other requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, VIDEO_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
