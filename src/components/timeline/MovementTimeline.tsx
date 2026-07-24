'use client';

import { motion } from 'framer-motion';
import { useTimelineEvents } from '@/lib/hooks/useRegistryApi';
import { TimelineEvent } from '@/types/registry';
import { Calendar, Flag, Sparkles } from 'lucide-react';

export function MovementTimeline() {
  const { data: events, isLoading } = useTimelineEvents();

  if (isLoading || !events || events.length === 0) return null;

  return (
    <section className="py-24 bg-[#111111] text-[#F8F7F3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3 py-1 bg-[#FFD400] text-[#111111] font-heading font-black text-xs uppercase tracking-widest">
            [ HISTORICAL MILESTONES ]
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white">
            MOVEMENT <span className="text-[#FFD400]">TIMELINE</span>
          </h2>
          <p className="text-gray-400 font-medium text-base">
            Chronological progression of the Cockroach Registry protocol and global community milestones.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-4 border-[#FFD400] ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {events.map((item: TimelineEvent, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-[#1A1A1A] p-6 sm:p-8 border border-white/10 space-y-4 hover:border-[#FFD400] transition-colors group"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-6 h-6 bg-[#FFD400] border-4 border-[#111111] rounded-full flex items-center justify-center font-bold text-[#111111] group-hover:scale-125 transition-transform" />

              {/* Date Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-heading font-black text-sm text-[#FFD400] tracking-wider uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FFD400]" />
                  {item.date}
                </span>
                <span className="bg-[#111111] text-gray-300 font-mono text-[10px] uppercase px-2.5 py-1 border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-heading font-black text-xl uppercase text-white tracking-tight group-hover:text-[#FFD400] transition-colors">
                  {item.headline}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Optional Image */}
              {item.imageUrl && (
                <div className="mt-4 pt-2">
                  <img
                    src={item.imageUrl}
                    alt={item.headline}
                    loading="lazy"
                    className="w-full max-h-56 object-cover border border-white/10"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
