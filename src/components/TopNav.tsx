'use client';

import { usePathname } from 'next/navigation';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopNav() {
  const pathname = usePathname();

  // Simple page title logic (you can expand this)
  const getPageTitle = () => {
    if (pathname.includes('/tiffany-ed')) return 'Tiffany-ED';
    if (pathname.includes('/grouping')) return 'Student Grouping';
    if (pathname.includes('/progress')) return 'Progress Monitoring';
    if (pathname.includes('/admin/educator-audit')) return 'Educator AI Audit';
    if (pathname.includes('/parent-portal')) return 'Parent Portal';
    if (pathname.includes('/dashboard')) return 'Dashboard';
    return 'EdIntel Sovereign';
  };

  return (
    <div className="h-16 border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Page Title */}
      <div>
        <h1 className="text-xl font-semibold tracking-[-1px]">{getPageTitle()}</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-white/70 hover:text-white hover:bg-white/5"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5A46E] rounded-full" />
        </Button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            <div className="text-sm font-medium">Dr. Alvin West</div>
            <div className="text-[10px] text-white/50 -mt-0.5">District Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#C5A46E] flex items-center justify-center">
            <User className="w-4 h-4 text-[#0A0F1C]" />
          </div>
        </div>
      </div>
    </div>
  );
}
