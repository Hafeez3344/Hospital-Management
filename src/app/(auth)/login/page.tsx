'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Pill,
  TestTube,
  Receipt,
  UserCheck,
  User,
} from 'lucide-react';

const CREDENTIALS_HINT = [
  { role: 'Admin',       email: 'admin@hospital.com',       password: 'Admin@1234',   icon: ShieldCheck,  color: 'text-purple-400' },
  { role: 'Doctor',      email: 'doctor@hospital.com',      password: 'Doctor@1234',  icon: Stethoscope,  color: 'text-teal-400' },
  { role: 'Front Desk',  email: 'frontdesk@hospital.com',   password: 'Desk@1234',    icon: User,         color: 'text-blue-400' },
  { role: 'Nurse',       email: 'nurse@hospital.com',       password: 'Nurse@1234',   icon: HeartPulse,   color: 'text-rose-400' },
  { role: 'Pharmacist',  email: 'pharmacist@hospital.com',  password: 'Pharma@1234',  icon: Pill,         color: 'text-emerald-400' },
  { role: 'Lab Staff',   email: 'lab@hospital.com',         password: 'Lab@1234',     icon: TestTube,     color: 'text-amber-400' },
  { role: 'Accountant',  email: 'accountant@hospital.com',  password: 'Account@1234', icon: Receipt,      color: 'text-indigo-400' },
  { role: 'HR',          email: 'hr@hospital.com',          password: 'HR@1234',      icon: UserCheck,    color: 'text-cyan-400' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    // Simulate brief async check
    await new Promise(r => setTimeout(r, 600));
    const result = login(email.trim(), password);
    setLoading(false);
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Invalid credentials.');
    }
  };

  const fillCredentials = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden">

      {/* Decorative glows */}
      <div className="absolute -top-60 -left-60 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -right-60 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* ── LEFT PANEL: login form ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-14 z-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg text-white leading-tight tracking-tight">CarePulse <span className="text-teal-400">HMS</span></h1>
              <p className="text-[11px] text-slate-500">Hospital Management System</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl text-white mb-1.5">Welcome back</h2>
            <p className="text-sm text-slate-400">Sign in with your staff credentials to access the dashboard.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@hospital.com"
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-lg pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:cursor-not-allowed text-white rounded-lg py-3 text-sm transition-all duration-200 shadow-lg shadow-teal-900/40 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-600 mt-8">
            CarePulse HMS • Demo Prototype &nbsp;·&nbsp; All data is fictional
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL: credentials hint ── */}
      <div className="hidden lg:flex w-[400px] xl:w-[460px] border-l border-slate-800/60 bg-slate-900/40 backdrop-blur-sm flex-col justify-center p-10 z-10">
        <div className="mb-6">
          <h3 className="text-sm text-slate-200 mb-1">Demo Staff Accounts</h3>
          <p className="text-xs text-slate-500">Click any account to auto-fill the login form.</p>
        </div>

        <div className="space-y-2">
          {CREDENTIALS_HINT.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.role}
                type="button"
                onClick={() => fillCredentials(c.email, c.password)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-600/40 transition-all group text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-700 transition-colors">
                  <Icon className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-200 leading-tight">{c.role}</p>
                  <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">{c.email}</p>
                </div>
                <span className="text-[10px] text-slate-600 font-mono bg-slate-900/60 px-2 py-1 rounded border border-slate-700/50 flex-shrink-0">
                  {c.password}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
