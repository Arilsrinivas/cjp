'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Share2, Download } from 'lucide-react';
import { useCertificate } from '@/lib/hooks/useRegistryApi';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { ShareModal } from '@/components/share/ShareModal';
import { exportCertificateAsImage } from '@/lib/pdf';
import Link from 'next/link';

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || 'CRC-2026-89421';
  const [query, setQuery] = useState(initialId);
  const [activeSearchId, setActiveSearchId] = useState(initialId);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { data: certificate, isLoading, isFetched } = useCertificate(activeSearchId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveSearchId(query.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar Input */}
      <div className="bg-white border-4 border-[#111111] p-4 sm:p-6 shadow-[8px_8px_0px_0px_#111111] mb-12">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. CRC-2026-89421) or Hash"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border-2 border-[#111111] pl-12 pr-4 py-3.5 text-sm font-semibold text-[#111111] uppercase placeholder:normal-case focus:outline-none focus:bg-white focus:border-[#FFD400]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3.5 bg-[#FFD400] text-[#111111] font-heading font-black text-sm uppercase tracking-wider border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Auditing...
              </span>
            ) : (
              <>
                Verify ID <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>SAMPLE IDS: CRC-2026-89421, CRC-2026-00001</span>
          <span className="hidden sm:inline">ALGORITHM: SHA-256 + ED25519</span>
        </div>
      </div>

      {/* Verification Result Area */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 bg-white border-2 border-[#111111] p-8 space-y-4"
          >
            <div className="w-12 h-12 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto" />
            <div className="font-heading font-bold text-lg uppercase text-[#111111]">
              Querying Cryptographic Ledger Nodes...
            </div>
            <p className="text-xs text-gray-500 font-mono">Verifying ED25519 signature payload</p>
          </motion.div>
        )}

        {!isLoading && isFetched && certificate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Green Success Banner */}
            <div className="p-6 bg-[#16A34A] text-white border-4 border-[#111111] shadow-[6px_6px_0px_0px_#111111] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 bg-white text-[#16A34A] rounded-full flex items-center justify-center font-bold shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-heading font-black text-xs uppercase tracking-widest text-[#FFD400]">
                    VERIFICATION CONFIRMED
                  </div>
                  <div className="font-heading font-black text-2xl uppercase tracking-tight">
                    STATUS: VALID CERTIFICATE
                  </div>
                  <div className="text-xs font-mono opacity-90">
                    REGISTERED TO {certificate.memberName.toUpperCase()} ({certificate.certificateNumber})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportCertificateAsImage('cockroach-certificate-element', `${certificate.certificateNumber}.png`)}
                  className="px-4 py-2 bg-white text-[#111111] font-heading font-bold text-xs uppercase border border-[#111111] hover:bg-[#FFD400] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="px-4 py-2 bg-[#111111] text-white font-heading font-bold text-xs uppercase border border-[#111111] hover:bg-[#FFD400] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
              </div>
            </div>

            {/* Certificate Card Render */}
            <CertificateCard certificate={certificate} id="cockroach-certificate-element" />

            {/* Share Modal Dialog */}
            <ShareModal
              isOpen={shareModalOpen}
              onClose={() => setShareModalOpen(false)}
              certificate={certificate}
            />
          </motion.div>
        )}

        {!isLoading && isFetched && !certificate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white border-4 border-[#111111] p-8 sm:p-12 shadow-[8px_8px_0px_0px_#111111] text-center space-y-6"
          >
            <div className="w-16 h-16 bg-[#DC2626]/10 text-[#DC2626] border-2 border-[#DC2626] rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-[#DC2626] text-white font-heading font-black text-xs uppercase tracking-wider">
                UNVERIFIED RECORD
              </div>
              <h3 className="font-heading font-black text-3xl uppercase text-[#111111]">
                CERTIFICATE NOT FOUND
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto font-medium">
                No registered lifetime diploma matches the query <strong className="text-[#111111]">"{activeSearchId}"</strong>. Please verify the ID spelling or claim a new certificate.
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <Link
                href="/claim"
                className="px-6 py-3 bg-[#FFD400] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:bg-[#111111] hover:text-[#FFD400] transition-colors"
              >
                Claim New Certificate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#F8F7F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-block px-3 py-1 bg-[#111111] text-[#FFD400] font-heading font-black text-xs uppercase tracking-widest">
            [ PUBLIC CRYPTOGRAPHIC AUDIT PORTAL ]
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111]">
            VERIFY <span className="yellow-highlight">CERTIFICATE</span>
          </h1>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            Enter any Certificate ID or SHA-256 hash to audit its authenticity on the Cockroach Membership Registry.
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-12 bg-white border-2 border-[#111111]">
            <div className="w-10 h-10 border-4 border-[#111111] border-t-[#FFD400] rounded-full animate-spin mx-auto mb-4" />
            <div className="font-heading font-bold text-sm uppercase">Loading Audit Interface...</div>
          </div>
        }>
          <VerifyContent />
        </Suspense>

      </div>
    </div>
  );
}
