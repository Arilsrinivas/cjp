'use client';

import { motion } from 'framer-motion';
import { Quote, CheckCircle2, Star } from 'lucide-react';

export function Testimonials() {
  const stories = [
    {
      name: 'Marcus Vance',
      role: 'Software Architect',
      country: 'Germany 🇩🇪',
      certId: 'CRC-2026-10492',
      quote:
        'In a world of ephemeral hype and disposable identity, having an unbroken lifetime certificate tied to cryptographic verification feels genuinely empowering.',
    },
    {
      name: 'Aisha Al-Mansoor',
      role: 'Human Rights Advocate',
      country: 'United Arab Emirates 🇦🇪',
      certId: 'CRC-2026-38491',
      quote:
        'The Amnesty-inspired visual design, zero fee structure, and focus on human stamina makes this registry feel like a true international statement.',
    },
    {
      name: 'Siddharth Rao',
      role: 'Fintech Founder',
      country: 'India 🇮🇳',
      certId: 'CRC-2026-59102',
      quote:
        'Claimed my certificate in less than 40 seconds via OTP. The cinematic reveal animation gave me goosebumps!',
    },
  ];

  return (
    <section className="py-24 bg-[#111111] text-[#F8F7F3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest">
            [ 05 / COMMUNITY TESTIMONIALS ]
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white">
            VOICES OF THE <span className="text-[#FFD400]">UNBROKEN MOVEMENT</span>
          </h2>
          <p className="text-gray-400 font-medium text-base">
            Read stories from individuals who have claimed their lifetime membership across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#1A1A1A] p-8 border border-white/10 flex flex-col justify-between hover:border-[#FFD400] transition-colors relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-[#FFD400] opacity-80" />
                  <span className="font-mono text-[10px] bg-[#111111] text-[#FFD400] px-2 py-1 border border-white/10">
                    {story.certId}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-sm text-white">
                    {story.name}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {story.role}
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#FFD400]">
                  {story.country}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
