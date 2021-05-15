
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const loc = document.querySelector(".location p");
const notif = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit: 'celsius'
}

const Kelvin = 273;

const key = "c2d0ca7e1719b72bb9695f0f77229cfa";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notif.style.style.display = "block";
    notif.innerHTML = "<p>Browser Doesnt Support Geolocation </p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
function showError(err) {
    notif.style.style.display = "block";
    notif.innerHTML = `<p> ${err.message}</p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function () {
            displayWeather();
        });
}
function displayWeather() {
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temp.innerHTML = `${weather.temperature.value}&#176; <span> C</span>`;
    desc.innerHTML = weather.description;
    loc.innerHTML = `${weather.city} ,${weather.country}`;

}
function ctof(temp) {
    return (temp * 9 / 5) + 32;
}
temp.addEventListener('click', function () {

    if (weather.temperature.value === undefined) {
        return;
    }

    if (weather.temperature.unit == 'celsius') {
        let f = ctof(weather.temperature.value);
        f = Math.floor(f);

        temp.innerHTML = `${f}&#176;<span>F</span>`;
        weather.temperature.unit = "fahreneit"
    }
    else {
        temp.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
})
