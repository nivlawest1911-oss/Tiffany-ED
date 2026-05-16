'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Loader2, Zap as Facebook } from 'lucide-react';
import dynamic from 'next/dynamic';
import Turnstile from 'react-turnstile';
import { authClient } from '@/lib/auth-client';
import { executeSocialUplink, executeEmailUplink } from '@/lib/actions/handshakes';
import EdIntelLogo from '@/components/EdIntelLogo';
import EdIntelSovereignLogo from '@/components/EdIntelSovereignLogo';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/routes';
import DeepSyncVisualizer from '@/components/ui/DeepSyncVisualizer';

// ðŸ›ï¸ Performance Optimized Dynamic Assets
const ParticleBackground = dynamic(() => import('@/components/ui/Cinematic').then(mod => mod.ParticleBackground), { ssr: false });
const HolographicBriefing = dynamic(() => import('@/components/intelligence/HolographicBriefing'), { ssr: false });

export default function LoginClient() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'facebook' | null>(null);
    const [showBriefing, setShowBriefing] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [showUplinkSync, setShowUplinkSync] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending } = authClient.useSession();

    // ðŸ›ï¸ Already Authenticated Protocol: If user is already set, trigger institutional handshake visualizer
    useEffect(() => {
        if (!isPending && session) {
            setShowUplinkSync(true);
        }
    }, [session, isPending]);

    const handleHandshakeComplete = () => {
        router.push(ROUTES.THE_ROOM);
        router.refresh();
    };

    const [signupData, setSignupData] = useState({
        name: '',
        schoolSite: '',
        position: '',
        tierName: 'Sovereign Initiate'
    });

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Capture OAuth errors and Mode from URL
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            const decodedError = decodeURIComponent(errorParam).replace(/_/g, ' ');
            setError(decodedError);
            toast.error("Authentication Sentinel", {
                description: `Access Denied: ${decodedError}`,
            });
        }

        const urlMode = searchParams.get('mode');
        if (urlMode === 'signup') setMode('signup');

        const authFallback = searchParams.get('auth_fallback');
        const provider = searchParams.get('provider');
        if (authFallback === 'true' && provider) {
            const msg = `Neural Handshake Deferred: ${provider.toUpperCase()} integration is currently in institutional isolation mode. Please utilize email authorization.`;
            setError(msg);
            toast.warning("UPLINK_RESTRICTED", {
                description: msg,
            });
        }
    }, [searchParams]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            toast.error("Security Protocol Error", {
                description: "Human verification (Turnstile) is mandatory for institutional access.",
            });
            return;
        }

        setIsLoggingIn(true);
        setError('');

        try {
            if (mode === 'login') {
                const result = await executeEmailUplink({
                    email,
                    password,
                    type: 'signIn',
                    turnstileToken
                });

                if (!result.success) throw new Error(result.error);

                toast.success("IDENTITY_VERIFIED", {
                    description: "Handshake successful. Establishing secure session tunnel...",
                });
            } else {
                const result = await executeEmailUplink({
                    email,
                    password,
                    name: signupData.name,
                    schoolSite: signupData.schoolSite,
                    position: signupData.position,
                    type: 'signUp',
                    turnstileToken
                });

                if (!result.success) throw new Error(result.error);

                toast.success("IDENTITY_PROVISIONED", {
                    description: "Induction protocol fulfilled. Welcome to the Sovereign dawn.",
                });
            }

            router.push(ROUTES.THE_ROOM);
            router.refresh(); 
        } catch (err: any) {
            console.error(err);
            const isConnectionError = err.message?.includes('DATABASE_CONNECTION_ERROR') || err.message?.includes('UPLINK_OFFLINE');
            const errorTitle = isConnectionError ? "UPLINK_INTERRUPTED" : "IDENTITY_REJECTED";
            const errorMessage = isConnectionError 
                ? "The Sovereign Data Plane is currently unreachable. Institutional access is temporarily restricted." 
                : (err.message === "Invalid credentials" ? "Access Denied: The provided coordinates do not match our records." : (err.message || 'Authentication Protocol Failed'));
                
            setError(errorMessage);
            toast.error(errorTitle, {
                description: errorMessage,
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        if (!turnstileToken) {
            toast.error("Security Protocol Error", {
                description: "Human verification (Turnstile) is mandatory for social uplinks.",
            });
            return;
        }

        setIsSocialLoading(provider);
        setError('');

        try {
            toast.info("INITIATING HYPER-LINK", {
                description: `Synchronizing credentials with ${provider.toUpperCase()} servers...`,
            });
            
            const result = await executeSocialUplink(provider as any, turnstileToken);
            
            if (result.success && result.url) {
                toast.success("UPLINK_STABLE", {
                    description: "Secure gateway confirmed. Redirecting to provider...",
                });
                window.location.href = result.url;
            } else {
                throw new Error(result.error || "Uplink handshake failed.");
            }
        } catch (err: any) {
            console.error(err);
            const isConnectionError = err.message?.includes('DATABASE_CONNECTION_ERROR') || err.message?.includes('UPLINK_OFFLINE');
            const errorTitle = isConnectionError ? "UPLINK_INTERRUPTED" : "UPLINK_FAILED";
            const errorMessage = isConnectionError 
                ? "The Sovereign Data Plane is currently unreachable. Institutional access is temporarily restricted." 
                : (err.message || 'Social Uplink Protocol Failed');
                
            setError(errorMessage);
            toast.error(errorTitle, {
                description: errorMessage,
            });
        } finally {
            setIsSocialLoading(null);
        }
    };

    return (
        <>
            {showUplinkSync && <DeepSyncVisualizer onComplete={handleHandshakeComplete} />}
            
            <HolographicBriefing
                isOpen={showBriefing}
                onClose={() => setShowBriefing(false)}
                agentId="tactical"
                title={mode === 'login' ? "Sovereign Access Protocol" : "Identity Induction"}
                description={mode === 'login'
                    ? "Identity verification is required for access to the Unified Sovereign Ecosystem."
                    : "Welcome to the EdIntel Collective. You are initiating a strategic node provisioning."}
                briefingSteps={mode === 'login' ? [
                    "Initialize secure Better Auth handshake.",
                    "Verify institutional credentials via Neural Hub.",
                    "Validate human residency (Turnstile).",
                    "Establish persistent Sovereign Session."
                ] : [
                    "Provision institutional identity.",
                    "Synchronize professional credentials via Uplink.",
                    "Validate human residency (Turnstile).",
                    "Initialize 30-day Sovereign Pilot."
                ]}
            />

            <div className="min-h-screen content-stage flex items-center justify-center p-4 relative overflow-hidden bg-[#020617]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
                    <ParticleBackground count={isMobile ? 4 : 12} color="bg-[#FFB300]/20" />
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.08)_0%,transparent_70%)] rounded-full opacity-60 pointer-events-none transform-gpu" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.08)_0%,transparent_70%)] rounded-full opacity-60 pointer-events-none transform-gpu" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[45%_55%] bg-[#020617]/95 md:bg-black/40 md:backdrop-blur-md rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden"
                >
                    {/* LEFT PANEL */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-gradient-to-br from-white/5 to-white/0 border-r border-white/10 overflow-hidden">
                        <div className="absolute inset-0 bg-[#020617]/70" />
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
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFB300]/40 mt-4">
                                    UNIFIED SOVEREIGN ECOSYSTEM
                                </p>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB300]/10 border border-[#FFB300]/20 text-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.1)]">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Version 4.1 Omega</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="p-8 lg:p-14 flex flex-col justify-center relative bg-white/5">
                        {/* Neural Status Bar (High Fidelity) */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-center opacity-40 pointer-events-none">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                    <span className="text-[7px] font-black tracking-[0.3em] text-zinc-400 uppercase">Uplink: Stable</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-sky-500" />
                                    <span className="text-[7px] font-black tracking-[0.3em] text-zinc-400 uppercase">Signal: 100%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[7px] font-black tracking-[0.3em] text-zinc-400 uppercase">Encryption: Active</span>
                                <div className="w-1 h-1 rounded-full bg-amber-500" />
                            </div>
                        </div>

                        <header className="mb-12 text-center lg:text-left relative mt-6">
                            <span className="text-[8px] font-black tracking-[0.4em] text-[#FFB300] mb-6 uppercase block">
                                NEURAL AUTHORIZATION ACTIVE // PHASE 15 HARDENED
                            </span>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">
                                {mode === 'login' ? 'Institutional Access' : 'Identity Induction'}
                            </h3>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <div className="h-2 w-2 rounded-full bg-[#00B0FF] animate-pulse shadow-[0_0_10px_rgba(0,176,255,0.5)]" />
                                <p className="text-[10px] font-black text-[#00B0FF] uppercase tracking-[0.3em]">
                                    SECURE GATEWAY ESTABLISHED
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

                        <div className="space-y-4 mb-8">
                            <button
                                onClick={() => handleSocialLogin('google')}
                                type="button"
                                disabled={isSocialLoading !== null || isLoggingIn}
                                className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#FFB300]/5 hover:border-[#FFB300]/50 transition-all group disabled:opacity-50"
                            >
                                {isSocialLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin text-[#FFB300]" /> : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                )}
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white">Continue with Google</span>
                            </button>

                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                type="button"
                                disabled={isSocialLoading !== null || isLoggingIn}
                                className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#00B0FF]/5 hover:border-[#00B0FF]/50 transition-all group disabled:opacity-50"
                            >
                                {isSocialLoading === 'facebook' ? <Loader2 className="w-4 h-4 animate-spin text-[#00B0FF]" /> : <Facebook className="w-5 h-5 text-zinc-400 group-hover:text-[#00B0FF]" />}
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white">Continue with Facebook</span>
                            </button>
                        </div>

                        <div className="relative mb-10 py-6 border-t border-white/5">
                            <div className="absolute inset-0 flex items-center">
                                {/* Border handled by container border-t */}
                            </div>
                            <div className="relative flex justify-center">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">OR SIGN IN WITH EMAIL</span>
                            </div>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-5">
                            <div className="space-y-4">
                                {mode === 'signup' && (
                                    <>
                                        <input
                                            type="text"
                                            value={signupData.name}
                                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                            placeholder="YOUR FULL NAME"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-black text-[10px] tracking-[0.4em] text-white"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={signupData.schoolSite}
                                            onChange={(e) => setSignupData({ ...signupData, schoolSite: e.target.value })}
                                            placeholder="INSTITUTIONAL SITE (SCHOOL)"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-black text-[10px] tracking-[0.4em] text-white"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={signupData.position}
                                            onChange={(e) => setSignupData({ ...signupData, position: e.target.value })}
                                            placeholder="PROFESSIONAL POSITION / ROLE"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-black text-[10px] tracking-[0.4em] text-white"
                                            required
                                        />
                                    </>
                                )}
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FFB300] transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="EMAIL ADDRESS"
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-black text-[10px] tracking-[0.4em] text-white"
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
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FFB300] focus:bg-white/10 transition-all font-black text-[10px] tracking-[0.4em] text-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Neural Verification Hub (Turnstile) */}
                            <div className="flex justify-center py-2">
                                <Turnstile
                                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                                    onVerify={(token) => setTurnstileToken(token)}
                                    theme="dark"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn || !turnstileToken}
                                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFB300] to-[#FF8F00] p-5 font-black text-[11px] uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_30px_rgba(255,179,0,0.3)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoggingIn ? (
                                        <><Loader2 size={16} className="animate-spin" /><span>ESTABLISHING...</span></>
                                    ) : (
                                        <><span className="ml-4">{mode === 'login' ? 'AUTHENTICATE ACCESS' : 'CREATE IDENTITY'}</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="mt-10 text-center space-y-5">
                            <button onClick={() => setShowBriefing(true)} className="text-[10px] font-black uppercase tracking-widest text-[#FFB300]/80 hover:text-[#FFB300] transition-colors border-b-2 border-[#FFB300]/20 pb-1">Security Clearance Briefing</button>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                {mode === 'login' ? (
                                    <>New Account? <button onClick={() => setMode('signup')} className="text-white font-black hover:text-[#FFB300] ml-1 uppercase">Request Credentials</button></>
                                ) : (
                                    <>Member Access? <button onClick={() => setMode('login')} className="text-white font-black hover:text-[#FFB300] ml-1 uppercase">Return to Node</button></>
                                )}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
