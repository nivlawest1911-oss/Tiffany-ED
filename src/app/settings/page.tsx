import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    await cookies(); // Force dynamic rendering context
    // Client-side redirect if still rendered
    return (
        <script dangerouslySetInnerHTML={{
            __html: `window.location.href = '/dashboard';`
        }} />
    );
}
