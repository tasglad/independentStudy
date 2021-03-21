
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


//get api key from external file
let api_key = getKey();  

//--------SET-UP GPS BUTTON-------------------------
var locDisp = document.getElementById("location");


//--------SET-UP MAP--------------------------------

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key='+api_key+'&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);



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
  locDisp.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

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