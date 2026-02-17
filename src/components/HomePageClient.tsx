// src/components/HomePageClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

import { User } from '@supabase/supabase-js';

export default function HomePageClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="client-auth-section">
      {user ? (
        <p>Welcome back, {user.email}</p>
      ) : (
        <p>Please log in to access personalized features.</p>
      )}
      {/* AuthForm or other client-side interactions can go here */}
    </div>
  );
}
