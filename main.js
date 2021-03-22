
//--------SET-UP TOUCH TARGET-------------------------
var block = {
  start: function(event) {
    console.log('start', event);
  },

  change: function(force, event) {
    // event.preventDefault();
    this.style.width = Pressure.map(force, 0, 1, 200, 300) + 'px';
    this.innerHTML = force;
    console.log('change', force);
  },

  startDeepPress: function(event) {
    console.log('start deep press', event);
    this.style.backgroundColor = '#FF0040';
  },

  endDeepPress: function() {
    console.log('end deep press');
    this.style.backgroundColor = '#0080FF';
  },

  end: function() {
    console.log('end');
    this.style.width = '200px';
    this.innerHTML = 0;
  },

  unsupported: function() {
    console.log(this);
    this.innerHTML = 'Your device / browser does not support this :(';
  }
}

Pressure.set(document.querySelectorAll('#el1'), block, {polyfill: false});


//--------SET-UP GPS BUTTON-------------------------
var locDisp = document.getElementById("location");


//--------SET-UP MAP--------------------------------
//get Mapbox api key from external file
let api_key = getKey();
mapboxgl.accessToken = api_key;  

//call mapbox to create map
var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });


//get users coordinates
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    locDisp.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//show coordinates on screen
function showPosition(position) {
  //get lat and long and show on screen
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  locDisp.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;

  //center map on this position
  map.flyTo({
    center: [
    long, lat
    ],
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
}

//error codes for getting location
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      locDisp.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      locDisp.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      locDisp.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      locDisp.innerHTML = "An unknown error occurred."
      break;
  }
}