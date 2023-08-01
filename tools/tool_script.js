  // Access the API key from config.js
  var apiKey = API["API_KEY"];


function initializeMap(addr, mapId, centerLocation, heading) {
    var mapOptions = {
      disableDefaultUI: true,
      center: centerLocation,
      zoom: 20,
      mapTypeId: "satellite",
      heading: heading,
      tilt: 45,
    };
  
    map = new google.maps.Map(document.getElementById(mapId), mapOptions);
    return map
    
  }
  var mapList = []
  function initializeAllMaps() {
    // The input for rendering the map views
    var address = ["Skyttergata 15B,6002,ÅLESUND",62.476901578587736,6.165500871500632];
    var centerLocation = new google.maps.LatLng(address[1], address[2]);
    mapList[0] = initializeMap(address[0],"South", centerLocation, 0); // South
    mapList[1] = initializeMap(address[0],"West", centerLocation, 90); // West
    mapList[2] = initializeMap(address[0],"North", centerLocation, 135); // North
    mapList[3] = initializeMap(address[0],"East", centerLocation, 270); // East
    
    mapList[0].addListener('click', function(event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        relocateCamera(latitude,longitude);
      });
     
  }
  


   


function relocateCamera(latitude,longitude) {
    for(var i = 0; i<mapList.length;i++) {
       
        mapList[i].setCenter({lat: latitude, lng: longitude})
        mapList[i].setZoom(20);
        mapList[i].setHeading(90*i);
    }
}

  
  // Load the Google Maps JavaScript API asynchronously
  function loadGoogleMapsAPI() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=initializeAllMaps";
    script.defer = true;
    document.head.appendChild(script);
  }
  
  function takeScreenshots() {
    // Use html2canvas to capture the screenshot

    var targetDivs = document.getElementsByClassName("map")

    const directions = ["South","West","North","East"]
    for(let i = 0; i<targetDivs.length; i++) {
        var targetDiv = targetDivs[i];
        let direction = directions[i];
        html2canvas(targetDiv, { useCORS: true }).then(function(canvas) {
          // Convert the canvas to a data URL
          var dataURL = canvas.toDataURL('image/png');
          var center = mapList[0].getCenter();
          var lat = center.lat();
          var lng = center.lng();
        
          // Create a temporary link element
          var link = document.createElement('a');
          link.href = dataURL;
   
          link.download = lat.toFixed(6)+ "-" + lng.toFixed(6) + "-" + direction + '.png';
      
          // Automatically trigger the click event on the link
          link.click();
        });
    }

    

  }

    // Initialize the maps
    loadGoogleMapsAPI();