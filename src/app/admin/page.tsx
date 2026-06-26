'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Admin Overview</h1>
            <p className="text-white/70 mt-1">District-wide insights • Mobile County Schools</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            Updated just now
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">87</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">2,184</div>
              <p className="text-emerald-400 text-sm mt-1">+34 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students Using EdIntel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">48,291</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Interactions (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">124,872</div>
              <p className="text-white/60 text-sm mt-1">Traceable & Audited</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Adoption Overview */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Platform Adoption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Schools Fully Onboarded</span>
                <span className="font-semibold">71 / 87</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Teachers Actively Using Tiffany-ED</span>
                <span className="font-semibold">1,642</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Parents Registered</span>
                <span className="font-semibold">19,847</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Recent District Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>AI-generated lesson scaffolds</span>
                <span className="text-[#C5A46E]">8,421</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Smart groups generated</span>
                <span className="text-[#C5A46E]">1,284</span>
              </div>
              <div className="flex justify-between">
                <span>New LTI connections</span>
                <span className="text-[#C5A46E]">3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All AI activity is logged and auditable for compliance.
        </p>
      </div>
    </div>
  );
}
