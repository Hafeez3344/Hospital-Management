'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { DOCTORS } from '@/lib/mock-data';
import { User, Phone, Mail, MapPin, Droplets, CheckCircle } from 'lucide-react';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const NewPatientModal: React.FC<NewPatientModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '',
    bloodGroup: '',
    phone: '',
    email: '',
    address: '',
    assignedDoctor: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.age || isNaN(Number(form.age))) e.age = 'Valid age required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.bloodGroup) e.bloodGroup = 'Blood group is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ name: '', age: '', gender: 'Male', dob: '', bloodGroup: '', phone: '', email: '', address: '', assignedDoctor: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '' });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  // Generate a dummy MRN
  const newMrn = `MRN-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Register New Patient"
      subtitle="Create a new patient medical record in the system"
      maxWidth="max-w-2xl"
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-sm text-slate-900 mb-1">Patient Registered!</h3>
          <p className="text-[11px] text-slate-500 mb-2">
            <strong>{form.name}</strong> has been successfully registered.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-5 py-3 inline-block">
            <p className="text-[10px] text-teal-600 mb-0.5">Assigned MRN</p>
            <p className="text-sm text-teal-800 font-mono">{newMrn}</p>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleClose} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
              Close
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-sm"
            >
              Register Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Section: Personal Info */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-500 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Patient full name"
                    className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all ${errors.name ? 'border-rose-400' : 'border-slate-200'}`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Age *</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                  placeholder="e.g. 34"
                  min="0" max="150"
                  className={`w-full px-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all ${errors.age ? 'border-rose-400' : 'border-slate-200'}`}
                />
                {errors.age && <p className="text-[10px] text-rose-500 mt-1">{errors.age}</p>}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={e => set('dob', e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Gender</label>
                <div className="flex gap-2">
                  {(['Male', 'Female', 'Other'] as const).map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set('gender', g)}
                      className={`flex-1 py-2 text-[11px] rounded-xl border transition-all ${
                        form.gender === g ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Blood Group *</label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={form.bloodGroup}
                    onChange={e => set('bloodGroup', e.target.value)}
                    className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 appearance-none transition-all ${errors.bloodGroup ? 'border-rose-400' : 'border-slate-200'}`}
                  >
                    <option value="">Select...</option>
                    {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                {errors.bloodGroup && <p className="text-[10px] text-rose-500 mt-1">{errors.bloodGroup}</p>}
              </div>

            </div>
          </div>

          {/* Section: Contact */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Contact Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+92 300 0000000"
                    className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all ${errors.phone ? 'border-rose-400' : 'border-slate-200'}`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Email (optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-500 mb-1.5">Home Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                  <textarea
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    placeholder="House #, Street, City"
                    rows={2}
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Doctor */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Medical Assignment</p>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5">Assigned Consultant (optional)</label>
              <select
                value={form.assignedDoctor}
                onChange={e => set('assignedDoctor', e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 appearance-none transition-all"
              >
                <option value="">Select a consultant...</option>
                {DOCTORS.map(d => (
                  <option key={d.id} value={d.name}>{d.name} — {d.department}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Emergency Contact */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Emergency Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Contact Name</label>
                <input type="text" value={form.emergencyName} onChange={e => set('emergencyName', e.target.value)} placeholder="Full name" className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Relation</label>
                <input type="text" value={form.emergencyRelation} onChange={e => set('emergencyRelation', e.target.value)} placeholder="e.g. Spouse" className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all" />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5">Phone</label>
                <input type="tel" value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value)} placeholder="+92 300 0000000" className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm shadow-teal-900/20">
              Register Patient
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
};
