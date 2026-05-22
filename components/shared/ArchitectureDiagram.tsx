'use client';

import React from 'react';

export interface ArchitectureDiagramProps {
  type: string;
}

export function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  return (
    <div className="p-6 border border-white/10 rounded-xl bg-black/20 my-6 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <div className="text-center font-medium text-white">
        Architecture Diagram Placeholder
      </div>
      <div className="text-sm text-slate-400 mt-1">
        Type: {type}
      </div>
    </div>
  );
}
