'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Award, Search, Radio, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Live Dispatches', href: '/' },
    { name: 'Claim Certificate', href: '/claim' },
    { name: 'Verify Certificate', href: '/verify' },
    { name: 'Member Profile', href: '/profile' },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F7F3]/95 backdrop-blur-md border-b-2 border-[#111111] shadow-md'
          : 'bg-[#F8F7F3] border-b border-[#111111]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand Identity */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-11 h-11 bg-[#111111] group-hover:bg-[#FFD400] transition-colors flex items-center justify-center font-heading font-black text-2xl text-[#FFD400] group-hover:text-[#111111] border-2 border-[#111111]">
              CR
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight uppercase leading-none text-[#111111]">
                COCKROACH
              </span>
              <span className="text-[10px] font-extrabold tracking-widest text-[#DC2626] uppercase">
                PROTEST LIVE NEWSROOM
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-heading font-bold tracking-wider uppercase transition-colors hover:text-[#111111] ${
                    isActive ? 'text-[#111111] font-black' : 'text-[#6B7280]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#FFD400]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Live Status Badge & Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Live Indicator Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#111111] text-white">
              <span className="inline-flex items-center gap-1 text-[#DC2626] font-heading font-black text-[10px] uppercase tracking-wider animate-pulse">
                <Radio className="w-3.5 h-3.5 text-[#DC2626]" /> ● LIVE
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                Updated 5m ago
              </span>
            </div>

            {/* Quick Action CTAs */}
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-heading font-bold uppercase text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Verify ID
            </Link>

            <Link
              href="/claim"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-heading font-black uppercase text-[#111111] bg-[#FFD400] border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#111111] transition-all"
            >
              <Award className="w-4 h-4" />
              Claim Certificate
            </Link>

          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-[#111111] text-[#FFD400] focus:outline-none border-2 border-[#111111]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F8F7F3] border-b-4 border-[#111111] px-4 pt-4 pb-8 space-y-4"
          >
            <div className="flex items-center justify-between p-3 bg-[#111111] text-white">
              <span className="inline-flex items-center gap-1.5 text-[#DC2626] font-heading font-black text-xs uppercase animate-pulse">
                <Radio className="w-4 h-4" /> ● LIVE PROTEST NEWSROOM
              </span>
              <span className="text-[11px] font-mono text-gray-400">Refreshes Every 1 hr</span>
            </div>

            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-heading font-bold uppercase tracking-wider py-2.5 text-[#111111] hover:text-[#FFD400] transition-colors border-b border-[#111111]/10"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              <Link
                href="/claim"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#FFD400] text-[#111111] font-heading font-black uppercase text-sm border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]"
              >
                <Award className="w-5 h-5" />
                Claim Lifetime Certificate
              </Link>
              <Link
                href="/verify"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-[#111111] font-heading font-bold uppercase text-sm border-2 border-[#111111]"
              >
                <Search className="w-4 h-4" />
                Verify Certificate ID
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
