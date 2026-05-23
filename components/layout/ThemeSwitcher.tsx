'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const themes = [
  { name: 'Green', value: 'green', color: 'bg-green-500' },
  { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
  { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
  { name: 'Amber', value: 'amber', color: 'bg-amber-500' },
  { name: 'Red', value: 'red', color: 'bg-red-500' },
  { name: 'Cyan', value: 'cyan', color: 'bg-cyan-500' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const currentTheme = themes.find(t => t.value === theme) || themes[1]; // default blue

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-sm font-medium text-slate-300"
      >
        <Sun className="w-4 h-4 text-slate-400" />
        Theme
        <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 p-2 rounded-xl border border-white/10 bg-[#0a101d] shadow-2xl z-50 flex flex-col gap-1"
          >
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={cn("w-3 h-3 rounded-full", t.color)} />
                  <span className={theme === t.value ? "text-white font-medium" : "text-slate-400"}>
                    {t.name}
                  </span>
                </div>
                {theme === t.value && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
