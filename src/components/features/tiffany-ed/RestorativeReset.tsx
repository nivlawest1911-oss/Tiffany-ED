'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, RefreshCw, MessageCircle, HeartHandshake } from 'lucide-react';
import { RestorativeContext } from '@/utils/restorative-service';

export function RestorativeReset() {
    const [loading, setLoading] = useState(false);
    const [script, setScript] = useState<{ opener: string; questions: string[]; closing: string } | null>(null);
    const [formData, setFormData] = useState<RestorativeContext>({
        studentName: '',
        incidentType: '',
        severity: 'low',
        relationshipHistory: 'neutral'
    });

    const handleGenerate = async () => {
        if (!formData.studentName || !formData.incidentType) return;
        setLoading(true);
        try {
            // In a real app, this would be a server action or API route.
            // For now, we simulate the API call here or direct call if allowed (but usually creates CORS/Secret issues on client).
            // We will fetch via an API route to be safe.
            const response = await fetch('/api/tiffany/restorative-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setScript(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <RefreshCw className="h-5 w-5" />
                    Restorative Reset
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Student Name</Label>
                    <Input
                        placeholder="e.g. Jordan"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Incident / Behavior</Label>
                    <Input
                        placeholder="e.g. Refusing to work, disruption"
                        value={formData.incidentType}
                        onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Severity</Label>
                        <Select
                            value={formData.severity}
                            onValueChange={(v: any) => setFormData({ ...formData, severity: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low (Grumpy)</SelectItem>
                                <SelectItem value="medium">Medium (Disruptive)</SelectItem>
                                <SelectItem value="high">High (Aggressive)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Select
                            value={formData.relationshipHistory}
                            onValueChange={(v: any) => setFormData({ ...formData, relationshipHistory: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="positive">Strong</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="strained">Strained</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={handleGenerate}
                    disabled={loading || !formData.studentName}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Script...
                        </>
                    ) : (
                        <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Generate Script
                        </>
                    )}
                </Button>

                {script && (
                    <div className="mt-6 space-y-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/10 fade-in slide-in-from-bottom-2 animate-in duration-500">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">The Opener</h4>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">"{script.opener}"</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Restorative Questions</h4>
                            <ul className="list-disc pl-4 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                                {script.questions.map((q, i) => (
                                    <li key={i}>{q}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">The Closing</h4>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">"{script.closing}"</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 text-xs text-indigo-500">
                            <HeartHandshake className="h-3 w-3" />
                            <span>Goal: Reconnection & Repair</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
