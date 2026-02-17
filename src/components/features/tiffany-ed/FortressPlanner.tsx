'use client';

import { useState } from 'react';
import { FrictionAnalysis } from '@/utils/lesson-friction';
import Button from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GriotInjector } from './GriotInjector';
import { Loader2, ShieldCheck, AlertTriangle, BrainCircuit, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FortressPlanner() {
    const [lessonPlan, setLessonPlan] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<FrictionAnalysis | null>(null);

    const handleScan = async () => {
        if (!lessonPlan) return;
        setIsScanning(true);
        try {
            const response = await fetch('/api/tiffany/analyze-lesson', {
                method: 'POST',
                body: JSON.stringify({ lessonPlan }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Scan failed:", error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Column */}
            <Card className="h-full border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-100">
                        <ShieldCheck className="h-5 w-5" />
                        Fortress Lesson Scanner
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Paste your lesson procedure below. The Tiffany AI will detect "Decision Fatigue" risks and generate immediate scaffolding.
                    </p>
                    <Textarea
                        placeholder="e.g., 10:00 - Mini-lesson on fractions. 10:15 - Students complete worksheet independently..."
                        className="min-h-[300px] font-mono text-sm"
                        value={lessonPlan}
                        onChange={(e) => setLessonPlan(e.target.value)}
                    />
                    <Button
                        onClick={handleScan}
                        disabled={isScanning || !lessonPlan}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                        {isScanning ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning Friction...</>
                        ) : (
                            "Run Friction Analysis"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Output Column */}
            <div className="space-y-6">
                <Tabs defaultValue="analysis" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-10">
                        <TabsTrigger value="analysis" className="bg-transparent text-zinc-600 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm dark:text-zinc-400 dark:data-[state=active]:bg-zinc-950 dark:data-[state=active]:text-indigo-400">
                            Analysis
                        </TabsTrigger>
                        <TabsTrigger value="griot" className="bg-transparent text-zinc-600 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm dark:text-zinc-400 dark:data-[state=active]:bg-zinc-950 dark:data-[state=active]:text-indigo-400">
                            <Sparkles className="mr-2 h-3.5 w-3.5" />
                            Griot Injector
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analysis" className="mt-4 space-y-4">
                        {!result && !isScanning && (
                            <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/20">
                                <BrainCircuit className="mb-2 h-8 w-8 opacity-20" />
                                Paste your lesson plan above to detect cognitive friction.
                            </div>
                        )}
                        <AnimatePresence>
                            {isScanning && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex h-32 items-center justify-center space-x-2 text-indigo-600"
                                >
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="font-medium">Tiffany is analyzing cognitive load...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {result && (
                            <div className="space-y-4">
                                {/* Friction Score */}
                                <div className="flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/10">
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">Friction Score</h4>
                                        <p className="text-xs text-indigo-600/80 dark:text-indigo-400">Cognitive load intensity</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.frictionScore}</span>
                                        <span className="text-xs text-indigo-400">/100</span>
                                    </div>
                                </div>

                                {/* Bottlenecks */}
                                <div className="space-y-2">
                                    <h4 className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                                        Predicted Bottlenecks
                                    </h4>
                                    <div className="grid gap-2">
                                        {result.bottlenecks.map((b, i) => (
                                            <div key={i} className="rounded border border-amber-100 bg-amber-50 p-2 text-xs text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-200">
                                                {b}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Support Matrix inside Tabs */}
                                <Card className="border-zinc-200 dark:border-zinc-800 mt-4">
                                    <Tabs defaultValue="tier1" className="w-full">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-base text-zinc-800 dark:text-zinc-200">
                                                    Support Matrix
                                                </CardTitle>
                                                <TabsList className="h-8">
                                                    <TabsTrigger value="tier1" className="text-xs">Tier 1</TabsTrigger>
                                                    <TabsTrigger value="tier2" className="text-xs">Tier 2</TabsTrigger>
                                                    <TabsTrigger value="tier3" className="text-xs">Tier 3</TabsTrigger>
                                                </TabsList>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <TabsContent value="tier1" className="mt-0 space-y-2">
                                                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30">Universal</Badge>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-300">{result.scaffolding.tier1}</p>
                                            </TabsContent>
                                            <TabsContent value="tier2" className="mt-0 space-y-2">
                                                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30">Targeted</Badge>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-300">{result.scaffolding.tier2}</p>
                                            </TabsContent>
                                            <TabsContent value="tier3" className="mt-0 space-y-2">
                                                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/30">Intensive</Badge>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-300">{result.scaffolding.tier3}</p>
                                            </TabsContent>
                                        </CardContent>
                                    </Tabs>
                                </Card>
                            </div>
                        )}

                        {/* Gym Breaks (Separate Card) */}
                        {result && (
                            <Card className="border-zinc-200 dark:border-zinc-800 mt-4">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-indigo-800 dark:text-indigo-300">
                                        <BrainCircuit className="h-4 w-4" />
                                        Recommended Logic Resets
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {result.gymBreaks.map((gym, i) => (
                                        <div key={i} className="flex items-start justify-between rounded-md border border-zinc-100 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                                            <div>
                                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{gym.activity}</span>
                                                <p className="text-zinc-500">{gym.timing}</p>
                                            </div>
                                            <Badge variant="secondary" className="bg-white shadow-sm dark:bg-zinc-800">
                                                <Activity className="mr-1 h-3 w-3" />
                                                {gym.duration}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="griot" className="mt-4">
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Cultural Media Injector</h3>
                            <p className="mb-4 text-xs text-zinc-500">Inject culturally relevant media into your lesson plan.</p>
                            <GriotInjector />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
