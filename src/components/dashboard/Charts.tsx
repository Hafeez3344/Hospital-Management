'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import {
  PATIENT_VISITS_DATA,
  OPD_VS_IPD_DATA,
  REVENUE_TREND_DATA,
  DEPARTMENT_ACTIVITY_DATA
} from '@/lib/mock-data';

export const PatientVisitsChart: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Patient Footfall & Visits Trend</h4>
          <p className="text-xs text-slate-500">Daily OPD, IPD, and Emergency intake (Past 7 days)</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg border border-teal-200">
          Live Daily Trend
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PATIENT_VISITS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOpd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorIpd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Area type="monotone" dataKey="opd" name="OPD Visits" stroke="#0D9488" fillOpacity={1} fill="url(#colorOpd)" strokeWidth={2} />
            <Area type="monotone" dataKey="ipd" name="IPD Admissions" stroke="#0284C7" fillOpacity={1} fill="url(#colorIpd)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const OPDvsIPDChart: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-slate-900 text-sm">OPD vs IPD vs Emergency Ratio</h4>
        <p className="text-xs text-slate-500">Distribution of today's total active patient care</p>
      </div>
      <div className="h-56 w-full relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={OPD_VS_IPD_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {OPD_VS_IPD_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900">109</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Today</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {OPD_VS_IPD_DATA.map((item) => (
          <div key={item.name} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
            <span className="inline-block w-2.5 h-2.5 rounded-full mb-1" style={{ backgroundColor: item.color }}></span>
            <div className="font-bold text-slate-800">{item.value}</div>
            <div className="text-[10px] text-slate-500 truncate">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RevenueTrendChart: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Hospital Revenue Breakdown</h4>
          <p className="text-xs text-slate-500">Weekly revenue streams (OPD, IPD, Pharmacy, Laboratory)</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          Rs. 385,500 Today
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
            <Tooltip
              formatter={(val: any) => [`Rs. ${Number(val).toLocaleString()}`, '']}
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="OPD" stackId="a" fill="#0D9488" />
            <Bar dataKey="IPD" stackId="a" fill="#0284C7" />
            <Bar dataKey="Pharmacy" stackId="a" fill="#10B981" />
            <Bar dataKey="Lab" stackId="a" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const DepartmentActivityChart: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Department Activity & Volume</h4>
          <p className="text-xs text-slate-500">Consultations vs Admissions across hospital departments</p>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DEPARTMENT_ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="consultations" name="OPD Consultations" fill="#14B8A6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="admissions" name="IPD Admissions" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
