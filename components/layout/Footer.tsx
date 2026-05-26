'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Mail, Briefcase, Monitor } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import { InteractiveGlobe } from './InteractiveGlobe';

function ContactCard({ Icon, title, value }: { Icon: any, title: string, value: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="group relative flex items-center justify-between px-6 py-5 rounded-2xl bg-black/40 border border-primary-500/10 overflow-hidden transition-all hover:border-primary-500/30"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--accent-glow-strong),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-12 h-12 rounded-full border border-primary-500/30 flex items-center justify-center shrink-0 bg-black/60 group-hover:border-primary-500/80 transition-all shadow-[0_0_15px_var(--accent-glow-strong)_inset]">
          <Icon className="w-5 h-5 text-primary-500 drop-shadow-[0_0_8px_var(--accent-glow-strong)]" />
        </div>
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.15em] text-primary-500/80 uppercase mb-1">{title}</h4>
          <p className="text-[14px] font-medium text-slate-200">{value}</p>
        </div>
      </div>

      {/* Decorative Dots Matrix on the right */}
      <div className="hidden sm:flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity relative z-10">
        {[...Array(3)].map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1.5">
            {[...Array(4)].map((_, rowIndex) => (
              <div key={rowIndex} className="w-[3px] h-[3px] rounded-full bg-primary-500" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full relative pt-24 pb-12 z-20">
      <div className="container-width max-w-[1400px]">
        
        {/* Contact CTA Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-20 mt-0 mb-8 bg-[var(--color-bg-elevated)]/80 backdrop-blur-xl p-10 lg:p-16 rounded-[32px] border border-white/[0.05] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden group">
          
          {/* Ambient Glows - Dynamic Theme Matches */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-500/10 opacity-30 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-primary-500/10 opacity-20 blur-[150px] rounded-full pointer-events-none transition-colors duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)]/60 via-transparent to-transparent pointer-events-none transition-colors duration-1000" />
          
          {/* Background Tech Lines (Subtle) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(var(--color-primary-500) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-500) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          {/* Left Column: Text & CTA */}
          <div className="flex-1 flex flex-col justify-center space-y-6 max-w-[400px] relative z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_var(--accent-glow-strong)]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary-500">
                LET'S CONNECT
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_var(--accent-glow-strong)]" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              Let's Build<br />Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-[0_0_15px_var(--accent-glow-base)]">Amazing</span>
            </h2>
            <p className="text-[15px] text-slate-400 leading-relaxed max-w-[320px]">
              Open to collaborations, projects, or just a friendly hello. Let's create the future together.
            </p>
          </div>

          {/* Middle Column: Info Cards */}
          <div className="flex-[1.5] flex flex-col justify-center gap-5 relative z-10 w-full max-w-[500px]">
            <ContactCard Icon={Mail} title="Email" value="nvishnu1014@gmail.com" />
            <ContactCard Icon={MapPin} title="Location" value="Hyderabad, India" />
            <ContactCard Icon={Briefcase} title="Roles" value="AI Engineer, ML Engineer, Research Roles" />
          </div>

          {/* Right Column: Globe Visual */}
          <div className="flex-[0.8] hidden lg:flex items-center justify-center relative min-h-[300px] z-10 overflow-visible">
            {/* The interactive WebGL Globe with pedestal and rings */}
            <div className="absolute inset-0 scale-[1.3] translate-x-4">
              <InteractiveGlobe />
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-5 bg-[#0a0a0a] rounded-[24px] border border-white/[0.05]">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center group">
              <span className="font-bold text-2xl text-white tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                N<span className="text-primary-500">V.</span>
              </span>
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <p className="text-[12px] font-medium text-slate-500">
              © 2026 Nimmakayala Vishnu. All rights reserved.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <span className="text-xl leading-none text-primary-500 drop-shadow-[0_0_5px_var(--accent-glow-strong)]">❝</span>
            <span className="text-[12px] font-medium tracking-wide text-slate-400">
              Building intelligent systems for a smarter future.
            </span>
            <span className="text-xl leading-none text-primary-500 drop-shadow-[0_0_5px_var(--accent-glow-strong)]">❞</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { Icon: GithubIcon,   href: 'https://github.com/nvishnu1014',   label: 'GitHub'   },
              { Icon: LinkedinIcon, href: 'https://linkedin.com/in/nvishnu1014', label: 'LinkedIn' },
              { Icon: XTwitterIcon, href: 'https://x.com/nvishnu1014',        label: 'X/Twitter'},
              { Icon: Monitor,      href: '#',                                label: 'Monitor'  },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? "_blank" : undefined}
                rel={href !== '#' ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-white/5 text-slate-400 hover:text-white hover:border-primary-500/50 hover:shadow-[0_0_15px_var(--accent-glow-strong)] transition-all duration-300"
              >
                <Icon className="w-[16px] h-[16px]" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
