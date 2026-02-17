'use client';

import { useAccess } from '@/hooks/useAccess';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading, checkPermission } = useAccess();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!checkPermission('admin:all') && !checkPermission('admin:read')) {
                router.push('/dashboard'); // Redirect unauthorized users
            }
        }
    }, [loading, checkPermission, router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {children}
        </div>
    );
}
