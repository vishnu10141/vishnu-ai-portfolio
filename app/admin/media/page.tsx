import { ImageIcon, UploadCloud } from 'lucide-react';

export default function MediaPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Media Library</h1>
          <p className="text-sm text-slate-400 mt-1">Manage all uploaded images, assets, and 3D models.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
          <UploadCloud className="w-4 h-4" />
          Upload Assets
        </button>
      </div>

      <div className="bg-[#090f1b] border border-white/[0.04] rounded-[14px] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
          <ImageIcon className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-white font-medium text-lg mb-2">Asset Manager Loading</h3>
        <p className="text-slate-400 text-sm max-w-md">
          The global media repository is syncing with Firebase Storage.
        </p>
      </div>
    </div>
  );
}
