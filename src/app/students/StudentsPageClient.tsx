'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentsPageClient() {
  const [search, setSearch] = useState('');

  const students = [
    { id: '1', name: 'Liam Thompson', grade: '4th', teacher: 'Ms. Rivera', status: 'On Track', growth: '+14%' },
    { id: '2', name: 'Sophia Kim', grade: '4th', teacher: 'Ms. Rivera', status: 'Needs Support', growth: '+6%' },
    { id: '3', name: 'Noah Patel', grade: '5th', teacher: 'Mr. Chen', status: 'On Track', growth: '+19%' },
    { id: '4', name: 'Ava Martinez', grade: '3rd', teacher: 'Ms. Lopez', status: 'Tier 2', growth: '+9%' },
    { id: '5', name: 'Ethan Rivera', grade: '4th', teacher: 'Ms. Rivera', status: 'On Track', growth: '+11%' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Students</h1>
            <p className="text-white/70 mt-1">Manage and track student progress across all grades</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            Add Student
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <Input
            placeholder="Search by student or teacher name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        {/* Students Table */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left p-4 font-medium text-white/70">Student Name</th>
                <th className="text-left p-4 font-medium text-white/70">Grade</th>
                <th className="text-left p-4 font-medium text-white/70">Teacher</th>
                <th className="text-left p-4 font-medium text-white/70">Status</th>
                <th className="text-left p-4 font-medium text-white/70">Growth</th>
                <th className="text-right p-4 font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-white/70">{student.grade}</td>
                  <td className="p-4 text-white/70">{student.teacher}</td>
                  <td className="p-4">
                    <Badge 
                      className={
                        student.status === "On Track" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                          : "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30"
                      }
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-emerald-400 font-medium">{student.growth}</td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="ghost" asChild>
                      <a href={`/students/${student.id}`}>View</a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
