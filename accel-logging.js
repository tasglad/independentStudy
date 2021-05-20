//acceration.js
//holds all the JavaScript for the acceleration.html page
//Written by Taissa Gladkova 4/9/21

//immediatley ask for users location (location.js)
getUsersLocation();

//declare variables
var stress; //final stress number that is displayed out of 10

var noErrors = true; // turned false if acceleration doesnt work

var shake_thresh; //"maximum" acceleration that will map to 100%
var curr_shake; //accel currently read
var accel_event;
var max_shake = -1; //initiate as negative so we know when shaking starts

var seconds = 6; //number of seconds before popup appears


//--------SET-UP AND READ ACCEL--------------------------------
//sets up listener and runs logging. Called when "I'm ready" button is pressed
function getAccel() {
  // feature detect (see if exists on this device)
  try {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          //update info about permissions
          console.log("accelerometer permission granted");

          //start listening
          window.addEventListener('devicemotion', (event) => {
            //get accel
            accel_event = event.acceleration;
            curr_shake = Math.abs(accel_event.x)+Math.abs(accel_event.y)+Math.abs(accel_event.z);
            
            //check if max accel
            if (curr_shake > max_shake) {
              max_shake = curr_shake;
            }

            //uncomment if you want the page to display accel: update page
            //document.getElementById("accelVar").innerHTML = max_shake;

            //Update background color
            updateColor(max_shake);
          });
        }
      })
  } catch(error) {
    // handle regular non iOS 13+ devices
    console.error(error);
    document.getElementById("accelMessage").innerHTML = 
    "Acceleration not handled on this device";
    noErrors = false;
  }
}

//After I'm ready button is clicked, call hideshow: hiding button and starting countdown
var button = document.getElementById('accel-button') //I'm ready button
button.addEventListener('click',hideshow,false);

var countdown = document.getElementById('seconds-counter'); //countdown
var myCounter;

//triggered when "I'm ready" button is clicked
function hideshow() {
  //hide the button
  document.getElementById('button-container').style.display = 'block'; 
  this.style.display = 'none'

  //show countdown
  if(noErrors){
    //repeat every second
    myCounter = setInterval(function(){
      seconds -= 1;
      countdown.innerText = seconds; //show on screen

      //once countdown is done, cancel countdown
      if(seconds == 0){
        clearInterval(myCounter); // cancel countdown
        countdown.innerText = "";
      }
    },1000) //repeat every second
  }

  //after button clicked start 5 second timer before popping up log in
  //only if no error though
  if (noErrors){
    setTimeout(function(){
      //set acceleration to range 0-1 then transform into integer 1-10
      stress = Math.round(maptoRange(max_shake)*10);
      openModal(sessionStorage.getItem("lat"),sessionStorage.getItem("long"),stress);
    }, seconds*1000);
  }
}


//--------UPDATE BACKGROUND--------------------------------
var min_accel = 0;
var max_accel = 100;
var min_pct = 0;
var max_pct = 1;
var slope = (max_pct - min_pct) / (max_accel-min_accel);

//uses above variables to map an acceleration to a range of 0-1
function maptoRange(max_shake){
  return min_pct + slope * (max_shake - min_accel);
}

//updates background color to match the current max_shake
function updateColor(max_shake) {
  //scale shake to a percent (accel range 0-150, map to 0-1)
  pct = maptoRange(max_shake);
  if (pct > 1){
    pct = 1; //if above max cut off at 1
  }

  //change background to match
  document.body.style.background = percentToColor(pct); //function in color-gradients.js
  //change header text to be white so still legible  
  document.getElementById("header").style.color = '#EEEEEE';
}
