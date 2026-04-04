"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanionCertificate } from '@/types/companion-certificate';
import { SOVEREIGN_PERSONAS, EdIntel_PERSONA } from '@/lib/ai-resilience';
import { issueBirthCertificate } from '@/lib/supabase';
import SovereignButton from '@/components/ui/SovereignButton';
import GlassPanel from '@/components/ui/GlassPanel';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
const BirthCertificate = dynamic(() => import('./BirthCertificate').then(mod => mod.BirthCertificate), {
    loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl border border-[#c5a47e]/20" />
});
import { toast } from 'sonner';
import { Loader2, Plus, Sparkles, Wand2 } from 'lucide-react';
import { VaultUploader } from './VaultUploader';
// Fonts are now centralized in layout.tsx via CSS variables.
// Use 'font-orbitron' and 'font-outfit' Tailwind classes.

/**
 * 🛠️ EdIntel Foundry: AI Companion Birth System
 * A recursive, high-fidelity form for creating 'Birth Certificates' 
 * for custom AI agents. 
 */
export const BirthCertificateForm = () => {
    const { user } = useAuth();
    const [isGenerating, setIsGenerating] = useState(false);
    const [certificate, setCertificate] = useState<CompanionCertificate | null>(null);
    const [step, setStep] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [companionId] = useState(() => crypto.randomUUID());

    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        tier: 'NOVICE' as const,
        basePersona: 'custom',
        mission: '',
        tone: '',
        culturalContext: '',
        voiceId: 'eleven_labs_default',
        avatarId: 'heygen_default',
        pedagogicalDirectives: [] as string[]
    });

    const handleBasePersonaChange = (value: string) => {
        if (value === 'custom') {
            setFormData({ ...formData, basePersona: 'custom' });
            return;
        }
        
        const persona = SOVEREIGN_PERSONAS[value] || EdIntel_PERSONA;
        setFormData({
            ...formData,
            basePersona: value,
            name: persona.name,
            role: persona.role,
            mission: persona.mission,
            tone: persona.tone,
            culturalContext: persona.culturalContext
        });
    };

    const generateMasterPrompt = () => {
        return `
            System: You are 'Sidekick,' the EdIntel AI Orchestrator.
            ACT AS: ${formData.role} 
            IDENTITY: ${formData.name}
            MISSION: ${formData.mission}
            TONE: ${formData.tone}
            CULTURAL CONTEXT: ${formData.culturalContext}
            TIER: ${formData.tier}
            
            UNIFIED STRATEGIC DIRECTIVE:
            1. Respond with high intelligence and empathetic collaboration.
            2. Adhere strictly to Alabama State Standards and Administrative Code mandates.
            3. FERPA compliance is mandatory. Never hallucinate student data.
            4. Prioritize clarity and conciseness for busy educators.
            5. Always cite local school policy when grounded in specific data.
        `.trim();
    };

    const handleSubmit = async () => {
        setIsGenerating(true);
        const newCertificate: CompanionCertificate = {
            id: companionId,
            name: formData.name,
            role: formData.role,
            tier: formData.tier,
            persona: {
                tone: formData.tone,
                mission: formData.mission,
                culturalContext: formData.culturalContext,
                pedagogicalDirectives: formData.pedagogicalDirectives
            },
            voiceId: formData.voiceId,
            avatarId: formData.avatarId,
            masterSystemPrompt: generateMasterPrompt(),
            districtId: 'MOBILE_COUNTY_AL', // Default for now
            creatorId: user?.id || '', // Must be a valid UUID from Supabase Auth
            createdAt: new Date().toISOString()
        };

        if (!user) {
            toast.error('Authentication Required: Please sign in to birth a companion.');
            setIsGenerating(false);
            return;
        }

        try {
            const result = await issueBirthCertificate(newCertificate);
            if (result) {
                setCertificate(newCertificate);
                setStep(3);
                toast.success('Neural Link Established: Birth Certificate Issued.');
            } else {
                toast.error('Synthesis Interrupted: Supabase Sync Failed.');
            }
        } catch (_error) {
            toast.error('Critical Neural Failure.');
        } finally {
            setIsGenerating(false);
        }
    };

    const addDirective = (directive: string) => {
        if (directive && !formData.pedagogicalDirectives.includes(directive)) {
            setFormData({
                ...formData,
                pedagogicalDirectives: [...formData.pedagogicalDirectives, directive]
            });
        }
    };

    if (!isMounted) return <div className="h-[600px] w-full animate-pulse bg-white/5 rounded-3xl border border-[#c5a47e]/20 flex items-center justify-center">
        <p className="text-[10px] font-black text-[#c5a47e] uppercase animate-pulse">Initializing Sovereign Foundry...</p>
    </div>;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 gpu-accelerated content-visibility-auto">

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8 transform-gpu will-change-transform"
                    >
                        <header className="mb-12">
                            <h1 className="font-heading text-3xl text-[#c5a47e] mb-2">
                                The EdIntel Foundry
                            </h1>
                            <p className="text-white/60">Initialize the neural blueprint for your Sovereign AI companion.</p>
                        </header>

                        <GlassPanel className="p-8 space-y-6 border-[#c5a47e]/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Base Persona Template</label>
                                    <Select onValueChange={handleBasePersonaChange}>
                                        <SelectTrigger className="bg-black/40 border-[#c5a47e]/20" aria-label="Select persona template">
                                            <SelectValue placeholder="Select a template..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="custom">Pure Fabricated Custom</SelectItem>
                                            {Object.keys(SOVEREIGN_PERSONAS).map(key => (
                                                <SelectItem key={key} value={key}>{SOVEREIGN_PERSONAS[key].name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Operational Tier</label>
                                    <Select 
                                        defaultValue={formData.tier} 
                                        onValueChange={(v: any) => setFormData({...formData, tier: v})}
                                    >
                                        <SelectTrigger className="bg-black/40 border-[#c5a47e]/20" aria-label="Select operational tier">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NOVICE">Novice (Assistant)</SelectItem>
                                            <SelectItem value="SPECIALIST">Specialist (Coach)</SelectItem>
                                            <SelectItem value="ARCHITECT">Master Architect (Strategist)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Companion Name</label>
                                    <Input 
                                        className="bg-black/40 border-[#c5a47e]/20" 
                                        placeholder="e.g., The Literacy Sentinel"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Institutional Role</label>
                                    <Input 
                                        className="bg-black/40 border-[#c5a47e]/20" 
                                        placeholder="e.g., Strategic Secondary Mentor"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <SovereignButton 
                                    className="w-full" 
                                    onClick={() => setStep(2)}
                                    disabled={!formData.name || !formData.role}
                                >
                                    Proceed to Persona Refinement
                                </SovereignButton>
                            </div>
                        </GlassPanel>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8 transform-gpu"
                    >
                        <header className="mb-12">
                            <button 
                                onClick={() => setStep(1)}
                                className="text-[#c5a47e]/50 hover:text-[#c5a47e] text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                            >
                                ← Back to Identity
                            </button>
                            <h1 className="font-heading text-3xl text-[#c5a47e] mb-2">
                                Persona Refinement
                            </h1>
                            <p className="text-white/60">Define the mission, tone, and cultural context of your companion.</p>
                        </header>

                        <GlassPanel className="p-8 space-y-6 border-[#c5a47e]/20">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Assigned Mission</label>
                                    <Textarea 
                                        className="bg-black/40 border-[#c5a47e]/20 min-h-[100px]" 
                                        placeholder="What is the core directive of this AI?"
                                        value={formData.mission}
                                        onChange={(e) => setFormData({...formData, mission: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Neural Tone & Voice</label>
                                    <Input 
                                        className="bg-black/40 border-[#c5a47e]/20" 
                                        placeholder="e.g., Commanding, empathetic, surgical..."
                                        value={formData.tone}
                                        onChange={(e) => setFormData({...formData, tone: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70">Cultural Context</label>
                                    <Input 
                                        className="bg-black/40 border-[#c5a47e]/20" 
                                        placeholder="e.g., Deeply rooted in Baldwin County history..."
                                        value={formData.culturalContext}
                                        onChange={(e) => setFormData({...formData, culturalContext: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-xs uppercase tracking-widest text-[#c5a47e]/70 block">Pedagogical Directives</label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formData.pedagogicalDirectives.map((d, i) => (
                                        <span key={i} className="px-3 py-1 bg-[#c5a47e]/10 border border-[#c5a47e]/30 text-[#c5a47e] text-[10px] rounded-full flex items-center gap-2">
                                            {d}
                                            <button 
                                                onClick={() => setFormData({...formData, pedagogicalDirectives: formData.pedagogicalDirectives.filter((_, idx) => idx !== i)})}
                                                className="hover:text-white"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input 
                                        id="directive-input"
                                        className="bg-black/40 border-[#c5a47e]/20 text-xs" 
                                        placeholder="Add a directive (e.g., SOR Aligned, eGAP Compliance)"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = (e.target as HTMLInputElement).value;
                                                addDirective(val);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                        <button 
                                            onClick={() => {
                                                const el = document.getElementById('directive-input') as HTMLInputElement;
                                                addDirective(el.value);
                                                el.value = '';
                                            }}
                                            className="p-2 border border-[#c5a47e]/30 rounded-lg hover:bg-[#c5a47e]/10 text-[#c5a47e]"
                                            aria-label="Add directive"
                                        >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* 🧠 Knowledge Vault Integration */}
                            <div className="pt-8 border-t border-[#c5a47e]/10">
                                <VaultUploader 
                                    companionId={companionId} 
                                    onUploadComplete={() => toast.success('Institutional knowledge indexed.')}
                                />
                                <p className="text-[9px] text-[#c5a47e]/40 mt-3 uppercase tracking-widest text-center">
                                    Knowledge Ingested here anchors the AI context in the Sovereign Vault.
                                </p>
                            </div>

                            <div className="pt-8 border-t border-[#c5a47e]/10">
                                <SovereignButton 
                                    className="w-full flex items-center justify-center gap-3" 
                                    onClick={handleSubmit}
                                    disabled={isGenerating || !formData.mission || !user}
                                >
                                    {!user ? (
                                        "Authenticate to Birth Companion"
                                    ) : isGenerating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Establish Neural Link...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 size={18} />
                                            Birth Companion
                                        </>
                                    )}
                                </SovereignButton>
                            </div>
                        </GlassPanel>
                    </motion.div>
                )}

                {step === 3 && certificate && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-12"
                    >
                        <header className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12 }}
                                className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50"
                            >
                                <Sparkles className="text-emerald-400" />
                            </motion.div>
                            <h1 className="font-heading text-3xl text-emerald-400">
                                Synthesis Complete
                            </h1>
                            <p className="text-white/60">Your Sovereign AI Companion has been successfully birthed.</p>
                        </header>

                        <BirthCertificate certificate={certificate} />

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <SovereignButton 
                                className="w-full md:w-auto"
                                onClick={() => window.location.href = `/api/chat?companionId=${certificate.id}`}
                            >
                                Initiate Direct Comm
                            </SovereignButton>
                            <button 
                                onClick={() => setStep(1)}
                                className="text-white/40 hover:text-white text-xs uppercase tracking-widest"
                            >
                                Birth Another Companion
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
