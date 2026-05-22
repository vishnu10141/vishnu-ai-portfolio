'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Rocket, Users, User } from 'lucide-react';
import dynamic from 'next/dynamic';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

function ProfileGraphic() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[450px] aspect-square mx-auto flex items-center justify-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-violet-500/20 blur-[100px] rounded-full" />
      
      {/* Concentric Circles */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[var(--color-blue-500)]/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
      <div className="absolute inset-8 rounded-full border border-[var(--color-cyan-500)]/10" />
      <div className="absolute inset-16 rounded-full border border-[var(--color-violet-500)]/10" />
      
      {/* Decorator Dots */}
      <div className="absolute top-[10%] left-[20%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
      <div className="absolute bottom-[15%] right-[15%] w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
      <div className="absolute top-[30%] right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
      
      {/* Profile Image Placeholder */}
      <div className="relative z-10 w-[75%] h-[75%] rounded-full border border-[var(--color-blue-500)]/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-[#0a1020] p-3 overflow-hidden group">
        <div className="absolute inset-0 rounded-full border border-[var(--color-blue-400)]/20 m-3 pointer-events-none z-20" />
        
        {/* Replace the content of this div with an <img> tag once you have your photo! */}
        <div className="w-full h-full rounded-full bg-[#060d1f] flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
          <User className="w-20 h-20 text-slate-700/50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-500/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-xs font-semibold text-blue-300 tracking-[0.2em] uppercase">Your Photo</span>
            <span className="text-[10px] text-blue-300/70 mt-1">Replace in HeroSection.tsx</span>
          </div>
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
            className="text-[var(--color-text-secondary)] text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            I build intelligent systems that solve real-world problems. My work spans machine learning, deep learning, and full-stack development — from research and experimentation to scalable real-world deployments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 pt-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <Code2 className="w-4 h-4 text-[var(--color-blue-400)]" />
              <span className="text-[13px] text-[var(--color-text-secondary)]">Clean Code</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <Brain className="w-4 h-4 text-[var(--color-violet-400)]" />
              <span className="text-[13px] text-[var(--color-text-secondary)]">AI & ML</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <Rocket className="w-4 h-4 text-[var(--color-cyan-400)]" />
              <span className="text-[13px] text-[var(--color-text-secondary)]">Build & Deploy</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <Users className="w-4 h-4 text-[var(--color-emerald-400)]" />
              <span className="text-[13px] text-[var(--color-text-secondary)]">Impact First</span>
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
