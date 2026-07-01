'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, TrendingUp, BookOpen, ShieldCheck, LogOut, Target, Layers, Award, Scale, Microscope, AppWindow, Globe, DollarSign, Zap, Briefcase, CreditCard, Database, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExitDemo } from '@/hooks/useExitDemo';

export default function PresentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting, showConfirm, requestExit, confirmExit, cancelExit } = useExitDemo();

  const navItems = [
    { href: '/demo/present', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/demo/present/ecosystem', label: 'Ecosystem Overview', icon: Layers },
    { href: '/demo/present/agent-fleet', label: 'Agent Fleet Command', icon: Zap },
    { href: '/demo/present/students', label: 'Students', icon: Users },
    { href: '/demo/present/progress', label: 'Progress', icon: TrendingUp },
    { href: '/demo/present/tiffany-ed', label: 'Tiffany-ED', icon: BookOpen },
    { href: '/demo/present/compliance', label: 'Compliance', icon: ShieldCheck },
    { href: '/demo/present/board', label: 'Board Insights', icon: Award },
    { href: '/demo/present/government', label: 'Government & Policy', icon: Scale },
    { href: '/demo/present/research', label: 'Research & Curriculum', icon: Microscope },
    { href: '/demo/present/modalities', label: 'School Modalities', icon: Target },
    { href: '/demo/present/global-best-practices', label: 'Global Best Practices', icon: Globe },
    { href: '/demo/present/ecosystem-gravity', label: 'Ecosystem Gravity', icon: Globe },
    { href: '/demo/present/district-brain', label: 'District Brain', icon: Globe },
    { href: '/demo/present/full-stack-operations', label: 'Full-Stack Operations', icon: Rocket },
    { href: '/demo/present/pricing-strategy', label: 'Pricing Strategy', icon: DollarSign },
    { href: '/demo/present/platform-economics', label: 'Platform Economics', icon: DollarSign },
    { href: '/demo/present/revenue-engine', label: 'Revenue Engine', icon: DollarSign },
    { href: '/demo/present/strategic-optimization', label: 'Strategic Optimization', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* DEMO MODE BANNER */}
      <div className="sticky top-0 z-50 w-full bg-[#C5A46E]/10 border-b border-[#C5A46E]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#C5A46E]">
              <span className="font-semibold tracking-[2px] text-sm">PRESENTATION MODE</span>
            </div>
            <span className="text-white/50 text-sm hidden md:inline">• Mobile County Board Demo</span>
          </div>
          
          <Button 
            onClick={requestExit}
            variant="outline"
            size="sm"
            disabled={isExiting}
            className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {isExiting ? "Exiting..." : "Exit Demo"}
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Slim Sidebar for Presentation */}
        <div className="w-64 border-r border-white/10 bg-[#0A0F1C] flex flex-col hidden lg:flex">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#C5A46E] flex items-center justify-center">
                <span className="text-[#0A0F1C] font-bold text-lg tracking-[-1px]">E</span>
              </div>
              <div>
                <div className="font-semibold tracking-tight">EdIntel Sovereign</div>
                <div className="text-[10px] text-white/50 -mt-1">Presentation Mode</div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all
                    ${isActive 
                      ? 'bg-white/5 text-white border border-[#C5A46E]/30' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Exit Confirmation Dialog (same as before) */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A0F1C] border border-white/20 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#C5A46E]/10 flex items-center justify-center mb-4">
                <LogOut className="h-6 w-6 text-[#C5A46E]" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Exit Presentation Mode?</h3>
              <p className="text-white/60 text-sm mb-6">
                You will return to the login screen.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={cancelExit} variant="outline" className="flex-1 border-white/20 hover:bg-white/5 rounded-2xl h-11">
                Cancel
              </Button>
              <Button onClick={confirmExit} className="flex-1 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl h-11">
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
