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
    <div className="w-full">
      <h2 className="text-[18px] sm:text-xl font-bold text-white mb-10 tracking-tight">Tools & Technologies</h2>
      
      <div className="flex flex-col gap-8">
        {skillGroups.map((group, groupIdx) => {
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
              className="flex flex-col gap-2"
            >
              {/* Category label - Blue uppercase */}
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-blue-400/90">
                {group.title}
              </h3>

              {/* Dot-separated plain text items */}
              <div className="flex flex-wrap items-center gap-2">
                {group.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-slate-300">
                      {item}
                    </span>
                    {i < group.items.length - 1 && (
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-600" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
