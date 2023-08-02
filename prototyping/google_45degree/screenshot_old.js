

  // Access the API key from config/config.js
  var apiKey = API["API_KEY"];
  
  // Load the Google Maps JavaScript API asynchronously
  function loadGoogleMapsAPI() {
    return new Promise(function(resolve) {
      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey;
      script.defer = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
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
  
  async function initializeAllMaps() {
    // The input for rendering the map views
    var locations = [
    
      [
        'Brunholmgata 13',
        '6004',
        'ÅLESUND',
        62.47280824039214,
        6.150796464877686
      ],
      [
        'Brunholmgata 14',
        '6004',
        'ÅLESUND',
        62.472980923779524,
        6.1508205593890075
      ]
    ];
  
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var centerLocation = new google.maps.LatLng(location[3], location[4]);
      var address = location[0] + "_" + location[1] + "_" + location[2] + "_"
      await initializeMap(address, "South", centerLocation, 0); // South
      await initializeMap(address, "West", centerLocation, 90); // West
      await initializeMap(address, "North", centerLocation, 135); // North
      await initializeMap(address, "East", centerLocation, 270); // East
    }
  }
  
  function takeScreenshot(filename, mapId) {
    return new Promise(function(resolve) {
      // Use html2canvas to capture the screenshot
      var targetDiv = document.getElementById(mapId);
      html2canvas(targetDiv, { useCORS: true }).then(function(canvas) {
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
  
  // Initialize the maps
  async function main() {
    await loadGoogleMapsAPI();
    await initializeAllMaps();
  }

  main()
