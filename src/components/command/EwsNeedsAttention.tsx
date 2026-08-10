"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/Cinematic";

type EwsAlert = {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  reason: string;
  suggestedAction: string;
  href: string;
};

const severityColor: Record<EwsAlert["severity"], string> = {
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
  warning: "text-[#C5A46E] border-[#C5A46E]/30 bg-[#C5A46E]/10",
  info: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

export default function EwsNeedsAttention() {
  const [alerts, setAlerts] = useState<EwsAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/ews", { credentials: "include" });
        if (!res.ok) {
          if (!cancelled) setAlerts([]);
          return;
        }
        const json = await res.json();
        if (!cancelled) setAlerts(Array.isArray(json.alerts) ? json.alerts : []);
      } catch {
        if (!cancelled) setAlerts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GlassCard className="p-6 border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Early Warning Signals (EWS)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && (
          <div className="col-span-2 py-4">
            <p className="text-white/40 animate-pulse text-sm">Scanning early-warning signals…</p>
          </div>
        )}
        
        {!loading && alerts.length === 0 && (
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <p className="text-emerald-400/90 font-medium text-sm">Optimal Health</p>
            <p className="text-white/40 text-xs mt-1">
              No active EWS alerts detected across the fleet.
            </p>
          </div>
        )}
        
        {!loading &&
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-white/50 shrink-0" />
                    <span className="font-semibold text-white/90 text-sm tracking-tight">{alert.title}</span>
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full border ${severityColor[alert.severity]}`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-white/60 text-xs pl-6 leading-relaxed">
                  <span className="font-medium text-white/80">Reason:</span> {alert.reason}
                </p>
                <p className="text-white/60 text-xs pl-6 leading-relaxed">
                  <span className="font-medium text-[#C5A46E]">Action:</span> {alert.suggestedAction}
                </p>
              </div>
              <div className="flex items-center justify-end pt-3 mt-2 border-t border-white/5">
                <Link
                  href={alert.href}
                  className="text-xs text-amber-500 hover:text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
                >
                  Execute Directive <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </GlassCard>
  );
}
