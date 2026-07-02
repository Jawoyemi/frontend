import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  X, 
  Activity, 
  CheckCircle2,
  CloudLightning
} from 'lucide-react';
import { Patient } from '../types';

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
  const [labs, setLabs] = useState<string[]>(['RDT for Malaria', 'FBC']);
  const [newLabText, setNewLabText] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (patient) {
      setTemp(patient.vitals.temp);
      setBp(patient.vitals.bp);
      setPulse(patient.vitals.pulse);
      setSpo2(patient.vitals.spo2);
      setChiefComplaint(patient.chiefComplaint);
      setWorkingDiagnosis(patient.workingDiagnosis || 'Suspected Uncomplicated Malaria based on symptoms.');
    }
  }, [patient]);

  const handleAddSymptom = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSymptomText.trim()) {
      e.preventDefault();
      setSymptoms([...symptoms, newSymptomText.trim()]);
      setNewSymptomText('');
    }
  };

  const handleAddLab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabText.trim()) {
      e.preventDefault();
      setLabs([...labs, newLabText.trim()]);
      setNewLabText('');
    }
  };

  const triggerSaveDraft = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-300">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-200 rounded-sm text-slate-700 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Intake Diagnostics</h2>
          </div>
        </div>
        <select 
          value={selectedPatientId} 
          onChange={(e) => onPatientSelect(e.target.value)}
          className="border border-slate-300 bg-white rounded-sm text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 focus:outline-none focus:border-slate-800 cursor-pointer"
        >
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.mrn})</option>
          ))}
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 pb-16">
        
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Patient Info Compact */}
          <div className="bg-slate-800 border border-slate-700 p-3 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider">{patient.name}</h3>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">MRN: {patient.mrn} | {patient.gender}, {patient.age}y | Blood: {patient.bloodType}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                patient.urgency === 'Urgent' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {patient.urgency}
              </span>
            </div>
          </div>

          {/* Form Block: Vitals & Presentation */}
          <div className="bg-white border border-slate-300 flex flex-col">
            <div className="px-3 py-2 border-b border-slate-300 bg-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Vitals & Presentation</h4>
            </div>
            
            <div className="p-3 border-b border-slate-200">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Temp (°C)</label>
                  <input type="number" step="0.1" value={temp} onChange={e => setTemp(parseFloat(e.target.value) || 0)} className="w-full border border-slate-300 rounded-sm px-2 py-1 text-xs font-mono focus:outline-none focus:border-slate-800" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">BP (mmHg)</label>
                  <input type="text" value={bp} onChange={e => setBp(e.target.value)} className="w-full border border-slate-300 rounded-sm px-2 py-1 text-xs font-mono focus:outline-none focus:border-slate-800" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Pulse</label>
                  <input type="number" value={pulse} onChange={e => setPulse(parseInt(e.target.value) || 0)} className="w-full border border-slate-300 rounded-sm px-2 py-1 text-xs font-mono focus:outline-none focus:border-slate-800" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">SpO2 (%)</label>
                  <input type="number" value={spo2} onChange={e => setSpo2(parseInt(e.target.value) || 0)} className="w-full border border-slate-300 rounded-sm px-2 py-1 text-xs font-mono focus:outline-none focus:border-slate-800" />
                </div>
              </div>
            </div>

            <div className="p-3">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Chief Complaint</label>
              <textarea 
                value={chiefComplaint} onChange={e => setChiefComplaint(e.target.value)} rows={2}
                className="w-full border border-slate-300 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-slate-800 mb-3 resize-none"
              />

              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Associated Symptoms</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {symptoms.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-300 text-slate-700 px-1.5 py-0.5 rounded-sm flex items-center gap-1 text-[10px] font-bold">
                    {s}
                    <button onClick={() => setSymptoms(symptoms.filter((_, i) => i !== idx))} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <input 
                type="text" value={newSymptomText} onChange={e => setNewSymptomText(e.target.value)} onKeyDown={handleAddSymptom}
                placeholder="Type symptom and press Enter..."
                className="w-full border border-slate-300 rounded-sm px-2 py-1 text-[11px] focus:outline-none focus:border-slate-800 mb-3"
              />

              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Severity</label>
              <div className="flex gap-1.5">
                {(['Mild', 'Moderate', 'Severe', 'Emergency'] as const).map(sev => (
                  <button key={sev} onClick={() => setSeverity(sev)} className={`flex-1 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border transition-colors cursor-pointer ${severity === sev ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'}`}>
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          
          {/* Automated Intelligence Tip */}
          {temp > 38.0 && (
            <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 p-2 flex gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-800 leading-none">Diagnostic Engine</h5>
                <p className="text-[10px] text-blue-700 mt-1 font-bold">High fever pattern aligns with Malaria/Typhoid vector. RDT Malaria highly recommended.</p>
              </div>
            </div>
          )}

          {/* Form Block: Exam & Orders */}
          <div className="bg-white border border-slate-300 flex flex-col flex-1">
            <div className="px-3 py-2 border-b border-slate-300 bg-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Assessment & Orders</h4>
            </div>

            <div className="p-3 border-b border-slate-200">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Physical Examination</label>
              <textarea 
                value={physicalExam} onChange={e => setPhysicalExam(e.target.value)} rows={2}
                className="w-full border border-slate-300 rounded-sm px-2 py-1.5 text-[11px] focus:outline-none focus:border-slate-800 mb-3 resize-none"
              />

              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Working Diagnosis</label>
              <textarea 
                value={workingDiagnosis} onChange={e => setWorkingDiagnosis(e.target.value)} rows={2}
                className="w-full border border-slate-300 rounded-sm px-2 py-1.5 text-[11px] font-bold focus:outline-none focus:border-slate-800 resize-none"
              />
            </div>

            <div className="p-3 flex-1">
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Lab / Imaging Orders</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {labs.map((l, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-300 text-slate-700 px-1.5 py-0.5 rounded-sm flex items-center gap-1 text-[10px] font-bold">
                    {l}
                    <button onClick={() => setLabs(labs.filter((_, i) => i !== idx))} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <input 
                type="text" value={newLabText} onChange={e => setNewLabText(e.target.value)} onKeyDown={handleAddLab}
                placeholder="Type order and press Enter..."
                className="w-full border border-slate-300 rounded-sm px-2 py-1 text-[11px] focus:outline-none focus:border-slate-800 mb-3"
              />

              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Management Plan</label>
              <textarea 
                value={managementPlan} onChange={e => setManagementPlan(e.target.value)} rows={2}
                className="w-full border border-slate-300 rounded-sm px-2 py-1.5 text-[11px] focus:outline-none focus:border-slate-800 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer sticky actions */}
      <div className="fixed bottom-0 right-0 left-52 bg-white border-t border-slate-300 px-6 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1"><CloudLightning className="w-3.5 h-3.5" /> {isSyncing ? 'Syncing...' : 'Synced'}</span>
          <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Validated</span>
        </div>
        <div className="flex gap-2">
          <button onClick={triggerSaveDraft} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 rounded-sm hover:bg-slate-100 cursor-pointer transition-colors">
            Save Draft
          </button>
          <button 
            onClick={() => onFinalize(selectedPatientId, workingDiagnosis, { temp, bp, pulse, spo2 })}
            className="px-6 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 border border-slate-800 rounded-sm hover:bg-slate-900 cursor-pointer transition-colors"
          >
            Finalize Intake
          </button>
        </div>
      </div>
    </div>
  );
}
