'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Shield, Send, Sparkles, MessageSquare } from 'lucide-react';
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
        } catch (error) {
            console.error("Failed to fetch response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-[500px] border-indigo-200 bg-white shadow-sm dark:border-indigo-900 dark:bg-zinc-900">
            <CardHeader className="bg-indigo-50/50 pb-4 dark:bg-indigo-950/20">
                <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                    <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Tiffany Peer-Review (Burnout Shield)
                </CardTitle>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Sovereign protection for your peace of mind.
                </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed
                                    ${msg.role === 'user'
                                            ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                                            : 'bg-indigo-600 text-white shadow-md dark:bg-indigo-700'
                                        }`}
                                >
                                    {msg.role === 'tiffany' && <Sparkles className="h-3 w-3 mb-1 opacity-70" />}
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-indigo-50 text-indigo-800 rounded-lg p-3 text-xs flex items-center gap-2 dark:bg-indigo-900/30 dark:text-indigo-300">
                                    <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" />
                                    Tiffany is listening...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <input
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:text-zinc-200"
                        placeholder="Vent here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                    />
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
