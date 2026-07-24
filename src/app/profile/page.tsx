'use client';

import { useState } from 'react';
import { useCertificate } from '@/lib/hooks/useRegistryApi';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { ShareModal } from '@/components/share/ShareModal';
import { exportCertificateAsImage, printCertificate } from '@/lib/pdf';
import { formatDate, truncateHash } from '@/lib/utils';
import { User, Award, ShieldCheck, Download, Share2, Printer, Calendar, Hash, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: certificate, isLoading } = useCertificate();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F8F7F3]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto" />
          <div className="font-heading font-bold text-lg uppercase">Loading Member Profile...</div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F7F3]">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-12 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111]">
          <div className="w-16 h-16 bg-[#FFD400] border-2 border-[#111111] rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-[#111111]" />
          </div>
          <h2 className="font-heading font-black text-3xl uppercase text-[#111111]">PROFILE UNCLAIMED</h2>
          <p className="text-xs text-[#6B7280]">
            No lifetime membership certificate is linked to this session. Claim your certificate today.
          </p>
          <Link
            href="/claim"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD400] text-[#111111] font-heading font-black text-sm uppercase border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]"
          >
            Claim Certificate Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Card Header */}
        <div className="bg-white border-4 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#111111] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#111111]/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#111111] text-[#FFD400] border-2 border-[#FFD400] flex items-center justify-center font-heading font-black text-2xl">
                {certificate.memberName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-[#FFD400] text-[#111111] font-heading font-black text-[10px] uppercase tracking-wider">
                  VERIFIED LIFETIME MEMBER
                </span>
                <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase text-[#111111]">
                  {certificate.memberName}
                </h1>
                <p className="text-xs font-mono text-[#6B7280]">
                  REGISTRATION NO: {certificate.certificateNumber}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A] px-3 py-1.5 font-heading font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" /> STATUS: VALID
            </div>
          </div>

          {/* Quick Profile Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1 bg-[#FAF8F5] p-4 border border-[#111111]/10">
              <div className="text-gray-400 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#111111]" /> ISSUE DATE
              </div>
              <div className="font-bold text-[#111111]">
                {formatDate(certificate.issueDate)}
              </div>
            </div>

            <div className="space-y-1 bg-[#FAF8F5] p-4 border border-[#111111]/10">
              <div className="text-gray-400 font-mono flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#111111]" /> JURISDICTION
              </div>
              <div className="font-bold text-[#111111]">
                {certificate.country || 'Global Sovereignty'}
              </div>
            </div>

            <div className="space-y-1 bg-[#FAF8F5] p-4 border border-[#111111]/10">
              <div className="text-gray-400 font-mono flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#111111]" /> CRYPTOGRAPHIC HASH
              </div>
              <div className="font-mono font-bold text-[#111111] truncate">
                {truncateHash(certificate.hash, 6)}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-2xl uppercase text-[#111111]">
              YOUR LIFETIME CERTIFICATE DIPLOMA
            </h2>
          </div>

          <CertificateCard certificate={certificate} id="cockroach-certificate-element" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => exportCertificateAsImage('cockroach-certificate-element', `${certificate.certificateNumber}.png`)}
            className="px-6 py-3.5 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF / PNG
          </button>

          <button
            onClick={() => printCertificate('cockroach-certificate-element')}
            className="px-6 py-3.5 bg-white text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Certificate
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="px-6 py-3.5 bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#FFD400] hover:bg-[#FFD400] hover:text-[#111111] transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" /> Share Diploma
          </button>

          <Link
            href={`/verify?id=${certificate.certificateNumber}`}
            className="px-6 py-3.5 bg-white text-[#16A34A] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#16A34A] shadow-[4px_4px_0px_0px_#16A34A] hover:bg-[#16A34A] hover:text-white transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Public Audit Page
          </Link>
        </div>

        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          certificate={certificate}
        />

      </div>
    </div>
  );
}
