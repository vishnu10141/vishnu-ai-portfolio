'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/types';

export interface ProjectCardData extends Project {
  achievements?: string[];
}

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  'Anomaly Detection':  { text: 'text-amber-300',   bg: 'bg-amber-500/[0.08]',  border: 'border-amber-500/20' },
  'NLP':                { text: 'text-cyan-300',     bg: 'bg-cyan-500/[0.08]',   border: 'border-cyan-500/20'  },
  'Computer Vision':    { text: 'text-blue-300',     bg: 'bg-blue-500/[0.08]',   border: 'border-blue-500/20'  },
  'Machine Learning':   { text: 'text-violet-300',   bg: 'bg-violet-500/[0.08]', border: 'border-violet-500/20'},
  default:              { text: 'text-blue-300',     bg: 'bg-blue-500/[0.08]',   border: 'border-blue-500/20'  },
};

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const colors = categoryColors[project.category] || categoryColors.default;

  return (
    <div
      className="group hover-lift relative rounded-2xl border border-white/[0.06] bg-[#081120]/70 backdrop-blur-sm transition-all flex flex-col h-full overflow-hidden"
      role="article"
    >
      {/* Subtle top edge lighting on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-6 flex flex-col h-full">
        {/* Header: Category tag + GitHub icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider ${colors.text} ${colors.bg} border ${colors.border}`}>
              {project.category}
            </span>
            {project.demoUrl ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Deployed
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10">
                Production
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-600 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-[18px] h-[18px]" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3
          className="text-[17px] font-bold text-white mb-1.5 tracking-tight group-hover:text-blue-300 transition-colors duration-200"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {project.title}
        </h3>
        <p className="text-[14px] text-slate-400 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Achievement Bullets */}
        {project.achievements && project.achievements.length > 0 && (
          <ul className="space-y-1.5 mb-5 flex-grow">
            {project.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/60 mt-0.5 shrink-0" />
                <span className="leading-snug">{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom: Tech tags + View Code */}
        <div className="pt-4 border-t border-white/[0.05] mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-slate-500 bg-white/[0.03] border border-white/[0.06] py-0.5 px-2 rounded-md">
                {tag}
              </span>
            ))}
            {project.technologies && project.technologies.length > 4 && (
              <span className="text-[11px] font-medium text-slate-500 bg-white/[0.03] border border-white/[0.06] py-0.5 px-2 rounded-md">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="shrink-0 flex items-center gap-1.5 text-[13px] font-semibold text-blue-400 hover:text-cyan-400 transition-colors group/link overflow-hidden relative"
            aria-label={`View ${project.title} details`}
          >
            <span>View Code</span>
            <div className="relative w-4 h-4 overflow-hidden">
              <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-4 group-hover/link:-translate-y-4" />
              <ArrowUpRight className="absolute inset-0 w-4 h-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover/link:translate-x-0 group-hover/link:translate-y-0" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
