'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal, Loader2 } from 'lucide-react';
import ProjectCard, { type ProjectCardData } from '@/components/projects/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { useSearchParams } from 'next/navigation';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const { fetchProjects, loading } = useProjects();
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  
  useEffect(() => {
    fetchProjects().then(res => setProjects(res));
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
        p.title.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.technologies?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero banner */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative container-width text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
          >
            Research & Engineering
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            All <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-lg mx-auto"
          >
            A complete collection of research experiments, engineering tools, and AI applications.
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-[rgba(2,8,26,0.85)] backdrop-blur-xl border-b border-[rgba(59,130,246,0.1)]">
        <div className="container-width py-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              id="project-search"
              type="search"
              placeholder="Search projects, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(59,130,246,0.15)] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-[rgba(59,130,246,0.4)] focus:ring-1 focus:ring-[rgba(59,130,246,0.15)] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <SlidersHorizontal className="w-4 h-4 text-text-muted flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-500 text-white border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                    : 'glass-light border border-[rgba(255,255,255,0.08)] text-text-muted hover:text-text-primary hover:border-[rgba(59,130,246,0.2)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result count */}
          <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="container-width py-12 min-h-[50vh]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24"
            >
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl glass border border-[rgba(59,130,246,0.15)] flex items-center justify-center">
                <Search className="w-7 h-7 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">No projects found</h3>
              <p className="text-sm text-text-muted">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="btn-ghost text-sm"
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
