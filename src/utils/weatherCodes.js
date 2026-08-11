// Maps Open-Meteo's WMO weather codes to human-readable conditions,
// an icon "family" key (used to pick a react-icons/wi icon) and a
// visual "theme" used to drive background gradients / effects.
// Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)

const WEATHER_CODE_MAP = {
  0: { label: "Clear sky", family: "clear", theme: "clear" },
  1: { label: "Mainly clear", family: "clear", theme: "clear" },
  2: { label: "Partly cloudy", family: "partly-cloudy", theme: "cloudy" },
  3: { label: "Overcast", family: "cloudy", theme: "cloudy" },
  45: { label: "Fog", family: "fog", theme: "fog" },
  48: { label: "Depositing rime fog", family: "fog", theme: "fog" },
  51: { label: "Light drizzle", family: "drizzle", theme: "rain" },
  53: { label: "Moderate drizzle", family: "drizzle", theme: "rain" },
  55: { label: "Dense drizzle", family: "drizzle", theme: "rain" },
  56: { label: "Light freezing drizzle", family: "drizzle", theme: "rain" },
  57: { label: "Dense freezing drizzle", family: "drizzle", theme: "rain" },
  61: { label: "Slight rain", family: "rain", theme: "rain" },
  63: { label: "Moderate rain", family: "rain", theme: "rain" },
  65: { label: "Heavy rain", family: "rain", theme: "rain" },
  66: { label: "Light freezing rain", family: "rain", theme: "rain" },
  67: { label: "Heavy freezing rain", family: "rain", theme: "rain" },
  71: { label: "Slight snow fall", family: "snow", theme: "snow" },
  73: { label: "Moderate snow fall", family: "snow", theme: "snow" },
  75: { label: "Heavy snow fall", family: "snow", theme: "snow" },
  77: { label: "Snow grains", family: "snow", theme: "snow" },
  80: { label: "Slight rain showers", family: "showers", theme: "rain" },
  81: { label: "Moderate rain showers", family: "showers", theme: "rain" },
  82: { label: "Violent rain showers", family: "showers", theme: "rain" },
  85: { label: "Slight snow showers", family: "snow-showers", theme: "snow" },
  86: { label: "Heavy snow showers", family: "snow-showers", theme: "snow" },
  95: { label: "Thunderstorm", family: "thunderstorm", theme: "storm" },
  96: { label: "Thunderstorm with slight hail", family: "thunderstorm", theme: "storm" },
  99: { label: "Thunderstorm with heavy hail", family: "thunderstorm", theme: "storm" },
};

export function getWeatherInfo(code, isDay = 1) {
  const entry = WEATHER_CODE_MAP[code] || { label: "Unknown", family: "cloudy", theme: "cloudy" };
  if (entry.family === "clear" && !isDay) {
    return { ...entry, family: "clear-night" };
  }
  return entry;
}

export default WEATHER_CODE_MAP;
