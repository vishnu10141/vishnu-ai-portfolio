'use client';

import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Eye, EyeOff, LayoutDashboard, Settings, FileText, CheckCircle2, Clock } from 'lucide-react';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { fetchProjects, deleteProject } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [fetchProjects]);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects(true); // include drafts
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProject(projectToDelete.id);
      // Optimistic UI Update
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = (project: Project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-200">
      
      {/* Sidebar / Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#020817]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
            </div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Admin Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {user?.email}
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 hover:bg-white/5 text-white/60 hover:text-white rounded-lg transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4"
          >
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Total Projects</p>
              <h3 className="text-2xl font-bold text-white mt-1">{loading ? '-' : projects.length}</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4"
          >
            <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Published</p>
              <h3 className="text-2xl font-bold text-white mt-1">{loading ? '-' : projects.filter(p => p.status === 'published').length}</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4"
          >
            <div className="p-4 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-white/50 font-medium">Drafts</p>
              <h3 className="text-2xl font-bold text-white mt-1">{loading ? '-' : projects.filter(p => p.status === 'draft').length}</h3>
            </div>
          </motion.div>
        </div>

        {/* Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Project Library</h2>
            <Link 
              href="/admin/projects/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-white/40">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="p-24 text-center">
                <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-xl font-semibold text-white">No projects yet</h3>
                <p className="text-white/40 mt-2">Create your first portfolio project to get started.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-14 rounded-lg bg-black/50 border border-white/10 overflow-hidden relative hidden sm:block">
                        {project.thumbnail && (
                          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium text-white">{project.title}</h3>
                          {project.status === 'published' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Draft
                            </span>
                          )}
                          {project.featured && (
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/50 mt-1 flex items-center gap-2">
                          <span>{project.category}</span>
                          <span>•</span>
                          <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.status === 'published' && (
                        <Link href={`/projects/${project.slug}`} target="_blank" className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors" title="View Public">
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-2 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg text-white/60 transition-colors" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => confirmDelete(project)} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-white/60 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone and will permanently remove all associated data.`}
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

    </div>
  );
}
