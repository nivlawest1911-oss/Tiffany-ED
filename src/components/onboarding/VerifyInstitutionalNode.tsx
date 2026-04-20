'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MapPin, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { getInstitutionalNodes, updateInstitutionalProfile } from '@/lib/actions/institutional';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SovereignButton } from '@/components/ui/SovereignButton';

export default function VerifyInstitutionalNode() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [nodes, setNodes] = useState<{ districts: any[], schools: any[] }>({ districts: [], schools: [] });
    
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string>('');
    const [_position, _setPosition] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        async function fetchNodes() {
            const result = await getInstitutionalNodes();
            if (result.success) {
                setNodes({ districts: result.districts || [], schools: result.schools || [] });
            }
            setLoading(false);
        }
        fetchNodes();
    }, []);

    const filteredSchools = nodes.schools.filter(s => !selectedDistrict || s.district_name === selectedDistrict);

    const handleFinalize = async () => {
        setSubmitting(true);
        try {
            const result = await updateInstitutionalProfile({
                role: selectedRole as any,
                district: selectedDistrict,
                school: selectedSchool,
                position: _position || selectedRole
            });

            if (result.success) {
                toast.success("Identity Verified", {
                    description: "Sovereign Uplink stable. Handshaking with regional hub..."
                });
                router.push('/');
                router.refresh();
            } else {
                toast.error("Verification Error", { description: result.error });
            }
        } catch (_error) {
            toast.error("Handshake Failed", { description: "Establishing local containment..." });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4">
            <header className="text-center space-y-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Institutional <span className="text-blue-500">Calibration</span></h1>
                <p className="text-zinc-400 text-xs font-mono tracking-widest uppercase">Protocol: Manual_Uplink_Verification_v2.0</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Progress Indicators */}
                {[1, 2, 3].map((s) => (
                    <div key={s} className="relative">
                        <div className={`h-1 w-full rounded-full transition-colors duration-500 ${step >= s ? 'bg-blue-500' : 'bg-white/10'}`} />
                        <span className={`absolute -bottom-6 left-0 text-[10px] font-bold uppercase tracking-widest ${step === s ? 'text-blue-400' : 'text-zinc-600'}`}>
                            Phase 0{s}
                        </span>
                    </div>
                ))}
            </div>

            <main className="mt-12 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 min-h-[450px] relative overflow-hidden backdrop-blur-md">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                    <Shield className="text-blue-500" /> Select Professional Role
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['TEACHER', 'COUNSELOR', 'PRINCIPAL', 'ADMIN'].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => { setSelectedRole(role); setStep(2); }}
                                            className={`p-6 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                                                selectedRole === role ? 'bg-blue-500/10 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30'
                                            }`}
                                        >
                                            <span className="font-bold tracking-widest uppercase text-sm">{role}</span>
                                            <ArrowRight className={`w-4 h-4 transition-transform ${selectedRole === role ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-0 group-hover:opacity-100'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                    <MapPin className="text-blue-500" /> Identify Jurisdiction
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#FFB300]/60">Select District</label>
                                        <select 
                                            value={selectedDistrict}
                                            onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedSchool(''); }}
                                            aria-label="Select your district"
                                            title="Choose your school district"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                                        >
                                            <option value="">Choose District...</option>
                                            {nodes.districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-[#FFB300]/60">Select School Node</label>
                                        <select 
                                            value={selectedSchool}
                                            disabled={!selectedDistrict}
                                            onChange={(e) => setSelectedSchool(e.target.value)}
                                            aria-label="Select your school"
                                            title="Choose your institutional node"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 disabled:opacity-30"
                                        >
                                            <option value="">{selectedDistrict ? 'Choose School...' : 'Select District First'}</option>
                                            {filteredSchools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex justify-between pt-8">
                                        <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white uppercase text-xs font-bold transition-colors">Back to Roles</button>
                                        <SovereignButton 
                                            disabled={!selectedSchool} 
                                            onClick={() => setStep(3)}
                                            variant="fidelity"
                                        >
                                            Continue Handshake
                                        </SovereignButton>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <div className="text-center space-y-4 py-8">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Calibrate Identity</h2>
                                    <p className="text-zinc-400 text-sm max-w-sm mx-auto">Confirm your professional coordinates to finalize the Sovereign Uplink.</p>
                                </div>

                                <div className="bg-black/40 rounded-3xl border border-white/5 p-6 space-y-4">
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Role</span>
                                        <span className="text-white text-xs font-mono uppercase tracking-widest font-black text-blue-500">{selectedRole}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Jurisdiction</span>
                                        <span className="text-white text-xs font-mono uppercase tracking-widest">{selectedDistrict}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Access Node</span>
                                        <span className="text-white text-xs font-mono uppercase tracking-widest">{selectedSchool}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-8">
                                    <SovereignButton 
                                        onClick={handleFinalize}
                                        disabled={submitting}
                                        variant="fidelity"
                                        className="w-full"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Uplink Access"}
                                    </SovereignButton>
                                </div>
                                <button onClick={() => setStep(2)} className="w-full text-zinc-600 hover:text-white uppercase text-[10px] font-black transition-colors text-center mt-4">Retract Signals (Back)</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
