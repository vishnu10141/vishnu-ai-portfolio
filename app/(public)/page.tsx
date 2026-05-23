import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AboutSection from '@/components/home/AboutSection';
export const metadata: Metadata = {
  title: 'Home | AI Engineer Portfolio',
  description:
    'Personal AI engineer portfolio — explore practical machine learning systems and deployment-ready engineering projects.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <ExperienceTimeline />
    </>
  );
}
