'use client';

/**
 * AI Phone Center - Beautiful UI for phone agent management
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    PhoneCall,
    PhoneIncoming,
    PhoneOutgoing,
    Users,
    BarChart3,
    Clock,
    TrendingUp,
    CheckCircle,
    XCircle,
    Brain,
} from 'lucide-react';

interface PhoneCall {
    id: string;
    from: string;
    to: string;
    status: 'ringing' | 'in-progress' | 'completed' | 'failed';
    duration: number;
    transcript?: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    agent: string;
    timestamp: Date;
}

export default function AIPhoneCenter() {
    const [activeCalls] = useState<PhoneCall[]>([]);
    const [callHistory] = useState<PhoneCall[]>([]);
    const [stats] = useState({
        totalCalls: 0,
        activeNow: 0,
        averageDuration: 0,
        satisfactionRate: 0,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-indigo-500/30">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('/grid.svg')" }}
                />
                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                AI Phone Center
                            </h1>
                        </div>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            World-class AI phone agents powered by Google Gemini, Twilio, and advanced speech AI
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={PhoneCall}
                        label="Total Calls"
                        value={stats.totalCalls}
                        trend="+12%"
                        color="indigo"
                    />
                    <StatCard
                        icon={Users}
                        label="Active Now"
                        value={stats.activeNow}
                        trend="Live"
                        color="green"
                    />
                    <StatCard
                        icon={Clock}
                        label="Avg Duration"
                        value={`${stats.averageDuration}s`}
                        trend="-5%"
                        color="amber"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Satisfaction"
                        value={`${stats.satisfactionRate}%`}
                        trend="+8%"
                        color="emerald"
                    />
                </div>

                {/* Active Calls */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <PhoneIncoming className="w-6 h-6 text-green-400" />
                            Active Calls
                        </h2>

                        {activeCalls.length > 0 ? (
                            <div className="space-y-4">
                                {activeCalls.map((call) => (
                                    <CallCard key={call.id} call={call} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <Phone className="w-16 h-16 mb-4 opacity-50" />
                                <p>No active calls</p>
                            </div>
                        )}
                    </div>

                    {/* Make Outbound Call */}
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <PhoneOutgoing className="w-6 h-6 text-blue-400" />
                            Make Call
                        </h2>

                        <OutboundCallForm />
                    </div>
                </div>

                {/* Call History */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <BarChart3 className="w-6 h-6 text-purple-400" />
                        Recent Calls
                    </h2>

                    <CallHistoryTable calls={callHistory} />
                </div>
            </div>
        </div>
    );
}

/**
 * Stat Card Component
 */
function StatCard({ icon: Icon, label, value, trend, color }: any) {
    const colorClasses: Record<string, string> = {
        indigo: 'from-indigo-500 to-indigo-600',
        green: 'from-green-500 to-green-600',
        amber: 'from-amber-500 to-amber-600',
        emerald: 'from-emerald-500 to-emerald-600',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-400 font-semibold">{trend}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-slate-400">{label}</div>
        </motion.div>
    );
}

/**
 * Call Card Component
 */
function CallCard({ call }: { call: PhoneCall }) {
    const statusColors = {
        ringing: 'text-yellow-400',
        'in-progress': 'text-green-400',
        completed: 'text-blue-400',
        failed: 'text-red-400',
    };

    const sentimentColors = {
        positive: 'text-green-400',
        neutral: 'text-slate-400',
        negative: 'text-red-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 rounded-xl p-4 border border-slate-700"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Phone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <div className="font-semibold text-white">{call.from}</div>
                        <div className="text-sm text-slate-400">{call.agent}</div>
                    </div>
                </div>
                <div className={`text-sm font-semibold ${statusColors[call.status]}`}>
                    {call.status}
                </div>
            </div>

            {call.transcript && (
                <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                    <div className="text-sm text-slate-300 line-clamp-2">
                        "{call.transcript}"
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    {call.duration}s
                </div>
                {call.sentiment && (
                    <div className={`flex items-center gap-1 ${sentimentColors[call.sentiment]}`}>
                        <Brain className="w-4 h-4" />
                        {call.sentiment}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/**
 * Outbound Call Form
 */
function OutboundCallForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [voice, setVoice] = useState('drAlvinWest');
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await fetch('/api/phone/outbound', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: phoneNumber, message, voice }),
                signal: controller.signal
            });

            const data = await response.json();

            if (data.success) {
                alert('Call initiated successfully!');
                setPhoneNumber('');
                setMessage('');
            } else {
                alert('Failed to initiate call');
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;
            console.error('Call error:', error);
            alert('Error making call');
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Phone Number
                </label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Message
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter the message to deliver..."
                    className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Voice
                </label>
                <select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="drAlvinWest">Dr. Alvin West (Deep, Authoritative)</option>
                    <option value="sarahConnors">Sarah Connors (Professional)</option>
                    <option value="supportAgent">Support Agent (Friendly)</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5 animate-pulse" />
                        Calling...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <PhoneOutgoing className="w-5 h-5" />
                        Make Call
                    </span>
                )}
            </button>
        </form>
    );
}

/**
 * Call History Table
 */
function CallHistoryTable({ calls }: { calls: PhoneCall[] }) {
    if (calls.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                <p>No call history yet</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">From</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">Agent</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">Duration</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">Sentiment</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-400">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {calls.map((call) => (
                        <tr key={call.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                            <td className="p-4 text-white">{call.from}</td>
                            <td className="p-4 text-slate-300">{call.agent}</td>
                            <td className="p-4 text-slate-300">{call.duration}s</td>
                            <td className="p-4">
                                <span className={`inline-flex items-center gap-1 ${call.sentiment === 'positive' ? 'text-green-400' :
                                    call.sentiment === 'negative' ? 'text-red-400' :
                                        'text-slate-400'
                                    }`}>
                                    {call.sentiment || 'N/A'}
                                </span>
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center gap-1 ${call.status === 'completed' ? 'text-green-400' :
                                    call.status === 'failed' ? 'text-red-400' :
                                        'text-yellow-400'
                                    }`}>
                                    {call.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                                    {call.status === 'failed' && <XCircle className="w-4 h-4" />}
                                    {call.status}
                                </span>
                            </td>
                            <td className="p-4 text-slate-400 text-sm">
                                {new Date(call.timestamp).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
