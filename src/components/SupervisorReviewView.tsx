import React, { useState } from 'react';
import { 
  History, 
  Sparkles, 
  User, 
  Check, 
  TrendingUp, 
  CheckCircle2, 
  AlertOctagon,
  Brain,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';

interface SupervisorReviewProps {
  onBack: () => void;
  onApproveAndSign: (patientName: string, diagnosis: string) => void;
}

export default function SupervisorReviewView({
  onBack,
  onApproveAndSign
}: SupervisorReviewProps) {
  const [supervisorNotes, setSupervisorNotes] = useState('');
  const [adopted, setAdopted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdoptSuggestions = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAdopted(true);
      setIsProcessing(false);
      setSupervisorNotes(prev => 
        (prev ? prev + '\n\n' : '') + 
        'Concur with student assessment. Malaria RDT positive — confirm ACT regimen. Add anti-emetic (Ondansetron 4mg) PRN for nausea. Schedule Day 3 follow-up for parasite clearance.'
      );
    }, 800);
  };

  const handleSignEncounter = () => {
    onApproveAndSign('Fatima Abdullahi', 'Probable Malaria (Uncomplicated)');
  };

  return (
    <div className="space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-bg-main rounded-xl text-text-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-text-primary tracking-tight">Supervisor Review</h2>
            <p className="text-[10px] text-text-secondary font-medium">
              Submitted by Ademilua Adeola • 500L Student • 30m ago
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent font-bold text-[11px] rounded-xl hover:bg-accent/15 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <AlertOctagon className="w-3.5 h-3.5" /> Request Changes
          </button>
          <button 
            onClick={handleSignEncounter}
            className="px-4 py-2 gradient-primary text-white font-bold text-[11px] rounded-xl hover:shadow-lg hover:shadow-primary/25 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" /> Approve & Sign
          </button>
        </div>
      </div>

      {/* Patient Context */}
      <div className="gradient-dark rounded-2xl p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-bold text-sm">FA</div>
          <div>
            <h3 className="font-bold text-sm">Fatima Abdullahi</h3>
            <p className="text-[10px] text-white/50 font-medium">LTH-2024-001 • Female, 34y • Fever, headache, chills for 3 days</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-accent/20 text-accent text-[10px] font-bold">Urgent</span>
      </div>

      {/* Tri-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Student Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-base overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-text-primary">Student Assessment</span>
            </div>
            <History className="w-3.5 h-3.5 text-text-light" />
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Clinical Findings</h4>
              <p className="text-[11px] leading-relaxed text-text-primary">
                34-year-old female presents with 3-day history of high-grade fever (38.5°C), severe headache, and rigors. 
                No recent travel. Endemic malaria area. BP 120/80, Pulse 88, SpO2 98%.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Working Diagnosis</h4>
              <p className="text-[11px] font-semibold text-text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">
                Probable Malaria (Uncomplicated)
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Plan</h4>
              <ul className="space-y-1.5">
                {[
                  'Confirm with Malaria RDT',
                  'Start ACT (Artemether-Lumefantrine) if positive',
                  'Full Blood Count',
                  'Adequate hydration and antipyretics',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-[11px] text-text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* AI Validation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-base overflow-hidden border-primary/20"
        >
          <div className="px-5 py-3 border-b border-primary/20 flex justify-between items-center bg-primary/5">
            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary">AI Validation</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="p-5 space-y-4 flex-1 flex flex-col">
            <div>
              <h4 className="text-[10px] font-semibold text-primary mb-1.5">Concordance Analysis</h4>
              <div className="text-[11px] leading-relaxed text-text-primary bg-success/5 p-3 rounded-lg border border-success/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-success inline mr-1.5" />
                Student diagnosis <span className="font-bold">concordant</span> with AI analysis (92% confidence for Malaria). 
                Symptom triad and clinical presentation are consistent with uncomplicated malaria.
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold text-primary mb-1.5">Additional Suggestion</h4>
              <div className="flex items-start gap-2 p-3 rounded-lg border border-primary/15 bg-white">
                <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-text-primary">Add anti-emetic PRN</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">
                    Patient's nausea rating suggests Ondansetron 4mg PRN may improve treatment adherence.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                onClick={handleAdoptSuggestions}
                disabled={adopted || isProcessing}
                className={`w-full py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                  adopted 
                    ? 'bg-success/10 border border-success/20 text-success cursor-default' 
                    : 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 cursor-pointer'
                }`}
              >
                {isProcessing ? 'Processing...' : adopted ? '✓ Suggestions Adopted' : 'Adopt Suggestions'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Supervisor Notes */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gradient-dark rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-primary-light" />
              <span className="text-xs font-bold text-white">Supervisor Notes</span>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 h-full">
            <textarea 
              value={supervisorNotes}
              onChange={(e) => setSupervisorNotes(e.target.value)}
              className="flex-1 min-h-[200px] bg-white/5 border border-white/10 focus:border-primary/40 rounded-xl p-3 text-[11px] text-white/80 placeholder:text-white/20 resize-none outline-none transition-all"
              placeholder="Add clinical directives, corrections, or teaching notes..."
            />
            <div className="flex gap-2">
              <button 
                onClick={onBack}
                className="flex-1 py-2.5 border border-white/10 text-white/60 hover:bg-white/5 rounded-xl font-bold text-[11px] transition-all cursor-pointer"
              >
                Request Changes
              </button>
              <button 
                onClick={handleSignEncounter}
                className="flex-[2] py-2.5 gradient-primary hover:shadow-lg hover:shadow-primary/25 text-white rounded-xl font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Approve & Sign
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Student Competency Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-base overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
          <h3 className="text-xs font-bold text-text-primary">Student Competency — This Encounter</h3>
          <div className="flex gap-4 text-[10px] font-semibold">
            <span className="text-success">Accuracy: 94%</span>
            <span className="text-primary">Duration: 18m</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border-light">
          {[
            { label: 'History Taking', score: 95, max: 100 },
            { label: 'Physical Exam', score: 88, max: 100 },
            { label: 'Diagnosis', score: 92, max: 100 },
            { label: 'Treatment Plan', score: 90, max: 100 },
            { label: 'Communication', score: 96, max: 100 },
          ].map((metric) => (
            <div key={metric.label} className="p-4 text-center">
              <p className="text-[10px] font-semibold text-text-secondary mb-2">{metric.label}</p>
              <div className="relative mx-auto w-10 h-10 mb-1.5">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                  <circle 
                    cx="20" cy="20" r="16" 
                    stroke="#0d9488" 
                    strokeWidth="3" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${(metric.score / 100) * 100.5} 100.5`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-text-primary">
                  {metric.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
