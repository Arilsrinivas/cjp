'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, ArrowDown, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useRegistryStatistics } from '@/lib/hooks/useRegistryApi';

export function HeroSection() {
  const { data: stats } = useRegistryStatistics();

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#F8F7F3] border-b border-[#111111]/10">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Movement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#111111] text-[#F8F7F3] border border-[#111111]"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-ping" />
              <span className="font-heading font-black text-xs uppercase tracking-widest text-[#FFD400]">
                GLOBAL INDEPENDENT REGISTRY
              </span>
              <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                • {stats?.totalCertificates.toLocaleString() || '48,920'} CERTIFICATES ISSUED
              </span>
            </motion.div>

            {/* Main Amnesty-Style Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-[#111111]">
                THE UNBREAKABLE <br />
                <span className="yellow-highlight">PUBLIC REGISTRY</span> <br />
                FOR RESILIENT MINDS.
              </h1>
              <p className="text-base sm:text-xl text-[#6B7280] font-medium max-w-2xl leading-relaxed pt-2">
                One lifetime digital membership certificate. Cryptographically hashed, verified via mobile OTP, and publicly verifiable forever. No fees. No expirations.
              </p>
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/claim"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFD400] text-[#111111] font-heading font-black uppercase text-sm sm:text-base border-2 border-[#111111] shadow-[5px_5px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#111111] transition-all"
              >
                <Award className="w-5 h-5" />
                Claim Membership Certificate
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-[#111111] font-heading font-bold uppercase text-sm sm:text-base border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <ShieldCheck className="w-5 h-5" />
                Verify Certificate
              </Link>
            </motion.div>

            {/* Quick Proof Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold uppercase tracking-wider text-[#111111]/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Instant Mobile OTP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>1 Certificate Per Mobile Number</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>ED25519 Signed Hash</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#FAF8F5] border-4 border-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111] space-y-6 relative overflow-hidden">
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

              {/* Fake Hash & Seal Bar */}
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
                Claim Your Certificate <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex justify-center items-center pb-4 text-xs font-heading font-bold uppercase tracking-widest text-[#6B7280] gap-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-2"
        >
          <span>EXPLORE MOVEMENT MANIFESTO</span>
          <ArrowDown className="w-4 h-4 text-[#111111]" />
        </motion.div>
      </div>
    </section>
  );
}
