'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import BrainModel from '@/components/projects/BrainModel';

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full">
      <div className="mb-20 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-500 block mb-2">Featured Projects</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Recent Work</h2>
        </div>
        <Link href="/projects" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 group">
          View all projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-32">
        
        {/* PROJECT 1: Radar Anomaly Detection (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Fake Radar UI Image / Dashboard */}
          <div className="w-full aspect-[4/3] rounded-[32px] bg-[#0a0f1c] border border-white/[0.05] p-6 flex flex-col relative overflow-hidden shadow-2xl shadow-black/40">
            {/* Subtle radar grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            
            <div className="relative h-full border border-white/[0.05] rounded-2xl flex items-center justify-center bg-[#050810] shadow-[inset_0_0_50px_rgba(34,197,94,0.02)]">
               {/* Radar Circle */}
               <div className="w-64 h-64 border border-green-500/20 rounded-full flex items-center justify-center relative">
                  <div className="w-48 h-48 border border-green-500/20 rounded-full flex items-center justify-center relative">
                    <div className="w-32 h-32 border border-green-500/20 rounded-full flex items-center justify-center relative">
                      <div className="w-16 h-16 border border-green-500/20 rounded-full flex items-center justify-center relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      </div>
                    </div>
                  </div>
                  {/* Radar Sweep */}
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(34,197,94,0.2)_90deg,transparent_90deg)] animate-[spin_4s_linear_infinite]" />
                  
                  {/* Anomalies */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] border border-red-400 ring-2 ring-red-500/20" />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] border border-red-400 ring-2 ring-red-500/20" />
               </div>
               
               {/* Side Stats Panel */}
               <div className="absolute right-6 top-6 bottom-6 w-48 border-l border-white/[0.05] pl-6 flex flex-col justify-center gap-6">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Detections</p>
                    <p className="text-3xl font-bold text-red-500">24</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">False Positives</p>
                    <p className="text-3xl font-bold text-green-500">-25%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Confidence</p>
                    <p className="text-3xl font-bold text-blue-400">98.7%</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[12px] font-semibold text-slate-500 mb-3 block">01</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Radar Anomaly Detection
              </h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Machine learning system for signal segmentation and false-positive reduction in clutter-heavy radar environments.
              </p>
            </div>

            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-3 text-[14px] text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>Engineered a robust segmentation pipeline reducing false positives by 25%.</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>Deployed optimized XGBoost and SVM models for real-time inference.</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>Developed at DRDO under restricted defense environments.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {['XGBoost', 'Random Forest', 'SVM', 'NumPy'].map((tag) => (
                <span key={tag} className="text-[12px] font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06] py-1.5 px-3.5 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/projects/radar-anomaly-detection"
                className="flex items-center gap-1.5 text-[14px] font-medium text-pink-500 hover:text-pink-400 transition-colors group/link"
              >
                Read Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* PROJECT 2: Brain Tumor Segmentation (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div>
              <span className="text-[12px] font-semibold text-slate-500 mb-3 block">02</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Brain Tumor Segmentation
              </h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
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

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/projects/brain-tumor-segmentation"
                className="flex items-center gap-1.5 text-[14px] font-medium text-pink-500 hover:text-pink-400 transition-colors group/link"
              >
                Read Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right: 3D Interactive Model */}
          <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden order-1 lg:order-2 shadow-2xl shadow-black/40">
            <BrainModel />
          </div>
          
        </div>

      </div>
    </section>
  );
}
