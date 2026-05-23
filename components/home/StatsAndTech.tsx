'use client';

import { motion } from 'framer-motion';
import { Code2, Briefcase, Users, Award, Trophy } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { icon: Code2, value: '25+', label: 'Projects\nCompleted' },
  { icon: Briefcase, value: '3+', label: 'Years of\nExperience' },
  { icon: Users, value: '15+', label: 'Happy\nClients' },
  { icon: Award, value: '5+', label: 'Certifications\nEarned' },
  { icon: Trophy, value: '100%', label: 'Commitment &\nDedication' },
];

const techStack = [
  { name: 'Python', icon: '/icons/python.svg', color: '#3776AB' },
  { name: 'TensorFlow', icon: '/icons/tensorflow.svg', color: '#FF6F00' },
  { name: 'PyTorch', icon: '/icons/pytorch.svg', color: '#EE4C2C' },
  { name: 'OpenCV', icon: '/icons/opencv.svg', color: '#5C3EE8' },
  { name: 'Scikit-learn', icon: '/icons/scikitlearn.svg', color: '#F7931E' },
  { name: 'Keras', icon: '/icons/keras.svg', color: '#D00000' },
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'AWS', icon: '/icons/aws.svg', color: '#232F3E' },
  { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ED' },
];

export default function StatsAndTech() {
  return (
    <section className="w-full relative z-20 pb-16">
      
      {/* Metrics Row */}
      <div className="relative mb-16 px-4 sm:px-0">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-[5%] right-[5%] h-px bg-green-500/20 -translate-y-1/2 hidden md:block" />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-[#020611] border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-green-500/30 transition-colors group"
              >
                {/* Connecting Dot */}
                {i > 0 && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-500/50 hidden md:block shadow-[0_0_8px_#4ade80]" />
                )}
                
                <div className="w-12 h-12 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/10 transition-colors">
                  <Icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-0.5">{stat.value}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-tight whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-[#020611] border border-white/5 rounded-2xl flex items-center p-2 pl-6 overflow-hidden relative"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 shrink-0 mr-8">
          TECH STACK
        </span>
        
        <div className="flex-1 overflow-hidden relative flex items-center">
          {/* Subtle gradient fades for the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020611] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020611] to-transparent z-10" />
          
          <div className="flex gap-8 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {/* Double the array for seamless scrolling */}
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center p-1 shrink-0">
                  {/* Using generic colored circles as placeholders if SVGs don't exist, though we assume they do or we use CSS */}
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: tech.color }} />
                </div>
                <span className="text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="shrink-0 ml-6 mr-4 text-[12px] font-medium text-green-400 hover:text-green-300 transition-colors whitespace-nowrap">
          + More
        </button>
      </motion.div>

    </section>
  );
}
