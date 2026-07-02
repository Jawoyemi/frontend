import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Edit3, 
  Hourglass,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Patient, SystemLog } from '../types';

interface DashboardProps {
  patients: Patient[];
  logs: SystemLog[];
  onStartEncounter: (patientId: string) => void;
  onOpenReview: () => void;
  onViewAllQueue: () => void;
  onViewPortfolio: () => void;
}

export default function DashboardView({
  patients,
  logs,
  onStartEncounter,
  onOpenReview,
  onViewAllQueue
}: DashboardProps) {
  // Statistics counters
  const stats = [
    { label: 'Total Encounters', value: '142', trend: '+12%' },
    { label: 'Verified Credits', value: '840', trend: '+5%' },
    { label: 'Avg. Accuracy', value: '94.2%', trend: '+0.4%' },
    { label: 'Patients Waiting', value: '8', trend: null }
  ];

  return (
    <div className="space-y-4">
      {/* Top Page Actions & Metrics Ribbon */}
      <div className="bg-white border border-slate-300 flex flex-col">
        {/* Actions Bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200 bg-slate-50">
          <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">System Telemetry</h3>
          <div className="flex gap-2">
            <button 
              onClick={onOpenReview}
              className="px-3 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
              Review Pending
            </button>
            <button 
              onClick={() => onStartEncounter('pat-1')}
              className="px-3 py-1 bg-slate-800 text-white rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-slate-900 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> New Encounter
            </button>
          </div>
        </div>

        {/* Continuous Metrics Ribbon */}
        <div className="grid grid-cols-4 divide-x divide-slate-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-3 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </span>
                {stat.trend && (
                  <span className="text-[9px] font-black text-green-600">
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-slate-900 leading-none">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts Banner */}
      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 px-3 py-2 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">System Alert: Cluster Detected</h4>
          <p className="text-[11px] text-amber-700 mt-0.5 font-medium">
            Malaria cluster pattern detected in Ward 4. Immediate vector control screening recommended.
          </p>
        </div>
      </div>

      {/* Grid Layout for Queue and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Queue Data Table */}
        <div className="lg:col-span-2 bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 flex justify-between items-center bg-slate-50">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Active Patient Queue</h3>
            <button 
              onClick={onViewAllQueue}
              className="text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Patient ID</th>
                  <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Demographics</th>
                  <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Status</th>
                  <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="font-bold text-slate-900 text-[11px] uppercase">{p.name}</div>
                      <div className="text-slate-500 font-mono text-[9px]">{p.mrn}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="text-[10px] font-bold text-slate-700">{p.age} {p.gender[0]} • {p.ward}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[150px]" title={p.chiefComplaint}>
                        {p.chiefComplaint}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <span className={`px-1.5 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                        p.urgency === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.urgency}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      <button 
                        onClick={() => onStartEncounter(p.id)}
                        className="px-2 py-1 bg-white border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 font-bold text-[9px] uppercase tracking-wider transition-colors"
                      >
                        Begin Intake
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs Compact */}
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 bg-slate-50">
            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">System Logs (24h)</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {logs.slice(0, 6).map((log) => {
              const Icon = log.type === 'verified' ? CheckCircle2 : log.type === 'autosave' ? Edit3 : Hourglass;
              const colorClass = log.type === 'verified' ? 'text-green-600' : log.type === 'autosave' ? 'text-blue-600' : 'text-slate-400';
              return (
                <div key={log.id} className="px-3 py-2 flex items-start gap-2 hover:bg-slate-50">
                  <Icon className={`w-3.5 h-3.5 mt-0.5 ${colorClass}`} />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-bold text-slate-900 leading-tight uppercase tracking-wide">{log.title}</h4>
                    <p className="text-[9px] text-slate-500 leading-snug mt-0.5">{log.description}</p>
                  </div>
                  <span className="text-[8px] font-black tracking-widest uppercase text-slate-400 flex-shrink-0">{log.timeAgo}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
