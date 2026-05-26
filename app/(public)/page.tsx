import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import EngineeringFocus from '@/components/home/EngineeringFocus';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';

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
      <ExperienceTimeline />
    </>
  );
}
