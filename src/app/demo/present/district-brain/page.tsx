'use client';

import React, { useState } from 'react';
import { 
  Brain, Shield, Database, TrendingUp, Award, Globe, Zap, 
  Play, CheckCircle, AlertTriangle, Calendar, FileText 
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
          the indispensable infrastructure that manages operations, risk, compliance, and revenue generation.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400">SIS Data Fabric — #1 Priority</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400">Legal + Revenue Moats — Next Phase</Badge>
        </div>
      </div>

      {/* Legal & Governance Shield */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Shield className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. Legal & Governance Shield (Regulatory Fortress)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Real-Time Legal-to-Policy Mapping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Automatically ingests new state and federal education legislation and generates ready-to-review policy drafts for the Board.</p>
              <p className="text-emerald-400">Turns reactive compliance into an automated baseline.</p>
              <Button onClick={() => triggerToast("New legislation detected — Policy draft generated for Board review")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Ingest Latest Legislation
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Immutable Evidence of Instruction Vault</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Write-once, read-many archive of every AI-generated lesson, intervention, and compliance action. One-click “Proof of Instruction” report for audits.</p>
              <p className="text-emerald-400">Becomes the district’s Official Legal Witness.</p>
              <Button onClick={() => triggerToast("Governance Report generated — Full audit trail ready")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Generate Proof of Compliance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resource Scarcity Intelligence */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. Resource Scarcity Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Predictive Attrition & Talent Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Analyzes HR and performance data to predict teacher shortages and auto-generates job descriptions while coordinating with recruitment platforms.</p>
              <Button onClick={() => triggerToast("Talent forecast complete — 4 Math vacancies predicted. Auto-generating JD.")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Run Attrition Forecast
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle>Autonomous Grant & Funding Engine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Scans federal and state databases for new funding opportunities, cross-references with district needs, and auto-drafts 80% of the grant proposal.</p>
              <Button onClick={() => triggerToast("Grant opportunities scanned — 3 high-match proposals drafted")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Scan Funding Sources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Supremacy & System Lock-in */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Globe className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">3. Revenue Supremacy & System Lock-in</h2>
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
              <div className="font-semibold mb-2">Academic Passport (Lifelong Value)</div>
              <p className="text-sm text-white/80 mb-4">Blockchain-backed digital portfolio that follows students K-12 and beyond. Anchors student identity securely within the EdIntel ecosystem.</p>
              <Button onClick={() => triggerToast("Passport credentials verified and locked to ledger")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Verify Credentials
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
