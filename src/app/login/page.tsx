'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    // Redirect to Presentation Mode (clean & stable)
    setTimeout(() => {
      window.location.replace('/demo/present');
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#C5A46E] flex items-center justify-center">
              <span className="text-[#0A0F1C] font-bold text-3xl tracking-[-2px]">E</span>
            </div>
            <div>
              <div className="font-semibold text-3xl tracking-tight text-white">EdIntel</div>
              <div className="text-[10px] text-white/50 -mt-1.5">SOVEREIGN</div>
            </div>
          </div>
        </div>

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-white/60 text-sm mt-1">Sign in to continue to EdIntel Sovereign</p>
            </div>

            {/* Demo Button - Now points to /demo/present */}
            <Button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full h-12 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-semibold rounded-2xl flex items-center justify-center gap-2"
            >
              {isLoading ? "Entering Presentation Mode..." : "Sign In as Demo User"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-white/50">Presentation Mode • No credentials required</p>

            {/* Social Login - DISABLED for demo stability */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-center text-xs text-white/40 mb-3">Social login is disabled in this demo environment</p>
              <div className="grid grid-cols-2 gap-3 opacity-50">
                <Button disabled variant="outline" className="h-11 rounded-2xl">Google</Button>
                <Button disabled variant="outline" className="h-11 rounded-2xl">Facebook</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
