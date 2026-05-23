'use client';

import { Project } from '@/lib/types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RadarProject({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-8 lg:p-16">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
        
        {/* Left: Fake Radar UI Image / Dashboard */}
        <div className="w-full aspect-[4/3] rounded-2xl bg-[#0a0f1c] border border-white/[0.05] p-6 flex flex-col relative overflow-hidden">
          {/* Subtle radar grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          
          <div className="relative h-full border border-white/[0.05] rounded-xl flex items-center justify-center bg-[#050810] shadow-[inset_0_0_50px_rgba(34,197,94,0.02)]">
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
             <div className="absolute right-6 top-6 bottom-6 w-48 border-l border-white/[0.05] pl-6 flex flex-col gap-6">
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
            <span className="text-[12px] font-semibold text-blue-500 mb-3 block">01</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
              Radar Anomaly Detection
            </h1>
            <p className="text-[15px] text-slate-300 leading-relaxed max-w-lg">
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
