'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TerminalLine {
  id: string;
  text: React.ReactNode;
  isCommand?: boolean;
}

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', text: 'AI Research Environment [Version 1.0.0]' },
    { id: '2', text: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Toggle on CMD+J or custom key
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView();
    }
  }, [isOpen, history]);

  const addLine = (text: React.ReactNode, isCommand = false) => {
    setHistory((prev) => [...prev, { id: Date.now().toString() + Math.random(), text, isCommand }]);
  };

  const executeCommand = (cmd: string) => {
    addLine(`$ ${cmd}`, true);
    const cleanCmd = cmd.trim().toLowerCase();

    switch (cleanCmd) {
      case 'help':
        addLine(
          <div className="text-[var(--color-blue-400)]">
            Available commands:<br/>
            projects  - View all projects<br/>
            skills    - View technical stack<br/>
            drdo      - View DRDO Radar Anomaly Detection details<br/>
            tumor     - View Brain Tumor Segmentation details<br/>
            clear     - Clear terminal<br/>
            contact   - Show contact info<br/>
            exit      - Close terminal
          </div>
        );
        break;
      case 'projects':
        addLine('Navigating to projects...');
        router.push('/projects');
        break;
      case 'skills':
        addLine('Technical Stack: Python, PyTorch, Next.js, C++, MONAI...');
        break;
      case 'drdo':
        addLine('DRDO Project: Defense-grade radar anomaly detection system filtering complex clutter using custom DSP & Deep Learning.');
        break;
      case 'tumor':
        addLine('Tumor Project: 3D U-Net architecture achieving +8.5% improvement in Dice Score on low-contrast MRI scans.');
        break;
      case 'contact':
        addLine('Email: nvishnu1014@gmail.com');
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        setIsOpen(false);
        break;
      case '':
        break;
      default:
        addLine(<span className="text-red-400">Command not found: {cmd}. Type "help" for a list of commands.</span>);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <>
      {/* Toggle Button placed in navbar or globally? We will place it globally floating for now, or just rely on CMD+J */}
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_var(--accent-glow-strong)] z-40 bg-[var(--color-bg-card)] border border-[var(--color-border-glow)] text-[var(--color-blue-400)] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <TerminalIcon className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 glass-strong border border-[var(--color-border-glow)] shadow-2xl overflow-hidden flex flex-col font-mono text-sm transition-all duration-300 ${
              isFullscreen 
                ? 'inset-4 rounded-xl' 
                : 'bottom-24 left-6 w-full max-w-[600px] h-[400px] rounded-xl'
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#000000]/40 border-b border-[var(--color-border)] select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-text-muted" />
                <span className="text-text-muted text-xs">user@ai-research:~</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-text-muted hover:text-white transition-colors">
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 text-[var(--color-text-primary)]">
              {history.map((line) => (
                <div key={line.id} className={`mb-1 ${line.isCommand ? 'text-white' : 'text-text-secondary'}`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center mt-2">
                <span className="text-[var(--color-blue-400)] mr-2">➜</span>
                <span className="text-[var(--color-cyan-400)] mr-2">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 m-0"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
