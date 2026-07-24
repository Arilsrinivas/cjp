'use client';

import { useState } from 'react';
import { useLatestNews } from '@/lib/hooks/useRegistryApi';
import { NewsArticle } from '@/types/registry';
import { ExternalLink, Radio } from 'lucide-react';

export function BreakingTicker() {
  const { data: articles } = useLatestNews();
  const [isPaused, setIsPaused] = useState(false);

  if (!articles || articles.length === 0) return null;

  const tickerItems = [...articles, ...articles, ...articles];

  return (
    <div className="bg-[#111111] text-white border-b border-[#FFD400] overflow-hidden flex items-center text-xs font-mono py-2.5 px-4 relative z-30">
      
      {/* Ticker Badge Label */}
      <div className="flex items-center gap-2 bg-[#FFD400] text-[#111111] font-heading font-black px-3 py-1 text-[11px] uppercase tracking-wider shrink-0 mr-4 border border-[#111111]">
        <Radio className="w-3.5 h-3.5 text-[#111111] animate-pulse" />
        <span>LIVE TICKER</span>
      </div>

      {/* Marquee Track Container */}
      <div
        className="flex-1 overflow-hidden whitespace-nowrap cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="inline-flex items-center gap-12 animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {tickerItems.map((item: NewsArticle, index: number) => (
            <a
              key={`${item.id}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-[#FFD400] transition-colors"
            >
              <span className="text-[#FFD400] font-bold">[{item.category}]</span>
              <span>{item.headline}</span>
              <span className="text-gray-500">• {item.source}</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
