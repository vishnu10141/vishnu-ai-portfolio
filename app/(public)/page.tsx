import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
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
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <ExperienceTimeline />
      <ContactSection />
    </>
  );
}
