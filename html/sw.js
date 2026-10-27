// Self-unregistering and cache-clearing Service Worker
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.claim();
    })
  );
});
