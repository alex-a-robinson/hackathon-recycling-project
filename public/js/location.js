

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 

    }
}

function showPosition(position) {
  initMap(position.coords.latitude,position.coords.longitude)
}

function initMap(X,Y) {
  var geocoder = new google.maps.Geocoder;
  
  console.log(X,Y)
    
  var latlng = {lat: parseFloat(X), lng: parseFloat(Y)};
        geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        return results[0].address_components[3].short_name;
      } else {
        return "World";
      }
    } 
  })
}

