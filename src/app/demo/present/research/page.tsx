'use client';

import React, { useState } from 'react';
import { Microscope, BookOpen, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const researchAreas = [
  { title: "Science of Reading", desc: "Explicit phonics, structured literacy, Alabama Literacy Act alignment", status: "94% Aligned" },
  { title: "Peer-Reviewed Research Synthesis", desc: "Latest studies on effective interventions and instructional models", status: "Active" },
  { title: "Curriculum Alignment Agent", desc: "Maps lessons to state standards and research-backed practices", status: "Active" },
  { title: "Evidence-Based Practice Agent", desc: "Recommends interventions with supporting research citations", status: "Learning" },
];

export default function ResearchCurriculum() {
  const [showToast, setShowToast] = useState(false);

  const trigger = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
          <Microscope className="h-7 w-7 text-[#C5A46E]" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Research & Curriculum Intelligence</h1>
      </div>

      <p className="text-white/70 max-w-3xl">Every recommendation in EdIntel is grounded in peer-reviewed research and aligned to state standards.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {researchAreas.map((area, i) => (
          <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#C5A46E]" />
                <CardTitle>{area.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/70">{area.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-400">{area.status}</span>
                <Button onClick={trigger} size="sm" className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-xl">
                  <Play className="h-4 w-4 mr-1" /> Run Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" /> Research synthesis complete
        </div>
      )}
    </div>
  );
}
