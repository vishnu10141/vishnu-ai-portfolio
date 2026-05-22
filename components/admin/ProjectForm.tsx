'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData, projectSchema, ProjectStatus, ResearchType } from '@/lib/validations';
import { TagInput } from './TagInput';
import { Uploader } from './Uploader';
import { useProjects } from '@/hooks/useProjects';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import Image from 'next/image';
import { X, Save, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const { createProject, updateProject, loading: saving } = useProjects();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: '',
      category: '',
      shortDescription: '',
      detailedOverview: '',
      outcomes: '',
      applications: '',
      librariesUsed: [],
      technologies: [],
      sampleCode: '',
      githubUrl: '',
      demoUrl: '',
      status: 'draft',
      featured: false,
      researchType: 'Applied',
      completionDate: new Date().toISOString().split('T')[0],
    },
  });

  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [thumbnail, setThumbnail] = useState<string>(initialData?.thumbnail || '');
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(initialData?.pdfUrl);

  // Auto-slug generator
  const titleValue = form.watch('title');
  const slug = titleValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const onSubmit = async (data: ProjectFormData) => {
    setError(null);
    try {
      if (!thumbnail && images.length > 0) {
        setThumbnail(images[0]);
      } else if (!thumbnail && images.length === 0) {
        throw new Error("You must upload at least one image/thumbnail.");
      }

      const payload = {
        ...data,
        images,
        thumbnail: thumbnail || images[0],
        pdfUrl,
        published: data.status === 'published',
      };

      if (isEdit && initialData?.id) {
        await updateProject(initialData.id, payload);
      } else {
        await createProject(slug, payload);
      }
      
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/40 font-mono">Slug: {slug || '...'}</span>
          <button
            onClick={form.handleSubmit(onSubmit)}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Basic Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm text-white/60">Title</label>
              <input
                {...form.register('title')}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="Project Title"
              />
              {form.formState.errors.title && <p className="text-red-400 text-xs">{form.formState.errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Short Description</label>
              <textarea
                {...form.register('shortDescription')}
                rows={2}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="A brief summary..."
              />
              {form.formState.errors.shortDescription && <p className="text-red-400 text-xs">{form.formState.errors.shortDescription.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60">Category</label>
                <input
                  {...form.register('category')}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  placeholder="e.g., Medical AI"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60">Research Type</label>
                <select
                  {...form.register('researchType')}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none appearance-none"
                >
                  <option value="Applied">Applied</option>
                  <option value="Fundamental">Fundamental</option>
                  <option value="Review">Review</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Rich Content (Markdown Supported)</h2>
            
            <div className="space-y-2">
              <label className="text-sm text-white/60">Detailed Overview</label>
              <textarea
                {...form.register('detailedOverview')}
                rows={6}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none"
                placeholder="# Introduction..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Outcomes / Results</label>
              <textarea
                {...form.register('outcomes')}
                rows={4}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Sample Code</label>
              <textarea
                {...form.register('sampleCode')}
                rows={4}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none"
                placeholder="```python\nimport torch\n```"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Media Gallery</h2>
            
            <Uploader 
              folder={`projects/${slug || 'temp'}/gallery`} 
              onUploadSuccess={(url) => setImages(prev => [...prev, url])} 
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10">
                    <Image src={img} alt="Gallery item" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-all text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {thumbnail !== img && (
                      <button
                        type="button"
                        onClick={() => setThumbnail(img)}
                        className="absolute bottom-2 left-2 right-2 py-1 text-xs bg-black/80 hover:bg-blue-500 rounded-md opacity-0 group-hover:opacity-100 transition-all text-white text-center"
                      >
                        Set as Cover
                      </button>
                    )}
                    {thumbnail === img && (
                      <div className="absolute bottom-2 left-2 right-2 py-1 text-xs bg-blue-500 rounded-md text-white text-center shadow-lg">
                        Cover Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Publishing</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                <input type="checkbox" {...form.register('featured')} className="w-5 h-5 rounded border-white/20 bg-black/20 text-blue-500 focus:ring-0 focus:ring-offset-0" />
                <span className="text-white">Featured Project</span>
              </label>

              <div className="space-y-2">
                <label className="text-sm text-white/60">Status</label>
                <select
                  {...form.register('status')}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none appearance-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/60">Completion Date</label>
                <input
                  type="date"
                  {...form.register('completionDate')}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Tags & Links</h2>
            
            <div className="space-y-2">
              <label className="text-sm text-white/60">Technologies (Required)</label>
              <Controller
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <TagInput tags={field.value} onChange={field.onChange} placeholder="e.g. Next.js, PyTorch" />
                )}
              />
              {form.formState.errors.technologies && <p className="text-red-400 text-xs">{form.formState.errors.technologies.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Libraries Used</label>
              <Controller
                control={form.control}
                name="librariesUsed"
                render={({ field }) => (
                  <TagInput tags={field.value} onChange={field.onChange} placeholder="e.g. Transformers, OpenCV" />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">GitHub URL</label>
              <input
                {...form.register('githubUrl')}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Demo URL</label>
              <input
                {...form.register('demoUrl')}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white">Research Paper (PDF)</h2>
            <Uploader 
              folder={`projects/${slug || 'temp'}/docs`} 
              accept="application/pdf"
              isPdf={true}
              onUploadSuccess={(url) => setPdfUrl(url)} 
            />
            {pdfUrl && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm flex justify-between items-center mt-2">
                <span className="truncate">PDF Uploaded Successfully</span>
                <button type="button" onClick={() => setPdfUrl(undefined)} className="hover:text-white"><X className="w-4 h-4"/></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
