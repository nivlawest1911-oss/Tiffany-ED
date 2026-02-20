'use client';

import React from 'react';
import {
    TrendingUp,
    Clock,
    ShieldAlert,
    Zap,
    Users,
    FileCheck,
    ArrowUpRight,
    ShieldCheck,
    AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculateSovereignSavings, formatCurrency } from '@/lib/roi-logic';

const MOCK_METRICS = {
    legalDocumentsReviewed: 42,
    gradingHoursSaved: 156,
    administrativeTasksAutomated: 88,
    complianceChecksRun: 120
};

const URGENT_ALERTS = [
    { id: '1', student: 'Jordan Maxwell', type: 'IEP Overdue', urgency: 'critical' },
    { id: '2', student: 'Emily Chen', type: 'Triennial Review', urgency: 'high' },
    { id: '3', student: 'Marcus Thorne', type: 'Compliance Gap', urgency: 'medium' }
];

export function AdminCommandDashboard() {
    const savings = calculateSovereignSavings(MOCK_METRICS);

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white text-left">
                        Admin <span className="text-intel-gold">Command</span>
                    </h2>
                    <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mt-1 text-left">
                        Tactical District Operations & Intelligence
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-white/10 bg-white/5 text-white/60 hover:text-white">
                        Export Intelligence
                    </Button>
                    <Button className="bg-intel-gold text-black hover:bg-intel-gold/80 font-bold uppercase tracking-widest text-[10px] border-none">
                        Deploy New Protocol
                    </Button>
                </div>
            </div>

            {/* ROI & District Pulse Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-intel-gold" /> Total Savings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-intel-gold italic">
                            {formatCurrency(savings.totalSavings)}
                        </div>
                        <p className="text-[10px] text-emerald-500/60 font-mono mt-1">
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3 text-intel-gold" /> Capacity Reclaimed
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-white italic">
                            {savings.hoursReclaimed}h
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Equivalent to 2.4 FT staff
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-intel-gold" /> Risk Mitigated
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-emerald-500 italic">
                            92%
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Active compliance shielding
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-3 h-3 text-intel-gold" /> Efficiency Gain
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-intel-gold italic">
                            4.8x
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Against legacy workflows
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Alerts & Operational Status */}
                <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="text-left">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-white uppercase tracking-tighter italic font-black text-xl">
                                    Sentinel <span className="text-intel-gold">Alerts</span>
                                </CardTitle>
                                <CardDescription className="text-white/20 text-[10px] uppercase font-mono tracking-widest">
                                    Real-time operational hazards
                                </CardDescription>
                            </div>
                            <Badge variant="secondary" className="border-red-500/50 text-red-500 font-black text-[9px] uppercase tracking-widest bg-transparent">
                                3 Critical
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {URGENT_ALERTS.map((alert) => (
                                <div key={alert.id} className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-intel-gold/40 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-xl bg-black/40 border ${alert.urgency === 'critical' ? 'border-red-500/50 text-red-500' :
                                                alert.urgency === 'high' ? 'border-orange-500/50 text-orange-500' :
                                                    'border-intel-gold/50 text-intel-gold'
                                            }`}>
                                            {alert.urgency === 'critical' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">{alert.student}</h4>
                                            <p className="text-[10px] text-white/40 font-mono">{alert.type}</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 text-intel-gold text-[10px] font-black uppercase tracking-widest bg-transparent border-none">
                                        Resolve <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5 text-left text-left">
                            <Button variant="secondary" className="text-intel-gold text-[10px] font-black uppercase tracking-widest p-0 bg-transparent border-none">
                                View Full Roster Analysis
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Commands */}
                <div className="space-y-6 text-left">
                    <Card className="bg-intel-gold text-black border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <Users className="w-32 h-32" />
                        </div>
                        <CardHeader className="text-left">
                            <CardTitle className="uppercase italic font-black text-2xl tracking-tighter">
                                Executive <br /> Roleplay
                            </CardTitle>
                            <CardDescription className="text-black/60 text-[10px] uppercase font-black font-mono tracking-widest">
                                Simulate District Conflict
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-left">
                            <Button className="w-full bg-black text-intel-gold hover:bg-black/80 font-bold uppercase tracking-widest text-[10px] mt-4 border-none">
                                Launch Simulator
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                        <CardHeader className="text-left">
                            <CardTitle className="text-white uppercase tracking-tighter italic font-black text-xl">
                                Quick <span className="text-intel-gold">Actions</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { label: 'Suspension Alternatives', icon: FileCheck },
                                { label: 'Fragility Mapping', icon: Users },
                                { label: 'Sovereign Ledger', icon: TrendingUp }
                            ].map((action) => (
                                <Button key={action.label} variant="secondary" className="w-full justify-start border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-intel-gold/40 py-6 gap-4">
                                    <action.icon className="w-4 h-4 text-intel-gold" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
