import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download
} from 'lucide-react';

interface InvestigationsViewProps {
  searchValue: string;
}

export default function InvestigationsView({ searchValue }: InvestigationsViewProps) {
  const labInvestigations = [
    { id: 'LAB-9021', test: 'RDT for Malaria', patient: 'Fatima Abdullahi', status: 'Completed', result: 'Positive (Plasmodium falciparum)', date: 'Today, 14:10', validator: 'Dr. Ibrahim (Pathology)' },
    { id: 'LAB-9022', test: 'Full Blood Count (FBC)', patient: 'Fatima Abdullahi', status: 'Processing', result: 'Pending cell count metrics', date: 'Today, 13:45', validator: 'System Auto-analysis' },
    { id: 'LAB-8910', test: 'Urinalysis Multi-parameter', patient: 'James Okafor', status: 'Completed', result: 'Normal parameters, no leukocyte esterase', date: 'Yesterday, 10:20', validator: 'Dr. Sarah Chen' },
    { id: 'LAB-8842', test: 'Liver Function Test (LFT)', patient: 'Sarah Chen (Review)', status: 'Awaiting Sample', result: 'Awaiting phlebotomy collection', date: 'Today, 09:00', validator: 'Central Lab Ward 1' }
  ];

  const filtered = labInvestigations.filter(item => 
    item.test.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.patient.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.result.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-4 select-none h-full flex flex-col">
      
      {/* Telemetry Header */}
      <div className="bg-white border border-slate-300 flex flex-col sm:flex-row">
        <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-300 bg-slate-50 flex-1">
          <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Laboratory & Investigations Hub
          </h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
            Diagnostics tracking and electronic test validations
          </p>
        </div>

        {/* Dense Stats Ribbon */}
        <div className="flex divide-x divide-slate-300 bg-white">
          <div className="p-3 w-32 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Completed</span>
            </div>
            <div className="text-xl font-bold text-slate-900 leading-none">42</div>
          </div>
          <div className="p-3 w-32 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Clock className="w-3 h-3 text-amber-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Processing</span>
            </div>
            <div className="text-xl font-bold text-slate-900 leading-none">8</div>
          </div>
          <div className="p-3 w-32 flex flex-col justify-center bg-red-50/50">
            <div className="flex items-center gap-1.5 mb-0.5">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-red-800">Critical</span>
            </div>
            <div className="text-xl font-bold text-red-600 leading-none">1</div>
          </div>
        </div>
      </div>

      {/* Lab Order Registry Data Table */}
      <div className="bg-white border border-slate-300 flex-1 overflow-hidden flex flex-col">
        <div className="px-3 py-2 border-b border-slate-300 bg-slate-50 flex justify-between items-center">
          <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Electronic Lab Order Registry</h4>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-300 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Reference ID</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Investigation</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Patient</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700">Lab Result / Validation</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700 text-center">Status</th>
                <th className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border-b border-slate-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, index) => {
                const isComp = item.status === 'Completed';
                const isProc = item.status === 'Processing';
                return (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="font-mono text-[10px] font-bold text-slate-800">{item.id}</div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">{item.date}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 w-48">
                      <div className="font-bold text-[11px] text-slate-900 uppercase">{item.test}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 w-40">
                      <div className="font-bold text-[10px] text-slate-800 uppercase">{item.patient}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100">
                      <div className="font-medium text-[10px] text-slate-800">{item.result}</div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">Validated By: {item.validator}</div>
                    </td>
                    <td className="px-3 py-2 align-top border-r border-slate-100 text-center w-32">
                      <span className={`inline-block w-full text-center px-1.5 py-0.5 border text-[9px] font-black uppercase tracking-widest ${
                        isComp 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : isProc 
                            ? 'bg-amber-50 border-amber-200 text-amber-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-right w-24">
                      <button className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 rounded-sm font-bold text-[9px] uppercase tracking-wider transition-colors inline-flex items-center gap-1">
                        <Download className="w-3 h-3" /> Fetch
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    No investigations match criteria.
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
