'use client';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Mail, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { userData } = useUser(user?.uid);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.push('/dashboard');
    }
  }, [userData, router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        setError(error.message);
      });
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-52">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Checking credentials...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Sign in to continue your journey.
        </p>
      </div>
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="pl-10"
              autoComplete="current-password"
            />
          </div>
        </div>
        <Button type="submit" className="w-full font-bold">
          Sign In
        </Button>
      </form>
      <p className="mt-6 text-center text-sm">
        Don't have an account?{' '}
        <a href="/signup" className="font-semibold text-primary hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}