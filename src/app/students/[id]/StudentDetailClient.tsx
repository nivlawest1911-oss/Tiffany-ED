'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentDetailClient() {
  // In a real app, this would come from params or data fetching
  const student = {
    name: "Liam Thompson",
    grade: "4th Grade",
    teacher: "Ms. Rivera",
    status: "On Track",
    literacyGrowth: 78,
    phonics: 85,
    fluency: 72,
    comprehension: 81,
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">{student.name}</h1>
            <p className="text-white/70 mt-1">{student.grade} • {student.teacher}</p>
          </div>
          <Badge 
            className={
              student.status === "On Track" 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30"
            }
          >
            {student.status}
          </Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Overall Literacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{student.literacyGrowth}%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Phonics Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{student.phonics}%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Reading Fluency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{student.fluency}%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Comprehension</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{student.comprehension}%</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="bg-white/[0.03] border-white/10 mb-8">
          <CardHeader>
            <CardTitle>AI Intervention Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="font-medium text-emerald-400">Recommended Next Step:</p>
              <p className="text-white/80 mt-1">
                Liam shows strong phonics mastery but would benefit from targeted fluency exercises. Suggested small-group reading with multi-syllable focus.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
                Generate Targeted Lesson
              </Button>
              <Button variant="outline">Add to Smart Group</Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Print Summary</Button>
          <Button variant="outline">Export Progress</Button>
        </div>
      </div>
    </div>
  );
}
