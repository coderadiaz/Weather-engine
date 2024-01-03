function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayFirstForecast(response) {
  console.log(response);
  let firstPartElement = document.querySelector(`#first-part-forecast`);
  let firstPartHTML = `<div class="row">`;

  response.data.daily.forEach(function (day, index) {
    if (index < 3) {
      firstPartHTML =
        firstPartHTML +
        `<div class="col forecast-content">
                    ${formatDay(day.time)}
                    <div >
                    <img id="first-day-icon"src="${
                      day.condition.icon_url
                    }"></div>
                    <span class="gray">${Math.round(
                      day.temperature.minimum
                    )}°C</span>
                    <span class="gray"> ${Math.round(
                      day.temperature.minimum * (9.0 / 5.0) + 32.0
                    )}°F </span>
                  </div>`;
    }
  });
  firstPartHTML = firstPartHTML + `</div>`;
  firstPartElement.innerHTML = firstPartHTML;
}
function displaySecondForecast(response) {
  console.log(response);
  let secondPartElement = document.querySelector(`#second-part-forecast`);
  let secondPartHTML = `<div class= "row">`;
  let days = [`Wed`, `Thur`];
  response.data.daily.forEach(function (day, index) {
    if (index > 2 && index < 5) {
      secondPartHTML =
        secondPartHTML +
        `<div class="col forecast-content">
                    ${formatDay(day.time)}
                    <div >
                    <img id="first-day-icon"src="${
                      day.condition.icon_url
                    }"></div>
                   <span class="gray">${Math.round(
                     day.temperature.minimum
                   )}°C</span>
                    <span class="gray"> ${Math.round(
                      day.temperature.minimum * (9.0 / 5.0) + 32.0
                    )}°F</span>
                  </div>`;
    }
  });
  secondPartHTML = secondPartHTML + `</div>`;
  secondPartElement.innerHTML = secondPartHTML;
}

function getForecast(city) {
  let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayFirstForecast);
  axios.get(apiUrl).then(displaySecondForecast);
}

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
  celsiustemperature = response.data.temperature.current;
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
  getForecast(response.data.city);
}
function search(city) {
  let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
let celsiustemperature = null;
function handleSubmit(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector(`#search-bar`);
  search(searchBarElement.value);
}
function showFarenheit(event) {
  event.preventDefault();
  farenheitLink.classList.add(`active`);
  celsiusLink.classList.remove(`active`);
  let farenheitTemp = celsiustemperature * (9.0 / 5.0) + 32.0;
  let displayFarenheit = document.querySelector(`#temp-number`);
  displayFarenheit.innerHTML = Math.round(farenheitTemp);
}
function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add(`active`);
  farenheitLink.classList.remove(`active`);
  let displayCelsius = document.querySelector(`#temp-number`);
  displayCelsius.innerHTML = Math.round(celsiustemperature);
}
let form = document.querySelector(`#search-city-form`);
form.addEventListener(`submit`, handleSubmit);

let farenheitLink = document.querySelector(`#farenheit-value`);
farenheitLink.addEventListener(`click`, showFarenheit);

let celsiusLink = document.querySelector(`#celsius-value`);
celsiusLink.addEventListener(`click`, showCelsius);
search(`Paris`);
