'use client';

import { ArrowUpRight, MapPin, Mail, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        
        {/* Left: Headline & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 max-w-sm"
        >
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-500 block mb-2">Let's Connect</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Something Amazing</span>
          </h2>
          <p className="text-[15px] text-slate-400 leading-relaxed">
            Open to collaborations, projects, or just a friendly hello.
          </p>
          <div className="pt-2">
            <a
              href="mailto:nvishnu1014@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-[14px] font-semibold hover:bg-blue-500 transition-colors"
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right: Info List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 lg:pt-14"
        >
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
              <Mail className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[15px]">nvishnu1014@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[15px]">Andhra Pradesh, India</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
              <Briefcase className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-[15px]">AI Engineer, ML Engineer, Research Roles</span>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
