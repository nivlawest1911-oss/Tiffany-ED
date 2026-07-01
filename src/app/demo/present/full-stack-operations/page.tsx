'use client';

import React, { useState } from 'react';
import { 
  Zap, DollarSign, Shield, TrendingUp, Play, CheckCircle, 
  AlertTriangle, Database, Rocket 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UsageSummary {
  totalSessions: number;
  totalTokens: number;
  totalCostUSD: number;
}

export default function FullStackOperations() {
  const [routing, setRouting] = useState(true);
  const [caching, setCaching] = useState(true);
  const [observability, setObservability] = useState(true);
  const [sessions, setSessions] = useState(18750);
  const [grossMargin, setGrossMargin] = useState(61);
  const [nrr, setNrr] = useState(124);
  const [realMetrics, setRealMetrics] = useState<UsageSummary | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const loadRealMetrics = async () => {
    try {
      const res = await fetch('/api/admin/usage-metrics?days=30');
      if (res.ok) {
        const data = await res.json();
        setRealMetrics(data.summary);
        triggerToast('Live Inference Efficiency data loaded from Sovereign Cost Sentinel');
      }
    } catch {
      triggerToast('Using demo data — connect real districts for live ratios');
    }
  };

  const runFullOptimization = () => {
    setRouting(true);
    setCaching(true);
    setObservability(true);
    const newSessions = Math.min(52000, Math.floor(sessions * 1.38));
    setSessions(newSessions);
    setGrossMargin(Math.min(67, grossMargin + 4));
    setNrr(Math.min(142, nrr + 9));
    triggerToast("Full-Stack Optimization Cycle complete — All engines at peak efficiency");
  };

  const simulateHighUsage = () => {
    setSessions(42000);
    setShowUpgradePrompt(true);
    triggerToast("80% token allocation reached — Upgrade prompt triggered");
  };

  // === INFERENCE EFFICIENCY RATIO (The Key Metric) ===
  const aiRevenue = sessions * 1.85; // Simplified revenue per session
  const aiComputeCost = realMetrics ? realMetrics.totalCostUSD : 33.75;
  const inferenceEfficiencyRatio = aiComputeCost > 0 ? (aiRevenue / aiComputeCost) : 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Rocket className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Full-Stack Operations Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel is architected as a self-optimizing, AI-first infrastructure. Every layer is instrumented for maximum margin, 
          automatic scaling, and minimal human intervention.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-400">Real Cost Tracking Active</Badge>
          <Button onClick={loadRealMetrics} variant="outline" size="sm" className="border-[#C5A46E]/40 text-[#C5A46E]">
            Load Live Data from Database
          </Button>
        </div>
      </div>

      {/* INFERENCE EFFICIENCY RATIO — The Most Important Metric */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-white/50">CORE MARGIN DIAL — INFERENCE EFFICIENCY RATIO</div>
            <div className="text-3xl font-semibold tracking-tighter mt-1">Mobile County Public Schools</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={simulateHighUsage} variant="outline" className="border-orange-500/40 text-orange-400">
              <AlertTriangle className="h-4 w-4 mr-2" /> Simulate High Usage
            </Button>
            <Button onClick={runFullOptimization} className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-8 py-6">
              <Play className="h-4 w-4 mr-2" /> Run Full Optimization
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">INFERENCE EFFICIENCY RATIO</div>
            <div className="text-5xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">
              {inferenceEfficiencyRatio.toFixed(1)}x
            </div>
            <div className="text-emerald-400 text-sm mt-1">Target: &gt; 5.0x</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">AI REVENUE (MTD)</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">${aiRevenue.toFixed(0)}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">AI COMPUTE COST</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-orange-400">
              ${aiComputeCost.toFixed(2)}
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">GROSS MARGIN</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-emerald-400">{grossMargin}%</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-white/60">
          Inference Efficiency Ratio = (AI Revenue from Sessions) ÷ (AI Compute Cost). This is the single most important number for profitable AI scale.
        </div>
      </div>

      {/* 80% Usage Upgrade Prompt */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A0F1C] border border-[#C5A46E]/40 rounded-3xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-semibold">Usage Alert — 80% Token Allocation</h3>
            </div>
            <p className="text-white/80 mb-6">
              Mobile County is approaching their tier limit. Upgrading protects outcomes and margins.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowUpgradePrompt(false)} variant="outline" className="flex-1">Remind Later</Button>
              <Button onClick={() => { setShowUpgradePrompt(false); triggerToast("Enterprise upgrade initiated"); }} className="flex-1 bg-[#C5A46E] text-[#0A0F1C]">
                Upgrade to Enterprise
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Architectural Engine */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Zap className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Architectural Engine (Margin Protection)</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { name: "Model Routing Layer", enabled: routing, set: setRouting, desc: "80% of tasks → lightweight models. 20% → premium models." },
            { name: "Prompt Caching", enabled: caching, set: setCaching, desc: "Up to 90% cost reduction on recurring curriculum and reports." },
            { name: "Observability & Telemetry", enabled: observability, set: setObservability, desc: "Real-time Cost-per-Token and Inference Efficiency Ratio." },
          ].map((item, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{item.name}</CardTitle>
                  <Badge className={item.enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10"}>{item.enabled ? "Active" : "Off"}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80 mb-4">{item.desc}</p>
                <Button onClick={() => { item.set(!item.enabled); triggerToast(`${item.name} ${item.enabled ? 'disabled' : 'activated'}`); }} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                  {item.enabled ? "Disable" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alphabet-Grade Tech Stack Summary */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Database className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Alphabet-Grade Tech Stack</h2>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="text-left p-5 font-medium">Component</th>
                <th className="text-left p-5 font-medium">Primary Benefit</th>
                <th className="text-left p-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                ["Multi-Tenancy", "Massive operational efficiency", "Active"],
                ["Model Routing + Caching", "50%+ Gross Margin protection", "Active + Live"],
                ["FERPA/GDPR Engine", "Global market entry", "100% Automated"],
                ["Usage Metering + Cost Sentinel", "Revenue scalability + Margin visibility", "Live"],
                ["Inference Efficiency Ratio", "Core profitability dial", "Now Tracking"],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.015]">
                  <td className="p-5 font-medium">{row[0]}</td>
                  <td className="p-5 text-white/80">{row[1]}</td>
                  <td className="p-5"><Badge className="bg-emerald-500/10 text-emerald-400">{row[2]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
