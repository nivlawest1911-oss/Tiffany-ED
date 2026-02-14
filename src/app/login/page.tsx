import { cookies } from 'next/headers';
import LoginClient from './LoginClient';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';

export default async function LoginPage() {
  await cookies(); // Force dynamic rendering
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading protocols...</div>}>
      <LoginClient />
    </Suspense>
  );
}
