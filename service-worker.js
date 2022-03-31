const STATIC_CACHE_NAME = 's-app-game-v1';
const DYNAMIC_CACHE_NAME = 'd-app-game-v1';

const ASSET_URLS = ['index.html'];

self.addEventListener('install', async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(ASSET_URLS);
});

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();
  await Promise.all([
    cacheNames
      .filter((name) => name !== STATIC_CACHE_NAME)
      .filter((name) => name !== DYNAMIC_CACHE_NAME)
      .map((name) => caches.delete(name)),
  ]);
});

self.addEventListener('fetch', (event) => {
  event.respondWith(onlyNetwork(event.request));
});

async function onlyNetwork(req) {
  if (req.method !== 'GET') {
    const res = await fetch(req);
    return res;
  }

  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (err) {
    const res = await cache.match(req);
    return res;
  }
}
