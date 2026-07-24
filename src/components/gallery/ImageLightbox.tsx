'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Globe, Calendar } from 'lucide-react';
import { GalleryImage } from '@/types/registry';
import { formatDate } from '@/lib/utils';

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 z-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFD400] text-[#111111] font-heading font-black text-xs px-2.5 py-1 uppercase">
              GALLERY LIGHTBOX
            </span>
            <span className="font-mono text-xs text-gray-400">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#111111] text-white hover:bg-[#FFD400] hover:text-[#111111] transition-colors border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image Area with Navigation Buttons */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-6 z-20 p-3 bg-black/60 text-white hover:bg-[#FFD400] hover:text-black border border-white/20 transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <motion.img
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={currentImage.url}
            alt={currentImage.title}
            className="max-h-[70vh] max-w-full object-contain border-2 border-white/20 shadow-2xl"
          />

          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 sm:right-6 z-20 p-3 bg-black/60 text-white hover:bg-[#FFD400] hover:text-black border border-white/20 transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Bottom Details Footer */}
        <div className="bg-[#111111] border border-white/20 p-4 sm:p-6 text-white max-w-4xl mx-auto w-full space-y-2 z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
            <h3 className="font-heading font-black text-lg sm:text-xl uppercase text-[#FFD400]">
              {currentImage.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#FFD400]" />
                {currentImage.source}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FFD400]" />
                {formatDate(currentImage.publishedAt)}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
            {currentImage.caption}
          </p>
        </div>

      </div>
    </AnimatePresence>
  );
}
