import { Briefcase, Plus } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Experience</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your work history and roles.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Briefcase className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-white font-medium text-lg mb-2">No experience entries</h3>
        <p className="text-slate-400 text-sm max-w-md">
          Add your work history, internships, and research positions to display on your public profile.
        </p>
      </div>
    </div>
  );
}
