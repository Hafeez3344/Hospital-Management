'use client';

import React from 'react';
import { IPD_BEDS } from '@/lib/mock-data';
import { BedDouble, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const IPDSummary: React.FC = () => {
  const occupiedCount = IPD_BEDS.filter((b) => b.isOccupied).length;
  const totalBeds = IPD_BEDS.length;
  const availableBeds = totalBeds - occupiedCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-teal-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">IPD Ward & Bed Occupancy</h4>
              <p className="text-xs text-slate-500">Live bed allocation & availability status</p>
            </div>
          </div>
          <Link href="/ipd" className="text-xs font-semibold text-teal-600 hover:underline">
            Manage Wards →
          </Link>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-100 p-3 rounded-xl mb-4 border border-slate-200">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">Occupancy Rate ({Math.round((occupiedCount / totalBeds) * 100)}%)</span>
            <span className="text-teal-700">{availableBeds} Beds Free</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(occupiedCount / totalBeds) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quick List of Occupied Beds */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {IPD_BEDS.slice(0, 4).map((bed) => (
            <div
              key={bed.id}
              className="flex items-center justify-between text-xs p-2.5 rounded-lg border border-slate-100 bg-slate-50/60"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${bed.isOccupied ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                <span className="font-bold text-slate-900">{bed.bedNumber}</span>
                <span className="text-[11px] text-slate-500">({bed.wardType})</span>
              </div>
              
              {bed.isOccupied ? (
                <div className="text-right">
                  <span className="font-semibold text-slate-800">{bed.patientName}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">{bed.patientMrn}</span>
                </div>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Available
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
