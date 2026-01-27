import { cookies } from 'next/headers';
import BlogClient from './BlogClient';

export const dynamic = 'force-dynamic';

export default async function Blog() {
    await cookies(); // Force dynamic rendering
    return <BlogClient />;
}
