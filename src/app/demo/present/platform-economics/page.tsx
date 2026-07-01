'use client';

import React, { useState } from 'react';
import { 
  DollarSign, Zap, Shield, TrendingUp, Play, CheckCircle, 
  ArrowRight, Database 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PlatformEconomics() {
  const [routingEnabled, setRoutingEnabled] = useState(true);
  const [cachingEnabled, setCachingEnabled] = useState(true);
  const [asyncEnabled, setAsyncEnabled] = useState(true);
  const [sessions, setSessions] = useState(12400);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Simulated cost calculations (per 1000 sessions)
  const baseCost = 0.42;
  const routingSavings = routingEnabled ? 0.18 : 0;
  const cachingSavings = cachingEnabled ? 0.21 : 0;
  const asyncSavings = asyncEnabled ? 0.07 : 0;
  const costPerThousand = Math.max(0.12, baseCost - routingSavings - cachingSavings - asyncSavings);
  const monthlyCost = Math.round((sessions / 1000) * costPerThousand * 100) / 100;
  const grossMargin = Math.round(((sessions * 1.85 - monthlyCost) / (sessions * 1.85)) * 100);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const simulateGrowth = () => {
    const newSessions = Math.min(45000, Math.floor(sessions * 1.42));
    setSessions(newSessions);
    triggerToast(`District scaled — ${newSessions.toLocaleString()} sessions. Margin protected by Sovereign Agents.`);
  };

  const optimizeAll = () => {
    setRoutingEnabled(true);
    setCachingEnabled(true);
    setAsyncEnabled(true);
    triggerToast("Full Platform Optimization activated — All efficiency levers engaged");
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header + Narrative */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <DollarSign className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Platform Economics Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel is engineered as a true platform with superior unit economics. We control inference costs at the architecture level 
          (model routing, prompt caching, async processing) while our hybrid revenue model scales automatically with district success — 
          delivering higher gross margins and better defensibility than traditional AI or cloud platforms.
        </p>
        <div className="mt-2 text-sm text-[#C5A46E]">
          Primary Value Metric: Intelligent Differentiation Sessions • Sovereign Cost Sentinel Agent: Active
        </div>
      </div>

      {/* Live Cost & Margin Simulator */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-white/50">LIVE UNIT ECONOMICS SIMULATOR</div>
            <div className="text-3xl font-semibold tracking-tighter mt-1">Mobile County Public Schools</div>
          </div>
          <div className="flex gap-3">
            <Button onClick={optimizeAll} variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl">
              Optimize All Levers
            </Button>
            <Button onClick={simulateGrowth} className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-8 transition-all active:scale-[0.985]">
              <Play className="h-4 w-4 mr-2" /> Simulate End-of-Semester Surge
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">INTELLIGENT DIFFERENTIATION SESSIONS (MTD)</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">{sessions.toLocaleString()}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">INFERENCE COST PER 1,000 SESSIONS</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">${costPerThousand}</div>
            <div className="text-emerald-400 text-xs mt-1">↓ {Math.round(((0.42 - costPerThousand) / 0.42) * 100)}% vs baseline</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">GROSS MARGIN</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-emerald-400">{grossMargin}%</div>
            <div className="text-xs text-white/60 mt-1">Target: 50–60% for AI-native platforms</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">ESTIMATED MONTHLY INFERENCE COST</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">${monthlyCost}</div>
          </div>
        </div>
      </div>

      {/* Architectural Efficiency Controls */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Zap className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Architectural Efficiency Levers (Alphabet-Grade Cost Control)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { 
              enabled: routingEnabled, set: setRoutingEnabled, 
              title: "Model Routing", savings: "43%", 
              desc: "Simple tasks → lightweight models. Complex differentiation → premium models. Reduces average inference cost dramatically." 
            },
            { 
              enabled: cachingEnabled, set: setCachingEnabled, 
              title: "Prompt Caching", savings: "Up to 90%", 
              desc: "Recurring curriculum formats, report templates, and common queries are cached. Massive cost reduction on repeat usage." 
            },
            { 
              enabled: asyncEnabled, set: setAsyncEnabled, 
              title: "Asynchronous Processing", savings: "17%", 
              desc: "Batch reports and non-urgent tasks run during off-peak hours at lower cloud rates." 
            },
          ].map((item, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge className={item.enabled ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-white/60"}>
                    {item.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="text-emerald-400 font-medium">Saves {item.savings} on inference costs</div>
                <p className="text-white/80">{item.desc}</p>
                <Button 
                  onClick={() => { item.set(!item.enabled); triggerToast(`${item.title} ${item.enabled ? 'disabled' : 'activated'}`); }}
                  variant="outline" 
                  className="w-full border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl"
                >
                  {item.enabled ? "Disable" : "Enable"}
                </Button>
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
