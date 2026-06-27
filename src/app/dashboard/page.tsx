'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Good morning, Dr. Alvin</h1>
            <p className="text-white/60 mt-1">Here’s what’s happening in your classes today.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">Today</div>
            <div className="text-xl font-medium">June 26, 2026</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">1,284</div>
              <p className="text-emerald-400 text-sm mt-1">+24 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">At-Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-[#C5A46E]">87</div>
              <p className="text-white/60 text-sm mt-1">12% of total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Avg. Literacy Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">+14.2%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 3.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">142</div>
              <p className="text-white/60 text-sm mt-1">Tier 2 & Tier 3</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <p className="font-medium">Tiffany-ED generated 12 lesson scaffolds</p>
                    <p className="text-white/50 text-xs">Today at 9:14 AM</p>
                  </div>
                  <Badge variant="outline" className="text-[#C5A46E] border-[#C5A46E]/30">Traceable</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <p className="font-medium">Student grouping updated for 4th Grade ELA</p>
                    <p className="text-white/50 text-xs">Yesterday</p>
                  </div>
                  <Badge variant="outline">Auto</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                Open Tiffany-ED
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Run Student Grouping
              </Button>
              <Button className="w-full justify-start" variant="outline">
                View Science of Reading Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Generate District Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
