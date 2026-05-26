'use client';

import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { 
  Folder, Edit3, ImageIcon, Cloud, ExternalLink, Plus, HardDrive, CheckCircle2, Clock, GitCommit, Settings, PlayCircle, LayoutTemplate
} from 'lucide-react';

export default function AdminDashboard() {
  const { fetchProjects } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [fetchProjects]);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects(true);
    setProjects(data);
    setLoading(false);
  };

  const activeProjects = projects.filter(p => p.status === 'published').length;
  const draftProjects = projects.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-6">
      
      {/* Vercel-Style Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: projects.length.toString(), icon: Folder, color: 'text-blue-400' },
          { label: 'Active Featured', value: activeProjects.toString(), icon: PlayCircle, color: 'text-emerald-400' },
          { label: 'Drafts', value: draftProjects.toString(), icon: Edit3, color: 'text-amber-400' },
          { label: 'Media Assets', value: '24', icon: ImageIcon, color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-5 flex flex-col justify-between hover:bg-[#0c1424] transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-slate-400 font-medium">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-70`} />
            </div>
            <div className="mt-4">
              <h3 className="text-[32px] font-bold text-white tracking-tight leading-none">{loading ? '-' : stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Edits & Drafts */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-semibold text-white">Recent Edits</h3>
              <Link href="/admin/projects" className="text-[12px] font-medium text-blue-400 hover:text-blue-300">View All Projects</Link>
            </div>
            <div className="flex flex-col gap-4">
              {loading ? (
                <p className="text-[13px] text-slate-500">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-[13px] text-slate-500">No projects found. Create your first one!</p>
              ) : (
                projects.slice(0, 5).map(project => (
                  <Link href={`/admin/projects/${project.id}/edit`} key={project.id} className="flex items-center justify-between group p-3 -mx-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-[42px] h-[42px] rounded-lg bg-black/50 overflow-hidden border border-white/5 relative shrink-0">
                        <div className="w-full h-full bg-[#050810] flex items-center justify-center">
                          <LayoutTemplate className="w-5 h-5 text-slate-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-slate-200 group-hover:text-blue-400 transition-colors tracking-wide">{project.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>Updated {new Date(project.updatedAt || '').toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                      project.status === 'published' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                    }`}>
                      {project.status}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Deployment & Actions */}
        <div className="space-y-6">
          
          {/* Deployment Status */}
          <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-semibold text-white">Production Deployment</h3>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                READY
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><GitCommit className="w-4 h-4 text-slate-400" /></div>
                <div>
                  <p className="text-[13px] font-medium text-slate-200">Added visual editor configs</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">3 hours ago by Vishnu</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-[12px] text-slate-400">
                <Cloud className="w-4 h-4" />
                <span>Vercel • main branch</span>
              </div>
              
              <div className="pt-2 border-t border-white/[0.04]">
                <button className="w-full py-2.5 bg-white text-black text-[13px] font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                  Trigger Build
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-6">
            <h3 className="text-[14px] font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Create Project', href: '/admin/projects/create', icon: Plus },
                { label: 'Upload Assets', href: '/admin/media', icon: HardDrive },
                { label: 'Theme Settings', href: '/admin/themes', icon: Settings },
              ].map((action, i) => (
                <Link key={i} href={action.href} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] text-slate-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded border border-white/[0.04] flex items-center justify-center bg-[#050810] group-hover:bg-white/[0.04] transition-colors">
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
