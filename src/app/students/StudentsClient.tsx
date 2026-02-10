'use client';

import { Users, Search, GraduationCap } from 'lucide-react';

export default function StudentsClient() {
    return (
        <div className="min-h-screen bg-black/90 p-8 pt-24 text-white">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <Users size={12} />
                        <span>Student Intelligence Grid</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Intel</span></h1>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search Student ID..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-emerald-500/50 transition-all text-sm font-medium placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </header>

            {/* Stats Band */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Enrollment</p>
                    <p className="text-2xl font-black text-white">1,248</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Attendance Rate</p>
                    <p className="text-2xl font-black text-emerald-400">94.2%</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Intervention needed</p>
                    <p className="text-2xl font-black text-amber-400">86</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">IEP Active</p>
                    <p className="text-2xl font-black text-blue-400">142</p>
                </div>
            </div>

            {/* Student Table / List Placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h3 className="font-bold text-sm">Active Roster</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold uppercase hover:bg-white/10 transition-colors">Export CSV</button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold uppercase hover:bg-white/10 transition-colors">Filters</button>
                    </div>
                </div>
                <div className="p-12 text-center text-slate-500">
                    <GraduationCap size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium mb-2">Secure Student Database</p>
                    <p className="text-xs opacity-60 max-w-sm mx-auto">
                        Connect your Student Information System (SIS) to populate this grid with real-time data.
                    </p>
                    <button className="mt-6 px-6 py-2 border border-emerald-500/50 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/10 transition-colors">
                        Connect SIS
                    </button>
                </div>
            </div>
        </div>
    );
}
