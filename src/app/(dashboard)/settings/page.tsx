'use client';

import React from 'react';
import { Settings, Building2, Shield, Bell, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
            HOSPITAL CONFIGURATION
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            System Settings & Controls
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure hospital profile, consultation fee defaults, bed charges, role permissions, and demo reset.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            Hospital Information (Single Hospital)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Primary details displayed on printed prescriptions, lab reports, and billing invoices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital Name</label>
            <input type="text" defaultValue="CarePulse General Hospital & Research Center" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Helpline Phone Number</label>
            <input type="text" defaultValue="+92 42 111-222-333" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input type="text" defaultValue="info@carepulsehospital.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900" />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital Address</label>
            <input type="text" defaultValue="Plot 45-B, Main Boulevard, Gulberg III, Lahore" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Demo configuration changes are auto-saved in local session state.</span>
          <button className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
