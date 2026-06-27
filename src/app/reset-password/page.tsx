'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

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
            <CardTitle className="text-3xl tracking-[-1.5px]">Set new password</CardTitle>
            <p className="text-white/60 mt-2">
              Enter and confirm your new password below.
            </p>
          </CardHeader>

          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-white/70">New Password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70">Confirm New Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
                >
                  Reset Password
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="text-[#C5A46E] text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">Password updated!</h3>
                <p className="text-white/70 mb-6">
                  Your password has been successfully changed.
                </p>
                <Button 
                  className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
                  onClick={() => window.location.href = '/login'}
                >
                  Back to Sign In
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
