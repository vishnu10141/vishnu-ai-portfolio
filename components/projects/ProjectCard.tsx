'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/types';

export interface ProjectCardData extends Project {
  achievements?: string[];
}

const categoryColors: Record<string, string> = {
  'Computer Vision': 'tag-blue',
  'NLP': 'tag-cyan',
  'Reinforcement Learning': 'tag-violet',
  'MLOps': 'tag-blue',
  'Generative AI': 'tag-violet',
  default: 'tag-blue',
};

/* ── 3D Tilt Hook ── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;   // max 4deg
    const rotY = ((x - cx) / cx) * 4;

    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01,1.01,1.01)`,
      transition: 'transform 0.1s ease',
    });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.4s ease',
    });
  };

  return { ref, style, glowPos, onMouseMove, onMouseLeave };
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const { ref, style, glowPos, onMouseMove, onMouseLeave } = useTilt();
  const tagClass = categoryColors[project.category] || categoryColors.default;

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative group rounded-xl border border-[rgba(59,130,246,0.15)] overflow-hidden bg-[rgba(13,31,60,0.4)] hover:bg-[rgba(13,31,60,0.7)] backdrop-blur-sm transition-colors duration-300 h-full flex flex-col"
      role="article"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,130,246,0.08) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500 pointer-events-none" />

      {/* Content wrapper */}
      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        
        {/* Header: Tag + Links */}
        <div className="flex items-center justify-between mb-5">
          <span className={tagClass}>{project.category}</span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-white transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6 flex-grow">
          <h3
            className="text-xl font-bold text-text-primary group-hover:text-blue-300 transition-colors duration-200 mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {project.title}
          </h3>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          {/* Achievement Bullets */}
          {project.achievements && project.achievements.length > 0 && (
            <ul className="space-y-2 mb-2">
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[14px] text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-blue-500/70 mt-0.5 shrink-0" />
                  <span className="leading-snug">{achievement}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Section: Tech Tags & View Button */}
        <div className="pt-5 border-t border-[rgba(255,255,255,0.05)] mt-auto flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[12px] font-medium text-text-muted bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] py-1 px-2.5 rounded-md">
                {tag}
              </span>
            ))}
            {project.technologies && project.technologies.length > 4 && (
              <span className="text-[12px] font-medium text-text-muted bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] py-1 px-2.5 rounded-md">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="shrink-0 flex items-center gap-1.5 text-[14px] font-semibold text-blue-400 hover:text-cyan-400 transition-colors group/link"
            aria-label={`View ${project.title} details`}
          >
            View Code
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
