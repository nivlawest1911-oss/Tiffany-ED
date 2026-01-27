import { cookies } from 'next/headers';
import ParentalOptInClient from './ParentalOptInClient';

export const dynamic = 'force-dynamic';

export default async function ParentalOptInPage() {
  await cookies(); // Force dynamic rendering
  return <ParentalOptInClient />;
}
