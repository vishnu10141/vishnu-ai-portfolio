'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/types';

export interface ProjectCardData extends Project {
  achievements?: string[];
  thumbnail?: string;
}

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  'Anomaly Detection':  { text: 'text-amber-300',   bg: 'bg-amber-500/[0.08]',  border: 'border-amber-500/20' },
  'NLP':                { text: 'text-cyan-300',     bg: 'bg-cyan-500/[0.08]',   border: 'border-cyan-500/20'  },
  'Computer Vision':    { text: 'text-blue-300',     bg: 'bg-blue-500/[0.08]',   border: 'border-blue-500/20'  },
  'Machine Learning':   { text: 'text-violet-300',   bg: 'bg-violet-500/[0.08]', border: 'border-violet-500/20'},
  default:              { text: 'text-blue-300',     bg: 'bg-blue-500/[0.08]',   border: 'border-blue-500/20'  },
};

export default function ProjectCard({ project, index = 0 }: { project: ProjectCardData; index?: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16 items-center group`}>
      
      {/* Visual / Image Side */}
      <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-white/[0.02] relative">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
            <span className="text-white/10 text-4xl font-bold tracking-tighter">{project.title.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
        <div className="flex flex-col gap-5">
          
          {/* Number & Title */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 mb-2 block">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3
              className="text-2xl lg:text-[28px] font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[14px] text-slate-300 leading-relaxed max-w-lg">
            {project.shortDescription}
          </p>

          {/* Achievement Bullets */}
          {project.achievements && project.achievements.length > 0 && (
            <ul className="space-y-2 mt-1">
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="leading-snug">{achievement}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack - Subtle Pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies?.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06] py-1 px-3 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 mt-2 flex items-center gap-6">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-[13px] font-medium text-blue-400 hover:text-white transition-colors group/link"
            >
              View Project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
            
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400 hover:text-white transition-colors group/link"
              >
                Live Demo
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
