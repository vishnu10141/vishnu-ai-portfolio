'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Save, GripVertical, Trash2, Code2, MapPin } from 'lucide-react';
import { Experience } from '@/lib/types';
import { subscribeToExperiences, createExperience, updateExperienceOrders } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/client';
import { doc, deleteDoc } from 'firebase/firestore';

export function TimelineCMS() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Form state
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [logo, setLogo] = useState('');
  const [contributions, setContributions] = useState<string[]>(['']);
  const [stack, setStack] = useState<string[]>(['']);

  useEffect(() => {
    const unsubscribe = subscribeToExperiences((data) => {
      setExperiences(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!company || !role || !duration) return;
    setIsSaving(true);
    try {
      await createExperience({
        company,
        role,
        duration,
        logo,
        contributions: contributions.filter(c => c.trim() !== ''),
        stack: stack.filter(s => s.trim() !== ''),
      });
      setIsAdding(false);
      resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setCompany('');
    setRole('');
    setDuration('');
    setLogo('');
    setContributions(['']);
    setStack(['']);
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newExperiences = [...experiences];
    const draggedItem = newExperiences[draggedIdx];
    newExperiences.splice(draggedIdx, 1);
    newExperiences.splice(idx, 0, draggedItem);
    
    // Update order values internally to reflect UI immediately
    const ordered = newExperiences.map((exp, i) => ({ ...exp, order: i + 1 }));
    setExperiences(ordered);
    setDraggedIdx(idx);
  };

  const handleDragEnd = async () => {
    setDraggedIdx(null);
    // Persist new orders to backend
    const updates = experiences.map((exp) => ({ id: exp.id, order: exp.order }));
    try {
      await updateExperienceOrders(updates);
    } catch (error) {
      console.error("Failed to update orders", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Timeline CMS</h1>
          <p className="text-sm text-slate-400 mt-1">Live rendering professional journey management.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Experience</>}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0a101d] border border-emerald-500/30 p-6 rounded-2xl space-y-6 overflow-hidden"
          >
            <h3 className="text-lg font-bold text-white mb-4">New Timeline Entry</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company / Org</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none" placeholder="e.g. Google" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none" placeholder="e.g. Senior AI Engineer" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none" placeholder="e.g. Jan 2023 - Present" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Logo URL / Emoji</label>
                <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none" placeholder="URL or Emoji (e.g. 🏢)" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Contributions (Bullets)</label>
              {contributions.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={c} onChange={(e) => {
                    const newC = [...contributions];
                    newC[i] = e.target.value;
                    setContributions(newC);
                  }} className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none text-sm" placeholder="e.g. Architected distributed training pipeline..." />
                </div>
              ))}
              <button onClick={() => setContributions([...contributions, ''])} className="text-emerald-500 text-sm font-semibold hover:text-emerald-400 mt-2">+ Add Bullet</button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tech Stack (Comma Separated)</label>
              <input type="text" value={stack.join(', ')} onChange={(e) => setStack(e.target.value.split(',').map(s => s.trim()))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none" placeholder="Python, PyTorch, AWS..." />
            </div>

            <button onClick={handleSave} disabled={isSaving} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
              {isSaving ? 'Deploying...' : 'Publish to Timeline'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {experiences.length === 0 && !isAdding && (
          <div className="bg-[#090f1b] border border-white/[0.04] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-white font-medium text-lg mb-2">Timeline is empty</h3>
            <p className="text-slate-400 text-sm max-w-md">Backend indexing is waiting for your first experience entry.</p>
          </div>
        )}

        {experiences.map((exp, idx) => (
          <div 
            key={exp.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-move ${draggedIdx === idx ? 'opacity-50 bg-white/5 border-emerald-500/50' : 'bg-[#0a101d] border-white/5 hover:border-white/20 hover:bg-[#0f172a]'}`}
          >
            <GripVertical className="w-5 h-5 text-slate-500" />
            <div className="w-12 h-12 bg-black rounded-lg border border-white/10 flex items-center justify-center text-xl shrink-0 overflow-hidden">
              {exp.logo && exp.logo.startsWith('http') ? <img src={exp.logo} className="w-full h-full object-cover" /> : exp.logo || '🏢'}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg">{exp.role}</h4>
              <p className="text-emerald-400 text-sm font-semibold">{exp.company} <span className="text-slate-500 font-normal">| {exp.duration}</span></p>
            </div>
            <div className="flex gap-2">
              {exp.stack.slice(0,3).map(s => (
                <span key={s} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 border border-white/10">{s}</span>
              ))}
              {exp.stack.length > 3 && <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-500 border border-white/10">+{exp.stack.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
