
const CACHE_NAME = 'la-buenota-cache-v1';
const urlsToCache = [
  '.',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fondobuenota.png',
  './vinilodisco.png'
];

// Instalación y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch para servir recursos cacheados o en línea
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});