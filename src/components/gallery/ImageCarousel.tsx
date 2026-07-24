'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { useGalleryImages } from '@/lib/hooks/useRegistryApi';
import { ImageLightbox } from './ImageLightbox';
import { GalleryImage } from '@/types/registry';
import { ChevronLeft, ChevronRight, Maximize2, Globe, Sparkles } from 'lucide-react';

export function ImageCarousel() {
  const { data: images, isLoading } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-[#111111] text-center text-white">
        <div className="w-10 h-10 border-4 border-[#FFD400] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="font-heading font-bold text-sm uppercase">Loading Live Photo Feed...</div>
      </div>
    );
  }

  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 bg-[#111111] text-[#F8F7F3] border-b border-[#FFD400] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest mb-3">
              [ LIVE MOVEMENT GALLERY ]
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              COMMUNITY <span className="text-[#FFD400]">PHOTO STREAM</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="p-3 bg-[#1A1A1A] text-white hover:bg-[#FFD400] hover:text-[#111111] border border-white/20 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 bg-[#1A1A1A] text-white hover:bg-[#FFD400] hover:text-[#111111] border border-white/20 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4">
            {images.map((img: GalleryImage, index: number) => (
              <div
                key={img.id}
                className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4 min-w-0"
              >
                <div
                  onClick={() => handleImageClick(index)}
                  className="relative group border-2 border-white/20 bg-[#1A1A1A] overflow-hidden cursor-pointer"
                >
                  <div className="h-64 sm:h-80 w-full overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                    <span className="text-[10px] font-mono text-[#FFD400] uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {img.source}
                    </span>
                    <h3 className="font-heading font-black text-lg uppercase text-white truncate">
                      {img.title}
                    </h3>
                  </div>

                  <div className="absolute top-4 right-4 p-2 bg-[#FFD400] text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {images.map((_item: GalleryImage, idx: number) => (
            <button
              key={idx}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              className={`h-2 transition-all ${
                selectedIndex === idx ? 'w-8 bg-[#FFD400]' : 'w-2 bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
