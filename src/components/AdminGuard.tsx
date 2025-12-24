'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// THE EXECUTIVE ACCESS LIST
const AUTHORIZED_EMAILS = [
  'nivlawest1911@gmail.com', 
  'colleague@mobilecountyschools.org' 
];

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || !AUTHORIZED_EMAILS.includes(currentUser.email || '')) {
        router.push('/login'); 
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', color: '#fff' }}>
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 className="gradient-text">Verifying Executive Credentials...</h2>
        <p style={{ color: '#888' }}>Project Alpha Secure Gateway</p>
      </div>
    </div>
  );

  return <>{children}</>;
}
