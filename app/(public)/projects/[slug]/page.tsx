import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Code2, Activity } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Project } from '@/lib/types';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import Image from 'next/image';

async function getProject(slug: string): Promise<Project | null> {
  try {
    const q = query(collection(db, 'projects'), where('slug', '==', slug));
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
    description: project.description,
    openGraph: {
      images: [project.media?.[0] || ''],
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

  return (
    <div className="min-h-screen bg-bg-base text-slate-200">
      {/* ── Hero banner ── */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5 bg-[#0a101d]">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
            {project.featured && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Action links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-all"
              >
                <GithubIcon className="w-5 h-5" /> View Source
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                <ExternalLink className="w-5 h-5" /> Live Project
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          
          {/* Left: Main content column */}
          <div className="space-y-12">
            
            {/* Overview / Long Description */}
            {project.longDescription && (
              <section className="prose prose-invert prose-blue max-w-none prose-headings:font-display prose-headings:tracking-tight">
                <MarkdownRenderer content={project.longDescription} />
              </section>
            )}

            {/* Media Gallery */}
            {project.media && project.media.length > 0 && (
              <section className="space-y-4 pt-8 border-t border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Gallery & Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.media.map((url, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-black/50">
                      <Image src={url} alt={`${project.title} media ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-8">
            
            {/* Tech Stack */}
            <div className="bg-[#0a101d] border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics / Achievements */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Key Metrics
                </h3>
                <ul className="space-y-4">
                  {project.metrics.map((metric, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span className="text-sm text-slate-300 leading-relaxed">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
