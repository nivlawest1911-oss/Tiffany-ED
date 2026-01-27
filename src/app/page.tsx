import { cookies } from 'next/headers';
import LandingPageClient from './LandingPageClient';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  await cookies(); // Force dynamic rendering
  return <LandingPageClient />;
}
