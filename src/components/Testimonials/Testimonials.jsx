import { FaBolt, FaGlobeAmericas, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: <FaGlobeAmericas className="text-blue-300 text-2xl" />,
    title: "Real, live data",
    text: "Every temperature, forecast, and condition shown comes straight from the Open-Meteo weather API - nothing here is mocked.",
  },
  {
    icon: <FaBolt className="text-blue-300 text-2xl" />,
    title: "Fast & responsive",
    text: "Built with React and Vite for instant search results, smooth animations, and a UI that adapts to any screen size.",
  },
  {
    icon: <FaCode className="text-blue-300 text-2xl" />,
    title: "Clean architecture",
    text: "A dedicated service layer, reusable hooks, and componentized UI keep the codebase easy to read, test, and extend.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-[#10102A] text-white">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why WeatherX?
      </motion.h2>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg flex flex-col gap-4"
          >
            {h.icon}
            <h3 className="text-lg font-semibold">{h.title}</h3>
            <p className="text-gray-300 text-sm">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
