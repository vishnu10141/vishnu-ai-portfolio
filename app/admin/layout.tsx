import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#02050A] text-slate-200">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="pl-[240px] w-full flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
