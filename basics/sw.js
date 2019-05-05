// sw lifecycle
// register --- parsing sw.js
// install ---  installing in browser  ---good for pre caching static assets
// waiting -- if another sw is already registered with current domain ... open current domain in new tab then new sw will register
// activated -- now sw have full control of the page

// Service Worker scope
// default it include every thing in scope which have the same relative path
// means all html files here are in sw scope
// also any file inside ex public/index.html will also be in its scope

self.addEventListener('install', (e) => {
  //perform some pre caching for static assets ex.. index.html, .css, main.js etc
  let resolvedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Sw1 install');
      resolve()
    }, 0)
  })
  e.waitUntil(resolvedPromise)// further execution to activate event will be stopped until the promise resolve

  //self.skipWaiting();
});

self.addEventListener('activate', (e) => {
// good for tasks where we takeover from other service worker .. ex cache cleanup

  let resolvedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('SW3 Activated');
      resolve()
    }, 0)
  })
  e.waitUntil(resolvedPromise)
  //self.skipWaiting() to force update the sw .. on current user session
});

self.addEventListener('fetch', (e) => {
  //e.respondWith(fetch(e.request)) this forwards the same request
  // .endsWith() is method on string
  if (e.request.url.endsWith('style.css')) {
    console.log('fetch event' + e.request.url)
    e.respondWith(fetch('/style2.css'))
  }
  if (e.request.url.endsWith('/greet')) {
    console.log('fetch event' + e.request.url);

    let headers = new Headers({'Content-Type': 'text/html'});
    let response = new Response('<h1>Hello</h1>', {headers});
    e.respondWith(response)
  }
  if (e.request.url.endsWith('/camera_feed.html')) {
    console.log('fetch event' + e.request.url);

    let headers = new Headers({'Content-Type': 'text/html'});
    let response = new Response('<h1>Camera feed is currently not available</h1>', {headers});
    e.respondWith(fetch(e.request).then(res => {
      if (res.ok) return res;
      // change the file name from camera_feed.html to camera_feeds.html to see different response
      return response
    }))
  }
  //    console.log('fetch event' + e.request.url)
})
/////////////////////////////////////////////////////////////////////////////////////
// using html channel message api .. to talk to sw.js as it runs of different thread/////
/////////////////////////////////////////////////////////////////////////////////////

// receiving message from client/s and responding
self.addEventListener('message', (e) => {
  console.log(e.data)//

  if (e.data === 'updateSelf') {
    console.log('sw updating')
    self.skipWaiting().then(() => console.log('sw updated'))
  }

  // clients == no. of open window tap per domain
// sending message from service worker to all clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('Hello to all clients from sw.js')
    })
  })

  // sending message from service worker to specific client who generated the msg
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      if (e.source.id === client.id) {
        client.postMessage('Private Hello from sw.js')
      }
    })
  })


})


