'use client';

import { useState } from 'react';
import { ToneAnalysis } from '@/lib/ai/tone-check';
import Button from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertTriangle, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Student List for scaffolding
const MOCK_STUDENTS = [
    { id: '1', name: 'Student A' },
    { id: '2', name: 'Student B' },
    { id: '3', name: 'Student C' },
];

import { RecidivismAlert } from '@/utils/recidivism-checker';

export function RelationalLog() {
    const [studentId, setStudentId] = useState<string>('');
    const [logType, setLogType] = useState<'deposit' | 'withdrawal'>('deposit');
    const [note, setNote] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<ToneAnalysis | null>(null);
    const [recidivismAlert, setRecidivismAlert] = useState<RecidivismAlert | null>(null);

    const handleAnalyze = async () => {
        if (!note || !studentId) return;

        setIsAnalyzing(true);
        setRecidivismAlert(null); // Reset previous alerts

        try {
            // Parallel execution: Tone Analysis + Recidivism Check (if withdrawal)
            const tonePromise = fetch('/api/tiffany/analyze-tone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: note, context: `Log Type: ${logType}` }),
            }).then(res => res.json());

            const recidivismPromise = logType === 'withdrawal'
                ? fetch('/api/tiffany/recidivism-check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentId, incidentType: 'Disruption' }), // Simplified for mock
                }).then(res => res.json())
                : Promise.resolve(null);

            const [toneResult, recidivismResult] = await Promise.all([tonePromise, recidivismPromise]);

            setAnalysis(toneResult);
            if (recidivismResult) {
                setRecidivismAlert(recidivismResult);
            }

        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-zinc-200 bg-white/90 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-emerald-900 dark:text-emerald-100">
                    <HeartHandshake className="h-5 w-5 text-emerald-600" />
                    Interaction Ledger
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                <div className="flex gap-2">
                    <Select value={studentId} onValueChange={setStudentId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Student" />
                        </SelectTrigger>
                        <SelectContent>
                            {MOCK_STUDENTS.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex rounded-md bg-zinc-100 p-1 dark:bg-zinc-900">
                        <button
                            onClick={() => setLogType('deposit')}
                            className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${logType === 'deposit'
                                ? 'bg-white text-emerald-700 shadow-sm dark:bg-zinc-800 dark:text-emerald-400'
                                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                                }`}
                        >
                            Deposit
                        </button>
                        <button
                            onClick={() => setLogType('withdrawal')}
                            className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${logType === 'withdrawal'
                                ? 'bg-white text-rose-700 shadow-sm dark:bg-zinc-800 dark:text-rose-400'
                                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                                }`}
                        >
                            Withdrawal
                        </button>
                    </div>
                </div>

                <Textarea
                    placeholder={logType === 'deposit'
                        ? "Describe the positive interaction (e.g., 'Stayed focused during independent work')..."
                        : "Describe the conflict or need for correction..."
                    }
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[100px] resize-none border-zinc-200 dark:border-zinc-800"
                />

                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">
                                    Tiffany Insight
                                </span>
                                {analysis.fatigueLevel === 'high' || analysis.fatigueLevel === 'severe' ? (
                                    <Badge variant="destructive" className="flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3" /> Potential Burnout
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="border-indigo-200 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300">
                                        Balanced
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-indigo-800 dark:text-indigo-200">
                                {analysis.suggestion}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !note || !studentId}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Tone...
                        </>
                    ) : (
                        <>
                            Log & Analyze
                        </>
                    )}
                </Button>

                <AnimatePresence>
                    {recidivismAlert && recidivismAlert.detected && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/20"
                        >
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                                        Behavioral Pattern Detected
                                    </h4>
                                    <p className="text-xs text-amber-800 dark:text-amber-300">
                                        {recidivismAlert.message}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <Badge variant="outline" className="border-amber-200 bg-white text-[10px] text-amber-700 dark:border-amber-800 dark:bg-transparent dark:text-amber-400">
                                            {recidivismAlert.incidentCount} incidents in {recidivismAlert.period}
                                        </Badge>
                                        {recidivismAlert.intensity === 'high' && (
                                            <Badge variant="destructive" className="text-[10px]">High Intensity</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardFooter>
        </Card>
    );
}
