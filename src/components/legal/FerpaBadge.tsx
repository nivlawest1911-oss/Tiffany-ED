'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Lock as LockIcon } from 'lucide-react';
import EdIntelInteractionAgent from '../EdIntelInteractionAgent';

export const ComplianceBadge = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 p-4 md:p-6 liquid-glass border-noble-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)] rounded-[2rem]"
        >
            <EdIntelInteractionAgent
                title="FERPA Secure"
                description="FERPA Compliant Data Governance. Ensuring 100% student data privacy and regulatory compliance through the EdIntel security mesh."
                agentId="strategic"
            >
                <div className="flex items-center gap-3 cursor-help group/badge">
                    <div className="w-8 h-8 rounded-lg bg-noble-gold/10 flex items-center justify-center border border-noble-gold/30 group-hover/badge:border-noble-gold/60 transition-colors">
                        <ShieldCheck size={18} className="text-noble-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none text-white group-hover/badge:text-noble-gold transition-colors">FERPA Secure</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 mt-1">Data Governance</span>
                    </div>
                </div>
            </EdIntelInteractionAgent>

            <div className="hidden md:block w-px h-8 bg-white/10" />

            <EdIntelInteractionAgent
                title="Literacy Act Ready"
                description="Alabama Literacy Act Synchronization. All instructional protocols are mapped directly to Alabama's latest reading and math standards."
                agentId="philosopher"
            >
                <div className="flex items-center gap-3 cursor-help group/badge">
                    <div className="w-8 h-8 rounded-lg bg-noble-gold/10 flex items-center justify-center border border-noble-gold/30 group-hover/badge:border-noble-gold/60 transition-colors">
                        <Scale size={18} className="text-noble-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none text-white group-hover/badge:text-noble-gold transition-colors">Literacy Act ready</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 mt-1">Alabama Standards</span>
                    </div>
                </div>
            </EdIntelInteractionAgent>

            <div className="hidden md:block w-px h-8 bg-white/10" />

            <EdIntelInteractionAgent
                title="EdIntel Vault"
                description="EdIntel Vault Encryption. Your academic data is secured with industrial-grade, end-to-end encryption and biometric gatekeeping."
                agentId="tactical"
            >
                <div className="flex items-center gap-3 cursor-help group/badge">
                    <div className="w-8 h-8 rounded-lg bg-noble-gold/10 flex items-center justify-center border border-noble-gold/30 group-hover/badge:border-noble-gold/60 transition-colors">
                        <LockIcon size={18} className="text-noble-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none text-white group-hover/badge:text-noble-gold transition-colors">EdIntel Vault</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 mt-1">End-to-End Encrypted</span>
                    </div>
                </div>
            </EdIntelInteractionAgent>
        </motion.div>
    );
};
