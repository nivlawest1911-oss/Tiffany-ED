'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">My Profile</h1>
          <p className="text-white/70 mt-1">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-white/[0.03] border-white/10">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#C5A46E] flex items-center justify-center mb-4">
                <span className="text-[#0A0F1C] text-4xl font-bold">AW</span>
              </div>
              <h2 className="text-2xl font-semibold">Dr. Alvin West</h2>
              <p className="text-white/60">4th Grade ELA Teacher</p>
              <Badge className="mt-3 bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">
                Verified Educator
              </Badge>

              <Button 
                variant="outline" 
                className="mt-6 w-full border-white/20"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Full Name</label>
                  <Input 
                    defaultValue="Dr. Alvin West" 
                    disabled={!isEditing}
                    className="mt-1 bg-white/5 border-white/10" 
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <Input 
                    defaultValue="alvin.west@mobilecountyschools.org" 
                    disabled={!isEditing}
                    className="mt-1 bg-white/5 border-white/10" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">School</label>
                  <Input 
                    defaultValue="Mobile County Elementary" 
                    disabled={!isEditing}
                    className="mt-1 bg-white/5 border-white/10" 
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Grade Level</label>
                  <Input 
                    defaultValue="4th Grade" 
                    disabled={!isEditing}
                    className="mt-1 bg-white/5 border-white/10" 
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/70">Bio</label>
                <textarea 
                  defaultValue="Passionate educator focused on Science of Reading and improving literacy outcomes for all students."
                  disabled={!isEditing}
                  className="mt-1 w-full min-h-[100px] rounded-xl bg-white/5 border border-white/10 p-3 text-sm"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
