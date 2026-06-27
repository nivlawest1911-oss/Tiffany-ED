'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EducatorAuditPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const auditLogs = [
    {
      id: '1',
      teacher: 'Sarah Mitchell',
      action: 'Generated lesson scaffold',
      type: 'lesson',
      standard: 'ALCOS.ELA.4.RI.2',
      timestamp: 'Jun 26, 2026 • 9:41 AM',
      status: 'Completed',
    },
    {
      id: '2',
      teacher: 'James Rivera',
      action: 'Created smart groups',
      type: 'grouping',
      standard: 'Multiple',
      timestamp: 'Jun 25, 2026 • 2:14 PM',
      status: 'Completed',
    },
    {
      id: '3',
      teacher: 'Maria Lopez',
      action: 'Requested differentiation',
      type: 'differentiation',
      standard: 'ALCOS.ELA.3.RF.3',
      timestamp: 'Jun 24, 2026 • 11:05 AM',
      status: 'Completed',
    },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.teacher.toLowerCase().includes(search.toLowerCase()) ||
                         log.action.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Educator AI Audit</h1>
            <p className="text-white/70 mt-1">Traceable record of all AI interactions across the district</p>
          </div>
          <Button variant="outline" className="border-white/20">
            Export Full Audit Log
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by teacher or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border-white/10 md:w-80"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 text-sm"
          >
            <option value="all">All Activity Types</option>
            <option value="lesson">Lesson Generation</option>
            <option value="grouping">Student Grouping</option>
            <option value="differentiation">Differentiation</option>
          </select>
        </div>

        {/* Audit Table */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/70">Timestamp</th>
                    <th className="text-left p-4 font-medium text-white/70">Teacher</th>
                    <th className="text-left p-4 font-medium text-white/70">Action</th>
                    <th className="text-left p-4 font-medium text-white/70">Standard</th>
                    <th className="text-left p-4 font-medium text-white/70">Status</th>
                    <th className="text-right p-4 font-medium text-white/70">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-white/50">
                        No audit records found.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4 text-white/60 text-xs">{log.timestamp}</td>
                        <td className="p-4 font-medium">{log.teacher}</td>
                        <td className="p-4">{log.action}</td>
                        <td className="p-4 text-white/70 text-xs">{log.standard}</td>
                        <td className="p-4">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                            {log.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost">View</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-white/40 mt-4 text-center">
          All AI activity is permanently logged for compliance and audit purposes.
        </p>
      </div>
    </div>
  );
}
