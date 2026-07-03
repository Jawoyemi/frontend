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
  pendingReviewCount?: number;
  onOpenSettings?: () => void;
  onOpenSupport?: () => void;
  onLogout: () => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  pendingReviewCount = 0,
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
          src="/logo.png" 
          alt="Clinix Logo" 
          className="w-8 h-8 object-cover rounded-lg mr-3"
        />
        <div>
          <span className="font-extrabold text-sm tracking-tight text-white uppercase">Clinix OS</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-5 flex flex-col gap-0.5 px-3 overflow-y-auto thin-scrollbar">
        <span className="px-3 text-[10px] font-bold uppercase text-white/40 tracking-widest mb-2 mt-2">
          Main Menu
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
                  ? 'bg-primary text-white' 
                  : 'hover:bg-white/5 text-white/50 hover:text-white/80'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
              {tab.id === 'case-review' && pendingReviewCount > 0 && (
                <span className="ml-auto bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingReviewCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile & System */}
      <div className="py-4 px-3 border-t border-white/5 flex flex-col gap-0.5">
        <span className="px-3 text-[10px] font-bold uppercase text-white/40 tracking-widest mb-2">
          System
        </span>



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
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 text-white/40 hover:text-white/70 cursor-pointer transition-all mt-1"
          >
            <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Logout</span>
          </button>
      </div>
    </div>
  );
}
