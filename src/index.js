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
  let temperatureElement = document.querySelector(`#temp-number`);
  let cityElement = document.querySelector(`#city-name`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windSpeedElement = document.querySelector(`#wind`);
  let dateElement = document.querySelector(`#date`);
  let iconElement = document.querySelector(`#icon`);
  let iconDescription = response.data.condition.icon;
  iconElement.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconDescription}.png`
  );
  iconElement.setAttribute(`alt`, response.data.condition.icon);

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}
function search(city) {
  let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector(`#search-bar`);
  search(searchBarElement.value);
}

let city = `Caracas`;

let form = document.querySelector(`#search-city-form`);
console.log(form);
form.addEventListener(`submit`, handleSubmit);
