'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal, Loader2, ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { useProjects } from '@/hooks/useProjects';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RadarVisual = dynamic(() => import('@/components/home/visuals/RadarVisual'), { ssr: false });
const LLMVisual = dynamic(() => import('@/components/home/visuals/LLMVisual'), { ssr: false });
const BrainVisual = dynamic(() => import('@/components/home/visuals/BrainVisual'), { ssr: false });

const visualMap: Record<string, any> = {
  'radar': RadarVisual,
  'neural': LLMVisual,
  'brain': BrainVisual,
  'llm': LLMVisual,
  'medical': BrainVisual,
  'custom': RadarVisual,
};

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const { fetchProjects, loading } = useProjects();
  const [projects, setProjects] = useState<any[]>([]);
  
  useEffect(() => {
    fetchProjects().then(res => setProjects(res.sort((a, b) => a.order - b.order)));
  }, [fetchProjects]);

  const CATEGORIES = useMemo(() => {
    return ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const q = query.toLowerCase();
      const matchSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.techStack?.some((t: string) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [query, activeCategory, projects]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      {/* Hero banner */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.05) 0%, transparent 60%)' }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-bold tracking-widest uppercase text-emerald-400"
          >
            Research & Engineering
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            A complete collection of research experiments, engineering tools, and AI applications.
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-[var(--color-bg-base)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="project-search"
                type="search"
                placeholder="Search projects, tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0 mr-2" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-500/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex-shrink-0">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Cinematic Project Stack */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 min-h-[50vh]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24"
            >
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-32 md:space-y-48"
            >
              {filtered.map((project, idx) => {
                const VisualComponent = visualMap[project.visualType] || RadarVisual;
                const isLeft = idx % 2 === 0;
                
                return (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="group relative flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center"
                  >
                    {/* Visual Side */}
                    <div className={`w-full lg:w-[55%] h-[400px] lg:h-[550px] relative rounded-3xl overflow-hidden bg-[#050814] border border-white/5 shadow-2xl ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="absolute inset-0 z-20 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <VisualComponent />
                    </div>

                    {/* Text Side */}
                    <div className={`w-full lg:w-[45%] flex flex-col justify-center ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="mb-4 flex items-center gap-4">
                        <span className="text-emerald-500 font-mono text-sm">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="h-px flex-1 bg-white/10" />
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-emerald-400 text-sm font-medium mb-8">
                        {project.category}
                      </p>
                      
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                        {project.description}
                      </p>

                      <div className="mb-12 space-y-4">
                        {project.metrics && project.metrics.map((achieve: string, i: number) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            <p className="text-slate-300 text-[15px] leading-relaxed">{achieve}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 mt-auto">
                        <Link 
                          href={`/projects/${project.slug}`}
                          className="group/btn inline-flex items-center gap-2 text-[15px] font-medium text-white transition-colors"
                        >
                          View Project
                          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-500 hover:text-white transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />
                            GitHub
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-32 space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Search className="w-7 h-7 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">No projects found</h3>
              <p className="text-sm text-slate-400">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="mt-4 px-4 py-2 text-sm text-emerald-500 hover:text-emerald-400 font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-base" />}>
      <ProjectsContent />
    </Suspense>
  );
}
