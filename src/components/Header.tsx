import React, { useState } from 'react';
import { Search, Bell, User, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  title: string;
  subtitle?: string; // Kept for compatibility but unused
  showBackButton?: boolean;
  onBack?: () => void;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  currentRole: { name: string; title: string; avatarUrl: string; };
  onRoleClick?: () => void;
  rightActions?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = false,
  onBack,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  currentRole,
  onRoleClick,
  rightActions
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-208px)] h-14 bg-white z-40 px-6 border-b border-slate-200 flex items-center justify-between">
      {/* Left side: Navigation or Title */}
      <div className="flex items-center gap-4 flex-1">
        {showBackButton && (
          <button 
            onClick={onBack}
            className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-md hidden md:flex relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
        <input 
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded text-xs pl-8 pr-3 py-1.5 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Right side: Actions & User */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {rightActions && (
          <div className="flex items-center gap-2 hidden lg:flex">
            {rightActions}
          </div>
        )}

        <button className="text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="font-bold text-[11px] text-slate-800 leading-none">{currentRole.name}</p>
              <p className="text-[9px] text-slate-500 font-semibold uppercase">{currentRole.title.split(' ')[0]}</p>
            </div>
            <img 
              src={currentRole.avatarUrl} 
              alt={currentRole.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md border border-slate-200 z-50 p-2"
              >
                <button 
                  onClick={() => {
                    if(onRoleClick) onRoleClick();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 text-xs font-semibold text-slate-600 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  Switch Perspective
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
