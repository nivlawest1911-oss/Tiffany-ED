'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Shield, 
  Settings,
  LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tiffany-ed', label: 'Tiffany-ED', icon: BookOpen },
  { href: '/grouping', label: 'Student Grouping', icon: Users },
  { href: '/progress', label: 'Progress Monitoring', icon: TrendingUp },
  { href: '/admin/educator-audit', label: 'AI Audit', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#0A0F1C] border-r border-white/10 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C5A46E] flex items-center justify-center">
            <span className="text-[#0A0F1C] text-xl font-bold">E</span>
          </div>
          <div>
            <div className="font-semibold tracking-[-1px]">EdIntel</div>
            <div className="text-[10px] text-white/50 -mt-1">SOVEREIGN</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive 
                  ? 'bg-[#C5A46E]/10 text-[#C5A46E] font-medium' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => window.location.href = '/login'}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
