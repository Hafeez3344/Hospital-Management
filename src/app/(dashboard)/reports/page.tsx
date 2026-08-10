'use client';

import React, { useState } from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';
import { RevenueTrendChart, DepartmentActivityChart } from '@/components/dashboard/Charts';

export default function ReportsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
              ANALYTICAL REPORTS &amp; AUDIT
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Executive Analytics &amp; Revenue Statements
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate OPD footfall summaries, IPD bed turn-around metrics, pharmacy inventory turnover, and billing reports.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-center">
            <Download className="w-4 h-4" />
            <span>Export Monthly PDF Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RevenueTrendChart />
          <DepartmentActivityChart />
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="export-report" />
    </>
  );
}
