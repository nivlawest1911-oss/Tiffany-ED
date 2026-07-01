'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Shield, Users, Zap, Play, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: "Essential",
    price: "$4,800",
    period: "/year",
    target: "Small schools & departments",
    base: "Platform access + 2,500 sessions",
    features: ["Core Tiffany-ED access", "Basic progress monitoring", "Standard support", "FERPA-compliant audit logs"],
    color: "border-white/20",
  },
  {
    name: "Professional",
    price: "$18,000",
    period: "/year",
    target: "Mid-size district departments",
    base: "Platform access + 12,000 sessions",
    features: ["Everything in Essential", "Advanced grouping & analytics", "Priority support", "Real-time usage dashboard", "Committed Use Discount available"],
    color: "border-[#C5A46E]/60",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    target: "Full district-wide rollout",
    base: "Unlimited sessions + dedicated success manager",
    features: ["Everything in Professional", "Custom integrations (LTI, SIS)", "Dedicated success manager", "On-site training", "Highest committed-use discounts", "Sovereign Agent priority access"],
    color: "border-[#C5A46E]",
  },
];

export default function PricingStrategy() {
  const [sessions, setSessions] = useState(8500);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const simulateGrowth = () => {
    const newSessions = Math.min(25000, Math.floor(sessions * 1.35));
    setSessions(newSessions);
    triggerToast(`District success simulated — ${newSessions.toLocaleString()} Intelligent Differentiation Sessions this month`);
  };

  const currentTier = sessions <= 2500 ? "Essential" : sessions <= 12000 ? "Professional" : "Enterprise";
  const estimatedMonthly = Math.round((sessions / 12) * 1.8); // simplified token value

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header + Narrative */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <DollarSign className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign Pricing Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel’s hybrid usage-based model surpasses Alphabet’s Google Cloud approach by combining predictable base revenue with automatic upside from district success — while protecting schools from bill shock through intelligent guardrails.
        </p>
        <div className="mt-2 text-sm text-[#C5A46E]">
          Primary Value Metric: <span className="font-medium">Intelligent Differentiation Sessions</span> (Tiffany-ED powered)
        </div>
      </div>

      {/* Live Revenue Simulator */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-white/50">LIVE REVENUE SIMULATOR</div>
            <div className="text-3xl font-semibold tracking-tighter mt-1">Mobile County Public Schools</div>
          </div>
          <Button 
            onClick={simulateGrowth}
            className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] text-[#0A0F1C] rounded-2xl px-8 py-6 text-base"
          >
            <Play className="h-4 w-4 mr-2" /> Simulate District Growth (End of Semester)
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">CURRENT TIER</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">{currentTier}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">INTELLIGENT DIFFERENTIATION SESSIONS (MTD)</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">{sessions.toLocaleString()}</div>
            <div className="text-emerald-400 text-sm mt-1">+35% from last month</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">ESTIMATED MONTHLY USAGE VALUE</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1">${estimatedMonthly.toLocaleString()}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
            <div className="text-xs text-white/50">PROJECTED ANNUAL REVENUE</div>
            <div className="text-4xl font-semibold tracking-tighter mt-1 text-[#C5A46E]">${Math.round(estimatedMonthly * 12 / 1000)}K</div>
            <div className="text-emerald-400 text-sm mt-1">Scales automatically with success</div>
          </div>
        </div>
      </div>

      {/* Value-Based Tiers */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <TrendingUp className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Value-Based Hybrid Tiers</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <Card key={index} className={`bg-white/[0.03] border ${tier.color} rounded-3xl flex flex-col ${tier.popular ? 'ring-1 ring-[#C5A46E]/40' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <p className="text-sm text-white/60 mt-1">{tier.target}</p>
                  </div>
                  {tier.popular && <Badge className="bg-[#C5A46E] text-[#0A0F1C]">Most Popular</Badge>}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-semibold tracking-tighter">{tier.price}</span>
                  <span className="text-white/60 ml-1">{tier.period}</span>
                </div>
                <p className="text-sm text-[#C5A46E] mt-1">{tier.base}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 text-sm flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#C5A46E] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => triggerToast(`${tier.name} tier selected — Committed Use Discount applied`)}
                  className="w-full mt-6 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl"
                >
                  Select {tier.name} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Guardrails Section */}
      <div>
        <div className="flex items-center gap-3 mb-5 px-1">
          <Shield className="h-5 w-5 text-[#C5A46E]" />
          <h2 className="text-xl font-semibold tracking-tight">Trust Guardrails (Prevents Churn)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: "Spending Caps", desc: "Districts set hard monthly/annual limits. No bill shock. Automatic upgrade prompts at 75% and 90%." },
            { title: "Real-Time Usage Dashboard", desc: "Transparent portal showing sessions used vs. budget. Teachers and admins always know where they stand." },
            { title: "Usage Milestone Alerts", desc: "Automated notifications + human outreach at 75% and 90%. Turns potential friction into natural expansion conversations." },
          ].map((item, i) => (
            <Card key={i} className="bg-white/[0.03] border-white/10 rounded-3xl">
              <CardContent className="p-6">
                <div className="font-semibold text-lg mb-2">{item.title}</div>
                <p className="text-sm text-white/80">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Land & Expand Narrative */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-[#C5A46E]" />
          <h3 className="text-xl font-semibold tracking-tight">Land & Expand Flywheel (Alphabet-Grade Scalability)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-medium text-[#C5A46E] mb-1">LAND (30-Day Trial)</div>
            <p>Zero friction entry. Teachers experience instant “aha” within first differentiation session. Low-risk adoption for the district.</p>
          </div>
          <div>
            <div className="font-medium text-[#C5A46E] mb-1">EXPAND (Usage = Success)</div>
            <p>As more teachers adopt and generate more Intelligent Differentiation Sessions, revenue scales automatically. No re-selling required.</p>
          </div>
          <div>
            <div className="font-medium text-[#C5A46E] mb-1">RETENTION (Guardrails + Value)</div>
            <p>Predictable base + transparent usage + proven outcomes = extremely low churn. Districts stay because the platform gets more valuable every semester.</p>
          </div>
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
