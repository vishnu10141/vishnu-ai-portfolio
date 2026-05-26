'use client';
import { motion } from 'framer-motion';

export default function MedicalVisual() {
  return (
    <div className="w-full h-full bg-[#0a101d] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-black to-black" />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full border border-teal-500/30 flex items-center justify-center relative z-10"
      >
        <div className="w-16 h-16 rounded-full bg-teal-500/20 blur-md" />
        <span className="absolute text-teal-500 font-mono text-xs">MEDICAL</span>
      </motion.div>
    </div>
  );
}
