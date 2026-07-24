import { BreakingTicker } from '@/components/news/BreakingTicker';
import { DynamicHero } from '@/components/home/DynamicHero';
import { TrendingNews } from '@/components/news/TrendingNews';
import { LatestNewsSection } from '@/components/news/LatestNewsSection';
import { ImageCarousel } from '@/components/gallery/ImageCarousel';
import { MovementTimeline } from '@/components/timeline/MovementTimeline';
import { MissionSection } from '@/components/home/MissionSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { FAQSection } from '@/components/home/FAQSection';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreakingTicker />
      <DynamicHero />
      
      {/* Trending News Section */}
      <div className="bg-[#F8F7F3] pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingNews />
        </div>
      </div>

      <LatestNewsSection />
      <ImageCarousel />
      <MovementTimeline />
      <MissionSection />
      <ProcessSection />
      <StatsSection />
      <FeatureGrid />
      <FAQSection />
      <Testimonials />
    </div>
  );
}
