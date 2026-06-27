'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SchoolAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Lincoln Elementary</h1>
            <p className="text-white/70 mt-1">School-level overview • 2025–2026</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            642 Students
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">478</div>
              <p className="text-emerald-400 text-sm mt-1">74% of school</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Tier 2 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-[#C5A46E]">98</div>
              <p className="text-white/60 text-sm mt-1">15% of school</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Tier 3 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-red-400">66</div>
              <p className="text-white/60 text-sm mt-1">10% of school</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active AI Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">1,842</div>
              <p className="text-white/60 text-sm mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grade Level Performance */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Performance by Grade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>3rd Grade</span>
                <span className="font-medium text-emerald-400">82% On Track</span>
              </div>
              <div className="flex justify-between items-center">
                <span>4th Grade</span>
                <span className="font-medium text-emerald-400">76% On Track</span>
              </div>
              <div className="flex justify-between items-center">
                <span>5th Grade</span>
                <span className="font-medium text-[#C5A46E]">68% On Track</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent School Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>AI lesson scaffolds generated</span>
                <span className="text-[#C5A46E]">312</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>New interventions started</span>
                <span className="text-[#C5A46E]">18</span>
              </div>
              <div className="flex justify-between">
                <span>Smart groups updated</span>
                <span className="text-[#C5A46E]">9</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
