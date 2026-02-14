'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();
import { toast } from 'sonner';
import { useCelebrate } from './CelebrationContext';

interface User {
    name: string;
    email: string;
    id: string;
    tier: 'free' | 'professional' | 'enterprise' | 'SCHOOL_SITE' | 'DISTRICT_MATRIX' | 'EXECUTIVE_COMMAND' | 'Sovereign Initiate' | 'Director Pack' | 'Practitioner' | 'Sovereign Pack' | 'Standard Pack' | 'Site Command';
    usage_count?: number;
    tokensRemaining?: number;
    trialEndsAt?: Date | null;
    isTrialConverted?: boolean;
    organizationId?: string | null;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password?: string) => Promise<void>;
    signup: (email: string, password?: string, name?: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginWithFacebook: () => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { celebrate } = useCelebrate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // 🏛️ EdIntel IDENTITY SYNC
    useEffect(() => {
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                try {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('full_name, avatar_url')
                        .eq('id', session.user.id)
                        .single();

                    // Fetch DIRECTLY from users table which is the source of truth for trial_ends_at
                    const { data: userData } = await supabase
                        .from('users')
                        .select('subscription_tier, trial_ends_at, usage_count')
                        .eq('id', session.user.id)
                        .single();

                    const newUser: User = {
                        id: session.user.id,
                        email: session.user.email!,
                        name: profile?.full_name || (session.user.user_metadata?.full_name) || session.user.email?.split('@')[0] || 'Executive',
                        tier: (userData?.subscription_tier as any) || (session.user.user_metadata?.tier as any) || 'Sovereign Initiate',
                        usage_count: userData?.usage_count || session.user.user_metadata?.usage_count || 0,
                        trialEndsAt: userData?.trial_ends_at ? new Date(userData.trial_ends_at) : null
                    };

                    setUser(newUser);

                    if (event === 'SIGNED_IN') {
                        celebrate(
                            `Welcome back, ${newUser.name}`,
                            'EdIntel access protocols synchronized. Your executive suite is ready.',
                            'success'
                        );
                    }
                } catch (err) {
                    console.error("[AUTH_CONTEXT] Data sync failure:", err);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [celebrate]);

    const login = async (email: string, password?: string) => {
        if (!supabase) {
            toast.error("Uplink Offline", { description: "Supabase configuration is missing. Authentication is unavailable." });
            return;
        }
        setIsLoading(true);
        try {
            if (!password) {
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
                });
                if (error) throw error;
                alert('EdIntel access link dispatched to your email.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("[EdIntel_AUTH] Login error:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password?: string, name?: string) => {
        if (!supabase) {
            toast.error("Uplink Offline", { description: "Supabase configuration is missing. Signup is unavailable." });
            return;
        }
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password: password || 'temporary-vault-key-2026',
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: {
                        full_name: name || email.split('@')[0],
                        tier: 'free'
                    }
                }
            });
            if (error) throw error;

            if (data.user && !data.session) {
                alert("EdIntel Protocol Initiated: Please check your inbox to authorize your institutional identity.");
            } else if (data.session) {
                celebrate(
                    'Identity Authorized',
                    'Welcome to the EdIntel OS. Your education intelligence journey begins now.',
                    'achievement'
                );
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("[EdIntel_AUTH] Signup error:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (data: Partial<User>) => {
        if (!supabase) return;
        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: data.name,
                tier: data.tier,
                usage_count: data.usage_count
            }
        });
        if (error) throw error;
    };

    const loginWithGoogle = async () => {
        if (!supabase) {
            toast.error("Uplink Offline", { description: "Supabase configuration is missing." });
            return;
        }
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) throw error;
            // If no redirect URL returned, something went wrong
            if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No authorization URL received from Google.');
            }
        } catch (err: any) {
            console.error('[EdIntel_AUTH] Google login error:', err);
            toast.error('Google Authentication Failed', {
                description: err.message || 'Unable to connect to Google. Please try again.',
                duration: 6000,
            });
            setIsLoading(false);
        }
    };

    const loginWithFacebook = async () => {
        if (!supabase) {
            toast.error("Uplink Offline", { description: "Supabase configuration is missing." });
            return;
        }
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        display: 'popup',
                    },
                },
            });
            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No authorization URL received from Facebook.');
            }
        } catch (err: any) {
            console.error('[EdIntel_AUTH] Facebook login error:', err);
            toast.error('Facebook Authentication Failed', {
                description: err.message || 'Unable to connect to Facebook. Please try again.',
                duration: 6000,
            });
            setIsLoading(false);
        }
    };

    const logout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, loginWithFacebook, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
