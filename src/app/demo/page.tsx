'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, TrendingUp, AlertTriangle, 
  Calendar, Award, Clock, Search, Bell, User, LogOut, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// ============================================
// DEMO PAGE - EdIntel Sovereign
// Premium gold aesthetic for board presentation
// ============================================

export default function DemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);

  const exitDemo = () => {
    sessionStorage.removeItem('demoMode');
    window.location.href = '/login';
  };

  const handleQuickAction = (action: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {/* ========== DEMO MODE BANNER ========== */}
      <div className="sticky top-0 z-50 w-full bg-[#C5A46E]/10 border-b border-[#C5A46E]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#C5A46E]">
              <Award className="h-4 w-4" />
              <span className="font-semibold tracking-[2px] text-sm">DEMO MODE</span>
            </div>
            <span className="text-white/50 text-sm">• All data is simulated for presentation</span>
          </div>
          
          <Button 
            onClick={exitDemo}
            variant="outline"
            size="sm"
            className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 hover:text-[#C5A46E] flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Exit Demo Mode
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        {/* ========== SIDEBAR ========== */}
        <div className="w-72 border-r border-white/10 bg-[#0A0F1C] flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C5A46E] flex items-center justify-center">
                <span className="text-[#0A0F1C] font-bold text-xl tracking-[-1px]">E</span>
              </div>
              <div>
                <div className="font-semibold text-xl tracking-tight">EdIntel</div>
                <div className="text-[10px] text-white/50 -mt-1">SOVEREIGN</div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3 space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Users, label: 'Students' },
              { icon: BookOpen, label: 'Classes' },
              { icon: TrendingUp, label: 'Progress' },
              { icon: AlertTriangle, label: 'Interventions' },
              { icon: Award, label: 'Reports' },
              { href: '/demo/compliance', label: 'Compliance', icon: ShieldCheck },
              { icon: Calendar, label: 'Calendar' },
            ].map((item, index) => (
              <div 
                key={index}
                onClick={() => { if (item.href) window.location.href = item.href; }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all cursor-pointer
                  ${item.active 
                    ? 'bg-white/5 text-white border border-[#C5A46E]/30' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-[#C5A46E]/20 flex items-center justify-center">
                <User className="h-4 w-4 text-[#C5A46E]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Dr. Alvin West</div>
                <div className="text-[10px] text-white/50">Mobile County • Superintendent</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <div className="h-16 border-b border-white/10 bg-[#0A0F1C]/95 backdrop-blur-xl flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xl font-semibold tracking-tight">Good morning, Dr. West</div>
                <div className="text-xs text-white/50">Monday, June 29, 2026 • Mobile County Public Schools</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search students, classes, or reports..."
                  className="pl-11 bg-white/5 border-white/10 focus:border-[#C5A46E]/40 h-10 rounded-2xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                <div className="text-right">
                  <div className="text-sm font-medium">Dr. Alvin West</div>
                  <div className="text-[10px] text-white/50">Superintendent</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C5A46E]/20 flex items-center justify-center ring-1 ring-[#C5A46E]/30">
                  <User className="h-4 w-4 text-[#C5A46E]" />
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto p-8 space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Students On Track", value: "87%", change: "+4.2%", icon: Users, color: "#C5A46E" },
                { label: "Tier 2/3 Interventions", value: "312", change: "-18", icon: AlertTriangle, color: "#C5A46E" },
                { label: "Avg Literacy Growth", value: "+13.8%", change: "+2.1%", icon: TrendingUp, color: "#C5A46E" },
                { label: "Active AI Sessions", value: "1,284", change: "Today", icon: Award, color: "#C5A46E" },
              ].map((metric, index) => (
                <Card key={index} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all rounded-3xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-white/60">{metric.label}</p>
                        <p className="text-4xl font-semibold tracking-tighter mt-2">{metric.value}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#C5A46E]/10">
                        <metric.icon className="h-5 w-5 text-[#C5A46E]" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-medium">{metric.change}</span>
                      <span className="text-white/40">from last week</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-lg font-semibold tracking-tight">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Generate Differentiation", icon: BookOpen },
                  { label: "Run AI Grouping", icon: Users },
                  { label: "Create Progress Report", icon: TrendingUp },
                  { label: "Review Interventions", icon: AlertTriangle },
                ].map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.label)}
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center gap-3 border-white/10 hover:border-[#C5A46E]/40 hover:bg-white/5 rounded-3xl"
                  >
                    <action.icon className="h-6 w-6 text-[#C5A46E]" />
                    <span className="font-medium text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-3 bg-white/[0.03] border-white/10 rounded-3xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#C5A46E]" /> Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "2 min ago", action: "Tiffany-ED generated differentiated lesson for 4th grade reading", user: "Ms. Thompson" },
                    { time: "14 min ago", action: "AI flagged 7 students for Tier 2 literacy support", user: "System" },
                    { time: "47 min ago", action: "Progress report exported for Mobile County Board", user: "Dr. West" },
                    { time: "1h ago", action: "New student data imported from Clever", user: "Admin" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xs text-white/50 w-16 shrink-0 pt-0.5">{item.time}</div>
                      <div className="flex-1">
                        <div className="text-sm">{item.action}</div>
                        <div className="text-xs text-white/50 mt-1">by {item.user}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="lg:col-span-2 bg-white/[0.03] border-white/10 rounded-3xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#C5A46E]" /> AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Science of Reading Alignment</span>
                      <span className="font-mono text-[#C5A46E]">94%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-2 bg-[#C5A46E] rounded-full w-[94%]" />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-sm text-white/70 mb-3">Top Recommendation</div>
                    <div className="text-sm leading-snug">
                      23 students in Grade 3 would benefit from targeted phonics intervention this week.
                    </div>
                    <Button 
                      onClick={() => handleQuickAction('View Recommendations')}
                      className="mt-4 w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl"
                    >
                      View Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-50">
          <Award className="h-4 w-4" />
          Action triggered in demo mode
        </div>
      )}
    </div>
  );
}
