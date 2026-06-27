'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgressMonitoringPage() {
  const [search, setSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState('30');

  const students = [
    { id: '1', name: 'Liam Thompson', grade: '4th', phonics: 85, fluency: 78, comprehension: 82, growth: '+14%', tier: 'Tier 1' },
    { id: '2', name: 'Sophia Kim', grade: '4th', phonics: 72, fluency: 65, comprehension: 70, growth: '+6%', tier: 'Tier 2' },
    { id: '3', name: 'Noah Patel', grade: '5th', phonics: 91, fluency: 88, comprehension: 85, growth: '+19%', tier: 'Tier 1' },
    { id: '4', name: 'Ava Martinez', grade: '3rd', phonics: 68, fluency: 61, comprehension: 64, growth: '+9%', tier: 'Tier 2' },
    { id: '5', name: 'Ethan Rivera', grade: '4th', phonics: 79, fluency: 74, comprehension: 77, growth: '+11%', tier: 'Tier 1' },
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Progress Monitoring</h1>
            <p className="text-white/70 mt-1">Science of Reading • Student growth tracking</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Class Average Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">+11.8%</div>
              <p className="text-emerald-400 text-sm mt-1">↑ 2.3% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">21 / 28</div>
              <p className="text-white/60 text-sm mt-1">75% of class</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Tier 2 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-[#C5A46E]">5</div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Assessments Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">184</div>
            </CardContent>
          </Card>
        </div>

        {/* Search + Filters */}
        <div className="mb-6">
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Progress Table */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/70">Student</th>
                    <th className="text-left p-4 font-medium text-white/70">Phonics</th>
                    <th className="text-left p-4 font-medium text-white/70">Fluency</th>
                    <th className="text-left p-4 font-medium text-white/70">Comprehension</th>
                    <th className="text-left p-4 font-medium text-white/70">Growth</th>
                    <th className="text-left p-4 font-medium text-white/70">Tier</th>
                    <th className="text-right p-4 font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 font-medium">{student.name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-2 bg-[#C5A46E]" style={{ width: `${student.phonics}%` }}></div>
                          </div>
                          <span className="text-xs text-white/70 w-8">{student.phonics}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-2 bg-[#C5A46E]" style={{ width: `${student.fluency}%` }}></div>
                          </div>
                          <span className="text-xs text-white/70 w-8">{student.fluency}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-2 bg-[#C5A46E]" style={{ width: `${student.comprehension}%` }}></div>
                          </div>
                          <span className="text-xs text-white/70 w-8">{student.comprehension}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-emerald-400 font-medium">{student.growth}</td>
                      <td className="p-4">
                        <Badge 
                          className={
                            student.tier === 'Tier 1' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                              : 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                          }
                        >
                          {student.tier}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button size="sm" variant="ghost">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
