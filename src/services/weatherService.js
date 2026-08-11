// weatherService.js
// All weather + location data comes from Open-Meteo's free APIs, which do
// not require an API key and are safe to call directly from the browser.
//   Geocoding:  https://open-meteo.com/en/docs/geocoding-api
//   Forecast:   https://open-meteo.com/en/docs
// Reverse geocoding (for "Use my location") uses BigDataCloud's free
// client-side reverse geocoding endpoint, which likewise needs no key.

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEOCODE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

class WeatherApiError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "WeatherApiError";
    this.type = type; // 'not-found' | 'network' | 'api'
  }
}

async function fetchJson(url) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new WeatherApiError("Unable to fetch weather data. Please check your internet connection.", "network");
  }
  if (!response.ok) {
    throw new WeatherApiError("Something went wrong while fetching weather data.", "api");
  }
  return response.json();
}

/**
 * Look up matching places for a search string.
 * Returns an array of { name, country, admin1, latitude, longitude, timezone }
 */
export async function geocodeCity(query) {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new WeatherApiError("Please enter a city name.", "not-found");
  }
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`;
  const data = await fetchJson(url);
  if (!data.results || data.results.length === 0) {
    throw new WeatherApiError("City not found. Please check the spelling and try again.", "not-found");
  }
  return data.results.map((r) => ({
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}

/**
 * Reverse geocode coordinates (from browser geolocation) into a place name.
 * Falls back to a generic label if the lookup fails - this should never
 * block showing weather data for the coordinates.
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const url = `${REVERSE_GEOCODE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("reverse geocode failed");
    const data = await response.json();
    return {
      name: data.city || data.locality || data.principalSubdivision || "Your location",
      country: data.countryName || "",
      admin1: data.principalSubdivision || "",
      latitude,
      longitude,
    };
  } catch {
    return {
      name: "Your location",
      country: "",
      admin1: "",
      latitude,
      longitude,
    };
  }
}

/**
 * Fetch current conditions + hourly (next 24h) + daily (7 day) forecast
 * for a given coordinate pair. All values are returned in metric units.
 */
export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
    ].join(","),
    hourly: ["temperature_2m", "weather_code", "precipitation_probability", "visibility", "uv_index"].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_probability_max",
      "uv_index_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
    wind_speed_unit: "kmh",
  });

  const url = `${FORECAST_URL}?${params.toString()}`;
  const data = await fetchJson(url);

  if (!data.current || !data.daily) {
    throw new WeatherApiError("Weather data is currently unavailable for this location.", "api");
  }

  // Find the hourly index closest to "now" so we can pull visibility / UV
  // index for the current conditions (Open-Meteo only exposes these hourly).
  const nowTime = new Date(data.current.time).getTime();
  let closestIdx = 0;
  let closestDiff = Infinity;
  data.hourly.time.forEach((t, idx) => {
    const diff = Math.abs(new Date(t).getTime() - nowTime);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIdx = idx;
    }
  });

  const current = {
    time: data.current.time,
    temp: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    isDay: data.current.is_day,
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    pressure: data.current.surface_pressure,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    visibility: data.hourly.visibility?.[closestIdx] ?? null,
    uvIndex: data.hourly.uv_index?.[closestIdx] ?? null,
  };

  // Build the next 24 hours starting from the current hour.
  const startIdx = data.hourly.time.findIndex((t) => new Date(t).getTime() >= nowTime - 30 * 60 * 1000);
  const hourly = data.hourly.time
    .slice(Math.max(startIdx, 0), Math.max(startIdx, 0) + 24)
    .map((t, i) => {
      const idx = Math.max(startIdx, 0) + i;
      return {
        time: t,
        temp: data.hourly.temperature_2m[idx],
        weatherCode: data.hourly.weather_code[idx],
        precipProbability: data.hourly.precipitation_probability?.[idx] ?? null,
      };
    });

  const daily = data.daily.time.map((d, idx) => ({
    date: d,
    weatherCode: data.daily.weather_code[idx],
    tempMax: data.daily.temperature_2m_max[idx],
    tempMin: data.daily.temperature_2m_min[idx],
    precipProbability: data.daily.precipitation_probability_max?.[idx] ?? null,
    uvIndexMax: data.daily.uv_index_max?.[idx] ?? null,
    sunrise: data.daily.sunrise?.[idx] ?? null,
    sunset: data.daily.sunset?.[idx] ?? null,
  }));

  return {
    timezone: data.timezone,
    current,
    hourly,
    daily,
  };
}

export { WeatherApiError };
