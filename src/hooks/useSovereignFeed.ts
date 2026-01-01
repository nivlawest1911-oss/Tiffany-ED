import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface FeedPost {
    id: string | number;
    author: string;
    role: string;
    time: string;
    content: string;
    stats: {
        likes: number;
        comments: number;
    };
    tags: string[];
}

const DEMO_FEED: FeedPost[] = [
    {
        id: 1,
        author: "Dr. Alvin West II",
        role: "Sovereign Architect & AI Developer",
        time: "2h • Critical Update",
        content: "We have successfully calibrated the Neural Sync Engine to reduce administrative burnout by 40%. The new 'Sovereign Token' economy allows for fluctuating compute loads without breaking district budgets. #EdIntel #Sovereignty #AI",
        stats: { likes: 42, comments: 12 },
        tags: ["System Architecture", "AI Policy"]
    },
    {
        id: 2,
        author: "IEP Compliance Bot",
        role: "Automated Legal Delegate",
        time: "5h • Automated Report",
        content: "State Audit Complete: 142 files reviewed. 98% compliance achieved across Special Education nodes. 3 flagged for human review.",
        stats: { likes: 128, comments: 4 },
        tags: ["Compliance", "Audit"]
    }
];

export function useSovereignFeed() {
    const [posts, setPosts] = useState<FeedPost[]>(DEMO_FEED);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If no API key is present, we are in demo mode. 
        // We check a specific required key to determine if we should even try connecting.
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) {
            setLoading(false);
            return;
        }

        try {
            const q = query(
                collection(db, 'feed'),
                orderBy('createdAt', 'desc'),
                limit(20)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const livePosts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    // Helper to format rough "time ago" string from Timestamp
                    const timeString = formatTimeAgo(data.createdAt);

                    return {
                        id: doc.id,
                        author: data.author || 'Unknown Agent',
                        role: data.role || 'Sovereign Node',
                        time: timeString,
                        content: data.content || '',
                        stats: data.stats || { likes: 0, comments: 0 },
                        tags: data.tags || []
                    } as FeedPost;
                });

                if (livePosts.length > 0) {
                    setPosts(livePosts);
                }
                setLoading(false);
            }, (err) => {
                console.error("Firebase Feed Error:", err);
                // Fallback to demo data on permission error or other issues
                setError("Network sync paused. displaying cached protocols.");
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error("Firebase Init Error:", err);
            setLoading(false);
        }
    }, []);

    return { posts, loading, error };
}

function formatTimeAgo(timestamp: Timestamp | any): string {
    if (!timestamp || !timestamp.toDate) return 'Just now';
    const date = timestamp.toDate();
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
}
