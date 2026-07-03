import { Patient, SystemLog, ClinicalProcedure, User, AIAnalysis, PortfolioStats } from './types';

// ===========================
// Demo Users (PRD Section 15)
// ===========================
export const demoStudent: User = {
  id: 'student-001',
  email: 'adeola@clinix.ng',
  firstName: 'Ademilua',
  lastName: 'Adeola',
  role: 'student',
  yearOfStudy: 5,
  hospital: 'LAUTECH Teaching Hospital'
};

export const demoSupervisor: User = {
  id: 'supervisor-001',
  email: 'okonkwo@clinix.ng',
  firstName: 'Dr. Chukwuemeka',
  lastName: 'Okonkwo',
  role: 'supervisor',
  hospital: 'LAUTECH Teaching Hospital'
};

// ===========================
// Demo Patients (PRD Section 15)
// ===========================
export const initialPatients: Patient[] = [
  {
    id: 'patient-001',
    hospitalId: 'LTH-2024-001',
    firstName: 'Fatima',
    lastName: 'Abdullahi',
    age: 34,
    gender: 'F',
    chiefComplaint: 'Fever, headache, chills for 3 days',
    waitingTime: 12,
    priority: 'urgent',
    vitals: { temp: 38.5, bp: '120/80', pulse: 88, spo2: 98 }
  },
  {
    id: 'patient-002',
    hospitalId: 'LTH-2024-002',
    firstName: 'James',
    lastName: 'Okafor',
    age: 52,
    gender: 'M',
    chiefComplaint: 'Chest pain, shortness of breath',
    waitingTime: 8,
    priority: 'waiting',
    vitals: { temp: 36.8, bp: '142/90', pulse: 76, spo2: 95 }
  },
  {
    id: 'patient-003',
    hospitalId: 'LTH-2024-003',
    firstName: 'Chioma',
    lastName: 'Adeleke',
    age: 28,
    gender: 'F',
    chiefComplaint: 'Prenatal checkup, 28 weeks',
    waitingTime: 5,
    priority: 'waiting',
    vitals: { temp: 37.0, bp: '115/75', pulse: 72, spo2: 99 }
  }
];

// ===========================
// Mock AI Response (PRD Section 8)
// ===========================
export const mockAIResponse: AIAnalysis = {
  primaryDiagnosis: 'Probable Malaria (Uncomplicated)',
  confidence: 0.92,
  differential: [
    { condition: 'Malaria', probability: 0.92 },
    { condition: 'Typhoid fever', probability: 0.15 },
    { condition: 'Viral illness', probability: 0.08 }
  ],
  recommendedInvestigations: ['Malaria RDT', 'Full Blood Count'],
  urgency: 'routine',
  mcpActions: [
    {
      skill: 'malaria_detect',
      actions: [
        { type: 'inventory_check', drug: 'Artemether-Lumefantrine (Coartem)', stock: 24, available: true },
        { type: 'rdt_recommend', test: 'SD Bioline Malaria Ag', available: true },
        { type: 'schedule_followup', days: 3 }
      ]
    }
  ]
};

// ===========================
// Demo Portfolio Stats (PRD Section 15)
// ===========================
export const demoPortfolioStats: PortfolioStats = {
  totalEncounters: 47,
  totalDiagnoses: 23,
  diagnosticAccuracy: 0.94,
  totalCredits: 156,
  clinicalHours: 128,
  competencies: {
    history_taking: { score: 94, encounters: 47 },
    physical_exam: { score: 91, encounters: 42 },
    diagnosis: { score: 89, encounters: 38 },
    treatment: { score: 93, encounters: 35 },
    communication: { score: 96, encounters: 47 },
    procedures: { score: 85, encounters: 28 }
  }
};

// ===========================
// Initial System Logs
// ===========================
export const initialLogs: SystemLog[] = [
  {
    id: 'log-1',
    type: 'verified',
    title: 'Encounter #892 Verified',
    description: 'Malaria case finalized by Dr. Okonkwo • Credits awarded.',
    timeAgo: '2m ago'
  },
  {
    id: 'log-2',
    type: 'ai',
    title: 'AI Analysis: Malaria Cluster',
    description: 'MCP detected malaria cluster pattern in Ward 4A.',
    timeAgo: '15m ago'
  },
  {
    id: 'log-3',
    type: 'autosave',
    title: 'Draft Saved: Case #894',
    description: 'Patient: Fatima Abdullahi • Intake draft updated.',
    timeAgo: '20m ago'
  },
  {
    id: 'log-4',
    type: 'pending',
    title: 'Pending Review: Case #893',
    description: 'Awaiting supervisor signature and approval.',
    timeAgo: '1h ago'
  },
  {
    id: 'log-5',
    type: 'verified',
    title: 'Encounter #890 Signed',
    description: 'Prenatal assessment verified • +6 credits earned.',
    timeAgo: '3h ago'
  }
];

// ===========================
// Initial Procedures
// ===========================
export const initialProcedures: ClinicalProcedure[] = [
  {
    date: '02 Jul',
    time: '14:30',
    id: 'ENC-9024',
    name: 'Malaria Diagnosis & Treatment',
    setting: 'Outpatient Clinic',
    supervisor: {
      name: 'Dr. C. Okonkwo',
      role: 'Attending Physician'
    },
    seal: 'VERIFIED_9X72',
    credits: 8
  },
  {
    date: '01 Jul',
    time: '09:15',
    id: 'ENC-8890',
    name: 'Cardiac Assessment',
    setting: 'Emergency Department',
    supervisor: {
      name: 'Dr. A. Ibrahim',
      role: 'Cardiology Consultant'
    },
    seal: 'VERIFIED_1K02',
    credits: 10
  },
  {
    date: '30 Jun',
    time: '11:00',
    id: 'ENC-8211',
    name: 'Prenatal Checkup',
    setting: 'Obstetrics Clinic',
    supervisor: {
      name: 'Dr. F. Adeyemi',
      role: 'OB/GYN Specialist'
    },
    seal: 'VERIFIED_6M91',
    credits: 6
  }
];

// ===========================
// Helper: Check if complaint triggers AI
// ===========================
export function shouldTriggerAI(complaint: string): boolean {
  const lower = complaint.toLowerCase();
  return lower.includes('fever') && lower.includes('headache') && lower.includes('chill');
}
