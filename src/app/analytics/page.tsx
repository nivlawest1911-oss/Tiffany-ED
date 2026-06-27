'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Analytics</h1>
            <p className="text-white/70 mt-1">Deeper insights into student performance and platform usage</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            Last 30 days
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Avg. Student Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">+12.8%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 1.9% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Generations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">18,472</div>
              <p className="text-white/60 text-sm mt-1">Lesson scaffolds & feedback</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">2,184</div>
              <p className="text-emerald-400 text-sm mt-1">+312 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Intervention Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">68%</div>
              <p className="text-white/60 text-sm mt-1">Students moved to Tier 1</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Trends */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Literacy Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-white/40">
                [Growth Trend Chart Placeholder]
              </div>
            </CardContent>
          </Card>

          {/* AI Usage Breakdown */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>AI Feature Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span>Lesson Scaffolds</span>
                  <span className="font-medium">9,842</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rubric Feedback</span>
                  <span className="font-medium">6,124</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Student Grouping</span>
                  <span className="font-medium">2,506</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All analytics are aligned with Science of Reading and district goals.
        </p>
      </div>
    </div>
  );
}
