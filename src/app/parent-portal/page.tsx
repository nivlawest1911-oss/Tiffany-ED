'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ParentPortalPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Parent Portal</h1>
          <p className="text-white/70 mt-2">Welcome back, Mrs. Thompson. Here’s how your children are progressing.</p>
        </div>

        {/* Children Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Child 1 */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Liam Thompson</CardTitle>
                  <p className="text-white/60 text-sm">4th Grade • Ms. Rivera’s Class</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">On Track</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Literacy Growth</span>
                  <span className="font-medium">+18%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[78%] bg-[#C5A46E] rounded-full" />
                </div>
              </div>

              <div className="pt-2 text-sm">
                <p className="text-white/70">Recent Focus:</p>
                <p className="font-medium">Main Idea & Supporting Details</p>
              </div>
            </CardContent>
          </Card>

          {/* Child 2 */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Sophia Thompson</CardTitle>
                  <p className="text-white/60 text-sm">2nd Grade • Mr. Patel’s Class</p>
                </div>
                <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">Needs Support</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Phonics Mastery</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[64%] bg-[#C5A46E] rounded-full" />
                </div>
              </div>

              <div className="pt-2 text-sm">
                <p className="text-white/70">Recent Focus:</p>
                <p className="font-medium">Short vowel sounds & blending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex gap-4">
              <div className="text-[#C5A46E]">●</div>
              <div>
                <span className="font-medium">Liam</span> has shown strong improvement in reading comprehension this month.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-[#C5A46E]">●</div>
              <div>
                <span className="font-medium">Sophia</span> would benefit from extra practice with short vowel sounds at home.
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/50 mt-10 tracking-[1px]">
          All information is secure and FERPA compliant. Last updated today at 8:42 AM.
        </p>
      </div>
    </div>
  );
}
