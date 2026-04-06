import type { Metadata } from 'next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Secure Uplink | EdIntel Professional Login',
  description: 'Access the EdIntel Sovereign Ecosystem. Secure biometric and institutional authentication for education leaders.',
};

export default async function LoginPage() {
  await cookies(); // Force dynamic rendering at request time

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.05)_0%,transparent_70%)] transform-gpu" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-[#FFB300] animate-spin shadow-[0_0_20px_rgba(255,179,0,0.2)]" />
          <p className="text-[#FFB300] font-black uppercase tracking-[0.4em] text-[10px]">Establishing Secure Uplink</p>
        </div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  );
}
