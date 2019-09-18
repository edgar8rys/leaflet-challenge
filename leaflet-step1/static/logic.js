  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


d3.json(url, function(data){
    createFeatures(data.features)
});

function createFeatures(earthquake){
    console.log(earthquake);

    function markerSize(magnitude) {
        for (var i = 0; i < earthquake.length; i++)
            return magnitude*20000
      };

    // add layer to map
    var myMap = L.map("map", {
    center: [32.78,	-96.80],
    zoom: 4
  });

  var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
});

    streets.addTo(myMap);

    // Loop through the cities array and create one marker for each city object
    for (var i = 0; i < earthquake.length; i++) {

        var coordinates = [earthquake[i].geometry.coordinates[1],earthquake[i].geometry.coordinates[0]]
    
        var magnitude = [earthquake[i].properties.mag];
            
        // Conditionals for countries points
        color = "";
        if (earthquake[i].properties.mag > 3.8) {
            color = "red";
        }
        else if (earthquake[i].properties.mag > 3) {
            color = "orange";
        }
        else if (earthquake[i].properties.mag > 2) {
            color = "yellow";
        }
        else {
            color = "green";
        };

        // Add circles to map
        L.circle(coordinates, {
          fillOpacity: 0.75,
          color: "white",
          fillColor: color,
         // Adjust radius
         radius: markerSize(earthquake[i].properties.mag)
        }).bindPopup("<h3>" + "Coordinates: " + earthquake[i].geometry.coordinates + "</h3> <hr> <h3>Magnitude: " + earthquake[i].properties.mag + "</h3>").addTo(myMap);
    }; 


};


  