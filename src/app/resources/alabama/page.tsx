import { cookies } from 'next/headers';
import AlabamaResourcesClient from './AlabamaResourcesClient';

export const dynamic = 'force-dynamic';

export default async function AlabamaResourcesPage() {
  await cookies(); // Force dynamic rendering
  return <AlabamaResourcesClient />;
}
