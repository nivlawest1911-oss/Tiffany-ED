import { cookies } from 'next/headers';
import AboutClient from './AboutClient';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    await cookies(); // Force dynamic rendering
    return <AboutClient />;
}
