# Know Your Stress: Stress Logging + Visualization App

This project was written for my Independent Study, supervised by Professor Hannon. For an overview of the project see [Tasia_IndependentStudy_Poster.pdf](https://github.com/tasglad/independentStudy/blob/master/Tasia_IndpendentStudy_Poster.pdf) in the documentation folder.

## External Mock-Up
I also worked on a more fleshed out UI for the "See Data" functionality. The prototype can be found [here](https://www.figma.com/proto/oCX6KgGzQCcbEyUQhFq2ee/IndependentStudy?node-id=27%3A0&scaling=scale-down&page-id=26%3A0).

## File Overview
* *documentation* folder contains informational material about the project, including the poster for my presentation as well as a diagram of the file structure.

* *data* folder contains the generated data used for the map. This will have to eventually be replaced with an actual data stream between logging and viewing data.
  * *csvToGeoJSON.m*
    * This is a MATLAB script that converts the CSV in this folder to the geojson (I know I could have probably found this online but I felt better writing my own :) )
  * *fake_stress_data.csv* 
    * Contains randomly generated stress data. Randomly scattered in a box around the Boston area and assigned random times (don't think they span the whole day, however).
  * *fake_stress_data2.geojson* 
    * Contains a converted version of the CSV data above using the MATLAB code above. This is read in *see-data.js* to display on the map.

* *pressure* folder was cloned from [this GitHub](https://github.com/stuyam/pressure), whose website can be found at [pressurejs.com](https://pressurejs.com/). This is the library for using the pressure sensor in data logging. This is not linked to their GitHub and would have to be updated manually. 

* The rest of the loose files (Here, all the js files associated with a specific html file are named the same thing. I suggest looking at [this diagram]() to get a better idea of how these files are connected):
  * *accel-logging.html* 
    * The page where the user logs their acceleration data inlcuding the modal that pops up, prompting them to log in.
  * *accel-logging.js* 
    * The JS associated with the above html. 
  * *color-gradients.js* 
    * Support code for turning % to gradient value
  * *example.html*, *example.js*, and *example.css*
    * The original files I made that include all of the functionality before I separated it out into their own pages
  * *home.html* 
    * The home page where the Log Data button connects to *touch-logging.html*. Accessed through Button A in *index.html*.
  * *home2.html* 
    * The home page where the Log Data button connects to *accel-logging.html*. Accessed through Button B in *index.html*
  * *index.html*
    * Just a page with two buttons "A" and "B" which link to the two different paths of logging data (pressure and acceleration respectively).
  * *keys.js* 
    * Holds the MapBox key. Replace "PUT KEY HERE" with actual MapBox key. My key is restricted to only be allowed to use by this website url. However, in future iterations this should be hidden better.
  * *leaf.png* 
    * The image of the logo shown at the bottom of the home page.
  * *location.js* 
    * Holds all the JS code for getting a user's location. Called right after user presses Give Permissions, called at the logging pages (*accel-logging.html* and *touch-logging.html*).
  * *modal-login.js*
    * JS code referenced by *home.html* and *home2.html* that opens the log-in modal when clicking see-data.
  * *modal-report.js*
    * JS code called to open the modal after finishing logging in *accel-logging.js* and *touch-logging.js*
  * *permissions.html*
    * Page user is brought to before actually logging their data for the pressure logging route. Asks them to give permission for location
  * *permissions2.html*
    * Page user is brought to before actually logging their data for the acceleration logging route. Asks them to give permission for location
  * *permissions.js*
    * Holds the JS for both *permissions.html* and *permissions2.html*
  * *see-data.html*
    * Shows the user's an interactive map. Accessed through "See Data" button on either home screen.
  * *see-data.js*
    * Holds all the JS for the above html page. 
  * *style.css*
    * Holds all the style code for the entire project.
  * *touch-logging.html*
    * The page where the user logs their pressure data including the modal that pops up, prompting them to log in.
  * *touch-logging.js*
    * Holds the JS for the above html page