'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowRight, ExternalLink, CheckCircle2, Rocket } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

const projects = [
  {
    id: '01',
    title: 'DRDO Project',
    tags: ['Radar Systems', 'Anomaly Detection', 'Surveillance'],
    description: 'Real-time radar data processing and anomaly detection using Radar ID 11 (CV1) and Radar ID 20 (BCPV).',
    features: ['Real-time Tracking', 'Anomaly Detection', 'Multi-Radar Fusion'],
    image: '/images/radar_ui.png',
    link: '#',
    github: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-500">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: '02',
    title: 'LLM Project',
    tags: ['NLP', 'Transformers', 'Generative AI'],
    description: 'Custom LLM chatbot with memory, context handling, and document Q&A for intelligent conversations.',
    features: ['LangChain', 'OpenAI API', 'ChromaDB', 'Streamlit'],
    image: '/images/nlp_dashboard.png',
    link: '#',
    github: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-500">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5ZM12 18.5C9.79 18.5 7.85 17.3 6.78 15.48C6.82 13.75 10.26 12.8 12 12.8C13.74 12.8 17.18 13.75 17.22 15.48C16.15 17.3 14.21 18.5 12 18.5Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: '03',
    title: 'Brain Tumor Segmentation',
    tags: ['Deep Learning', 'Medical Imaging', 'U-Net'],
    description: 'Automated brain tumor detection and segmentation from MRI scans using U-Net and attention mechanisms.',
    features: ['PyTorch', 'U-Net', 'MRI Scans', 'Segmentation'],
    image: '/images/brain_3d.png',
    link: '#',
    github: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-500">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4 16.05 4 12C4 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 20 7.95 20 12C20 16.05 16.95 19.43 13 19.93V4.07Z" fill="currentColor"/>
      </svg>
    )
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full pt-20 pb-20 relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-green-500">MY WORK</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">My Projects</h2>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              A selection of impactful projects combining AI, engineering, and innovation to solve real-world problems.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full bg-[#040812] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>
            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-between gap-3 bg-[#040812] border border-white/10 rounded-xl py-3 px-4 text-[13px] text-slate-300 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <span>Latest</span>
                </div>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-slate-500">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#020611] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-green-500/20 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-[#040812] border border-white/5 flex items-center justify-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col px-2">
                
                {/* Title & Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/5 border border-green-500/20 flex items-center justify-center shrink-0">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {project.tags.map((tag, i) => (
                    <div key={tag} className="flex items-center">
                      <span className="text-[11px] font-semibold text-green-500">{tag}</span>
                      {i < project.tags.length - 1 && (
                        <span className="mx-1.5 text-green-500/40 text-[10px]">●</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.features.map(feature => (
                    <div key={feature} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <span className="text-[11px] text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <Link 
                    href={project.link}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-500/20 text-[13px] font-semibold text-green-500 hover:bg-green-500/5 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-[13px] font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-500" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#020611] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-500/5 border border-green-500/20 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-[15px] font-medium text-slate-200">
              Have an idea? Let's build something amazing together.
            </p>
          </div>
          <Link 
            href="#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-green-500/20 text-[14px] font-semibold text-green-500 hover:bg-green-500/5 transition-colors shrink-0 whitespace-nowrap w-full md:w-auto"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
