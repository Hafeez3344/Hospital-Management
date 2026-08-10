'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useSidebar } from '@/lib/sidebar-context';
import { UserRole } from '@/lib/types';
import { X } from 'lucide-react';
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
  FileText,
  Package,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK', 'NURSE', 'PHARMACIST', 'LAB_STAFF', 'ACCOUNTANT', 'HR']
  },
  {
    title: 'Patients',
    href: '/patients',
    icon: Users,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK', 'NURSE']
  },
  {
    title: 'Appointments & OPD',
    href: '/appointments',
    icon: Calendar,
    roles: ['ADMIN', 'FRONT_DESK', 'DOCTOR'],
    badge: '38 Today'
  },
  {
    title: 'OPD Consultation',
    href: '/opd',
    icon: Stethoscope,
    roles: ['ADMIN', 'DOCTOR', 'FRONT_DESK']
  },
  {
    title: 'Digital Prescriptions',
    href: '/prescriptions',
    icon: FileText,
    roles: ['ADMIN', 'DOCTOR', 'PHARMACIST']
  },
  {
    title: 'IPD & Wards',
    href: '/ipd',
    icon: BedDouble,
    roles: ['ADMIN', 'NURSE', 'DOCTOR', 'FRONT_DESK'],
    badge: '29 Occupied'
  },
  {
    title: 'Nursing & Vitals',
    href: '/nursing',
    icon: HeartPulse,
    roles: ['ADMIN', 'NURSE']
  },
  {
    title: 'Procedures & OT',
    href: '/procedures',
    icon: Activity,
    roles: ['ADMIN', 'DOCTOR', 'NURSE']
  },
  {
    title: 'Laboratory Management',
    href: '/lab',
    icon: TestTube,
    roles: ['ADMIN', 'LAB_STAFF', 'DOCTOR'],
    badge: '14 Pending'
  },
  {
    title: 'Pharmacy & Stock',
    href: '/pharmacy',
    icon: Pill,
    roles: ['ADMIN', 'PHARMACIST'],
    badge: '5 Alerts'
  },
  {
    title: 'Inventory & Supplies',
    href: '/inventory',
    icon: Package,
    roles: ['ADMIN', 'PHARMACIST']
  },
  {
    title: 'Billing & Invoices',
    href: '/billing',
    icon: Receipt,
    roles: ['ADMIN', 'ACCOUNTANT', 'FRONT_DESK']
  },
  {
    title: 'Staff & HR',
    href: '/staff',
    icon: UserCheck,
    roles: ['ADMIN', 'HR']
  },
  {
    title: 'Reports & Analytics',
    href: '/reports',
    icon: BarChart3,
    roles: ['ADMIN', 'ACCOUNTANT']
  },
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
  const { isOpen, close } = useSidebar();

  const filteredNavItems = NAV_ITEMS.filter((item) => item.roles.includes(currentRole));

  // Close sidebar on route change (mobile)
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sidebarContent = (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      {/* Mobile close button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60 md:hidden">
        <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Navigation</span>
        <button
          onClick={close}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role Profile Context Box */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-200 uppercase tracking-wide truncate">
              {currentRole.replace('_', ' ')} MODE
            </p>
            <p className="text-xs text-slate-400 truncate">
              {currentUser?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile role box */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/40 md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse flex-shrink-0"></div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-slate-200 uppercase tracking-wide truncate">
              {currentRole.replace('_', ' ')}
            </p>
            <p className="text-xs text-slate-400 truncate">{currentUser?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
          Main Navigation
        </div>

        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-normal transition-all group ${
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
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
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
        <span className="text-teal-400 font-medium">Demo Ready</span>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always-visible sidebar */}
      <div className="hidden md:flex h-[calc(100vh-4rem)] sticky top-16 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile: overlay drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div className="relative z-50 flex h-full w-64 flex-col animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
