'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GlassPanel from '@/components/ui/GlassPanel';
import TimeReclamationCard from '@/components/dashboard/TimeReclamationCard';
import NeedsAttentionCard from '@/components/dashboard/NeedsAttentionCard';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Good morning, {user?.name || 'Executive'}</h1>
            <p className="text-white/70 mt-1">{user?.email || 'District Admin'}</p>
          </div>
          <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 px-4 py-1">
            District Admin
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">48,291</div>
              <p className="text-emerald-400 text-sm mt-1">+312 this month</p>
            </CardContent>
          </GlassPanel>
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">2,184</div>
              <p className="text-emerald-400 text-sm mt-1">+34 this week</p>
            </CardContent>
          </GlassPanel>
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Interactions (30d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-semibold">124,872</div>
              <p className="text-white/60 text-sm mt-1">Traceable & Audited</p>
            </CardContent>
          </GlassPanel>
          <TimeReclamationCard />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40 transition-colors"
              onClick={() => router.push('/tiffany-ed')}
            >
              Open Tiffany-ED
            </Button>
            <Button
              variant="outline"
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40 transition-colors"
              onClick={() => router.push('/grouping')}
            >
              Generate Groups
            </Button>
            <Button
              variant="outline"
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40 transition-colors"
              onClick={() => router.push('/progress')}
            >
              View Progress
            </Button>
            <Button
              variant="outline"
              className="h-20 text-lg border-white/20 hover:border-[#C5A46E]/40 transition-colors"
              onClick={() => router.push('/admin/educator-audit')}
            >
              AI Audit Log
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassPanel className="border-white/10">
            <CardHeader>
              <CardTitle>Recent AI Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Tiffany-ED generated 47 lesson scaffolds</span>
                <span className="text-white/50">Just now</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Smart groups updated for 12 classes</span>
                <span className="text-white/50">2h ago</span>
              </div>
              <div className="flex justify-between">
                <span>Progress reports generated for Lincoln Elementary</span>
                <span className="text-white/50">Yesterday</span>
              </div>
            </CardContent>
          </GlassPanel>
          <NeedsAttentionCard />
        </div>
      </div>
    </div>
  );
}
