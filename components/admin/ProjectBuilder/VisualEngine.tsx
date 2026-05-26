'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Brain, Cpu, Database, Stethoscope, Wand2 } from 'lucide-react';
import { VisualType } from '@/lib/types';

interface VisualEngineProps {
  visualType: VisualType;
  setVisualType: (v: VisualType) => void;
  visualPrompt: string;
  setVisualPrompt: (p: string) => void;
}

const VISUAL_OPTIONS: { id: VisualType; label: string; icon: any; desc: string }[] = [
  { id: 'radar', label: 'Radar Visual', icon: Activity, desc: '3D rotating radar for tracking / signal projects.' },
  { id: 'brain', label: '3D Brain', icon: Brain, desc: 'Holographic brain for AI / Medical projects.' },
  { id: 'neural', label: 'Neural Network', icon: Cpu, desc: 'Flowing node connections for deep learning.' },
  { id: 'llm', label: 'LLM Pipeline', icon: Database, desc: 'Data streams and token processing.' },
  { id: 'medical', label: 'Medical Dashboard', icon: Stethoscope, desc: 'Healthcare UI overlay.' },
  { id: 'custom', label: 'Custom Prompt', icon: Wand2, desc: 'AI-generated visual from description.' },
];

export function VisualEngine({ visualType, setVisualType, visualPrompt, setVisualPrompt }: VisualEngineProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold text-white font-display">Visual Engine</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {VISUAL_OPTIONS.map((opt) => {
          const isSelected = visualType === opt.id;
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => setVisualType(opt.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-[#0a101d] border-white/5 hover:border-white/20'}`}
            >
              <Icon className={`w-6 h-6 mb-3 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
              <div className={`font-semibold text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{opt.label}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{opt.desc}</div>
            </div>
          );
        })}
      </div>

      {visualType === 'custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5"
        >
          <label className="block text-sm font-medium text-purple-300 mb-2">Describe your project visualization...</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={visualPrompt}
              onChange={(e) => setVisualPrompt(e.target.value)}
              placeholder="e.g. Interactive 3D rotating radar system with aircraft tracking..."
              className="flex-1 bg-[#0a101d] border border-purple-500/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !visualPrompt}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? 'Generating...' : 'Generate Preview'}
              {!isGenerating && <Wand2 className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Simulated Preview Area */}
          <div className="mt-6 aspect-video bg-black rounded-lg border border-white/10 flex flex-col items-center justify-center overflow-hidden relative">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-purple-400 animate-pulse">AI is rendering your visual...</span>
              </div>
            ) : visualPrompt ? (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black flex items-center justify-center">
                 <span className="text-purple-300/50 text-sm font-mono tracking-widest">[ VISUAL PREVIEW ACTIVE ]</span>
              </div>
            ) : (
              <span className="text-slate-600 text-sm">Preview will appear here</span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
