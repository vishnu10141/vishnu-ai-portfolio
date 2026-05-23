'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

const skillPills = [
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Computer Vision',
  'Full Stack AI',
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function HeroSection() {
  return (
    <section id="hero" className="w-full flex items-center pt-28 pb-20 border-b border-white/[0.05]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center w-full">
        
        {/* Left: Text Content */}
        <div className="space-y-8 text-left">
          <motion.div {...fadeUp(0)}>
            <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              AI Engineer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">NIMMAKAYALA{'\n'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
              VISHNU
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-slate-400 text-[15px] sm:text-[17px] max-w-xl leading-relaxed"
          >
            I build practical AI systems focused on machine learning, NLP, computer vision, anomaly detection, and deployment-ready applications. My work combines AI engineering, scalable development, and real-world problem solving.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex items-center gap-4 pt-2"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 text-[14px] font-medium transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-medium text-white border border-white/[0.15] hover:bg-white/[0.03] transition-colors"
            >
              Download Resume
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Inline Skill Text */}
          <motion.div
            {...fadeUp(0.4)}
            className="pt-6 text-[13px] font-medium text-slate-400 flex flex-wrap gap-x-4 gap-y-2 items-center opacity-90"
          >
            {skillPills.map((label, index) => (
              <span key={label} className="flex items-center gap-4">
                {label}
                {index < skillPills.length - 1 && <span className="text-blue-500 text-[10px]">•</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Profile Image (No Rings/Orbits) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center pt-8 lg:pt-0"
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-blue-500 p-1 mb-6" style={{ boxShadow: '0 0 30px var(--accent-glow-strong)' }}>
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Nimmakayala Vishnu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-blue-500 font-semibold text-lg">AI Engineer</h3>
            <p className="text-slate-400 text-sm flex items-center justify-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Andhra Pradesh, India
            </p>
            <div className="pt-2">
              <span className="inline-flex px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full">
                Open to Work
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
