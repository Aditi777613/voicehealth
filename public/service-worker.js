const CACHE_NAME = 'voicehealth-v2'; // bump version
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico'
];

// INSTALL — force new SW to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 🔥 KEY FIX
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE — take control without second reload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 🔥 KEY FIX
      self.clients.claim()
    ])
  );
});

// FETCH — cache-first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
