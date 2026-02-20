'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TONES = [
    { value: 'celebratory', label: 'Celebratory Win', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { value: 'restorative', label: 'Restorative Reset', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { value: 'informational', label: 'General Update', color: 'text-zinc-600 bg-zinc-50 border-zinc-200' },
];

interface ParentBridgeProps {
    initialContext?: {
        studentName: string;
        recentWin: string;
        culturalContext?: string;
    } | null;
}

export function ParentBridge({ initialContext }: ParentBridgeProps) {
    const [notes, setNotes] = useState('');
    const [tone, setTone] = useState('celebratory');

    useEffect(() => {
        if (initialContext) {
            setNotes(`Great job on ${initialContext.recentWin}!`);
            setTone('celebratory');
        }
    }, [initialContext]);

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!notes) return;
        setIsGenerating(true);
        setGeneratedMessage(''); // Clear previous

        try {
            const response = await fetch('/api/tiffany/parent-update', {
                method: 'POST',
                body: JSON.stringify({
                    notes,
                    type: tone,
                    context: {
                        studentName: 'Student', // Mock for now
                        culturalContext: 'Community Focused',
                        topic: 'Weekly Progress'
                    }
                })
            });
            const data = await response.json();
            if (data.update) {
                setGeneratedMessage(data.update);
            }
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="h-full border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                    <MessageSquare className="h-5 w-5" />
                    Parent Bridge
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                {/* Controls */}
                <div className="flex gap-2">
                    <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Tone" />
                        </SelectTrigger>
                        <SelectContent>
                            {TONES.map(t => (
                                <SelectItem key={t.value} value={t.value}>
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${t.color.split(' ')[1].replace('bg-', 'bg-')}`} />
                                        {t.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Input */}
                <Textarea
                    placeholder="Rough notes: e.g. 'Struggled with math but kept trying. Needs to work on times tables.'"
                    className="min-h-[100px] resize-none text-sm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !notes}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {isGenerating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bridging...</>
                    ) : (
                        <><Sparkles className="mr-2 h-4 w-4" /> Generate Update</>
                    )}
                </Button>

                {/* Output Area */}
                <AnimatePresence>
                    {generatedMessage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                        >
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-2 rounded-md p-1.5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                title="Copy to Clipboard"
                            >
                                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                            </button>
                            <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 pr-6 font-serif leading-relaxed">
                                {generatedMessage}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
