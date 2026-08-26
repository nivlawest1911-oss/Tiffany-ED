'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ClassesPageClient() {
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">My Classes</h1>
            <p className="text-white/70 mt-1">Manage your assigned classes and student groups</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            Create Class
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="bg-white/[0.03] border-white/10 hover:border-white/20 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{cls.name}</CardTitle>
                    <p className="text-sm text-white/60 mt-1">{cls.grade}</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {cls.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Enrolled Students:</span>
                  <span className="font-semibold">{cls.students}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Last Activity:</span>
                  <span className="text-white/80">{cls.lastActivity}</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`/classes/${cls.id}`}>View Details</a>
                  </Button>
                  <Button size="sm" className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]">
                    Launch Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
