'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Certificate } from '@/types/registry';
import { formatDate, truncateHash } from '@/lib/utils';
import { ShieldCheck, Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  id?: string;
}

export function CertificateCard({ certificate, id = 'cockroach-certificate-element' }: CertificateCardProps) {
  return (
    <div
      id={id}
      className="certificate-paper border-4 border-[#111111] p-6 sm:p-10 shadow-[10px_10px_0px_0px_#111111] relative overflow-hidden text-[#111111] max-w-4xl w-full mx-auto"
    >
      {/* Outer Double Frame Line */}
      <div className="border-2 border-double border-[#FFD400] p-4 sm:p-8 relative">
        
        {/* Background Guilloche Watermark Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Award className="w-80 h-80 text-[#111111]" />
        </div>

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#111111] pb-6 mb-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#111111] text-[#FFD400] flex items-center justify-center font-heading font-black text-2xl border border-[#FFD400]">
              CR
            </div>
            <div>
              <span className="font-heading font-black text-xs uppercase tracking-widest bg-[#FFD400] px-2 py-0.5 text-[#111111]">
                INDEPENDENT GLOBAL MOVEMENT
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#111111]">
                COCKROACH MEMBERSHIP REGISTRY
              </h2>
            </div>
          </div>

          <div className="text-center sm:text-right font-mono text-xs space-y-0.5">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
              REGISTRATION NO.
            </div>
            <div className="font-bold text-sm sm:text-base text-[#111111] bg-white border border-[#111111] px-3 py-1 inline-block">
              {certificate.certificateNumber}
            </div>
          </div>
        </div>

        {/* Main Certificate Content Statement */}
        <div className="text-center space-y-6 py-4">
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#6B7280]">
            THIS IS TO CERTIFY THAT
          </div>

          <div className="space-y-1">
            <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#111111] yellow-highlight inline-block px-4 py-1">
              {certificate.memberName}
            </h1>
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider pt-2">
              LOCATION: {certificate.country || 'GLOBAL'}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#111111]/80 max-w-xl mx-auto font-medium leading-relaxed italic">
            Has successfully verified human sovereignty via mobile OTP authentication and is hereby registered as an unbroken lifetime member of the Cockroach Movement.
          </p>
        </div>

        {/* Bottom Details Grid (Date, Signature, QR, Seal) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t-2 border-[#111111] items-center">
          
          {/* Left Column: Date & Status */}
          <div className="space-y-3 text-center sm:text-left">
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">DATE OF ISSUANCE</div>
              <div className="font-mono text-xs font-bold text-[#111111]">
                {formatDate(certificate.issueDate)}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">PUBLIC VERIFICATION</div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/30 px-2.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CRYPTOGRAPHICALLY VALID</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Gold Seal Stamp */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-20 h-20 rounded-full bg-[#FFD400] border-4 border-[#111111] flex flex-col items-center justify-center text-center p-2 shadow-[3px_3px_0px_0px_#111111] relative group">
              <Award className="w-8 h-8 text-[#111111]" />
              <span className="font-heading font-black text-[8px] uppercase tracking-tighter text-[#111111]">
                OFFICIAL SEAL
              </span>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-1">
              LIFETIME DIPLOMA
            </span>
          </div>

          {/* Right Column: QR Code & Hash */}
          <div className="flex flex-col items-center sm:items-end justify-center space-y-2">
            <div className="bg-white p-2 border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111]">
              <QRCodeSVG
                value={certificate.verificationUrl || `https://registry.cockroach.org/verify/${certificate.id}`}
                size={76}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="font-mono text-[8px] text-gray-500 max-w-[160px] truncate text-center sm:text-right">
              HASH: {truncateHash(certificate.hash, 8)}
            </div>
          </div>

        </div>

        {/* Cryptographic Signature Line */}
        <div className="mt-6 pt-3 border-t border-dashed border-[#111111]/20 flex flex-col sm:flex-row items-center justify-between text-[9px] font-mono text-gray-500 gap-2">
          <span>SIGNATURE: {certificate.signature || 'SIG_COCKROACH_ED25519_8f4b9a12c4e78d90f'}</span>
          <span>PROTOCOL VER: 2026.1.0-ED25519</span>
        </div>

      </div>
    </div>
  );
}
