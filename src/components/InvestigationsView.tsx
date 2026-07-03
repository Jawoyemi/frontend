import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Stethoscope,
  FlaskConical
} from 'lucide-react';
import { motion } from 'motion/react';

interface InvestigationsViewProps {
  searchValue: string;
}

export default function InvestigationsView({ searchValue }: InvestigationsViewProps) {
  const labInvestigations = [
    { id: 'LAB-9021', test: 'RDT for Malaria', patient: 'Fatima Abdullahi', status: 'Completed', result: 'Positive (P. falciparum)', date: 'Today, 14:10', validator: 'Dr. Ibrahim (Pathology)' },
    { id: 'LAB-9022', test: 'Full Blood Count (FBC)', patient: 'Fatima Abdullahi', status: 'Processing', result: 'Pending cell count analysis', date: 'Today, 13:45', validator: 'Auto-analysis' },
    { id: 'LAB-8910', test: 'Urinalysis', patient: 'James Okafor', status: 'Completed', result: 'Normal parameters', date: 'Yesterday, 10:20', validator: 'Dr. Adeyemi' },
    { id: 'LAB-8842', test: 'Liver Function Test', patient: 'Chioma Adeleke', status: 'Awaiting Sample', result: 'Awaiting collection', date: 'Today, 09:00', validator: 'Central Lab' }
  ];

  const filtered = labInvestigations.filter(item => 
    item.test.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.patient.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.result.toLowerCase().includes(searchValue.toLowerCase())
  );

  const statusCounts = {
    completed: labInvestigations.filter(i => i.status === 'Completed').length,
    processing: labInvestigations.filter(i => i.status === 'Processing').length,
    awaiting: labInvestigations.filter(i => i.status === 'Awaiting Sample').length,
  };

  return (
    <div className="space-y-5 select-none flex flex-col h-full">
      
      {/* Header */}
      <div className="card-base overflow-hidden flex flex-col sm:flex-row">
        <div className="p-4 border-b sm:border-b-0 sm:border-r border-border flex-1">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-text-primary">Investigations Hub</h3>
          </div>
          <p className="text-[10px] text-text-secondary font-medium">Lab orders, diagnostics & test validations</p>
        </div>

        <div className="flex divide-x divide-border">
          {[
            { label: 'Completed', value: statusCounts.completed, icon: CheckCircle2, color: 'success' },
            { label: 'Processing', value: statusCounts.processing, icon: Clock, color: 'warning' },
            { label: 'Awaiting', value: statusCounts.awaiting, icon: AlertCircle, color: 'accent' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 flex items-center gap-3 min-w-[130px]">
                <div className={`p-2 rounded-xl bg-${stat.color}/10`}>
                  <Icon className={`w-4 h-4 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-text-primary leading-none">{stat.value}</p>
                  <p className="text-[9px] text-text-secondary font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lab Results */}
      <div className="card-base overflow-hidden flex-1">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
          <Stethoscope className="w-3.5 h-3.5 text-primary" />
          <h4 className="text-xs font-bold text-text-primary">Lab Order Registry</h4>
        </div>

        <div className="divide-y divide-border-light">
          {filtered.map((item, idx) => {
            const isComp = item.status === 'Completed';
            const isProc = item.status === 'Processing';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="px-5 py-4 flex items-center gap-4 hover:bg-bg-main/50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${
                  isComp ? 'bg-success/10' : isProc ? 'bg-warning/10' : 'bg-bg-main'
                }`}>
                  {isComp ? <CheckCircle2 className="w-4 h-4 text-success" />
                    : isProc ? <Clock className="w-4 h-4 text-warning" />
                    : <AlertCircle className="w-4 h-4 text-text-light" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="text-xs font-bold text-text-primary">{item.test}</h5>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      isComp ? 'bg-success/10 text-success' 
                      : isProc ? 'bg-warning/10 text-warning'
                      : 'bg-bg-main text-text-light'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary">{item.result}</p>
                  <p className="text-[10px] text-text-light mt-0.5">
                    {item.patient} • {item.date} • {item.validator}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-light">{item.id}</span>
                  {isComp && (
                    <button className="p-2 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/20 text-text-secondary hover:text-primary transition-all cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-xs text-text-secondary">
            No investigations match your search.
          </div>
        )}
      </div>
    </div>
  );
}
