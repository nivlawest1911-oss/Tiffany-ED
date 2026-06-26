'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LtiPlatformsPage() {
  const [platforms, setPlatforms] = useState([
    {
      id: '1',
      name: 'Canvas - Mobile County',
      status: 'Active',
      lastSync: '2026-06-25 14:30',
    },
    {
      id: '2',
      name: 'Clever - District SSO',
      status: 'Active',
      lastSync: '2026-06-26 08:15',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    issuer: '',
    clientId: '',
  });

  const handleAddPlatform = () => {
    if (!newPlatform.name || !newPlatform.issuer) return;

    setPlatforms([
      ...platforms,
      {
        id: Date.now().toString(),
        name: newPlatform.name,
        status: 'Pending',
        lastSync: 'Just now',
      },
    ]);

    setNewPlatform({ name: '', issuer: '', clientId: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">LTI Platforms</h1>
            <p className="text-white/70 mt-1">Manage Canvas, Clever, and Google Classroom integrations.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]">
            {showForm ? 'Cancel' : '+ Add Platform'}
          </Button>
        </div>

        {/* Add Platform Form */}
        {showForm && (
          <Card className="bg-white/[0.03] border-white/10 mb-8">
            <CardHeader>
              <CardTitle>Register New LTI Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Platform Name (e.g. Canvas - Mobile County)"
                value={newPlatform.name}
                onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
              />
              <Input
                placeholder="Issuer URL"
                value={newPlatform.issuer}
                onChange={(e) => setNewPlatform({ ...newPlatform, issuer: e.target.value })}
              />
              <Input
                placeholder="Client ID (optional)"
                value={newPlatform.clientId}
                onChange={(e) => setNewPlatform({ ...newPlatform, clientId: e.target.value })}
              />
              <Button onClick={handleAddPlatform} className="w-full">
                Register Platform
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Platforms List */}
        <div className="space-y-4">
          {platforms.map((platform) => (
            <Card key={platform.id} className="bg-white/[0.03] border-white/10">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-medium">{platform.name}</h3>
                    <Badge 
                      className={
                        platform.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                      }
                    >
                      {platform.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60 mt-1">Last synced: {platform.lastSync}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/10">
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {platforms.length === 0 && (
          <p className="text-center text-white/50 mt-10">No LTI platforms connected yet.</p>
        )}
      </div>
    </div>
  );
}
