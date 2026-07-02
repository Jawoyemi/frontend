import React from 'react';
import { 
  TrendingUp, 
  CheckSquare, 
  FileDown, 
  BarChart3 
} from 'lucide-react';

interface ReportsViewProps {
  searchValue: string;
}

export default function ReportsView({ searchValue }: ReportsViewProps) {
  const complianceItems = [
    { title: 'Electronic Case-Signature Verification', status: 'Compliant', desc: 'All diagnostic files are signed off with cryptographic keys.' },
    { title: 'Pathology Sample Matching Protocol', status: 'Compliant', desc: 'Matched patient identification bar code logs with blood tests.' },
    { title: 'Contraindicated Drug-Interaction Monitoring', status: 'Requires Review', desc: 'Found 1 instance where NSAIDs and adverse records crossed paths.' },
    { title: 'Prenatal Screenings Interval Compliance', status: 'Compliant', desc: 'All high-risk mother registrations are successfully processed.' }
  ];

  return (
    <div className="space-y-4 select-none flex flex-col h-full">
      {/* Telemetry Header */}
      <div className="bg-white border border-slate-300 flex flex-col sm:flex-row">
        <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-300 bg-slate-50 flex-1">
          <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Clinical Audit & Performance Reports
          </h3>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
            Compliance telemetry and residency validation checklists
          </p>
        </div>

        {/* Dense Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-300 bg-white">
          <div className="p-3 flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Overall Efficacy</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-slate-900 leading-none">94.2%</span>
              <span className="text-[9px] font-black text-green-600 mb-0.5">+2.1%</span>
            </div>
          </div>
          <div className="p-3 flex flex-col justify-center bg-red-50/50">
            <span className="text-[9px] font-bold uppercase tracking-widest text-red-800 mb-1">Unresolved Flags</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-red-600 leading-none">1</span>
              <span className="text-[9px] font-black text-red-500 mb-0.5">Pending</span>
            </div>
          </div>
          <div className="p-3 flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Diagnostic Audits</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-slate-900 leading-none">1,240</span>
              <span className="text-[9px] font-black text-slate-400 mb-0.5">Logged</span>
            </div>
          </div>
          <div className="p-3 flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Regulatory Index</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-green-600 leading-none">A+</span>
              <span className="text-[9px] font-black text-green-500 mb-0.5">Pass</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Compliance Checklist Panel */}
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 bg-slate-50 flex justify-between items-center">
            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" /> Regulatory Checklists
            </h4>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Audit</span>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {complianceItems.map((item, idx) => {
              const isComp = item.status === 'Compliant';
              return (
                <div key={idx} className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h5 className="font-bold text-[11px] text-slate-900 uppercase tracking-wide leading-tight">{item.title}</h5>
                    <span className={`inline-block whitespace-nowrap px-1.5 py-0.5 border text-[9px] font-black uppercase tracking-widest ${
                      isComp ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Efficacy trends mock panel */}
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 bg-slate-50">
            <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> Core Outcome Analytics
            </h4>
          </div>
          
          <div className="p-3">
            <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
              Residency outcome records matched with AI prediction values suggest a <span className="font-bold text-slate-900">+12% improvement</span> in diagnostic speed across the primary intake.
            </p>
          </div>

          {/* Very flat bar chart mockup */}
          <div className="flex-1 flex items-end px-3 pb-3 gap-1 mt-2 border-b border-slate-100">
            <div className="flex-1 bg-slate-200 h-1/3 hover:bg-slate-800 transition-colors"></div>
            <div className="flex-1 bg-slate-200 h-1/2 hover:bg-slate-800 transition-colors"></div>
            <div className="flex-1 bg-slate-200 h-2/5 hover:bg-slate-800 transition-colors"></div>
            <div className="flex-1 bg-slate-200 h-3/4 hover:bg-slate-800 transition-colors"></div>
            <div className="flex-1 bg-slate-200 h-2/3 hover:bg-slate-800 transition-colors"></div>
            <div className="flex-1 bg-slate-800 h-full"></div>
          </div>

          <div className="p-2 bg-slate-50 flex justify-center">
            <button className="text-[9px] font-bold text-slate-700 uppercase tracking-widest hover:underline cursor-pointer flex items-center gap-1.5 w-full justify-center">
              <FileDown className="w-3 h-3" /> Fetch Quality Audits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
