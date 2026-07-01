'use client';

import React, { useState } from 'react';
import { Globe, Award, BookOpen, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const globalSystems = [
  {
    country: "Singapore",
    focus: "Teacher quality + rigorous curriculum",
    strength: "Top PISA performer. Strong emphasis on teacher training and mastery.",
    relevance: "High",
  },
  {
    country: "Finland",
    focus: "Equity, teacher autonomy, play-based early learning",
    strength: "World-class equity with less testing and high teacher respect.",
    relevance: "High",
  },
  {
    country: "Estonia",
    focus: "Digital education + data-driven systems",
    strength: "Highly digitized education system with strong national data infrastructure.",
    relevance: "Very High",
  },
  {
    country: "Shanghai / China",
    focus: "High performance in math & science",
    strength: "Consistent top rankings through focused instruction and teacher development.",
    relevance: "Medium",
  },
  {
    country: "Canada (Ontario)",
    focus: "Equity + inclusive education",
    strength: "Strong balance between high performance and inclusion.",
    relevance: "High",
  },
];

const globalModalities = [
  "Montessori (Global)",
  "Waldorf / Steiner",
  "International Baccalaureate (IB)",
  "British Curriculum (IGCSE / A-Level)",
  "French Baccalaureate",
  "German Gymnasium System",
  "Nordic Model",
  "Micro-schools & Learning Pods (Global)",
  "Virtual / Online Schools (Global)",
  "Vocational & Technical Education",
];

export default function GlobalEducation() {
  const [showToast, setShowToast] = useState(false);

  const trigger = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Globe className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Global Education Intelligence</h1>
        </div>
        <p className="text-white/70 max-w-3xl">
          EdIntel Sovereign is designed to learn from and integrate the world’s best education systems, 
          instructional models, and research — while serving every type of school globally.
        </p>
      </div>

      {/* Top Performing Systems */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Award className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Top Performing Education Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {globalSystems.map((system, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{system.country}</CardTitle>
                  <Badge className="border-[#C5A46E]/40 text-[#C5A46E]">{system.relevance} Relevance</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-white/50">KEY STRENGTH</div>
                  <div className="text-sm mt-1">{system.focus}</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">WHY IT MATTERS</div>
                  <div className="text-sm text-white/80 mt-1">{system.strength}</div>
                </div>
                <Button onClick={trigger} className="w-full mt-4 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                  <Play className="h-4 w-4 mr-2" /> Integrate Insights
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Global Modalities */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <BookOpen className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Global Instructional Models & School Types</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {globalModalities.map((modality, i) => (
            <Card 
              key={i} 
              onClick={trigger}
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl cursor-pointer transition-all active:scale-[0.985]"
            >
              <CardContent className="p-5 flex items-center justify-between">
                <span className="text-sm font-medium">{modality}</span>
                <Play className="h-4 w-4 text-[#C5A46E]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          Global intelligence integrated into EdIntel
        </div>
      )}
    </div>
  );
}
