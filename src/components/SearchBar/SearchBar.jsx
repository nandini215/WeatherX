import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, loading, compact = false }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2" role="search">
        <label htmlFor="navbar-city-search" className="sr-only">
          Search city
        </label>
        <input
          id="navbar-city-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-32 sm:w-44 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <button
          type="submit"
          aria-label="Search"
          disabled={loading}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50"
        >
          <Search className="w-4 h-4 text-gray-200" />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" role="search">
      <label htmlFor="hero-city-search" className="sr-only">
        Search for a city
      </label>
      <input
        id="hero-city-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg font-medium transition-all flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
