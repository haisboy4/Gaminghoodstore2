const CACHE_NAME = 'game-store-full-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './fallback.jpg' // fallback image for offline errors
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Cache-first strategy for images
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
          return response;
        }).catch(() => caches.match('./fallback.jpg'));
      })
    );
    return;
  }

  // Network-first strategy for everything else
  event.respondWith(
    fetch(request).then(response => {
      const resClone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
      return response;
    }).catch(() => caches.match(request))
  );
});
