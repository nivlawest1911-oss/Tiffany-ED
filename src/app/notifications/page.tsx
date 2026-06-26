'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New AI-generated feedback ready",
      description: "Tiffany-ED created feedback for 6 students in 4th Grade ELA.",
      time: "2 hours ago",
      type: "ai",
      read: false,
    },
    {
      id: 2,
      title: "Student grouping updated",
      description: "Smart groups for 3rd Grade have been regenerated.",
      time: "Yesterday",
      type: "grouping",
      read: true,
    },
    {
      id: 3,
      title: "New assessment data imported",
      description: "Spring benchmark data has been successfully imported.",
      time: "2 days ago",
      type: "data",
      read: true,
    },
    {
      id: 4,
      title: "Parent Portal access granted",
      description: "Mrs. Thompson has activated her parent account.",
      time: "3 days ago",
      type: "parent",
      read: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Notifications</h1>
            <p className="text-white/70 mt-1">Stay updated on student progress and platform activity</p>
          </div>
          <Button variant="outline" className="border-white/20">
            Mark all as read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`bg-white/[0.03] border-white/10 transition-all ${!notification.read ? 'border-[#C5A46E]/40' : ''}`}
              >
                <CardContent className="p-6 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && (
                        <Badge className="bg-[#C5A46E] text-[#0A0F1C] text-xs px-2 py-0.5">New</Badge>
                      )}
                    </div>
                    <p className="text-white/70 text-sm mb-2">{notification.description}</p>
                    <p className="text-xs text-white/50">{notification.time}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white/[0.03] border-white/10 py-12">
              <CardContent className="text-center text-white/60">
                You’re all caught up. No new notifications.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
