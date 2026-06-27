'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LTIPlatformsPage() {
  const [platforms] = useState([
    {
      id: '1',
      name: 'Canvas (Mobile County)',
      status: 'Connected',
      lastSync: 'Today',
      schools: 87,
      type: 'LMS',
    },
    {
      id: '2',
      name: 'Clever',
      status: 'Connected',
      lastSync: 'Yesterday',
      schools: 64,
      type: 'Roster',
    },
    {
      id: '3',
      name: 'Google Classroom',
      status: 'Connected',
      lastSync: '2 days ago',
      schools: 41,
      type: 'LMS',
    },
    {
      id: '4',
      name: 'PowerSchool',
      status: 'Pending',
      lastSync: '—',
      schools: 0,
      type: 'SIS',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">LTI Platforms</h1>
            <p className="text-white/70 mt-1">Manage institutional integrations and SSO connections</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Add New Platform
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">3 / 4</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Schools Using LTI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">87</div>
              <p className="text-emerald-400 text-sm mt-1">100% of district</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">Today</div>
              <p className="text-white/60 text-sm">Jun 26, 2026 • 8:14 AM</p>
            </CardContent>
          </Card>
        </div>

        {/* Platforms List */}
        <div className="space-y-4">
          {platforms.map((platform) => (
            <Card key={platform.id} className="bg-white/[0.03] border-white/10">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                    <Badge 
                      className={
                        platform.status === 'Connected' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                      }
                    >
                      {platform.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60">
                    {platform.type} Integration • {platform.schools} schools
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-white/60">Last Sync</p>
                    <p className="font-medium">{platform.lastSync}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Configure</Button>
                    <Button variant="outline" size="sm">View Logs</Button>
                    {platform.status === 'Connected' && (
                      <Button variant="outline" size="sm" className="text-red-400 border-red-400/30">
                        Disconnect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-white/40 mt-8 text-center">
          All LTI connections are secured with signed JWTs and comply with LTI 1.3 Advantage specifications.
        </p>
      </div>
    </div>
  );
}
