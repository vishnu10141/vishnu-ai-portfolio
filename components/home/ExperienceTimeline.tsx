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
    <div className="w-full">
      <h2 className="text-[18px] sm:text-xl font-bold text-white mb-10 tracking-tight">Experience</h2>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8">
        {/* Vertical line */}
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-white/[0.08]" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-2 h-2 rounded-full bg-slate-400 ring-4 ring-[#020817] z-10" />

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                {/* Meta Column */}
                <div className="flex flex-col">
                  <span className="text-[12px] text-slate-500 font-medium mb-1.5">{item.period}</span>
                  <h3 className="text-[14px] font-bold text-slate-200 tracking-tight leading-snug">{item.role}</h3>
                  <span className="text-[13px] font-medium text-blue-400 mt-1">{item.org}</span>
                </div>

                {/* Description Column */}
                <div className="text-[13px] text-slate-400 leading-relaxed pt-0 md:pt-1 space-y-1">
                  {item.highlights.map((highlight, idx) => (
                    <p key={idx}>{highlight}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-10">
        <a href="/resume.pdf" target="_blank" className="text-[13px] font-semibold text-blue-400 hover:text-white transition-colors flex items-center gap-1">
          View Full Experience <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
