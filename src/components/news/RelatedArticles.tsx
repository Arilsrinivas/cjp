'use client';

import Link from 'next/link';
import { useLatestNews } from '@/lib/hooks/useRegistryApi';
import { NewsArticle } from '@/types/registry';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Newspaper } from 'lucide-react';

interface RelatedArticlesProps {
  currentArticleId: string;
}

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  const { data: articles } = useLatestNews();

  if (!articles || articles.length === 0) return null;

  const related = articles.filter((a: NewsArticle) => a.id !== currentArticleId).slice(0, 3);

  return (
    <div className="space-y-6 pt-12 border-t-2 border-[#111111]">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-black text-2xl uppercase text-[#111111]">
          RELATED PROTEST DISPATCHES
        </h3>
        <span className="text-xs font-mono text-gray-500 uppercase">COCKROACH MOVEMENT WIRE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((item: NewsArticle) => (
          <Link
            key={item.id}
            href={`/article/${encodeURIComponent(item.id)}`}
            className="bg-white border-2 border-[#111111] p-5 shadow-[4px_4px_0px_0px_#111111] hover:shadow-[6px_6px_0px_0px_#FFD400] transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {item.imageUrl ? (
                <div className="h-36 w-full overflow-hidden border border-[#111111]/20">
                  <img
                    src={item.imageUrl}
                    alt={item.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-36 w-full bg-[#FAF8F5] border border-[#111111]/20 flex items-center justify-center text-gray-400">
                  <Newspaper className="w-8 h-8" />
                </div>
              )}

              <span className="text-[10px] font-mono font-bold text-[#111111] bg-[#FFD400] px-2 py-0.5 inline-block uppercase">
                {item.category}
              </span>

              <h4 className="font-heading font-bold text-base uppercase text-[#111111] group-hover:text-[#FFD400] transition-colors line-clamp-2">
                {item.headline}
              </h4>
            </div>

            <div className="pt-3 mt-3 border-t border-[#111111]/10 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>{item.source}</span>
              <ArrowRight className="w-4 h-4 text-[#111111] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
