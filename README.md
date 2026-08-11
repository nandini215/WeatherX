# WeatherX

A modern, responsive weather forecast web application built with React and Vite. Search any city or use your current location to see live current conditions, an hourly forecast, and a 7-day outlook, all powered by real weather data — no mock or hard-coded values.

## 🌐 Live Demo

**Try WeatherX:**
https://weather-555qg0sd5-nandini215s-projects.vercel.app/

## Features

* City search with Enter-to-search and a search button
* "Use My Location" via the browser Geolocation API, with graceful handling if permission is denied
* Current conditions: temperature, feels-like, condition, humidity, wind, precipitation, UV index
* 7-day forecast with daily high/low, condition icon, and precipitation chance
* 24-hour hourly forecast, horizontally scrollable
* Weather details dashboard: feels like, humidity, wind speed & direction, pressure, visibility, UV index, sunrise, sunset
* Celsius / Fahrenheit toggle, preference saved in `localStorage`
* Recent searches (last 5, deduplicated, clearable), saved in `localStorage`
* Weather-reactive background and ambient effects (rain / snow / stars) driven by real conditions
* Dark mode toggle
* Fully responsive layout with a mobile navigation menu
* Accessible controls: labeled inputs/buttons, keyboard navigation, visible focus states
* User-friendly error handling for invalid cities, network failures, and denied location access

## Technologies Used

* [React 19](https://react.dev/)
* [Vite 7](https://vitejs.dev/)
* [Tailwind CSS 4](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/) for animation
* [lucide-react](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/) for icons
* Native `fetch` for API calls

## Project Structure

```text
WeatherX/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FAQ/
│   │   ├── Features/
│   │   ├── Footer/
│   │   ├── Forecast/
│   │   ├── Hero/
│   │   ├── HourlyForecast/
│   │   ├── Loader/
│   │   ├── Navbar/
│   │   ├── NewsLetterCTA/
│   │   ├── RecentSearches/
│   │   ├── ScrollToTop/
│   │   ├── SearchBar/
│   │   ├── StatsSection/
│   │   ├── Testimonials/
│   │   ├── WeatherDetails/
│   │   └── WeatherIcon/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Installation

```bash
git clone https://github.com/<your-username>/weatherx.git
cd weatherx
npm install
```

## Running Locally

```bash
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

WeatherX does not require any API keys or secrets — every request goes to free, key-less public APIs. A `.env.example` file is included as a placeholder in case the project is extended with a service that requires credentials.

If you add an environment variable later, define it as:

```env
VITE_YOUR_VARIABLE_NAME=...
```

and access it using:

```javascript
import.meta.env.VITE_YOUR_VARIABLE_NAME
```

Real `.env` files are excluded via `.gitignore`.

## API Information

* **Open-Meteo** — free geocoding and forecast API, with no API key required. Used for city lookup, current conditions, hourly forecast, and 7-day daily forecast.
* **BigDataCloud Reverse Geocoding** — free, key-less reverse geocoding used to convert coordinates into a place name for "Use My Location".

## Screenshots

Add screenshots here before publishing, including:

* Desktop dashboard
* Mobile responsive view
* 7-day forecast
* Hourly forecast
* Dark mode

## Future Improvements

* Air quality index
* Severe weather alerts
* Multi-day trend charts
* Favorite/pinned cities separate from recent searches
* PWA / offline support
* Automated unit and component tests
