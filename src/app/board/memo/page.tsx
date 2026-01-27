import { cookies } from 'next/headers';
import LaunchMemoClient from './LaunchMemoClient';

export const dynamic = 'force-dynamic';

export default async function LaunchMemoPage() {
  await cookies(); // Force dynamic rendering
  return <LaunchMemoClient />;
}
