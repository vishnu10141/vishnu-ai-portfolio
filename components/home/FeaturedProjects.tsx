'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { subscribeToProjects } from '@/lib/firebase/firestore';
import { Project } from '@/lib/types';

// Lazy load the heavy 3D and SVG visual components (disabling SSR)
const RadarVisual = dynamic(() => import('./visuals/RadarVisual'), { ssr: false });
const LLMVisual = dynamic(() => import('./visuals/LLMVisual'), { ssr: false });
const BrainVisual = dynamic(() => import('./visuals/BrainVisual'), { ssr: false });

const visualMap: Record<string, any> = {
  'radar': RadarVisual,
  'neural': LLMVisual,
  'brain': BrainVisual,
  'llm': LLMVisual,
  'medical': BrainVisual,
  'custom': RadarVisual, // fallback
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((data) => {
      const featured = data.filter(p => p.featured).sort((a, b) => a.order - b.order);
      setProjects(featured);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // Wait for CMS data to render

  return (
    <section id="projects" className="w-full py-32 relative z-20 bg-transparent transition-colors duration-300">
      <div className="container-width">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-blue-500">FEATURED WORK</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Engineered for <span className="gradient-text-blue">Production.</span>
          </motion.h2>
        </div>

        {/* Projects Stack */}
        <div className="space-y-32 md:space-y-40">
          {projects.map((project, idx) => {
            const VisualComponent = visualMap[project.visualType] || RadarVisual;
            const isLeft = idx % 2 === 0;
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between"
              >
                {/* Visual Side */}
                <div className={`w-full lg:w-[50%] h-[400px] lg:h-[550px] relative rounded-[32px] overflow-hidden bg-[var(--color-bg-elevated)] border border-blue-500/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Glass reflections & hovering elevation effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[32px] group-hover:ring-blue-500/30 transition-colors duration-700" />
                  <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Lazy Loaded Visual */}
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-1000 ease-out">
                    <VisualComponent />
                  </div>
                </div>

                {/* Text Side */}
                <div className={`w-full lg:w-[45%] flex flex-col justify-center ${isLeft ? 'lg:order-2 text-left' : 'lg:order-1 lg:text-right'}`}>
                  <div className={`mb-4 flex items-center gap-4 ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                    <span className="text-blue-500 font-mono text-sm font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="h-px w-16 bg-blue-500/30" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                    {project.title}
                  </h3>
                  <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-8">
                    {project.category}
                  </p>
                  
                  <div className={`text-slate-400 text-base md:text-lg leading-relaxed mb-10 ${isLeft ? '' : 'lg:ml-auto'}`}>
                    <p>{project.description}</p>
                  </div>

                  <div className={`mb-12 space-y-4 ${isLeft ? '' : 'lg:ml-auto'}`}>
                    {project.metrics && project.metrics.map((achieve, i) => (
                      <div key={i} className={`flex items-start gap-4 ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        <p className="text-slate-300 text-[15px] leading-relaxed">{achieve}</p>
                      </div>
                    ))}
                  </div>

                  <div className={`flex items-center gap-6 mt-auto ${isLeft ? '' : 'lg:justify-end'}`}>
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-[14px] font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-500 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        GitHub
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
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
