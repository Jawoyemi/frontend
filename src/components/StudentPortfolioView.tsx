import React, { useState } from 'react';
import { AlertCircle, Award, Clock, FileDown, GraduationCap, Lock, Mail, MapPin, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { ApiPortfolio, ClinicalProcedure, User } from '../types';

interface StudentPortfolioProps {
  currentUser: User;
  portfolio: ApiPortfolio | null;
  procedures: ClinicalProcedure[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  searchValue: string;
}

export default function StudentPortfolioView({ currentUser, portfolio, procedures, loading, error, onRetry, searchValue }: StudentPortfolioProps) {
  const [filterType, setFilterType] = useState<'All' | 'Verified' | 'Pending'>('All');

  if (loading) return <div className="h-[560px] rounded-2xl bg-white border border-border animate-pulse" />;
  if (error) {
    return (
      <div className="card-base p-8 text-center">
        <AlertCircle className="w-8 h-8 text-accent mx-auto mb-3" />
        <p className="text-sm font-bold text-text-primary">Portfolio could not load</p>
        <p className="text-xs text-text-secondary mt-1">{error}</p>
        <button onClick={onRetry} className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">Retry</button>
      </div>
    );
  }

  const filteredProcedures = procedures.filter(proc => {
    const query = searchValue.toLowerCase();
    const matchesSearch = proc.name.toLowerCase().includes(query) || proc.id.toLowerCase().includes(query) || proc.setting.toLowerCase().includes(query);
    const matchesFilter = filterType === 'All' || (filterType === 'Verified' ? proc.credits > 0 : proc.credits === 0);
    return matchesSearch && matchesFilter;
  });
  const competencies = Object.entries(portfolio?.competencies || {});

  return (
    <div className="space-y-5 select-none">
      <div className="card-base overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-5 flex items-center gap-4 flex-1 border-b md:border-b-0 md:border-r border-border">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-extrabold text-text-primary tracking-tight">{currentUser.firstName} {currentUser.lastName}</h3>
                <span className="bg-primary/10 text-primary px-2 py-0.5 text-[9px] font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {currentUser.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <p className="text-xs text-text-secondary font-medium">{currentUser.yearOfStudy ? `${currentUser.yearOfStudy}-Level Medical Student` : currentUser.role}</p>
              <div className="flex gap-4 mt-1.5 text-[10px] text-text-light font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {currentUser.hospital || 'Hospital not set'}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {currentUser.email}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border flex-1">
            {[
              { label: 'Encounters', value: portfolio?.total_encounters || 0, icon: Target },
              { label: 'Accuracy', value: `${Math.round((portfolio?.diagnostic_accuracy || 0) * 100)}%`, icon: TrendingUp },
              { label: 'Credits', value: portfolio?.total_credits || 0, icon: Award },
              { label: 'Hours', value: portfolio?.clinical_hours || 0, icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="p-4 flex flex-col items-center justify-center text-center">
                <stat.icon className="w-4 h-4 text-primary mb-1.5" />
                <p className="text-lg font-extrabold text-text-primary">{stat.value}</p>
                <p className="text-[10px] text-text-secondary font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-primary" />
          <h4 className="text-xs font-bold text-text-primary">Competency Benchmarks</h4>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {competencies.map(([key, raw]) => {
            const score = typeof raw === 'number' ? Math.min(100, raw * 10) : raw.score;
            const count = typeof raw === 'number' ? raw : raw.encounters;
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-text-primary capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-[11px] font-bold text-primary">{score}%</span>
                </div>
                <div className="h-2 bg-bg-main rounded-full overflow-hidden"><div className="h-full rounded-full gradient-primary" style={{ width: `${score}%` }} /></div>
                <p className="text-[9px] text-text-light">{count} backend records</p>
              </div>
            );
          })}
          {competencies.length === 0 && <p className="text-xs text-text-secondary">No competency credits have been verified yet.</p>}
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-bold text-text-primary">Verified Clinical Logbook</h4>
          </div>
          <div className="flex gap-2">
            {(['All', 'Verified', 'Pending'] as const).map((type) => (
              <button key={type} onClick={() => setFilterType(type)} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border ${filterType === type ? 'gradient-primary text-white border-primary' : 'bg-white text-text-secondary border-border'}`}>{type}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-main border-b border-border">
              <tr>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary">Date</th>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary">Encounter</th>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary">Setting</th>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary">Supervisor</th>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary">Credits</th>
                <th className="px-5 py-3 text-[10px] font-semibold text-text-secondary text-right">Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredProcedures.map((proc) => (
                <tr key={proc.id} className="hover:bg-bg-main/50">
                  <td className="px-5 py-3"><div className="text-xs font-semibold text-text-primary">{proc.date}</div><div className="text-[10px] text-text-light font-mono">{proc.time}</div></td>
                  <td className="px-5 py-3"><div className="text-xs font-semibold text-text-primary">{proc.name}</div><div className="text-[10px] text-text-light font-mono mt-0.5">{proc.id.slice(0, 12)}</div></td>
                  <td className="px-5 py-3 text-[11px] text-text-secondary font-medium">{proc.setting}</td>
                  <td className="px-5 py-3"><p className="text-[11px] font-semibold text-text-primary">{proc.supervisor.name}</p><p className="text-[10px] text-text-light">{proc.supervisor.role}</p></td>
                  <td className="px-5 py-3"><span className="inline-flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded-full text-[10px] font-bold"><Award className="w-3 h-3" /> +{proc.credits}</span></td>
                  <td className="px-5 py-3 text-right"><span className="inline-flex items-center gap-1 bg-bg-main px-2 py-1 rounded-lg text-[9px] font-mono text-text-secondary border border-border"><Lock className="w-2.5 h-2.5 text-text-light" />{proc.seal}</span></td>
                </tr>
              ))}
              {filteredProcedures.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-xs text-text-secondary">No backend encounters match your search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border flex justify-center">
          <button className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1.5">
            <FileDown className="w-3.5 h-3.5" /> Export PDF Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
