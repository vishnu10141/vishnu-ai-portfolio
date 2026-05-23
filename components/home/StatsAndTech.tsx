'use client';

import { motion } from 'framer-motion';
import { Code2, Briefcase, Users, Award, Trophy } from 'lucide-react';
import Image from 'next/image';

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
