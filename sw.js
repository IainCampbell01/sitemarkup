// Site Markup service worker: caches the app so it opens with no signal.
const CACHE = 'site-markup-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Cache first (works offline), then refresh the cached copy in the background so updates arrive.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, {ignoreSearch: true});
    const net = fetch(req).then(r => { if (r && r.ok && hit) c.put(req, r.clone()); return r; }).catch(() => null);
    if (hit) return hit;
    return (await net) || (req.mode === 'navigate' ? await c.match('./index.html') : null) || new Response('Offline', {status: 503});
  }));
});
