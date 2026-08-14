"use client";

import { AlertCircle } from "lucide-react";

interface AuthStateOverlaysProps {
  isLoading: boolean;
  error: string | null;
}

export function AuthStateOverlays({ isLoading, error }: AuthStateOverlaysProps) {
  if (!isLoading && !error) return null;

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
        <div className="absolute top-0 left-0 right-0 z-40 bg-red-500/10 border-b border-red-500/20 p-3 flex items-center gap-3 text-red-400 animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </>
  );
}
