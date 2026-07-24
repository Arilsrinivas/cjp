'use client';

import { useState } from 'react';
import { Search, Filter, Sparkles, X } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: SearchFilterBarProps) {
  const filters = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'latest', label: 'Latest Updates' },
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'This Week' },
    { id: 'shared', label: 'Most Shared' },
  ];

  return (
    <div className="bg-white border-4 border-[#111111] p-4 sm:p-6 shadow-[8px_8px_0px_0px_#111111] space-y-4 mb-12">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search protest news by headline, city, keyword, or source..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#FAF8F5] border-2 border-[#111111] pl-12 pr-10 py-3 text-sm font-semibold text-[#111111] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#FFD400] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Label */}
        <div className="flex items-center gap-2 text-xs font-heading font-black uppercase text-[#111111] shrink-0">
          <Filter className="w-4 h-4 text-[#FFD400]" />
          <span>FILTER PROTEST NEWS:</span>
        </div>
      </div>

      {/* Filter Pill Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#111111]/10">
        {filters.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-4 py-1.5 font-heading font-bold text-xs uppercase tracking-wider transition-all border ${
                isActive
                  ? 'bg-[#FFD400] text-[#111111] border-[#111111] shadow-[2px_2px_0px_0px_#111111]'
                  : 'bg-[#FAF8F5] text-[#6B7280] border-transparent hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
