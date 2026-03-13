import React from 'react';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-[#050505] flex flex-col lg:flex-row items-stretch overflow-hidden">
            {/* Left Side: Brand Narrative & Value Prop */}
            <div className="flex-1 relative hidden lg:flex flex-col justify-center px-12 xl:px-24 bg-[#080808] border-r border-zinc-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
                
                <div className="relative z-10 space-y-8 max-w-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/5">
                            <span className="text-black font-black text-2xl tracking-tighter italic">EI</span>
                        </div>
                        <h1 className="text-white font-black text-2xl tracking-tighter uppercase">EdIntel</h1>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl xl:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">SOVEREIGN</span> DELEGATE.
                        </h2>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-md">
                            Deploy an enterprise-grade AI educational platform for your entire district with zero friction.
                        </p>
                    </div>

                    <div className="space-y-6 pt-12">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-xl bg-blue-500/10 text-blue-500">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight mb-1">Instant Deployment</h3>
                                <p className="text-gray-500 text-sm">Your secure node is provisioned and seeded in under 60 seconds.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight mb-1">FERPA/HIPAA Guarded</h3>
                                <p className="text-gray-500 text-sm">Enterprise-grade encryption with district-level data isolation.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-xl bg-purple-500/10 text-purple-500">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight mb-1">Seeded Tokens</h3>
                                <p className="text-gray-500 text-sm">Initial operational tokens provided to immediately scale your output.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-zinc-950/50 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Right Side: Registration Gateway */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:py-0 relative bg-black">
                {/* Mobile Header */}
                <div className="lg:hidden w-full max-w-lg mb-12 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <span className="text-black font-black text-xl tracking-tighter italic">EI</span>
                        </div>
                        <span className="text-white font-black text-xl tracking-tighter uppercase">EdIntel</span>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-500">
                        <ShieldCheck size={20} />
                    </div>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-lg relative z-10 px-0 sm:px-6">
                    <React.Suspense fallback={<div className="p-12 rounded-3xl bg-[#111] border border-zinc-800 animate-pulse flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800" />
                        <div className="h-4 w-48 bg-zinc-900 rounded-full" />
                    </div>}>
                        <RegistrationForm />
                    </React.Suspense>
                </div>

                {/* Aesthetic Backgrounds for Mobile/Gaps */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
                
                <div className="mt-12 text-zinc-600 text-[10px] font-bold uppercase tracking-widest text-center">
                    System Version: EdIntel-v1.2.0-Production_Node
                </div>
            </div>
        </main>
    );
}
