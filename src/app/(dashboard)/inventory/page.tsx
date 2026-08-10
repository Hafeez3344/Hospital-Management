'use client';

import React from 'react';
import { Package, Plus } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase">
            HOSPITAL INVENTORY MANAGEMENT
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Consumables, Medical Supplies & Equipment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track hospital equipment, medical consumables, vendor purchase orders, and stock requisitions.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>New Stock Item</span>
        </button>
      </div>
    </div>
  );
}
