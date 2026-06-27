'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentGroupingPage() {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const groups = [
    {
      id: '1',
      name: 'Tier 1 - Advanced Readers',
      tier: 'Tier 1',
      students: 12,
      avgGrowth: '+18%',
      focus: 'Comprehension & Vocabulary',
      color: 'emerald',
    },
    {
      id: '2',
      name: 'Tier 1 - On Track',
      tier: 'Tier 1',
      students: 9,
      avgGrowth: '+11%',
      focus: 'Fluency Maintenance',
      color: 'emerald',
    },
    {
      id: '3',
      name: 'Tier 2 - Targeted Support',
      tier: 'Tier 2',
      students: 7,
      avgGrowth: '+7%',
      focus: 'Phonics & Decoding',
      color: 'gold',
    },
    {
      id: '4',
      name: 'Tier 3 - Intensive Intervention',
      tier: 'Tier 3',
      students: 4,
      avgGrowth: '+4%',
      focus: 'Foundational Skills',
      color: 'red',
    },
  ];

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      alert('New groups generated successfully based on latest assessment data.');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Student Grouping</h1>
            <p className="text-white/70 mt-1">AI-powered groups based on Science of Reading data</p>
          </div>
          <Button 
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
          >
            {isRegenerating ? 'Regenerating...' : 'Regenerate Groups'}
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">4</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students Grouped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">32 / 32</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">94%</div>
              <p className="text-emerald-400 text-sm mt-1">Based on latest data</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">Today</div>
              <p className="text-white/60 text-sm">Jun 26, 2026 • 9:41 AM</p>
            </CardContent>
          </Card>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => (
            <Card 
              key={group.id} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl leading-tight">{group.name}</CardTitle>
                    <p className="text-sm text-white/60 mt-1">{group.focus}</p>
                  </div>
                  <Badge 
                    className={
                      group.tier === 'Tier 1' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : group.tier === 'Tier 2' 
                        ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30' 
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }
                  >
                    {group.tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-4xl font-semibold">{group.students}</p>
                    <p className="text-sm text-white/60">Students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">{group.avgGrowth}</p>
                    <p className="text-xs text-white/60">Avg Growth</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">View Students</Button>
                  <Button variant="outline" className="flex-1">Edit Group</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          Groups are automatically updated when new assessment data is synced.
        </p>
      </div>
    </div>
  );
}
