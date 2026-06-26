'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Connect to your actual password reset API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A46E]/10">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-1.5px] mb-3">Check your email</h1>
          <p className="text-white/70 mb-8">
            If an account exists for <span className="font-medium text-white">{email}</span>, 
            we’ve sent password reset instructions.
          </p>
          <Link href="/login">
            <Button variant="outline" className="border-white/20">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A46E]/10">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-[-2px]">Forgot password?</h1>
          <p className="text-white/70 mt-3">
            Enter your email and we’ll send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-white/80 mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
            >
              Send Reset Link
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link href="/login" className="text-sm text-white/60 hover:text-white">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
