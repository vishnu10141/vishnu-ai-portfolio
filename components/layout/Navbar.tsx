'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X as XIcon, Brain, Link2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XTwitterIcon } from '@/components/ui/SocialIcons';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',       href: '/'           },
  { label: 'Projects',   href: '/projects'   },
  { label: 'Research',   href: '/#research'  },
  { label: 'About',      href: '/#about'     },
  { label: 'Contact',    href: '/#contact'   },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { scrollY }               = useScroll();
  const lastYRef                  = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - lastYRef.current;
    setScrolled(y > 40);
    if (y > 80 && diff > 6)  setHidden(true);
    if (diff < -6)            setHidden(false);
    lastYRef.current = y;
  });

  // Close mobile menu on resize
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
            ? 'glass border-b border-[rgba(59,130,246,0.12)] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="container-width flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className="font-display font-bold text-xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              N<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">V.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-4 p-2 px-4 rounded-full bg-[#0a1020]/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-6 py-2.5 text-[15px] font-medium text-slate-400 hover:text-white rounded-full hover:bg-white/[0.06] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center justify-center tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social icons */}
            {[
            { Icon: GithubIcon,   href: 'https://github.com',   label: 'GitHub'   },
              { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { Icon: XTwitterIcon, href: 'https://x.com',        label: 'X/Twitter'},
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-blue-400 hover:bg-[rgba(59,130,246,0.08)] border border-transparent hover:border-[rgba(59,130,246,0.2)] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            
            {/* Theme Switcher */}
            <ThemeSwitcher />
            <Link
              href="/login"
              className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg glass-light text-text-secondary hover:text-text-primary hover:border-[rgba(59,130,246,0.3)] border border-[rgba(255,255,255,0.08)] transition-all duration-200"
            >
              Admin
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass-light border border-[rgba(255,255,255,0.08)] text-text-secondary"
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
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-[rgba(2,8,26,0.7)] backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-strong border-l border-[rgba(59,130,246,0.15)] flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-[rgba(59,130,246,0.12)]">
                <span className="font-display font-bold gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Navigation
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-text-secondary"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <ul className="flex-1 py-6 px-4 space-y-1">
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
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-[rgba(59,130,246,0.06)] hover:border-[rgba(59,130,246,0.15)] border border-transparent transition-all duration-200 text-sm font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer footer */}
              <div className="p-5 border-t border-[rgba(59,130,246,0.12)]">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl glass border border-[rgba(59,130,246,0.2)] text-sm font-semibold text-blue-400 hover:border-[rgba(59,130,246,0.4)] transition-all"
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
