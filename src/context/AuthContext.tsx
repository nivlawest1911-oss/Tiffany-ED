'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface User {
    name: string;
    email: string;
    id: string;
    tier: 'free' | 'professional' | 'enterprise';
    usage_count?: number;
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
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // 🏛️ SOVEREIGN IDENTITY SYNC
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                // Ensure we capture metadata consistently
                const metadata = session.user.user_metadata || {};
                setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: metadata.full_name || session.user.email?.split('@')[0] || 'Executive',
                    tier: (metadata.tier as any) || 'free',
                    usage_count: metadata.usage_count || 0
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password?: string) => {
        setIsLoading(true);
        try {
            if (!password) {
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: { emailRedirectTo: `${window.location.origin}/dashboard` }
                });
                if (error) throw error;
                alert('Sovereign access link dispatched to your email.');
            } else {
                // FALLBACK: Sovereign Bypass Check
                const SOVEREIGN_USERS = ['nivlawest1911@gmail.com', 'dralvinwest@transcendholisticwellness.com'];
                const SOVEREIGN_PASSWORD = '1MANomega1!';

                const { error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    // Check if it's the Sovereign Bypass
                    if (SOVEREIGN_USERS.includes(email.toLowerCase()) && password === SOVEREIGN_PASSWORD) {
                        console.log("[SOVEREIGN_AUTH] Initiating Master Override Protocol...");
                        // FORCE LOGIN (Mock Session for Sovereign Access)
                        const mockUser: User = {
                            id: 'sovereign-master-id',
                            email: email,
                            name: 'Dr. Alvin West',
                            tier: 'enterprise',
                            usage_count: 9999
                        };
                        setUser(mockUser);
                        setIsLoading(false);
                        router.push('/dashboard');
                        return;
                    }
                    throw error;
                }

                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error("[SOVEREIGN_AUTH] Login error:", err);
            // If Sovereign Bypass failed for some other reason, still try to force it if creds match
            const SOVEREIGN_USERS = ['nivlawest1911@gmail.com', 'dralvinwest@transcendholisticwellness.com'];
            const SOVEREIGN_PASSWORD = '1MANomega1!'; // Hardcoded for redundancy

            if (email && password && SOVEREIGN_USERS.includes(email.toLowerCase()) && password === SOVEREIGN_PASSWORD) {
                const mockUser: User = {
                    id: 'sovereign-master-id',
                    email: email,
                    name: 'Dr. Alvin West',
                    tier: 'enterprise',
                    usage_count: 9999
                };
                setUser(mockUser);
                setIsLoading(false);
                router.push('/dashboard');
                return;
            }

            throw err;
        } finally {
            if (user) setIsLoading(false); // Only unset loading if we didn't success (which sets it false)
            else setIsLoading(false);
        }
    };

    const signup = async (email: string, password?: string, name?: string) => {
        setIsLoading(true);
        try {
            // Strategic URL detection
            const getRedirectUrl = () => {
                const url = typeof window !== 'undefined' ? window.location.origin : 'https://edintel-app.vercel.app';
                // Remove trailing slash if present
                return `${url.replace(/\/$/, '')}/dashboard`;
            };

            const { data, error } = await supabase.auth.signUp({
                email,
                password: password || 'temporary-vault-key-2026',
                options: {
                    emailRedirectTo: getRedirectUrl(),
                    data: {
                        full_name: name || email.split('@')[0],
                        tier: 'free'
                    }
                }
            });
            if (error) throw error;

            if (data.session || data.user) {
                // 🏛️ DB SYNC: Provision in custom users table
                try {
                    await fetch('/api/auth/me', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            name: name || email.split('@')[0],
                            id: data.user?.id
                        })
                    });
                } catch (syncErr) {
                    console.warn("[SOVEREIGN_SYNC] Legacy DB sync delayed", syncErr);
                }
            }

            if (data.user && !data.session) {
                alert("Sovereign Protocol Initiated: Please check your inbox to authorize your institutional identity.");
            } else if (data.session) {
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
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/dashboard` }
            });
            if (error) throw error;
        } catch (err: any) {
            console.error("[SOVEREIGN] Google OAuth initiation failed:", err);
            throw err;
        }
    };

    const loginWithFacebook = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: { redirectTo: `${window.location.origin}/dashboard` }
            });
            if (error) throw error;
        } catch (err: any) {
            console.error("[SOVEREIGN] Facebook OAuth initiation failed:", err);
            throw err;
        }
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
