const CACHE = 'studyhub-v1';
const ASSETS = [
  '/Economic-subscription.planner/',
  '/Economic-subscription.planner/index.html',
  '/Economic-subscription.planner/planner.html',
  '/Economic-subscription.planner/promptpay-qr.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
