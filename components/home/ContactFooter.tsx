'use client';

import { ArrowUpRight, MapPin, Mail, Briefcase } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function ContactFooter() {
  return (
    <div className="h-full flex flex-col justify-between pt-4">
      {/* Top Part */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-12">
        {/* Left: CTA */}
        <div className="space-y-4 max-w-[280px]">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Let's Build Something <span className="text-blue-500">Amazing</span>
          </h2>
          <p className="text-[14px] text-slate-400">
            Open to collaborations, projects, or just a friendly hello.
          </p>
          <a
            href="mailto:nvishnu1014@gmail.com"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-500 transition-colors mt-2"
          >
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Info List */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-slate-300">
            <Mail className="w-4 h-4 text-slate-500" />
            <span className="text-[13px]">nvishnu1014@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-[13px]">Andhra Pradesh, India</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span className="text-[13px]">AI Engineer, ML Engineer, Research Role</span>
          </div>
        </div>
      </div>

      {/* Bottom Part: Socials & Copyright */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-20 pt-8 border-t border-white/[0.05]">
        <div className="flex items-center gap-6">
          <a href="https://github.com/nvishnu1014" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-medium text-slate-400 hover:text-white transition-colors">
            <FaGithub className="w-4 h-4" /> GitHub
          </a>
          <a href="https://linkedin.com/in/nvishnu1014" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-medium text-slate-400 hover:text-white transition-colors">
            <FaLinkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href="https://twitter.com/nvishnu1014" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] font-medium text-slate-400 hover:text-white transition-colors">
            <FaXTwitter className="w-4 h-4" /> X (Twitter)
          </a>
        </div>
        
        <p className="text-[12px] text-slate-500">
          © 2025 Nimmakayala Vishnu. All rights reserved.
        </p>
      </div>
    </div>
  );
}
