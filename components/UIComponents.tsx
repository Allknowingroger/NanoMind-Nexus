import React from 'react';

export const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
    {icon && <span className="text-neon-blue">{icon}</span>}
    <h2 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple uppercase tracking-widest">
      {title}
    </h2>
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-panel-bg border border-slate-200 rounded-lg p-6 hover:border-neon-blue/40 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}>
    {children}
  </div>
);

export const NeonButton: React.FC<{ onClick: () => void; disabled?: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative overflow-hidden group px-8 py-3 font-mono font-bold text-sm tracking-wider uppercase
      bg-transparent border border-neon-blue text-neon-blue rounded
      transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:bg-neon-blue hover:text-white hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]
    `}
  >
    <span className="relative z-10 flex items-center gap-2 justify-center">{children}</span>
  </button>
);

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 space-y-4">
    <div className="relative w-24 h-24">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full animate-spin-slow"></div>
      <div className="absolute top-0 left-0 w-full h-full border-t-4 border-neon-blue rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-neon-purple/10 rounded-full animate-pulse"></div>
    </div>
    <div className="text-neon-blue font-mono animate-pulse font-bold">
      INITIALIZING DEEP THINK PROTOCOLS...
    </div>
    <div className="text-xs text-slate-400 font-mono">
      Allocating Gemini 3 Thinking Budget
    </div>
  </div>
);