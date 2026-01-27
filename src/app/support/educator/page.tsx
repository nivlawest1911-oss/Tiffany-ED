import { cookies } from 'next/headers';
import EducatorHubClient from './EducatorHubClient';

export const dynamic = 'force-dynamic';

export default async function EducatorHubPage() {
    await cookies(); // Force dynamic rendering
    return <EducatorHubClient />;
}
