'use client';

import React, { useState } from 'react';
import { Github, Send, CheckCircle2, Terminal } from 'lucide-react';

export default function GitHubStrategicFeedback() {
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        setIsSubmitting(true);
        // Simulate GitHub Issue Creation
        try {
            await new Promise(r => setTimeout(r, 1500));
            console.log("GitHub Issue Created:", feedback);
            setStatus('success');
            setFeedback('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" /> Command Feedback
                </h3>
                <div className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[8px] font-bold text-amber-400 uppercase tracking-widest">
                    v4.2.0-stable
                </div>
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                Direct uplink to Project Command. Report anomalies or suggest strategic enhancements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="ENTER FEEDBACK..."
                    className="w-full h-24 p-4 bg-black/40 border border-white/5 rounded-2xl outline-none focus:border-amber-500/50 transition-all font-mono text-[10px] text-white placeholder:text-zinc-700 resize-none"
                    required
                />

                <button
                    type="submit"
                    disabled={isSubmitting || status === 'success'}
                    className="w-full py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isSubmitting ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMITTED' : 'Transmit to GitHub'}
                    {status === 'success' ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Send size={14} />}
                </button>
            </form>

            <div className="pt-2 flex items-center gap-2 text-[9px] font-bold text-zinc-600 uppercase">
                <Github size={12} />
                <span>Repository Uplink Encryption: AES-256</span>
            </div>
        </div>
    );
}
