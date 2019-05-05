// sw support itself says that caches also have support
// we can work with caches from main.js i.e on main thread ... and also on sw
/*
if (window.caches){

  // caches interface for opening, creating, checking, deleting the dbs
  caches.open('test1').then(()=>{ // opens existing or create new cache db
    console.log('test1 cacheDB')
  })
  caches.open('test2').then(()=>{ // opens existing or create new cache db
    console.log('test2 cacheDB')
  })
  caches.keys().then(dbs=>{ // return array of dbs name:string
    console.log(dbs)
  })
  caches.has('test1').then(db=>{ // return boolean
    console.log(db)
  })
  caches.delete('test1').then(db=>{ // return boolean
    console.log(db)
    caches.keys().then(dbs=>{ // return array of dbs name:string
      console.log(dbs)
    })
  })


  // cache Api for working on single opened db via caches interface
  caches.open('pwa-v1.1').then(cache=>{
    cache.add('/index.html') // add -- first makes the request and then saves the success response in opened db


    cache.addAll([
      '/index.html','/style.css','/main.js'
    ])
        .then(()=>{
          console.log('addAll')
          cache.delete('/index.html').then(()=>console.log('deleted all'))
        })// add -- first makes the request and then saves the success response in opened db
    // if one response fails then other will not be executed -- means fail

    cache.match('/style.css')
        .then(res=>{
          res.text().then(console.log)
        })
        //.then(console.log)// to get something from storage
    cache.keys().then(console.log)
    //cache.put('/hello', new Response('Hi there')).then(console.log)

  })


}*/
