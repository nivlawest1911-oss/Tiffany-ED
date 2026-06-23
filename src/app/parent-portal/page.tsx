// =====================================================
// EdIntel Sovereign — Parent Portal Mockup (Glassmorphic)
// Place in: app/parent-portal/page.tsx (or app/(parent)/portal/page.tsx)
// WCAG 2.1 AA + FERPA/COPPA ready structure
// =====================================================

'use client';

import React from 'react';

export default function ParentPortal() {
  // In production: fetch from /api/parent/child-progress with proper auth + consent
  const children = [
    {
      id: 'stu_001',
      name: 'Maya Thompson',
      grade: '3rd Grade',
      school: 'Mobile Elementary',
      progress: {
        reading: 78,
        math: 85,
        science: 72,
      },
      alerts: [
        { type: 'positive', message: 'Strong improvement in phonics mastery this week' },
        { type: 'attention', message: 'Fluency practice recommended — 12 min/day target' },
      ],
      recentActivity: 'Completed "The Solar System" lesson • 2 days ago',
    },
    {
      id: 'stu_002',
      name: 'Liam Thompson',
      grade: '1st Grade',
      school: 'Mobile Elementary',
      progress: {
        reading: 64,
        math: 71,
        science: 68,
      },
      alerts: [
        { type: 'positive', message: 'Great participation in small group reading' },
      ],
      recentActivity: 'Practiced sight words • Yesterday',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold tracking-[-1.5px]">EdIntel Sovereign</div>
            <div className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 tracking-[2px]">PARENT PORTAL</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-white/60">Welcome, Dr. Thompson</div>
            <button className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/5 transition">Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-20">
        <div className="mb-10">
          <div className="text-emerald-400 text-sm tracking-[3px] mb-2">SECURE • PRIVATE • REAL-TIME</div>
          <h1 className="text-6xl tracking-[-3px] font-semibold">Your Children’s Learning Journey</h1>
          <p className="text-xl text-white/70 mt-3 max-w-2xl">
            See exactly how your children are growing. Every insight is tied to Alabama standards and protected by FERPA.
          </p>
        </div>

        {/* Children Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {children.map((child) => (
            <div
              key={child.id}
              className="rounded-3xl border border-white/10 bg-white/[0.015] p-8 backdrop-blur-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-3xl tracking-[-1.5px] font-semibold">{child.name}</div>
                  <div className="text-white/60">{child.grade} • {child.school}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs tracking-[2px] text-white/40">OVERALL GROWTH</div>
                  <div className="text-4xl font-semibold text-emerald-400">{Math.round((child.progress.reading + child.progress.math + child.progress.science) / 3)}%</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5 mb-8">
                {Object.entries(child.progress).map(([subject, value]) => (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <div className="capitalize">{subject}</div>
                      <div className="font-mono text-emerald-400">{value}%</div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              <div className="mb-8">
                <div className="text-xs tracking-[2px] text-white/40 mb-3">THIS WEEK’S INSIGHTS</div>
                <div className="space-y-3">
                  {child.alerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl px-5 py-4 text-sm border ${
                        alert.type === 'positive'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-white/40 tracking-[1px] border-t border-white/10 pt-4">
                {child.recentActivity}
              </div>

              <button
                onClick={() => alert('In production: This would open a detailed, privacy-respecting progress report with export options for you and the teacher.')}
                className="mt-6 w-full py-3.5 rounded-2xl border border-white/20 hover:bg-white/5 text-sm tracking-[1.5px] transition"
              >
                VIEW DETAILED PROGRESS REPORT
              </button>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-16 text-center text-xs tracking-[2px] text-white/40">
          All data is encrypted • Role-based access • Parent consent recorded • FERPA & COPPA compliant<br />
          Questions? Contact your child’s teacher or Mobile County School District support.
        </div>
      </div>
    </div>
  );
}
