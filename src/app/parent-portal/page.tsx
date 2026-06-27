'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ParentPortalPage() {
  const children = [
    {
      name: 'Liam Thompson',
      grade: '4th Grade',
      teacher: 'Ms. Rivera',
      status: 'On Track',
      literacyGrowth: 78,
      lastUpdate: 'Today',
    },
    {
      name: 'Sophia Kim',
      grade: '4th Grade',
      teacher: 'Ms. Rivera',
      status: 'Making Progress',
      literacyGrowth: 65,
      lastUpdate: 'Yesterday',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Parent Portal</h1>
          <p className="text-white/70 mt-1">Welcome back, Dr. West. Here’s how your children are doing.</p>
        </div>

        {/* Children Overview */}
        <div className="space-y-6">
          {children.map((child, index) => (
            <Card key={index} className="bg-white/[0.03] border-white/10">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{child.name}</CardTitle>
                  <p className="text-white/60">{child.grade} • {child.teacher}</p>
                </div>
                <Badge 
                  className={
                    child.status === 'On Track' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                  }
                >
                  {child.status}
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Literacy Growth */}
                  <div>
                    <p className="text-sm text-white/60 mb-1">Literacy Growth</p>
                    <div className="text-4xl font-semibold">{child.literacyGrowth}%</div>
                    <p className="text-emerald-400 text-sm mt-1">↑ 8% since last month</p>
                  </div>

                  {/* Key Areas */}
                  <div>
                    <p className="text-sm text-white/60 mb-2">Key Areas</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Phonics</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fluency</span>
                        <span className="font-medium">71%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comprehension</span>
                        <span className="font-medium">76%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <p className="text-sm text-white/60 mb-2">Recent Activity</p>
                    <div className="text-sm text-white/80">
                      <p>Tiffany-ED generated feedback on main idea</p>
                      <p className="text-white/50 text-xs mt-1">Updated {child.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          This is a secure view. All data is protected under FERPA.
        </p>
      </div>
    </div>
  );
}
