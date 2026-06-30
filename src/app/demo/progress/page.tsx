'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, Award, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function DemoProgress() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);

  const students = [
    { id: 1, name: "Ava Thompson", grade: "3rd", growth: 18, literacy: 87, tier: "On Track", trend: "↑" },
    { id: 2, name: "Marcus Chen", grade: "4th", growth: 12, literacy: 72, tier: "Tier 2", trend: "↑" },
    { id: 3, name: "Isabella Rodriguez", grade: "3rd", growth: 24, literacy: 91, tier: "On Track", trend: "↑" },
    { id: 4, name: "Jamal Washington", grade: "5th", growth: 9, literacy: 64, tier: "Tier 3", trend: "→" },
    { id: 5, name: "Sophia Patel", grade: "4th", growth: 15, literacy: 83, tier: "On Track", trend: "↑" },
    { id: 6, name: "Liam O'Brien", grade: "3rd", growth: 21, literacy: 78, tier: "Tier 2", trend: "↑" },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Progress Monitoring</h1>
          <p className="text-white/50 mt-1">Real-time literacy growth across Mobile County • Demo data</p>
        </div>
        <Button onClick={handleAction} className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl px-6">
          Export District Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#C5A46E]/10"><TrendingUp className="h-6 w-6 text-[#C5A46E]" /></div>
            <div>
              <div className="text-3xl font-semibold tracking-tighter">+13.8%</div>
              <div className="text-sm text-white/60">Average Literacy Growth</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10"><Users className="h-6 w-6 text-emerald-400" /></div>
            <div>
              <div className="text-3xl font-semibold tracking-tighter">1,892</div>
              <div className="text-sm text-white/60">Students On Track (87%)</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10"><Award className="h-6 w-6 text-amber-400" /></div>
            <div>
              <div className="text-3xl font-semibold tracking-tighter">312</div>
              <div className="text-sm text-white/60">Students in Tier 2/3 Support</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Table */}
      <Card className="bg-white/[0.03] border-white/10 rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#C5A46E]" /> Student Growth Tracker
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-4 top-3 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search by student name..."
                className="pl-11 bg-white/5 border-white/10 rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="text-left py-4 px-6 font-medium">Student</th>
                  <th className="text-left py-4 px-6 font-medium">Grade</th>
                  <th className="text-left py-4 px-6 font-medium">Literacy Score</th>
                  <th className="text-left py-4 px-6 font-medium">Growth (30 days)</th>
                  <th className="text-left py-4 px-6 font-medium">Support Tier</th>
                  <th className="text-right py-4 px-6 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">{student.name}</td>
                    <td className="py-4 px-6 text-white/70">{student.grade}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-2 bg-[#C5A46E] rounded-full" style={{ width: `${student.literacy}%` }} />
                        </div>
                        <span className="font-mono text-sm w-8">{student.literacy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        +{student.growth}% {student.trend}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={student.tier === "On Track" 
                          ? "border-emerald-500/40 text-emerald-400" 
                          : student.tier === "Tier 2" 
                            ? "border-amber-500/40 text-amber-400" 
                            : "border-red-500/40 text-red-400"}
                      >
                        {student.tier}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button 
                        onClick={handleAction} 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 hover:border-[#C5A46E]/40 rounded-xl text-xs"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl text-sm font-medium shadow-xl flex items-center gap-2">
          <Award className="h-4 w-4" /> Report generated in demo mode
        </div>
      )}
    </div>
  );
}
