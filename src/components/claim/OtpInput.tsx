'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, Lock, ArrowRight, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface OtpInputProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  isLoading: boolean;
  error?: string | null;
}

export function OtpInput({ phoneNumber, onVerify, onResend, isLoading, error }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (value && isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (newOtp.every((digit) => digit !== '')) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      onVerify(pastedData);
    }
  };

  const handleAutoFillDemo = () => {
    const demoDigits = ['1', '2', '3', '4', '5', '6'];
    setOtp(demoDigits);
    onVerify('123456');
  };

  const handleResendClick = () => {
    if (timer === 0) {
      setTimer(60);
      onResend();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-wider border border-[#111111]">
          <Lock className="w-3.5 h-3.5" />
          VERIFICATION CODE SENT
        </div>
        <h3 className="font-heading font-extrabold text-2xl uppercase text-[#111111]">
          ENTER 6-DIGIT OTP
        </h3>
        <p className="text-xs text-[#6B7280]">
          Sent to <span className="font-bold text-[#111111]">{phoneNumber}</span>
        </p>

        {/* Quick Demo Fill Shortcut Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111] text-[#FFD400] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFD400] hover:text-[#111111] transition-colors border border-[#111111] shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[#FFD400] animate-pulse" />
            Auto-Fill Demo Code (123456)
          </button>
        </div>
      </div>

      {/* Error Banner if any */}
      {error && (
        <div className="p-3 bg-[#DC2626]/10 border-2 border-[#DC2626] text-[#DC2626] text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 6 OTP Input Boxes */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 my-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-heading font-black text-[#111111] bg-white border-3 border-[#111111] shadow-[3px_3px_0px_0px_#111111] focus:outline-none focus:bg-[#FFD400]/20 focus:border-[#FFD400] transition-colors"
          />
        ))}
      </div>

      {/* Timer & Resend Button */}
      <div className="flex items-center justify-between text-xs border-t border-[#111111]/10 pt-4">
        <div className="text-[#6B7280] font-mono">
          {timer > 0 ? (
            <span>RESEND CODE IN <strong className="text-[#111111]">{timer}s</strong></span>
          ) : (
            <span className="text-[#16A34A] font-bold">READY TO RESEND</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleResendClick}
          disabled={timer > 0}
          className="flex items-center gap-1.5 font-heading font-bold text-xs uppercase text-[#111111] hover:text-[#FFD400] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Resend OTP
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => onVerify(otp.join(''))}
        disabled={otp.join('').length !== 6 || isLoading}
        className="w-full py-4 bg-[#111111] text-[#FFD400] font-heading font-black text-sm uppercase tracking-wider border-2 border-[#111111] shadow-[5px_5px_0px_0px_#FFD400] hover:bg-[#FFD400] hover:text-[#111111] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-[#FFD400] border-t-transparent rounded-full animate-spin" />
            Verifying OTP & Issuing Diploma...
          </span>
        ) : (
          <>
            Verify & Claim Lifetime Certificate <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

    </div>
  );
}
