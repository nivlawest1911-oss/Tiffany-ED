'use client';

import { useState, useEffect } from 'react';
import { Activity, DollarSign, ShieldCheck, ArrowUpRight, ArrowDownRight, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Transaction {
    id: string;
    amount: number;
    transaction_type: string;
    transaction_subtype?: string;
    description: string;
    created_at: string;
}

export default function LedgerPage() {
    const [history, setHistory] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [isConsulting, setIsConsulting] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/tokens/history');
                if (res.ok) {
                    const data = await res.json();
                    if (data.history) {
                        setHistory(data.history);
                    } else {
                        // If the API returns the array directly without a 'history' property
                        setHistory(data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch token history:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleConsult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = query;
        setQuery('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsConsulting(true);

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    generatorId: 'fiscal-strategist',
                    prompt: userMsg
                })
            });

            if (res.ok && res.body) {
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let assistantMsg = "";

                setChatHistory(prev => [...prev, { role: 'assistant', content: "" }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    assistantMsg += chunk;

                    setChatHistory(prev => {
                        const newHistory = [...prev];
                        newHistory[newHistory.length - 1].content = assistantMsg;
                        return newHistory;
                    });
                }
            } else {
                setChatHistory(prev => [...prev, { role: 'assistant', content: "Error: Could not consult the strategist." }]);
            }
        } catch (_error) {
            setChatHistory(prev => [...prev, { role: 'assistant', content: "Error: Connection failed." }]);
        } finally {
            setIsConsulting(false);
        }
    };

    const metrics = [
        { label: "Institutional ROI", value: "+12.5%", trending: "up", description: "Operational efficiency gains." },
        { label: "Sovereign Spend", value: "$4.2k", trending: "down", description: "Monthly AI utilization costs." },
        { label: "Grant Synthesis", value: "$128k", trending: "up", description: "AI-identified funding paths." },
        { label: "Compliance Score", value: "99.2%", trending: "up", description: "Data sovereignty audit status." },
    ];

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Ledger
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                        Executive Fiscal Intelligence
                    </span>
                </div>

                <SmartHover message="Sovereign Ledger: Execute clinical precision in fiscal oversight and institutional resource allocation.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Prosperity</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    Monitor institutional health with clinical precision. The Sovereign Ledger synthesizes complex financial telemetry into actionable executive insights.
                </p>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {metrics.map((metric, idx) => (
                    <SmartHover key={idx} message={`Fiscal Telemetry: ${metric.label} - ${metric.description} Calibrating ROI pathways.`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <GlassCard className="p-8 h-full flex flex-col group hover:border-emerald-500/20 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{metric.label}</span>
                                    {metric.trending === 'up' ? (
                                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                                    )}
                                </div>
                                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">
                                    {metric.value}
                                </h3>
                                <p className="text-slate-400 text-xs font-medium">
                                    {metric.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    </SmartHover>
                ))}
            </div>

            {/* Tactical Feed */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                <GlassCard className="lg:col-span-2 p-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Sovereign Audit Log
                    </h4>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-6 h-6 text-electric-cyan animate-spin" />
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-12 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                No audit records found.
                            </div>
                        ) : (
                            history.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 -mx-4 rounded-xl transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl flex items-center justify-center",
                                            tx.transaction_type === 'GRANT' || tx.transaction_type === 'PURCHASE' ? "bg-emerald-500/10" : "bg-rose-500/10"
                                        )}>
                                            <DollarSign className={cn(
                                                "h-4 w-4",
                                                tx.transaction_type === 'GRANT' || tx.transaction_type === 'PURCHASE' ? "text-emerald-500" : "text-rose-500"
                                            )} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{tx.description || tx.transaction_subtype || tx.transaction_type}</p>
                                            <p className="text-[10px] text-zinc-500 font-mono mt-1">
                                                {new Date(tx.created_at).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-xs font-black font-mono",
                                        tx.transaction_type === 'GRANT' || tx.transaction_type === 'PURCHASE' ? "text-emerald-500" : "text-white"
                                    )}>
                                        {tx.transaction_type === 'GRANT' || tx.transaction_type === 'PURCHASE' ? '+' : '-'}{tx.amount}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard className="p-8 bg-emerald-500/5 group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 mb-4">Fiscal Health Index</h4>
                        <div className="text-4xl font-black text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">94.2</div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 1.5 }}
                            />
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 h-[400px] flex flex-col border-electric-cyan/20">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-electric-cyan/30">
                                    <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" />
                                    <AvatarFallback>FS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-sm text-white">Fiscal Strategist</h3>
                                    <span className="text-[10px] text-electric-cyan font-mono uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2">
                            {chatHistory.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <Activity className="w-8 h-8 text-electric-cyan mb-2" />
                                    <p className="text-xs text-zinc-400 font-mono">Awaiting fiscal parameters...</p>
                                </div>
                            ) : (
                                chatHistory.map((msg, i) => (
                                    <div key={i} className={cn(
                                        "p-3 rounded-2xl text-sm max-w-[85%]",
                                        msg.role === 'user'
                                            ? "bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan ml-auto"
                                            : "bg-white/5 border border-white/10 text-zinc-300 mr-auto"
                                    )}>
                                        {msg.content}
                                    </div>
                                ))
                            )}
                            {isConsulting && (
                                <div className="bg-white/5 border border-white/10 text-zinc-300 mr-auto p-3 rounded-2xl text-sm max-w-[85%] flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-electric-cyan" />
                                    Consulting...
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleConsult} className="relative mt-auto">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Consult on budget allocation..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/50 transition-all font-mono"
                            />
                            <button
                                type="submit"
                                disabled={isConsulting || !query.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-electric-cyan/20 text-electric-cyan rounded-lg hover:bg-electric-cyan/30 disabled:opacity-50 transition-colors"
                                aria-label="Send query"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
