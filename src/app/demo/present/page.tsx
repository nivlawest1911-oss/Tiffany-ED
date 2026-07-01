'use client';

import React, { useState } from 'react';
import { 
  Users, TrendingUp, ShieldCheck, BarChart3, CreditCard, Target,
  School, UserCheck, Users2, Award, Play, CheckCircle, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ecosystemGroups = [
  {
    group: "Teachers & Classroom",
    icon: Users,
    agents: [
      {
        name: "Onboarding Agent",
        status: "Active",
        goal: "Deliver Aha Moment in < 72 hours",
        aha: "Teacher sees at-risk students + ready lesson plan",
      },
      {
        name: "Lesson Differentiation Agent",
        status: "Active",
        goal: "Reduce planning time by 60%+",
        aha: "One-click differentiated lessons aligned to ALCOS",
      },
    ],
  },
  {
    group: "School Leadership",
    icon: School,
    agents: [
      {
        name: "School Health Agent",
        status: "Active",
        goal: "Early warning + intervention tracking",
        aha: "Principal sees Tier 2/3 students needing support this week",
      },
      {
        name: "Staffing & Workload Agent",
        status: "Learning",
        goal: "Balance teacher workload fairly",
        aha: "Shows which teachers are overloaded vs under-supported",
      },
    ],
  },
  {
    group: "District & Central Office",
    icon: BarChart3,
    agents: [
      {
        name: "Compliance Agent",
        status: "Active",
        goal: "Alabama Literacy Act + FERPA readiness",
        aha: "One-click district compliance report for the Board",
      },
      {
        name: "Usage & Revenue Agent",
        status: "Active",
        goal: "Maximize token usage & predict spend",
        aha: "Auto-alert when district is 2 weeks from token limit",
      },
    ],
  },
  {
    group: "Board of Education & Governance",
    icon: Award,
    agents: [
      {
        name: "Governance Agent",
        status: "Active",
        goal: "Live district health + outcome visibility",
        aha: "Board sees real-time ‘District Health Score’ + compliance",
      },
    ],
  },
  {
    group: "Families & Community",
    icon: Users2,
    agents: [
      {
        name: "Family Engagement Agent",
        status: "Learning",
        goal: "Clear, timely parent communication",
        aha: "Parents receive simple progress summaries (no jargon)",
      },
    ],
  },
];

export default function SovereignEcosystem() {
  const [showToast, setShowToast] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const triggerAgent = (agent: any) => {
    setSelected(agent);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSelected(null);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Target className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Ecosystem</h1>
        </div>
        <p className="text-white/70 max-w-3xl">
          EdIntel Sovereign is the operating system for the entire K-12 education ecosystem — 
          from the classroom to the boardroom.
        </p>
      </div>

      {ecosystemGroups.map((group, index) => {
        const Icon = group.icon;
        return (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-3 px-1">
              <Icon className="h-5 w-5 text-[#C5A46E]" />
              <h2 className="text-xl font-semibold tracking-tight">{group.group}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.agents.map((agent, i) => (
                <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge variant="outline" className={
                        agent.status === "Active" 
                          ? "border-emerald-500/40 text-emerald-400" 
                          : "border-amber-500/40 text-amber-400"
                      }>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs text-white/50">GOAL</div>
                      <div className="text-sm mt-1">{agent.goal}</div>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-xs text-[#C5A46E] mb-1">AHA MOMENT</div>
                      <div className="text-sm text-white/80">{agent.aha}</div>
                    </div>
                    <Button 
                      onClick={() => triggerAgent(agent)}
                      className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl mt-2"
                    >
                      <Play className="h-4 w-4 mr-2" /> Trigger Agent
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end gap-3 mt-6">
        <Button asChild variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10">
          <a href="/demo/present/revenue-engine">Revenue Engine</a>
        </Button>
        <Button asChild variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10">
          <a href="/demo/present/agent-fleet">Agent Fleet Command</a>
        </Button>
      </div>

      {showToast && selected && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          {selected.name} action simulated
        </div>
      )}
    </div>
  );
}
