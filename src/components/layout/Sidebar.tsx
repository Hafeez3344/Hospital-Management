'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  BedDouble,
  Pill,
  TestTube,
  Activity,
  HeartPulse,
  UserCheck,
  Receipt,
  BarChart3,
  Settings,
  ClipboardList,
  FileText,
  Package,
  ShoppingBag,
  Clock,
  Briefcase
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  // Admin & General Dashboard
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK', 'NURSE', 'PHARMACIST', 'LAB_STAFF', 'ACCOUNTANT', 'HR']
  },

  // Patients
  {
    title: 'Patients',
    href: '/patients',
    icon: Users,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK', 'NURSE']
  },

  // Appointments & OPD Queue
  {
    title: 'Appointments & OPD',
    href: '/appointments',
    icon: Calendar,
    roles: ['ADMIN', 'FRONT_DESK', 'DOCTOR'],
    badge: '38 Today'
  },

  // Doctor OPD Consultation
  {
    title: 'OPD Consultation',
    href: '/opd',
    icon: Stethoscope,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK']
  },

  // Prescriptions
  {
    title: 'Digital Prescriptions',
    href: '/prescriptions',
    icon: FileText,
    roles: ['ADMIN', 'DOCTOR', 'PHARMACIST']
  },

  // IPD & Wards
  {
    title: 'IPD & Wards',
    href: '/ipd',
    icon: BedDouble,
    roles: ['ADMIN', 'NURSE', 'DOCTOR', 'FRONT_DESK'],
    badge: '29 Occupied'
  },

  // Nursing
  {
    title: 'Nursing & Vitals',
    href: '/nursing',
    icon: HeartPulse,
    roles: ['ADMIN', 'NURSE']
  },

  // Procedures
  {
    title: 'Procedures & OT',
    href: '/procedures',
    icon: Activity,
    roles: ['ADMIN', 'DOCTOR', 'NURSE']
  },

  // Laboratory
  {
    title: 'Laboratory Management',
    href: '/lab',
    icon: TestTube,
    roles: ['ADMIN', 'LAB_STAFF', 'DOCTOR'],
    badge: '14 Pending'
  },

  // Pharmacy
  {
    title: 'Pharmacy & Stock',
    href: '/pharmacy',
    icon: Pill,
    roles: ['ADMIN', 'PHARMACIST'],
    badge: '5 Alerts'
  },

  // Inventory
  {
    title: 'Inventory & Supplies',
    href: '/inventory',
    icon: Package,
    roles: ['ADMIN', 'PHARMACIST']
  },

  // Billing
  {
    title: 'Billing & Invoices',
    href: '/billing',
    icon: Receipt,
    roles: ['ADMIN', 'ACCOUNTANT', 'FRONT_DESK']
  },

  // Staff / HR
  {
    title: 'Staff & HR',
    href: '/staff',
    icon: UserCheck,
    roles: ['ADMIN', 'HR']
  },

  // Reports
  {
    title: 'Reports & Analytics',
    href: '/reports',
    icon: BarChart3,
    roles: ['ADMIN', 'ACCOUNTANT']
  },

  // Settings
  {
    title: 'Hospital Settings',
    href: '/settings',
    icon: Settings,
    roles: ['ADMIN']
  }
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, currentUser } = useAuth();

  const filteredNavItems = NAV_ITEMS.filter((item) => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-[calc(100vh-4rem)] sticky top-16 border-r border-slate-800 shrink-0">
      
      {/* Role Profile Context Box */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
              {currentRole.replace('_', ' ')} MODE
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {currentUser.name}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Main Navigation
        </div>

        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'}`} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-teal-400 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
        <span>CarePulse Hospital</span>
        <span className="text-teal-400 font-semibold">Demo Ready</span>
      </div>

    </aside>
  );
};
