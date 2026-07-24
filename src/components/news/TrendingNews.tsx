'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTrendingNews } from '@/lib/hooks/useRegistryApi';
import { TrendingUp, Clock, ArrowRight, Flame } from 'lucide-react';
import { NewsArticle } from '@/types/registry';

export function TrendingNews() {
  const { data: articles, isLoading } = useTrendingNews();

  if (isLoading || !articles || articles.length === 0) return null;

  return (
    <div className="bg-[#1A1A1A] border-4 border-[#FFD400] p-6 sm:p-8 text-white space-y-6 shadow-[8px_8px_0px_0px_#FFD400]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-heading font-black text-lg uppercase tracking-tight text-[#FFD400]">
          <Flame className="w-5 h-5 text-[#FFD400] animate-bounce" />
          <span>TRENDING PROTEST DISPATCHES</span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 uppercase">MOST READ IN LAST 24 HOURS</span>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((item: NewsArticle, idx: number) => (
          <Link
            key={item.id}
            href={`/article/${encodeURIComponent(item.id)}`}
            className="group flex items-start gap-4 p-3 bg-[#111111] border border-white/10 hover:border-[#FFD400] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFD400] text-[#111111] flex items-center justify-center font-heading font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
              0{idx + 1}
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                <span className="text-[#FFD400] font-bold">[{item.category}]</span>
                <span>• {item.publishedTime || 'Live'}</span>
              </div>

              <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#FFD400] transition-colors truncate">
                {item.headline}
              </h4>
            </div>

            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FFD400] shrink-0 my-auto group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

    </div>
  );
}
