import { Search, X } from 'lucide-react';
import { useFilterStore } from '../store/useFilterStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div className="relative">
      <Search
        size={14}
        strokeWidth={2}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
        aria-hidden
      />
      <input
        type="text"
        placeholder="Search resources…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-8 pr-8 py-2 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-sans transition-colors"
        aria-label="Search resources"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
