import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Edit3, 
  Hourglass,
  AlertCircle,
  Plus,
  Brain,
  Zap,
  Clock,
  ArrowUpRight,
  Activity,
  Award,
  Target,
  Users
} from 'lucide-react';
import { Patient, SystemLog } from '../types';
import { demoPortfolioStats } from '../data';
import { motion } from 'motion/react';

interface DashboardProps {
  patients: Patient[];
  logs: SystemLog[];
  onStartEncounter: (patientId: string) => void;
  onOpenReview: () => void;
  onViewAllQueue: () => void;
  onViewPortfolio: () => void;
}

export default function DashboardView({
  patients,
  logs,
  onStartEncounter,
  onOpenReview,
  onViewAllQueue,
  onViewPortfolio
}: DashboardProps) {
  const stats = [
    { label: 'Total Encounters', value: '47', icon: Activity, trend: '+12%', color: 'primary' },
    { label: 'Diagnostic Accuracy', value: '94%', icon: Target, trend: '+2.1%', color: 'success' },
    { label: 'Verified Credits', value: '156', icon: Award, trend: '+8', color: 'warning' },
    { label: 'Pending Reviews', value: '3', icon: Clock, trend: null, color: 'accent' },
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'primary': return { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' };
      case 'success': return { bg: 'bg-success/10', text: 'text-success', icon: 'text-success' };
      case 'warning': return { bg: 'bg-warning/10', text: 'text-warning', icon: 'text-warning' };
      case 'accent': return { bg: 'bg-accent/10', text: 'text-accent', icon: 'text-accent' };
      default: return { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colors = getColorClasses(stat.color);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="card-base p-5 stat-card-glow hover:translate-y-[-2px] transition-all cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                  <Icon className={`w-4.5 h-4.5 ${colors.icon}`} />
                </div>
                {stat.trend && (
                  <span className={`text-[11px] font-bold ${colors.text} flex items-center gap-0.5`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-extrabold text-text-primary tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-text-secondary font-medium mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* System Alert */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-warning/5 border border-warning/20 rounded-2xl px-5 py-4 flex items-start gap-3"
      >
        <div className="p-2 rounded-xl bg-warning/10 flex-shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4 text-warning" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-warning">MCP Alert: Malaria Cluster Detected</h4>
          <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
            Pattern analysis detected elevated malaria cases in Ward 4A. Immediate vector control screening recommended. 
            <span className="font-semibold text-primary ml-1 cursor-pointer hover:underline">View Details →</span>
          </p>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Patient Queue - Spans 2 cols */}
        <div className="lg:col-span-2 card-base overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Users className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="text-xs font-bold text-text-primary">Active Patient Queue</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenReview}
                className="px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent hover:bg-accent/15 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
              >
                Review Pending
              </button>
              <button 
                onClick={() => onStartEncounter('patient-001')}
                className="px-3 py-1.5 gradient-primary text-white rounded-lg text-[10px] font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> New Encounter
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-border-light">
            {patients.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="px-5 py-3.5 flex items-center gap-4 hover:bg-bg-main/50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                  p.priority === 'urgent' ? 'bg-accent' : 'gradient-primary'
                }`}>
                  {p.firstName[0]}{p.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-text-primary">{p.firstName} {p.lastName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      p.priority === 'urgent' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-0.5 truncate">
                    {p.age}{p.gender} • {p.hospitalId} • {p.chiefComplaint}
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-semibold text-text-secondary">{p.waitingTime}m wait</p>
                  <p className="text-[10px] text-text-light font-mono">{p.vitals.temp}°C</p>
                </div>
                <button 
                  onClick={() => onStartEncounter(p.id)}
                  className="px-3 py-1.5 bg-white border border-border text-text-secondary rounded-lg text-[10px] font-bold hover:bg-primary hover:text-white hover:border-primary transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  Begin Intake
                </button>
              </motion.div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-border flex justify-center">
            <button 
              onClick={onViewAllQueue}
              className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Full Queue <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: AI + Activity */}
        <div className="flex flex-col gap-5">
          {/* AI Insights Panel */}
          <div className="gradient-ai rounded-2xl overflow-hidden border border-white/5">
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary-light" />
                <h3 className="text-xs font-bold text-white">AI Insights</h3>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20 text-[9px] font-bold text-primary-light animate-mcp-pulse">
                <Zap className="w-2.5 h-2.5" /> MCP Active
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div className="ai-panel-glass p-3 rounded-xl">
                <p className="text-[10px] font-semibold text-white/70 mb-1">Latest Analysis</p>
                <p className="text-xs text-white font-bold">Malaria pattern detected — 92% confidence</p>
                <p className="text-[10px] text-white/50 mt-1">Coartem stock: 24 units ✓</p>
              </div>
              <div className="ai-panel-glass p-3 rounded-xl">
                <p className="text-[10px] font-semibold text-white/70 mb-1">Recommendation</p>
                <p className="text-xs text-white font-bold">RDT available • Day 3 follow-up drafted</p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card-base overflow-hidden flex-1">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-xs font-bold text-text-primary">Recent Activity</h3>
            </div>
            <div className="divide-y divide-border-light max-h-[280px] overflow-y-auto thin-scrollbar">
              {logs.slice(0, 5).map((log) => {
                const Icon = log.type === 'verified' ? CheckCircle2 
                  : log.type === 'autosave' ? Edit3 
                  : log.type === 'ai' ? Brain
                  : Hourglass;
                const iconColor = log.type === 'verified' ? 'text-success' 
                  : log.type === 'autosave' ? 'text-primary' 
                  : log.type === 'ai' ? 'text-primary-light'
                  : 'text-text-light';
                return (
                  <div key={log.id} className="px-5 py-3 flex items-start gap-3 hover:bg-bg-main/50 transition-colors">
                    <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${iconColor}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-semibold text-text-primary leading-tight truncate">{log.title}</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5 truncate">{log.description}</p>
                    </div>
                    <span className="text-[9px] font-medium text-text-light flex-shrink-0">{log.timeAgo}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-base overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-warning/10">
              <Award className="w-3.5 h-3.5 text-warning" />
            </div>
            <h3 className="text-xs font-bold text-text-primary">Portfolio Overview</h3>
          </div>
          <button 
            onClick={onViewPortfolio}
            className="text-[10px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Full Portfolio <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-border-light">
          {Object.entries(demoPortfolioStats.competencies).map(([key, val]) => (
            <div key={key} className="p-4 text-center hover:bg-bg-main/50 transition-colors">
              <div className="relative mx-auto w-12 h-12 mb-2">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                  <circle 
                    cx="24" cy="24" r="20" 
                    stroke="#0d9488" 
                    strokeWidth="3" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${(val.score / 100) * 125.6} 125.6`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-text-primary">
                  {val.score}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-text-secondary capitalize">
                {key.replace(/_/g, ' ')}
              </p>
              <p className="text-[9px] text-text-light mt-0.5">{val.encounters} cases</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
