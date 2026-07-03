import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  X, 
  Activity
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import DashboardView from './components/DashboardView';
import NewEncounterView from './components/NewEncounterView';
import SupervisorReviewView from './components/SupervisorReviewView';
import StudentPortfolioView from './components/StudentPortfolioView';
import WalletSuccessView from './components/WalletSuccessView';
import PatientsView from './components/PatientsView';
import InvestigationsView from './components/InvestigationsView';
import ReportsView from './components/ReportsView';
import { Patient, SystemLog, ClinicalProcedure, User } from './types';
import { initialPatients, initialLogs, initialProcedures } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Navigation
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState('patient-001');
  const [searchValue, setSearchValue] = useState('');
  
  // Data stores
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);
  const [procedures, setProcedures] = useState<ClinicalProcedure[]>(initialProcedures);

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showWalletSuccess, setShowWalletSuccess] = useState(false);
  const [walletDetails, setWalletDetails] = useState({ patientName: '', diagnosis: '' });
  
  // Toast
  const [toastMessage, setToastMessage] = useState('');

  // Settings state
  const [mcpEndpoint, setMcpEndpoint] = useState('localhost:8000/clinical');
  const [walletAutoSync, setWalletAutoSync] = useState(true);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    triggerToast(`Welcome back, ${user.firstName}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('dashboard');
    setSearchValue('');
  };

  const handleStartEncounter = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentTab('new-encounter');
  };

  const handleFinalizeEncounter = (patientId: string, diagnosis: string, vitals: any) => {
    const matchedPat = patients.find(p => p.id === patientId);
    const patName = matchedPat ? `${matchedPat.firstName} ${matchedPat.lastName}` : 'Unknown Patient';

    // Update patient
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, vitals, workingDiagnosis: diagnosis, priority: 'routine' as const };
      }
      return p;
    }));

    // Add log entry
    const newLogEntry: SystemLog = {
      id: 'log-' + Date.now(),
      type: 'verified',
      title: `Encounter Finalized`,
      description: `Patient: ${patName} • ${diagnosis}`,
      timeAgo: 'Just now'
    };
    setLogs([newLogEntry, ...logs]);

    // Add to procedures
    const newProc: ClinicalProcedure = {
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `ENC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: diagnosis || 'Clinical Encounter',
      setting: 'Outpatient Clinic',
      supervisor: {
        name: 'Dr. C. Okonkwo',
        role: 'Attending Physician'
      },
      seal: `VERIFIED_${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      credits: 8
    };
    setProcedures([newProc, ...procedures]);

    // Show wallet/QR modal
    setWalletDetails({ patientName: patName, diagnosis });
    setShowWalletSuccess(true);
  };

  const handleApproveAndSign = (patientName: string, diagnosis: string) => {
    // Show wallet/QR modal for approved encounter
    setWalletDetails({ patientName, diagnosis });
    setShowWalletSuccess(true);
    triggerToast(`Encounter approved and signed for ${patientName}`);
    setCurrentTab('dashboard');
  };

  // Show login if no user
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getHeaderInfo = () => {
    switch (currentTab) {
      case 'dashboard':
        return { title: 'Clinical Dashboard', subtitle: 'LAUTECH Teaching Hospital' };
      case 'new-encounter':
        return { title: 'New Clinical Encounter', subtitle: 'Interactive Diagnostic Intake' };
      case 'case-review':
        return { title: 'Supervisor Review', subtitle: 'Case Validation & Approval' };
      case 'patients':
        return { title: 'Patient Queue', subtitle: 'Active Patient Registry' };
      case 'investigations':
        return { title: 'Investigations', subtitle: 'Lab Orders & Diagnostics' };
      case 'reports':
        return { title: 'Reports', subtitle: 'Audit & Performance Analytics' };
      case 'portfolio':
        return { title: 'Student Portfolio', subtitle: `${currentUser.firstName} ${currentUser.lastName} — Performance Records` };
      default:
        return { title: 'Clinical Dashboard', subtitle: '' };
    }
  };

  const { title: headerTitle, subtitle: headerSubtitle } = getHeaderInfo();

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            patients={patients}
            logs={logs}
            onStartEncounter={handleStartEncounter}
            onOpenReview={() => setCurrentTab('case-review')}
            onViewAllQueue={() => setCurrentTab('patients')}
            onViewPortfolio={() => setCurrentTab('portfolio')}
          />
        );
      case 'new-encounter':
        return (
          <NewEncounterView
            patients={patients}
            selectedPatientId={selectedPatientId}
            onPatientSelect={setSelectedPatientId}
            onBack={() => setCurrentTab('dashboard')}
            onFinalize={handleFinalizeEncounter}
          />
        );
      case 'case-review':
        return (
          <SupervisorReviewView
            onBack={() => setCurrentTab('dashboard')}
            onApproveAndSign={handleApproveAndSign}
          />
        );
      case 'patients':
        return (
          <PatientsView
            patients={patients}
            onStartEncounter={handleStartEncounter}
            searchValue={searchValue}
          />
        );
      case 'investigations':
        return <InvestigationsView searchValue={searchValue} />;
      case 'reports':
        return <ReportsView searchValue={searchValue} />;
      case 'portfolio':
        return (
          <StudentPortfolioView 
            procedures={procedures}
            searchValue={searchValue}
          />
        );
      default:
        return (
          <DashboardView
            patients={patients}
            logs={logs}
            onStartEncounter={handleStartEncounter}
            onOpenReview={() => setCurrentTab('case-review')}
            onViewAllQueue={() => setCurrentTab('patients')}
            onViewPortfolio={() => setCurrentTab('portfolio')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg-main font-sans flex antialiased">
      {/* Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSearchValue('');
        }}
        user={currentUser}
        onOpenSettings={() => setShowSettings(true)}
        onOpenSupport={() => setShowSupport(true)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 pl-56 flex flex-col min-h-screen">
        <Header 
          title={headerTitle}
          subtitle={headerSubtitle}
          showBackButton={currentTab === 'new-encounter' || currentTab === 'case-review'}
          onBack={() => setCurrentTab('dashboard')}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          user={currentUser}
        />

        <main className="flex-1 pt-20 px-6 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 gradient-dark text-white px-5 py-3.5 rounded-2xl z-50 flex items-center gap-2.5 shadow-xl shadow-black/20 border border-white/5"
          >
            <Activity className="w-4 h-4 text-primary-light" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold text-text-primary">Settings</h3>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 hover:bg-bg-main rounded-xl text-text-secondary cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary mb-1.5">
                    MCP Server Endpoint
                  </label>
                  <input 
                    type="text" 
                    value={mcpEndpoint}
                    onChange={(e) => setMcpEndpoint(e.target.value)}
                    className="w-full bg-bg-main border border-border rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/10 font-mono text-primary font-semibold"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h5 className="font-semibold text-xs text-text-primary">Chekk Wallet Auto-Sync</h5>
                    <p className="text-[10px] text-text-secondary mt-0.5">Auto-push encounter data to patient wallet</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={walletAutoSync}
                    onChange={(e) => setWalletAutoSync(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                </div>
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="mt-6 w-full py-3 gradient-primary text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showSupport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSupport(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <img src="/clinix-logo.jpg" alt="Clinix" className="w-5 h-5 rounded-lg" />
                  Clinix Help
                </h3>
                <button 
                  onClick={() => setShowSupport(false)}
                  className="p-1.5 hover:bg-bg-main rounded-xl text-text-secondary cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Clinix is a sovereign clinical intelligence platform that powers AI-guided clinical encounters, 
                supervisor verification, and portable patient health records via QR-based Chekk Data Wallets.
              </p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-text-primary">Quick Guide:</p>
                <ul className="text-xs text-text-secondary space-y-2 list-disc pl-5">
                  <li><span className="font-semibold text-text-primary">Start an encounter</span> by clicking a patient in the queue or dashboard.</li>
                  <li><span className="font-semibold text-text-primary">AI auto-analyzes</span> when symptoms match known patterns (e.g. fever + headache + chills).</li>
                  <li><span className="font-semibold text-text-primary">Finalize</span> to generate a QR encounter slip for the patient's Chekk Wallet.</li>
                  <li><span className="font-semibold text-text-primary">Supervisors</span> review and sign off on encounters to award verified credits.</li>
                </ul>
              </div>

              <button 
                onClick={() => setShowSupport(false)}
                className="mt-6 w-full py-3 gradient-primary text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wallet/QR Success Modal */}
      {showWalletSuccess && (
        <WalletSuccessView 
          onClose={() => {
            setShowWalletSuccess(false);
            setCurrentTab('dashboard');
          }}
          patientName={walletDetails.patientName}
          diagnosis={walletDetails.diagnosis}
        />
      )}
    </div>
  );
}
