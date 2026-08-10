'use client';

import React from 'react';
import { APPOINTMENTS } from '@/lib/mock-data';
import { AppointmentStatus } from '@/lib/types';
import { Calendar, Clock, CheckCircle2, AlertCircle, PlayCircle, XCircle } from 'lucide-react';

const STATUS_BADGES: Record<AppointmentStatus, { bg: string; text: string; icon: React.ElementType }> = {
  'In-Consultation': { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'In-Consultation', icon: PlayCircle },
  'Confirmed': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Confirmed', icon: CheckCircle2 },
  'Scheduled': { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'Scheduled', icon: Clock },
  'Completed': { bg: 'bg-slate-100 text-slate-700 border-slate-200', text: 'Completed', icon: CheckCircle2 },
  'Cancelled': { bg: 'bg-rose-50 text-rose-700 border-rose-200', text: 'Cancelled', icon: XCircle }
};

export const AppointmentsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-600" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Today's Appointment Schedule</h4>
            <p className="text-xs text-slate-500">Live OPD consultation queue and status</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
          {APPOINTMENTS.length} Scheduled
        </span>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="py-3 px-4">Time & Apt #</th>
              <th className="py-3 px-4">Patient Info</th>
              <th className="py-3 px-4">Doctor & Dept</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {APPOINTMENTS.map((apt) => {
              const statusBadge = STATUS_BADGES[apt.status];
              const StatusIcon = statusBadge.icon;

              return (
                <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {apt.timeSlot}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{apt.appointmentNo}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{apt.patientName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{apt.patientMrn}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{apt.doctorName}</div>
                    <div className="text-[11px] text-slate-500">{apt.department}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {apt.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusBadge.bg}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusBadge.text}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button className="px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200">
                      Consult
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
