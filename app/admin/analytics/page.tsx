import { LineChart, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time traffic and engagement metrics.</p>
        </div>
      </div>

      <div className="h-[400px] bg-[#090f1b] border border-white/[0.04] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        
        <LineChart className="w-12 h-12 text-blue-500/50 mb-4" />
        <h3 className="text-white font-medium text-lg">Analytics Engine Offline</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-sm text-center">
          Vercel Web Analytics is currently being provisioned for your domain. Data will appear here once DNS propagation is complete.
        </p>
        <button className="mt-6 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Check Provisioning Status
        </button>
      </div>
    </div>
  );
}
