'use client';

import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { useDemoMode } from '@/hooks/useDemoMode';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDemo = useDemoMode();

  return (
    <div className="flex h-screen bg-[#0A0F1C] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <DemoModeBanner />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
