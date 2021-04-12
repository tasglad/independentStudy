//permissions.js
//holds all the JavaScript for the permissions.html page
//Checks to see if there are any errors from being sent back from the testing page
//Written by Taissa Gladkova 4/9/21

checkForErrors();

function checkForErrors(){
  var errorText = sessionStorage.getItem("errorText");
  console.log("Location errors: " + errorText);

  if(errorText != null && errorText != ""){
    //display
    document.getElementById("location-error").innerHTML = errorText; 
    //reset storage for next time
    sessionStorage.setItem("errorText", ""); 
  }
  else {
    //remove errored formatting and dont print
    document.getElementById("location-error").style.backgroundColor = "#EEEEEE"; 
  }
}