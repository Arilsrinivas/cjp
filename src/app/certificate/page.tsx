'use client';

import { useCertificate } from '@/lib/hooks/useRegistryApi';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { ShareModal } from '@/components/share/ShareModal';
import { exportCertificateAsImage, printCertificate } from '@/lib/pdf';
import { Download, Share2, ShieldCheck, Printer, Award } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DefaultCertificatePage() {
  const { data: certificate, isLoading } = useCertificate();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F8F7F3]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto" />
          <div className="font-heading font-bold text-lg uppercase">Retrieving Certificate...</div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F7F3]">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-12 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111]">
          <Award className="w-16 h-16 text-[#FFD400] mx-auto" />
          <h2 className="font-heading font-black text-3xl uppercase text-[#111111]">NO CERTIFICATE CLAIMED YET</h2>
          <p className="text-xs text-gray-500">You haven't claimed a lifetime membership certificate on this device yet.</p>
          <Link
            href="/claim"
            className="inline-block px-8 py-4 bg-[#FFD400] text-[#111111] font-heading font-black text-sm uppercase border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111]"
          >
            Claim Lifetime Certificate Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase">
            YOUR LIFETIME DIPLOMA
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase text-[#111111]">
            MEMBERSHIP CERTIFICATE
          </h1>
        </div>

        <CertificateCard certificate={certificate} id="cockroach-certificate-element" />

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => exportCertificateAsImage('cockroach-certificate-element', `${certificate.certificateNumber}.png`)}
            className="px-6 py-3.5 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Image
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
            <Share2 className="w-4 h-4" /> Share Social Card
          </button>

          <Link
            href={`/verify?id=${certificate.certificateNumber}`}
            className="px-6 py-3.5 bg-white text-[#16A34A] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#16A34A] shadow-[4px_4px_0px_0px_#16A34A] hover:bg-[#16A34A] hover:text-white transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Verify Publicly
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
