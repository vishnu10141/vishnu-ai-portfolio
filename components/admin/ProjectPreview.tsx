'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Activity } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import dynamic from 'next/dynamic';

const RadarVisual = dynamic(() => import('@/components/home/visuals/RadarVisual'), { ssr: false });
const LLMVisual = dynamic(() => import('@/components/home/visuals/LLMVisual'), { ssr: false });
const BrainVisual = dynamic(() => import('@/components/home/visuals/BrainVisual'), { ssr: false });

export function ProjectPreview({ data, visualSettings }: { data: any, visualSettings: any }) {
  const getVisual = () => {
    switch(visualSettings.type) {
      case 'Radar': return <RadarVisual />;
      case 'LLM': return <LLMVisual />;
      case 'Brain': return <BrainVisual />;
      default: return (
        <div className="w-full h-full bg-[#050810] flex items-center justify-center border border-white/5">
           <span className="text-slate-500 text-sm font-medium">No Visual Selected</span>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      
      {/* Background Ambience based on visual setting color if we had one, otherwise dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-emerald-900/5 pointer-events-none" />

      {/* The Core Visual Container */}
      <div className="w-full max-w-[85%] xl:max-w-4xl flex flex-col gap-8 relative z-10">
        
        {/* WebGL Canvas Area */}
        <div className="w-full aspect-video relative rounded-2xl overflow-hidden bg-black/50 shadow-2xl border border-white/[0.02]">
          
          {/* Telemetry Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
              <span className="font-mono text-[9px] text-emerald-400/70 tracking-widest bg-emerald-900/20 px-2 py-0.5 rounded">AXIS_Y: SYNCED</span>
              <span className="font-mono text-[9px] text-emerald-400/70 tracking-widest bg-emerald-900/20 px-2 py-0.5 rounded">TENSOR_OP: 1.2M/s</span>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Activity className="w-3 h-3 text-blue-500 animate-pulse" />
              <span className="font-mono text-[10px] text-blue-400/70">NEURAL_NET_READY</span>
            </div>
          </div>
          
          <div className="w-full h-full origin-center opacity-80 mix-blend-screen scale-110">
             {getVisual()}
          </div>
        </div>

        {/* Live Content Sync Area */}
        <div className="w-full px-4">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                {data.title || 'Project Designation'}
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-widest rounded">
                  {data.category || 'CATEGORY_NULL'}
                </span>
                {data.featured && (
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[11px] font-mono font-bold uppercase tracking-widest rounded">
                    FEATURED
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-2xl">
                {data.shortDescription || 'Data stream empty. Type in the editor panel to establish telemetry sync with this holographic artifact.'}
              </p>
            </div>
            
            {/* Tech Stack Live Sync */}
            <div className="hidden md:flex flex-col gap-2 shrink-0">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase text-right mb-1">Architecture</span>
              {(data.technologies || []).slice(0, 4).map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-[#0a0d14] border border-white/[0.04] rounded-md text-[11px] font-mono text-slate-300 text-right">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
