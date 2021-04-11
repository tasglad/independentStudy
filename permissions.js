//permissions.js
//holds all the JavaScript for the permissions.html page
//Written by Taissa Gladkova 4/9/21

let long;
let lat;

//--------SET-UP GPS-------------------------
var locDisp = document.getElementById("location");

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
  long = position.coords.longitude;
  lat = position.coords.latitude;
  locDisp.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
  
  //center map on this position
  map.flyTo({
    center: [long, lat],
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