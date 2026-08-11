// All data is fetched from the API in metric units (Celsius, km/h, hPa, km).
// These helpers convert for display when the user selects Imperial.

export function celsiusToFahrenheit(c) {
  if (c === null || c === undefined || Number.isNaN(c)) return null;
  return c * (9 / 5) + 32;
}

export function formatTemp(celsius, unit) {
  if (celsius === null || celsius === undefined || Number.isNaN(celsius)) return "--";
  const value = unit === "F" ? celsiusToFahrenheit(celsius) : celsius;
  return `${Math.round(value)}°`;
}

export function kmhToMph(kmh) {
  if (kmh === null || kmh === undefined) return null;
  return kmh * 0.621371;
}

export function formatWindSpeed(kmh, unit) {
  if (kmh === null || kmh === undefined) return "--";
  if (unit === "F") return `${Math.round(kmhToMph(kmh))} mph`;
  return `${Math.round(kmh)} km/h`;
}

export function formatVisibility(meters, unit) {
  if (meters === null || meters === undefined) return "--";
  if (unit === "F") return `${(meters / 1609.34).toFixed(1)} mi`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function windDirectionToCompass(deg) {
  if (deg === null || deg === undefined) return "--";
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(deg / 22.5) % 16;
  return dirs[index];
}

export function formatTime(isoString, timezone) {
  if (!isoString) return "--";
  try {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    });
  } catch {
    return new Date(isoString).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
}

export function formatDayLabel(isoDate, index) {
  if (index === 0) return "Today";
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatHourLabel(isoString, timezone) {
  return formatTime(isoString, timezone);
}
