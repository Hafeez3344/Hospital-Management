'use client';

import React, { useState } from 'react';
import { PATIENTS } from '@/lib/mock-data';
import { Patient, Gender, PatientStatus } from '@/lib/types';
import { BookAppointmentModal } from '@/components/ui/BookAppointmentModal';
import { NewPatientModal } from '@/components/ui/NewPatientModal';
import { Search, Filter, Plus, Users, Eye, Edit, Phone, Mail, Calendar } from 'lucide-react';

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');
  const [patientOpen, setPatientOpen] = useState(false);
  const [apptOpen, setApptOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');

  const filteredPatients = PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search);

    const matchesStatus = statusFilter === 'ALL' || patient.status === statusFilter;
    const matchesGender = genderFilter === 'ALL' || patient.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  return (
    <>
      <div className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
              PATIENT MANAGEMENT
            </span>
            <span className="text-slate-400 text-xs">• 50 Demo Records</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Patient Registry & Medical Files
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Search patient records, view history, MRN numbers, and active admission status.
          </p>
        </div>

        <button
          onClick={() => setPatientOpen(true)}
          className="px-4 py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-md shadow-teal-900/20 flex items-center gap-1.5 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Patient Name, MRN (e.g. MRN-2026-0005) or Phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="OPD">OPD</option>
            <option value="IPD">IPD</option>
            <option value="Discharged">Discharged</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

      </div>

      {/* Patient Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-4">MRN & Patient Name</th>
                <th className="py-3.5 px-4">Demographics</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Assigned Consultant</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.slice(0, 15).map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{patient.name}</div>
                    <div className="text-[10px] text-teal-700 font-mono font-bold bg-teal-50 px-1.5 py-0.5 rounded w-max mt-0.5 border border-teal-200">
                      {patient.mrn}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">
                      {patient.gender}, {patient.age} yrs
                    </div>
                    <div className="text-[11px] text-slate-500">Blood Group: <strong className="text-teal-700">{patient.bloodGroup}</strong></div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-700 font-mono">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {patient.phone}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                      {patient.address}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{patient.assignedDoctor}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {patient.lastVisitDate}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase border ${
                        patient.status === 'IPD'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : patient.status === 'OPD'
                          ? 'bg-teal-50 text-teal-700 border-teal-200'
                          : patient.status === 'Discharged'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button className="px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                      Profile
                    </button>
                    <button
                      onClick={() => { setSelectedPatient(patient.name); setApptOpen(true); }}
                      className="px-2.5 py-1 text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
                    >
                      Book Apt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 15 of {filteredPatients.length} patients matching filters</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              Previous
            </button>
            <span className="font-semibold text-slate-700">Page 1 of 4</span>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>

    <NewPatientModal isOpen={patientOpen} onClose={() => setPatientOpen(false)} />
    <BookAppointmentModal
      isOpen={apptOpen}
      onClose={() => setApptOpen(false)}
      defaultPatientName={selectedPatient}
    />
    </>
  );
}
