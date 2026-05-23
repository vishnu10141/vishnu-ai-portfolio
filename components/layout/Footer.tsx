import Link from 'next/link';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full relative mt-20">
      {/* Top Glowing Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05] flex justify-center">
        <div className="w-[30%] max-w-xs h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-1 group">
            <span
              className="font-bold text-2xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              N<span className="text-blue-500">V.</span>
            </span>
          </Link>
          <p className="text-[12px] text-slate-500">
            © 2026 Nimmakayala Vishnu. All rights reserved.
          </p>
        </div>

        {/* Middle Quote */}
        <div className="hidden md:flex items-center gap-3 text-blue-500/80">
          <span className="text-2xl leading-none">❝</span>
          <span className="text-[13px] font-medium text-slate-300">
            Building intelligent systems for a smarter future.
          </span>
          <span className="text-2xl leading-none">❞</span>
        </div>

        {/* Right Side Socials */}
        <div className="flex items-center gap-4">
          {[
            { Icon: GithubIcon,   href: 'https://github.com/nvishnu1014',   label: 'GitHub'   },
            { Icon: LinkedinIcon, href: 'https://linkedin.com/in/nvishnu1014', label: 'LinkedIn' },
            { Icon: XTwitterIcon, href: 'https://x.com/nvishnu1014',        label: 'X/Twitter'},
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
