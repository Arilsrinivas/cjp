'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, Share2, Globe, Send } from 'lucide-react';
import { Certificate } from '@/types/registry';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

// Custom Brand SVG Icons for X / Twitter and Facebook
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function ShareModal({ isOpen, onClose, certificate }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = certificate.verificationUrl || `https://registry.cockroach.org/verify/${certificate.id}`;
  const shareText = `I just claimed my Lifetime Cockroach Membership Certificate (${certificate.certificateNumber})! Cryptographically verified on the public ledger.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-[#25D366] text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      name: 'X / Twitter',
      icon: XIcon,
      color: 'bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      color: 'bg-[#1877F2] text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FAF8F5] border-4 border-[#111111] max-w-lg w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_#111111] space-y-6 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#111111] text-white hover:bg-[#FFD400] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1 pr-8">
            <span className="inline-block px-2.5 py-0.5 bg-[#FFD400] text-[#111111] font-heading font-black text-[10px] uppercase tracking-wider">
              SHARE LIFETIME DIPLOMA
            </span>
            <h3 className="font-heading font-black text-2xl uppercase text-[#111111]">
              SHARE CERTIFICATE
            </h3>
            <p className="text-xs text-[#6B7280]">
              Broadcast your public verification status across social networks.
            </p>
          </div>

          {/* Social Preview Card */}
          <div className="bg-white border-2 border-[#111111] p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-gray-100 pb-2">
              <span>SOCIAL PREVIEW CARD</span>
              <span className="font-bold text-[#16A34A]">STATUS: VALID</span>
            </div>
            <div className="font-heading font-bold text-base text-[#111111]">
              {certificate.memberName}
            </div>
            <div className="font-mono text-xs text-[#FFD400] bg-[#111111] px-2 py-1 inline-block">
              {certificate.certificateNumber}
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shareLinks.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 border border-[#111111] ${platform.color} font-heading font-bold text-xs uppercase tracking-wider gap-2 hover:opacity-90 transition-opacity`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{platform.name}</span>
                </a>
              );
            })}
          </div>

          {/* Direct Copy Link */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-heading font-bold uppercase text-[#111111]">
              DIRECT PUBLIC VERIFICATION URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-white border-2 border-[#111111] text-xs px-3 py-2.5 font-mono text-[#111111] focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 bg-[#FFD400] text-[#111111] border-2 border-[#111111] font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#111111] hover:text-[#FFD400] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
