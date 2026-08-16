'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
    const [localOverrides, setLocalOverrides] = useState<Partial<User>>({});
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const router = useRouter();
    const { data: session, isPending, error: _error } = authClient.useSession();

    useEffect(() => {
        if (!isPending) {
            setIsInitialLoading(false);
        }
    }, [isPending]);

    const user = useMemo(() => {
        if (!session?.user) return null;
        
        // Bridge Better Auth User to Legacy Institutional User Type
        return {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name || 'Executive',
            tier: (session.user as any).tier || 'free',
            usageTokens: (session.user as any).usageTokens || 0,
            avatar_url: session.user.image || undefined,
            lastUplinkAt: (session.user as any).lastUplinkAt,
            trialEndsAt: (session.user as any).trialEndsAt,
            created_at: session.user.createdAt ? new Date(session.user.createdAt).toISOString() : undefined,
            ...localOverrides
        } as User;
    }, [session, localOverrides]);

    const logout = async () => {
        try {
            await authClient.signOut();
            setLocalOverrides({});
            router.push(ROUTES.LOGIN);
            toast.success('Session Terminated', { description: 'Secure channel closed.' });
        } catch (error: any) {
            toast.error('Logout Failed', { description: error.message });
        }
    };

    const updateUser = async (data: Partial<User>) => {
        setLocalOverrides(prev => ({ ...prev, ...data }));
    };

    const fetchUser = async () => {
        // Handled reactively by useSession()
    };

    const isLoading = isPending || isInitialLoading;

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, updateUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
