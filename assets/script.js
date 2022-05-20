var APIkey = "72ce98a0a30c5f78bfd87a65e2630b9d"; //72ce98a0a30c5f78bfd87a65e2630b9d

// get current and future weather conditions for a city
//have city added to search history
//see city name date and a weather icon
//need to see temp, humidity, wind speed, uv index
//uv index has to change background based on it being favorable, moderate or severe
//need to see 5-day forecast for the city as well
//search history needs to be able to be presented again

// console.log("key", process.env.API_TOKEN);
console.log("linked");
var searchField = document.getElementById("search-field");
var searchBtn = document.getElementById("city-search");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUv = document.getElementById("current-uv");
var currentCity = document.getElementById("current-city");
var weatherIcon = document.getElementById("weather-icon");
let dataSet = {};

function setCurrentWeather() {
  console.log("setCurrentWeather");
  currentTemp.innerText += " " + dataSet.current.temp;
  currentWind.innerText += " " + dataSet.current.wind_speed;
  currentHumidity.innerText += " " + dataSet.current.humidity;
  currentUv.innerText += " " + dataSet.current.uvi;
  let uv = dataSet.current.uvi;
  if (uv < 3) {
    currentUv.style.color = "green";
  } else if (uv >= 3 && uv < 6) {
    currentUv.style.color = "orange";
  } else {
    currentUv.style.color = "red";
  }
  weatherIcon.src = `http://openweathermap.org/img/wn/${dataSet.current.weather[0].icon}@2x.png`;
}

function setFiveDay() {
  dataSet.daily.forEach((element, index) => {
    if (index <= 4) {
      document.getElementById(`date-${index}`).innerText += element.temp.day;
      document.getElementById(`temp-${index}`).innerText += element.temp.day;
      document.getElementById(`wind-${index}`).innerText += element.wind_speed;
      document.getElementById(`humidity-${index}`).innerText +=
        element.humidity;
    }
  });
}

function getCoordsByCity() {
  console.log("get coordinates by city");
  var city = searchField.value.split(/ +/)[0].replace(",", "");
  var state = searchField.value.split(/ +/)[1].replace(",", "");
  var convertCoordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},&limit=${10}&appid=${APIkey}`;
  fetch(convertCoordUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentCity.innerText += " " + data[0].name;
      getWeatherByCoords(data[0].lat, data[0].lon);
      for (var i = 0; i < data.length; i++) {}
    });
}

function getWeatherByCoords(lat, lon) {
  console.log("get weather by coords");
  var requestUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
  fetch(requestUrl, {
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dataSet = data;
      setCurrentWeather();
    });
}

// var lat
// var long =
// var requestUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     for (var i = 0; i < data.length; i++) {}
//   });

searchBtn.addEventListener("click", getCoordsByCity);

/*
city: {id: 4684888, name: 'Dallas', coord: {…}, country: 'US', population: 1197816, …}
cnt: 40
cod: "200"
list: Array(40)
0:
clouds: {all: 20}
dt: 1652918400
dt_txt: "2022-05-19 00:00:00"
main: {temp: 307.83, feels_like: 308, temp_min: 307.83, temp_max: 308.86, pressure: 1007, …}
pop: 0
sys: {pod: 'd'}
visibility: 10000
weather: [{…}]
wind: {speed: 5.14, deg: 181, gust: 9.7}
*/
