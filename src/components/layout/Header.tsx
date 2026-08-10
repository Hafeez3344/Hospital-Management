'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

const ROLE_COLORS: Record<UserRole, { bg: string; text: string; border: string }> = {
  ADMIN:      { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  DOCTOR:     { bg: 'bg-teal-100',   text: 'text-teal-700',   border: 'border-teal-300'   },
  FRONT_DESK: { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-300'   },
  NURSE:      { bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-300'   },
  PHARMACIST: { bg: 'bg-emerald-100',text: 'text-emerald-700',border: 'border-emerald-300'},
  LAB_STAFF:  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-300'  },
  ACCOUNTANT: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
  HR:         { bg: 'bg-cyan-100',   text: 'text-cyan-700',   border: 'border-cyan-300'   },
};

const ALL_ROLES: { role: UserRole; label: string; desc: string }[] = [
  { role: 'ADMIN',      label: 'Admin System',          desc: 'Full System Control'          },
  { role: 'DOCTOR',     label: 'Doctor View',           desc: 'Consultations & OPD'         },
  { role: 'FRONT_DESK', label: 'Front Desk / Reception',desc: 'Registration & Appointments' },
  { role: 'NURSE',      label: 'Nursing View',          desc: 'Wards, Beds & Vitals'        },
  { role: 'PHARMACIST', label: 'Pharmacy View',         desc: 'Dispensing & Medicines'      },
  { role: 'LAB_STAFF',  label: 'Laboratory View',       desc: 'Sample & Test Results'       },
  { role: 'ACCOUNTANT', label: 'Accountant View',       desc: 'Billing & Payments'          },
  { role: 'HR',         label: 'HR / Staff Manager',    desc: 'Staff Roster & Payroll'      },
];

export const Header: React.FC = () => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const { toggle: toggleSidebar } = useSidebar();
  const router = useRouter();
  const [roleMenuOpen, setRoleMenuOpen]       = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen]           = useState(false);

  const roleMenuRef    = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!currentUser) return null;

  const roleStyle = ROLE_COLORS[currentRole] || ROLE_COLORS.ADMIN;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-3 sm:px-4 md:px-6">

        {/* ── LEFT: Hamburger + Logo ── */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-tight tracking-tight flex items-center gap-2">
                CarePulse
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Hospital
                </span>
              </h1>
              <p className="hidden md:block text-[11px] text-slate-500">Healthcare Management System</p>
            </div>
          </Link>
        </div>

        {/* ── CENTER: Search bar (desktop) ── */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, doctors, medicine..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {/* ── RIGHT: Actions ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">

          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Toggle search"
          >
            {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Role Switcher — icon only on mobile, full label on sm+ */}
          <div className="relative" ref={roleMenuRef}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs border transition-all ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border} hover:opacity-90 shadow-sm`}
            >
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">
                <strong className="uppercase">{currentRole.replace('_', ' ')}</strong>
              </span>
              <ChevronDown className="w-3 h-3 opacity-70 flex-shrink-0" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                  <p className="text-xs text-slate-700">Switch Demo Role</p>
                  <p className="text-[11px] text-slate-500">Test sidebar & permissions per role</p>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {ALL_ROLES.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => { switchRole(r.role); setRoleMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-teal-50 transition-colors ${
                        currentRole === r.role ? 'bg-teal-50/80 text-teal-700' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{r.label}</div>
                        <div className="text-[10px] text-slate-400">{r.desc}</div>
                      </div>
                      {currentRole === r.role && (
                        <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date — xl only */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Today, Aug 11</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-1 ring-white" />
          </button>

          {/* User Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser?.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-slate-200"
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm">
                  {currentUser?.name?.[0]}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-xs text-slate-800 leading-tight">{currentUser?.name}</div>
                <div className="text-[10px] text-slate-500">{currentUser?.department}</div>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-slate-400" />
            </button>

            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-900">{currentUser?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded uppercase">
                    {currentUser?.role}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
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

      {/* Mobile search bar (expands below header) */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3 border-t border-slate-100 bg-white">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search patients, doctors, medicine..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
};
