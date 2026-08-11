# WeatherX

A modern, responsive weather forecast web application built with React and Vite. Search any city or use your current location to see live current conditions, an hourly forecast, and a 7-day outlook, all powered by real weather data — no mock or hard-coded values.

## Features

- City search with Enter-to-search and a search button
- "Use My Location" via the browser Geolocation API, with graceful handling if permission is denied
- Current conditions: temperature, feels-like, condition, humidity, wind, precipitation, UV index
- 7-day forecast with daily high/low, condition icon, and precipitation chance
- 24-hour hourly forecast, horizontally scrollable
- Weather details dashboard: feels like, humidity, wind speed & direction, pressure, visibility, UV index, sunrise, sunset
- Celsius / Fahrenheit toggle, preference saved in `localStorage`
- Recent searches (last 5, deduplicated, clearable), saved in `localStorage`
- Weather-reactive background and ambient effects (rain / snow / stars) driven by real conditions
- Dark mode toggle
- Fully responsive layout with a mobile navigation menu
- Accessible controls: labeled inputs/buttons, keyboard navigation, visible focus states
- User-friendly error handling for invalid cities, network failures, and denied location access

## Technologies Used

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/) for icons
- Native `fetch` for API calls

## Project Structure

```
WeatherX/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Static assets and effect stylesheets
│   ├── components/          # One folder per UI component
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
│   ├── hooks/                # useWeather, useLocalStorage
│   ├── services/             # weatherService.js — all API calls
│   ├── utils/                # weatherCodes.js, unitConversion.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
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
npm run preview   # preview the production build locally
```

## Environment Variables

WeatherX does not require any API keys or secrets — every request goes to free, key-less public APIs. A `.env.example` file is still included as a placeholder in case you extend the project with a service that needs credentials later. If you add one, define it as `VITE_YOUR_VARIABLE_NAME=...` and read it in code via `import.meta.env.VITE_YOUR_VARIABLE_NAME`. Real `.env` files are already excluded via `.gitignore`.

## API Information

- **[Open-Meteo](https://open-meteo.com/)** — free geocoding and forecast API, no key required. Used for city lookup, current conditions, hourly forecast, and 7-day daily forecast.
- **[BigDataCloud reverse geocoding](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocoding-to-city-api)** — free, key-less reverse geocoding, used only to turn your coordinates into a place name for "Use My Location".

## Screenshots

_Add screenshots here before publishing — e.g. desktop dashboard, mobile view, 7-day forecast, hourly forecast, dark mode._

## Future Improvements

- Air quality index
- Severe weather alerts
- Multi-day trend charts
- Favorite/pinned cities separate from recent searches
- PWA / offline support
- Automated tests (unit + component)

## Author

Built by [Your Name]. Feel free to connect on [GitHub](https://github.com/<your-username>) or [LinkedIn](https://linkedin.com/in/<your-profile>).
