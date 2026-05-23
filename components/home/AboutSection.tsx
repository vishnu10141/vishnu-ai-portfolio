'use client';

import { motion } from 'framer-motion';
import { Eye, Brain, Microscope, Zap, Monitor, Target } from 'lucide-react';

const specializations = [
  { icon: Eye,         title: 'Computer Vision',          desc: 'Building robust image and video processing models for detection and segmentation.',         color: 'text-blue-400   bg-blue-500/10 border-blue-500/20'   },
  { icon: Brain,       title: 'NLP & Language Models',    desc: 'Fine-tuning and deploying large language models for complex text processing.',               color: 'text-cyan-400   bg-cyan-500/10 border-cyan-500/20'   },
  { icon: Microscope,  title: 'Medical AI',               desc: 'Applying deep learning to medical imaging and clinical data analysis.',                     color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  { icon: Zap,         title: 'Anomaly Detection',        desc: 'Developing resilient systems to identify outliers in high-noise environments.',              color: 'text-blue-400   bg-blue-500/10 border-blue-500/20'   },
  { icon: Monitor,     title: 'Full Stack AI Systems',    desc: 'Engineering end-to-end applications that serve complex AI models to users.',                 color: 'text-cyan-400   bg-cyan-500/10 border-cyan-500/20'   },
  { icon: Target,      title: 'Applied Machine Learning', desc: 'Solving real-world engineering problems with structured and unstructured data.',              color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 relative bg-[#020817]">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400"
          >
            WHAT I DO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">Core </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Specializations</span>
          </motion.h2>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="specializations">
          {specializations.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-start gap-3 p-4 rounded-2xl bg-[#081120]/70 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
              >
                <div className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center ${item.color} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white mb-0.5 tracking-tight">{item.title}</h4>
                  <p className="text-[12px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
