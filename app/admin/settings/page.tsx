import { Settings, Shield, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage infrastructure, security, and global parameters.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors">
          Save Settings
        </button>
      </div>

      <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] divide-y divide-white/[0.04]">
        <div className="p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Administrator Profile</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">Manage your display name, avatar, and contact email.</p>
            <div className="flex gap-4">
              <input type="text" defaultValue="Nimmakayala Vishnu" className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Security Policies</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">Configure authentication and API keys.</p>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
              Manage Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
