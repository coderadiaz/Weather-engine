function displayTemp(response) {
  console.log(response.data.temperature.current);
}
let city = `Madrid`;
let apiKey = `da56a69ff3085ect3555f3472e44ofab`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemp);
