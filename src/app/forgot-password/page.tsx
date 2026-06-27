'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Connect to your actual password reset API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#C5A46E] flex items-center justify-center">
            <span className="text-[#0A0F1C] text-3xl font-bold">E</span>
          </div>
        </div>

        <Card className="bg-white/[0.03] border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl tracking-[-1.5px]">Reset your password</CardTitle>
            <p className="text-white/60 mt-2">
              Enter your email and we’ll send you instructions to reset your password.
            </p>
          </CardHeader>

          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-white/70">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
                >
                  Send Reset Instructions
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="text-[#C5A46E] text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">Check your email</h3>
                <p className="text-white/70">
                  We’ve sent password reset instructions to <span className="font-medium">{email}</span>.
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <a href="/login" className="text-sm text-[#C5A46E] hover:underline">
                Back to Sign In
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
