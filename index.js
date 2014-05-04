require('./index.css');

var mapify = require('geojson-mapify');

L.Icon.Default.imagePath = "node_modules/leaflet/dist/images";

var xhr = require('xhr');

xhr({
  //url: "http://jsonp.jit.su?url=https://raw.githubusercontent.com/bevry/meta/master/community.geojson",
  url: "community.geojson",
}, function (err, resp, body) {
  if (err) { throw err; }

  if (resp.statusCode !== 200) { throw resp.statusCode; }

  var communityGeoJson = JSON.parse(body);

  mapify({
    geoJson: communityGeoJson,
    geoJsonOptions: {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.githubUsername);
      },
    },
    map: "map",
    mapOptions: {
      zoom: 2, center: new L.latLng([0,0])
    },
  })
});
