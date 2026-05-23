import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import EngineeringFocus from '@/components/home/EngineeringFocus';
import SkillsSection from '@/components/home/SkillsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Home | AI Engineer Portfolio',
  description:
    'Personal AI engineer portfolio — explore practical machine learning systems and deployment-ready engineering projects.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EngineeringFocus />
      <FeaturedProjects />
      
      {/* Container for Experience & Skills side-by-side on desktop */}
      <div className="container-width py-28 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 relative bg-[#020817]">
        {/* Subtle top divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <ExperienceTimeline />
        <SkillsSection />
      </div>
      <ContactSection />
    </>
  );
}
