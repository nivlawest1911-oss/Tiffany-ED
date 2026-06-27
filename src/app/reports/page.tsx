'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ReportsPage() {
  const reportCategories = [
    {
      title: "Science of Reading Report",
      description: "District-wide phonics, fluency, and comprehension performance.",
      popular: true,
    },
    {
      title: "Student Growth Report",
      description: "Individual and cohort growth trends over time.",
      popular: false,
    },
    {
      title: "AI Usage & Audit Report",
      description: "Traceable AI interactions by teacher, school, and standard.",
      popular: true,
    },
    {
      title: "Intervention Effectiveness",
      description: "Impact of Tier 2 and Tier 3 interventions across the district.",
      popular: false,
    },
    {
      title: "Teacher Adoption Report",
      description: "Platform usage and adoption metrics by school and grade level.",
      popular: false,
    },
    {
      title: "Custom Report",
      description: "Build a custom report with specific filters and metrics.",
      popular: false,
    },
  ];

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
            + Create Custom Report
          </Button>
        </div>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCategories.map((report, index) => (
            <Card 
              key={index} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl pr-2">{report.title}</CardTitle>
                  {report.popular && (
                    <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70 mb-6">{report.description}</p>
                <Button variant="outline" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All reports are aligned with Alabama Literacy Act and district compliance requirements.
        </p>
      </div>
    </div>
  );
}
