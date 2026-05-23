'use client';

import { motion } from 'framer-motion';
import { Box, Code2, LineChart, Cloud, Lightbulb, Puzzle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const focusAreas = [
  {
    title: 'AI & ML Solutions',
    description: 'Building intelligent models that learn, adapt, and deliver measurable results.',
    icon: Box,
    linkText: 'Explore AI Work',
    href: '#projects',
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end web applications using modern technologies and best practices.',
    icon: Code2,
    linkText: 'Explore Projects',
    href: '#projects',
  },
  {
    title: 'Data Science',
    description: 'Turning raw data into insightful visualizations and actionable knowledge.',
    icon: LineChart,
    linkText: 'Explore Analytics',
    href: '#projects',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deploying scalable solutions with CI/CD, Docker, and cloud platforms.',
    icon: Cloud,
    linkText: 'Explore DevOps',
    href: '#skills',
  },
  {
    title: 'Research & Innovation',
    description: 'Exploring new ideas and building solutions for real-world challenges.',
    icon: Lightbulb,
    linkText: 'Explore Research',
    href: '#experience',
  },
  {
    title: 'Problem Solving',
    description: 'Lover of challenges and building optimized solutions that scale.',
    icon: Puzzle,
    linkText: 'Explore Solutions',
    href: '#experience',
  },
];

export default function EngineeringFocus() {
  return (
    <section className="w-full relative z-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#020611] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 transition-colors group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/5 flex items-center justify-center shrink-0 mb-5 group-hover:bg-green-500/10 transition-colors">
                  <Icon className="w-6 h-6 text-green-500" />
                </div>
                
                <h3 className="text-[17px] font-bold text-slate-100 mb-3">{area.title}</h3>
                
                <p className="text-[13px] text-slate-400 leading-relaxed mb-6 flex-grow">
                  {area.description}
                </p>

                <Link 
                  href={area.href}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-green-500 hover:text-green-400 transition-colors mt-auto w-fit"
                >
                  {area.linkText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
