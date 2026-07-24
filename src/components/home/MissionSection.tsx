'use client';

import { motion } from 'framer-motion';
import { Flame, ShieldAlert, Zap, Globe2, Sparkles, Fingerprint } from 'lucide-react';

export function MissionSection() {
  const principles = [
    {
      icon: Flame,
      title: 'UNBREAKABLE STAMINA',
      description:
        'Named after the ultimate survivor of nature, the Cockroach Registry symbolizes individuals who endure adversity, overcome challenges, and remain unshakeable.',
    },
    {
      icon: Fingerprint,
      title: 'CRYPTOGRAPHIC SOVEREIGNTY',
      description:
        'Every membership certificate is generated with a unique SHA-256 digital hash, tying your verification to an immutable public registry ledger.',
    },
    {
      icon: ShieldAlert,
      title: 'ZERO SYBIL DUPLICATION',
      description:
        'Mobile OTP authentication ensures one human, one lifetime membership certificate. No duplicate identities, no synthetic bot claims.',
    },
    {
      icon: Globe2,
      title: 'PUBLIC DECENTRALIZATION',
      description:
        'Anyone across 180+ countries can publicly verify any certificate hash using our open verification portal with instant cryptographic validation.',
    },
  ];

  return (
    <section className="py-24 bg-[#111111] text-[#F8F7F3] relative overflow-hidden">
      {/* Editorial Decorative Background Tape */}
      <div className="absolute top-0 right-0 translate-x-12 -translate-y-6 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase px-16 py-2 rotate-12">
        MOVEMENT MANIFESTO 2026
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest">
            [ 01 / OUR MISSION ]
          </div>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight text-white">
            WE DO NOT FIT IN BOXES. <br />
            <span className="text-[#FFD400]">WE OUTLAST THE STORM.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            The Cockroach Membership Registry is built for those who embody persistence. This is not a meaningless badge generator—it is a global pact of human endurance and individual integrity.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A1A] p-8 border border-white/10 hover:border-[#FFD400] transition-all group relative"
              >
                <div className="w-12 h-12 bg-[#FFD400] text-[#111111] flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-white mb-3 group-hover:text-[#FFD400] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
