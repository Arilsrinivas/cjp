'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLatestNews, useFeaturedNews } from '@/lib/hooks/useRegistryApi';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types/registry';
import { SearchFilterBar } from './SearchFilterBar';
import { ExternalLink, Calendar, Newspaper, ArrowRight, Clock } from 'lucide-react';

function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border-2 border-[#111111] p-6 space-y-4 animate-pulse">
          <div className="h-48 bg-gray-200 w-full" />
          <div className="h-4 bg-gray-200 w-1/3" />
          <div className="h-6 bg-gray-200 w-3/4" />
          <div className="h-12 bg-gray-200 w-full" />
        </div>
      ))}
    </div>
  );
}

export function LatestNewsSection() {
  const { data: articles, isLoading: newsLoading } = useLatestNews();
  const { data: featured, isLoading: featuredLoading } = useFeaturedNews();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const isLoading = newsLoading || featuredLoading;

  const topFeatured = featured || (articles && articles[0]);

  // Filter & Search Logic
  let filteredArticles = articles ? [...articles] : [];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (a) =>
        a.headline.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
    );
  }

  if (activeFilter === 'latest') {
    filteredArticles = filteredArticles.slice(0, 4);
  } else if (activeFilter === 'today') {
    filteredArticles = filteredArticles.filter((a) => a.publishedAt.includes('2026-07-24') || true);
  } else if (activeFilter === 'shared') {
    filteredArticles = filteredArticles.filter((a) => a.isTrending);
  }

  const gridArticles = filteredArticles.filter((a) => a.id !== topFeatured?.id);

  return (
    <section className="py-24 bg-[#F8F7F3] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
              [ OFFICIAL PROTEST NEWSROOM ]
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
              LATEST <span className="yellow-highlight">DISPATCHES & UPDATES</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-[#6B7280]">
            AUTO-REFRESHES EVERY 60 MINS
          </div>
        </div>

        {/* Search & Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {isLoading ? (
          <NewsSkeleton />
        ) : (
          <div className="space-y-12">
            
            {/* Top Featured News Story Card */}
            {topFeatured && !searchQuery && activeFilter === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              >
                {topFeatured.imageUrl && (
                  <div className="lg:col-span-7 h-72 lg:h-auto relative overflow-hidden bg-gray-900 border-b-4 lg:border-b-0 lg:border-r-4 border-[#111111]">
                    <img
                      src={topFeatured.imageUrl}
                      alt={topFeatured.headline}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase px-3 py-1 border border-[#111111]">
                      FEATURED PROTEST DISPATCH
                    </div>
                  </div>
                )}

                <div className={`p-8 lg:p-12 flex flex-col justify-between space-y-6 ${topFeatured.imageUrl ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                      <span className="bg-[#111111] text-[#FFD400] font-heading font-bold px-2.5 py-0.5 uppercase text-[10px]">
                        {topFeatured.category}
                      </span>
                      <span>{topFeatured.publishedTime || formatDate(topFeatured.publishedAt)}</span>
                    </div>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#111111] leading-tight">
                      {topFeatured.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
                      {topFeatured.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono font-bold text-[#111111]">
                      SOURCE: {topFeatured.source} {topFeatured.author ? `• By ${topFeatured.author}` : ''}
                    </span>

                    <Link
                      href={`/article/${encodeURIComponent(topFeatured.id)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-colors"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Remaining News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article: NewsArticle, index: number) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border-2 border-[#111111] shadow-[5px_5px_0px_0px_#111111] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_#FFD400] transition-all"
                >
                  <div className="space-y-4 p-6">
                    {/* Featured Image with Fallback Pattern */}
                    <div className="h-44 w-full bg-[#FAF8F5] border border-[#111111]/20 overflow-hidden relative">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt={article.headline}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Newspaper className="w-12 h-12" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#111111] text-[#FFD400] font-heading font-bold text-[10px] uppercase px-2 py-0.5">
                        {article.category}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-gray-500 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#111111]" />
                        {formatDate(article.publishedAt)}
                      </span>
                      {article.publishedTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {article.publishedTime}
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-lg uppercase tracking-tight text-[#111111] line-clamp-2">
                      {article.headline}
                    </h4>

                    <p className="text-xs text-[#6B7280] font-medium leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-[#111111]/10 mt-4">
                    <span className="text-[10px] font-mono text-gray-500 truncate max-w-[140px]">
                      {article.source}
                    </span>

                    <Link
                      href={`/article/${encodeURIComponent(article.id)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase text-[#111111] hover:text-[#FFD400] transition-colors"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {gridArticles.length === 0 && (
              <div className="bg-white border-2 border-[#111111] p-12 text-center space-y-3">
                <Newspaper className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="font-heading font-bold text-xl uppercase text-[#111111]">No Protest Dispatches Found</h3>
                <p className="text-xs text-gray-500">No articles matched your query "{searchQuery}". Try clearing search filters.</p>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
}
