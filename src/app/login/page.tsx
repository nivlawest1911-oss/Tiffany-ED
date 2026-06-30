'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Chrome, Facebook } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'demo' | 'email'>('demo');

  const handleDemoLogin = () => {
    setIsLoading(true);
    // Use replace for clean navigation
    setTimeout(() => {
      window.location.replace('/demo');
    }, 80);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    // Better Auth social login
    window.location.href = `/api/auth/${provider}`;
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

        <Card className="bg-white/[0.03] border-white/10 rounded-3xl shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-white/60 text-sm">Sign in to continue to EdIntel Sovereign</p>
            </div>

            {/* Demo Mode - Primary for Board Presentation */}
            <div className="space-y-3">
              <Button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full h-12 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-semibold rounded-2xl flex items-center justify-center gap-2 text-base"
              >
                {isLoading ? "Entering Demo..." : "Sign In as Demo User"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-white/50">Instant access • No credentials required</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0A0F1C] px-3 text-white/50">or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                variant="outline"
                className="h-11 border-white/20 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2"
              >
                <Chrome className="h-4 w-4" />
                Google
              </Button>
              <Button
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                variant="outline"
                className="h-11 border-white/20 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
            </div>

            {/* Email Fallback */}
            <div className="pt-2">
              <Button
                onClick={() => setMode(mode === 'demo' ? 'email' : 'demo')}
                variant="ghost"
                className="w-full text-white/60 hover:text-white text-sm h-9"
              >
                {mode === 'demo' ? "Use email instead" : "Back to demo login"}
              </Button>

              {mode === 'email' && (
                <div className="space-y-3 pt-3">
                  <Input 
                    type="email" 
                    placeholder="you@mobilecountyschools.org" 
                    className="bg-white/5 border-white/10 h-11 rounded-2xl" 
                  />
                  <Button 
                    onClick={handleDemoLogin} 
                    className="w-full h-11 bg-white/10 hover:bg-white/15 rounded-2xl"
                  >
                    Send Magic Link
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/40 mt-6">
          Institutional access for Mobile County Public Schools
        </p>
      </div>
    </div>
  );
}
