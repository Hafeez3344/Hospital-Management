'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useSidebar } from '@/lib/sidebar-context';
import { UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Bell, 
  Search, 
  ChevronDown, 
  LogOut,
  Clock,
  Sparkles,
  Menu
} from 'lucide-react';
import Link from 'next/link';

const ROLE_COLORS: Record<UserRole, { bg: string; text: string; border: string }> = {
  ADMIN: { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-300' },
  DOCTOR: { bg: 'bg-teal-100 dark:bg-teal-950', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-300' },
  FRONT_DESK: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300' },
  NURSE: { bg: 'bg-rose-100 dark:bg-rose-950', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-300' },
  PHARMACIST: { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300' },
  LAB_STAFF: { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300' },
  ACCOUNTANT: { bg: 'bg-indigo-100 dark:bg-indigo-950', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300' },
  HR: { bg: 'bg-cyan-100 dark:bg-cyan-950', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-300' }
};

const ALL_ROLES: { role: UserRole; label: string; desc: string }[] = [
  { role: 'ADMIN', label: 'Admin System', desc: 'Full System Control' },
  { role: 'DOCTOR', label: 'Doctor View', desc: 'Consultations & OPD' },
  { role: 'FRONT_DESK', label: 'Front Desk / Reception', desc: 'Registration & Appointments' },
  { role: 'NURSE', label: 'Nursing View', desc: 'Wards, Beds & Vitals' },
  { role: 'PHARMACIST', label: 'Pharmacy View', desc: 'Dispensing & Medicines' },
  { role: 'LAB_STAFF', label: 'Laboratory View', desc: 'Sample & Test Results' },
  { role: 'ACCOUNTANT', label: 'Accountant View', desc: 'Billing & Payments' },
  { role: 'HR', label: 'HR / Staff Manager', desc: 'Staff Roster & Payroll' },
];

export const Header: React.FC = () => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const { toggle: toggleSidebar } = useSidebar();
  const router = useRouter();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const roleStyle = ROLE_COLORS[currentRole] || ROLE_COLORS.ADMIN;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Left Section: Hamburger (mobile) + Logo & Hospital Title */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight flex items-center gap-2">
                CarePulse
                <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Hospital
                </span>
              </h1>
              <p className="hidden sm:block text-[11px] text-slate-500 font-medium">Healthcare Management System</p>
            </div>
          </Link>
        </div>

        {/* Center: Search & Quick Actions */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients (MRN), doctors, medicine or invoices..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Right Section: Role Switcher Dropdown, Notifications, Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border} hover:opacity-95 shadow-sm`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Role: <strong className="uppercase">{currentRole.replace('_', ' ')}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs font-bold text-slate-700">Switch Demo Role Perspective</p>
                  <p className="text-[11px] text-slate-500">Test sidebar & permissions for each user role</p>
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {ALL_ROLES.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-teal-50 transition-colors ${
                        currentRole === r.role ? 'bg-teal-50/80 font-bold text-teal-700' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{r.desc}</div>
                      </div>
                      {currentRole === r.role && (
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Time & Date Display */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Today, Aug 11</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                  {currentUser.name[0]}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">{currentUser.department}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {profileMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded uppercase">
                    {currentUser.role}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setProfileMenuOpen(false);
                    router.push('/login');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
