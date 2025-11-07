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

// async function getCatFact() {
//try {
//const response = await fetch("https://catfact.ninja/fact");
//const data = await response.json();
//return data.fact;
//} catch (error) {
//console.error("Error fetching cat fact:", error);
//return null;
//}

async function displayCatFact() {
  const catOutput = document.getElementById("cat-output");
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    catOutput.textContent = data.fact;
  } catch (error) {
    catOutput.textContent = "Failed to load cat fact.";
  }
}

const getCatButton = document.getElementById("get-cat-button");
getCatButton.addEventListener("click", displayCatFact);

// This function fetches the coordinates of the city entered by the user then sends it to the getWeather function
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
//This function parses the latitude and longitude to get the weather data
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

async function getMovies() {
  const moviesOutput = document.getElementById("movies-output");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmMxZjQwOWM0Y2Q5YmUwNTBmYzY0MWVmYjhhYjgzNCIsIm5iZiI6MTc2MjM5NjUxMC45MzIsInN1YiI6IjY5MGMwOTVlM2UzZGYzOGVkYzc4YTZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5QXpyfOAMMva88YBK3ESuuQWtdnAqEVgt8k8ySyLD5k",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = await response.json();
    const moviesTrend = data.results.slice(0, 5);
    moviesOutput.innerHTML = moviesTrend
      .map((movie) => `<p>${movie.title}</p>`)
      .join("");

    console.log(moviesTrend);
    return moviesTrend;
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesOutput.textContent = "Failed to load movies.";
  }
}
