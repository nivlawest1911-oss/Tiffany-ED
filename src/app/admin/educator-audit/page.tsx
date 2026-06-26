'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function EducatorAuditPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data - replace with real data fetching later
  const logs = [
    {
      id: '1',
      teacher: 'Sarah Mitchell',
      type: 'grading_draft',
      standards: ['ALCOS.ELA.4.RI.2', 'Science of Reading'],
      timestamp: '2026-06-26 09:14',
      student: 'Liam Thompson',
    },
    {
      id: '2',
      teacher: 'James Rivera',
      type: 'lesson_scaffold',
      standards: ['ALCOS.ELA.3.RL.1'],
      timestamp: '2026-06-25 14:32',
      student: 'Ava Patel',
    },
    {
      id: '3',
      teacher: 'Maria Lopez',
      type: 'rubric_feedback',
      standards: ['ALCOS.ELA.5.W.1'],
      timestamp: '2026-06-25 11:05',
      student: 'Noah Kim',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.teacher.toLowerCase().includes(search.toLowerCase()) ||
      log.standards.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || log.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const exportCSV = () => {
    alert('CSV export functionality will be connected to the API.');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Educator AI Audit</h1>
            <p className="text-white/60 mt-1">Traceable AI usage across the district • FERPA compliant</p>
          </div>
          <Button onClick={exportCSV} variant="outline" className="border-white/20">
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search teacher or standard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border-white/10 md:w-80"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 text-sm"
          >
            <option value="all">All Interaction Types</option>
            <option value="grading_draft">Grading Draft</option>
            <option value="lesson_scaffold">Lesson Scaffold</option>
            <option value="rubric_feedback">Rubric Feedback</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.015] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left p-4 font-medium text-white/70">Teacher</th>
                <th className="text-left p-4 font-medium text-white/70">Type</th>
                <th className="text-left p-4 font-medium text-white/70">Standards</th>
                <th className="text-left p-4 font-medium text-white/70">Student</th>
                <th className="text-left p-4 font-medium text-white/70">Timestamp</th>
                <th className="text-right p-4 font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/50">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 font-medium">{log.teacher}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {log.type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 text-white/70 text-xs">
                      {log.standards.join(', ')}
                    </td>
                    <td className="p-4 text-white/70">{log.student}</td>
                    <td className="p-4 text-white/60 text-xs">{log.timestamp}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-white/40 mt-4 text-center">
          All AI interactions are logged with standards alignment for full traceability.
        </p>
      </div>
    </div>
  );
}
