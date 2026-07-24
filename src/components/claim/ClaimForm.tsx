'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Smartphone, User, Globe, ShieldCheck, Zap } from 'lucide-react';

const claimSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 digits.'),
  countryCode: z.string().min(1, 'Country code required.'),
  country: z.string().min(2, 'Country required.'),
});

export type ClaimFormData = z.infer<typeof claimSchema>;

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData) => void;
  isLoading: boolean;
}

const COUNTRY_CODES = [
  { code: '+91', name: 'India 🇮🇳' },
  { code: '+1', name: 'United States / Canada 🇺🇸 🇨🇦' },
  { code: '+44', name: 'United Kingdom 🇬🇧' },
  { code: '+971', name: 'United Arab Emirates 🇦🇪' },
  { code: '+49', name: 'Germany 🇩🇪' },
  { code: '+33', name: 'France 🇫🇷' },
  { code: '+81', name: 'Japan 🇯🇵' },
  { code: '+61', name: 'Australia 🇦🇺' },
];

export function ClaimForm({ onSubmit, isLoading }: ClaimFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      fullName: 'Aarav Mehta',
      phoneNumber: '9876543210',
      countryCode: '+91',
      country: 'India',
    },
  });

  const handleFillDemo = () => {
    setValue('fullName', 'Aarav Mehta');
    setValue('phoneNumber', '9876543210');
    setValue('countryCode', '+91');
    setValue('country', 'India');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Top Demo Shortcut Banner */}
      <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#111111]/20 text-xs">
        <span className="font-mono text-gray-600">TESTING OTP LOGIN?</span>
        <button
          type="button"
          onClick={handleFillDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black uppercase text-[11px] border border-[#111111]"
        >
          <Zap className="w-3.5 h-3.5" /> Fill Demo Details
        </button>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#111111]" />
          FULL LEGAL / MOVEMENT NAME
        </label>
        <input
          type="text"
          placeholder="e.g. Aarav Mehta"
          {...register('fullName')}
          className="w-full bg-white border-2 border-[#111111] p-3.5 text-sm font-semibold text-[#111111] focus:outline-none focus:bg-[#FAF8F5] focus:border-[#FFD400] transition-colors"
        />
        {errors.fullName && (
          <p className="text-xs font-bold text-[#DC2626]">{errors.fullName.message}</p>
        )}
      </div>

      {/* Country Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#111111]" />
          COUNTRY OF RESIDENCE
        </label>
        <select
          {...register('country')}
          className="w-full bg-white border-2 border-[#111111] p-3.5 text-sm font-semibold text-[#111111] focus:outline-none focus:border-[#FFD400] transition-colors"
        >
          <option value="India">India 🇮🇳</option>
          <option value="United States">United States 🇺🇸</option>
          <option value="United Kingdom">United Kingdom 🇬🇧</option>
          <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
          <option value="Germany">Germany 🇩🇪</option>
          <option value="France">France 🇫🇷</option>
          <option value="Japan">Japan 🇯🇵</option>
          <option value="Australia">Australia 🇦🇺</option>
        </select>
        {errors.country && (
          <p className="text-xs font-bold text-[#DC2626]">{errors.country.message}</p>
        )}
      </div>

      {/* Phone Number with Country Code */}
      <div className="space-y-2">
        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[#111111]" />
          MOBILE NUMBER (FOR OTP VERIFICATION)
        </label>
        <div className="flex gap-2">
          <select
            {...register('countryCode')}
            className="w-32 bg-white border-2 border-[#111111] p-3.5 text-xs font-bold text-[#111111] focus:outline-none focus:border-[#FFD400]"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="9876543210"
            {...register('phoneNumber')}
            className="flex-1 bg-white border-2 border-[#111111] p-3.5 text-sm font-semibold text-[#111111] focus:outline-none focus:bg-[#FAF8F5] focus:border-[#FFD400]"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-xs font-bold text-[#DC2626]">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Verification Notice */}
      <div className="p-3.5 bg-[#FAF8F5] border border-[#111111]/20 text-[11px] text-[#6B7280] font-medium flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
        <span>1 Lifetime Certificate per verified mobile number. OTP code valid for 10 minutes.</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#FFD400] text-[#111111] font-heading font-black text-sm uppercase tracking-wider border-2 border-[#111111] shadow-[5px_5px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Sending OTP Code...
          </span>
        ) : (
          <>
            Send OTP Verification Code <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

    </form>
  );
}
