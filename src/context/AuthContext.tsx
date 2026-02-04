'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useCelebrate } from './CelebrationContext';

interface User {
    name: string;
    email: string;
    id: string;
    tier: 'free' | 'professional' | 'enterprise' | 'SCHOOL_SITE' | 'DISTRICT_MATRIX' | 'EXECUTIVE_COMMAND';
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

    // 🏛️ SOVEREIGN IDENTITY SYNC
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Ensure we capture metadata consistently
                const metadata = session.user.user_metadata || {};
                const usage = metadata.usage_count || 0;

                // Sync with profiles table for real-time tier accurately
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('subscription_tier, usage_tokens')
                    .eq('id', session.user.id)
                    .single();

                const newUser: User = {
                    id: session.user.id,
                    email: session.user.email!,
                    name: metadata.full_name || session.user.email?.split('@')[0] || 'Executive',
                    tier: (profile?.subscription_tier as any) || (metadata.tier as any) || 'Sovereign Initiate',
                    usage_count: profile?.usage_tokens || usage
                };

                setUser(newUser);

                // Celebrate login
                if (event === 'SIGNED_IN') {
                    celebrate(
                        `Welcome back, ${newUser.name}`,
                        'Sovereign access protocols synchronized. Your executive suite is ready.',
                        'success'
                    );
                }

                // 🚨 MONITOR TOKEN BALANCE (Alerting for low tokens)
                if (newUser.usage_count! > 900 && (newUser.tier === 'free' as any)) {
                    toast.error("Alert: Sovereign Tokens Low. Refuel at the Command Center.", {
                        description: "Energy reserves depleting. Secure institutional funding.",
                        duration: 10000,
                    });
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [celebrate]);

    const login = async (email: string, password?: string) => {
        setIsLoading(true);
        try {
            if (!password) {
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
                });
                if (error) throw error;
                alert('Sovereign access link dispatched to your email.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("[SOVEREIGN_AUTH] Login error:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password?: string, name?: string) => {
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
                alert("Sovereign Protocol Initiated: Please check your inbox to authorize your institutional identity.");
            } else if (data.session) {
                celebrate(
                    'Identity Authorized',
                    'Welcome to the Sovereign OS. Your education intelligence journey begins now.',
                    'achievement'
                );
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("[SOVEREIGN_AUTH] Signup error:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (data: Partial<User>) => {
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
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        });
    };

    const loginWithFacebook = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();
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
