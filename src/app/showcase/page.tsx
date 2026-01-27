import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ShowcasePage() {
    await cookies(); // Force dynamic rendering
    return (
        <script dangerouslySetInnerHTML={{
            __html: `window.location.href = '/animated-showcase';`
        }} />
    );
}
