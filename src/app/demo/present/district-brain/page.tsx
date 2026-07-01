'use client';

import React, { useState } from 'react';
import { 
  Brain, Shield, Database, TrendingUp, Award, Globe, Zap, 
  Play, CheckCircle, AlertTriangle 
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
          EdIntel as the <span className="font-semibold text-[#C5A46E]">Unified District Operating System (UDOS)</span> — 
          the indispensable infrastructure layer that manages operations, not just tasks.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400">SIS/LMS Sync — Priority Sprint</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400">Data Ownership & Portability — Core Moat</Badge>
        </div>
      </div>

      {/* System of Record Layer */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Database className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. System of Record Foundation</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Native SIS/LMS Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Bidirectional connectors to PowerSchool, Infinite Campus, Skyward, Canvas, and Google Classroom.</p>
              <p className="text-emerald-400">Status: Priority development item</p>
              <Button onClick={() => triggerToast("SIS sync simulation complete — Live bidirectional sync ready for sprint")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Simulate Live SIS Sync
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Immutable Audit Ledger</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Append-only, time-stamped record of every AI-generated decision (IEP changes, grading, resource moves). Provides legal defense during audits.</p>
              <Button onClick={() => triggerToast("Audit ledger entry created — Full traceability enabled")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                View Sample Audit Trail
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">Unified Identity (IAM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>EdIntel becomes the primary gateway for roles and permissions across all district systems.</p>
              <Button onClick={() => triggerToast("Unified IAM configured — Single source of truth for access")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Manage District Roles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Operational Intelligence */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. Operational Intelligence (Command & Control)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Predictive What-If Budget Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Simulate: “What happens to 8th-grade literacy if we move $500k from Facilities to Academic Intervention?”</p>
              <Button onClick={() => triggerToast("Simulation complete — +2.1% projected proficiency gain")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Run Budget Simulation
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Facilities & Resource Optimizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Analyzes building usage, HVAC, and enrollment trends to recommend consolidations and cost-saving moves.</p>
              <Button onClick={() => triggerToast("Facilities optimization complete — $1.2M annual savings identified")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Optimize Facilities Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>District Health Sentiment Sensor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Privacy-first detection of burnout clusters and cultural risk before they become turnover or crises.</p>
              <Button onClick={() => triggerToast("Sentiment scan complete — 2 schools flagged for proactive support")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Run District Health Scan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pedagogical Infrastructure + Revenue Moat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Multimodal Process Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Computer vision + audio analysis of problem-solving processes, sketches, and oral explanations — moving beyond text-only grading.</p>
            <Button onClick={() => triggerToast("Multimodal assessment complete — Rich process profile generated")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              Analyze Performance Task
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Academic Passport (Lifelong Credentials)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>A portable, cryptographically verified record of student achievement, certifications, and portfolios that moves with them across districts and borders.</p>
            <Button onClick={() => triggerToast("Academic Passport generated — Verified credential ready")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              View Verified Passport
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Moat & Differentiation */}
      <div className="bg-white/[0.03] border border-[#C5A46E]/40 rounded-3xl p-8 text-center mt-8">
        <div className="text-sm text-[#C5A46E] mb-2">THE EDINTEL MOAT</div>
        <div className="text-2xl font-semibold tracking-tight">Data Sovereignty + Open Ecosystem</div>
        <p className="mt-4 text-white/70 max-w-3xl mx-auto">
          Districts own their models. Third parties build on our Marketplace. We capture value across the entire educational supply chain while preventing rip-and-replace churn through deep native integration.
        </p>
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
