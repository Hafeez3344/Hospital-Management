'use client';

import React, { useState } from 'react';
import { DOCTORS, PATIENTS } from '@/lib/mock-data';
import { Stethoscope, User, FileText, Plus } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function OPDPage() {
  const activePatient = PATIENTS[0];
  const [notesOpen, setNotesOpen] = useState(false);
  const [rxOpen, setRxOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
              DOCTOR CONSULTATION WORKSPACE
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              OPD Consultation &amp; Clinical Notes
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Record vital signs, clinical history, diagnosis, digital prescription, and lab test orders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active Patient Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                Active Consultation Patient
              </h3>
              <span className="text-xs font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                {activePatient.mrn}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-slate-900">{activePatient.name}</h4>
              <p className="text-xs text-slate-500">{activePatient.gender}, {activePatient.age} yrs • Blood Group: <strong className="text-teal-700">{activePatient.bloodGroup}</strong></p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Blood Pressure</span>
                <strong className="text-slate-800 text-sm">120/80 mmHg</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Pulse Rate</span>
                <strong className="text-slate-800 text-sm">78 bpm</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Temperature</span>
                <strong className="text-slate-800 text-sm">98.6 °F</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SpO2 / Weight</span>
                <strong className="text-slate-800 text-sm">99% / 68 kg</strong>
              </div>
            </div>
          </div>

          {/* Clinical Diagnosis & Notes */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-teal-600" />
              Clinical Notes &amp; Diagnosis Entry
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chief Complaints</label>
                <textarea
                  rows={2}
                  defaultValue="High grade fever (102°F) for 3 days accompanied by dry cough and body ache."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnosis / Assessment</label>
                <input
                  type="text"
                  defaultValue="Acute Viral Upper Respiratory Tract Infection (URTI)"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setNotesOpen(true)}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                >
                  Save Clinical Notes
                </button>
                <button
                  onClick={() => setRxOpen(true)}
                  className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md"
                >
                  Create Digital Prescription →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickActionModal isOpen={notesOpen} onClose={() => setNotesOpen(false)} type="clinical-notes" />
      <QuickActionModal isOpen={rxOpen} onClose={() => setRxOpen(false)} type="create-prescription" />
    </>
  );
}
