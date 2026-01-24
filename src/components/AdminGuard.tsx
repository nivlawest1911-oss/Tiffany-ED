'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// THE EXECUTIVE ACCESS LIST
const AUTHORIZED_EMAILS = [
  'nivlawest1911@gmail.com',
  'dralvinwest@transcendholisticwellness.com',
  'colleague@mobilecountyschools.org'
];

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading: loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // Strict email check can be re-enabled here if needed
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="p-10 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-xl font-bold tracking-widest uppercase animate-pulse">Verifying Executive Credentials...</h2>
        <p className="text-zinc-500 text-xs font-mono">Project Alpha Secure Gateway</p>
      </div>
    </div>
  );

  return <>{children}</>;
}
