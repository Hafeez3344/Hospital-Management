'use client';

import React, { useState } from 'react';
import { HeartPulse, Plus } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function NursingPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase">
              NURSING &amp; PATIENT CARE
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Nursing Station &amp; Vital Monitoring
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Log patient vitals, medication administration records (MAR), and nurse shift handover notes.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Record Vitals</span>
          </button>
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="record-vitals" />
    </>
  );
}
