'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onboardOrganization } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, ShieldCheck, Sparkles, Building2, Mail, User, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function RegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSystemReady, setIsSystemReady] = useState<boolean | null>(null);

    React.useEffect(() => {
        const checkSystem = async () => {
            try {
                const res = await fetch('/api/health');
                const data = await res.json();
                setIsSystemReady(data.services.database.status === 'connected');
            } catch {
                setIsSystemReady(false);
            }
        };
        checkSystem();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const adminName = formData.get('adminName') as string;
        const adminEmail = formData.get('adminEmail') as string;
        const organizationName = formData.get('organizationName') as string;
        const password = formData.get('password') as string;

        console.log('[Registration] Initializing submission for:', adminEmail);

        try {
            const result = await onboardOrganization({
                adminName,
                adminEmail,
                organizationName,
                password,
            });
            console.log('[Registration] Action result received:', result);

            if (result.success) {
                toast.success('Node Secured!', {
                    description: 'Organization onboarded successfully. Redirecting to dashboard...',
                });
                router.push(redirect);
            } else {
                const errorResult = result as { success: false; error: string };
                setError(errorResult.error || 'An unknown error occurred.');
                console.error('[Registration] Action returned failure:', errorResult.error);
                toast.error('Registration Declined', {
                    description: errorResult.error || 'An unknown error occurred.',
                });
            }
        } catch (err: any) {
            console.error('[Registration] Fatal error during submission:', err);
            // Detect the standard Next.js production error message
            const rawMessage = err.message || '';
            const isConfigError = rawMessage.includes('Server Components render') || rawMessage.includes('Database configuration');
            
            const message = isConfigError 
                ? 'System configuration error: Database is unreachable. Please verify environment variables.' 
                : (err.message || 'Registration failed. Please try again.');
                
            setError(message);
            toast.error('System Breach Detected', {
                description: message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg bg-[#111] border-zinc-800 text-gray-200 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-emerald-600/50" />
            
            <CardHeader className="space-y-4 pt-8 px-8">
                <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-500 group-hover:scale-110 transition-transform">
                        <Building2 size={24} />
                    </div>
                    {isSystemReady === false && (
                        <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Lock size={12} />
                            Config Required
                        </div>
                    )}
                    {isSystemReady === true && (
                        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse">
                            <ShieldCheck size={12} />
                            Sovereign Node Access
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-3xl font-black tracking-tighter text-white">Initialize Node</CardTitle>
                    <CardDescription className="text-gray-400 text-sm leading-relaxed">
                        Register your district or school site to deploy your dedicated EdIntel AI instance.
                    </CardDescription>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 px-8 py-6">
                    {isSystemReady === false && (
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium space-y-2">
                            <p className="font-bold uppercase tracking-wider">⚠️ System Alert: Node Not Configured</p>
                            <p>DATABASE_URL is missing or unreachable. Registration is currently disabled.</p>
                            <p className="font-bold underline">Fix required: Add your Postgres connection string to Vercel Environment Variables.</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="adminName" className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <User size={14} className="text-blue-500" />
                                Admin Full Name
                            </Label>
                            <Input
                                id="adminName"
                                name="adminName"
                                placeholder="Dr. Alvin West Jr."
                                required
                                className="bg-zinc-900/50 border-zinc-800 focus:border-blue-500 focus:ring-blue-500 text-white placeholder:text-zinc-600 h-12 rounded-xl transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="adminEmail" className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Mail size={14} className="text-emerald-500" />
                                Work Email
                            </Label>
                            <Input
                                id="adminEmail"
                                name="adminEmail"
                                type="email"
                                placeholder="alvin.west@mobile.edu"
                                required
                                className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500 text-white placeholder:text-zinc-600 h-12 rounded-xl transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="organizationName" className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Building2 size={14} className="text-purple-500" />
                                District / School Name
                            </Label>
                            <Input
                                id="organizationName"
                                name="organizationName"
                                placeholder="Mobile County School District"
                                required
                                className="bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500 text-white placeholder:text-zinc-600 h-12 rounded-xl transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <Lock size={14} className="text-zinc-500" />
                                Secure Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600 text-white placeholder:text-zinc-600 h-12 rounded-xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-1">
                                <Sparkles size={16} className="text-blue-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">Full Toolkit</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-tight">All AI generational modules seeded and ready.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-1">
                                <ShieldCheck size={16} className="text-emerald-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">30-Day Trial</span>
                            </div>
                            <p className="text-[10px] text-gray-400 leading-tight">Strict autonomous trial enforcement enabled.</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="px-8 pb-8 pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Securing Node...
                            </>
                        ) : (
                            <>
                                Establish Sovereign Access
                                <div className="p-1 rounded-full bg-black/10 group-hover:translate-x-1 transition-transform">
                                    <ShieldCheck size={16} />
                                </div>
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
