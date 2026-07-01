'use client';

import React, { useState } from 'react';
import { 
  Users, School, Award, Users2, Target, Building2, BookOpen, 
  Scale, Microscope, Play, CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ecosystem = [
  {
    group: "Teachers & Classroom",
    icon: Users,
    items: ["Onboarding Agent", "Lesson Differentiation Agent", "Progress Monitoring Agent"],
  },
  {
    group: "School Leadership",
    icon: School,
    items: ["School Health Agent", "Staffing & Workload Agent", "Intervention Management Agent"],
  },
  {
    group: "District & Central Office",
    icon: Building2,
    items: ["Compliance Agent", "Usage & Revenue Agent", "Equity & Funding Agent"],
  },
  {
    group: "Board of Education & Governance",
    icon: Award,
    items: ["Governance Agent", "District Health Agent", "Policy Impact Agent"],
  },
  {
    group: "Government (Federal, State, Local)",
    icon: Scale,
    items: ["Federal Policy Agent", "State Education Agency Agent", "Local District Compliance Agent"],
  },
  {
    group: "Research & Evidence Base",
    icon: Microscope,
    items: ["Research Synthesis Agent", "Peer-Reviewed Insights Agent", "Evidence Alignment Agent"],
  },
  {
    group: "All Instructional Models & Curriculum",
    icon: BookOpen,
    items: ["Science of Reading Agent", "Montessori Agent", "Special Education Agent", "Gifted & Talented Agent", "Curriculum Alignment Agent"],
  },
  {
    group: "All School Types & Modalities",
    icon: Target,
    items: ["Traditional Public", "Charter", "Private", "Montessori", "Micro-school", "Homeschool", "Virtual/Online", "Vocational/CTE", "Alternative", "Athletic Academies", "Post-Secondary Bridge"],
  },
  {
    group: "Families, Community & Stakeholders",
    icon: Users2,
    items: ["Family Engagement Agent", "Community Impact Agent", "Union & Educator Support Agent"],
  },
];

export default function SovereignEcosystem() {
  const [showToast, setShowToast] = useState(false);

  const trigger = (item: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Target className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Ecosystem</h1>
        </div>
        <p className="text-white/70 max-w-3xl">
          EdIntel Sovereign is designed to serve the **entire American education system** — every stakeholder, every government level, every instructional model, and every type of school.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ecosystem.map((group, index) => {
          const Icon = group.icon;
          return (
            <Card key={index} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#C5A46E]" />
                  <CardTitle className="text-lg tracking-tight">{group.group}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {group.items.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => trigger(item)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <span className="text-sm">{item}</span>
                    <Button size="sm" variant="ghost" className="h-7 px-3 text-xs">
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          Agent action simulated for presentation
        </div>
      )}
    </div>
  );
}
