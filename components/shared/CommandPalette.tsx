'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Terminal, Zap, Code, Home, Folder, Lightbulb, User, Settings, Command } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { setTheme } = useTheme();

  // Toggle on CMD+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const close = () => {
    setIsOpen(false);
    setSearch('');
  };

  const handleSelect = (action: () => void) => {
    action();
    close();
  };

  const actions = [
    { id: 'home', label: 'Go to Home', icon: Home, action: () => router.push('/') },
    { id: 'projects', label: 'View Projects', icon: Folder, action: () => router.push('/projects') },
    { id: 'admin', label: 'Admin Dashboard', icon: Settings, action: () => router.push('/admin') },
    { id: 'theme-research', label: 'Theme: Research Lab', icon: Monitor, action: () => setTheme('research') },
    { id: 'theme-matrix', label: 'Theme: Matrix', icon: Terminal, action: () => setTheme('matrix') },
    { id: 'theme-cyberpunk', label: 'Theme: Cyberpunk', icon: Zap, action: () => setTheme('cyberpunk') },
    { id: 'theme-vscode', label: 'Theme: VS Code One Dark', icon: Code, action: () => setTheme('vscode') },
  ];

  const filtered = search
    ? actions.filter((a) => a.label.toLowerCase().includes(search.toLowerCase()))
    : actions;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-bg-base)]/80 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-[var(--color-border)]">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                autoFocus
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 w-full bg-transparent border-none outline-none text-text-primary px-3 py-4 placeholder:text-text-muted font-sans"
              />
              <div className="flex items-center gap-1 text-xs text-text-muted font-mono bg-[var(--color-bg-card)] px-2 py-1 rounded">
                <Command className="w-3 h-3" /> <span>esc</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-text-muted">No results found.</div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.action)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-text-secondary hover:text-[var(--accent-400)] hover:bg-[var(--accent-glow-strong)] transition-colors group"
                    >
                      <item.icon className="w-5 h-5 group-hover:text-[var(--accent-500)]" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
