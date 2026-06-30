'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, TrendingUp, BookOpen, ShieldCheck, LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExitDemo } from '@/hooks/useExitDemo';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExiting, showConfirm, requestExit, confirmExit, cancelExit } = useExitDemo();

  const navItems = [
    { href: '/demo', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/demo/students', label: 'Students', icon: Users },
    { href: '/demo/progress', label: 'Progress', icon: TrendingUp },
    { href: '/demo/tiffany-ed', label: 'Tiffany-ED', icon: BookOpen },
    { href: '/demo/compliance', label: 'Compliance', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* DEMO MODE BANNER */}
      <div className="sticky top-0 z-50 w-full bg-[#C5A46E]/10 border-b border-[#C5A46E]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#C5A46E]">
              <span className="font-semibold tracking-[2px] text-sm">DEMO MODE</span>
            </div>
            <span className="text-white/50 text-sm">• Mobile County Board Presentation</span>
          </div>
          
          <Button 
            onClick={requestExit}
            variant="outline"
            size="sm"
            disabled={isExiting}
            className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {isExiting ? "Exiting..." : "Exit Demo Mode"}
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        {/* SIDEBAR */}
        <div className="w-72 border-r border-white/10 bg-[#0A0F1C] flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C5A46E] flex items-center justify-center">
                <span className="text-[#0A0F1C] font-bold text-xl tracking-[-1px]">E</span>
              </div>
              <div>
                <div className="font-semibold text-xl tracking-tight">EdIntel</div>
                <div className="text-[10px] text-white/50 -mt-1">SOVEREIGN • DEMO</div>
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

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-[#C5A46E]/20 flex items-center justify-center">
                <span className="text-[#C5A46E] text-sm font-medium">AW</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Dr. Alvin West</div>
                <div className="text-[10px] text-white/50">Superintendent • Mobile County</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* EXIT CONFIRMATION DIALOG */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A0F1C] border border-white/20 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#C5A46E]/10 flex items-center justify-center mb-4">
                <LogOut className="h-6 w-6 text-[#C5A46E]" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">Exit Demo Mode?</h3>
              <p className="text-white/60 text-sm mb-6">
                You will be returned to the login screen. All demo data will be cleared.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={cancelExit}
                variant="outline" 
                className="flex-1 border-white/20 hover:bg-white/5 rounded-2xl h-11"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmExit}
                className="flex-1 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl h-11"
              >
                Yes, Exit Demo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Exiting Toast */}
      {isExiting && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium z-[110]">
          Exiting demo mode...
        </div>
      )}
    </div>
  );
}
