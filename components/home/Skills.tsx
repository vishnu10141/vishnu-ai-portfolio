'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import { 
  Brain, Code2, Database, Cloud, Cpu, Puzzle, GitBranch, Star,
  Terminal, Monitor, BarChart, Server, Activity, Shield
} from 'lucide-react';

const skillCategories = [
  {
    title: 'AI & ML SOLUTIONS',
    icon: Brain,
    themeColor: '#22c55e',
    subtitle: 'Building intelligent models that learn, adapt, and deliver measurable results.',
    skills: [
      { name: 'TensorFlow', icon: Brain },
      { name: 'PyTorch', icon: Activity },
      { name: 'Scikit-learn', icon: Database },
      { name: 'OpenCV', icon: Camera },
      { name: 'MONAI', icon: Activity },
    ]
  },
  {
    title: 'FULL STACK DEVELOPMENT',
    icon: Code2,
    themeColor: '#3b82f6',
    subtitle: 'End-to-end web applications using modern technologies and best practices.',
    skills: [
      { name: 'Next.js', icon: Monitor },
      { name: 'React', icon: Code2 },
      { name: 'Node.js', icon: Server },
      { name: 'TypeScript', icon: Code2 },
      { name: 'Tailwind CSS', icon: Monitor },
    ]
  },
  {
    title: 'DATA SCIENCE',
    icon: Database,
    themeColor: '#a855f7',
    subtitle: 'Turning raw data into insightful visualizations and actionable knowledge.',
    skills: [
      { name: 'Python', icon: Code2 },
      { name: 'Pandas', icon: Database },
      { name: 'NumPy', icon: Database },
      { name: 'Matplotlib', icon: BarChart },
      { name: 'Seaborn', icon: BarChart },
    ]
  },
  {
    title: 'CLOUD & DEVOPS',
    icon: Cloud,
    themeColor: '#06b6d4',
    subtitle: 'Deploying scalable solutions with CI/CD, Docker, and cloud platforms.',
    skills: [
      { name: 'Docker', icon: Server },
      { name: 'Kubernetes', icon: Server },
      { name: 'AWS', icon: Cloud },
      { name: 'Firebase', icon: Cloud },
      { name: 'GitHub Actions', icon: GitBranch },
    ]
  },
  {
    title: 'RESEARCH & INNOVATION',
    icon: Cpu,
    themeColor: '#ec4899',
    subtitle: 'Exploring new ideas and building solutions for real-world challenges.',
    skills: [
      { name: 'Deep Learning', icon: Brain },
      { name: 'NLP', icon: Terminal },
      { name: 'Computer Vision', icon: Monitor },
      { name: 'Anomaly Detection', icon: Activity },
      { name: 'Model Optimization', icon: Zap },
    ]
  },
  {
    title: 'PROBLEM SOLVING',
    icon: Puzzle,
    themeColor: '#f97316',
    subtitle: 'Lover of challenges and building optimized solutions that scale.',
    skills: [
      { name: 'Data Structures', icon: Database },
      { name: 'Algorithms', icon: Code2 },
      { name: 'System Design', icon: Server },
      { name: 'Debugging', icon: Shield },
    ]
  },
  {
    title: 'DATA / ML OPS',
    icon: GitBranch,
    themeColor: '#10b981',
    subtitle: 'Building reliable ML pipelines and managing data workflows.',
    skills: [
      { name: 'MLflow', icon: GitBranch },
      { name: 'DVC', icon: Database },
      { name: 'Airflow', icon: Cloud },
      { name: 'Weights & Biases', icon: BarChart },
      { name: 'Jupyter', icon: Terminal },
    ]
  },
  {
    title: 'OTHER SKILLS',
    icon: Star,
    themeColor: '#6366f1',
    subtitle: 'Additional tools and technologies I frequently use.',
    skills: [
      { name: 'REST APIs', icon: Cloud },
      { name: 'Postman', icon: Activity },
      { name: 'Streamlit', icon: Monitor },
      { name: 'Linux', icon: Terminal },
    ]
  }
];

// Re-using Lucide icons since we don't have SVGs for all logos
import { Camera, Zap } from 'lucide-react';

function SkillCard({ category, index }: { category: typeof skillCategories[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const Icon = category.icon;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[24px] border border-white/[0.08] bg-[#03060c] p-6 lg:p-8 overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-2xl"
    >
      {/* Cursor Hover Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${category.themeColor}15,
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Icon Circle */}
      <div className="relative mb-6">
        <div className="absolute inset-0 blur-xl opacity-30 rounded-full" style={{ backgroundColor: category.themeColor }} />
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center relative z-10 bg-[#0a0a0a]">
          <Icon className="w-7 h-7" style={{ color: category.themeColor, filter: `drop-shadow(0 0 8px ${category.themeColor})` }} />
        </div>
      </div>

      <h3 className="text-[13px] font-bold tracking-widest mb-3 z-10" style={{ color: category.themeColor }}>
        {category.title}
      </h3>
      
      <p className="text-[13px] text-slate-400 leading-relaxed mb-8 max-w-[240px] z-10">
        {category.subtitle}
      </p>

      {/* Skill Chips */}
      <div className="flex flex-wrap justify-center gap-3 z-10 mt-auto">
        {category.skills.map((skill, idx) => {
          const SkillIcon = skill.icon;
          return (
            <div 
              key={idx} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:border-white/10 transition-colors"
            >
              <SkillIcon className="w-3.5 h-3.5" style={{ color: category.themeColor }} />
              <span className="text-[12px] font-medium text-slate-300">{skill.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom glowing line */}
      <div 
        className="absolute bottom-0 left-[20%] right-[20%] h-[3px] rounded-t-full opacity-30 transition-all duration-700 group-hover:opacity-100 group-hover:left-[10%] group-hover:right-[10%]" 
        style={{ background: category.themeColor, boxShadow: `0 0 20px 2px ${category.themeColor}` }} 
      />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full pt-32 pb-32 relative">
      <div className="container-width max-w-[1400px]">
        
        {/* Header section matching screenshot exactly */}
        <div className="flex flex-col items-center text-center mb-20 relative">
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500/50" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
              WHAT I WORK WITH
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500/50" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Technologies</span>
          </h2>
          
          <p className="text-slate-400 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed">
            A powerful toolkit of technologies, frameworks, and platforms that help me build intelligent, scalable and impactful solutions.
          </p>
        </div>

        {/* 4-column Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
