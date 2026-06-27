'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      title: 'Tiffany-ED generated 8 new lesson scaffolds',
      description: 'For 4th Grade ELA - Ms. Rivera’s class',
      time: '2 hours ago',
      type: 'ai',
    },
    {
      id: '2',
      title: 'New student added to Tier 2 intervention',
      description: 'Liam Thompson was moved to Tier 2 reading support',
      time: 'Yesterday',
      type: 'alert',
    },
    {
      id: '3',
      title: 'Weekly Growth Report is ready',
      description: 'Science of Reading progress for your classes',
      time: '2 days ago',
      type: 'report',
    },
    {
      id: '4',
      title: 'Student Grouping completed',
      description: 'New groups generated for 3rd Grade ELA',
      time: '3 days ago',
      type: 'ai',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Notifications</h1>
          <p className="text-white/70 mt-1">Recent activity and updates across your classes</p>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all"
            >
              <CardContent className="p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                    {notification.type === 'ai' && (
                      <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 text-xs">
                        AI
                      </Badge>
                    )}
                    {notification.type === 'alert' && (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                        Alert
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/70 text-sm">{notification.description}</p>
                </div>
                <div className="text-right text-xs text-white/50 ml-4 whitespace-nowrap">
                  {notification.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-white/40 mt-10">
          You’re all caught up. New notifications will appear here.
        </p>
      </div>
    </div>
  );
}
