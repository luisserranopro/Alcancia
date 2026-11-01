// Modo sin conexión: guarda la aplicación (no los datos) en la caché del navegador
const CACHE = 'alcancia-c07b9942be';
const FICHEROS = ['./', './index.html', './manifest.webmanifest', './icono.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHEROS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
    const copia = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return resp; })).catch(() => caches.match('./index.html')));
});
