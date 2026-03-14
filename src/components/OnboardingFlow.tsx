'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useCallback, memo, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shield, Target, Zap, Cpu, GraduationCap, Building2, HeartPulse, UserCircle, Loader2 } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useCelebrate } from '@/context/CelebrationContext';
import { useIntelligence } from '@/context/IntelligenceContext';
import { useSovereignState } from '@/context/SovereignState';
import { getIntelligenceFor } from '@/lib/intelligence-engine';
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

// --- Sub-components for better INP performance ---

const StepIdentity = memo(({ selectedRole, onSelect }: { selectedRole: string, onSelect: (roleId: string) => void }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            {ROLES.map((role) => (
                <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(role.id)}
                    aria-label={`Select Role: ${role.label}, ${role.bio}`}
                    className={`p-4 rounded-2xl border backdrop-blur-sm transition-all flex flex-col items-center gap-2 ${selectedRole === role.id ? 'bg-gradient-to-br from-[#FFB300]/30 to-amber-600/20 border-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.3)]' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                >
                    <role.icon size={24} className={selectedRole === role.id ? 'text-[#FFB300]' : 'text-zinc-400'} />
                    <div className="text-[10px] font-black uppercase tracking-widest">{role.label}</div>
                    <div className="text-[8px] opacity-60 font-mono uppercase">{role.bio}</div>
                </motion.button>
            ))}
        </div>
    );
});
StepIdentity.displayName = 'StepIdentity';

const StepContext = memo(({ role, initialValue, onUpdate }: { role: string, initialValue: string, onUpdate: (val: string) => void }) => {
    const [localName, setLocalName] = useState(initialValue);

    // Sync local state if step changes or initialValue is updated externally (rare in this flow)
    useEffect(() => {
        setLocalName(initialValue);
    }, [initialValue]);

    return (
        <div className="space-y-6">
            <p className="text-zinc-400 text-[10px] uppercase tracking-widest border-l-2 border-noble-gold pl-4 py-1 italic">
                {role === 'STUDENT' ? "Input your school or site name." : "Provide your district name for strategic mapping."}
            </p>
            <input
                type="text"
                placeholder="INPUT NAME..."
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                onBlur={() => onUpdate(localName)}
                className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white text-sm font-black uppercase tracking-[0.2em] focus:border-noble-gold outline-none transition-all placeholder:text-zinc-700"
            />
        </div>
    );
});
StepContext.displayName = 'StepContext';

const StepObjective = memo(({ role, selectedObjective, onSelect }: { role: string, selectedObjective: string, onSelect: (label: string) => void }) => {
    const goals = role === 'TEACHER' ? TEACHER_GOALS : LEADER_GOALS;
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
                {goals.map((obj) => (
                    <motion.button
                        key={obj.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(obj.label)}
                        aria-label={`Select Objective: ${obj.label}, ${obj.sub}`}
                        className={`p-4 rounded-2xl border text-left backdrop-blur-sm transition-all ${selectedObjective === obj.label ? 'bg-gradient-to-r from-[#FFB300]/30 to-amber-600/20 border-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                    >
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1">{obj.label}</div>
                        <div className="text-[9px] text-zinc-500 font-medium">{obj.sub}</div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
});
StepObjective.displayName = 'StepObjective';

const StepDeploy = memo(({ formData, onToggleSwarm }: { formData: any, onToggleSwarm: (val: boolean) => void }) => {
    return (
        <div className="space-y-6 text-center pt-2">
            <div className="p-5 rounded-3xl bg-black border border-white/10 text-left space-y-3">
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
                    <span className="text-[10px] font-black uppercase text-noble-gold">{formData.objective}</span>
                </div>
            </div>

            {/* SWARM AUTHORIZATION TOGGLE */}
            <button
                onClick={() => onToggleSwarm(!formData.swarmAuthorized)}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${formData.swarmAuthorized ? 'bg-noble-gold/20 border-noble-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${formData.swarmAuthorized ? 'bg-noble-gold text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                        <Cpu size={14} />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white">Authorize Swarm Ops</div>
                        <div className="text-[8px] text-zinc-500 font-mono uppercase">Enable Autonomous Logic Chain</div>
                    </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.swarmAuthorized ? 'bg-noble-gold' : 'bg-zinc-800'}`}>
                    <motion.div
                        animate={{ x: formData.swarmAuthorized ? 20 : 2 }}
                        className="absolute top-1 left-0 w-3 h-3 rounded-full bg-white shadow-sm"
                    />
                </div>
            </button>
        </div>
    );
});

StepDeploy.displayName = 'StepDeploy';

const StepSynthesis = memo(({ role, formData }: { role: string, formData: any }) => {
    const [logLines, setLogLines] = useState<string[]>([]);
    const agentInfo = useMemo(() => {
        switch (role) {
            case 'ADMIN':
                return { name: "Dr. Alvin West", role: "Chief Architect", avatar: "/images/avatars/dr_alvin_west_official.png", color: "text-noble-gold" };
            case 'TEACHER':
                return { name: "Keisha Reynolds", role: "Strategic Lead", avatar: "/images/avatars/keisha_reynolds_premium.png", color: "text-emerald-400" };
            case 'COUNSELOR':
                return { name: "André Patterson", role: "Tactical Specialist", avatar: "/images/avatars/andre_patterson_premium.png", color: "text-indigo-400" };
            default:
                return { name: "Learning Architect", role: "Cognitive Lead", avatar: "/images/avatars/student_focus.png", color: "text-sky-400" };
        }
    }, [role]);

    useEffect(() => {
        const potentialLines = [
            `> INITIALIZING NEURAL LINK...`,
            `> TARGET: ${formData.districtName.toUpperCase()}`,
            `> SECTOR: ${formData.role}`,
            `> MISSION: ${formData.objective.toUpperCase()}`,
            `> SYNCHRONIZING SOVEREIGN NODES...`,
            `> VAULT [ACTIVE]`,
            `> ADMIN [ACTIVE]`,
            `> WELLNESS [ACTIVE]`,
            formData.swarmAuthorized ? `> AUTHORIZING SWARM PROTOCOLS...` : `> SWARM STANDBY...`,
            formData.swarmAuthorized ? `> DECOMPOSING STRATEGIC GOAL...` : `> MANUAL TASKING ACTIVE...`,
            `> INGESTING STRATEGIC CONTEXT...`,
            `> MIRRORING DIGITAL TWIN STATE...`,
            `> SYNCHRONIZING WITH ${agentInfo.name.toUpperCase()}...`,
            `> NEURAL SYNOPSIS ACHIEVED.`
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < potentialLines.length) {
                setLogLines(prev => [...prev.slice(-3), potentialLines[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, [formData, agentInfo]);

    return (
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 rounded-full border-2 border-noble-gold/30 p-1 bg-black overflow-hidden relative z-10"
                >
                    <Image
                        src={agentInfo.avatar}
                        alt={agentInfo.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                </motion.div>

                {/* DIGITAL TWIN PROJECTION EFFECT */}
                <motion.div
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-noble-gold/10 blur-xl z-0"
                />

                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border border-dashed border-noble-gold/20 rounded-full"
                />
            </div>

            <div className="text-center space-y-1">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-[9px] font-black uppercase tracking-[0.5em] ${agentInfo.color}`}
                >
                    Agent Assigned
                </motion.div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                    {agentInfo.name}
                </h3>
                <p className="text-zinc-500 font-mono text-[7px] uppercase tracking-[0.3em]">
                    {agentInfo.role}
                </p>
            </div>

            {/* NEURAL INGESTION LOG */}
            <div className="w-full max-w-[280px] h-20 bg-black/40 border border-white/5 rounded-xl p-3 font-mono text-[8px] overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {logLines.map((line, idx) => (
                        <motion.div
                            key={line + idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-emerald-500/80 mb-1"
                        >
                            {line}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Loader2 size={10} className="text-noble-gold animate-spin" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Neural Handshake stable...</span>
            </div>
        </div>
    );
});

StepSynthesis.displayName = 'StepSynthesis';

// --- Main component ---

const OnboardingFlow = memo(({ onCompleteAction }: { onCompleteAction?: () => void }) => {
    const { celebrate } = useCelebrate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        role: '',
        districtName: '',
        objective: '',
        leadershipStyle: 'Visionary',
        swarmAuthorized: false
    });
    const [isFinishing, setIsFinishing] = useState(false);
    const [isSynthesizingAgent, setIsSynthesizingAgent] = useState(false);
    const router = useRouter();
    const { playClick } = useProfessionalSounds();
    const { generateBriefing } = useIntelligence();
    const { updateOnboarding } = useSovereignState();

    const nextStep = useCallback((e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        // Defer audio to next frame so it doesn't block paint
        requestAnimationFrame(() => { try { playClick(); } catch (err) { } });
        startTransition(() => {
            setStep(prev => Math.min(prev + 1, 3));
        });
    }, [playClick]);

    const finishOnboarding = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsFinishing(true);
        requestAnimationFrame(() => { try { playClick(); } catch (err) { } });

        // Always persist onboarding data locally for resilience
        const onboardingData = {
            role: formData.role,
            districtName: formData.districtName,
            objective: formData.objective,
            swarmAuthorized: formData.swarmAuthorized,
            position: formData.role === 'TEACHER' ? 'Educator' : formData.role,
            completedAt: new Date().toISOString()
        };
        localStorage.setItem('edintel_onboarding_data', JSON.stringify(onboardingData));
        updateOnboarding(onboardingData);

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

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                // If it's an auth issue (401), proceed anyway — data is saved locally
                if (response.status === 401) {

                } else {
                    throw new Error(errorData.reason || errorData.error || 'Persistence failed');
                }
            }
        } catch (err: any) {
            // Only block the flow for non-auth errors
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            if (!errorMsg.includes('Persistence failed')) {

            } else {
                setIsFinishing(false);
                toast.error('Onboarding Interrupted', {
                    description: `The EdIntel handshake failed: ${errorMsg}. Please retry.`
                });
                return;
            }
        }

        // Always fire celebration and proceed
        celebrate(
            'Identity Authorization Complete',
            'Your EdIntel ID has been minted. Full system access granted.',
            'achievement'
        );

        localStorage.setItem('onboarding_complete', 'true');

        // Functional Swarm Handshake (Phase 4)
        if (formData.swarmAuthorized) {

            fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scenario: formData.objective })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result) {

                        localStorage.setItem('edintel_swarm_result', JSON.stringify(data.result));
                    }
                })

        }

        // Neural Synthesis Phase
        setIsSynthesizingAgent(true);

        const agentMap: Record<string, string> = {
            'ADMIN': 'Legacy Profile',
            'TEACHER': 'Teacher Guard',
            'COUNSELOR': 'Counselor Briefing',
            'STUDENT': 'Student Focus'
        };

        const agentKey = agentMap[formData.role] || 'Legacy Profile';
        const info = getIntelligenceFor(agentKey);

        setTimeout(() => {
            if (info) {
                generateBriefing({
                    title: `System Initialization: ${info.title}`,
                    description: `Welcome to EdIntel, ${formData.districtName} Lead. I am ${info.role === 'Executive Lead' ? 'Dr. Alvin West' : info.role}, and I have been assigned as your primary Neural Delegate. My algorithms are already mapping your objective: ${formData.objective}. We are ready to begin the strategic transformation of your district. Access the Admin command whenever you are ready to review the first tactical directives.`,
                    stats: info.stats,
                    role: info.role,
                    avatarImage: info.avatar,
                    videoSrc: info.video,
                    audioSrc: info.audio,
                    abilityType: info.abilityType
                });
            }

            if (onCompleteAction) onCompleteAction();
            router.push('/the-room');
        }, 4000); // 4s for synthesis animation
    };

    const stepsMetadata = useMemo(() => [
        { title: "IDENTITY", subtitle: "Professional Role Selection", icon: UserCircle },
        { title: "CONTEXT", subtitle: "Institutional Alignment", icon: Shield },
        { title: "OBJECTIVE", subtitle: "Performance Calibration", icon: Target },
        { title: "DEPLOY", subtitle: "System Handshake Stable", icon: Zap }
    ], []);

    const updateFormData = useCallback((updates: Partial<typeof formData>) => {
        startTransition(() => {
            setFormData(prev => ({ ...prev, ...updates }));
        });
    }, []);

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <StepIdentity
                        selectedRole={formData.role}
                        onSelect={(role) => {
                            updateFormData({ role });
                            nextStep();
                        }}
                    />
                );
            case 1:
                return (
                    <StepContext
                        role={formData.role}
                        initialValue={formData.districtName}
                        onUpdate={(districtName) => updateFormData({ districtName })}
                    />
                );
            case 2:
                return (
                    <StepObjective
                        role={formData.role}
                        selectedObjective={formData.objective}
                        onSelect={(objective) => {
                            updateFormData({ objective });
                            nextStep();
                        }}
                    />
                );
            case 3:
                return (
                    <StepDeploy
                        formData={formData}
                        onToggleSwarm={(val) => updateFormData({ swarmAuthorized: val })}
                    />
                );
            default:
                return null;
        }
    };

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
                                <div className="w-16 h-16 rounded-3xl bg-noble-gold/10 border border-noble-gold/20 flex items-center justify-center text-noble-gold">
                                    {(() => { const Icon = stepsMetadata[step].icon; return <Icon size={32} />; })()}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-0.5">{stepsMetadata[step].title}</h2>
                                    <p className="text-[10px] font-bold text-noble-gold uppercase tracking-[0.4em]">{stepsMetadata[step].subtitle}</p>
                                </div>
                            </div>

                            <div className="min-h-[300px]">{renderStepContent()}</div>

                            <div className="mt-14 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className={`h-1 rounded-full ${i === step ? 'w-8 bg-noble-gold' : 'w-2 bg-zinc-800'}`} />
                                    ))}
                                </div>
                                {step < 3 ? (
                                    <button onClick={nextStep} disabled={(step === 1 && !formData.districtName)} className="px-10 py-5 rounded-[2rem] bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-noble-gold hover:text-black transition-all disabled:opacity-20">NEXT STEP</button>
                                ) : (
                                    <button onClick={finishOnboarding} className="px-10 py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-noble-gold transition-all">LAUNCH SYSTEM</button>
                                )}
                            </div>
                        </motion.div>
                    ) : isSynthesizingAgent ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <StepSynthesis role={formData.role} formData={formData} />
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                            <Cpu className="text-noble-gold w-16 h-16 mx-auto mb-6 animate-pulse" />
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
});

OnboardingFlow.displayName = 'OnboardingFlow';

export default OnboardingFlow;
