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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-medium transition-colors"
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
          className="flex justify-end"
        >
          <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/[0.05]">
            <Image
              src="/images/profile.jpg"
              alt="Nimmakayala Vishnu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
