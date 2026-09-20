import { memo } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

const MaintenanceOverlay = memo(function MaintenanceOverlay({ onAdminAccess }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37] blur-[200px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#0A0A0A] border border-zinc-800 p-8 sm:p-12 text-center shadow-2xl space-y-6">
        
        {/* Logo / Badge */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-8 h-8 text-[#D4AF37]" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] block">
            System Notice
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
            Service Temporarily Suspended
          </h1>
        </div>

        {/* Message Body */}
        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
          Access to this digital platform and its live services is currently paused pending account administrative review and invoice settlement.
        </p>

        <div className="p-4 bg-zinc-950/80 border border-zinc-850 text-zinc-500 text-xs leading-relaxed text-left space-y-1">
          <p><span className="text-zinc-400 font-semibold">Status:</span> Account Settlement Required</p>
          <p><span className="text-zinc-400 font-semibold">Reference:</span> TRV Studio Platform Rollout</p>
          <p><span className="text-zinc-400 font-semibold">Inquiries:</span> Please contact the system administrator to restore full live operations.</p>
        </div>

        {/* Secret / Minimal Admin Link for the developer */}
        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600">
          <span>TRV Studio • Infrastructure</span>
          <button 
            type="button" 
            onClick={onAdminAccess}
            className="hover:text-zinc-400 transition-colors p-1"
            title="Administrator Access"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
});

export default MaintenanceOverlay;
