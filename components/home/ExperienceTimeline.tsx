'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Building2, GraduationCap, Trophy, Database, LineChart, Users, Code, ArrowRight, Puzzle, Cpu, Zap, Users2 } from 'lucide-react';

const experiences = [
  {
    id: 'drdo',
    date: 'May 2025 - Jul 2025',
    title: 'Machine Learning Research Intern',
    org: 'DRDO',
    isActive: true,
    icon: ShieldCheck,
    image: '/images/radar_ui.png',
    focusTitle: 'Research Focus',
    focusText: 'Radar signal processing, anomaly detection, and machine learning for defense applications.',
    contributionsTitle: 'Key Contributions',
    contributions: [
      'Built radar signal segmentation pipeline (50K+ samples) using XGBoost, RF, SVM → 98% accuracy',
      'Designed anomaly detection system - reduced false positives by 25% in noisy environments',
      'Optimized inference by 30% using PCA and efficient NumPy/Pandas pipelines'
    ],
    tech: ['Python', 'XGBoost', 'SVM', 'Random Forest', 'Pandas', 'NumPy', 'Scikit-learn'],
    logoName: 'DRDO',
    logoInner: (
      <div className="w-10 h-10 rounded-full border-2 border-blue-800 flex items-center justify-center">
        <span className="text-[6px] font-bold text-blue-800 text-center leading-tight">DEFENSE<br/>R&D</span>
      </div>
    )
  },
  {
    id: 'iiit',
    date: 'Jan 2025 - Apr 2025',
    title: 'NLP Research Intern',
    org: 'IIIT Hyderabad',
    isActive: false,
    icon: Building2,
    image: '/images/nlp_dashboard.png',
    focusTitle: 'Research Focus',
    focusText: 'Natural language processing, dataset preparation, and multilingual NLP models.',
    contributionsTitle: 'Key Contributions',
    contributions: [
      'Built 100K+ annotated Telugu dataset → improved NLP performance by 12%',
      'Reduced dataset noise by 40% using automated data pipelines and validation',
      'Collaborated with research team on multilingual NLP models'
    ],
    tech: ['Python', 'Transformers', 'PyTorch', 'Pandas', 'Dataset', 'NLTK', 'Scikit-learn'],
    logoName: 'IIIT HYDERABAD',
    logoInner: (
      <div className="text-blue-800 font-bold text-[14px] tracking-widest">IIIT</div>
    )
  },
  {
    id: 'matrusri',
    date: '2022 - 2026',
    title: 'B.E. Computer Science & Engineering',
    org: 'Matrusri Engineering College',
    isActive: false,
    icon: GraduationCap,
    image: '/images/data_cube.png',
    focusTitle: 'Coursework',
    focusText: 'Data Structures, Algorithms, DBMS, Computer Networks, Operating Systems, Machine Learning, Computer Vision',
    contributionsTitle: 'Key Highlights',
    contributions: [
      'CGPA: 7.4 / 10',
      'Active in coding competitions and hackathons',
      'Built multiple ML & CV projects',
      'Strong foundation in software engineering and problem solving'
    ],
    tech: ['C / C++', 'Python', 'Java', 'MySQL', 'OpenCV', 'Git', 'Linux'],
    logoName: 'MATRUSRI',
    logoInner: (
      <div className="text-blue-800 font-serif font-bold text-[20px] italic">M</div>
    )
  }
];

const strengths = [
  { name: 'Problem Solver', icon: Puzzle },
  { name: 'AI Engineer', icon: Cpu },
  { name: 'Quick Learner', icon: Zap },
  { name: 'Team Player', icon: Users2 },
];

const stats = [
  { icon: Trophy, value: '2+', label: 'Years of Research\nExperience' },
  { icon: Database, value: '150K+', label: 'Data Samples\nProcessed' },
  { icon: LineChart, value: '8+', label: 'ML/NLP Projects\nBuilt' },
  { icon: Users, value: '3', label: 'Organizations\nWorked With' },
  { icon: Code, value: '10+', label: 'Technologies &\nFrameworks' },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="w-full pt-20 pb-20 relative z-20 bg-[#020611]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-16">
          
          {/* Left Column (Sticky Sidebar) */}
          <div className="w-full xl:w-[320px] shrink-0 flex flex-col">
            <div className="sticky top-32">
              
              {/* Header */}
              <div className="mb-12">
                <h2 className="text-[40px] leading-[1.1] font-bold tracking-tight mb-6">
                  <span className="text-white block">My</span>
                  <span className="text-white block">Professional</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 block">Journey</span>
                </h2>
                <p className="text-slate-400 text-[14px] leading-relaxed">
                  A timeline of my academic background, research internships, and the skills I've developed along the way.
                </p>
              </div>

              {/* Timeline Navigation */}
              <div className="relative pl-6 border-l border-white/5 space-y-12 mb-12 hidden md:block">
                {experiences.map((exp, idx) => {
                  const Icon = exp.icon;
                  return (
                    <div key={exp.id} className="relative">
                      {/* Node Dot */}
                      <div className={`absolute -left-[30px] top-6 w-3 h-3 rounded-full border-2 ${exp.isActive ? 'border-green-500 bg-green-500' : 'border-slate-700 bg-[#020611]'} z-10`} />
                      
                      <div className={`p-5 rounded-2xl border ${exp.isActive ? 'border-green-500/30 bg-green-500/5' : 'border-transparent'} transition-colors`}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`w-5 h-5 ${exp.isActive ? 'text-green-500' : 'text-slate-500'}`} />
                          <span className={`text-[12px] font-bold ${exp.isActive ? 'text-green-500' : 'text-slate-500'}`}>{exp.date}</span>
                        </div>
                        <h4 className={`text-[14px] font-bold ${exp.isActive ? 'text-white' : 'text-slate-400'} mb-1`}>{exp.title}</h4>
                        <p className={`text-[12px] ${exp.isActive ? 'text-green-400' : 'text-slate-500'}`}>{exp.org}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Key Strengths */}
              <div className="bg-[#040812] border border-white/5 rounded-2xl p-6">
                <h4 className="text-[14px] font-bold text-white mb-5">Key Strengths</h4>
                <div className="grid grid-cols-2 gap-3">
                  {strengths.map(strength => {
                    const SIcon = strength.icon;
                    return (
                      <div key={strength.name} className="flex items-center gap-2 px-3 py-2.5 bg-green-500/5 border border-green-500/10 rounded-lg text-green-500 text-[11px] font-semibold whitespace-nowrap">
                        <SIcon className="w-3.5 h-3.5" />
                        {strength.name}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Cards) */}
          <div className="flex-1 flex flex-col gap-6">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#040812] border border-white/5 rounded-[32px] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 relative overflow-hidden group hover:border-green-500/20 transition-colors"
              >
                {/* Left Image Column */}
                <div className="w-full lg:w-[280px] shrink-0 h-[220px] lg:h-auto relative rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/5">
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image 
                    src={exp.image}
                    alt={exp.org}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Right Content Column */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  
                  {/* Header */}
                  <div className="mb-8">
                    <span className="text-green-500 text-[13px] font-bold block mb-2">{exp.date}</span>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <span className="text-green-400 text-[14px] font-medium">{exp.org}</span>
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mb-8">
                    
                    {/* Focus */}
                    <div>
                      <h4 className="text-white text-[13px] font-bold mb-3">{exp.focusTitle}</h4>
                      <p className="text-slate-400 text-[12px] leading-relaxed pr-4">
                        {exp.focusText}
                      </p>
                    </div>

                    {/* Contributions */}
                    <div>
                      <h4 className="text-white text-[13px] font-bold mb-3">{exp.contributionsTitle}</h4>
                      <ul className="space-y-2.5">
                        {exp.contributions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-green-500 shrink-0 mt-1.5" />
                            <span className="text-slate-400 text-[12px] leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer tech & logo */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-auto border-t border-white/5 pt-6">
                    <div className="flex-1">
                      <h4 className="text-white text-[13px] font-bold mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map(t => (
                          <span key={t} className="px-3 py-1.5 rounded-full border border-white/10 text-slate-300 text-[10px] font-medium tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl p-2 pb-1 relative">
                      {exp.logoInner}
                      <span className="text-blue-800 font-bold text-[8px] tracking-wider mt-auto">{exp.logoName}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Stats Footer Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#040812] border border-white/5 rounded-[32px] p-6 lg:p-8 flex flex-col md:flex-row flex-wrap items-center justify-between gap-8"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white text-xl font-bold mb-0.5">{stat.value}</h4>
                  <p className="text-slate-500 text-[11px] font-medium leading-tight whitespace-pre-line">{stat.label}</p>
                </div>
              </div>
            );
          })}
          
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)] ml-auto md:ml-0 mt-4 md:mt-0 shrink-0">
            <ArrowRight className="w-6 h-6 text-[#020611]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
