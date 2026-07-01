'use client';

import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function PresentStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);

  const students = [
    { id: 1, name: "Ava Thompson", grade: "3rd", literacy: 87, growth: 18, tier: "On Track", teacher: "Ms. Thompson" },
    { id: 2, name: "Marcus Chen", grade: "4th", literacy: 72, growth: 12, tier: "Tier 2", teacher: "Mr. Patel" },
    { id: 3, name: "Isabella Rodriguez", grade: "3rd", literacy: 91, growth: 24, tier: "On Track", teacher: "Ms. Thompson" },
    { id: 4, name: "Jamal Washington", grade: "5th", literacy: 64, growth: 9, tier: "Tier 3", teacher: "Ms. Rivera" },
    { id: 5, name: "Sophia Patel", grade: "4th", literacy: 83, growth: 15, tier: "On Track", teacher: "Mr. Patel" },
    { id: 6, name: "Liam O'Brien", grade: "3rd", literacy: 78, growth: 21, tier: "Tier 2", teacher: "Ms. Thompson" },
    { id: 7, name: "Emma Garcia", grade: "5th", literacy: 69, growth: 11, tier: "Tier 2", teacher: "Ms. Rivera" },
    { id: 8, name: "Noah Kim", grade: "4th", literacy: 89, growth: 17, tier: "On Track", teacher: "Mr. Patel" },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Students</h1>
          <p className="text-white/60 mt-1">2,184 students across 87 schools • Presentation data</p>
        </div>
        <Button 
          onClick={handleAction}
          className="bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] transition-all text-[#0A0F1C] rounded-2xl font-medium px-6"
        >
          Export Student List
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-3 h-4 w-4 text-white/40" />
        <Input
          placeholder="Search by name or teacher..."
          className="pl-11 bg-white/5 border-white/10 rounded-2xl h-11"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all rounded-3xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-lg tracking-tight">{student.name}</div>
                    <div className="text-sm text-white/60">Grade {student.grade} • {student.teacher}</div>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#C5A46E]/10">
                    <Users className="h-5 w-5 text-[#C5A46E]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/60">Literacy Score</span>
                      <span className="font-mono text-[#C5A46E]">{student.literacy}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-[#C5A46E] rounded-full transition-all" 
                        style={{ width: `${student.literacy}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">30-Day Growth</span>
                    <span className="font-medium text-emerald-400">+{student.growth}%</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <Badge 
                      variant="outline" 
                      className={
                        student.tier === "On Track" 
                          ? "border-emerald-500/40 text-emerald-400" 
                          : student.tier === "Tier 2" 
                            ? "border-amber-500/40 text-amber-400" 
                            : "border-red-500/40 text-red-400"
                      }
                    >
                      {student.tier}
                    </Badge>
                    <Button 
                      onClick={handleAction} 
                      size="sm" 
                      variant="ghost" 
                      className="text-xs text-white/70 hover:text-white h-8 px-3"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-white/50">
            No students found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl font-medium animate-in slide-in-from-bottom-5">
          Action completed
        </div>
      )}
    </div>
  );
}
