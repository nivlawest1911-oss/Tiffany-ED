'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const resources = [
  {
    id: 'dashboard',
    title: 'EdIntel Sovereign Dashboard',
    description: 'Main teacher workspace — class overview, at-risk alerts, AI Multiplier access.',
    path: '/dashboard',
  },
  {
    id: 'tiffany-ed',
    title: 'Tiffany-ED Lesson Planner',
    description: 'AI Multiplier workflow for grading drafts, lesson scaffolds, and rubric feedback.',
    path: '/tiffany-ed',
    gradebookReady: true,
  },
  {
    id: 'grouping',
    title: 'Student Grouping & Tier Analysis',
    description: 'Automatic evidence-based grouping with Tier 1 / 2 / 3 recommendations.',
    path: '/grouping',
  },
  {
    id: 'progress',
    title: 'Science of Reading Progress',
    description: 'ALCOS-aligned phonics, fluency, and comprehension monitoring.',
    path: '/progress',
    gradebookReady: true,
  },
  {
    id: 'parent-portal',
    title: 'Parent Portal (Family View)',
    description: 'FERPA-compliant parent view with real-time student progress and standards-aligned insights.',
    path: '/parent-portal',
  },
];

export default function LtiDeepLinksPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const generateConfig = () => {
    const selectedResources = resources.filter(r => selected.includes(r.id));

    const config = {
      message_type: 'LtiDeepLinkingResponse',
      content_items: selectedResources.map(r => ({
        type: 'ltiResourceLink',
        title: r.title,
        url: `${window.location.origin}${r.path}`,
        custom: { edintel_resource: r.id },
      })),
    };

    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    alert(`Deep Link configuration generated for ${selectedResources.length} resources.\n\nConfiguration copied to clipboard.`);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C5A46E]" />
            <span className="text-sm tracking-[2px] text-white/60">LTI 1.3 ADVANTAGE</span>
          </div>
          <h1 className="text-5xl tracking-[-2.5px] font-semibold">Deep Link Resources</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Select which EdIntel views teachers can embed directly inside Canvas, Clever, or Google Classroom — no new portal, no extra logins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {resources.map((resource) => {
            const isSelected = selected.includes(resource.id);
            return (
              <div
                key={resource.id}
                onClick={() => toggle(resource.id)}
                className={`rounded-3xl border p-6 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#C5A46E] bg-white/[0.03]' 
                    : 'border-white/10 bg-white/[0.015] hover:border-white/20'
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl tracking-[-1px]">{resource.title}</h3>
                      {resource.gradebookReady && (
                        <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30 text-xs">
                          Gradebook Ready
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/70 text-[15px] leading-relaxed mb-4">{resource.description}</p>
                    <div className="text-xs text-white/40 tracking-[1px]">{resource.path}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mt-1 ${isSelected ? 'bg-[#C5A46E] border-[#C5A46E]' : 'border-white/30'}`}>
                    {isSelected && <span className="text-black">✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-sm text-white/50">{selected.length} resource{selected.length !== 1 ? 's' : ''} selected</span>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelected([])} disabled={selected.length === 0}>
              Clear
            </Button>
            <Button onClick={generateConfig} disabled={selected.length === 0}>
              Generate Deep Link Config
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
