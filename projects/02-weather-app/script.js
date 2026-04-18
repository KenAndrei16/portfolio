/* ═══════════════════════════════════════════
   script.js — Weather App UI
   ─ Uses mock data from data.js
   ─ Simulates searching by city name
   ─ Celsius / Fahrenheit toggle
   ─ Updates clock every second
════════════════════════════════════════════ */

// Currently displayed city data (set on load)
let currentData = null;

// Current temperature unit: 'C' or 'F'
let currentUnit = 'C';

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Load Baguio by default
  loadCity('Baguio');

  // Update the clock every second
  setInterval(updateClock, 1000);

  // Allow pressing Enter to search
  document.getElementById('cityInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchCity();
  });
});

// ── LOAD CITY ──
// Looks up city in mock data and renders it
function loadCity(cityName) {
  const key  = cityName.toLowerCase();
  const data = weatherData[key]; // weatherData is defined in data.js

  if (!data) {
    showNotFound(cityName);
    return;
  }

  currentData = data;
  currentUnit = 'C'; // reset to Celsius on new city
  updateUnitButtons();
  renderWeather(data);

  // Highlight quick-city chip if it matches
  document.querySelectorAll('.city-chip').forEach(btn => {
    btn.style.background = btn.textContent.toLowerCase() === key
      ? 'rgba(212,168,67,0.25)'
      : '';
  });
}

// ── SEARCH ──
function searchCity() {
  const input = document.getElementById('cityInput');
  const query = input.value.trim();
  if (!query) return;
  loadCity(query);
  input.value = '';
}

// ── SHOW NOT FOUND ──
function showNotFound(name) {
  const card = document.getElementById('weatherCard');
  card.className = 'weather-card';
  card.innerHTML = `
    <div class="not-found">
      <div style="font-size:2.5rem;margin-bottom:.75rem;">🔍</div>
      <p>No data found for <strong style="color:#d4a843">"${name}"</strong></p>
      <p style="margin-top:.4rem;font-size:.8rem;">Try: Baguio, Manila, Cebu, Davao, or Tokyo</p>
    </div>`;
}

// ── RENDER WEATHER ──
function renderWeather(data) {
  const card = document.getElementById('weatherCard');

  // Set background class based on condition
  card.className = `weather-card ${data.bgClass || ''}`;

  // Basic fields
  document.getElementById('cityName').textContent    = data.city;
  document.getElementById('countryName').textContent = data.country;
  document.getElementById('weatherIcon').textContent = data.icon;
  document.getElementById('weatherDesc').textContent = data.condition;
  document.getElementById('humidity').textContent    = data.humidity + '%';
  document.getElementById('windSpeed').textContent   = data.windSpeed + ' km/h';
  document.getElementById('uvIndex').textContent     = data.uvIndex;
  document.getElementById('pressure').textContent    = data.pressure + ' hPa';
  document.getElementById('sunrise').textContent     = data.sunrise;
  document.getElementById('sunset').textContent      = data.sunset;

  // Temperature (respects current unit selection)
  renderTemp(data.tempC);

  // 5-day forecast
  const forecastRow = document.getElementById('forecastRow');
  forecastRow.innerHTML = data.forecast.map(f => `
    <div class="forecast-day">
      <span class="forecast-day-name">${f.day}</span>
      <span class="forecast-icon">${f.icon}</span>
      <span class="forecast-high">${formatTemp(f.high)}°</span>
      <span class="forecast-low">${formatTemp(f.low)}°</span>
    </div>
  `).join('');

  // Update clock immediately
  updateClock();
}

// ── TEMPERATURE DISPLAY ──
function renderTemp(tempC) {
  const display = document.getElementById('tempMain');
  display.textContent = formatTemp(tempC);
}

// Convert Celsius to Fahrenheit if needed
function formatTemp(tempC) {
  if (currentUnit === 'F') {
    return Math.round(tempC * 9/5 + 32);
  }
  return tempC;
}

// ── UNIT TOGGLE ──
function setUnit(unit) {
  if (!currentData || currentUnit === unit) return;
  currentUnit = unit;
  updateUnitButtons();

  // Re-render temperature and forecast with new unit
  renderTemp(currentData.tempC);

  const forecastRow = document.getElementById('forecastRow');
  forecastRow.innerHTML = currentData.forecast.map(f => `
    <div class="forecast-day">
      <span class="forecast-day-name">${f.day}</span>
      <span class="forecast-icon">${f.icon}</span>
      <span class="forecast-high">${formatTemp(f.high)}°</span>
      <span class="forecast-low">${formatTemp(f.low)}°</span>
    </div>
  `).join('');
}

// Updates active state on °C / °F buttons
function updateUnitButtons() {
  document.getElementById('btnC').classList.toggle('active', currentUnit === 'C');
  document.getElementById('btnF').classList.toggle('active', currentUnit === 'F');
}

// ── LIVE CLOCK ──
// Shows local device time as a stand-in for city local time
function updateClock() {
  const el = document.getElementById('localTime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
