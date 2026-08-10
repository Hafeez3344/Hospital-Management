'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { DEMO_USERS } from '@/lib/mock-data';
import { UserRole } from '@/lib/types';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  Stethoscope, 
  HeartPulse, 
  Pill, 
  TestTube, 
  Receipt, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ROLE_ICONS: Record<UserRole, React.ElementType> = {
  ADMIN: ShieldCheck,
  DOCTOR: Stethoscope,
  FRONT_DESK: User,
  NURSE: HeartPulse,
  PHARMACIST: Pill,
  LAB_STAFF: TestTube,
  ACCOUNTANT: Receipt,
  HR: UserCheck
};

export default function LoginPage() {
  const { loginAsUser } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (userId: string) => {
    loginAsUser(userId);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
      
      {/* Glow background accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto z-10 py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white leading-tight tracking-tight">CarePulse HMS</h1>
            <p className="text-xs text-slate-400">Single Hospital Management System Demo</p>
          </div>
        </div>
        <span className="bg-teal-500/10 text-teal-400 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Demo Mode v1.0
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto my-auto py-8 z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Select a Demo Account to Explore
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Experience role-based features, workflows, sidebars, and permission views for each hospital department.
          </p>
        </div>

        {/* 8 Demo Account Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_USERS.map((user) => {
            const IconComponent = ROLE_ICONS[user.role] || User;

            return (
              <button
                key={user.id}
                onClick={() => handleRoleSelect(user.id)}
                className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 p-5 rounded-2xl text-left transition-all duration-200 group flex flex-col justify-between h-44 hover:shadow-xl hover:shadow-teal-950/40 relative overflow-hidden"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="p-3 rounded-xl bg-slate-800 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:bg-teal-950 group-hover:text-teal-300">
                    {user.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-teal-300 transition-colors">{user.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{user.department}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">{user.email}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-semibold text-teal-400 opacity-80 group-hover:opacity-100">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 z-10 py-2 border-t border-slate-900">
        CarePulse Hospital Management System • Demo Prototype Edition
      </footer>

    </div>
  );
}
