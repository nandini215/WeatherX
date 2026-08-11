import { useCallback, useEffect, useState } from "react";
import { geocodeCity, getWeather, reverseGeocode, WeatherApiError } from "../services/weatherService";
import useLocalStorage from "./useLocalStorage";

const MAX_RECENT = 5;
const DEFAULT_PLACE = { name: "Bengaluru", country: "India", admin1: "Karnataka", latitude: 12.9716, longitude: 77.5946 };

export default function useWeather() {
  const [unit, setUnit] = useLocalStorage("weatherx:unit", "C");
  const [recentSearches, setRecentSearches] = useLocalStorage("weatherx:recent", []);

  const [place, setPlace] = useState(DEFAULT_PLACE);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);

  const addRecent = useCallback(
    (p) => {
      setRecentSearches((prev) => {
        const withoutDuplicate = prev.filter(
          (item) => !(item.name === p.name && item.admin1 === p.admin1 && item.country === p.country)
        );
        return [p, ...withoutDuplicate].slice(0, MAX_RECENT);
      });
    },
    [setRecentSearches]
  );

  const loadWeatherForPlace = useCallback(
    async (p, { remember = true } = {}) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(p.latitude, p.longitude);
        setWeather(data);
        setPlace(p);
        if (remember) addRecent(p);
      } catch (err) {
        if (err instanceof WeatherApiError) {
          setError(err.message);
        } else {
          setError("Something went wrong while fetching weather data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [addRecent]
  );

  const searchCity = useCallback(
    async (cityName) => {
      const trimmed = cityName.trim();
      if (!trimmed) {
        setError("Please enter a city name.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const results = await geocodeCity(trimmed);
        const best = results[0];
        await loadWeatherForPlace(best);
      } catch (err) {
        setLoading(false);
        if (err instanceof WeatherApiError) {
          setError(err.message);
        } else {
          setError("Unable to fetch weather data. Please check your internet connection.");
        }
      }
    },
    [loadWeatherForPlace]
  );

  const useCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. Search for a city instead.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const resolvedPlace = await reverseGeocode(latitude, longitude);
        await loadWeatherForPlace(resolvedPlace);
        setLocating(false);
      },
      (geoError) => {
        setLocating(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError("Location access was denied. Search for a city instead.");
        } else {
          setError("Unable to detect your location. Search for a city instead.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  }, [loadWeatherForPlace]);

  const selectRecent = useCallback(
    (p) => {
      loadWeatherForPlace(p);
    },
    [loadWeatherForPlace]
  );

  const clearRecent = useCallback(() => setRecentSearches([]), [setRecentSearches]);

  const toggleUnit = useCallback(() => setUnit((u) => (u === "C" ? "F" : "C")), [setUnit]);

  // Initial load: default city, so the dashboard is never empty on first visit.
  useEffect(() => {
    loadWeatherForPlace(DEFAULT_PLACE, { remember: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    place,
    weather,
    loading,
    locating,
    error,
    unit,
    recentSearches,
    searchCity,
    useCurrentLocation,
    selectRecent,
    clearRecent,
    toggleUnit,
    setError,
  };
}
