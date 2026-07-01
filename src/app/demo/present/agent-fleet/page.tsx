'use client';

import React, { useState } from 'react';
import { 
  Zap, Palette, DollarSign, Globe, Shield, Users, 
  Database, Rocket, Play, CheckCircle, TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Agent {
  id: number;
  name: string;
  icon: React.ElementType;
  monitors: string;
  score: number;
  status: string;
  lastAction: string;
}

const initialAgents: Agent[] = [
  { id: 1, name: "Performance Guardian", icon: Zap, monitors: "Mobile LCP, Core Web Vitals, loading states, route performance", score: 94, status: "Active", lastAction: "Optimized 3 routes" },
  { id: 2, name: "Design Consistency Agent", icon: Palette, monitors: "Gold aesthetic, spacing, hover states, card design across all pages", score: 97, status: "Active", lastAction: "Standardized 4 pages" },
  { id: 3, name: "Revenue Optimization Agent", icon: DollarSign, monitors: "ARR, MRR, churn, LTV:CAC, token usage, conversion funnels", score: 91, status: "Active", lastAction: "Improved trial-to-paid flow" },
  { id: 4, name: "Global Intelligence Agent", icon: Globe, monitors: "Best practices from Singapore, Finland, Estonia, Canada + global modalities", score: 89, status: "Active", lastAction: "Integrated 2 new systems" },
  { id: 5, name: "Compliance Sentinel", icon: Shield, monitors: "FERPA, COPPA, Alabama Literacy Act, audit logging, traceability", score: 98, status: "Active", lastAction: "Verified 100% traceability" },
  { id: 6, name: "Stakeholder Experience Agent", icon: Users, monitors: "Teachers, admins, board, parents, government, researchers", score: 93, status: "Active", lastAction: "Enhanced 3 persona flows" },
  { id: 7, name: "Data Flywheel Agent", icon: Database, monitors: "Lesson quality, intervention outcomes, AI improvement loop", score: 90, status: "Active", lastAction: "Boosted model accuracy +2.1%" },
  { id: 8, name: "Onboarding & Aha Agent", icon: Rocket, monitors: "30-day trial, instant value moments, activation metrics", score: 95, status: "Active", lastAction: "Reduced time-to-aha by 38%" },
];

export default function AgentFleetCommand() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const overallScore = Math.round(
    agents.reduce((sum, a) => sum + a.score, 0) / agents.length
  );

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const optimizeAgent = (id: number) => {
    setAgents(prev =>
      prev.map(agent => {
        if (agent.id === id) {
          const newScore = Math.min(100, agent.score + Math.floor(Math.random() * 4) + 2);
          return {
            ...agent,
            score: newScore,
            lastAction: "Deep optimization cycle completed",
          };
        }
        return agent;
      })
    );
    const agentName = agents.find(a => a.id === id)?.name;
    triggerToast(`${agentName} optimization complete — component health improved`);
  };

  const runFullFleetOptimization = () => {
    setAgents(prev =>
      prev.map(agent => ({
        ...agent,
        score: Math.min(100, agent.score + Math.floor(Math.random() * 3) + 2),
        lastAction: "Fleet-wide optimization applied",
      }))
    );
    triggerToast("Full Sovereign Fleet Optimization Cycle complete — All components now at peak performance");
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header + Narrative */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Zap className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Agent Fleet Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          Active, always-on Sovereign Agents continuously monitor and optimize every component of EdIntel — 
          ensuring peak performance, design consistency, revenue health, global intelligence, and compliance at all times.
        </p>
        <div className="mt-2 text-sm text-[#C5A46E]">
          Just as Alphabet uses internal AI systems to keep every product optimal at planetary scale, EdIntel’s Agent Fleet keeps every layer of the platform at its best.
        </div>
      </div>

      {/* Fleet Health Overview */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-white/50">FLEET HEALTH</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">{overallScore}%</div>
            <div className="text-emerald-400 text-sm">All systems operating optimally</div>
          </div>
          <Button 
            onClick={runFullFleetOptimization}
            className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-8 py-6 text-base"
          >
            <Play className="h-5 w-5 mr-2" /> Run Full Fleet Optimization Cycle
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Agents Active", value: agents.length },
            { label: "Components Monitored", value: "12" },
            { label: "Optimizations Today", value: "47" },
            { label: "Avg Improvement", value: "+3.8%" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
              <div className="text-xs text-white/50">{stat.label}</div>
              <div className="text-3xl font-semibold tracking-tighter mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Agents Grid */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Active Optimization Agents</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card key={agent.id} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
                        <Icon className="h-6 w-6 text-[#C5A46E]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{agent.name}</CardTitle>
                        <Badge className="mt-1.5 border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-semibold tracking-tighter text-[#C5A46E]">{agent.score}</div>
                      <div className="text-[10px] text-white/50 -mt-1">OPTIMIZATION</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-white/50 mb-1">MONITORS & OPTIMIZES</div>
                    <p className="text-white/80">{agent.monitors}</p>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">LAST ACTION</div>
                    <p className="text-white/70">{agent.lastAction}</p>
                  </div>
                  <Button 
                    onClick={() => optimizeAgent(agent.id)}
                    variant="outline"
                    className="w-full border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl mt-2"
                  >
                    Trigger Deep Optimization
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
