import React from 'react';
import { 
  Activity, 
  Users, 
  FileText, 
  Stethoscope, 
  Award,
  Settings,
  HelpCircle,
  LogOut,
  Hospital
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: string;
  onOpenSettings?: () => void;
  onOpenSupport?: () => void;
}

export default function Sidebar({ currentTab, setCurrentTab, role, onOpenSettings, onOpenSupport }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Patient Queue', icon: Users },
    { id: 'investigations', label: 'Investigations', icon: Stethoscope },
    { id: 'reports', label: 'Reports', icon: FileText },
    ...(role === 'Resident' ? [{ id: 'portfolio', label: 'My Portfolio', icon: Award }] : []),
    ...(role === 'Supervisor' ? [{ id: 'case-review', label: 'Supervisor Review', icon: Award }] : []),
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-52 bg-slate-900 flex flex-col border-r border-slate-800 flex-shrink-0 text-slate-300 z-50">
      <div className="h-14 flex items-center px-4 border-b border-slate-800">
        <Hospital className="w-5 h-5 text-blue-500 mr-2" />
        <span className="font-bold text-sm tracking-wide text-white uppercase">Clinix OS</span>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-1 px-2">
        <span className="px-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">Main Menu</span>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || (tab.id === 'dashboard' && currentTab === 'new-encounter');
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="py-4 px-2 border-t border-slate-800 flex flex-col gap-1">
        <span className="px-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">System</span>
        <button onClick={onOpenSettings} className="flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold hover:bg-slate-800 hover:text-white text-slate-400 cursor-pointer">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span>Preferences</span>
        </button>
        <button onClick={onOpenSupport} className="flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold hover:bg-slate-800 hover:text-white text-slate-400 cursor-pointer">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span>Help & Docs</span>
        </button>
        <button className="flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold hover:bg-red-500/10 hover:text-red-400 text-slate-400 mt-2 cursor-pointer">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
