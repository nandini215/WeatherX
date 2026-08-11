import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Navigation } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", id: "top" },
  { label: "Forecast", id: "forecast" },
  { label: "Details", id: "details" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar({ unit, onToggleUnit, onUseLocation, locating }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const scrollToId = (id) => {
    setMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0c1d]/80 backdrop-blur-md text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <button onClick={() => scrollToId("top")} className="text-2xl font-bold text-blue-400">
          WeatherX
        </button>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {NAV_LINKS.map((item) => (
            <li key={item.id} className="relative group cursor-pointer" onClick={() => scrollToId(item.id)}>
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onUseLocation}
            disabled={locating}
            aria-label="Use my current location"
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-60 transition-all"
            title="Use my location"
          >
            <Navigation className="w-4 h-4 text-gray-200" />
          </button>
          <button
            onClick={onToggleUnit}
            aria-label={`Switch to ${unit === "C" ? "Fahrenheit" : "Celsius"}`}
            className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-sm font-semibold"
          >
            °C / °F
            <span className="ml-2 text-blue-300">{unit}</span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
          </button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0b0c1d] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((item) => (
            <button key={item.id} onClick={() => scrollToId(item.id)} className="text-left text-sm font-medium">
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <button
              onClick={onUseLocation}
              disabled={locating}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm"
            >
              <Navigation className="w-4 h-4" /> {locating ? "Locating..." : "Use Location"}
            </button>
            <button onClick={onToggleUnit} className="px-3 py-2 bg-white/10 rounded-lg text-sm font-semibold">
              °C / °F <span className="text-blue-300">{unit}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-white/10 rounded-lg">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
