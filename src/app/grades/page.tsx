'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GradesPage() {
  const [search, setSearch] = useState('');

  const grades = [
    { id: '1', student: 'Liam Thompson', assignment: 'Main Idea Quiz', score: 92, max: 100, date: 'Jun 20' },
    { id: '2', student: 'Sophia Kim', assignment: 'Reading Fluency Check', score: 78, max: 100, date: 'Jun 18' },
    { id: '3', student: 'Noah Patel', assignment: 'Comprehension Assessment', score: 85, max: 100, date: 'Jun 17' },
    { id: '4', student: 'Ava Martinez', assignment: 'Phonics Mastery Test', score: 64, max: 100, date: 'Jun 15' },
    { id: '5', student: 'Ethan Rivera', assignment: 'Main Idea Quiz', score: 88, max: 100, date: 'Jun 20' },
  ];

  const filteredGrades = grades.filter(g =>
    g.student.toLowerCase().includes(search.toLowerCase()) ||
    g.assignment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Grades</h1>
            <p className="text-white/70 mt-1">View and manage student assessments</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search student or assignment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Grades Table */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/70">Student</th>
                    <th className="text-left p-4 font-medium text-white/70">Assignment</th>
                    <th className="text-left p-4 font-medium text-white/70">Score</th>
                    <th className="text-left p-4 font-medium text-white/70">Date</th>
                    <th className="text-right p-4 font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-white/50">No grades found.</td>
                    </tr>
                  ) : (
                    filteredGrades.map((grade) => {
                      const percentage = Math.round((grade.score / grade.max) * 100);
                      return (
                        <tr key={grade.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-4 font-medium">{grade.student}</td>
                          <td className="p-4 text-white/80">{grade.assignment}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{grade.score}/{grade.max}</span>
                              <Badge 
                                className={
                                  percentage >= 80 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                    : percentage >= 65 
                                    ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30' 
                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                }
                              >
                                {percentage}%
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 text-white/60 text-xs">{grade.date}</td>
                          <td className="p-4 text-right">
                            <Button size="sm" variant="ghost">View Details</Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
