import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import "../../assets/weatherEffects.css";
import SearchBar from "../SearchBar/SearchBar";
import RecentSearches from "../RecentSearches/RecentSearches";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCodes";
import { formatTemp, formatTime } from "../../utils/unitConversion";

const THEME_GRADIENTS = {
  clear: "from-[#0b3d5c] to-[#1b1d3c]",
  cloudy: "from-[#2b2d42] to-[#1b1d3c]",
  fog: "from-[#3a3a4a] to-[#1b1d3c]",
  rain: "from-[#0f2027] to-[#1b1d3c]",
  snow: "from-[#233348] to-[#1b1d3c]",
  storm: "from-[#1a1a2e] to-[#0b0c1d]",
};

export default function Hero({
  place,
  weather,
  loading,
  locating,
  error,
  unit,
  onSearch,
  onUseLocation,
  recentSearches,
  onSelectRecent,
  onClearRecent,
}) {
  const current = weather?.current;
  const today = weather?.daily?.[0];
  const info = current ? getWeatherInfo(current.weatherCode, current.isDay) : null;
  const theme = info?.theme || "clear";

  const now = current?.time ? new Date(current.time) : new Date();
  const dateLabel = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${THEME_GRADIENTS[theme]} text-white px-6 py-20 transition-colors duration-700`}
    >
      {/* Ambient glow */}
      <div className="absolute top-[-60px] left-[-60px] w-[220px] h-[220px] bg-blue-500 rounded-full opacity-30 blur-[100px] z-0 animate-pulse" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] bg-purple-400 rounded-full opacity-30 blur-[120px] z-0 animate-pulse" />

      {/* Weather-driven ambient effects */}
      {theme === "rain" &&
        [...Array(40)].map((_, i) => (
          <div
            key={`rain-${i}`}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}
      {theme === "snow" &&
        [...Array(30)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="snow-flake"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      {theme === "clear" &&
        current &&
        !current.isDay &&
        [...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Search + location controls */}
        <div className="bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar onSearch={onSearch} loading={loading} />
            </div>
            <button
              onClick={onUseLocation}
              disabled={locating}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-60 rounded-lg font-medium transition-all whitespace-nowrap"
              aria-label="Use my current location"
            >
              <Navigation className="w-4 h-4" />
              {locating ? "Locating..." : "Use My Location"}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-3 text-sm"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <RecentSearches recentSearches={recentSearches} onSelect={onSelectRecent} onClear={onClearRecent} />
        </div>

        {/* Current weather dashboard */}
        {loading && !weather ? (
          <div className="flex items-center justify-center py-24" aria-live="polite">
            <div className="animate-spin-slow w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full" />
            <span className="sr-only">Loading weather</span>
          </div>
        ) : weather ? (
          <motion.div
            key={place?.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-gray-300 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-lg">
                  {place?.name}
                  {place?.admin1 ? `, ${place.admin1}` : ""}
                  {place?.country ? `, ${place.country}` : ""}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {dateLabel} · {formatTime(current?.time, weather?.timezone)} local time
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <WeatherIcon family={info?.family} className="text-7xl md:text-8xl" />
                <div>
                  <h1 className="text-6xl md:text-7xl font-bold leading-none">
                    {formatTemp(current?.temp, unit)}
                    <span className="text-3xl align-top">{unit}</span>
                  </h1>
                  <p className="text-lg text-gray-300 mt-1">{info?.label}</p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Feels like {formatTemp(current?.feelsLike, unit)}
                {unit} · H: {formatTemp(today?.tempMax, unit)}
                {unit} L: {formatTemp(today?.tempMin, unit)}
                {unit}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-sm grid grid-cols-2 gap-4 text-center"
            >
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Humidity</p>
                <p className="text-xl font-semibold mt-1">{current?.humidity ?? "--"}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Wind</p>
                <p className="text-xl font-semibold mt-1">{Math.round(current?.windSpeed ?? 0)} km/h</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Precipitation</p>
                <p className="text-xl font-semibold mt-1">{current?.precipitation ?? 0} mm</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">UV Index</p>
                <p className="text-xl font-semibold mt-1">{current?.uvIndex ?? "--"}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
