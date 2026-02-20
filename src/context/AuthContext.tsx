'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();
import { toast } from 'sonner';
import { useCelebrate } from './CelebrationContext';
import { ROUTES } from '@/lib/routes';

interface User {
    name: string;
    email: string;
    id: string;
    tier: 'free' | 'professional' | 'enterprise' | 'SCHOOL_SITE' | 'DISTRICT_MATRIX' | 'EXECUTIVE_COMMAND' | 'Sovereign Initiate' | 'Director Pack' | 'Practitioner' | 'Sovereign Pack' | 'Standard Pack' | 'Site Command';
    usage_count?: number;
    usageTokens?: number;
    trialEndsAt?: Date | null;
    isTrialConverted?: boolean;
    organizationId?: string | null;
    avatar_url?: string;
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
                        .select('subscription_tier, trial_ends_at, usage_count, usage_tokens')
                        .eq('id', session.user.id)
                        .single();

                    const newUser: User = {
                        id: session.user.id,
                        email: session.user.email!,
                        name: profile?.full_name || (session.user.user_metadata?.full_name) || session.user.email?.split('@')[0] || 'Executive',
                        tier: (userData?.subscription_tier as any) || (session.user.user_metadata?.tier as any) || 'Sovereign Initiate',
                        usage_count: userData?.usage_count || 0,
                        usageTokens: userData?.usage_tokens || 0,
                        trialEndsAt: userData?.trial_ends_at ? new Date(userData.trial_ends_at) : null,
                        avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url
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

        // 🛡️ SAFETY VALVE: Extended to 15s for slow connections
        const safetyTimeout = setTimeout(() => {
            setIsLoading((prev) => {
                if (prev) {
                    console.warn('[AUTH_CONTEXT] Safety valve triggered: Forcing isLoading to false after 15s.');
                    return false;
                }
                return prev;
            });
        }, 15000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(safetyTimeout);
        };
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
                    options: { emailRedirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}` }
                });
                if (error) throw error;
                toast.success('Magic Link Dispatched', { description: 'Check your secure inbox for access protocols.' });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
                router.push(ROUTES.TEACHER_LAB);
            }
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error('Authentication Failed', { description: error.message || 'Credentials rejected by Sovereign Sentinel.' });
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password?: string, name?: string) => {
        if (!supabase) return;
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password: password || undefined,
                options: {
                    data: { full_name: name, tier: 'free' },
                    emailRedirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`
                }
            });
            if (error) throw error;
            toast.success('Identity Created', { description: 'Please verify your email to activate Sovereign access.' });
        } catch (error: any) {
            console.error('Signup error:', error);
            toast.error('Registration Failed', { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        if (!supabase) return;
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) throw error;
        } catch (error: any) {
            console.error('Google Login Error:', error);
            toast.error('Google Login Failed', { description: error.message });
        }
    };

    const loginWithFacebook = async () => {
        if (!supabase) return;
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            console.error('Facebook Login Error:', error);
            toast.error('Facebook Login Failed', { description: error.message });
        }
    };

    const logout = async () => {
        if (!supabase) return;
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            router.push(ROUTES.LOGIN);
            toast.success('Session Terminated', { description: 'Secure channel closed.' });
        } catch (error: any) {
            console.error('Logout error:', error);
            toast.error('Logout Failed', { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (data: Partial<User>) => {
        if (!supabase || !user) return;
        try {
            // Update profile in Supabase
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: data.name,
                    avatar_url: data.avatar_url,
                    // Add other fields as necessary
                })
                .eq('id', user.id);

            if (error) throw error;

            // Update local state
            setUser((prev) => prev ? { ...prev, ...data } : null);
            toast.success('Profile Updated');
        } catch (error: any) {
            console.error('Update User Error:', error);
            toast.error('Update Failed', { description: error.message });
        }
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
