'use client';

import React, { useState } from 'react';
import { 
  Brain, AlertTriangle, TrendingUp, Users, Shield, Zap, 
  Play, CheckCircle, ArrowRight 
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
          <h1 className="text-3xl font-semibold tracking-tight">Sovereign District Brain Command</h1>
        </div>
        <p className="text-white/70 max-w-4xl text-lg">
          EdIntel evolves into the <span className="font-semibold text-[#C5A46E]">Educational AI Operating System</span> — 
          the Single Source of Truth that eliminates data silos, automates workflows, predicts resource needs, and becomes indispensable to district operations.
        </p>
      </div>

      {/* SIS Integration Status */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/50">DATA ORCHESTRATION LAYER</div>
            <div className="text-xl font-semibold mt-1">SIS + LMS Integration Status</div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400">Priority Sprint Item</Badge>
        </div>
        <div className="mt-4 text-sm text-white/80">
          Currently simulated in demo. Production implementation requires secure OAuth + API connections to PowerSchool, Infinite Campus, Canvas, and Google Classroom.
          This is the highest-leverage next engineering priority.
        </div>
      </div>

      {/* Intelligent Data Orchestration + Workflow Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#C5A46E]" /> Intelligent Data Orchestration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Real-time ingestion from SIS (PowerSchool, Infinite Campus) + LMS (Canvas, Google Classroom).</div>
            <div>Automatic alerts when enrollment drops → finance impact flagged instantly.</div>
            <Button onClick={() => triggerToast("SIS ingestion pipeline simulated — Production sprint ready")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl mt-2">
              Simulate Live SIS Sync
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#C5A46E]" /> Autonomous Workflow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Automatically generates reporting and compliance logs sent directly to state boards.</div>
            <div>Predictive HR workflows identifying teacher burnout risks and reallocating resources proactively.</div>
          </CardContent>
        </Card>
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
