'use client';

import { ProjectForm } from '@/components/admin/ProjectForm';
import { notFound } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const { fetchProjectById } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectById(params.id).then((data) => {
      if (data) setProject(data);
      setLoading(false);
    });
  }, [params.id, fetchProjectById]);
  
  if (loading) {
    return <div className="h-[calc(100vh-72px)] bg-[#02050a] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-[#02050a] text-slate-200">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
