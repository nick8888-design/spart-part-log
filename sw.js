// Spare Parts Log - Service Worker
// 提供离线访问能力 (OCR 仍需要网络)

const CACHE_NAME = 'parts-log-v1';
const ASSETS = [
  './',
  './index.html'
];

// Install: 预缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// Activate: 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: 缓存优先,回退到网络
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 不缓存 Google Vision API (它需要每次都连网)
  if (url.hostname.includes('vision.googleapis.com')) {
    return; // 让浏览器正常处理
  }
  
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      
      return fetch(event.request).then(response => {
        // 缓存同源资源 + Chart.js + Google Fonts
        if (response.ok && (
          url.origin === self.location.origin ||
          url.hostname.includes('jsdelivr.net') ||
          url.hostname.includes('fonts.googleapis.com') ||
          url.hostname.includes('fonts.gstatic.com')
        )) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // 网络失败时尝试返回缓存的首页
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});
