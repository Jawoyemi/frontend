import React, { useState } from 'react';
import { 
  Filter, 
  Activity
} from 'lucide-react';
import { Patient } from '../types';

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
  const [filterWard, setFilterWard] = useState<string>('All');

  const filtered = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          p.mrn.toLowerCase().includes(searchValue.toLowerCase()) ||
                          p.chiefComplaint.toLowerCase().includes(searchValue.toLowerCase());
    const matchesWard = filterWard === 'All' ? true : p.ward.includes(filterWard);
    return matchesSearch && matchesWard;
  });

  const uniqueWards = ['All', 'Ward 1C', 'Ward 2A', 'Clinic B'];

  return (
    <div className="space-y-4 select-none flex flex-col h-full">
      {/* Header and Filters */}
      <div className="bg-white border border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-300 bg-slate-50 flex-1">
          <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Active Patient Registry
          </h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
            Real-time ward telemetry
          </p>
        </div>

        <div className="flex gap-1 items-center p-2 bg-slate-50">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {uniqueWards.map(ward => (
            <button
              key={ward}
              onClick={() => setFilterWard(ward)}
              className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border transition-colors cursor-pointer ${
                filterWard === ward
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {ward}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Data Table */}
      <div className="bg-white border border-slate-300 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-300 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Patient / MRN</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Location</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700 text-center">Vitals (T/BP/P/O2)</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Complaint</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700 text-center">Status</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => {
                const isHighTemp = p.vitals.temp >= 38.0;
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-3 py-2 align-top border-r border-slate-100 w-48">
                      <div className="font-bold text-[11px] text-slate-900 uppercase">{p.name}</div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">{p.mrn} • {p.age}{p.gender[0]}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 w-32">
                      <div className="text-[10px] font-bold text-slate-800 uppercase">{p.ward}</div>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5">{p.arrivalText}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 w-48">
                      <div className="grid grid-cols-4 gap-1 text-center bg-slate-50 border border-slate-200 p-1">
                        <div>
                          <div className={`font-mono text-[10px] font-bold ${isHighTemp ? 'text-red-600 bg-red-50' : 'text-slate-700'}`}>{p.vitals.temp}</div>
                        </div>
                        <div className="border-l border-slate-200">
                          <div className="font-mono text-[10px] font-bold text-slate-700">{p.vitals.bp}</div>
                        </div>
                        <div className="border-l border-slate-200">
                          <div className="font-mono text-[10px] font-bold text-slate-700">{p.vitals.pulse}</div>
                        </div>
                        <div className="border-l border-slate-200">
                          <div className="font-mono text-[10px] font-bold text-slate-700">{p.vitals.spo2}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="text-[10px] text-slate-800 font-medium leading-tight">
                        {p.chiefComplaint}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 text-center w-24">
                      <span className={`inline-block w-full text-center px-1.5 py-0.5 border text-[9px] font-black uppercase tracking-widest ${
                        p.urgency === 'Urgent' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {p.urgency}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-right w-32">
                      <button
                        onClick={() => onStartEncounter(p.id)}
                        className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 rounded-sm font-bold text-[9px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider w-full"
                      >
                        <Activity className="w-3 h-3" /> Intake
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    No active patients match criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
