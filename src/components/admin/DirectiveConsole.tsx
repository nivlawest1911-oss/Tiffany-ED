'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Shield, Terminal, Cpu } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

interface Directive {
    id: string;
    label: string;
    description: string;
    icon: any;
    color: string;
}

const DIRECTIVES: Directive[] = [
    {
        id: 'autonomous',
        label: 'Autonomous Execution',
        description: 'Allow swarm agents to commit budget without manual seconding.',
        icon: Cpu,
        color: 'cyan'
    },
    {
        id: 'redaction',
        label: 'Strict PII Redaction',
        description: 'Automatic obfuscation of all student/staff identifiable metadata.',
        icon: Eye,
        color: 'purple'
    },
    {
        id: 'guardrails',
        label: 'Fiscal Guardrails',
        description: 'Enforce Title I and Alabama Red Book budgetary constraints.',
        icon: Shield,
        color: 'emerald'
    },
    {
        id: 'stealth',
        label: 'Stealth Ingestion',
        description: 'Disable public-facing telemetry during sensitive policy synthesis.',
        icon: Lock,
        color: 'pink'
    }
];

export function DirectiveConsole() {
    const [enabledDirectives, setEnabledDirectives] = useState<string[]>(['redaction', 'guardrails']);

    const toggleDirective = (id: string) => {
        setEnabledDirectives(prev =>
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    return (
        <GlassCard className="p-8 h-full border-white/5 flex flex-col">
            <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
                <Terminal className="text-zinc-500" /> Sovereign Directive Console
            </h3>

            <div className="space-y-4 flex-1">
                {DIRECTIVES.map((directive) => {
                    const Icon = directive.icon;
                    const isEnabled = enabledDirectives.includes(directive.id);

                    return (
                        <button
                            key={directive.id}
                            onClick={() => toggleDirective(directive.id)}
                            className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 group ${isEnabled
                                ? `bg-${directive.color}-500/10 border-${directive.color}-500/30`
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                                }`}
                        >
                            <div className={`p-3 rounded-xl transition-colors ${isEnabled ? `bg-${directive.color}-500/20 text-${directive.color}-400` : 'bg-zinc-800 text-zinc-500'
                                }`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-bold transition-colors ${isEnabled ? 'text-white' : 'text-zinc-500'}`}>
                                        {directive.label}
                                    </span>
                                    <div className={`h-2 w-2 rounded-full ${isEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                </div>
                                <p className="text-[10px] text-zinc-500 leading-snug">
                                    {directive.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Directive Status */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Directive Integrity</span>
                    <span className="text-xs font-mono text-emerald-400">NOMINAL</span>
                </div>
                <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        animate={{ width: `${(enabledDirectives.length / DIRECTIVES.length) * 100}%` }}
                    />
                </div>
            </div>
        </GlassCard>
    );
}
