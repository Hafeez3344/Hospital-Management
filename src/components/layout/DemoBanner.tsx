'use client';

import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white text-xs py-1.5 px-4 flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-2 font-medium">
        <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
          <Sparkles className="w-3 h-3 text-teal-300" />
          Interactive Client Demo System
        </span>
        <span className="hidden md:inline text-slate-300">
          CarePulse Hospital Management Software (Single Hospital Demo Edition)
        </span>
      </div>
      <div className="flex items-center gap-3 text-slate-300 text-[11px]">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-teal-400" />
          Static Demo Data Loaded
        </span>
        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono text-[10px]">v1.0.0-foundation</span>
      </div>
    </div>
  );
};
