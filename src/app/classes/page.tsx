'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MyClassesPage() {
  const classes = [
    {
      id: '1',
      name: '4th Grade ELA',
      students: 28,
      grade: '4th Grade',
      lastActivity: 'Today',
      status: 'Active',
    },
    {
      id: '2',
      name: '4th Grade Reading Intervention',
      students: 12,
      grade: '4th Grade',
      lastActivity: 'Yesterday',
      status: 'Active',
    },
    {
      id: '3',
      name: '5th Grade ELA',
      students: 31,
      grade: '5th Grade',
      lastActivity: '2 days ago',
      status: 'Active',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">My Classes</h1>
            <p className="text-white/70 mt-1">Manage your classes and student groups</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Create New Class
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card 
              key={cls.id} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{cls.name}</CardTitle>
                    <p className="text-white/60 text-sm mt-1">{cls.grade}</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {cls.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-semibold">{cls.students}</p>
                    <p className="text-sm text-white/60">Students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50">Last activity</p>
                    <p className="text-sm text-white/80">{cls.lastActivity}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">View Class</Button>
                  <Button variant="outline" className="flex-1">Manage Groups</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          Classes are automatically synced with your connected LTI platforms.
        </p>
      </div>
    </div>
  );
}
