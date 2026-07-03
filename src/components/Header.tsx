import React from 'react';
import { Search, Bell, ArrowLeft, Plus } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  user: User;
  rightActions?: React.ReactNode;
}

export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  searchPlaceholder = "Search patients, codes, diagnostics...",
  searchValue,
  onSearchChange,
  user,
  rightActions
}: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-224px)] h-16 bg-white/80 backdrop-blur-xl z-40 px-6 border-b border-border flex items-center justify-between">
      {/* Left: Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBackButton && (
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-bg-main rounded-lg transition-colors text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <img
          src="/clinix-logo.jpg"
          alt="Clinix Logo"
          className="w-8 h-8 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-text-primary tracking-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[10px] text-text-secondary font-medium truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center max-w-md hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-3.5 h-3.5" />
          <input 
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-bg-main border border-border rounded-xl text-xs pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all text-text-primary placeholder:text-text-light"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        {rightActions && (
          <div className="flex items-center gap-2 hidden lg:flex">
            {rightActions}
          </div>
        )}

        <button className="p-2 rounded-xl hover:bg-bg-main text-text-light hover:text-text-secondary relative transition-all cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-[11px] text-text-primary leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[9px] text-text-secondary font-medium mt-0.5">
              {user.hospital}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-primary/20">
            {user.firstName[0]}{user.lastName[0]}
          </div>
        </div>
      </div>
    </header>
  );
}
