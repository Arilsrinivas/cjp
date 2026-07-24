'use client';

import { use } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useArticle, useLatestNews } from '@/lib/hooks/useRegistryApi';
import { RelatedArticles } from '@/components/news/RelatedArticles';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types/registry';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  User,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: article, isLoading } = useArticle(id);
  const { data: allArticles } = useLatestNews();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F8F7F3]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto" />
          <div className="font-heading font-bold text-lg uppercase">Loading Dispatch Story...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F7F3]">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-12 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111]">
          <h2 className="font-heading font-black text-3xl uppercase text-[#111111]">Article Not Found</h2>
          <p className="text-xs text-gray-500">The requested protest dispatch could not be retrieved.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase border-2 border-[#111111]"
          >
            Return to Live Newsroom
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : article.url;
  const shareText = `[PROTEST DISPATCH] ${article.headline}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  let prevArticle: NewsArticle | null = null;
  let nextArticle: NewsArticle | null = null;

  if (allArticles && allArticles.length > 1) {
    const idx = allArticles.findIndex((a: NewsArticle) => a.id === article.id);
    if (idx > 0) prevArticle = allArticles[idx - 1];
    if (idx < allArticles.length - 1) nextArticle = allArticles[idx + 1];
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Back Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase text-[#111111] hover:text-[#FFD400] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Live Newsroom
          </Link>
          <span className="font-heading font-black text-xs uppercase tracking-widest bg-[#FFD400] text-[#111111] px-2.5 py-0.5 border border-[#111111]">
            {article.category}
          </span>
        </div>

        {/* Article Header & Title */}
        <div className="space-y-6">
          <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#111111] leading-tight">
            {article.headline}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-600 border-y border-[#111111]/20 py-4">
            <span className="font-bold text-[#111111] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#111111]" />
              SOURCE: {article.source}
            </span>

            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#111111]" />
                BY {article.author.toUpperCase()}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#111111]" />
              {formatDate(article.publishedAt)}
            </span>

            {article.publishedTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#111111]" />
                {article.publishedTime}
              </span>
            )}
          </div>
        </div>

        {/* Large Hero Image */}
        {article.imageUrl && (
          <div className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.headline}
              className="w-full max-h-[500px] object-cover"
            />
            <div className="p-3 bg-[#111111] text-white font-mono text-[11px] flex justify-between">
              <span>PHOTO: {article.source} / PROTEST COVERAGE</span>
              <span className="text-[#FFD400]">VERIFIED DISPATCH</span>
            </div>
          </div>
        )}

        {/* Main Story Content */}
        <div className="bg-white border-4 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#111111] space-y-6 text-[#111111]">
          
          <div className="p-4 bg-[#FFD400]/20 border-l-4 border-[#FFD400] text-sm sm:text-base font-semibold leading-relaxed">
            {article.summary}
          </div>

          <div className="prose prose-lg max-w-none text-xs sm:text-sm font-medium leading-relaxed space-y-4 whitespace-pre-line text-[#111111]/90">
            {article.content || article.summary}
          </div>

          {/* Social Share Buttons Bar */}
          <div className="pt-8 border-t-2 border-[#111111] space-y-3">
            <span className="font-heading font-black text-xs uppercase text-[#111111] tracking-wider block">
              SHARE THIS DISPATCH
            </span>

            <div className="flex flex-wrap gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white font-heading font-bold text-xs uppercase border border-[#111111] flex items-center gap-1.5 hover:opacity-90"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white font-heading font-bold text-xs uppercase border border-[#111111] flex items-center gap-1.5 hover:opacity-90"
              >
                <XIcon className="w-3.5 h-3.5" /> X / Twitter
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1877F2] text-white font-heading font-bold text-xs uppercase border border-[#111111] flex items-center gap-1.5 hover:opacity-90"
              >
                <FacebookIcon className="w-3.5 h-3.5" /> Facebook
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#229ED9] text-white font-heading font-bold text-xs uppercase border border-[#111111] flex items-center gap-1.5 hover:opacity-90"
              >
                <Send className="w-3.5 h-3.5" /> Telegram
              </a>

              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase border-2 border-[#111111] flex items-center gap-1.5 hover:bg-[#111111] hover:text-[#FFD400] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Link' : 'Copy Link'}
              </button>
            </div>
          </div>

        </div>

        {/* Previous & Next Article Navigation Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/article/${encodeURIComponent(prevArticle.id)}`}
              className="bg-white border-2 border-[#111111] p-4 shadow-[4px_4px_0px_0px_#111111] hover:bg-[#FFD400] transition-colors group flex items-center gap-3"
            >
              <ChevronLeft className="w-5 h-5 text-[#111111] shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">PREVIOUS ARTICLE</div>
                <div className="font-heading font-bold text-xs text-[#111111] truncate">{prevArticle.headline}</div>
              </div>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/article/${encodeURIComponent(nextArticle.id)}`}
              className="bg-white border-2 border-[#111111] p-4 shadow-[4px_4px_0px_0px_#111111] hover:bg-[#FFD400] transition-colors group flex items-center justify-between text-right gap-3"
            >
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">NEXT ARTICLE</div>
                <div className="font-heading font-bold text-xs text-[#111111] truncate">{nextArticle.headline}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#111111] shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Related Articles Component */}
        <RelatedArticles currentArticleId={article.id} />

      </article>
    </div>
  );
}
