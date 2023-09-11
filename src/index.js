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
  let precipitationElement = document.querySelector(`#precipitation`);
}

let city = `Madrid`;
let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemp);
