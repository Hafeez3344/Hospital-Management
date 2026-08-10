'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { PATIENTS, DOCTORS } from '@/lib/mock-data';
import { CheckCircle } from 'lucide-react';

export type QuickActionType =
  | 'new-prescription'
  | 'clinical-notes'
  | 'create-prescription'
  | 'new-ipd-admission'
  | 'book-procedure'
  | 'new-lab-order'
  | 'add-medicine'
  | 'new-stock-item'
  | 'create-invoice'
  | 'add-staff'
  | 'export-report'
  | 'save-settings'
  | 'record-vitals';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: QuickActionType;
}

const MODAL_META: Record<QuickActionType, { title: string; subtitle: string }> = {
  'new-prescription':    { title: 'New Prescription (Rx)',       subtitle: 'Create a digital prescription for a patient' },
  'clinical-notes':      { title: 'Save Clinical Notes',         subtitle: 'Record consultation findings and diagnosis' },
  'create-prescription': { title: 'Create Digital Prescription', subtitle: 'Generate and link prescription to pharmacy' },
  'new-ipd-admission':   { title: 'New IPD Admission',           subtitle: 'Admit a patient to an inpatient ward bed' },
  'book-procedure':      { title: 'Book Procedure / OT',         subtitle: 'Schedule a surgical procedure or OT slot' },
  'new-lab-order':       { title: 'New Lab Order',               subtitle: 'Create a diagnostic test requisition' },
  'add-medicine':        { title: 'Add New Medicine',            subtitle: 'Add a new drug to the pharmacy inventory' },
  'new-stock-item':      { title: 'New Stock Item',              subtitle: 'Add medical supplies or equipment to inventory' },
  'create-invoice':      { title: 'Create New Invoice',          subtitle: 'Generate a patient billing invoice' },
  'add-staff':           { title: 'Add Staff Member',            subtitle: 'Register a new hospital staff employee' },
  'export-report':       { title: 'Export Monthly PDF Report',   subtitle: 'Generate and download an analytics report' },
  'save-settings':       { title: 'Save Settings',               subtitle: 'Apply and save configuration changes' },
  'record-vitals':       { title: 'Record Patient Vitals',       subtitle: 'Log patient vital signs and observations' },
};

/* ── small shared helpers ── */
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] text-slate-500 mb-1.5">{label}</label>
    {children}
  </div>
);
const inp = "w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all";
const sel = `${inp} appearance-none`;

/* ── Success screen ── */
const SuccessView = ({ message, onClose, onAgain }: { message: string; onClose: () => void; onAgain: () => void }) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
      <CheckCircle className="w-7 h-7 text-emerald-600" />
    </div>
    <h3 className="text-sm text-slate-900 mb-1">Done!</h3>
    <p className="text-[11px] text-slate-500 max-w-xs">{message}</p>
    <div className="flex gap-3 mt-6">
      <button onClick={onClose} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl">Close</button>
      <button onClick={onAgain} className="px-4 py-2 text-xs bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Do Another</button>
    </div>
  </div>
);

/* ── Individual form bodies ── */

function NewPrescriptionForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', doctor: '', medicine1: '', dose1: '', freq1: '', medicine2: '', dose2: '', freq2: '', notes: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Patient Name *">
          <input required value={form.patient} onChange={e => s('patient', e.target.value)} placeholder="Patient full name" className={inp} />
        </Field>
        <Field label="Consultant Doctor *">
          <select required value={form.doctor} onChange={e => s('doctor', e.target.value)} className={sel}>
            <option value="">Select doctor...</option>
            {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </Field>
      </div>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest pt-1">Medicines</p>
      {[1, 2].map(i => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <Field label={`Medicine ${i}`}><input value={(form as any)[`medicine${i}`]} onChange={e => s(`medicine${i}`, e.target.value)} placeholder="Drug name" className={inp} /></Field>
          <Field label="Dosage"><input value={(form as any)[`dose${i}`]} onChange={e => s(`dose${i}`, e.target.value)} placeholder="500mg" className={inp} /></Field>
          <Field label="Frequency"><input value={(form as any)[`freq${i}`]} onChange={e => s(`freq${i}`, e.target.value)} placeholder="1×daily" className={inp} /></Field>
        </div>
      ))}
      <Field label="Notes / Instructions">
        <textarea value={form.notes} onChange={e => s('notes', e.target.value)} rows={2} placeholder="Special instructions..." className={`${inp} resize-none`} />
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm">Create Prescription</button>
      </div>
    </form>
  );
}

function ClinicalNotesForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', complaint: '', diagnosis: '', plan: '', followup: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <Field label="Patient *">
        <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
          <option value="">Select patient...</option>
          {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name} — {p.mrn}</option>)}
        </select>
      </Field>
      <Field label="Chief Complaint">
        <textarea value={form.complaint} onChange={e => s('complaint', e.target.value)} rows={2} placeholder="Patient's main complaint..." className={`${inp} resize-none`} />
      </Field>
      <Field label="Diagnosis / Assessment">
        <input value={form.diagnosis} onChange={e => s('diagnosis', e.target.value)} placeholder="Clinical diagnosis" className={inp} />
      </Field>
      <Field label="Treatment Plan">
        <textarea value={form.plan} onChange={e => s('plan', e.target.value)} rows={2} placeholder="Medications, procedures, referrals..." className={`${inp} resize-none`} />
      </Field>
      <Field label="Follow-up Date">
        <input type="date" value={form.followup} onChange={e => s('followup', e.target.value)} className={inp} />
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm">Save Notes</button>
      </div>
    </form>
  );
}

function IPDAdmissionForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', doctor: '', ward: '', bed: '', diagnosis: '', admitDate: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Patient Name *">
          <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
            <option value="">Select patient...</option>
            {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </Field>
        <Field label="Admitting Doctor *">
          <select required value={form.doctor} onChange={e => s('doctor', e.target.value)} className={sel}>
            <option value="">Select doctor...</option>
            {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Ward">
          <select value={form.ward} onChange={e => s('ward', e.target.value)} className={sel}>
            <option value="">Select ward...</option>
            {['General Ward', 'Private Room', 'ICU', 'Surgical Ward', 'Maternity Ward', 'Pediatric Ward'].map(w => <option key={w}>{w}</option>)}
          </select>
        </Field>
        <Field label="Bed Number">
          <input value={form.bed} onChange={e => s('bed', e.target.value)} placeholder="e.g. W1-B3" className={inp} />
        </Field>
        <Field label="Admission Date">
          <input type="date" value={form.admitDate} onChange={e => s('admitDate', e.target.value)} className={inp} />
        </Field>
      </div>
      <Field label="Admission Diagnosis *">
        <textarea required value={form.diagnosis} onChange={e => s('diagnosis', e.target.value)} rows={2} placeholder="Primary diagnosis for admission..." className={`${inp} resize-none`} />
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm">Admit Patient</button>
      </div>
    </form>
  );
}

function BookProcedureForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', procedure: '', surgeon: '', otRoom: '', date: '', time: '', anesthesia: 'General' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Patient *">
          <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
            <option value="">Select patient...</option>
            {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </Field>
        <Field label="Procedure Name *">
          <input required value={form.procedure} onChange={e => s('procedure', e.target.value)} placeholder="e.g. Appendectomy" className={inp} />
        </Field>
        <Field label="Surgeon">
          <select value={form.surgeon} onChange={e => s('surgeon', e.target.value)} className={sel}>
            <option value="">Select surgeon...</option>
            {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="OT Room">
          <select value={form.otRoom} onChange={e => s('otRoom', e.target.value)} className={sel}>
            <option value="">Select OT...</option>
            {['OT-1', 'OT-2', 'OT-3 (Minor)', 'OT-4 (Cardiac)', 'OT-5 (Ortho)'].map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Scheduled Date">
          <input type="date" value={form.date} onChange={e => s('date', e.target.value)} min={new Date().toISOString().split('T')[0]} className={inp} />
        </Field>
        <Field label="Scheduled Time">
          <input type="time" value={form.time} onChange={e => s('time', e.target.value)} className={inp} />
        </Field>
      </div>
      <Field label="Anesthesia Type">
        <div className="flex gap-2">
          {['General', 'Local', 'Regional', 'Sedation'].map(a => (
            <button key={a} type="button" onClick={() => s('anesthesia', a)}
              className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all ${form.anesthesia === a ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'}`}>
              {a}
            </button>
          ))}
        </div>
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm">Book Procedure</button>
      </div>
    </form>
  );
}

function LabOrderForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', doctor: '', test: '', category: '', priority: 'Routine', notes: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const TESTS = ['Complete Blood Count (CBC)', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Blood Sugar Fasting', 'HbA1c', 'Urine Routine', 'Thyroid Function (TFT)', 'Chest X-Ray', 'Ultrasound Abdomen', 'ECG'];
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Patient *">
          <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
            <option value="">Select patient...</option>
            {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name} — {p.mrn}</option>)}
          </select>
        </Field>
        <Field label="Ordering Doctor *">
          <select required value={form.doctor} onChange={e => s('doctor', e.target.value)} className={sel}>
            <option value="">Select doctor...</option>
            {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Test Name *">
          <select required value={form.test} onChange={e => s('test', e.target.value)} className={sel}>
            <option value="">Select test...</option>
            {TESTS.map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Sample Type">
          <select value={form.category} onChange={e => s('category', e.target.value)} className={sel}>
            <option value="">Select...</option>
            {['Blood', 'Urine', 'Stool', 'Swab', 'Imaging', 'Biopsy'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Priority">
        <div className="flex gap-2">
          {['Routine', 'Urgent', 'STAT'].map(p => (
            <button key={p} type="button" onClick={() => s('priority', p)}
              className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all ${form.priority === p ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-400'}`}>
              {p}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Clinical Notes">
        <textarea value={form.notes} onChange={e => s('notes', e.target.value)} rows={2} placeholder="Reason / clinical context..." className={`${inp} resize-none`} />
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm">Create Lab Order</button>
      </div>
    </form>
  );
}

function AddMedicineForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ name: '', generic: '', category: '', stock: '', unit: 'Tablet', price: '', batchNo: '', expiry: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Brand Name *"><input required value={form.name} onChange={e => s('name', e.target.value)} placeholder="e.g. Panadol" className={inp} /></Field>
        <Field label="Generic Name"><input value={form.generic} onChange={e => s('generic', e.target.value)} placeholder="e.g. Paracetamol" className={inp} /></Field>
        <Field label="Category">
          <select value={form.category} onChange={e => s('category', e.target.value)} className={sel}>
            <option value="">Select...</option>
            {['Analgesic', 'Antibiotic', 'Antiviral', 'Antidiabetic', 'Cardiac', 'Antihypertensive', 'Vitamin', 'IV Fluid', 'Injection', 'Syrup'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Unit Type">
          <div className="flex gap-1.5 flex-wrap">
            {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Sachet'].map(u => (
              <button key={u} type="button" onClick={() => s('unit', u)}
                className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${form.unit === u ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'}`}>
                {u}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Stock Quantity *"><input required type="number" value={form.stock} onChange={e => s('stock', e.target.value)} placeholder="0" className={inp} /></Field>
        <Field label="Unit Price (Rs.)"><input type="number" value={form.price} onChange={e => s('price', e.target.value)} placeholder="0.00" className={inp} /></Field>
        <Field label="Batch No."><input value={form.batchNo} onChange={e => s('batchNo', e.target.value)} placeholder="BATCH-2026-XXXX" className={inp} /></Field>
        <Field label="Expiry Date"><input type="date" value={form.expiry} onChange={e => s('expiry', e.target.value)} className={inp} /></Field>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm">Add Medicine</button>
      </div>
    </form>
  );
}

function NewStockItemForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ name: '', category: '', qty: '', unit: '', price: '', supplier: '', reorderAt: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Item Name *"><input required value={form.name} onChange={e => s('name', e.target.value)} placeholder="e.g. Surgical Gloves (L)" className={inp} /></Field>
        <Field label="Category">
          <select value={form.category} onChange={e => s('category', e.target.value)} className={sel}>
            <option value="">Select...</option>
            {['Consumable', 'Equipment', 'Linen', 'Surgical', 'Lab Reagent', 'Stationery', 'Cleaning'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Quantity *"><input required type="number" value={form.qty} onChange={e => s('qty', e.target.value)} placeholder="0" className={inp} /></Field>
        <Field label="Unit"><input value={form.unit} onChange={e => s('unit', e.target.value)} placeholder="Box / Piece / Pack" className={inp} /></Field>
        <Field label="Unit Price (Rs.)"><input type="number" value={form.price} onChange={e => s('price', e.target.value)} placeholder="0.00" className={inp} /></Field>
        <Field label="Reorder At"><input type="number" value={form.reorderAt} onChange={e => s('reorderAt', e.target.value)} placeholder="Min. qty to reorder" className={inp} /></Field>
      </div>
      <Field label="Supplier / Vendor"><input value={form.supplier} onChange={e => s('supplier', e.target.value)} placeholder="Supplier name" className={inp} /></Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm">Add Stock Item</button>
      </div>
    </form>
  );
}

function CreateInvoiceForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', services: '', amount: '', discount: '', payment: 'Cash', notes: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <Field label="Patient *">
        <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
          <option value="">Select patient...</option>
          {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name} — {p.mrn}</option>)}
        </select>
      </Field>
      <Field label="Services / Items">
        <textarea value={form.services} onChange={e => s('services', e.target.value)} rows={3} placeholder="OPD Consultation — Rs. 1,500&#10;Lab: CBC — Rs. 800&#10;Pharmacy — Rs. 650" className={`${inp} resize-none`} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Total Amount (Rs.) *"><input required type="number" value={form.amount} onChange={e => s('amount', e.target.value)} placeholder="0.00" className={inp} /></Field>
        <Field label="Discount (Rs.)"><input type="number" value={form.discount} onChange={e => s('discount', e.target.value)} placeholder="0.00" className={inp} /></Field>
      </div>
      <Field label="Payment Method">
        <div className="flex gap-2 flex-wrap">
          {['Cash', 'Card', 'Bank Transfer', 'Insurance', 'Partial'].map(p => (
            <button key={p} type="button" onClick={() => s('payment', p)}
              className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all ${form.payment === p ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'}`}>
              {p}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Notes"><input value={form.notes} onChange={e => s('notes', e.target.value)} placeholder="Any billing notes..." className={inp} /></Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm">Generate Invoice</button>
      </div>
    </form>
  );
}

function AddStaffForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ name: '', role: '', dept: '', email: '', phone: '', joining: '', shift: 'Morning' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Full Name *"><input required value={form.name} onChange={e => s('name', e.target.value)} placeholder="Staff full name" className={inp} /></Field>
        <Field label="Designation / Role *">
          <select required value={form.role} onChange={e => s('role', e.target.value)} className={sel}>
            <option value="">Select role...</option>
            {['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Receptionist', 'Accountant', 'HR Officer', 'Ward Boy', 'Cleaner', 'Security'].map(r => <option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Department">
          <select value={form.dept} onChange={e => s('dept', e.target.value)} className={sel}>
            <option value="">Select department...</option>
            {['General Medicine', 'Surgery', 'Pediatrics', 'Pharmacy', 'Laboratory', 'Radiology', 'Administration', 'ICU', 'Emergency'].map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Shift">
          <div className="flex gap-2">
            {['Morning', 'Evening', 'Night'].map(sh => (
              <button key={sh} type="button" onClick={() => s('shift', sh)}
                className={`flex-1 py-2 text-[11px] rounded-xl border transition-all ${form.shift === sh ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400'}`}>
                {sh}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Email *"><input required type="email" value={form.email} onChange={e => s('email', e.target.value)} placeholder="staff@hospital.com" className={inp} /></Field>
        <Field label="Phone"><input type="tel" value={form.phone} onChange={e => s('phone', e.target.value)} placeholder="+92 300 0000000" className={inp} /></Field>
        <Field label="Joining Date"><input type="date" value={form.joining} onChange={e => s('joining', e.target.value)} className={inp} /></Field>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl shadow-sm">Add Staff Member</button>
      </div>
    </form>
  );
}

function ExportReportForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ month: '', year: '2026', reportType: 'Monthly Revenue', format: 'PDF' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Month *">
          <select required value={form.month} onChange={e => s('month', e.target.value)} className={sel}>
            <option value="">Select month...</option>
            {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Year">
          <select value={form.year} onChange={e => s('year', e.target.value)} className={sel}>
            {['2024','2025','2026'].map(y => <option key={y}>{y}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Report Type">
        <div className="grid grid-cols-2 gap-2">
          {['Monthly Revenue', 'OPD Footfall', 'IPD Occupancy', 'Pharmacy Sales', 'Lab Summary', 'Staff Attendance'].map(rt => (
            <button key={rt} type="button" onClick={() => s('reportType', rt)}
              className={`py-2 text-[11px] rounded-lg border transition-all ${form.reportType === rt ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {rt}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Export Format">
        <div className="flex gap-2">
          {['PDF', 'Excel', 'CSV'].map(f => (
            <button key={f} type="button" onClick={() => s('format', f)}
              className={`px-4 py-2 text-[11px] rounded-lg border transition-all ${form.format === f ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {f}
            </button>
          ))}
        </div>
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm">Export Report</button>
      </div>
    </form>
  );
}

function RecordVitalsForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ patient: '', bp: '', pulse: '', temp: '', spo2: '', weight: '', notes: '' });
  const s = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={e => { e.preventDefault(); onDone(); }} className="space-y-3">
      <Field label="Patient *">
        <select required value={form.patient} onChange={e => s('patient', e.target.value)} className={sel}>
          <option value="">Select patient...</option>
          {PATIENTS.slice(0, 10).map(p => <option key={p.id} value={p.name}>{p.name} — {p.mrn}</option>)}
        </select>
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Field label="Blood Pressure"><input value={form.bp} onChange={e => s('bp', e.target.value)} placeholder="120/80 mmHg" className={inp} /></Field>
        <Field label="Pulse Rate"><input value={form.pulse} onChange={e => s('pulse', e.target.value)} placeholder="72 bpm" className={inp} /></Field>
        <Field label="Temperature"><input value={form.temp} onChange={e => s('temp', e.target.value)} placeholder="98.6 °F" className={inp} /></Field>
        <Field label="SpO2 (%)"><input value={form.spo2} onChange={e => s('spo2', e.target.value)} placeholder="99%" className={inp} /></Field>
        <Field label="Weight (kg)"><input value={form.weight} onChange={e => s('weight', e.target.value)} placeholder="70 kg" className={inp} /></Field>
      </div>
      <Field label="Nurse Notes">
        <textarea value={form.notes} onChange={e => s('notes', e.target.value)} rows={2} placeholder="Observations..." className={`${inp} resize-none`} />
      </Field>
      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="submit" className="px-5 py-2 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm">Save Vitals</button>
      </div>
    </form>
  );
}

/* ── Main export ── */
export const QuickActionModal: React.FC<QuickActionModalProps> = ({ isOpen, onClose, type }) => {
  const [done, setDone] = useState(false);
  const meta = MODAL_META[type];

  const handleClose = () => { setDone(false); onClose(); };

  const formMap: Record<QuickActionType, React.ReactNode> = {
    'new-prescription':    <NewPrescriptionForm onDone={() => setDone(true)} />,
    'clinical-notes':      <ClinicalNotesForm onDone={() => setDone(true)} />,
    'create-prescription': <NewPrescriptionForm onDone={() => setDone(true)} />,
    'new-ipd-admission':   <IPDAdmissionForm onDone={() => setDone(true)} />,
    'book-procedure':      <BookProcedureForm onDone={() => setDone(true)} />,
    'new-lab-order':       <LabOrderForm onDone={() => setDone(true)} />,
    'add-medicine':        <AddMedicineForm onDone={() => setDone(true)} />,
    'new-stock-item':      <NewStockItemForm onDone={() => setDone(true)} />,
    'create-invoice':      <CreateInvoiceForm onDone={() => setDone(true)} />,
    'add-staff':           <AddStaffForm onDone={() => setDone(true)} />,
    'export-report':       <ExportReportForm onDone={() => setDone(true)} />,
    'save-settings':       <ClinicalNotesForm onDone={() => setDone(true)} />,
    'record-vitals':       <RecordVitalsForm onDone={() => setDone(true)} />,
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={meta.title} subtitle={meta.subtitle} maxWidth="max-w-xl">
      {done
        ? <SuccessView message={`${meta.title} completed successfully.`} onClose={handleClose} onAgain={() => setDone(false)} />
        : formMap[type]
      }
    </Modal>
  );
};
