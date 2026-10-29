/**
 * @file sw.js
 * @description Service Worker ligero para NexoSQL (PWA).
 * Aplica estrategia Cache-First prioritaria para el binario WebAssembly (.wasm) de sql.js,
 * íconos y fuentes, logrando carga instantánea (0ms) y soporte offline.
 */

const CACHE_NAME = 'nexosql-pwa-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Favicon_NexoSQL.png',
  '/navbar-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((oldKey) => caches.delete(oldKey))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignorar peticiones a analítica externa o extensiones de navegador
  if (
    !url.protocol.startsWith('http') ||
    url.hostname.includes('clarity.ms') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('generativelanguage.googleapis.com')
  ) {
    return;
  }

  // Estrategia Cache-First dedicada para binarios WebAssembly (.wasm), fuentes e imágenes
  const isImmutableBinaryOrFont =
    url.pathname.endsWith('.wasm') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg');

  if (isImmutableBinaryOrFont) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Estrategia Network-First con fallback a caché para documentos y bundles JS/CSS
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && url.origin === self.location.origin) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
  );
});

