'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const logs = [
    {
      id: '1',
      timestamp: '2026-06-26 14:32',
      user: 'Dr. Alvin West',
      action: 'Exported Student Growth Report',
      type: 'export',
      details: 'Report: Science of Reading - May 2026',
    },
    {
      id: '2',
      timestamp: '2026-06-26 11:15',
      user: 'Sarah Mitchell',
      action: 'Generated lesson scaffold via Tiffany-ED',
      type: 'ai',
      details: '4th Grade ELA • Main Idea & Details',
    },
    {
      id: '3',
      timestamp: '2026-06-25 09:48',
      user: 'System',
      action: 'Student data synced from Canvas',
      type: 'sync',
      details: 'Lincoln Elementary • 642 records',
    },
    {
      id: '4',
      timestamp: '2026-06-24 16:20',
      user: 'Maria Lopez',
      action: 'Updated intervention for Ava Martinez',
      type: 'update',
      details: 'Tier 3 → Tier 2 reading support',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
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
            <h1 className="text-4xl font-semibold tracking-[-2px]">Audit Log</h1>
            <p className="text-white/70 mt-1">Complete system activity and compliance trail</p>
          </div>
          <Button variant="outline" className="border-white/20">
            Export Full Log
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search user or action..."
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
            <option value="ai">AI Activity</option>
            <option value="export">Exports</option>
            <option value="sync">Data Sync</option>
            <option value="update">Record Updates</option>
          </select>
        </div>

        {/* Audit Table */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.015] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="text-left p-4 font-medium text-white/70">Timestamp</th>
                <th className="text-left p-4 font-medium text-white/70">User</th>
                <th className="text-left p-4 font-medium text-white/70">Action</th>
                <th className="text-left p-4 font-medium text-white/70">Details</th>
                <th className="text-right p-4 font-medium text-white/70">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/50">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 text-white/60 text-xs">{log.timestamp}</td>
                    <td className="p-4 font-medium">{log.user}</td>
                    <td className="p-4">{log.action}</td>
                    <td className="p-4 text-white/70 text-xs">{log.details}</td>
                    <td className="p-4 text-right">
                      <Badge 
                        className={
                          log.type === 'ai' 
                            ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30' 
                            : log.type === 'export' 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                            : 'bg-white/10 text-white/60 border-white/20'
                        }
                      >
                        {log.type}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-white/40 mt-4 text-center">
          All actions are permanently logged for compliance and audit purposes.
        </p>
      </div>
    </div>
  );
}
