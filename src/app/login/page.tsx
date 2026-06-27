'use client';

import { signIn } from "@/lib/auth-client"; // Make sure this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleFacebookLogin = async () => {
    await signIn.social({
      provider: "facebook",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 mb-6 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#C5A46E] flex items-center justify-center">
              <span className="text-[#0A0F1C] text-4xl font-bold">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-[-2px] text-white">Welcome back</h1>
          <p className="text-white/60 mt-2">Sign in to continue to EdIntel Sovereign</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5 mb-6">
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

            <div>
              <label className="text-sm text-white/70">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/50 tracking-[2px]">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-white/20 hover:bg-white/5 py-6"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <Button 
              variant="outline" 
              className="w-full border-white/20 hover:bg-white/5 py-6"
              onClick={handleFacebookLogin}
            >
              Continue with Facebook
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-8 tracking-[1px]">
          Institutional access only
        </p>
      </div>
    </div>
  );
}
