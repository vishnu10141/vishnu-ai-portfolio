'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Bot, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface SmartContentProps {
  metrics: string[];
  setMetrics: (m: string[]) => void;
}

export function SmartContent({ metrics, setMetrics }: SmartContentProps) {
  const [rawInput, setRawInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerate = () => {
    if (!rawInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      // Mock generated bullets based on input
      const generated = [
        `Achieved 0.89 Dice Score on the core validation set`,
        `Optimized MRI segmentation inference pipeline by 40%`,
        `Integrated MONAI distributed training across 4 GPUs`
      ];
      
      setMetrics([...metrics, ...generated]);
      setRawInput('');
      setIsGenerating(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const removeMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-emerald-400" />
        <h3 className="text-xl font-bold text-white font-display">Smart Content Generation</h3>
      </div>
      
      <p className="text-sm text-slate-400 mb-6">
        Don't write manual bullet points. Describe what you built or achieved, and our AI will format it into professional metrics.
      </p>

      <div className="bg-[#0a101d] rounded-xl border border-emerald-500/20 p-1 relative overflow-hidden focus-within:border-emerald-500/50 transition-colors">
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="e.g. Built segmentation pipeline using U-Net for medical scans..."
          className="w-full bg-transparent border-none resize-none px-4 py-3 text-sm text-white focus:outline-none focus:ring-0 min-h-[100px]"
        />
        
        <div className="flex justify-between items-center px-3 py-2 bg-black/20 border-t border-white/5 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-emerald-500 font-mono">
            <Bot className="w-4 h-4" />
            <span>AI Assistant Ready</span>
          </div>
          
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !rawInput.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Auto-Generate Bullets
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 mt-6"
          >
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Generated Metrics</h4>
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#0a101d] border border-white/5 group hover:border-emerald-500/30 transition-colors"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </div>
                <div className="flex-1 text-sm text-slate-300 leading-relaxed">
                  {metric}
                </div>
                <button
                  type="button"
                  onClick={() => removeMetric(idx)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            
            <button
              type="button"
              onClick={() => setMetrics([...metrics, ''])}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2"
            >
              <Plus className="w-4 h-4" />
              Add Manual Metric
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
