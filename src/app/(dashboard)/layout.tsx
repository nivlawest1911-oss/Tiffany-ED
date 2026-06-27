import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { DemoModeBanner } from '@/components/DemoModeBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav />

        {/* Demo Mode Banner (only shows when ?demo=true) */}
        <DemoModeBanner />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
