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
          the indispensable infrastructure layer that solves resource scarcity, administrative burnout, and performance blind spots.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-orange-500/10 text-orange-400">SIS Integration (PowerSchool / Infinite Campus) — Priority Sprint</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400">Data Ownership & Portability — Core Moat</Badge>
        </div>
      </div>

      {/* State-Aware Compliance + Cross-Silo Data Fabric */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C5A46E]" /> State-Aware Compliance Guardian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Automatically flags when lesson plans, IEPs, or reports deviate from state-specific mandates or federal requirements (FERPA/COPPA) before saving.</div>
            <Button onClick={() => triggerToast("Compliance scan complete — 2 deviations flagged and auto-corrected")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              Run Compliance Scan
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-[#C5A46E]" /> Cross-Silo Data Fabric (Student 360)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Unified view pulling from SIS, LMS, Finance, and HR. Shows correlations (e.g., budget cuts in PE → attendance drop).</div>
            <Button onClick={() => triggerToast("Student 360 view generated — Cross-silo insights ready")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              View Student 360 Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Predictive What-If + Multimodal Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Predictive "What-If" Budget Simulations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Run scenarios: “What happens to 8th-grade literacy if we reallocate $200k from SEL to direct reading interventions?”</div>
            <Button onClick={() => triggerToast("Simulation complete — +1.8% projected literacy growth with reallocation")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              Run What-If Simulation
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Multimodal Process Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Uses computer vision and audio to evaluate problem-solving processes, sketches, and oral explanations — not just final answers.</div>
            <Button onClick={() => triggerToast("Multimodal analysis complete — Rich diagnostic profile generated")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              Analyze Student Work Sample
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Ownership + Marketplace + Localized Tuning */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Globe className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Market-Differentiating Architecture (Moat vs Giants)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Data Ownership & Portability</div>
              <p className="text-sm text-white/80 mb-4">True data sovereignty. Districts can export their full AI history and workflows if they ever leave. Builds deep trust.</p>
              <Button onClick={() => triggerToast("Full data export package generated — Standard format ready")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Export District Data
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Open LTI/API Marketplace</div>
              <p className="text-sm text-white/80 mb-4">Third-party tools plug in. EdIntel takes commission on every transaction — becoming the App Store for K-12.</p>
              <Button onClick={() => triggerToast("Marketplace commission engine activated")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Localized Model Tuning</div>
              <p className="text-sm text-white/80 mb-4">Districts can fine-tune the AI on their own curriculum and historical data — something generic models cannot match.</p>
              <Button onClick={() => triggerToast("Model fine-tuned on district-specific data")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                Tune Model on District Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue & Indispensability Summary */}
      <div className="bg-white/[0.03] border border-[#C5A46E]/40 rounded-3xl p-8 text-center">
        <div className="text-sm text-[#C5A46E] mb-2">REVENUE & INDISPENSABILITY STRATEGY</div>
        <div className="text-2xl font-semibold tracking-tight">Stop selling AI features.<br />Start selling the end of administrative burnout and budget guesswork.</div>
        <p className="mt-4 text-white/70">When EdIntel prevents lawsuits, saves $1M in budget waste, and proves its own ROI to the board every month, it becomes institutionalized.</p>
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
