'use client';

import { useEffect, useState } from 'react';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { useProjects } from '@/hooks/useProjects';
import { useParams } from 'next/navigation';
import { Project } from '@/lib/types';

export default function EditProjectPage() {
  const { id } = useParams();
  const { fetchProjectById, loading } = useProjects();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      fetchProjectById(id as string).then(res => setProject(res));
    }
  }, [id, fetchProjectById]);

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-slate-200 p-8 sm:p-12">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
