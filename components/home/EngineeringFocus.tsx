'use client';

import { motion } from 'framer-motion';
import { Box, Rocket, Zap, Layers, Globe } from 'lucide-react';

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
];

export default function EngineeringFocus() {
  return (
    <div className="h-full flex flex-col justify-center">
      <h2 className="text-[18px] sm:text-xl font-bold text-white mb-10 tracking-tight">What I Care About</h2>
      
      <div className="flex flex-col gap-8">
        {FOCUS_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-400">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
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
    </div>
  );
}
