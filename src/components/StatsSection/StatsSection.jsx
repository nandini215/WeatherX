import { motion } from "framer-motion";

const stats = [
  { label: "Forecast Range", value: "7 Days" },
  { label: "Hourly Detail", value: "24 Hours" },
  { label: "Data Source", value: "Open-Meteo" },
  { label: "City Coverage", value: "Worldwide" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 text-white bg-gradient-to-br from-[#0b0c1d] to-[#1b1d3c]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg"
          >
            <h3 className="text-3xl font-bold text-blue-300">{stat.value}</h3>
            <p className="text-sm text-gray-300">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
