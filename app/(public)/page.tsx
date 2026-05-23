import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import EngineeringFocus from '@/components/home/EngineeringFocus';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import ContactFooter from '@/components/home/ContactFooter';

export const metadata: Metadata = {
  title: 'Home | AI Engineer Portfolio',
  description:
    'Personal AI engineer portfolio — explore practical machine learning systems and deployment-ready engineering projects.',
};

export default function HomePage() {
  return (
    <div className="bg-[#020817] min-h-[calc(100vh-80px)]">
      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1800px] mx-auto border-l border-r border-white/[0.05]">
        
        {/* Top Left: Hero */}
        <div className="p-8 lg:p-16 border-b border-white/[0.05] lg:border-r">
          <HeroSection />
        </div>

        {/* Top Right: Focus */}
        <div className="p-8 lg:p-16 border-b border-white/[0.05]">
          <EngineeringFocus />
        </div>

        {/* Bottom Left: Experience */}
        <div className="p-8 lg:p-16 border-b lg:border-b-0 border-white/[0.05] lg:border-r">
          <ExperienceTimeline />
        </div>

        {/* Bottom Right: Footer/Contact */}
        <div className="p-8 lg:p-16">
          <ContactFooter />
        </div>
        
      </div>
    </div>
  );
}
