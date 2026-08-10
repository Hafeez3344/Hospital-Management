'use client';

import React from 'react';
import { PHARMACY_ALERTS } from '@/lib/mock-data';
import { Pill, AlertTriangle, AlertCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const PharmacyAlerts: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Pharmacy Stock & Expiry Alerts</h4>
              <p className="text-xs text-slate-500">Critical medicine re-order and expiry warnings</p>
            </div>
          </div>
          <Link href="/pharmacy" className="text-xs font-semibold text-teal-600 hover:underline">
            View Inventory →
          </Link>
        </div>

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {PHARMACY_ALERTS.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-100/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.alertType === 'Low Stock'
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">{item.name}</h5>
                  <div className="text-[11px] text-slate-500">
                    Category: <span className="font-medium text-slate-700">{item.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                {item.alertType === 'Low Stock' ? (
                  <div>
                    <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {item.stockQuantity} units left
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Min: {item.minStockLevel}</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Expires {item.expiryDate}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Batch: {item.batchNo}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
