'use client';

import { motion } from 'framer-motion';
import { Download, Code2, Database, LineChart, Users, Trophy } from 'lucide-react';

interface TimelineItem {
  period: string;
  role: string;
  org: string;
  focusTitle: string;
  focusDesc: string;
  contributionsTitle: string;
  highlights: string[];
  techStack: string[];
  logoText: string;
}

const timeline: TimelineItem[] = [
  {
    period: 'May 2025 – Jul 2025',
    role: 'Machine Learning Research Intern',
    org: 'DRDO',
    focusTitle: 'Research Focus',
    focusDesc: 'Radar signal processing, anomaly detection, and machine learning for defense applications.',
    contributionsTitle: 'Key Contributions',
    highlights: [
      'Built radar signal segmentation pipeline (50K+ samples) using XGBoost, RF, SVM → +18% accuracy',
      'Designed anomaly detection system → reduced false positives by 25% in noisy environments',
      'Optimized inference by 30% using PCA and efficient NumPy/Pandas pipelines',
    ],
    techStack: ['Python', 'XGBoost', 'SVM', 'Random Forest', 'Pandas', 'NumPy', 'Scikit-learn'],
    logoText: 'DRDO',
  },
  {
    period: 'Jan 2025 – Apr 2025',
    role: 'NLP Research Intern',
    org: 'IIIT Hyderabad',
    focusTitle: 'Research Focus',
    focusDesc: 'Natural language processing, dataset preparation, and multilingual NLP models.',
    contributionsTitle: 'Key Contributions',
    highlights: [
      'Built 100K+ annotated Telugu dataset → improved NLP performance by 12%',
      'Reduced dataset noise by 40% using automated data pipelines and validation',
      'Collaborated with research team on multilingual NLP models',
    ],
    techStack: ['Python', 'Transformers', 'PyTorch', 'Pandas', 'Dataset', 'NLTK', 'Scikit-learn'],
    logoText: 'IIIT HYDERABAD',
  },
  {
    period: '2022 – 2026',
    role: 'B.E. Computer Science & Engineering',
    org: 'Matrusri Engineering College (Osmania University)',
    focusTitle: 'Coursework',
    focusDesc: 'Data Structures, Algorithms, DBMS, Computer Networks, Operating Systems, Machine Learning, Computer Vision',
    contributionsTitle: 'Key Highlights',
    highlights: [
      'CGPA: 7.4 / 10',
      'Active in coding competitions and hackathons',
      'Built multiple ML & CV projects',
      'Strong foundation in software engineering and problem solving',
    ],
    techStack: ['C / C++', 'Python', 'Java', 'MySQL', 'OpenCV', 'Git', 'Linux'],
    logoText: 'MATRUSRI',
  },
];

const metrics = [
  { icon: Code2, value: '1.5+', label: 'Years of Research\nExperience' },
  { icon: Database, value: '150K+', label: 'Data Samples\nProcessed' },
  { icon: LineChart, value: '8+', label: 'ML/NLP Projects\nBuilt' },
  { icon: Users, value: '3', label: 'Organizations\nWorked With' },
  { icon: Trophy, value: '10+', label: 'Technologies &\nFrameworks' },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="w-full pt-32">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 block mb-3">EXPERIENCE</span>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">My Professional Journey</h2>
          <p className="text-slate-400 text-[15px] max-w-xl leading-relaxed">
            A timeline of my academic background, research internships, and the skills I've developed along the way.
          </p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
      </div>

      {/* Core Layout */}
      <div className="relative flex flex-col gap-6">
        {/* Left Column Background (Desktop only) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[300px] border border-white/[0.04] bg-[#020611] rounded-xl z-0" />

        {/* Timeline Line (Desktop only) */}
        <div className="hidden lg:block absolute left-[39px] top-12 bottom-12 w-px bg-white/[0.08] z-0" />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 relative z-10"
          >
            {/* Left Box Content */}
            <div className="px-10 py-8 relative">
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-[35px] top-10 w-2.5 h-2.5 rounded-full bg-[#020611] border-2 border-blue-500 ring-4 ring-[#020611] z-10" />
              
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-blue-400 mb-3">{item.period}</span>
                <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug mb-2">{item.role}</h3>
                <span className="text-[14px] text-blue-500 font-medium">{item.org}</span>
              </div>
            </div>

            {/* Right Box Content */}
            <div className="border border-white/[0.04] bg-[#020611] rounded-xl p-8 grid grid-cols-1 md:grid-cols-[1fr_1.2fr_0.8fr] gap-8">
              
              {/* Focus Area */}
              <div>
                <h4 className="text-[13px] font-bold text-white mb-3">{item.focusTitle}</h4>
                <p className="text-[13px] text-slate-400 leading-relaxed">{item.focusDesc}</p>
              </div>

              {/* Contributions Area */}
              <div>
                <h4 className="text-[13px] font-bold text-white mb-3">{item.contributionsTitle}</h4>
                <ul className="text-[13px] text-slate-400 leading-relaxed space-y-2.5">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-600 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack & Logo Area */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-white/[0.02] border border-white/[0.05] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logo Box Placeholder */}
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center self-end border border-white/10 shadow-lg">
                  <span className="text-[10px] font-bold text-blue-900 text-center uppercase tracking-wider px-2">{item.logoText}</span>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 border border-white/[0.04] bg-[#020611] rounded-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.04] overflow-hidden"
      >
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-0.5">{metric.value}</div>
                <div className="text-[11px] text-slate-500 leading-tight whitespace-pre-line">{metric.label}</div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
