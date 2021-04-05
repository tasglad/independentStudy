
//--------SET-UP TOUCH TARGET-------------------------
var block = {
  start: function(event) {
    console.log('start', event);
  },

  change: function(force, event) {
    // event.preventDefault();
    this.style.width = Pressure.map(force, 0, 1, 200, 300) + 'px';
    this.innerHTML = force;
    console.log('change', force);
  },

  startDeepPress: function(event) {
    console.log('start deep press', event);
    this.style.backgroundColor = '#FF0040';
  },

  endDeepPress: function() {
    console.log('end deep press');
    this.style.backgroundColor = '#0080FF';
  },

  end: function() {
    console.log('end');
    this.style.width = '200px';
    this.innerHTML = 0;
  },

  unsupported: function() {
    console.log(this);
    this.innerHTML = 'Your device / browser does not support this :(';
  }
}

//Following line sets up element as a sensor. setting polyfill to false makes it so it senses 
//by pressure not time, and error pops up for incompatible devices
//currently, pressure sensing only compatible with iphone 6,6+,7,7+. 
//On these devices even with polyfill as true, they will correctly sense by pressure.
//polyfill acts as a fallback for incompatible devices. 
Pressure.set(document.querySelectorAll('#el1'), block, {polyfill: true});

//--------SET-UP ACCEL--------------------------------
var shake_thresh;
var curr_shake;
var accel_event;

function getAccel() {
  // feature detect (see if exists on this device)
  try {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          //update info about permissions
          console.log("accelerometer permission granted");
          document.getElementById("accelMessage").innerHTML = 
          "Acceleration set up on this device";

          //start listening
          window.addEventListener('devicemotion', (event) => {
            document.getElementById("accelVar").innerHTML = "listener here";
            accel_event = event.acceleration;
            curr_shake =  event.acceleration.x;
            //curr_shake = Math.abs(accel_event.x)+Math.abs(accel_event.y)+Math.abs(accel_event.z);
            document.getElementById("accelVar").innerHTML = curr_shake;
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

// function getAccel(){
//   DeviceMotionEvent.requestPermission().then(response => {
//       if (response == 'granted') {
//           console.log("accelerometer permission granted");
//           // Do stuff here
//       }
//   });
// }


//--------SET-UP MAP--------------------------------
//stress data location
stressDataFile = './data/fake_stress_data.geojson';

//get Mapbox api key from external file
let api_key = getKey();
mapboxgl.accessToken = api_key; 

//call mapbox to create map
var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);


//set up map as it loads
map.on('load', function() {
  //add in source
  map.addSource('stress', {
    type: 'geojson',
    data: stressDataFile,
  });


  //recenter map on data
  loadJSON(function(json) {
    console.log(json); // this will log out the json object
    let features = json.features  // ... array of features

    // first coordinate in features
    let co = features[0].geometry.coordinates;

    // we want to determine the bounds for the features data
    let bounds = features.reduce((bounds, feature) => {
      return bounds.extend(feature.geometry.coordinates);
    }, new mapboxgl.LngLatBounds(co[0].lng, co[0].lat));

    // set bounds according to features
    map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 14.15,
      duration: 2000
    });
  });

  // add heatmap layer here
  map.addLayer({
    'id': 'stress-heat',
    'type': 'heatmap',
    'source': 'stress',
    'maxzoom': 15,
    'paint': {
      // increase weight as stress increases
      'heatmap-weight': {
        'property': 'stress',
        //'type': 'exponential',
        'stops': [
          [0, 0.1],
          [1, 0.5],
          [5, 1],
          [7, 2],
          [10, 3]
        ]
      },

      // increase intensity as zoom level increases
      'heatmap-intensity': {
        'stops': [
          [5,1],
          [10, 2],
          [15, 3],
          [20, 4],
        ]
      },
      
      // use sequential color palette to use exponentially as the weight increases
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.2,
        'rgb(103,169,207)',
        0.4,
        'rgb(209,229,240)',
        0.6,
        'rgb(253,219,199)',
        0.8,
        'rgb(239,138,98)',
        1,
        'rgb(178,24,43)'
      ],

      // increase radius as zoom increases
      'heatmap-radius': {
        'stops': [ //radius in pixels, based on zoom level
          [5,20],
          [10, 25],
          [15, 30],
          [20,50]
        ]
      },

      // decrease opacity to transition into the circle layer
      'heatmap-opacity': {
        'default': 1,
        'stops': [
          [14, 1], //opacity from 1 to 0 between zoom level 15 to 14
          [15, 0]
        ]
      }
    }
  },
    'waterway-label'
  );

  // add circle layer here
  map.addLayer({
    id: 'stress-point',
    type: 'circle',
    source: 'stress',
    minzoom: 14,
    paint: {
      // increase the radius of the circle as the zoom level and dbh value increases
      'circle-radius': {
        property: 'stress',
        type: 'exponential',
        stops: [
          [{ zoom: 15, value: 1 }, 5],
          [{ zoom: 15, value: 10 }, 10],
          [{ zoom: 22, value: 1 }, 20],
          [{ zoom: 22, value: 10 }, 50],
        ]
      },
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'stress'],
        0,
        'rgba(33,102,172,0)',
        2,
        'rgb(103,169,207)',
        4,
        'rgb(209,229,240)',
        6,
        'rgb(253,219,199)',
        8,
        'rgb(239,138,98)',
        10,
        'rgb(178,24,43)'
      ],

      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      'circle-opacity': {
        stops: [
          [14, 0],
          [15, 1]
        ]
      }
    }
  }, 'waterway-label');
});

//click point to view popup of logged stress level
map.on('click', 'stress-point', function(e) {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML('<b>Stress:</b> ' + e.features[0].properties.stress + ' out of 10')
    .addTo(map);
});


//helper function to load json file in code
function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', stressDataFile, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);  
}

//--------SET-UP GPS BUTTON-------------------------
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
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
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