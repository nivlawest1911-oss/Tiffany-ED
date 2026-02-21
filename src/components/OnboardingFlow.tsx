'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Target, Zap, Cpu, GraduationCap, Building2, HeartPulse, UserCircle } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useCelebrate } from '@/context/CelebrationContext';
import { toast } from 'sonner';

const ROLES = [
    { id: 'TEACHER', label: 'Educator', icon: GraduationCap, bio: 'Teaching & Instruction' },
    { id: 'ADMIN', label: 'Administrator', icon: Building2, bio: 'Leadership & Policy' },
    { id: 'COUNSELOR', label: 'Counselor', icon: HeartPulse, bio: 'Student Support & Wellness' },
    { id: 'STUDENT', label: 'Student', icon: UserCircle, bio: 'Academic Growth' }
];

const LEADER_GOALS = [
    { id: 'time', label: 'Time Optimization', sub: 'Automating heavy workflows' },
    { id: 'gaps', label: 'Closing Achievement Gaps', sub: 'Data-driven success modeling' },
    { id: 'policy', label: 'Compliance & Safety', sub: 'Institutional protection' },
    { id: 'tech', label: 'AI Integration', sub: 'Strategic platform evolution' }
];

const TEACHER_GOALS = [
    { id: 'lesson', label: 'Lesson Preparation', sub: 'Generating high-fidelity materials' },
    { id: 'grading', label: 'Efficiency in Grading', sub: 'Personalized student feedback' },
    { id: 'wellness', label: 'Classroom Wellness', sub: 'Behavioral support & empathy' },
    { id: 'differentiation', label: 'IEP/Differentiation', sub: 'Tailoring instruction' }
];

export default function OnboardingFlow({ onCompleteAction }: { onCompleteAction?: () => void }) {
    const { celebrate } = useCelebrate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        role: '',
        districtName: '',
        objective: '',
        leadershipStyle: 'Visionary'
    });
    const [isFinishing, setIsFinishing] = useState(false);
    const router = useRouter();
    const { playClick } = useProfessionalSounds();

    const nextStep = useCallback((e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try { playClick(); } catch (err) { }
        setStep(prev => Math.min(prev + 1, 3));
    }, [playClick]);

    const finishOnboarding = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsFinishing(true);
        try { playClick(); } catch (err) { }

        try {
            const response = await fetch('/api/auth/set-role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    role: formData.role,
                    districtName: formData.districtName,
                    position: formData.role === 'TEACHER' ? 'Educator' : formData.role
                })
            });

            if (!response.ok) throw new Error('Persistence failed');

            celebrate(
                'Identity Authorization Complete',
                'Your EdIntel ID has been minted. Full system access granted.',
                'achievement'
            );

            localStorage.setItem('onboarding_complete', 'true');

            setTimeout(() => {
                if (onCompleteAction) onCompleteAction();
                router.push('/dashboard');
            }, 3000);
        } catch (err) {
            setIsFinishing(false);
            toast.error('Onboarding Interrupted', { description: 'The EdIntel handshake failed. Please retry.' });
        }
    };

    const steps = useMemo(() => [
        {
            title: "IDENTITY",
            subtitle: "Professional Role Selection",
            icon: UserCircle,
            content: (
                <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => {
                                setFormData(prev => ({ ...prev, role: role.id }));
                                nextStep();
                            }}
                            className={`p-4 rounded-3xl border flex flex-col items-center gap-2 transition-all ${formData.role === role.id ? 'bg-intel-gold border-intel-gold text-black' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                        >
                            <role.icon size={24} />
                            <div className="text-[10px] font-black uppercase tracking-widest">{role.label}</div>
                            <div className="text-[8px] opacity-60 font-mono uppercase">{role.bio}</div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "CONTEXT",
            subtitle: "Institutional Alignment",
            icon: Shield,
            content: (
                <div className="space-y-6">
                    <p className="text-zinc-400 text-[10px] uppercase tracking-widest border-l-2 border-intel-gold pl-4 py-1 italic">
                        {formData.role === 'STUDENT' ? "Input your school or site name." : "Provide your district name for strategic mapping."}
                    </p>
                    <input
                        type="text"
                        placeholder="INPUT NAME..."
                        value={formData.districtName}
                        onChange={(e) => setFormData(prev => ({ ...prev, districtName: e.target.value }))}
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white text-sm font-black uppercase tracking-[0.2em] focus:border-intel-gold outline-none transition-all placeholder:text-zinc-700"
                    />
                </div>
            )
        },
        {
            title: "OBJECTIVE",
            subtitle: "Performance Calibration",
            icon: Target,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        {(formData.role === 'TEACHER' ? TEACHER_GOALS : LEADER_GOALS).map((obj) => (
                            <button
                                key={obj.id}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, objective: obj.label }));
                                    nextStep();
                                }}
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
            title: "DEPLOY",
            subtitle: "System Handshake Stable",
            icon: Zap,
            content: (
                <div className="space-y-8 text-center pt-4">
                    <div className="p-6 rounded-3xl bg-black border border-white/10 text-left space-y-3">
                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">PROFESSION</span>
                            <span className="text-[10px] font-black uppercase text-white">{formData.role}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">SITE/DISTRICT</span>
                            <span className="text-[10px] font-black uppercase text-white">{formData.districtName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/5 pb-2">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">MISSION</span>
                            <span className="text-[10px] font-black uppercase text-intel-gold">{formData.objective}</span>
                        </div>
                    </div>
                </div>
            )
        }
    ], [formData, nextStep]);

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
                                    <button onClick={nextStep} disabled={(step === 1 && !formData.districtName)} className="px-10 py-5 rounded-[2rem] bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-intel-gold hover:text-black transition-all disabled:opacity-20">BACKDOOR SKIP</button>
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
