'use client';

import React, { useState } from 'react';
import { 
  Globe, Database, Award, TrendingUp, Users, Shield, 
  Play, CheckCircle, ArrowRight, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EcosystemGravity() {
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
            <Globe className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Ecosystem Gravity Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel is evolving from a powerful platform into the **infrastructure layer of global education** — 
          creating data gravity, network effects, and ecosystem dependency that rivals the structural advantages of Alphabet.
        </p>
      </div>

      {/* Data Moat (The Core Differentiator) */}
      <div className="bg-white/[0.03] border border-[#C5A46E]/40 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-6 w-6 text-[#C5A46E]" />
          <h2 className="text-2xl font-semibold tracking-tight">EdIntel’s Proprietary Data Moat</h2>
        </div>
        <p className="text-lg text-white/80 mb-4">
          The single piece of information no other platform has at this scale and granularity:
        </p>
        <div className="text-xl font-semibold text-[#C5A46E]">
          Real-time, standards-aligned “Intelligent Differentiation Sessions” directly linked to measurable student progress outcomes — 
          while remaining fully FERPA-compliant and traceable to Alabama Literacy Act requirements.
        </div>
        <p className="mt-4 text-sm text-white/60">
          This is the foundation for high-margin Data Clean Rooms, Predictive Analytics, and Verified Credentials.
        </p>
      </div>

      {/* Ecosystem Gravity Layers */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Globe className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">1. Open Platform & Ecosystem Gravity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#C5A46E]" /> API / LTI Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80 mb-4">
                Third-party publishers, curriculum providers, and developers build on top of EdIntel. 
                EdIntel takes a commission on every transaction in the ecosystem.
              </p>
              <Button onClick={() => triggerToast("Marketplace module activated — Commission engine enabled")} variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E]">
                Activate Marketplace
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#C5A46E]" /> Data Clean Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80 mb-4">
                Secure, anonymized benchmarking environments for researchers, policy institutes, and publishers. 
                High-margin revenue from proprietary education trend data.
              </p>
              <Button onClick={() => triggerToast("Data Clean Room launched — Institutional access enabled")} variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E]">
                Launch Clean Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Multi-Tiered Revenue Engines */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">2. Multi-Tiered Financial Engines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "SaaS Layer", desc: "Predictable base subscription revenue", icon: Shield },
            { title: "Consumption Layer", desc: "Usage-based tokens (Intelligent Differentiation Sessions)", icon: Zap },
            { title: "Verified Credentials", desc: "Blockchain-backed academic records (lifecycle lock-in)", icon: Award },
            { title: "Government Analytics", desc: "State & national outcome dashboards (high-value B2G)", icon: Globe },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-[#C5A46E] mb-4" />
                  <div className="font-semibold text-lg mb-1">{item.title}</div>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Institutional Lock-in + Advanced Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>3. Institutional Hard-Wired Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong>System of Record</strong> — Deep native integration with SIS + LMS so EdIntel becomes impossible to rip out.</div>
            <div><strong>Localized Compliance Engines</strong> — Automatic FERPA / GDPR / CCPA handling for global expansion.</div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>4. Advanced Operational Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong>Predictive Resource Allocation</strong> — AI that recommends budget and personnel shifts before problems appear.</div>
            <div><strong>Inference-as-a-Service</strong> — Sell EdIntel’s education-specialized models to other EdTech companies via API.</div>
          </CardContent>
        </Card>
      </div>

      {/* Flywheel Acquisition */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Users className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">5. Flywheel Acquisition Strategy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Teacher-to-Teacher Viral Loops</div>
              <p className="text-sm text-white/80">Teachers natively share high-quality reports and curriculum, drawing more colleagues into the ecosystem without sales overhead.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
            <CardContent className="p-6">
              <div className="font-semibold mb-2">Data-Driven Upsells</div>
              <p className="text-sm text-white/80">Automated triggers detect when a district is hitting capacity and automatically surface the ROI of upgrading to Enterprise.</p>
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
