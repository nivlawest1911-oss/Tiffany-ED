'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function ActivityLogPage() {
  const [search, setSearch] = useState('');

  const activities = [
    {
      id: 1,
      type: "AI Generation",
      title: "Tiffany-ED generated lesson scaffold",
      user: "Sarah Mitchell",
      time: "Today at 9:14 AM",
      details: "4th Grade ELA • Main Idea & Details",
    },
    {
      id: 2,
      type: "Grouping",
      title: "Smart groups regenerated",
      user: "James Rivera",
      time: "Yesterday at 2:45 PM",
      details: "3rd Grade Reading • 31 students",
    },
    {
      id: 3,
      type: "Login",
      title: "Logged in via Canvas SSO",
      user: "Maria Lopez",
      time: "Yesterday at 8:02 AM",
      details: "District Office",
    },
    {
      id: 4,
      type: "Report",
      title: "Exported Science of Reading Report",
      user: "Dr. Alvin West",
      time: "Mar 12 at 11:30 AM",
      details: "Mobile County District Report",
    },
    {
      id: 5,
      type: "AI Generation",
      title: "Generated rubric feedback",
      user: "Sarah Mitchell",
      time: "Mar 11 at 3:20 PM",
      details: "5 students • Writing Rubric",
    },
  ];

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(search.toLowerCase()) ||
    activity.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Activity Log</h1>
          <p className="text-white/70 mt-1">Track all platform activity across your district</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <Card key={activity.id} className="bg-white/[0.03] border-white/10">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <h3 className="font-semibold">{activity.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm">{activity.details}</p>
                  </div>

                  <div className="text-right text-sm">
                    <p className="text-white/80">{activity.user}</p>
                    <p className="text-white/50 text-xs">{activity.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-white/50 py-10">No activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
