'use client';

import { Project } from '@/lib/types';
import BrainModel from './BrainModel';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function BrainTumorProject({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-[#02060d] flex items-center justify-center p-6 lg:p-16">
      <div className="w-full max-w-[1500px] grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">
        
        {/* Left: 3D Interactive Model */}
        <div className="w-full h-[600px] lg:h-[700px] rounded-3xl relative">
          <BrainModel />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-6 lg:pl-6">
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[14px] font-bold text-cyan-500 tracking-wider">03</span>
              <div className="h-[1px] w-12 bg-cyan-500/30"></div>
            </div>
            <h1 className="text-4xl lg:text-[46px] font-bold text-white tracking-tight mb-4">
              Brain Tumor Segmentation
            </h1>
            <h2 className="text-[12px] font-bold text-cyan-500 tracking-[0.2em] uppercase mb-6">
              Medical Computer Vision
            </h2>
            <p className="text-[15px] text-slate-300 leading-relaxed max-w-lg mb-6">
              Deep learning pipeline for 3D MRI brain tumor segmentation. Achieved state-of-the-art Dice scores on the BraTS dataset.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-4 text-[14px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="leading-relaxed">Achieved 0.92 Dice score on BraTS test set.</span>
            </li>
            <li className="flex items-start gap-4 text-[14px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="leading-relaxed">Optimized 3D convolutions for 40% faster training.</span>
            </li>
            <li className="flex items-start gap-4 text-[14px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="leading-relaxed">Integrated MONAI for robust medical image transforms.</span>
            </li>
          </ul>

          <div className="pt-8 flex items-center gap-6">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-transparent border border-cyan-500/40 text-[13px] font-bold text-cyan-400 hover:bg-cyan-500/10 transition-colors group/link"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
          
        </div>

      </div>
    </div>
  );
}
