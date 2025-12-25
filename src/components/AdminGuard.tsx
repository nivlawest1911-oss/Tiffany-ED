'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // For now, we hardcode your email. Later, we use Custom Claims.
      if (user && user.email === 'nivlawest1911@gmail.com') {
        setAuthorized(true);
      } else if (user) {
        router.push('/'); // Redirect non-admins to home
      } else {
        router.push('/login'); // Redirect unauthenticated to login
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!authorized) return <div className="bg-black h-screen flex items-center justify-center text-emerald-500 font-mono italic">AUTHENTICATING SOVEREIGN CREDENTIALS...</div>;

  return <>{children}</>;
}
