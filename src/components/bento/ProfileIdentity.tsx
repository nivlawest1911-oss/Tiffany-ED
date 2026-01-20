'use client';
import { Linkedin, Globe, BookOpen, GraduationCap, Award, Briefcase, ChevronRight } from 'lucide-react';

export default function ProfileIdentity() {
    return (
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-lg relative group-hover:border-cyan-500 transition-colors">
                            {/* Profile Image Placeholders - recommend replacing with actual asset if available locally */}
                            {/* Profile Image - AI Generated Professional Headshot */}
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                                alt="Caleb West, DBA"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Alvin West II, <span className="text-cyan-500">DBA</span>
                                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50" title="Verified Executive">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                </div>
                            </h2>
                            <p className="text-sm text-zinc-400 font-medium">Director & AI Strategist</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-800/50">Outlier AI</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-800/50">Transcend Wellness</span>
                            </div>
                        </div>
                    </div>

                    <a href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323" target="_blank" rel="noopener noreferrer"
                        className="p-3 bg-[#0077b5] text-white rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">
                        <Linkedin size={20} />
                    </a>
                </div>

                <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <BookOpen size={12} /> Key Publications
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 group/item cursor-pointer">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <div>
                                    <p className="text-xs text-zinc-300 font-medium group-hover/item:text-white transition-colors">The Refractive Thinker® Vol. XXIV</p>
                                    <p className="text-[10px] text-zinc-500">Mental Health: Policy & Practice</p>
                                </div>
                            </div>
                            <div className="flex gap-3 group/item cursor-pointer">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <div>
                                    <p className="text-xs text-zinc-300 font-medium group-hover/item:text-white transition-colors">Sustaining Small Businesses</p>
                                    <p className="text-[10px] text-zinc-500">Effective Strategies for African American Food Service</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <GraduationCap size={12} /> Education
                            </h3>
                            <p className="text-xs text-zinc-300 font-bold">Walden University</p>
                            <p className="text-[10px] text-zinc-500">Doctor of Business Administration (DBA)</p>
                            <p className="text-[10px] text-zinc-500 mt-1">MBA, Business Administration</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Award size={12} /> Expertise
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {['AI Systems', 'Ed Consulting', 'Tech Writing', 'Financial Reporting'].map(skill => (
                                    <span key={skill} className="px-1.5 py-0.5 bg-zinc-700/50 text-zinc-300 text-[9px] rounded font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Director // ID: 11A75323</p>
                    <button className="text-xs font-bold text-cyan-500 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                        View Full Profile <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
}
