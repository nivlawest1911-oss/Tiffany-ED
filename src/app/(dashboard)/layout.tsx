import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { DemoModeHandler } from '@/components/DemoModeHandler';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0A0F1C] text-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        {/* Demo Mode Handler + Banner */}
        <Suspense fallback={null}>
          <DemoModeHandler />
          <DemoModeBanner />
        </Suspense>

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
