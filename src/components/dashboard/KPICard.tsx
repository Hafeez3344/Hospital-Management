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
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      
      {/* Background Accent Pill */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-xl text-slate-900 tracking-tight">{value}</h3>
          
          {subtitle && (
            <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>
          )}

          {trend && (
            <div className="flex items-center gap-1 mt-2 text-[11px]">
              <span
                className={`px-1.5 py-0.5 rounded ${
                  trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}
              >
                {trendUp ? '↑' : '↓'} {trend}
              </span>
              <span className="text-slate-400 text-[10px]">vs last week</span>
            </div>
          )}
        </div>

        <div className={`p-2.5 rounded-xl ${iconBgColor} ${iconTextColor} transition-transform group-hover:scale-110 shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
};
