'use client';

import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] bg-[#020817]">
      <div className="container-width py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-slate-500">
        {/* Left: Socials */}
        <div className="flex items-center gap-5">
          <a href="https://github.com/nvishnu1014" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2" aria-label="X/Twitter">
            <XTwitterIcon className="w-4 h-4" />
            <span className="hidden sm:inline">X/Twitter</span>
          </a>
        </div>

        {/* Center: Copyright */}
        <div className="hidden md:block text-slate-600">
          &copy; {new Date().getFullYear()} Nimmakayala Vishnu
        </div>

        {/* Right: Email */}
        <div>
          <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
            hello@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
