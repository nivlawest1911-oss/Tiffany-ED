'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Search, Library, ExternalLink } from 'lucide-react';
import { searchGriotMedia, GriotResource } from '@/utils/griot-search';
import { motion, AnimatePresence } from 'framer-motion';

export function GriotInjector() {
    const [topic, setTopic] = useState('');
    const [gradeLevel] = useState('8th Grade'); // Default for now
    const [results, setResults] = useState<GriotResource[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        try {
            const data = await searchGriotMedia(topic, gradeLevel);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    placeholder="Topic (e.g., 'Fractals', 'Civil Rights')"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-white dark:bg-zinc-900"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading || !topic} className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    <span className="ml-2 hidden sm:inline">Griot Search</span>
                </Button>
            </div>

            <AnimatePresence>
                {results.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-1">
                        {results.map((res, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="overflow-hidden border-indigo-100 dark:border-indigo-900/50">
                                    <CardContent className="p-3">
                                        <div className="flex justify-between gap-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] uppercase font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                                        {res.type}
                                                    </span>
                                                    <h4 className="font-medium text-sm leading-tight text-zinc-900 dark:text-zinc-100">
                                                        {res.title}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">Relevance:</span> {res.relevance}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                                    <Library className="h-3 w-3" />
                                                    {res.culturalContext}
                                                </div>
                                            </div>
                                            <a
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={`Open ${res.title}`}
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
            {results.length === 0 && !loading && topic && (
                <div className="text-center p-4 text-xs text-zinc-400">
                    No Griot resources found yet. Try a search!
                </div>
            )}
        </div>
    );
}
