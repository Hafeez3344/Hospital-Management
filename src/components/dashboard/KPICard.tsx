'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendUp = true,
  icon: Icon,
  iconBgColor = 'bg-teal-50',
  iconTextColor = 'text-teal-600'
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      
      {/* Background Accent Pill */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
          
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
          )}

          {trend && (
            <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
              <span
                className={`px-1.5 py-0.5 rounded ${
                  trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}
              >
                {trendUp ? '↑' : '↓'} {trend}
              </span>
              <span className="text-slate-400 text-[11px] font-normal">vs last week</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${iconBgColor} ${iconTextColor} transition-transform group-hover:scale-110 shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
};
