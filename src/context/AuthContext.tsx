'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';

interface User {
    name: string;
    email: string;
    id: string;
    tier: string;
    usageTokens: number;
    usage_count?: number;
    avatar_url?: string;
    clerkId?: string;
    position?: string;
    bio?: string;
    created_at?: string;
    trialEndsAt?: string;
    stripeId?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getSafeSupabaseClient() {
    try {
        const { createClient } = require('@/utils/supabase/client');
        return createClient();
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const supabaseRef = useRef<any>(null);
    const initialized = useRef(false);

    // Initialize supabase client once, safely
    if (!initialized.current) {
        initialized.current = true;
        supabaseRef.current = getSafeSupabaseClient();
    }

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

        const supabase = supabaseRef.current;
        if (supabase?.auth?.onAuthStateChange) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, _session: any) => {
                console.log(`[AuthContext] Supabase Auth Event: ${event}`);
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    setIsLoading(true);
                }
                fetchUser();
            });
            return () => subscription?.unsubscribe();
        }
    }, []);

    const logout = async () => {
        try {
            const supabase = supabaseRef.current;
            if (supabase?.auth?.signOut) {
                await supabase.auth.signOut();
            }
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
        toast.info('Synchronizing tactical profile...');
        setUser(prev => prev ? { ...prev, ...data } : null);
    };

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
