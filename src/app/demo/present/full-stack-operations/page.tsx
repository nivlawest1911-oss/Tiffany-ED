'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, DollarSign, Users, Shield, TrendingUp, Play, CheckCircle, 
  ArrowRight, Database, Rocket, AlertTriangle 
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

  // Load real metrics from database
  const loadRealMetrics = async () => {
    try {
      const res = await fetch('/api/admin/usage-metrics?days=30');
      if (res.ok) {
        const data = await res.json();
        setRealMetrics(data.summary);
        triggerToast('Live cost data loaded from Sovereign Cost Sentinel');
      }
    } catch (e) {
      triggerToast('Using demo data (real metrics will appear after production usage)');
    }
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
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

  // Simulate hitting 80% usage → show upgrade prompt
  const simulateHighUsage = () => {
    setSessions(42000); // push close to Enterprise limit
    setShowUpgradePrompt(true);
    triggerToast("80% token allocation reached — Upgrade prompt triggered");
  };

  const toggleLever = (lever: string, current: boolean, setter: (v: boolean) => void) => {
    const newValue = !current;
    setter(newValue);
    triggerToast(`${lever} ${newValue ? 'activated' : 'disabled'} — Margin impact applied`);
  };

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
          EdIntel is architected as a self-optimizing platform engine. Every layer — technical, commercial, and operational — 
          is instrumented for maximum margin, automatic scaling, and minimal human intervention.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-400">Real Cost Tracking Active</Badge>
          <Button onClick={loadRealMetrics} variant="outline" size="sm" className="border-[#C5A46E]/40 text-[#C5A46E]">
            Load Live Metrics from Database
          </Button>
        </div>
      </div>

      {/* Live KPI Dashboard */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-white/50">ALPHABET-STYLE OPERATING DASHBOARD</div>
            <div className="text-3xl font-semibold tracking-tighter">Platform Health — Mobile County</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={simulateHighUsage} variant="outline" className="border-orange-500/40 text-orange-400">
              <AlertTriangle className="h-4 w-4 mr-2" /> Simulate 80% Usage
            </Button>
            <Button onClick={runFullOptimization} className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-8 py-6">
              <Play className="h-4 w-4 mr-2" /> Run Full Optimization Cycle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Gross Margin", value: `${grossMargin}%`, target: "58–62%" },
            { label: "Net Revenue Retention", value: `${nrr}%`, target: "≥130%" },
            { label: "LTV : CAC", value: "10.8x", target: "≥10x" },
            { label: "Token Throughput Efficiency", value: "4.2x", target: ">3.5x" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/50">{kpi.label}</div>
              <div className="text-4xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">{kpi.value}</div>
              <div className="text-xs text-white/60 mt-2">Target: {kpi.target}</div>
            </div>
          ))}
        </div>

        {realMetrics && (
          <div className="mt-6 text-xs text-white/50">
            Live from database: {realMetrics.totalSessions} sessions • {realMetrics.totalTokens.toLocaleString()} tokens • ${realMetrics.totalCostUSD.toFixed(2)} cost
          </div>
        )}
      </div>

      {/* 80% Usage Upgrade Prompt Modal */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0A0F1C] border border-[#C5A46E]/40 rounded-3xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-semibold">Usage Alert — 80% of Token Allocation Reached</h3>
            </div>
            <p className="text-white/80 mb-6">
              Mobile County is approaching their Professional tier limit. Upgrading to Enterprise will unlock unlimited sessions, 
              dedicated success manager, and priority compute — protecting both outcomes and margins.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowUpgradePrompt(false)} variant="outline" className="flex-1 border-white/20 hover:bg-white/5 transition-all">
                Remind Later
              </Button>
              <Button 
                onClick={() => { 
                  setShowUpgradePrompt(false); 
                  triggerToast("Enterprise upgrade initiated — Committed Use Discount applied"); 
                }} 
                className="flex-1 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] transition-all"
              >
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
          <h2 className="text-xl font-semibold tracking-tight">1. Architectural Engine (Margin Protection)</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { name: "Model Routing Layer", enabled: routing, set: setRouting, desc: "Simple tasks → lightweight models. Complex differentiation → premium models." },
            { name: "Prompt Caching & Persistence", enabled: caching, set: setCaching, desc: "Recurring curriculum formats served from cache. Up to 90% inference cost reduction." },
            { name: "Observability & Telemetry", enabled: observability, set: setObservability, desc: "Real-time Cost per Token + Cost per Report. No blind spots on unit economics." },
          ].map((item, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge className={item.enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10"}>{item.enabled ? "Active" : "Off"}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80 mb-4">{item.desc}</p>
                <Button onClick={() => toggleLever(item.name, item.enabled, item.set)} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl transition-all">
                  {item.enabled ? "Disable" : "Activate"} Lever
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Commercial + Operational sections (kept concise) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader><CardTitle>2. Commercial Revenue Machine</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong>Usage-Based Metered Billing</strong> — Base + Intelligent Differentiation Session tokens</div>
            <div><strong>Self-Serve Land & Expand</strong> — 100% automated 30-day trial with instant aha moments</div>
            <div><strong>Enterprise Tiering</strong> — Highest-margin tier with dedicated resources</div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader><CardTitle>3. Operational Process Components</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong>Product-Led Growth</strong> — In-app virality built into sharing flows</div>
            <div><strong>Customer Success Ops</strong> — Automated renewal triggers based on real usage data</div>
            <div><strong>DevOps + MLOps</strong> — Daily shipping with full compliance guardrails</div>
          </CardContent>
        </Card>
      </div>

      {/* Persistent AI Agents Section */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Zap className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">4. Persistent AI Agents (The Always-On Layer)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { 
              title: "End-of-Term Report Agent", 
              desc: "Automatically generates district-wide progress reports, flags incomplete data, and prepares compliance exports — no teacher request needed." 
            },
            { 
              title: "Usage & Margin Sentinel", 
              desc: "Monitors real token cost per session in real time. Triggers upgrade prompts at 75% and 80% usage. Protects gross margins automatically." 
            },
            { 
              title: "Renewal & Expansion Agent", 
              desc: "Detects high-usage schools months before contract end and proactively surfaces personalized value reports + upgrade recommendations." 
            },
          ].map((agent, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardContent className="p-6">
                <div className="font-semibold text-lg mb-2">{agent.title}</div>
                <p className="text-sm text-white/80">{agent.desc}</p>
                <div className="mt-4 text-xs text-emerald-400">Status: Active • Self-optimizing</div>
              </CardContent>
            </Card>
          ))}
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
