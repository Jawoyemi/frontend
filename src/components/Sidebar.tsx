import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User;
  onOpenSettings?: () => void;
  onOpenSupport?: () => void;
  onLogout: () => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onOpenSettings, 
  onOpenSupport,
  onLogout 
}: SidebarProps) {
  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patient Queue', icon: Users },
    { id: 'investigations', label: 'Investigations', icon: Stethoscope },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'portfolio', label: 'My Portfolio', icon: Award },
  ];

  const supervisorTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patient Queue', icon: Users },
    { id: 'case-review', label: 'Review Cases', icon: ClipboardCheck },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const tabs = user.role === 'supervisor' ? supervisorTabs : studentTabs;

  return (
    <div className="fixed inset-y-0 left-0 w-56 glass-sidebar flex flex-col z-50">
      {/* Logo & Brand */}
      <div className="h-16 flex items-center px-5 border-b border-white/5">
        <img 
          src="/clinix-logo.jpg" 
          alt="Clinix Logo" 
          className="w-8 h-8 object-cover rounded-lg mr-3"
        />
        <div>
          <span className="font-extrabold text-sm tracking-tight text-white">Clinix</span>
          <div className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-primary-light" />
            <span className="text-[9px] font-medium text-primary-light tracking-wide">Sovereign AI</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-5 flex flex-col gap-0.5 px-3 overflow-y-auto thin-scrollbar">
        <span className="px-3 text-[10px] font-semibold uppercase text-white/25 tracking-widest mb-2">
          Navigation
        </span>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || 
            (tab.id === 'dashboard' && currentTab === 'new-encounter');
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'hover:bg-white/5 text-white/50 hover:text-white/80'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
              {tab.id === 'case-review' && (
                <span className="ml-auto bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile & System */}
      <div className="py-4 px-3 border-t border-white/5">
        {/* User Card */}
        <div className="px-3 py-2.5 rounded-xl bg-white/5 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-white/40 font-medium truncate">
                {user.role === 'student' ? `${user.yearOfStudy}00L Student` : 'Supervisor'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <button 
            onClick={onOpenSettings} 
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 text-white/40 hover:text-white/70 cursor-pointer transition-all"
          >
            <Settings className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Settings</span>
          </button>
          <button 
            onClick={onOpenSupport} 
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 text-white/40 hover:text-white/70 cursor-pointer transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Help</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-danger/10 text-white/40 hover:text-danger cursor-pointer transition-all mt-1"
          >
            <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
