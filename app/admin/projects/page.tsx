'use client';

import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState, useMemo } from 'react';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { Search, Moon, Bell, Plus, Filter, List, Rocket, FileText, Eye, MoreHorizontal, PenTool, ExternalLink, X, GripVertical, Folder } from 'lucide-react';
import { Reorder, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const RadarVisual = dynamic(() => import('@/components/home/visuals/RadarVisual'), { ssr: false });
const LLMVisual = dynamic(() => import('@/components/home/visuals/LLMVisual'), { ssr: false });
const BrainVisual = dynamic(() => import('@/components/home/visuals/BrainVisual'), { ssr: false });

export default function ProjectsPage() {
  const { fetchProjects, updateProject } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects(true).then(data => {
      // Sort by order if available, else date
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setProjects(data);
      if (data.length > 0) setSelectedProject(data[0]);
      setLoading(false);
    });
  }, [fetchProjects]);

  const handleReorder = (newOrder: Project[]) => {
    setProjects(newOrder);
    // In a real app, debounce and save order to backend
    newOrder.forEach((p, idx) => {
      if (p.order !== idx) {
        updateProject(p.id, { order: idx });
      }
    });
  };

  const activeCount = projects.filter(p => p.status === 'published').length;
  const draftCount = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0d14]">
      {/* LEFT/CENTER: Projects List */}
      <div className={`flex-1 flex flex-col ${selectedProject ? 'lg:pr-[380px] xl:pr-[420px]' : ''} transition-all duration-300`}>
        
        {/* HEADER */}
        <header className="px-8 py-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
            <p className="text-[13px] text-slate-400 mt-1">Manage and organize your projects</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" placeholder="Search projects..." 
                className="w-[240px] bg-[#050810] border border-white/[0.04] rounded-lg py-2 pl-9 pr-10 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono">K</kbd>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-white"><Moon className="w-5 h-5" /></button>
              <button className="text-slate-500 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#0a0d14] flex items-center justify-center text-[8px] font-bold text-white">3</span>
              </button>
            </div>

            <Link href="/admin/projects/create" className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#050810] rounded-lg text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" /> New Project
            </Link>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar">
          
          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Projects" value={projects.length} detail="↑ 2 this month" icon={Folder} />
            <StatCard label="Published" value={activeCount} detail={`${Math.round((activeCount/Math.max(projects.length,1))*100)}% of total`} icon={Rocket} />
            <StatCard label="Drafts" value={draftCount} detail={`${Math.round((draftCount/Math.max(projects.length,1))*100)}% of total`} icon={FileText} color="text-amber-500" />
            <StatCard label="Views" value="24.5K" detail="↑ 12.5% this month" icon={Eye} color="text-purple-500" />
          </div>

          {/* TABS & FILTERS */}
          <div className="flex items-center justify-between border-b border-white/[0.04] mb-4">
            <div className="flex gap-6">
              {['All Projects', 'Published', 'Drafts', 'Archived'].map((tab, i) => (
                <button key={tab} className={`pb-3 text-[13px] font-medium transition-colors border-b-2 ${i === 0 ? 'text-white border-emerald-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 pb-3">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/5 text-[12px] text-slate-300 hover:bg-white/5 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/5 text-[12px] text-slate-300 hover:bg-white/5 transition-colors">
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-5">Project</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Views</div>
            <div className="col-span-2">Updated</div>
          </div>

          {/* PROJECTS LIST */}
          {loading ? (
            <div className="py-12 text-center text-slate-500 text-sm">Loading projects...</div>
          ) : (
            <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="space-y-1">
              {projects.map(project => (
                <Reorder.Item 
                  key={project.id} 
                  value={project}
                  className={`grid grid-cols-12 gap-4 items-center p-3 rounded-xl border border-transparent transition-colors cursor-pointer ${
                    selectedProject?.id === project.id 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-[#050810] border-white/[0.02] hover:bg-white/[0.02] hover:border-white/[0.05]'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 p-1">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                      {project.media?.[0] ? <img src={project.media[0]} className="w-full h-full object-cover" /> : <Folder className="w-5 h-5 text-slate-600 m-auto" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-200">{project.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[250px]">{project.description || project.slug}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400">{project.category || 'Uncategorized'}</span>
                  </div>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                      project.status === 'published' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {project.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="col-span-1 text-[12px] text-slate-400">
                    {(Math.random() * 10).toFixed(1)}K
                  </div>

                  <div className="col-span-2 flex items-center justify-between pr-2">
                    <span className="text-[12px] text-slate-500">
                      {new Date(project.updatedAt || '').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <button className="p-1.5 text-slate-500 hover:text-white rounded-md hover:bg-white/5">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}

        </main>
      </div>

      {/* RIGHT SIDEBAR: Inspector Panel */}
      {selectedProject && (
        <aside className="fixed right-0 top-0 bottom-0 w-[380px] xl:w-[420px] bg-[#050810] border-l border-white/[0.04] z-40 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
          
          {/* Top Panel - Visual */}
          <div className="p-6 pb-0 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedProject(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5"/></button>
              <Link href={`/admin/projects/${selectedProject.id}/edit`} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-300">
                <PenTool className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="w-full h-[220px] bg-black border border-white/[0.04] rounded-2xl relative overflow-hidden flex items-center justify-center">
              {/* Lazy loaded visual preview */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl z-20" />
              <div className="w-full h-full scale-[0.6] origin-center opacity-80 mix-blend-screen">
                <VisualRenderer project={selectedProject} />
              </div>
            </div>

            <div className="mt-5 mb-6">
              <h2 className="text-lg font-bold text-white leading-tight">{selectedProject.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  selectedProject.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedProject.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Inspector Tabs */}
            <div className="flex gap-6 border-b border-white/[0.04] mb-6">
              {['Details', 'Tech Stack', 'Media', 'SEO'].map((t, i) => (
                <button key={t} className={`pb-2 text-[12px] font-medium transition-colors border-b-2 ${i === 0 ? 'text-emerald-400 border-emerald-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Panel - Forms */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-6">
            
            <div className="space-y-2">
              <label className="text-[11px] text-slate-500 font-medium">Description</label>
              <textarea 
                className="w-full bg-[#0a0d14] border border-white/[0.04] rounded-lg px-3 py-2 text-[13px] text-slate-300 resize-none outline-none focus:border-emerald-500/50" 
                rows={4}
                defaultValue={selectedProject.description}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-500 font-medium">Category</label>
              <input 
                type="text"
                className="w-full bg-[#0a0d14] border border-white/[0.04] rounded-lg px-3 py-2 text-[13px] text-emerald-400 outline-none focus:border-emerald-500/50"
                defaultValue={selectedProject.category}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-500 font-medium">Project URL</label>
              <div className="flex items-center gap-2 bg-[#0a0d14] border border-white/[0.04] rounded-lg px-3 py-2">
                <input 
                  type="text"
                  className="flex-1 bg-transparent text-[13px] text-slate-300 outline-none"
                  defaultValue={selectedProject.githubUrl || selectedProject.liveUrl}
                />
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="text-[12px] text-slate-300 font-medium">Featured</label>
              <button className={`w-10 h-5 rounded-full relative transition-colors ${selectedProject.featured ? 'bg-emerald-500' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white rounded-full transition-all ${selectedProject.featured ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.04]">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Created</span>
                <span className="text-slate-300">{new Date(selectedProject.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Last Updated</span>
                <span className="text-slate-300">{new Date(selectedProject.updatedAt || '').toLocaleDateString()}</span>
              </div>
            </div>

          </div>

          {/* Bottom Panel - Actions */}
          <div className="p-6 pt-4 border-t border-white/[0.04] bg-[#050810] shrink-0 flex items-center justify-between">
            <button className="text-[12px] font-medium text-red-400 hover:text-red-300 transition-colors">
              Delete Project
            </button>
            <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-[13px] font-bold transition-colors">
              Save Changes
            </button>
          </div>

        </aside>
      )}
    </div>
  );
}

// Mini components for cleanliness

function StatCard({ label, value, detail, icon: Icon, color = 'text-emerald-500' }: any) {
  return (
    <div className="bg-[#050810] border border-white/[0.04] rounded-xl p-4 flex flex-col justify-between hover:border-white/[0.08] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[12px] text-slate-400 font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        <p className={`text-[11px] mt-1 ${color}`}>{detail}</p>
      </div>
    </div>
  );
}

function VisualRenderer({ project }: { project: Project }) {
  // Try to match category/title to a visual, or default
  const title = project.title.toLowerCase();
  if (title.includes('radar')) return <RadarVisual />;
  if (title.includes('brain') || title.includes('medical')) return <BrainVisual />;
  if (title.includes('llm') || title.includes('nlp')) return <LLMVisual />;
  return <RadarVisual />;
}
