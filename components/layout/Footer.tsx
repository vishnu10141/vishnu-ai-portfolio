'use client';

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#020817] py-16 flex justify-center border-t border-[rgba(255,255,255,0.02)]">
      <div className="w-full max-w-[800px] mx-4 rounded-2xl bg-[#0a1020] border border-[rgba(255,255,255,0.05)] h-16 flex items-center px-6 sm:px-8 shadow-xl shadow-black/20">
        
        {/* Logo V */}
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 mr-6 sm:mr-8 tracking-tighter">
          V
        </div>
        
        <div className="h-6 w-px bg-white/10" />
        
        {/* Socials */}
        <div className="flex-1 flex items-center gap-5 sm:gap-6 px-6 sm:px-8 text-white/60">
          <a href="https://github.com/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <GithubIcon className="w-[18px] h-[18px]" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <LinkedinIcon className="w-[18px] h-[18px]" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <XTwitterIcon className="w-[18px] h-[18px]" />
          </a>
        </div>

        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        {/* Email */}
        <a 
          href="mailto:nvishnu1014@gmail.com" 
          className="hidden sm:flex items-center gap-3 pl-8 text-white/80 hover:text-white transition-colors group"
        >
          <Mail className="w-[18px] h-[18px] text-violet-400 group-hover:text-violet-300 transition-colors" />
          <span className="text-sm tracking-wide">nvishnu1014@gmail.com</span> 
        </a>

        {/* Fallback for small screens: just the mail icon */}
        <div className="sm:hidden flex items-center justify-end flex-1">
           <a href="mailto:nvishnu1014@gmail.com" className="text-white/60 hover:text-white transition-colors">
             <Mail className="w-[18px] h-[18px] text-violet-400" />
           </a>
        </div>
      </div>
    </footer>
  );
}
