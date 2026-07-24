'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, Globe } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-[#F8F7F3] pt-16 pb-12 border-t-4 border-[#FFD400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Callout Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F8F7F3]/10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest">
              INDEPENDENT MOVEMENT
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              STAND UNBROKEN. <br />
              <span className="text-[#FFD400]">CLAIM YOUR LIFETIME CERTIFICATE.</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              The Cockroach Membership Registry is a globally decentralized digital initiative celebrating human endurance, individual sovereignty, and cryptographic proof of existence.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#1F1F1F] p-6 sm:p-8 border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase text-white tracking-wide">
              SUBSCRIBE TO REGISTRY DISPATCH
            </h3>
            <p className="text-xs text-gray-400">
              Receive public ledger statistics, verification audits, and global movement milestone reports.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#16A34A]/20 border border-[#16A34A] text-[#16A34A] text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Subscribed to Public Registry Dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#111111] border border-gray-700 text-white text-xs px-4 py-3 focus:outline-none focus:border-[#FFD400]"
                />
                <button
                  type="submit"
                  className="bg-[#FFD400] text-[#111111] font-heading font-bold uppercase text-xs px-6 py-3 hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  Join <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#F8F7F3]/10">
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#FFD400] mb-4">
              REGISTRY NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home & Manifesto
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-white transition-colors">
                  Claim Membership Certificate
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white transition-colors">
                  Public Certificate Verification
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Member Certificate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#FFD400] mb-4">
              VERIFICATION PROTOCOL
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  ED25519 Signature Standard
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  SHA-256 Hash Audits
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Public Verification API
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Lifetime Certificate Registry
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#FFD400] mb-4">
              COMMUNITY MOVEMENT
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cockroach Philosophy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Global Member Stories
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Open Registry Standards
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Media & Press Kit
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#FFD400] mb-4">
              NETWORK SECURITY
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Lock className="w-4 h-4 text-[#FFD400]" />
                Zero Password Storage
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#FFD400]" />
                OTP Phone Verification Only
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Globe className="w-4 h-4 text-[#FFD400]" />
                Independent Registry Node
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>PUBLIC LEDGER: ONLINE & OPERATIONAL</span>
          </div>
          <div>
            © {new Date().getFullYear()} Cockroach Membership Registry. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
