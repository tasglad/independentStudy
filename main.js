//get api key from external file
//module.import api_key from './keys.js';

var locDisp = document.getElementById("location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    locDisp.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  locDisp.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

  //get image
  // var latlon = position.coords.latitude + "," + position.coords.longitude;
  // var map_img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+
  // latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";

  // //update map image
  // document.getElementById("mapholder").innerHTML = "<img src='"+map_img_url+"'>";
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