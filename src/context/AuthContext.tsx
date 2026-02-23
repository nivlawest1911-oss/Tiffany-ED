'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';

interface User {
    name: string;
    email: string;
    id: string;
    tier: string;
    usageTokens: number;
    avatar_url?: string;
    clerkId?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("[AuthContext] Failed to fetch user", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();

        if (supabase) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
                console.log(`[AuthContext] Supabase Auth Event: ${event}`);
                fetchUser(); // Re-fetch from our truth source
            });
            return () => subscription.unsubscribe();
        }
    }, [supabase]);

    const logout = async () => {
        try {
            if (supabase) {
                await supabase.auth.signOut();
            }
            // Clear legacy session via API or directly
            await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {
                document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });

            setUser(null);
            router.push(ROUTES.LOGIN);
            toast.success('Session Terminated', { description: 'Secure channel closed.' });
        } catch (error: any) {
            toast.error('Logout Failed', { description: error.message });
        }
    };

    const updateUser = async (data: Partial<User>) => {
        // This should probably call an API to update Postgres/Supabase
        toast.info('Synchronizing tactical profile...');
        // For now, optimistic update
        setUser(prev => prev ? { ...prev, ...data } : null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
