'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Building2, Puzzle, Cpu, Zap, Users2, GraduationCap, ArrowUpRight, MoreVertical } from 'lucide-react';
import { subscribeToExperiences } from '@/lib/firebase/firestore';
import { Experience } from '@/lib/types';

const strengths = [
  { name: 'Problem Solver', icon: Puzzle },
  { name: 'AI Engineer', icon: Cpu },
  { name: 'Quick Learner', icon: Zap },
  { name: 'Team Player', icon: Users2 },
];

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToExperiences((data) => {
      setExperiences(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <section id="experience" className="w-full pt-20 pb-0 relative z-20 bg-transparent">
      <div className="container-width max-w-[1400px]">
        
        <div className="flex flex-col lg:flex-row justify-start items-start gap-6 w-full">
          
          {/* Left Column (Sticky Sidebar) */}
          <div className="w-full lg:w-[360px] shrink-0 flex flex-col">
            <div className="sticky top-32 bg-[var(--color-bg-elevated)]/30 backdrop-blur-md border border-blue-500/10 rounded-[24px] p-8">
              
              {/* Header */}
              <div className="mb-14">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500">
                    MY JOURNEY
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
                <h2 className="text-[32px] xl:text-[36px] leading-[1.1] font-bold tracking-tight mb-4 relative">
                  <span className="text-white block">My</span>
                  <span className="text-white block">Professional</span>
                  <span className="text-blue-500 block">Journey</span>
                  
                  {/* Decorative faint glow mimicking the cube in the image */}
                  <div className="absolute top-0 right-4 w-20 h-20 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
                </h2>
                <p className="text-slate-400 text-[13px] leading-relaxed">
                  A timeline of my academic background, research internships, and the skills I've developed along the way.
                </p>
              </div>

              {/* Timeline Navigation */}
              <div className="relative pl-7 space-y-6 mb-16 hidden md:block">
                {/* Vertical Line */}
                <div className="absolute left-[8px] top-6 bottom-6 w-[2px] bg-blue-500/20" />

                {experiences.map((exp, idx) => {
                  const isActive = idx === 0;
                  const isEducation = exp.role.toLowerCase().includes('student') || exp.role.toLowerCase().includes('b.e.') || exp.role.toLowerCase().includes('degree');
                  const Icon = isEducation ? GraduationCap : (isActive ? ShieldCheck : Building2);
                  
                  return (
                    <div key={exp.id} className="relative group cursor-pointer">
                      
                      {/* Node Dot */}
                      <div className={`absolute -left-[27px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-blue-500/20' : 'bg-[#060b14] border border-blue-500/30'} z-10`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
                      </div>
                      
                      {/* Nav Card */}
                      <div className={`p-5 rounded-[20px] border transition-colors duration-300 flex items-center gap-4 ${
                        isActive 
                          ? 'border-blue-500/30 bg-blue-500/10' 
                          : 'border-transparent hover:bg-white/[0.02]'
                      }`}>
                        
                        {/* Icon Box */}
                        <div className={`w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center ${
                          isActive 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                            : 'border border-white/5 bg-[var(--color-bg-elevated)]/30 text-slate-500 group-hover:border-white/10 group-hover:text-slate-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-bold mb-0.5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                            {exp.duration}
                          </span>
                          <h4 className={`text-[13px] font-bold leading-tight mb-0.5 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                            {exp.role}
                          </h4>
                          <span className={`text-[11px] font-medium ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-400'}`}>
                            {exp.company}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Key Strengths */}
              <div className="mt-16">
                <h4 className="text-[11px] font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  KEY STRENGTHS
                </h4>
                <div className="flex flex-col gap-4">
                  {strengths.map(strength => {
                    const SIcon = strength.icon;
                    return (
                      <div key={strength.name} className="flex items-center justify-between px-5 py-5 bg-[#050a15] border border-blue-500/10 rounded-[14px] text-white text-[13px] font-bold hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors cursor-default group">
                        <div className="flex items-center gap-4">
                          <SIcon className="w-4 h-4 text-blue-500" />
                          <span className="tracking-wide">{strength.name}</span>
                        </div>
                        <span className="text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Cards) */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {experiences.map((exp, idx) => {
              const fallbackImage = idx === 0 ? '/images/radar_ui.png' : (idx === 1 ? '/images/nlp_dashboard.png' : '/images/data_cube.png');
              const isActive = idx === 0;

              return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`bg-[var(--color-bg-elevated)]/30 backdrop-blur-md border ${isActive ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.05)]' : 'border-blue-500/10'} rounded-[24px] p-6 flex flex-col md:flex-row gap-8 relative hover:border-blue-500/30 hover:bg-[var(--color-bg-elevated)]/50 transition-colors duration-300`}
              >
                {/* Options Icon - Absolutely positioned top right */}
                <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#040812] border border-blue-500/20 flex items-center justify-center text-blue-500 opacity-80 hover:opacity-100 transition-opacity z-10">
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Left Image Column */}
                <div className="w-full md:w-[460px] xl:w-[500px] shrink-0 h-[300px] relative rounded-[16px] overflow-hidden bg-black/50 border border-white/[0.05]">
                  <Image 
                    src={exp.logo || fallbackImage}
                    alt={exp.company}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>

                {/* Right Content Column */}
                <div className="flex-1 flex flex-col justify-start py-2 pr-10">
                  
                  {/* Date */}
                  <span className="text-blue-400 text-[12px] font-bold tracking-wide mb-1.5 block">
                    {exp.duration}
                  </span>

                  {/* Header */}
                  <h3 className="text-[22px] font-bold text-white leading-tight mb-1">{exp.role}</h3>
                  <span className="text-blue-500 text-[14px] font-bold block mb-4">{exp.company}</span>
                  
                  {/* Contributions */}
                  <h4 className="text-white text-[11px] font-bold tracking-[0.1em] mb-3 uppercase">Key Contributions</h4>
                  <ul className="space-y-2 mb-6">
                    {exp.contributions && exp.contributions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                        <span className="text-slate-300 text-[13px] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <h4 className="text-white text-[11px] font-bold tracking-[0.1em] mb-2.5 uppercase">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack && exp.stack.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-[6px] border border-white/5 bg-white/[0.02] text-slate-300 text-[11px] font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            )})}
          </div>

        </div>

      </div>
    </section>
  );
}
