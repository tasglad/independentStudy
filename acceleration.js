//acceration.js
//holds all the JavaScript for the acceleration.html page
//Written by Taissa Gladkova 4/9/21

//declare variables
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
  }
}

//hide button when clicked
var button = document.getElementById('accel-button')
button.addEventListener('click',hideshow,false);

function hideshow() {
  document.getElementById('button-container').style.display = 'block'; 
  this.style.display = 'none'
}

//--------UPDATE BACKGROUND--------------------------------
var min_accel = 0;
var max_accel = 100;
var min_pct = 0;
var max_pct = 1;
var slope = (max_pct - min_pct) / (max_accel-min_accel);

function updateColor(max_shake) {
  //scale shake to a percent (accel range 0-150, map to 0-1)
  pct = min_pct + slope * (max_shake - min_accel);


  //change background to match
  document.body.style.background = percentToColor(pct);
  //change header text to be white so still legible  
  document.getElementById("header").style.color = '#EEEEEE';
}

//turns the force(range 0-1) to a hex color from green to yellow to red
//source: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage/7128796
var percentColors = [
  { pct: 0.0, color: { r: 0, g: 175, b: 101 } },
  { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
  { pct: 1.0, color: { r: 255, g: 0, b: 0 } } 
];


function percentToColor(pct) {
  for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
          break;
      }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
};
