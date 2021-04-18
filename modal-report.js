// Get the HTML elements
var modal = document.getElementById("myModal");
var stressText = document.getElementById("stress-level");
var latText = document.getElementById("lat-text");
var longText = document.getElementById("long-text");
var tryAgain = document.getElementById("try-again");
var saveBttn = document.getElementById("save-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
//lat an lon coordinates and stress given as a number 0-10
function openModal(lat,long,stress) {
  //open
  modal.style.display = "block";
  
  //fill in info
  stressText.innerHTML = stress + " out of 10";
  latText.innerHTML = "Latitude: " + lat;
  longText.innerHTML = "Longtitude: " + long;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on try again, refresh the site
tryAgain.onclick = function(){
  window.location.reload(false);
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}