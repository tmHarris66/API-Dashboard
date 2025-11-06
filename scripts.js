async function getDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null;
  }
}

async function displayDogImage() {
  const imageUrl = await getDogImage();
  const dogOutput = document.getElementById("dog-output");
  if (imageUrl) {
    dogOutput.innerHTML = `<img src="${imageUrl}" alt="Random Dog Image" />`;
  } else {
    dogOutput.textContent = "Failed to load dog image.";
  }
}

const getDogButton = document.getElementById("get-dog-button");
getDogButton.addEventListener("click", displayDogImage);
async function getCatFact() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    return data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return null;
  }
}
async function displayCatFact() {
  const fact = await getCatFact();
  const catOutput = document.getElementById("cat-output");
  if (fact) {
    catOutput.textContent = fact;
  } else {
    catOutput.textContent = "Failed to load cat fact.";
  }
}
const getCatButton = document.getElementById("get-cat-button");
getCatButton.addEventListener("click", displayCatFact);
// This function fetches user coordinates based on location entetered then uses those coordinates to get weather data
async function getLocation() {
  try {
    const cityInput = document.getElementById("city-input").value;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityInput}&format=json`
    );
    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    console.log("Latitude:", lat);
    console.log("Longitude:", lon);
    getWeather(lat, lon);
    return { latitude: lat, longitude: lon };
  } catch (error) {
    console.error("Please enter a valid city name:", error);
    const weatherOutput = document.getElementById("weather-output");
    weatherOutput.textContent = "Please enter a valid city name.";
    return null;
  }
}

async function getWeather(lat, lon) {
  try {
    const cityInput = document.getElementById("city-input").value;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&forecast_days=1`
    );
    const data = await response.json();
    console.log(data);
    const temperature = data.hourly.temperature_2m[0];
    const weatherOutput = document.getElementById("weather-output");
    weatherOutput.textContent = `Current Temperature in ${cityInput}: ${temperature}°F`;
    return temperature;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
