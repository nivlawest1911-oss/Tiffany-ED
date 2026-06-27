'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function InterventionsPage() {
  const [interventions] = useState([
    {
      id: '1',
      student: 'Liam Thompson',
      tier: 'Tier 2',
      focus: 'Reading Fluency',
      startDate: 'May 12, 2026',
      progress: 'Improving',
      sessions: 14,
    },
    {
      id: '2',
      student: 'Ava Martinez',
      tier: 'Tier 3',
      focus: 'Phonics & Decoding',
      startDate: 'April 28, 2026',
      progress: 'Stable',
      sessions: 22,
    },
    {
      id: '3',
      student: 'Sophia Kim',
      tier: 'Tier 2',
      focus: 'Comprehension Strategies',
      startDate: 'May 5, 2026',
      progress: 'Improving',
      sessions: 11,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Interventions</h1>
            <p className="text-white/70 mt-1">Manage Tier 2 and Tier 3 student interventions</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Create New Intervention
          </Button>
        </div>

        {/* Interventions List */}
        <div className="space-y-4">
          {interventions.map((item) => (
            <Card key={item.id} className="bg-white/[0.03] border-white/10">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{item.student}</h3>
                    <Badge 
                      className={
                        item.tier === 'Tier 2' 
                          ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30' 
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }
                    >
                      {item.tier}
                    </Badge>
                  </div>
                  <p className="text-white/70">Focus: {item.focus}</p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm">
                  <div>
                    <p className="text-white/60">Started</p>
                    <p className="font-medium">{item.startDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Sessions</p>
                    <p className="font-medium">{item.sessions}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Progress</p>
                    <p className={`font-medium ${item.progress === 'Improving' ? 'text-emerald-400' : 'text-white'}`}>
                      {item.progress}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">Update</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
