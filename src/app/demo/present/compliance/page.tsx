'use client';

import { ShieldCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PresentCompliance() {
  const pillars = [
    { title: "Universal Screening", status: "98.7% Complete" },
    { title: "Student Reading Improvement Plans", status: "312 Active" },
    { title: "Science of Reading Alignment", status: "94% Aligned" },
    { title: "Progress Monitoring", status: "+13.8% Avg Growth" },
    { title: "Teacher Professional Development", status: "87% Trained" },
    { title: "3rd Grade Reading Guarantee", status: "94% On Track" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
          <ShieldCheck className="h-7 w-7 text-[#C5A46E]" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Alabama Literacy Act Compliance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((p, i) => (
          <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{p.title}</CardTitle>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  {p.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Fully supported in EdIntel Sovereign
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
