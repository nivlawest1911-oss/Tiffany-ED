'use client';

import React, { useState } from 'react';
import { 
  Brain, Shield, Database, TrendingUp, Award, Globe, Zap, 
  Play, CheckCircle, AlertTriangle, Calendar 
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
          the indispensable infrastructure layer that manages operations, risk, and strategy for the entire district.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400">Unified Data Fabric (SIS Sync) — #1 Priority</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400">Infrastructure-Led Growth</Badge>
        </div>
      </div>

      {/* 60-Day Priority Banner */}
      <div className="bg-white/[0.03] border border-orange-500/40 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="h-5 w-5 text-orange-400" />
          <div className="font-semibold text-lg">Current Top Priority: Unified Data Fabric (SIS/LMS Sync)</div>
        </div>
        <p className="text-sm text-white/80">
          Moving SIS integration to the absolute top of the roadmap. Once EdIntel can securely read from and write back to PowerSchool, Infinite Campus, and Canvas, 
          it stops being a tool the district uses and becomes infrastructure the district depends on.
        </p>
      </div>

      {/* District Nervous System - Core Capabilities */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Shield className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. District Nervous System (Operations & Safety)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Autonomous Compliance Ledger</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>AI agent monitors every IEP, 504, and state report in real time. Auto-corrects language when documents deviate from current state statutes.</p>
              <p className="text-emerald-400">Creates a Legal Shield that prevents lawsuits and audit failures.</p>
              <Button onClick={() => triggerToast("Compliance ledger active — Auto-correction enabled")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Activate Compliance Shield
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Human Capital Risk Sensing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Privacy-first analysis of communication metadata, workload, and absenteeism to flag burnout clusters.</p>
              <p className="text-emerald-400">Protects teacher retention and reduces emergency hiring costs.</p>
              <Button onClick={() => triggerToast("Risk scan complete — 2 schools flagged for proactive support")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Run Retention Risk Scan
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Unified Identity (IAM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>EdIntel acts as the single source of truth for access across all district tools. If a teacher leaves, access is revoked everywhere instantly.</p>
              <p className="text-emerald-400">Eliminates IT overhead and security vulnerabilities.</p>
              <Button onClick={() => triggerToast("IAM sync triggered — Access protocols updated")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Manage District Identity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Predictive Engine + Academic Passport */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. District Flight Simulator & Lifelong Value</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Predictive Resource Allocator (What-If Engine)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>High-fidelity simulations: “If we close East High’s annex and reallocate $400k to ESL interventions, what is the impact on district-wide state test scores?”</p>
              <Button onClick={() => triggerToast("Simulation complete — +3.2% projected proficiency gain with reallocation")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Run Budget Simulation
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Academic Passport (Verified Credentials)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Blockchain-backed digital portfolio that follows students K-12 and beyond. Anchors student identity securely within the EdIntel ecosystem, creating lifelong lock-in.</p>
              <Button onClick={() => triggerToast("Academic Passport updated — Verified skills recorded")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Update Student Passport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Supremacy + Marketplace */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Globe className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">3. Enterprise Value & Revenue Moats</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Vendor-Agnostic App Store</div>
              <p className="text-sm text-white/80 mb-4">Third-party tools integrate with EdIntel to reach districts. EdIntel takes a cut of every transaction, functioning as the K-12 App Store.</p>
              <Button onClick={() => triggerToast("Marketplace commission engine activated")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Open Procurement Hub
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Performance Value-Share</div>
              <p className="text-sm text-white/80 mb-4">Partner on state-funded grants. EdIntel captures a percentage of cost savings and performance bonuses when we hit predefined outcomes.</p>
              <Button onClick={() => triggerToast("Value-share agreement simulated")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Simulate Value-Share
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Data-as-a-Service (DaaS)</div>
              <p className="text-sm text-white/80 mb-4">Provide aggregated, anonymized benchmarking data to policy institutes and researchers. Creates a high-margin secondary revenue tier.</p>
              <Button onClick={() => triggerToast("Anonymized benchmark report generated")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Generate DaaS Report
              </Button>
            </CardContent>
          </Card>
        </div>
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
