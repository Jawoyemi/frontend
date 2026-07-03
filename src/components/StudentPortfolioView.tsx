import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  FileDown, 
  Lock,
  GraduationCap,
  TrendingUp,
  Clock,
  BookOpen,
  Target
} from 'lucide-react';
import { ClinicalProcedure } from '../types';
import { demoPortfolioStats, demoStudent } from '../data';
import { motion } from 'motion/react';

interface StudentPortfolioProps {
  procedures: ClinicalProcedure[];
  searchValue: string;
}

export default function StudentPortfolioView({
  procedures,
  searchValue
}: StudentPortfolioProps) {
  const [filterType, setFilterType] = useState<'All' | 'Verified' | 'Pending'>('All');
  const stats = demoPortfolioStats;

  const filteredProcedures = procedures.filter(proc => {
    const matchesSearch = proc.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          proc.id.toLowerCase().includes(searchValue.toLowerCase()) ||
                          proc.setting.toLowerCase().includes(searchValue.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-5 select-none">
      
      {/* Student Identity Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-base overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Profile Section */}
          <div className="p-5 flex items-center gap-4 flex-1 border-b md:border-b-0 md:border-r border-border">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20">
              AA
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-extrabold text-text-primary tracking-tight">
                  {demoStudent.firstName} {demoStudent.lastName}
                </h3>
                <span className="bg-primary/10 text-primary px-2 py-0.5 text-[9px] font-bold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-xs text-text-secondary font-medium">
                {demoStudent.yearOfStudy}00-Level Medical Student
              </p>
              <div className="flex gap-4 mt-1.5 text-[10px] text-text-light font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {demoStudent.hospital}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {demoStudent.email}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border flex-1">
            {[
              { label: 'Encounters', value: stats.totalEncounters, icon: Target, color: 'primary' },
              { label: 'Accuracy', value: `${Math.round(stats.diagnosticAccuracy * 100)}%`, icon: TrendingUp, color: 'success' },
              { label: 'Credits', value: stats.totalCredits, icon: Award, color: 'warning' },
              { label: 'Hours', value: stats.clinicalHours, icon: Clock, color: 'primary' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4 flex flex-col items-center justify-center text-center">
                  <Icon className={`w-4 h-4 text-${stat.color} mb-1.5`} />
                  <p className="text-lg font-extrabold text-text-primary">{stat.value}</p>
                  <p className="text-[10px] text-text-secondary font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Competency Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-base overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-bold text-text-primary">Competency Benchmarks</h4>
          </div>
          <div className="p-5 space-y-3">
            {Object.entries(stats.competencies).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-text-primary capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] font-bold text-primary">{val.score}%</span>
                </div>
                <div className="h-2 bg-bg-main rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${val.score}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
                <p className="text-[9px] text-text-light">{val.encounters} encounters</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Rotations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-base overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-bold text-text-primary">Active Rotations</h4>
          </div>
          <div className="divide-y divide-border-light">
            {[
              { name: 'Internal Medicine', progress: 78, total: '36/47 cases', status: 'In Progress', statusColor: 'primary' },
              { name: 'Emergency Medicine', progress: 45, total: '12/28 procedures', status: 'Active', statusColor: 'warning' },
              { name: 'Obstetrics & Gynecology', progress: 100, total: '20/20 cases', status: 'Completed', statusColor: 'success' },
            ].map((rotation, idx) => (
              <div key={idx} className="p-4">
                <div className="flex justify-between items-center mb-1.5">
                  <h5 className="text-xs font-bold text-text-primary">{rotation.name}</h5>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-${rotation.statusColor}/10 text-${rotation.statusColor}`}>
                    {rotation.status}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-text-secondary font-medium mb-1.5">
                  <span>{rotation.progress}% Complete</span>
                  <span>{rotation.total}</span>
                </div>
                <div className="h-1.5 bg-bg-main rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${rotation.progress}%` }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      rotation.statusColor === 'success' ? 'bg-success' 
                      : rotation.statusColor === 'warning' ? 'bg-warning'
                      : 'gradient-primary'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Clinical Logbook */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-base overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-bold text-text-primary">Verified Clinical Logbook</h4>
          </div>
          <div className="flex gap-2">
            {(['All', 'Verified', 'Pending'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                  filterType === type
                    ? 'gradient-primary text-white border-primary shadow-sm shadow-primary/20'
                    : 'bg-white text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                {type}
              </button>
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
              {filteredProcedures.length > 0 ? (
                filteredProcedures.map((proc, idx) => (
                  <tr key={idx} className="hover:bg-bg-main/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="text-xs font-semibold text-text-primary">{proc.date}</div>
                      <div className="text-[10px] text-text-light font-mono">{proc.time}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-xs font-semibold text-text-primary">{proc.name}</div>
                      <div className="text-[10px] text-text-light font-mono mt-0.5">{proc.id}</div>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-text-secondary font-medium">{proc.setting}</td>
                    <td className="px-5 py-3">
                      <p className="text-[11px] font-semibold text-text-primary">{proc.supervisor.name}</p>
                      <p className="text-[10px] text-text-light">{proc.supervisor.role}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <Award className="w-3 h-3" /> +{proc.credits}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="inline-flex items-center gap-1 bg-bg-main px-2 py-1 rounded-lg text-[9px] font-mono text-text-secondary border border-border">
                        <Lock className="w-2.5 h-2.5 text-text-light" />
                        {proc.seal}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-text-secondary">
                    No verified encounters match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-border flex justify-center">
          <button className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer">
            <FileDown className="w-3.5 h-3.5" /> Export PDF Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
