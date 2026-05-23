'use client';

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#020817] py-8">
      <div className="container-width">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Socials */}
          <div className="flex items-center gap-5 text-white/60">
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

          {/* Right: Email */}
          <a 
            href="mailto:nvishnu1014@gmail.com" 
            className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group"
          >
            <Mail className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-sm font-medium tracking-wide">nvishnu1014@gmail.com</span> 
          </a>
          
        </div>
      </div>
    </footer>
  );
}
