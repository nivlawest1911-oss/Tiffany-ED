// src/app/blog/posts.ts
import { FEATURE_SYNC_ENGINE, FEATURE_TOKEN_ECONOMY, FEATURE_AVATAR_LAB } from '@/lib/images';

export const BLOG_POSTS = [
    {
        id: 1,
        title: 'Strategic Sync: AI‑driven Coaching for Educators',
        excerpt: 'Discover how EdIntel’s Strategic Sync engine personalizes instruction and reduces teacher burnout.',
        image: FEATURE_SYNC_ENGINE,
        date: '2025‑12‑01',
        category: 'AI & Education',
    },
    {
        id: 2,
        title: 'Professional Token Economy – Fueling Innovation',
        excerpt: 'A deep dive into our transparent token model that aligns budgets with outcomes.',
        image: FEATURE_TOKEN_ECONOMY,
        date: '2025‑11‑20',
        category: 'Product',
    },
    {
        id: 3,
        title: 'District‑Wide Insight Dashboard',
        excerpt: 'Real‑time analytics across schools, districts, and state compliance, all in a glass‑morphic UI.',
        image: FEATURE_AVATAR_LAB,
        date: '2025‑10‑15',
        category: 'Analytics',
    },
];

