// src/components/HomePageClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/index';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function HomePageClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
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
