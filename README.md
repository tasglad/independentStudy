# Know Your Stress

This project was written for my Independent Study, supervised by Professor Hannon. For an overview of the project see [Tasia_IndependentStudy_Poster.pdf](https://github.com/tasglad/independentStudy/blob/master/Tasia_IndpendentStudy_Poster.pdf) in the documentation folder.

## File Overview
* *documentation* folder contains informational material about the project, including the poster for my presentation as well as a diagram of the file structure.
* *data* folder contains the generated data used for the map. This will have to eventually be replaced with an actual data stream between logging and viewing data.
  * *csvToGeoJSON.m* is a MATLAB script that converts the CSV in this folder to the geojson (I know I could have probably found this online but I felt better writing my own :) )
  * *fake_stress_data.csv* contains randomly generated stress data. Randomly scattered in a box around the Boston area and assigned random times (don't think they span the whole day, however).
  * *fake_stress_data2.geojson* contains a converted version of the CSV data above using the MATLAB code above. This is read in *see-data.js* to display on the map.
* *pressure* folder was cloned from [this GitHub](https://github.com/stuyam/pressure), whose website can be found at [pressurejs.com](https://pressurejs.com/). This is the library for using the pressure sensor in data logging. This is not linked to their GitHub and would have to be updated manually. 
* The rest of the loose files (Here, all the js files associated with a specific html file are named the same thing. I suggest looking at [this diagram]() to get a better idea of how these files are connected):
  * *accel-logging.html* is the page where the user logs their acceleration data, inlcuding the modal that pops up, prompting them to log in.
  * *accel-logging.js* is the JS associated with the above html. 
  * *color-gradients.js* support code for turning % to gradient value