'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssignmentsPage() {
  const [search, setSearch] = useState('');

  const assignments = [
    {
      id: '1',
      title: 'Main Idea & Supporting Details',
      class: '4th Grade ELA',
      dueDate: 'Jun 28',
      submissions: 24,
      total: 28,
      status: 'Active',
    },
    {
      id: '2',
      title: 'Short Vowel Assessment',
      class: '2nd Grade Reading',
      dueDate: 'Jun 30',
      submissions: 18,
      total: 22,
      status: 'Active',
    },
    {
      id: '3',
      title: 'Text Structure Practice',
      class: '5th Grade ELA',
      dueDate: 'Jun 25',
      submissions: 31,
      total: 31,
      status: 'Closed',
    },
  ];

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Assignments</h1>
            <p className="text-white/70 mt-1">Create and manage class assignments</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Create Assignment
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.length === 0 ? (
            <p className="text-white/50 col-span-full text-center py-10">No assignments found.</p>
          ) : (
            filteredAssignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl pr-2">{assignment.title}</CardTitle>
                    <Badge 
                      className={
                        assignment.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-white/10 text-white/60 border-white/20'
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Class</span>
                      <span className="font-medium">{assignment.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Due Date</span>
                      <span className="font-medium">{assignment.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Submissions</span>
                      <span className="font-medium">
                        {assignment.submissions} / {assignment.total}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="flex-1">View Submissions</Button>
                    <Button variant="outline" className="flex-1">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
