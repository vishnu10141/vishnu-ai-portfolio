import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, BookOpen, Calendar, Tag,
  Target, BarChart2, Layers, Code2, ImageIcon, ExternalLink, Activity
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Project } from '@/lib/types';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import Image from 'next/image';
import BrainTumorProject from '@/components/projects/BrainTumorProject';
import RadarProject from '@/components/projects/RadarProject';

async function getProject(slug: string): Promise<Project | null> {
  try {
    const q = query(collection(db, 'projects'), where('slug', '==', slug), where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      images: [project.thumbnail || ''],
    }
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Use bespoke layouts for specific featured projects
  if (slug === 'brain-tumor-segmentation') {
    return <BrainTumorProject project={project} />;
  }
  
  if (slug === 'radar-anomaly-detection') {
    return <RadarProject project={project} />;
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* ── Hero banner ── */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 55%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative container-width">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-start gap-4 mb-5">
            <span className="tag-blue">{project.category}</span>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.completionDate || '').toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </div>
            {project.researchType && (
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Activity className="w-3.5 h-3.5" />
                {project.researchType}
              </div>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 max-w-4xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {project.title}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mb-6">{project.shortDescription}</p>

          {/* Action links */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="btn-primary text-sm py-2.5 px-5"
                id="project-github-link"
              >
                <GithubIcon className="w-4 h-4" /> View Code
              </a>
            )}
            {project.pdfUrl && (
              <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="btn-ghost text-sm py-2.5 px-5"
                id="project-paper-link"
              >
                <BookOpen className="w-4 h-4" /> Read Paper
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="btn-ghost text-sm py-2.5 px-5"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-width py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: Main content column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            {project.detailedOverview && (
              <section className="glass rounded-2xl p-7 border border-[rgba(59,130,246,0.1)]">
                <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400" />
                  Technical Overview
                </h2>
                <MarkdownRenderer content={project.detailedOverview} />
              </section>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <section className="glass rounded-2xl p-7 border border-[rgba(59,130,246,0.1)]">
                <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Outcomes & Results
                </h2>
                <MarkdownRenderer content={project.outcomes} />
              </section>
            )}

            {/* Sample Code */}
            {project.sampleCode && (
              <section className="glass rounded-2xl p-7 border border-[rgba(59,130,246,0.1)]">
                <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Sample Implementation
                </h2>
                <MarkdownRenderer content={project.sampleCode} />
              </section>
            )}

            {/* Image gallery */}
            {project.images && project.images.length > 0 && (
              <section className="glass rounded-2xl p-7 border border-[rgba(59,130,246,0.1)]">
                <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <ImageIcon className="w-4 h-4 text-violet-400" />
                  Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.images.map((img, i) => (
                    <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="relative aspect-video rounded-xl overflow-hidden border border-[rgba(59,130,246,0.1)] group">
                      <Image src={img} alt={`${project.title} gallery image ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">

            {/* Applications */}
            {project.applications && (
              <div className="glass rounded-2xl p-5 border border-[rgba(59,130,246,0.1)]">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <Target className="w-4 h-4 text-blue-400" /> Applications
                </h3>
                <MarkdownRenderer content={project.applications} />
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="glass rounded-2xl p-5 border border-[rgba(59,130,246,0.1)]">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <Tag className="w-3.5 h-3.5 text-violet-400" /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tag) => (
                    <span key={tag} className="tag-violet text-[11px]">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Libraries */}
            {project.librariesUsed && project.librariesUsed.length > 0 && (
              <div className="glass rounded-2xl p-5 border border-[rgba(59,130,246,0.1)]">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <Layers className="w-4 h-4 text-cyan-400" /> Libraries Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.librariesUsed.map((lib) => (
                    <span key={lib} className="tag-blue text-[11px]">{lib}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
