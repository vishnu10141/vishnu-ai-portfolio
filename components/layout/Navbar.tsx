'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X as XIcon, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',       href: '/'              },
  { label: 'Projects',   href: '#projects'      },
  { label: 'Experience', href: '#experience'    },
  { label: 'Skills',     href: '#skills'        },
  { label: 'Contact',    href: '#contact'       },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY }             = useScroll();
  const lastYRef                = useRef(0);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - lastYRef.current;
    setScrolled(y > 40);
    if (y > 80 && diff > 6)  setHidden(true);
    if (diff < -6)           setHidden(false);
    lastYRef.current = y;
  });

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#020817]/85 backdrop-blur-md border-b border-white/[0.04] py-2.5'
            : 'bg-transparent py-4'
        )}
      >
        <nav className="container-width flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span
              className="font-bold text-xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              N<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">V.</span>
            </span>
          </Link>

          {/* Center nav pill */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-1 py-1.5 px-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <Link
                    href={link.href}
                    className="relative z-10 px-4 py-1 text-[13px] font-medium text-slate-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                  {hoveredPath === link.href && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/[0.06] rounded-full z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { Icon: GithubIcon,   href: 'https://github.com/nvishnu1014',   label: 'GitHub'   },
              { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { Icon: XTwitterIcon, href: 'https://x.com',        label: 'X/Twitter'},
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                <Icon className="w-[15px] h-[15px]" />
              </a>
            ))}

            <ThemeSwitcher />

            <Link
              href="/login"
              className="ml-2 flex items-center justify-center w-7 h-7 text-slate-600 hover:text-slate-300 hover:bg-white/[0.04] rounded-md transition-all duration-200"
              aria-label="Admin Login"
            >
              <Lock className="w-[13px] h-[13px]" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a1020] border-l border-white/[0.06] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <span className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] text-slate-400"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
              <ul className="flex-1 py-4 px-3 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="p-4 border-t border-white/[0.06] flex items-center gap-3">
                {[
                  { Icon: GithubIcon,   href: 'https://github.com/nvishnu1014',   label: 'GitHub'   },
                  { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { Icon: XTwitterIcon, href: 'https://x.com',        label: 'X/Twitter'},
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
