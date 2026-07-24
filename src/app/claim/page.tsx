'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClaimForm, ClaimFormData } from '@/components/claim/ClaimForm';
import { OtpInput } from '@/components/claim/OtpInput';
import { CinematicReveal } from '@/components/claim/CinematicReveal';
import { useSendOtpMutation, useVerifyOtpMutation } from '@/lib/hooks/useRegistryApi';
import { Certificate, SendOtpResponse, VerifyOtpResponse } from '@/types/registry';
import { ShieldCheck, Award, Smartphone, CheckCircle2 } from 'lucide-react';

export default function ClaimPage() {
  const [step, setStep] = useState<'FORM' | 'OTP' | 'REVEAL'>('FORM');
  const [formData, setFormData] = useState<ClaimFormData | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [sessionToken, setSessionToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [certificateResult, setCertificateResult] = useState<{
    certificate: Certificate;
    isExisting: boolean;
  } | null>(null);

  const sendOtpMutation = useSendOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const handleFormSubmit = async (data: ClaimFormData) => {
    setFormData(data);
    setErrorMessage(null);
    try {
      const fullPhone = `${data.countryCode} ${data.phoneNumber}`;
      const res: any = await sendOtpMutation.mutateAsync({
        fullName: data.fullName,
        phoneNumber: fullPhone,
        countryCode: data.countryCode,
        country: data.country,
      });

      if (res.sessionId || res.sessionToken) {
        setSessionId(res.sessionId || '');
        setSessionToken(res.sessionToken || '');
        setStep('OTP');
      } else {
        setErrorMessage(res.message || 'Failed to send OTP code.');
      }
    } catch (err: any) {
      console.error('Failed to send OTP', err);
      setErrorMessage(err.message || 'Could not dispatch OTP code.');
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    if (!formData) return;
    setErrorMessage(null);
    try {
      const fullPhone = `${formData.countryCode} ${formData.phoneNumber}`;
      const res: any = await verifyOtpMutation.mutateAsync({
        sessionId,
        sessionToken,
        otp: otpCode,
        phoneNumber: fullPhone,
        fullName: formData.fullName,
        country: formData.country,
      } as any);

      if (res.certificate) {
        setCertificateResult({
          certificate: res.certificate,
          isExisting: res.isExisting || false,
        });
        setStep('REVEAL');
      } else {
        setErrorMessage(res.message || 'Verification failed. Please re-enter the OTP.');
      }
    } catch (err: any) {
      console.error('OTP verification failed', err);
      setErrorMessage(err.message || 'Incorrect OTP code. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (formData) {
      handleFormSubmit(formData);
    }
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
            Verify your mobile number to claim your cryptographically signed lifetime certificate on the public Cockroach Registry.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div
            className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase border-2 border-[#111111] ${
              step === 'FORM' ? 'bg-[#FFD400] text-[#111111]' : 'bg-white text-gray-500'
            }`}
          >
            <span>1. Details</span>
          </div>
          <div className="w-6 h-0.5 bg-[#111111]/30" />
          <div
            className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase border-2 border-[#111111] ${
              step === 'OTP' ? 'bg-[#FFD400] text-[#111111]' : 'bg-white text-gray-500'
            }`}
          >
            <span>2. OTP Code</span>
          </div>
          <div className="w-6 h-0.5 bg-[#111111]/30" />
          <div
            className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase border-2 border-[#111111] ${
              step === 'REVEAL' ? 'bg-[#FFD400] text-[#111111]' : 'bg-white text-gray-500'
            }`}
          >
            <span>3. Certificate</span>
          </div>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {step === 'FORM' && (
            <motion.div
              key="claim-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-4 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#111111] max-w-xl mx-auto"
            >
              <ClaimForm onSubmit={handleFormSubmit} isLoading={sendOtpMutation.isPending} />
            </motion.div>
          )}

          {step === 'OTP' && (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-4 border-[#111111] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#111111] max-w-xl mx-auto"
            >
              <OtpInput
                phoneNumber={formData ? `${formData.countryCode} ${formData.phoneNumber}` : ''}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                isLoading={verifyOtpMutation.isPending}
                error={errorMessage}
              />
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
