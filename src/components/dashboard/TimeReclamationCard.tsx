"use client";

import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlassPanel from "@/components/ui/GlassPanel";
import { Clock } from "lucide-react";

type BreakdownItem = {
  actionType: string;
  label: string;
  minutes: number;
  count: number;
};

type TimeSavedResponse = {
  hours: number;
  totalMinutes: number;
  eventCount: number;
  breakdown: BreakdownItem[];
  degraded?: boolean;
};

export default function TimeReclamationCard() {
  const [data, setData] = useState<TimeSavedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/analytics/time-saved?range=week", {
          credentials: "include",
        });
        if (!res.ok) {
          if (!cancelled) {
            setData({ hours: 0, totalMinutes: 0, eventCount: 0, breakdown: [] });
          }
          return;
        }
        const json = (await res.json()) as TimeSavedResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData({ hours: 0, totalMinutes: 0, eventCount: 0, breakdown: [] });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hours = data?.hours ?? 0;
  const breakdown = data?.breakdown ?? [];

  return (
    <GlassPanel className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-white/60">Hours reclaimed this week</CardTitle>
          <Clock className="h-4 w-4 text-[#C5A46E]/70" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-5xl font-semibold text-white/30 animate-pulse">—</div>
        ) : (
          <>
            <div className="text-5xl font-semibold tracking-tight">
              {hours}
              <span className="ml-2 text-lg font-medium text-white/40">hrs</span>
            </div>
            <p className="text-emerald-400/90 text-sm mt-1">
              {data?.totalMinutes ?? 0} min across {data?.eventCount ?? 0} actions
            </p>
            {breakdown.length > 0 ? (
              <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                {breakdown.slice(0, 4).map((item) => (
                  <li
                    key={item.actionType}
                    className="flex items-center justify-between text-xs text-white/60"
                  >
                    <span>{item.label}</span>
                    <span className="font-medium text-white/80">
                      {item.minutes} min · {item.count}×
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-xs text-white/40">
                Use grouping, differentiation, or Tiffany-ED to start reclaiming time.
              </p>
            )}
          </>
        )}
      </CardContent>
    </GlassPanel>
  );
}
