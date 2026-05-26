'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Save, Layout, Layers, Terminal, Sparkles, Image as ImageIcon, ListOrdered } from 'lucide-react';
import { VisualType } from '@/lib/types';
import { createProject } from '@/lib/firebase/firestore';
import { VisualEngine } from './VisualEngine';
import { SmartContent } from './SmartContent';

const SECTIONS = [
  { id: 'core', label: 'Core Details', icon: Layout },
  { id: 'visual', label: 'Visual Engine', icon: Sparkles },
  { id: 'tech', label: 'Tech Stack', icon: Terminal },
  { id: 'smart', label: 'Smart Content', icon: Layers },
  { id: 'media', label: 'Media System', icon: ImageIcon },
  { id: 'order', label: 'Auto Ordering', icon: ListOrdered },
];

const AVAILABLE_TECH = [
  'Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'React', 'Next.js', 'Firebase', 'AWS', 'Docker', 'TypeScript', 'TailwindCSS', 'Node.js'
];

export function CinematicBuilder() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('core');
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // Tech Stack State
  const [techStack, setTechStack] = useState<string[]>([]);
  
  // Visual Engine State
  const [visualType, setVisualType] = useState<VisualType>('radar');
  const [visualPrompt, setVisualPrompt] = useState('');
  
  // Smart Content State
  const [metrics, setMetrics] = useState<string[]>([]);
  
  // Media State
  const [media, setMedia] = useState<string[]>([]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const projectId = await createProject({
        title,
        slug,
        status: 'published',
        category,
        description,
        longDescription,
        visualType,
        visualPrompt,
        techStack,
        githubUrl,
        liveUrl,
        featured,
        media,
        metrics
      });
      console.log('Project created:', projectId);
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter(t => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  return (
    <div className="flex h-screen bg-[#040812] text-white overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div className="w-72 bg-[#0a101d] border-r border-white/5 p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-bold font-display tracking-tight text-white mb-1">Cinematic Builder</h2>
          <p className="text-xs text-slate-400">AI-Powered Portfolio CMS</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{sec.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/5">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
          >
            {isSaving ? 'Deploying...' : 'Deploy Project'}
            {!isSaving && <Save className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-12 relative">
        {/* Background glow based on section */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          
          {/* SECTION 1: CORE DETAILS */}
          {activeSection === 'core' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Layout className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white font-display">Core Details</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Name</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. Neural Vision AI" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">URL Slug</label>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="neural-vision-ai" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="e.g. Machine Learning" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Tagline</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="One sentence describing the value..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Long Description</label>
                <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={4} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="Detailed Markdown overview..." />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">GitHub URL</label>
                  <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live URL</label>
                  <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full bg-[#0a101d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="https://..." />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-[#0a101d] text-blue-500 focus:ring-blue-500/50" />
                <label htmlFor="featured" className="text-sm text-slate-300 font-medium cursor-pointer">Featured Project (Floats to top)</label>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: VISUAL ENGINE */}
          {activeSection === 'visual' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <VisualEngine 
                visualType={visualType} 
                setVisualType={setVisualType} 
                visualPrompt={visualPrompt} 
                setVisualPrompt={setVisualPrompt} 
              />
            </motion.div>
          )}

          {/* SECTION 3: TECH STACK */}
          {activeSection === 'tech' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white font-display">Tech Stack</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">Click to select the technologies used. Logos, colors, and styling will automatically sync across the portfolio.</p>
              
              <div className="flex flex-wrap gap-3">
                {AVAILABLE_TECH.map((tech) => {
                  const isSelected = techStack.includes(tech);
                  return (
                    <button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isSelected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-[#0a101d] text-slate-400 border border-white/10 hover:border-white/30'}`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SECTION 4: SMART CONTENT */}
          {activeSection === 'smart' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <SmartContent metrics={metrics} setMetrics={setMetrics} />
            </motion.div>
          )}

          {/* SECTION 5: MEDIA SYSTEM */}
          {activeSection === 'media' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
               <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white font-display">Media System</h3>
              </div>
              <p className="text-sm text-slate-400">Upload screenshots, videos, or GLTF 3D models.</p>
              
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center bg-[#0a101d]/50 hover:bg-[#0a101d] transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Drag & Drop Media</h4>
                <p className="text-slate-500 text-sm text-center max-w-sm">
                  Supports PNG, JPG, MP4, WEBM, and .gltf files up to 50MB. (Firebase Storage integration ready).
                </p>
              </div>
            </motion.div>
          )}

          {/* SECTION 6: AUTO ORDERING */}
          {activeSection === 'order' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
               <div className="flex items-center gap-2 mb-6">
                <ListOrdered className="w-5 h-5 text-orange-400" />
                <h3 className="text-xl font-bold text-white font-display">Auto Ordering</h3>
              </div>
              
              <div className="bg-[#0a101d] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <ListOrdered className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Automatic Indexing Active</h4>
                      <p className="text-slate-500 text-xs mt-1">Backend handles ordering automatically</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-wider uppercase">Active</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">
                  When you deploy this project, the system will automatically query the database for <code>max_order</code> and assign this project <code>max_order + 1</code>. Featured projects automatically float to the top of their respective groups on the public site.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
