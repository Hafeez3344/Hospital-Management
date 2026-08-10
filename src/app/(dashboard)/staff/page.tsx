'use client';

import React, { useState } from 'react';
import { DEMO_USERS } from '@/lib/mock-data';
import { UserCheck, Plus } from 'lucide-react';
import { QuickActionModal } from '@/components/ui/QuickActionModal';

export default function StaffPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 pb-12">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
              HR &amp; STAFF DIRECTORY
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Hospital Staff &amp; Employee Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage hospital staff, designations, departments, access credentials, and duty rosters.
            </p>
          </div>

          <button onClick={() => setOpen(true)} className="px-4 py-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors shadow-md shadow-cyan-900/20 flex items-center gap-1.5 self-start sm:self-center">
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_USERS.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-48">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                    {user.role}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                <p className="text-xs text-slate-500">{user.department}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">{user.email}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Active Duty</span>
                <button className="text-xs text-slate-600 font-medium hover:underline">Edit Role</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuickActionModal isOpen={open} onClose={() => setOpen(false)} type="add-staff" />
    </>
  );
}
