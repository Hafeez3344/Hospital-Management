'use client';

import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function PrescriptionsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
              DIGITAL PRESCRIPTION SYSTEM
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Doctor Digital Prescriptions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Create, view, and print electronic Rx prescriptions linked directly to Pharmacy dispensing.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>New Prescription (Rx)</span>
          </button>
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="new-prescription" />
    </>
  );
}
