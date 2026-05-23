'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Database, Monitor } from 'lucide-react';

const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C / C++', 'SQL'],
  },
  {
    title: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'MONAI', 'Scikit-learn', 'OpenCV'],
  },
  {
    title: 'Backend / Data',
    items: ['Firebase', 'Firestore', 'PostgreSQL', 'Node.js'],
  },
  {
    title: 'Frontend',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'DevOps / Tools',
    items: ['Docker', 'Git', 'GitHub', 'VS Code', 'Linux', 'Vercel'],
  },
  {
    title: 'Data / ML Ops',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Weights & Biases'],
  },
  {
    title: 'Other Skills',
    items: ['Model Deployment', 'REST APIs', 'Streamlit', 'Postman'],
  },
  {
    title: 'Concepts',
    items: ['Deep Learning', 'Computer Vision', 'NLP', 'Anomaly Detection'],
  },
];

export default function SkillsSection() {
  return (
    <section className="w-full">
      <div className="mb-16">
        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-500 block mb-2">Tools & Technologies</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-20">
        {skillGroups.map((group, groupIdx) => {
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
              className="flex flex-col gap-5"
            >
              {/* Category label - Blue uppercase */}
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-blue-500">
                {group.title}
              </h3>

              {/* Dot-separated plain text items */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {group.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[14px] font-medium text-slate-300">
                      {item}
                    </span>
                    {i < group.items.length - 1 && (
                      <span className="text-slate-600 text-lg leading-none">•</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
