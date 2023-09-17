const API_KEY = 'a81efc2b50f3fac72c13c5f05faa927f';

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const city = document.querySelector('.city');
      const temperature = document.querySelector('.temperature');
      city.innerText = data.name;
      temperature.innerText = `${data.main.temp} ℉`;
    });
}

function onGeoError() {
  alert("Can't find you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
