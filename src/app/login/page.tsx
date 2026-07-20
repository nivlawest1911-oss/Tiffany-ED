'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await signIn.email({ email, password });
      if (error) {
        setErrorMsg(error.message || 'Invalid email or password.');
      } else {
        window.location.replace('/');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await signIn.social({ provider: 'google' });
      if (error) {
        setErrorMsg(error.message || 'Failed to sign in with Google.');
        setIsLoading(false);
      }
      // If successful, better-auth handles the OAuth redirect, so we don't manually redirect.
    } catch (error: any) {
      setErrorMsg(error.message || 'An unexpected error occurred.');
      console.error(error);
      setIsLoading(false);
    }
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
              <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
              <p className="text-white/60 text-sm mt-1">Sign in to continue to EdIntel Sovereign</p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-semibold rounded-2xl flex items-center justify-center gap-2"
              >
                {isLoading ? "Signing In..." : "Sign In"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="pt-4 border-t border-white/10">
              <p className="text-center text-xs text-white/40 mb-3">Or continue with</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleGoogleLogin} 
                  disabled={isLoading} 
                  variant="outline" 
                  className="h-11 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                >
                  Google
                </Button>
                <Button 
                  disabled 
                  variant="outline" 
                  className="h-11 rounded-2xl border-white/10 bg-white/5 opacity-50 text-white"
                >
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
