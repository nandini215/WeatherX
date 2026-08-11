import { motion } from "framer-motion";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCodes";
import { formatTemp, formatHourLabel } from "../../utils/unitConversion";

export default function HourlyForecast({ weather, unit }) {
  if (!weather?.hourly?.length) return null;

  return (
    <section className="py-16 px-6 bg-[#0c0c22] text-white">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Hourly Forecast
      </motion.h2>
      <div className="max-w-6xl mx-auto overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max px-1">
          {weather.hourly.map((hour, i) => {
            const info = getWeatherInfo(hour.weatherCode, 1);
            return (
              <motion.div
                key={hour.time}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.6), duration: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg w-24 shrink-0"
              >
                <span className="text-xs text-gray-300">{i === 0 ? "Now" : formatHourLabel(hour.time, weather.timezone)}</span>
                <WeatherIcon family={info.family} className="text-3xl" />
                <span className="font-semibold">
                  {formatTemp(hour.temp, unit)}
                  {unit}
                </span>
                {hour.precipProbability !== null && (
                  <span className="text-xs text-cyan-300">{hour.precipProbability}%</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
