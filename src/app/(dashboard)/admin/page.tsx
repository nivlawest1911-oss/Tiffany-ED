'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { TelemetryTerminal } from '@/components/admin/TelemetryTerminal'
import { DigitalTwinSimulator } from '@/components/admin/DigitalTwinSimulator'
import { StrategicForecast } from '@/components/admin/StrategicForecast'
import { PredictiveRiskRadar } from '@/components/admin/PredictiveRiskRadar'
import { Brain, LayoutGrid, School, Presentation, TrendingUp, ShieldAlert, AlertTriangle, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useIntelligence } from '@/context/IntelligenceContext'

interface SchoolMetrics {
    totalUsers: number
    activeUsers: number
    lessonsGenerated: number
    totalTimeSaved: number
    studentEngagementRate: number
    suspensionReduction: number
    costPerUser: number
    generatedContentCount: number
    strategicVaultCount: number
    commandPulseRate: number
}

const URGENT_ALERTS = [
    { id: '1', student: 'Jordan Maxwell', type: 'IEP Overdue', urgency: 'critical' },
    { id: '2', student: 'Emily Chen', type: 'Triennial Review', urgency: 'high' },
    { id: '3', student: 'Marcus Thorne', type: 'Compliance Gap', urgency: 'medium' }
];

export default function AdminDashboard() {
    const { user: authUser } = useAuth()
    const userId = authUser?.id
    const [metrics, setMetrics] = useState<SchoolMetrics | null>(null)
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [sites, setSites] = useState<{ id: string, name: string }[]>([])
    const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const { generateBriefing } = useIntelligence()

    useEffect(() => {
        const fetchMetrics = async () => {
            if (!supabase) return;
            try {
                // Get user's school and role
                const { data: user } = await supabase
                    .from('users')
                    .select('school_id, role')
                    .eq('clerk_id', userId)
                    .single()

                if (!user) return;

                const role = user.role?.toUpperCase() || 'TEACHER';
                setUserRole(role);

                // 🏛️ ADMIN GATEKEEPER: Check for ADMIN, SUPERINTENDENT, or EXECUTIVE role
                const allowedRoles = ['ADMIN', 'SUPERINTENDENT', 'EXECUTIVE'];
                if (!allowedRoles.includes(role)) {
                    setLoading(false);
                    return
                }

                // If district admin, fetch available sites if not already fetched
                if (['SUPERINTENDENT', 'EXECUTIVE'].includes(role) && sites.length === 0) {
                    try {
                        const sitesRes = await fetch('/api/admin/sites');
                        const sitesData = await sitesRes.json();
                        if (sitesData.sites) {
                            setSites(sitesData.sites);
                            // Default to user's school if not set
                            if (!selectedSchoolId) {
                                setSelectedSchoolId(user.school_id);
                            }
                        }
                    } catch (err) {
                        console.error('Failed to fetch sites:', err);
                    }
                } else if (!selectedSchoolId) {
                    setSelectedSchoolId(user.school_id);
                }

                const schoolId = selectedSchoolId || user.school_id;
                if (!schoolId) return;

                // Fetch analytics
                const { data: analytics } = await supabase
                    .from('analytics')
                    .select('*')
                    .eq('school_id', schoolId)
                    .order('date', { ascending: true })
                    .limit(30)

                // Calculate metrics
                const totalTimeSaved = analytics?.reduce(
                    (sum, a) => sum + (a.time_saved_hours || 0),
                    0
                ) || 0

                const avgEngagement =
                    analytics && analytics.length > 0
                        ? analytics.reduce((sum, a) => sum + (a.students_engaged || 0), 0) /
                        analytics.length
                        : 0

                // Get all school users
                const { data: schoolUsers } = await supabase
                    .from('users')
                    .select('id, updated_at')
                    .eq('school_id', schoolId)

                const schoolUserIds = schoolUsers?.map(u => u.id) || []

                // Get subscription info
                const { data: subscriptions } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('school_id', schoolId)

                setMetrics({
                    totalUsers: schoolUsers?.length || 0,
                    activeUsers: schoolUsers?.filter(
                        (u: any) => new Date(u.updated_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                    ).length || 0,
                    lessonsGenerated: analytics?.reduce(
                        (sum, a) => sum + (a.lessons_created || 0),
                        0
                    ) || 0,
                    totalTimeSaved,
                    studentEngagementRate: avgEngagement,
                    suspensionReduction: 0,
                    costPerUser: subscriptions?.[0] ? (subscriptions[0].amount || 0) / (schoolUsers?.length || 1) : 0,
                    generatedContentCount: 0,
                    strategicVaultCount: 0,
                    commandPulseRate: 0,
                })

                // Fetch real-time institutional metrics
                const { count: generatedContentCount } = await supabase
                    .from('generated_content_hub')
                    .select('*', { count: 'exact', head: true })
                    .in('user_id', schoolUserIds);

                const { count: strategicVaultCount } = await supabase
                    .from('strategic_vault')
                    .select('*', { count: 'exact', head: true })
                    .in('user_id', schoolUserIds);

                const { data: telemetry } = await supabase
                    .from('analytics_events')
                    .select('event_type') // event_type in Prisma
                    .limit(100);

                const successCount = telemetry?.length || 0; // Simple approximation or check specific actions
                const pulseRate = telemetry && telemetry.length > 0 ? (successCount / 100) * 100 : 0;

                setMetrics(prev => prev ? {
                    ...prev,
                    generatedContentCount: generatedContentCount || 0,
                    strategicVaultCount: strategicVaultCount || 0,
                    commandPulseRate: pulseRate
                } : null);


                // Prepare chart data with projection
                if (analytics && analytics.length > 0) {
                    const baseData = analytics.map((a) => ({
                        date: new Date(a.date).toLocaleDateString(),
                        timeSaved: a.time_saved_hours,
                        lessonsCreated: a.lessons_created,
                        engagement: a.students_engaged,
                        isForecast: false
                    }));

                    // Add 7-day projection based on last week's average
                    const last7 = analytics.slice(-7);
                    const avgDailySaved = last7.reduce((s, a) => s + (a.time_saved_hours || 0), 0) / (last7.length || 1);

                    const forecastData = Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date(analytics[analytics.length - 1].date);
                        date.setDate(date.getDate() + i + 1);
                        return {
                            date: date.toLocaleDateString(),
                            timeSaved: avgDailySaved * (1 + (i * 0.02)), // Slight growth factor
                            lessonsCreated: 0,
                            engagement: 0,
                            isForecast: true
                        };
                    });

                    setChartData([...baseData, ...forecastData]);
                }
            } catch (error) {
                console.error('Error fetching metrics:', error)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchMetrics()
        }
    }, [userId, selectedSchoolId, sites.length])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4" />
                    <p className="text-muted-foreground animate-pulse">Synchronizing Admin Command...</p>
                </div>
            </div>
        )
    }

    if (!metrics) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background p-8">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
                    <p className="text-muted-foreground">This terminal is reserved for District Administrators and Site Command staff.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-8 h-8 text-sovereign-gold" />
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Site Command Dashboard</h1>
                        {['SUPERINTENDENT', 'EXECUTIVE'].includes(userRole || '') && sites.length > 1 && (
                            <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 text-xs font-bold uppercase tracking-widest">
                                <LayoutGrid className="w-3 h-3" /> District Mode Active
                            </div>
                        )}
                    </div>
                    <p className="text-muted-foreground">
                        Real-time cognitive metrics and ROI tracking for your EdIntel deployment.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {sites.length > 1 && (
                        <div className="flex flex-col gap-1.5 min-w-[240px]">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 ml-1">
                                <School className="w-3 h-3" /> Select School Site
                            </label>
                            <Select
                                value={selectedSchoolId || ''}
                                onValueChange={(val) => {
                                    setLoading(true);
                                    setSelectedSchoolId(val);
                                }}
                            >
                                <SelectTrigger className="bg-card w-full border-border focus:ring-blue-500">
                                    <SelectValue placeholder="Loading sites..." />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border">
                                    {sites.map(site => (
                                        <SelectItem key={site.id} value={site.id} className="focus:bg-blue-500/10">
                                            {site.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="h-fit px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-sm font-medium whitespace-nowrap">
                        Live Connection: Institutional Core
                    </div>

                    <button
                        onClick={() => generateBriefing({
                            title: "Executive Strategic Briefing",
                            description: "I have synthesized a comprehensive district-wide ROI analysis. Current trajectories indicate an 18% improvement in administrative throughput if current cognitive assets are optimized. This briefing contains critical policy recommendations for the upcoming Board session.",
                            role: "Strategic Architect",
                            avatarImage: "/images/avatars/executive_leader.png",
                            stats: { time: 'Calculated', saved: '124h/mo', accuracy: '99.8%' },
                            abilityType: 'strategy'
                        })}
                        className="flex items-center gap-2 px-6 py-2 bg-sovereign-gold text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(255,179,0,0.3)] active:scale-95"
                    >
                        <Presentation className="w-4 h-4" />
                        Execute Board Briefing
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Users" value={metrics.totalUsers} change="+0%" icon="👥" />
                <MetricCard label="Active Syncs" value={metrics.activeUsers} change="+0%" icon="⚡" />
                <MetricCard label="Total Content Synth" value={metrics.generatedContentCount} change="Live" icon="🧠" />
                <MetricCard label="Hours Saved" value={metrics.totalTimeSaved.toFixed(1)} change="Accrued" icon="⏱️" />
                <MetricCard label="Institutional Memory" value={metrics.strategicVaultCount} change="Stored" icon="🗄️" />
                <MetricCard label="Command Pulse" value={`${metrics.commandPulseRate.toFixed(1)}%`} change="Stable" icon="📡" />
                <MetricCard label="Cost per User" value={`$${metrics.costPerUser.toFixed(2)}`} change="Direct" icon="💰" />
                <MetricCard label="Seat Allocation" value={metrics.totalUsers} change="Occupied" icon="🎟️" />
            </div>


            {/* Swarm Intelligence & Predictive Projections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <StrategicForecast />
                </div>
                <div className="lg:col-span-4">
                    <PredictiveRiskRadar />
                </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
                <ChartContainer title="Time Saved Trend & Strategic Forecast">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#3b82f6' }}
                            formatter={(value: any, name: any, props: any) => {
                                if (props.payload.isForecast) return [value.toFixed(1), `${name} (Projected)`];
                                return [value, name];
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="timeSaved"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            connectNulls
                            data={chartData.filter(d => !d.isForecast)}
                            dot={{ r: 4, fill: '#3b82f6' }}
                            activeDot={{ r: 6 }}
                            name="Historical"
                        />
                        <Line
                            type="monotone"
                            dataKey="timeSaved"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            connectNulls
                            data={chartData.filter(d => d.isForecast || d === chartData.filter(x => !x.isForecast).slice(-1)[0])}
                            dot={false}
                            name="Forecast"
                        />
                    </LineChart>
                </ChartContainer>

                <ChartContainer title="Content Generation (Lessons)">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#8b5cf6' }}
                        />
                        <Bar dataKey="lessonsCreated" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>

                <ChartContainer title="Engagement Telemetry">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#ec4899' }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} name="Student Response" />
                    </LineChart>
                </ChartContainer>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col min-h-[500px]">
                    <div className="flex justify-between items-center mb-6 text-left">
                        <div>
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
                                Sentinel <span className="text-sovereign-gold">Alerts</span>
                            </h2>
                            <p className="text-white/20 text-[10px] uppercase font-mono tracking-widest">
                                Real-time operational hazards
                            </p>
                        </div>
                        <Badge variant="secondary" className="border-red-500/50 text-red-500 font-black text-[9px] uppercase tracking-widest bg-transparent">
                            3 Critical
                        </Badge>
                    </div>
                    <div className="space-y-4 flex-1">
                        {URGENT_ALERTS.map((alert) => (
                            <div key={alert.id} className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-sovereign-gold/40 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl bg-black/40 border ${alert.urgency === 'critical' ? 'border-red-500/50 text-red-500' :
                                        alert.urgency === 'high' ? 'border-orange-500/50 text-orange-500' :
                                            'border-sovereign-gold/50 text-sovereign-gold'
                                        }`}>
                                        {alert.urgency === 'critical' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">{alert.student}</h4>
                                        <p className="text-[10px] text-white/40 font-mono">{alert.type}</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-sovereign-gold/40 group-hover:text-sovereign-gold transition-colors" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 text-left">
                        <button className="text-sovereign-gold text-[10px] font-black uppercase tracking-widest p-0 bg-transparent border-none">
                            View Full Roster Analysis
                        </button>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col min-h-[500px]">
                    <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                        <Brain className="w-5 h-5 text-emerald-500" />
                        Neural Telemetry Terminal
                    </h2>
                    <TelemetryTerminal />
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col min-h-[500px]">
                    <DigitalTwinSimulator title="Strategic Performance Simulator" />
                </div>
            </div>

            {/* Strategic Projections Detail */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                        <Brain className="w-5 h-5" />
                        <h3 className="font-bold text-sm uppercase tracking-wider">Cognitive Gains</h3>
                    </div>
                    <p className="text-2xl font-black text-foreground">+14%</p>
                    <p className="text-xs text-muted-foreground">Projected throughput increase in IEP development efficiency over next quarter.</p>
                </div>
                <div className="bg-emerald-600/5 border border-emerald-500/20 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-emerald-500">
                        <TrendingUp className="w-5 h-5" />
                        <h3 className="font-bold text-sm uppercase tracking-wider">Operational ROI</h3>
                    </div>
                    <p className="text-2xl font-black text-foreground">$12.4k</p>
                    <p className="text-xs text-muted-foreground">Estimated administrative cost savings through automated content synthesis.</p>
                </div>
                <div className="bg-sovereign-gold/5 border border-sovereign-gold/20 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-sovereign-gold">
                        <Presentation className="w-5 h-5" />
                        <h3 className="font-bold text-sm uppercase tracking-wider">Board Readiness</h3>
                    </div>
                    <p className="text-2xl font-black text-foreground">Optimal</p>
                    <p className="text-xs text-muted-foreground">Neural link synchronization suggests 98% alignment with district strategic goals.</p>
                </div>
            </div>

            {/* User Management */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Site Roster Management</h2>
                <UserManagementTable />
            </div>

            {/* Settings */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6">Institutional Configuration</h2>
                <SchoolSettingsForm />
            </div>
        </div>
    )
}

function MetricCard({ label, value, change, icon }: { label: string; value: string | number; change: string; icon: string }) {
    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-muted-foreground text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
                    <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                        <span>{change}</span>
                        <span className="opacity-50 font-normal text-muted-foreground ml-1">vs last month</span>
                    </p>
                </div>
                <div className="text-4xl bg-muted p-3 rounded-full opacity-80 group-hover:scale-110 transition-transform">{icon}</div>
            </div>
        </div>
    )
}

function ChartContainer({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">{title}</h2>
            <ResponsiveContainer width="100%" height={300}>
                {children as any}
            </ResponsiveContainer>
        </div>
    )
}

function UserManagementTable() {
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            if (!supabase) return;
            const { data } = await supabase.from('users').select('*').limit(10)
            setUsers(data || [])
        }
        fetchUsers()
    }, [])

    return (
        <div className="overflow-x-auto -mx-6">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-muted/50 border-y border-border text-left">
                        <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Identity</th>
                        <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Designation</th>
                        <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Uplink Status</th>
                        <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Sync</th>
                        <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Control</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs uppercase">
                                        {user.name?.charAt(0) || user.email.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground">{user.name || 'Anonymous'}</div>
                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md text-[10px] font-bold uppercase tracking-tight">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-foreground">Synchronized</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground">
                                {new Date(user.updated_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-blue-500 hover:text-blue-400 font-bold text-xs uppercase tracking-tighter transition-colors">
                                    Modify Clearance
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SchoolSettingsForm() {
    const [settings, setSettings] = useState({
        schoolName: 'Institutional Site Alpha',
        districtName: 'Regional Education Command',
        maxUsers: 50,
        supportEmail: 'command@edintel.edu',
    })

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="schoolName" className="text-xs font-bold text-muted-foreground uppercase">Site Designation</label>
                    <input
                        id="schoolName"
                        type="text"
                        value={settings.schoolName}
                        onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                        className="w-full bg-card px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="districtName" className="text-xs font-bold text-muted-foreground uppercase">Command District</label>
                    <input
                        id="districtName"
                        type="text"
                        value={settings.districtName}
                        onChange={(e) => setSettings({ ...settings, districtName: e.target.value })}
                        className="w-full bg-card px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="maxUsers" className="text-xs font-bold text-muted-foreground uppercase">Seat Allocation</label>
                    <input
                        id="maxUsers"
                        type="number"
                        value={settings.maxUsers}
                        onChange={(e) => setSettings({ ...settings, maxUsers: parseInt(e.target.value) })}
                        className="w-full bg-card px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="supportEmail" className="text-xs font-bold text-muted-foreground uppercase">Support Channel</label>
                    <input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        className="w-full bg-card px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-border">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                    Commit Institutional Changes
                </button>
            </div>
        </div>
    )
}
