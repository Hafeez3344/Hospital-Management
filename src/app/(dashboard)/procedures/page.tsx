'use client';

import React from 'react';
import { Activity, Plus } from 'lucide-react';

export default function ProceduresPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
            OPERATING THEATRE & PROCEDURES
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Procedure Management & OT Scheduling
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Schedule surgical procedures, OT rooms, anesthesia clearance, and post-op care logs.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Book Procedure / OT</span>
        </button>
      </div>
    </div>
  );
}
