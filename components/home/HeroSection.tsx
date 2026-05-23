'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function HeroSection() {
  return (
    <section id="hero" className="w-full flex items-center pt-32 pb-16 relative overflow-hidden">
      
      {/* Background Decorative Waves (Abstract) */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 -translate-y-1/2 bg-[url('/wave-pattern.svg')] opacity-5 pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 right-0 w-1/3 h-1/2 -translate-y-1/2 bg-[url('/wave-pattern.svg')] opacity-5 pointer-events-none mix-blend-screen scale-x-[-1]" />
      
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left: Text Content */}
        <div className="space-y-6 text-left flex flex-col justify-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-[11px] font-bold tracking-[0.1em] uppercase text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              AI Engineer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">NIMMAKAYALA{'\n'}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              VISHNU
            </span>
          </motion.h1>

          <motion.h2 
            {...fadeUp(0.2)}
            className="text-xl sm:text-2xl text-slate-300 font-medium leading-snug max-w-xl"
          >
            Building <span className="text-green-400">intelligent systems</span> that solve real-world problems.
          </motion.h2>

          <motion.p
            {...fadeUp(0.3)}
            className="text-slate-400 text-[15px] sm:text-[16px] max-w-[500px] leading-relaxed flex flex-col gap-3"
          >
            <span>
              AI Engineer specializing in Machine Learning, Deep Learning, NLP, Computer Vision, and Full Stack Development.
            </span>
            <span>
              I transform ideas into scalable, efficient, and impactful solutions.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-green-500 hover:bg-green-400 text-[#020611] text-[15px] font-bold transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-medium text-white border border-white/[0.15] hover:bg-white/[0.03] transition-colors"
            >
              Download Resume
              <Download className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: Sci-Fi Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center relative pt-10 lg:pt-0"
        >
          {/* Main Image Container */}
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] flex items-center justify-center">
            
            {/* Sci-Fi Segmented Rings */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="60 40 10 40 30 120" />
            </svg>
            <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(74, 222, 128, 0.1)" strokeWidth="1" strokeDasharray="10 30" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Static thicker border segments */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="120 40 40 40" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </svg>

            {/* Glowing Orbs on Rings */}
            <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
            <div className="absolute bottom-1/4 right-8 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />

            {/* Connecting Lines (Decorative) */}
            <div className="absolute left-[-50px] top-1/2 w-[50px] h-px bg-gradient-to-l from-green-500/50 to-transparent" />
            <div className="absolute right-[-100px] top-[40%] w-[100px] h-px bg-gradient-to-r from-green-500/50 to-transparent" />
            
            {/* Profile Picture */}
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border border-green-500/20 bg-[#020611] p-1">
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

            {/* Floating "Hire Me" Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute right-[-20px] md:right-[-40px] top-[20%] bg-[#020611]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl z-20 w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[12px] font-semibold text-slate-200">Available for Work</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-tight">
                Open to exciting opportunities
              </p>
              <Link href="#contact" className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-lg border border-green-500/30 text-green-400 hover:bg-green-500/10 text-[11px] font-medium transition-colors">
                Hire Me
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>

          </div>
          
          {/* Location Pin */}
          <div className="text-center mt-6">
            <p className="text-slate-400 text-sm flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-500" />
              Andhra Pradesh, India
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
