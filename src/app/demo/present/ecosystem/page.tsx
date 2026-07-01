'use client';

import { Users, School, Award, Users2, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stakeholders = [
  { icon: Users, title: "Teachers", desc: "Reduced workload, better outcomes, real-time support" },
  { icon: School, title: "School Leaders", desc: "Visibility, early warning systems, staffing intelligence" },
  { icon: Award, title: "District & Board", desc: "Compliance, funding optimization, live outcomes data" },
  { icon: Users2, title: "Families & Community", desc: "Clear communication, trust, and involvement" },
];

export default function EcosystemOverview() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight">The Operating System for K-12 Education</h1>
        <p className="text-white/70 mt-3 max-w-2xl mx-auto">
          EdIntel Sovereign serves every stakeholder in the education ecosystem — from the classroom to the boardroom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stakeholders.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
                  <Icon className="h-6 w-6 text-[#C5A46E]" />
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">{s.title}</div>
                  <p className="text-white/70 mt-2">{s.desc}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-white/50 pt-6">
        One platform. Every stakeholder. One intelligent operating system.
      </div>
    </div>
  );
}
