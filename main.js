const API_KEY = "20da04b85dbf45c388e232731260302";

// Generate dynamic API URL
function generateAstroApiUrl(city, apiKey) {
  return `https://api.weatherapi.com/v1/astronomy.json?q=${city}&key=${apiKey}`;
}

// Fetch details
async function getAstroDetails(city) {
  const placeholder = document.querySelector("#astro-info-placeholder");

  try {
    const url = generateAstroApiUrl(city, API_KEY);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name, country } = data.location;
    const { sunrise, sunset } = data.astronomy.astro;

    displayAstroInfo(name, country, sunrise, sunset);
  } catch (error) {
    placeholder.textContent = "Unable to load astronomical data.";
    console.error(error);
  }
}

// Display astro info
function displayAstroInfo(name, country, sunrise, sunset) {
  const placeholder = document.querySelector("#astro-info-placeholder");

  placeholder.innerHTML = `
    <p class="location">${name}, ${country}</p>
    <p class="sun-info">
      🌅 Sunrise: ${sunrise}<br />
      🌇 Sunset: ${sunset}
    </p>
  `;
}

// Button event
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getAstroDetails(city);
  }
});

// Default load
getAstroDetails("Toronto");
