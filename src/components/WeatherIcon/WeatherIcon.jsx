import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudyHigh,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiShowers,
} from "react-icons/wi";

const ICONS = {
  clear: WiDaySunny,
  "clear-night": WiNightClear,
  "partly-cloudy": WiDayCloudyHigh,
  cloudy: WiCloudy,
  fog: WiFog,
  drizzle: WiSprinkle,
  rain: WiRain,
  snow: WiSnow,
  "snow-showers": WiSnow,
  showers: WiShowers,
  thunderstorm: WiThunderstorm,
};

const COLORS = {
  clear: "text-yellow-300",
  "clear-night": "text-indigo-200",
  "partly-cloudy": "text-yellow-200",
  cloudy: "text-gray-300",
  fog: "text-gray-400",
  drizzle: "text-cyan-300",
  rain: "text-blue-300",
  snow: "text-white",
  "snow-showers": "text-white",
  showers: "text-blue-300",
  thunderstorm: "text-purple-300",
};

export default function WeatherIcon({ family, className = "" }) {
  const Icon = ICONS[family] || WiCloudy;
  const color = COLORS[family] || "text-gray-300";
  return <Icon className={`${color} ${className}`} aria-hidden="true" />;
}
