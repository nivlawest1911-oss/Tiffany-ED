// src/app/blog/posts.ts
import { FEATURE_SYNC_ENGINE, FEATURE_TOKEN_ECONOMY, FEATURE_AVATAR_LAB } from '@/lib/assets';

export const BLOG_POSTS = [
    {
        id: 1,
        title: 'Strategic Sync: AIâ€‘driven Coaching for Educators',
        excerpt: 'Discover how EdIntelâ€™s Strategic Sync engine personalizes instruction and reduces teacher burnout.',
        image: FEATURE_SYNC_ENGINE,
        date: '2025â€‘12â€‘01',
        category: 'AI & Education',
    },
    {
        id: 2,
        title: 'Professional Token Economy â€“ Fueling Innovation',
        excerpt: 'A deep dive into our transparent token model that aligns budgets with outcomes.',
        image: FEATURE_TOKEN_ECONOMY,
        date: '2025â€‘11â€‘20',
        category: 'Product',
    },
    {
        id: 3,
        title: 'Districtâ€‘Wide Insight Dashboard',
        excerpt: 'Realâ€‘time analytics across schools, districts, and state compliance, all in a glassâ€‘morphic UI.',
        image: FEATURE_AVATAR_LAB,
        date: '2025â€‘10â€‘15',
        category: 'Analytics',
    },
];

