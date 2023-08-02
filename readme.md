# Building detection/color classification model

## Table of Contents
1. [About the project](#about)
2. [Overview](#overview)
3. [Setup](#setup)
4. [Usage](#usage)
    - [Downloading images](#download)
    - [Running the model](#model)
5. [Prototyping](#prototyping)
6. [API reference](#api)
7. [Documentation](#docs)
8. [Contact](#contact)


## About the project <a name="about"></a>
What we are doing

## Overview <a name="overview"></a>
What different files and folders are.

## Setup <a name="setup"></a>
1. **Clone or fork the repository**
2. **Obtain a Google Maps API key from https://developers.google.com/maps/documentation/javascript/get-api-key**
3. **Enter your API_KEY in the `config.js.template` file inside the `config` folder. Save the file as `config.js` in the same folder.**
```js
API = {"API_KEY": "your-API key"}
////////////////////////////
//This is a template for the config.js file that should be added to run
//the different scripts. Add your personal google API key to this file.
//When this is done, rename the file to "config.js"
```
This should be enough to run all the code except the `csv-reader.js` inside `prototyping/google_45degree`. More information about the prototypes can be read in the separate section on [prototyping](#prototyping). 

## Usage <a name="usage"></a>
The process of classifying building colors is currently split into two steps. This is not ideal, but should be a solvable issue. However it is where we are currently at. The issue arises from the fact that the images we get are screenshots of Google Map views, and not just images fetched directly from an API. Our further thoughts about how to combat this issue going forward can be found in `link to latex document`. The steps to use the model are:
1. ### Downloading Images:<a name="download"></a>
    1. Open the `index.html` file
    2. Enter the address or postalcode you want to get images from.
    
        ![Screenshot](assets/searchbar.png)

    3. That should yield the following prompt. Input the range of addresses you want images of and press 'last ned'. This will iterate through the list of addresses and save images from south, west, north and east from each address to your browsers default ```Downloads``` folder. Most browsers will allow you to set another default downloads folder. This can be useful for immidiately getting the images to the right place for running the model.

        ![Screenshot](assets/messagebox.png)
    
    4. If using Google Chrome you have to press "Allow" to download the images. If fetching a bunch of addresses this popup will need to be pressed again after some time to continue screenshotting. A workaround is to use another browser such as Mozilla Firefox. Also note that if you do not press "Allow" the script will still iterate through the addresses and display the map views for each address. This is a waste of API requests so keep that in mind. To stop the capturing of screenshots at any point press "Stans nedlasting", refresh or exit the page.

         <img src="assets/imagegetter.png"  width="600" /><br>

2. ### Running the Model<a name="model"></a>
    1. Put some steps here

## Prototyping <a name="prototyping"></a>
What they are and how to run them.

## API Reference <a name="api"></a>
- **[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)**
- **[Google Maps JavaScript API 45 Degree Imagery](https://developers.google.com/maps/documentation/javascript/examples/aerial-simple)** 
- **[W3Schools Google Maps API Tutorial](https://www.w3schools.com/graphics/google_maps_intro.asp)**
- **[Open Address API from Kartverket](https://ws.geonorge.no/adresser/v1/)**
- **[Google Street View Static API](https://developers.google.com/maps/documentation/streetview/overview)**
- **[Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview)**


## Documentation <a name="docs"></a>
Refer to latex guide/Roboflow, Ultralytics/ our own notebooks

## Contact <a name="contact"></a>
Summer students:
Elias Lerheim Birkeland, industriell økonomi og teknologiledelse 
eliaslbi@stud.ntnu.no 






# Potential useful resources
|Link|
|--------------|
|[Kystinfo](https://kystinfo.no/)|
|[Kystdatahuset](https://kystdatahuset.no/)|
|[Swagger UI](https://kystdatahuset.no/ws/swagger/index.html)|
|[data.kystverket.no](https://data.kystverket.no/)|
|[Historisk AIS](https://hais.kystverket.no/)|
|[Havbase](https://havbase.no/)|
|[Kart over alternative drivstoff for sjøfarten - Kystverket](https://lavutslipp.kystverket.no/)|
|[Geonorge](https://www.geonorge.no/)|
|[Felles datakatalog](https://data.norge.no/)|
|[BarentsWatch](https://www.barentswatch.no/)|
|[BarentsWatch API](https://www.barentswatch.no/bwapi/)|