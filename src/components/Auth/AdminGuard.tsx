'use client';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Force refresh the token to catch the new Admin claim
        const tokenResult = await user.getIdTokenResult(true);
        if (tokenResult.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          router.push('/'); // Redirect non-admins to home
        }
      } else {
        router.push('/board'); // Redirect unauthenticated to login
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (isAdmin === null) return <div className="p-10 text-white">Verifying Sovereign Credentials...</div>;
  return isAdmin ? <>{children}</> : null;
}
