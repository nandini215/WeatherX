// App.jsx
import { useState, useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Forecast from "./components/Forecast/Forecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import StatsSection from "./components/StatsSection/StatsSection";
import Testimonials from "./components/Testimonials/Testimonials";
import NewsLetterCTA from "./components/NewsLetterCTA/NewsLetterCTA";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loader from "./components/Loader/Loader";
import useWeather from "./hooks/useWeather";

import "./index.css";

export default function App() {
  const [appLoading, setAppLoading] = useState(true);
  const weatherState = useWeather();

  useEffect(() => {
    const timeout = setTimeout(() => setAppLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <div className="font-inter bg-white text-black dark:bg-gradient-to-br dark:from-[#0b0c1d] dark:to-[#1b1d3c] dark:text-white min-h-screen overflow-x-hidden">
      <Navbar
        unit={weatherState.unit}
        onToggleUnit={weatherState.toggleUnit}
        onUseLocation={weatherState.useCurrentLocation}
        locating={weatherState.locating}
      />
      <Hero
        place={weatherState.place}
        weather={weatherState.weather}
        loading={weatherState.loading}
        locating={weatherState.locating}
        error={weatherState.error}
        unit={weatherState.unit}
        onSearch={weatherState.searchCity}
        onUseLocation={weatherState.useCurrentLocation}
        recentSearches={weatherState.recentSearches}
        onSelectRecent={weatherState.selectRecent}
        onClearRecent={weatherState.clearRecent}
      />
      <StatsSection />
      <div id="forecast">
        <Forecast weather={weatherState.weather} place={weatherState.place} unit={weatherState.unit} />
        <HourlyForecast weather={weatherState.weather} unit={weatherState.unit} />
      </div>
      <div id="details">
        <WeatherDetails weather={weatherState.weather} unit={weatherState.unit} />
      </div>
      <Features />
      <Testimonials />
      <FAQ />
      <NewsLetterCTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
