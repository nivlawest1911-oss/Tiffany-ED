"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlassPanel from "@/components/ui/GlassPanel";
import { AlertTriangle, ArrowRight } from "lucide-react";

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

export default function NeedsAttentionCard() {
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
    <GlassPanel className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Needs Attention</CardTitle>
          <Link
            href="/command"
            className="text-xs text-[#C5A46E] hover:underline flex items-center gap-1"
          >
            Open Command <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {loading && (
          <p className="text-white/40 animate-pulse">Scanning early-warning signals…</p>
        )}
        {!loading && alerts.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-emerald-400/90 font-medium">All clear</p>
            <p className="text-white/40 text-xs mt-1">
              No EWS alerts right now. Keep generating groups and mastery signals.
            </p>
          </div>
        )}
        {!loading &&
          alerts.slice(0, 4).map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-white/50 shrink-0" />
                  <span className="font-medium text-white/90">{alert.title}</span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityColor[alert.severity]}`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-white/50 text-xs pl-5">{alert.reason}</p>
              <div className="flex items-center justify-between pl-5 pt-1">
                <span className="text-xs text-white/40">{alert.suggestedAction}</span>
                <Link
                  href={alert.href}
                  className="text-xs text-[#C5A46E] hover:underline shrink-0"
                >
                  Act →
                </Link>
              </div>
            </div>
          ))}
      </CardContent>
    </GlassPanel>
  );
}
