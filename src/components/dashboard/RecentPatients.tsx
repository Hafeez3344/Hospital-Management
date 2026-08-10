'use client';

import React from 'react';
import { PATIENTS } from '@/lib/mock-data';
import { User, Activity, FileText } from 'lucide-react';
import Link from 'next/link';

export const RecentPatients: React.FC = () => {
  const recentList = PATIENTS.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Recent Registered Patients</h4>
            <p className="text-xs text-slate-500">Latest active patients and assigned consultants</p>
          </div>
        </div>
        <Link href="/patients" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
          View All Patients →
        </Link>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {recentList.map((patient) => (
          <div
            key={patient.id}
            className="p-3 rounded-xl border border-slate-100 hover:border-teal-200 bg-slate-50/50 hover:bg-teal-50/30 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300">
                {patient.gender === 'Male' ? '👨' : '👩'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-slate-900 text-xs">{patient.name}</h5>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    {patient.mrn}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {patient.gender}, {patient.age} yrs • <span className="font-semibold text-teal-700">{patient.bloodGroup}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-semibold text-slate-800">{patient.assignedDoctor}</div>
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 uppercase ${
                patient.status === 'IPD' ? 'bg-amber-100 text-amber-800' :
                patient.status === 'OPD' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {patient.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
