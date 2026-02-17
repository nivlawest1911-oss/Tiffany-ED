import { cookies } from 'next/headers';
import GeneratorsIndexClient from './GeneratorsIndexClient';

export const dynamic = 'force-dynamic';

export default async function GeneratorsIndexPage() {
    await cookies(); // Force dynamic rendering
    return <GeneratorsIndexClient />;
}
