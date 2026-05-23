'use client';

import { motion } from 'framer-motion';
import { Box, Rocket, Zap, Layers, Globe, Code2 } from 'lucide-react';

const FOCUS_AREAS = [
  {
    icon: Box,
    title: 'Scalable ML Systems',
    description: 'Designing robust, scalable machine learning systems.',
  },
  {
    icon: Rocket,
    title: 'Production Deployment',
    description: 'Building and deploying models in production.',
  },
  {
    icon: Zap,
    title: 'Inference Optimization',
    description: 'Optimizing models for speed, cost, and reliability.',
  },
  {
    icon: Layers,
    title: 'End-to-End Ownership',
    description: 'From data to deployment and monitoring.',
  },
  {
    icon: Globe,
    title: 'Real World Impact',
    description: 'Solving meaningful problems with practical AI.',
  },
  {
    icon: Code2,
    title: 'Full Stack AI',
    description: 'Combining ML, backend, and cloud for real-world apps.',
  },
];

export default function EngineeringFocus() {
  return (
    <section className="w-full pt-16">
      <div className="relative mb-16 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.05]"></div>
        </div>
        <div className="relative px-6" style={{ backgroundColor: 'var(--bg-base, #040812)' }}>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500">ENGINEERING FOCUS</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/[0.05] border-x border-white/[0.05]">
        {FOCUS_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center gap-5 px-6 lg:px-8 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-blue-500">
                  <Icon className="w-8 h-8 stroke-[1.25]" />
                </div>
                <h3 className="text-[14px] font-bold text-slate-200 leading-snug">
                  {area.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </div>
    </section>
  );
}
