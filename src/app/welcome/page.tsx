'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold tracking-[-2.5px] mb-4">
            Welcome to EdIntel Sovereign
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            You’re all set. Here’s how to get the most out of the platform.
          </p>
        </div>

        {/* Getting Started Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <div className="text-[#C5A46E] text-4xl mb-4">01</div>
              <CardTitle>Explore Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm">
                Get an overview of your students, recent AI activity, and quick actions.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="mt-4 w-full">Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <div className="text-[#C5A46E] text-4xl mb-4">02</div>
              <CardTitle>Try Tiffany-ED</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm">
                Generate lesson scaffolds, grading drafts, and rubric feedback in seconds.
              </p>
              <Link href="/tiffany-ed">
                <Button variant="outline" className="mt-4 w-full">Open Tiffany-ED</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <div className="text-[#C5A46E] text-4xl mb-4">03</div>
              <CardTitle>Create Smart Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm">
                Automatically group students based on Science of Reading data.
              </p>
              <Link href="/grouping">
                <Button variant="outline" className="mt-4 w-full">Try Grouping</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <Card className="bg-white/[0.03] border-white/10 text-center py-10">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-2">Need help getting started?</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Our support team is here to help you and your district succeed with EdIntel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button variant="outline">Visit Help Center</Button>
              </Link>
              <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
