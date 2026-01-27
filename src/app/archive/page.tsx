import { cookies } from 'next/headers';
import ArchiveClient from './ArchiveClient';

export const dynamic = 'force-dynamic';

export default async function ExecutiveArchive() {
  await cookies(); // Force dynamic rendering
  return <ArchiveClient />;
}
