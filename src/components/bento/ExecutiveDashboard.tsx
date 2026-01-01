'use client';
import { AlertCircle, FileText, Clock } from 'lucide-react';

interface LegislativeAlert {
    id: string;
    bill: string;
    title: string;
    status: 'active' | 'pending' | 'passed';
    deadline: string;
    priority: 'critical' | 'high' | 'medium';
}

export default function ExecutiveDashboard() {
    const alerts: LegislativeAlert[] = [
        {
            id: '1',
            bill: 'SB 101',
            title: 'Special Education Funding Reform',
            status: 'active',
            deadline: '2025-02-15',
            priority: 'critical'
        },
        {
            id: '2',
            bill: 'The RAISE Act',
            title: 'Revenue Achievement & Investment in School Excellence',
            status: 'pending',
            deadline: '2025-03-01',
            priority: 'critical'
        },
        {
            id: '3',
            bill: 'AL Code 290-8-9',
            title: 'Administrative Compliance Standards',
            status: 'active',
            deadline: '2025-01-30',
            priority: 'high'
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
        }
    };

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-500" size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Morning Intel</h3>
                </div>
                <span className="text-xs text-zinc-400 font-mono">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-3 rounded-xl border ${getPriorityColor(alert.priority)}`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FileText size={16} />
                                <span className="font-bold text-sm">{alert.bill}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20">
                                {alert.status}
                            </span>
                        </div>
                        <p className="text-xs mb-2 leading-relaxed">{alert.title}</p>
                        <div className="flex items-center gap-1 text-xs">
                            <Clock size={12} />
                            <span>Deadline: {alert.deadline}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                    href="https://alison.legislature.state.al.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                    View Full Legislative Calendar
                </a>
            </div>
        </div>
    );
}
