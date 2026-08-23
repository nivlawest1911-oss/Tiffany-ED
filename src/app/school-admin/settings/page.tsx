'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export default function SchoolSettingsPage() {
  const [autoGroupEnabled, setAutoGroupEnabled] = useState(true);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [parentPortalEnabled, setParentPortalEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">School Settings</h1>
          <p className="text-white/70 mt-1">Configure preferences for Lincoln Elementary</p>
        </div>

        <div className="space-y-6">
          {/* General Information */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-white/70">School Name</label>
                <Input defaultValue="Lincoln Elementary School" className="mt-1 bg-white/5 border-white/10" />
              </div>
              <div>
                <label className="text-sm text-white/70">Principal / Lead Contact</label>
                <Input defaultValue="Dr. Maria Lopez" className="mt-1 bg-white/5 border-white/10" />
              </div>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Student Grouping</p>
                  <p className="text-sm text-white/60">Allow AI to suggest student groups</p>
                </div>
                <Switch 
                  checked={autoGroupEnabled} 
                  onCheckedChange={setAutoGroupEnabled} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Lesson Suggestions</p>
                  <p className="text-sm text-white/60">Enable Tiffany-ED recommendations</p>
                </div>
                <Switch 
                  checked={aiSuggestionsEnabled} 
                  onCheckedChange={setAiSuggestionsEnabled} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Parent Portal Access</p>
                  <p className="text-sm text-white/60">Allow parents to view student progress</p>
                </div>
                <Switch 
                  checked={parentPortalEnabled} 
                  onCheckedChange={setParentPortalEnabled} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Sync */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Data & Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Sync with District SIS
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export School Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-400 border-red-400/30 hover:bg-red-500/10">
                Reset School Data
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
