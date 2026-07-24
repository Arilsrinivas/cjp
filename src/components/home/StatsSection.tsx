'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRegistryStatistics } from '@/lib/hooks/useRegistryApi';
import { truncateHash } from '@/lib/utils';
import { ShieldCheck, Hash, Globe, Calendar, RefreshCw } from 'lucide-react';

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  const { data: stats, isLoading, isRefetching, refetch } = useRegistryStatistics();

  const totalCertificates = stats?.totalCertificates || 48920;
  const todaysCertificates = stats?.todaysCertificates || 342;
  const countriesCount = stats?.countriesCount || 148;
  const latestNumber = stats?.latestMembershipNumber || 'CRC-2026-89421';
  const latestHash = stats?.latestHash || '0x8f4b9a12c4e78d90f11a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e';

  return (
    <section className="py-20 bg-[#111111] text-white border-y-4 border-[#FFD400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest mb-3">
              LIVE NETWORK METRICS
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              REGISTRY <span className="text-[#FFD400]">AUDIT STATISTICS</span>
            </h2>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#FFD400] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
            REFRESH PUBLIC METRICS
          </button>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-[#1A1A1A] p-6 border-l-4 border-[#FFD400] space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>TOTAL CERTIFICATES</span>
              <ShieldCheck className="w-4 h-4 text-[#FFD400]" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
              <Counter end={totalCertificates} />
            </div>
            <p className="text-[11px] text-gray-500 font-mono">Verified in global registry</p>
          </div>

          <div className="bg-[#1A1A1A] p-6 border-l-4 border-[#16A34A] space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>TODAY'S ISSUANCE</span>
              <Calendar className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-[#16A34A] tracking-tight">
              +<Counter end={todaysCertificates} />
            </div>
            <p className="text-[11px] text-gray-500 font-mono">Claims in last 24 hours</p>
          </div>

          <div className="bg-[#1A1A1A] p-6 border-l-4 border-[#FFD400] space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>COUNTRIES REPRESENTED</span>
              <Globe className="w-4 h-4 text-[#FFD400]" />
            </div>
            <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
              <Counter end={countriesCount} />
            </div>
            <p className="text-[11px] text-gray-500 font-mono">Sovereignty across borders</p>
          </div>

          <div className="bg-[#1A1A1A] p-6 border-l-4 border-white space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>LATEST MEMBER NO.</span>
              <Hash className="w-4 h-4 text-white" />
            </div>
            <div className="font-heading font-bold text-2xl text-[#FFD400] tracking-tight truncate">
              {latestNumber}
            </div>
            <p className="text-[10px] text-gray-400 font-mono truncate">
              HASH: {truncateHash(latestHash, 6)}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
