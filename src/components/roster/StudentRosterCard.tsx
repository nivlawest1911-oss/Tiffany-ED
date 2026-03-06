'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, FileText, Activity } from 'lucide-react';
import { getDeadlineStatus, getStatusColor } from '@/lib/roster-logic';

export interface RosterStudent {
    id: string;
    name: string;
    grade: number;
    iepDueDate: string;
    complianceStatus: 'compliant' | 'non-compliant' | 'pending';
    lastIncident?: string;
}

interface StudentRosterCardProps {
    student: RosterStudent;
}

export function StudentRosterCard({ student }: StudentRosterCardProps) {
    const deadlineStatus = getDeadlineStatus(student.iepDueDate);
    const statusColors = getStatusColor(deadlineStatus);

    return (
        <Card className="overflow-hidden border-zinc-200 bg-white/50 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {student.name}
                </CardTitle>
                <Badge variant={student.complianceStatus === 'compliant' ? 'default' : 'destructive'} transform="uppercase">
                    {student.complianceStatus}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div className={`flex items-center justify-between rounded-md border px-2 py-1 ${statusColors}`}>
                        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider">
                            <CalendarClock className="h-3 w-3" />
                            <span>IEP Due</span>
                        </div>
                        <span className="text-xs font-bold">{new Date(student.iepDueDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>Grade {student.grade}</span>
                        </div>
                        {student.lastIncident && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <FileText className="h-3 w-3" />
                                <span>Incident: {student.lastIncident}</span>
                            </div>
                        )}
                    </div>

                    <Button size="sm" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-95">
                        Initiate Protocol
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
