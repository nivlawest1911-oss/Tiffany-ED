'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, X } from 'lucide-react';
import GlassPanel from '@/components/ui/GlassPanel';
import { toast } from 'sonner';
import { logTimeSavedClient } from '@/lib/analytics/time-saved';

type Group = {
  id: string;
  name: string;
  tier: string;
  students: number;
  avgGrowth: string;
  focus: string;
  color: string;
};

type Student = {
  id: string;
  name: string;
  grade: string;
  score: number;
  growth: string;
};

type TierMaterials = {
  tier: string;
  label: string;
  studentCount: number;
  focus: string;
  objectives: string[];
  activities: string[];
  checksForUnderstanding: string[];
  materials: string[];
  durationMinutes: number;
  teacherMoves: string[];
};

type LessonPack = {
  standard: string;
  focus: string;
  generatedAt: string;
  tier1: TierMaterials;
  tier2: TierMaterials;
  tier3: TierMaterials;
  markdown: string;
};

const STUDENTS_BY_GROUP: Record<string, Student[]> = {
  '1': [
    { id: 's1', name: 'Aaliyah Brooks', grade: '4', score: 92, growth: '+22%' },
    { id: 's2', name: 'Marcus Chen', grade: '4', score: 88, growth: '+15%' },
    { id: 's3', name: 'Sofia Ramirez', grade: '5', score: 95, growth: '+19%' },
    { id: 's4', name: 'Jamal Washington', grade: '4', score: 90, growth: '+17%' },
  ],
  '2': [
    { id: 's5', name: 'Emily Nguyen', grade: '3', score: 78, growth: '+12%' },
    { id: 's6', name: "Liam O'Connor", grade: '3', score: 75, growth: '+10%' },
    { id: 's7', name: 'Priya Patel', grade: '4', score: 81, growth: '+11%' },
  ],
  '3': [
    { id: 's8', name: 'Diego Morales', grade: '3', score: 62, growth: '+8%' },
    { id: 's9', name: 'Hannah Kim', grade: '3', score: 58, growth: '+6%' },
    { id: 's10', name: 'Tyler Jackson', grade: '2', score: 55, growth: '+7%' },
  ],
  '4': [
    { id: 's11', name: 'Mia Thompson', grade: '2', score: 41, growth: '+5%' },
    { id: 's12', name: 'Noah Garcia', grade: '2', score: 38, growth: '+3%' },
  ],
};

export default function StudentGroupingPage() {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isGeneratingPack, setIsGeneratingPack] = useState(false);
  const [lessonPack, setLessonPack] = useState<LessonPack | null>(null);
  const [viewGroup, setViewGroup] = useState<Group | null>(null);
  const [editGroup, setEditGroup] = useState<Group | null>(null);
  const [editName, setEditName] = useState('');
  const [editFocus, setEditFocus] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Tier 1 - Advanced Readers',
      tier: 'Tier 1',
      students: 12,
      avgGrowth: '+18%',
      focus: 'Comprehension & Vocabulary',
      color: 'emerald',
    },
    {
      id: '2',
      name: 'Tier 1 - On Track',
      tier: 'Tier 1',
      students: 9,
      avgGrowth: '+11%',
      focus: 'Fluency Maintenance',
      color: 'emerald',
    },
    {
      id: '3',
      name: 'Tier 2 - Targeted Support',
      tier: 'Tier 2',
      students: 7,
      avgGrowth: '+7%',
      focus: 'Phonics & Decoding',
      color: 'gold',
    },
    {
      id: '4',
      name: 'Tier 3 - Intensive Intervention',
      tier: 'Tier 3',
      students: 4,
      avgGrowth: '+4%',
      focus: 'Foundational Skills',
      color: 'red',
    },
  ]);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      toast.success('New groups generated successfully based on latest assessment data.');
      void logTimeSavedClient('group_regen', { groupCount: groups.length });
    }, 1800);
  };

  const handleGenerateTierPack = async () => {
    setIsGeneratingPack(true);
    try {
      // Collapse multiple groups of same tier by summing students + combining focus
      const tierMap = new Map<string, { tier: string; focus: string; studentCount: number }>();
      for (const g of groups) {
        const existing = tierMap.get(g.tier);
        if (existing) {
          existing.studentCount += g.students;
          if (!existing.focus.includes(g.focus)) {
            existing.focus = `${existing.focus}; ${g.focus}`;
          }
        } else {
          tierMap.set(g.tier, {
            tier: g.tier,
            focus: g.focus,
            studentCount: g.students,
          });
        }
      }

      const res = await fetch('/api/tiffany/lesson-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          standard: 'ALCOS.ELA — Reading Foundational Skills',
          focus: 'Science of Reading multi-tier literacy block',
          tiers: Array.from(tierMap.values()),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Failed to generate tier pack');
      }

      const json = await res.json();
      setLessonPack(json.pack as LessonPack);
      toast.success('Tier 1/2/3 lesson pack ready');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Tier pack generation failed';
      toast.error(message);
    } finally {
      setIsGeneratingPack(false);
    }
  };

  const copyPack = async () => {
    if (!lessonPack) return;
    try {
      await navigator.clipboard.writeText(lessonPack.markdown);
      toast.success('Lesson pack copied to clipboard');
      void logTimeSavedClient('export', { source: 'lesson_pack_copy' });
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const downloadPack = () => {
    if (!lessonPack) return;
    const blob = new Blob([lessonPack.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tier-lesson-pack-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Download started');
    void logTimeSavedClient('export', { source: 'lesson_pack_download' });
  };

  const openEdit = (group: Group) => {
    setEditGroup(group);
    setEditName(group.name);
    setEditFocus(group.focus);
  };

  const saveEdit = () => {
    if (!editGroup) return;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === editGroup.id ? { ...g, name: editName, focus: editFocus } : g
      )
    );
    setEditGroup(null);
  };

  const tierColumns: TierMaterials[] = lessonPack
    ? [lessonPack.tier1, lessonPack.tier2, lessonPack.tier3]
    : [];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Student Grouping</h1>
            <p className="text-white/70 mt-1">AI-powered groups based on Science of Reading data</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleGenerateTierPack}
              disabled={isGeneratingPack}
              variant="outline"
              className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10"
            >
              {isGeneratingPack ? 'Generating Pack…' : 'Generate Tier Pack'}
            </Button>
            <Button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate Groups'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Total Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">{groups.length}</div>
            </CardContent>
          </GlassPanel>
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Students Grouped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">32 / 32</div>
            </CardContent>
          </GlassPanel>
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">AI Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">94%</div>
              <p className="text-emerald-400 text-sm mt-1">Based on latest data</p>
            </CardContent>
          </GlassPanel>
          <GlassPanel className="border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">Today</div>
              <p className="text-white/60 text-sm">Jun 26, 2026 · 9:41 AM</p>
            </CardContent>
          </GlassPanel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => (
            <GlassPanel
              key={group.id}
              className="border-white/10 hover:border-[#C5A46E]/40 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl leading-tight">{group.name}</CardTitle>
                    <p className="text-sm text-white/60 mt-1">{group.focus}</p>
                  </div>
                  <Badge
                    className={
                      group.tier === 'Tier 1'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : group.tier === 'Tier 2'
                        ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }
                  >
                    {group.tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-4xl font-semibold">{group.students}</p>
                    <p className="text-sm text-white/60">Students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">{group.avgGrowth}</p>
                    <p className="text-xs text-white/60">Avg Growth</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setViewGroup(group)}
                  >
                    View Students
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEdit(group)}
                  >
                    Edit Group
                  </Button>
                </div>
              </CardContent>
            </GlassPanel>
          ))}
        </div>

        {/* Tier Pack Results */}
        {lessonPack && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Tier 1 / 2 / 3 Lesson Pack</h2>
                <p className="text-sm text-white/50 mt-1">
                  {lessonPack.standard} · {lessonPack.focus}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/20 gap-2" onClick={copyPack}>
                  <Copy className="h-4 w-4" /> Copy
                </Button>
                <Button variant="outline" className="border-white/20 gap-2" onClick={downloadPack}>
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20"
                  onClick={() => setLessonPack(null)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tierColumns.map((tier) => (
                <GlassPanel
                  key={tier.tier}
                  className="border-white/10 bg-white/[0.03] backdrop-blur-xl"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tier.tier}</CardTitle>
                      <Badge
                        className={
                          tier.tier === 'Tier 1'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : tier.tier === 'Tier 2'
                            ? 'bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }
                      >
                        {tier.studentCount} students
                      </Badge>
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      {tier.label} · ~{tier.durationMinutes} min · {tier.focus}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <section>
                      <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1.5">
                        Objectives
                      </h4>
                      <ul className="space-y-1 text-white/80">
                        {tier.objectives.map((o, i) => (
                          <li key={i} className="leading-snug">
                            • {o}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1.5">
                        Activities
                      </h4>
                      <ul className="space-y-1 text-white/80">
                        {tier.activities.map((o, i) => (
                          <li key={i} className="leading-snug">
                            • {o}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1.5">
                        Checks for Understanding
                      </h4>
                      <ul className="space-y-1 text-white/80">
                        {tier.checksForUnderstanding.map((o, i) => (
                          <li key={i} className="leading-snug">
                            • {o}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </CardContent>
                </GlassPanel>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-white/40 mt-8 text-center">
          Groups are automatically updated when new assessment data is synced.
        </p>
      </div>

      {/* View Students Modal */}
      {viewGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <GlassPanel hoverIntensity="none" className="w-full max-w-lg p-6 shadow-2xl border-white/10 bg-[#0F1524]/50">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{viewGroup.name}</h2>
                <p className="text-sm text-white/60">{viewGroup.focus}</p>
              </div>
              <button
                onClick={() => setViewGroup(null)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {(STUDENTS_BY_GROUP[viewGroup.id] || []).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-white/50">Grade {s.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{s.score}</p>
                    <p className="text-xs text-emerald-400">{s.growth}</p>
                  </div>
                </div>
              ))}
              {(!STUDENTS_BY_GROUP[viewGroup.id] ||
                STUDENTS_BY_GROUP[viewGroup.id].length === 0) && (
                <p className="py-8 text-center text-white/50">No students in this group yet.</p>
              )}
            </div>
            <Button
              className="mt-4 w-full bg-[#C5A46E] text-[#0A0F1C] hover:bg-[#A67C52]"
              onClick={() => setViewGroup(null)}
            >
              Close
            </Button>
          </GlassPanel>
        </div>
      )}

      {/* Edit Group Modal */}
      {editGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <GlassPanel hoverIntensity="none" className="w-full max-w-md p-6 shadow-2xl border-white/10 bg-[#0F1524]/50">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Group</h2>
              <button
                onClick={() => setEditGroup(null)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-white/60">Group Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-[#C5A46E]/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/60">Focus Area</label>
                <input
                  value={editFocus}
                  onChange={(e) => setEditFocus(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-[#C5A46E]/50"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditGroup(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#C5A46E] text-[#0A0F1C] hover:bg-[#A67C52]"
                  onClick={saveEdit}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
