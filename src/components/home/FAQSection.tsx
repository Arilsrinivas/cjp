'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is the Cockroach Membership Registry?',
      answer:
        'The Cockroach Membership Registry is an independent, non-profit digital movement inspired by the resilience of the cockroach. It allows individuals to claim one lifetime cryptographic digital certificate celebrating human endurance and digital sovereignty.',
    },
    {
      question: 'Is claiming a membership certificate completely free?',
      answer:
        'Yes. Claiming your certificate is 100% free forever. There are no registration fees, hidden subscriptions, or renewal costs.',
    },
    {
      question: 'Why do I need to verify my mobile number via OTP?',
      answer:
        'Mobile OTP verification ensures a strict 1-human-to-1-certificate rule (anti-Sybil mechanism). This prevents automated bots from mass-generating fake certificates and preserves the true value of the public registry.',
    },
    {
      question: 'What happens if I try to register a second time with the same number?',
      answer:
        'Our protocol detects existing registrations immediately. Instead of creating a duplicate, it retrieves your original lifetime certificate so you can re-download, share, or verify it anytime.',
    },
    {
      question: 'How can anyone publicly verify my certificate?',
      answer:
        'Every certificate contains a unique Certificate ID (e.g. CRC-2026-89421) and a SHA-256 cryptographic hash. Anyone can enter the ID into our public /verify portal or scan the embedded QR code to confirm validity.',
    },
    {
      question: 'Can I download a PDF or PNG version for social sharing?',
      answer:
        'Yes! Once claimed, you can export high-resolution certificates directly to your device or share custom preview cards to WhatsApp, X (Twitter), LinkedIn, and Telegram with one click.',
    },
  ];

  return (
    <section className="py-24 bg-[#F8F7F3] border-b border-[#111111]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
            [ 04 / FREQUENTLY ASKED QUESTIONS ]
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            CLEAR ANSWERS FOR <span className="yellow-highlight">THE CURIOUS</span>
          </h2>
          <p className="text-[#6B7280] font-medium text-base">
            Everything you need to know about the registry protocol and certificate claiming process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-lg text-[#111111] hover:text-[#FFD400] transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400">0{index + 1}.</span>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-[#FFD400]' : 'bg-gray-100'}`}>
                    <ChevronDown className="w-4 h-4 text-[#111111]" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#111111]/10 px-6 pb-6 pt-4 text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
