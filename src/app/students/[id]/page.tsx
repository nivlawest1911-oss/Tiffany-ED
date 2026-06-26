'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentDetailPage() {
  // In a real app, this would come from params or data fetching
  const student = {
    name: "Liam Thompson",
    grade: "4th Grade",
    teacher: "Ms. Rivera",
    status: "On Track",
    literacyGrowth: 78,
    phonics: 85,
    fluency: 72,
    comprehension: 81,
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">{student.name}</h1>
            <p className="text-white/70 mt-1">{student.grade} • {student.teacher}</p>
          </div>
          <Badge 
            className={
              student.status === "On Track" 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30"
            }
          >
            {student.status}
          </Badge>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Literacy Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">{student.literacyGrowth}%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 12% since last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Phonics Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">{student.phonics}%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Reading Fluency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">{student.fluency}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Tiffany-ED generated feedback</span>
                <span className="text-white/60">Jun 24</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Added to Tier 2 reading group</span>
                <span className="text-white/60">Jun 20</span>
              </div>
              <div className="flex justify-between">
                <span>Comprehension assessment completed</span>
                <span className="text-white/60">Jun 18</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Intervention History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Tier 2 Reading Support</p>
                  <p className="text-white/60 text-xs">Started: May 12, 2026 • Ongoing</p>
                </div>
                <div>
                  <p className="font-medium">Small Group Comprehension</p>
                  <p className="text-white/60 text-xs">Completed: April 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-8">
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            Generate Student Report
          </Button>
        </div>
      </div>
    </div>
  );
}
