'use client';

import { motion } from 'framer-motion';

export function AnalyticsLineChart() {
  return (
    <div className="w-full h-full relative flex items-end justify-between px-2 pb-6 pt-10">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-6 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full border-b border-white/[0.03]" />
        ))}
      </div>

      {/* Y Axis Labels */}
      <div className="absolute left-0 top-10 bottom-6 flex flex-col justify-between text-[10px] text-slate-500 font-mono">
        <span>8K</span>
        <span>6K</span>
        <span>4K</span>
        <span>2K</span>
        <span>0</span>
      </div>

      {/* SVG Line Chart */}
      <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
        
        {/* Fill Area */}
        <motion.path
          d="M 20,120 L 50,110 L 80,100 L 110,130 L 140,90 L 170,70 L 200,60 L 230,20 L 260,60 L 290,40 L 320,80 L 350,50 L 380,90 L 410,120 L 440,60 L 470,80 L 500,70 L 500,150 L 20,150 Z"
          fill="url(#gradient-blue)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          vectorEffect="non-scaling-stroke"
          transform="scale(1, 1)" // We would normally map this to viewbox but this gives the visual effect for now
        />

        {/* The Line */}
        <motion.path
          d="M 20,120 L 50,110 L 80,100 L 110,130 L 140,90 L 170,70 L 200,60 L 230,20 L 260,60 L 290,40 L 320,80 L 350,50 L 380,90 L 410,120 L 440,60 L 470,80 L 500,70"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          vectorEffect="non-scaling-stroke"
          className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        />
        
        {/* Floating Tooltip Point */}
        <motion.circle 
          cx="230" cy="20" r="4" fill="#60a5fa" stroke="#050810" strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="drop-shadow-[0_0_6px_rgba(96,165,250,1)]"
        />
      </svg>

      {/* Tooltip Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute top-8 left-[40%] bg-[#0a0f1c] border border-white/10 rounded-xl px-3 py-2 shadow-2xl flex flex-col items-center z-10"
      >
        <span className="text-[10px] text-slate-400">May 12, 2025</span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]" />
          <span className="text-xs font-bold text-white">Views: 5,630</span>
        </div>
      </motion.div>

      {/* X Axis Labels */}
      <div className="w-full flex justify-between px-8 text-[10px] text-slate-500 font-mono mt-auto relative z-10">
        <span>Apr 24</span>
        <span>Apr 29</span>
        <span>May 04</span>
        <span>May 09</span>
        <span>May 14</span>
        <span>May 19</span>
        <span>May 24</span>
      </div>
    </div>
  );
}


export function ProjectsDonutChart() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* ML - 41.7% */}
        <motion.circle 
          cx="50" cy="50" r="40" 
          fill="none" stroke="#2563eb" strokeWidth="16" 
          strokeDasharray="250" strokeDashoffset="250"
          animate={{ strokeDashoffset: 145 }} 
          transition={{ duration: 1, delay: 0.2 }}
        />
        {/* DL - 25% */}
        <motion.circle 
          cx="50" cy="50" r="40" 
          fill="none" stroke="#9333ea" strokeWidth="16" 
          strokeDasharray="250" strokeDashoffset="250"
          animate={{ strokeDashoffset: 187 }} 
          transition={{ duration: 1, delay: 0.4 }}
          className="origin-center rotate-[150deg]"
        />
        {/* NLP - 16.7% */}
        <motion.circle 
          cx="50" cy="50" r="40" 
          fill="none" stroke="#06b6d4" strokeWidth="16" 
          strokeDasharray="250" strokeDashoffset="250"
          animate={{ strokeDashoffset: 208 }} 
          transition={{ duration: 1, delay: 0.6 }}
          className="origin-center rotate-[240deg]"
        />
        {/* CV - 16.7% */}
        <motion.circle 
          cx="50" cy="50" r="40" 
          fill="none" stroke="#f59e0b" strokeWidth="16" 
          strokeDasharray="250" strokeDashoffset="250"
          animate={{ strokeDashoffset: 208 }} 
          transition={{ duration: 1, delay: 0.8 }}
          className="origin-center rotate-[300deg]"
        />
      </svg>
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">12</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Total</span>
      </div>
    </div>
  );
}
