'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';
import { authClient } from '@/lib/auth-client';

interface User {
    name: string;
    email: string;
    id: string;
    tier: string;
    usageTokens: number;
    usage_count?: number;
    avatar_url?: string;
    lastUplinkAt?: string;
    trialEndsAt?: string;
    created_at?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const { data: session, isPending, error: _error } = authClient.useSession();

    useEffect(() => {
        if (session?.user) {
            // Bridge Better Auth User to Legacy Institutional User Type
            setUser({
                id: session.user.id,
                email: session.user.email,
                name: session.user.name || 'Executive',
                tier: (session.user as any).tier || 'free',
                usageTokens: (session.user as any).usageTokens || 0,
                avatar_url: session.user.image || undefined,
                lastUplinkAt: (session.user as any).lastUplinkAt,
                trialEndsAt: (session.user as any).trialEndsAt,
                created_at: session.user.createdAt ? new Date(session.user.createdAt).toISOString() : undefined,
            });
        } else {
            setUser(null);
        }
    }, [session]);

    const logout = async () => {
        try {
            await authClient.signOut();
            setUser(null);
            router.push(ROUTES.LOGIN);
            toast.success('Session Terminated', { description: 'Secure channel closed.' });
        } catch (error: any) {
            toast.error('Logout Failed', { description: error.message });
        }
    };

    const updateUser = async (data: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...data } : null);
    };

    const fetchUser = async () => {
        // Handled reactively by useSession()
    };

    return (
        <AuthContext.Provider value={{ user, isLoading: isPending, logout, updateUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
