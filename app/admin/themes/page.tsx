import { Palette, CheckCircle2 } from 'lucide-react';

export default function ThemesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Theme Engine</h1>
          <p className="text-sm text-slate-400 mt-1">Customize the global aesthetic of your portfolio.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors">
          Deploy Theme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Graphite Dark', active: true, color: 'bg-[#050810]' },
          { name: 'Midnight Blue', active: false, color: 'bg-[#0a1128]' },
          { name: 'Vercel Pitch', active: false, color: 'bg-[#000000]' },
        ].map((theme, i) => (
          <div key={i} className={`p-6 rounded-[14px] border transition-colors cursor-pointer ${
            theme.active ? 'bg-blue-500/5 border-blue-500/50' : 'bg-[#090f1b] border-white/[0.04] hover:border-white/20'
          }`}>
            <div className={`w-full h-32 rounded-lg mb-4 ${theme.color} border border-white/10 flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <Palette className="w-8 h-8 text-white/20" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{theme.name}</span>
              {theme.active && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
