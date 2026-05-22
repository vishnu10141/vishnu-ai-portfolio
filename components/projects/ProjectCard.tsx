'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, BookOpen, ArrowUpRight, ImageIcon } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';

import { Project } from '@/lib/types';
import Image from 'next/image';

export interface ProjectCardData extends Project {}

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
    const rotX = ((y - cy) / cy) * -8;   // max 8deg
    const rotY = ((x - cx) / cx) * 8;

    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`,
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

/* ── Image Placeholder ── */
function CardImagePlaceholder({ category }: { category: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.15)] flex items-center justify-center">
        <ImageIcon className="w-7 h-7 text-blue-500/50" />
      </div>
      <span className="text-xs text-text-muted">Project Cover</span>
    </div>
  );
}

/* ── Project Card ── */
export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const { ref, style, glowPos, onMouseMove, onMouseLeave } = useTilt();
  const tagClass = categoryColors[project.category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative group rounded-2xl border border-[rgba(59,130,246,0.1)] overflow-hidden"
        role="article"
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,130,246,0.12) 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500 pointer-events-none" />

        {/* Card body */}
        <div className="bg-[rgba(13,31,60,0.7)] backdrop-blur-sm">

          {/* ── Image area ── */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#071020]">
            {project.thumbnail ? (
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            ) : (
              <CardImagePlaceholder category={project.category} />
            )}

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-70" />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className={tagClass}>{project.category}</span>
            </div>

            {/* Quick action links */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg glass border border-[rgba(255,255,255,0.1)] text-text-muted hover:text-white hover:border-[rgba(59,130,246,0.4)] transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg glass border border-[rgba(255,255,255,0.1)] text-text-muted hover:text-white hover:border-[rgba(59,130,246,0.4)] transition-all bg-black/40 backdrop-blur-md"
                  aria-label="Research Paper"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* ── Content area ── */}
          <div className="p-5 space-y-3">
            <div>
              <h3
                className="text-base font-semibold text-text-primary group-hover:text-blue-300 transition-colors duration-200 leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-text-muted mt-1 line-clamp-2 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies?.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-blue text-[11px] py-0.5 px-2 rounded-md border border-blue-500/20 bg-blue-500/10 text-blue-300">
                  {tag}
                </span>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                <span className="text-[11px] text-text-muted py-0.5 px-2 border border-white/5 rounded-md">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-cyan-400 transition-colors group/link pt-1"
              aria-label={`View ${project.title} details`}
            >
              View Details
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
