'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

interface TimelineItem {
  year: string;
  role: string;
  org: string;
  location?: string;
  description: string;
  highlights: string[];
  tags: string[];
  type: 'research' | 'project' | 'leadership';
}

const timeline: TimelineItem[] = [
  {
    year: 'May 2025 – Jul 2025',
    role: 'Machine Learning Research Intern',
    org: 'Defence Research & Development Organisation (DRDO)',
    location: 'Hyderabad',
    description: 'Built radar signal segmentation and anomaly detection systems for noisy defense environments using machine learning techniques. Worked on optimizing inference pipelines and reducing false positives in clutter-heavy radar systems.',
    highlights: [
      'Processed 50K+ radar samples',
      'Improved detection accuracy using XGBoost, Random Forest, and SVM',
      'Reduced false positives by 25%',
      'Optimized inference speed using PCA and efficient NumPy/Pandas pipelines'
    ],
    tags: ['XGBoost', 'Anomaly Detection', 'Radar AI', 'NumPy', 'Pandas', 'SVM', 'Random Forest'],
    type: 'research',
  },
  {
    year: 'Jan 2025 – Apr 2025',
    role: 'NLP Research Intern',
    org: 'IIIT Hyderabad',
    location: 'Hyderabad',
    description: 'Worked on Telugu language AI systems and large-scale NLP dataset preparation. Built automated data pipelines and contributed to improving dataset quality for language model training.',
    highlights: [
      'Built and processed 100K+ annotated Telugu dataset',
      'Reduced dataset noise by 40%',
      'Improved NLP pipeline quality and validation'
    ],
    tags: ['NLP', 'Telugu AI', 'Dataset Engineering', 'Python', 'Data Pipelines', 'Language Models'],
    type: 'research',
  },
  {
    year: '2025',
    role: 'AI Engineer / Project Lead',
    org: 'Brain Tumor Segmentation System',
    description: 'Developed an end-to-end medical imaging system using Residual Attention U-Net for brain tumor segmentation and visualization.',
    highlights: [
      'Built on BraTS 2020 dataset',
      'Achieved Dice Score of 0.87',
      'Integrated 2D/3D visualization',
      'Added explainability maps and tumor volume analysis',
      'Developed full Streamlit dashboard'
    ],
    tags: ['PyTorch', 'MONAI', 'Medical AI', 'U-Net', 'OpenCV', 'Streamlit', 'Deep Learning'],
    type: 'project',
  },
  {
    year: '2024',
    role: 'Machine Learning Developer',
    org: 'Credit Card Fraud Detection System',
    description: 'Built a fraud detection pipeline using ensemble learning and data balancing techniques for highly imbalanced financial datasets.',
    highlights: [
      'Processed 284K+ transactions',
      'Achieved 99.2% AUC',
      'Applied SMOTE and feature engineering',
      'Performed cross-validation and hyperparameter tuning'
    ],
    tags: ['XGBoost', 'Scikit-learn', 'SMOTE', 'Fraud Detection', 'Feature Engineering'],
    type: 'project',
  }
];

const typeConfig = {
  research:   { dot: 'bg-blue-400',   ring: 'ring-blue-400/20',   color: 'text-blue-400'   },
  project:    { dot: 'bg-cyan-400',   ring: 'ring-cyan-400/20',   color: 'text-cyan-400'   },
  leadership: { dot: 'bg-violet-400', ring: 'ring-violet-400/20', color: 'text-violet-400' },
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative bg-[#020817] overflow-x-hidden py-24">
      <div className="relative container-width max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-blue-500)]/50" />
            <div className="flex items-center gap-2 text-[var(--color-blue-400)] text-xs font-semibold tracking-[0.2em] uppercase">
              JOURNEY
            </div>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-blue-500)]/50" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            <span className="text-white">Experience & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">
              Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-light"
          >
            Building intelligent systems through research, engineering, and real-world AI applications.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-0">
          {/* Vertical line (Left aligned for all sizes) */}
          <div className="absolute left-[22px] sm:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-[rgba(59,130,246,0.5)] via-[rgba(139,92,246,0.2)] to-transparent" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => {
              const cfg = typeConfig[item.type];
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col sm:flex-row gap-8 sm:gap-12 items-start group"
                >
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-[17px] sm:left-[34px] top-6 w-3 h-3 rounded-full ${cfg.dot} ring-4 ${cfg.ring} shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 transition-transform duration-300 group-hover:scale-125`} />

                  {/* Date (Fixed left width) */}
                  <div className="hidden sm:flex w-[160px] flex-shrink-0 pt-5 pr-8 justify-end text-right">
                    <div className="flex items-center gap-2 text-slate-500 font-medium tracking-wide text-sm">
                      <Calendar className="w-4 h-4 opacity-70" />
                      <span className="text-slate-300">{item.year}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 w-full pl-14 sm:pl-0 relative z-0">
                    <div className="bg-[#0a1020]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(59,130,246,0.15)] hover:bg-[#0c1428] transition-all duration-300 shadow-xl shadow-black/20 group-hover:-translate-y-1">
                      
                      {/* Mobile Date */}
                      <div className="flex sm:hidden items-center gap-2 text-slate-500 font-medium tracking-wide text-xs mb-4">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        {item.year}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {item.role}
                      </h3>
                      
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-6">
                        <span className={`text-base font-semibold ${cfg.color}`}>{item.org}</span>
                        {item.location && (
                          <>
                            <span className="text-white/20 hidden sm:block">•</span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide uppercase bg-white/[0.03] px-2 py-1 rounded-md border border-white/[0.05]">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                        {item.description}
                      </p>

                      <ul className="space-y-2 mb-8">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed font-light">
                            <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color} opacity-70`} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] text-slate-400 font-medium hover:text-white hover:bg-white/[0.05] transition-colors cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
