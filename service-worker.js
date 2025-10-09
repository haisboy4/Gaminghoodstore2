const CACHE_NAME = 'gaming-hood-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  'https://docs.google.com/spreadsheets/d/1USDHhOVNWZQczP9uhHLv7Vscr3wP-qzGemkggbQLU9I/export?format=csv'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
