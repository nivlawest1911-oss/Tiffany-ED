import { cookies } from 'next/headers';
import LoginClient from './LoginClient';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';

export default async function LoginPage() {
  await cookies(); // Force dynamic rendering

  const session = await getSession();
  if (session?.user) {
    redirect(ROUTES.THE_ROOM);
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading protocols...</div>}>
      <LoginClient />
    </Suspense>
  );
}
