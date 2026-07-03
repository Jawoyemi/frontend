import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  X, 
  Activity, 
  CheckCircle2,
  CloudLightning,
  Brain,
  Zap,
  Package,
  TestTube,
  CalendarClock,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { Patient } from '../types';
import { mockAIResponse, shouldTriggerAI } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NewEncounterProps {
  patients: Patient[];
  selectedPatientId: string;
  onPatientSelect: (id: string) => void;
  onBack: () => void;
  onFinalize: (patientId: string, diagnosis: string, vitals: any) => void;
}

export default function NewEncounterView({
  patients,
  selectedPatientId,
  onPatientSelect,
  onBack,
  onFinalize
}: NewEncounterProps) {
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const [temp, setTemp] = useState(patient.vitals.temp);
  const [bp, setBp] = useState(patient.vitals.bp);
  const [pulse, setPulse] = useState(patient.vitals.pulse);
  const [spo2, setSpo2] = useState(patient.vitals.spo2);
  const [chiefComplaint, setChiefComplaint] = useState(patient.chiefComplaint);
  const [symptoms, setSymptoms] = useState<string[]>(['Fever', 'Headache', 'Chills']);
  const [newSymptomText, setNewSymptomText] = useState('');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe' | 'Emergency'>('Moderate');
  const [physicalExam, setPhysicalExam] = useState('');
  const [workingDiagnosis, setWorkingDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setTemp(patient.vitals.temp);
      setBp(patient.vitals.bp);
      setPulse(patient.vitals.pulse);
      setSpo2(patient.vitals.spo2);
      setChiefComplaint(patient.chiefComplaint);
      setWorkingDiagnosis(patient.workingDiagnosis || '');
    }
  }, [patient]);

  // Trigger AI when complaint matches fever+headache+chills
  useEffect(() => {
    if (shouldTriggerAI(chiefComplaint)) {
      setAiLoading(true);
      const timer = setTimeout(() => {
        setShowAI(true);
        setAiLoading(false);
        setWorkingDiagnosis(mockAIResponse.primaryDiagnosis);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setShowAI(false);
    }
  }, [chiefComplaint]);

  const handleAddSymptom = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSymptomText.trim()) {
      e.preventDefault();
      setSymptoms([...symptoms, newSymptomText.trim()]);
      setNewSymptomText('');
    }
  };

  const triggerSaveDraft = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const ai = mockAIResponse;

  return (
    <div className="flex flex-col h-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-bg-main rounded-xl text-text-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-text-primary tracking-tight">New Clinical Encounter</h2>
            <p className="text-[10px] text-text-secondary font-medium">Interactive Diagnostic Intake</p>
          </div>
        </div>
        <select 
          value={selectedPatientId} 
          onChange={(e) => onPatientSelect(e.target.value)}
          className="border border-border bg-white rounded-xl text-xs font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 cursor-pointer"
        >
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.hospitalId})</option>
          ))}
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 pb-20">
        
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          {/* Patient Info Card */}
          <div className="gradient-dark rounded-2xl p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                patient.priority === 'urgent' ? 'bg-accent' : 'bg-primary'
              }`}>
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div>
                <h3 className="font-bold text-sm">{patient.firstName} {patient.lastName}</h3>
                <p className="text-[10px] text-white/50 font-medium mt-0.5">
                  {patient.hospitalId} • {patient.gender === 'F' ? 'Female' : 'Male'}, {patient.age}y
                </p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
              patient.priority === 'urgent' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary-light'
            }`}>
              {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
            </span>
          </div>

          {/* Vitals & Presentation */}
          <div className="card-base overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <h4 className="text-xs font-bold text-text-primary">Vitals & Presentation</h4>
            </div>
            
            <div className="p-5 border-b border-border-light">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Temp (°C)', value: temp, onChange: (v: string) => setTemp(parseFloat(v) || 0), type: 'number', step: '0.1', alert: temp > 38 },
                  { label: 'BP (mmHg)', value: bp, onChange: (v: string) => setBp(v), type: 'text' },
                  { label: 'Pulse', value: pulse, onChange: (v: string) => setPulse(parseInt(v) || 0), type: 'number' },
                  { label: 'SpO2 (%)', value: spo2, onChange: (v: string) => setSpo2(parseInt(v) || 0), type: 'number' },
                ].map((vital, idx) => (
                  <div key={idx}>
                    <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">{vital.label}</label>
                    <input 
                      type={vital.type}
                      step={vital.step}
                      value={vital.value} 
                      onChange={e => vital.onChange(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all ${
                        vital.alert ? 'border-accent bg-accent/5 text-accent font-bold' : 'border-border'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Chief Complaint</label>
                <textarea 
                  value={chiefComplaint} onChange={e => setChiefComplaint(e.target.value)} rows={2}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Associated Symptoms</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {symptoms.map((s, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[10px] font-semibold">
                      {s}
                      <button onClick={() => setSymptoms(symptoms.filter((_, i) => i !== idx))} className="hover:text-accent cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" value={newSymptomText} onChange={e => setNewSymptomText(e.target.value)} onKeyDown={handleAddSymptom}
                  placeholder="Type symptom and press Enter..."
                  className="w-full border border-border rounded-xl px-4 py-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Severity</label>
                <div className="flex gap-2">
                  {(['Mild', 'Moderate', 'Severe', 'Emergency'] as const).map(sev => (
                    <button 
                      key={sev} 
                      onClick={() => setSeverity(sev)} 
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                        severity === sev 
                          ? 'gradient-primary text-white border-primary shadow-sm shadow-primary/20' 
                          : 'bg-white text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          
          {/* AI Analysis Panel */}
          <AnimatePresence>
            {(showAI || aiLoading) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                className="gradient-ai rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary-light" />
                    <h4 className="text-xs font-bold text-white">AI Diagnosis Engine</h4>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 text-[9px] font-bold text-primary-light animate-mcp-pulse">
                    <Zap className="w-2.5 h-2.5" /> Live
                  </span>
                </div>

                {aiLoading ? (
                  <div className="p-6 flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-primary-light rounded-full animate-spin" />
                    <p className="text-xs text-white/60 font-medium">Analyzing symptoms...</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {/* Primary Diagnosis */}
                    <div className="ai-panel-glass p-3.5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold text-white/60">Primary Diagnosis</span>
                        <span className="text-xs font-extrabold text-success">{Math.round(ai.confidence * 100)}%</span>
                      </div>
                      <p className="text-sm font-bold text-white">{ai.primaryDiagnosis}</p>
                    </div>

                    {/* Differential */}
                    <div className="ai-panel-glass p-3.5 rounded-xl">
                      <p className="text-[10px] font-semibold text-white/60 mb-2">Differential Diagnosis</p>
                      <div className="space-y-2">
                        {ai.differential.map((d, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="text-[11px] font-semibold text-white">{d.condition}</span>
                                <span className="text-[10px] font-bold text-white/70">{Math.round(d.probability * 100)}%</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full bg-primary-light transition-all"
                                  style={{ width: `${d.probability * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MCP Actions */}
                    <div className="ai-panel-glass p-3.5 rounded-xl">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3 h-3 text-primary-light" />
                        <p className="text-[10px] font-semibold text-white/60">MCP Action Skills</p>
                      </div>
                      <div className="space-y-2">
                        {ai.mcpActions[0].actions.map((action, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-lg ${action.available !== false ? 'bg-success/20' : 'bg-warning/20'}`}>
                              {action.type === 'inventory_check' ? (
                                <Package className="w-3 h-3 text-success" />
                              ) : action.type === 'rdt_recommend' ? (
                                <TestTube className="w-3 h-3 text-success" />
                              ) : (
                                <CalendarClock className="w-3 h-3 text-primary-light" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-semibold text-white">
                                {action.type === 'inventory_check' 
                                  ? `${action.drug}: ${action.stock} units` 
                                  : action.type === 'rdt_recommend'
                                  ? action.test
                                  : `Follow-up in ${action.days} days`}
                              </p>
                            </div>
                            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fever Alert */}
          {temp > 38.0 && !showAI && (
            <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 flex gap-3">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-warning">High Fever Detected</h5>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Temperature {temp}°C exceeds threshold. Consider malaria/typhoid workup.
                </p>
              </div>
            </div>
          )}

          {/* Assessment & Orders */}
          <div className="card-base overflow-hidden flex-1">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <h4 className="text-xs font-bold text-text-primary">Assessment & Orders</h4>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Physical Examination</label>
                <textarea 
                  value={physicalExam} onChange={e => setPhysicalExam(e.target.value)} rows={2}
                  placeholder="Document physical exam findings..."
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Working Diagnosis</label>
                <textarea 
                  value={workingDiagnosis} onChange={e => setWorkingDiagnosis(e.target.value)} rows={2}
                  placeholder="Enter working diagnosis..."
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-[11px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">Treatment Plan</label>
                <textarea 
                  value={treatmentPlan} onChange={e => setTreatmentPlan(e.target.value)} rows={2}
                  placeholder="Enter treatment plan..."
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 resize-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Sticky Actions */}
      <div className="fixed bottom-0 right-0 left-56 bg-white/80 backdrop-blur-xl border-t border-border px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 text-[10px] text-text-secondary font-semibold">
          <span className="flex items-center gap-1.5">
            <CloudLightning className={`w-3.5 h-3.5 ${isSyncing ? 'text-warning' : 'text-success'}`} />
            {isSyncing ? 'Syncing...' : 'Synced'}
          </span>
          {showAI && (
            <span className="flex items-center gap-1.5 text-primary">
              <Brain className="w-3.5 h-3.5" /> AI Active
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerSaveDraft} 
            className="px-5 py-2 text-[11px] font-bold text-text-secondary bg-white border border-border rounded-xl hover:bg-bg-main cursor-pointer transition-all"
          >
            Save Draft
          </button>
          <button 
            onClick={() => onFinalize(selectedPatientId, workingDiagnosis, { temp, bp, pulse, spo2 })}
            className="px-6 py-2 text-[11px] font-bold text-white gradient-primary rounded-xl hover:shadow-lg hover:shadow-primary/25 cursor-pointer transition-all"
          >
            Finalize for Review
          </button>
        </div>
      </div>
    </div>
  );
}
