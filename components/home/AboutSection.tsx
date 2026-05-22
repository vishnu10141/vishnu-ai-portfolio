'use client';

import { motion } from 'framer-motion';
import { Brain, Microscope, Zap, BarChart3, Users, Globe, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

// For animated counter
function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

const researchInterests = [
  { icon: Brain,       title: 'Large Language Models',   desc: 'Efficient fine-tuning, alignment, and emergent capabilities of LLMs.',         color: 'blue'   },
  { icon: Microscope,  title: 'Medical AI',              desc: 'Applying deep learning to medical imaging, diagnosis, and drug discovery.',      color: 'cyan'   },
  { icon: Zap,         title: 'Efficient Inference',     desc: 'Model compression, quantization, and hardware-aware neural architecture.',       color: 'violet' },
  { icon: BarChart3,   title: 'Multimodal Learning',     desc: 'Cross-modal representations bridging vision, language, audio, and sensors.',     color: 'blue'   },
  { icon: Users,       title: 'Human-AI Interaction',    desc: 'Designing systems where AI and humans collaborate effectively and safely.',       color: 'cyan'   },
  { icon: Globe,       title: 'AI for Climate',          desc: 'Using machine learning to model climate systems and optimize energy systems.',     color: 'violet' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   text: 'text-blue-300',   icon: 'text-blue-400'   },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   text: 'text-cyan-300',   icon: 'text-cyan-400'   },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-300', icon: 'text-violet-400' },
};

const ORBIT_ICONS = [
  { id: 'icon-brain',      Icon: Brain,      left: '95%',   top: '50%',    animDur: '4s', animDelay: '0s'   },
  { id: 'icon-micro',      Icon: Microscope, left: '27.5%', top: '88.97%', animDur: '5s', animDelay: '0.5s' },
  { id: 'icon-zap',        Icon: Zap,        left: '27.5%', top: '11.03%', animDur: '6s', animDelay: '1s'   },
];

function OrbitalVisuals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative aspect-square rounded-full flex items-center justify-center opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="relative aspect-square rounded-full flex items-center justify-center animate-fade-up">
      
      {/* Animated rings */}
      <div className="absolute inset-4 rounded-full border border-blue-500/10 animate-spin-slow" />
      <div 
        className="absolute inset-10 rounded-full border border-cyan-400/10 animate-spin-slow" 
        style={{ animationDuration: '20s', animationDirection: 'reverse' }} 
      />
      
      {/* Center 'AI' Graphic */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-br from-[rgba(59,130,246,0.3)] via-transparent to-[rgba(139,92,246,0.3)] border border-white/10 backdrop-blur-xl animate-float shadow-[0_0_50px_rgba(59,130,246,0.15)] z-10">
        <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden relative border border-white/10 shadow-inner">
          
          {/* Subtle Grid Background inside circle */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]" />
          
          {/* AI Text Wrapper to prevent clipping */}
          <div className="relative flex items-center justify-center z-10 pr-2">
            {/* The Text */}
            <span 
              className="text-[110px] sm:text-[130px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-blue-600 relative z-10"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              AI
            </span>
            
            {/* The Glow */}
            <span 
              className="absolute text-[110px] sm:text-[130px] font-black tracking-tight text-blue-500 blur-[30px] opacity-60 pointer-events-none select-none"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              AI
            </span>
          </div>
          
        </div>
      </div>

      {/* Orbiting Tech Icons */}
      {ORBIT_ICONS.map(({ id, Icon, left, top, animDur, animDelay }) => (
        <div
          key={id}
          className="absolute w-12 h-12 rounded-2xl bg-[#060d1f]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-blue-400 shadow-xl z-20 animate-float"
          style={{
            left,
            top,
            transform: 'translate(-50%,-50%)',
            animationDuration: animDur,
            animationDelay: animDelay,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-40 sm:pt-32 sm:pb-56 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[#020817]" />
      {/* Soft ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative container-width">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24">
          
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20">
                About Me
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Building AI that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">matters</span>
              </h2>
            </div>

            <div className="space-y-5 text-slate-400 leading-relaxed text-lg font-light">
              <p>
                I&apos;m a researcher and engineer at the intersection of academic AI and real-world impact.
                My work spans from fundamental ML theory to deploying models that serve millions of users.
              </p>
              <p>
                I believe the best AI systems are those that are not only technically rigorous but also
                interpretable, efficient, and built with human values in mind.
              </p>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: 'Papers',  value: 5,   suffix: '+' },
                { label: 'Stars',   value: 2000,suffix: '+' },
                { label: 'Models',  value: 8,   suffix: '+' },
                { label: 'Citations',value: 200,suffix: '+' },
              ].map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/5 group-hover:to-cyan-400/5 rounded-2xl transition-colors duration-300" />
                  <div
                    className="text-2xl font-bold text-white mb-1 tracking-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    <AnimatedCounter value={h.value} suffix={h.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Refined Portrait visual */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 flex-shrink-0">
            <OrbitalVisuals />
          </div>
        </div>

        {/* Research interests */}
        <div className="pt-24 pb-12">
          <div className="text-center mb-16 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3"
            >
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-cyan-500)]/50" />
              <div className="flex items-center gap-2 text-[var(--color-cyan-400)] text-xs font-semibold tracking-[0.2em] uppercase">
                RESEARCH INTERESTS
              </div>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-cyan-500)]/50" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              <span className="text-white">Research </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">
                Interests
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="research">
            {researchInterests.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-[#0a1020] rounded-2xl p-6 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(59,130,246,0.2)] transition-all duration-300 flex items-start gap-5"
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <item.icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
