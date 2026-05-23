'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const techStack = [
  { name: 'Python', icon: 'P', color: '#3776AB' },
  { name: 'TensorFlow', icon: 'T', color: '#FF6F00' },
  { name: 'PyTorch', icon: 'P', color: '#EE4C2C' },
  { name: 'OpenCV', icon: 'O', color: '#5C3EE8' },
  { name: 'scikit-learn', icon: 'S', color: '#F7931E' },
  { name: 'Keras', icon: 'K', color: '#D00000' },
  { name: 'React', icon: 'R', color: '#61DAFB' },
  { name: 'Node.js', icon: 'N', color: '#339933' },
  { name: 'AWS', icon: 'A', color: '#FF9900' },
  { name: 'Docker', icon: 'D', color: '#2496ED' },
];

export default function HeroSection() {
  return (
    <section id="hero" className="w-full min-h-screen flex flex-col pt-32 pb-8 relative overflow-hidden bg-[#050810]">
      
      {/* Background Decorative Dotted Grid (Right Side) */}
      <div className="absolute top-[10%] right-[0%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      {/* Ambient background glow */}
      <div className="absolute top-[30%] right-[15%] w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Left: Text Content */}
        <div className="space-y-8 text-left lg:w-[55%] max-w-2xl">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-bold tracking-widest uppercase text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              AI Engineer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white block">NIMMAKAYALA</span>
            <span className="text-emerald-500 block">VISHNU</span>
          </motion.h1>

          <motion.h2 
            {...fadeUp(0.2)}
            className="text-xl sm:text-2xl xl:text-3xl text-slate-200 font-medium leading-snug max-w-xl"
          >
            Building <span className="text-emerald-400">intelligent systems</span> that solve real-world problems.
          </motion.h2>

          <motion.div
            {...fadeUp(0.3)}
            className="text-slate-400 text-[16px] sm:text-[18px] max-w-xl leading-relaxed flex flex-col gap-6"
          >
            <p>
              AI Engineer specializing in Machine Learning, Deep Learning, NLP, Computer Vision, and Full Stack Development.
            </p>
            <p>
              I transform ideas into scalable, efficient, and impactful solutions.
            </p>
          </motion.div>
        </div>

        {/* Right: Sci-Fi Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center relative w-full lg:w-[45%] pt-10 lg:pt-0"
        >
          {/* Main Image Container */}
          <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center">
            
            {/* Neon Green Ring with a gap */}
            <svg className="absolute inset-0 w-full h-full rotate-[-45deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="220 80" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </svg>

            {/* Profile Picture */}
            <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden bg-[#050810]">
              <Image
                src="/images/profile.jpg"
                alt="Nimmakayala Vishnu"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating "Available for Work" Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute right-[-10px] md:right-[-40px] top-[15%] bg-[#050810]/95 backdrop-blur-xl border border-white/[0.04] rounded-[16px] p-4 shadow-2xl z-20 w-[240px]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[13px] font-bold text-white tracking-wide">Available for Work</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed font-medium">
                Open to exciting opportunities
              </p>
              <Link href="#contact" className="group flex items-center justify-between w-full text-emerald-500 text-[13px] font-bold transition-colors">
                Hire Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          {/* Location Pin */}
          <div className="mt-8">
            <div className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#050810] border border-white/[0.04] shadow-lg">
              <MapPin className="w-[14px] h-[14px] text-emerald-500" />
              <span className="text-slate-300 text-[12px] font-medium tracking-wide">Hyderabad, India</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Tech Stack Banner & FAB */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-auto pt-16 mb-4 relative z-20">
        <div className="flex items-end lg:items-center justify-between gap-6">
          
          {/* Tech Stack Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex-1 w-full bg-[#050810] border border-white/[0.04] rounded-[16px] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 shadow-2xl overflow-hidden"
          >
            <div className="shrink-0 flex items-center gap-6">
              <span className="text-[12px] font-bold tracking-[0.2em] text-slate-300 uppercase">Tech Stack</span>
              <div className="hidden lg:block w-[1px] h-8 bg-white/10" />
            </div>
            <div className="flex-1 overflow-hidden relative flex items-center py-1">
              {/* Subtle gradient fades for the edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#050810] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050810] to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-8 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {/* Double the array for seamless scrolling */}
                {[...techStack, ...techStack].map((tech, i) => (
                  <TechLogo key={i} name={tech.name} color={tech.color} icon={tech.icon} />
                ))}
              </div>
            </div>
            
            <Link href="#skills" className="shrink-0 relative z-20 text-[12px] font-bold text-emerald-500 whitespace-nowrap hover:text-emerald-400 transition-colors ml-auto lg:ml-0">
              + More
            </Link>
          </motion.div>

          {/* Floating Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="shrink-0"
          >
            <Link 
              href="#contact" 
              className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <Briefcase className="w-[22px] h-[22px] text-white" fill="white" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechLogo({ name, color, icon }: { name: string, color: string, icon: string }) {
  return (
    <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0">
      <div className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center font-bold text-[10px]" style={{ color: 'white', backgroundColor: color }}>
        {icon}
      </div>
      <span className="text-[13px] font-medium text-slate-300">{name}</span>
    </div>
  );
}
