'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

// Lazy load the heavy 3D and SVG visual components (disabling SSR)
const RadarVisual = dynamic(() => import('./visuals/RadarVisual'), { ssr: false });
const LLMVisual = dynamic(() => import('./visuals/LLMVisual'), { ssr: false });
const BrainVisual = dynamic(() => import('./visuals/BrainVisual'), { ssr: false });

const projects = [
  {
    id: '01',
    title: 'DRDO Radar Anomaly Detection',
    subtitle: 'Defense & Aerospace AI',
    description: 'Real-time radar signal processing and anomaly detection for clutter-heavy defense environments. Optimized for multi-target tracking and signal distortion filtering.',
    achievements: [
      'Reduced false positives by 25% using XGBoost & SVM.',
      'Deployed real-time inference under restricted environments.'
    ],
    Visual: RadarVisual,
    link: '#',
    github: '#',
    align: 'left' // Visual on left, text on right
  },
  {
    id: '02',
    title: 'Telugu LLM Pipeline',
    subtitle: 'Multilingual Foundation Models',
    description: 'Production-grade large language model engineering focused on processing and generating Telugu tokens. Built with contextual memory and advanced RAG capabilities.',
    achievements: [
      'Engineered a 100K+ annotated Telugu dataset pipeline.',
      'Improved regional language NLP performance by 12%.'
    ],
    Visual: LLMVisual,
    link: '#',
    github: '#',
    align: 'right' // Text on left, visual on right
  },
  {
    id: '03',
    title: 'Brain Tumor Segmentation',
    subtitle: 'Healthcare & Medical Imaging',
    description: 'End-to-end 3D medical imaging system utilizing U-Net and attention mechanisms to automatically detect and segment brain tumors from raw MRI scans.',
    achievements: [
      'Achieved a Dice score of 0.87, outperforming baselines.',
      'Integrated MONAI for scalable distributed training.'
    ],
    Visual: BrainVisual,
    link: '#',
    github: '#',
    align: 'left'
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full py-32 relative z-20 bg-[var(--color-bg-base)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-blue-500">FEATURED WORK</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Engineered for <br/> Production.
          </motion.h2>
        </div>

        {/* Projects Stack */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, idx) => {
            const VisualComponent = project.Visual;
            const isLeft = project.align === 'left';
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
              >
                {/* Visual Side */}
                <div className={`w-full lg:w-[55%] h-[400px] lg:h-[550px] relative rounded-3xl overflow-hidden bg-[#050814] border border-white/5 shadow-2xl ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Glass reflections & hovering elevation effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
                  <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Lazy Loaded Visual */}
                  <VisualComponent />
                </div>

                {/* Text Side */}
                <div className={`w-full lg:w-[45%] flex flex-col justify-center ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-blue-500 font-mono text-sm">{project.id}</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium mb-8">
                    {project.subtitle}
                  </p>
                  
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                    {project.description}
                  </p>

                  <div className="mb-12 space-y-4">
                    {project.achievements.map((achieve, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <p className="text-slate-300 text-[15px] leading-relaxed">{achieve}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto">
                    <Link 
                      href={project.link}
                      className="group/btn inline-flex items-center gap-2 text-[15px] font-medium text-white transition-colors"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 text-blue-500 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-500 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
