'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DistrictOverviewPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">District Overview</h1>
            <p className="text-white/70 mt-1">Mobile County Public Schools • 2025–2026</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            87 Schools • 48,291 Students
          </Badge>
        </div>

        {/* Key District Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">35,892</div>
              <p className="text-emerald-400 text-sm mt-1">74% of district</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Tier 2 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold text-[#C5A46E]">7,412</div>
              <p className="text-white/60 text-sm mt-1">15% of district</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Tier 3 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold text-red-400">4,987</div>
              <p className="text-white/60 text-sm mt-1">10% of district</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active AI Usage (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">124,872</div>
              <p className="text-white/60 text-sm mt-1">Traceable interactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Adoption by Level */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Platform Adoption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Elementary Schools</span>
                <span className="font-medium">92% adoption</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Middle Schools</span>
                <span className="font-medium">87% adoption</span>
              </div>
              <div className="flex justify-between items-center">
                <span>High Schools</span>
                <span className="font-medium">71% adoption</span>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Audit Summary */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Compliance Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>AI interactions logged this month</span>
                <span className="font-medium text-emerald-400">124,872</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Audit reports generated</span>
                <span className="font-medium">312</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Schools with full LTI integration</span>
                <span className="font-medium">71 / 87</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All data is aggregated and anonymized for district-level reporting.
        </p>
      </div>
    </div>
  );
}
