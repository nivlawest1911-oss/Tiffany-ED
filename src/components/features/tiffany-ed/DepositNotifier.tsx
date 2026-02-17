'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BellRing, Trophy, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for "Wins"
const UPCOMING_DEPOSITS = [
    { id: 1, student: 'Student B', achievement: "3-day 'Sovereign' streak", type: 'streak' },
    { id: 2, student: 'Student A', achievement: "Completed Logic Sprint 12", type: 'academic' },
    { id: 3, student: 'Student C', achievement: "Peer Mediation Success", type: 'social' },
];

interface DepositNotifierProps {
    onSelectWin: (win: { studentName: string; recentWin: string }) => void;
}

export function DepositNotifier({ onSelectWin }: DepositNotifierProps) {
    return (
        <Card className="rounded-xl border border-zinc-200 bg-white p-0 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-3 pt-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 dark:text-emerald-100">
                    <BellRing className="h-4 w-4" />
                    Win Alerts
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                    {UPCOMING_DEPOSITS.map((deposit, i) => (
                        <motion.div
                            key={deposit.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => onSelectWin({ studentName: deposit.student, recentWin: deposit.achievement })}
                            className="group flex cursor-pointer items-start justify-between rounded-lg border border-zinc-100 bg-white p-3 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-900"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-emerald-700 dark:text-emerald-400">{deposit.student}</span>
                                    {deposit.type === 'streak' && <Badge variant="secondary" className="h-5 px-1.5 text-[10px]"><TrendingUp className="mr-1 h-3 w-3" /> Streak</Badge>}
                                    {deposit.type === 'academic' && <Badge variant="secondary" className="h-5 px-1.5 text-[10px]"><Trophy className="mr-1 h-3 w-3" /> Win</Badge>}
                                </div>
                                <p className="mt-1 text-xs text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                                    {deposit.achievement}
                                </p>
                            </div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <TrendingUp className="h-3 w-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
