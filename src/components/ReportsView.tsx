import React from 'react';
import { 
  TrendingUp, 
  CheckSquare, 
  FileDown, 
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface ReportsViewProps {
  searchValue: string;
}

export default function ReportsView({ searchValue }: ReportsViewProps) {
  const complianceItems = [
    { title: 'Case-Signature Verification', status: 'Compliant', desc: 'All diagnostic files are cryptographically signed by attending physician.' },
    { title: 'Pathology Sample Matching', status: 'Compliant', desc: 'Patient identification correctly matched with blood test specimens.' },
    { title: 'Drug-Interaction Monitoring', status: 'Review Needed', desc: '1 instance of potential NSAID contraindication detected in recent cases.' },
    { title: 'Prenatal Screening Intervals', status: 'Compliant', desc: 'All high-risk prenatal screenings completed within required timeframes.' }
  ];

  const stats = [
    { label: 'Overall Efficacy', value: '94.2%', trend: '+2.1%', trendColor: 'text-success' },
    { label: 'Unresolved Flags', value: '1', trend: 'Pending', trendColor: 'text-accent' },
    { label: 'Diagnostic Audits', value: '1,240', trend: 'Logged', trendColor: 'text-text-light' },
    { label: 'Regulatory Index', value: 'A+', trend: 'Pass', trendColor: 'text-success' },
  ];

  return (
    <div className="space-y-5 select-none flex flex-col h-full">
      {/* Header & Stats */}
      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-text-primary">Clinical Audit & Performance Reports</h3>
          </div>
          <p className="text-[10px] text-text-secondary font-medium">Compliance tracking and quality validation</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <p className="text-[10px] text-text-secondary font-medium mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-text-primary leading-none">{stat.value}</span>
                <span className={`text-[10px] font-bold ${stat.trendColor} mb-0.5`}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        {/* Compliance Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-base overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-3.5 h-3.5 text-primary" />
              <h4 className="text-xs font-bold text-text-primary">Regulatory Checklists</h4>
            </div>
            <span className="text-[9px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">Live Audit</span>
          </div>

          <div className="divide-y divide-border-light">
            {complianceItems.map((item, idx) => {
              const isComp = item.status === 'Compliant';
              return (
                <div key={idx} className="p-4 hover:bg-bg-main/50 transition-colors">
                  <div className="flex justify-between items-start gap-3 mb-1.5">
                    <div className="flex items-start gap-2.5">
                      {isComp ? (
                        <ShieldCheck className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      )}
                      <h5 className="text-xs font-bold text-text-primary">{item.title}</h5>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap ${
                      isComp ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary pl-6.5 ml-[26px]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Analytics Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-base overflow-hidden flex flex-col"
        >
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-xs font-bold text-text-primary">Outcome Analytics</h4>
          </div>
          
          <div className="p-5">
            <p className="text-[11px] text-text-secondary leading-relaxed mb-4">
              AI-matched residency outcome records show a <span className="font-bold text-primary">+12% improvement</span> in diagnostic speed and 
              <span className="font-bold text-success"> 94% accuracy</span> across primary intake encounters this quarter.
            </p>

            {/* Bar Chart */}
            <div className="space-y-3">
              {[
                { label: 'Q1 2026', value: 72 },
                { label: 'Q2 2026', value: 85 },
                { label: 'Q3 2026', value: 91 },
                { label: 'Q4 2026', value: 94 },
              ].map((bar, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-text-secondary w-16">{bar.label}</span>
                  <div className="flex-1 h-3 bg-bg-main rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.value}%` }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                      className="h-full rounded-full gradient-primary"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-text-primary w-8 text-right">{bar.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto px-5 py-3 border-t border-border flex justify-center">
            <button className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer">
              <FileDown className="w-3.5 h-3.5" /> Download Full Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
