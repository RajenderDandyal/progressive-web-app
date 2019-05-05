// Service Worker

const pwaCache = 'pwa-cache-2';
const staticAssets = ['/', 'style.css', 'thumb.png', 'main.js'];

self.addEventListener('install', (e) => {
// on install -- open new version of cache db and cache the static assets
  let cacheReady = caches.open(pwaCache).then((cache) => {

    console.log('New cache ready.');
    return cache.addAll(staticAssets);
  });

  e.waitUntil(cacheReady);
});


self.addEventListener('activate', (e) => {
// on activate .. takeover the existing cache dbs .. and delete previous versions of cache dbs
  let cacheCleaned = caches.keys().then((keys) => {

    keys.forEach((key) => {
      if (key !== pwaCache) return caches.delete(key);
    });
  });

  e.waitUntil(cacheCleaned);

});


self.addEventListener('fetch', (e) => {
  ///////////////////////////////////////////////////////////////////
  ///simple strtergy
  /// cache assets only from origin(client server) and ignore caching of remote requests ex.. app backend server


  // Skip for remote fetch
  if (!e.request.url.match(location.origin)) return fetch(e.request);

  // Serve client assets local fetch from cache
  let newRes = caches.open(pwaCache).then((cache) => {
    return cache.match(e.request).then((res) => {

      // Check request was found in cache
      if (res) {
        console.log(`Serving ${res.url} from cache.`);
        return res;
      }

      // Fetch client assets on behalf of client and cache
      return fetch(e.request).then((fetchRes) => {

        cache.put(e.request, fetchRes.clone());
        return fetchRes;
      });
    });
  });

  e.respondWith(newRes);

});
