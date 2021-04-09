//--------SET-UP TOUCH TARGET-------------------------
var block = {
  start: function(event) {
    console.log('start', event);
  },

  change: function(force, event) {
    // event.preventDefault();
    this.style.width = Pressure.map(force, 0, 1, 200, 300) + 'px';
    this.style.height = Pressure.map(force, 0, 1, 200, 300) + 'px';

    this.innerHTML = String(Math.round(force*100)) + '%';
    console.log('change', force);
    //this.style.backgroundColor = '#FF0040';
    this.style.backgroundColor = forceToColor(force);
  },

  startDeepPress: function(event) {
    console.log('start deep press', event);
    //this.style.backgroundColor = '#FF0040';
  },

  endDeepPress: function() {
    console.log('end deep press');
    //this.style.backgroundColor = '#00AF65';
  },

  end: function() {
    console.log('end');
    this.style.width = '200px';
    this.style.height = '200px';
    this.innerHTML = "";
    this.style.backgroundColor = '#00AF65';
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



//turns the force(range 0-1) to a hex color from green to yellow to red
//source: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage/7128796

var percentColors = [
  { pct: 0.0, color: { r: 0, g: 175, b: 101 } },
  { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
  { pct: 1.0, color: { r: 255, g: 0, b: 0 } } 
];


function forceToColor(pct) {
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