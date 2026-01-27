import { cookies } from 'next/headers';
import GrantWriterLiteClient from './GrantWriterLiteClient';

export const dynamic = 'force-dynamic';

export default async function GrantWriterLitePage() {
    await cookies(); // Force dynamic rendering
    return <GrantWriterLiteClient />;
}
