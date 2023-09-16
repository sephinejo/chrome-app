function onGeoOk(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  console.log('You live in', lat, long);
}

function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
