'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);

    // Simulate a short loading state for polish
    await new Promise(resolve => setTimeout(resolve, 800));

    // Redirect to dashboard (demo mode)
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#C5A46E] flex items-center justify-center">
            <span className="text-[#0A0F1C] text-4xl font-bold">E</span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-semibold tracking-[-2px] text-white mb-3">
          EdIntel Sovereign
        </h1>
        <p className="text-white/60 mb-10">
          Institutional Demo Access
        </p>

        {/* Main Demo Button */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <Button 
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold text-lg py-8 rounded-2xl"
          >
            {loading ? "Signing in to demo..." : "Sign In as Demo User"}
          </Button>

          <p className="text-xs text-white/50 mt-6">
            This is a controlled demo environment.<br />
            All data shown is for presentation purposes.
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/40 mt-10 tracking-[1px]">
          EDINTEL SOVEREIGN • MOBILE COUNTY PUBLIC SCHOOLS
        </p>
      </div>
    </div>
  );
}
