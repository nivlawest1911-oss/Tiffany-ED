'use client';

import React, { useState } from 'react';
import { 
  Zap, DollarSign, Users, Shield, TrendingUp, Play, CheckCircle, 
  ArrowRight, Database, Rocket 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FullStackOperations() {
  const [routing, setRouting] = useState(true);
  const [caching, setCaching] = useState(true);
  const [observability, setObservability] = useState(true);
  const [sessions, setSessions] = useState(18750);
  const [grossMargin, setGrossMargin] = useState(61);
  const [nrr, setNrr] = useState(124);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      </div>

      {/* Live KPI Dashboard */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-white/50">ALPHABET-STYLE OPERATING DASHBOARD</div>
            <div className="text-3xl font-semibold tracking-tighter">Platform Health — Mobile County</div>
          </div>
          <Button onClick={runFullOptimization} className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-8 py-6 active:scale-[0.985] transition-all">
            <Play className="h-4 w-4 mr-2" /> Run Full Optimization Cycle
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Gross Margin", value: `${grossMargin}%`, target: "58–62%", status: "Excellent" },
            { label: "Net Revenue Retention", value: `${nrr}%`, target: "≥130%", status: "Strong" },
            { label: "LTV : CAC", value: "10.8x", target: "≥10x", status: "Excellent" },
            { label: "Token Throughput Efficiency", value: "4.2x", target: ">3.5x", status: "Optimized" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/50">{kpi.label}</div>
              <div className="text-4xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">{kpi.value}</div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-white/60">Target: {kpi.target}</span>
                <Badge className="bg-emerald-500/10 text-emerald-400">{kpi.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Engine */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Zap className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. Architectural Engine (Margin Protection)</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { name: "Model Routing Layer", enabled: routing, set: setRouting, desc: "Simple tasks → lightweight models. Complex differentiation → premium models. Primary driver of high gross margins." },
            { name: "Prompt Caching & Persistence", enabled: caching, set: setCaching, desc: "Recurring curriculum formats and report templates served from cache. Up to 90% inference cost reduction on repeats." },
            { name: "Observability & Telemetry", enabled: observability, set: setObservability, desc: "Real-time Cost per Token + Cost per Report dashboards. No blind spots on unit economics." },
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

      {/* Commercial Revenue Machine */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <DollarSign className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. Commercial Revenue Machine (Land & Expand)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Database, title: "Usage-Based Metered Billing", desc: "Base subscription + Intelligent Differentiation Session tokens. Revenue scales automatically with teacher adoption and success." },
            { icon: Rocket, title: "Self-Serve Land & Expand", desc: "30-day trial is 100% self-serve. In-app walkthroughs + instant 'aha' moments remove all human friction from onboarding." },
            { icon: Shield, title: "Enterprise Tiering", desc: "Highest-margin tier with dedicated success manager, custom integrations, priority compute, and advanced governance. Protects premium revenue." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-[#C5A46E] mb-4" />
                  <div className="font-semibold text-lg mb-2">{item.title}</div>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Operational Components */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Users className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">3. Operational Process Components (Scale Without Founder Bottlenecks)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Product-Led Growth (PLG)", desc: "In-app virality engine. One teacher sharing a differentiated lesson automatically invites colleagues. Distribution is built into the product." },
            { title: "Customer Success Operations", desc: "Automated renewal triggers based on usage data. System proactively engages schools months before contract end with personalized value reports." },
            { title: "DevOps + MLOps", desc: "CI/CD for daily shipping + GPU utilization + model performance monitoring. Features ship fast without breaking compliance or margins." },
          ].map((item, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardContent className="p-6">
                <div className="font-semibold text-lg mb-2">{item.title}</div>
                <p className="text-sm text-white/80">{item.desc}</p>
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
