'use client';

import React, { useState } from 'react';
import { 
  Brain, Shield, Database, TrendingUp, Award, Globe, Zap, 
  Play, CheckCircle, AlertTriangle, Calendar, DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DistrictBrain() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Brain className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign District Brain</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel as the <span className="font-semibold text-[#C5A46E]">District Nervous System</span> — 
          the indispensable infrastructure that drives revenue, safety, compliance, and long-term sustainability.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400">SIS Data Fabric — #1 Priority</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400">Grant Auto-Filer — High Priority (Next Phase)</Badge>
        </div>
      </div>

      {/* Revenue & Sustainability Intelligence */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <DollarSign className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. Revenue & Sustainability Intelligence (Profit Center Moat)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border border-[#C5A46E]/40 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Autonomous Grant-Funding Engine</CardTitle>
              <Badge className="bg-emerald-500/10 text-emerald-400 w-fit">High Priority</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Continuously monitors federal, state, and private grants. Cross-references district data and auto-fills ~90% of applications.</p>
              <p className="text-emerald-400">Turns EdIntel from a cost into a revenue generator for the district.</p>
              <Button onClick={() => triggerToast("Grant opportunities found — 4 applications auto-drafted")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Scan & Draft Grants
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Performance-Based Value-Share Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Tracks key district KPIs and automatically generates the reporting needed to unlock state performance bonuses and grants.</p>
              <Button onClick={() => triggerToast("Performance report generated — Eligible for state bonus funding")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Generate Performance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Operational Resilience */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Shield className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. Operational Resilience (Business Continuity Moat)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>District Crisis & Emergency Orchestration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>During emergencies, automatically triggers response plans, updates parent notifications, syncs with emergency services, and manages accountability logs.</p>
              <p className="text-emerald-400">Becomes the Safety Infrastructure districts cannot afford to disconnect.</p>
              <Button onClick={() => triggerToast("Crisis response plan activated — Notifications and logs running")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Simulate Crisis Response
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Teacher Credential & Pipeline Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Automatically tracks certification renewals, professional development hours, and state-mandated training across the entire district.</p>
              <Button onClick={() => triggerToast("Credential audit complete — 12 teachers flagged for renewal")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Run Credential Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Student Lifetime + Marketplace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Longitudinal Mastery Mapping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Visual timeline showing every student’s progress against state standards across their entire K-12 career. Instantly reveals where mastery gaps began.</p>
            <Button onClick={() => triggerToast("Mastery map generated — Foundational gap identified in 4th grade")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              View Student Mastery Map
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Parent-as-Partner Engagement Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>AI-translated portal that gives parents a personalized learning action plan with simple home activities. Creates strong parent demand for EdIntel.</p>
            <Button onClick={() => triggerToast("Parent action plan generated — 3 home activities recommended")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              Generate Parent Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
