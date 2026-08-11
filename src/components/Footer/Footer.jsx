import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A23] text-gray-300 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
        {/* Left: Brand Info */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-xl font-semibold">WeatherX Forecasting</h3>
          <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} | All rights reserved</p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex gap-4 text-white text-lg">
          <a href="#" className="hover:text-blue-400 transition-colors">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <FaLinkedin />
          </a>
        </div>

        {/* Right: Privacy Links */}
        <div className="text-sm space-x-4">
          <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
          <a href="#" className="hover:text-white transition-all">Contact</a>
        </div>
      </div>
    </footer>
  );
}
