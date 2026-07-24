'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useHeroImages, useRegistryStatistics } from '@/lib/hooks/useRegistryApi';

const DEFAULT_HEROES = [
  {
    id: 'hero-default-1',
    url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'THE UNBREAKABLE INDIAN YOUTH PROTEST',
    subtitle: 'Over 250,000 Students & Workers Gather Across 28 States Demanding Sovereignty',
    articleId: 'protest-101',
  },
  {
    id: 'hero-default-2',
    url: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'NEW DELHI MARCH REACHES PARLIAMENT STREET',
    subtitle: 'Peaceful Demonstration Calls For Immutable Sovereignty & Anti-Surveillance Safeguards',
    articleId: 'protest-102',
  },
];

export function DynamicHero() {
  const { data: heroImages } = useHeroImages();
  const { data: stats } = useRegistryStatistics();
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesToDisplay = heroImages && heroImages.length > 0 ? heroImages : DEFAULT_HEROES;

  // Auto-rotate background photos every 8 seconds
  useEffect(() => {
    if (imagesToDisplay.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesToDisplay.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [imagesToDisplay]);

  const currentHero = imagesToDisplay[currentIndex] || DEFAULT_HEROES[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagesToDisplay.length);
  };

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#111111] text-[#F8F7F3] border-b-4 border-[#FFD400]">
      
      {/* High-Visibility Background Image with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHero.id || currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url("${currentHero.url}")` }}
        />
      </AnimatePresence>

      {/* Light Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/45 to-black/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Main Hero Text Panel with Translucent Backdrop */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Movement Counter Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#FFD400] text-[#111111] border-2 border-[#111111] font-heading font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#111111]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#111111] animate-ping" />
              <span>INDIAN YOUTH PROTEST LIVE COVERAGE</span>
              <span className="text-xs font-mono font-bold text-[#111111] hidden sm:inline">
                • {stats?.totalCertificates.toLocaleString() || '48,922'} CERTIFICATES ISSUED
              </span>
            </motion.div>

            {/* Headline & Summary Backing Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/60 backdrop-blur-md p-6 sm:p-8 border-l-4 border-[#FFD400] border-y border-r border-white/20 shadow-2xl space-y-4"
            >
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase leading-[0.98] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                {currentHero?.title || (
                  <>
                    THE UNBREAKABLE <br />
                    <span className="yellow-highlight text-[#111111]">PUBLIC REGISTRY</span> <br />
                    FOR RESILIENT MINDS.
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-lg text-gray-200 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {currentHero?.subtitle ||
                  'Official live news platform reporting on ongoing demonstrations across 28 Indian states. Cryptographically signed lifetime membership certificates.'}
              </p>

              {/* Slide Counter & Manual Controls */}
              {imagesToDisplay.length > 0 && (
                <div className="pt-4 flex items-center justify-between border-t border-white/20 text-xs font-mono">
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="font-bold text-[#FFD400]">PROTEST PHOTO {currentIndex + 1} / {imagesToDisplay.length}</span>
                    <span className="hidden sm:inline text-gray-400">• Auto-rotates every 8s</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 bg-[#111111] text-white hover:bg-[#FFD400] hover:text-[#111111] border border-white/30 transition-colors"
                      aria-label="Previous Hero Photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 bg-[#111111] text-white hover:bg-[#FFD400] hover:text-[#111111] border border-white/30 transition-colors"
                      aria-label="Next Hero Photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/claim"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFD400] text-[#111111] font-heading font-black uppercase text-sm sm:text-base border-2 border-[#111111] shadow-[5px_5px_0px_0px_#FFFFFF] hover:bg-white hover:text-[#111111] transition-all"
              >
                <Award className="w-5 h-5" />
                Claim Lifetime Certificate
              </Link>
              
              {currentHero?.articleId ? (
                <Link
                  href={`/article/${encodeURIComponent(currentHero.articleId)}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#111111] text-white font-heading font-bold uppercase text-sm sm:text-base border-2 border-white hover:bg-[#FFD400] hover:text-[#111111] transition-colors"
                >
                  Read Featured Article <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/verify"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#111111] text-white font-heading font-bold uppercase text-sm sm:text-base border-2 border-white hover:bg-[#FFD400] hover:text-[#111111] transition-colors"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Verify Certificate
                </Link>
              )}
            </motion.div>

            {/* Key Assurance Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFD400]" />
                <span>Google OAuth Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFD400]" />
                <span>1 Certificate Per Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFD400]" />
                <span>ED25519 Signed Hash</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Certificate Specimen Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#FAF8F5] text-[#111111] border-4 border-[#FFD400] p-6 shadow-[8px_8px_0px_0px_#FFD400] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FFD400] text-[#111111] font-heading font-black text-[10px] uppercase px-3 py-1 border-b border-l border-[#111111]">
                OFFICIAL SPECIMEN
              </div>

              <div className="border-b-2 border-dashed border-[#111111]/20 pb-4">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  GLOBAL REGISTRY ENTRY
                </div>
                <div className="font-heading font-black text-2xl text-[#111111] uppercase tracking-tight">
                  LIFETIME CERTIFICATE
                </div>
                <div className="text-xs font-mono text-[#6B7280]">
                  REGISTRATION NO: CRC-2026-89421
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">MEMBER NAME</div>
                  <div className="font-heading font-bold text-lg text-[#111111]">ALEX RIVERA</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">ISSUED</div>
                    <div className="font-mono text-[#111111]">MARCH 15, 2026</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">STATUS</div>
                    <div className="font-bold text-[#16A34A] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> VALID
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#111111]/10 flex items-center justify-between">
                <div className="font-mono text-[9px] text-gray-500 truncate max-w-[180px]">
                  HASH: 0x8f4b9a12c4e78d90f1...
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFD400] border border-[#111111] flex items-center justify-center font-heading font-black text-[10px]">
                  SEAL
                </div>
              </div>

              <Link
                href="/claim"
                className="w-full py-2.5 bg-[#111111] text-white hover:bg-[#FFD400] hover:text-[#111111] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                Claim Your Certificate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
