import { cookies } from 'next/headers';
import PricingClient from './PricingClient';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  await cookies(); // Force dynamic rendering
  return <PricingClient />;
}
