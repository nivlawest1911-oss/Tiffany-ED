'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function InterventionsPage() {
  const interventions = [
    {
      id: 1,
      student: "Sophia Thompson",
      grade: "2nd Grade",
      tier: "Tier 2",
      focus: "Short Vowel Sounds & Blending",
      startDate: "May 12, 2026",
      progress: 64,
      status: "In Progress",
    },
    {
      id: 2,
      student: "Ethan Ramirez",
      grade: "3rd Grade",
      tier: "Tier 3",
      focus: "Intensive Reading Comprehension",
      startDate: "April 28, 2026",
      progress: 41,
      status: "In Progress",
    },
    {
      id: 3,
      student: "Mia Patel",
      grade: "4th Grade",
      tier: "Tier 2",
      focus: "Fluency Building",
      startDate: "May 5, 2026",
      progress: 89,
      status: "Near Completion",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Interventions</h1>
            <p className="text-white/70 mt-1">Track Tier 2 and Tier 3 student support</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Start New Intervention
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">187</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students Improving</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-emerald-400">132</div>
              <p className="text-sm text-white/60">71% success rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Completed This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">48</div>
            </CardContent>
          </Card>
        </div>

        {/* Interventions List */}
        <div className="space-y-4">
          {interventions.map((item) => (
            <Card key={item.id} className="bg-white/[0.03] border-white/10">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{item.student}</h3>
                    <Badge variant="outline">{item.grade}</Badge>
                    <Badge 
                      className={
                        item.tier === "Tier 2" 
                          ? "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30" 
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }
                    >
                      {item.tier}
                    </Badge>
                  </div>
                  <p className="text-white/80">{item.focus}</p>
                  <p className="text-sm text-white/60 mt-1">Started: {item.startDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-white/60">Progress</p>
                    <p className="text-2xl font-semibold">{item.progress}%</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
