'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Search, Sun, Bell } from 'lucide-react';

export function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-[72px] border-b border-white/[0.04] bg-[#050810]/95 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between font-inter">
      
      {/* Title Area */}
      <div className="flex flex-col justify-center">
        <h1 className="text-[20px] font-bold text-white mb-0.5 tracking-tight">Dashboard</h1>
        <p className="text-[12px] text-slate-400 font-medium">Welcome back, Vishnu! Here's what's happening with your portfolio.</p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative hidden md:block shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-slate-500" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-[240px] xl:w-[280px] bg-[#0a0f1c] border border-white/[0.06] rounded-full py-2 pl-9 pr-14 text-[12px] font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-70">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-slate-400 font-mono font-bold">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-slate-400 font-mono font-bold">K</kbd>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Sun className="w-[18px] h-[18px]" />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#050810] flex items-center justify-center text-[8px] font-bold text-white">3</span>
          </button>
        </div>

        {/* User Mini */}
        <div className="flex items-center gap-3 pl-6 border-l border-white/[0.06] shrink-0">
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center bg-slate-800 shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vishnu" className="w-full h-full object-cover" alt="Vishnu" />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <h4 className="text-[13px] font-semibold text-white leading-tight">Vishnu</h4>
            <p className="text-[11px] text-slate-400 font-medium">Admin</p>
          </div>
        </div>

      </div>

    </header>
  );
}
