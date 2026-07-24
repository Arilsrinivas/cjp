'use client';

import { use } from 'react';
import { useCertificate } from '@/lib/hooks/useRegistryApi';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { ShareModal } from '@/components/share/ShareModal';
import { exportCertificateAsImage, printCertificate } from '@/lib/pdf';
import { Download, Share2, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DynamicCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: certificate, isLoading } = useCertificate(id);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F8F7F3]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto" />
          <div className="font-heading font-bold text-lg uppercase">Loading Certificate {id}...</div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F7F3]">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-12 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111]">
          <h2 className="font-heading font-black text-3xl uppercase text-[#111111]">Certificate Not Found</h2>
          <p className="text-xs text-gray-500">The certificate ID "{id}" could not be retrieved from the ledger.</p>
          <Link
            href="/claim"
            className="inline-block px-6 py-3 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase border-2 border-[#111111]"
          >
            Claim a Certificate
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Back Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-[#111111] hover:text-[#FFD400] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Verification Portal
          </Link>
          <div className="text-xs font-mono text-gray-500">
            ID: <span className="font-bold text-[#111111]">{certificate.certificateNumber}</span>
          </div>
        </div>

        {/* Render Certificate Card */}
        <CertificateCard certificate={certificate} id="cockroach-certificate-element" />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => exportCertificateAsImage('cockroach-certificate-element', `${certificate.certificateNumber}.png`)}
            className="px-6 py-3.5 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF / Image
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
