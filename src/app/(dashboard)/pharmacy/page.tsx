'use client';

import React, { useState } from 'react';
import { PHARMACY_ALERTS } from '@/lib/mock-data';
import { Pill, Plus, AlertTriangle, Search, ShoppingCart, RefreshCw } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function PharmacyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
              PHARMACY &amp; DRUG DISPENSING
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Medicine Stock &amp; Prescription Dispensing
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage pharmacy stock, batch numbers, low-stock reorders, and digital prescription billing.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-md shadow-emerald-900/20 flex items-center gap-1.5 self-start sm:self-center">
            <Plus className="w-4 h-4" />
            <span>Add New Medicine</span>
          </button>
        </div>

        {/* Stock Alerts Grid */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Inventory Warnings &amp; Low Stock Items
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Item Code &amp; Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Stock Left</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Batch &amp; Expiry</th>
                  <th className="py-3 px-4">Alert Type</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {PHARMACY_ALERTS.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{med.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{med.itemCode}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{med.category}</td>
                    <td className="py-3.5 px-4 font-extrabold text-rose-600">{med.stockQuantity} units</td>
                    <td className="py-3.5 px-4 font-mono">Rs. {med.unitPrice}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>Exp: {med.expiryDate}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Batch: {med.batchNo}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {med.alertType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setOpen(true)} className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200">
                        Re-order Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="add-medicine" />
    </>
  );
}
