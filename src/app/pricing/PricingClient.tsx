'use client';

import React, { useState } from 'react';
import { DollarSign, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const educatorTiers = [
  {
    name: 'Free',
    price: '$0',
    monthlyPrice: '$0',
    annualPrice: '$0',
    period: '/mo',
    target: 'Trial & light use',
    sessions: '20 sessions/mo',
    features: ['Tiffany-ED basic', 'Limited exports (Watermarked)'],
    cta: 'Start free',
    href: '/signup?plan=free',
    priceId: ''
  },
  {
    name: 'Teacher',
    price: '$24',
    monthlyPrice: '$24',
    annualPrice: '$192',
    period: '/mo',
    target: 'Classroom teacher',
    sessions: '200 sessions/mo',
    features: ['Tiffany-ED + Lesson Planner', 'Basic grouping', 'Email support'],
    cta: 'Subscribe',
    href: '#', // Handled by onClick
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEACHER_MONTH || 'price_teacher_month_placeholder',
    priceIdAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEACHER_YEAR || 'price_teacher_year_placeholder',
  },
  {
    name: 'Teacher Pro',
    price: '$49',
    monthlyPrice: '$49',
    annualPrice: '$396',
    period: '/mo',
    target: 'Coaches, dept leads, heavy users',
    sessions: '600 sessions/mo',
    features: ['Everything in Teacher', 'IEP Architect', 'Cognitive tools', 'Priority queue', 'Usage history'],
    popular: true,
    cta: 'Subscribe',
    href: '#', // Handled by onClick
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTH || 'price_pro_month_placeholder',
    priceIdAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEAR || 'price_pro_year_placeholder',
  },
];

const districtTiers = [
  {
    name: 'Essential',
    price: '$4,800',
    period: '/year',
    target: 'Small schools & departments',
    sessions: '2,500 Intelligent Differentiation Sessions',
    perSession: '~$1.92 per session',
    features: ['Tiffany-ED sessions', 'Lesson Planner', 'Standard support'],
    cta: 'Start 30-Day Free Trial',
    href: '/login?demo=true'
  },
  {
    name: 'Team',
    price: '$8,400',
    period: '/year',
    target: 'Medium schools & teams',
    sessions: '5,000 Intelligent Differentiation Sessions',
    perSession: '~$1.68 per session',
    features: ['Everything in Essential', 'IEP Architect', 'Priority support'],
    cta: 'Start 30-Day Free Trial',
    href: '/login?demo=true'
  },
  {
    name: 'Professional',
    price: '$18,000',
    period: '/year',
    target: 'Mid-size district departments',
    sessions: '12,000 Intelligent Differentiation Sessions',
    perSession: '~$1.50 per session',
    features: ['Everything in Team', 'Grouping & analytics', 'Real-time usage dashboard', 'Committed Use Discount available'],
    popular: true,
    cta: 'Start 30-Day Free Trial',
    href: '/login?demo=true'
  },
  {
    name: 'Enterprise',
    price: 'From $36,000',
    period: '/year',
    target: 'Full district-wide rollout',
    sessions: 'Unlimited sessions + dedicated success manager',
    perSession: 'Contact for volume pricing',
    features: ['Everything in Professional', 'LTI / SSO integrations', 'FERPA-compliant audit logs', 'Dedicated success manager', 'Highest committed-use discounts', 'Sovereign Agent priority access'],
    cta: 'Contact Sales',
    href: 'mailto:sales@edintel.com'
  },
];

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (tier: any) => {
    if (tier.name === 'Free') {
        window.location.href = tier.href;
        return;
    }
    
    setIsLoading(true);
    try {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                plan: tier.name === 'Teacher Pro' ? 'pro_teacher' : 'teacher',
                isAnnual
            })
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error(data.error);
        }
    } catch(e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-3xl bg-[#C5A46E]/10">
              <DollarSign className="h-10 w-10 text-[#C5A46E]" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Hybrid usage-based model designed for educators and schools. Predictable base + automatic scaling with your success.
          </p>
        </div>

        <Tabs defaultValue="educators" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-14">
              <TabsTrigger value="educators" className="rounded-xl px-8 text-base data-[state=active]:bg-[#C5A46E] data-[state=active]:text-[#0A0F1C] transition-all">For Educators</TabsTrigger>
              <TabsTrigger value="districts" className="rounded-xl px-8 text-base data-[state=active]:bg-[#C5A46E] data-[state=active]:text-[#0A0F1C] transition-all">For Schools & Districts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="educators" className="mt-0">
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-white/60'}`}>Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`text-sm ${isAnnual ? 'text-white' : 'text-white/60'}`}>Annually <span className="text-[#C5A46E] text-xs font-medium ml-1">(Save ~20%)</span></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto">
              {educatorTiers.map((tier, index) => (
                <Card key={index} className={`bg-white/[0.03] border-white/10 rounded-3xl flex flex-col ${tier.popular ? 'ring-2 ring-[#C5A46E]/60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      {tier.popular && <Badge className="bg-[#C5A46E] text-[#0A0F1C] text-xs">Most Popular</Badge>}
                    </div>
                    <div className="mt-6 flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-semibold tracking-tighter">
                          {tier.name === 'Free' ? tier.price : (isAnnual ? tier.annualPrice : tier.monthlyPrice)}
                        </span>
                        <span className="text-white/60 ml-1 text-lg">{isAnnual && tier.name !== 'Free' ? '/year' : '/mo'}</span>
                      </div>
                      {isAnnual && tier.name !== 'Free' && (
                          <span className="text-[#C5A46E] text-sm mt-1">Effective {tier.name === 'Teacher' ? '$16/mo' : '$33/mo'}</span>
                      )}
                    </div>
                    <p className="text-[#C5A46E] mt-4 text-sm font-medium">{tier.sessions}</p>
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
                      onClick={() => handleSubscribe(tier)}
                      disabled={isLoading}
                      className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl py-6 text-base font-medium"
                    >
                      {tier.cta} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mb-20 text-white/60 text-sm">
                <p>1 Tiffany-ED generate = 1 session.</p>
                <p className="mt-2 text-xs">Your school might already cover this — <a href="#districts" onClick={(e) => { e.preventDefault(); document.querySelector('[value="districts"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true})); }} className="text-[#C5A46E] underline underline-offset-4">ask admin or view district pricing</a>.</p>
            </div>
          </TabsContent>

          <TabsContent value="districts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
              {districtTiers.map((tier, index) => (
                <Card key={index} className={`bg-white/[0.03] border-white/10 rounded-3xl flex flex-col ${tier.popular ? 'ring-2 ring-[#C5A46E]/60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      {tier.popular && <Badge className="bg-[#C5A46E] text-[#0A0F1C] text-xs">Most Popular</Badge>}
                    </div>
                    <div className="mt-6 flex flex-col">
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-semibold tracking-tighter">{tier.price}</span>
                        <span className="text-white/60 ml-1 text-lg">{tier.period}</span>
                      </div>
                      <span className="text-white/40 text-sm mt-1">{tier.perSession}</span>
                    </div>
                    <p className="text-[#C5A46E] mt-4 text-sm font-medium">{tier.sessions}</p>
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
                      onClick={() => window.location.href = tier.href}
                      className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl py-6 text-base font-medium"
                    >
                      {tier.cta} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-20 text-white/60 text-sm">
              <p>Example District Math: A 500-teacher district buying Professional ($18k) = $36/teacher/year.</p>
              <p className="mt-1 text-xs opacity-75">* A session is defined as one complete interaction loop (plan generation, feedback, and refinement) with Tiffany-ED.</p>
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
            
            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/login?demo=true'}
                size="lg"
                className="bg-white text-[#0A0F1C] hover:bg-white/90 px-12 py-7 rounded-2xl font-medium active:scale-[0.985] transition-all"
              >
                Start Your District Trial <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
