//location.js
//holds all the JavaScript for getting users location. Called by logging pages
//Written by Taissa Gladkova 4/9/21


//---------------SET-UP GPS------------------
//-------------------------------------------
var locDisp = document.getElementById("location");
var prevPage = "permissions.html"; //sends back here during error
var errorText; //info for prevPage to display error type

//get users coordinates
function getUsersLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else { 
    //sends user back to permissions page and gives error type
    window.location.replace(prevPage);
    errorText = "Geolocation is not supported by this browser."
    sessionStorage.setItem("errorText",errorText); 
  }
}

//save coordinates
function showPosition(position) {
  //get lat and long 
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  // // show on screen
  // locDisp.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;

  //save coordinates
  sessionStorage.setItem("lat",lat);
  sessionStorage.setItem("long",long);
  console.log(lat + "  " + long);
}

//error codes for getting location
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      //sends user back to permissions page and gives error type
      window.location.replace(prevPage);
      errorText = "User denied the request for Geolocation. Try again.";
      sessionStorage.setItem("errorText",errorText); 
      break;
    case error.POSITION_UNAVAILABLE:
      window.location.replace(prevPage);  
      errorText = "Location information is unavailable. Try again.";
      sessionStorage.setItem("errorText",errorText);
      break;
    case error.TIMEOUT:
      window.location.replace(prevPage);
      errorText = "The request to get user location timed out. Try again.";
      sessionStorage.setItem("errorText",errorText);
      break;
    case error.UNKNOWN_ERROR:
      window.location.replace(prevPage);
      errorText = "An unknown error occurred. Try again.";
      sessionStorage.setItem("errorText",errorText);
      break;
  }
}