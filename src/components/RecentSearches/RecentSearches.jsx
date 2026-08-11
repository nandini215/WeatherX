import { X } from "lucide-react";

export default function RecentSearches({ recentSearches, onSelect, onClear }) {
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wide text-gray-400">Recent searches</span>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          aria-label="Clear recent searches"
        >
          <X className="w-3 h-3" /> Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((p, i) => (
          <button
            key={`${p.name}-${p.country}-${i}`}
            onClick={() => onSelect(p)}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm text-gray-200 transition-all"
          >
            {p.name}
            {p.admin1 ? `, ${p.admin1}` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
