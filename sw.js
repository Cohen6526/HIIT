const version = 'v127';  // change this everytime you update the service worker
                          // to force the browser to also update it.

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'style.css',
        'script.js',
        'icons/favicon.png',
        'icons/icon512_maskable.png',
        'icons/icon512_rounded.png',
        'sfx/dingding.mp3',
        'screenshots/screenshot1.png',
        'screenshots/screenshot2.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});