'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award,
    ShieldCheck,
    ExternalLink,
    Hash,
    Calendar,
    User,
    CheckCircle2
} from 'lucide-react';
import { professionalEngine, ProfessionalMilestone } from '@/lib/ProfessionalEngine';
import { GlassCard } from '@/components/ui/Cinematic';
import { toast } from 'sonner';

export default function CertificationVault() {
    const [certifications, setCertifications] = useState<ProfessionalMilestone[]>([]);

    useEffect(() => {
        setCertifications(professionalEngine.getCertifications());
        const interval = setInterval(() => {
            setCertifications(professionalEngine.getCertifications());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (certifications.length === 0) {
        return (
            <GlassCard className="p-12 text-center border-dashed border-white/10 bg-transparent">
                <Award size={48} className="text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest">
                    Vault Empty
                </h3>
                <p className="text-sm text-white/20 mt-2">
                    Complete Academy modules to secure your professional lineage.
                </p>
            </GlassCard>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
                {certifications.map((cert) => (
                    <motion.div
                        key={cert.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <GlassCard className="group relative p-6 border-emerald-500/20 bg-emerald-500/5 h-full flex flex-col">
                            {/* Verified Watermark */}
                            <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                <ShieldCheck size={140} className="text-emerald-500" />
                            </div>

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500">
                                    <Award size={24} />
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 justify-end">
                                        <CheckCircle2 size={12} />
                                        Verified Provision
                                    </div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                                        {cert.id}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                                    Professional Certification
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-white/60">
                                        <Calendar size={14} className="text-emerald-500" />
                                        <span>Issued: {new Date(cert.completionDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white/60">
                                        <User size={14} className="text-emerald-500" />
                                        <span>Delegate ID: {cert.userId}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white/60">
                                        <Hash size={14} className="text-emerald-500" />
                                        <span className="font-mono text-[10px] truncate max-w-[200px]" title={cert.ledgerHash}>
                                            LEDGER: {cert.ledgerHash}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                                <button 
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black text-white uppercase tracking-widest transition-all"
                                    onClick={() => toast.info(`Verifying Block Hash: ${cert.ledgerHash?.substring(0, 12)}...`)}
                                >
                                    Audit Provenance
                                    <ExternalLink size={12} className="text-emerald-500" />
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
