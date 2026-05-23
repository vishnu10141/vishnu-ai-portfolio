'use client';

import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/10 text-[13px] text-slate-500">
        {/* Left: Socials */}
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <a href="https://github.com/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a href="https://x.com/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="X/Twitter">
            <XTwitterIcon className="w-4 h-4" />
            <span>X (Twitter)</span>
          </a>
        </div>

        {/* Right: Copyright */}
        <div>
          &copy; 2026 Nimmakayala Vishnu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
