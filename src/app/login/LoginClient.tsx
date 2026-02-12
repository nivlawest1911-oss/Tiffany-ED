'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Hexagon, Loader2 } from 'lucide-react';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { useAuth } from '@/context/AuthContext';
import EdIntelLogo from '@/components/EdIntelLogo';

export default function LoginClient() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'facebook' | null>(null);
    const [showBriefing, setShowBriefing] = useState(false);
    const _router = useRouter();
    const searchParams = useSearchParams();
    const { login, loginWithGoogle, loginWithFacebook } = useAuth();

    // Capture OAuth errors from callback redirect
    useEffect(() => {
        const oauthError = searchParams.get('error');
        if (oauthError) {
            setError(decodeURIComponent(oauthError).replace(/_/g, ' '));
        }
    }, [searchParams]);



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError('');

        try {
            await login(email, password);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Authentication Protocol Failed');
            setIsLoggingIn(false);
        }
    };

    return (
        <>
            <HolographicBriefing
                isOpen={showBriefing}
                onClose={() => setShowBriefing(false)}
                agentId="tactical"
                title="EdIntel Protocol"
                description="Identity verification is required for access to the EdIntel Data Grid. Please provide your institutional credentials."
                briefingSteps={[
                    "Initialize secure administrative downlink.",
                    "Verify institutional credentials.",
                    "Bypass sentinel encryption layers.",
                    "Establish encrypted session tunnel."
                ]}
            />

            <main className="content-stage flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="EdIntel-gatekeeper-card w-full max-w-xl bg-zinc-900/40 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10"
                >
                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Hexagon size={240} className="rotate-12" />
                    </div>

                    <header className="gatekeeper-header text-center mb-16 relative">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6 }}
                            className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl relative"
                        >
                            <LucideShield size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                            <div className="absolute inset-0 rounded-[2rem] border border-white/20 animate-pulse" />
                        </motion.div>

                        <div className="flex justify-center mb-6">
                            <EdIntelLogo className="scale-125" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase mb-4">
                            Professional <span className="text-indigo-400 italic">Portal</span>
                        </h2>

                        <button
                            onClick={() => setShowBriefing(true)}
                            className="block mx-auto mb-8 px-6 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500/10 transition-all"
                        >
                            Initialize Security Briefing
                        </button>
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] whitespace-nowrap">Gatekeeper Protocol // v4.2</p>
                            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
                        </div>
                    </header>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12 p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold text-center rounded-2xl uppercase tracking-widest leading-relaxed"
                        >
                            <span className="opacity-50 mr-2">[!]</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="login-form-area space-y-10">
                        <div className="space-y-6">
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="EXECUTIVE EMAIL"
                                    className="w-full pl-16 pr-8 py-6 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-indigo-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="AUTHORIZATION KEY"
                                    className="w-full pl-16 pr-8 py-6 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-indigo-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="login-primary-button group relative w-full overflow-hidden rounded-2xl bg-white p-6 font-black text-xs uppercase tracking-[0.4em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-indigo-500/20"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-4">
                                {isLoggingIn ? 'Establishing Link...' : 'Enter Command Deck'}
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowBriefing(true)}
                            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-indigo-400 transition-colors"
                        >
                            Initiate Identification Briefing
                        </button>
                    </form>

                    <div className="login-divider relative my-14">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em]">
                            <span className="px-6 bg-[#121215] text-zinc-600 rounded-full border border-white/5 py-1">Secondary Gateway</span>
                        </div>
                    </div>

                    <div className="secondary-gateway grid grid-cols-2 gap-4 mb-10">
                        <button
                            onClick={async () => {
                                setIsSocialLoading('google');
                                setError('');
                                await loginWithGoogle();
                            }}
                            disabled={isSocialLoading !== null}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSocialLoading === 'google' ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                            ) : (
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                            )}
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                {isSocialLoading === 'google' ? 'Connecting...' : 'Google'}
                            </span>
                        </button>
                        <button
                            onClick={async () => {
                                setIsSocialLoading('facebook');
                                setError('');
                                await loginWithFacebook();
                            }}
                            disabled={isSocialLoading !== null}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSocialLoading === 'facebook' ? (
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                            ) : (
                                <svg className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            )}
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                {isSocialLoading === 'facebook' ? 'Connecting...' : 'Facebook'}
                            </span>
                        </button>
                    </div>

                    <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        New Executive? <Link href="/signup" className="text-indigo-400 hover:text-white transition-colors ml-2 border-b border-indigo-500/30">Initialize Identity Sync</Link>
                    </p>
                </motion.div>
            </main>
        </>

    );
}
