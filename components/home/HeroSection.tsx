'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 100, damping: 20, duration: 0.8, delay },
});

export default function HeroSection() {
  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden bg-transparent">
      
      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-width relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start max-w-3xl">
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-blue-400">
              AI & ML Engineer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl sm:text-7xl xl:text-[6rem] font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white block drop-shadow-xl">NIMMAKAYALA</span>
            <span className="gradient-text-blue block drop-shadow-2xl">VISHNU</span>
          </motion.h1>

          <motion.h2 
            {...fadeUp(0.3)}
            className="text-xl sm:text-2xl xl:text-3xl text-slate-200 font-medium leading-snug max-w-2xl"
          >
            Building <span className="text-blue-400">intelligent systems</span> that solve complex real-world problems.
          </motion.h2>

          <motion.div
            {...fadeUp(0.4)}
            className="text-slate-400 text-[16px] sm:text-[18px] max-w-xl leading-relaxed flex flex-col gap-4 text-center lg:text-left"
          >
            <p>
              Transforming cutting-edge AI research into scalable, production-ready engineering solutions. Specializing in Deep Learning, Computer Vision, and Full Stack architecture.
            </p>
          </motion.div>

        </div>

        {/* Right: Premium Cinematic Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center relative w-full max-w-[500px]"
        >
          {/* Main Image Container */}
          <div className="group relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center">
            
            {/* Cinematic Outer Glow Rings */}
            <svg className="absolute inset-0 w-full h-full rotate-[-45deg] animate-[spin-slow_30s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="180 140" strokeLinecap="round" className="drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
            </svg>
            <svg className="absolute inset-0 w-full h-full rotate-[135deg] animate-[spin-slow_45s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="100 220" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </svg>

            {/* Profile Picture */}
            <div className="relative w-[88%] h-[88%] rounded-full overflow-hidden bg-[var(--color-bg-base)] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)] z-10">
              <Image
                src="/images/profile.jpg"
                alt="Nimmakayala Vishnu"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 mix-blend-multiply" />
            </div>

            {/* Floating Location Card */}
            <motion.div 
              className="absolute -bottom-4 right-[10%] glass border-blue-500/30 rounded-2xl p-3 px-5 shadow-2xl z-20 flex items-center gap-3 animate-float"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</span>
                <span className="text-[13px] font-medium text-white">Hyderabad, IN</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
