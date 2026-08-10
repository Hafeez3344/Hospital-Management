'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { DOCTORS } from '@/lib/mock-data';
import { Calendar, Clock, Stethoscope, User, FileText, CheckCircle } from 'lucide-react';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPatientName?: string;
}

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultPatientName = '',
}) => {
  const [form, setForm] = useState({
    patientName: defaultPatientName,
    patientMrn: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    type: 'OPD' as 'OPD' | 'Follow-up' | 'Emergency' | 'Routine',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.patientName.trim()) e.patientName = 'Patient name is required';
    if (!form.doctorId) e.doctorId = 'Please select a doctor';
    if (!form.date) e.date = 'Please select a date';
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot';
    if (!form.reason.trim()) e.reason = 'Chief complaint is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ patientName: defaultPatientName, patientMrn: '', doctorId: '', date: '', timeSlot: '', type: 'OPD', reason: '' });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const selectedDoctor = DOCTORS.find(d => d.id === form.doctorId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Book OPD Appointment"
      subtitle="Schedule a new patient consultation with an available doctor"
      maxWidth="max-w-xl"
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-sm text-slate-900 mb-1">Appointment Booked!</h3>
          <p className="text-[11px] text-slate-500 max-w-xs">
            <strong>{form.patientName}</strong> has been scheduled with <strong>{selectedDoctor?.name}</strong> on <strong>{form.date}</strong> at <strong>{form.timeSlot}</strong>.
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={handleClose} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
              Close
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-sm"
            >
              Book Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Patient Name & MRN */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5">Patient Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={form.patientName}
                  onChange={e => set('patientName', e.target.value)}
                  placeholder="Full name"
                  className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all ${errors.patientName ? 'border-rose-400' : 'border-slate-200'}`}
                />
              </div>
              {errors.patientName && <p className="text-[10px] text-rose-500 mt-1">{errors.patientName}</p>}
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5">MRN (optional)</label>
              <input
                type="text"
                value={form.patientMrn}
                onChange={e => set('patientMrn', e.target.value)}
                placeholder="MRN-2026-XXXX"
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5">Consultant Doctor *</label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select
                value={form.doctorId}
                onChange={e => set('doctorId', e.target.value)}
                className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 appearance-none transition-all ${errors.doctorId ? 'border-rose-400' : 'border-slate-200'}`}
              >
                <option value="">Select a doctor...</option>
                {DOCTORS.map(d => (
                  <option key={d.id} value={d.id}>{d.name} — {d.department} (Rs. {d.consultationFee})</option>
                ))}
              </select>
            </div>
            {errors.doctorId && <p className="text-[10px] text-rose-500 mt-1">{errors.doctorId}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5">Appointment Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all ${errors.date ? 'border-rose-400' : 'border-slate-200'}`}
                />
              </div>
              {errors.date && <p className="text-[10px] text-rose-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5">Time Slot *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <select
                  value={form.timeSlot}
                  onChange={e => set('timeSlot', e.target.value)}
                  className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 appearance-none transition-all ${errors.timeSlot ? 'border-rose-400' : 'border-slate-200'}`}
                >
                  <option value="">Select time...</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {errors.timeSlot && <p className="text-[10px] text-rose-500 mt-1">{errors.timeSlot}</p>}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5">Visit Type</label>
            <div className="flex gap-2 flex-wrap">
              {(['OPD', 'Follow-up', 'Emergency', 'Routine'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('type', t)}
                  className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all ${
                    form.type === t
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5">Chief Complaint / Reason *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
              <textarea
                value={form.reason}
                onChange={e => set('reason', e.target.value)}
                placeholder="Describe the patient's main complaint..."
                rows={3}
                className={`w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all resize-none ${errors.reason ? 'border-rose-400' : 'border-slate-200'}`}
              />
            </div>
            {errors.reason && <p className="text-[10px] text-rose-500 mt-1">{errors.reason}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm shadow-teal-900/20">
              Book Appointment
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
};
