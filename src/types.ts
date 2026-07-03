export interface Patient {
  id: string;
  hospitalId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'M' | 'F';
  phone?: string;
  chiefComplaint: string;
  waitingTime: number;
  priority: 'urgent' | 'waiting' | 'routine';
  vitals: {
    temp: number;
    bp: string;
    pulse: number;
    spo2: number;
  };
  workingDiagnosis?: string;
}

export interface SystemLog {
  id: string;
  type: 'verified' | 'autosave' | 'pending' | 'ai';
  title: string;
  description: string;
  timeAgo: string;
}

export interface ClinicalProcedure {
  date: string;
  time: string;
  id: string;
  name: string;
  setting: string;
  supervisor: {
    name: string;
    role: string;
  };
  seal: string;
  credits: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'supervisor';
  yearOfStudy?: number;
  hospital: string;
}

export interface AIAnalysis {
  primaryDiagnosis: string;
  confidence: number;
  differential: { condition: string; probability: number }[];
  recommendedInvestigations: string[];
  urgency: string;
  mcpActions: {
    skill: string;
    actions: {
      type: string;
      drug?: string;
      stock?: number;
      available?: boolean;
      test?: string;
      days?: number;
    }[];
  }[];
}

export interface PortfolioStats {
  totalEncounters: number;
  totalDiagnoses: number;
  diagnosticAccuracy: number;
  totalCredits: number;
  clinicalHours: number;
  competencies: {
    [key: string]: { score: number; encounters: number };
  };
}

export interface WalletRecord {
  id: string;
  patientId: string;
  encounterId: string;
  qrPayload: string;
  encryptedSummary: string;
  status: 'pending' | 'pushed';
  pushedAt?: string;
}
