'use client';

import { motion } from 'framer-motion';
import { Rocket, Zap, Users, Clock, Flame } from 'lucide-react';

interface MomentumData {
    totalLessons: number;
    totalEngagement: number;
    totalTimeSaved: number;
    momentumScore: number;
    trend: string;
    period: string;
}

interface AcademicVelocityProps {
    data: MomentumData | null;
}

export default function AcademicVelocity({ data }: AcademicVelocityProps) {
    if (!data) return null;

    return (
        <div className="bg-zinc-900 border border-noble-gold/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
            {/* Background Acceleration Trails */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <motion.div 
                    className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-noble-gold to-transparent"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ top: '20%' }}
                />
                <motion.div 
                    className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-noble-gold to-transparent"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                    style={{ top: '60%' }}
                />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xs font-black text-noble-gold uppercase tracking-[0.2em] flex items-center gap-2">
                        <Rocket className="w-4 h-4" /> Academic Velocity
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Curriculum Acceleration Matrix</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-[8px] font-black text-noble-gold uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3 h-3" /> {data.trend} ({data.period})
                </div>
            </div>

            <div className="flex items-end gap-6 mb-8 relative z-10">
                <div className="text-7xl font-black text-white italic tracking-tighter leading-none">
                    {data.momentumScore}<span className="text-2xl text-zinc-600 not-italic ml-1">v</span>
                </div>
                <div className="pb-2 flex-1">
                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                        <span>Instructional Momentum</span>
                        <span className="text-noble-gold">{data.momentumScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-noble-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${data.momentumScore}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 relative z-10">
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-noble-gold/20 transition-all group/stat">
                    <Zap className="w-3 h-3 text-zinc-600 mx-auto mb-2 group-hover/stat:text-noble-gold transition-colors" />
                    <div className="text-xl font-black text-white italic tracking-tighter">{(data.totalLessons).toLocaleString()}</div>
                    <div className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest leading-none mt-1">Lessons</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-noble-gold/20 transition-all group/stat">
                    <Users className="w-3 h-3 text-zinc-600 mx-auto mb-2 group-hover/stat:text-cyan-400 transition-colors" />
                    <div className="text-xl font-black text-white italic tracking-tighter">{(data.totalEngagement).toLocaleString()}</div>
                    <div className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest leading-none mt-1">Engaged</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-noble-gold/20 transition-all group/stat">
                    <Clock className="w-3 h-3 text-zinc-600 mx-auto mb-2 group-hover/stat:text-emerald-400 transition-colors" />
                    <div className="text-xl font-black text-white italic tracking-tighter">{data.totalTimeSaved}<span className="text-[10px] ml-0.5">h</span></div>
                    <div className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest leading-none mt-1">Time Saved</div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 p-8 opacity-5">
                <Rocket className="w-32 h-32 rotate-12" />
            </div>
        </div>
    );
}
