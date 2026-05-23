'use client';

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#020817] py-16 flex justify-center border-t border-[rgba(255,255,255,0.02)]">
      <div className="w-full max-w-fit mx-4 rounded-2xl bg-[#0a1020]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.05)] h-14 flex items-center px-6 shadow-xl shadow-black/20">
        
        {/* Socials */}
        <div className="flex items-center gap-6 text-white/60">
          <a href="https://github.com/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X/Twitter">
            <XTwitterIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="h-6 w-px bg-white/10 mx-6" />

        {/* Email */}
        <a 
          href="mailto:nvishnu1014@gmail.com" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
        >
          <Mail className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
          <span className="text-sm tracking-wide hidden sm:inline">nvishnu1014@gmail.com</span> 
        </a>
      </div>
    </footer>
  );
}
