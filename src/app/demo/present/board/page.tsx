'use client';

import { Award, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BoardView() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Board of Education Dashboard</h1>
        <p className="text-white/60">Mobile County Public Schools • June 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="text-[#C5A46E]" /> Alabama Literacy Act</CardTitle></CardHeader>
          <CardContent>
            <div className="text-5xl font-semibold tracking-tighter">98.7%</div>
            <p className="text-emerald-400 text-sm mt-1">Compliance • All requirements met</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="text-[#C5A46E]" /> District Literacy Growth</CardTitle></CardHeader>
          <CardContent>
            <div className="text-5xl font-semibold tracking-tighter">+13.8%</div>
            <p className="text-emerald-400 text-sm mt-1">Average 30-day growth</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="text-[#C5A46E]" /> Students On Track</CardTitle></CardHeader>
          <CardContent>
            <div className="text-5xl font-semibold tracking-tighter">87%</div>
            <p className="text-emerald-400 text-sm mt-1">2,184 students • +4.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/[0.03] border-white/10 rounded-3xl p-8">
        <div className="text-lg font-medium mb-4">Key Board Insights</div>
        <ul className="space-y-3 text-white/80">
          <li>• 312 active Student Reading Improvement Plans (100% within 30-day window)</li>
          <li>• 23 schools showing strong Science of Reading implementation</li>
          <li>• Projected 94% renewal rate based on current engagement</li>
        </ul>
      </Card>
    </div>
  );
}
