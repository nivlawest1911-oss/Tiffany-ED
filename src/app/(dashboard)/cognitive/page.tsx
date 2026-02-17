import { cookies } from 'next/headers';
import CognitiveClient from './CognitiveClient';

export const dynamic = 'force-dynamic';

export default async function CognitiveCommandCenter() {
  await cookies(); // Force dynamic rendering
  return <CognitiveClient />;
}
