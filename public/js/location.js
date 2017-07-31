function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition.bind(null, callback));
    } else {

    }
}

function showPosition(callback, position) {
  initMap(callback, position.coords.latitude,position.coords.longitude)
}

function initMap(callback, X,Y) {
  var geocoder = new google.maps.Geocoder;

  console.log(X,Y)

  var latlng = {lat: parseFloat(X), lng: parseFloat(Y)};
        geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        callback(results[0].address_components[3].short_name, latlng);
      } else {
        return "World";
      }
    }
  })
}

var map;

function showMap(latlng) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: latlng
  });
}

function show_on_map(latlng) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });
}