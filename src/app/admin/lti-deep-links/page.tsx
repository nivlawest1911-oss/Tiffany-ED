'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mirrors the server-side EDINTEL_DEEP_LINK_RESOURCES catalogue
const RESOURCES = [
  {
    id: 'dashboard',
    title: 'EdIntel Sovereign Dashboard',
    url: '/dashboard',
    desc: 'Main teacher workspace — class overview, at-risk alerts, AI Multiplier access.',
    tag: null,
    icon: '🏛️',
  },
  {
    id: 'tiffany-ed',
    title: 'Tiffany-ED Lesson Planner',
    url: '/tiffany-ed',
    desc: 'AI Multiplier workflow for grading drafts, lesson scaffolds, and rubric feedback.',
    tag: 'Gradebook Ready',
    icon: '✨',
  },
  {
    id: 'grouping',
    title: 'Student Grouping & Tier Analysis',
    url: '/grouping',
    desc: 'Automatic evidence-based grouping with Tier 1 / 2 / 3 recommendations.',
    tag: null,
    icon: '👥',
  },
  {
    id: 'progress',
    title: 'Science of Reading Progress',
    url: '/progress',
    desc: 'ALCOS-aligned phonics, fluency, and comprehension monitoring.',
    tag: 'Gradebook Ready',
    icon: '📈',
  },
  {
    id: 'parent-portal',
    title: 'Parent Portal (Family View)',
    url: '/parent-portal',
    desc: 'FERPA-compliant parent view with real-time student progress and standards-aligned insights.',
    tag: null,
    icon: '🏠',
  },
];

export default function LtiDeepLinksPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const generateConfig = async () => {
    if (selected.length === 0) return;
    setStatus('generating');
    setMessage('');

    try {
      const resourceParam = selected
        .map((id) => RESOURCES.find((r) => r.id === id)?.url.replace(/^\//, ''))
        .filter(Boolean)
        .join(',');

      // In a real flow, the LMS calls this endpoint — here we just preview the URL.
      const previewUrl = `/api/lti/deep-link?resources=${resourceParam}`;

      setStatus('success');
      setMessage(
        `Deep Link endpoint ready for ${selected.length} resource${selected.length !== 1 ? 's' : ''}.\n\nPost to: ${previewUrl}\n\nRegister this endpoint with Canvas/Clever as your LTI Deep Linking URL. When teachers click "Add from EdIntel", they will see the selected resources.`
      );
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message ?? 'Failed to generate configuration.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-[3px] text-white/60">LTI 1.3 ADVANTAGE</span>
          </div>
          <h1 className="text-4xl tracking-[-2px] font-semibold mb-2">Deep Link Resources</h1>
          <p className="text-white/60 max-w-2xl leading-relaxed">
            Select which EdIntel views teachers can embed directly inside{' '}
            <span className="text-white/90">Canvas</span>,{' '}
            <span className="text-white/90">Clever</span>, or{' '}
            <span className="text-white/90">Google Classroom</span> — no new portal, no extra logins.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {RESOURCES.map((r) => {
            const isSelected = selected.includes(r.id);
            return (
              <div
                key={r.id}
                onClick={() => toggle(r.id)}
                className={`rounded-3xl border p-6 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-400/60 bg-emerald-400/5 shadow-lg shadow-emerald-400/10'
                    : 'border-white/10 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{r.icon}</span>
                      <div>
                        <h3 className="text-lg tracking-[-0.5px] font-medium">{r.title}</h3>
                        {r.tag && (
                          <Badge variant="outline" className="mt-1 text-[10px] border-emerald-400/40 text-emerald-400">
                            {r.tag}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
                    <code className="text-white/30 text-xs mt-2 block">{r.url}</code>
                  </div>

                  {/* Checkbox indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-400 border-emerald-400 text-black'
                        : 'border-white/20 text-transparent'
                    }`}
                  >
                    ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between py-4 border-t border-white/10">
          <div className="text-sm text-white/50">
            {selected.length === 0
              ? 'Select one or more resources above'
              : `${selected.length} resource${selected.length !== 1 ? 's' : ''} selected`}
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => { setSelected([]); setStatus('idle'); setMessage(''); }}
              className="text-white/50 hover:text-white"
              disabled={selected.length === 0}
            >
              Clear
            </Button>
            <Button
              onClick={generateConfig}
              disabled={selected.length === 0 || status === 'generating'}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            >
              {status === 'generating' ? 'Generating…' : 'Generate Deep Link Config'}
            </Button>
          </div>
        </div>

        {/* Result Panel */}
        {message && (
          <div
            className={`mt-6 rounded-2xl border p-5 ${
              status === 'success'
                ? 'border-emerald-400/30 bg-emerald-400/5'
                : 'border-red-400/30 bg-red-400/5'
            }`}
          >
            <p className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed">
              {message}
            </p>
          </div>
        )}

        {/* Info Footer */}
        <p className="text-xs text-white/30 mt-8 text-center">
          Deep Linking resources are LTI 1.3 Advantage compliant •{' '}
          Signed JWT response auto-posts to the LMS return URL
        </p>
      </div>
    </div>
  );
}
