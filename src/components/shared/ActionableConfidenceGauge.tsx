'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ActionableConfidenceGaugeProps {
    score: number; // 0 to 1
    suggestion?: string;
    onAction?: () => void;
}

export function ActionableConfidenceGauge({ score, suggestion, onAction }: ActionableConfidenceGaugeProps) {
    // Determine status based on score
    const status = score >= 0.9 ? 'high' : score >= 0.7 ? 'medium' : 'low';

    const config = {
        high: {
            color: 'bg-emerald-500',
            textColor: 'text-emerald-400',
            borderColor: 'border-emerald-500/30',
            icon: CheckCircle,
            label: 'System Confidence: High',
            description: 'This response has been verified for equity and accuracy.'
        },
        medium: {
            color: 'bg-amber-500',
            textColor: 'text-amber-400',
            borderColor: 'border-amber-500/30',
            icon: HelpCircle,
            label: 'System Confidence: Moderate',
            description: 'This response may require human review.'
        },
        low: {
            color: 'bg-red-500',
            textColor: 'text-red-400',
            borderColor: 'border-red-500/30',
            icon: AlertTriangle,
            label: 'System Confidence: Low',
            description: 'Potential bias or inaccuracy detected. Proceed with caution.'
        }
    }[status];

    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-xl border ${config.borderColor} bg-black/40 backdrop-blur-sm relative overflow-hidden`}
        >
            {/* Background Glow */}
            <div className={`absolute -left-4 top-0 bottom-0 w-1 ${config.color} opacity-50`} />

            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${config.textColor}`}>
                    <Icon size={20} />
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-black uppercase tracking-widest ${config.textColor}`}>
                            {config.label}
                        </h4>
                        <span className="text-xs font-mono text-zinc-500">
                            {Math.round(score * 100)}%
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full ${config.color}`}
                        />
                    </div>

                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        {config.description}
                    </p>

                    {/* Actionable Suggestion */}
                    {(status !== 'high' && suggestion) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-2 mt-2 border-t border-white/5"
                        >
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Recommendation</p>
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-zinc-200 font-medium">
                                    "{suggestion}"
                                </p>
                                {onAction && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={onAction}
                                        className="h-7 text-xs border-white/10 hover:bg-white/5 hover:text-white"
                                    >
                                        Execute
                                        <ArrowRight size={12} className="ml-2" />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
