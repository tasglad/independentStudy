//get api key from external file
//import { api_key } from "./keys.js"; 
//import { api_key } from "keys.js";
// function include(file) { 
  
//   var script  = document.createElement('script'); 
//   script.src  = file; 
//   script.type = 'text/javascript'; 
//   script.defer = true; 
  
//   document.getElementsByTagName('head').item(0).appendChild(script); 
// } 
// include("keys.js");
// console.log(api_key);

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
  // var api_key = "AIzaSyCaWJYwsqYbug3-TEM7cqYlEhvVwECGpjY";
  // var map_img_url = "https://www.google.com/maps/embed/v1/place?key=" + api_key+
  // "&center="+latlon+"&zoom=14";

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