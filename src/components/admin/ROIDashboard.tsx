'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { calculateSovereignSavings, formatCurrency, UsageMetrics } from '@/lib/roi-logic';
import { BarChart3, TrendingUp, Clock, ShieldCheck, DollarSign } from 'lucide-react';

interface ROIDashboardProps {
    metrics: UsageMetrics;
}

export function ROIDashboard({ metrics }: ROIDashboardProps) {
    const report = calculateSovereignSavings(metrics);

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sovereign Savings</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(report.totalSavings)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hours Reclaimed</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {report.hoursReclaimed.toLocaleString()} hrs
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Equivalent to {(report.hoursReclaimed / 160).toFixed(1)} FTEs
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Risk Mitigated</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {formatCurrency(report.complianceRiskMitigated)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Potential fines avoided
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
                        <BarChart3 className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            98.5%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Uptime & Response Rate
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Breakdown Chart Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Savings Breakdown</CardTitle>
                        <CardDescription>
                            Projected savings across key operational areas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="space-y-4">
                            {Object.entries(report.breakdown).map(([key, value]) => (
                                <div key={key} className="flex items-center">
                                    <div className="w-[100px] text-sm font-medium capitalize">{key}</div>
                                    <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                        <div
                                            className="h-full bg-intel-gold rounded-full transition-all duration-500"
                                            style={{ width: `${(value / report.totalSavings) * 100}%` }}
                                        />
                                    </div>
                                    <div className="w-[100px] text-right text-sm text-muted-foreground">
                                        {formatCurrency(value)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Projection</CardTitle>
                        <CardDescription>
                            Estimated annual trajectory based on current usage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="flex flex-col items-center gap-2 text-zinc-400">
                                <TrendingUp className="h-8 w-8" />
                                <span className="text-sm font-medium">Projected Annual Savings</span>
                                <span className="text-2xl font-bold text-intel-gold">{formatCurrency(report.totalSavings * 12)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
