// create a map
var myMap = L.map("myMap", {
    center: [
        35.65, 0.1
    ],
    zoom: 2
})

// create tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap)

function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.name + "<h3>")
}

// add the geojson
L.geoJson(geojson, {
    onEachFeature: onEachFeature
}).addTo(myMap)