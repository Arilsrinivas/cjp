'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Certificate } from '@/types/registry';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { ShareModal } from '@/components/share/ShareModal';
import { exportCertificateAsImage, printCertificate } from '@/lib/pdf';
import { Download, Share2, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CinematicRevealProps {
  certificate: Certificate;
  isExisting?: boolean;
}

export function CinematicReveal({ certificate, isExisting }: CinematicRevealProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Trigger confetti burst on reveal
    if (!isExisting) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD400', '#111111', '#FFFFFF', '#16A34A'],
      });
    }
  }, [isExisting]);

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await exportCertificateAsImage('cockroach-certificate-element', `${certificate.certificateNumber}.png`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="space-y-8 py-4"
    >
      {/* Top Banner Status */}
      <div className="text-center space-y-3">
        {isExisting ? (
          <div className="inline-block px-4 py-1.5 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest border border-[#111111]">
            RECOGNIZED MEMBER
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="inline-block px-4 py-1.5 bg-[#16A34A] text-white font-heading font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#111111]"
          >
            🎉 CONGRATULATIONS! CERTIFICATE ISSUED
          </motion.div>
        )}

        <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-[#111111]">
          {isExisting ? 'YOU ALREADY OWN A LIFETIME CERTIFICATE' : 'YOUR UNBREAKABLE DIPLOMA IS LIVE'}
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto font-medium">
          {isExisting
            ? 'Our protocol recognized your mobile number and retrieved your existing lifetime membership diploma.'
            : 'Your cryptographic signature has been stamped onto the public Cockroach Registry.'}
        </p>
      </div>

      {/* Render Certificate Card with Certificate DOM element */}
      <CertificateCard certificate={certificate} id="cockroach-certificate-element" />

      {/* Action Button Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="px-6 py-3.5 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting Image...' : 'Download Certificate Image'}
        </button>

        <button
          onClick={() => printCertificate('cockroach-certificate-element')}
          className="px-6 py-3.5 bg-white text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Diploma
        </button>

        <button
          onClick={() => setShareModalOpen(true)}
          className="px-6 py-3.5 bg-[#111111] text-white font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[4px_4px_0px_0px_#FFD400] hover:bg-[#FFD400] hover:text-[#111111] transition-all flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share to Social Media
        </button>

        <Link
          href={`/verify?id=${certificate.certificateNumber}`}
          className="px-6 py-3.5 bg-white text-[#16A34A] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#16A34A] shadow-[4px_4px_0px_0px_#16A34A] hover:bg-[#16A34A] hover:text-white transition-all flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          Verify Public Ledger
        </Link>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        certificate={certificate}
      />
    </motion.div>
  );
}
