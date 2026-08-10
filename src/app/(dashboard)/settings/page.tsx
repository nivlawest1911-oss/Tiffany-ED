'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlassPanel from '@/components/ui/GlassPanel';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailReports, setEmailReports] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Settings</h1>
          <p className="text-white/70 mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <GlassPanel className="border-white/10">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Full Name</label>
                  <Input defaultValue={user?.name || ''} className="mt-1 bg-white/5 border-white/10" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email Address</label>
                  <Input defaultValue={user?.email || ''} className="mt-1 bg-white/5 border-white/10" />
                </div>
              </div>
              <div>
                <label className="text-sm text-white/70">School / District</label>
                <Input defaultValue={(user as any)?.district || 'Mobile County Public Schools'} className="mt-1 bg-white/5 border-white/10" />
              </div>
            </CardContent>
          </GlassPanel>

          {/* Notifications */}
          <GlassPanel className="border-white/10">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-white/60">Receive updates about student progress and AI activity</p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Summary Reports</p>
                  <p className="text-sm text-white/60">Get a weekly email summary of your classes</p>
                </div>
                <Switch 
                  checked={emailReports} 
                  onCheckedChange={setEmailReports} 
                />
              </div>
            </CardContent>
          </GlassPanel>

          {/* Security */}
          <GlassPanel className="border-white/10">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-400 border-red-400/30 hover:bg-red-500/10" onClick={logout}>
                Sign Out of All Devices
              </Button>
            </CardContent>
          </GlassPanel>

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
