//acceration.js
//holds all the JavaScript for the acceleration.html page
//Written by Taissa Gladkova 4/9/21

//immediatley ask for users location (location.js)
getUsersLocation();

//declare variables
var stress;
var lat = sessionStorage.getItem("lat");
var long = sessionStorage.getItem("long");

var noErrors = true;

var shake_thresh;
var curr_shake;
var accel_event;
var max_shake = -1; //initiate as negative so we know when shaking starts

//--------SET-UP AND READ ACCEL--------------------------------
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
            document.getElementById("accelVar").innerHTML = "listener here";
            accel_event = event.acceleration;
            curr_shake = Math.abs(accel_event.x)+Math.abs(accel_event.y)+Math.abs(accel_event.z);
            
            //check if max accel
            if (curr_shake > max_shake) {
              max_shake = curr_shake;
            }

            //update page
            document.getElementById("accelVar").innerHTML = max_shake;

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

//hide button when clicked
var button = document.getElementById('accel-button')
button.addEventListener('click',hideshow,false);

function hideshow() {
  //hide show
  document.getElementById('button-container').style.display = 'block'; 
  this.style.display = 'none'

  //after button clicked start 5 second timer before popping up log in
  //only if no error though
  if (noErrors){
    setTimeout(function(){
      //set acceleration to range 0-1 then transform into integer 1-10
      stress = Math.round(maptoRange(max_shake)*10);
      openModal(lat,long,stress);
    }, 5000);
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

function updateColor(max_shake) {
  //scale shake to a percent (accel range 0-150, map to 0-1)
  pct = maptoRange(max_shake);

  //change background to match
  document.body.style.background = percentToColor(pct); //function in color-gradients.js
  //change header text to be white so still legible  
  document.getElementById("header").style.color = '#EEEEEE';
}
