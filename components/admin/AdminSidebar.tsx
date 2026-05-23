'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, FolderKanban, Briefcase, Award, Code2, 
  Image as ImageIcon, LineChart, Search, MessageSquare, 
  Settings, Users, DatabaseBackup, Blocks, ChevronDown, AlignLeft, Palette
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', icon: Home, href: '/admin' },
      { label: 'Projects', icon: FolderKanban, href: '/admin/projects' },
      { label: 'Experience', icon: Briefcase, href: '/admin/experience' },
      { label: 'Skills', icon: Code2, href: '/admin/skills' },
      { label: 'Certifications', icon: Award, href: '/admin/certifications' },
      { label: 'Media', icon: ImageIcon, href: '/admin/media' },
    ]
  },
  {
    title: 'TOOLS',
    items: [
      { label: 'Analytics', icon: LineChart, href: '/admin/analytics' },
      { label: 'SEO', icon: Search, href: '/admin/seo' },
      { label: 'Comments', icon: MessageSquare, href: '/admin/comments' },
      { label: 'Forms', icon: AlignLeft, href: '/admin/forms' },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', icon: Settings, href: '/admin/settings' },
      { label: 'Appearance', icon: Palette, href: '/admin/appearance' },
      { label: 'Users', icon: Users, href: '/admin/users' },
      { label: 'Integrations', icon: Blocks, href: '/admin/integrations' },
      { label: 'Backup', icon: DatabaseBackup, href: '/admin/backup' },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#050810] border-r border-white/[0.04] flex flex-col z-50 font-inter">
      
      {/* Logo Area */}
      <div className="h-[72px] shrink-0 flex items-center px-6">
        <span className="font-bold text-[24px] text-white tracking-tight">
          NV<span className="text-emerald-500">.</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h4 className="text-[10px] font-semibold text-slate-500 tracking-wider mb-2 px-3">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-[15px] h-[15px] ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="tracking-wide">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Profile Area */}
      <div className="p-4 shrink-0">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-white/[0.02] rounded-lg transition-colors border border-transparent hover:border-white/[0.04]">
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-slate-800 shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vishnu" className="w-full h-full object-cover" alt="Vishnu" />
          </div>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-[12px] font-semibold text-slate-200 truncate w-full text-left">Vishnu N.</span>
            <span className="text-[10px] text-slate-500 font-medium">Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        </button>
      </div>

    </aside>
  );
}
