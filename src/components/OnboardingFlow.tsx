'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Brain, Target, ArrowRight, Zap, Check, Lock, Cpu, Globe } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import Confetti from 'react-confetti';

const STYLES = [
    { name: 'Visionary', desc: 'Focus on future-proof growth and cultural transformation.' },
    { name: 'Strategic', desc: 'Prioritize data-driven efficiency and resource optimization.' },
    { name: 'Decisive', desc: 'High-speed execution and administrative authority.' },
    { name: 'Collaborative', desc: 'Building consensus and human-centric ecosystems.' },
    { name: 'Stoic', desc: 'Resilient leadership through policy and disciplined compliance.' }
];

const LEADERSHIP_GOALS = [
    { id: 'time', label: 'Reclaiming Administrative Time', sub: 'Automating heavy workflows' },
    { id: 'gaps', label: 'Closing Achievement Gaps', sub: 'Data-driven student success modeling' },
    { id: 'policy', label: 'Policy Protection & Compliance', sub: 'Legislative support' },
    { id: 'tech', label: 'Strategic AI Integration', sub: 'Full spectrum system evolution' }
];

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
    const { playClick } = useProfessionalSounds();

    const nextStep = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        console.log("ONBOARDING: Next Step triggered. From Step:", step);

        try {
            playClick();
        } catch (err) { }

        setStep(prev => {
            if (prev < 3) return prev + 1;
            return prev;
        });
    };

    const finishOnboarding = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        console.log("ONBOARDING: Finish triggered.");
        setIsFinishing(true);
        try { playClick(); } catch (err) { }
        setShowConfetti(true);

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
        }, 3500);
    };

    const steps = useMemo(() => [
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
                            onChange={(e) => setFormData(prev => ({ ...prev, districtName: e.target.value }))}
                            data-no-intelligence="true"
                            className="relative w-full bg-zinc-950 border border-white/10 rounded-xl p-5 text-white text-sm font-black uppercase tracking-[0.2em] focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-700 z-10"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-indigo-500 font-mono flex items-center gap-2 z-20 pointer-events-none">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                            {formData.districtName ? 'VERIFYING ENTITY...' : 'AWAITING INPUT...'}
                        </div>
                    </div>
                    {formData.districtName && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest pl-2">
                            Detected New Node: {formData.districtName} {" // "} Initializing Neural Pathway...
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
                    <p className="text-zinc-400 text-sm leading-relaxed text-xs">
                        Define your primary mission. This helps focus your professional delegates.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {LEADERSHIP_GOALS.map((obj) => (
                            <button
                                key={obj.id}
                                type="button"
                                data-no-intelligence="true"
                                onClick={() => setFormData(prev => ({ ...prev, objective: obj.label }))}
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
                                    {formData.objective === obj.label && <Check size={14} className="text-indigo-400" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "LEADERSHIP STYLE",
            subtitle: "Syncing with Executive Team",
            icon: Brain,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-sm leading-relaxed text-xs">
                        Select your Archetype to calibrate AI output filters.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {STYLES.map((style) => (
                            <button
                                key={style.name}
                                type="button"
                                data-no-intelligence="true"
                                onClick={() => setFormData(prev => ({ ...prev, leadershipStyle: style.name }))}
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
            title: "FINALIZING",
            subtitle: "Ready for Deployment",
            icon: Zap,
            content: (
                <div className="space-y-8 text-center pt-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30" />
                        <div className="absolute inset-2 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Check size={40} />
                        </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 text-left relative overflow-hidden">
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[8px] font-mono text-zinc-500 uppercase">Leader</span>
                                <span className="text-[10px] font-black uppercase text-white tracking-widest">{formData.districtName || 'GUEST'}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[8px] font-mono text-zinc-500 uppercase">Archetype</span>
                                <span className="text-[10px] font-bold text-amber-500 uppercase">{formData.leadershipStyle}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest animate-pulse">Establishing secure neural link...</p>
                </div>
            )
        }
    ], [formData]);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-hidden pointer-events-auto">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} colors={['#6366f1', '#a855f7', '#fbbf24']} />}

            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Diagnostic Header */}
                    <div className="flex justify-between items-center mb-8 px-4 opacity-30 select-none">
                        <div className="flex items-center gap-2">
                            <Globe size={12} />
                            <span className="text-[8px] font-mono uppercase tracking-widest">Leadership Grid v6.3</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock size={10} />
                            <span className="text-[8px] font-mono uppercase tracking-widest">TLS 1.3 Active</span>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-zinc-900 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                        <div className="relative z-50">
                            {/* Step Header */}
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    {(() => {
                                        const StepIcon = steps[step].icon;
                                        return <StepIcon size={32} />;
                                    })()}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-0.5">{steps[step].title}</h2>
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.4em]">{steps[step].subtitle}</p>
                                </div>
                            </div>

                            {/* Animated Content Area */}
                            <div className="min-h-[300px] relative">
                                <AnimatePresence mode="wait">
                                    {!isFinishing ? (
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {steps[step].content}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-10"
                                        >
                                            <div className="w-24 h-24 mb-6 relative mx-auto">
                                                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
                                                <div className="absolute inset-2 flex items-center justify-center">
                                                    <Cpu className="text-indigo-400 w-10 h-10 animate-pulse" />
                                                </div>
                                            </div>
                                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">Access Granted</h2>
                                            <p className="text-zinc-500 font-mono text-[8px] uppercase tracking-[0.4em]">Initializing Administrative Console...</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Controls */}
                            {!isFinishing && (
                                <div className="mt-14 flex items-center justify-between relative z-[60]">
                                    <div className="flex gap-1.5 focus-within:ring-2 focus-within:ring-indigo-500 rounded-full px-2">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-indigo-500' : 'w-2 bg-zinc-800'}`}
                                            />
                                        ))}
                                    </div>

                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            data-no-intelligence="true"
                                            disabled={step === 0 && !formData.districtName}
                                            className="group relative z-[70] flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:pointer-events-none shadow-xl cursor-pointer"
                                        >
                                            Next Step <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={finishOnboarding}
                                            data-no-intelligence="true"
                                            className="group relative z-[70] flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl cursor-pointer"
                                        >
                                            Launch System <Zap size={16} fill="currentColor" className="animate-pulse" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
            </div>
        </div>
    );
}
