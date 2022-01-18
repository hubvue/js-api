// 监听install事件，回调中缓存所需文件

self.addEventListener('install', (e) => {
      e.waitUntil(
            caches.open('my-cache').then((cache) => {
                  return cache.addAll(['./index.html', './index.js'])
            })
      )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据。

self.addEventListener('fetch', e => {
      e.respondWith(
            caches.match(e.request).then(response => {
                  if(response) {
                        return response;
                  }
                  console.log('fetch source')
            })
      )
})