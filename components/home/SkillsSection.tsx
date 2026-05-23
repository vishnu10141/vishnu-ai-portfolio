'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Code2, Brain, Database, Monitor, Target } from 'lucide-react';

const skillGroups = [
  {
    title: 'Languages',
    icon: Code2,
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10',
    dotClass: 'bg-blue-500',
    borderClass: 'hover:border-blue-500/30',
    items: ['Python', 'TypeScript', 'JavaScript', 'C / C++']
  },
  {
    title: 'AI / ML',
    icon: Brain,
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    dotClass: 'bg-purple-500',
    borderClass: 'hover:border-purple-500/30',
    items: ['PyTorch', 'TensorFlow', 'MONAI', 'Scikit-learn', 'OpenCV']
  },
  {
    title: 'Backend / Data',
    icon: Database,
    colorClass: 'text-teal-400',
    bgClass: 'bg-teal-500/10',
    dotClass: 'bg-teal-500',
    borderClass: 'hover:border-teal-500/30',
    items: ['Firebase', 'Firestore', 'PostgreSQL', 'Node.js']
  },
  {
    title: 'Frontend',
    icon: Monitor,
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    dotClass: 'bg-cyan-500',
    borderClass: 'hover:border-cyan-500/30',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion']
  }
];

export default function SkillsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="skills" className="relative overflow-x-hidden bg-[#020817] py-24">
      {/* Visual separator from previous section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.2)] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[2px] bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.4)] to-transparent blur-sm" />

      <div className="relative container-width">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--color-cyan-500)]/50" />
            <div className="flex items-center gap-2 text-[var(--color-cyan-400)] text-xs font-semibold tracking-[0.2em] uppercase">
              <Code2 className="w-4 h-4" />
              Technical Stack
            </div>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--color-cyan-500)]/50" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            <span className="text-white">Tools & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-400)] to-[var(--color-violet-400)]">
              Technologies
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-sm sm:text-base"
          >
            A curated stack I use to build, train, and deploy intelligent systems.
          </motion.p>
          

        </div>

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
          {skillGroups.map((group, groupIdx) => {
            const colSpan = groupIdx < 3 ? 'md:col-span-2 lg:col-span-4' : 'md:col-span-3 lg:col-span-6';
            const Icon = group.icon;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                className={`rounded-2xl p-6 lg:p-8 bg-[#0a1020] border border-[rgba(255,255,255,0.05)] transition-all duration-300 ${group.borderClass} ${colSpan}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.bgClass} ${group.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-wide">
                    {group.title}
                  </h3>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 relative z-10 mt-6">
                  {group.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3 py-1.5 text-sm rounded-md bg-white/[0.03] border border-white/[0.05] text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.08] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
