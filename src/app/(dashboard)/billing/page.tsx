'use client';

import React, { useState } from 'react';
import { PATIENTS } from '@/lib/mock-data';
import { Receipt, Plus, DollarSign } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function BillingPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
              BILLING &amp; FINANCE
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Invoices, Payments &amp; Receipts
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Process patient invoices, OPD consultation receipts, IPD discharge bills, and revenue logs.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-900/20 flex items-center gap-1.5 self-start sm:self-center">
            <Plus className="w-4 h-4" />
            <span>Create New Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Billed Today</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Rs. 385,500</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 10.8% vs yesterday</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Collected Cash / Card</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">Rs. 342,000</h3>
            <p className="text-[11px] text-slate-500 mt-1">88.7% Collection Rate</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Outstanding Balances</span>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">Rs. 43,500</h3>
            <p className="text-[11px] text-amber-700 font-medium mt-1">5 Pending IPD Clearances</p>
          </div>
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="create-invoice" />
    </>
  );
}
