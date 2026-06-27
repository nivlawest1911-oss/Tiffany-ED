'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#C5A46E]" />
            <span className="text-sm tracking-[2px] text-white/60">WELCOME TO EDINTEL</span>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-2.5px] mb-4">
            Welcome to EdIntel Sovereign
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            You now have access to powerful tools that help you understand every student’s story and act with precision.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>1. Explore Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Get a clear overview of your students, at-risk alerts, and recent AI activity.
              </p>
              <Button variant="outline" className="w-full">Go to Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>2. Try Tiffany-ED</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Generate traceable lesson scaffolds and rubric feedback in seconds.
              </p>
              <Button variant="outline" className="w-full">Open Tiffany-ED</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
            <CardHeader>
              <CardTitle>3. Create Smart Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Use AI to automatically group students based on Science of Reading data.
              </p>
              <Button variant="outline" className="w-full">Try Grouping</Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/60 mb-4">Ready to get started?</p>
          <Button 
            size="lg" 
            className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-10"
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
