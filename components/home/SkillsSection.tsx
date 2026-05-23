'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Database, Monitor } from 'lucide-react';

const skillGroups = [
  {
    title: 'Languages',
    icon: Code2,
    dotColor: 'bg-blue-400',
    items: ['Python', 'TypeScript', 'JavaScript', 'C / C++'],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    dotColor: 'bg-purple-400',
    items: ['PyTorch', 'TensorFlow', 'MONAI', 'Scikit-learn', 'OpenCV'],
  },
  {
    title: 'Backend / Data',
    icon: Database,
    dotColor: 'bg-teal-400',
    items: ['Firebase', 'Firestore', 'PostgreSQL', 'Node.js'],
  },
  {
    title: 'Frontend',
    icon: Monitor,
    dotColor: 'bg-cyan-400',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 relative bg-[#020817]">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400"
          >
            MY STACK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-white">Tools & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 max-w-lg mx-auto text-sm"
          >
            A curated stack I use to build, train, and deploy intelligent systems.
          </motion.p>
        </div>

        {/* Categorized rows */}
        <div className="max-w-3xl mx-auto space-y-4">
          {skillGroups.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#081120]/70 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Category icon + label */}
                <div className="flex items-center gap-3 w-[140px] shrink-0">
                  <div className={`w-2 h-2 rounded-full ${group.dotColor}`} />
                  <span className="text-sm font-semibold text-white tracking-wide">{group.title}</span>
                </div>

                {/* Inline chips */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-[13px] rounded-md text-slate-400 bg-white/[0.03] border border-white/[0.05] hover:text-white hover:bg-white/[0.07] transition-colors cursor-default"
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
