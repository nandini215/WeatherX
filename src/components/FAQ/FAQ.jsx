import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Where does the weather data come from?",
    answer:
      "WeatherX uses the free Open-Meteo API for live weather data and geocoding, so every forecast you see is real, current data pulled directly from the API - not hard-coded values.",
  },
  {
    question: "Can I search for any city in the world?",
    answer:
      "Yes. Type a city name into the search bar and WeatherX will look it up, fetch its coordinates, and display current conditions plus the 7-day and hourly forecast for that location.",
  },
  {
    question: "Does WeatherX know my current location?",
    answer:
      "If you click \"Use My Location\", your browser will ask for permission to share your position. If you allow it, WeatherX fetches weather for your exact coordinates. If you deny it, you can still search for any city manually.",
  },
  {
    question: "Can I switch between Celsius and Fahrenheit?",
    answer:
      "Yes, use the °C / °F toggle in the navbar. Your preference is saved in your browser so it's remembered the next time you visit.",
  },
  {
    question: "Does WeatherX remember my past searches?",
    answer:
      "Your most recent city searches are saved locally in your browser (not on a server) so you can quickly jump back to them. You can clear this list at any time.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="bg-white text-black py-20 px-6 font-['Inter']">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#1A1A3D]">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl bg-gray-50 shadow-sm transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-4 flex justify-between items-center text-left font-medium text-lg"
              aria-expanded={openIndex === i}
            >
              <span>{faq.question}</span>
              {openIndex === i ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  className="p-4 text-gray-600 text-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
