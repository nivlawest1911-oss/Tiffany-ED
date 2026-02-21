'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
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

interface SchoolMetrics {
    totalUsers: number
    activeUsers: number
    lessonsGenerated: number
    totalTimeSaved: number
    studentEngagementRate: number
    suspensionReduction: number
    costPerUser: number
}

export default function AdminDashboard() {
    const { userId } = useAuth()
    const [metrics, setMetrics] = useState<SchoolMetrics | null>(null)
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            if (!supabase) return;
            try {
                // Get user's school
                const { data: user } = await supabase
                    .from('users')
                    .select('school_id, role')
                    .eq('clerk_id', userId)
                    .single()

                // 🏛️ ADMIN GATEKEEPER: Check for ADMIN role (case-insensitive check for robustness)
                if (user?.role?.toUpperCase() !== 'ADMIN') {
                    return
                }

                const schoolId = user.school_id

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
                const { data: users } = await supabase
                    .from('users')
                    .select('*')
                    .eq('school_id', schoolId)

                // Get subscription info
                const { data: subscriptions } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('school_id', schoolId)

                setMetrics({
                    totalUsers: users?.length || 0,
                    activeUsers: users?.filter(
                        (u: any) => new Date(u.updated_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                    ).length || 0,
                    lessonsGenerated: analytics?.reduce(
                        (sum, a) => sum + (a.lessons_created || 0),
                        0
                    ) || 0,
                    totalTimeSaved,
                    studentEngagementRate: avgEngagement,
                    suspensionReduction: 23.5, // Mock value as per requirement
                    costPerUser: subscriptions?.[0] ? (subscriptions[0].amount || 0) / (users?.length || 1) : 0,
                })

                // Prepare chart data
                if (analytics) {
                    setChartData(
                        analytics.map((a) => ({
                            date: new Date(a.date).toLocaleDateString(),
                            timeSaved: a.time_saved_hours,
                            lessonsCreated: a.lessons_created,
                            engagement: a.students_engaged,
                        }))
                    )
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
    }, [userId])

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
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Site Command Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Real-time cognitive metrics and ROI tracking for your EdIntel deployment.
                    </p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-sm font-medium">
                    Live Connection: Institutional Core
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Users" value={metrics.totalUsers} change="+12%" icon="👥" />
                <MetricCard label="Active This Week" value={metrics.activeUsers} change="+8%" icon="📊" />
                <MetricCard label="Lessons Generated" value={metrics.lessonsGenerated} change="+24%" icon="📚" />
                <MetricCard label="Hours Saved" value={metrics.totalTimeSaved.toFixed(1)} change="+15%" icon="⏱️" />
                <MetricCard label="Suspension Reduction" value={`${metrics.suspensionReduction}%`} change="↓" icon="📉" />
                <MetricCard label="Student Engagement" value={`${metrics.studentEngagementRate.toFixed(1)}%`} change="↑" icon="🎯" />
                <MetricCard label="Cost per User" value={`$${metrics.costPerUser.toFixed(2)}`} change="Optimized" icon="💰" />
                <MetricCard label="Institutional ROI" value="4.2x" change="Strong" icon="📈" />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
                <ChartContainer title="Time Saved Trend">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Line type="monotone" dataKey="timeSaved" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <h2 className="text-xl font-bold text-foreground mb-6">Impact Analysis</h2>
                    <div className="space-y-6">
                        <ImpactRow label="Teacher Burnout Reduction" value="45%" color="bg-green-500" />
                        <ImpactRow label="Decision-Making Fatigue Relief" value="52%" color="bg-blue-500" />
                        <ImpactRow label="Suspension Rate Delta" value="-23.5%" color="bg-purple-500" />
                        <ImpactRow label="Student Learning Gains" value="+18%" color="bg-yellow-500" />
                    </div>
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

function ImpactRow({ label, value, color }: { label: string; value: string; color: string }) {
    const percentage = parseInt(value) || 0;
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <span className="text-sm font-bold text-foreground">{value}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${Math.abs(percentage)}%` } as any} />
            </div>
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
