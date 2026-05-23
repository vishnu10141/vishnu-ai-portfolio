'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, GraduationCap } from 'lucide-react';

interface TimelineItem {
  period: string;
  role: string;
  org: string;
  location?: string;
  highlights: string[];
  type: 'work' | 'education';
}

const timeline: TimelineItem[] = [
  {
    period: 'May 2025 – Jul 2025',
    role: 'Machine Learning Research Intern',
    org: 'Defence Research & Development Organisation (DRDO)',
    location: 'Hyderabad',
    highlights: [
      'Built radar signal segmentation pipeline (50K+ samples) using XGBoost, RF, SVM → +18% accuracy',
      'Designed anomaly detection system → reduced false positives by 25% in noisy environments',
      'Optimized inference by 30% using PCA and efficient NumPy/Pandas pipelines',
    ],
    type: 'work',
  },
  {
    period: 'Jan 2025 – Apr 2025',
    role: 'NLP Research Intern',
    org: 'International Institute of Information Technology (IIIT Hyderabad)',
    location: 'Hyderabad',
    highlights: [
      'Built 100K+ annotated Telugu dataset → improved NLP performance by 12%',
      'Reduced dataset noise by 40% using automated data pipelines and validation',
      'Collaborated with research team on multilingual NLP models',
    ],
    type: 'work',
  },
  {
    period: '2022 – 2026',
    role: 'B.E. Computer Science & Engineering',
    org: 'Matrusri Engineering College (Osmania University)',
    location: 'Hyderabad',
    highlights: [
      'CGPA: 7.4/10',
      'Relevant Coursework → Machine Learning, Data Structures, Computer Vision, NLP',
    ],
    type: 'education',
  },
];

const dotColor = {
  work: 'bg-blue-400',
  education: 'bg-violet-400',
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-28 bg-[#020817]">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-width max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400"
          >
            JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">Experience</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-10">
          {/* Vertical line */}
          <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/30 via-white/[0.06] to-transparent" />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-8 sm:-left-10 top-6 w-2.5 h-2.5 rounded-full ${dotColor[item.type]} ring-4 ring-[#020817] z-10`} />

                <div className="rounded-2xl p-4 sm:p-5 bg-[#081120]/70 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium tracking-wide mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                    {item.location && (
                      <>
                        <span className="text-white/10">·</span>
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-[15px] font-bold text-white mb-0.5 tracking-tight">{item.role}</h3>
                  <p className="text-[13px] font-medium text-blue-400/80 mb-3">{item.org}</p>

                  <ul className="space-y-1">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-400 leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500/50" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
