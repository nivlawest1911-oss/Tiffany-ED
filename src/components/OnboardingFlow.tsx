'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Brain, Target, Zap, Check, Cpu } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useCelebrate } from '@/context/CelebrationContext';

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
    const { celebrate } = useCelebrate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        districtName: '',
        objective: '',
        leadershipStyle: 'Visionary'
    });
    const [isFinishing, setIsFinishing] = useState(false);
    const router = useRouter();
    const { playClick } = useProfessionalSounds();

    const nextStep = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try { playClick(); } catch (err) { }
        setStep(prev => Math.min(prev + 1, 3));
    };

    const finishOnboarding = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsFinishing(true);
        try { playClick(); } catch (err) { }

        celebrate(
            'Executive Authorization Complete',
            'Your Sovereign ID has been minted. Full system access granted.',
            'achievement'
        );

        const identity = {
            ...formData,
            rank: 'REGIONAL LEADER',
            status: 'PROFESSIONAL',
            xp: 2500,
            joinedDate: new Date().toLocaleDateString()
        };
        localStorage.setItem('professional_identity', JSON.stringify(identity));
        localStorage.setItem('onboarding_complete', 'true');

        setTimeout(() => {
            if (onCompleteAction) onCompleteAction();
            router.push('/dashboard');
        }, 3000);
    };

    const steps = useMemo(() => [
        {
            title: "WELCOME",
            subtitle: "Executive Identity Sync",
            icon: Shield,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-intel-gold pl-4 py-1 italic">
                        "Welcome to the Sovereign OS. Define your institutional presence to begin."
                    </p>
                    <div className="relative group/input">
                        <div className="absolute -inset-1 bg-gradient-to-r from-intel-gold/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover/input:opacity-100 transition-opacity" />
                        <input
                            type="text"
                            placeholder="INPUT DISTRICT NAME OR LEAD ID..."
                            value={formData.districtName}
                            onChange={(e) => setFormData(prev => ({ ...prev, districtName: e.target.value }))}
                            className="relative w-full bg-black border border-white/10 rounded-xl p-5 text-white text-sm font-black uppercase tracking-[0.2em] focus:border-intel-gold outline-none transition-all placeholder:text-zinc-700 z-10"
                        />
                    </div>
                </div>
            )
        },
        {
            title: "PRIORITY GOALS",
            subtitle: "Strategic Focus Calibration",
            icon: Target,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        {LEADERSHIP_GOALS.map((obj) => (
                            <button
                                key={obj.id}
                                onClick={() => setFormData(prev => ({ ...prev, objective: obj.label }))}
                                className={`p-4 rounded-2xl border text-left transition-all ${formData.objective === obj.label ? 'bg-intel-gold/20 border-intel-gold' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest mb-1">{obj.label}</div>
                                <div className="text-[9px] text-zinc-500 font-medium">{obj.sub}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "ARCHETYPE",
            subtitle: "Synthesis Filter Selection",
            icon: Brain,
            content: (
                <div className="grid grid-cols-1 gap-3">
                    {STYLES.map((style) => (
                        <button
                            key={style.name}
                            onClick={() => setFormData(prev => ({ ...prev, leadershipStyle: style.name }))}
                            className={`p-4 rounded-xl border transition-all text-left ${formData.leadershipStyle === style.name ? 'bg-intel-gold text-black border-intel-gold' : 'bg-transparent border-white/10 text-zinc-500'}`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">{style.name}</span>
                            <p className="text-[9px] leading-relaxed mt-1 opacity-70">{style.desc}</p>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "DEPLOYMENT",
            subtitle: "Sovereign Link Stable",
            icon: Zap,
            content: (
                <div className="space-y-8 text-center pt-4">
                    <div className="relative w-24 h-24 mx-auto animate-pulse">
                        <div className="absolute inset-0 rounded-full border-2 border-intel-gold/30" />
                        <div className="absolute inset-2 rounded-full bg-intel-gold/10 flex items-center justify-center text-intel-gold">
                            <Check size={40} />
                        </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-black border border-white/10 text-left">
                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">Entity</span>
                            <span className="text-[10px] font-black uppercase text-white">{formData.districtName}</span>
                        </div>
                    </div>
                </div>
            )
        }
    ], [formData]);

    return (
        <div className="fixed inset-0 z-[1000] bg-[#050505] text-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {!isFinishing ? (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-16 h-16 rounded-3xl bg-intel-gold/10 border border-intel-gold/20 flex items-center justify-center text-intel-gold">
                                    {(() => { const Icon = steps[step].icon; return <Icon size={32} />; })()}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-0.5">{steps[step].title}</h2>
                                    <p className="text-[10px] font-bold text-intel-gold uppercase tracking-[0.4em]">{steps[step].subtitle}</p>
                                </div>
                            </div>

                            <div className="min-h-[300px]">{steps[step].content}</div>

                            <div className="mt-14 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className={`h-1 rounded-full ${i === step ? 'w-8 bg-intel-gold' : 'w-2 bg-zinc-800'}`} />
                                    ))}
                                </div>
                                {step < 3 ? (
                                    <button onClick={nextStep} disabled={step === 0 && !formData.districtName} className="px-10 py-5 rounded-[2rem] bg-intel-gold text-black font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all disabled:opacity-20">NEXT STEP</button>
                                ) : (
                                    <button onClick={finishOnboarding} className="px-10 py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-intel-gold transition-all">LAUNCH SYSTEM</button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                            <Cpu className="text-intel-gold w-16 h-16 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Deploying OS</h2>
                            <p className="text-zinc-500 font-mono text-[8px] uppercase tracking-[0.4em]">Initializing Administrative Console...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-10 flex gap-4 opacity-20 text-[8px] font-mono uppercase tracking-[0.5em]">
                <span>Neural Authorization Active</span>
                <span>{`//`}</span>
                <span>TLS 1.3 Secure</span>
            </div>
        </div>
    );
}
