'use client';

import { useState } from 'react';
// Card imports removed
import { Button } from '@/components/ui/button';
import { Shield, Send, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function BurnoutShield() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'tiffany'; content: string }[]>([
        { role: 'tiffany', content: "I am here, Educator. What is weighing on your spirit today? Lay it down." }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/tiffany/burnout-shield', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'tiffany', content: data.response }]);
        } catch (_error) {
            console.error("Failed to fetch response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] glass-panel-premium rounded-[2.5rem] overflow-hidden border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
            <div className="p-8 border-b border-indigo-500/10 bg-indigo-500/5 backdrop-blur-xl">
                <h3 className="flex items-center gap-3 text-lg font-black tracking-widest text-white uppercase group">
                    <Shield className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    Burnout Shield
                </h3>
                <p className="mt-1 text-[10px] font-bold text-indigo-400/60 uppercase tracking-widest">
                    Sovereign Emotional Protection Unit
                </p>
            </div>
            <div className="flex-1 flex flex-col p-8 gap-6 overflow-hidden bg-black/20">
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm leading-relaxed shadow-lg
                                    ${msg.role === 'user'
                                            ? 'bg-white/5 text-slate-200 border border-white/10'
                                            : 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-indigo-500/20'
                                        }`}
                                >
                                    {msg.role === 'tiffany' && <Sparkles className="h-3 w-3 mb-1 opacity-70" />}
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-indigo-500/10 text-indigo-400 rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-indigo-500/20 backdrop-blur-md">
                                    <div className="h-2 w-2 bg-indigo-500 rounded-full animate-ping" />
                                    Tiffany is listening...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="flex gap-4 p-6 bg-black/40 border-t border-white/5">
                    <input
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600 text-white font-medium"
                        placeholder="Neural link ready. Describe your state..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                    />
                    <Button
                        size="sm"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="h-10 w-10 bg-white hover:bg-indigo-500 text-black hover:text-white rounded-xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
