require('./index.css');

L = require('leaflet');
require('leaflet-markercluster');

L.Icon.Default.imagePath = "node_modules/leaflet/dist/images";

var xhr = require('xhr');

xhr({
  //url: "http://jsonp.jit.su?url=https://raw.githubusercontent.com/bevry/meta/master/community.geojson",
  url: "community.geojson",
}, function (err, resp, body) {
  if (err) { throw err; }

  if (resp.statusCode !== 200) { throw resp.statusCode; }

  var communityGeoJson = JSON.parse(body);

  var map = new L.Map('map', {zoom: 2, center: new L.latLng([0,0]) });

  var communityGeo = L.geoJson(communityGeoJson, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.githubUsername);
    },
  });

  map.fitBounds(communityGeo.getBounds().pad(0.05))
  map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
  
  communityGeo.addTo(map);

  // TODO figure out
  //var markers = new L.MarkerClusterGroup();
  //markers.addLayer(communityGeo);
  //map.addLayer(markers);
});
