'use client';

import React, { useState } from 'react';
import { APPOINTMENTS, DOCTORS } from '@/lib/mock-data';
import { BookAppointmentModal } from '@/components/ui/BookAppointmentModal';
import { Calendar, Clock, Plus, Filter, UserCheck, Stethoscope } from 'lucide-react';

export default function AppointmentsPage() {
  const [apptOpen, setApptOpen] = useState(false);
  const [defaultPatient, setDefaultPatient] = useState('');
  return (
    <>
      <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
              APPOINTMENTS & OPD QUEUE
            </span>
            <span className="text-slate-400 text-xs">• 38 Today</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Doctor Schedules & OPD Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage OPD consultation slots, patient check-in, token numbers, and doctor availability.
          </p>
        </div>

        <button
          onClick={() => { setDefaultPatient(''); setApptOpen(true); }}
          className="px-4 py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-md shadow-teal-900/20 flex items-center gap-1.5 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Book OPD Appointment</span>
        </button>
      </div>

      {/* Active Doctors Available Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {DOCTORS.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  {doc.roomNumber}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">{doc.name}</h4>
              <p className="text-[11px] text-slate-500 truncate">{doc.department}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Fee: Rs. {doc.consultationFee}</span>
              <span className="font-bold text-teal-600">8 Slots Left</span>
            </div>
          </div>
        ))}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Today's Appointment Roster (Aug 11, 2026)</h3>
          <span className="text-xs text-slate-500 font-medium">Real-time status updates enabled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Token & Time</th>
                <th className="py-3 px-4">Patient Name & MRN</th>
                <th className="py-3 px-4">Consultant Doctor</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Chief Complaint / Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {APPOINTMENTS.map((apt, idx) => (
                <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-slate-900">#{idx + 1} • {apt.timeSlot}</div>
                    <div className="text-[10px] text-slate-400">{apt.appointmentNo}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{apt.patientName}</div>
                    <div className="text-[11px] text-teal-700 font-mono">{apt.patientMrn}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{apt.doctorName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{apt.department}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{apt.reason}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      apt.status === 'In-Consultation' ? 'bg-amber-100 text-amber-800' :
                      apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      apt.status === 'Completed' ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => { setDefaultPatient(apt.patientName); setApptOpen(true); }}
                      className="px-3 py-1 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
                    >
                      Book / Consult
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <BookAppointmentModal
      isOpen={apptOpen}
      onClose={() => setApptOpen(false)}
      defaultPatientName={defaultPatient}
    />
    </>
  );
}
