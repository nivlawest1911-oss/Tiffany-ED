'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'nivlawest1911@gmail.com'; // Replace with your actual district email

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        router.push('/login'); // Send intruders to the login page
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Verifying Executive Credentials...</div>;
  if (!user) return null;

  return <>{children}</>;
}
