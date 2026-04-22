"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Zap, RefreshCw, AlertCircle } from "lucide-react";

interface DualPersonaHUDProps {
  isGenerating: boolean;
  stressLevel: number;
  clinicalSafetyTriggered: boolean;
  biometrics?: {
    hr?: number;
    hrv?: number;
  };
}

export function DualPersonaHUD({
  isGenerating,
  stressLevel,
  clinicalSafetyTriggered,
  biometrics,
}: DualPersonaHUDProps) {


  const restorativeTeal = "#22d3ee";
  const statusColor = clinicalSafetyTriggered ? restorativeTeal : "#10b981";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
      {/* Background Pulse for Clinical Safety */}
      <AnimatePresence>
        {clinicalSafetyTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: restorativeTeal }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-6">
        {/* Header: Persona Sync Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`h-3 w-3 rounded-full ${isGenerating ? 'animate-pulse' : ''}`} style={{ backgroundColor: statusColor }} />
              {isGenerating && (
                <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full opacity-50" style={{ backgroundColor: statusColor }} />
              )}
            </div>
            <h3 className="text-sm font-bold tracking-widest text-white/50 uppercase">
              Neural Handshake / Edge Synthesis
            </h3>
          </div>
          {clinicalSafetyTriggered && (
            <div className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/30 px-3 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-tighter shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Shield className="h-3 w-3" />
              Sovereign Override Active
            </div>
          )}
        </div>

        {/* Dual Bar System: Pedagogy vs. Resilience */}
        <div className="grid grid-cols-2 gap-8 relative">
          {/* Central Handshake Icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={isGenerating ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="rounded-full border border-white/10 bg-black/80 p-2 shadow-2xl"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? 'text-white' : 'text-white/20'}`} />
            </motion.div>
          </div>

          {/* Left: Tiffany-ED (Pedagogy) */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-white/40">
              <span>Tiffany-ED</span>
              <span>SOR Rigor</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: clinicalSafetyTriggered ? "60%" : "95%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Right: AndrÃ© Patterson (Resilience) */}
          <div className="space-y-2 text-right">
            <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-white/40">
              <span>Patterson</span>
              <span>Neuro-Safety</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full float-right shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ backgroundColor: restorativeTeal }}
                initial={{ width: "0%" }}
                animate={{ width: `${stressLevel}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Biometric Telemetry Overlay */}
        <div className="grid grid-cols-3 gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
              <Zap className="h-2 w-2" /> Load
            </span>
            <p className="text-xl font-mono font-bold text-white">
              {stressLevel}<span className="text-[10px] text-white/40 ml-1">%</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
              <Activity className="h-2 w-2" /> BPM
            </span>
            <p className="text-xl font-mono font-bold text-white">
              {biometrics?.hr || "--"}<span className="text-[10px] text-white/40 ml-1">bpm</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1">
              <RefreshCw className="h-2 w-2" /> HRV
            </span>
            <p className="text-xl font-mono font-bold text-white">
              {biometrics?.hrv || "--"}
            </p>
          </div>
        </div>

        {/* Real-time Status Message */}
        <div className="min-h-[1.5rem]">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.p
                key="generating"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-medium text-emerald-400/80 italic"
              >
                Synthesizing neural lesson clusters... Handshaking with ALCOS standards.
              </motion.p>
            ) : clinicalSafetyTriggered ? (
              <motion.p
                key="override"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-tighter"
              >
                <AlertCircle className="h-3 w-3" />
                Vagus Nerve Protection Active. Synthesis modulated for restoration.
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] font-medium text-white/30"
              >
                Neural Handshake Standby. Awaiting biometric trigger.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
