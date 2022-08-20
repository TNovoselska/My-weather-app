let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay} ${currentHour}:${currentMinute}`;
}
let date = document.querySelector("#date");
date.innerHTML = formatDate(now);
function displayForecast(response) {
  console.log(response.data.daily);}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bf6135db2ac746321352c2599aa8eaaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
    celciusTemperature = response.data.main.temp;
  let currentTemp = Math.round(celciusTemperature);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${currentTemp}°`;
  document.querySelector("#city").innerHTML = response.data.name;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  let descriptionElement=document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement=document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "bf6135db2ac746321352c2599aa8eaaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
search(city);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}
function showCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let submit = document.querySelector("#submit");
submit.addEventListener("click", handleSubmit);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showPosition (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bf6135db2ac746321352c2599aa8eaaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getPosition);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

search("Kyiv");