'use client';

import React from 'react';
import { IPD_BEDS } from '@/lib/mock-data';
import { BedDouble, Plus, CheckCircle, AlertTriangle } from 'lucide-react';

export default function IPDPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
            IPD & WARD MANAGEMENT
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Inpatient Ward, Rooms & Bed Allocation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor ward occupancy, bed status, patient admissions, daily charges, and discharge readiness.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-md shadow-teal-900/20 flex items-center gap-1.5 self-start sm:self-center">
          <Plus className="w-4 h-4" />
          <span>New IPD Admission</span>
        </button>
      </div>

      {/* Ward Bed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {IPD_BEDS.map((bed) => (
          <div
            key={bed.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between h-40 ${
              bed.isOccupied
                ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <BedDouble className={`w-4 h-4 ${bed.isOccupied ? 'text-amber-600' : 'text-emerald-600'}`} />
                  {bed.bedNumber}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                  bed.isOccupied ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {bed.isOccupied ? 'Occupied' : 'Free'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">{bed.wardName}</p>
            </div>

            {bed.isOccupied ? (
              <div className="border-t border-amber-200/60 pt-2 text-xs">
                <div className="font-bold text-slate-900 truncate">{bed.patientName}</div>
                <div className="text-[10px] text-slate-500">{bed.patientMrn} • {bed.doctorName}</div>
              </div>
            ) : (
              <div className="border-t border-emerald-200/60 pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">Rs. {bed.dailyCharge}/day</span>
                <button className="text-[11px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded">
                  Assign Bed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
