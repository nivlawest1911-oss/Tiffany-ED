'use client';

import React, { useState } from 'react';
import { Target, Play, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const modalities = [
  { name: "Traditional Public", status: "Active" },
  { name: "Charter Schools", status: "Active" },
  { name: "Private & Independent", status: "Active" },
  { name: "Montessori", status: "Active" },
  { name: "Micro-schools & Learning Pods", status: "Learning" },
  { name: "Homeschool", status: "Learning" },
  { name: "Virtual / Online", status: "Active" },
  { name: "Special Education", status: "Active" },
  { name: "Gifted & Talented", status: "Active" },
  { name: "Vocational / CTE", status: "Active" },
  { name: "Alternative Education", status: "Active" },
  { name: "Athletic Academies", status: "Learning" },
  { name: "Post-Secondary Bridge", status: "Standby" },
];

export default function Modalities() {
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
            <Target className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">All School Types & Modalities</h1>
        </div>
        <p className="text-white/70">EdIntel Sovereign supports every type of school and instructional model in American education.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {modalities.map((mod, i) => (
          <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="font-medium">{mod.name}</div>
                <Badge variant="outline" className="mt-2 text-xs">{mod.status}</Badge>
              </div>
              <Button onClick={trigger} size="sm" variant="ghost" className="h-8 px-3">
                <Play className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          asChild 
          variant="outline" 
          className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10"
        >
          <a href="/demo/present/global-best-practices">
            Explore Global Best Practices <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" /> Modality agent triggered
        </div>
      )}
    </div>
  );
}
