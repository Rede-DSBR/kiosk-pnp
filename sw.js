const CACHE_NAME = 'pnp-kiosk-v1';
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
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
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
