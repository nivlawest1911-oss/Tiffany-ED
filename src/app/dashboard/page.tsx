'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Good morning, Dr. West</h1>
            <p className="text-white/70 mt-1">Mobile County Public Schools • June 26, 2026</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            District Admin
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">48,291</div>
              <p className="text-emerald-400 text-sm mt-1">+312 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">2,184</div>
              <p className="text-emerald-400 text-sm mt-1">+34 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Interactions (30d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">124,872</div>
              <p className="text-white/60 text-sm mt-1">Traceable & Audited</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Avg. Student Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">+12.8%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 1.9% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40"
              onClick={() => window.location.href = '/tiffany-ed'}
            >
              Open Tiffany-ED
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40"
              onClick={() => window.location.href = '/grouping'}
            >
              Generate Groups
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40"
              onClick={() => window.location.href = '/progress'}
            >
              View Progress
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40"
              onClick={() => window.location.href = '/admin/educator-audit'}
            >
              AI Audit Log
            </Button>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent AI Activity */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Tiffany-ED generated 47 lesson scaffolds</span>
                <span className="text-white/50">Just now</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Smart groups updated for 12 classes</span>
                <span className="text-white/50">2h ago</span>
              </div>
              <div className="flex justify-between">
                <span>Progress reports generated for Lincoln Elementary</span>
                <span className="text-white/50">Yesterday</span>
              </div>
            </CardContent>
          </Card>

          {/* At-Risk Highlights */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Needs Attention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Students in Tier 3</span>
                <span className="font-semibold text-red-400">4,987</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Classes with low engagement</span>
                <span className="font-semibold text-[#C5A46E]">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending intervention reviews</span>
                <span className="font-semibold">64</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
