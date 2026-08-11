import { motion } from "framer-motion";
import { Droplets, Wind, Gauge, Eye, Sun, Sunrise, Sunset, Thermometer } from "lucide-react";
import { formatTemp, formatWindSpeed, formatVisibility, windDirectionToCompass, formatTime } from "../../utils/unitConversion";

export default function WeatherDetails({ weather, unit }) {
  if (!weather) return null;
  const { current, daily, timezone } = weather;
  const today = daily?.[0];

  const cards = [
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemp(current.feelsLike, unit)}${unit}`,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.humidity ?? "--"}%`,
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: formatWindSpeed(current.windSpeed, unit),
    },
    {
      icon: Wind,
      label: "Wind Direction",
      value: windDirectionToCompass(current.windDirection),
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: current.pressure ? `${Math.round(current.pressure)} hPa` : "--",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: formatVisibility(current.visibility, unit),
    },
    {
      icon: Sun,
      label: "UV Index",
      value: current.uvIndex ?? "--",
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(today?.sunrise, timezone),
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(today?.sunset, timezone),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white text-black dark:bg-[#0f0f28] dark:text-white">
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Weather Details
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className="p-5 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-all shadow-lg flex items-center gap-4"
          >
            <card.icon className="w-7 h-7 text-blue-400 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{card.label}</p>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
