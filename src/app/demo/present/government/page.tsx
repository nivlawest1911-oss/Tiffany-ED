'use client';

import React, { useState } from 'react';
import { Scale, Building2, Landmark, Users, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const governmentLayers = [
  {
    level: "Federal",
    icon: Landmark,
    items: [
      { name: "U.S. Department of Education", status: "Active", desc: "ESSA, Title I, IDEA compliance monitoring" },
      { name: "Federal Policy Agent", status: "Active", desc: "Tracks national education policy changes" },
    ],
  },
  {
    level: "State",
    icon: Building2,
    items: [
      { name: "Alabama State Department of Education", status: "Active", desc: "Alabama Literacy Act, ALSDE reporting" },
      { name: "State Education Agency Agent", status: "Active", desc: "State funding formulas & accountability" },
    ],
  },
  {
    level: "Local / District",
    icon: Users,
    items: [
      { name: "Mobile County Public Schools", status: "Active", desc: "Local compliance, funding, and outcomes" },
      { name: "Local District Compliance Agent", status: "Active", desc: "Board reporting + audit readiness" },
    ],
  },
];

export default function GovernmentPolicy() {
  const [showToast, setShowToast] = useState(false);

  const trigger = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
            <Scale className="h-7 w-7 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Government & Policy Layer</h1>
        </div>
        <p className="text-white/70">EdIntel Sovereign connects federal, state, and local education governance with real-time intelligence.</p>
      </div>

      {governmentLayers.map((layer, index) => {
        const Icon = layer.icon;
        return (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-3 px-1">
              <Icon className="h-5 w-5 text-[#C5A46E]" />
              <h2 className="text-xl font-semibold tracking-tight">{layer.level}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layer.items.map((item, i) => (
                <Card key={i} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge className="border-emerald-500/40 text-emerald-400">{item.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/70 mb-4">{item.desc}</p>
                    <Button onClick={trigger} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
                      <Play className="h-4 w-4 mr-2" /> Trigger Agent
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <CheckCircle className="h-4 w-4" /> Government agent action simulated
        </div>
      )}
    </div>
  );
}
