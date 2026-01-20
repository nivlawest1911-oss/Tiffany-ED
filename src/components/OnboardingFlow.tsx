'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Brain, Target, Users, ArrowRight, Zap, Check, Lock, Cpu, Globe } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import Confetti from 'react-confetti';

export default function OnboardingFlow({ onCompleteAction }: { onCompleteAction?: () => void }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        districtName: '',
        objective: '',
        leadershipStyle: 'Visionary'
    });
    const [isFinishing, setIsFinishing] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const router = useRouter();
    const { playClick, playHover } = useProfessionalSounds();

    const styles = [
        { name: 'Visionary', desc: 'Focus on future-proof growth and cultural transformation.' },
        { name: 'Strategic', desc: 'Prioritize data-driven efficiency and resource optimization.' },
        { name: 'Decisive', desc: 'High-speed execution and administrative authority.' },
        { name: 'Collaborative', desc: 'Building consensus and human-centric ecosystems.' },
        { name: 'Stoic', desc: 'Resilient leadership through policy and disciplined compliance.' }
    ];

    const nextStep = () => {
        playClick();
        if (step < 3) setStep(step + 1);
    };

    const finishOnboarding = () => {
        setIsFinishing(true);
        playClick();
        setShowConfetti(true);

        // Save to localStorage
        const identity = {
            ...formData,
            rank: 'REGIONAL LEADER',
            status: 'PROFESSIONAL',
            xp: 2500,
            joinedDate: new Date().toLocaleDateString()
        };
        localStorage.setItem('professional_identity', JSON.stringify(identity));
        localStorage.setItem('onboarding_complete', 'true');

        if (onCompleteAction) onCompleteAction();
        setTimeout(() => {
            router.push('/dashboard');
        }, 4000);
    };

    const steps = [
        {
            title: "WELCOME",
            subtitle: "Setting Up Your Professional Profile",
            icon: Shield,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 italic">
                        "Welcome to EdIntel. To help you lead effectively, we first need to set up your executive profile."
                    </p>
                    <div className="relative group/input">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover/input:opacity-100 transition-opacity" />
                        <input
                            type="text"
                            placeholder="INPUT DISTRICT NAME OR LEAD ID..."
                            value={formData.districtName}
                            onChange={(e) => setFormData({ ...formData, districtName: e.target.value })}
                            className="relative w-full bg-zinc-950 border border-white/10 rounded-xl p-5 text-white text-sm font-black uppercase tracking-[0.2em] focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-700 z-10"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-indigo-500 font-mono flex items-center gap-2 z-20 pointer-events-none">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                            {formData.districtName ? 'VERIFYING ENTITY...' : 'AWAITING INPUT...'}
                        </div>
                    </div>
                    {formData.districtName && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest pl-2">
                            Detected New Node: {formData.districtName} // Initializing Neural Pathway...
                        </motion.div>
                    )}
                </div>
            )
        },
        {
            title: "PRIORITY GOALS",
            subtitle: "Setting Your Leadership Focus",
            icon: Target,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Define your primary mission. This helps your professional team prioritize the most important areas of focus.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { id: 'time', label: 'Reclaiming Administrative Time', sub: 'Automating heavy workflows' },
                            { id: 'gaps', label: 'Closing Achievement Gaps', sub: 'Data-driven student success modeling' },
                            { id: 'policy', label: 'Policy Protection & Compliance', sub: 'Legislative support' },
                            { id: 'tech', label: 'Strategic AI Integration', sub: 'Full spectrum system evolution' }
                        ].map((obj) => (
                            <button
                                key={obj.id}
                                onClick={() => setFormData({ ...formData, objective: obj.label })}
                                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${formData.objective === obj.label
                                    ? 'bg-indigo-600/20 border-indigo-500'
                                    : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex justify-between items-center relative z-10">
                                    <div>
                                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${formData.objective === obj.label ? 'text-white' : 'text-zinc-400'}`}>{obj.label}</div>
                                        <div className="text-[9px] text-zinc-500 font-medium">{obj.sub}</div>
                                    </div>
                                    {formData.objective === obj.label && <motion.div layoutId="check"><Check size={14} className="text-indigo-400" /></motion.div>}
                                </div>
                                {formData.objective === obj.label && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />}
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "LEADERSHIP STYLE",
            subtitle: "Syncing with Your Executive Team",
            icon: Brain,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Your leadership style dictates the pitch, tone, and strategic filters of your delegates. Choose your archetype.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {styles.map((style) => (
                            <button
                                key={style.name}
                                onClick={() => setFormData({ ...formData, leadershipStyle: style.name })}
                                className={`p-4 rounded-xl border transition-all text-left ${formData.leadershipStyle === style.name
                                    ? 'bg-white text-black border-white shadow-xl shadow-white/10'
                                    : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{style.name}</span>
                                    {formData.leadershipStyle === style.name && <Zap size={10} fill="currentColor" />}
                                </div>
                                <p className={`text-[9px] leading-relaxed ${formData.leadershipStyle === style.name ? 'text-black/60' : 'text-zinc-500'}`}>
                                    {style.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "SETUP COMPLETE",
            subtitle: "Finalizing Your Profile",
            icon: Zap,
            content: (
                <div className="space-y-8 text-center pt-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30"
                        />
                        <div className="absolute inset-2 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Check size={40} />
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 text-left relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex justify-between text-[7px] font-mono text-indigo-500 uppercase tracking-[0.2em] mb-4">
                            <span>Identity Profile</span>
                            <span className="animate-pulse">LATENCY: 12ms</span>
                        </div>
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[8px] font-mono text-zinc-500">LEADER</span>
                                <span className="text-[10px] font-black uppercase text-white tracking-widest">{formData.districtName || 'GUEST LEADER'}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[8px] font-mono text-zinc-500">OBJECTIVE</span>
                                <span className="text-[10px] font-bold text-indigo-400">{formData.objective || 'STRATEGIC_PLANNING'}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[8px] font-mono text-zinc-500">ARCHETYPE</span>
                                <span className="text-[10px] font-bold text-amber-500 uppercase">{formData.leadershipStyle}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Preparing your professional leadership profile...</p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} colors={['#6366f1', '#a855f7', '#fbbf24']} />}

            {/* Ambient Background FX */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(251,191,36,0.03)_0%,transparent_50%)] pointer-events-none" />

            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Header Diagnostics */}
                    <div className="flex justify-between items-center mb-8 px-4 opacity-50">
                        <div className="flex items-center gap-2">
                            <Globe size={12} className="text-zinc-500" />
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Global Leadership Network (v6.2)</span>
                        </div>
                        <div className="flex items-center gap-2 text-rose-500">
                            <Lock size={10} />
                            <span className="text-[8px] font-mono uppercase tracking-widest">Secured Connection</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isFinishing ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                className="bg-zinc-900/60 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                            >
                                {/* Active Scan Line */}
                                <motion.div
                                    animate={{ x: [-500, 1000] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 h-full w-px bg-indigo-500/20 z-0"
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-5 mb-10">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/5"
                                        >
                                            {steps[step] && (() => {
                                                const StepIcon = steps[step].icon;
                                                return <StepIcon size={32} />;
                                            })()}
                                        </motion.div>
                                        <div>
                                            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-0.5">{steps[step]?.title}</h2>
                                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.4em]">{steps[step]?.subtitle}</p>
                                        </div>
                                    </div>

                                    {steps[step]?.content}

                                    <div className="mt-14 flex items-center justify-between">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-indigo-500' : 'w-2 bg-zinc-800'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {step < 3 ? (
                                            <button
                                                onClick={nextStep}
                                                disabled={step === 0 && !formData.districtName}
                                                className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-black shadow-xl hover:shadow-indigo-500/20"
                                            >
                                                Next Step <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={finishOnboarding}
                                                className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/20"
                                            >
                                                Enter Dashboard <Zap size={16} fill="currentColor" className="animate-pulse" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-40 h-40 mb-10 relative mx-auto">
                                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
                                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Cpu className="text-indigo-400 w-16 h-16 animate-pulse" />
                                    </div>
                                </div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white">Profile Complete</h2>
                                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-12">Finalizing your executive profile...</p>

                                <div className="flex justify-center gap-4">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Background Data Stream */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.03] pointer-events-none select-none font-mono text-[80px] font-black tracking-tighter whitespace-nowrap overflow-hidden z-0">
                EDINTEL LEADERSHIP NETWORK EDINTEL LEADERSHIP NETWORK EDINTEL LEADERSHIP NETWORK
            </div>
        </div>
    );
}
