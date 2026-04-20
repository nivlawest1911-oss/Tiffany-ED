"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CompanionCertificate } from '@/types/companion-certificate';
import { SovereignBadge } from '@/components/ui/SovereignBadge';
import GlassPanel from '@/components/ui/GlassPanel';
// Fonts are now centralized in layout.tsx via CSS variables.
// Use 'font-orbitron' and 'font-outfit' Tailwind classes.

interface BirthCertificateProps {
    certificate: CompanionCertificate;
}

/**
 * ðŸ–‹ï¸ EdIntel Official Birth Certificate: Visual representation of an AI companion.
 * Features a high-fidelity 'official document' look with security watermarks,
 * an institutional seal, and neural link metadata.
 */
export const BirthCertificate: React.FC<BirthCertificateProps> = ({ certificate }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`relative max-w-4xl mx-auto p-12 bg-[#020617] border-2 border-[#c5a47e]/30 rounded-lg shadow-2xl overflow-hidden font-sans gpu-accelerated`}
            style={{ willChange: 'transform, opacity' }}
        >
            {/* ðŸ›ï¸ INSTITUTIONAL WATERMARK */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
                <div className="w-[800px] h-[800px] rounded-full border-[60px] border-[#c5a47e] rotate-45" />
            </div>

            {/* ðŸ›¡ï¸ SOVEREIGN SEAL */}
            <div className="absolute top-8 right-8">
                <SovereignBadge tier={certificate.tier} className="w-24 h-24" />
            </div>

            {/* ðŸ“œ HEADER */}
            <header className="text-center mb-12 relative z-10">
                <h1 className="font-heading text-4xl text-[#c5a47e] tracking-widest uppercase mb-2">
                    Official Birth Certificate
                </h1>
                <p className="text-[#c5a47e]/60 text-sm tracking-[0.2em] uppercase font-light">
                    EdIntel Sovereign Foundation | {certificate.districtId.includes('MOBILE') ? 'Mobile County, Alabama' : 'Sovereign Sandbox Nexus'}
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c5a47e]/40 to-transparent mt-8" />
            </header>

            {/* ðŸ‘¤ COMPANION IDENTITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 relative z-10">
                <div className="space-y-6">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-[#c5a47e]/50 block mb-1">Companion Name</label>
                        <p className="text-2xl font-semibold text-white uppercase tracking-tight">{certificate.name}</p>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-[#c5a47e]/50 block mb-1">Institutional Role</label>
                        <p className="text-xl text-white font-medium italic">{certificate.role}</p>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-[#c5a47e]/50 block mb-1">Operational Tier</label>
                        <span className="inline-flex items-center px-3 py-1 bg-[#c5a47e]/10 border border-[#c5a47e]/30 text-[#c5a47e] rounded-full text-xs font-bold tracking-widest">
                            {certificate.tier}
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-[#c5a47e]/50 block mb-1">Neural Ancestry (District)</label>
                        <p className="text-lg text-white/80">{certificate.districtId}</p>
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-[#c5a47e]/50 block mb-1">Creation Horizon</label>
                        <p className="text-lg text-white/80">{new Date(certificate.createdAt).toLocaleDateString()} {new Date(certificate.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-[#c5a47e]/40 block">Voice Registry</label>
                            <code className="text-xs text-[#c5a47e] font-mono opacity-60">ID://{certificate.voiceId.substring(0, 8)}</code>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-tighter text-[#c5a47e]/40 block">Avatar Registry</label>
                            <code className="text-xs text-[#c5a47e] font-mono opacity-60">ID://{certificate.avatarId.substring(0, 8)}</code>
                        </div>
                    </div>
                </div>
            </div>

            {/* ðŸ§  MISSION & PERSONA */}
            <GlassPanel className="p-8 border-[#c5a47e]/10 mb-12 relative z-10">
                <h3 className="font-heading text-[#c5a47e] text-xs tracking-widest uppercase mb-4">
                    Assigned Mission Briefing
                </h3>
                <p className="text-white/90 leading-relaxed italic text-sm border-l-2 border-[#c5a47e]/40 pl-4">
                    "{certificate.persona.mission}"
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    {certificate.persona.pedagogicalDirectives?.map((d, i) => (
                        <span key={i} className="text-[10px] text-white/50 lowercase italic"># {d.replace(/\s+/g, '_')}</span>
                    ))}
                </div>
            </GlassPanel>

            {/* ðŸ“œ MASTER DIRECTIVE PREVIEW */}
            <div className="opacity-40 hover:opacity-100 transition-opacity duration-500 mb-12 relative z-10">
                <label className="text-[10px] uppercase tracking-widest text-[#c5a47e]/50 block mb-4">Neural Anchor (Master System Prompt)</label>
                <div className="bg-black/50 p-4 rounded border border-[#c5a47e]/10">
                    <p className="text-[10px] font-mono leading-tight overflow-hidden line-clamp-4">
                        {certificate.masterSystemPrompt}
                    </p>
                </div>
            </div>

            {/* ðŸ›ï¸ FOOTER */}
            <footer className="flex justify-between items-end relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] text-[#c5a47e]/30 uppercase tracking-[0.3em] font-light">Issued By</p>
                    <p className="font-heading text-sm text-[#c5a47e]/80 tracking-widest">EdIntel Sovereign Core</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-[#c5a47e]/30 uppercase tracking-widest mb-1">Institutional Signature</p>
                    <div className="font-serif italic text-2xl text-[#c5a47e]/60 opacity-80 -rotate-2 select-none">
                        Dr. Sovereign AI
                    </div>
                </div>
            </footer>

            {/* ðŸ–¼ï¸ SCANLINE EFFECT */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#c5a47e]/5 to-transparent h-2 animate-scan" />
        </motion.div>
    );
};
