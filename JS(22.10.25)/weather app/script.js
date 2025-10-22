const form = document.getElementById('search-form');
const input = document.getElementById('city-input');
const weatherDiv = document.getElementById('weather');

// TODO: Insert your OpenWeatherMap API key here:
const API_KEY = 'bff4f3ae74875fe33ba1e9cd7bedb109';

async function fetchWeather(city) {
  try {
    const q = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

function render(data) {
  const html = `
    <div class="card">
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${Math.round(data.main.temp)}°C</strong> — ${data.weather[0].description}</p>
      <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
    </div>
  `;
  weatherDiv.innerHTML = html;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  weatherDiv.textContent = 'Loading...';
  try {
    const data = await fetchWeather(input.value.trim());
    render(data);
  } catch (err) {
    weatherDiv.textContent = 'Error: ' + (err.message || 'Unable to fetch weather');
  }
});
