'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CurriculumPage() {
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const resources = [
    {
      id: '1',
      title: 'Main Idea & Supporting Details',
      grade: '4th Grade',
      subject: 'ELA',
      standards: ['ALCOS.ELA.4.RI.2'],
      type: 'Lesson',
    },
    {
      id: '2',
      title: 'Short Vowel Blending Practice',
      grade: '2nd Grade',
      subject: 'Reading',
      standards: ['Science of Reading - Phonics'],
      type: 'Activity',
    },
    {
      id: '3',
      title: 'Text Structure: Cause & Effect',
      grade: '5th Grade',
      subject: 'ELA',
      standards: ['ALCOS.ELA.5.RI.5'],
      type: 'Lesson',
    },
    {
      id: '4',
      title: 'Fluency Passages - Level 3',
      grade: '3rd Grade',
      subject: 'Reading',
      standards: ['Science of Reading - Fluency'],
      type: 'Resource',
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.standards.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesGrade = selectedGrade === 'all' || resource.grade.includes(selectedGrade);

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Curriculum Library</h1>
            <p className="text-white/70 mt-1">Standards-aligned lessons and resources</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Upload Resource
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search lessons or standards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border-white/10 md:w-80"
          />

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 text-sm"
          >
            <option value="all">All Grades</option>
            <option value="2nd">2nd Grade</option>
            <option value="3rd">3rd Grade</option>
            <option value="4th">4th Grade</option>
            <option value="5th">5th Grade</option>
          </select>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length === 0 ? (
            <p className="text-white/50 col-span-full text-center py-10">No resources found.</p>
          ) : (
            filteredResources.map((resource) => (
              <Card 
                key={resource.id} 
                className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl pr-4">{resource.title}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                      {resource.grade}
                    </Badge>
                    <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                      {resource.subject}
                    </Badge>
                  </div>

                  <div className="text-sm text-white/70 mb-4">
                    Standards: {resource.standards.join(', ')}
                  </div>

                  <Button variant="outline" className="w-full">
                    View Resource
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
