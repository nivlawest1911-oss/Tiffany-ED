'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    // TODO: Connect to your actual registration API
    console.log("Registering user:", formData);

    setTimeout(() => {
      setLoading(false);
      alert("Account created successfully! Please check your email to verify your account.");
      window.location.href = '/login';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A46E]/10">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-[-2px]">Create your account</h1>
          <p className="text-white/70 mt-2">Join EdIntel Sovereign</p>
        </div>

        {/* Form */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-white/80">Full Name</label>
              <Input 
                name="fullName" 
                placeholder="Dr. Alvin West" 
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1.5 bg-white/5 border-white/10" 
                required 
              />
            </div>

            <div>
              <label className="text-sm text-white/80">Work Email</label>
              <Input 
                name="email" 
                type="email" 
                placeholder="you@school.edu" 
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 bg-white/5 border-white/10" 
                required 
              />
            </div>

            <div>
              <label className="text-sm text-white/80">School / District</label>
              <Input 
                name="school" 
                placeholder="Mobile County Public Schools" 
                value={formData.school}
                onChange={handleChange}
                className="mt-1.5 bg-white/5 border-white/10" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Password</label>
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1.5 bg-white/5 border-white/10" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Confirm Password</label>
                <Input 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1.5 bg-white/5 border-white/10" 
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6 mt-2"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-white/60">Already have an account? </span>
            <Link href="/login" className="text-[#C5A46E] hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-8">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
