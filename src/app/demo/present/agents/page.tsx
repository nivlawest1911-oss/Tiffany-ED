'use client';

import React, { useState } from 'react';
import { 
  Users, TrendingUp, ShieldCheck, BarChart3, CreditCard, Target, 
  Play, CheckCircle, Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Agent {
  id: string;
  name: string;
  department: string;
  icon: React.ElementType;
  status: 'Active' | 'Learning' | 'Standby';
  keyMetric: string;
  goal: string;
  ahaMoment: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'onboarding',
    name: 'Onboarding Agent',
    department: 'Customer Success + Sales',
    icon: Users,
    status: 'Active',
    keyMetric: '87% of teachers reach Aha Moment in < 72 hrs',
    goal: 'Deliver instant value within first week of trial',
    ahaMoment: 'Teacher sees 7 at-risk students + ready-to-use differentiated lesson',
    color: '#C5A46E',
  },
  {
    id: 'retention',
    name: 'Retention Agent',
    department: 'Customer Success',
    icon: TrendingUp,
    status: 'Active',
    keyMetric: 'Projected 94% renewal rate',
    goal: 'Predict churn risk and trigger proactive interventions',
    ahaMoment: 'Admin receives alert: “3 schools showing early churn signals”',
    color: '#C5A46E',
  },
  {
    id: 'compliance',
    name: 'Compliance Agent',
    department: 'Operations + Legal',
    icon: ShieldCheck,
    status: 'Active',
    keyMetric: '98.7% Alabama Literacy Act compliance',
    goal: 'Automate reporting and audit readiness',
    ahaMoment: 'One-click generation of full district compliance report',
    color: '#C5A46E',
  },
  {
    id: 'insights',
    name: 'Insights Agent',
    department: 'Analytics + Product',
    icon: BarChart3,
    status: 'Active',
    keyMetric: 'Weekly Magic Metrics briefing delivered',
    goal: 'Surface MRR, Churn, CAC/LTV automatically',
    ahaMoment: 'Superintendent sees live “Health Score” of entire district',
    color: '#C5A46E',
  },
  {
    id: 'billing',
    name: 'Usage & Billing Agent',
    department: 'Finance + Operations',
    icon: CreditCard,
    status: 'Learning',
    keyMetric: 'Usage tokens growing +31% MoM',
    goal: 'Optimize token usage and predict top-ups',
    ahaMoment: 'Auto-recommendation: “Your district is 2 weeks from token limit”',
    color: '#C5A46E',
  },
  {
    id: 'growth',
    name: 'Growth Agent',
    department: 'Marketing + Sales',
    icon: Target,
    status: 'Standby',
    keyMetric: 'Trial-to-paid conversion: 68%',
    goal: 'Identify schools ready to expand or upgrade',
    ahaMoment: '“3 schools in your network are ready for district-wide rollout”',
    color: '#C5A46E',
  },
];

export default function SovereignAgents() {
  const [showToast, setShowToast] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const triggerAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSelectedAgent(null);
    }, 2200);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Target className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Agents</h1>
        </div>
        <p className="text-white/70 max-w-3xl">
          EdIntel’s lean operating system. Specialized AI agents handle entire departments so your team can focus on high-leverage work — not repetitive tasks.
        </p>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Card 
              key={agent.id} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all rounded-3xl flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#C5A46E]/10">
                      <Icon className="h-5 w-5 text-[#C5A46E]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg tracking-tight">{agent.name}</CardTitle>
                      <p className="text-xs text-white/50 mt-0.5">{agent.department}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      agent.status === 'Active' 
                        ? "border-emerald-500/40 text-emerald-400" 
                        : agent.status === 'Learning' 
                          ? "border-amber-500/40 text-amber-400" 
                          : "border-white/30 text-white/60"
                    }
                  >
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-white/50 mb-1">KEY METRIC</div>
                    <div className="text-sm font-medium">{agent.keyMetric}</div>
                  </div>

                  <div>
                    <div className="text-xs text-white/50 mb-1">PRIMARY GOAL</div>
                    <div className="text-sm text-white/80">{agent.goal}</div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="text-xs text-[#C5A46E] mb-1 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> AHA MOMENT
                    </div>
                    <div className="text-sm text-white/80 leading-snug">
                      {agent.ahaMoment}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => triggerAgent(agent)}
                  className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl mt-auto"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Trigger Agent Action
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-white/50 pt-4">
        These agents run continuously in the background. They reduce manual work and increase district value over time.
      </div>

      {/* Toast */}
      {showToast && selectedAgent && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          {selectedAgent.name} action simulated — output logged for demo
        </div>
      )}
    </div>
  );
}
