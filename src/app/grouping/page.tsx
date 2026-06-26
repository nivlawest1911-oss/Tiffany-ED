'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GroupingPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  const handleGenerateGroups = () => {
    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setGroups([
        {
          tier: 'Tier 1',
          students: ['Liam T.', 'Sophia K.', 'Noah R.', 'Emma P.'],
          focus: 'On-grade level comprehension strategies',
        },
        {
          tier: 'Tier 2',
          students: ['Ava M.', 'Lucas B.', 'Mia S.'],
          focus: 'Targeted phonics + fluency support',
        },
        {
          tier: 'Tier 3',
          students: ['Ethan J.', 'Isabella L.'],
          focus: 'Intensive intervention + progress monitoring',
        },
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Student Grouping</h1>
            <p className="text-white/70 mt-1">AI-powered, evidence-based grouping aligned to Science of Reading.</p>
          </div>
          <Button 
            onClick={handleGenerateGroups} 
            disabled={isGenerating}
            className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
          >
            {isGenerating ? 'Generating Groups...' : 'Generate Smart Groups'}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
            <option>4th Grade ELA - Ms. Rivera</option>
            <option>3rd Grade ELA - Mr. Thompson</option>
            <option>5th Grade ELA - Ms. Patel</option>
          </select>
        </div>

        {/* Groups Display */}
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <Card key={index} className="bg-white/[0.03] border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{group.tier}</CardTitle>
                    <Badge 
                      className={
                        group.tier === 'Tier 1' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : group.tier === 'Tier 2' 
                          ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30' 
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }
                    >
                      {group.students.length} students
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-white/60 mb-2">Focus Area:</p>
                    <p className="text-sm font-medium">{group.focus}</p>
                  </div>

                  <div>
                    <p className="text-sm text-white/60 mb-2">Students:</p>
                    <div className="flex flex-wrap gap-2">
                      {group.students.map((student: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {student}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/[0.03] border-white/10 py-12">
            <CardContent className="text-center">
              <p className="text-white/60">Click “Generate Smart Groups” to create AI-powered, standards-aligned student groups.</p>
            </CardContent>
          </Card>
        )}

        <p className="text-xs text-white/40 mt-8 text-center">
          Groups are generated using Science of Reading research and your district’s assessment data.
        </p>
      </div>
    </div>
  );
}
