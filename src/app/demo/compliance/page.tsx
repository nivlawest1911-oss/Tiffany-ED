'use client';

import React, { useState } from 'react';
import { ShieldCheck, Users, BookOpen, TrendingUp, FileText, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DemoCompliance() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerAction = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const compliancePillars = [
    {
      icon: Users,
      title: "Universal Screening",
      requirement: "All K-3 students screened with approved assessments",
      support: "Real-time screening completion tracking + auto-flagging of deficiencies",
      status: "98.7% Complete",
    },
    {
      icon: FileText,
      title: "Student Reading Improvement Plans (SRIP)",
      requirement: "SRIP required within 30 days for any identified deficiency",
      support: "One-click SRIP generation with parent notification templates & progress goals",
      status: "312 Active SRIPs",
    },
    {
      icon: BookOpen,
      title: "Science of Reading Alignment",
      requirement: "Explicit, systematic phonics instruction — no three-cueing",
      support: "Tiffany-ED lessons traceable to ALCOS + SoR pillars with 94% alignment score",
      status: "94% Aligned",
    },
    {
      icon: TrendingUp,
      title: "Progress Monitoring & Interventions",
      requirement: "Daily targeted small-group interventions + ongoing monitoring",
      support: "Tier 2/3 auto-grouping + weekly growth dashboards + intervention fidelity tracking",
      status: "+13.8% Avg Growth",
    },
    {
      icon: Award,
      title: "Teacher Professional Development",
      requirement: "K-3 teachers & administrators trained in Science of Reading (LETRS)",
      support: "Built-in SoR alignment scores + professional learning integration & tracking",
      status: "87% Teachers Trained",
    },
    {
      icon: ShieldCheck,
      title: "3rd Grade Reading Guarantee",
      requirement: "Students must demonstrate proficiency for promotion (with good cause exemptions)",
      support: "Promotion readiness dashboard + good cause exemption workflow + portfolio evidence collection",
      status: "94% On Track",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
              <ShieldCheck className="h-7 w-7 text-[#C5A46E]" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Alabama Literacy Act Compliance</h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl">
            EdIntel Sovereign is built from the ground up to help Mobile County Public Schools meet every requirement of the Alabama Literacy Act while dramatically reducing teacher and administrator workload.
          </p>
        </div>
        <Button 
          onClick={() => triggerAction("Full district compliance report exported")}
          className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium px-8 h-12 rounded-2xl"
        >
          Export Compliance Report
        </Button>
      </div>

      {/* Key Requirements Grid */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-6 px-1">How EdIntel Supports Alabama Literacy Act Requirements</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {compliancePillars.map((pillar, index) => (
            <Card key={index} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
                      <pillar.icon className="h-6 w-6 text-[#C5A46E]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl tracking-tight">{pillar.title}</CardTitle>
                      <p className="text-sm text-white/60 mt-1 pr-4">{pillar.requirement}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 whitespace-nowrap">
                    {pillar.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="pl-16">
                  <div className="text-sm text-white/80 leading-relaxed">
                    <span className="font-medium text-[#C5A46E]">EdIntel delivers:</span> {pillar.support}
                  </div>
                  <Button 
                    onClick={() => triggerAction(`${pillar.title} details opened`)}
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-white/20 hover:border-[#C5A46E]/40 rounded-xl text-xs"
                  >
                    View Detailed Evidence
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Compliance Dashboard */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-6 px-1">Live District Compliance Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "K-3 Students Screened", value: "98.7%", sub: "2,147 of 2,176 students", icon: CheckCircle, color: "emerald" },
            { label: "Active SRIPs", value: "312", sub: "100% within 30-day window", icon: FileText, color: "amber" },
            { label: "Tier 2/3 Students in Intervention", value: "87%", sub: "271 students receiving daily support", icon: TrendingUp, color: "emerald" },
            { label: "3rd Grade Promotion Ready", value: "94%", sub: "Good cause exemption workflow ready", icon: Award, color: "emerald" },
          ].map((metric, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/60">{metric.label}</p>
                    <p className="text-4xl font-semibold tracking-tighter mt-3">{metric.value}</p>
                    <p className="text-xs text-white/50 mt-1.5">{metric.sub}</p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-white/5`}>
                    <metric.icon className={`h-6 w-6 text-[#C5A46E]`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Traceability & Audit Section */}
      <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <ShieldCheck className="h-7 w-7 text-[#C5A46E]" /> Full Traceability & Audit Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-white/80">
          <p>
            Every AI-generated recommendation, differentiation plan, and intervention suggestion in EdIntel is fully traceable to specific Alabama Course of Study (ALCOS) standards and Science of Reading research. This eliminates “black box” concerns during any compliance review or audit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              "Educator AI Interaction Audit Log (FERPA-ready)",
              "Standards-aligned lesson traceability",
              "Automated district & state reporting exports",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => triggerAction("Full Educator AI Audit Log opened in new tab")}
            className="w-full md:w-auto bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl px-8"
          >
            View Full Educator AI Audit Log
          </Button>
        </CardContent>
      </Card>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
