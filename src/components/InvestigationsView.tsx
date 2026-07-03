import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Download, FlaskConical, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';
import { ApiInventory } from '../types';

interface InvestigationsViewProps {
  inventory: ApiInventory | null;
  loading: boolean;
  error: string;
  onRetry: () => void;
  searchValue: string;
}

export default function InvestigationsView({ inventory, loading, error, onRetry, searchValue }: InvestigationsViewProps) {
  if (loading) return <div className="h-[520px] rounded-2xl bg-white border border-border animate-pulse" />;
  if (error) {
    return (
      <div className="card-base p-8 text-center">
        <AlertCircle className="w-8 h-8 text-accent mx-auto mb-3" />
        <p className="text-sm font-bold text-text-primary">Investigations could not load</p>
        <p className="text-xs text-text-secondary mt-1">{error}</p>
        <button onClick={onRetry} className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">Retry</button>
      </div>
    );
  }

  const rows = Object.entries(inventory?.tests || {}).map(([id, test]) => ({
    id,
    test: String(test.test || test.test_name || id),
    status: test.available ? 'Available' : 'Unavailable',
    result: test.available ? `Turnaround ${test.turnaround_minutes || '-'} minutes` : 'Currently unavailable',
    date: inventory?.last_updated ? new Date(inventory.last_updated).toLocaleString() : 'Not reported',
    validator: String(test.location || inventory?.hospital || 'Clinix Lab'),
  }));
  const filtered = rows.filter(item => {
    const query = searchValue.toLowerCase();
    return item.test.toLowerCase().includes(query) || item.result.toLowerCase().includes(query) || item.validator.toLowerCase().includes(query);
  });
  const available = rows.filter(item => item.status === 'Available').length;
  const unavailable = rows.length - available;

  return (
    <div className="space-y-5 select-none flex flex-col h-full">
      <div className="card-base overflow-hidden flex flex-col sm:flex-row">
        <div className="p-4 border-b sm:border-b-0 sm:border-r border-border flex-1">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-text-primary">Investigations Hub</h3>
          </div>
          <p className="text-[10px] text-text-secondary font-medium">{inventory?.hospital || 'Backend inventory'} diagnostics and test availability</p>
        </div>
        <div className="flex divide-x divide-border">
          {[
            { label: 'Available', value: available, icon: CheckCircle2, color: 'success' },
            { label: 'Tracked', value: rows.length, icon: Clock, color: 'warning' },
            { label: 'Unavailable', value: unavailable, icon: AlertCircle, color: 'accent' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 flex items-center gap-3 min-w-[130px]">
              <div className={`p-2 rounded-xl bg-${stat.color}/10`}><stat.icon className={`w-4 h-4 text-${stat.color}`} /></div>
              <div><p className="text-lg font-extrabold text-text-primary leading-none">{stat.value}</p><p className="text-[9px] text-text-secondary font-medium mt-0.5">{stat.label}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-base overflow-hidden flex-1">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
          <Stethoscope className="w-3.5 h-3.5 text-primary" />
          <h4 className="text-xs font-bold text-text-primary">Lab Availability Registry</h4>
        </div>
        <div className="divide-y divide-border-light">
          {filtered.map((item, idx) => {
            const isAvailable = item.status === 'Available';
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="px-5 py-4 flex items-center gap-4 hover:bg-bg-main/50">
                <div className={`p-2.5 rounded-xl ${isAvailable ? 'bg-success/10' : 'bg-bg-main'}`}>
                  {isAvailable ? <CheckCircle2 className="w-4 h-4 text-success" /> : <AlertCircle className="w-4 h-4 text-text-light" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="text-xs font-bold text-text-primary">{item.test}</h5>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isAvailable ? 'bg-success/10 text-success' : 'bg-bg-main text-text-light'}`}>{item.status}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary">{item.result}</p>
                  <p className="text-[10px] text-text-light mt-0.5">{item.date} - {item.validator}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-light">{item.id}</span>
                  <button className="p-2 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary"><Download className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
        {filtered.length === 0 && <div className="p-12 text-center text-xs text-text-secondary">No backend investigations match your search.</div>}
      </div>
    </div>
  );
}
