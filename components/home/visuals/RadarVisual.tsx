'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RadarVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden rounded-[32px] flex items-center justify-center font-mono transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Vignette / Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02050A_80%)]" />

      {/* Main Radar Container */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        {/* Concentric Rings */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="absolute inset-0 rounded-full border border-green-500/20"
            style={{ transform: `scale(${(i + 1) * 0.25})` }}
          />
        ))}

        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-green-500/20 -translate-x-1/2" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-green-500/20 -translate-y-1/2" />

        {/* Radar Sweep */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(34, 197, 94, 0.4) 0deg, transparent 60deg)',
            transformOrigin: '50% 50%',
          }}
        >
          {/* Leading Edge Line */}
          <div className="absolute top-0 left-1/2 w-px h-1/2 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)] origin-bottom" />
        </motion.div>

        {/* Targets (Blips) */}
        {/* Friendly Target */}
        <motion.div 
          className="absolute top-[30%] left-[60%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <div className="absolute top-3 left-3 text-[10px] text-green-500/80 whitespace-nowrap">
            TRK-01<br/>ALT 15K
          </div>
        </motion.div>

        {/* Anomaly Target (Red) */}
        <motion.div 
          className="absolute top-[70%] left-[30%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2.2 }}
        >
          <motion.div 
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -inset-1 border border-red-500 rounded-full"
          />
          <div className="absolute top-3 left-3 text-[10px] text-red-500/80 whitespace-nowrap">
            ANOMALY<br/>ID: UNK
          </div>
        </motion.div>

        {/* Moving Drone Target */}
        <motion.div 
          className="absolute top-[20%] left-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
          animate={{ 
            x: [0, 50, 100], 
            y: [0, 20, -10],
            opacity: [0.2, 1, 0.2, 1, 0.2, 1, 0.2, 1] // Matches sweep hitting it
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Telemetry Overlays */}
      <div className="absolute top-6 left-6 text-green-500/60 text-[10px] leading-tight hidden sm:block">
        <p className="font-bold text-green-500 mb-1">RADAR SYS V2.4</p>
        <p>LAT: 17.4482 N</p>
        <p>LON: 78.3914 E</p>
        <p>STATUS: ACTIVE SCAN</p>
      </div>

      <div className="absolute bottom-6 right-6 text-right text-green-500/60 text-[10px] leading-tight hidden sm:block">
        <p>SIG STRENGTH: -42dBm</p>
        <p>TARGETS TRACKED: 24</p>
        <p>ANOMALIES: 1</p>
      </div>

    </div>
  );
}
