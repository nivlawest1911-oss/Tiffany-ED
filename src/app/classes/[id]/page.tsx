'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ClassDetailPage() {
  // In a real app, this data would come from params + API
  const classData = {
    name: "4th Grade ELA",
    teacher: "Ms. Rivera",
    students: 28,
    grade: "4th Grade",
    lastActivity: "Today",
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">{classData.name}</h1>
            <p className="text-white/70 mt-1">
              {classData.grade} • {classData.teacher} • {classData.students} students
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
              <div className="text-4xl font-semibold">+14%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">21</div>
              <p className="text-emerald-400 text-sm">75%</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Needs Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-[#C5A46E]">7</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Interactions (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">312</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Tiffany-ED used for 8 students</span>
                <span className="text-white/60">Today</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Smart groups regenerated</span>
                <span className="text-white/60">Yesterday</span>
              </div>
              <div className="flex justify-between">
                <span>New assessment data imported</span>
                <span className="text-white/60">2 days ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">View All Students</Button>
              <Button variant="outline" className="w-full justify-start">Run AI Grouping</Button>
              <Button variant="outline" className="w-full justify-start">Open Tiffany-ED</Button>
              <Button variant="outline" className="w-full justify-start">Export Class Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
