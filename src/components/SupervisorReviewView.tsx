import React, { useState } from 'react';
import { 
  History, 
  Sparkles, 
  User, 
  Check, 
  TrendingUp, 
  Timer, 
  CheckCircle2, 
  AlertOctagon
} from 'lucide-react';

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

  // Adopt AI suggestions action
  const handleAdoptSuggestions = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAdopted(true);
      setIsProcessing(false);
      setSupervisorNotes(prev => 
        (prev ? prev + '\n\n' : '') + 
        'Agree with Resident draft. Appending anti-emetic Zofran 4mg IV Q6H PRN per patient\'s nausea rating (4/10) and history of Ibuprofen sensitivity. Monitor urine output.'
      );
    }, 800);
  };

  const handleSignEncounter = () => {
    onApproveAndSign('Patient #8842-X', 'Post-Op Laparoscopic Cholecystectomy');
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header Actions & Meta */}
      <div className="bg-white border border-slate-300 flex flex-col lg:flex-row justify-between items-start lg:items-center p-3">
        <div>
          <nav className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
            <span className="hover:text-slate-800 cursor-pointer" onClick={onBack}>Encounters</span>
            <span>/</span>
            <span className="hover:text-slate-800 cursor-pointer">Reviews</span>
            <span>/</span>
            <span className="text-slate-800">Post-Op Assessment</span>
          </nav>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-none uppercase">
            Case Review: Patient #8842-X
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Submitted by Resident Sarah Chen • 4h ago
          </p>
        </div>

        <div className="flex gap-2 mt-3 lg:mt-0">
          <button 
            onClick={onBack}
            className="px-4 py-1.5 border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <AlertOctagon className="w-3.5 h-3.5" /> Emergency Protocol
          </button>
          <button 
            onClick={handleSignEncounter}
            className="px-4 py-1.5 border border-slate-800 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" /> Approve &amp; Sign
          </button>
        </div>
      </div>

      {/* Tri-Pane Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Resident Draft Column */}
        <div className="bg-white border border-slate-300 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-300 flex justify-between items-center bg-slate-50">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Resident Draft</span>
            <History className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="p-3 flex-1">
            <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-400 mb-1">Clinical Findings</h4>
            <div className="text-[11px] leading-relaxed text-slate-800 font-medium mb-4">
              Patient presents post-laparoscopic cholecystectomy. Minimal drainage noted in JP bulb (serosanguinous). Vital signs stable within normal range. Mild tenderness at umbilical port site. Recommended discharge tomorrow morning.
            </div>
            <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-400 mb-1">Plan &amp; Action</h4>
            <ul className="space-y-1 text-[11px] font-medium text-slate-800">
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Continue current pain management regimen.</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Advance diet as tolerated.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* AI Validation Column */}
        <div className="bg-white border border-blue-200 flex flex-col">
          <div className="px-3 py-2 border-b border-blue-200 flex justify-between items-center bg-blue-50">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Automated Validation</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="p-3 flex-1 flex flex-col">
            <h4 className="font-black text-[9px] uppercase tracking-widest text-blue-500 mb-1">Discrepancy Analysis</h4>
            <div className="text-[11px] leading-relaxed text-blue-900 font-bold mb-4 bg-blue-50/50 p-2 border border-blue-100">
              Warning: Historical data for Patient #8842-X indicates a previous adverse reaction to Ibuprofen. Resident plan lacks specific anti-emetic orders which are critical given the patient's nausea score (4/10).
            </div>
            <div className="mt-auto">
              <div className="flex items-start gap-2 p-2 border border-blue-200 bg-white mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-500">Suggested Revision</p>
                  <p className="text-[11px] font-bold text-slate-900 mt-0.5">Add Zofran 4mg IV Q6H PRN</p>
                </div>
              </div>
              <button 
                onClick={handleAdoptSuggestions}
                disabled={adopted || isProcessing}
                className={`w-full py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  adopted 
                    ? 'bg-blue-50 border-blue-200 text-blue-600 cursor-default' 
                    : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                {isProcessing ? 'Processing...' : adopted ? 'Suggestions Adopted' : 'Adopt Overrides'}
              </button>
            </div>
          </div>
        </div>

        {/* Supervisor Final Input Column */}
        <div className="bg-slate-800 border border-slate-700 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-700 flex justify-between items-center bg-slate-900">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Attending Signature</span>
            <User className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="p-3 flex-1 flex flex-col gap-2">
            <textarea 
              value={supervisorNotes}
              onChange={(e) => setSupervisorNotes(e.target.value)}
              className="w-full flex-1 bg-slate-900 border border-slate-700 focus:border-slate-500 p-2 text-[11px] font-mono text-slate-300 placeholder:text-slate-600 resize-none outline-none transition-all"
              placeholder="Append clinical directives..."
            />
            <div className="flex gap-2">
              <button className="flex-1 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer">
                Flag
              </button>
              <button 
                onClick={handleSignEncounter}
                className="flex-[2] py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
              >
                Sign Off
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Telemetry Matrix */}
      <div className="bg-white border border-slate-300">
        <div className="px-3 py-2 border-b border-slate-300 flex justify-between items-center bg-slate-50">
          <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Resident Telemetry Matrix</h3>
          <div className="flex gap-4">
            <span className="text-[9px] font-black tracking-widest uppercase text-green-600">Avg Time: 14.2M</span>
            <span className="text-[9px] font-black tracking-widest uppercase text-blue-600">Accuracy: 92.4%</span>
          </div>
        </div>
        
        {/* Dense Tabular Matrix replacing the animated Radar Chart */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {[
            { label: 'Diagnostics', score: '94/100', trend: '+2%' },
            { label: 'Tech Skills', score: '88/100', trend: '+5%' },
            { label: 'Ethics', score: '99/100', trend: '0%' },
            { label: 'Communication', score: '82/100', trend: '-1%' },
            { label: 'Clinical Judgement', score: '91/100', trend: '+4%' }
          ].map((metric) => (
            <div key={metric.label} className="p-3">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{metric.label}</p>
              <div className="flex justify-between items-end">
                <p className="text-sm font-bold text-slate-900">{metric.score}</p>
                <p className={`text-[9px] font-black ${metric.trend.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {metric.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
