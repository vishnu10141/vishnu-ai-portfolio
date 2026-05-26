'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData, projectSchema } from '@/lib/validations';
import { TagInput } from './TagInput';
import { useProjects } from '@/hooks/useProjects';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';
import { X, Save, ArrowLeft, Settings2, PlayCircle, Eye, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { ProjectPreview } from './ProjectPreview';

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const { createProject, updateProject, loading: saving } = useProjects();
  const [error, setError] = useState<string | null>(null);
  
  const [visualSettings, setVisualSettings] = useState({
    type: 'Radar',
    color: '#10b981', // Emerald default
    speed: 1.0,
    density: 50
  });
  
  const [deploying, setDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  // Accordion state
  const [openSection, setOpenSection] = useState<string>('Core Identity');

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

  const [images, setImages] = useState<string[]>(initialData?.media || []);
  const [thumbnail, setThumbnail] = useState<string>(initialData?.media?.[0] || '');
  
  const titleValue = form.watch('title');
  const slug = titleValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handlePublishFlow = async (data: ProjectFormData) => {
    setError(null);
    try {
      if (!thumbnail && images.length > 0) {
        setThumbnail(images[0]);
      } else if (!thumbnail && images.length === 0) {
        // We'll allow no images for now to not block saving if visual engine is used
      }

      setDeploying(true);
      setDeployStep(1);
      await new Promise(r => setTimeout(r, 600));
      setDeployStep(2);
      await new Promise(r => setTimeout(r, 800));

      const payload = {
        ...data,
        images,
        thumbnail: thumbnail || images[0] || '',
        published: data.status === 'published',
      };

      if (isEdit && initialData?.id) {
        await updateProject(initialData.id, payload);
      } else {
        await createProject(slug, payload);
      }
      
      setDeployStep(3);
      await new Promise(r => setTimeout(r, 400));
      router.push('/admin/projects');
    } catch (err: any) {
      setDeploying(false);
      console.error(err);
      setError(err.message);
    }
  };

  const AccordionHeader = ({ title, icon: Icon, id }: { title: string, icon: any, id: string }) => (
    <button 
      type="button"
      onClick={() => setOpenSection(openSection === id ? '' : id)}
      className="w-full flex items-center justify-between py-4 text-left group transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-[18px] h-[18px] ${openSection === id ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
        <h2 className={`text-[14px] font-bold tracking-[0.1em] uppercase ${openSection === id ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-300'}`}>
          {title}
        </h2>
      </div>
      {openSection === id ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
    </button>
  );

  if (deploying) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black font-mono text-[13px]">
        <div className="w-full max-w-lg p-10 bg-[#050810] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/[0.02]">
            <div className={`h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)] ${deployStep === 1 ? 'w-1/3' : deployStep === 2 ? 'w-2/3' : 'w-full'}`} />
          </div>
          <Rocket className="w-8 h-8 text-emerald-500 mb-6 animate-pulse" />
          <h3 className="text-white font-bold mb-8 text-[15px] tracking-widest uppercase">System Deployment</h3>
          <div className="space-y-4 text-slate-400 text-left w-full max-w-[240px]">
            <div className="flex items-center gap-4">
              {deployStep >= 1 ? <Check /> : <Spinner />}
              <span className={deployStep >= 1 ? 'text-white' : ''}>Syncing telemetry...</span>
            </div>
            <div className="flex items-center gap-4 opacity-80">
              {deployStep >= 2 ? <Check /> : deployStep === 1 ? <Spinner /> : <Wait />}
              <span className={deployStep >= 2 ? 'text-white' : ''}>Writing artifacts...</span>
            </div>
            <div className="flex items-center gap-4 opacity-60">
              {deployStep >= 3 ? <Check /> : deployStep === 2 ? <Spinner /> : <Wait />}
              <span className={deployStep >= 3 ? 'text-white' : ''}>Publishing edge cache...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden font-inter bg-black">
      
      {/* LEFT: Live Preview (55%) */}
      <div className="hidden lg:flex w-[55%] h-full flex-col relative z-10 bg-[#02050A]">
        {/* Holographic Header */}
        <div className="absolute top-6 left-8 flex items-center justify-between right-8 z-30">
           <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/[0.02]">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-emerald-500 text-[10px] font-mono font-bold tracking-widest uppercase">Live Engine Active</span>
           </div>
           <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 tracking-wider">
             <span>MEM: 124MB</span>
             <span>FPS: 60</span>
             <span>NET: SYNCED</span>
           </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <ProjectPreview data={form.watch()} visualSettings={visualSettings} />
        </div>
      </div>

      {/* RIGHT: Editor Panel (45%) */}
      <div className="w-full lg:w-[45%] h-full bg-[#050810] flex flex-col relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/[0.02]">
        
        {/* Workspace Header */}
        <div className="h-[80px] shrink-0 bg-[#050810] px-8 flex items-center justify-between border-b border-white/[0.02]">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="p-2 rounded-full hover:bg-white/[0.02] transition-colors text-slate-500 hover:text-white">
              <ArrowLeft className="w-[18px] h-[18px]" />
            </Link>
            <div className="flex flex-col justify-center">
              <h1 className="text-[16px] font-bold text-white tracking-tight leading-tight">
                {isEdit ? 'Edit Artifact' : 'New Artifact'}
              </h1>
              <span className="text-[11px] font-mono text-slate-500">/{slug || 'untitled'}</span>
            </div>
          </div>
          <button
            onClick={form.handleSubmit(handlePublishFlow)}
            className="px-6 py-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2 tracking-wide uppercase"
          >
            Deploy
          </button>
        </div>

        {/* Control System (Accordions) */}
        <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar">
          {error && (
            <div className="p-4 mb-6 bg-red-500/5 text-red-400 rounded-lg text-sm border border-red-500/10">
              {error}
            </div>
          )}

          <div className="space-y-2 pb-24">
            
            {/* Section 1: Core Identity */}
            <div className="border-b border-white/[0.02]">
              <AccordionHeader title="Core Identity" icon={Settings2} id="Core Identity" />
              {openSection === 'Core Identity' && (
                <div className="pb-8 space-y-5 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Title</label>
                    <input
                      {...form.register('title')}
                      className="w-full bg-[#02050A] border-none rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                      placeholder="Brain Tumor Segmentation"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Category</label>
                      <input
                        {...form.register('category')}
                        className="w-full bg-[#02050A] border-none rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
                        placeholder="Medical AI"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Status</label>
                      <select
                        {...form.register('status')}
                        className="w-full bg-[#02050A] border-none rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Card Snippet</label>
                    <textarea
                      {...form.register('shortDescription')}
                      rows={2}
                      className="w-full bg-[#02050A] border-none rounded-lg px-4 py-3 text-[13px] text-white outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none custom-scrollbar placeholder:text-slate-700"
                      placeholder="Brief technical summary..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Visual Engine */}
            <div className="border-b border-white/[0.02]">
              <AccordionHeader title="Visual Engine" icon={PlayCircle} id="Visual Engine" />
              {openSection === 'Visual Engine' && (
                <div className="pb-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3">
                     <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Render Mode</label>
                     <div className="grid grid-cols-3 gap-3">
                       {['Radar', 'LLM', 'Brain'].map(type => {
                         const isActive = visualSettings.type === type;
                         return (
                           <button
                             key={type}
                             type="button"
                             onClick={() => setVisualSettings({...visualSettings, type})}
                             className={`relative h-[80px] rounded-xl overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${
                               isActive ? 'bg-[#02050A] shadow-[inset_0_0_0_1px_rgba(16,185,129,0.3)]' : 'bg-[#02050A] opacity-50 hover:opacity-80'
                             }`}
                           >
                             {isActive && <div className="absolute inset-0 bg-emerald-500/5" />}
                             <div className={`w-6 h-6 rounded-md mb-2 flex items-center justify-center ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                               <PlayCircle className="w-3 h-3" />
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>{type}</span>
                           </button>
                         );
                       })}
                     </div>
                  </div>

                  <div className="bg-[#02050A] rounded-xl p-5 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono text-slate-500">SPEED_MULTIPLIER</label>
                        <span className="text-[10px] font-mono text-emerald-400">{visualSettings.speed}x</span>
                      </div>
                      <input 
                        type="range" min="0.1" max="3" step="0.1" 
                        value={visualSettings.speed} 
                        onChange={(e) => setVisualSettings({...visualSettings, speed: parseFloat(e.target.value)})}
                        className="w-full h-1 bg-white/5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full cursor-pointer" 
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono text-slate-500">PARTICLE_DENSITY</label>
                        <span className="text-[10px] font-mono text-emerald-400">{visualSettings.density}%</span>
                      </div>
                      <input 
                        type="range" min="10" max="100" step="10" 
                        value={visualSettings.density} 
                        onChange={(e) => setVisualSettings({...visualSettings, density: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/5 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:rounded-full cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Content */}
            <div className="border-b border-white/[0.02]">
              <AccordionHeader title="Content System" icon={Eye} id="Content" />
              {openSection === 'Content' && (
                <div className="pb-8 space-y-5 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Markdown Documentation</label>
                      <span className="text-[9px] font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">.md</span>
                    </div>
                    <textarea
                      {...form.register('detailedOverview')}
                      rows={12}
                      className="w-full bg-[#02050A] border-none rounded-lg px-5 py-4 text-[13px] font-mono text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500/50 custom-scrollbar leading-relaxed"
                      placeholder="## System Architecture&#10;&#10;Describe the network..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Tech Stack</label>
                    <div className="p-2 bg-[#02050A] rounded-lg">
                      <Controller
                        control={form.control}
                        name="technologies"
                        render={({ field }) => (
                          <TagInput tags={field.value} onChange={field.onChange} placeholder="e.g. Next.js, PyTorch..." />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Section 4: Publish */}
            <div className="border-b border-white/[0.02]">
              <AccordionHeader title="Publish & SEO" icon={Rocket} id="Publish" />
              {openSection === 'Publish' && (
                <div className="pb-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between p-4 bg-[#02050A] rounded-lg">
                    <div>
                      <h4 className="text-[13px] font-semibold text-white">Featured Project</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Pin this project to the top of your portfolio.</p>
                    </div>
                    <Controller
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <button 
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${field.value ? 'bg-emerald-500' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white rounded-full transition-all ${field.value ? 'left-[22px]' : 'left-0.5'}`} />
                        </button>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Source Repository</label>
                    <input
                      {...form.register('githubUrl')}
                      className="w-full bg-[#02050A] border-none rounded-lg px-4 py-3 text-[13px] text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500/50"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const Check = () => (
  <div className="w-5 h-5 rounded flex items-center justify-center shrink-0">
    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
  </div>
);

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white/10 border-t-emerald-500 animate-spin shrink-0 ml-0.5" />
);

const Wait = () => (
  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full shrink-0 mx-1.5" />
);
