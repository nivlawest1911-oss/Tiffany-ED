'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProgressMonitoringPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Progress Monitoring</h1>
            <p className="text-white/70 mt-1">Science of Reading & ALCOS-aligned student progress</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            Updated today
          </Badge>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">942</div>
              <p className="text-emerald-400 text-sm mt-1">73% of total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Needs Tier 2 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-[#C5A46E]">218</div>
              <p className="text-white/60 text-sm mt-1">17% of total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Needs Tier 3 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-red-400">124</div>
              <p className="text-white/60 text-sm mt-1">10% of total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Avg. Growth (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">+11.4%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 2.8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Overview */}
          <Card className="lg:col-span-2 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>4th Grade ELA - Ms. Rivera</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <p className="font-medium">Phonics Mastery</p>
                    <p className="text-sm text-white/60">Class Average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">81%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <p className="font-medium">Reading Fluency</p>
                    <p className="text-sm text-white/60">Class Average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">74%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Comprehension</p>
                    <p className="text-sm text-white/60">Class Average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">79%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Students Improving</span>
                <span className="font-medium text-emerald-400">312</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Students Declining</span>
                <span className="font-medium text-red-400">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Assessments Completed</span>
                <span className="font-medium">1,842</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          Data aligned to Alabama Literacy Act and Science of Reading frameworks.
        </p>
      </div>
    </div>
  );
}
