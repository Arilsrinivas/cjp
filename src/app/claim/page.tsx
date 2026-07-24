'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleAuthClaim } from '@/components/claim/GoogleAuthClaim';
import { CinematicReveal } from '@/components/claim/CinematicReveal';
import { Certificate } from '@/types/registry';

export default function ClaimPage() {
  const [step, setStep] = useState<'AUTH' | 'REVEAL'>('AUTH');
  const [certificateResult, setCertificateResult] = useState<{
    certificate: Certificate;
    isExisting: boolean;
  } | null>(null);

  const handleGoogleSuccess = (certificate: Certificate, isExisting: boolean) => {
    setCertificateResult({ certificate, isExisting });
    setStep('REVEAL');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
            [ LIFETIME CERTIFICATE REGISTRATION ]
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            CLAIM YOUR <span className="yellow-highlight">MEMBERSHIP</span>
          </h1>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            Authenticate your Google account to claim your cryptographically signed lifetime certificate on the public Cockroach Registry.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div
            className={`flex items-center gap-2 px-5 py-2 text-xs font-heading font-bold uppercase border-2 border-[#111111] ${
              step === 'AUTH' ? 'bg-[#FFD400] text-[#111111]' : 'bg-white text-gray-500'
            }`}
          >
            <span>1. Google Verification</span>
          </div>
          <div className="w-8 h-0.5 bg-[#111111]/30" />
          <div
            className={`flex items-center gap-2 px-5 py-2 text-xs font-heading font-bold uppercase border-2 border-[#111111] ${
              step === 'REVEAL' ? 'bg-[#FFD400] text-[#111111]' : 'bg-white text-gray-500'
            }`}
          >
            <span>2. Issued Certificate</span>
          </div>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {step === 'AUTH' && (
            <motion.div
              key="google-auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-4 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#111111] max-w-xl mx-auto"
            >
              <GoogleAuthClaim onSuccess={handleGoogleSuccess} />
            </motion.div>
          )}

          {step === 'REVEAL' && certificateResult && (
            <motion.div
              key="cinematic-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <CinematicReveal
                certificate={certificateResult.certificate}
                isExisting={certificateResult.isExisting}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
