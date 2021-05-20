
//Get HTML elements
var modal = document.getElementById("myModal"); // Get the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
var cancel_bttn = document.getElementById("cancel-login"); //Get the Cancel button;
var login_bttn = document.getElementById("login-button"); //Get the Login button;

var nextPage = "see-data.html"; //go to map after logging in


// When the user clicks on the button, open the modal
function openLogInModal() {
  //open
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  window.history.back();
}

// When the user clicks on cancel, go to home;
cancel_bttn.onclick = function(){
  modal.style.display = "none";
}

// When the user clicks login, go to map;
login_bttn.onclick = function(){
  window.location.href = nextPage; 
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}