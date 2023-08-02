
// Access the Google API key from config.js
const apiKey = API["API_KEY"];
// Flag to track if the Google Maps API is already loaded
let googleMapsLoaded = false;
// array to store fetched addresses
let allAddresses = [];
// message to be displayed in message box
let message = "";


/**
 * Fetches addresses based on the provided input, displays each address on Google Maps, and saves 
 * screenshots of these map views in the Downloads folder.
 * @param {Event} event - The form submit event.
 */
async function getAddresses(event) {
  event.preventDefault(); // Prevent form submission and page reload

  const base_url = "https://ws.geonorge.no/adresser/v1/sok";
  const input = document.getElementById("mySearch").value;
  const treffPerSide = 1000;
  let side = 0;
  let search;

  // If input is postalCode
  if (isFourDigits(input)){
    search = `postnummer=${input}`
  }// If input is single address
  else if (isAddressText(input)){
    search = `adressetekst=${input}`
  }// Perform general search if not any of the above.
  else{
    search = `sok=${input}`
  }

  allAddresses = [];

  try {
    // Fetch addresses in batches until there are no more addresses left
    while (true) {
      const full_url = `${base_url}?${search}&treffPerSide=${treffPerSide}&side=${side}`;

      const response = await fetch(full_url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data?.adresser?.length) {
        allAddresses.push(...data.adresser);
        side++;
      } else {
        // No more addresses to fetch
        break;
      }
    }

    // Sort the addresses alphabetically based on the address text and log the output
    allAddresses.sort((a, b) => a.adressetekst.localeCompare(b.adressetekst));
    console.log(allAddresses)

    // Give feedback to user in messagebox and show the prompt for downloading the images: 
    if (allAddresses.length == 1){
      message = `Søket på '${input}' returnerte ${allAddresses.length} adresse.`
    }
    else {
      message = `Søket på '${input}' returnerte ${allAddresses.length} adresser.`
    }
    
    await loadGoogleMapsAPI();
    // Show first address in search to give user feedback
    showMessageBox();

  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
}

async function getImages(event) {

  event.preventDefault();
  let firstRow = document.getElementById("first").value;
  let lastRow = document.getElementById("last").value;
  
    // if no input is given, fetch images of all the addresses from the query
    if (lastRow == ""){
      lastRow = allAddresses.length;
    }
    // Loop through the addresses in the range selected by the user and initialize maps asynchronously
    for (let i = firstRow; i < lastRow; i++) {
      const address = allAddresses[i]
      await initializeAllMaps(
        address.adressetekst,
        address.postnummer,
        address.poststed,
        address.representasjonspunkt.lat,
        address.representasjonspunkt.lon,
      );
    }
}


async function loadGoogleMapsAPI() {
  if (!googleMapsLoaded) {
    googleMapsLoaded = true;
    return new Promise(function(resolve) {
      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey;
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  } else {
    return Promise.resolve(); // Return a resolved promise if the API is already loaded
  }
}


function initializeMap(address, mapId, centerLocation, heading) {
    return new Promise(function(resolve) {
      var mapOptions = {
        disableDefaultUI: true,
        center: centerLocation,
        zoom: 20,
        mapTypeId: "satellite",
        heading: heading,
        tilt: 45,
      };
  
      var map = new google.maps.Map(document.getElementById(mapId), mapOptions);
      
     // Listen for the 'tilesloaded' event to ensure the map has fully loaded
        google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
          takeScreenshot(address, mapId).then(resolve);
        });
    });
  }
  
  async function initializeAllMaps(adressetekst, postnummer, poststed, lat, lng) {

      // clean up before use as filename
      adressetekst = cleanString(adressetekst)
      poststed = cleanString(poststed)
      //the address is passed to intializeMap() to be used as a filename
      var address = adressetekst + "_" + postnummer + "_" + poststed + "_" + `${lat}_${lng}_`
      //set the centerLocation to of the map view to the location of the address
      var centerLocation = new google.maps.LatLng(lat, lng);

      await initializeMap(address, "South", centerLocation, 0, ); // South
      await initializeMap(address, "West", centerLocation, 90, ); // West
      await initializeMap(address, "North", centerLocation, 135, ); // North
      await initializeMap(address, "East", centerLocation, 270, ); // East
    }
  
  
  
  function takeScreenshot(filename, mapId) {
    return new Promise(async function(resolve) {
      // Use html2canvas to capture the screenshot
      var targetDiv = document.getElementById(mapId);
      await html2canvas(targetDiv, { useCORS: true }).then(function(canvas) {
        // Convert the canvas to a data URL
        var dataURL = canvas.toDataURL('image/png');
  
        // Create a temporary link element
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = filename + mapId + '.png';
  
        // Automatically trigger the click event on the link
        link.click();
  
        resolve();
      });
    });
  }

  function showMessageBox() {
    const paragraph = document.getElementById('message')
    paragraph.textContent = message
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'block';
  }
  
  function closeMessageBox() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
  }
  

  function cleanString(string){
    string = string.replace(/\s/g, "");
    string = string.replace(/æ/g, "ae");
    string = string.replace(/å/g, "aa");
    string = string.replace(/ø/g, "oe");
    string = string.replace(/Æ/g, "AE");
    string = string.replace(/Å/g, "AA");
    string = string.replace(/Ø/g, "OE");
    return string;
  }
  
  function isFourDigits(str) {
    const regex = /^\d{4}$/;
    return regex.test(str);
  }

  function isAddressText(str){
    stringArray = str.split(/\s/);
    if (stringArray.length == 2 && isAllLetters(stringArray[0]) && isAllDigits(stringArray[1])){
      return true;
    }
    return false;
  }

  function isAllLetters(str){
    const regex = /^[A-Za-z]+$/;
    return regex.test(str);
  }

  function isAllDigits(str){
    const regex = /^\d+$/;
    return regex.test(str)
  }

