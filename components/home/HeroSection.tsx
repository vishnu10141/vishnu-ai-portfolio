'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Rocket, Users, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

function ProfileGraphic() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[450px] aspect-square mx-auto flex items-center justify-center overflow-hidden rounded-full">
      {/* Very subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-violet-500/10 blur-[80px]" />
      
      {/* Minimal grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      
      {/* Outer elegant ring */}
      <div className="absolute inset-4 rounded-full border border-[var(--color-blue-500)]/10" />
      <div className="absolute inset-12 rounded-full border border-dashed border-[var(--color-violet-500)]/20 animate-spin-slow" style={{ animationDuration: '40s' }} />

      {/* Abstract Center Graphic */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-2xl blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="w-16 h-16 border border-blue-400/30 rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-[#020817]/50 backdrop-blur-sm">
          <div className="w-8 h-8 border border-cyan-400/40 rounded-lg -rotate-45" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020817]">
      <ParticleCanvas />
      
      {/* Background glow behind text */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[var(--color-blue-500)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container-width py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[var(--color-cyan-400)] text-[11px] font-semibold tracking-[0.2em] uppercase">
              ABOUT ME
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="text-white">NIMMAKAYALA </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">
              VISHNU
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            AI Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--color-text-secondary)] text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            I build intelligent systems focused on real-world impact through machine learning, deep learning, NLP, and computer vision. My work combines practical engineering with scalable AI development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 pt-4"
          >
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.03)] hover:bg-[rgba(59,130,246,0.08)] transition-colors">
              <span className="text-xs sm:text-sm text-blue-300 font-medium tracking-wide">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(139,92,246,0.15)] bg-[rgba(139,92,246,0.03)] hover:bg-[rgba(139,92,246,0.08)] transition-colors">
              <span className="text-xs sm:text-sm text-violet-300 font-medium tracking-wide">Deep Learning</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.03)] hover:bg-[rgba(6,182,212,0.08)] transition-colors">
              <span className="text-xs sm:text-sm text-cyan-300 font-medium tracking-wide">NLP</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(16,185,129,0.15)] bg-[rgba(16,185,129,0.03)] hover:bg-[rgba(16,185,129,0.08)] transition-colors">
              <span className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wide">Computer Vision</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="flex-1 w-full"
        >
          <ProfileGraphic />
        </motion.div>
      </div>
    </section>
  );
}
