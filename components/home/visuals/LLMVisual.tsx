'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const teluguChars = ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'క', 'చ', 'ట', 'త', 'ప'];

export default function LLMVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden rounded-[32px] flex items-center justify-center transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Architecture Container */}
      <div className="relative w-full max-w-[600px] h-[400px] flex items-center justify-between px-8">
        
        {/* Layer 1: Input (Telugu Tokens) */}
        <div className="flex flex-col gap-4 relative z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={`input-${i}`}
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-[#040812] border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.2)]"
            >
              <span className="text-indigo-400 text-lg font-bold">
                {teluguChars[i]}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Connections 1 to 2 */}
        <div className="absolute left-[80px] w-[120px] h-[200px] flex items-center justify-center z-0">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`particle1-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
              animate={{ 
                x: [-60, 60],
                y: [(i-1.5)*30, (i-1.5)*10],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <path d="M 0 100 Q 60 50 120 100" stroke="#818cf8" strokeWidth="1" fill="none" />
            <path d="M 0 50 Q 60 100 120 100" stroke="#818cf8" strokeWidth="1" fill="none" />
            <path d="M 0 150 Q 60 100 120 100" stroke="#818cf8" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Layer 2: Transformer Blocks (Hidden Dimensions) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="absolute -inset-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl -z-10" />
          <p className="text-[10px] text-indigo-500/60 font-mono absolute -top-8 whitespace-nowrap tracking-wider">TRANSFORMER LAYERS</p>
          {[...Array(4)].map((_, i) => (
            <div key={`hidden-${i}`} className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <motion.div 
                  key={`hidden-${i}-${j}`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: (i*0.2) + (j*0.3) }}
                  className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Connections 2 to 3 */}
        <div className="absolute right-[110px] w-[120px] h-[200px] flex items-center justify-center z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={`particle2-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
              animate={{ 
                x: [-60, 60],
                y: [(i-2)*15, (i-2)*30],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <path d="M 0 100 Q 60 50 120 100" stroke="#60a5fa" strokeWidth="1" fill="none" />
            <path d="M 0 100 Q 60 150 120 100" stroke="#60a5fa" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Layer 3: Output (Embeddings/Generation) */}
        <div className="flex flex-col gap-4 relative z-10">
          {[...Array(2)].map((_, i) => (
            <motion.div 
              key={`output-${i}`}
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
              className="w-24 h-12 rounded-xl bg-[#040812] border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, k) => (
                  <motion.div 
                    key={`bar-${k}`}
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: k * 0.2 }}
                    className="w-1 bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ))}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2">
            <p className="text-[10px] text-blue-500/60 font-mono tracking-widest rotate-90">OUTPUT</p>
          </div>
        </div>

      </div>

    </div>
  );
}
