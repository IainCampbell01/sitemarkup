// Site Markup service worker: keeps the whole app on the device so it opens with no signal.
const CACHE = 'site-markup-v2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(u => new Request(u, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('site-markup-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Offline first: answer from the device straight away, refresh the saved copy in the background when there is signal.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    let hit = await c.match(req, {ignoreSearch: true});
    if (!hit && req.mode === 'navigate') {
      const p = new URL(req.url).pathname;
      if (/\/sitemarkup\/?$|\/$|index\.html$/.test(p) || !/\.[a-z0-9]+$/i.test(p)) hit = await c.match('./index.html');
    }
    const refresh = fetch(req, {cache: 'no-cache'}).then(r => { if (r && r.ok && hit) c.put(req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(refresh); return hit; }
    return (await refresh) || (req.mode === 'navigate' ? await c.match('./index.html') : null) || new Response('Offline', {status: 503});
  })());
});
