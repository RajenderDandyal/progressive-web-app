
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js').then(function(registration){

    console.log('SW Registered');

    // tracking sw update lifecycle
    registration.onupdatefound =()=>{
      console.log('new SW found')

      let newSW = registration.installing;

      newSW.onstatechange = ()=>{
        console.log(newSW.state, newSW.scriptURL)
      }
    }

    // using channel message api .. to talk to sw.js as it runs of different thread

    //// //... will send a message to currently active sw
    if (registration.active){
      registration.active.postMessage('Hello from main.js')
    }

    // prompt user to update .. if new sw is found
    registration.onupdatefound =()=>{
      console.log('new SW found')

      let newSW = registration.installing;
       if (confirm('An update of app is available, Do you want to update?')){
         if (registration.active){
           newSW.postMessage('updateSelf')
         }
       }
    }

  }).catch(console.log);

}


// get camera feeds
fetch('camera_feed.html')
.then((res)=>res.text())// .text because the response from server is html file
.then((html)=>document.querySelector('div[class="camera"]').innerHTML = html)
//.then((html)=>document.querySelector("div.camera").innerHTML = html)
//.then((html)=>document.querySelector('.camera').innerHTML = html)


// receiving message from sw.js as client
navigator.serviceWorker.addEventListener('message', (e)=>{
  console.log(e.data)
})