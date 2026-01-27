import { cookies } from 'next/headers';
import ComponentExplorerClient from './ComponentExplorerClient';

export const dynamic = 'force-dynamic';

export default async function ComponentExplorerPage() {
    await cookies(); // Force dynamic rendering
    return <ComponentExplorerClient />;
}
