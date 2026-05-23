'use client';

import { motion } from 'framer-motion';
import { Brain, Microscope, Zap, BarChart3, Users, Globe, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const specializations = [
  { icon: Globe,       title: 'Computer Vision',          desc: 'Building robust image and video processing models for detection and segmentation.',         color: 'blue'   },
  { icon: Brain,       title: 'NLP & Language Models',    desc: 'Fine-tuning and deploying large language models for complex text processing.',      color: 'cyan'   },
  { icon: Microscope,  title: 'Medical AI',               desc: 'Applying deep learning to medical imaging and clinical data analysis.',       color: 'violet' },
  { icon: Zap,         title: 'Anomaly Detection',        desc: 'Developing resilient systems to identify outliers in high-noise environments.',     color: 'blue'   },
  { icon: Monitor,     title: 'Full Stack AI Systems',    desc: 'Engineering end-to-end applications that serve complex AI models to users.',       color: 'cyan'   },
  { icon: Target,      title: 'Applied Machine Learning', desc: 'Solving real-world engineering problems with structured and unstructured data.',     color: 'violet' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   text: 'text-blue-300',   icon: 'text-blue-400'   },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   text: 'text-cyan-300',   icon: 'text-cyan-400'   },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-300', icon: 'text-violet-400' },
};

import { Monitor, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[#020817]" />
      {/* Soft ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative container-width">
        <div className="max-w-3xl mx-auto mb-24 text-center">
          
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
          </motion.div>
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
                SPECIALIZATIONS
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
              <span className="text-white">Core </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">
                Specializations
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="specializations">
            {specializations.map((item, i) => {
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
