'use client';

import React, { useState } from 'react';
import { 
  Brain, TrendingUp, Shield, Users, Zap, Award, Globe, 
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
          EdIntel as the <span className="font-semibold text-[#C5A46E]">Educational AI Operating System</span> — 
          the indispensable Digital Twin that solves resource scarcity, administrative burnout, and blind spots in student performance.
        </p>
        <div className="mt-2">
          <Badge className="bg-orange-500/10 text-orange-400">SIS Integration (PowerSchool / Infinite Campus) — Priority Sprint Item</Badge>
        </div>
      </div>

      {/* Predictive Resource Optimizer + Autonomous Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#C5A46E]" /> Predictive Staffing & Resource Optimizer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Analyzes enrollment, attrition, and performance data to forecast hiring needs, class-size imbalances, and facility usage weeks in advance.</div>
            <Button onClick={() => triggerToast("Predictive analysis complete — $680k potential savings identified for next semester")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              Run Predictive Staffing Forecast
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C5A46E]" /> Autonomous Compliance Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Monitors state-specific IEP/504 mandates in real time. Auto-drafts compliant progress reports and alerts staff to deadlines — dramatically reducing legal risk.</div>
            <Button onClick={() => triggerToast("IEP progress report auto-drafted and compliance verified")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              Generate Sample IEP Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment & Safety + Multimodal Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#C5A46E]" /> Proactive Wellness & Safety Sensing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Privacy-first sentiment analysis on communication patterns to detect cultural burnout or student safety risks before they escalate.</div>
            <Button onClick={() => triggerToast("Early warning scan complete — 2 proactive interventions recommended")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              Run District Safety Scan
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#C5A46E]" /> Multimodal Assessment Suite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Analyzes not just test scores, but problem-solving processes, sketches, and oral explanations using computer vision and audio processing.</div>
            <Button onClick={() => triggerToast("Multimodal analysis complete — richer diagnostic profile generated")} className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] rounded-2xl">
              Analyze Sample Student Work
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Curriculum Transformer + Academic Passport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Dynamic Curriculum Transformer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>Upload any source material. Instantly generates 5 differentiated versions (Gifted, ESL, Dyslexia, Remedial, Grade-level) while maintaining standards alignment.</div>
            <Button onClick={() => triggerToast("Curriculum transformed into 5 differentiated versions")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              Transform Curriculum
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle>Universal Academic Passport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>A portable, secure, student-owned record of achievement that moves with them across districts, schools, and grades, powered by verified credentials.</div>
            <Button onClick={() => triggerToast("Universal Academic Passport updated and verified")} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E]">
              View Academic Passport
            </Button>
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
