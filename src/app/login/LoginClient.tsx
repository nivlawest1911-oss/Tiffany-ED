'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { createBrowserClient } from '@supabase/ssr';
import EdIntelLogo from '@/components/EdIntelLogo';
import EdIntelSovereignLogo from '@/components/EdIntelSovereignLogo';
import { ParticleBackground } from '@/components/ui/Cinematic';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';
import { initiateBioAuth } from '@/app/auth/actions';

import { useAuth } from '@/context/AuthContext';

// Lazy-load: only shown when user clicks "Security Clearance Briefing"
const HolographicBriefing = dynamic(() => import('@/components/intelligence/HolographicBriefing'), { ssr: false });

export default function LoginClient() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'facebook' | null>(null);
    const [showBriefing, setShowBriefing] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const router = useRouter();
    const searchParams = useSearchParams();
    const { fetchUser } = useAuth();

    // 🏛️ EdIntel Enrollment Fields
    const [signupData, setSignupData] = useState({
        name: '',
        schoolSite: '',
        tierName: 'Sovereign Initiate'
    });

    // Initialize Sovereign Supabase Client safely - only if env vars are present
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

    const supabase = isSupabaseConfigured ? createBrowserClient(supabaseUrl, supabaseKey) : null;

    // Capture OAuth errors and Mode from URL
    useEffect(() => {
        const oauthError = searchParams.get('error');
        if (oauthError) {
            const decodedError = decodeURIComponent(oauthError).replace(/_/g, ' ');
            setError(decodedError);
            toast.error("Authentication Sentinel", {
                description: `Access Denied: ${decodedError}`,
            });
        }

        const urlMode = searchParams.get('mode');
        if (urlMode === 'signup') setMode('signup');
    }, [searchParams]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError('');

        try {
            if (mode === 'login') {
                // 🏛️ Master Authentication Protocol (Custom API Bypass)
                const apiRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const apiData = await apiRes.json();

                if (apiRes.ok && apiData.success) {
                    toast.success("Identity Verified", {
                        description: "Master access granted. Establishing secure tunnel...",
                    });
                    await fetchUser();
                    router.push(ROUTES.THE_ROOM);
                    router.refresh();
                    return;
                }

                // Standard Supabase Uplink (only if Supabase is configured)
                if (supabase) {
                    const { error: signInError } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (signInError) throw signInError;
                } else {
                    throw new Error('Authentication service not configured. Please use admin login.');
                }

                // 🏛️ Global User Synchronization Protocol
                // Triggering /api/auth/me (GET) will force a parity check and sync between Supabase and Neon
                await fetch('/api/auth/me').catch(e => console.error("[AUTH_SYNC] Background parity check failed", e));

                toast.success("Identity Verified", {
                    description: "Establishing secure session tunnel...",
                });
            } else {
                // 🏛️ Sovereign Enrollment Protocol (Signup)
                if (!supabase) {
                    throw new Error('Authentication service not configured. Signup requires Supabase.');
                }
                
                const { data: { user: signedUpUser }, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: signupData.name,
                            tier: signupData.tierName,
                            school_site: signupData.schoolSite
                        },
                        emailRedirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`
                    }
                });

                if (signUpError) throw signUpError;

                // 🏛️ Pre-Provision Identity in Primary Databases
                if (signedUpUser) {
                    await fetch('/api/auth/me', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: signedUpUser.email,
                            name: signupData.name,
                            id: signedUpUser.id,
                            tier: signupData.tierName
                        }),
                    }).catch(e => console.error("[AUTH_SYNC] Pre-provisioning failed", e));
                }

                toast.success("Identity Provisioned", {
                    description: "Check your executive endpoint for verification.",
                });
            }

            // Force immediate redirect to prevent being stuck on login
            await fetchUser();
            router.push(ROUTES.THE_ROOM);
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Authentication Protocol Failed');
            toast.error("Authentication Failed", {
                description: err.message || "Uplink rejected by Sovereign Sentinel.",
            });
            setIsLoggingIn(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setIsSocialLoading(provider);
        setError('');

        const result = await initiateBioAuth(provider);
        
        if (result?.error) {
            setError(result.error);
            toast.error(`Sovereign Auth Error`, {
                description: `Could not initiate ${provider} protocol: ${result.error}`,
            });
            setIsSocialLoading(null);
        }
        // Success redirects automatically via window.location in actions.ts
    };

    return (
        <>
            <HolographicBriefing
                isOpen={showBriefing}
                onClose={() => setShowBriefing(false)}
                agentId="tactical"
                title={mode === 'login' ? "Sovereign Access Protocol" : "Identity Induction"}
                description={mode === 'login'
                    ? "Identity verification is required for access to the Unified Sovereign Ecosystem."
                    : "Welcome to the EdIntel Collective. You are initiating a strategic node provisioning."}
                briefingSteps={mode === 'login' ? [
                    "Initialize secure administrative downlink.",
                    "Verify institutional credentials.",
                    "Bypass sentinel encryption layers.",
                    "Establish encrypted session tunnel."
                ] : [
                    "Provision institutional identity.",
                    "Configure intelligence tier assignment.",
                    "Synchronize professional credentials.",
                    "Initialize 30-day Sovereign Pilot."
                ]}
            />

            <main className="min-h-screen content-stage flex items-center justify-center p-4 relative overflow-hidden bg-[#020617]">
                {/* Cinematic Dark Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
                    <ParticleBackground count={12} color="bg-[#FFB300]/20" />
                    {/* Soft Glow Orbs */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.08)_0%,transparent_70%)] rounded-full opacity-60 animate-pulse pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.08)_0%,transparent_70%)] rounded-full opacity-60 animate-pulse delay-1000 pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-black/40 backdrop-blur-md rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden"
                >
                    {/* LEFT PANEL: VISUAL IDENTITY */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-white/5 to-white/0 border-r border-white/10 overflow-hidden">
                        <div className="absolute inset-0 bg-[#020617]/50 mix-blend-overlay" />

                        <div className="relative z-10 text-center space-y-12">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 rounded-full border border-dashed border-[#FFB300]/30 scale-150"
                                />
                                <div className="flex flex-col items-center gap-6">
                                    <EdIntelLogo variant="fidelity" className="scale-125 invert" />
                                    <div className="h-16 w-[2px] bg-gradient-to-b from-[#FFB300]/50 to-transparent" />
                                    <EdIntelSovereignLogo className="opacity-30 w-20 h-20" />

                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                                    Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB300] to-[#FF8F00]">Dawn</span>
                                </h2>
                                <p className="text-sm font-medium text-zinc-400 max-w-xs mx-auto leading-relaxed">
                                    Experience the future of education in a clear, focused, and high-performance ecosystem.
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB300]/10 border border-[#FFB300]/20 text-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.1)]">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Version 4.1 Omega</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LOGIN FORM */}
                    <div className="p-8 lg:p-14 flex flex-col justify-center relative bg-white/5">
                        {/* Mobile Header */}
                        <div className="lg:hidden flex flex-col items-center mb-10 space-y-4">
                            <EdIntelLogo variant="fidelity" className="scale-100 invert" />
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB300]/10 border border-[#FFB300]/20 text-[#FFB300]">
                                <span className="text-[9px] font-black uppercase tracking-widest">Version 4.1 Omega</span>
                            </div>
                        </div>

                        <header className="mb-12 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">
                                {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
                            </h3>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="h-2 w-2 rounded-full bg-[#00B0FF] animate-pulse shadow-[0_0_10px_rgba(0,176,255,0.5)]" />
                                <p className="text-[10px] font-black text-[#00B0FF] uppercase tracking-[0.3em]">
                                    {mode === 'login' ? 'Institutional Uplink Active' : 'Induction Suite Ready'}
                                </p>
                            </div>
                        </header>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold rounded-xl uppercase tracking-widest leading-relaxed flex items-center gap-3"
                            >
                                <LucideShield className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {isSupabaseConfigured && (
                            <>
                                {/* SOCIAL LOGIN BLOCK (PRIORITIZED) */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => handleSocialLogin('google')}
                                        type="button"
                                        disabled={isSocialLoading !== null}
                                        className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FFB300]/50 transition-all group disabled:opacity-50 shadow-sm"
                                    >
                                        {isSocialLoading === 'google' ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-[#FFB300]" />
                                        ) : (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                            </svg>
                                        )}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">Google</span>
                                    </button>

                                    <button
                                        onClick={() => handleSocialLogin('facebook')}
                                        type="button"
                                        disabled={isSocialLoading !== null}
                                        className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FFB300]/50 transition-all group disabled:opacity-50 shadow-sm"
                                    >
                                        {isSocialLoading === 'facebook' ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-[#1877F2]" />
                                        ) : (
                                            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        )}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">Facebook</span>
                                    </button>
                                </div>

                                {/* VISUAL SEPARATOR */}
                                <div className="relative mb-10">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-[#0b1021] px-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">OR CONTINUE WITH ENCRYPTION</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <form onSubmit={handleAuth} className="space-y-5">
                            <div className="space-y-4">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={signupData.name}
                                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                placeholder="YOUR FULL NAME"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-500 text-white shadow-sm"
                                                required={mode === 'signup'}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FFB300] transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="EMAIL ADDRESS"
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-500 text-white shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FFB300] transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="SECURITY PASSWORD"
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-500 text-white shadow-sm"
                                        required
                                    />
                                </div>

                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={signupData.schoolSite}
                                                onChange={(e) => setSignupData({ ...signupData, schoolSite: e.target.value })}
                                                placeholder="INSTITUTION / SCHOOL"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-500 text-white shadow-sm"
                                                required={mode === 'signup'}
                                            />
                                        </div>

                                        <div className="relative group">
                                            <select
                                                value={signupData.tierName}
                                                onChange={(e) => setSignupData({ ...signupData, tierName: e.target.value })}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-bold text-[10px] tracking-[0.2em] text-white appearance-none cursor-pointer shadow-sm [&>option]:bg-[#020617]"
                                                title="Select Intelligence Tier"
                                            >
                                                <option value="Sovereign Initiate" className="bg-[#020617]">Initiate Tier (Free Trial)</option>
                                                <option value="Standard Pack" className="bg-[#020617]">Standard Tier ($9.99/mo)</option>
                                                <option value="Sovereign Pack" className="bg-[#020617]">Sovereign Tier ($39.99/mo)</option>
                                                <option value="Practitioner" className="bg-[#020617]">Practitioner ($49.99/mo)</option>
                                                <option value="Director Pack" className="bg-[#020617]">Director Pack ($69.99/mo)</option>
                                                <option value="Site Command" className="bg-[#020617]">Site Command ($79.99/mo)</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFB300] to-[#FF8F00] p-5 font-black text-[11px] uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_30px_rgba(255,179,0,0.3)] hover:shadow-[0_0_40px_rgba(255,179,0,0.5)]"
                                title={mode === 'login' ? 'Authenticate Access' : 'Create Identity'}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>Establishing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{mode === 'login' ? 'Authenticate Access' : 'Create Identity'}</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="mt-10 text-center space-y-5">
                            <button
                                onClick={() => setShowBriefing(true)}
                                className="text-[10px] font-black uppercase tracking-widest text-[#FFB300]/80 hover:text-[#FFB300] transition-colors border-b-2 border-[#FFB300]/20 hover:border-[#FFB300]/50 pb-1"
                            >
                                Security Clearance Briefing
                            </button>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                {mode === 'login' ? (
                                    <>
                                        New Account? <button onClick={() => setMode('signup')} className="text-white font-black hover:text-[#FFB300] transition-colors ml-1 uppercase">Request Credentials</button>
                                    </>
                                ) : (
                                    <>
                                        Member Access? <button onClick={() => setMode('login')} className="text-white font-black hover:text-[#FFB300] transition-colors ml-1 uppercase">Return to Node</button>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </>
    );
}
