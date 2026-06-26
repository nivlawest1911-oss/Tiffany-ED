'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Reports</h1>
            <p className="text-white/70 mt-1">Generate and download district-level reports</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Create New Report
          </Button>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Science of Reading Report */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Science of Reading Report</CardTitle>
                <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">Popular</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                District-wide phonics, fluency, and comprehension performance.
              </p>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          {/* Student Growth Report */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>Student Growth Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                Individual and cohort growth trends over time.
              </p>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          {/* AI Usage & Audit Report */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>AI Usage & Audit Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                Traceable AI interactions by teacher, school, and standard.
              </p>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          {/* Intervention Effectiveness */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>Intervention Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                Impact of Tier 2 and Tier 3 interventions across the district.
              </p>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          {/* Teacher Adoption Report */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>Teacher Adoption Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                Platform usage and adoption metrics by school and grade level.
              </p>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardContent>
          </Card>

          {/* Custom Report */}
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 mb-4">
                Build a custom report with specific filters and metrics.
              </p>
              <Button variant="outline" className="w-full">Create Custom Report</Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All reports are aligned with Alabama Literacy Act and district compliance requirements.
        </p>
      </div>
    </div>
  );
}
