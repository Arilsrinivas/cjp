'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, RefreshCw, ArrowRight, AlertCircle, ShieldCheck, Smartphone, Info } from 'lucide-react';

interface OtpInputProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  isLoading: boolean;
  error?: string | null;
  otpHint?: string;
  provider?: string;
}

export function OtpInput({
  phoneNumber,
  onVerify,
  onResend,
  isLoading,
  error,
  otpHint,
  provider,
}: OtpInputProps) {
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

    // Auto-advance focus
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-trigger verification when 6 digits are filled
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

  const handleResendClick = () => {
    if (timer === 0) {
      setTimer(60);
      onResend();
    }
  };

  const isRealSmsGateway = provider === 'Twilio' || provider === 'Fast2SMS';

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-wider border border-[#111111]">
          <Lock className="w-3.5 h-3.5" />
          MOBILE VERIFICATION
        </div>
        <h3 className="font-heading font-extrabold text-2xl uppercase text-[#111111]">
          ENTER 6-DIGIT OTP CODE
        </h3>
        <p className="text-xs text-[#6B7280]">
          Sent to <span className="font-bold text-[#111111]">{phoneNumber}</span>. Code is valid for 10 minutes.
        </p>

        {/* Carrier SMS vs Sandbox Gateway Banner */}
        <div className="pt-2">
          {isRealSmsGateway ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16A34A]/10 border border-[#16A34A] text-[#16A34A] text-xs font-bold">
              <Smartphone className="w-4 h-4" />
              <span>Carrier SMS dispatched via {provider}! Check your phone.</span>
            </div>
          ) : otpHint ? (
            <div className="p-3 bg-[#FFD400]/20 border-2 border-[#111111] text-xs font-semibold text-[#111111] space-y-1">
              <div className="font-bold flex items-center justify-center gap-1.5 text-sm">
                <Info className="w-4 h-4 text-[#111111]" />
                Your OTP Code is: <span className="font-heading font-black text-base bg-[#FFD400] px-2 py-0.5 border border-[#111111]">{otpHint}</span>
              </div>
              <p className="text-[10px] text-gray-600 font-mono">
                (To receive SMS directly on physical mobile devices via carrier text, add TWILIO_ACCOUNT_SID or FAST2SMS_API_KEY to your Vercel Environment Variables).
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3.5 bg-[#DC2626]/10 border-2 border-[#DC2626] text-[#DC2626] text-xs font-bold flex items-center gap-2">
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
            <span>RESEND IN <strong className="text-[#111111]">{timer}s</strong></span>
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
          Resend SMS Code
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
            Verifying Cryptographic OTP...
          </span>
        ) : (
          <>
            Verify & Issue Certificate <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

    </div>
  );
}
