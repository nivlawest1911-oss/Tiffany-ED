'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, Mail, Award } from 'lucide-react';

const STUDENTS = [
    {
        id: '1',
        name: 'Jordan Smith',
        grade: '11th',
        gpa: '3.8',
        attendance: '98%',
        status: 'Active',
        avatar: 'JS',
        tags: ['STEM', 'Honors']
    },
    {
        id: '2',
        name: 'Maria Garcia',
        grade: '10th',
        gpa: '4.0',
        attendance: '100%',
        status: 'Active',
        avatar: 'MG',
        tags: ['Arts', 'Leadership']
    },
    {
        id: '3',
        name: 'Marcus Williams',
        grade: '12th',
        gpa: '3.2',
        attendance: '85%',
        status: 'At Risk',
        avatar: 'MW',
        tags: ['Athletics']
    },
    {
        id: '4',
        name: 'Sarah Chen',
        grade: '11th',
        gpa: '3.9',
        attendance: '95%',
        status: 'Active',
        avatar: 'SC',
        tags: ['Robotics', 'Debate']
    },
    {
        id: '5',
        name: 'Alex Johnson',
        grade: '9th',
        gpa: '3.5',
        attendance: '92%',
        status: 'Active',
        avatar: 'AJ',
        tags: ['Music']
    },
    {
        id: '6',
        name: 'Taylor Reed',
        grade: '12th',
        gpa: '2.8',
        attendance: '78%',
        status: 'Delayed',
        avatar: 'TR',
        tags: ['Vocational']
    }
];

export default function StudentRosterClient() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredStudents = STUDENTS.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || s.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8 pb-20">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="Search student identity..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-intel-gold/30 transition-all backdrop-blur-3xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {['All', 'Active', 'At Risk', 'Delayed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border
                                ${filter === f
                                    ? 'bg-intel-gold text-black border-intel-gold shadow-2xl shadow-intel-gold/20'
                                    : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredStudents.map((student, i) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] group hover:border-intel-gold/40 transition-all duration-500 backdrop-blur-3xl overflow-hidden relative"
                        >
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-black/40 border border-intel-gold/20 flex items-center justify-center text-intel-gold font-black shadow-2xl group-hover:border-intel-gold transition-colors">
                                        {student.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl uppercase italic group-hover:text-intel-gold transition-colors tracking-tighter">{student.name}</h4>
                                        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-mono mt-1">{student.grade} • ID: {2024000 + parseInt(student.id)}</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded-xl text-white/20 hover:text-white transition-colors" title="More Options">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                                <div className="text-center p-4 rounded-2xl bg-black/20 border border-white/5">
                                    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1 font-mono">GPA</p>
                                    <p className="font-black italic text-xl text-intel-gold">{student.gpa}</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-black/20 border border-white/5">
                                    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1 font-mono">ATT</p>
                                    <p className="font-black italic text-xl text-emerald-500/80">{student.attendance}</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-black/20 border border-white/5">
                                    <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1 font-mono">Status</p>
                                    <p className={`font-black italic text-[9px] uppercase mt-2 ${student.status === 'Active' ? 'text-emerald-500/60' :
                                        student.status === 'At Risk' ? 'text-red-500/60' : 'text-intel-gold/60'
                                        }`}>
                                        {student.status}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                {student.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1 bg-intel-gold/10 border border-intel-gold/20 rounded-full text-[9px] uppercase font-black text-intel-gold/60 tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5 flex justify-between relative z-10">
                                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-intel-gold transition-all">
                                    <Award className="w-4 h-4" />
                                    <span>Records</span>
                                </button>
                                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-intel-gold transition-all">
                                    <Mail className="w-4 h-4" />
                                    <span>Contact</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
