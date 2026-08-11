import { motion } from "framer-motion";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherCodes";
import { formatTemp, formatDayLabel } from "../../utils/unitConversion";

export default function Forecast({ weather, place, unit }) {
  if (!weather?.daily?.length) return null;

  return (
    <section className="py-20 px-6">
      <motion.h2
        className="text-4xl font-bold mb-3 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        7-Day Forecast
      </motion.h2>
      {place?.name && (
        <p className="text-center text-gray-400 mb-10">
          {place.name}
          {place.admin1 ? `, ${place.admin1}` : ""}
          {place.country ? `, ${place.country}` : ""}
        </p>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {weather.daily.map((day, i) => {
          const info = getWeatherInfo(day.weatherCode, 1);
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg text-center flex flex-col items-center gap-2"
            >
              <p className="font-semibold text-white">{formatDayLabel(day.date, i)}</p>
              <WeatherIcon family={info.family} className="text-4xl" />
              <p className="text-xs text-gray-300 min-h-[2rem]">{info.label}</p>
              <p className="text-white font-semibold">
                {formatTemp(day.tempMax, unit)}
                {unit}{" "}
                <span className="text-gray-400 font-normal">
                  {formatTemp(day.tempMin, unit)}
                  {unit}
                </span>
              </p>
              {day.precipProbability !== null && (
                <p className="text-xs text-cyan-300">💧 {day.precipProbability}%</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
