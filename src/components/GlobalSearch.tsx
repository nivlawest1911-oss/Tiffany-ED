'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page (update route as needed)
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            type="text"
            placeholder="Search students, classes, or lessons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="pl-11 pr-10 bg-white/5 border-white/10 focus:border-[#C5A46E]/50 text-white placeholder:text-white/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Quick Results Dropdown (optional enhancement) */}
      {isOpen && query.length > 1 && (
        <div className="absolute top-12 left-0 right-0 bg-[#0A0F1C] border border-white/10 rounded-2xl shadow-xl z-50 p-2">
          <div className="text-xs text-white/50 px-3 py-2">Quick results for “{query}”</div>
          <div className="text-sm text-white/80 px-3 py-2 hover:bg-white/5 rounded-xl cursor-pointer">
            Liam Thompson — 4th Grade
          </div>
          <div className="text-sm text-white/80 px-3 py-2 hover:bg-white/5 rounded-xl cursor-pointer">
            Main Idea Lesson — Tiffany-ED
          </div>
          <div className="text-xs text-[#C5A46E] px-3 py-2 hover:underline cursor-pointer">
            View all results →
          </div>
        </div>
      )}
    </div>
  );
}
