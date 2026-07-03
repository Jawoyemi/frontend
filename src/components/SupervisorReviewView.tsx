import React, { useState } from 'react';
import { AlertCircle, Brain, Check, CheckCircle2, Shield, User } from 'lucide-react';
import { ApiEncounter, Patient } from '../types';

interface SupervisorReviewProps {
  encounters: ApiEncounter[];
  patients: Patient[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onBack: () => void;
  onApprove: (encounterId: string, notes: string) => Promise<void>;
  onReject: (encounterId: string, notes: string) => Promise<void>;
}

export default function SupervisorReviewView({ encounters, patients, loading, error, onRetry, onBack, onApprove, onReject }: SupervisorReviewProps) {
  const [selectedId, setSelectedId] = useState('');
  const [supervisorNotes, setSupervisorNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageError, setPageError] = useState('');
  const encounter = encounters.find((item) => item.id === selectedId) || encounters[0];
  const patient = patients.find((item) => item.id === encounter?.patient_id);

  if (loading) return <div className="h-[520px] rounded-2xl bg-white border border-border animate-pulse" />;
  if (error) {
    return (
      <div className="card-base p-8 text-center">
        <AlertCircle className="w-8 h-8 text-accent mx-auto mb-3" />
        <p className="text-sm font-bold text-text-primary">Supervisor queue could not load</p>
        <p className="text-xs text-text-secondary mt-1">{error}</p>
        <button onClick={onRetry} className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">Retry</button>
      </div>
    );
  }

  if (!encounter) {
    return (
      <div className="card-base p-12 text-center">
        <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-3" />
        <p className="text-sm font-bold text-text-primary">No pending encounters</p>
        <p className="text-xs text-text-secondary mt-1">The backend review queue is clear.</p>
      </div>
    );
  }

  const sign = async () => {
    setIsProcessing(true);
    setPageError('');
    try {
      await onApprove(encounter.id, supervisorNotes);
    } catch (err) {
      setPageError(err instanceof Error ? err.message : 'Unable to approve encounter.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reject = async () => {
    setIsProcessing(true);
    setPageError('');
    try {
      await onReject(encounter.id, supervisorNotes || 'Changes requested by supervisor.');
      onBack();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : 'Unable to reject encounter.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-5 select-none">
      {pageError && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-700 font-semibold">{pageError}</div>}

      <div className="flex justify-between gap-2">
        <select value={encounter.id} onChange={(e) => setSelectedId(e.target.value)} className="border border-border bg-white rounded px-3 py-2 text-xs font-bold">
          {encounters.map((item) => <option key={item.id} value={item.id}>{item.chief_complaint} - {item.id.slice(0, 8)}</option>)}
        </select>
        <div className="flex gap-2">
          <button onClick={reject} disabled={isProcessing} className="px-4 py-2 border border-border text-text-secondary font-bold text-[11px] rounded hover:bg-bg-main disabled:opacity-60">Request Changes</button>
          <button onClick={sign} disabled={isProcessing} className="px-4 py-2 bg-primary text-white font-bold text-[11px] rounded hover:bg-primary/90 flex items-center gap-1.5 disabled:opacity-60">
            <Check className="w-3.5 h-3.5" /> Approve & Sign
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-4 flex items-center justify-between text-text-primary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center font-bold text-sm text-white">{patient ? `${patient.firstName[0]}${patient.lastName[0]}` : 'PT'}</div>
          <div>
            <h3 className="font-bold text-[13px]">{patient ? `${patient.firstName} ${patient.lastName}` : 'Patient record'}</h3>
            <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mt-0.5">{encounter.chief_complaint}</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded border border-warning/20 bg-warning/5 text-warning text-[9px] uppercase tracking-wider font-bold">Pending Review</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-text-primary">Student Assessment</span>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Clinical Findings</h4>
              <p className="text-[11px] leading-relaxed text-text-primary">{encounter.exam_notes || encounter.chief_complaint}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Working Diagnosis</h4>
              <p className="text-[11px] font-semibold text-text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10">{encounter.working_diagnosis || 'Not recorded'}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-text-secondary mb-1.5">Plan</h4>
              <p className="text-[11px] leading-relaxed text-text-primary">{encounter.treatment_plan || 'Not recorded'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-bg-main">
            <Brain className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">AI Validation</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-[11px] leading-relaxed text-text-primary bg-success/5 p-3 rounded-lg border border-success/15">
              {encounter.ai_diagnosis ? (
                <>AI diagnosis: <span className="font-bold">{encounter.ai_diagnosis}</span>{typeof encounter.ai_confidence === 'number' ? ` (${Math.round(encounter.ai_confidence * 100)}% confidence)` : ''}</>
              ) : (
                'No AI analysis is attached to this encounter.'
              )}
            </div>
            {(encounter.ai_differential || []).map((item) => (
              <p key={item.condition} className="text-[10px] text-text-secondary">{item.condition}: {Math.round(item.probability * 100)}%</p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-bg-main">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-text-primary uppercase tracking-wide">Supervisor Notes</span>
          </div>
          <div className="p-4 flex flex-col gap-3 h-full">
            <textarea value={supervisorNotes} onChange={(e) => setSupervisorNotes(e.target.value)} className="flex-1 min-h-[220px] bg-bg-main border border-border focus:border-primary rounded p-3 text-[11px] text-text-primary placeholder:text-text-light resize-none outline-none" placeholder="Add clinical directives, corrections, or teaching notes..." />
            <button onClick={sign} disabled={isProcessing} className="py-2.5 bg-primary hover:bg-primary/90 text-white rounded font-bold text-[11px] uppercase flex items-center justify-center gap-1.5 disabled:opacity-60">
              <Check className="w-3.5 h-3.5" /> Approve & Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
