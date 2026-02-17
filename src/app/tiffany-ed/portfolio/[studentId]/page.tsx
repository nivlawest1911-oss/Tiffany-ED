'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { Loader2, TrendingUp, BookOpen, User, Lightbulb, FileText, Download, ShieldCheck, AlertTriangle } from 'lucide-react';
import { StudentPortfolioData, GrowthNarrative } from '@/services/portfolio-service';

export default function PortfolioPage({ params }: { params: { studentId: string } }) {
    const [data, setData] = useState<StudentPortfolioData | null>(null);
    const [narrative, setNarrative] = useState<GrowthNarrative | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditResult, setAuditResult] = useState<{ compliant: boolean; issues: string[] } | null>(null);

    useEffect(() => {
        // Mock fetch for now
        const fetchData = async () => {
            try {
                // In real app, this would be a server action or API call
                // For demo, we are simulating the service call on the client or via an API wrapper
                const response = await fetch(`/api/tiffany/portfolio/${params.studentId}`);
                const result = await response.json();
                setData(result.data);
                setNarrative(result.narrative);
            } catch (error) {
                console.error("Failed to fetch portfolio", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.studentId]);

    const handleAudit = async () => {
        if (!narrative) return;
        setIsAuditing(true);
        // Combine narrative parts for audit
        const fullText = `${narrative.executiveSummary} ${narrative.strengths.join(' ')} ${narrative.growthAreas.join(' ')} ${narrative.tiffanyTip}`;

        try {
            const response = await fetch('/api/tiffany/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ narrative: fullText })
            });
            const result = await response.json();
            setAuditResult(result);
        } catch (error) {
            console.error("Audit failed", error);
        } finally {
            setIsAuditing(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!data || !narrative) {
        return <div>Student not found.</div>;
    }

    return (
        <div className="container mx-auto max-w-5xl space-y-8 p-8 print:p-0">
            {/* Header */}
            <div className="flex items-center justify-between print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{data.studentName}</h1>
                    <p className="text-zinc-500">{data.gradeLevel} • Sovereign Portfolio</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={handleAudit}
                        disabled={isAuditing || (auditResult && auditResult.compliant) as boolean} // Cast to boolean to satisfy stricter strict null checks if needed
                        className={auditResult?.compliant ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}
                    >
                        {isAuditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                        {auditResult?.compliant ? "Sentinel Verified" : "Run Sentinel Audit"}
                    </Button>
                    <Button variant="secondary" className="gap-2" onClick={handlePrint}>
                        <Download className="h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Audit Result Banner */}
            {auditResult && !auditResult.compliant && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-200 animate-in slide-in-from-top-2">
                    <div className="flex items-center font-semibold text-red-700 dark:text-red-400">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Compliance Issues Detected
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                        {auditResult.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Print Header (Visible only when printing) */}
            <div className="hidden print:block mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">{data.studentName} - Growth Portfolio</h1>
                <p className="text-sm text-zinc-500">Generated by EdIntel Sovereign • {new Date().toLocaleDateString()}</p>
            </div>

            {/* Executive Summary */}
            <Card className="border-indigo-100 bg-indigo-50/30 dark:border-indigo-900/30 dark:bg-indigo-900/10 print:border-zinc-200 print:shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 print:text-zinc-900">
                        <TrendingUp className="h-5 w-5" />
                        Executive Growth Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-zinc-800">
                        {narrative.executiveSummary}
                    </p>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2">
                {/* Sprints & Mastery */}
                <Card className="print:border-zinc-200 print:shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 print:text-zinc-900">
                            <BookOpen className="h-5 w-5 text-zinc-500" />
                            Sprint Mastery
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {data.sprints.map((sprint, i) => (
                            <div key={i} className="border-l-2 border-indigo-200 pl-4 dark:border-indigo-800">
                                <h4 className="font-semibold print:text-zinc-900">{sprint.title}</h4>
                                <p className="text-sm text-zinc-500">{sprint.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {sprint.skillsMastered.map((skill, k) => (
                                        <Badge key={k} variant="secondary" className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 print:border print:border-zinc-300">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Relational & Accommodations */}
                <div className="space-y-6">
                    <Card className="print:border-zinc-200 print:shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 print:text-zinc-900">
                                <User className="h-5 w-5 text-zinc-500" />
                                Relational Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900 print:border print:border-zinc-200">
                                <span className="text-sm font-medium print:text-zinc-900">Deposit Ratio</span>
                                <Badge className={data.relationalHealth.depositRatio > 5 ? 'bg-emerald-500 print:bg-white print:text-black print:border-black print:border' : 'bg-amber-500 print:bg-white print:text-black print:border-black print:border'}>
                                    {data.relationalHealth.depositRatio}/10
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium print:text-zinc-900">Notable Wins</span>
                                <ul className="list-disc pl-4 text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-800">
                                    {data.relationalHealth.notableWins.map((win, i) => (
                                        <li key={i}>{win}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-amber-100 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-900/10 print:border-zinc-200 print:shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 print:text-zinc-900">
                                <Lightbulb className="h-5 w-5" />
                                Tiffany's Tip
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm italic text-amber-800 dark:text-amber-200 print:text-zinc-800">
                                "{narrative.tiffanyTip}"
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recommendations */}
            <Card className="print:border-zinc-200 print:shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 print:text-zinc-900">
                        <FileText className="h-5 w-5 text-zinc-500" />
                        Recommendations & Next Steps
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-semibold text-emerald-600 print:text-zinc-900">Strengths to Leverage</h4>
                            <ul className="list-disc pl-4 text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-800">
                                {narrative.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-blue-600 print:text-zinc-900">Growth Areas</h4>
                            <ul className="list-disc pl-4 text-sm text-zinc-600 dark:text-zinc-400 print:text-zinc-800">
                                {narrative.growthAreas.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
