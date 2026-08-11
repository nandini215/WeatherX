import { useState } from "react";
import { motion } from "framer-motion";
import useLocalStorage from "../../hooks/useLocalStorage";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsLetterCTA() {
  const [subscribers, setSubscribers] = useLocalStorage("weatherx:subscribers", []);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'duplicate'

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus("error");
      return;
    }
    if (subscribers.includes(trimmed)) {
      setStatus("duplicate");
      return;
    }
    setSubscribers((prev) => [...prev, trimmed]);
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-20 px-6 bg-[#0c0c22] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-[100px] opacity-30 z-0" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated with Forecast Alerts</h2>
          <p className="text-gray-300 mb-2">
            This is a front-end demo feature: your email is saved only in your browser's local storage. No emails
            are actually sent.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus(null);
              }}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
            >
              Subscribe
            </button>
          </form>
          {status === "success" && (
            <p className="text-green-300 text-sm mt-4">Saved locally - thanks for trying the demo!</p>
          )}
          {status === "error" && (
            <p className="text-red-300 text-sm mt-4">Please enter a valid email address.</p>
          )}
          {status === "duplicate" && (
            <p className="text-yellow-300 text-sm mt-4">That email is already saved locally.</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
