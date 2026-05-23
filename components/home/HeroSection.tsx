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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#020817]">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-width py-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Text Content */}
          <div className="space-y-7 text-center lg:text-left">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-400 bg-blue-500/[0.08] border border-blue-500/[0.12]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                AI Engineer
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <span className="text-white">NIMMAKAYALA{'\n'}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400">
                VISHNU
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-slate-400 text-base lg:text-[17px] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build practical AI systems focused on machine learning, NLP, computer vision, anomaly detection, and deployment-ready applications. My work combines AI engineering, scalable development, and real-world problem solving.
            </motion.p>

            {/* Skill tags */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              {skillPills.map((label, index) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-slate-400">
                    {label}
                  </span>
                  {index < skillPills.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.02, y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 premium-transition"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] premium-transition"
                >
                  Download Resume
                  <Download className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] lg:w-[360px] lg:h-[430px]">
              {/* Subtle ambient box glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-3xl blur-2xl pointer-events-none" />
              
              {/* Clean Image container */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-white/[0.02]">
                <Image
                  src="/images/profile.jpg"
                  alt="Nimmakayala Vishnu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex flex-col items-center gap-2 absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <span className="text-[11px] text-slate-600 tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-slate-600 animate-bounce" style={{ animationDuration: '2s' }} />
        </motion.div>
      </div>
    </section>
  );
}
