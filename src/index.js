function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
    `Sunday`,
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}
function displayTemp(response) {
  console.log(response);
  let temperatureElement = document.querySelector(`#temp-number`);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector(`#city-name`);
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector(`#description`);
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector(`#humidity`);
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windSpeedElement = document.querySelector(`#wind`);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector(`#date`);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let city = `Madrid`;
let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemp);
