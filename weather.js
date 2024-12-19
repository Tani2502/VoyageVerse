const apiKey = "5e949f7d41e2b673fdaeb8b07ce66d18";
// const apiKey = "942a08d9dc4026377cedfec9ac791cd9";
// const city = "Agra";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

 
const getWeatherButton = document.getElementById("getWeather");
const weatherResult = document.getElementById("weatherResult");

getWeatherButton.addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Feels Like: ${main.feels_like}°C</p>
    <p>Weather: ${weather[0].description}</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
  weatherResult.innerHTML = weatherHTML;
}