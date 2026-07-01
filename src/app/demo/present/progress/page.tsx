'use client';

import React, { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function PresentProgress() {
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { name: "Ava Thompson", grade: "3rd", growth: 18, literacy: 87, tier: "On Track" },
    { name: "Marcus Chen", grade: "4th", growth: 12, literacy: 72, tier: "Tier 2" },
    { name: "Isabella Rodriguez", grade: "3rd", growth: 24, literacy: 91, tier: "On Track" },
    { name: "Jamal Washington", grade: "5th", growth: 9, literacy: 64, tier: "Tier 3" },
    { name: "Sophia Patel", grade: "4th", growth: 15, literacy: 83, tier: "On Track" },
  ];

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Progress Monitoring</h1>
        <p className="text-white/60 mt-1">Real-time literacy growth • Presentation data</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-4 top-3 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search students..."
            className="pl-11 bg-white/5 border-white/10 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
          Export Report
        </Button>
      </div>

      <Card className="bg-white/[0.03] border-white/10 rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#C5A46E]" /> Student Growth Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="text-left py-4 px-6">Student</th>
                <th className="text-left py-4 px-6">Grade</th>
                <th className="text-left py-4 px-6">Literacy Score</th>
                <th className="text-left py-4 px-6">30-Day Growth</th>
                <th className="text-left py-4 px-6">Support Tier</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-6 font-medium">{student.name}</td>
                  <td className="py-4 px-6 text-white/70">{student.grade}</td>
                  <td className="py-4 px-6">{student.literacy}%</td>
                  <td className="py-4 px-6 text-emerald-400">+{student.growth}%</td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={
                      student.tier === "On Track" 
                        ? "border-emerald-500/40 text-emerald-400" 
                        : "border-amber-500/40 text-amber-400"
                    }>
                      {student.tier}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
