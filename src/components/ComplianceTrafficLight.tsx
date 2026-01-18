'use client';
import { ShieldCheck, AlertTriangle, FileWarning, CheckCircle, Info } from 'lucide-react';

export default function ComplianceTrafficLight() {
    // Mock data - in production this would scan actual documents
    const complianceStatus = {
        score: 88,
        status: 'warning', // healthy, warning, critical
        items: [
            { id: 1, type: 'IEP', name: 'Student #8291-A', issue: 'Missing Transition Plan Goal', act: 'IDEA Sec. 300.320', status: 'critical' },
            { id: 2, type: 'Lesson Plan', name: 'Grade 5 Math', issue: 'Standards Alignment Check', act: 'AL Act 2024-548', status: 'healthy' },
            { id: 3, type: '504 Plan', name: 'Student #1102-B', issue: 'Review Date Approaching', act: 'Section 504', status: 'warning' },
        ]
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'healthy': return <CheckCircle size={14} />;
            case 'warning': return <Info size={14} />;
            case 'critical': return <AlertTriangle size={14} />;
            default: return <Info size={14} />;
        }
    };

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Compliance Radar</h3>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${complianceStatus.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
                        <div className={`w-2 h-2 rounded-full ${complianceStatus.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-zinc-800'}`} />
                        <div className={`w-2 h-2 rounded-full ${complianceStatus.status === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-zinc-800'}`} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {complianceStatus.items.map((item) => (
                    <div key={item.id} className={`p-4 rounded-xl border ${getStatusColor(item.status)} flex items-start justify-between group cursor-pointer hover:bg-opacity-20 transition-all`}>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${getStatusColor(item.status)} bg-opacity-20 border-opacity-0`}>{item.type}</span>
                                <span className="text-sm font-bold text-zinc-200">{item.name}</span>
                            </div>
                            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                                <StatusIcon status={item.status} />
                                {item.issue}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] font-mono text-zinc-500">{item.act}</div>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase text-indigo-400 flex items-center justify-end gap-1">
                                Fix <FileWarning size={10} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-mono">SCAN_ID: #992-ALPHA</span>
                <span className="text-[10px] text-zinc-500 font-mono">UPDATED: 2m ago</span>
            </div>

            {/* Background scanner effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20 animate-scan" />
        </div>
    );
}
