//color-gradient.js
//support code for mapping numbers to gradients
//Written by Taissa Gladkova 4/9/21

//turns the range 0-1 to a hex color from green to yellow to red (where 0 is green and 1 is red)
//source: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage/7128796

//edit this to change the color of the gradient
var percentColors = [
  { pct: 0.0, color: { r: 0, g: 175, b: 101 } },
  { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
  { pct: 1.0, color: { r: 255, g: 0, b: 0 } } 
];

//converts the percentage to the color on the gradient
//returns as rgb color
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