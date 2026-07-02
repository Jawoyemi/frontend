import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Beaker, 
  AlertOctagon, 
  BookOpen, 
  FileDown, 
  Lock
} from 'lucide-react';
import { ClinicalProcedure } from '../types';

interface StudentPortfolioProps {
  procedures: ClinicalProcedure[];
  searchValue: string;
}

export default function StudentPortfolioView({
  procedures,
  searchValue
}: StudentPortfolioProps) {
  const [filterType, setFilterType] = useState<'All' | 'Surgical' | 'Emergency' | 'Diagnostics'>('All');

  const filteredProcedures = procedures.filter(proc => {
    const matchesSearch = proc.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          proc.id.toLowerCase().includes(searchValue.toLowerCase()) ||
                          proc.setting.toLowerCase().includes(searchValue.toLowerCase());
    
    if (filterType === 'All') return matchesSearch;
    if (filterType === 'Surgical') return matchesSearch && (proc.name.toLowerCase().includes('sutur') || proc.name.toLowerCase().includes('thorac'));
    if (filterType === 'Emergency') return matchesSearch && (proc.setting.toLowerCase().includes('emergency') || proc.name.toLowerCase().includes('intrav'));
    if (filterType === 'Diagnostics') return matchesSearch && (proc.name.toLowerCase().includes('lab') || proc.name.toLowerCase().includes('test'));
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4 select-none">
      
      {/* Resident Identity Block */}
      <div className="bg-white border border-slate-300 flex flex-col md:flex-row">
        <div className="p-4 border-b md:border-b-0 md:border-r border-slate-300 flex items-center justify-center bg-slate-50">
          <img 
            className="w-20 h-20 object-cover border border-slate-300" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2jrG1JRxF3s25CMDH97_qph0Vv0BRxZb_UtewqQ5uwCXmp_58u7T94-wOASZDZleDasediH-15AlRrcSR4fLwMNQyB31BXYZpahvMIJ_CO4veLtfFKLbfGSQOTZwZlMA_dHtpK2p6DwEjQX3--Pi10KpcrIJhAjVD77JiRK77n5Z2U3KV1dD01KvxOnxBbvEk40cn0-T1EIlJ67Zd6yEzWE3LYTjHMU1Dgow6woMDJOsBFq5Qk9QsW00KG7WEg-ncEKSempYdIO8" 
            alt="Elena Rodriguez" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              Dr. Elena Rodriguez
            </h3>
            <span className="bg-slate-800 text-white px-1.5 py-0.5 text-[9px] font-black flex items-center gap-1 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> MDCN-V-2024-081
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Senior Surgical Resident • Teaching Hospital Ed.
          </p>
          <div className="flex gap-4 mt-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Lagos Central Hospital
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Mail className="w-3 h-3" /> elena.r@clinix.edu
            </div>
          </div>
        </div>

        {/* Aggregated Stats Panel */}
        <div className="p-4 bg-slate-800 text-white flex flex-col justify-center md:w-64 border-t md:border-t-0 md:border-l border-slate-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Procedures</span>
            <span className="text-lg font-bold">1,482</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Accuracy Rate</span>
            <span className="text-lg font-bold text-green-400">99.2%</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-700">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Portfolio Status</span>
            <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Gold
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Competency Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 bg-slate-50">
            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Competency Benchmarks</h4>
          </div>
          <div className="divide-y divide-slate-100 p-3 flex-1 flex flex-col justify-center gap-2">
            {[
              { label: 'Surgery', score: '95', target: '90' },
              { label: 'Diagnostics', score: '92', target: '85' },
              { label: 'Patient Care', score: '98', target: '90' },
              { label: 'Research', score: '88', target: '80' },
              { label: 'Ethics', score: '100', target: '95' },
              { label: 'Emergency', score: '94', target: '85' }
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center py-1 text-[11px] font-bold text-slate-800">
                <span className="uppercase tracking-widest w-24">{stat.label}</span>
                <div className="flex-1 mx-4 h-1.5 bg-slate-100 relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-blue-600" style={{ width: `${stat.score}%` }}></div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10" style={{ left: `${stat.target}%` }} title={`Target: ${stat.target}`}></div>
                </div>
                <span className="w-8 text-right font-mono">{stat.score}</span>
              </div>
            ))}
            <div className="flex justify-center mt-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
              Black mark indicates residency target
            </div>
          </div>
        </div>

        {/* Rotations / Certifications */}
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 bg-slate-50 flex justify-between">
            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Active Rotations</h4>
          </div>
          <div className="flex-1 divide-y divide-slate-200">
            
            <div className="p-3 flex items-start gap-3">
              <div className="p-1.5 bg-slate-100 border border-slate-300 text-slate-700">
                <Beaker className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-bold text-[11px] uppercase tracking-widest text-slate-900">Hematology Lab</h5>
                  <span className="text-[8px] bg-slate-800 text-white px-1.5 py-0.5 uppercase tracking-widest font-black">In Progress</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-500 mb-1">
                  <span>82% Complete</span>
                  <span>12/15 Cases</span>
                </div>
                <div className="w-full bg-slate-100 h-1"><div className="bg-slate-800 h-full w-[82%]" /></div>
              </div>
            </div>

            <div className="p-3 flex items-start gap-3">
              <div className="p-1.5 bg-slate-100 border border-slate-300 text-slate-700">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-bold text-[11px] uppercase tracking-widest text-slate-900">ER Trauma (Night)</h5>
                  <span className="text-[8px] bg-amber-500 text-white px-1.5 py-0.5 uppercase tracking-widest font-black">Critical Path</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-500 mb-1">
                  <span>45% Complete</span>
                  <span>4/10 Procedures</span>
                </div>
                <div className="w-full bg-slate-100 h-1"><div className="bg-slate-800 h-full w-[45%]" /></div>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-green-50 border border-green-200 text-green-700">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-[11px] uppercase tracking-widest text-slate-900">ACLS Certified</h5>
                  <p className="text-[9px] font-bold text-slate-500 mt-0.5">Valid to Dec 2026</p>
                </div>
              </div>
              <div className="text-right">
                <span className="flex items-center gap-1 justify-end text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5"><Lock className="w-3 h-3 text-slate-700" /> Hash</span>
                <span className="text-[9px] font-mono text-slate-400">0x71C...a49</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Verified Procedures Table */}
      <div className="bg-white border border-slate-300">
        <div className="px-3 py-2 border-b border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50">
          <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Verified Clinical Logbook</h4>

          <div className="flex gap-1 flex-wrap">
            {(['All', 'Surgical', 'Emergency', 'Diagnostics'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border transition-colors cursor-pointer ${
                  filterType === type
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Date/Time</th>
                <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Procedure</th>
                <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Setting</th>
                <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest border-r border-slate-100">Supervisor</th>
                <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-right">Cryptographic Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProcedures.length > 0 ? (
                filteredProcedures.map((proc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="font-bold text-[11px] text-slate-900 uppercase">{proc.date}</div>
                      <div className="text-[9px] font-mono text-slate-500">{proc.time}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="font-bold text-[11px] text-slate-800 uppercase">{proc.name}</div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">ID: {proc.id}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 text-[10px] font-bold text-slate-700">
                      {proc.setting}
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <img 
                          src={proc.supervisor.avatarUrl} 
                          alt={proc.supervisor.name}
                          className="w-5 h-5 border border-slate-300 object-cover" 
                        />
                        <div>
                          <p className="font-bold text-[10px] uppercase text-slate-800 leading-none mb-0.5">{proc.supervisor.name}</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest">{proc.supervisor.role.split(' ')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-300 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-700">
                        <Lock className="w-2.5 h-2.5 text-slate-500" />
                        {proc.seal}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    No verified procedures found matching the active search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-3 py-2 bg-slate-50 border-t border-slate-300 flex justify-center">
          <button className="text-[10px] font-bold text-slate-700 uppercase tracking-widest hover:underline flex items-center gap-1.5">
            <FileDown className="w-3.5 h-3.5" /> Download PDF Logbook
          </button>
        </div>
      </div>
    </div>
  );
}
