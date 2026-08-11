import { motion } from "framer-motion";
import { FaCloudSun, FaCalendarWeek, FaMapMarkerAlt, FaSun, FaClock, FaLocationArrow } from "react-icons/fa";

const features = [
  { icon: <FaCloudSun />, text: "Live current conditions" },
  { icon: <FaCalendarWeek />, text: "7-day forecast" },
  { icon: <FaClock />, text: "24-hour hourly forecast" },
  { icon: <FaMapMarkerAlt />, text: "Search any city worldwide" },
  { icon: <FaLocationArrow />, text: "Detect my location" },
  { icon: <FaSun />, text: "Sunrise, sunset & UV index" },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-white text-black dark:bg-[#10102A] dark:text-white">
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Use Our Weather App?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className="p-6 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-4 text-blue-400">{item.icon}</div>
            <p className="text-lg font-medium">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

