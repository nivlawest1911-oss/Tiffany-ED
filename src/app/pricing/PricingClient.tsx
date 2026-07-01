'use client';

import React, { useState } from 'react';
import { DollarSign, CheckCircle, ArrowRight, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: "Essential",
    price: "$4,800",
    period: "/year",
    target: "Small schools & departments",
    sessions: "2,500 Intelligent Differentiation Sessions",
    features: ["Core Tiffany-ED access", "Basic progress monitoring", "Standard support", "FERPA-compliant audit logs"],
  },
  {
    name: "Professional",
    price: "$18,000",
    period: "/year",
    target: "Mid-size district departments",
    sessions: "12,000 Intelligent Differentiation Sessions",
    features: ["Everything in Essential", "Advanced grouping & analytics", "Priority support", "Real-time usage dashboard", "Committed Use Discount available"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    target: "Full district-wide rollout",
    sessions: "Unlimited sessions + dedicated success manager",
    features: ["Everything in Professional", "Custom integrations (LTI, SIS)", "Dedicated success manager", "On-site training", "Highest committed-use discounts", "Sovereign Agent priority access"],
  },
];

export default function PricingClient() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-3xl bg-[#C5A46E]/10">
              <DollarSign className="h-10 w-10 text-[#C5A46E]" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Hybrid usage-based model designed for schools. Predictable base + automatic scaling with your success.
          </p>
          <p className="mt-3 text-sm text-[#C5A46E]">Primary Metric: Intelligent Differentiation Sessions (Tiffany-ED)</p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <Card key={index} className={`bg-white/[0.03] border-white/10 rounded-3xl flex flex-col ${tier.popular ? 'ring-2 ring-[#C5A46E]/60' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl">{tier.name}</CardTitle>
                  {tier.popular && <Badge className="bg-[#C5A46E] text-[#0A0F1C]">Most Popular</Badge>}
                </div>
                <div className="mt-6">
                  <span className="text-6xl font-semibold tracking-tighter">{tier.price}</span>
                  <span className="text-white/60 ml-1 text-xl">{tier.period}</span>
                </div>
                <p className="text-[#C5A46E] mt-1">{tier.sessions}</p>
                <p className="text-sm text-white/60 mt-1">{tier.target}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 text-sm flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#C5A46E] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => window.location.href = '/login?demo=true'}
                  className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl py-6 text-base font-medium"
                >
                  Start 30-Day Free Trial <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guardrails */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-4">
            <Shield className="h-8 w-8 text-[#C5A46E]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Built-in Trust Guardrails</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Spending Caps", desc: "Districts set hard limits. No surprise bills." },
              { title: "Real-Time Dashboard", desc: "Full transparency on usage at all times." },
              { title: "Milestone Alerts", desc: "Automatic notifications at 75% and 90% usage." },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="font-semibold text-lg mb-2">{item.title}</div>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/login?demo=true'}
            size="lg"
            className="bg-white text-[#0A0F1C] hover:bg-white/90 px-12 py-7 rounded-2xl font-medium active:scale-[0.985] transition-all"
          >
            Start Your District Trial <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
