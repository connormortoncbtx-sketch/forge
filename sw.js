const CACHE = 'forge-v27';
const PRECACHE = [
  'workout-tracker.html','exercise-library.js','manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap',
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(PRECACHE.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.url.includes('anthropic.com')||e.request.url.includes('workers.dev')){e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return;}if(e.request.url.includes('workout-tracker.html')||e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));return;}e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(r=>{if(!r||r.status!==200)return r;const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.match('workout-tracker.html'));}));});
