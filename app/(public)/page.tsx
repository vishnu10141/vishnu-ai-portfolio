import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import AboutSection from '@/components/home/AboutSection';
export const metadata: Metadata = {
  title: 'Home | AI Research Portfolio',
  description:
    'Personal AI research portfolio — explore machine learning projects, publications, and experiments.',
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
