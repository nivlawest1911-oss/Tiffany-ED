'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

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
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
              <Button
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                variant="outline"
                className="h-11 border-white/20 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
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
