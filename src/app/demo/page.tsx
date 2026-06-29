'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DemoPage() {
  // Auto-activate demo mode when visiting this page
  useEffect(() => {
    sessionStorage.setItem('demoMode', 'true');
  }, []);

  const exitDemo = () => {
    sessionStorage.removeItem('demoMode');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Demo Banner */}
      <div className="w-full bg-[#C5A46E]/10 border-b border-[#C5A46E]/30 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-[#C5A46E]">
            <span className="font-semibold tracking-wider">DEMO MODE</span>
            <span className="text-white/60">— All data is simulated for presentation purposes</span>
          </div>
          <Button 
            onClick={exitDemo}
            variant="outline" 
            size="sm"
            className="border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10"
          >
            Exit Demo
          </Button>
        </div>
      </div>

      {/* You can put your normal Dashboard content here, or redirect to dashboard */}
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-4">Demo Dashboard</h1>
        <p className="text-white/70 mb-8">
          This is a fully public demo environment with no authentication required.
        </p>

        {/* You can embed or link to your actual dashboard components here */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <p className="text-white/60">
            Demo content will go here. You can copy components from your normal dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
