'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, GraduationCap, Activity, ShieldCheck, Clock, Sparkles } from 'lucide-react';

function MetricCardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-[140px] animate-pulse flex flex-col justify-between">
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="h-9 bg-white/15 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/3" />
    </div>
  );
}

export default function AdminDashboardClient() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Schedule state update after first paint for smooth mobile LCP
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-4 sm:p-6 md:p-8 selection:bg-[#C5A46E]/30">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Mobile-Optimized Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-3 py-0.5 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46E]" />
                Mobile County Public Schools
              </Badge>
              <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                Site Plan: $79 / Active
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              District Admin Command
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
              Real-time educational intelligence and ALCOS pedagogy analytics across Alabama K-12 school sites.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              30-Day Site Trial Active
            </div>
          </div>
        </div>

        {/* Core Metric Cards Grid with Fixed Aspect Ratios for Zero CLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[580px] sm:min-h-[290px] lg:min-h-[140px]">
          {!isLoaded ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </>
          ) : (
            <>
              <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl h-[140px] flex flex-col justify-between transition-all hover:border-[#C5A46E]/40 contain-content">
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Total District Schools
                  </CardTitle>
                  <Building2 className="w-4 h-4 text-[#C5A46E]" />
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="text-3xl font-bold font-mono tracking-tight text-white">87</div>
                  <p className="text-[11px] text-white/40 mt-1">Mobile County District Network</p>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl h-[140px] flex flex-col justify-between transition-all hover:border-emerald-500/40 contain-content">
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Active Educators
                  </CardTitle>
                  <Users className="w-4 h-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="text-3xl font-bold font-mono tracking-tight text-white">2,184</div>
                  <p className="text-[11px] text-emerald-400 font-medium mt-1">+34 onboarding this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl h-[140px] flex flex-col justify-between transition-all hover:border-sky-500/40 contain-content">
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Enrolled Students
                  </CardTitle>
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="text-3xl font-bold font-mono tracking-tight text-white">48,291</div>
                  <p className="text-[11px] text-white/40 mt-1">Science of Reading & Literacy Act</p>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl h-[140px] flex flex-col justify-between transition-all hover:border-purple-500/40 contain-content">
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Audited AI Interactions
                  </CardTitle>
                  <Activity className="w-4 h-4 text-purple-400" />
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="text-3xl font-bold font-mono tracking-tight text-white">124,872</div>
                  <p className="text-[11px] text-white/40 mt-1">Traceable & FERPA Compliant</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Section 2: Mobile-Responsive Data Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Adoption Overview */}
          <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl p-6 contain-content">
            <CardHeader className="p-0 pb-4 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A46E]" />
                District Adoption Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-white/70">Schools Fully Onboarded</span>
                <span className="font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  71 / 87
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-white/70">Teachers Actively Planning</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  1,642
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-white/70">Parent Portal Registrations</span>
                <span className="font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  19,847
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card className="bg-white/[0.03] border-white/10 backdrop-blur-md rounded-2xl p-6 contain-content">
            <CardHeader className="p-0 pb-4 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A46E]" />
                Recent Administrative Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-white/70">ALCOS Lesson Scaffolds Generated</span>
                <span className="font-mono font-bold text-[#C5A46E]">8,421</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-white/70">Tiered Intervention Groups Formed</span>
                <span className="font-mono font-bold text-[#C5A46E]">1,284</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-white/70">Canvas LTI 1.3 Deep Links Active</span>
                <span className="font-mono font-bold text-emerald-400">Verified</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4 text-center">
          <p className="text-[11px] font-mono text-white/40">
            All AI operations are logged with end-to-end auditability • FERPA & COPPA Compliant • Mobile County Schools
          </p>
        </div>
      </div>
    </div>
  );
}
