"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthStateOverlaysProps {
  isLoading: boolean;
  error: string | null;
  invite?: string | null;
  currency?: string | null;
}

export function AuthStateOverlays({ isLoading, error, invite, currency }: AuthStateOverlaysProps) {
  if (!isLoading && !error && !invite && !currency) return null;

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 pointer-events-none">
          <div className="h-1 w-full absolute top-0 left-0 bg-slate-800 overflow-hidden">
            <div className="h-full bg-amber-500 animate-pulse w-1/3 transition-all duration-1000 ease-in-out"></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-red-500/10 border-b border-red-500/20 p-3 flex items-center gap-3 text-red-400 animate-in slide-in-from-top-2 duration-300" aria-live="assertive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      
      {invite && !error && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-amber-500/10 border-b border-amber-500/20 p-3 flex items-center gap-3 text-amber-400 animate-in slide-in-from-top-2 duration-300" aria-live="polite">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-sm font-medium">You have been invited to join the <span className="font-bold">{invite}</span> workspace. Sign in to accept.</p>
        </div>
      )}

      {currency && !invite && !error && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-slate-800/40 border-b border-slate-700/30 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Regional Purchasing Power Parity (PPP) Active</span>
          <span className="font-mono text-amber-400 font-semibold">{currency}</span>
        </div>
      )}
    </>
  );
}
