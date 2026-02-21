'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Loader2 } from 'lucide-react';
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

            <main className="min-h-screen content-stage flex items-center justify-center p-4 relative overflow-hidden bg-[#F8FAFC]">
                {/* Cinematic Bright Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/30" />
                    <ParticleBackground count={30} color="bg-indigo-300/30" />
                    {/* Soft Glow Orbs */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 blur-[150px] rounded-full opacity-60 animate-pulse pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-200/20 blur-[150px] rounded-full opacity-60 animate-pulse delay-1000 pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-[0_20px_80px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden"
                >
                    {/* LEFT PANEL: VISUAL IDENTITY */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-white/20 to-indigo-50/30 border-r border-white/40">
                        <div className="absolute inset-0 bg-[url('/assets/images/bright_education_hub.png')] bg-cover bg-center opacity-80 mix-blend-soft-light" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />

                        <div className="relative z-10 text-center space-y-12">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 rounded-full border border-dashed border-indigo-200/50 scale-150"
                                />
                                <div className="flex flex-col items-center gap-6">
                                    <EdIntelLogo variant="fidelity" className="scale-125" />
                                    <div className="h-16 w-[2px] bg-gradient-to-b from-indigo-400/50 to-transparent" />
                                    <EdIntelSovereignLogo showText={false} size={80} className="filter grayscale opacity-20" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-zinc-900 uppercase tracking-tighter">
                                    Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Dawn</span>
                                </h2>
                                <p className="text-sm font-medium text-zinc-500 max-w-xs mx-auto leading-relaxed">
                                    Experience the future of education in a clear, focused, and high-performance ecosystem.
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-200">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Version 4.0 Alpha</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LOGIN FORM */}
                    <div className="p-8 lg:p-14 flex flex-col justify-center relative bg-white/20">
                        {/* Mobile Header */}
                        <div className="lg:hidden flex justify-center mb-10">
                            <EdIntelLogo variant="fidelity" className="scale-100" />
                        </div>

                        <header className="mb-12 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter mb-1">
                                {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
                            </h3>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">
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
                                                className="w-full px-6 py-4 bg-white/40 border border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/60 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-400 text-zinc-900 shadow-sm"
                                                required={mode === 'signup'}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="EMAIL ADDRESS"
                                        className="w-full pl-14 pr-6 py-4 bg-white/40 border border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/60 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-400 text-zinc-900 shadow-sm"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="SECURITY PASSWORD"
                                        className="w-full pl-14 pr-6 py-4 bg-white/40 border border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/60 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-400 text-zinc-900 shadow-sm"
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
                                                className="w-full px-6 py-4 bg-white/40 border border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/60 transition-all font-bold text-[10px] tracking-[0.2em] placeholder:text-zinc-400 text-zinc-900 shadow-sm"
                                                required={mode === 'signup'}
                                            />
                                        </div>

                                        <div className="relative group">
                                            <select
                                                value={signupData.tierName}
                                                onChange={(e) => setSignupData({ ...signupData, tierName: e.target.value })}
                                                className="w-full px-6 py-4 bg-white/40 border border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/60 transition-all font-bold text-[10px] tracking-[0.2em] text-zinc-900 appearance-none cursor-pointer shadow-sm"
                                                title="Select Intelligence Tier"
                                            >
                                                <option value="Sovereign Initiate">Initiate Tier (Free Trial)</option>
                                                <option value="Standard Pack">Standard Tier ($9.99/mo)</option>
                                                <option value="Sovereign Pack">Sovereign Tier ($39.99/mo)</option>
                                                <option value="Practitioner">Practitioner ($49.99/mo)</option>
                                                <option value="Director Pack">Director Pack ($69.99/mo)</option>
                                                <option value="Site Command">Site Command ($79.99/mo)</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="group relative w-full overflow-hidden rounded-2xl bg-indigo-600 p-5 font-black text-[11px] uppercase tracking-[0.3em] text-white transition-all hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-indigo-100"
                            >
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

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white/10 px-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest backdrop-blur-sm">Secure Social Access</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                disabled={isSocialLoading !== null}
                                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/60 border border-zinc-200 hover:bg-white hover:border-indigo-300 transition-all group disabled:opacity-50 shadow-sm"
                            >
                                {isSocialLoading === 'google' ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                                ) : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-900">Google</span>
                            </button>

                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                disabled={isSocialLoading !== null}
                                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/60 border border-zinc-200 hover:bg-white hover:border-indigo-300 transition-all group disabled:opacity-50 shadow-sm"
                            >
                                {isSocialLoading === 'facebook' ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                ) : (
                                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-900">Facebook</span>
                            </button>
                        </div>

                        <div className="mt-10 text-center space-y-5">
                            <button
                                onClick={() => setShowBriefing(true)}
                                className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors border-b-2 border-indigo-100 hover:border-indigo-300 pb-1"
                            >
                                Security Clearance Briefing
                            </button>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                {mode === 'login' ? (
                                    <>
                                        New Account? <button onClick={() => setMode('signup')} className="text-zinc-900 font-black hover:text-indigo-600 transition-colors ml-1 uppercase">Request Credentials</button>
                                    </>
                                ) : (
                                    <>
                                        Member Access? <button onClick={() => setMode('login')} className="text-zinc-900 font-black hover:text-indigo-600 transition-colors ml-1 uppercase">Return to Node</button>
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
