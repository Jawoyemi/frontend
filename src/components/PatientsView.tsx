import React, { useState } from 'react';
import { 
  Filter, 
  Activity,
  Users,
  AlertTriangle
} from 'lucide-react';
import { Patient } from '../types';
import { motion } from 'motion/react';

interface PatientsViewProps {
  patients: Patient[];
  onStartEncounter: (id: string) => void;
  searchValue: string;
}

export default function PatientsView({
  patients,
  onStartEncounter,
  searchValue
}: PatientsViewProps) {
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const filtered = patients.filter(p => {
    const matchesSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchValue.toLowerCase()) || 
                          p.hospitalId.toLowerCase().includes(searchValue.toLowerCase()) ||
                          p.chiefComplaint.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPriority = filterPriority === 'All' ? true : p.priority === filterPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-5 select-none flex flex-col h-full">
      {/* Header */}
      <div className="card-base overflow-hidden flex flex-col sm:flex-row">
        <div className="p-4 border-b sm:border-b-0 sm:border-r border-border flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-text-primary">Patient Queue</h3>
          </div>
          <p className="text-[10px] text-text-secondary font-medium">
            Active patients waiting for clinical encounters
          </p>
        </div>
        <div className="flex gap-2 items-center p-3">
          <Filter className="w-3.5 h-3.5 text-text-light" />
          {['All', 'Urgent', 'Waiting', 'Routine'].map(priority => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                filterPriority === priority
                  ? 'gradient-primary text-white border-primary shadow-sm shadow-primary/20'
                  : 'bg-white text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, idx) => {
          const isHighTemp = p.vitals.temp >= 38.0;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="card-base p-5 hover:translate-y-[-2px] transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                    p.priority === 'urgent' ? 'bg-accent' : 'gradient-primary'
                  }`}>
                    {p.firstName[0]}{p.lastName[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{p.firstName} {p.lastName}</h4>
                    <p className="text-[10px] text-text-light font-mono">{p.hospitalId}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  p.priority === 'urgent' 
                    ? 'bg-accent/10 text-accent' 
                    : p.priority === 'waiting' 
                    ? 'bg-warning/10 text-warning'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                </span>
              </div>

              <p className="text-[11px] text-text-secondary leading-relaxed mb-3">
                {p.chiefComplaint}
              </p>

              {/* Vitals Grid */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {[
                  { label: 'T', value: `${p.vitals.temp}°`, alert: isHighTemp },
                  { label: 'BP', value: p.vitals.bp },
                  { label: 'P', value: p.vitals.pulse },
                  { label: 'O₂', value: `${p.vitals.spo2}%` },
                ].map((vital, vIdx) => (
                  <div key={vIdx} className={`text-center py-1.5 rounded-lg border text-[10px] font-mono font-semibold ${
                    vital.alert ? 'border-accent/30 bg-accent/5 text-accent' : 'border-border bg-bg-main text-text-secondary'
                  }`}>
                    <div className="text-[8px] text-text-light font-semibold mb-0.5">{vital.label}</div>
                    {vital.value}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-text-light font-medium">
                  <Activity className="w-3 h-3" />
                  {p.waitingTime}m waiting • {p.age}{p.gender}
                </div>
                <button
                  onClick={() => onStartEncounter(p.id)}
                  className="px-3 py-1.5 bg-white border border-border text-text-secondary rounded-lg text-[10px] font-bold hover:gradient-primary hover:text-white hover:border-primary transition-all cursor-pointer"
                >
                  Begin Intake
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card-base p-12 text-center">
          <AlertTriangle className="w-8 h-8 text-text-light mx-auto mb-3" />
          <p className="text-sm font-semibold text-text-secondary">No patients match your search criteria</p>
          <p className="text-xs text-text-light mt-1">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}
