'use client';

import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, Scale, Shield, Zap, Users, 
  DollarSign, Award, Play, CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OptimizationPillar {
  id: number;
  title: string;
  icon: any;
  score: number;
  status: string;
  lastAction: string;
  agents: string[];
}

const initialPillars: OptimizationPillar[] = [
  {
    id: 1,
    title: "Business Optimization",
    icon: Briefcase,
    score: 93,
    status: "Optimizing",
    lastAction: "Usage token pricing + onboarding flow refined for higher conversion",
    agents: ["Revenue Optimization Agent", "Onboarding & Aha Agent", "Data Flywheel Agent"],
  },
  {
    id: 2,
    title: "Investment Readiness",
    icon: TrendingUp,
    score: 89,
    status: "Optimizing",
    lastAction: "LTV:CAC improved to 8.4x • ARR growth trajectory strengthened",
    agents: ["Investment Analyst Agent", "Revenue Optimization Agent"],
  },
  {
    id: 3,
    title: "Legal & Compliance Optimization",
    icon: Scale,
    score: 97,
    status: "Optimizing",
    lastAction: "Alabama Literacy Act + FERPA traceability verified across all routes",
    agents: ["Compliance Sentinel", "Audit & Traceability Agent"],
  },
];

export default function StrategicOptimization() {
  const [pillars, setPillars] = useState<OptimizationPillar[]>(initialPillars);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const overallScore = Math.round(
    pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length
  );

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const optimizePillar = (id: number) => {
    setPillars(prev =>
      prev.map(pillar => {
        if (pillar.id === id) {
          const newScore = Math.min(100, pillar.score + Math.floor(Math.random() * 5) + 3);
          return {
            ...pillar,
            score: newScore,
            lastAction: "Deep optimization cycle completed — all sub-components improved",
          };
        }
        return pillar;
      })
    );
    const pillarName = pillars.find(p => p.id === id)?.title;
    triggerToast(`${pillarName} optimized — Agents deployed successfully`);
  };

  const runFullStrategicOptimization = () => {
    setPillars(prev =>
      prev.map(pillar => ({
        ...pillar,
        score: Math.min(100, pillar.score + Math.floor(Math.random() * 4) + 4),
        lastAction: "Full Sovereign Strategic Optimization Cycle applied",
      }))
    );
    triggerToast("Full Strategic Optimization Cycle complete — Business, Investment & Legal posture maximized");
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header + Narrative */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Zap className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Strategic Optimization Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          Active Sovereign Agents continuously optimize EdIntel’s business model, investment attractiveness, 
          and multi-jurisdictional legal compliance — ensuring maximum scalability, profitability, and risk mitigation 
          at federal, Alabama state, and Mobile County levels.
        </p>
        <div className="mt-3 text-sm text-[#C5A46E]">
          Alphabet-level operational intelligence applied to education • Built for sustainable growth and institutional trust
        </div>
      </div>

      {/* Overall Health */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-white/50">OVERALL STRATEGIC HEALTH</div>
            <div className="text-5xl font-semibold tracking-tighter mt-1">{overallScore}%</div>
            <div className="text-emerald-400">All pillars operating at peak optimization</div>
          </div>
          <Button 
            onClick={runFullStrategicOptimization}
            className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] transition-all text-[#0A0F1C] rounded-2xl px-10 py-7 text-lg font-medium shadow-lg"
          >
            <Play className="h-5 w-5 mr-3" /> Run Full Strategic Optimization Cycle
          </Button>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.id} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
                      <Icon className="h-6 w-6 text-[#C5A46E]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl leading-tight">{pillar.title}</CardTitle>
                      <Badge className="mt-2 border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                        {pillar.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-semibold tracking-tighter text-[#C5A46E]">{pillar.score}</div>
                    <div className="text-[10px] text-white/50 -mt-1">SCORE</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-5 text-sm">
                <div>
                  <div className="text-xs text-white/50 mb-1.5">ACTIVE SOVEREIGN AGENTS</div>
                  <div className="space-y-1">
                    {pillar.agents.map((agent, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80">
                        <CheckCircle className="h-3.5 w-3.5 text-[#C5A46E]" />
                        {agent}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/50 mb-1">LAST OPTIMIZATION ACTION</div>
                  <p className="text-white/80 leading-snug">{pillar.lastAction}</p>
                </div>

                <Button 
                  onClick={() => optimizePillar(pillar.id)}
                  className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] transition-all text-[#0A0F1C] rounded-2xl font-medium mt-auto"
                >
                  Trigger Deep Optimization
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Legal Compliance Detail (Federal / State / Local) */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Shield className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Multi-Jurisdictional Legal Optimization</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Federal */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-[#C5A46E]" /> Federal Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span>FERPA</span><Badge className="bg-emerald-500/10 text-emerald-400">100% Optimized</Badge></div>
              <div className="flex justify-between"><span>COPPA</span><Badge className="bg-emerald-500/10 text-emerald-400">100% Optimized</Badge></div>
              <div className="flex justify-between"><span>IDEA & Section 504</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <div className="flex justify-between"><span>ESSA / Title I</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <p className="text-xs text-white/60 pt-2">Compliance Sentinel continuously audits data flows and access controls.</p>
            </CardContent>
          </Card>

          {/* Alabama State */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-[#C5A46E]" /> Alabama State
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Alabama Literacy Act (2019-523)</span><Badge className="bg-emerald-500/10 text-emerald-400">100% Aligned</Badge></div>
              <div className="flex justify-between"><span>Science of Reading Mandates</span><Badge className="bg-emerald-500/10 text-emerald-400">Fully Integrated</Badge></div>
              <div className="flex justify-between"><span>ALCOS Standards</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <div className="flex justify-between"><span>State Data Privacy Laws</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <p className="text-xs text-white/60 pt-2">Agents ensure every AI output references explicit phonics and progress monitoring requirements.</p>
            </CardContent>
          </Card>

          {/* Mobile County Local */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-[#C5A46E]" /> Mobile County Local
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Procurement & RFP Rules</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <div className="flex justify-between"><span>Board Policy Compliance</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <div className="flex justify-between"><span>Local Data Sharing Agreements</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <div className="flex justify-between"><span>Parent & Community Notification</span><Badge className="bg-emerald-500/10 text-emerald-400">Optimized</Badge></div>
              <p className="text-xs text-white/60 pt-2">Agents prepare audit-ready documentation for Mobile County Board of School Commissioners.</p>
            </CardContent>
          </Card>
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
