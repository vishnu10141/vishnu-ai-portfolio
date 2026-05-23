'use client';

import { Project } from '@/lib/types';
import BrainModel from './BrainModel';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BrainTumorProject({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-8 lg:p-16">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
        
        {/* Left: 3D Interactive Model */}
        <div className="w-full aspect-square lg:aspect-[4/3] rounded-2xl">
          <BrainModel />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-6">
          
          <div>
            <span className="text-[12px] font-semibold text-blue-500 mb-3 block">03</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
              Brain Tumor Segmentation
            </h1>
            <p className="text-[15px] text-slate-300 leading-relaxed max-w-lg">
              End-to-end medical imaging system using Residual Attention U-Net on BraTS 2020 with Streamlit visualization.
            </p>
          </div>

          <ul className="space-y-3 mt-2">
            <li className="flex items-start gap-3 text-[14px] text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <span>Achieved Dice score of 0.87 → outperforming baselines.</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <span>Integrated MONAI for scalable distributed training.</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <span>Developed Streamlit dashboard (2D/3D visualization, tumor volume, explainability maps).</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            {['PyTorch', 'MONAI', 'U-Net', 'Streamlit'].map((tag) => (
              <span key={tag} className="text-[12px] font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06] py-1.5 px-3.5 rounded-lg">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-6 flex items-center gap-6">
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-[14px] font-medium text-pink-500 hover:text-pink-400 transition-colors group/link"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </div>
          
        </div>

      </div>
    </div>
  );
}
