import { cookies } from 'next/headers';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    await cookies(); // Force dynamic rendering
    return <ContactClient />;
}
