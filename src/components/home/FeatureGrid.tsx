'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Award, Cpu, Share2, Globe2 } from 'lucide-react';

export function FeatureGrid() {
  const features = [
    {
      icon: Award,
      title: 'LIFETIME IDENTIFIER',
      description:
        'Once issued, your membership certificate number remains permanently assigned to your mobile hash forever.',
    },
    {
      icon: ShieldCheck,
      title: 'PUBLIC VERIFIABILITY',
      description:
        'Anyone, anywhere can verify the legitimacy of your certificate using our cryptographically audit-ready portal.',
    },
    {
      icon: Lock,
      title: 'PASSWORDLESS ARCHITECTURE',
      description:
        'No usernames to leak or passwords to forget. Verification is performed seamlessly via encrypted SMS OTP.',
    },
    {
      icon: Cpu,
      title: 'ED25519 SIGNATURES',
      description:
        'Built with state-of-the-art cryptographic hashing protocols ensuring tamper-proof digital certificates.',
    },
    {
      icon: Share2,
      title: 'BEAUTIFUL SOCIAL EXPORT',
      description:
        'Generate high-resolution PNG & PDF social media cards formatted for X, WhatsApp, LinkedIn, and Telegram.',
    },
    {
      icon: Globe2,
      title: 'GLOBAL RESILIENCE NETWORK',
      description:
        'Join thousands of individuals across 140+ sovereign nations committed to human independence.',
    },
  ];

  return (
    <section className="py-24 bg-[#F8F7F3] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
            [ 03 / PROTOCOL FEATURES ]
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            BUILT FOR <span className="yellow-highlight">LONGEVITY</span> & INTEGRITY
          </h2>
          <p className="text-[#6B7280] font-medium text-base">
            Every layer of the Cockroach Membership Registry is designed with mathematical precision and modern web performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-[#111111] p-8 shadow-[5px_5px_0px_0px_#111111] hover:shadow-[7px_7px_0px_0px_#FFD400] transition-all group"
              >
                <div className="w-12 h-12 bg-[#FFD400] border-2 border-[#111111] flex items-center justify-center font-bold text-[#111111] mb-6 group-hover:bg-[#111111] group-hover:text-[#FFD400] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-[#111111] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
