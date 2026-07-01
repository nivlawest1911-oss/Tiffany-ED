'use client';

import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Users, Zap, Shield, Globe, 
  Play, CheckCircle, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const alphabetPillars = [
  {
    icon: Zap,
    title: "Product-Led Growth + Aha Moments",
    alphabet: "Google’s freemium → paid conversion engine (Gmail, Drive, Workspace)",
    edintel: "30-day trial → instant 'aha' in Tiffany-ED differentiation or progress monitoring → automatic usage token purchase",
    impact: "Low CAC, high conversion",
  },
  {
    icon: DollarSign,
    title: "Usage Token Economy",
    alphabet: "Google Cloud credits + pay-as-you-go model",
    edintel: "Teachers & districts buy tokens for AI generations, differentiation, grouping, and analytics. Transparent, fair, and scales with value delivered.",
    impact: "High-margin, usage-aligned revenue",
  },
  {
    icon: Users,
    title: "Enterprise + Institutional Contracts",
    alphabet: "Google Workspace for Education + Cloud enterprise deals",
    edintel: "Annual district-wide licenses + overage token bundles. Includes SSO (LTI 1.3), audit logging, and compliance.",
    impact: "Predictable ARR + expansion revenue",
  },
  {
    icon: Shield,
    title: "Autonomous Agent Fleet for Operations",
    alphabet: "Alphabet’s heavy internal use of AI to run operations at massive scale with small teams",
    edintel: "Sovereign Agents handle onboarding, billing, support tickets, churn prediction, and retention outreach — dramatically lowering OpEx.",
    impact: "Lean operations, high margins",
  },
  {
    icon: Globe,
    title: "Global Data Flywheel & Moat",
    alphabet: "Search + YouTube + Android data loop that makes products smarter the more they’re used",
    edintel: "Every lesson generated, every intervention tracked, every outcome measured improves the AI for all users globally while staying FERPA/COPPA compliant.",
    impact: "Defensible moat + compounding value",
  },
  {
    icon: TrendingUp,
    title: "Multi-Stakeholder Ecosystem",
    alphabet: "Android + Play Store + Ads + Cloud connecting users, developers, advertisers, and enterprises",
    edintel: "Teachers, administrators, parents, board members, researchers, and government all interact on one platform. Future add-ons: parent insights, researcher APIs, state compliance modules.",
    impact: "Network effects + new revenue lines",
  },
];

export default function RevenueEngine() {
  const [metrics, setMetrics] = useState({
    arr: 2.4,
    mrr: 204,
    churn: 4.2,
    ltvCac: 8.4,
    districts: 47,
    tokens: 1.28,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const simulateGrowth = () => {
    setMetrics(prev => ({
      arr: Math.round((prev.arr * 1.18) * 10) / 10,
      mrr: Math.round((prev.mrr * 1.18) * 10) / 10,
      churn: Math.max(2.8, Math.round((prev.churn * 0.82) * 10) / 10),
      ltvCac: Math.round((prev.ltvCac * 1.12) * 10) / 10,
      districts: prev.districts + 9,
      tokens: Math.round((prev.tokens * 1.31) * 100) / 100,
    }));
    triggerToast('Next quarter growth simulated — Revenue Engine accelerating');
  };

  const integratePillar = (title: string) => {
    triggerToast(`${title} pattern integrated into Sovereign OS`);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header + Narrative */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <DollarSign className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Revenue Engine</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel applies Alphabet’s most powerful business patterns — product-led growth, usage economics, 
          autonomous operations, and data flywheels — to build a highly scalable, high-margin education operating system.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#C5A46E]">
          <span>Built for global scale • Local compliance • Sustainable profitability</span>
        </div>
      </div>

      {/* Live Metrics Dashboard */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-white/50">LIVE BUSINESS METRICS</div>
            <div className="text-2xl font-semibold tracking-tight">Sovereign Fleet Performance</div>
          </div>
          <Button 
            onClick={simulateGrowth}
            className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] transition-all text-[#0A0F1C] rounded-2xl font-medium px-6"
          >
            <Play className="h-4 w-4 mr-2" /> Simulate Next Quarter Growth
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "ARR", value: `$${metrics.arr}M`, change: "+18%" },
            { label: "MRR", value: `$${metrics.mrr}K`, change: "+18%" },
            { label: "Churn Rate", value: `${metrics.churn}%`, change: "-18%" },
            { label: "LTV : CAC", value: `${metrics.ltvCac}x`, change: "+12%" },
            { label: "Active Districts", value: metrics.districts, change: "+9" },
            { label: "Tokens Used (M)", value: metrics.tokens, change: "+31%" },
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
              <div className="text-xs text-white/50">{m.label}</div>
              <div className="text-3xl font-semibold tracking-tighter mt-1">{m.value}</div>
              <div className="text-xs text-emerald-400 mt-1">{m.change} this quarter</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alphabet Pillars Integrated */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Globe className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Alphabet Components Integrated into EdIntel</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {alphabetPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card key={index} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-[#C5A46E]/10 mt-1">
                      <Icon className="h-6 w-6 text-[#C5A46E]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl leading-tight">{pillar.title}</CardTitle>
                      <Badge variant="outline" className="mt-2 border-[#C5A46E]/40 text-[#C5A46E]">
                        {pillar.impact}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-white/50 mb-1">ALPHABET MODEL</div>
                    <p className="text-white/80">{pillar.alphabet}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#C5A46E] mb-1">HOW EDINTEL APPLIES IT</div>
                    <p>{pillar.edintel}</p>
                  </div>
                  <Button 
                    onClick={() => integratePillar(pillar.title)}
                    variant="outline"
                    className="w-full border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl mt-2"
                  >
                    Integrate This Pattern <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Narrative */}
      <div className="text-center text-white/60 text-sm max-w-2xl mx-auto pt-4">
        By combining Alphabet’s operating discipline with deep education domain expertise and global best practices, 
        EdIntel is positioned to become the dominant, high-margin intelligence layer for education worldwide.
      </div>

      <div className="flex justify-end mt-4">
        <Button asChild variant="outline" className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl">
          <a href="/demo/present/strategic-optimization">View Full Strategic Optimization</a>
        </Button>
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
