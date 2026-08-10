'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { DASHBOARD_METRICS } from '@/lib/mock-data';
import { KPICard } from '@/components/dashboard/KPICard';
import { 
  PatientVisitsChart, 
  OPDvsIPDChart, 
  RevenueTrendChart, 
  DepartmentActivityChart 
} from '@/components/dashboard/Charts';
import { AppointmentsTable } from '@/components/dashboard/AppointmentsTable';
import { RecentPatients } from '@/components/dashboard/RecentPatients';
import { IPDSummary } from '@/components/dashboard/IPDSummary';
import { PharmacyAlerts } from '@/components/dashboard/PharmacyAlerts';
import {
  Users,
  Calendar,
  Stethoscope,
  BedDouble,
  Pill,
  TestTube,
  DollarSign,
  Building2,
  Sparkles,
  TrendingUp,
  Download,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { currentUser, currentRole } = useAuth();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Welcome Bar & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
              {currentRole.replace('_', ' ')} OVERVIEW
            </span>
            <span className="text-slate-400 text-xs">• Live Demo Dashboard</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back, {currentUser?.name}!
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Here is the real-time operational overview of CarePulse Hospital today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/appointments"
            className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </Link>

          <Link
            href="/patients"
            className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors shadow-md shadow-teal-900/20 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Patient</span>
          </Link>
        </div>
      </div>

      {/* 8 Metric KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Registered Patients"
          value={DASHBOARD_METRICS.totalPatients.toLocaleString()}
          subtitle="Active Hospital MRN Directory"
          trend="12.4%"
          trendUp={true}
          icon={Users}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-600"
        />

        <KPICard
          title="Today's Appointments"
          value={DASHBOARD_METRICS.todaysAppointments}
          subtitle="38 Scheduled • 8 Completed"
          trend="5.2%"
          trendUp={true}
          icon={Calendar}
          iconBgColor="bg-teal-50"
          iconTextColor="text-teal-600"
        />

        <KPICard
          title="Today's OPD Visits"
          value={DASHBOARD_METRICS.todaysOPDVisits}
          subtitle="OPD Consultations Active"
          trend="8.1%"
          trendUp={true}
          icon={Stethoscope}
          iconBgColor="bg-cyan-50"
          iconTextColor="text-cyan-600"
        />

        <KPICard
          title="Current IPD Patients"
          value={DASHBOARD_METRICS.currentIPDPatients}
          subtitle={`Available Beds: ${DASHBOARD_METRICS.availableBeds} / ${DASHBOARD_METRICS.totalBeds}`}
          trend="2.0%"
          trendUp={false}
          icon={BedDouble}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />

        <KPICard
          title="Available Ward Beds"
          value={`${DASHBOARD_METRICS.availableBeds} Free`}
          subtitle="Total Hospital Capacity: 45 Beds"
          icon={BedDouble}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />

        <KPICard
          title="Pharmacy Sales Today"
          value={`Rs. ${DASHBOARD_METRICS.pharmacySalesToday.toLocaleString()}`}
          subtitle="Inpatient & Outpatient Sales"
          trend="14.2%"
          trendUp={true}
          icon={Pill}
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-600"
        />

        <KPICard
          title="Pending Lab Tests"
          value={DASHBOARD_METRICS.pendingLabTests}
          subtitle="14 Pending Verification"
          icon={TestTube}
          iconBgColor="bg-purple-50"
          iconTextColor="text-purple-600"
        />

        <KPICard
          title="Today's Revenue"
          value={`Rs. ${DASHBOARD_METRICS.todaysRevenue.toLocaleString()}`}
          subtitle="Combined OPD, IPD, Pharmacy & Lab"
          trend="10.8%"
          trendUp={true}
          icon={DollarSign}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
        />
      </div>

      {/* 4 Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PatientVisitsChart />
        </div>
        <div>
          <OPDvsIPDChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueTrendChart />
        <DepartmentActivityChart />
      </div>

      {/* Live Data Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AppointmentsTable />
        </div>
        <div>
          <RecentPatients />
        </div>
      </div>

      {/* Secondary Data Sections Grid: IPD Beds & Pharmacy Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <IPDSummary />
        <PharmacyAlerts />
      </div>

    </div>
  );
}
