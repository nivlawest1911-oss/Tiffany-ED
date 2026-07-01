'use client';

import React, { useState } from 'react';
import { Globe, Award, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const bestPractices = [
  {
    country: "Singapore",
    focus: "Teacher Quality & Mastery",
    keyStrength: "World-class teacher training, rigorous curriculum, and continuous professional development.",
    edintelIntegration: "Teacher workload reduction + mastery-based progression tracking",
  },
  {
    country: "Finland",
    focus: "Equity + Teacher Autonomy",
    keyStrength: "High trust in teachers, play-based early education, and strong equity focus with less standardized testing.",
    edintelIntegration: "Teacher autonomy tools + personalized student support without increasing workload",
  },
  {
    country: "Estonia",
    focus: "Digital-First Education",
    keyStrength: "Highly digitized national education system with strong data infrastructure and student digital skills.",
    edintelIntegration: "Modern digital platform + real-time data for teachers and administrators",
  },
  {
    country: "Canada (Ontario)",
    focus: "Inclusive Education + Equity",
    keyStrength: "Strong balance between academic performance and inclusion for diverse learners.",
    edintelIntegration: "Support for special education, gifted, and differentiated instruction at scale",
  },
  {
    country: "Netherlands",
    focus: "Personalized Learning Pathways",
    keyStrength: "Strong vocational + academic pathways with early student guidance.",
    edintelIntegration: "Student grouping, progress tracking, and pathway recommendations",
  },
];

export default function GlobalBestPractices() {
  const [showToast, setShowToast] = useState(false);

  const trigger = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Globe className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Global Best Practices</h1>
        </div>
        <p className="text-white/70 max-w-3xl">
          EdIntel Sovereign is built to learn from the world’s highest-performing education systems and bring those insights to every school.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bestPractices.map((practice, index) => (
          <Card key={index} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{practice.country}</CardTitle>
                  <p className="text-sm text-[#C5A46E] mt-1">{practice.focus}</p>
                </div>
                <Award className="h-5 w-5 text-[#C5A46E]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="text-xs text-white/50 mb-1">KEY STRENGTH</div>
                <p className="text-sm text-white/80">{practice.keyStrength}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-[#C5A46E] mb-1">HOW EDINTEL INTEGRATES THIS</div>
                <p className="text-sm">{practice.edintelIntegration}</p>
              </div>

              <Button 
                onClick={trigger}
                className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl mt-2"
              >
                <Play className="h-4 w-4 mr-2" /> Integrate into EdIntel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          Global best practice integrated into Sovereign Agents
        </div>
      )}
    </div>
  );
}
