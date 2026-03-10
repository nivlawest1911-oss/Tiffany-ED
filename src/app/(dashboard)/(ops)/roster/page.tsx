'use client';

import { useEffect, useState } from 'react';
import { StudentRosterCard, RosterStudent } from '@/components/roster/StudentRosterCard';
import { GlassCard } from '@/components/ui/Cinematic';
import { Users, ShieldCheck, AlertTriangle, Clock, Loader2, LayoutGrid, Briefcase } from 'lucide-react';
import { SmartHover } from '@/components/ui/SmartHover';
import { toast } from 'sonner';
import { WorkforceOptimization } from '@/components/roster/WorkforceOptimization';

export default function RosterPage() {
    const [roster, setRoster] = useState<RosterStudent[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'students' | 'workforce'>('students');

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch('/api/roster');
                if (!response.ok) throw new Error('Institutional uplink failed');
                const data = await response.json();
                setRoster(data);
            } catch (error) {
                console.error('Roster error:', error);
                toast.error('Failed to sync institutional roster.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, []);

    const totalStudents = roster.length;
    const compliantCount = roster.filter(s => s.complianceStatus === 'compliant').length;

    // Timeline Sentinel Logic
    const criticalCount = roster.filter(s => {
        const targetDate = new Date(s.iepDueDate);
        const days = Math.floor((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days <= 3;
    }).length;

    const urgentCount = roster.filter(s => {
        const targetDate = new Date(s.iepDueDate);
        const days = Math.floor((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days > 3 && days <= 7;
    }).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing Sovereign Roster...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Logistics
                </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                            Sovereign Roster Operations
                        </span>
                    </div>
                    <SmartHover message="Roster Logistics: Manage and monitor student compliance, IEP deadlines, and institutional protocols with clinical precision.">
                        <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
                            Roster <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Logistics</span>.
                        </h1>
                    </SmartHover>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="h-14 px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md"
                    >
                        Sync Roster
                    </button>
                    <button className="h-14 px-8 bg-white hover:bg-slate-200 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-white/5 transition-all">
                        Add Student
                    </button>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 mb-12 relative z-10">
                <button
                    onClick={() => setView('students')}
                    className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${view === 'students' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                >
                    <LayoutGrid size={14} />
                    Student Array
                </button>
                <button
                    onClick={() => setView('workforce')}
                    className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${view === 'workforce' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                >
                    <Briefcase size={14} />
                    Workforce Optimization
                </button>
            </div>

            {view === 'students' ? (
                <>
                    {/* Caseload Summary */}
                    <SmartHover message="Caseload Summary: Real-time telemetry on student compliance status and upcoming critical protocol reviews.">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mb-12">
                            {[
                                { label: 'Total Caseload', value: totalStudents, icon: Users, color: 'text-indigo-400' },
                                { label: 'Compliant', value: compliantCount, icon: ShieldCheck, color: 'text-emerald-400' },
                                { label: 'Urgent Reviews', value: urgentCount, icon: Clock, color: 'text-orange-400' },
                                { label: 'Critical / Overdue', value: criticalCount, icon: AlertTriangle, color: 'text-rose-400' }
                            ].map((stat) => (
                                <GlassCard key={stat.label} className="p-8 group hover:border-white/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                            <p className="text-3xl font-black text-white tracking-tighter leading-none">{stat.value}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </SmartHover>

                    {roster.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02] relative z-10 backdrop-blur-sm">
                            <div className="p-6 rounded-full bg-white/5 mb-6">
                                <AlertTriangle className="w-12 h-12 text-slate-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Institutional Standby</h2>
                            <p className="text-slate-400 text-sm max-w-sm text-center">
                                The Sovereign Roster is currently synchronized with the core database, but no active intervention plans or cases were detected.
                            </p>
                        </div>
                    ) : (
                        <SmartHover message="Student Array: Individualized access to comprehensive student profiles and strategic protocol management.">
                            <div className="pt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
                                {roster.map((student) => (
                                    <StudentRosterCard key={student.id} student={student} />
                                ))}
                            </div>
                        </SmartHover>
                    )}
                </>
            ) : (
                <WorkforceOptimization />
            )}
        </div>
    );
}
