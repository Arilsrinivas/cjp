'use client';

import { motion } from 'framer-motion';
import { Smartphone, CheckCircle, Award, ArrowRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'VERIFY MOBILE NUMBER',
      description:
        'Enter your phone number and receive a secure 6-digit OTP code to verify human ownership.',
      icon: Smartphone,
      accent: 'bg-[#FFD400]',
    },
    {
      number: '02',
      title: 'CLAIM MEMBERSHIP',
      description:
        'Submit your member details. Our protocol checks for existing registrations to enforce uniqueness.',
      icon: CheckCircle,
      accent: 'bg-[#111111] text-[#FFD400]',
    },
    {
      number: '03',
      title: 'RECEIVE CERTIFICATE',
      description:
        'Instant cinematic reveal of your cryptographically signed lifetime digital membership certificate.',
      icon: Award,
      accent: 'bg-[#FFD400]',
    },
  ];

  return (
    <section className="py-24 bg-[#F8F7F3] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
            [ 02 / THREE-STEP CLAIM PROCESS ]
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            HOW TO CLAIM YOUR <br />
            <span className="yellow-highlight">LIFETIME REGISTRATION</span>
          </h2>
          <p className="text-[#6B7280] font-medium text-base">
            No password creation. No subscription fees. Claim your lifetime status in under 60 seconds.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white border-3 border-[#111111] p-8 shadow-[6px_6px_0px_0px_#111111] relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading font-black text-3xl text-[#111111]">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 flex items-center justify-center border-2 border-[#111111] ${step.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl uppercase text-[#111111] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-6 font-medium">
                    {step.description}
                  </p>
                </div>

                {index < 2 && (
                  <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#FFD400] border-2 border-[#111111] rounded-full items-center justify-center font-bold text-[#111111]">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link
            href="/claim"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#111111] text-[#FFD400] hover:bg-[#FFD400] hover:text-[#111111] font-heading font-black text-base uppercase tracking-wider border-2 border-[#111111] shadow-[5px_5px_0px_0px_#111111] transition-all"
          >
            Start Verification Process Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
