import { cookies } from 'next/headers';
import BlogPostDetailClient from './BlogPostDetailClient';

export const dynamic = 'force-dynamic';

export default async function BlogPostDetail() {
    await cookies(); // Force dynamic rendering
    return <BlogPostDetailClient />;
}
