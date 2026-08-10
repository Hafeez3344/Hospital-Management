'use client';

import React from 'react';
import { LAB_ORDERS } from '@/lib/mock-data';
import { TestTube, Plus, CheckCircle2, Clock, FileText } from 'lucide-react';

export default function LabPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase">
            PATHOLOGY & DIAGNOSTIC LAB
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Lab Orders, Sample Collection & Test Verification
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Process doctor lab test requisitions, record test findings, upload reports, and verify diagnostic output.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors shadow-md shadow-purple-900/20 flex items-center gap-1.5 self-start sm:self-center">
          <Plus className="w-4 h-4" />
          <span>New Lab Order</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm">
          Pending & Active Diagnostic Test Queue
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Order No & Date</th>
                <th className="py-3 px-4">Patient Name & MRN</th>
                <th className="py-3 px-4">Test Name & Category</th>
                <th className="py-3 px-4">Ordering Doctor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {LAB_ORDERS.map((lab) => (
                <tr key={lab.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-slate-900">{lab.orderNo}</div>
                    <div className="text-[10px] text-slate-400">{lab.orderDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{lab.patientName}</div>
                    <div className="text-[11px] text-teal-700 font-mono">{lab.patientMrn}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{lab.testName}</div>
                    <div className="text-[11px] text-slate-500">{lab.category}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium">{lab.doctorName}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      lab.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      lab.status === 'Processing' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-3 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200">
                      Enter Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
