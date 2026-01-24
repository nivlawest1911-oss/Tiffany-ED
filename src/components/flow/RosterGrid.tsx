'use client';
import { AuroraCard } from './AuroraCard';
import { motion } from 'framer-motion';
import React from 'react';

export const RosterGrid = ({ students }: { students: any[] }) => {
    if (!students || students.length === 0) {
        return (
            <div className="p-12 text-center bg-white/5 border border-white/10 rounded-[2rem] border-dashed">
                <p className="text-zinc-500 uppercase font-black text-[10px] tracking-widest">No Active Roster Connections Detected</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, i) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={student.id}
                >
                    <AuroraCard>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{student.last_name}, {student.first_name}</h3>
                                <p className="text-[10px] text-emerald-400 uppercase tracking-widest mt-1">
                                    IEP DUE: {new Date(student.next_review).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <span className="text-[10px] font-bold text-zinc-400">{student.grade}</span>
                            </div>
                        </div>

                        <button className="mt-6 w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-500/20 transition-all">
                            Initiate Narrative
                        </button>
                    </AuroraCard>
                </motion.div>
            ))}
        </div>
    );
};
