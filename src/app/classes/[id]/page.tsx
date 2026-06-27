'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ClassDetailPage() {
  // In a real app, this data would come from params + API
  const classInfo = {
    name: "4th Grade ELA",
    teacher: "Ms. Rivera",
    students: 28,
    grade: "4th Grade",
    lastActivity: "Today",
  };

  const students = [
    { name: "Liam Thompson", status: "On Track", growth: "+14%" },
    { name: "Sophia Kim", status: "Needs Support", growth: "+6%" },
    { name: "Noah Patel", status: "On Track", growth: "+19%" },
    { name: "Ava Martinez", status: "Tier 2", growth: "+9%" },
    { name: "Ethan Rivera", status: "On Track", growth: "+11%" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">{classInfo.name}</h1>
            <p className="text-white/70 mt-1">
              {classInfo.grade} • {classInfo.teacher} • {classInfo.students} students
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Manage Students</Button>
            <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
              Generate Groups
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Avg. Literacy Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">+13.8%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">21 / 28</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">7</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Last AI Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardHeader>
            <CardTitle>Students in this Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/70">Student</th>
                    <th className="text-left p-4 font-medium text-white/70">Status</th>
                    <th className="text-left p-4 font-medium text-white/70">Growth</th>
                    <th className="text-right p-4 font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 font-medium">{student.name}</td>
                      <td className="p-4">
                        <Badge 
                          className={
                            student.status === "On Track" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                              : "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-emerald-400 font-medium">{student.growth}</td>
                      <td className="p-4 text-right">
                        <Button size="sm" variant="ghost">View Profile</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
