import { StudentRosterCard, RosterStudent } from '@/components/roster/StudentRosterCard';
import { GlassCard } from '@/components/ui/Cinematic';
import { Users, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';
import { SmartHover } from '@/components/ui/SmartHover';

// Extended Mock Data for Demonstration
const MOCK_ROSTER: RosterStudent[] = [
    {
        id: '1',
        name: 'Jordan Maxwell',
        grade: 10,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Critical (In 2 days)
        complianceStatus: 'non-compliant',
        lastIncident: '2 days ago'
    },
    {
        id: '2',
        name: 'Samantha Lee',
        grade: 11,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), // Urgent (In 5 days)
        complianceStatus: 'pending'
    },
    {
        id: '3',
        name: 'Marcus Thorne',
        grade: 12,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // Stable (In 14 days)
        complianceStatus: 'compliant'
    },
    {
        id: '4',
        name: 'Emily Chen',
        grade: 9,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Critical (Tomorrow)
        complianceStatus: 'non-compliant',
        lastIncident: 'Yesterday'
    },
    {
        id: '5',
        name: 'David Okafor',
        grade: 10,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), // Stable
        complianceStatus: 'compliant'
    },
    {
        id: '6',
        name: 'Lisa Ray',
        grade: 11,
        iepDueDate: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString(), // Urgent
        complianceStatus: 'pending'
    }
];

export default function RosterPage() {
    const totalStudents = MOCK_ROSTER.length;
    const compliantCount = MOCK_ROSTER.filter(s => s.complianceStatus === 'compliant').length;
    const urgentCount = MOCK_ROSTER.filter(s => {
        const days = Math.floor((new Date(s.iepDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days <= 7;
    }).length;

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
                    <button className="h-14 px-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md">
                        Sync Roster
                    </button>
                    <button className="h-14 px-8 bg-white hover:bg-slate-200 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-white/5 transition-all">
                        Add Student
                    </button>
                </div>
            </div>

            {/* Caseload Summary */}
            <SmartHover message="Caseload Summary: Real-time telemetry on student compliance status and upcoming critical protocol reviews.">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mb-12">
                    {[
                        { label: 'Total Caseload', value: totalStudents, icon: Users, color: 'text-indigo-400' },
                        { label: 'Compliant', value: compliantCount, icon: ShieldCheck, color: 'text-emerald-400' },
                        { label: 'Urgent Reviews', value: urgentCount, icon: Clock, color: 'text-orange-400' },
                        { label: 'Critical Errors', value: 2, icon: AlertTriangle, color: 'text-rose-400' }
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

            <SmartHover message="Student Array: Individualized access to comprehensive student profiles and strategic protocol management.">
                <div className="pt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
                    {MOCK_ROSTER.map((student) => (
                        <StudentRosterCard key={student.id} student={student} />
                    ))}
                </div>
            </SmartHover>
        </div>
    );
}
