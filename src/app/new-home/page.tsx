import { cookies } from 'next/headers';
import ModernHomePage from '@/components/ModernHomePage';

export const dynamic = 'force-dynamic';

export default async function NewHomePage() {
    await cookies(); // Force dynamic rendering
    return <ModernHomePage />;
}
