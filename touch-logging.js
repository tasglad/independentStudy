//touch-logging.js
//holds all the JavaScript for the touch-logging.html page
//Handles location permissions then changes to pressure sensing
//Written by Taissa Gladkova 4/9/21


//immediatley ask for users location (location.js)
getUsersLocation();

//declare variables
var stress;

//--------------SET-UP TOUCH TARGET-------------------
//----------------------------------------------------
var block = {
  start: function(event) {
    console.log('start', event);
  },

  change: function(force, event) {
    // event.preventDefault();
    //change size of element based on force
    this.style.width = Pressure.map(force, 0, 1, 200, 300) + 'px';
    this.style.height = Pressure.map(force, 0, 1, 200, 300) + 'px';

    //update number displayed on circle and record stress
    this.innerHTML = String(Math.round(force*10));
    console.log('change', force);
    stress = Math.round(force*10);

    //update background
    this.style.backgroundColor = percentToColor(force); //function in color-gradients.js
  },

  startDeepPress: function(event) {
    console.log('start deep press', event);
  },

  endDeepPress: function() {
    console.log('end deep press');
  },

  end: function() {
    console.log('end');
    //reset button look
    this.style.width = '200px';
    this.style.height = '200px';
    this.innerHTML = "Press Here!";
    this.style.backgroundColor = '#00AF65';

    //trigger popup
    openModal(sessionStorage.getItem("lat"),sessionStorage.getItem("long"),stress);
  },

  unsupported: function() {
    console.log(this);
    this.innerHTML = 'Your device / browser does not support this :(';
  }
}

//Following line sets up element as a sensor. setting polyfill to false makes it so it senses 
//by pressure not time, and error pops up for incompatible devices.
//Setting polyfill to teue records info as duraation of press not pressure.
//Currently, pressure sensing only compatible with iphone 6,6+,7,7+. 
//On these devices even with polyfill as true, they will correctly sense by pressure.
//polyfill as true acts as a fallback for incompatible devices. 
Pressure.set(document.querySelectorAll('#el1'), block, {polyfill: true});

