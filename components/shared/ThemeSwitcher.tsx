'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Palette, Terminal, Zap, Code, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'research', label: 'Research Lab', icon: Monitor },
  { id: 'matrix', label: 'Matrix', icon: Terminal },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: Zap },
  { id: 'vscode', label: 'VS Code One Dark', icon: Code },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg glass border border-transparent animate-pulse" />
    );
  }

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:text-blue-400 hover:bg-[rgba(59,130,246,0.08)] border border-transparent hover:border-[rgba(59,130,246,0.2)] transition-all duration-200"
        aria-label="Switch Theme"
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl border border-[var(--color-border-glow)] shadow-xl overflow-hidden z-50"
            >
              <div className="p-2 space-y-1">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      theme === t.id
                        ? 'bg-[var(--accent-glow-strong)] text-[var(--color-blue-400)]'
                        : 'text-text-secondary hover:bg-[var(--color-bg-elevated)] hover:text-text-primary'
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
