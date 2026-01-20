'use client';
import { AlertCircle, FileText, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LegislativeAlert {
    id: string;
    bill: string;
    title: string;
    status: 'active' | 'pending' | 'passed';
    deadline: string;
    priority: 'critical' | 'high' | 'medium';
}

import { useState, useEffect } from 'react';

function CurrentDate() {
    const [date, setDate] = useState("");
    useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);
    return <>{date}</>;
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-3xl glass-card-premium border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <AlertCircle className="text-red-500 relative z-10" size={20} />
                        <div className="absolute inset-0 bg-red-500 blur-md animate-pulse opacity-50" />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-sm text-red-500">Leadership Briefing</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-mono"><CurrentDate /></span>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-3 rounded-xl border ${getPriorityColor(alert.priority)} backdrop-blur-md transition-transform hover:translate-x-1`}
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
                        <div className="flex items-center gap-1 text-xs opacity-80">
                            <Clock size={12} />
                            <span>Deadline: {alert.deadline}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
                <a
                    href="https://alison.legislature.state.al.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn block w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all text-center shadow-lg shadow-red-900/20 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        View Legislative Calendar
                        <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </a>
            </div>
        </motion.div>
    );
}
