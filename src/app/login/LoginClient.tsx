'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Loader2, Gem } from 'lucide-react';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { createBrowserClient } from '@supabase/ssr';
import EdIntelLogo from '@/components/EdIntelLogo';
import EdIntelSovereignLogo from '@/components/EdIntelSovereignLogo';
import { ParticleBackground } from '@/components/ui/Cinematic';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';

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

    // 🏛️ EdIntel Enrollment Fields
    const [signupData, setSignupData] = useState({
        name: '',
        schoolSite: '',
        tierName: 'Sovereign Initiate'
    });

    // Initialize Sovereign Supabase Client
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

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
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;

                toast.success("Identity Verified", {
                    description: "Establishing secure session tunnel...",
                });
            } else {
                // 🏛️ Sovereign Enrollment Protocol (Signup)
                const { error: signUpError } = await supabase.auth.signUp({
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

                toast.success("Identity Provisioned", {
                    description: "Check your executive endpoint for verification.",
                });
            }

            // Force immediate redirect to prevent being stuck on login
            router.push(ROUTES.TEACHER_LAB);
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

        try {
            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (oauthError) throw oauthError;

            // Redirect happens automatically
        } catch (err: any) {
            console.error('OAuth Error:', err);
            setError(err.message || `${provider} Protocol Failed`);
            toast.error(`Sovereign Auth Error`, {
                description: `Could not initiate ${provider} protocol: ${err.message}`,
            });
            setIsSocialLoading(null);
        }
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

            <main className="min-h-screen content-stage flex items-center justify-center p-4 relative overflow-hidden bg-black">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-black" />
                    <ParticleBackground count={40} />
                    {/* Dual Glow Orbs */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full opacity-40 animate-pulse pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full opacity-40 animate-pulse delay-1000 pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-zinc-950/60 backdrop-blur-2xl rounded-[3rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden"
                >
                    {/* LEFT PANEL: VISUAL IDENTITY */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-r border-white/5">
                        <div className="absolute inset-0 bg-[url('/assets/images/carbon-fibre-pattern.png')] opacity-5 mix-blend-overlay" />

                        <div className="relative z-10 text-center space-y-12">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 rounded-full border border-dashed border-white/10 scale-150"
                                />
                                <div className="flex flex-col items-center gap-6">
                                    <EdIntelLogo variant="sovereign-fidelity" className="scale-125" />
                                    <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-400/50 to-purple-400/50" />
                                    <EdIntelSovereignLogo showText={false} size={80} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                                    Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Sovereignty</span>
                                </h2>
                                <p className="text-xs font-medium text-zinc-400 max-w-xs mx-auto leading-relaxed">
                                    Access the complete EdIntel Education Suite and Transcend Wellness Ecosystem through a single, secure identity.
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                    <EdIntelLogo variant="fidelity" className="scale-90" />
                                    <span className="text-[9px] font-bold text-cyan-200 uppercase tracking-widest">EdIntel Core</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                                    <Gem size={12} className="text-purple-400" />
                                    <span className="text-[9px] font-bold text-purple-200 uppercase tracking-widest">Transcend</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LOGIN FORM */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                        {/* Mobile Header (Only visible on mobile) */}
                        <div className="lg:hidden flex justify-center mb-8 gap-4">
                            <EdIntelLogo variant="sovereign-fidelity" className="scale-75" />
                            <EdIntelSovereignLogo showText={false} size={40} className="scale-75" />
                        </div>

                        <header className="mb-10 text-center lg:text-left">
                            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">
                                {mode === 'login' ? 'Executive Access' : 'Sovereign Induction'}
                            </h3>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                                    {mode === 'login' ? 'Secure Uplink Active' : 'Induction Protocol Initialized'}
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

                        <form onSubmit={handleAuth} className="space-y-6">
                            <div className="space-y-4">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                                            <input
                                                type="text"
                                                value={signupData.name}
                                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                placeholder="EXECUTIVE NAME"
                                                className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-700 text-white"
                                                required={mode === 'signup'}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="INSTITUTIONAL ENDPOINT"
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-700 text-white"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="SECURITY KEY"
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-700 text-white"
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
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                                            <input
                                                type="text"
                                                value={signupData.schoolSite}
                                                onChange={(e) => setSignupData({ ...signupData, schoolSite: e.target.value })}
                                                placeholder="INSTITUTIONAL NODE (SCHOOL)"
                                                className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-700 text-white"
                                                required={mode === 'signup'}
                                            />
                                        </div>

                                        <div className="relative group">
                                            <select
                                                value={signupData.tierName}
                                                onChange={(e) => setSignupData({ ...signupData, tierName: e.target.value })}
                                                className="w-full pl-6 pr-12 py-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold text-[10px] tracking-[0.2em] text-white appearance-none cursor-pointer"
                                                title="Select Intelligence Tier"
                                            >
                                                <option value="Sovereign Initiate" className="bg-zinc-900">Initiate Tier ($0.00)</option>
                                                <option value="Standard Pack" className="bg-zinc-900">Standard Tier ($9.99)</option>
                                                <option value="Sovereign Pack" className="bg-zinc-900">Sovereign Tier ($39.99)</option>
                                                <option value="Practitioner" className="bg-zinc-900">Practitioner ($49.99)</option>
                                                <option value="Director Pack" className="bg-zinc-900">Director Pack ($69.99)</option>
                                                <option value="Site Command" className="bg-zinc-900">Site Command ($79.99)</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="group relative w-full overflow-hidden rounded-xl bg-white p-4 font-black text-[10px] uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            <span>{mode === 'login' ? 'Verifying...' : 'Provisioning...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{mode === 'login' ? 'Establish Connection' : 'Initialize Induction'}</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#09090b] px-4 text-[9px] font-black text-zinc-700 uppercase tracking-widest">Or Authenticate Via</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                disabled={isSocialLoading !== null}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group disabled:opacity-50"
                            >
                                {isSocialLoading === 'google' ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                ) : (
                                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                )}
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white">Google</span>
                            </button>

                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                disabled={isSocialLoading !== null}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group disabled:opacity-50"
                            >
                                {isSocialLoading === 'facebook' ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                ) : (
                                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white">Facebook</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center space-y-4">
                            <button
                                onClick={() => setShowBriefing(true)}
                                className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-indigo-400 transition-colors border-b border-dashed border-zinc-800 hover:border-indigo-500/50 pb-0.5"
                            >
                                Initiate Security Briefing
                            </button>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                                {mode === 'login' ? (
                                    <>
                                        New Executive? <button onClick={() => setMode('signup')} className="text-white hover:text-indigo-400 transition-colors ml-1 uppercase">Initialize Induction</button>
                                    </>
                                ) : (
                                    <>
                                        Already established? <button onClick={() => setMode('login')} className="text-white hover:text-indigo-400 transition-colors ml-1 uppercase">Establish Connection</button>
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
